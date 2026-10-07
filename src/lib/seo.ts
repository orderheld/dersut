import type { Metadata } from 'next';
import { config } from './config';
import { LOCALES, LOCALE_TAGS, OG_LOCALES, lp, type Locale } from './i18n';
import { brand } from './brand';

export const absolute = (path: string) => config.siteUrl.replace(/\/$/, '') + (path.startsWith('/') ? path : `/${path}`);

/** hreflang-Alternativen einer Seite in allen Sprachen (inkl. x-default = Deutsch) */
export function languageAlternates(path: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of LOCALES) out[LOCALE_TAGS[l]] = absolute(lp(l, path));
  out['x-default'] = absolute(lp('de', path));
  return out;
}

/**
 * Metadaten einer Seite: Titel, Beschreibung, Canonical, hreflang, Open Graph und Twitter.
 * `path` ist der Pfad ohne Sprachpräfix, z. B. '/shop'.
 */
export function pageMeta(
  lang: Locale,
  path: string,
  title: string,
  description: string,
  opts: { image?: string; noindex?: boolean; absoluteTitle?: boolean; type?: 'website' | 'article' } = {},
): Metadata {
  const url = absolute(lp(lang, path));
  const image = opts.image || brand('hero_1');
  return {
    title: opts.absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: opts.type ?? 'website',
      url,
      title,
      description,
      siteName: 'Dersut Kaffee Schweiz',
      locale: OG_LOCALES[lang],
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) => OG_LOCALES[l]),
      images: [{ url: image }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
    robots: opts.noindex ? { index: false, follow: true } : undefined,
  };
}

/** JSON-LD sicher in ein <script> schreiben */
export function jsonLd(data: unknown): { __html: string } {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') };
}
