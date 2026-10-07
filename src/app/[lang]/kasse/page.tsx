import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { CheckoutForm } from '@/components/CheckoutForm';
import { cartSummary } from '@/lib/cart';
import { chf } from '@/lib/format';
import { getDict } from '@/i18n';
import { asLocale, lp } from '@/lib/i18n';

export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: getDict(asLocale((await params).lang)).checkout.title, robots: { index: false } };
}

export default async function Kasse({ params }: Props) {
  const lang = asLocale((await params).lang);
  const T = getDict(lang);
  const cart = await cartSummary(lang);
  if (!cart.items.length) redirect(lp(lang, '/warenkorb'));
  const summary = (
    <>
      <h2>{T.checkout.yourOrder}</h2>
      <ul className="summary__items">
        {cart.items.map(({ product: p, qty, line }) => (
          <li key={p.id}><span>{qty} × {p.name}<br /><small>{p.subtitle}</small></span><span>{chf(line)}</span></li>
        ))}
      </ul>
      <div className="summary__row"><span>{T.cart.subtotal}</span><span>{chf(cart.subtotal)}</span></div>
      <div className="summary__row"><span>{T.cart.shipping}</span><span>{chf(cart.shipping)}</span></div>
      <div className="summary__row summary__row--total"><span>{T.cart.total}</span><span>{chf(cart.total)}</span></div>
      <p className="summary__vat">{T.common.inclVatRate(cart.vatRate)} ({chf(cart.vat)})</p>
    </>
  );
  return (
    <section className="shopflow">
      <div className="wrap">
        <h1>{T.checkout.title}</h1>
        <CheckoutForm summary={summary} initial={{}} lang={lang} />
      </div>
    </section>
  );
}
