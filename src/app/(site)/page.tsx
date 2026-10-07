import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { Img } from '@/components/Img';
import { ProductCard } from '@/components/ProductCard';
import { brand, type BrandKey } from '@/lib/brand';
import { config } from '@/lib/config';
import { getProducts } from '@/lib/products';

export const metadata: Metadata = {
  title: { absolute: 'Dersut Kaffee Schweiz · Offizieller Vertrieb von Dersut Caffè' },
  description: 'Dersut Caffè aus Conegliano – seit 1947 italienische Espresso-Tradition. Offizieller Vertrieb in der Schweiz mit Lieferung in die ganze Schweiz.',
  alternates: { canonical: '/' },
};

const CERTS: [BrandKey, string][] = [
  ['cert_iei', 'Istituto Espresso Italiano'],
  ['cert_gitc', 'Gruppo Italiano Torrefattori Caffè'],
  ['cert_sca', 'Specialty Coffee Association'],
  ['cert_gold', 'Gold Medal'],
  ['cert_consorzio', 'Consorzio di Tutela del Caffè Espresso Italiano Tradizionale'],
  ['cert_sole24', 'Premio Impresa Sostenibile 2025'],
];

export default async function Home() {
  const products = await getProducts();
  return (
    <>
      <section className="hero">
        <div className="hero__media"><Img src={brand('hero_1')} alt="Espresso von Dersut Caffè" className="hero__img" eager /></div>
        <div className="wrap hero__inner">
          <p className="hero__kicker"><span className="rule" /> Offizieller Vertrieb Schweiz</p>
          <h1 className="hero__title">Il vero espresso<br /><em>italiano.</em></h1>
          <p className="hero__lead">Seit 1947 röstet Dersut Caffè in Conegliano Espresso-Mischungen mit italienischer Seele. Jetzt offiziell in der Schweiz erhältlich: direkt vom Vertriebspartner, geliefert in die ganze Schweiz.</p>
          <div className="hero__cta">
            <Link className="btn btn--gold btn--lg" href="/shop">Zum Onlineshop <Icon name="arrow" /></Link>
            <Link className="btn btn--outline-light btn--lg" href="/geschichte">Unsere Geschichte</Link>
          </div>
          <ul className="hero__proof">
            <li><Icon name="award" /> Espresso Italiano Certificato</li>
            <li><Icon name="shield" /> Originalware aus Conegliano</li>
            <li><Icon name="truck" /> Versand CHF 9.–</li>
          </ul>
        </div>
        <div className="hero__since" aria-hidden="true">Dal 1947</div>
      </section>

      <section className="figures">
        <div className="wrap figures__grid">
          <div className="figure"><span className="figure__num">1947</span><span className="figure__txt">gegründet in Trieste und Conegliano</span></div>
          <div className="figure"><span className="figure__num">4’000<sup>+</sup></span><span className="figure__txt">Bars und Geschäfte vertrauen auf Dersut</span></div>
          <div className="figure"><span className="figure__num">80&nbsp;%</span><span className="figure__txt">Energie aus eigener Solaranlage</span></div>
          <div className="figure"><span className="figure__num">14</span><span className="figure__txt">Zertifikate, Preise und Mitgliedschaften</span></div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <header className="section__head">
            <p className="eyebrow">Onlineshop</p>
            <h2 className="h2">Unsere Espressobohnen</h2>
            <p className="lead">Zwei Klassiker aus dem Hause Dersut, frisch aus Conegliano. Das Sortiment wird laufend und saisonal erweitert.</p>
          </header>
          <div className="pgrid">{products.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        </div>
      </section>

      <section className="split split--cream">
        <div className="wrap split__inner">
          <div className="split__media frame"><Img src={brand('famiglia')} alt="Die Familie Caballini, Inhaberin von Dersut Caffè" /></div>
          <div className="split__text">
            <p className="eyebrow">Geschichte</p>
            <h2 className="h2">Eine Familie.<br />Eine Leidenschaft. Seit 1947.</h2>
            <p>1947 gründen die Triestiner Marcello De Rosa und Giovanni Suttora das Unternehmen; aus ihren Namen entsteht <strong>Der</strong>-<strong>sut</strong>. Bereits 1949 übernimmt die Familie Caballini und prägt Dersut bis heute.</p>
            <p>Aus einer kleinen Rösterei wurde eine der bekanntesten Espresso-Marken Nordostitaliens, mit eigenem Kaffeemuseum, eigener Barista-Akademie und einem neuen, nachhaltigen Hauptsitz in Conegliano.</p>
            <Link className="link-arrow" href="/geschichte">Die ganze Geschichte <Icon name="arrow" /></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <header className="section__head section__head--center">
            <p className="eyebrow">Qualität &amp; Röstung</p>
            <h2 className="h2">Vom Kaffeegürtel in Ihre Tasse</h2>
          </header>
          <div className="steps3">
            <article className="step">
              <div className="step__media"><Img src={brand('selezione')} alt="Auswahl der Kaffeebohnen" /></div>
              <span className="step__no">01</span>
              <h3>Ausgewählte Herkünfte</h3>
              <p>Rohkaffee aus dem Kaffeegürtel, etwa Santos aus Brasilien oder Limu aus Äthiopien, sorgfältig ausgewählt für jede Mischung.</p>
            </article>
            <article className="step">
              <div className="step__media"><Img src={brand('tostatura')} alt="Röstung bei Dersut in Conegliano" /></div>
              <span className="step__no">02</span>
              <h3>Zweistufige Röstung</h3>
              <p>Vorröstung bei 150&nbsp;°C, Hauptröstung bei 210 bis 220&nbsp;°C. Der Doppeltrommel-Röster verarbeitet 240&nbsp;kg in 12 Minuten, für konstante Qualität.</p>
            </article>
            <article className="step">
              <div className="step__media"><Img src={brand('caffe')} alt="Geröstete Kaffeebohnen" /></div>
              <span className="step__no">03</span>
              <h3>Bohne für Bohne geprüft</h3>
              <p>Eine elektronische polychromatische Selektion kontrolliert jede einzelne Bohne auf Farbe und Röstgrad, bevor gemischt und verpackt wird.</p>
            </article>
          </div>
          <p className="center"><Link className="btn btn--outline" href="/qualitaet">Mehr über unsere Qualität</Link></p>
        </div>
      </section>

      <section className="certband">
        <div className="wrap">
          <header className="section__head section__head--center section__head--light">
            <p className="eyebrow eyebrow--gold">Ausgezeichnet</p>
            <h2 className="h2">Zertifiziert, prämiert, anerkannt</h2>
            <p className="lead">Dersut trägt das Siegel «Espresso Italiano Certificato» des Istituto Espresso Italiano und das Zeichen «Espresso Italiano di Qualità» des Gruppo Italiano Torrefattori Caffè.</p>
          </header>
          <div className="certlogos">
            {CERTS.map(([k, alt]) => (
              <div className="certlogo" key={k}><Img src={brand(k)} alt={alt} /><span className="certlogo__alt">{alt}</span></div>
            ))}
          </div>
          <p className="center"><Link className="btn btn--outline-light" href="/zertifizierungen">Alle Zertifizierungen ansehen</Link></p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <header className="section__head section__head--center">
            <p className="eyebrow">So einfach geht&apos;s</p>
            <h2 className="h2">Bestellen in drei Schritten</h2>
            <p className="lead">Sicher und ohne Kartenangaben: Sie bezahlen bequem per Banküberweisung, wir versenden sofort nach Zahlungseingang.</p>
          </header>
          <ol className="howto">
            <li><span className="howto__icon"><Icon name="bag" /></span><h3>Bestellen</h3><p>Wählen Sie Ihren Espresso und schliessen Sie die Bestellung ab. Sie erhalten sofort eine Bestellnummer.</p></li>
            <li><span className="howto__icon"><Icon name="bank" /></span><h3>Überweisen</h3><p>Überweisen Sie den Betrag unter Angabe der Bestellnummer auf unser Konto bei der {config.bank.bank}.</p></li>
            <li><span className="howto__icon"><Icon name="truck" /></span><h3>Geniessen</h3><p>Nach Zahlungseingang versenden wir mit der Post. Sie erhalten eine Versandbestätigung per E-Mail.</p></li>
          </ol>
        </div>
      </section>

      <section className="split split--navy">
        <div className="wrap split__inner split__inner--rev">
          <div className="split__media frame frame--gold"><Img src={brand('macchina')} alt="Espressomaschine mit Dersut Kaffee" /></div>
          <div className="split__text">
            <p className="eyebrow eyebrow--gold">Offizieller Vertrieb</p>
            <h2 className="h2">Dersut in der Schweiz: aus erster Hand</h2>
            <p>Die {config.company.name} hat den Vertrieb von Dersut Caffè in der Schweiz übernommen. Damit erhalten Sie Originalware direkt aus der Rösterei in Conegliano, mit Schweizer Ansprechpartner, Rechnung in Franken und Versand innerhalb der Schweiz.</p>
            <ul className="checks">
              <li><Icon name="check" /> Originalprodukte direkt von Dersut Caffè S.p.A.</li>
              <li><Icon name="check" /> Schweizer Ansprechpartner und Kundenservice</li>
              <li><Icon name="check" /> Preise in CHF inklusive MWST, keine Zollüberraschungen</li>
              <li><Icon name="check" /> Angebote für Gastronomie, Hotellerie und Büros</li>
            </ul>
            <Link className="link-arrow link-arrow--light" href="/offizieller-vertrieb">Mehr zum offiziellen Vertrieb <Icon name="arrow" /></Link>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap cta-box">
          <div>
            <p className="eyebrow">Gastronomie &amp; Büro</p>
            <h2 className="h3">Dersut für Ihre Bar, Ihr Restaurant oder Ihr Büro?</h2>
            <p>Wir beraten Sie gerne zu Mischungen, Mengen und Konditionen für Geschäftskunden in der ganzen Schweiz.</p>
          </div>
          <Link className="btn btn--primary btn--lg" href="/gastronomie">Angebot anfragen <Icon name="arrow" /></Link>
        </div>
      </section>
    </>
  );
}
