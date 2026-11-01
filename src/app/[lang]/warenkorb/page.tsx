import type { Metadata } from 'next';
import Link from 'next/link';
import { CartQty } from '@/components/CartQty';
import { CartSync } from '@/components/CartSync';
import { Icon } from '@/components/Icon';
import { Img } from '@/components/Img';
import { cutoutImage, productImage } from '@/lib/brand';
import { checkoutCart } from '@/lib/testcode';
import { config, onlinePayment } from '@/lib/config';
import { chf } from '@/lib/format';
import { getDict } from '@/i18n';
import { asLocale, lp } from '@/lib/i18n';
import { getProducts, isSoldOut } from '@/lib/products';
import { addFromCartAction, removeFromCartAction, updateCartAction } from '../actions';

export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: getDict(asLocale((await params).lang)).cart.title, robots: { index: false } };
}

export default async function Warenkorb({ params }: Props) {
  const lang = asLocale((await params).lang);
  const T = getDict(lang);
  const t = T.cart;
  const cart = await checkoutCart(lang);
  // Empfehlung: Sorten, die noch nicht im Warenkorb liegen, solange der Gratisversand nicht erreicht ist
  const inCart = new Set(cart.items.map((i) => i.product.id));
  const upsell = cart.shipping ? (await getProducts(true, lang)).filter((p) => !inCart.has(p.id) && !isSoldOut(p)) : [];
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
              {upsell.length > 0 && (
                <section className="upsell" aria-labelledby="upsell-h">
                  <h2 id="upsell-h" className="upsell__h">{t.upsellTitle}</h2>
                  {upsell.map((p) => (
                    <form key={p.id} action={addFromCartAction} className="upsell__item">
                      <input type="hidden" name="product_id" value={p.id} />
                      <input type="hidden" name="lang" value={lang} />
                      <div className="cart-prod__img"><Img src={cutoutImage(productImage(p.image))} fallbackSrc={productImage(p.image)} alt="" /></div>
                      <div className="upsell__txt">
                        <Link href={lp(lang, `/shop/${p.slug}`)}>{p.name}</Link>
                        <small>{p.notes} · {chf(p.price)}</small>
                      </div>
                      <button className="btn btn--outline btn--sm" type="submit"><Icon name="bag" /> {t.upsellAdd}</button>
                    </form>
                  ))}
                </section>
              )}
            </div>
            <div className="summary">
              <h2>{t.summary}</h2>
              <div className="summary__row"><span>{t.subtotal}</span><span>{chf(cart.subtotal)}</span></div>
              <div className="summary__row"><span>{t.shippingLong}</span><span>{cart.shipping ? chf(cart.shipping) : t.free}</span></div>
              {cart.discount ? <div className="summary__row summary__row--test"><span>{T.cart.discount}</span><span>– {chf(cart.discount)}</span></div> : null}
              {!cart.isTest && <p className={`summary__free${cart.shipping ? '' : ' is-done'}`}>
                <Icon name="truck" />
                {cart.shipping ? t.freeHint(chf(config.shop.freeShippingFrom - cart.subtotal)) : t.freeReached}
              </p>}
              <div className="summary__row summary__row--total"><span>{t.total}</span><span>{chf(cart.total)}</span></div>
              <p className="summary__vat">{T.common.inclVatRate(cart.vatRate)} ({chf(cart.vat)})</p>
              <Link className="btn btn--primary btn--lg btn--block" href={lp(lang, '/kasse')}><Icon name="lock" /> {t.checkout}</Link>
              <div className="summary__note">
                <Icon name={onlinePayment() ? 'lock' : 'bank'} />
                <span dangerouslySetInnerHTML={{ __html: onlinePayment() ? T.pay.cartNote : t.prepayNote }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
