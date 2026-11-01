'use server';

import { createHash, timingSafeEqual } from 'node:crypto';
import { LOCALES } from '@/lib/i18n';
import { TRANSLATABLE_FIELDS, type ProductText, type ProductTranslations } from '@/lib/products-shared';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { FormState } from '@/components/admin/ActionForm';
import { requireAdmin } from '@/lib/admin';
import {
  clearAttempts, clientIp, createResetToken, createSession, destroySession, hasAdmins, hashPassword,
  recordFailedAttempt, tooManyAttempts, verifyPassword, verifyResetToken,
} from '@/lib/auth';
import { config } from '@/lib/config';
import { one, query, reloadSettings } from '@/lib/db';
import { SETTINGS_KEY, type Category, type SiteSettings } from '@/lib/settings-core';
import { adminMailHtml, mailTypeForStatus, resetMailHtml, sendOrderMail, testMailHtml } from '@/lib/emails';
import { absUrl, dateCh, slugify, statusLabel, toRappen } from '@/lib/format';
import { deliverMail } from '@/lib/mail';
import { preparePackshot, preparePhoto } from '@/lib/imaging';
import { saveMedia } from '@/lib/media';
import { notifyAdmins, removePushSubscription, savePushSubscription } from '@/lib/push';
import { addLog, getOrder, ORDER_STATUSES, setOrderStatus, type OrderStatus } from '@/lib/orders';

const str = (fd: FormData, k: string) => String(fd.get(k) ?? '').trim();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Rücksprungadresse nur innerhalb des Admin-Bereichs zulassen. */
const backTo = (fd: FormData, fallback: string) => {
  const b = str(fd, 'back');
  return /^\/admin(\/|\?|$)/.test(b) && !b.startsWith('//') ? b : fallback;
};

/* ---------- Anmeldung ---------- */

/** Anmeldung nur mit Passwort: Jedes Admin-Konto hat ein eigenes Passwort, darüber wird das Konto erkannt. */
async function adminByPassword(pw: string, exceptId = 0): Promise<{ id: number } | null> {
  if (!pw) return null;
  const rows = await query<{ id: number; password_hash: string }>('SELECT id, password_hash FROM admins WHERE id <> $1 ORDER BY id', [exceptId]);
  for (const a of rows) if (await verifyPassword(pw, a.password_hash)) return { id: a.id };
  return null;
}

/**
 * Hauptzugang aus Vercel (ADMIN_PASSWORD): meldet als Konto der Firmenadresse an und legt es bei Bedarf an.
 * Das Passwort selbst steht nur in Vercel; in der Datenbank liegt nur der Hash.
 */
async function envAdmin(pw: string): Promise<{ id: number } | null> {
  const envPw = process.env.ADMIN_PASSWORD ?? '';
  if (envPw.length < 10 || !pw) return null;
  const a = createHash('sha256').update(pw).digest(), b = createHash('sha256').update(envPw).digest();
  if (!timingSafeEqual(a, b)) return null;
  const email = config.email.orders.toLowerCase();
  const row = await one<{ id: number; password_hash: string }>('SELECT id, password_hash FROM admins WHERE email = $1', [email]);
  if (row && (await verifyPassword(pw, row.password_hash))) return { id: row.id };
  const saved = await one<{ id: number }>(
    `INSERT INTO admins (email, password_hash) VALUES ($1, $2)
     ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash RETURNING id`,
    [email, await hashPassword(pw)],
  );
  return saved;
}

const PW_TAKEN = 'Dieses Passwort wird schon für einen anderen Zugang verwendet. Bitte ein anderes wählen.';

export async function loginAction(_prev: FormState, fd: FormData): Promise<FormState> {
  const ip = await clientIp();
  if (await tooManyAttempts(ip)) return { error: 'Zu viele Fehlversuche. Bitte in 15 Minuten erneut versuchen.' };
  const admin = (await envAdmin(str(fd, 'password'))) ?? (await adminByPassword(str(fd, 'password')));
  if (!admin) {
    await recordFailedAttempt(ip);
    return { error: 'Das Passwort ist falsch.' };
  }
  await clearAttempts(ip);
  await createSession(admin.id);
  redirect('/admin');
}

export async function setupAction(_prev: FormState, fd: FormData): Promise<FormState> {
  if (await hasAdmins()) redirect('/admin/login');
  const email = str(fd, 'email').toLowerCase();
  const pw = str(fd, 'password');
  if (!EMAIL_RE.test(email)) return { error: 'Bitte eine gültige E-Mail-Adresse angeben.' };
  if (pw.length < 10) return { error: 'Das Passwort muss mindestens 10 Zeichen lang sein.' };
  if (pw !== str(fd, 'password2')) return { error: 'Die Passwörter stimmen nicht überein.' };
  const row = await one<{ id: number }>(
    'INSERT INTO admins (email, password_hash) SELECT $1, $2 WHERE NOT EXISTS (SELECT 1 FROM admins) RETURNING id',
    [email, await hashPassword(pw)],
  );
  if (!row) redirect('/admin/login');
  await createSession(row.id);
  redirect('/admin?ok=welcome');
}

/* ---------- Passwort vergessen ---------- */

const RESET_SENT = 'Falls es zu dieser Adresse einen Zugang gibt, ist jetzt ein Link unterwegs. Er ist 30 Minuten gültig. Bitte auch im Spam-Ordner nachsehen.';

export async function forgotPasswordAction(_prev: FormState, fd: FormData): Promise<FormState> {
  const ip = await clientIp();
  if (await tooManyAttempts(ip)) return { error: 'Zu viele Versuche. Bitte in 15 Minuten erneut versuchen.' };
  await recordFailedAttempt(ip); // zählt jede Anfrage, damit niemand massenhaft Mails auslösen kann
  const email = str(fd, 'email').toLowerCase();
  if (!EMAIL_RE.test(email)) return { error: 'Bitte eine gültige E-Mail-Adresse angeben.' };
  // Erlaubt: bestehende Admin-Konten und die Firmenadresse (deren Postfach gehört dem Inhaber)
  const exists = await one('SELECT 1 FROM admins WHERE email = $1', [email]);
  if (!exists && email !== config.email.orders.toLowerCase()) return { ok: RESET_SENT };
  const link = absUrl(`admin/passwort-neu?t=${encodeURIComponent(await createResetToken(email))}`);
  const r = await deliverMail({
    to: email,
    subject: 'Dersut Admin: Passwort neu setzen',
    html: resetMailHtml(link),
  });
  if (!r.ok) return { error: `Die E-Mail konnte nicht gesendet werden (${r.error}).` };
  return { ok: RESET_SENT };
}

export async function newPasswordAction(_prev: FormState, fd: FormData): Promise<FormState> {
  const email = await verifyResetToken(str(fd, 't'));
  if (!email) return { error: 'Der Link ist abgelaufen oder wurde schon benutzt. Bitte einen neuen anfordern.' };
  const pw = str(fd, 'password');
  if (pw.length < 10) return { error: 'Das Passwort muss mindestens 10 Zeichen lang sein.' };
  if (pw !== str(fd, 'password2')) return { error: 'Die Passwörter stimmen nicht überein.' };
  const self = await one<{ id: number }>('SELECT id FROM admins WHERE email = $1', [email]);
  if (await adminByPassword(pw, self?.id ?? 0)) return { error: PW_TAKEN };
  const row = await one<{ id: number }>(
    `INSERT INTO admins (email, password_hash) VALUES ($1, $2)
     ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash RETURNING id`,
    [email, await hashPassword(pw)],
  );
  await clearAttempts(await clientIp());
  await createSession(row!.id);
  redirect('/admin?ok=welcome');
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect('/admin/login');
}

/* ---------- Bestellungen ---------- */

/** Hängt Rückmeldung (ok) und ggf. Empfänger der gesendeten E-Mail (mail) an die Rücksprungadresse. */
function flashUrl(back: string, ok: string, mail?: string): string {
  const u = `${back}${back.includes('?') ? '&' : '?'}ok=${ok}`;
  return mail ? `${u}&mail=${encodeURIComponent(mail)}` : u;
}

async function changeStatus(id: number, status: OrderStatus, notify: boolean, tracking = ''): Promise<'ok' | 'mail_failed' | { sent: string }> {
  const { before, after } = await setOrderStatus(id, status, tracking);
  // Storno (oder Storno rückgängig) ändert den Lagerbestand: Shopseiten neu erzeugen
  if (status === 'cancelled' || before.status === 'cancelled') revalidatePath('/', 'layout');
  if (notify && status !== 'open') {
    const r = await sendOrderMail(after, mailTypeForStatus(status));
    await addLog(id, r.ok ? `E-Mail «${statusLabel(status)}» an ${after.email} gesendet.` : `E-Mail an ${after.email} konnte nicht gesendet werden (${r.error}).`);
    if (!r.ok) return 'mail_failed';
    return { sent: after.email };
  }
  return 'ok';
}

export async function orderStatusAction(fd: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(fd.get('id'));
  const status = str(fd, 'status') as OrderStatus;
  if (!ORDER_STATUSES.includes(status)) throw new Error('Unbekannter Status');
  const notify = fd.get('notify') === '1';
  const res = await changeStatus(id, status, notify, str(fd, 'tracking'));
  revalidatePath('/admin', 'layout');
  const back = backTo(fd, `/admin/bestellungen/${id}`);
  const code = res === 'mail_failed' ? 'mail_failed' : typeof res === 'object' ? `${status}_mail` : status;
  redirect(flashUrl(back, code, typeof res === 'object' ? res.sent : undefined));
}

export async function quickPaidAction(id: number, fd: FormData): Promise<void> {
  await requireAdmin();
  const res = await changeStatus(id, 'paid', true);
  revalidatePath('/admin', 'layout');
  const back = backTo(fd, '/admin');
  redirect(res === 'mail_failed' ? flashUrl(back, 'mail_failed') : flashUrl(back, 'paid_mail', typeof res === 'object' ? res.sent : undefined));
}

export async function bulkAction(fd: FormData): Promise<void> {
  await requireAdmin();
  const back = backTo(fd, '/admin');
  const sep = back.includes('?') ? '&' : '?';
  const ids = fd.getAll('ids').map(Number).filter(Boolean);
  if (ids.length && str(fd, 'status') === 'delete') {
    await removeOrders(ids);
    redirect(`${back}${sep}ok=order_deleted`);
  }
  const status = str(fd, 'status') as OrderStatus;
  if (!ids.length || !ORDER_STATUSES.includes(status)) redirect(`${back}${sep}ok=bulk_none`);
  const notify = fd.get('notify') === '1';
  let failed = false;
  const sent: string[] = [];
  for (const id of ids) {
    const o = await getOrder(id);
    if (!o || o.status === status) continue;
    const res = await changeStatus(id, status, notify);
    if (res === 'mail_failed') failed = true;
    else if (typeof res === 'object') sent.push(res.sent);
  }
  revalidatePath('/admin', 'layout');
  const mail = sent.length > 3 ? `${sent.length} Kunden` : sent.join(', ');
  redirect(flashUrl(back, failed ? 'mail_failed' : 'bulk', mail || undefined));
}

/**
 * Bestellungen endgültig löschen (z. B. Testbestellungen), samt Artikeln und Verlauf.
 * Noch nicht stornierte Bestellungen werden vorher storniert, damit der Lagerbestand zurückgebucht wird.
 */
async function removeOrders(ids: number[]): Promise<void> {
  for (const id of ids) {
    const o = await getOrder(id);
    if (!o) continue;
    if (o.status !== 'cancelled') await setOrderStatus(id, 'cancelled');
    await query('DELETE FROM orders WHERE id = $1', [id]);
  }
  revalidatePath('/', 'layout');
}

export async function deleteOrderAction(fd: FormData): Promise<void> {
  await requireAdmin();
  await removeOrders([Number(fd.get('id'))].filter(Boolean));
  redirect('/admin/bestellungen?ok=order_deleted');
}

export async function resendMailAction(fd: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(fd.get('id'));
  const o = await getOrder(id);
  if (!o) redirect('/admin/bestellungen');
  const r = await sendOrderMail(o, mailTypeForStatus(o.status));
  await addLog(id, r.ok ? `E-Mail «${statusLabel(o.status)}» erneut an ${o.email} gesendet.` : `E-Mail an ${o.email} konnte nicht gesendet werden (${r.error}).`);
  redirect(flashUrl(`/admin/bestellungen/${id}`, r.ok ? 'resent' : 'resend_failed', r.ok ? o.email : undefined));
}

export async function trackingAction(fd: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(fd.get('id'));
  const tracking = str(fd, 'tracking').slice(0, 60);
  await query('UPDATE orders SET tracking = $1 WHERE id = $2', [tracking, id]);
  await addLog(id, tracking ? `Sendungsnummer gespeichert: ${tracking}` : 'Sendungsnummer entfernt.');
  redirect(`/admin/bestellungen/${id}?ok=tracking`);
}

export async function noteAction(fd: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(fd.get('id'));
  await query('UPDATE orders SET admin_note = $1 WHERE id = $2', [str(fd, 'admin_note').slice(0, 5000), id]);
  redirect(`/admin/bestellungen/${id}?ok=note`);
}

/* ---------- Produkte ---------- */

const MAX_UPLOAD = 4.5 * 1024 * 1024;

/** Hochgeladenes Bild prüfen, aufbereiten (Produktfoto oder Stimmungsbild) und in der Datenbank ablegen. */
async function storeUpload(file: File, kind: 'pack' | 'photo'): Promise<{ src: string; note: string }> {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('Bitte ein Bild im Format JPG, PNG oder WebP hochladen.');
  if (file.size > MAX_UPLOAD) throw new Error('Das Bild ist zu gross (max. 4.5 MB).');
  const buf = Buffer.from(await file.arrayBuffer());
  let img;
  try {
    img = kind === 'pack' ? await preparePackshot(buf) : await preparePhoto(buf);
  } catch (e) {
    console.error('Bildaufbereitung fehlgeschlagen:', e);
    throw new Error('Das Bild konnte nicht gelesen werden. Bitte ein anderes Foto versuchen.');
  }
  return { src: await saveMedia(img.data, img.mime, img.width, img.height), note: img.note };
}

export async function saveProductAction(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const id = Number(fd.get('id')) || 0;
  const name = str(fd, 'name');
  const price = toRappen(str(fd, 'price'));
  if (!name) return { error: 'Bitte einen Produktnamen angeben.' };
  if (!price || price <= 0) return { error: 'Bitte einen gültigen Preis angeben, z. B. 29.90.' };
  const slug = slugify(str(fd, 'slug') || name);
  if (!slug) return { error: 'Die URL-Kennung ist ungültig.' };
  const clash = await one('SELECT id FROM products WHERE slug = $1 AND id <> $2', [slug, id]);
  if (clash) return { error: `Die URL-Kennung «${slug}» wird bereits verwendet.` };

  let image = str(fd, 'image');
  let note = '';
  const upload = fd.get('upload');
  if (upload instanceof File && upload.size > 0) {
    try {
      const r = await storeUpload(upload, fd.get('raw') === '1' ? 'photo' : 'pack');
      image = r.src;
      note = r.note;
    } catch (e) {
      return { error: e instanceof Error ? e.message : 'Upload fehlgeschlagen.' };
    }
  }
  const gallery = String(fd.get('gallery') ?? '').split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  for (const f of fd.getAll('gallery_upload')) {
    if (f instanceof File && f.size > 0) {
      try {
        gallery.push((await storeUpload(f, fd.get('gallery_pack') === '1' ? 'pack' : 'photo')).src);
      } catch (e) {
        return { error: e instanceof Error ? e.message : 'Upload fehlgeschlagen.' };
      }
    }
  }
  const translations: ProductTranslations = {};
  for (const l of LOCALES) {
    const tr: Partial<ProductText> = {};
    for (const k of TRANSLATABLE_FIELDS) {
      const v = str(fd, `tr_${l}_${k}`);
      if (v) tr[k] = v;
    }
    const hl = String(fd.get(`tr_${l}_highlights`) ?? '').split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
    if (hl.length) tr.highlights = hl;
    if (Object.keys(tr).length) translations[l] = tr;
  }
  const stockRaw = str(fd, 'stock');
  const accent = /^#[0-9a-f]{6}$/i.test(str(fd, 'accent')) ? str(fd, 'accent') : '#002856';
  const values = [
    slug, name, str(fd, 'line'), str(fd, 'subtitle'), str(fd, 'description'), str(fd, 'notes'), str(fd, 'blend'),
    str(fd, 'weight') || '1 kg', price, image, Math.min(5, Math.max(1, Number(fd.get('intensity')) || 3)), accent,
    fd.get('active') === '1', stockRaw === '' ? null : Math.max(0, Math.floor(Number(stockRaw)) || 0), Math.floor(Number(fd.get('sort'))) || 0,
  ];
  let savedId = id;
  if (id) {
    await query(
      `UPDATE products SET slug=$1, name=$2, line=$3, subtitle=$4, description=$5, notes=$6, blend=$7, weight=$8, price=$9,
         image=$10, intensity=$11, accent=$12, active=$13, stock=$14, sort=$15, translations=$16::jsonb, gallery=$17::jsonb, category=$18 WHERE id=$19`,
      [...values, JSON.stringify(translations), JSON.stringify([...new Set(gallery)]), str(fd, 'category'), id],
    );
  } else {
    const row = await one<{ id: number }>(
      `INSERT INTO products (slug, name, line, subtitle, description, notes, blend, weight, price, image, intensity, accent, active, stock, sort, translations, gallery, category)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16::jsonb,$17::jsonb,$18) RETURNING id`,
      [...values, JSON.stringify(translations), JSON.stringify([...new Set(gallery)]), str(fd, 'category')],
    );
    savedId = row!.id;
  }
  revalidatePath('/', 'layout');
  redirect(`/admin/produkte/${savedId}?ok=${note ? 'saved_bg' : 'saved'}`);
}

/** Produkt im Shop ein- oder ausblenden (direkt aus der Liste). */
export async function toggleProductAction(fd: FormData): Promise<void> {
  await requireAdmin();
  await query('UPDATE products SET active = NOT active WHERE id = $1', [Number(fd.get('id'))]);
  revalidatePath('/', 'layout');
}

/** Kopie als Vorlage für ein ähnliches Produkt (ausgeblendet, bis sie fertig ist). */
export async function duplicateProductAction(fd: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(fd.get('id'));
  const src = await one<{ slug: string }>('SELECT slug FROM products WHERE id = $1', [id]);
  if (!src) redirect('/admin/produkte');
  let slug = `${src.slug}-kopie`;
  for (let n = 2; await one('SELECT 1 FROM products WHERE slug = $1', [slug]); n++) slug = `${src.slug}-kopie-${n}`;
  const row = await one<{ id: number }>(
    `INSERT INTO products (slug, name, line, subtitle, description, notes, blend, weight, price, image, intensity, accent, active, stock, sort, translations, gallery, category)
     SELECT $2, name || ' (Kopie)', line, subtitle, description, notes, blend, weight, price, image, intensity, accent, FALSE, stock, sort + 1, translations, gallery, category
     FROM products WHERE id = $1 RETURNING id`,
    [id, slug],
  );
  revalidatePath('/admin', 'layout');
  redirect(`/admin/produkte/${row!.id}?ok=copied`);
}

/** Produkt endgültig löschen. Bestehende Bestellungen behalten Name und Preis. */
export async function deleteProductAction(fd: FormData): Promise<void> {
  await requireAdmin();
  await query('DELETE FROM products WHERE id = $1', [Number(fd.get('id'))]);
  revalidatePath('/', 'layout');
  redirect('/admin/produkte?ok=deleted');
}

/* ---------- Nachrichten (Postfach) ---------- */

/** Zurück in den Ordner (ohne geöffnete Nachricht) oder auf die gleiche Nachricht. */
const mailBack = (fd: FormData) => backTo(fd, '/admin/nachrichten');

async function msgUpdate(fd: FormData, sql: string, params: unknown[] = []): Promise<void> {
  await requireAdmin();
  const ids = (fd.getAll('ids').length ? fd.getAll('ids') : [fd.get('id')]).map(Number).filter(Boolean);
  if (ids.length) await query(sql.replace('$IDS', `ANY($${params.length + 1}::int[])`), [...params, ids]);
  revalidatePath('/admin', 'layout');
  redirect(mailBack(fd));
}

export async function messageDoneAction(fd: FormData): Promise<void> {
  await msgUpdate(fd, 'UPDATE messages SET done = $1, read_at = COALESCE(read_at, now()) WHERE id = $IDS', [fd.get('done') === '1']);
}

/** Nachricht als Spam markieren oder aus dem Spam zurückholen («Kein Spam»). */
export async function messageSpamAction(fd: FormData): Promise<void> {
  await msgUpdate(fd, 'UPDATE messages SET spam = $1 WHERE id = $IDS', [fd.get('spam') === '1' ? 'Von Hand als Spam markiert' : '']);
}

/* Varianten für die Mehrfachauswahl: Knöpfe mit eigener Server-Aktion können keinen name/value mitschicken */
export async function messageMarkDoneAction(fd: FormData): Promise<void> {
  fd.set('done', '1');
  await messageDoneAction(fd);
}
export async function messageMarkOpenAction(fd: FormData): Promise<void> {
  fd.set('done', '0');
  await messageDoneAction(fd);
}
export async function messageMarkSpamAction(fd: FormData): Promise<void> {
  fd.set('spam', '1');
  await messageSpamAction(fd);
}
export async function messageNoSpamAction(fd: FormData): Promise<void> {
  fd.set('spam', '0');
  await messageSpamAction(fd);
}
export async function messageRestoreAction(fd: FormData): Promise<void> {
  fd.set('restore', '1');
  await messageTrashAction(fd);
}

export async function messageReadAction(fd: FormData): Promise<void> {
  await msgUpdate(fd, 'UPDATE messages SET read_at = COALESCE(read_at, now()) WHERE id = $IDS');
}

/** Gesendete E-Mails (Ordner «Gesendet») endgültig löschen. */
export async function sentDeleteAction(fd: FormData): Promise<void> {
  await requireAdmin();
  const ids = (fd.getAll('ids').length ? fd.getAll('ids') : [fd.get('id')]).map(Number).filter(Boolean);
  if (ids.length) await query('DELETE FROM mail_out WHERE id = ANY($1::int[])', [ids]);
  revalidatePath('/admin', 'layout');
  redirect('/admin/nachrichten?f=sent');
}

export async function messageUnreadAction(fd: FormData): Promise<void> {
  await msgUpdate(fd, 'UPDATE messages SET read_at = NULL WHERE id = $IDS');
}

/** In den Papierkorb (wird nach 30 Tagen geleert) oder wiederherstellen. */
export async function messageTrashAction(fd: FormData): Promise<void> {
  await msgUpdate(fd, `UPDATE messages SET deleted_at = ${fd.get('restore') === '1' ? 'NULL' : 'now()'} WHERE id = $IDS`);
}

export async function messageDeleteAction(fd: FormData): Promise<void> {
  await msgUpdate(fd, 'DELETE FROM messages WHERE deleted_at IS NOT NULL AND id = $IDS');
}

/** Antwort auf eine Nachricht oder neue E-Mail, gesendet von info@dersut.ch. Wird unter «Gesendet» abgelegt. */
export async function sendAdminMailAction(_prev: FormState, fd: FormData): Promise<FormState> {
  const admin = await requireAdmin();
  const to = str(fd, 'to').toLowerCase();
  const subject = str(fd, 'subject').slice(0, 200);
  const body = String(fd.get('body') ?? '').trim().slice(0, 20000);
  if (!EMAIL_RE.test(to)) return { error: 'Bitte eine gültige E-Mail-Adresse angeben.' };
  if (!subject) return { error: 'Bitte einen Betreff angeben.' };
  if (!body) return { error: 'Bitte einen Text schreiben.' };
  const id = Number(fd.get('id')) || null;
  const orig = id ? await one<{ name: string; message: string; created_at: Date }>('SELECT name, message, created_at FROM messages WHERE id = $1', [id]) : null;
  const html = adminMailHtml(body, {
    signature: fd.get('sig') === '1',
    quote: orig && fd.get('quote') === '1' ? { name: orig.name, date: dateCh(orig.created_at, true), text: orig.message } : undefined,
  });
  const r = await deliverMail({ to, subject, html, replyTo: config.email.contact });
  const out = await one<{ id: number }>('INSERT INTO mail_out (message_id, to_email, subject, body, ok, error, sent_by) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id', [
    orig ? id : null, to, subject, body, r.ok, r.error ?? '', admin.email,
  ]);
  if (!r.ok) return { error: `Die E-Mail konnte nicht gesendet werden (${r.error}). Der Text ist unter «Gesendet» gespeichert.` };
  if (orig && fd.get('done') === '1') await query('UPDATE messages SET done = TRUE, read_at = COALESCE(read_at, now()) WHERE id = $1', [id]);
  revalidatePath('/admin', 'layout');
  // Bestätigung gross im Postfach anzeigen (bleibt auch nach dem Neuladen der Seite sichtbar)
  const where = orig ? `f=${fd.get('done') === '1' ? 'done' : 'inbox'}&id=${id}` : `f=sent&id=${out?.id ?? ''}`;
  redirect(`/admin/nachrichten?${where}&sent=${encodeURIComponent(to)}`);
}

/* ---------- Firma & Shop ---------- */

export async function saveSettingsAction(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const company: SiteSettings['company'] = {};
  for (const k of ['name', 'street', 'zip', 'city', 'phone', 'uid', 'vatNo', 'register'] as const) company[k] = str(fd, `company_${k}`).slice(0, 120);
  if (!company.name || !company.street || !company.zip || !company.city) return { error: 'Firmenname, Strasse, PLZ und Ort sind Pflicht (für Rechnungen und QR-Code).' };
  const email = str(fd, 'email').toLowerCase();
  if (!/^[^\s@]+@dersut\.ch$/.test(email)) return { error: 'Die E-Mail-Adresse muss auf @dersut.ch enden: Nur diese Domain ist für den Versand freigeschaltet.' };
  const iban = str(fd, 'bank_iban').replace(/\s+/g, '').toUpperCase();
  if (!/^(CH|LI)\d{19}$/.test(iban)) return { error: 'Die IBAN ist ungültig (Schweizer IBAN: CH + 19 Ziffern).' };
  const paymentDays = Math.floor(Number(str(fd, 'paymentDays')));
  if (!(paymentDays >= 1 && paymentDays <= 60)) return { error: 'Die Zahlungsfrist muss zwischen 1 und 60 Tagen liegen.' };

  const chfIn = (k: string) => {
    const v = str(fd, k).replace(',', '.').replace(/[^\d.]/g, '');
    return v === '' ? NaN : Math.round(parseFloat(v) * 100);
  };
  const shipping = chfIn('shipping');
  const freeShippingFrom = chfIn('freeShippingFrom');
  if (!(shipping >= 0 && shipping <= 100_00)) return { error: 'Die Versandpauschale muss zwischen CHF 0 und CHF 100 liegen.' };
  if (!(freeShippingFrom >= 0 && freeShippingFrom <= 10_000_00)) return { error: 'Der Betrag für Gratisversand muss zwischen CHF 0 und CHF 10’000 liegen.' };

  const categories: Category[] = [];
  const names = fd.getAll('cat_de').map(String);
  names.forEach((de, i) => {
    const name = de.trim();
    if (!name) return;
    const slug = String(fd.getAll('cat_slug')[i] ?? '').trim() || slugify(name);
    if (categories.some((c) => c.slug === slug)) return;
    const tr = (l: string) => String(fd.getAll(`cat_${l}`)[i] ?? '').trim().slice(0, 60) || undefined;
    const text: Category['text'] = {};
    for (const l of ['de', 'fr', 'it', 'en'] as const) {
      const v = String(fd.getAll(`cat_text_${l}`)[i] ?? '').trim().slice(0, 400);
      if (v) text[l] = v;
    }
    categories.push({ slug, de: name.slice(0, 60), fr: tr('fr'), it: tr('it'), en: tr('en'), ...(Object.keys(text).length ? { text } : {}) });
  });

  const settings: SiteSettings = {
    company,
    email,
    bank: { holder: str(fd, 'bank_holder'), bank: str(fd, 'bank_bank'), iban },
    paymentDays,
    shipping,
    freeShippingFrom,
    categories,
  };
  await query(
    `INSERT INTO app_settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
    [SETTINGS_KEY, JSON.stringify(settings)],
  );
  // Produkte mit gelöschter Kategorie zurücksetzen
  await query(`UPDATE products SET category = '' WHERE category <> '' AND NOT (category = ANY($1::text[]))`, [categories.map((c) => c.slug)]);
  await reloadSettings();
  revalidatePath('/', 'layout');
  return { ok: 'Gespeichert. Webseite, Rechnungen und E-Mails verwenden ab sofort die neuen Angaben.' };
}

/* ---------- Einstellungen ---------- */

export async function changePasswordAction(_prev: FormState, fd: FormData): Promise<FormState> {
  const admin = await requireAdmin();
  const row = await one<{ password_hash: string }>('SELECT password_hash FROM admins WHERE id = $1', [admin.id]);
  if (!row || !(await verifyPassword(str(fd, 'current'), row.password_hash))) return { error: 'Das aktuelle Passwort ist falsch.' };
  const pw = str(fd, 'password');
  if (pw.length < 10) return { error: 'Das neue Passwort muss mindestens 10 Zeichen lang sein.' };
  if (pw !== str(fd, 'password2')) return { error: 'Die neuen Passwörter stimmen nicht überein.' };
  if (await adminByPassword(pw, admin.id)) return { error: PW_TAKEN };
  await query('UPDATE admins SET password_hash = $1 WHERE id = $2', [await hashPassword(pw), admin.id]);
  return { ok: 'Passwort geändert.' };
}

export async function addAdminAction(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const email = str(fd, 'email').toLowerCase();
  const pw = str(fd, 'password');
  if (!EMAIL_RE.test(email)) return { error: 'Bitte eine gültige E-Mail-Adresse angeben.' };
  if (pw.length < 10) return { error: 'Das Passwort muss mindestens 10 Zeichen lang sein.' };
  if (await one('SELECT id FROM admins WHERE email = $1', [email])) return { error: 'Diesen Zugang gibt es bereits.' };
  if (await adminByPassword(pw)) return { error: PW_TAKEN };
  await query('INSERT INTO admins (email, password_hash) VALUES ($1, $2)', [email, await hashPassword(pw)]);
  revalidatePath('/admin/konto');
  return { ok: `Zugang für ${email} angelegt.` };
}

export async function removeAdminAction(fd: FormData): Promise<void> {
  const admin = await requireAdmin();
  const id = Number(fd.get('id'));
  if (id && id !== admin.id) await query('DELETE FROM admins WHERE id = $1', [id]);
  revalidatePath('/admin/konto');
}

export async function testMailAction(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  if (!process.env.RESEND_API_KEY) return { error: 'RESEND_API_KEY ist nicht gesetzt. Bitte in Vercel unter Settings → Environment Variables eintragen.' };
  const to = str(fd, 'to') || config.email.orders;
  if (!EMAIL_RE.test(to)) return { error: 'Bitte eine gültige E-Mail-Adresse angeben.' };
  const r = await deliverMail({ to, subject: 'Testmail Dersut Shop', html: testMailHtml() });
  return r.ok
    ? { ok: `Testmail an ${to} gesendet. Bitte auch im Spam-Ordner nachsehen.` }
    : { error: `Versand an ${to} fehlgeschlagen: ${r.error}` };
}

/* ---------- Push-Benachrichtigungen ---------- */

type PushSub = { endpoint: string; keys: { p256dh: string; auth: string } };

export async function savePushAction(sub: PushSub, device: string): Promise<void> {
  const me = await requireAdmin();
  if (!/^https:\/\//.test(sub?.endpoint ?? '') || !sub.keys?.p256dh || !sub.keys?.auth) throw new Error('Ungültiges Push-Abo');
  await savePushSubscription(me.id, sub, String(device ?? ''));
}

export async function removePushAction(endpoint: string): Promise<void> {
  const me = await requireAdmin();
  await removePushSubscription(me.id, String(endpoint ?? ''));
}

export async function testPushAction(): Promise<number> {
  const me = await requireAdmin();
  return notifyAdmins({ title: 'Dersut Admin', body: 'Push funktioniert. So sehen neue Bestellungen und Nachrichten aus.', url: '/admin', tag: 'test' }, me.id);
}
