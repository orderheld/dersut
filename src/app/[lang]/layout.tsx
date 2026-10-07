import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header, type HeaderLabels } from '@/components/Header';
import { Icon } from '@/components/Icon';
import { Logo } from '@/components/Logo';
import { getDict } from '@/i18n';
import { brand } from '@/lib/brand';
import { cartCount } from '@/lib/cart';
import { config } from '@/lib/config';
import { companyAddressLines } from '@/lib/format';
import { LOCALES, LOCALE_TAGS, OG_LOCALES, isLocale, lp, type Locale } from '@/lib/i18n';
import { getProducts } from '@/lib/products';
import { absolute, jsonLd, languageAlternates } from '@/lib/seo';
import './site.css';

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: l } = await params;
  const lang: Locale = isLocale(l) ? l : 'de';
  const t = getDict(lang);
  return {
    metadataBase: new URL(config.siteUrl),
    title: { default: t.meta.defaultTitle, template: `%s · ${t.meta.siteName}` },
    description: t.meta.defaultDescription,
    applicationName: t.meta.siteName,
    alternates: { canonical: absolute(lp(lang, '/')), languages: languageAlternates('/') },
    openGraph: { type: 'website', locale: OG_LOCALES[lang], siteName: t.meta.siteName, images: [brand('hero_1')] },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = { themeColor: '#002856' };

export default async function SiteLayout({ children, params }: Props) {
  const { lang: l } = await params;
  if (!isLocale(l)) notFound();
  const lang = l;
  const t = getDict(lang);
  const [count, products] = await Promise.all([cartCount(), getProducts(true, lang)]);
  const c = config.company;
  const L = (path: string) => lp(lang, path);

  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': absolute('/#organization'),
    name: c.name,
    alternateName: 'Dersut Kaffee Schweiz',
    url: config.siteUrl,
    logo: brand('logo'),
    email: config.email.info,
    description: t.meta.orgDescription,
    areaServed: { '@type': 'Country', name: 'CH' },
    ...(c.street ? { address: { '@type': 'PostalAddress', streetAddress: c.street, postalCode: c.zip, addressLocality: c.city, addressCountry: 'CH' } } : {}),
    ...(c.phone ? { telephone: c.phone } : {}),
  };

  const labels: HeaderLabels = {
    menuOpen: t.a11y.menuOpen,
    menuClose: t.a11y.menuClose,
    mainNav: t.a11y.mainNav,
    home: t.a11y.home,
    cart: t.a11y.cart(count),
    language: t.a11y.language,
    country: t.footer.country,
    shop: t.nav.shop,
    about: t.nav.about,
    history: t.nav.history,
    historySub: t.nav.historySub,
    quality: t.nav.quality,
    qualitySub: t.nav.qualitySub,
    certs: t.nav.certs,
    certsSub: t.nav.certsSub,
    sustainability: t.nav.sustainability,
    sustainabilitySub: t.nav.sustainabilitySub,
    distribution: t.nav.distribution,
    gastro: t.nav.gastro,
    contact: t.nav.contact,
  };

  return (
    <html lang={LOCALE_TAGS[lang]}>
      <body>
        <a className="skip" href="#main">{t.a11y.skip}</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(org)} />

        <div className="topbar">
          <div className="wrap topbar__inner">
            <span className="topbar__item"><Icon name="shield" /> {t.topbar.official}</span>
            <span className="topbar__item topbar__item--hide-sm"><Icon name="truck" /> {t.topbar.shipping}</span>
            <span className="topbar__item topbar__item--hide-md"><Icon name="cup" /> {t.topbar.since}</span>
          </div>
        </div>

        <Header count={count} lang={lang} labels={labels} />

        <main id="main">{children}</main>

        <section className="assurance">
          <div className="wrap assurance__grid">
            {t.assurance.map(([icon, title, text]) => (
              <div className="assurance__item" key={title}><Icon name={icon as 'shield'} /><div><strong>{title}</strong><span>{text}</span></div></div>
            ))}
          </div>
        </section>

        <footer className="footer">
          <div className="wrap footer__grid">
            <div className="footer__brand">
              <Link className="logo logo--light" href={L('/')} aria-label={t.a11y.home}><Logo /><span className="logo__ch">{t.footer.country}</span></Link>
              <p>{t.footer.about(c.name)}</p>
              <p className="footer__since">Dal 1947 · Conegliano · Italia</p>
            </div>
            <div>
              <h3>{t.footer.shop}</h3>
              <ul>
                {products.map((p) => <li key={p.id}><Link href={L(`/shop/${p.slug}`)}>{p.name}</Link></li>)}
                <li><Link href={L('/shop')}>{t.nav.allProducts}</Link></li>
                <li><Link href={L('/versand-zahlung')}>{t.nav.shipping}</Link></li>
                <li><Link href={L('/gastronomie')}>{t.nav.gastro}</Link></li>
              </ul>
            </div>
            <div>
              <h3>{t.footer.aboutDersut}</h3>
              <ul>
                <li><Link href={L('/geschichte')}>{t.nav.history}</Link></li>
                <li><Link href={L('/qualitaet')}>{t.nav.quality}</Link></li>
                <li><Link href={L('/zertifizierungen')}>{t.nav.certs}</Link></li>
                <li><Link href={L('/nachhaltigkeit')}>{t.nav.sustainability}</Link></li>
                <li><Link href={L('/offizieller-vertrieb')}>{t.nav.distributionLong}</Link></li>
              </ul>
            </div>
            <div>
              <h3>{t.footer.contact}</h3>
              <ul className="footer__contact">
                {companyAddressLines(t.footer.country).map((line, i) => <li key={i}>{i === 0 ? <strong>{line}</strong> : line}</li>)}
                {c.phone && <li><a href={`tel:${c.phone.replace(/[^+\d]/g, '')}`}>{c.phone}</a></li>}
                <li><a href={`mailto:${config.email.info}`}>{config.email.info}</a></li>
              </ul>
            </div>
          </div>
          <div className="wrap footer__bottom">
            <span>{t.footer.rights(new Date().getFullYear(), c.name)}</span>
            <nav aria-label={t.a11y.legal}>
              <Link href={L('/impressum')}>{t.nav.imprint}</Link>
              <Link href={L('/datenschutz')}>{t.nav.privacy}</Link>
              <Link href={L('/agb')}>{t.nav.terms}</Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
