import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { Img } from '@/components/Img';
import { PageHero } from '@/components/PageHero';
import { brand } from '@/lib/brand';
import { asLocale, lp, type Locale } from '@/lib/i18n';
import { pageMeta } from '@/lib/seo';

type Props = { params: Promise<{ lang: string }> };

const PATH = '/qualitaet';

const de = {
  metaTitle: 'Qualität & Röstung von Dersut Kaffee',
  metaDescription: 'Wie Dersut Caffè in Conegliano Rohkaffee auswählt, zweistufig röstet, Bohne für Bohne kontrolliert und mischt. Espressobohnen kaufen in der Schweiz.',
  crumb: 'Qualität & Röstung',
  eyebrow: 'Qualità Dersut',
  title: <>Vom Kaffeegürtel<br /><em>in Ihre Tasse</em></>,
  lead: 'Neun Schritte, ein Anspruch: Jede Bohne, die Conegliano verlässt, soll den italienischen Espresso in seiner besten Form zeigen.',
  originEyebrow: 'Herkunft',
  originTitle: 'Ausgewählte Bohnen aus dem Kaffeegürtel',
  originLead: 'Dersut bezieht Rohkaffee aus dem Gürtel zwischen den Wendekreisen des Krebses und des Steinbocks. Jede Herkunft bringt ihren eigenen Charakter in die Mischung.',
  origins: [
    ['Santos, Brasilien', 'Weiches, volles Aroma mit einem Nachklang von Schokolade.'],
    ['Limu, Äthiopien', 'Ein Zusammenspiel von Säure und Süsse mit Noten von Jasmin und Zitrus.'],
    ['El Salvador', 'Arabica mit wenig Koffein, zartem und leicht würzigem Aroma.'],
  ],
  chainEyebrow: 'Die Wertschöpfungskette',
  chainTitle: 'Neun Schritte bis zur perfekten Bohne',
  steps: [
    ['Kaffeegürtel', 'Anbau in den besten Regionen zwischen den Wendekreisen.'],
    ['Ernte', 'Die Kirschen werden geerntet und von Blättern, Steinen und Erde befreit.'],
    ['Aufbereitung', 'Die Bohnen werden trocken oder nass vom Fruchtfleisch getrennt.'],
    ['Verschiffung', 'Der Rohkaffee reist in Säcken aus Polypropylen nach Europa.'],
    ['Ankunft in Conegliano', 'Im Werk in Conegliano wird jede Lieferung eingelagert und geprüft.'],
    ['Röstung', 'Zweistufig: Vorröstung bei 150 °C, Hauptröstung bei 210 bis 220 °C.'],
    ['Abkühlung', 'Mit Luft gekühlt, damit die Aromen erhalten bleiben.'],
    ['Mischung', 'Die Sorten werden in einem rotierenden Trommelmischer zur Rezeptur vereint.'],
    ['Verpackung', 'Verpackt und unter kontrollierten Klimabedingungen gelagert.'],
  ],
  roastAlt: 'Doppeltrommel-Röster bei Dersut',
  roastEyebrow: 'Röstung',
  roastTitle: <>240&nbsp;kg in 12 Minuten. Jedes Mal gleich gut.</>,
  roastText: <>Das Herz der Rösterei ist ein Doppeltrommel-Röster, der 240&nbsp;kg Kaffee in zwölf Minuten röstet. Die zweistufige Röstung sorgt dafür, dass jede Charge den gleichen Charakter hat, Tag für Tag.</>,
  roastChecks: [
    <>Vorröstung bei 150&nbsp;°C</>,
    <>Hauptröstung bei 210 bis 220&nbsp;°C</>,
    <>Luftkühlung zum Schutz der Aromen</>,
  ],
  qcAlt: 'Elektronische Selektion der Kaffeebohnen',
  qcEyebrow: 'Qualitätskontrolle',
  qcTitle: 'Bohne für Bohne geprüft',
  qcP1: 'Eine elektronische polychromatische Selektion überwacht jede einzelne Bohne auf Farbe und Röstgrad. Was nicht dem Standard entspricht, wird aussortiert.',
  qcP2: 'Diese Sorgfalt ist die Grundlage für die Zertifizierung «Espresso Italiano Certificato» und das Qualitätszeichen «Espresso Italiano di Qualità».',
  qcLink: 'Zu den Zertifizierungen',
  tipsEyebrow: 'Zuhause wie in der Bar',
  tipsTitle: 'So gelingt Ihr Espresso',
  tips: [
    ['bean', 'Frisch mahlen', 'Mahlen Sie die Bohnen erst unmittelbar vor der Zubereitung. So bleibt das volle Aroma erhalten.'],
    ['clock', 'Richtig dosieren', 'Als Richtwert gelten rund 7 g Kaffee für einen Espresso und eine Extraktion von 20 bis 30 Sekunden.'],
    ['box', 'Gut lagern', 'Die Packung nach dem Öffnen gut verschliessen und kühl, trocken und lichtgeschützt aufbewahren.'],
  ],
};

const T: Record<Locale, typeof de> = {
  de,
  fr: {
    metaTitle: 'Qualité & torréfaction du café Dersut',
    metaDescription: 'Comment Dersut Caffè à Conegliano sélectionne le café vert, le torréfie en deux étapes, le contrôle grain par grain et l’assemble. Grains d’espresso en Suisse.',
    crumb: 'Qualité & torréfaction',
    eyebrow: 'Qualità Dersut',
    title: <>De la ceinture du café<br /><em>à votre tasse</em></>,
    lead: 'Neuf étapes, une seule exigence : chaque grain qui quitte Conegliano doit révéler l’espresso italien sous son meilleur jour.',
    originEyebrow: 'Origine',
    originTitle: 'Des grains sélectionnés dans la ceinture du café',
    originLead: 'Dersut s’approvisionne en café vert dans la ceinture située entre le tropique du Cancer et le tropique du Capricorne. Chaque origine apporte son propre caractère à l’assemblage.',
    origins: [
      ['Santos, Brésil', 'Un arôme doux et rond, avec une finale chocolatée.'],
      ['Limu, Éthiopie', 'Un équilibre entre acidité et douceur, aux notes de jasmin et d’agrumes.'],
      ['El Salvador', 'Un arabica peu caféiné, à l’arôme délicat et légèrement épicé.'],
    ],
    chainEyebrow: 'La chaîne de valeur',
    chainTitle: 'Neuf étapes jusqu’au grain parfait',
    steps: [
      ['Ceinture du café', 'Culture dans les meilleures régions situées entre les tropiques.'],
      ['Récolte', 'Les cerises sont récoltées, puis débarrassées des feuilles, des pierres et de la terre.'],
      ['Traitement', 'Les grains sont séparés de la pulpe par voie sèche ou humide.'],
      ['Transport maritime', 'Le café vert voyage vers l’Europe dans des sacs en polypropylène.'],
      ['Arrivée à Conegliano', 'À l’usine de Conegliano, chaque livraison est stockée et contrôlée.'],
      ['Torréfaction', 'En deux étapes : pré-torréfaction à 150 °C, torréfaction principale entre 210 et 220 °C.'],
      ['Refroidissement', 'Refroidi à l’air pour préserver les arômes.'],
      ['Assemblage', 'Les variétés sont réunies selon la recette dans un mélangeur à tambour rotatif.'],
      ['Conditionnement', 'Emballé puis stocké dans des conditions climatiques contrôlées.'],
    ],
    roastAlt: 'Torréfacteur à double tambour chez Dersut',
    roastEyebrow: 'Torréfaction',
    roastTitle: <>240&nbsp;kg en 12 minutes. Toujours la même excellence.</>,
    roastText: <>Le cœur de la torréfaction est un torréfacteur à double tambour qui torréfie 240&nbsp;kg de café en douze minutes. La torréfaction en deux étapes garantit que chaque lot présente le même caractère, jour après jour.</>,
    roastChecks: [
      <>Pré-torréfaction à 150&nbsp;°C</>,
      <>Torréfaction principale entre 210 et 220&nbsp;°C</>,
      <>Refroidissement à l’air pour préserver les arômes</>,
    ],
    qcAlt: 'Tri électronique des grains de café',
    qcEyebrow: 'Contrôle qualité',
    qcTitle: 'Contrôlé grain par grain',
    qcP1: 'Un tri électronique polychromatique contrôle chaque grain selon sa couleur et son degré de torréfaction. Tout ce qui ne répond pas au standard est écarté.',
    qcP2: 'Ce soin est à la base de la certification « Espresso Italiano Certificato » et du label de qualité « Espresso Italiano di Qualità ».',
    qcLink: 'Voir les certifications',
    tipsEyebrow: 'À la maison comme au bar',
    tipsTitle: 'Réussir votre espresso',
    tips: [
      ['bean', 'Moudre frais', 'Moulez les grains juste avant la préparation : l’arôme est ainsi pleinement préservé.'],
      ['clock', 'Bien doser', 'À titre indicatif : environ 7 g de café pour un espresso et une extraction de 20 à 30 secondes.'],
      ['box', 'Bien conserver', 'Après ouverture, bien refermer le paquet et le conserver au frais, au sec et à l’abri de la lumière.'],
    ],
  },
  it: {
    metaTitle: 'Qualità e tostatura del caffè Dersut',
    metaDescription: 'Come Dersut Caffè a Conegliano seleziona il caffè crudo, lo tosta in due fasi, lo controlla chicco per chicco e lo miscela. Caffè in grani in Svizzera.',
    crumb: 'Qualità & tostatura',
    eyebrow: 'Qualità Dersut',
    title: <>Dalla fascia del caffè<br /><em>alla vostra tazzina</em></>,
    lead: 'Nove fasi, un’unica ambizione: ogni chicco che lascia Conegliano deve esprimere l’espresso italiano nella sua forma migliore.',
    originEyebrow: 'Origine',
    originTitle: 'Chicchi selezionati dalla fascia del caffè',
    originLead: 'Dersut acquista il caffè crudo nella fascia compresa tra il Tropico del Cancro e il Tropico del Capricorno. Ogni origine porta nella miscela il proprio carattere.',
    origins: [
      ['Santos, Brasile', 'Aroma morbido e pieno, con un finale di cioccolato.'],
      ['Limu, Etiopia', 'Un equilibrio tra acidità e dolcezza, con note di gelsomino e agrumi.'],
      ['El Salvador', 'Arabica a basso contenuto di caffeina, dall’aroma delicato e leggermente speziato.'],
    ],
    chainEyebrow: 'La filiera',
    chainTitle: 'Nove fasi fino al chicco perfetto',
    steps: [
      ['Fascia del caffè', 'Coltivazione nelle migliori regioni tra i tropici.'],
      ['Raccolta', 'Le ciliegie vengono raccolte e liberate da foglie, sassi e terra.'],
      ['Lavorazione', 'I chicchi vengono separati dalla polpa con metodo a secco o a umido.'],
      ['Trasporto via mare', 'Il caffè crudo viaggia verso l’Europa in sacchi di polipropilene.'],
      ['Arrivo a Conegliano', 'Nello stabilimento di Conegliano ogni fornitura viene immagazzinata e controllata.'],
      ['Tostatura', 'In due fasi: pretostatura a 150 °C, tostatura principale tra 210 e 220 °C.'],
      ['Raffreddamento', 'Raffreddato ad aria per preservare gli aromi.'],
      ['Miscelazione', 'Le varietà vengono unite secondo la ricetta in un miscelatore a tamburo rotante.'],
      ['Confezionamento', 'Confezionato e conservato in condizioni climatiche controllate.'],
    ],
    roastAlt: 'Tostatrice a doppio tamburo da Dersut',
    roastEyebrow: 'Tostatura',
    roastTitle: <>240&nbsp;kg in 12 minuti. Ogni volta con la stessa qualità.</>,
    roastText: <>Il cuore della torrefazione è una tostatrice a doppio tamburo che tosta 240&nbsp;kg di caffè in dodici minuti. La tostatura in due fasi garantisce che ogni lotto abbia lo stesso carattere, giorno dopo giorno.</>,
    roastChecks: [
      <>Pretostatura a 150&nbsp;°C</>,
      <>Tostatura principale tra 210 e 220&nbsp;°C</>,
      <>Raffreddamento ad aria per preservare gli aromi</>,
    ],
    qcAlt: 'Selezione elettronica dei chicchi di caffè',
    qcEyebrow: 'Controllo qualità',
    qcTitle: 'Controllato chicco per chicco',
    qcP1: 'Una selezionatrice elettronica policromatica controlla ogni singolo chicco per colore e grado di tostatura. Ciò che non corrisponde allo standard viene scartato.',
    qcP2: 'Questa cura è alla base della certificazione «Espresso Italiano Certificato» e del marchio di qualità «Espresso Italiano di Qualità».',
    qcLink: 'Scopri le certificazioni',
    tipsEyebrow: 'A casa come al bar',
    tipsTitle: 'Il vostro espresso perfetto',
    tips: [
      ['bean', 'Macinare al momento', 'Macinate i chicchi solo subito prima della preparazione: così l’aroma resta intatto.'],
      ['clock', 'Dosare correttamente', 'Come riferimento valgono circa 7 g di caffè per un espresso e un’estrazione di 20–30 secondi.'],
      ['box', 'Conservare bene', 'Dopo l’apertura richiudete bene la confezione e conservatela in luogo fresco, asciutto e al riparo dalla luce.'],
    ],
  },
  en: {
    metaTitle: 'Quality & roasting of Dersut coffee',
    metaDescription: 'How Dersut Caffè in Conegliano selects green coffee, roasts it in two stages, checks it bean by bean and blends it. Buy espresso beans in Switzerland.',
    crumb: 'Quality & roasting',
    eyebrow: 'Qualità Dersut',
    title: <>From the coffee belt<br /><em>to your cup</em></>,
    lead: 'Nine steps, one ambition: every bean that leaves Conegliano should show Italian espresso at its very best.',
    originEyebrow: 'Origin',
    originTitle: 'Selected beans from the coffee belt',
    originLead: 'Dersut sources its green coffee from the belt between the Tropic of Cancer and the Tropic of Capricorn. Each origin brings its own character to the blend.',
    origins: [
      ['Santos, Brazil', 'A smooth, full aroma with a chocolatey finish.'],
      ['Limu, Ethiopia', 'An interplay of acidity and sweetness with notes of jasmine and citrus.'],
      ['El Salvador', 'Low-caffeine Arabica with a delicate, slightly spicy aroma.'],
    ],
    chainEyebrow: 'The value chain',
    chainTitle: 'Nine steps to the perfect bean',
    steps: [
      ['Coffee belt', 'Grown in the finest regions between the tropics.'],
      ['Harvest', 'The cherries are picked and cleaned of leaves, stones and soil.'],
      ['Processing', 'The beans are separated from the pulp using the dry or wet method.'],
      ['Shipping', 'The green coffee travels to Europe in polypropylene sacks.'],
      ['Arrival in Conegliano', 'At the Conegliano plant, every delivery is stored and inspected.'],
      ['Roasting', 'In two stages: pre-roasting at 150 °C, main roasting at 210 to 220 °C.'],
      ['Cooling', 'Air-cooled to preserve the aromas.'],
      ['Blending', 'The varieties are combined to the recipe in a rotating drum mixer.'],
      ['Packaging', 'Packed and stored under controlled climatic conditions.'],
    ],
    roastAlt: 'Twin-drum roaster at Dersut',
    roastEyebrow: 'Roasting',
    roastTitle: <>240&nbsp;kg in 12 minutes. Consistently excellent.</>,
    roastText: <>The heart of the roastery is a twin-drum roaster that roasts 240&nbsp;kg of coffee in twelve minutes. Two-stage roasting ensures that every batch has the same character, day after day.</>,
    roastChecks: [
      <>Pre-roasting at 150&nbsp;°C</>,
      <>Main roasting at 210 to 220&nbsp;°C</>,
      <>Air cooling to protect the aromas</>,
    ],
    qcAlt: 'Electronic sorting of coffee beans',
    qcEyebrow: 'Quality control',
    qcTitle: 'Checked bean by bean',
    qcP1: 'An electronic polychromatic sorter checks every single bean for colour and degree of roast. Anything that does not meet the standard is removed.',
    qcP2: 'This care is the basis for the “Espresso Italiano Certificato” certification and the “Espresso Italiano di Qualità” quality mark.',
    qcLink: 'View the certifications',
    tipsEyebrow: 'At home as in the bar',
    tipsTitle: 'How to make the perfect espresso',
    tips: [
      ['bean', 'Grind fresh', 'Grind the beans just before brewing to preserve their full aroma.'],
      ['clock', 'Dose correctly', 'As a guide, use around 7 g of coffee per espresso with an extraction time of 20 to 30 seconds.'],
      ['box', 'Store well', 'After opening, close the pack tightly and keep it in a cool, dry place away from light.'],
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  return pageMeta(lang, PATH, T[lang].metaTitle, T[lang].metaDescription);
}

export default async function Qualitaet({ params }: Props) {
  const lang = asLocale((await params).lang);
  const t = T[lang];
  return (
    <>
      <PageHero lang={lang} img={brand('tostatura')} crumb={t.crumb} eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <section className="section section--white">
        <div className="wrap">
          <header className="section__head section__head--center">
            <p className="eyebrow">{t.originEyebrow}</p>
            <h2 className="h2">{t.originTitle}</h2>
            <p className="lead">{t.originLead}</p>
          </header>
          <div className="features">
            {t.origins.map(([h, p]) => (
              <div className="feature" key={h}><Icon name="bean" /><h3>{h}</h3><p>{p}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <header className="section__head section__head--center">
            <p className="eyebrow">{t.chainEyebrow}</p>
            <h2 className="h2">{t.chainTitle}</h2>
          </header>
          <div className="features">
            {t.steps.map(([h, p], i) => (
              <div className="feature" key={h}><span className="step__no">{String(i + 1).padStart(2, '0')}</span><h3>{h}</h3><p>{p}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="split split--navy">
        <div className="wrap split__inner">
          <div className="split__media frame frame--gold"><Img src={brand('tostatura')} alt={t.roastAlt} /></div>
          <div className="split__text">
            <p className="eyebrow eyebrow--gold">{t.roastEyebrow}</p>
            <h2 className="h2">{t.roastTitle}</h2>
            <p>{t.roastText}</p>
            <ul className="checks">
              {t.roastChecks.map((c, i) => <li key={i}><Icon name="check" /> {c}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="split">
        <div className="wrap split__inner split__inner--rev">
          <div className="split__media frame"><Img src={brand('selezione')} alt={t.qcAlt} /></div>
          <div className="split__text">
            <p className="eyebrow">{t.qcEyebrow}</p>
            <h2 className="h2">{t.qcTitle}</h2>
            <p>{t.qcP1}</p>
            <p>{t.qcP2}</p>
            <Link className="link-arrow" href={lp(lang, '/zertifizierungen')}>{t.qcLink} <Icon name="arrow" /></Link>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="wrap">
          <header className="section__head section__head--center">
            <p className="eyebrow">{t.tipsEyebrow}</p>
            <h2 className="h2">{t.tipsTitle}</h2>
          </header>
          <div className="features">
            {t.tips.map(([icon, h, p]) => (
              <div className="feature" key={h}><Icon name={icon} /><h3>{h}</h3><p>{p}</p></div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
