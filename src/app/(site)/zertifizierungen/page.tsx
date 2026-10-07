import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { Img } from '@/components/Img';
import { PageHero } from '@/components/PageHero';
import { brand, type BrandKey } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Zertifizierungen & Auszeichnungen',
  description: 'Espresso Italiano Certificato, Espresso Italiano di Qualità, SCA-Mitgliedschaft, Goldmedaillen und weitere Auszeichnungen von Dersut Caffè.',
};

type Entry = [BrandKey, string, string, string];

const CERTS: Entry[] = [
  ['cert_iei', 'Zertifikat', 'Espresso Italiano Certificato', 'Verliehen vom Istituto Espresso Italiano. Das Zeichen steht für einen Espresso, der die strengen Kriterien des italienischen Espresso-Instituts in Mischung, Röstung und Tasse erfüllt.'],
  ['cert_gitc', 'Zertifikat', 'Espresso Italiano di Qualità', 'Zertifikat und Marke des Gruppo Italiano Torrefattori Caffè (GITC), der Vereinigung italienischer Kaffeeröster.'],
  ['cert_sca', 'Mitgliedschaft seit 2014', 'Specialty Coffee Association', 'Dersut ist seit 2014 Mitglied der SCA, der internationalen Organisation für Spezialitätenkaffee.'],
  ['cert_consorzio', 'Gründungsmitglied 2014', 'Consorzio di Tutela del Caffè Espresso Italiano Tradizionale', 'Das Konsortium zum Schutz des traditionellen italienischen Espresso wurde 2014 in Conegliano gegründet, mit dem Ziel der Anerkennung als UNESCO-Kulturerbe.'],
  ['cert_legalita', 'Bestätigung', 'Rating della Legalità', 'Bestätigung von Rechtmässigkeit und Transparenz der Unternehmensführung sowie der Berücksichtigung ökologischer und sozialer Auswirkungen.'],
  ['cert_confind', 'Mitglied seit 1949', 'Confindustria Veneto Est', 'Mitglied des Industrieverbands der Region Venetien Ost.'],
  ['cert_aidaf', 'Mitgliedschaft', 'AIdAF – Italian Family Business', 'Mitglied der Vereinigung italienischer Familienunternehmen.'],
  ['cert_comisso', 'Engagement', 'Azienda Amica del Premio Comisso', 'Unterstützung des Literaturpreises Comisso für italienische Erzählkunst und Biografie.'],
];

const AWARDS: Entry[] = [
  ['cert_gold', '2014 · 2016 · 2018 · 2022', 'Gold Medal', 'Goldmedaillen für die Mischungen PLUS Oro (2014 und 2018) und Non Plus Ultra (2016 und 2022).'],
  ['cert_camaleonte', 'Espresso Award', 'Premio Camaleonte', 'Auszeichnung für die Mischung Selezione del Conte aus 100 % Arabica.'],
  ['cert_villani', 'Accademia Italiana della Cucina', 'Premio della Qualità «Dino Villani»', 'Jährlicher Preis der Accademia Italiana della Cucina für hochwertige gastronomische Produkte.'],
  ['cert_sole24', '2025 · Il Sole 24 Ore', 'Premio Impresa Sostenibile', 'Auszeichnung in der Kategorie «Wirtschaftliche Nachhaltigkeit» am 22. Oktober 2025.'],
  ['cert_best', '2025', 'Premio Impresa Best Performer', 'Für überdurchschnittliche wirtschaftliche und unternehmerische Ergebnisse 2021 bis 2023, verliehen vom Centro Studi ItalyPost.'],
  ['cert_csr', 'Soziale Verantwortung', 'CSR-Auszeichnung', 'Für Projekte zur Wiederverwendung von Materialien und zum Engagement in der Gemeinschaft, gemeinsam mit Ricrearti, Il Pesco und Piccola Comunità.'],
];

function CertList({ items }: { items: Entry[] }) {
  return (
    <div className="certs">
      {items.map(([img, tag, h, txt]) => (
        <article className="cert" key={h}>
          <div className="cert__logo"><Icon name="award" /><Img src={brand(img)} alt={h} /></div>
          <div><span className="cert__tag">{tag}</span><h3>{h}</h3><p>{txt}</p></div>
        </article>
      ))}
    </div>
  );
}

export default function Zertifizierungen() {
  return (
    <>
      <PageHero img={brand('tazze')} crumb="Zertifizierungen" eyebrow="Certificazioni & Premi" title={<>Qualität, die<br /><em>bestätigt ist</em></>} lead="Unabhängige Zertifikate, Fachpreise und Mitgliedschaften in den wichtigsten Verbänden der italienischen Kaffeewelt." />
      <section className="section">
        <div className="wrap">
          <header className="section__head">
            <p className="eyebrow">Zertifikate &amp; Mitgliedschaften</p>
            <h2 className="h2">Zertifiziert nach italienischem Espresso-Standard</h2>
          </header>
          <CertList items={CERTS} />
        </div>
      </section>
      <section className="section section--white">
        <div className="wrap">
          <header className="section__head">
            <p className="eyebrow">Auszeichnungen</p>
            <h2 className="h2">Prämiert von Fachwelt und Wirtschaft</h2>
          </header>
          <CertList items={AWARDS} />
        </div>
      </section>
      <section className="split split--navy">
        <div className="wrap split__inner">
          <div className="split__text">
            <p className="eyebrow eyebrow--gold">Ihre Sicherheit in der Schweiz</p>
            <h2 className="h2">Original. Direkt. Nachvollziehbar.</h2>
            <p>Als offizieller Vertriebspartner beziehen wir alle Produkte direkt von Dersut Caffè S.p.A. in Conegliano. Sie erhalten dieselbe zertifizierte Qualität wie in den Bars Italiens, ohne Zwischenhandel und ohne Graumarktware.</p>
            <Link className="link-arrow link-arrow--light" href="/offizieller-vertrieb">Mehr zum offiziellen Vertrieb <Icon name="arrow" /></Link>
          </div>
          <div className="split__media frame frame--gold"><Img src={brand('img_4')} alt="Dersut Espresso" /></div>
        </div>
      </section>
    </>
  );
}
