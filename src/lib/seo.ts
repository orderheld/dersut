import type { Metadata } from 'next';
import { config } from './config';
import { LOCALES, LOCALE_TAGS, OG_LOCALES, lp, type Locale } from './i18n';
import { CUTOUT_VERSION, brand } from './brand';
import { getDict } from '@/i18n';

export const absolute = (path: string) => config.siteUrl.replace(/\/$/, '') + (path.startsWith('/') ? path : `/${path}`);

/** hreflang-Alternativen einer Seite in allen Sprachen (inkl. x-default = Deutsch) */
/** Volle Sichtbarkeit in Google: grosse Bildvorschau, Snippets ohne Längenbegrenzung */
export const INDEX = { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' as const, 'max-snippet': -1, 'max-video-preview': -1 } };

/**
 * Vorschaubild für Google, WhatsApp, Facebook & Co.: immer 1200 × 630 px mit Dersut-Wortmarke.
 * `pack` = freigestellter Packshot (Produktseiten), sonst Foto im Querformat.
 */
export function shareImage(src: string, alt: string, pack = false) {
  const url = absolute(`/api/og?v=${CUTOUT_VERSION}&src=${encodeURIComponent(src)}${pack ? '&pack=1' : ''}`);
  return { url, width: 1200, height: 630, alt, type: 'image/jpeg' };
}

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
  opts: { image?: string; pack?: boolean; noindex?: boolean; absoluteTitle?: boolean; type?: 'website' | 'article' } = {},
): Metadata {
  const url = absolute(lp(lang, path));
  const image = shareImage(opts.image || brand('hero_1'), title, opts.pack);
  return {
    title: opts.absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: opts.type ?? 'website',
      url,
      title,
      description,
      siteName: getDict(lang).meta.siteName,
      locale: OG_LOCALES[lang],
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) => OG_LOCALES[l]),
      images: [image],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image.url] },
    robots: opts.noindex ? { index: false, follow: true } : INDEX,
  };
}

/** JSON-LD sicher in ein <script> schreiben */
export function jsonLd(data: unknown): { __html: string } {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') };
}

/** Brotkrumen als JSON-LD: Startseite → … (Pfade ohne Sprachpräfix) */
export function breadcrumbLd(lang: Locale, items: [string, string][]) {
  const all: [string, string][] = [[getDict(lang).nav.home, '/'], ...items];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: absolute(lp(lang, path)) })),
  };
}

/** Häufige Fragen als JSON-LD (FAQPage) */
export function faqLd(faq: [string, string][]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
}
