import type { Metadata } from 'next';
import Link from 'next/link';
import { CartQty } from '@/components/CartQty';
import { CartSync } from '@/components/CartSync';
import { Icon } from '@/components/Icon';
import { Img } from '@/components/Img';
import { cutoutImage, productImage } from '@/lib/brand';
import { cartSummary } from '@/lib/cart';
import { config } from '@/lib/config';
import { chf } from '@/lib/format';
import { getDict } from '@/i18n';
import { asLocale, lp } from '@/lib/i18n';
import { removeFromCartAction, updateCartAction } from '../actions';

export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: getDict(asLocale((await params).lang)).cart.title, robots: { index: false } };
}

export default async function Warenkorb({ params }: Props) {
  const lang = asLocale((await params).lang);
  const T = getDict(lang);
  const t = T.cart;
  const cart = await cartSummary(lang);
  return (
    <section className="shopflow">
      <CartSync count={cart.items.reduce((a, i) => a + i.qty, 0)} />
      <div className="wrap">
        <h1>{t.title}</h1>
        {!cart.items.length ? (
          <div className="empty">
            <Icon name="bag" />
            <h2 className="h3">{t.emptyTitle}</h2>
            <p style={{ color: 'var(--muted)' }}>{t.emptyText}</p>
            <Link className="btn btn--primary" href={lp(lang, '/shop')}>{T.common.toShop}</Link>
          </div>
        ) : (
          <div className="shopgrid">
            <div>
              <form action={updateCartAction} id="cartform">
                <table className="cart-table">
                  <thead><tr><th>{t.product}</th><th>{t.price}</th><th>{t.qty}</th><th style={{ textAlign: 'right' }}>{t.total}</th></tr></thead>
                  <tbody>
                    {cart.items.map(({ product: p, qty, line }) => (
                      <tr key={p.id}>
                        <td>
                          <div className="cart-prod">
                            <div className="cart-prod__img"><Img src={cutoutImage(productImage(p.image))} fallbackSrc={productImage(p.image)} alt={p.name} /></div>
                            <div>
                              <Link href={lp(lang, `/shop/${p.slug}`)}>{p.name}</Link>
                              <small>{p.subtitle}</small>
                              <button className="link-btn" type="submit" form={`rm${p.id}`}>{t.remove}</button>
                            </div>
                          </div>
                        </td>
                        <td data-label={t.price}>{chf(p.price)}</td>
                        <td><CartQty key={`${p.id}-${qty}`} productId={p.id} qty={qty} max={config.shop.maxQty} lang={lang} /></td>
                        <td data-label={t.total} style={{ textAlign: 'right', fontWeight: 600, color: 'var(--ink)' }}>{chf(line)}</td>
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
                <Link className="btn btn--ghost" href={lp(lang, '/shop')}>{t.continue}</Link>
                <noscript><button className="btn btn--ghost" type="submit" form="cartform">{t.update}</button></noscript>
              </div>
            </div>
            <aside className="summary">
              <h2>{t.summary}</h2>
              <div className="summary__row"><span>{t.subtotal}</span><span>{chf(cart.subtotal)}</span></div>
              <div className="summary__row"><span>{t.shippingLong}</span><span>{chf(cart.shipping)}</span></div>
              <div className="summary__row summary__row--total"><span>{t.total}</span><span>{chf(cart.total)}</span></div>
              <p className="summary__vat">{T.common.inclVatRate(cart.vatRate)} ({chf(cart.vat)})</p>
              <Link className="btn btn--primary btn--lg btn--block" href={lp(lang, '/kasse')}><Icon name="lock" /> {t.checkout}</Link>
              <div className="summary__note">
                <Icon name="bank" />
                <span dangerouslySetInnerHTML={{ __html: t.prepayNote }} />
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
