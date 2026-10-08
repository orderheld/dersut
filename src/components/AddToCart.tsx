'use client';

import { useActionState, useEffect, useState } from 'react';
import { addToCartAction, type AddState } from '@/app/[lang]/actions';
import { getDict } from '@/i18n';
import { notifyCart } from '@/lib/cart-shared';
import { lp, type Locale } from '@/lib/i18n';
import { Icon } from './Icon';
import { QtyInput } from './QtyInput';

export function AddToCart({ productId, soldOut, lang, detailed = false }: { productId: number; soldOut: boolean; lang: Locale; detailed?: boolean }) {
  const t = getDict(lang).cartBtn;
  const c = getDict(lang).common;
  const [state, action, pending] = useActionState<AddState, FormData>(addToCartAction, { ok: false, n: 0 });
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (state.n > 0) {
      notifyCart();
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 2600);
      return () => clearTimeout(t);
    }
  }, [state.n]);

  if (soldOut) {
    return detailed ? (
      <div className="alert alert--err">{t.soldOutLong}</div>
    ) : (
      <button className="btn btn--ghost" disabled>{c.soldOut}</button>
    );
  }

  const label = flash ? t.added : (
    <>
      <Icon name="bag" /> {t.add}
    </>
  );

  return (
    <form action={action}>
      <input type="hidden" name="product_id" value={productId} />
      <input type="hidden" name="lang" value={lang} />
      {detailed ? (
        <>
          <div className="buybox">
            <QtyInput name="qty" initial={1} lang={lang} />
            <button className="btn btn--primary btn--lg" type="submit" disabled={pending}>{label}</button>
          </div>
          <button className="btn btn--outline btn--block" type="submit" name="buy_now" value="1" disabled={pending}>{t.buyNow}</button>
        </>
      ) : (
        <>
          <input type="hidden" name="qty" value="1" />
          <button className="btn btn--primary" type="submit" disabled={pending}>{label}</button>
        </>
      )}
      {flash && (
        <div className="toast is-in" role="status">
          {t.toast} <a href={lp(lang, '/warenkorb')}>{t.toCart}</a>
        </div>
      )}
      {state.error && <p className="f__err">{state.error}</p>}
    </form>
  );
}
