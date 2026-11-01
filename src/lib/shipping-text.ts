import { config } from './config';
import { chf } from './format';

/**
 * Versandbeträge in Texten: Statt fester Beträge stehen in den Texten die Platzhalter {ship} (Versandpauschale)
 * und {free} (Gratisversand ab). Sie werden beim Anzeigen mit den Werten aus Admin → Firma & Shop ersetzt,
 * so stimmen alle Seiten in allen Sprachen automatisch, wenn die Beträge geändert werden.
 */
export const chfShort = (rappen: number) => (rappen % 100 === 0 ? `CHF ${chf(rappen, false).slice(0, -3)}.–` : chf(rappen));

export function fillShipping(s: string): string {
  if (!s.includes('{')) return s;
  const val = (k: string) => chfShort(k === 'ship' ? config.shop.shipping : config.shop.freeShippingFrom);
  // «CHF 100.–.» vermeiden: Satzpunkt nach einem Betrag mit «.–» weglassen
  return s.replace(/\{(ship|free)\}(\.(?!\d))?/g, (_, k: string, dot?: string) => {
    const v = val(k);
    return dot && !v.endsWith('–') ? v + dot : v;
  });
}

const memo = new WeakMap<object, { key: string; value: unknown }>();

function deep(x: unknown, key: string): unknown {
  if (typeof x === 'string') return fillShipping(x);
  if (typeof x === 'function') return (...a: unknown[]) => deep((x as (...a: unknown[]) => unknown)(...a), key);
  if (!x || typeof x !== 'object') return x;
  const proto = Object.getPrototypeOf(x);
  if (!Array.isArray(x) && proto !== Object.prototype && proto !== null) return x; // z. B. React-Elemente, Datum
  if ('$$typeof' in x) return x;
  const hit = memo.get(x);
  if (hit && hit.key === key) return hit.value;
  const value = Array.isArray(x) ? x.map((v) => deep(v, key)) : Object.fromEntries(Object.entries(x).map(([k, v]) => [k, deep(v, key)]));
  memo.set(x, { key, value });
  return value;
}

/** Ersetzt {ship} und {free} in allen Texten eines Objekts (auch in Text-Funktionen). Ergebnis wird zwischengespeichert. */
export function shipText<T>(x: T): T {
  return deep(x, `${config.shop.shipping}|${config.shop.freeShippingFrom}`) as T;
}
