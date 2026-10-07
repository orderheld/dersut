'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { setQtyAction } from '@/app/(site)/actions';
import { QtyInput } from './QtyInput';

/** Mengenfeld im Warenkorb: speichert jede Änderung sofort. */
export function CartQty({ productId, qty, max }: { productId: number; qty: number; max: number }) {
  const [pending, start] = useTransition();
  const router = useRouter();
  return (
    <div style={{ opacity: pending ? 0.6 : 1 }}>
      <QtyInput
        name={`qty[${productId}]`}
        initial={qty}
        min={0}
        max={max}
        onCommit={(v) => start(async () => { await setQtyAction(productId, v); router.refresh(); })}
      />
    </div>
  );
}
