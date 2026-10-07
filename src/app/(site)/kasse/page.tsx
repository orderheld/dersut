import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { CheckoutForm } from '@/components/CheckoutForm';
import { cartSummary } from '@/lib/cart';
import { chf } from '@/lib/format';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Kasse', robots: { index: false } };

export default async function Kasse() {
  const cart = await cartSummary();
  if (!cart.items.length) redirect('/warenkorb');
  const summary = (
    <>
      <h2>Ihre Bestellung</h2>
      <ul className="summary__items">
        {cart.items.map(({ product: p, qty, line }) => (
          <li key={p.id}><span>{qty} × {p.name}<br /><small>{p.subtitle}</small></span><span>{chf(line)}</span></li>
        ))}
      </ul>
      <div className="summary__row"><span>Zwischensumme</span><span>{chf(cart.subtotal)}</span></div>
      <div className="summary__row"><span>Versand (Post)</span><span>{chf(cart.shipping)}</span></div>
      <div className="summary__row summary__row--total"><span>Total</span><span>{chf(cart.total)}</span></div>
      <p className="summary__vat">inkl. {cart.vatRate} % MWST ({chf(cart.vat)})</p>
    </>
  );
  return (
    <section className="shopflow">
      <div className="wrap">
        <h1>Kasse</h1>
        <CheckoutForm summary={summary} initial={{}} />
      </div>
    </section>
  );
}
