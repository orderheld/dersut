import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { Img } from '@/components/Img';
import { PageHero } from '@/components/PageHero';
import { brand, type BrandKey } from '@/lib/brand';
import { asLocale, lp, type Locale } from '@/lib/i18n';
import { pageMeta } from '@/lib/seo';

type Props = { params: Promise<{ lang: string }> };

const PATH = '/zertifizierungen';

/** Logos in the same order as the `certs` / `awards` entries in T. */
const CERT_IMG: BrandKey[] = ['cert_iei', 'cert_gitc', 'cert_sca', 'cert_consorzio', 'cert_legalita', 'cert_confind', 'cert_aidaf', 'cert_comisso'];
const AWARD_IMG: BrandKey[] = ['cert_gold', 'cert_camaleonte', 'cert_villani', 'cert_sole24', 'cert_best', 'cert_csr'];

/** [tag, name, text] */
type Entry = [string, string, string];

const de = {
  metaTitle: 'Zertifizierungen & Auszeichnungen von Dersut Kaffee',
  metaDescription: 'Espresso Italiano Certificato, Espresso Italiano di Qualità, SCA-Mitgliedschaft, Goldmedaillen und weitere Auszeichnungen: geprüfte Qualität von Dersut Caffè.',
  crumb: 'Zertifizierungen',
  eyebrow: 'Certificazioni & Premi',
  title: <>Qualität, die<br /><em>bestätigt ist</em></>,
  lead: 'Unabhängige Zertifikate, Fachpreise und Mitgliedschaften in den wichtigsten Verbänden der italienischen Kaffeewelt.',
  certsEyebrow: 'Zertifikate & Mitgliedschaften',
  certsTitle: 'Zertifiziert nach italienischem Espresso-Standard',
  certs: [
    ['Zertifikat', 'Espresso Italiano Certificato', 'Verliehen vom Istituto Espresso Italiano. Das Zeichen steht für einen Espresso, der die strengen Kriterien des italienischen Espresso-Instituts in Mischung, Röstung und Tasse erfüllt.'],
    ['Zertifikat', 'Espresso Italiano di Qualità', 'Zertifikat und Marke des Gruppo Italiano Torrefattori Caffè (GITC), der Vereinigung italienischer Kaffeeröster.'],
    ['Mitgliedschaft seit 2014', 'Specialty Coffee Association', 'Dersut ist seit 2014 Mitglied der SCA, der internationalen Organisation für Spezialitätenkaffee.'],
    ['Gründungsmitglied 2014', 'Consorzio di Tutela del Caffè Espresso Italiano Tradizionale', 'Das Konsortium zum Schutz des traditionellen italienischen Espresso wurde 2014 in Conegliano gegründet, mit dem Ziel der Anerkennung als UNESCO-Kulturerbe.'],
    ['Bestätigung', 'Rating della Legalità', 'Bestätigung von Rechtmässigkeit und Transparenz der Unternehmensführung sowie der Berücksichtigung ökologischer und sozialer Auswirkungen.'],
    ['Mitglied seit 1949', 'Confindustria Veneto Est', 'Mitglied des Industrieverbands der Region Venetien Ost.'],
    ['Mitgliedschaft', 'AIdAF – Italian Family Business', 'Mitglied der Vereinigung italienischer Familienunternehmen.'],
    ['Engagement', 'Azienda Amica del Premio Comisso', 'Unterstützung des Literaturpreises Comisso für italienische Erzählkunst und Biografie.'],
  ] as Entry[],
  awardsEyebrow: 'Auszeichnungen',
  awardsTitle: 'Prämiert von Fachwelt und Wirtschaft',
  awards: [
    ['2014 · 2016 · 2018 · 2022', 'Gold Medal', 'Goldmedaillen für die Mischungen PLUS Oro (2014 und 2018) und Non Plus Ultra (2016 und 2022).'],
    ['Espresso Award', 'Premio Camaleonte', 'Auszeichnung für die Mischung Selezione del Conte aus 100 % Arabica.'],
    ['Accademia Italiana della Cucina', 'Premio della Qualità «Dino Villani»', 'Jährlicher Preis der Accademia Italiana della Cucina für hochwertige gastronomische Produkte.'],
    ['2025 · Il Sole 24 Ore', 'Premio Impresa Sostenibile', 'Auszeichnung in der Kategorie «Wirtschaftliche Nachhaltigkeit» am 22. Oktober 2025.'],
    ['2025', 'Premio Impresa Best Performer', 'Für überdurchschnittliche wirtschaftliche und unternehmerische Ergebnisse 2021 bis 2023, verliehen vom Centro Studi ItalyPost.'],
    ['Soziale Verantwortung', 'CSR-Auszeichnung', 'Für Projekte zur Wiederverwendung von Materialien und zum Engagement in der Gemeinschaft, gemeinsam mit Ricrearti, Il Pesco und Piccola Comunità.'],
  ] as Entry[],
  ctaEyebrow: 'Ihre Sicherheit in der Schweiz',
  ctaTitle: 'Original. Direkt. Nachvollziehbar.',
  ctaText: 'Als offizieller Vertriebspartner beziehen wir alle Produkte direkt von Dersut Caffè S.p.A. in Conegliano. Sie erhalten dieselbe zertifizierte Qualität wie in den Bars Italiens, ohne Zwischenhandel und ohne Graumarktware.',
  ctaLink: 'Mehr zum offiziellen Vertrieb',
};

const T: Record<Locale, typeof de> = {
  de,
  fr: {
    metaTitle: 'Certifications & distinctions du café Dersut',
    metaDescription: 'Espresso Italiano Certificato, Espresso Italiano di Qualità, membre de la SCA, médailles d’or et autres distinctions : la qualité reconnue du café Dersut.',
    crumb: 'Certifications',
    eyebrow: 'Certificazioni & Premi',
    title: <>Une qualité<br /><em>reconnue</em></>,
    lead: 'Certifications indépendantes, prix décernés par des experts et adhésion aux principales associations du monde du café italien.',
    certsEyebrow: 'Certifications & adhésions',
    certsTitle: 'Certifié selon le standard de l’espresso italien',
    certs: [
      ['Certification', 'Espresso Italiano Certificato', 'Décernée par l’Istituto Espresso Italiano. Ce label distingue un espresso qui satisfait aux critères exigeants de l’institut italien de l’espresso, du mélange à la torréfaction jusqu’à la tasse.'],
      ['Certification', 'Espresso Italiano di Qualità', 'Certification et marque du Gruppo Italiano Torrefattori Caffè (GITC), l’association des torréfacteurs de café italiens.'],
      ['Membre depuis 2014', 'Specialty Coffee Association', 'Dersut est membre depuis 2014 de la SCA, l’organisation internationale du café de spécialité.'],
      ['Membre fondateur 2014', 'Consorzio di Tutela del Caffè Espresso Italiano Tradizionale', 'Le consortium pour la protection de l’espresso italien traditionnel a été fondé en 2014 à Conegliano, avec pour objectif sa reconnaissance au patrimoine culturel de l’UNESCO.'],
      ['Attestation', 'Rating della Legalità', 'Attestation de la légalité et de la transparence de la gestion d’entreprise, ainsi que de la prise en compte des impacts environnementaux et sociaux.'],
      ['Membre depuis 1949', 'Confindustria Veneto Est', 'Membre de l’association industrielle de la région Vénétie orientale.'],
      ['Adhésion', 'AIdAF – Italian Family Business', 'Membre de l’association des entreprises familiales italiennes.'],
      ['Engagement', 'Azienda Amica del Premio Comisso', 'Soutien au prix littéraire Comisso, consacré à la narration et à la biographie italiennes.'],
    ],
    awardsEyebrow: 'Distinctions',
    awardsTitle: 'Primé par les experts et le monde économique',
    awards: [
      ['2014 · 2016 · 2018 · 2022', 'Gold Medal', 'Médailles d’or pour les mélanges PLUS Oro (2014 et 2018) et Non Plus Ultra (2016 et 2022).'],
      ['Espresso Award', 'Premio Camaleonte', 'Distinction pour le mélange Selezione del Conte, 100 % Arabica.'],
      ['Accademia Italiana della Cucina', 'Premio della Qualità «Dino Villani»', 'Prix annuel de l’Accademia Italiana della Cucina récompensant des produits gastronomiques d’excellence.'],
      ['2025 · Il Sole 24 Ore', 'Premio Impresa Sostenibile', 'Distinction dans la catégorie « Durabilité économique », le 22 octobre 2025.'],
      ['2025', 'Premio Impresa Best Performer', 'Pour des résultats économiques et entrepreneuriaux supérieurs à la moyenne de 2021 à 2023, décerné par le Centro Studi ItalyPost.'],
      ['Responsabilité sociale', 'Distinction RSE', 'Pour des projets de réutilisation des matériaux et d’engagement envers la communauté, menés avec Ricrearti, Il Pesco et Piccola Comunità.'],
    ],
    ctaEyebrow: 'Votre garantie en Suisse',
    ctaTitle: 'Original. Direct. Traçable.',
    ctaText: 'En tant que distributeur officiel, nous nous approvisionnons directement auprès de Dersut Caffè S.p.A. à Conegliano. Vous bénéficiez de la même qualité certifiée que dans les bars d’Italie, sans intermédiaire ni marché gris.',
    ctaLink: 'En savoir plus sur la distribution officielle',
  },
  it: {
    metaTitle: 'Certificazioni e premi del caffè Dersut',
    metaDescription: 'Espresso Italiano Certificato, Espresso Italiano di Qualità, socio SCA, medaglie d’oro e altri premi: la qualità certificata del caffè Dersut in Svizzera.',
    crumb: 'Certificazioni',
    eyebrow: 'Certificazioni & Premi',
    title: <>Una qualità<br /><em>riconosciuta</em></>,
    lead: 'Certificazioni indipendenti, premi di settore e l’adesione alle principali associazioni del mondo del caffè italiano.',
    certsEyebrow: 'Certificazioni & associazioni',
    certsTitle: 'Certificato secondo lo standard dell’espresso italiano',
    certs: [
      ['Certificazione', 'Espresso Italiano Certificato', 'Rilasciata dall’Istituto Espresso Italiano. Il marchio contraddistingue un espresso che rispetta i severi criteri dell’Istituto in miscela, tostatura e tazza.'],
      ['Certificazione', 'Espresso Italiano di Qualità', 'Certificazione e marchio del Gruppo Italiano Torrefattori Caffè (GITC), l’associazione dei torrefattori italiani.'],
      ['Socio dal 2014', 'Specialty Coffee Association', 'Dal 2014 Dersut è socio della SCA, l’organizzazione internazionale dello specialty coffee.'],
      ['Socio fondatore 2014', 'Consorzio di Tutela del Caffè Espresso Italiano Tradizionale', 'Il Consorzio per la tutela dell’espresso italiano tradizionale è stato fondato nel 2014 a Conegliano con l’obiettivo del riconoscimento come patrimonio culturale UNESCO.'],
      ['Attestazione', 'Rating della Legalità', 'Attesta la legalità e la trasparenza della gestione aziendale e l’attenzione agli impatti ambientali e sociali.'],
      ['Socio dal 1949', 'Confindustria Veneto Est', 'Membro dell’associazione degli industriali del Veneto orientale.'],
      ['Associazione', 'AIdAF – Italian Family Business', 'Membro dell’associazione italiana delle aziende familiari.'],
      ['Impegno', 'Azienda Amica del Premio Comisso', 'Sostegno al Premio letterario Comisso per la narrativa e la biografia italiane.'],
    ],
    awardsEyebrow: 'Riconoscimenti',
    awardsTitle: 'Premiato da esperti e mondo economico',
    awards: [
      ['2014 · 2016 · 2018 · 2022', 'Gold Medal', 'Medaglie d’oro per le miscele PLUS Oro (2014 e 2018) e Non Plus Ultra (2016 e 2022).'],
      ['Espresso Award', 'Premio Camaleonte', 'Riconoscimento per la miscela Selezione del Conte, 100 % Arabica.'],
      ['Accademia Italiana della Cucina', 'Premio della Qualità «Dino Villani»', 'Premio annuale dell’Accademia Italiana della Cucina per prodotti gastronomici di eccellenza.'],
      ['2025 · Il Sole 24 Ore', 'Premio Impresa Sostenibile', 'Riconoscimento nella categoria «Sostenibilità economica» il 22 ottobre 2025.'],
      ['2025', 'Premio Impresa Best Performer', 'Per risultati economici e imprenditoriali superiori alla media nel periodo 2021–2023, assegnato dal Centro Studi ItalyPost.'],
      ['Responsabilità sociale', 'Riconoscimento CSR', 'Per i progetti di riutilizzo dei materiali e di impegno verso la comunità, realizzati con Ricrearti, Il Pesco e Piccola Comunità.'],
    ],
    ctaEyebrow: 'La vostra garanzia in Svizzera',
    ctaTitle: 'Originale. Diretto. Tracciabile.',
    ctaText: 'In qualità di distributore ufficiale acquistiamo tutti i prodotti direttamente da Dersut Caffè S.p.A. a Conegliano. Ricevete la stessa qualità certificata dei bar italiani, senza intermediari e senza merce del mercato grigio.',
    ctaLink: 'Scoprite la distribuzione ufficiale',
  },
  en: {
    metaTitle: 'Dersut Coffee Certifications & Awards',
    metaDescription: 'Espresso Italiano Certificato, Espresso Italiano di Qualità, SCA membership, gold medals and more: the certified quality of Dersut coffee in Switzerland.',
    crumb: 'Certifications',
    eyebrow: 'Certificazioni & Premi',
    title: <>Quality that is<br /><em>certified</em></>,
    lead: 'Independent certifications, industry awards and membership of the leading associations in the Italian coffee world.',
    certsEyebrow: 'Certifications & memberships',
    certsTitle: 'Certified to the Italian espresso standard',
    certs: [
      ['Certification', 'Espresso Italiano Certificato', 'Awarded by the Istituto Espresso Italiano. The mark denotes an espresso that meets the Italian Espresso Institute’s strict criteria for blend, roast and cup.'],
      ['Certification', 'Espresso Italiano di Qualità', 'Certification and trademark of the Gruppo Italiano Torrefattori Caffè (GITC), the association of Italian coffee roasters.'],
      ['Member since 2014', 'Specialty Coffee Association', 'Dersut has been a member of the SCA, the international organisation for speciality coffee, since 2014.'],
      ['Founding member 2014', 'Consorzio di Tutela del Caffè Espresso Italiano Tradizionale', 'The consortium for the protection of traditional Italian espresso was founded in Conegliano in 2014, with the aim of gaining recognition as UNESCO cultural heritage.'],
      ['Attestation', 'Rating della Legalità', 'Confirms the legality and transparency of the company’s management and its consideration of environmental and social impact.'],
      ['Member since 1949', 'Confindustria Veneto Est', 'Member of the industrial association of the Eastern Veneto region.'],
      ['Membership', 'AIdAF – Italian Family Business', 'Member of the association of Italian family businesses.'],
      ['Commitment', 'Azienda Amica del Premio Comisso', 'Support for the Comisso literary prize for Italian narrative and biography.'],
    ],
    awardsEyebrow: 'Awards',
    awardsTitle: 'Recognised by experts and the business world',
    awards: [
      ['2014 · 2016 · 2018 · 2022', 'Gold Medal', 'Gold medals for the PLUS Oro (2014 and 2018) and Non Plus Ultra (2016 and 2022) blends.'],
      ['Espresso Award', 'Premio Camaleonte', 'Awarded to the Selezione del Conte blend, 100% Arabica.'],
      ['Accademia Italiana della Cucina', 'Premio della Qualità “Dino Villani”', 'Annual prize of the Accademia Italiana della Cucina for outstanding gastronomic products.'],
      ['2025 · Il Sole 24 Ore', 'Premio Impresa Sostenibile', 'Awarded in the “Economic Sustainability” category on 22 October 2025.'],
      ['2025', 'Premio Impresa Best Performer', 'For above-average economic and business results from 2021 to 2023, awarded by the Centro Studi ItalyPost.'],
      ['Social responsibility', 'CSR Award', 'For projects on reusing materials and community engagement, carried out with Ricrearti, Il Pesco and Piccola Comunità.'],
    ],
    ctaEyebrow: 'Your assurance in Switzerland',
    ctaTitle: 'Original. Direct. Traceable.',
    ctaText: 'As the official distributor, we source all products directly from Dersut Caffè S.p.A. in Conegliano. You get the same certified quality as in Italy’s bars, with no middlemen and no grey-market goods.',
    ctaLink: 'More about official distribution',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  return pageMeta(lang, PATH, T[lang].metaTitle, T[lang].metaDescription);
}

function CertList({ items, imgs }: { items: Entry[]; imgs: BrandKey[] }) {
  return (
    <div className="certs">
      {items.map(([tag, h, txt], i) => (
        <article className="cert" key={h}>
          <div className="cert__logo"><Icon name="award" /><Img src={brand(imgs[i])} alt={h} /></div>
          <div><span className="cert__tag">{tag}</span><h3>{h}</h3><p>{txt}</p></div>
        </article>
      ))}
    </div>
  );
}

export default async function Zertifizierungen({ params }: Props) {
  const lang = asLocale((await params).lang);
  const t = T[lang];
  return (
    <>
      <PageHero lang={lang} img={brand('tazze')} crumb={t.crumb} eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <section className="section">
        <div className="wrap">
          <header className="section__head">
            <p className="eyebrow">{t.certsEyebrow}</p>
            <h2 className="h2">{t.certsTitle}</h2>
          </header>
          <CertList items={t.certs} imgs={CERT_IMG} />
        </div>
      </section>
      <section className="section section--white">
        <div className="wrap">
          <header className="section__head">
            <p className="eyebrow">{t.awardsEyebrow}</p>
            <h2 className="h2">{t.awardsTitle}</h2>
          </header>
          <CertList items={t.awards} imgs={AWARD_IMG} />
        </div>
      </section>
      <section className="split split--navy">
        <div className="wrap split__inner">
          <div className="split__text">
            <p className="eyebrow eyebrow--gold">{t.ctaEyebrow}</p>
            <h2 className="h2">{t.ctaTitle}</h2>
            <p>{t.ctaText}</p>
            <Link className="link-arrow link-arrow--light" href={lp(lang, '/offizieller-vertrieb')}>{t.ctaLink} <Icon name="arrow" /></Link>
          </div>
          <div className="split__media frame frame--gold"><Img src={brand('img_4')} alt="Dersut Espresso" /></div>
        </div>
      </section>
    </>
  );
}
