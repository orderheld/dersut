import { config } from './config';
import { swissPhone } from './format';

/**
 * Im Admin änderbare Stammdaten (Firma, Kontakt, Bank, Zahlungsfrist, Kategorien).
 * Sie liegen als JSON in app_settings («site») und werden beim Start und danach jede Minute
 * in das zentrale config-Objekt übernommen. Leere Felder fallen auf die Werte aus config.ts zurück.
 */
export type Category = {
  slug: string;
  de: string;
  fr?: string;
  it?: string;
  en?: string;
  /** Kurzer Einleitungstext der Kategorieseite (SEO), je Sprache. Leer = Standardtext bzw. keiner */
  text?: Partial<Record<'de' | 'fr' | 'it' | 'en', string>>;
};

export type SiteSettings = {
  company: Partial<Record<'name' | 'street' | 'zip' | 'city' | 'phone' | 'uid' | 'vatNo' | 'register', string>>;
  email?: string;
  bank: Partial<Record<'holder' | 'bank' | 'iban', string>>;
  paymentDays?: number;
  /** Versandpauschale und Gratisversand ab (Rappen) */
  shipping?: number;
  freeShippingFrom?: number;
  categories: Category[];
};

export const SETTINGS_KEY = 'site';

const DEFAULTS = structuredClone({ company: config.company, email: config.email, bank: config.bank, shop: config.shop });

let current: SiteSettings = { company: {}, bank: {}, categories: [] };

/** Zuletzt übernommene Einstellungen (für das Admin-Formular und die Kategorien). */
export function currentSettings(): SiteSettings {
  return current;
}

/** Umzug 2026-11-01: Im Admin gespeicherte alte Adresse (Fasanenstrasse 121, Basel) durch die neue aus config.ts ersetzen. */
function migrateAddress(c: SiteSettings['company']): SiteSettings['company'] {
  if (!/fasanenstrasse\s*121/i.test(c.street ?? '')) return c;
  return { ...c, street: DEFAULTS.company.street, zip: DEFAULTS.company.zip, city: DEFAULTS.company.city };
}

export function parseSettings(raw: string | null | undefined): SiteSettings {
  try {
    const s = raw ? (JSON.parse(raw) as Partial<SiteSettings>) : {};
    return { company: migrateAddress(s.company ?? {}), email: s.email, bank: s.bank ?? {}, paymentDays: s.paymentDays, shipping: s.shipping, freeShippingFrom: s.freeShippingFrom, categories: Array.isArray(s.categories) ? s.categories : [] };
  } catch {
    return { company: {}, bank: {}, categories: [] };
  }
}

const pick = <T extends Record<string, unknown>>(base: T, over: Partial<Record<keyof T, string>>): T => {
  const out = { ...base };
  for (const k of Object.keys(base) as (keyof T)[]) {
    const v = over[k];
    // «phone» darf bewusst leer sein, die anderen Felder nicht
    if (typeof v === 'string' && (v.trim() || k === 'phone')) out[k] = (k === 'phone' ? swissPhone(v) : v.trim()) as T[keyof T];
  }
  return out;
};

export function applySettings(s: SiteSettings): void {
  current = s;
  Object.assign(config.company, pick(DEFAULTS.company, s.company));
  Object.assign(config.bank, pick(DEFAULTS.bank, s.bank));
  const email = s.email?.trim() || DEFAULTS.email.info;
  Object.assign(config.email, {
    orders: email,
    contact: email,
    info: email,
    from: process.env.MAIL_FROM || `${config.siteName} <${email}>`,
  });
  config.shop.paymentDays = s.paymentDays && s.paymentDays > 0 && s.paymentDays <= 60 ? s.paymentDays : DEFAULTS.shop.paymentDays;
  const rappen = (v: unknown, max: number) => (typeof v === 'number' && Number.isInteger(v) && v >= 0 && v <= max ? v : null);
  config.shop.shipping = rappen(s.shipping, 100_00) ?? DEFAULTS.shop.shipping;
  config.shop.freeShippingFrom = rappen(s.freeShippingFrom, 10_000_00) ?? DEFAULTS.shop.freeShippingFrom;
}

export function categoryName(slug: string, lang: string): string {
  const c = current.categories.find((x) => x.slug === slug);
  return c ? categoryLabel(c, lang) : '';
}

export function categoryLabel(c: Category, lang: string): string {
  const v = lang === 'de' ? c.de : c[lang as 'fr' | 'it' | 'en'];
  return (typeof v === 'string' && v) || c.de;
}

export function getCategory(slug: string): Category | undefined {
  return current.categories.find((x) => x.slug === slug);
}
