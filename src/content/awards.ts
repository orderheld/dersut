import type { Locale } from '@/lib/i18n';

/**
 * Auszeichnungen der einzelnen Mischungen (Quelle: dersut.it und Urkunden IIAC 2025, Brescia, 20.11.2025).
 * Schlüssel ist der Produkt-Slug. Die erste Medaille erscheint als Symbol auf Shop-Karte und Produktbild.
 */
export type Award = {
  kind: 'medal' | 'award' | 'cert';
  title: string;
  by: string;
  years: string[];
};

export const PRODUCT_AWARDS: Record<string, Award[]> = {
  'dersut-non-plus-ultra-1kg': [
    { kind: 'medal', title: 'Gold Medal', by: 'International Coffee Tasting · IIAC', years: ['2016', '2022', '2025'] },
    { kind: 'cert', title: 'Espresso Italiano di Qualità', by: 'Istituto Espresso Italiano', years: [] },
  ],
  'dersut-plus-oro-1kg': [
    { kind: 'medal', title: 'Gold Medal', by: 'International Coffee Tasting · IIAC', years: ['2014', '2018', '2025'] },
    { kind: 'award', title: 'Camaleonte Espresso Award', by: 'Espresso Award', years: ['2022', '2023/24'] },
    { kind: 'cert', title: 'Espresso Italiano di Qualità', by: 'Istituto Espresso Italiano', years: [] },
  ],
};

export function awardsOf(slug: string): Award[] {
  return PRODUCT_AWARDS[slug] ?? [];
}

/** Neueste Goldmedaille eines Produkts, z. B. «2025» (für das Symbol auf Karte und Bild) */
export function latestMedal(slug: string): string | null {
  const m = awardsOf(slug).find((a) => a.kind === 'medal');
  return m ? m.years[m.years.length - 1] : null;
}

/** Texte rund um die Auszeichnungen */
export const AWARD_TEXT: Record<
  Locale,
  {
    medal: (year: string) => string;
    eyebrow: string;
    title: string;
    lead: (name: string) => string;
    kinds: Record<Award['kind'], string>;
    jury: string;
    homeEyebrow: string;
    homeTitle: string;
    homeLead: string;
    homeFacts: [string, string][];
    homeLink: string;
    homeProduct: string;
  }
> = {
  de: {
    medal: (y) => `Gold Medal ${y} · International Coffee Tasting`,
    eyebrow: 'Ausgezeichnet',
    title: 'Prämiert von internationalen Verkostern',
    lead: (n) => `Der ${n} hat sich bei unabhängigen Blindverkostungen gegen Espressomischungen aus aller Welt durchgesetzt.`,
    kinds: { medal: 'Goldmedaille', award: 'Auszeichnung', cert: 'Zertifizierung' },
    jury: 'Das International Institute of Coffee Tasters (IIAC) in Brescia vergibt die Gold Medal nach einer Blindverkostung durch ausgebildete Verkoster. Die Urkunden 2025 wurden am 20. November 2025 in der Kategorie Espressomischung ausgestellt.',
    homeEyebrow: 'Gold Medal 2025',
    homeTitle: 'Zweimal Gold für Dersut',
    homeLead: 'Beim International Coffee Tasting 2025 in Brescia haben die Verkoster des IIAC gleich zwei Dersut-Mischungen mit der Goldmedaille ausgezeichnet: Plus Oro und Non Plus Ultra. Beide gibt es jetzt bei uns in der Schweiz.',
    homeFacts: [
      ['Blind verkostet', 'Unabhängige Jury des International Institute of Coffee Tasters'],
      ['Mehrfach prämiert', 'Gold auch 2014, 2016, 2018 und 2022'],
      ['Zertifiziert', 'Espresso Italiano di Qualità'],
    ],
    homeLink: 'Alle Auszeichnungen',
    homeProduct: 'Zum Produkt',
  },
  fr: {
    medal: (y) => `Gold Medal ${y} · International Coffee Tasting`,
    eyebrow: 'Récompensé',
    title: 'Primé par des dégustateurs internationaux',
    lead: (n) => `Le ${n} s’est imposé lors de dégustations à l’aveugle indépendantes face à des mélanges espresso du monde entier.`,
    kinds: { medal: 'Médaille d’or', award: 'Distinction', cert: 'Certification' },
    jury: 'L’International Institute of Coffee Tasters (IIAC) de Brescia décerne la Gold Medal après une dégustation à l’aveugle par des dégustateurs formés. Les diplômes 2025 ont été délivrés le 20 novembre 2025 dans la catégorie mélange espresso.',
    homeEyebrow: 'Gold Medal 2025',
    homeTitle: 'Deux fois l’or pour Dersut',
    homeLead: 'Lors de l’International Coffee Tasting 2025 à Brescia, les dégustateurs de l’IIAC ont décerné la médaille d’or à deux mélanges Dersut : Plus Oro et Non Plus Ultra. Tous deux sont désormais disponibles chez nous en Suisse.',
    homeFacts: [
      ['Dégusté à l’aveugle', 'Jury indépendant de l’International Institute of Coffee Tasters'],
      ['Primé à plusieurs reprises', 'Or également en 2014, 2016, 2018 et 2022'],
      ['Certifié', 'Espresso Italiano di Qualità'],
    ],
    homeLink: 'Toutes les distinctions',
    homeProduct: 'Voir le produit',
  },
  it: {
    medal: (y) => `Gold Medal ${y} · International Coffee Tasting`,
    eyebrow: 'Premiato',
    title: 'Premiato da assaggiatori internazionali',
    lead: (n) => `Il ${n} si è imposto in degustazioni alla cieca indipendenti contro miscele per espresso di tutto il mondo.`,
    kinds: { medal: 'Medaglia d’oro', award: 'Premio', cert: 'Certificazione' },
    jury: 'L’Istituto Internazionale Assaggiatori Caffè (IIAC) di Brescia assegna la Gold Medal dopo una degustazione alla cieca da parte di assaggiatori qualificati. I diplomi 2025 sono stati rilasciati il 20 novembre 2025 nella categoria miscela per espresso.',
    homeEyebrow: 'Gold Medal 2025',
    homeTitle: 'Due ori per Dersut',
    homeLead: 'All’International Coffee Tasting 2025 di Brescia gli assaggiatori dell’IIAC hanno premiato con la medaglia d’oro ben due miscele Dersut: Plus Oro e Non Plus Ultra. Entrambe sono ora disponibili da noi in Svizzera.',
    homeFacts: [
      ['Degustato alla cieca', 'Giuria indipendente dell’Istituto Internazionale Assaggiatori Caffè'],
      ['Premiato più volte', 'Oro anche nel 2014, 2016, 2018 e 2022'],
      ['Certificato', 'Espresso Italiano di Qualità'],
    ],
    homeLink: 'Tutti i riconoscimenti',
    homeProduct: 'Al prodotto',
  },
  en: {
    medal: (y) => `Gold Medal ${y} · International Coffee Tasting`,
    eyebrow: 'Award-winning',
    title: 'Honoured by international tasters',
    lead: (n) => `${n} has prevailed in independent blind tastings against espresso blends from around the world.`,
    kinds: { medal: 'Gold medal', award: 'Award', cert: 'Certification' },
    jury: 'The International Institute of Coffee Tasters (IIAC) in Brescia awards the Gold Medal after a blind tasting by trained tasters. The 2025 certificates were issued on 20 November 2025 in the espresso blend category.',
    homeEyebrow: 'Gold Medal 2025',
    homeTitle: 'Double gold for Dersut',
    homeLead: 'At the International Coffee Tasting 2025 in Brescia, the IIAC tasters awarded the gold medal to two Dersut blends: Plus Oro and Non Plus Ultra. Both are now available from us in Switzerland.',
    homeFacts: [
      ['Blind-tasted', 'Independent jury of the International Institute of Coffee Tasters'],
      ['Awarded many times', 'Gold also in 2014, 2016, 2018 and 2022'],
      ['Certified', 'Espresso Italiano di Qualità'],
    ],
    homeLink: 'All awards',
    homeProduct: 'View product',
  },
};

/**
 * Optimum Rosso und Domus Marrone haben laut dersut.it (geprüft 2026-11-01) keine eigene Medaille
 * und kein eigenes Zertifikat. Deshalb zeigen wir nur, was für die Rösterei als Ganzes belegt ist.
 */
export const HOUSE_SLUGS = ['dersut-optimum-rosso-1kg', 'dersut-domus-marrone-1kg'];

export const HOUSE_TEXT: Record<
  Locale,
  { seal: string; eyebrow: string; title: string; lead: (name: string) => string; items: [string, string, string][] }
> = {
  de: {
    seal: 'Original Dersut Caffè, Conegliano, seit 1947',
    eyebrow: 'Aus ausgezeichnetem Haus',
    title: 'Geröstet von der Rösterei der Goldmedaillen',
    lead: (n) => `Der ${n} kommt aus derselben Rösterei in Conegliano wie die mit Gold prämierten Mischungen Plus Oro und Non Plus Ultra: gleiche Sorgfalt bei Auswahl, Röstung und Kontrolle.`,
    items: [
      ['Gold Medal 2025 für unsere Schwestersorten', 'Plus Oro & Non Plus Ultra', 'IIAC 2025'],
      ['Mitglied seit 2014', 'Specialty Coffee Association (SCA)', '2014'],
      ['Gründungsmitglied', 'Consorzio di Tutela del Caffè Espresso Italiano Tradizionale', '2014'],
    ],
  },
  fr: {
    seal: 'Dersut Caffè original, Conegliano, depuis 1947',
    eyebrow: 'D’une maison primée',
    title: 'Torréfié par la maison des médailles d’or',
    lead: (n) => `Le ${n} provient de la même torréfaction de Conegliano que les mélanges médaillés d’or Plus Oro et Non Plus Ultra : même soin dans la sélection, la torréfaction et le contrôle.`,
    items: [
      ['Gold Medal 2025 pour les mélanges frères', 'Plus Oro & Non Plus Ultra', 'IIAC 2025'],
      ['Membre depuis 2014', 'Specialty Coffee Association (SCA)', '2014'],
      ['Membre fondateur', 'Consorzio di Tutela del Caffè Espresso Italiano Tradizionale', '2014'],
    ],
  },
  it: {
    seal: 'Dersut Caffè originale, Conegliano, dal 1947',
    eyebrow: 'Da una casa premiata',
    title: 'Tostato dalla torrefazione delle medaglie d’oro',
    lead: (n) => `Il ${n} nasce nella stessa torrefazione di Conegliano delle miscele premiate con l’oro Plus Oro e Non Plus Ultra: la stessa cura nella selezione, nella tostatura e nel controllo.`,
    items: [
      ['Gold Medal 2025 per le miscele sorelle', 'Plus Oro & Non Plus Ultra', 'IIAC 2025'],
      ['Socio dal 2014', 'Specialty Coffee Association (SCA)', '2014'],
      ['Socio fondatore', 'Consorzio di Tutela del Caffè Espresso Italiano Tradizionale', '2014'],
    ],
  },
  en: {
    seal: 'Original Dersut Caffè, Conegliano, since 1947',
    eyebrow: 'From an award-winning house',
    title: 'Roasted by the house of gold medals',
    lead: (n) => `${n} comes from the same Conegliano roastery as the gold-medal blends Plus Oro and Non Plus Ultra: the same care in selection, roasting and quality control.`,
    items: [
      ['Gold Medal 2025 for the sister blends', 'Plus Oro & Non Plus Ultra', 'IIAC 2025'],
      ['Member since 2014', 'Specialty Coffee Association (SCA)', '2014'],
      ['Founding member', 'Consorzio di Tutela del Caffè Espresso Italiano Tradizionale', '2014'],
    ],
  },
};
