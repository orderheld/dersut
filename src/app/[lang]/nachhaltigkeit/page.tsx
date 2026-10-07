import type { Metadata } from 'next';
import { Icon } from '@/components/Icon';
import { Img } from '@/components/Img';
import { PageHero } from '@/components/PageHero';
import { brand } from '@/lib/brand';
import { asLocale, type Locale } from '@/lib/i18n';
import { pageMeta } from '@/lib/seo';

type Props = { params: Promise<{ lang: string }> };

const PATH = '/nachhaltigkeit';

const de = {
  metaTitle: 'Nachhaltigkeit bei Dersut Kaffee',
  metaDescription: 'Solarstrom, Kreislaufwirtschaft, soziale Verantwortung: das Nachhaltigkeitsengagement von Dersut Caffè, ausgezeichnet mit dem Premio Impresa Sostenibile 2025.',
  crumb: 'Nachhaltigkeit',
  eyebrow: 'Sostenibilità',
  title: <>Verantwortung<br /><em>mit Weitblick</em></>,
  lead: 'Dersut gehört zu den ersten italienischen Röstereien, die ihre Umweltauswirkungen konsequent reduziert haben. 2025 wurde das Unternehmen dafür von Il Sole 24 Ore ausgezeichnet.',
  figures: [
    ['80 %', 'Energie-Eigenversorgung durch Photovoltaik'],
    ['90 %', 'des Solarstroms wird im eigenen Betrieb genutzt'],
    ['10 %', 'Zellulose in Papiertüten durch Kaffee-Silberhaut ersetzt'],
    ['2025', 'Premio Impresa Sostenibile, Il Sole 24 Ore'],
  ],
  envEyebrow: 'Umwelt',
  envTitle: 'Kreislaufwirtschaft rund um die Bohne',
  features: [
    ['sun', 'Strom von der Sonne', 'Photovoltaikanlagen auf dem Dach und über dem Parkplatz decken rund 80 % des Energiebedarfs des Werks in Conegliano.'],
    ['leaf', 'Saubere Luft', 'Rauchgasreiniger, Zyklon und Katalysatoren verhindern, dass Kaffeepartikel in die Atmosphäre gelangen.'],
    ['recycle', 'Papier aus Silberhaut', 'Gemeinsam mit der Papierfabrik Favini wird die Silberhaut der Bohne zu umweltfreundlichen Papiertüten verarbeitet.'],
    ['cup', 'Farbe aus Kaffeesatz', 'Mit dem Lanificio Bottoli färbt Kaffeesatz edle Textilien wie Kaschmir, Wolle und Seide auf natürliche Weise.'],
    ['box', 'Zweites Leben für Aluminium', 'In den Werkstätten von Ricrearti entstehen aus Aluminiumverpackungen neue Gebrauchsgegenstände.'],
    ['users', 'Gegen Verschwendung', 'Dersut nimmt an der Plattform Too Good To Go teil und engagiert sich gegen Lebensmittelverschwendung.'],
  ],
  originAlt: 'Blüten der Kaffeepflanze',
  originEyebrow: 'Dalla pianta alla tazza',
  originTitle: 'Respekt vor dem Ursprung',
  originText: 'Guter Espresso beginnt an der Pflanze. Dersut arbeitet mit langjährigen Partnern in den Anbauländern zusammen und achtet bei der Auswahl des Rohkaffees auf Qualität und verantwortungsvolle Herkunft.',
  govAlt: 'Neuer Hauptsitz von Dersut in Conegliano',
  govEyebrow: 'Unternehmensführung',
  govTitle: 'Transparent nach ESG-Grundsätzen',
  govText1: 'Ein eigener Ethikkodex regelt die Verantwortung von Dersut gegenüber Umwelt, Gesellschaft und guter Unternehmensführung. Seit 2021 veröffentlicht Dersut jährlich einen Nachhaltigkeitsbericht.',
  govText2: 'Der 2024 eröffnete Hauptsitz an der Via San Giuseppe in Conegliano wurde von Grund auf auf Effizienz und nachhaltige Abläufe ausgelegt.',
  awardAlt: 'Premio Impresa Sostenibile 2025 von Il Sole 24 Ore',
  awardEyebrow: 'Auszeichnung 2025',
  awardTitle: 'Premio Impresa Sostenibile',
  awardText: 'Am 22. Oktober 2025 wurde Dersut von der Wirtschaftszeitung Il Sole 24 Ore in der Kategorie «Wirtschaftliche Nachhaltigkeit» ausgezeichnet, als Anerkennung für Jahre konsequenter Arbeit an einer verantwortungsvollen Produktion.',
};

const T: Record<Locale, typeof de> = {
  de,
  fr: {
    metaTitle: 'Développement durable chez le café Dersut',
    metaDescription: 'Énergie solaire, économie circulaire et responsabilité sociale : l’engagement durable de Dersut Caffè, lauréat du Premio Impresa Sostenibile 2025.',
    crumb: 'Développement durable',
    eyebrow: 'Sostenibilità',
    title: <>Une responsabilité<br /><em>tournée vers l’avenir</em></>,
    lead: 'Dersut compte parmi les premières torréfactions italiennes à avoir réduit résolument son impact environnemental. En 2025, l’entreprise a été récompensée pour cela par Il Sole 24 Ore.',
    figures: [
      ['80 %', 'd’autonomie énergétique grâce au photovoltaïque'],
      ['90 %', 'de l’électricité solaire est consommée sur place'],
      ['10 %', 'de la cellulose des sachets en papier remplacée par la pellicule argentée du café'],
      ['2025', 'Premio Impresa Sostenibile, Il Sole 24 Ore'],
    ],
    envEyebrow: 'Environnement',
    envTitle: 'L’économie circulaire autour du grain',
    features: [
      ['sun', 'L’énergie du soleil', 'Les installations photovoltaïques sur le toit et au-dessus du parking couvrent environ 80 % des besoins énergétiques de l’usine de Conegliano.'],
      ['leaf', 'Un air pur', 'Épurateurs de fumées, cyclone et catalyseurs empêchent les particules de café de s’échapper dans l’atmosphère.'],
      ['recycle', 'Du papier à partir de la pellicule', 'Avec la papeterie Favini, la pellicule argentée du grain est transformée en sachets en papier écologiques.'],
      ['cup', 'De la couleur issue du marc', 'Avec le Lanificio Bottoli, le marc de café teint naturellement des textiles nobles comme le cachemire, la laine et la soie.'],
      ['box', 'Une seconde vie pour l’aluminium', 'Dans les ateliers de Ricrearti, les emballages en aluminium deviennent de nouveaux objets du quotidien.'],
      ['users', 'Contre le gaspillage', 'Dersut participe à la plateforme Too Good To Go et s’engage contre le gaspillage alimentaire.'],
    ],
    originAlt: 'Fleurs du caféier',
    originEyebrow: 'Dalla pianta alla tazza',
    originTitle: 'Le respect de l’origine',
    originText: 'Un bon espresso commence sur la plante. Dersut collabore avec des partenaires de longue date dans les pays producteurs et veille, dans le choix du café vert, à la qualité et à une provenance responsable.',
    govAlt: 'Nouveau siège de Dersut à Conegliano',
    govEyebrow: 'Gouvernance',
    govTitle: 'Transparence selon les principes ESG',
    govText1: 'Un code éthique propre définit la responsabilité de Dersut envers l’environnement, la société et une bonne gouvernance. Depuis 2021, Dersut publie chaque année un rapport de durabilité.',
    govText2: 'Le siège inauguré en 2024 sur la Via San Giuseppe à Conegliano a été entièrement conçu pour l’efficacité et des processus durables.',
    awardAlt: 'Premio Impresa Sostenibile 2025 d’Il Sole 24 Ore',
    awardEyebrow: 'Distinction 2025',
    awardTitle: 'Premio Impresa Sostenibile',
    awardText: 'Le 22 octobre 2025, Dersut a été distingué par le quotidien économique Il Sole 24 Ore dans la catégorie « Durabilité économique », en reconnaissance d’années de travail constant en faveur d’une production responsable.',
  },
  it: {
    metaTitle: 'Sostenibilità del caffè Dersut',
    metaDescription: 'Energia solare, economia circolare e responsabilità sociale: l’impegno di Dersut Caffè per la sostenibilità, premiato con il Premio Impresa Sostenibile 2025.',
    crumb: 'Sostenibilità',
    eyebrow: 'Sostenibilità',
    title: <>Responsabilità<br /><em>lungimirante</em></>,
    lead: 'Dersut è tra le prime torrefazioni italiane ad aver ridotto con coerenza il proprio impatto ambientale. Nel 2025 l’azienda è stata premiata per questo da Il Sole 24 Ore.',
    figures: [
      ['80 %', 'di autoproduzione energetica grazie al fotovoltaico'],
      ['90 %', 'dell’energia solare è consumata in azienda'],
      ['10 %', 'di cellulosa nei sacchetti di carta sostituita dalla pellicina del caffè'],
      ['2025', 'Premio Impresa Sostenibile, Il Sole 24 Ore'],
    ],
    envEyebrow: 'Ambiente',
    envTitle: 'Economia circolare intorno al chicco',
    features: [
      ['sun', 'Energia dal sole', 'Gli impianti fotovoltaici sul tetto e sopra il parcheggio coprono circa l’80 % del fabbisogno energetico dello stabilimento di Conegliano.'],
      ['leaf', 'Aria pulita', 'Abbattitori di fumi, ciclone e catalizzatori impediscono alle particelle di caffè di disperdersi nell’atmosfera.'],
      ['recycle', 'Carta dalla pellicina', 'Insieme alla cartiera Favini, la pellicina del chicco viene trasformata in sacchetti di carta ecologici.'],
      ['cup', 'Colore dai fondi di caffè', 'Con il Lanificio Bottoli, i fondi di caffè tingono in modo naturale tessuti pregiati come cashmere, lana e seta.'],
      ['box', 'Una seconda vita per l’alluminio', 'Nei laboratori di Ricrearti gli imballaggi in alluminio diventano nuovi oggetti d’uso quotidiano.'],
      ['users', 'Contro lo spreco', 'Dersut aderisce alla piattaforma Too Good To Go e si impegna contro lo spreco alimentare.'],
    ],
    originAlt: 'Fiori della pianta del caffè',
    originEyebrow: 'Dalla pianta alla tazza',
    originTitle: 'Rispetto per l’origine',
    originText: 'Un buon espresso nasce dalla pianta. Dersut collabora con partner di lunga data nei Paesi produttori e nella scelta del caffè verde presta attenzione alla qualità e a una provenienza responsabile.',
    govAlt: 'Nuova sede di Dersut a Conegliano',
    govEyebrow: 'Governance',
    govTitle: 'Trasparenza secondo i principi ESG',
    govText1: 'Un codice etico aziendale definisce la responsabilità di Dersut verso l’ambiente, la società e una buona governance. Dal 2021 Dersut pubblica ogni anno un bilancio di sostenibilità.',
    govText2: 'La sede inaugurata nel 2024 in Via San Giuseppe a Conegliano è stata progettata fin dall’inizio all’insegna dell’efficienza e di processi sostenibili.',
    awardAlt: 'Premio Impresa Sostenibile 2025 de Il Sole 24 Ore',
    awardEyebrow: 'Riconoscimento 2025',
    awardTitle: 'Premio Impresa Sostenibile',
    awardText: 'Il 22 ottobre 2025 Dersut è stata premiata dal quotidiano economico Il Sole 24 Ore nella categoria «Sostenibilità economica», a riconoscimento di anni di impegno costante per una produzione responsabile.',
  },
  en: {
    metaTitle: 'Sustainability at Dersut Coffee',
    metaDescription: 'Solar power, circular economy and social responsibility: the sustainability commitment of Dersut Caffè, winner of the Premio Impresa Sostenibile 2025.',
    crumb: 'Sustainability',
    eyebrow: 'Sostenibilità',
    title: <>Responsibility<br /><em>with foresight</em></>,
    lead: 'Dersut is one of the first Italian roasters to have consistently reduced its environmental impact. In 2025, Il Sole 24 Ore honoured the company for this.',
    figures: [
      ['80 %', 'energy self-sufficiency from photovoltaics'],
      ['90 %', 'of the solar power is used on site'],
      ['10 %', 'of the cellulose in paper bags replaced with coffee silverskin'],
      ['2025', 'Premio Impresa Sostenibile, Il Sole 24 Ore'],
    ],
    envEyebrow: 'Environment',
    envTitle: 'A circular economy around the bean',
    features: [
      ['sun', 'Power from the sun', 'Photovoltaic systems on the roof and above the car park cover around 80% of the energy needs of the Conegliano plant.'],
      ['leaf', 'Clean air', 'Flue gas scrubbers, a cyclone and catalytic converters stop coffee particles from escaping into the atmosphere.'],
      ['recycle', 'Paper from silverskin', 'Together with the Favini paper mill, the bean’s silverskin is turned into eco-friendly paper bags.'],
      ['cup', 'Colour from coffee grounds', 'With Lanificio Bottoli, coffee grounds naturally dye fine textiles such as cashmere, wool and silk.'],
      ['box', 'A second life for aluminium', 'In the Ricrearti workshops, aluminium packaging is turned into new everyday objects.'],
      ['users', 'Against waste', 'Dersut takes part in the Too Good To Go platform and is committed to fighting food waste.'],
    ],
    originAlt: 'Coffee plant blossoms',
    originEyebrow: 'Dalla pianta alla tazza',
    originTitle: 'Respect for the origin',
    originText: 'Great espresso begins with the plant. Dersut works with long-standing partners in the growing countries and, when selecting green coffee, pays close attention to quality and responsible sourcing.',
    govAlt: 'Dersut’s new headquarters in Conegliano',
    govEyebrow: 'Corporate governance',
    govTitle: 'Transparent, guided by ESG principles',
    govText1: 'A dedicated code of ethics sets out Dersut’s responsibility towards the environment, society and good governance. Since 2021, Dersut has published an annual sustainability report.',
    govText2: 'The headquarters on Via San Giuseppe in Conegliano, opened in 2024, was designed from the ground up for efficiency and sustainable processes.',
    awardAlt: 'Premio Impresa Sostenibile 2025 from Il Sole 24 Ore',
    awardEyebrow: 'Award 2025',
    awardTitle: 'Premio Impresa Sostenibile',
    awardText: 'On 22 October 2025, the business daily Il Sole 24 Ore honoured Dersut in the “Economic Sustainability” category, in recognition of years of consistent work towards responsible production.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  return pageMeta(lang, PATH, T[lang].metaTitle, T[lang].metaDescription);
}

export default async function Nachhaltigkeit({ params }: Props) {
  const lang = asLocale((await params).lang);
  const t = T[lang];
  return (
    <>
      <PageHero lang={lang} img={brand('foglie')} crumb={t.crumb} eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <section className="figures">
        <div className="wrap figures__grid">
          {t.figures.map(([num, txt]) => (
            <div className="figure" key={num}><span className="figure__num">{num}</span><span className="figure__txt">{txt}</span></div>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <header className="section__head section__head--center">
            <p className="eyebrow">{t.envEyebrow}</p>
            <h2 className="h2">{t.envTitle}</h2>
          </header>
          <div className="features">
            {t.features.map(([icon, h, p]) => (
              <div className="feature" key={icon}><Icon name={icon} /><h3>{h}</h3><p>{p}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="split">
        <div className="wrap split__inner split__inner--rev">
          <div className="split__media frame"><Img src={brand('fiori')} alt={t.originAlt} /></div>
          <div className="split__text">
            <p className="eyebrow">{t.originEyebrow}</p>
            <h2 className="h2">{t.originTitle}</h2>
            <p>{t.originText}</p>
          </div>
        </div>
      </section>
      <section className="split split--cream">
        <div className="wrap split__inner">
          <div className="split__media frame"><Img src={brand('nuova_sede')} alt={t.govAlt} /></div>
          <div className="split__text">
            <p className="eyebrow">{t.govEyebrow}</p>
            <h2 className="h2">{t.govTitle}</h2>
            <p>{t.govText1}</p>
            <p>{t.govText2}</p>
          </div>
        </div>
      </section>
      <section className="split">
        <div className="wrap split__inner split__inner--rev">
          <div className="split__media"><Img src={brand('premio_sole')} alt={t.awardAlt} /></div>
          <div className="split__text">
            <p className="eyebrow">{t.awardEyebrow}</p>
            <h2 className="h2">{t.awardTitle}</h2>
            <p>{t.awardText}</p>
          </div>
        </div>
      </section>
    </>
  );
}
