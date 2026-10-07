import 'server-only';
import { randomBytes } from 'node:crypto';
import { config } from './config';
import { query, one, transaction, type Query } from './db';
import type { Cart } from './cart';
import { getProduct } from './products';
import { statusLabel } from './format';
import { getDict } from '@/i18n';
import type { Locale } from './i18n';

export const ORDER_STATUSES = ['open', 'paid', 'shipped', 'cancelled'] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export type OrderItem = {
  id: number;
  order_id: number;
  product_id: number | null;
  name: string;
  weight: string;
  unit_price: number;
  qty: number;
  line_total: number;
};

export type Order = {
  id: number;
  number: string;
  token: string;
  status: OrderStatus;
  salutation: string;
  first_name: string;
  last_name: string;
  company: string;
  street: string;
  zip: string;
  city: string;
  email: string;
  phone: string;
  note: string;
  subtotal: number;
  shipping: number;
  total: number;
  vat_rate: number;
  vat_amount: number;
  tracking: string;
  admin_note: string;
  created_at: Date;
  paid_at: Date | null;
  shipped_at: Date | null;
  cancelled_at: Date | null;
  lang: Locale;
  items: OrderItem[];
};

export type CheckoutInput = {
  salutation: string;
  first_name: string;
  last_name: string;
  company: string;
  street: string;
  zip: string;
  city: string;
  email: string;
  phone: string;
  note: string;
  agb: string;
};

export function validateCheckout(input: CheckoutInput, lang: Locale = 'de'): Record<string, string> {
  const t = getDict(lang);
  const v = t.validation;
  const errors: Record<string, string> = {};
  const req: Record<string, string> = {
    first_name: t.checkout.firstName, last_name: t.checkout.lastName, street: t.checkout.street, zip: t.checkout.zip, city: t.checkout.city, email: t.checkout.email,
  };
  for (const [k, label] of Object.entries(req)) {
    if (!input[k as keyof CheckoutInput]?.trim()) errors[k] = v.missing(label);
  }
  if (!errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) errors.email = v.email;
  if (!errors.zip && !/^[1-9]\d{3}$/.test(input.zip)) errors.zip = v.zip;
  if (!input.agb) errors.agb = v.agb;
  for (const [k, val] of Object.entries(input)) {
    if (val.length > (k === 'note' ? 1000 : 120)) errors[k] = v.tooLong;
  }
  return errors;
}

function normalize(o: any): Order {
  return {
    ...o,
    vat_rate: Number(o.vat_rate),
    created_at: new Date(o.created_at),
    paid_at: o.paid_at ? new Date(o.paid_at) : null,
    shipped_at: o.shipped_at ? new Date(o.shipped_at) : null,
    cancelled_at: o.cancelled_at ? new Date(o.cancelled_at) : null,
    lang: o.lang || 'de',
    items: o.items ?? [],
  };
}

export async function createOrder(input: CheckoutInput, cart: Cart, lang: Locale = 'de'): Promise<Order> {
  for (const it of cart.items) {
    const p = await getProduct(it.product.id);
    if (p && p.stock !== null && p.stock < it.qty) {
      throw new Error(getDict(lang).validation.stock(p.name, p.stock));
    }
  }
  const seqRow = await one<{ n: string | number }>(`SELECT nextval('order_number_seq') AS n`);
  const yy = new Intl.DateTimeFormat('de-CH', { timeZone: 'Europe/Zurich', year: '2-digit' }).format(new Date());
  const number = `${config.shop.orderPrefix}-${yy}-${seqRow!.n}`;
  const token = randomBytes(16).toString('hex');
  const orderId = `(SELECT id FROM orders WHERE number = '${number}')`;

  const queries: Query[] = [
    {
      text: `INSERT INTO orders (number, token, salutation, first_name, last_name, company, street, zip, city, email, phone, note,
               subtotal, shipping, total, vat_rate, vat_amount, lang)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)`,
      params: [
        number, token, input.salutation, input.first_name.trim(), input.last_name.trim(), input.company.trim(),
        input.street.trim(), input.zip.trim(), input.city.trim(), input.email.trim().toLowerCase(), input.phone.trim(), input.note.trim(),
        cart.subtotal, cart.shipping, cart.total, cart.vatRate, cart.vat, lang,
      ],
    },
  ];
  for (const it of cart.items) {
    queries.push({
      text: `INSERT INTO order_items (order_id, product_id, name, weight, unit_price, qty, line_total) VALUES (${orderId}, $1, $2, $3, $4, $5, $6)`,
      params: [it.product.id, it.product.name, it.product.weight, it.product.price, it.qty, it.line],
    });
    queries.push({ text: 'UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock IS NOT NULL', params: [it.qty, it.product.id] });
  }
  queries.push({ text: `INSERT INTO order_log (order_id, message) VALUES (${orderId}, $1)`, params: ['Bestellung eingegangen (Vorauskasse).'] });
  await transaction(queries);
  return (await getOrderByNumber(number))!;
}

async function withItems(o: any): Promise<Order> {
  const items = await query<OrderItem>('SELECT * FROM order_items WHERE order_id = $1 ORDER BY id', [o.id]);
  return normalize({ ...o, items });
}

export async function getOrder(id: number): Promise<Order | null> {
  const o = await one('SELECT * FROM orders WHERE id = $1', [id]);
  return o ? withItems(o) : null;
}

export async function getOrderByNumber(number: string): Promise<Order | null> {
  const o = await one('SELECT * FROM orders WHERE number = $1', [number]);
  return o ? withItems(o) : null;
}

export async function getOrderByNumberToken(number: string, token: string): Promise<Order | null> {
  const o = await getOrderByNumber(number);
  if (!o || !token || o.token.length !== token.length) return null;
  const { timingSafeEqual } = await import('node:crypto');
  return timingSafeEqual(Buffer.from(o.token), Buffer.from(token)) ? o : null;
}

export async function addLog(orderId: number, message: string): Promise<void> {
  await query('INSERT INTO order_log (order_id, message) VALUES ($1, $2)', [orderId, message]);
}

export async function getLogs(orderId: number) {
  return query<{ id: number; created_at: Date; message: string }>(
    'SELECT * FROM order_log WHERE order_id = $1 ORDER BY id DESC',
    [orderId],
  );
}

export async function listOrders(status: string, search: string) {
  const where: string[] = [];
  const params: unknown[] = [];
  if (status === 'todo') where.push(`status IN ('open','paid')`);
  else if ((ORDER_STATUSES as readonly string[]).includes(status)) {
    params.push(status);
    where.push(`status = $${params.length}`);
  }
  if (search) {
    params.push(`%${search}%`);
    const p = `$${params.length}`;
    where.push(`(number ILIKE ${p} OR first_name ILIKE ${p} OR last_name ILIKE ${p} OR email ILIKE ${p} OR company ILIKE ${p} OR city ILIKE ${p})`);
  }
  const rows = await query(
    `SELECT o.*, (SELECT COALESCE(SUM(qty),0)::int FROM order_items i WHERE i.order_id = o.id) AS item_count
     FROM orders o ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY id DESC LIMIT 500`,
    params,
  );
  return rows.map((r) => ({ ...normalize(r), item_count: Number(r.item_count) }));
}

export async function orderCounts() {
  const rows = await query<{ status: string; n: number; t: string | number }>(
    'SELECT status, COUNT(*)::int AS n, COALESCE(SUM(total),0)::bigint AS t FROM orders GROUP BY status',
  );
  const c = { open: 0, paid: 0, shipped: 0, cancelled: 0, openSum: 0, revenue: 0, messages: 0 };
  for (const r of rows) {
    c[r.status as OrderStatus] = r.n;
    if (r.status === 'open') c.openSum = Number(r.t);
    if (r.status === 'paid' || r.status === 'shipped') c.revenue += Number(r.t);
  }
  const m = await one<{ n: number }>('SELECT COUNT(*)::int AS n FROM messages WHERE NOT done');
  c.messages = m?.n ?? 0;
  return c;
}

/** Statuswechsel aus dem Admin. Gibt die aktualisierte Bestellung zurück. */
export async function setOrderStatus(id: number, status: OrderStatus, tracking = ''): Promise<{ before: Order; after: Order }> {
  const before = await getOrder(id);
  if (!before) throw new Error('Bestellung nicht gefunden');
  const sets = ['status = $1'];
  const params: unknown[] = [status];
  if (status === 'paid') sets.push('paid_at = COALESCE(paid_at, now())');
  if (status === 'shipped') {
    sets.push('shipped_at = now()', 'paid_at = COALESCE(paid_at, now())');
    if (tracking) {
      params.push(tracking);
      sets.push(`tracking = $${params.length}`);
    }
  }
  if (status === 'cancelled') sets.push('cancelled_at = now()');
  if (status === 'open') sets.push('paid_at = NULL', 'shipped_at = NULL', 'cancelled_at = NULL');
  params.push(id);

  const queries: Query[] = [{ text: `UPDATE orders SET ${sets.join(', ')} WHERE id = $${params.length}`, params }];
  if (status === 'cancelled' && before.status !== 'cancelled') {
    for (const it of before.items) {
      if (it.product_id) queries.push({ text: 'UPDATE products SET stock = stock + $1 WHERE id = $2 AND stock IS NOT NULL', params: [it.qty, it.product_id] });
    }
  }
  let msg = `Status geändert: ${statusLabel(before.status)} → ${statusLabel(status)}`;
  if (status === 'shipped' && tracking) msg += ` (Sendungsnummer ${tracking})`;
  queries.push({ text: 'INSERT INTO order_log (order_id, message) VALUES ($1, $2)', params: [id, msg] });
  await transaction(queries);
  return { before, after: (await getOrder(id))! };
}
