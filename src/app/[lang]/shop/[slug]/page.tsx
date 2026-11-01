import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';
import { AddToCart } from '@/components/AddToCart';
import { Icon } from '@/components/Icon';
import { Img } from '@/components/Img';
import { ProductCard } from '@/components/ProductCard';
import { ProductGallery, type GalleryImage } from '@/components/ProductGallery';
import { getDict } from '@/i18n';
import { brand, cutoutImage, productImage } from '@/lib/brand';
import { config, onlinePayment } from '@/lib/config';
import { chf } from '@/lib/format';
import { LOCALE_TAGS, asLocale, lp } from '@/lib/i18n';
import { getProductBySlug, getProducts, isSoldOut, type LocalizedProduct } from '@/lib/products';
import { absolute, jsonLd, pageMeta, returnPolicyLd } from '@/lib/seo';
import { ARTICLES, RATGEBER_PAGE } from '@/content/ratgeber';
import { AWARD_TEXT, awardsOf, latestMedal } from '@/content/awards';
import { Medal } from '@/components/Medal';

const AROMA: Record<string, string> = { de: 'Aromen', fr: 'Arômes', it: 'Aromi', en: 'Aromas' };
const AWARDS_LINK: Record<string, string> = { de: 'Alle Zertifizierungen & Auszeichnungen', fr: 'Toutes les certifications & distinctions', it: 'Tutte le certificazioni e i premi', en: 'All certifications & awards' };


type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return [];
}

function galleryOf(p: LocalizedProduct): GalleryImage[] {
  return p.images
    .map((key, n) => {
      const src = productImage(key);
      const pack = n === 0 || key.startsWith('brand:prod_');
      return { src, alt: n === 0 ? `${p.name} ${p.weight}` : `${p.name} – ${p.notes}`, pack, cut: pack && src ? cutoutImage(src) : undefined };
    })
    .filter((im) => im.src);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: l, slug } = await params;
  const lang = asLocale(l);
  const p = await getProductBySlug(slug, lang);
  if (!p) return { title: getDict(lang).product.notFound, robots: { index: false } };
  return pageMeta(lang, `/shop/${p.slug}`, p.seoTitle, p.seoDescription, { image: productImage(p.image), pack: true });
}

export default async function ProductPage({ params }: Props) {
  const { lang: l, slug } = await params;
  const lang = asLocale(l);
  const t = getDict(lang);
  const tp = t.product;
  const online = onlinePayment();
  const faq = online ? tp.faq.map((f, i) => (i === 1 ? t.pay.faq : f)) : tp.faq;
  const assure = online ? tp.assure.map((a) => (a[0] === 'bank' ? t.pay.assure : a)) : tp.assure;
  const p = await getProductBySlug(slug, lang);
  if (!p) notFound();
  const others = (await getProducts(true, lang)).filter((x) => x.id !== p.id);
  const images = galleryOf(p);
  const url = absolute(lp(lang, `/shop/${p.slug}`));
  const soldOut = isSoldOut(p);
  const guides = ARTICLES.filter((g) => g.products.includes(p.slug)).slice(0, 3);
  const nextYear = `${new Date().getFullYear() + 1}-12-31`;
  const awards = awardsOf(p.slug);
  const medal = latestMedal(p.slug);
  const at = AWARD_TEXT[lang];
  const aromas = p.notes.split(/,\s*/).filter(Boolean);

  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': `${url}#product`,
      name: `${p.name} ${p.weight}`,
      description: [p.description, p.details].filter(Boolean).join('\n\n'),
      image: images.map((im) => im.src),
      sku: p.slug,
      category: 'Food, Beverages & Tobacco > Beverages > Coffee',
      brand: { '@type': 'Brand', name: 'Dersut Caffè' },
      manufacturer: { '@type': 'Organization', name: 'Dersut Caffè S.p.A.', address: { '@type': 'PostalAddress', addressLocality: 'Conegliano', addressCountry: 'IT' } },
      countryOfOrigin: 'IT',
      ...(awards.length ? { award: awards.map((a) => [a.title, a.years.join(', '), a.by].filter(Boolean).join(' · ')) } : {}),
      inLanguage: LOCALE_TAGS[lang],
      weight: { '@type': 'QuantitativeValue', value: parseFloat(p.weight) || 1, unitCode: 'KGM' },
      additionalProperty: [
        { '@type': 'PropertyValue', name: tp.blend, value: p.blend },
        { '@type': 'PropertyValue', name: tp.taste, value: p.notes },
        { '@type': 'PropertyValue', name: tp.intensity, value: `${p.intensity}/5` },
      ],
      offers: {
        '@type': 'Offer',
        url,
        priceCurrency: 'CHF',
        price: (p.price / 100).toFixed(2),
        priceValidUntil: nextYear,
        itemCondition: 'https://schema.org/NewCondition',
        availability: soldOut ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
        seller: { '@id': absolute('/#organization'), '@type': 'Organization', name: config.company.name },
        hasMerchantReturnPolicy: returnPolicyLd(),
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: { '@type': 'MonetaryAmount', value: (config.shop.shipping / 100).toFixed(2), currency: 'CHF' },
          shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'CH' },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 2, unitCode: 'DAY' },
            transitTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 2, unitCode: 'DAY' },
          },
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t.nav.home, item: absolute(lp(lang, '/')) },
        { '@type': 'ListItem', position: 2, name: t.nav.shop, item: absolute(lp(lang, '/shop')) },
        { '@type': 'ListItem', position: 3, name: p.name, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(ld)} />
      <div style={{ '--accent': p.accent } as CSSProperties}>
        <div className="wrap">
          <div className="pd">
            <ProductGallery
              images={images}
              badge={p.line}
              fallback={[p.line, p.weight]}
              labels={{ gallery: t.a11y.gallery, show: images.map((_, n) => t.a11y.showImage(n + 1)), prev: t.a11y.prevImage, next: t.a11y.nextImage }}
              medal={medal ? <Medal year={medal} label={at.medal(medal)} className="medal--stage" /> : undefined}
            />
            <div className="pd__info">
              <nav className="pd__crumbs" aria-label={t.a11y.breadcrumbs}>
                <Link href={lp(lang, '/')}>{t.nav.home}</Link> / <Link href={lp(lang, '/shop')}>{t.nav.shop}</Link> / {p.name}
              </nav>
              <p className="pd__brand">Dersut Caffè · Conegliano</p>
              <h1>{p.name}</h1>
              <p className="pd__sub">{p.subtitle}</p>
              {medal && (
                <a className="pd__award" href="#auszeichnungen">
                  <Icon name="award" /> <span>{at.medal(medal)}</span>
                </a>
              )}
              <div className="pd__price">
                <span className="price">{chf(p.price)}</span>
                <span>{t.common.inclVatRate(config.shop.vatRate)} · {t.common.plusShipping(chf(config.shop.shipping))}</span>
              </div>
              <div className="pd__desc">
                {p.description.split(/\n+/).map((para, i) => <p key={i}>{para}</p>)}
              </div>
              {p.highlights.length > 0 && (
                <ul className="checks pd__highlights">
                  {p.highlights.map((h) => <li key={h}><Icon name="check" /> <span>{h}</span></li>)}
                </ul>
              )}
              {aromas.length > 1 && (
                <div className="pd__aromas">
                  <span>{AROMA[lang]}</span>
                  <ul>{aromas.map((a) => <li key={a}>{a}</li>)}</ul>
                </div>
              )}
              <div className="pd__intensity">
                <span>{tp.intensity}</span>
                <div className="intensity" role="img" aria-label={t.a11y.intensity(p.intensity)}>
                  {[1, 2, 3, 4, 5].map((i) => <span key={i} className={`intensity__dot${i <= p.intensity ? ' is-on' : ''}`} />)}
                </div>
              </div>
              <AddToCart productId={p.id} soldOut={soldOut} lang={lang} detailed />
              {!soldOut && p.price < config.shop.freeShippingFrom && (
                <p className="pd__freetip"><Icon name="truck" /> {tp.freeTip(Math.ceil(config.shop.freeShippingFrom / p.price))}</p>
              )}
              <ul className="pd__assure">
                {assure.map(([icon, text]) => <li key={icon}><Icon name={icon} /> {text}</li>)}
                <li><Icon name="mail" /> <span>{tp.questions} <a href={`mailto:${config.email.info}`}>{config.email.info}</a></span></li>
              </ul>
              {guides.length > 0 && (
                <nav className="pd-guides" aria-label={RATGEBER_PAGE[lang].related}>
                  <strong>{RATGEBER_PAGE[lang].related}</strong>
                  <ul>{guides.map((g) => <li key={g.slug}><Link href={lp(lang, `/ratgeber/${g.slug}`)}>{g.text[lang].title}</Link></li>)}</ul>
                </nav>
              )}
            </div>
          </div>
        </div>

        <section className="section section--cream pd-details">
          <div className="wrap pd-details__inner">
            <div>
              <p className="eyebrow">{tp.detailsEyebrow}</p>
              <h2 className="h2">{tp.detailsTitle}</h2>
              <div className="pd-details__text">
                {(p.details || p.description).split(/\n\n+/).map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </div>
            <dl className="pd__specs">
              <div><dt>{tp.blend}</dt><dd>{p.blend}</dd></div>
              <div><dt>{tp.content}</dt><dd>{tp.wholeBeans(p.weight)}</dd></div>
              <div><dt>{tp.taste}</dt><dd>{p.notes}</dd></div>
              <div><dt>{tp.intensity}</dt><dd>{p.intensity} / 5</dd></div>
              <div><dt>{tp.origin}</dt><dd>{tp.originValue}</dd></div>
              <div><dt>{tp.idealFor}</dt><dd>{tp.idealForValue}</dd></div>
            </dl>
          </div>
        </section>

        {awards.length > 0 && (
          <section className="pd-awards" id="auszeichnungen">
            <div className="wrap pd-awards__inner">
              <div className="pd-awards__medal">
                {medal && <Medal year={medal} label={at.medal(medal)} />}
              </div>
              <div>
                <p className="eyebrow eyebrow--gold">{at.eyebrow}</p>
                <h2 className="h2">{at.title}</h2>
                <p className="pd-awards__lead">{at.lead(p.name)}</p>
                <ul className="pd-awards__list">
                  {awards.map((a) => (
                    <li key={a.title}>
                      <Icon name={a.kind === 'cert' ? 'shield' : 'award'} />
                      <div>
                        <small>{at.kinds[a.kind]}</small>
                        <strong>{a.title}</strong>
                        <span>{a.by}</span>
                      </div>
                      {a.years.length > 0 && <em>{a.years.join(' · ')}</em>}
                    </li>
                  ))}
                </ul>
                {medal && <p className="pd-awards__jury">{at.jury}</p>}
                <Link className="link-arrow link-arrow--light" href={lp(lang, '/zertifizierungen')}>{AWARDS_LINK[lang]} <Icon name="arrow" /></Link>
              </div>
            </div>
          </section>
        )}

        <section className="section">
          <div className="wrap">
            <header className="section__head section__head--center">
              <p className="eyebrow">{tp.prepEyebrow}</p>
              <h2 className="h2">{tp.prepTitle}</h2>
            </header>
            <div className="features">
              {tp.prep.map(([title, text], i) => (
                <div className="feature" key={title}>
                  <Icon name={['cup', 'box', 'leaf', 'sun'][i] ?? 'cup'} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="split split--navy">
          <div className="wrap split__inner">
            <div className="split__media">
              <div className="frame frame--gold"><Img src={brand('tostatura')} alt={tp.roastTitle} /></div>
            </div>
            <div className="split__text">
              <p className="eyebrow eyebrow--gold">Dal 1947</p>
              <h2 className="h2">{tp.roastTitle}</h2>
              <p>{tp.roastText}</p>
              <h3 className="pd-store__title">{tp.storeTitle}</h3>
              <p>{tp.storeText}</p>
              <Link className="link-arrow link-arrow--light" href={lp(lang, '/qualitaet')}>{tp.roastLink} <Icon name="arrow" /></Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <header className="section__head section__head--center"><h2 className="h2">{tp.faqTitle}</h2></header>
            <div className="faq">
              {faq.map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <div>{a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>

      {others.length > 0 && (
        <section className="section section--cream">
          <div className="wrap">
            <header className="section__head"><p className="eyebrow">{tp.othersEyebrow}</p><h2 className="h2">{tp.othersTitle}</h2></header>
            <div className="pgrid">{others.map((o) => <ProductCard key={o.id} p={o} lang={lang} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
