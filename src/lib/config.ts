/**
 * Zentrale Konfiguration von Dersut Kaffee Schweiz.
 * Felder mit TODO vor dem Livegang ausfüllen.
 */
export const config = {
  siteName: 'Dersut Kaffee Schweiz',
  siteUrl: process.env.SITE_URL || 'https://dersutkaffee.ch',
  primaryHost: 'dersutkaffee.ch',

  company: {
    name: 'Dersut Kaffee GmbH',
    // Quelle: Handelsregister (Zefix), Stand 2026-10-07
    co: 'c/o Asurhan Özcelik', // Domizil laut Handelsregister
    street: 'Fasanenstrasse 121',
    zip: '4058',
    city: 'Basel',
    phone: '', // optional
    uid: 'CHE-452.988.706',
    vatNo: 'CHE-452.988.706 MWST',
    register: 'Handelsregisteramt des Kantons Basel-Stadt',
    managing: 'Asurhan Ibrahim Raci Özcelik'
  },

  // Eine Adresse für alles: Absender der Shop-E-Mails, Bestellkopien, Kontaktformular
  email: {
    orders: 'info@dersut.ch',
    contact: 'info@dersut.ch',
    info: 'info@dersut.ch',
    from: 'Dersut Kaffee Schweiz <info@dersut.ch>',
  },

  bank: {
    holder: 'Dersut Kaffee GmbH',
    bank: 'Basler Kantonalbank',
    iban: 'CH3200770255047082001',
  },

  shop: {
    shipping: 1200, // Rappen, Postversand Schweiz pauschal
    vatRate: 8.1, // Prozent, in den Preisen enthalten
    orderPrefix: 'DS',
    paymentDays: 10,
    maxQty: 50,
  },
};

export type Company = typeof config.company;
