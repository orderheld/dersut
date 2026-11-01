import 'server-only';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { one, query } from './db';
import { config } from './config';
import { vatFromGross } from './format';
import { cartSummary, type Cart } from './cart';
import type { Locale } from './i18n';

/**
 * Geheimer Testcode für Probebestellungen: Wer den Testlink aus dem Admin öffnet, bezahlt für die
 * ganze Bestellung nur CHF 0.05 (gratis Versand). So lässt sich die Online-Zahlung mit echtem Geld testen.
 * Der Code liegt in app_settings («testcode»), ist zufällig (nicht erratbar) und im Admin ein- und ausschaltbar.
 * Ausgeschaltet oder neu erzeugt, wirken alte Links sofort nicht mehr.
 */
const KEY = 'testcode';
export const TEST_COOKIE = 'dersut_test';
/** Betrag einer Testbestellung in Rappen */
export const TEST_TOTAL = 5;

export type TestCode = { enabled: boolean; code: string };

export async function getTestCode(): Promise<TestCode> {
  const row = await one<{ value: string }>('SELECT value FROM app_settings WHERE key = $1', [KEY]);
  try {
    const v = row ? (JSON.parse(row.value) as Partial<TestCode>) : {};
    return { enabled: !!v.enabled && typeof v.code === 'string' && v.code.length >= 20, code: String(v.code ?? '') };
  } catch {
    return { enabled: false, code: '' };
  }
}

export async function saveTestCode(enabled: boolean, renew: boolean): Promise<TestCode> {
  const cur = await getTestCode();
  const code = renew || cur.code.length < 20 ? `TEST-${randomBytes(15).toString('base64url')}` : cur.code;
  const next = { enabled, code };
  await query(`INSERT INTO app_settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`, [KEY, JSON.stringify(next)]);
  return next;
}

/** Prüft einen Code gegen den aktiven Testcode (zeitkonstant). */
export async function isValidTestCode(code: string | undefined | null): Promise<boolean> {
  if (!code) return false;
  const t = await getTestCode();
  if (!t.enabled) return false;
  const a = Buffer.from(code);
  const b = Buffer.from(t.code);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Ist in diesem Browser der Testmodus aktiv (Testlink geöffnet und Code noch gültig)? */
export async function testModeActive(): Promise<boolean> {
  return isValidTestCode((await cookies()).get(TEST_COOKIE)?.value);
}

/** Warenkorb auf CHF 0.05 reduzieren: Versand gratis, Rest als Testrabatt. */
export function applyTestDiscount(cart: Cart): Cart {
  if (!cart.items.length || cart.subtotal <= TEST_TOTAL) return cart;
  return {
    ...cart,
    shipping: 0,
    discount: cart.subtotal - TEST_TOTAL,
    total: TEST_TOTAL,
    vat: vatFromGross(TEST_TOTAL, config.shop.vatRate),
    isTest: true,
  };
}

/** Warenkorb wie in der Kasse: mit Testrabatt, wenn der Testmodus in diesem Browser aktiv ist. */
export async function checkoutCart(lang: Locale = 'de'): Promise<Cart> {
  const cart = await cartSummary(lang);
  return (await testModeActive()) ? applyTestDiscount(cart) : cart;
}
