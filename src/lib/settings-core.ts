import { config } from './config';

/**
 * Im Admin änderbare Stammdaten (Firma, Kontakt, Bank, Zahlungsfrist, Kategorien).
 * Sie liegen als JSON in app_settings («site») und werden beim Start und danach jede Minute
 * in das zentrale config-Objekt übernommen. Leere Felder fallen auf die Werte aus config.ts zurück.
 */
export type Category = { slug: string; de: string; fr?: string; it?: string; en?: string };

export type SiteSettings = {
  company: Partial<Record<'name' | 'co' | 'street' | 'zip' | 'city' | 'phone' | 'uid' | 'vatNo' | 'register' | 'managing', string>>;
  email?: string;
  bank: Partial<Record<'holder' | 'bank' | 'iban', string>>;
  paymentDays?: number;
  categories: Category[];
};

export const SETTINGS_KEY = 'site';

const DEFAULTS = structuredClone({ company: config.company, email: config.email, bank: config.bank, shop: config.shop });

let current: SiteSettings = { company: {}, bank: {}, categories: [] };

/** Zuletzt übernommene Einstellungen (für das Admin-Formular und die Kategorien). */
export function currentSettings(): SiteSettings {
  return current;
}

export function parseSettings(raw: string | null | undefined): SiteSettings {
  try {
    const s = raw ? (JSON.parse(raw) as Partial<SiteSettings>) : {};
    return { company: s.company ?? {}, email: s.email, bank: s.bank ?? {}, paymentDays: s.paymentDays, categories: Array.isArray(s.categories) ? s.categories : [] };
  } catch {
    return { company: {}, bank: {}, categories: [] };
  }
}

const pick = <T extends Record<string, unknown>>(base: T, over: Partial<Record<keyof T, string>>): T => {
  const out = { ...base };
  for (const k of Object.keys(base) as (keyof T)[]) {
    const v = over[k];
    // «co» und «phone» dürfen bewusst leer sein, die anderen Felder nicht
    if (typeof v === 'string' && (v.trim() || k === 'co' || k === 'phone')) out[k] = v.trim() as T[keyof T];
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
}

export function categoryName(slug: string, lang: string): string {
  const c = current.categories.find((x) => x.slug === slug);
  if (!c) return '';
  return (c[lang as keyof Category] as string | undefined) || c.de;
}
