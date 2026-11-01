import { shipText } from '@/lib/shipping-text';
import { settingsReady } from '@/lib/db';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Img } from '@/components/Img';
import { PageHero } from '@/components/PageHero';
import { ARTICLES, RATGEBER_PAGE } from '@/content/ratgeber';
import { brand } from '@/lib/brand';
import { asLocale, lp } from '@/lib/i18n';
import { absolute, breadcrumbLd, jsonLd, pageMeta } from '@/lib/seo';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await settingsReady();
  const lang = asLocale((await params).lang);
  const t = RATGEBER_PAGE[lang];
  return pageMeta(lang, '/ratgeber', t.metaTitle, t.metaDescription, { image: brand('macchina') });
}

export default async function Ratgeber({ params }: Props) {
  await settingsReady();
  const lang = asLocale((await params).lang);
  const t = RATGEBER_PAGE[lang];
  const ld = [
    breadcrumbLd(lang, [[t.crumb, '/ratgeber']]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: ARTICLES.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: absolute(lp(lang, `/ratgeber/${a.slug}`)), name: a.text[lang].title })),
    },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(ld)} />
      <PageHero ld={false} lang={lang} crumb={t.crumb} eyebrow={t.crumb} title={t.title} lead={t.lead} />
      <section className="section">
        <div className="wrap guides">
          {ARTICLES.map((a) => {
            const x = shipText(a.text[lang]);
            const href = lp(lang, `/ratgeber/${a.slug}`);
            return (
              <article className="guide-card" key={a.slug}>
                <Link href={href} className="guide-card__img" tabIndex={-1} aria-hidden="true"><Img src={brand(a.image)} alt="" /></Link>
                <div className="guide-card__body">
                  <h2 className="h3"><Link href={href}>{x.title}</Link></h2>
                  <p>{x.teaser}</p>
                  <Link className="link-arrow" href={href}>{t.readMore} →</Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
