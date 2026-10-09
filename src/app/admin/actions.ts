'use server';

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
import { one, query } from '@/lib/db';
import { mailTypeForStatus, resetMailHtml, sendOrderMail, testMailHtml } from '@/lib/emails';
import { absUrl, slugify, statusLabel, toRappen } from '@/lib/format';
import { deliverMail } from '@/lib/mail';
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

const PW_TAKEN = 'Dieses Passwort wird schon für einen anderen Zugang verwendet. Bitte ein anderes wählen.';

export async function loginAction(_prev: FormState, fd: FormData): Promise<FormState> {
  const ip = await clientIp();
  if (await tooManyAttempts(ip)) return { error: 'Zu viele Fehlversuche. Bitte in 15 Minuten erneut versuchen.' };
  const admin = await adminByPassword(str(fd, 'password'));
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

async function changeStatus(id: number, status: OrderStatus, notify: boolean, tracking = ''): Promise<'ok' | 'mail_failed'> {
  const { before, after } = await setOrderStatus(id, status, tracking);
  // Storno (oder Storno rückgängig) ändert den Lagerbestand: Shopseiten neu erzeugen
  if (status === 'cancelled' || before.status === 'cancelled') revalidatePath('/', 'layout');
  if (notify && status !== 'open') {
    const r = await sendOrderMail(after, mailTypeForStatus(status));
    await addLog(id, r.ok ? `E-Mail «${statusLabel(status)}» an ${after.email} gesendet.` : `E-Mail an ${after.email} konnte nicht gesendet werden (${r.error}).`);
    if (!r.ok) return 'mail_failed';
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
  const code = res === 'mail_failed' ? 'mail_failed' : notify && status !== 'open' ? `${status}_mail` : status;
  redirect(`${back}${back.includes('?') ? '&' : '?'}ok=${code}`);
}

export async function quickPaidAction(id: number, fd: FormData): Promise<void> {
  await requireAdmin();
  const res = await changeStatus(id, 'paid', true);
  revalidatePath('/admin', 'layout');
  const back = backTo(fd, '/admin');
  redirect(`${back}${back.includes('?') ? '&' : '?'}ok=${res === 'mail_failed' ? 'mail_failed' : 'paid_mail'}`);
}

export async function bulkAction(fd: FormData): Promise<void> {
  await requireAdmin();
  const back = backTo(fd, '/admin');
  const sep = back.includes('?') ? '&' : '?';
  const ids = fd.getAll('ids').map(Number).filter(Boolean);
  const status = str(fd, 'status') as OrderStatus;
  if (!ids.length || !ORDER_STATUSES.includes(status)) redirect(`${back}${sep}ok=bulk_none`);
  const notify = fd.get('notify') === '1';
  let failed = false;
  for (const id of ids) {
    const o = await getOrder(id);
    if (!o || o.status === status) continue;
    if ((await changeStatus(id, status, notify)) === 'mail_failed') failed = true;
  }
  revalidatePath('/admin', 'layout');
  redirect(`${back}${sep}ok=${failed ? 'mail_failed' : 'bulk'}`);
}

export async function resendMailAction(fd: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(fd.get('id'));
  const o = await getOrder(id);
  if (!o) redirect('/admin/bestellungen');
  const r = await sendOrderMail(o, mailTypeForStatus(o.status));
  await addLog(id, r.ok ? `E-Mail «${statusLabel(o.status)}» erneut an ${o.email} gesendet.` : `E-Mail an ${o.email} konnte nicht gesendet werden (${r.error}).`);
  redirect(`/admin/bestellungen/${id}?ok=${r.ok ? 'resent' : 'resend_failed'}`);
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

async function storeUpload(file: File): Promise<string> {
  const types: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
  const ext = types[file.type];
  if (!ext) throw new Error('Bitte ein Bild im Format JPG, PNG oder WebP hochladen.');
  if (file.size > 4 * 1024 * 1024) throw new Error('Das Bild ist zu gross (max. 4 MB).');
  const name = `produkte/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import('@vercel/blob');
    const blob = await put(name, file, { access: 'public', contentType: file.type });
    return blob.url;
  }
  if (process.env.VERCEL) {
    throw new Error('Für Bild-Uploads bitte in Vercel unter Storage einen Blob-Speicher verbinden, oder eine Bild-URL angeben.');
  }
  // Lokal: in public/uploads speichern
  const { mkdir, writeFile } = await import('node:fs/promises');
  const path = await import('node:path');
  const dir = path.join(process.cwd(), 'public', 'uploads', 'produkte');
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(process.cwd(), 'public', 'uploads', name), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${name}`;
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
  const upload = fd.get('upload');
  if (upload instanceof File && upload.size > 0) {
    try {
      image = await storeUpload(upload);
    } catch (e) {
      return { error: e instanceof Error ? e.message : 'Upload fehlgeschlagen.' };
    }
  }
  const gallery = String(fd.get('gallery') ?? '').split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  for (const f of fd.getAll('gallery_upload')) {
    if (f instanceof File && f.size > 0) {
      try {
        gallery.push(await storeUpload(f));
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
         image=$10, intensity=$11, accent=$12, active=$13, stock=$14, sort=$15, translations=$16::jsonb, gallery=$17::jsonb WHERE id=$18`,
      [...values, JSON.stringify(translations), JSON.stringify([...new Set(gallery)]), id],
    );
  } else {
    const row = await one<{ id: number }>(
      `INSERT INTO products (slug, name, line, subtitle, description, notes, blend, weight, price, image, intensity, accent, active, stock, sort, translations, gallery)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16::jsonb,$17::jsonb) RETURNING id`,
      [...values, JSON.stringify(translations), JSON.stringify([...new Set(gallery)])],
    );
    savedId = row!.id;
  }
  revalidatePath('/', 'layout');
  redirect(`/admin/produkte/${savedId}?ok=saved`);
}

/* ---------- Nachrichten ---------- */

export async function messageDoneAction(fd: FormData): Promise<void> {
  await requireAdmin();
  await query('UPDATE messages SET done = $1 WHERE id = $2', [fd.get('done') === '1', Number(fd.get('id'))]);
  revalidatePath('/admin', 'layout');
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
