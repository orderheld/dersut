/**
 * Sprachen der Webseite. Deutsch liegt ohne Präfix auf der Hauptadresse (/shop),
 * die anderen Sprachen unter /fr, /it und /en (z. B. /fr/shop). Die URL-Pfade sind in allen Sprachen gleich.
 */
export const LOCALES = ['de', 'fr', 'it', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'de';

export const LOCALE_NAMES: Record<Locale, string> = { de: 'Deutsch', fr: 'Français', it: 'Italiano', en: 'English' };
/** BCP-47-Tags für html lang, hreflang, Datums- und Zahlenformate */
export const LOCALE_TAGS: Record<Locale, string> = { de: 'de-CH', fr: 'fr-CH', it: 'it-CH', en: 'en-CH' };
export const OG_LOCALES: Record<Locale, string> = { de: 'de_CH', fr: 'fr_CH', it: 'it_CH', en: 'en_GB' };

export function isLocale(v: unknown): v is Locale {
  return typeof v === 'string' && (LOCALES as readonly string[]).includes(v);
}

export function asLocale(v: unknown): Locale {
  return isLocale(v) ? v : DEFAULT_LOCALE;
}

/** Pfad in der jeweiligen Sprache: lp('fr', '/shop') → '/fr/shop', lp('de', '/shop') → '/shop' */
export function lp(lang: Locale, path = '/'): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  if (lang === DEFAULT_LOCALE) return p;
  return p === '/' ? `/${lang}` : `/${lang}${p}`;
}

/** Entfernt das Sprachpräfix: '/fr/shop' → '/shop' */
export function stripLocale(pathname: string): string {
  const m = /^\/(fr|it|en|de)(?=\/|$)/.exec(pathname);
  return m ? pathname.slice(m[0].length) || '/' : pathname || '/';
}

export function localeFromPath(pathname: string): Locale {
  const m = /^\/(fr|it|en)(?=\/|$)/.exec(pathname);
  return (m?.[1] as Locale) ?? DEFAULT_LOCALE;
}
