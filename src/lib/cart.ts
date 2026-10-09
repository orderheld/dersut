import 'server-only';
import { cookies } from 'next/headers';
import { config } from './config';
import { vatFromGross } from './format';
import type { Locale } from './i18n';
import { query } from './db';
import { localizeProduct, type Product } from './products';
import { CART_COUNT_COOKIE } from './cart-shared';

const COOKIE = 'dersut_cart';

export type CartRaw = Record<string, number>;
export type CartItem = { product: Product; qty: number; line: number };
export type Cart = {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  vatRate: number;
  vat: number;
};

export async function readCart(): Promise<CartRaw> {
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    const out: CartRaw = {};
    for (const [k, v] of Object.entries(parsed)) {
      const q = Math.min(config.shop.maxQty, Math.max(0, Math.floor(Number(v))));
      if (/^\d+$/.test(k) && q > 0) out[k] = q;
    }
    return out;
  } catch {
    return {};
  }
}

export async function writeCart(cart: CartRaw): Promise<void> {
  const jar = await cookies();
  const opts = { sameSite: 'lax' as const, secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 24 * 30 };
  jar.set(COOKIE, JSON.stringify(cart), { ...opts, httpOnly: true });
  // Nur die Anzahl, lesbar für die Kopfzeile: So können alle Inhaltsseiten aus dem Cache kommen
  jar.set(CART_COUNT_COOKIE, String(Object.values(cart).reduce((a, b) => a + b, 0)), opts);
}

export async function setQty(productId: number, qty: number): Promise<void> {
  const cart = await readCart();
  const q = Math.min(config.shop.maxQty, Math.max(0, Math.floor(qty)));
  if (q === 0) delete cart[productId];
  else cart[productId] = q;
  await writeCart(cart);
}

export async function addToCart(productId: number, qty: number): Promise<void> {
  const cart = await readCart();
  await setQty(productId, (cart[productId] ?? 0) + qty);
}

export async function clearCart(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
  jar.delete(CART_COUNT_COOKIE);
}

export async function cartCount(): Promise<number> {
  return Object.values(await readCart()).reduce((a, b) => a + b, 0);
}

/** Versandkosten: pauschal, ab config.shop.freeShippingFrom Warenwert gratis. */
export function shippingFor(subtotal: number, hasItems = true): number {
  if (!hasItems || subtotal >= config.shop.freeShippingFrom) return 0;
  return config.shop.shipping;
}

export async function cartSummary(lang: Locale = 'de'): Promise<Cart> {
  const raw = await readCart();
  const ids = Object.keys(raw).map(Number);
  // Alle Produkte des Warenkorbs mit einer einzigen Abfrage laden
  const rows = ids.length ? await query<Product>('SELECT * FROM products WHERE id = ANY($1::int[]) AND active ORDER BY sort, id', [ids]) : [];
  const items: CartItem[] = rows.map((p) => ({ product: localizeProduct(p, lang), qty: raw[p.id], line: p.price * raw[p.id] }));
  const subtotal = items.reduce((a, i) => a + i.line, 0);
  const shipping = shippingFor(subtotal, items.length > 0);
  const total = subtotal + shipping;
  return { items, subtotal, shipping, total, vatRate: config.shop.vatRate, vat: vatFromGross(total, config.shop.vatRate) };
}
