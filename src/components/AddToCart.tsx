'use client';

import { useActionState, useEffect, useState } from 'react';
import { addToCartAction, type AddState } from '@/app/(site)/actions';
import { Icon } from './Icon';
import { QtyInput } from './QtyInput';

export function AddToCart({ productId, soldOut, detailed = false }: { productId: number; soldOut: boolean; detailed?: boolean }) {
  const [state, action, pending] = useActionState<AddState, FormData>(addToCartAction, { ok: false, n: 0 });
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (state.n > 0) {
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 2600);
      return () => clearTimeout(t);
    }
  }, [state.n]);

  if (soldOut) {
    return detailed ? (
      <div className="alert alert--err">Dieses Produkt ist momentan ausverkauft. Schreiben Sie uns, wir informieren Sie gerne, sobald es wieder verfügbar ist.</div>
    ) : (
      <button className="btn btn--ghost" disabled>Ausverkauft</button>
    );
  }

  const label = flash ? '✓ Hinzugefügt' : (
    <>
      <Icon name="bag" /> In den Warenkorb
    </>
  );

  return (
    <form action={action}>
      <input type="hidden" name="product_id" value={productId} />
      {detailed ? (
        <>
          <div className="buybox">
            <QtyInput name="qty" initial={1} />
            <button className="btn btn--primary btn--lg" type="submit" disabled={pending}>{label}</button>
          </div>
          <button className="btn btn--outline btn--block" type="submit" name="buy_now" value="1" disabled={pending}>Jetzt kaufen</button>
        </>
      ) : (
        <>
          <input type="hidden" name="qty" value="1" />
          <button className="btn btn--primary" type="submit" disabled={pending}>{label}</button>
        </>
      )}
      {flash && (
        <div className="toast is-in" role="status">
          Im Warenkorb. <a href="/warenkorb">Zum Warenkorb</a>
        </div>
      )}
      {state.error && <p className="f__err">{state.error}</p>}
    </form>
  );
}
