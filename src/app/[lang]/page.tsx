import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { Img } from '@/components/Img';
import { ProductCard } from '@/components/ProductCard';
import { brand, type BrandKey } from '@/lib/brand';
import { config } from '@/lib/config';
import { asLocale, LOCALE_TAGS, lp, type Locale } from '@/lib/i18n';
import { getProducts } from '@/lib/products';
import { absolute, jsonLd, pageMeta } from '@/lib/seo';

type Props = { params: Promise<{ lang: string }> };

const PATH = '/';

const CERTS: [BrandKey, string][] = [
  ['cert_iei', 'Istituto Espresso Italiano'],
  ['cert_gitc', 'Gruppo Italiano Torrefattori Caffè'],
  ['cert_sca', 'Specialty Coffee Association'],
  ['cert_gold', 'Gold Medal'],
  ['cert_consorzio', 'Consorzio di Tutela del Caffè Espresso Italiano Tradizionale'],
  ['cert_sole24', 'Premio Impresa Sostenibile 2025'],
];

const de = {
  metaTitle: 'Dersut Kaffee Schweiz · Original italienischer Espresso online kaufen',
  metaDescription: 'Dersut Caffè aus Conegliano, seit 1947 italienische Espresso-Tradition. Espressobohnen online kaufen beim offiziellen Vertrieb, Lieferung in die ganze Schweiz.',
  heroAlt: 'Espresso von Dersut Caffè',
  heroKicker: 'Offizieller Vertrieb Schweiz',
  heroLead: 'Seit 1947 röstet Dersut Caffè in Conegliano Espresso-Mischungen mit italienischer Seele. Jetzt offiziell in der Schweiz erhältlich: direkt vom Vertriebspartner, geliefert in die ganze Schweiz.',
  heroShop: 'Zum Onlineshop',
  heroStory: 'Unsere Geschichte',
  proof: ['Espresso Italiano Certificato', 'Originalware aus Conegliano', 'Versand CHF 9.–'],
  figures: [
    'gegründet in Trieste und Conegliano',
    'Bars und Geschäfte vertrauen auf Dersut',
    'Energie aus eigener Solaranlage',
    'Zertifikate, Preise und Mitgliedschaften',
  ],
  shopEyebrow: 'Onlineshop',
  shopTitle: 'Unsere Espressobohnen',
  shopLead: 'Zwei Klassiker aus dem Hause Dersut, frisch aus Conegliano. Das Sortiment wird laufend und saisonal erweitert.',
  storyAlt: 'Die Familie Caballini, Inhaberin von Dersut Caffè',
  storyEyebrow: 'Geschichte',
  storyTitle: <>Eine Familie.<br />Eine Leidenschaft. Seit 1947.</>,
  storyP1: <>1947 gründen die Triestiner Marcello De Rosa und Giovanni Suttora das Unternehmen; aus ihren Namen entsteht <strong>Der</strong>-<strong>sut</strong>. Bereits 1949 übernimmt die Familie Caballini und prägt Dersut bis heute.</>,
  storyP2: 'Aus einer kleinen Rösterei wurde eine der bekanntesten Espresso-Marken Nordostitaliens, mit eigenem Kaffeemuseum, eigener Barista-Akademie und einem neuen, nachhaltigen Hauptsitz in Conegliano.',
  storyLink: 'Die ganze Geschichte',
  qualityEyebrow: 'Qualität & Röstung',
  qualityTitle: 'Vom Kaffeegürtel in Ihre Tasse',
  steps: [
    {
      alt: 'Auswahl der Kaffeebohnen',
      h: 'Ausgewählte Herkünfte',
      p: <>Rohkaffee aus dem Kaffeegürtel, etwa Santos aus Brasilien oder Limu aus Äthiopien, sorgfältig ausgewählt für jede Mischung.</>,
    },
    {
      alt: 'Röstung bei Dersut in Conegliano',
      h: 'Zweistufige Röstung',
      p: <>Vorröstung bei 150&nbsp;°C, Hauptröstung bei 210 bis 220&nbsp;°C. Der Doppeltrommel-Röster verarbeitet 240&nbsp;kg in 12 Minuten, für konstante Qualität.</>,
    },
    {
      alt: 'Geröstete Kaffeebohnen',
      h: 'Bohne für Bohne geprüft',
      p: <>Eine elektronische polychromatische Selektion kontrolliert jede einzelne Bohne auf Farbe und Röstgrad, bevor gemischt und verpackt wird.</>,
    },
  ],
  qualityLink: 'Mehr über unsere Qualität',
  certEyebrow: 'Ausgezeichnet',
  certTitle: 'Zertifiziert, prämiert, anerkannt',
  certLead: 'Dersut trägt das Siegel «Espresso Italiano Certificato» des Istituto Espresso Italiano und das Zeichen «Espresso Italiano di Qualità» des Gruppo Italiano Torrefattori Caffè.',
  certLink: 'Alle Zertifizierungen ansehen',
  howEyebrow: 'So einfach geht’s',
  howTitle: 'Bestellen in drei Schritten',
  howLead: 'Sicher und ohne Kartenangaben: Sie bezahlen bequem per Banküberweisung, wir versenden sofort nach Zahlungseingang.',
  how: [
    ['Bestellen', 'Wählen Sie Ihren Espresso und schliessen Sie die Bestellung ab. Sie erhalten sofort eine Bestellnummer.'],
    ['Überweisen', `Überweisen Sie den Betrag unter Angabe der Bestellnummer auf unser Konto bei der ${config.bank.bank}.`],
    ['Geniessen', 'Nach Zahlungseingang versenden wir mit der Post. Sie erhalten eine Versandbestätigung per E-Mail.'],
  ],
  distAlt: 'Espressomaschine mit Dersut Kaffee',
  distEyebrow: 'Offizieller Vertrieb',
  distTitle: 'Dersut in der Schweiz: aus erster Hand',
  distText: `Die ${config.company.name} hat den Vertrieb von Dersut Caffè in der Schweiz übernommen. Damit erhalten Sie Originalware direkt aus der Rösterei in Conegliano, mit Schweizer Ansprechpartner, Rechnung in Franken und Versand innerhalb der Schweiz.`,
  distChecks: [
    'Originalprodukte direkt von Dersut Caffè S.p.A.',
    'Schweizer Ansprechpartner und Kundenservice',
    'Preise in CHF inklusive MWST, keine Zollüberraschungen',
    'Angebote für Gastronomie, Hotellerie und Büros',
  ],
  distLink: 'Mehr zum offiziellen Vertrieb',
  ctaEyebrow: 'Gastronomie & Büro',
  ctaTitle: 'Dersut für Ihre Bar, Ihr Restaurant oder Ihr Büro?',
  ctaText: 'Wir beraten Sie gerne zu Mischungen, Mengen und Konditionen für Geschäftskunden in der ganzen Schweiz.',
  ctaButton: 'Angebot anfragen',
};

const T: Record<Locale, typeof de> = {
  de,
  fr: {
    metaTitle: 'Café Dersut Suisse · Espresso italien original en ligne',
    metaDescription: 'Café Dersut de Conegliano, tradition italienne de l’espresso depuis 1947. Grains d’espresso chez le distributeur officiel, livrés dans toute la Suisse.',
    heroAlt: 'Espresso de Dersut Caffè',
    heroKicker: 'Distributeur officiel en Suisse',
    heroLead: 'Depuis 1947, Dersut Caffè torréfie à Conegliano des mélanges d’espresso à l’âme italienne. Désormais disponible officiellement en Suisse : directement auprès du distributeur, livré dans toute la Suisse.',
    heroShop: 'Vers la boutique en ligne',
    heroStory: 'Notre histoire',
    proof: ['Espresso Italiano Certificato', 'Produits originaux de Conegliano', 'Livraison CHF 9.–'],
    figures: [
      'fondée à Trieste et Conegliano',
      'bars et commerces font confiance à Dersut',
      'd’énergie issue de notre propre installation solaire',
      'certificats, prix et adhésions',
    ],
    shopEyebrow: 'Boutique en ligne',
    shopTitle: 'Nos grains d’espresso',
    shopLead: 'Deux classiques de la maison Dersut, tout droit venus de Conegliano. L’assortiment s’enrichit en continu et au fil des saisons.',
    storyAlt: 'La famille Caballini, propriétaire de Dersut Caffè',
    storyEyebrow: 'Histoire',
    storyTitle: <>Une famille.<br />Une passion. Depuis 1947.</>,
    storyP1: <>En 1947, les Triestins Marcello De Rosa et Giovanni Suttora fondent l’entreprise ; de leurs noms naît <strong>Der</strong>-<strong>sut</strong>. Dès 1949, la famille Caballini en reprend les rênes et façonne Dersut jusqu’à aujourd’hui.</>,
    storyP2: 'D’une petite torréfaction est née l’une des marques d’espresso les plus connues du nord-est de l’Italie, avec son propre musée du café, sa propre académie de baristas et un nouveau siège durable à Conegliano.',
    storyLink: 'Toute l’histoire',
    qualityEyebrow: 'Qualité & torréfaction',
    qualityTitle: 'De la ceinture du café à votre tasse',
    steps: [
      {
        alt: 'Sélection des grains de café',
        h: 'Des origines choisies',
        p: <>Du café vert issu de la ceinture du café, comme le Santos du Brésil ou le Limu d’Éthiopie, soigneusement sélectionné pour chaque mélange.</>,
      },
      {
        alt: 'Torréfaction chez Dersut à Conegliano',
        h: 'Une torréfaction en deux étapes',
        p: <>Pré-torréfaction à 150&nbsp;°C, torréfaction principale entre 210 et 220&nbsp;°C. Le torréfacteur à double tambour traite 240&nbsp;kg en 12 minutes, pour une qualité constante.</>,
      },
      {
        alt: 'Grains de café torréfiés',
        h: 'Contrôlé grain par grain',
        p: <>Une sélection électronique polychromatique contrôle chaque grain, sa couleur et son degré de torréfaction, avant l’assemblage et l’emballage.</>,
      },
    ],
    qualityLink: 'En savoir plus sur notre qualité',
    certEyebrow: 'Distinctions',
    certTitle: 'Certifié, primé, reconnu',
    certLead: 'Dersut porte le label « Espresso Italiano Certificato » de l’Istituto Espresso Italiano et le label « Espresso Italiano di Qualità » du Gruppo Italiano Torrefattori Caffè.',
    certLink: 'Voir toutes les certifications',
    howEyebrow: 'Rien de plus simple',
    howTitle: 'Commander en trois étapes',
    howLead: 'Sûr et sans données de carte : vous payez simplement par virement bancaire, nous expédions dès réception du paiement.',
    how: [
      ['Commander', 'Choisissez votre espresso et finalisez la commande. Vous recevez immédiatement un numéro de commande.'],
      ['Virer', `Virez le montant en indiquant le numéro de commande sur notre compte auprès de la ${config.bank.bank}.`],
      ['Savourer', 'Dès réception du paiement, nous expédions par La Poste. Vous recevez une confirmation d’expédition par e-mail.'],
    ],
    distAlt: 'Machine à espresso avec du café Dersut',
    distEyebrow: 'Distributeur officiel',
    distTitle: 'Dersut en Suisse : de première main',
    distText: `${config.company.name} a repris la distribution de Dersut Caffè en Suisse. Vous recevez ainsi des produits originaux directement de la torréfaction de Conegliano, avec un interlocuteur en Suisse, une facture en francs et une livraison en Suisse.`,
    distChecks: [
      'Produits originaux directement de Dersut Caffè S.p.A.',
      'Interlocuteur et service clientèle en Suisse',
      'Prix en CHF TVA incluse, sans mauvaise surprise douanière',
      'Offres pour la restauration, l’hôtellerie et les bureaux',
    ],
    distLink: 'En savoir plus sur la distribution officielle',
    ctaEyebrow: 'Restauration & bureau',
    ctaTitle: 'Dersut pour votre bar, votre restaurant ou votre bureau ?',
    ctaText: 'Nous vous conseillons volontiers sur les mélanges, les quantités et les conditions pour les clients professionnels dans toute la Suisse.',
    ctaButton: 'Demander une offre',
  },
  it: {
    metaTitle: 'Caffè Dersut Svizzera · Vero espresso italiano online',
    metaDescription: 'Caffè Dersut da Conegliano, tradizione italiana dell’espresso dal 1947. Acquistate caffè in grani dal distributore ufficiale, con consegna in tutta la Svizzera.',
    heroAlt: 'Espresso di Dersut Caffè',
    heroKicker: 'Distributore ufficiale Svizzera',
    heroLead: 'Dal 1947 Dersut Caffè tosta a Conegliano miscele per espresso dall’anima italiana. Ora disponibile ufficialmente in Svizzera: direttamente dal distributore, con consegna in tutta la Svizzera.',
    heroShop: 'Al negozio online',
    heroStory: 'La nostra storia',
    proof: ['Espresso Italiano Certificato', 'Prodotti originali da Conegliano', 'Spedizione CHF 9.–'],
    figures: [
      'fondata a Trieste e Conegliano',
      'bar e negozi si affidano a Dersut',
      'di energia dal proprio impianto solare',
      'certificazioni, premi e affiliazioni',
    ],
    shopEyebrow: 'Negozio online',
    shopTitle: 'Il nostro caffè in grani',
    shopLead: 'Due classici di casa Dersut, freschi da Conegliano. L’assortimento viene ampliato costantemente e secondo le stagioni.',
    storyAlt: 'La famiglia Caballini, proprietaria di Dersut Caffè',
    storyEyebrow: 'Storia',
    storyTitle: <>Una famiglia.<br />Una passione. Dal 1947.</>,
    storyP1: <>Nel 1947 i triestini Marcello De Rosa e Giovanni Suttora fondano l’azienda; dai loro cognomi nasce <strong>Der</strong>-<strong>sut</strong>. Già nel 1949 subentra la famiglia Caballini, che guida Dersut ancora oggi.</>,
    storyP2: 'Da una piccola torrefazione è nato uno dei marchi di espresso più noti del Nord-est italiano, con un proprio museo del caffè, una propria accademia per baristi e una nuova sede sostenibile a Conegliano.',
    storyLink: 'Tutta la storia',
    qualityEyebrow: 'Qualità & tostatura',
    qualityTitle: 'Dalla fascia del caffè alla vostra tazzina',
    steps: [
      {
        alt: 'Selezione dei chicchi di caffè',
        h: 'Origini selezionate',
        p: <>Caffè verde dalla fascia del caffè, come il Santos dal Brasile o il Limu dall’Etiopia, scelto con cura per ogni miscela.</>,
      },
      {
        alt: 'Tostatura da Dersut a Conegliano',
        h: 'Tostatura in due fasi',
        p: <>Pre-tostatura a 150&nbsp;°C, tostatura principale tra 210 e 220&nbsp;°C. La tostatrice a doppio tamburo lavora 240&nbsp;kg in 12 minuti, per una qualità costante.</>,
      },
      {
        alt: 'Chicchi di caffè tostati',
        h: 'Controllato chicco per chicco',
        p: <>Una selezione elettronica policromatica controlla ogni singolo chicco per colore e grado di tostatura, prima della miscelazione e del confezionamento.</>,
      },
    ],
    qualityLink: 'Scoprite di più sulla nostra qualità',
    certEyebrow: 'Riconoscimenti',
    certTitle: 'Certificato, premiato, riconosciuto',
    certLead: 'Dersut porta il marchio «Espresso Italiano Certificato» dell’Istituto Espresso Italiano e il marchio «Espresso Italiano di Qualità» del Gruppo Italiano Torrefattori Caffè.',
    certLink: 'Vedi tutte le certificazioni',
    howEyebrow: 'Semplicissimo',
    howTitle: 'Ordinare in tre passi',
    howLead: 'Sicuro e senza dati della carta: pagate comodamente con bonifico bancario, spediamo subito dopo il ricevimento del pagamento.',
    how: [
      ['Ordinare', 'Scegliete il vostro espresso e concludete l’ordine. Ricevete subito un numero d’ordine.'],
      ['Bonificare', `Bonificate l’importo indicando il numero d’ordine sul nostro conto presso la ${config.bank.bank}.`],
      ['Gustare', 'Dopo il ricevimento del pagamento spediamo con la Posta. Ricevete una conferma di spedizione via e-mail.'],
    ],
    distAlt: 'Macchina per espresso con caffè Dersut',
    distEyebrow: 'Distributore ufficiale',
    distTitle: 'Dersut in Svizzera: di prima mano',
    distText: `${config.company.name} ha assunto la distribuzione di Dersut Caffè in Svizzera. Ricevete così prodotti originali direttamente dalla torrefazione di Conegliano, con un interlocutore in Svizzera, fattura in franchi svizzeri e spedizione in Svizzera.`,
    distChecks: [
      'Prodotti originali direttamente da Dersut Caffè S.p.A.',
      'Interlocutore e servizio clienti in Svizzera',
      'Prezzi in CHF IVA inclusa, nessuna sorpresa doganale',
      'Offerte per gastronomia, settore alberghiero e uffici',
    ],
    distLink: 'Di più sulla distribuzione ufficiale',
    ctaEyebrow: 'Gastronomia & ufficio',
    ctaTitle: 'Dersut per il vostro bar, ristorante o ufficio?',
    ctaText: 'Vi consigliamo volentieri su miscele, quantità e condizioni per clienti commerciali in tutta la Svizzera.',
    ctaButton: 'Richiedere un’offerta',
  },
  en: {
    metaTitle: 'Dersut Coffee Switzerland · Original Italian Espresso Online',
    metaDescription: 'Dersut Caffè from Conegliano, Italian espresso tradition since 1947. Buy Dersut espresso beans from the official distributor, delivered throughout Switzerland.',
    heroAlt: 'Espresso by Dersut Caffè',
    heroKicker: 'Official distributor in Switzerland',
    heroLead: 'Since 1947, Dersut Caffè has been roasting espresso blends with an Italian soul in Conegliano. Now officially available in Switzerland: direct from the distributor, delivered throughout Switzerland.',
    heroShop: 'Visit the online shop',
    heroStory: 'Our story',
    proof: ['Espresso Italiano Certificato', 'Original products from Conegliano', 'Shipping CHF 9.–'],
    figures: [
      'founded in Trieste and Conegliano',
      'bars and shops rely on Dersut',
      'of energy from our own solar plant',
      'certificates, awards and memberships',
    ],
    shopEyebrow: 'Online shop',
    shopTitle: 'Our espresso beans',
    shopLead: 'Two classics from the house of Dersut, fresh from Conegliano. The range is continually expanded with new and seasonal additions.',
    storyAlt: 'The Caballini family, owners of Dersut Caffè',
    storyEyebrow: 'History',
    storyTitle: <>One family.<br />One passion. Since 1947.</>,
    storyP1: <>In 1947, Marcello De Rosa and Giovanni Suttora from Trieste founded the company, and their names gave rise to <strong>Der</strong>-<strong>sut</strong>. In 1949 the Caballini family took over, and has shaped Dersut ever since.</>,
    storyP2: 'A small roastery has grown into one of the best-known espresso brands in north-eastern Italy, with its own coffee museum, its own barista academy and a new, sustainable headquarters in Conegliano.',
    storyLink: 'The full story',
    qualityEyebrow: 'Quality & roasting',
    qualityTitle: 'From the coffee belt to your cup',
    steps: [
      {
        alt: 'Selecting the coffee beans',
        h: 'Selected origins',
        p: <>Green coffee from the coffee belt, such as Santos from Brazil or Limu from Ethiopia, carefully chosen for each blend.</>,
      },
      {
        alt: 'Roasting at Dersut in Conegliano',
        h: 'Two-stage roasting',
        p: <>Pre-roasting at 150&nbsp;°C, main roasting at 210 to 220&nbsp;°C. The twin-drum roaster processes 240&nbsp;kg in 12 minutes, for consistent quality.</>,
      },
      {
        alt: 'Roasted coffee beans',
        h: 'Checked bean by bean',
        p: <>An electronic polychromatic sorter checks every single bean for colour and degree of roast before blending and packing.</>,
      },
    ],
    qualityLink: 'More about our quality',
    certEyebrow: 'Recognised',
    certTitle: 'Certified, award-winning, recognised',
    certLead: 'Dersut bears the “Espresso Italiano Certificato” seal of the Istituto Espresso Italiano and the “Espresso Italiano di Qualità” mark of the Gruppo Italiano Torrefattori Caffè.',
    certLink: 'View all certifications',
    howEyebrow: 'It’s that easy',
    howTitle: 'Order in three steps',
    howLead: 'Secure and without card details: you pay conveniently by bank transfer, and we ship as soon as your payment arrives.',
    how: [
      ['Order', 'Choose your espresso and complete your order. You will immediately receive an order number.'],
      ['Transfer', `Transfer the amount, quoting your order number, to our account with ${config.bank.bank}.`],
      ['Enjoy', 'Once your payment has arrived, we ship with Swiss Post. You will receive a shipping confirmation by email.'],
    ],
    distAlt: 'Espresso machine with Dersut coffee',
    distEyebrow: 'Official distributor',
    distTitle: 'Dersut in Switzerland: first-hand',
    distText: `${config.company.name} has taken over the distribution of Dersut Caffè in Switzerland. This means you receive original products direct from the roastery in Conegliano, with a Swiss contact, invoicing in Swiss francs and shipping within Switzerland.`,
    distChecks: [
      'Original products direct from Dersut Caffè S.p.A.',
      'Swiss contact and customer service',
      'Prices in CHF including VAT, no customs surprises',
      'Offers for restaurants, hotels and offices',
    ],
    distLink: 'More about the official distribution',
    ctaEyebrow: 'Hospitality & office',
    ctaTitle: 'Dersut for your bar, restaurant or office?',
    ctaText: 'We are happy to advise you on blends, quantities and terms for business customers throughout Switzerland.',
    ctaButton: 'Request an offer',
  },
};

const STEP_IMGS: BrandKey[] = ['selezione', 'tostatura', 'caffe'];
const HOW_ICONS = ['bag', 'bank', 'truck'] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  return pageMeta(lang, PATH, T[lang].metaTitle, T[lang].metaDescription, { absoluteTitle: true });
}

export default async function Home({ params }: Props) {
  const lang = asLocale((await params).lang);
  const t = T[lang];
  const products = await getProducts(true, lang);
  const siteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Dersut Kaffee Schweiz',
    url: absolute(lp(lang, '/')),
    inLanguage: LOCALE_TAGS[lang],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(siteLd)} />
      <section className="hero">
        <div className="hero__media"><Img src={brand('hero_1')} alt={t.heroAlt} className="hero__img" eager /></div>
        <div className="wrap hero__inner">
          <p className="hero__kicker"><span className="rule" /> {t.heroKicker}</p>
          <h1 className="hero__title">Il vero espresso<br /><em>italiano.</em></h1>
          <p className="hero__lead">{t.heroLead}</p>
          <div className="hero__cta">
            <Link className="btn btn--gold btn--lg" href={lp(lang, '/shop')}>{t.heroShop} <Icon name="arrow" /></Link>
            <Link className="btn btn--outline-light btn--lg" href={lp(lang, '/geschichte')}>{t.heroStory}</Link>
          </div>
          <ul className="hero__proof">
            <li><Icon name="award" /> {t.proof[0]}</li>
            <li><Icon name="shield" /> {t.proof[1]}</li>
            <li><Icon name="truck" /> {t.proof[2]}</li>
          </ul>
        </div>
        <div className="hero__since" aria-hidden="true">Dal 1947</div>
      </section>

      <section className="figures">
        <div className="wrap figures__grid">
          <div className="figure"><span className="figure__num">1947</span><span className="figure__txt">{t.figures[0]}</span></div>
          <div className="figure"><span className="figure__num">4’000<sup>+</sup></span><span className="figure__txt">{t.figures[1]}</span></div>
          <div className="figure"><span className="figure__num">80&nbsp;%</span><span className="figure__txt">{t.figures[2]}</span></div>
          <div className="figure"><span className="figure__num">14</span><span className="figure__txt">{t.figures[3]}</span></div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <header className="section__head">
            <p className="eyebrow">{t.shopEyebrow}</p>
            <h2 className="h2">{t.shopTitle}</h2>
            <p className="lead">{t.shopLead}</p>
          </header>
          <div className="pgrid">{products.map((p) => <ProductCard key={p.id} p={p} lang={lang} />)}</div>
        </div>
      </section>

      <section className="split split--cream">
        <div className="wrap split__inner">
          <div className="split__media frame"><Img src={brand('famiglia')} alt={t.storyAlt} /></div>
          <div className="split__text">
            <p className="eyebrow">{t.storyEyebrow}</p>
            <h2 className="h2">{t.storyTitle}</h2>
            <p>{t.storyP1}</p>
            <p>{t.storyP2}</p>
            <Link className="link-arrow" href={lp(lang, '/geschichte')}>{t.storyLink} <Icon name="arrow" /></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <header className="section__head section__head--center">
            <p className="eyebrow">{t.qualityEyebrow}</p>
            <h2 className="h2">{t.qualityTitle}</h2>
          </header>
          <div className="steps3">
            {t.steps.map((s, i) => (
              <article className="step" key={STEP_IMGS[i]}>
                <div className="step__media"><Img src={brand(STEP_IMGS[i])} alt={s.alt} /></div>
                <span className="step__no">0{i + 1}</span>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </article>
            ))}
          </div>
          <p className="center"><Link className="btn btn--outline" href={lp(lang, '/qualitaet')}>{t.qualityLink}</Link></p>
        </div>
      </section>

      <section className="certband">
        <div className="wrap">
          <header className="section__head section__head--center section__head--light">
            <p className="eyebrow eyebrow--gold">{t.certEyebrow}</p>
            <h2 className="h2">{t.certTitle}</h2>
            <p className="lead">{t.certLead}</p>
          </header>
          <div className="certlogos">
            {CERTS.map(([k, alt]) => (
              <div className="certlogo" key={k}><Img src={brand(k)} alt={alt} /><span className="certlogo__alt">{alt}</span></div>
            ))}
          </div>
          <p className="center"><Link className="btn btn--outline-light" href={lp(lang, '/zertifizierungen')}>{t.certLink}</Link></p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <header className="section__head section__head--center">
            <p className="eyebrow">{t.howEyebrow}</p>
            <h2 className="h2">{t.howTitle}</h2>
            <p className="lead">{t.howLead}</p>
          </header>
          <ol className="howto">
            {t.how.map(([h, p], i) => (
              <li key={HOW_ICONS[i]}><span className="howto__icon"><Icon name={HOW_ICONS[i]} /></span><h3>{h}</h3><p>{p}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="split split--navy">
        <div className="wrap split__inner split__inner--rev">
          <div className="split__media frame frame--gold"><Img src={brand('macchina')} alt={t.distAlt} /></div>
          <div className="split__text">
            <p className="eyebrow eyebrow--gold">{t.distEyebrow}</p>
            <h2 className="h2">{t.distTitle}</h2>
            <p>{t.distText}</p>
            <ul className="checks">
              {t.distChecks.map((c) => <li key={c}><Icon name="check" /> {c}</li>)}
            </ul>
            <Link className="link-arrow link-arrow--light" href={lp(lang, '/offizieller-vertrieb')}>{t.distLink} <Icon name="arrow" /></Link>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap cta-box">
          <div>
            <p className="eyebrow">{t.ctaEyebrow}</p>
            <h2 className="h3">{t.ctaTitle}</h2>
            <p>{t.ctaText}</p>
          </div>
          <Link className="btn btn--primary btn--lg" href={lp(lang, '/gastronomie')}>{t.ctaButton} <Icon name="arrow" /></Link>
        </div>
      </section>
    </>
  );
}
