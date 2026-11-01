import type { Category } from '@/lib/settings-core';
import type { Locale } from '@/lib/i18n';

/**
 * Startkategorien des Shops. Sie werden einmalig in Admin → Firma & Shop übernommen und lassen sich dort
 * umbenennen, ergänzen oder löschen. Im Shop erscheinen nur Kategorien, in denen aktive Produkte sind.
 */
export const DEFAULT_CATEGORIES: Category[] = [
  { slug: 'kaffeebohnen', de: 'Kaffeebohnen', fr: 'Café en grains', it: 'Caffè in grani', en: 'Coffee beans' },
  { slug: 'gemahlener-kaffee', de: 'Gemahlener Kaffee', fr: 'Café moulu', it: 'Caffè macinato', en: 'Ground coffee' },
  { slug: 'kapseln', de: 'Kapseln', fr: 'Capsules', it: 'Capsule', en: 'Capsules' },
  { slug: 'ese-pads', de: 'ESE-Pads', fr: 'Dosettes ESE', it: 'Cialde ESE', en: 'ESE pods' },
  { slug: 'zubehoer', de: 'Zubehör', fr: 'Accessoires', it: 'Accessori', en: 'Accessories' },
];

/** Standardtexte der Kategorieseiten (wenn im Admin kein eigener Text hinterlegt ist). */
const INTRO: Record<string, Record<Locale, string>> = {
  kaffeebohnen: {
    de: 'Ganze Espressobohnen von Dersut Caffè aus Conegliano, ideal für Vollautomaten und Siebträger. Frisch gemahlen entfalten sie Crema und Aroma am besten.',
    fr: 'Grains d’espresso entiers de Dersut Caffè, torréfiés à Conegliano. Parfaits pour les machines automatiques et à porte-filtre : moulus à la minute, ils offrent le meilleur arôme et une belle crema.',
    it: 'Caffè in grani Dersut Caffè, tostato a Conegliano. Ideale per macchine automatiche e a leva: macinato al momento offre il massimo di aroma e crema.',
    en: 'Whole espresso beans from Dersut Caffè, roasted in Conegliano. Ideal for bean-to-cup and portafilter machines: freshly ground, they give the best aroma and crema.',
  },
  'gemahlener-kaffee': {
    de: 'Gemahlener Dersut Kaffee für Siebträger, Bialetti und Filter: sofort bereit, ohne Mühle.',
    fr: 'Café Dersut moulu pour porte-filtre, cafetière italienne et filtre : prêt à l’emploi, sans moulin.',
    it: 'Caffè Dersut macinato per macchina a leva, moka e filtro: pronto subito, senza macinino.',
    en: 'Ground Dersut coffee for portafilter, moka pot and filter: ready to use, no grinder needed.',
  },
  kapseln: {
    de: 'Dersut Espresso in Kapseln: einfach, sauber und immer gleichbleibend gut.',
    fr: 'L’espresso Dersut en capsules : simple, propre et toujours aussi bon.',
    it: 'L’espresso Dersut in capsule: semplice, pulito e sempre buono.',
    en: 'Dersut espresso in capsules: simple, clean and consistently good.',
  },
  'ese-pads': {
    de: 'ESE-Pads (Easy Serving Espresso) von Dersut: portionierter Espresso für Maschinen mit ESE-Halter, ideal für Büro und Zuhause.',
    fr: 'Dosettes ESE (Easy Serving Espresso) de Dersut : l’espresso en portions pour machines compatibles ESE, au bureau comme à la maison.',
    it: 'Cialde ESE (Easy Serving Espresso) Dersut: espresso porzionato per macchine compatibili ESE, in ufficio e a casa.',
    en: 'Dersut ESE pods (Easy Serving Espresso): portioned espresso for ESE-compatible machines, at the office or at home.',
  },
  zubehoer: {
    de: 'Zubehör rund um den Espresso: Tassen und mehr im Dersut Design.',
    fr: 'Accessoires pour l’espresso : tasses et plus encore, au design Dersut.',
    it: 'Accessori per l’espresso: tazzine e altro con il design Dersut.',
    en: 'Espresso accessories: cups and more in Dersut design.',
  },
};

export function categoryIntro(c: Category, lang: Locale): string {
  return c.text?.[lang]?.trim() || INTRO[c.slug]?.[lang] || c.text?.de?.trim() || '';
}
