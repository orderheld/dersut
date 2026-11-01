import type { Locale } from '@/lib/i18n';

/**
 * Texte der Bestell- und Firmenleiste am unteren Bildschirmrand (src/components/PromoBar.tsx)
 * und der Hinweise für Geschäftskunden im Shop.
 */
export type PromoText = {
  label: string;
  title: string;
  /** z. B. «Gratis Versand ab CHF 100.–» */
  sub: (free: string) => string;
  order: string;
  orderShort: string;
  business: string;
  businessShort: string;
  call: string;
  whatsapp: string;
  close: string;
  /** Hinweis im Shop und auf der Produktseite */
  b2bTitle: string;
  b2bText: string;
  b2bGastro: string;
  b2bOffice: string;
  /** Kontaktwege auf den Geschäftskunden-Seiten */
  b2bQuick: string;
};

export const PROMO: Record<Locale, PromoText> = {
  de: {
    label: 'Bestellen und Anfragen',
    title: 'Original Dersut Espresso aus Italien',
    sub: (free) => `Gratis Versand ab ${free}`,
    order: 'Jetzt bestellen',
    orderShort: 'Bestellen',
    business: 'Für Gastronomie & Büro',
    businessShort: 'Für Firmen',
    call: 'Anrufen',
    whatsapp: 'WhatsApp',
    close: 'Hinweis schliessen',
    b2bTitle: 'Für Restaurant, Bar oder Büro?',
    b2bText: 'Mengenpreise, Lieferung nach Plan und ein persönlicher Ansprechpartner in der Schweiz. Wir melden uns innert 24 Stunden.',
    b2bGastro: 'Gastronomie',
    b2bOffice: 'Firmen & Büro',
    b2bQuick: 'Lieber direkt? Rufen Sie uns an oder schreiben Sie uns auf WhatsApp.',
  },
  fr: {
    label: 'Commander et demander une offre',
    title: 'Espresso Dersut original d’Italie',
    sub: (free) => `Livraison gratuite dès ${free}`,
    order: 'Commander',
    orderShort: 'Commander',
    business: 'Restauration & bureau',
    businessShort: 'Entreprises',
    call: 'Appeler',
    whatsapp: 'WhatsApp',
    close: 'Fermer',
    b2bTitle: 'Pour restaurant, bar ou bureau ?',
    b2bText: 'Prix de quantité, livraison planifiée et un interlocuteur personnel en Suisse. Réponse sous 24 heures.',
    b2bGastro: 'Restauration',
    b2bOffice: 'Entreprises & bureau',
    b2bQuick: 'Plus simple en direct ? Appelez-nous ou écrivez-nous sur WhatsApp.',
  },
  it: {
    label: 'Ordinare e richiedere un’offerta',
    title: 'Espresso Dersut originale dall’Italia',
    sub: (free) => `Spedizione gratuita da ${free}`,
    order: 'Ordina ora',
    orderShort: 'Ordina',
    business: 'Per gastronomia e ufficio',
    businessShort: 'Aziende',
    call: 'Chiama',
    whatsapp: 'WhatsApp',
    close: 'Chiudi',
    b2bTitle: 'Per ristorante, bar o ufficio?',
    b2bText: 'Prezzi per quantità, consegne programmate e un referente personale in Svizzera. Risposta entro 24 ore.',
    b2bGastro: 'Gastronomia',
    b2bOffice: 'Aziende e ufficio',
    b2bQuick: 'Preferite il contatto diretto? Chiamateci o scriveteci su WhatsApp.',
  },
  en: {
    label: 'Order and enquire',
    title: 'Original Dersut espresso from Italy',
    sub: (free) => `Free shipping from ${free}`,
    order: 'Order now',
    orderShort: 'Order',
    business: 'For hospitality & offices',
    businessShort: 'Business',
    call: 'Call',
    whatsapp: 'WhatsApp',
    close: 'Close',
    b2bTitle: 'For a restaurant, bar or office?',
    b2bText: 'Volume pricing, scheduled delivery and a personal contact in Switzerland. We reply within 24 hours.',
    b2bGastro: 'Hospitality',
    b2bOffice: 'Companies & offices',
    b2bQuick: 'Prefer to talk? Call us or message us on WhatsApp.',
  },
};

/** Telefonnummer als tel:- und WhatsApp-Link (nur Ziffern, Schweizer Format) */
export function phoneLinks(phone: string): { tel: string; wa: string } {
  const digits = phone.replace(/[^\d+]/g, '');
  const intl = digits.startsWith('+') ? digits.slice(1) : digits.startsWith('0') ? `41${digits.slice(1)}` : digits;
  return { tel: `tel:+${intl}`, wa: `https://wa.me/${intl}` };
}
