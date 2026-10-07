import type { Metadata } from 'next';
import Link from 'next/link';
import { CartQty } from '@/components/CartQty';
import { Icon } from '@/components/Icon';
import { Img } from '@/components/Img';
import { productImage } from '@/lib/brand';
import { cartSummary } from '@/lib/cart';
import { config } from '@/lib/config';
import { chf } from '@/lib/format';
import { removeFromCartAction, updateCartAction } from '../actions';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Warenkorb', robots: { index: false } };

export default async function Warenkorb() {
  const cart = await cartSummary();
  return (
    <section className="shopflow">
      <div className="wrap">
        <h1>Warenkorb</h1>
        {!cart.items.length ? (
          <div className="empty">
            <Icon name="bag" />
            <h2 className="h3">Ihr Warenkorb ist noch leer</h2>
            <p style={{ color: 'var(--muted)' }}>Entdecken Sie unsere Espressobohnen aus Conegliano.</p>
            <Link className="btn btn--primary" href="/shop">Zum Shop</Link>
          </div>
        ) : (
          <div className="shopgrid">
            <div>
              <form action={updateCartAction} id="cartform">
                <table className="cart-table">
                  <thead><tr><th>Produkt</th><th>Preis</th><th>Menge</th><th style={{ textAlign: 'right' }}>Total</th></tr></thead>
                  <tbody>
                    {cart.items.map(({ product: p, qty, line }) => (
                      <tr key={p.id}>
                        <td>
                          <div className="cart-prod">
                            <div className="cart-prod__img"><Img src={productImage(p.image)} alt={p.name} /></div>
                            <div>
                              <Link href={`/shop/${p.slug}`}>{p.name}</Link>
                              <small>{p.subtitle}</small>
                              <button className="link-btn" type="submit" form={`rm${p.id}`}>Entfernen</button>
                            </div>
                          </div>
                        </td>
                        <td data-label="Preis">{chf(p.price)}</td>
                        <td><CartQty key={`${p.id}-${qty}`} productId={p.id} qty={qty} max={config.shop.maxQty} /></td>
                        <td data-label="Total" style={{ textAlign: 'right', fontWeight: 600, color: 'var(--ink)' }}>{chf(line)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </form>
              {cart.items.map(({ product: p }) => (
                <form key={p.id} action={removeFromCartAction} id={`rm${p.id}`} hidden>
                  <input type="hidden" name="product_id" value={p.id} />
                </form>
              ))}
              <div className="cart-actions">
                <Link className="btn btn--ghost" href="/shop">Weiter einkaufen</Link>
                <button className="btn btn--ghost" type="submit" form="cartform">Warenkorb aktualisieren</button>
              </div>
            </div>
            <aside className="summary">
              <h2>Zusammenfassung</h2>
              <div className="summary__row"><span>Zwischensumme</span><span>{chf(cart.subtotal)}</span></div>
              <div className="summary__row"><span>Versand (Post, ganze Schweiz)</span><span>{chf(cart.shipping)}</span></div>
              <div className="summary__row summary__row--total"><span>Total</span><span>{chf(cart.total)}</span></div>
              <p className="summary__vat">inkl. {cart.vatRate} % MWST ({chf(cart.vat)})</p>
              <Link className="btn btn--primary btn--lg btn--block" href="/kasse"><Icon name="lock" /> Zur Kasse</Link>
              <div className="summary__note">
                <Icon name="bank" />
                <span>Zahlung per <strong>Vorauskasse</strong>: Nach der Bestellung erhalten Sie die Bankverbindung und Ihre Bestellnummer. Wir versenden nach Zahlungseingang.</span>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
