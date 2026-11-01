import type { Metadata } from 'next';
import { settingsReady } from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Icon } from '@/components/Icon';
import { ProductCard } from '@/components/ProductCard';
import { ShopHead } from '@/components/ShopHead';
import { categoryIntro } from '@/content/categories';
import { getDict } from '@/i18n';
import { productImage } from '@/lib/brand';
import { shopCategories } from '@/lib/categories';
import { asLocale, lp, type Locale } from '@/lib/i18n';
import { getProducts } from '@/lib/products';
import { absolute, breadcrumbLd, jsonLd, pageMeta } from '@/lib/seo';
import { fillShipping } from '@/lib/shipping-text';

type Props = { params: Promise<{ lang: string; cat: string }> };

const TITLE: Record<Locale, (name: string) => string> = {
  de: (n) => `${n} von Dersut online kaufen – Schweiz`,
  fr: (n) => `${n} Dersut en ligne – Suisse`,
  it: (n) => `${n} Dersut online – Svizzera`,
  en: (n) => `Buy Dersut ${n.toLowerCase()} online – Switzerland`,
};
const FREE: Record<Locale, string> = {
  de: 'Gratis Versand ab {free}.',
  fr: 'Livraison offerte dès {free}.',
  it: 'Spedizione gratuita da {free}.',
  en: 'Free shipping from {free}.',
};
const BACK: Record<Locale, string> = { de: 'Alle Produkte ansehen', fr: 'Voir tous les produits', it: 'Vedi tutti i prodotti', en: 'See all products' };

async function load(params: Props['params']) {
  const { lang: l, cat } = await params;
  const lang = asLocale(l);
  const products = await getProducts(true, lang);
  const cats = shopCategories(products, lang);
  const c = cats.find((x) => x.slug === cat);
  return { lang, products, cats, c, items: c ? products.filter((p) => p.category === c.slug) : [] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await settingsReady();
  const { lang, c, items } = await load(params);
  if (!c) return { title: getDict(lang).nav.shop, robots: { index: false } };
  const desc = `${categoryIntro(c, lang)} ${fillShipping(FREE[lang])}`.trim();
  return pageMeta(lang, `/shop/kategorie/${c.slug}`, TITLE[lang](c.name), desc.length > 160 ? `${desc.slice(0, 157)}…` : desc, { image: items[0] ? productImage(items[0].image) : undefined, pack: !!items[0] });
}

export default async function CategoryPage({ params }: Props) {
  await settingsReady();
  const { lang, products, cats, c, items } = await load(params);
  if (!c) notFound();
  const t = getDict(lang);
  const path = `/shop/kategorie/${c.slug}`;
  const intro = categoryIntro(c, lang);
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: c.name,
    description: intro,
    url: absolute(lp(lang, path)),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: absolute(lp(lang, `/shop/${p.slug}`)), name: `${p.name} ${p.weight}` })),
    },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd([ld, breadcrumbLd(lang, [[t.nav.shop, '/shop'], [c.name, path]])])} />
      <ShopHead lang={lang} crumbs={[[t.nav.shop, '/shop'], [c.name]]} title={c.name} lead={fillShipping(FREE[lang])} cats={cats} active={c.slug} total={products.length} />
      <section className="section shop-list">
        <div className="wrap">
          <div className="pgrid">
            {items.map((p) => <ProductCard key={p.id} p={p} lang={lang} level={2} />)}
          </div>
          {intro && <p className="catintro">{intro}</p>}
          {cats.length > 1 || items.length < products.length ? (
            <p className="center" style={{ marginTop: 30 }}><Link className="link-arrow" href={lp(lang, '/shop')}>{BACK[lang]} <Icon name="arrow" /></Link></p>
          ) : null}
        </div>
      </section>
    </>
  );
}
