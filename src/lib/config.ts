/**
 * Zentrale Konfiguration von Dersut Kaffee Schweiz.
 * Felder mit TODO vor dem Livegang ausfüllen.
 */
export const config = {
  siteName: 'Dersut Kaffee Schweiz',
  siteUrl: process.env.SITE_URL || 'https://dersut.ch',
  primaryHost: 'dersut.ch',

  company: {
    name: 'Dersut Kaffee GmbH',
    // Quelle: Handelsregister (Zefix), Stand 2026-10-07
    street: 'Fasanenstrasse 121',
    zip: '4058',
    city: 'Basel',
    phone: '', // optional
    uid: 'CHE-452.988.706',
    vatNo: 'CHE-452.988.706 MWST',
    register: 'Handelsregisteramt des Kantons Basel-Stadt',
  },

  // Eine Adresse für alles: Absender der Shop-E-Mails, Bestellkopien, Kontaktformular
  email: {
    orders: 'info@dersut.ch',
    contact: 'info@dersut.ch',
    info: 'info@dersut.ch',
    from: process.env.MAIL_FROM || 'Dersut Kaffee Schweiz <info@dersut.ch>',
  },

  bank: {
    holder: 'Dersut Kaffee GmbH',
    bank: 'Basler Kantonalbank',
    iban: 'CH3200770255047082001',
  },

  shop: {
    shipping: 900, // Rappen, Postversand Schweiz pauschal (im Admin unter Firma & Shop änderbar)
    freeShippingFrom: 10000, // Rappen: ab diesem Warenwert ist der Versand gratis (im Admin änderbar)
    vatRate: 8.1, // Prozent, in den Preisen enthalten
    orderPrefix: 'DS',
    paymentDays: 10,
    maxQty: 50,
  },
};

/** Online-Zahlung über Payrexx ist aktiv, sobald Instanz und API-Secret in Vercel gesetzt sind. */
export function onlinePayment(): boolean {
  return !!(process.env.PAYREXX_INSTANCE && process.env.PAYREXX_API_SECRET);
}

export type Company = typeof config.company;
