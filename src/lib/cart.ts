import 'server-only';
import { cookies } from 'next/headers';
import { config } from './config';
import { vatFromGross } from './format';
import { getProduct, type Product } from './products';

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
  (await cookies()).set(COOKIE, JSON.stringify(cart), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
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
  (await cookies()).delete(COOKIE);
}

export async function cartCount(): Promise<number> {
  return Object.values(await readCart()).reduce((a, b) => a + b, 0);
}

export async function cartSummary(): Promise<Cart> {
  const raw = await readCart();
  const items: CartItem[] = [];
  for (const [id, qty] of Object.entries(raw)) {
    const p = await getProduct(Number(id));
    if (!p || !p.active) continue;
    items.push({ product: p, qty, line: p.price * qty });
  }
  const subtotal = items.reduce((a, i) => a + i.line, 0);
  const shipping = items.length ? config.shop.shipping : 0;
  const total = subtotal + shipping;
  return { items, subtotal, shipping, total, vatRate: config.shop.vatRate, vat: vatFromGross(total, config.shop.vatRate) };
}
