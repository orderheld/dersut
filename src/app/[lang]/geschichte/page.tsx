import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { Img } from '@/components/Img';
import { PageHero } from '@/components/PageHero';
import { brand, type BrandKey } from '@/lib/brand';
import { asLocale, lp, type Locale } from '@/lib/i18n';
import { pageMeta } from '@/lib/seo';

type Props = { params: Promise<{ lang: string }> };
type Milestone = [string, BrandKey, string, ReactNode];

const PATH = '/geschichte';

const de = {
  metaTitle: 'Geschichte von Dersut Caffè – seit 1947',
  metaDescription: 'Die Geschichte von Dersut Caffè: von der Gründung 1947 über die Familie Caballini bis zum neuen Hauptsitz in Conegliano. Dersut Kaffee in der Schweiz.',
  crumb: 'Geschichte',
  eyebrow: 'Dal 1947',
  title: <>Über 75 Jahre<br /><em>Leidenschaft für Espresso</em></>,
  lead: 'Von zwei Triestinern gegründet, von der Familie Caballini über Generationen geprägt: die Geschichte von Dersut Caffè aus Conegliano.',
  quoteTranslation: 'Wir arbeiten mit Leidenschaft, damit alle, die unseren Kaffee trinken, lächeln.',
  quoteCite: 'Leitsatz von Dersut Caffè',
  milestonesEyebrow: 'Meilensteine',
  milestonesTitle: 'Eine italienische Erfolgsgeschichte',
  milestones: [
    ['1947', 'history_0', 'Die Gründung', <>Die Triestiner Marcello De Rosa und Giovanni Suttora gründen das Unternehmen mit Sitz in Trieste und Betrieb in Conegliano. Aus den Anfangssilben ihrer Namen, <strong>De</strong> Rosa und <strong>Sut</strong>tora, entsteht der Name Dersut.</>],
    ['1949', 'history_1', 'Die Familie Caballini übernimmt', 'Die Familie Caballini aus Sassoferrato übernimmt das Unternehmen. Vincenzo Caballini wird zur prägenden Figur und führt Dersut zum Erfolg auf dem Markt.'],
    ['1954', 'history_2', 'Mitbegründer des Röster-Verbands', 'Dersut ist Gründungsmitglied der Gruppe der Kaffeeröster des Triveneto, die die Regionen Venetien, Trentino-Südtirol und Friaul-Julisch Venetien umfasst.'],
    ['1960', 'history_3', 'Cavaliere al Merito', 'Vincenzo Caballini wird für seine unternehmerischen Leistungen zum Ritter des Verdienstordens der Italienischen Republik ernannt.'],
    ['1971', 'history_4', 'Die nächste Generation', 'Giorgio Caballini, Sohn von Vincenzo, tritt in das Unternehmen ein und führt die Familientradition weiter.'],
    ['2002', 'history_5', 'Die erste Bottega del Caffè', 'Die erste Dersut-Kaffeeboutique eröffnet. Ein Monomarken-Konzept, das die Welt von Dersut direkt erlebbar macht.'],
    ['2010', 'history_6', 'Das Museo del Caffè', 'In Conegliano wird das Kaffeemuseum eröffnet: 600 m² Geschichte des Unternehmens, der Branche und der Region, mit historischen Maschinen, Mühlen und Röstern.'],
    ['2014', 'history_7', 'Schutz des italienischen Espresso', 'Dersut gründet in Conegliano das Konsortium zum Schutz des traditionellen italienischen Espresso mit, das die Anerkennung des Espresso als UNESCO-Kulturerbe anstrebt.'],
    ['2019', 'img_3', 'Aufbruch nach Europa', 'Die Kaffeeboutiquen werden strategisch neu gestaltet, um das Konzept auf europäische Märkte zu bringen.'],
    ['2024', 'nuova_sede', 'Der neue Hauptsitz', 'An der Via San Giuseppe in Conegliano eröffnet der neue Hauptsitz: ausgelegt auf Effizienz, Qualität und Nachhaltigkeit.'],
  ] as Milestone[],
  vincenzoAlt: 'Vincenzo Caballini, prägende Figur von Dersut Caffè',
  vincenzoP1: 'Mit der Übernahme durch die Familie Caballini 1949 begann der Aufstieg von Dersut. Vincenzo Caballini prägte das Unternehmen über Jahrzehnte, 1960 wurde er für seine Leistungen zum Cavaliere al Merito della Repubblica Italiana ernannt.',
  vincenzoP2: 'Bis heute führt die Familie Caballini Dersut in dritter Generation und verbindet Tradition mit modernem Unternehmertum.',
  museoAlt: 'Museo del Caffè Dersut in Conegliano',
  museoTitle: 'Kaffeekultur zum Anfassen',
  museoP1: <>Seit Oktober 2010 zeigt das Museo del Caffè Dersut in Conegliano auf 600&nbsp;m² und in vier Bereichen eine reiche Sammlung historischer Kaffeemaschinen, Espressomaschinen, Mühlen und Röster: die Reise des Kaffees von der Pflanze bis in die Tasse.</>,
  museoP2: 'Das Museum ist Mitglied im Netzwerk der Museen von Treviso und seit 2018 Teil von Museimpresa, dem Verband italienischer Unternehmensmuseen.',
  academyAlt: 'Barista-Ausbildung an der Accademia ABCD Dersut',
  academyTitle: 'Wissen, das man schmeckt',
  academyP: 'Mit der Accademia ABCD hat Dersut ein eigenes Ausbildungszentrum geschaffen, um die Exzellenz des italienischen Espresso weiterzugeben. Baristas und Gastronomen lernen dort alles vom Grundkurs bis zur Latte Art für Fortgeschrittene.',
  academyChecks: [
    'Barista-Kurse für Einsteiger und Profis',
    'IIAC-Verkostungszertifikat und «Espresso Italiano Specialist»',
    'Beratung vor und nach der Eröffnung eines Lokals',
  ],
  ctaEyebrow: 'Jetzt probieren',
  ctaTitle: '75 Jahre Erfahrung in jeder Tasse',
  ctaText: 'Entdecken Sie Optimum und Domus, direkt vom offiziellen Vertrieb in der Schweiz.',
  ctaButton: 'Zum Shop',
};

const T: Record<Locale, typeof de> = {
  de,
  fr: {
    metaTitle: 'Histoire de Dersut Caffè – depuis 1947',
    metaDescription: 'L’histoire de Dersut Caffè : de sa fondation en 1947 à la famille Caballini et au nouveau siège de Conegliano. Le café Dersut en Suisse, depuis 1947.',
    crumb: 'Histoire',
    eyebrow: 'Dal 1947',
    title: <>Plus de 75 ans<br /><em>de passion pour l’espresso</em></>,
    lead: 'Fondée par deux Triestins, façonnée par la famille Caballini au fil des générations : l’histoire de Dersut Caffè, à Conegliano.',
    quoteTranslation: 'Nous travaillons avec passion pour faire sourire ceux qui boivent notre café.',
    quoteCite: 'Devise de Dersut Caffè',
    milestonesEyebrow: 'Étapes clés',
    milestonesTitle: 'Une success-story italienne',
    milestones: [
      ['1947', 'history_0', 'La fondation', <>Les Triestins Marcello De Rosa et Giovanni Suttora fondent l’entreprise, avec son siège à Trieste et son exploitation à Conegliano. Des premières syllabes de leurs noms, <strong>De</strong> Rosa et <strong>Sut</strong>tora, naît le nom Dersut.</>],
      ['1949', 'history_1', 'La famille Caballini reprend l’entreprise', 'La famille Caballini, originaire de Sassoferrato, reprend l’entreprise. Vincenzo Caballini en devient la figure marquante et mène Dersut au succès sur le marché.'],
      ['1954', 'history_2', 'Cofondateur de l’association des torréfacteurs', 'Dersut est membre fondateur du groupe des torréfacteurs du Triveneto, qui réunit la Vénétie, le Trentin-Haut-Adige et le Frioul-Vénétie Julienne.'],
      ['1960', 'history_3', 'Cavaliere al Merito', 'Pour ses réalisations entrepreneuriales, Vincenzo Caballini est nommé chevalier de l’Ordre du mérite de la République italienne.'],
      ['1971', 'history_4', 'La génération suivante', 'Giorgio Caballini, fils de Vincenzo, rejoint l’entreprise et perpétue la tradition familiale.'],
      ['2002', 'history_5', 'La première Bottega del Caffè', 'Ouverture de la première boutique de café Dersut : un concept monomarque qui permet de vivre directement l’univers Dersut.'],
      ['2010', 'history_6', 'Le Museo del Caffè', 'Le musée du café ouvre ses portes à Conegliano : 600 m² consacrés à l’histoire de l’entreprise, de la branche et de la région, avec machines, moulins et torréfacteurs historiques.'],
      ['2014', 'history_7', 'Protéger l’espresso italien', 'À Conegliano, Dersut cofonde le Consortium pour la protection de l’espresso italien traditionnel, qui vise la reconnaissance de l’espresso au patrimoine culturel de l’UNESCO.'],
      ['2019', 'img_3', 'Cap sur l’Europe', 'Les boutiques de café sont repensées de manière stratégique afin de porter le concept sur les marchés européens.'],
      ['2024', 'nuova_sede', 'Le nouveau siège', 'Le nouveau siège ouvre ses portes Via San Giuseppe à Conegliano : conçu pour l’efficacité, la qualité et la durabilité.'],
    ],
    vincenzoAlt: 'Vincenzo Caballini, figure marquante de Dersut Caffè',
    vincenzoP1: 'Avec la reprise par la famille Caballini en 1949 commence l’essor de Dersut. Vincenzo Caballini a façonné l’entreprise pendant des décennies ; en 1960, il est nommé Cavaliere al Merito della Repubblica Italiana pour ses réalisations.',
    vincenzoP2: 'Aujourd’hui encore, la famille Caballini dirige Dersut à la troisième génération, alliant tradition et esprit d’entreprise moderne.',
    museoAlt: 'Museo del Caffè Dersut à Conegliano',
    museoTitle: 'La culture du café à portée de main',
    museoP1: <>Depuis octobre 2010, le Museo del Caffè Dersut de Conegliano présente sur 600&nbsp;m², répartis en quatre espaces, une riche collection de cafetières, de machines à espresso, de moulins et de torréfacteurs historiques : le voyage du café, de la plante à la tasse.</>,
    museoP2: 'Le musée fait partie du réseau des musées de Trévise et, depuis 2018, de Museimpresa, l’association italienne des musées d’entreprise.',
    academyAlt: 'Formation de baristas à l’Accademia ABCD Dersut',
    academyTitle: 'Un savoir qui se goûte',
    academyP: 'Avec l’Accademia ABCD, Dersut a créé son propre centre de formation pour transmettre l’excellence de l’espresso italien. Baristas et restaurateurs y apprennent tout, du cours de base au latte art avancé.',
    academyChecks: [
      'Cours de barista pour débutants et professionnels',
      'Certificat de dégustation IIAC et « Espresso Italiano Specialist »',
      'Conseil avant et après l’ouverture d’un établissement',
    ],
    ctaEyebrow: 'À déguster',
    ctaTitle: '75 ans d’expérience dans chaque tasse',
    ctaText: 'Découvrez Optimum et Domus, directement auprès du distributeur officiel en Suisse.',
    ctaButton: 'Vers la boutique',
  },
  it: {
    metaTitle: 'Storia di Dersut Caffè – dal 1947',
    metaDescription: 'La storia di Dersut Caffè: dalla fondazione nel 1947 alla famiglia Caballini fino alla nuova sede di Conegliano. Il caffè Dersut in Svizzera, dal 1947.',
    crumb: 'Storia',
    eyebrow: 'Dal 1947',
    title: <>Oltre 75 anni<br /><em>di passione per l’espresso</em></>,
    lead: 'Fondata da due triestini, plasmata per generazioni dalla famiglia Caballini: la storia di Dersut Caffè di Conegliano.',
    quoteTranslation: '',
    quoteCite: 'Motto di Dersut Caffè',
    milestonesEyebrow: 'Tappe fondamentali',
    milestonesTitle: 'Una storia di successo italiana',
    milestones: [
      ['1947', 'history_0', 'La fondazione', <>I triestini Marcello De Rosa e Giovanni Suttora fondano l’azienda, con sede a Trieste e stabilimento a Conegliano. Dalle sillabe iniziali dei loro cognomi, <strong>De</strong> Rosa e <strong>Sut</strong>tora, nasce il nome Dersut.</>],
      ['1949', 'history_1', 'Subentra la famiglia Caballini', 'La famiglia Caballini, originaria di Sassoferrato, rileva l’azienda. Vincenzo Caballini ne diventa la figura di riferimento e porta Dersut al successo sul mercato.'],
      ['1954', 'history_2', 'Cofondatore del gruppo dei torrefattori', 'Dersut è socio fondatore del Gruppo Torrefattori Caffè del Triveneto, che riunisce Veneto, Trentino-Alto Adige e Friuli-Venezia Giulia.'],
      ['1960', 'history_3', 'Cavaliere al Merito', 'Per i suoi meriti imprenditoriali Vincenzo Caballini viene nominato Cavaliere al Merito della Repubblica Italiana.'],
      ['1971', 'history_4', 'La nuova generazione', 'Giorgio Caballini, figlio di Vincenzo, entra in azienda e porta avanti la tradizione di famiglia.'],
      ['2002', 'history_5', 'La prima Bottega del Caffè', 'Apre la prima Bottega del Caffè Dersut: un concept monomarca che permette di vivere da vicino il mondo Dersut.'],
      ['2010', 'history_6', 'Il Museo del Caffè', 'A Conegliano apre il Museo del Caffè: 600 m² dedicati alla storia dell’azienda, del settore e del territorio, con macchine, macinini e tostatrici storici.'],
      ['2014', 'history_7', 'A tutela dell’espresso italiano', 'A Conegliano Dersut è tra i fondatori del Consorzio di tutela del caffè espresso italiano tradizionale, che si impegna per il riconoscimento dell’espresso come patrimonio culturale UNESCO.'],
      ['2019', 'img_3', 'Verso l’Europa', 'Le Botteghe del Caffè vengono ripensate strategicamente per portare il concept sui mercati europei.'],
      ['2024', 'nuova_sede', 'La nuova sede', 'In Via San Giuseppe a Conegliano apre la nuova sede: progettata per efficienza, qualità e sostenibilità.'],
    ],
    vincenzoAlt: 'Vincenzo Caballini, figura di riferimento di Dersut Caffè',
    vincenzoP1: 'Con il subentro della famiglia Caballini nel 1949 iniziò l’ascesa di Dersut. Vincenzo Caballini ha guidato l’azienda per decenni; nel 1960 fu nominato Cavaliere al Merito della Repubblica Italiana per i suoi meriti.',
    vincenzoP2: 'Ancora oggi la famiglia Caballini guida Dersut alla terza generazione, unendo tradizione e spirito imprenditoriale moderno.',
    museoAlt: 'Museo del Caffè Dersut a Conegliano',
    museoTitle: 'La cultura del caffè da toccare con mano',
    museoP1: <>Da ottobre 2010 il Museo del Caffè Dersut di Conegliano espone su 600&nbsp;m², suddivisi in quattro aree, una ricca collezione di caffettiere, macchine per espresso, macinini e tostatrici storici: il viaggio del caffè dalla pianta alla tazzina.</>,
    museoP2: 'Il museo fa parte della rete dei musei di Treviso e dal 2018 di Museimpresa, l’associazione italiana dei musei d’impresa.',
    academyAlt: 'Formazione per baristi all’Accademia ABCD Dersut',
    academyTitle: 'Un sapere che si gusta',
    academyP: 'Con l’Accademia ABCD Dersut ha creato un proprio centro di formazione per tramandare l’eccellenza dell’espresso italiano. Baristi e ristoratori vi imparano tutto, dal corso base al latte art avanzato.',
    academyChecks: [
      'Corsi per baristi principianti e professionisti',
      'Attestato di assaggio IIAC ed «Espresso Italiano Specialist»',
      'Consulenza prima e dopo l’apertura di un locale',
    ],
    ctaEyebrow: 'Da assaggiare',
    ctaTitle: '75 anni di esperienza in ogni tazzina',
    ctaText: 'Scoprite Optimum e Domus, direttamente dal distributore ufficiale in Svizzera.',
    ctaButton: 'Vai allo shop',
  },
  en: {
    metaTitle: 'History of Dersut Caffè – since 1947',
    metaDescription: 'The story of Dersut Caffè: from its founding in 1947 and the Caballini family to the new headquarters in Conegliano. Dersut coffee in Switzerland.',
    crumb: 'History',
    eyebrow: 'Dal 1947',
    title: <>Over 75 years<br /><em>of passion for espresso</em></>,
    lead: 'Founded by two men from Trieste and shaped by the Caballini family for generations: the story of Dersut Caffè from Conegliano.',
    quoteTranslation: 'We work with passion so that everyone who drinks our coffee smiles.',
    quoteCite: 'Guiding principle of Dersut Caffè',
    milestonesEyebrow: 'Milestones',
    milestonesTitle: 'An Italian success story',
    milestones: [
      ['1947', 'history_0', 'The founding', <>Marcello De Rosa and Giovanni Suttora, both from Trieste, found the company, headquartered in Trieste with operations in Conegliano. The name Dersut is formed from the first syllables of their surnames, <strong>De</strong> Rosa and <strong>Sut</strong>tora.</>],
      ['1949', 'history_1', 'The Caballini family takes over', 'The Caballini family from Sassoferrato takes over the company. Vincenzo Caballini becomes its defining figure and leads Dersut to success on the market.'],
      ['1954', 'history_2', 'Co-founder of the roasters’ association', 'Dersut is a founding member of the Triveneto coffee roasters’ group, covering the regions of Veneto, Trentino-South Tyrol and Friuli-Venezia Giulia.'],
      ['1960', 'history_3', 'Cavaliere al Merito', 'In recognition of his achievements as an entrepreneur, Vincenzo Caballini is appointed Knight of the Order of Merit of the Italian Republic.'],
      ['1971', 'history_4', 'The next generation', 'Giorgio Caballini, Vincenzo’s son, joins the company and carries on the family tradition.'],
      ['2002', 'history_5', 'The first Bottega del Caffè', 'The first Dersut coffee boutique opens: a single-brand concept that brings the world of Dersut to life.'],
      ['2010', 'history_6', 'The Museo del Caffè', 'The coffee museum opens in Conegliano: 600 m² devoted to the history of the company, the industry and the region, with historic machines, grinders and roasters.'],
      ['2014', 'history_7', 'Protecting Italian espresso', 'In Conegliano, Dersut co-founds the Consortium for the Protection of Traditional Italian Espresso, which seeks UNESCO cultural heritage recognition for espresso.'],
      ['2019', 'img_3', 'Expanding into Europe', 'The coffee boutiques are strategically redesigned to bring the concept to European markets.'],
      ['2024', 'nuova_sede', 'The new headquarters', 'The new headquarters opens on Via San Giuseppe in Conegliano, designed for efficiency, quality and sustainability.'],
    ],
    vincenzoAlt: 'Vincenzo Caballini, the defining figure of Dersut Caffè',
    vincenzoP1: 'Dersut’s rise began when the Caballini family took over in 1949. Vincenzo Caballini shaped the company for decades, and in 1960 he was appointed Cavaliere al Merito della Repubblica Italiana for his achievements.',
    vincenzoP2: 'To this day, the third generation of the Caballini family runs Dersut, combining tradition with modern entrepreneurship.',
    museoAlt: 'Museo del Caffè Dersut in Conegliano',
    museoTitle: 'Coffee culture up close',
    museoP1: <>Since October 2010, the Museo del Caffè Dersut in Conegliano has displayed a rich collection of historic coffee makers, espresso machines, grinders and roasters across four areas and 600&nbsp;m²: the journey of coffee from plant to cup.</>,
    museoP2: 'The museum is a member of the Treviso museum network and, since 2018, of Museimpresa, the association of Italian corporate museums.',
    academyAlt: 'Barista training at the Accademia ABCD Dersut',
    academyTitle: 'Knowledge you can taste',
    academyP: 'With the Accademia ABCD, Dersut has created its own training centre to pass on the excellence of Italian espresso. Baristas and restaurateurs learn everything there, from the basics to advanced latte art.',
    academyChecks: [
      'Barista courses for beginners and professionals',
      'IIAC tasting certificate and “Espresso Italiano Specialist”',
      'Advice before and after opening a café or restaurant',
    ],
    ctaEyebrow: 'Taste it now',
    ctaTitle: '75 years of experience in every cup',
    ctaText: 'Discover Optimum and Domus, direct from the official distributor in Switzerland.',
    ctaButton: 'Go to the shop',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  return pageMeta(lang, PATH, T[lang].metaTitle, T[lang].metaDescription);
}

export default async function Geschichte({ params }: Props) {
  const lang = asLocale((await params).lang);
  const t = T[lang];
  return (
    <>
      <PageHero lang={lang} img={brand('storia')} crumb={t.crumb} eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <section className="section section--tight section--white">
        <div className="wrap quote">
          <blockquote>«Svolgiamo il lavoro con passione per far sorridere chi beve il nostro caffè.»</blockquote>
          {t.quoteTranslation && <p className="lead" style={{ margin: '0 auto 16px' }}>{t.quoteTranslation}</p>}
          <cite>{t.quoteCite}</cite>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <header className="section__head section__head--center">
            <p className="eyebrow">{t.milestonesEyebrow}</p>
            <h2 className="h2">{t.milestonesTitle}</h2>
          </header>
          <div className="tl">
            {t.milestones.map(([year, img, h, txt]) => (
              <article className="tl__item" key={year}>
                <div className="tl__media"><Img src={brand(img)} alt={`${h} ${year}`} /></div>
                <div className="tl__text">
                  <div className="tl__year">{year.slice(0, 2)}<em>{year.slice(2)}</em></div>
                  <h3>{h}</h3>
                  <p>{txt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="split">
        <div className="wrap split__inner split__inner--rev">
          <div className="split__media frame"><Img src={brand('vincenzo')} alt={t.vincenzoAlt} /></div>
          <div className="split__text">
            <p className="eyebrow">La famiglia</p>
            <h2 className="h2">Vincenzo Caballini</h2>
            <p>{t.vincenzoP1}</p>
            <p>{t.vincenzoP2}</p>
          </div>
        </div>
      </section>

      <section className="split split--cream">
        <div className="wrap split__inner">
          <div className="split__media frame"><Img src={brand('museo')} alt={t.museoAlt} /></div>
          <div className="split__text">
            <p className="eyebrow">Museo del Caffè</p>
            <h2 className="h2">{t.museoTitle}</h2>
            <p>{t.museoP1}</p>
            <p>{t.museoP2}</p>
          </div>
        </div>
      </section>

      <section className="split">
        <div className="wrap split__inner split__inner--rev">
          <div className="split__media frame"><Img src={brand('img_2')} alt={t.academyAlt} /></div>
          <div className="split__text">
            <p className="eyebrow">Accademia ABCD</p>
            <h2 className="h2">{t.academyTitle}</h2>
            <p>{t.academyP}</p>
            <ul className="checks">
              {t.academyChecks.map((c) => <li key={c}><Icon name="check" /> {c}</li>)}
            </ul>
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
          <Link className="btn btn--primary btn--lg" href={lp(lang, '/shop')}>{t.ctaButton} <Icon name="arrow" /></Link>
        </div>
      </section>
    </>
  );
}
