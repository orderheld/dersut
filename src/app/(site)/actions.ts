'use server';

import { redirect } from 'next/navigation';
import { addToCart, cartSummary, clearCart, setQty } from '@/lib/cart';
import { createOrder, validateCheckout, type CheckoutInput } from '@/lib/orders';
import { sendContactMail, sendOrderMail } from '@/lib/emails';
import { getProduct } from '@/lib/products';
import { query } from '@/lib/db';

const str = (fd: FormData, k: string) => String(fd.get(k) ?? '').trim();

export type AddState = { ok: boolean; n: number; error?: string };

export async function addToCartAction(_prev: AddState, fd: FormData): Promise<AddState> {
  const id = Number(fd.get('product_id'));
  const qty = Math.max(1, Number(fd.get('qty') ?? 1) || 1);
  const p = await getProduct(id);
  if (!p || !p.active) return { ok: false, n: _prev.n, error: 'Produkt nicht verfügbar.' };
  await addToCart(id, qty);
  if (fd.get('buy_now')) redirect('/kasse');
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
  if (str(fd, 'website')) redirect('/'); // Honeypot gegen Spam-Bots
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
  const errors = validateCheckout(input);
  if (Object.keys(errors).length) return { errors, values: input };

  const cart = await cartSummary();
  if (!cart.items.length) redirect('/warenkorb');

  let order;
  try {
    order = await createOrder(input, cart);
  } catch (e) {
    return { errors: { _: e instanceof Error ? e.message : 'Die Bestellung konnte nicht gespeichert werden.' }, values: input };
  }
  await clearCart();
  await Promise.all([sendOrderMail(order, 'confirmation'), sendOrderMail(order, 'admin')]);
  redirect(`/bestellung/${order.number}?t=${order.token}&neu=1`);
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
  const errors: Record<string, string> = {};
  if (!v.name) errors.name = 'Bitte Ihren Namen angeben.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) errors.email = 'Bitte eine gültige E-Mail-Adresse angeben.';
  if (v.message.length < 5) errors.message = 'Bitte eine Nachricht eingeben.';
  if (v.message.length > 5000) errors.message = 'Die Nachricht ist zu lang.';
  if (Object.values(v).some((x, i) => i < 5 && x.length > 200)) errors._ = 'Eine Eingabe ist zu lang.';
  if (Object.keys(errors).length) return { sent: false, errors, values: v };

  await query('INSERT INTO messages (name, email, phone, company, topic, message) VALUES ($1,$2,$3,$4,$5,$6)', [
    v.name, v.email, v.phone, v.company, v.topic, v.message,
  ]);
  await sendContactMail(v);
  return { sent: true, errors: {}, values: {} };
}
