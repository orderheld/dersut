'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addToCart, cartSummary, clearCart, setQty } from '@/lib/cart';
import { addLog, createOrder, validateCheckout, type CheckoutInput } from '@/lib/orders';
import { config } from '@/lib/config';
import { sendContactMail, sendOrderMail } from '@/lib/emails';
import { getProduct } from '@/lib/products';
import { query } from '@/lib/db';
import { getDict } from '@/i18n';
import { asLocale, lp } from '@/lib/i18n';
import { B2B_FORM } from '@/content/b2b';

const str = (fd: FormData, k: string) => String(fd.get(k) ?? '').trim();

export type AddState = { ok: boolean; n: number; error?: string };

export async function addToCartAction(_prev: AddState, fd: FormData): Promise<AddState> {
  const id = Number(fd.get('product_id'));
  const qty = Math.max(1, Number(fd.get('qty') ?? 1) || 1);
  const lang = asLocale(fd.get('lang'));
  const p = await getProduct(id);
  if (!p || !p.active) return { ok: false, n: _prev.n, error: getDict(lang).cartBtn.unavailable };
  await addToCart(id, qty);
  if (fd.get('buy_now')) redirect(lp(lang, '/kasse'));
  return { ok: true, n: _prev.n + 1 };
}

export async function updateCartAction(fd: FormData): Promise<void> {
  for (const [k, v] of fd.entries()) {
    const m = /^qty\[(\d+)\]$/.exec(k);
    if (m) await setQty(Number(m[1]), Number(v));
  }
}

export async function removeFromCartAction(fd: FormData): Promise<void> {
  await setQty(Number(fd.get('product_id')), 0);
}

export async function setQtyAction(productId: number, qty: number): Promise<void> {
  await setQty(productId, qty);
}

export type CheckoutState = { errors: Record<string, string>; values: Partial<CheckoutInput> };

export async function checkoutAction(_prev: CheckoutState, fd: FormData): Promise<CheckoutState> {
  const lang = asLocale(fd.get('lang'));
  if (str(fd, 'website')) redirect(lp(lang, '/')); // Honeypot gegen Spam-Bots
  const input: CheckoutInput = {
    salutation: str(fd, 'salutation'),
    first_name: str(fd, 'first_name'),
    last_name: str(fd, 'last_name'),
    company: str(fd, 'company'),
    street: str(fd, 'street'),
    zip: str(fd, 'zip'),
    city: str(fd, 'city'),
    email: str(fd, 'email'),
    phone: str(fd, 'phone'),
    note: str(fd, 'note'),
    agb: str(fd, 'agb'),
  };
  const errors = validateCheckout(input, lang);
  if (Object.keys(errors).length) return { errors, values: input };

  const cart = await cartSummary();
  if (!cart.items.length) redirect(lp(lang, '/warenkorb'));

  let order;
  try {
    order = await createOrder(input, cart, lang);
  } catch (e) {
    return { errors: { _: e instanceof Error ? e.message : getDict(lang).checkout.saveFailed }, values: input };
  }
  await clearCart();
  // Lagerbestand hat sich evtl. geändert: Shopseiten neu erzeugen
  if (cart.items.some((i) => i.product.stock !== null)) revalidatePath('/', 'layout');
  const [conf, admin] = await Promise.all([sendOrderMail(order, 'confirmation'), sendOrderMail(order, 'admin')]);
  await addLog(order.id, conf.ok ? `Bestätigung an ${order.email} gesendet.` : `Bestätigung an ${order.email} konnte nicht gesendet werden (${conf.error}).`);
  if (!admin.ok) await addLog(order.id, `Benachrichtigung an ${config.email.orders} konnte nicht gesendet werden (${admin.error}).`);
  redirect(lp(lang, `/bestellung/${order.number}?t=${order.token}&neu=1`));
}

export type ContactState = { sent: boolean; errors: Record<string, string>; values: Record<string, string> };

export async function contactAction(_prev: ContactState, fd: FormData): Promise<ContactState> {
  const v = {
    name: str(fd, 'name'),
    email: str(fd, 'email'),
    phone: str(fd, 'phone'),
    company: str(fd, 'company'),
    topic: str(fd, 'topic'),
    message: str(fd, 'message'),
  };
  if (str(fd, 'website')) return { sent: true, errors: {}, values: {} };
  const t = getDict(asLocale(fd.get('lang')));
  const errors: Record<string, string> = {};
  if (!v.name) errors.name = t.validation.name;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) errors.email = t.validation.email;
  if (v.message.length < 5) errors.message = t.validation.message;
  if (v.message.length > 5000) errors.message = t.validation.messageLong;
  if (Object.values(v).some((x, i) => i < 5 && x.length > 200)) errors._ = t.contact.tooLong;
  if (Object.keys(errors).length) return { sent: false, errors, values: v };

  await query('INSERT INTO messages (name, email, phone, company, topic, message) VALUES ($1,$2,$3,$4,$5,$6)', [
    v.name, v.email, v.phone, v.company, v.topic, v.message,
  ]);
  await sendContactMail(v);
  return { sent: true, errors: {}, values: {} };
}

export type B2BState = { sent: boolean; errors: Record<string, string>; values: Record<string, string> };

/** Anfrage von Gastronomie oder Firmen: wird wie eine Kontaktnachricht gespeichert und per E-Mail zugestellt. */
export async function b2bAction(_prev: B2BState, fd: FormData): Promise<B2BState> {
  const lang = asLocale(fd.get('lang'));
  const f = B2B_FORM[lang];
  const pick = (k: string, list: [string, string][]) => {
    const v = str(fd, k);
    return list.some(([x]) => x === v) ? v : '';
  };
  const v = {
    kind: str(fd, 'kind') === 'office' ? 'office' : 'gastro',
    company: str(fd, 'company'),
    type: pick('type', f.types),
    name: str(fd, 'name'),
    email: str(fd, 'email'),
    phone: str(fd, 'phone'),
    place: str(fd, 'place'),
    volume: pick('volume', f.volumes),
    machine: pick('machine', f.machines),
    message: str(fd, 'message'),
  };
  if (str(fd, 'website')) return { sent: true, errors: {}, values: {} };
  const t = getDict(lang);
  const errors: Record<string, string> = {};
  if (!v.company) errors.company = f.companyMissing;
  if (!v.name) errors.name = t.validation.name;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) errors.email = t.validation.email;
  if (v.message.length > 5000) errors.message = t.validation.messageLong;
  if ([v.company, v.name, v.email, v.phone, v.place].some((x) => x.length > 200)) errors._ = t.contact.tooLong;
  if (Object.keys(errors).length) return { sent: false, errors, values: v };

  const topic = v.kind === 'office' ? 'Firmenanfrage' : 'Gastronomie-Anfrage';
  const message = [
    `Art des Betriebs: ${v.type || '–'}`,
    `Ort: ${v.place || '–'}`,
    `Bedarf pro Monat: ${v.volume || '–'}`,
    `Kaffeemaschine: ${v.machine || '–'}`,
    `Sprache: ${lang.toUpperCase()}`,
    '',
    v.message || '(keine Nachricht)',
  ].join('\n');
  await query('INSERT INTO messages (name, email, phone, company, topic, message) VALUES ($1,$2,$3,$4,$5,$6)', [
    v.name, v.email, v.phone, v.company, topic, message,
  ]);
  await sendContactMail({ name: v.name, email: v.email, phone: v.phone, company: v.company, topic, message });
  return { sent: true, errors: {}, values: {} };
}
