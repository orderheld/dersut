import 'server-only';
import type { Order } from './orders';

/**
 * Online-Zahlung über Payrexx (TWINT, Karten, PostFinance usw., je nach Payrexx-Konto).
 * Env: PAYREXX_INSTANCE (Name der Instanz, z. B. «dersut» aus dersut.payrexx.com) und PAYREXX_API_SECRET.
 * Ob bezahlt wurde, entscheidet nie der Rücksprung oder der Webhook-Inhalt, sondern immer eine Abfrage bei Payrexx.
 */

export type Gateway = { id: number; status: string; link: string; amount: number; currency: string; referenceId?: string };

function instance(): string {
  // Erlaubt auch die Eingabe als «dersut.payrexx.com» oder als ganze URL
  return String(process.env.PAYREXX_INSTANCE ?? '')
    .trim()
    .replace(/^https?:\/\//, '')
    .replace(/\.payrexx\.com.*$/, '')
    .replace(/\/.*$/, '');
}

async function api(method: 'GET' | 'POST', path: string, body?: URLSearchParams): Promise<Gateway> {
  const secret = process.env.PAYREXX_API_SECRET?.trim();
  if (!instance() || !secret) throw new Error('Payrexx ist nicht eingerichtet (PAYREXX_INSTANCE / PAYREXX_API_SECRET fehlen).');
  const base = (process.env.PAYREXX_API_BASE || 'https://api.payrexx.com/v1.0').replace(/\/$/, '');
  const res = await fetch(`${base}/${path}?instance=${encodeURIComponent(instance())}`, {
    method,
    headers: { 'X-API-KEY': secret, ...(body ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {}) },
    body: body?.toString(),
    cache: 'no-store',
    signal: AbortSignal.timeout(15000),
  });
  const json = (await res.json().catch(() => null)) as { status?: string; message?: string; data?: any[] } | null;
  if (!res.ok || json?.status !== 'success' || !json.data?.[0]) {
    throw new Error(`Payrexx: ${json?.message || `HTTP ${res.status}`}`);
  }
  const g = json.data[0];
  return { id: Number(g.id), status: String(g.status), link: String(g.link ?? ''), amount: Number(g.amount), currency: String(g.currency ?? ''), referenceId: g.referenceId };
}

export async function createGateway(o: Order, urls: { success: string; failed: string; cancel: string }): Promise<Gateway> {
  const p = new URLSearchParams({
    amount: String(o.total),
    currency: 'CHF',
    purpose: `Dersut Kaffee Schweiz, Bestellung ${o.number}`,
    referenceId: o.number,
    successRedirectUrl: urls.success,
    failedRedirectUrl: urls.failed,
    cancelRedirectUrl: urls.cancel,
    skipResultPage: '1',
  });
  // Angaben vorausfüllen, damit die Kundschaft nichts doppelt eingeben muss
  const fields: Record<string, string> = {
    email: o.email, forename: o.first_name, surname: o.last_name, company: o.company,
    street: o.street, postcode: o.zip, place: o.city, country: 'CH', phone: o.phone,
  };
  for (const [k, v] of Object.entries(fields)) if (v) p.append(`fields[${k}][value]`, v);
  return api('POST', 'Gateway/', p);
}

export async function getGateway(id: number): Promise<Gateway> {
  return api('GET', `Gateway/${id}/`);
}

/** Gilt als bezahlt, wenn Payrexx die Zahlung bestätigt und Betrag und Bestellnummer stimmen. */
export function isPaid(g: Gateway, o: Order): boolean {
  return g.status === 'confirmed' && g.amount === o.total && g.currency.toUpperCase() === 'CHF' && (!g.referenceId || g.referenceId === o.number);
}
