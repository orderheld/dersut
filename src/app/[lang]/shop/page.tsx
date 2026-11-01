import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { ProductCard } from '@/components/ProductCard';
import { getDict } from '@/i18n';
import { asLocale, lp } from '@/lib/i18n';
import { getProducts } from '@/lib/products';
import { absolute, jsonLd, pageMeta } from '@/lib/seo';
import { productImage } from '@/lib/brand';
import { categoryName, currentSettings } from '@/lib/settings-core';

type Props = { params: Promise<{ lang: string }> };

const OTHER: Record<string, string> = { de: 'Weitere Produkte', fr: 'Autres produits', it: 'Altri prodotti', en: 'More products' };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  const t = getDict(lang).shop;
  return pageMeta(lang, '/shop', t.metaTitle, t.metaDescription);
}

export default async function Shop({ params }: Props) {
  const lang = asLocale((await params).lang);
  const t = getDict(lang);
  const products = await getProducts(true, lang);
  // Nach Kategorie gruppieren, sobald mindestens zwei Kategorien belegt sind (Reihenfolge wie in den Einstellungen)
  const order = currentSettings().categories.map((c) => c.slug);
  const groups = [...order, '']
    .map((slug) => ({ slug, items: products.filter((p) => (order.includes(p.category) ? p.category : '') === slug) }))
    .filter((g) => g.items.length);
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
          {groups.length > 1 ? (
            groups.map((g) => (
              <div key={g.slug || 'other'} className="pgroup">
                <h2 className="pgroup__title">{g.slug ? categoryName(g.slug, lang) : OTHER[lang]}</h2>
                <div className="pgrid">
                  {g.items.map((p) => <ProductCard key={p.id} p={p} lang={lang} level={3} />)}
                </div>
              </div>
            ))
          ) : (
            <div className="pgrid">
              {products.map((p) => <ProductCard key={p.id} p={p} lang={lang} level={2} />)}
            </div>
          )}
          <p className="center" style={{ marginTop: 50, color: 'var(--muted)' }}>{t.shop.more}</p>
        </div>
      </section>
    </>
  );
}
