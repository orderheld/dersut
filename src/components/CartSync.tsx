'use client';

import { useEffect } from 'react';
import { notifyCart } from '@/lib/cart-shared';

/** Meldet der Kopfzeile die vom Server bekannte Anzahl Artikel (Warenkorb, Kasse, Bestellbestätigung). */
export function CartSync({ count }: { count: number }) {
  useEffect(() => notifyCart(count), [count]);
  return null;
}
