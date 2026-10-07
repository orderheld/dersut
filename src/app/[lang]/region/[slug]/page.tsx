import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Icon } from '@/components/Icon';
import { Img } from '@/components/Img';
import { PageHero } from '@/components/PageHero';
import { ProductCard } from '@/components/ProductCard';
import { RegionLinks } from '@/components/RegionLinks';
import { getRegion, REGION_UI } from '@/content/regions';
import { brand } from '@/lib/brand';
import { asLocale, lp } from '@/lib/i18n';
import { getProducts } from '@/lib/products';
import { absolute, breadcrumbLd, faqLd, jsonLd, pageMeta } from '@/lib/seo';

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: l, slug } = await params;
  const lang = asLocale(l);
  const r = getRegion(slug);
  if (!r) return { robots: { index: false } };
  const t = r.text[lang];
  return pageMeta(lang, `/region/${r.slug}`, t.metaTitle, t.metaDescription, { image: brand(r.img) });
}

export default async function RegionPage({ params }: Props) {
  const { lang: l, slug } = await params;
  const lang = asLocale(l);
  const r = getRegion(slug);
  if (!r) notFound();
  const t = r.text[lang];
  const ui = REGION_UI[lang];
  const products = await getProducts(true, lang);
  const path = `/region/${r.slug}`;
  const url = absolute(lp(lang, path));

  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: t.metaTitle,
      description: t.metaDescription,
      about: { '@id': absolute('/#organization') },
      spatialCoverage: { '@type': 'Place', name: t.name },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: t.metaTitle,
      serviceType: 'Coffee delivery',
      provider: { '@id': absolute('/#organization') },
      areaServed: [...r.areas, ...r.places].map((name) => ({ '@type': 'Place', name })),
    },
    breadcrumbLd(lang, [[t.name, path]]),
    faqLd(t.faq),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(ld)} />
      <PageHero
        lang={lang}
        img={brand(r.img)}
        crumb={t.name}
        eyebrow={ui.eyebrow}
        title={<>{t.title[0]}<br /><em>{t.title[1]}</em></>}
        lead={t.lead}
      />

      <section className="split">
        <div className="wrap split__inner split__inner--top">
          <div className="split__text">
            <h2 className="h2">{t.introTitle}</h2>
            {t.intro.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            <h3 className="region__sub">{t.deliveryTitle}</h3>
            <p>{t.delivery}</p>
          </div>
          <div className="split__text region__places">
            <p className="eyebrow">{ui.placesTitle}</p>
            <ul className="placelist">
              {r.places.map((p) => <li key={p}><Icon name="pin" /> {p}</li>)}
            </ul>
            <p className="region__note">{ui.placesText}</p>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="wrap">
          <header className="section__head">
            <p className="eyebrow">{ui.shopEyebrow}</p>
            <h2 className="h2">{ui.shopTitle}</h2>
          </header>
          <div className="pgrid">{products.map((p) => <ProductCard key={p.id} p={p} lang={lang} />)}</div>
        </div>
      </section>

      <section className="split split--navy">
        <div className="wrap split__inner split__inner--rev">
          <div className="split__media frame frame--gold"><Img src={brand('macchina')} alt="" sizes="(max-width: 900px) 100vw, 50vw" /></div>
          <div className="split__text">
            <p className="eyebrow eyebrow--gold">Horeca · Ufficio</p>
            <h2 className="h2">{t.b2bTitle}</h2>
            <p>{t.b2b}</p>
            <div className="b2b-cards">
              <Link className="b2b-card" href={lp(lang, '/gastronomie')}><Icon name="cup" /><span><strong>{ui.gastro}</strong><small>{ui.gastroText}</small></span><Icon name="arrow" /></Link>
              <Link className="b2b-card" href={lp(lang, '/firmen')}><Icon name="users" /><span><strong>{ui.office}</strong><small>{ui.officeText}</small></span><Icon name="arrow" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <header className="section__head section__head--center"><h2 className="h2">{ui.faqTitle}</h2></header>
          <div className="faq">
            {t.faq.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <div>{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <RegionLinks lang={lang} current={r.slug} />
    </>
  );
}
