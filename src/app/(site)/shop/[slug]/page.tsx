import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';
import { AddToCart } from '@/components/AddToCart';
import { Icon } from '@/components/Icon';
import { Img } from '@/components/Img';
import { ProductCard } from '@/components/ProductCard';
import { productImage } from '@/lib/brand';
import { config } from '@/lib/config';
import { chf } from '@/lib/format';
import { getProductBySlug, getProducts, isSoldOut } from '@/lib/products';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProductBySlug((await params).slug);
  if (!p) return { title: 'Produkt nicht gefunden' };
  return {
    title: `${p.name} ${p.weight}`,
    description: p.description.slice(0, 155),
    openGraph: { images: [productImage(p.image)] },
  };
}

export default async function ProductPage({ params }: Props) {
  const p = await getProductBySlug((await params).slug);
  if (!p) notFound();
  const others = (await getProducts()).filter((x) => x.id !== p.id);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${p.name} ${p.weight}`,
    description: p.description,
    image: productImage(p.image),
    brand: { '@type': 'Brand', name: 'Dersut Caffè' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'CHF',
      price: (p.price / 100).toFixed(2),
      availability: isSoldOut(p) ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: config.company.name },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <div className="wrap" style={{ '--accent': p.accent } as CSSProperties}>
        <div className="pd">
          <div className="pd__media">
            <span className="pcard__badge">{p.line}</span>
            <Img src={productImage(p.image)} alt={`${p.name} ${p.weight}`} eager />
            <span className="pcard__fallback" aria-hidden="true"><span>{p.line}</span><small>{p.weight}</small></span>
          </div>
          <div>
            <nav className="pd__crumbs"><Link href="/">Startseite</Link> / <Link href="/shop">Shop</Link> / {p.name}</nav>
            <h1>{p.name}</h1>
            <p className="pd__sub">{p.subtitle}</p>
            <div className="pd__price">
              <span className="price">{chf(p.price)}</span>
              <span>inkl. {config.shop.vatRate} % MWST · zzgl. Versand {chf(config.shop.shipping)}</span>
            </div>
            <div className="pd__desc">
              {p.description.split(/\n+/).map((para, i) => <p key={i}>{para}</p>)}
            </div>
            <dl className="pd__specs">
              <div><dt>Mischung</dt><dd>{p.blend}</dd></div>
              <div><dt>Inhalt</dt><dd>{p.weight} ganze Bohnen</dd></div>
              <div><dt>Geschmack</dt><dd>{p.notes}</dd></div>
              <div>
                <dt>Intensität</dt>
                <dd>
                  <div className="intensity" style={{ margin: '4px 0 0' }}>
                    {[1, 2, 3, 4, 5].map((i) => <span key={i} className={`intensity__dot${i <= p.intensity ? ' is-on' : ''}`} />)}
                  </div>
                </dd>
              </div>
              <div><dt>Herkunft</dt><dd>Geröstet in Conegliano, Italien</dd></div>
              <div><dt>Ideal für</dt><dd>Siebträger &amp; Vollautomat</dd></div>
            </dl>
            <AddToCart productId={p.id} soldOut={isSoldOut(p)} detailed />
            <ul className="pd__assure">
              <li><Icon name="shield" /> Originalware vom offiziellen Vertrieb Schweiz</li>
              <li><Icon name="truck" /> Postversand in die ganze Schweiz, pauschal {chf(config.shop.shipping)}</li>
              <li><Icon name="bank" /> Zahlung per Vorauskasse, Versand nach Zahlungseingang</li>
            </ul>
          </div>
        </div>
      </div>
      {others.length > 0 && (
        <section className="section section--cream">
          <div className="wrap">
            <header className="section__head"><p className="eyebrow">Ebenfalls im Sortiment</p><h2 className="h2">Das könnte Ihnen auch schmecken</h2></header>
            <div className="pgrid">{others.map((o) => <ProductCard key={o.id} p={o} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
