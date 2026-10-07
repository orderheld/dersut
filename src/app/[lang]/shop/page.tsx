import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { ProductCard } from '@/components/ProductCard';
import { getDict } from '@/i18n';
import { asLocale, lp } from '@/lib/i18n';
import { getProducts } from '@/lib/products';
import { absolute, jsonLd, pageMeta } from '@/lib/seo';
import { productImage } from '@/lib/brand';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  const t = getDict(lang).shop;
  return pageMeta(lang, '/shop', t.metaTitle, t.metaDescription);
}

export default async function Shop({ params }: Props) {
  const lang = asLocale((await params).lang);
  const t = getDict(lang);
  const products = await getProducts(true, lang);
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t.shop.metaTitle,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absolute(lp(lang, `/shop/${p.slug}`)),
      name: `${p.name} ${p.weight}`,
      image: productImage(p.image),
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(ld)} />
      <PageHero
        lang={lang}
        crumb={t.nav.shop}
        eyebrow={t.shop.eyebrow}
        title={<span dangerouslySetInnerHTML={{ __html: t.shop.heading }} />}
        lead={t.shop.lead}
      />
      <section className="section">
        <div className="wrap">
          <div className="pgrid">
            {products.map((p) => <ProductCard key={p.id} p={p} lang={lang} />)}
          </div>
          <p className="center" style={{ marginTop: 50, color: 'var(--muted)' }}>{t.shop.more}</p>
        </div>
      </section>
    </>
  );
}
