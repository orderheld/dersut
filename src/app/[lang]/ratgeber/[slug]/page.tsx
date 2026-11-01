import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/PageHero';
import { ProductCard } from '@/components/ProductCard';
import { RichText, plainText } from '@/components/RichText';
import { ARTICLES, RATGEBER_PAGE, withOnlinePayment } from '@/content/ratgeber';
import { brand } from '@/lib/brand';
import { config, onlinePayment } from '@/lib/config';
import { LOCALE_TAGS, asLocale, lp } from '@/lib/i18n';
import { getProducts } from '@/lib/products';
import { absolute, breadcrumbLd, faqLd, jsonLd, pageMeta } from '@/lib/seo';

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: l, slug } = await params;
  const lang = asLocale(l);
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) return { robots: { index: false } };
  const x = a.text[lang];
  return pageMeta(lang, `/ratgeber/${a.slug}`, x.metaTitle, x.metaDescription, { image: brand(a.image), type: 'article' });
}

export default async function Article({ params }: Props) {
  const { lang: l, slug } = await params;
  const lang = asLocale(l);
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) notFound();
  const x = onlinePayment() ? withOnlinePayment(a.text[lang]) : a.text[lang];
  const t = RATGEBER_PAGE[lang];
  const products = (await getProducts(true, lang)).filter((p) => a.products.includes(p.slug));
  const others = ARTICLES.filter((o) => o.slug !== a.slug);
  const url = absolute(lp(lang, `/ratgeber/${a.slug}`));

  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: x.title,
      description: x.metaDescription,
      image: [brand(a.image)],
      datePublished: a.published,
      dateModified: a.published,
      inLanguage: LOCALE_TAGS[lang],
      mainEntityOfPage: url,
      author: { '@type': 'Organization', name: config.company.name, url: absolute('/') },
      publisher: { '@id': absolute('/#organization') },
    },
    breadcrumbLd(lang, [[t.crumb, '/ratgeber'], [x.title, `/ratgeber/${a.slug}`]]),
    faqLd(x.faq.map(([q, ans]) => [q, plainText(ans)])),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(ld)} />
      <PageHero ld={false} lang={lang} img={brand(a.image)} crumb={t.crumb} eyebrow={t.crumb} title={x.title} lead={<RichText text={x.lead} lang={lang} />} />
      <article className="section">
        <div className="wrap prose guide">
          {x.sections.map((s) => (
            <section key={s.h}>
              <h2 className="h3">{s.h}</h2>
              {s.p.map((para, i) => <p key={i}><RichText text={para} lang={lang} /></p>)}
              {s.list && <ul>{s.list.map((li, i) => <li key={i}><RichText text={li} lang={lang} /></li>)}</ul>}
            </section>
          ))}
          {x.faq.length > 0 && (
            <section className="guide__faq">
              <h2 className="h3">FAQ</h2>
              {x.faq.map(([q, ans]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p><RichText text={ans} lang={lang} /></p>
                </details>
              ))}
            </section>
          )}
        </div>
      </article>
      {products.length > 0 && (
        <section className="section section--cream">
          <div className="wrap">
            <header className="section__head section__head--center">
              <h2 className="h2">{x.cta}</h2>
            </header>
            <div className="pgrid">
              {products.map((p) => <ProductCard key={p.id} p={p} lang={lang} />)}
            </div>
          </div>
        </section>
      )}
      <section className="section">
        <div className="wrap">
          <h2 className="h3">{t.related}</h2>
          <ul className="guide-links">
            {others.map((o) => <li key={o.slug}><Link href={lp(lang, `/ratgeber/${o.slug}`)}>{o.text[lang].title}</Link></li>)}
          </ul>
        </div>
      </section>
    </>
  );
}
