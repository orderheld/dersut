import type { Locale } from '@/lib/i18n';

/**
 * Häufige Fragen auf der Startseite (auch als FAQPage-Daten für Google).
 * Zielt auf Suchen wie «Kaffee kaufen», «Kaffee bestellen», «Kaffee für Firmen».
 * {ship} und {free} werden mit den Versandbeträgen aus dem Admin ersetzt.
 */
export const HOME_FAQ: Record<Locale, { title: string; items: [string, string][] }> = {
  de: {
    title: 'Häufige Fragen zum Kaffee kaufen',
    items: [
      ['Wo kann ich italienischen Kaffee online kaufen?', 'Hier im Shop des offiziellen Schweizer Vertriebs von Dersut Caffè. Sie bestellen Kaffeebohnen in der 1-kg-Originalpackung, bezahlen online oder per Vorauskasse und erhalten Ihre Lieferung mit der Schweizerischen Post.'],
      ['Was kostet der Versand?', 'Pauschal {ship} in die ganze Schweiz. Ab {free} Warenwert liefern wir gratis.'],
      ['Welcher Kaffee passt zu meinem Vollautomaten?', 'Alle vier Mischungen sind ganze Espressobohnen und eignen sich für Vollautomat, Siebträger und Moka. Mit Milch ist Optimum Rosso ideal, kräftig ist Domus Marrone, fein und prämiert sind Plus Oro und Non Plus Ultra.'],
      ['Liefern Sie Kaffee auch an Firmen, Büros und Restaurants?', 'Ja. Für Firmen, Büros, Restaurants, Bars und Hotels bieten wir Mengenpreise, Lieferung nach Plan und Rechnung in Franken. Fragen Sie unverbindlich auf der Seite Gastronomie oder Firmen an.'],
    ],
  },
  fr: {
    title: 'Questions fréquentes sur l’achat de café',
    items: [
      ['Où acheter du café italien en ligne ?', 'Ici, dans la boutique du distributeur officiel de Dersut Caffè en Suisse. Vous commandez des grains en paquet original de 1 kg, payez en ligne ou d’avance et recevez votre colis par La Poste.'],
      ['Combien coûte la livraison ?', 'Forfait de {ship} dans toute la Suisse. Dès {free} d’achat, la livraison est gratuite.'],
      ['Quel café pour ma machine automatique ?', 'Les quatre mélanges sont des grains d’espresso entiers, adaptés aux machines automatiques, à porte-filtre et à la moka. Avec du lait, l’Optimum Rosso est idéal, le Domus Marrone est corsé, Plus Oro et Non Plus Ultra sont fins et primés.'],
      ['Livrez-vous aussi les entreprises, bureaux et restaurants ?', 'Oui. Pour entreprises, bureaux, restaurants, bars et hôtels, nous proposons des prix de quantité, des livraisons planifiées et une facture en francs. Demandez une offre sur la page Restauration ou Entreprises.'],
    ],
  },
  it: {
    title: 'Domande frequenti sull’acquisto di caffè',
    items: [
      ['Dove comprare caffè italiano online?', 'Qui, nello shop del distributore ufficiale di Dersut Caffè in Svizzera. Ordinate caffè in grani nella confezione originale da 1 kg, pagate online o in anticipo e ricevete la spedizione con La Posta.'],
      ['Quanto costa la spedizione?', 'Forfait di {ship} in tutta la Svizzera. Da {free} di merce la spedizione è gratuita.'],
      ['Quale caffè per la mia macchina automatica?', 'Tutte e quattro le miscele sono caffè in grani interi, adatti a macchina automatica, a leva e moka. Con il latte è ideale l’Optimum Rosso, deciso il Domus Marrone, fini e premiati Plus Oro e Non Plus Ultra.'],
      ['Fornite caffè anche ad aziende, uffici e ristoranti?', 'Sì. Per aziende, uffici, ristoranti, bar e hotel offriamo prezzi per quantità, consegne programmate e fattura in franchi. Richiedete un’offerta alla pagina Gastronomia o Aziende.'],
    ],
  },
  en: {
    title: 'Frequently asked questions about buying coffee',
    items: [
      ['Where can I buy Italian coffee online?', 'Right here, in the shop of the official Swiss distributor of Dersut Caffè. Order beans in the original 1 kg pack, pay online or in advance and receive your delivery by Swiss Post.'],
      ['How much is shipping?', 'A flat {ship} throughout Switzerland. Shipping is free from {free} in goods value.'],
      ['Which coffee suits my bean-to-cup machine?', 'All four blends are whole espresso beans for bean-to-cup, portafilter and moka. With milk, Optimum Rosso is ideal, Domus Marrone is bold, and Plus Oro and Non Plus Ultra are fine and award-winning.'],
      ['Do you supply companies, offices and restaurants?', 'Yes. For companies, offices, restaurants, bars and hotels we offer volume pricing, scheduled delivery and invoicing in Swiss francs. Ask for a quote on the Hospitality or Companies page.'],
    ],
  },
};
