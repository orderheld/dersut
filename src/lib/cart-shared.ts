/** Lesbares Cookie mit der Anzahl Artikel im Warenkorb (für die Kopfzeile, ohne Inhalt des Warenkorbs). */
export const CART_COUNT_COOKIE = 'dersut_cart_n';

/** Ereignis, mit dem Komponenten der Kopfzeile eine geänderte Anzahl melden. */
export const CART_EVENT = 'dersut:cart';

export function readCartCount(): number {
  if (typeof document === 'undefined') return 0;
  const m = new RegExp(`(?:^|; )${CART_COUNT_COOKIE}=(\\d+)`).exec(document.cookie);
  return m ? Number(m[1]) : 0;
}

/** Kopfzeile neu einlesen lassen (nach einer Änderung am Warenkorb). */
export function notifyCart(count?: number): void {
  window.dispatchEvent(new CustomEvent(CART_EVENT, { detail: count }));
}
