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
    street: '', // TODO: Strasse und Nr.
    zip: '', // TODO: PLZ
    city: '', // TODO: Ort
    phone: '', // TODO (optional)
    uid: '', // TODO: z. B. CHE-123.456.789
    vatNo: '', // TODO: z. B. CHE-123.456.789 MWST (leer = ausgeblendet)
    register: '', // TODO: Handelsregisteramt des Kantons …
    managing: '', // TODO: Geschäftsführung
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
    shipping: 900, // Rappen, Postversand Schweiz pauschal
    vatRate: 8.1, // Prozent, in den Preisen enthalten
    orderPrefix: 'DS',
    paymentDays: 10,
    maxQty: 50,
  },
};

export type Company = typeof config.company;
