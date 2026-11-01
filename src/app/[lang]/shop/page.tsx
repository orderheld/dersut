import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { ProductCard } from '@/components/ProductCard';
import { getDict } from '@/i18n';
import { asLocale, lp } from '@/lib/i18n';
import { getProducts } from '@/lib/products';
import { chf } from '@/lib/format';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { ARTICLES } from '@/content/ratgeber';
import { absolute, breadcrumbLd, jsonLd, pageMeta } from '@/lib/seo';
import { productImage } from '@/lib/brand';
import { onlinePayment } from '@/lib/config';
import type { Locale } from '@/lib/i18n';
import { categoryName, currentSettings } from '@/lib/settings-core';

type Props = { params: Promise<{ lang: string }> };

/** Beratung unter den Produkten: hilft bei der Wahl und verlinkt Ratgeber, Versand und Geschäftskunden */
const GUIDE: Record<Locale, { eyebrow: string; title: string; text: string; intensity: string; shipping: string; gastro: string; office: string; faq: string }> = {
  de: {
    eyebrow: 'Beratung',
    title: 'Welche Dersut Sorte passt zu Ihnen?',
    text: 'Beide Mischungen sind ganze Espressobohnen in der 1-kg-Packung, frisch geröstet in Conegliano und geeignet für Vollautomat, Siebträger und Moka. Der Unterschied liegt im Geschmack und in der Intensität:',
    intensity: 'Intensität',
    shipping: 'Versand & Zahlung',
    gastro: 'Kaffee für Gastronomie & Hotels',
    office: 'Bürokaffee für Firmen',
    faq: 'Häufige Fragen zum Onlineshop',
  },
  fr: {
    eyebrow: 'Conseil',
    title: 'Quel café Dersut vous convient ?',
    text: 'Les deux mélanges sont des grains d’espresso entiers en paquet de 1 kg, torréfiés à Conegliano et adaptés aux machines automatiques, aux machines à porte-filtre et à la moka. La différence se situe dans le goût et l’intensité :',
    intensity: 'Intensité',
    shipping: 'Livraison & paiement',
    gastro: 'Café pour la restauration & l’hôtellerie',
    office: 'Café pour les entreprises',
    faq: 'Questions fréquentes sur la boutique',
  },
  it: {
    eyebrow: 'Consulenza',
    title: 'Quale caffè Dersut fa per voi?',
    text: 'Entrambe le miscele sono caffè in grani interi in confezione da 1 kg, tostati a Conegliano e adatti a macchine automatiche, macchine a leva e moka. La differenza sta nel gusto e nell’intensità:',
    intensity: 'Intensità',
    shipping: 'Spedizione & pagamento',
    gastro: 'Caffè per gastronomia e hotel',
    office: 'Caffè per uffici e aziende',
    faq: 'Domande frequenti sul negozio online',
  },
  en: {
    eyebrow: 'Advice',
    title: 'Which Dersut blend suits you?',
    text: 'Both blends are whole espresso beans in a 1 kg bag, roasted in Conegliano and suitable for bean-to-cup machines, portafilter machines and the moka pot. The difference lies in taste and intensity:',
    intensity: 'Intensity',
    shipping: 'Shipping & payment',
    gastro: 'Coffee for restaurants & hotels',
    office: 'Office coffee for companies',
    faq: 'Frequently asked questions',
  },
};

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
  const g = GUIDE[lang];
  const compare = ARTICLES.find((a) => a.slug === 'optimum-oder-domus');
  const faq = onlinePayment() ? t.product.faq.map((f, i) => (i === 1 ? t.pay.faq : f)) : t.product.faq;
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t.shop.metaTitle,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absolute(lp(lang, `/shop/${p.slug}`)),
      name: `${p.name} ${p.weight}`,
      image: ((im) => (im && !im.startsWith('http') ? absolute(im) : im))(productImage(p.image)),
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd([ld, breadcrumbLd(lang, [[t.nav.shop, '/shop']])])} />
      <PageHero
        lang={lang}
        ld={false}
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
      <section className="section section--cream">
        <div className="wrap shop-guide">
          <div>
            <p className="eyebrow">{g.eyebrow}</p>
            <h2 className="h2">{g.title}</h2>
            <p>{g.text}</p>
            <div className="shop-guide__compare">
              {products.map((p) => (
                <div key={p.id}>
                  <strong><Link href={lp(lang, `/shop/${p.slug}`)}>{p.name}</Link></strong>
                  {p.notes} · {g.intensity} {p.intensity}/5 · {chf(p.price)}
                </div>
              ))}
            </div>
            <div className="shop-guide__links">
              {compare && <Link className="link-arrow" href={lp(lang, `/ratgeber/${compare.slug}`)}>{compare.text[lang].title} <Icon name="arrow" /></Link>}
              <Link className="link-arrow" href={lp(lang, '/versand-zahlung')}>{g.shipping} <Icon name="arrow" /></Link>
              <Link className="link-arrow" href={lp(lang, '/gastronomie')}>{g.gastro} <Icon name="arrow" /></Link>
              <Link className="link-arrow" href={lp(lang, '/firmen')}>{g.office} <Icon name="arrow" /></Link>
            </div>
          </div>
          <div>
            <h2 className="h2" style={{ fontSize: 26 }}>{g.faq}</h2>
            <div className="faq">
              {faq.map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <div>{a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
