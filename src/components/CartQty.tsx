'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { setQtyAction } from '@/app/[lang]/actions';
import type { Locale } from '@/lib/i18n';
import { QtyInput } from './QtyInput';

/** Mengenfeld im Warenkorb: speichert jede Änderung sofort. */
export function CartQty({ productId, qty, max, lang }: { productId: number; qty: number; max: number; lang: Locale }) {
  const [pending, start] = useTransition();
  const router = useRouter();
  return (
    <div style={{ opacity: pending ? 0.6 : 1 }}>
      <QtyInput
        name={`qty[${productId}]`}
        initial={qty}
        lang={lang}
        min={0}
        max={max}
        onCommit={(v) => start(async () => { await setQtyAction(productId, v); router.refresh(); })}
      />
    </div>
  );
}
