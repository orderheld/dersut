import type { MetadataRoute } from 'next';
import { productImage } from '@/lib/brand';
import { LOCALES, lp } from '@/lib/i18n';
import { getProducts } from '@/lib/products';
import { absolute, languageAlternates } from '@/lib/seo';

export const dynamic = 'force-dynamic';

const PAGES: [string, number][] = [
  ['/', 1], ['/shop', 0.9], ['/geschichte', 0.7], ['/qualitaet', 0.7], ['/zertifizierungen', 0.6], ['/nachhaltigkeit', 0.6],
  ['/offizieller-vertrieb', 0.6], ['/gastronomie', 0.7], ['/versand-zahlung', 0.5], ['/kontakt', 0.5], ['/agb', 0.2], ['/datenschutz', 0.2], ['/impressum', 0.2],
];

/** Sitemap mit allen Seiten in allen Sprachen, inkl. hreflang-Alternativen und Produktbildern */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const now = new Date();
  const out: MetadataRoute.Sitemap = [];
  for (const lang of LOCALES) {
    for (const [path, priority] of PAGES) {
      out.push({ url: absolute(lp(lang, path)), lastModified: now, changeFrequency: 'monthly', priority, alternates: { languages: languageAlternates(path) } });
    }
    for (const p of products) {
      const path = `/shop/${p.slug}`;
      out.push({
        url: absolute(lp(lang, path)),
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.9,
        alternates: { languages: languageAlternates(path) },
        images: p.images.map(productImage).filter(Boolean),
      });
    }
  }
  return out;
}
