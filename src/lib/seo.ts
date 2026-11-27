import type { Metadata } from 'next';
import { config } from './config';
import { LOCALES, LOCALE_TAGS, OG_LOCALES, lp, type Locale } from './i18n';
import { CUTOUT_VERSION, brand } from './brand';
import { getDict } from '@/i18n';

export const absolute = (path: string) => config.siteUrl.replace(/\/$/, '') + (path.startsWith('/') ? path : `/${path}`);

/** Bildadresse für strukturierte Daten und Feeds: lokale Pfade werden zu vollen URLs */
export const absImage = (src: string) => (src && src.startsWith('/') ? absolute(src) : src);

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
/** Zusatz aus dem Titel-Template im Layout */
const TITLE_SUFFIX = ' | Dersut';

export function pageMeta(
  lang: Locale,
  path: string,
  title: string,
  description: string,
  opts: { image?: string; pack?: boolean; noindex?: boolean; absoluteTitle?: boolean; type?: 'website' | 'article' } = {},
): Metadata {
  const url = absolute(lp(lang, path));
  const image = shareImage(opts.image || brand('hero_1'), title, opts.pack);
  // Google zeigt rund 60 Zeichen: bei langen Titeln den Zusatz « | Dersut» weglassen (Marke steht meist schon drin)
  const fullTitle = opts.absoluteTitle || title.length + TITLE_SUFFIX.length > 62 ? { absolute: title } : title;
  description = description.length > 160 ? metaDescription(description) : description;
  return {
    title: fullTitle,
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

/**
 * Meta-Beschreibung, die Google nicht abschneidet (höchstens rund 158 Zeichen): ganze Sätze aus `text`,
 * solange sie zusammen mit `tail` (z. B. Versandhinweis) Platz haben. Nie mitten im Satz abbrechen.
 */
export function metaDescription(text: string, tail = '', max = 158): string {
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g)?.map((x) => x.trim()).filter(Boolean) ?? [];
  let out = '';
  for (const s of sentences) {
    const next = out ? `${out} ${s}` : s;
    if ((tail ? `${next} ${tail}` : next).length > max) break;
    out = next;
  }
  if (!out && sentences[0]) {
    const cut = sentences[0].slice(0, max - 1);
    out = `${cut.slice(0, cut.lastIndexOf(' '))}…`;
  }
  const full = tail ? `${out} ${tail}`.trim() : out;
  return full.length > max + 2 ? out : full;
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

/**
 * Rückgaberegelung für Google (Produkt-Snippets / Merchant Listings), entspricht AGB Ziffer 7:
 * Lebensmittel sind von Umtausch und Rückgabe ausgeschlossen (Mängel werden weiterhin ersetzt oder erstattet,
 * das ist Gewährleistung, keine Rückgabe). Darum «keine Rückgabe», sonst widerspricht das Markup den AGB.
 */
export function returnPolicyLd() {
  return {
    '@type': 'MerchantReturnPolicy',
    applicableCountry: 'CH',
    returnPolicyCountry: 'CH',
    returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
    merchantReturnLink: absolute('/agb'),
  };
}
