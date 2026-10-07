import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Icon } from '@/components/Icon';
import { Logo } from '@/components/Logo';
import { brand } from '@/lib/brand';
import { cartCount } from '@/lib/cart';
import { config } from '@/lib/config';
import { companyAddressLines } from '@/lib/format';
import { getProducts } from '@/lib/products';
import './site.css';

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: { default: 'Dersut Kaffee Schweiz', template: '%s · Dersut Kaffee Schweiz' },
  description: 'Dersut Caffè – italienischer Espresso aus Conegliano seit 1947. Offizieller Vertrieb in der Schweiz.',
  openGraph: { type: 'website', locale: 'de_CH', siteName: 'Dersut Kaffee Schweiz', images: [brand('hero_1')] },
};

export const viewport: Viewport = { themeColor: '#002856' };

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [count, products] = await Promise.all([cartCount(), getProducts()]);
  const c = config.company;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: c.name,
    url: config.siteUrl,
    email: config.email.info,
    description: 'Offizieller Vertrieb von Dersut Caffè in der Schweiz',
    address: { '@type': 'PostalAddress', streetAddress: c.street, postalCode: c.zip, addressLocality: c.city, addressCountry: 'CH' },
  };

  return (
    <html lang="de-CH">
      <body>
        <a className="skip" href="#main">Zum Inhalt springen</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <div className="topbar">
          <div className="wrap topbar__inner">
            <span className="topbar__item"><Icon name="shield" /> Offizieller Vertrieb von Dersut Caffè in der Schweiz</span>
            <span className="topbar__item topbar__item--hide-sm"><Icon name="truck" /> Postversand in die ganze Schweiz · CHF 9.–</span>
            <span className="topbar__item topbar__item--hide-md"><Icon name="cup" /> Italienische Röstkunst seit 1947</span>
          </div>
        </div>

        <Header count={count} />

        <main id="main">{children}</main>

        <section className="assurance">
          <div className="wrap assurance__grid">
            <div className="assurance__item"><Icon name="shield" /><div><strong>Offizieller Vertrieb</strong><span>Originalware direkt von Dersut Caffè, Conegliano</span></div></div>
            <div className="assurance__item"><Icon name="truck" /><div><strong>Ganze Schweiz</strong><span>Postversand pauschal CHF 9.–</span></div></div>
            <div className="assurance__item"><Icon name="bank" /><div><strong>Vorauskasse</strong><span>Sichere Banküberweisung, kein Kartenrisiko</span></div></div>
            <div className="assurance__item"><Icon name="leaf" /><div><strong>Frisch geröstet</strong><span>Italienische Röstkunst seit 1947</span></div></div>
          </div>
        </section>

        <footer className="footer">
          <div className="wrap footer__grid">
            <div className="footer__brand">
              <Link className="logo logo--light" href="/" aria-label="Startseite"><Logo /><span className="logo__ch">Schweiz</span></Link>
              <p>{c.name} ist der offizielle Vertriebspartner von Dersut Caffè S.p.A. (Conegliano, Italien) für die Schweiz.</p>
              <p className="footer__since">Dal 1947 · Conegliano · Italia</p>
            </div>
            <div>
              <h3>Shop</h3>
              <ul>
                {products.map((p) => <li key={p.id}><Link href={`/shop/${p.slug}`}>{p.name}</Link></li>)}
                <li><Link href="/shop">Alle Produkte</Link></li>
                <li><Link href="/versand-zahlung">Versand &amp; Zahlung</Link></li>
              </ul>
            </div>
            <div>
              <h3>Über Dersut</h3>
              <ul>
                <li><Link href="/geschichte">Geschichte</Link></li>
                <li><Link href="/qualitaet">Qualität &amp; Röstung</Link></li>
                <li><Link href="/zertifizierungen">Zertifizierungen</Link></li>
                <li><Link href="/nachhaltigkeit">Nachhaltigkeit</Link></li>
                <li><Link href="/offizieller-vertrieb">Offizieller Vertrieb Schweiz</Link></li>
              </ul>
            </div>
            <div>
              <h3>Kontakt</h3>
              <ul className="footer__contact">
                {companyAddressLines().map((l, i) => <li key={i}>{i === 0 ? <strong>{l}</strong> : l}</li>)}
                {c.phone && <li><a href={`tel:${c.phone.replace(/[^+\d]/g, '')}`}>{c.phone}</a></li>}
                <li><a href={`mailto:${config.email.info}`}>{config.email.info}</a></li>
              </ul>
            </div>
          </div>
          <div className="wrap footer__bottom">
            <span>© {new Date().getFullYear()} {c.name}. Dersut® ist eine Marke der Dersut Caffè S.p.A., Conegliano (TV), Italien.</span>
            <nav aria-label="Rechtliches">
              <Link href="/impressum">Impressum</Link>
              <Link href="/datenschutz">Datenschutz</Link>
              <Link href="/agb">AGB</Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
