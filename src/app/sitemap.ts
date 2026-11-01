import type { MetadataRoute } from 'next';
import { ARTICLES } from '@/content/ratgeber';
import { REGIONS } from '@/content/regions';
import { productImage } from '@/lib/brand';
import { LOCALES, lp } from '@/lib/i18n';
import { getProducts } from '@/lib/products';
import { shopCategories } from '@/lib/categories';
import { absolute, languageAlternates } from '@/lib/seo';

export const dynamic = 'force-dynamic';

// Stand der Inhalte (bei grösseren Textänderungen anpassen); Produkte nutzen das aktuelle Datum nicht,
// damit Suchmaschinen nicht bei jedem Aufruf eine Änderung sehen
const CONTENT_UPDATED = new Date('2026-11-01');

const PAGES: [string, number][] = [
  ['/', 1], ['/shop', 0.9], ...REGIONS.map((r): [string, number] => [`/region/${r.slug}`, 0.7]), ['/geschichte', 0.7], ['/qualitaet', 0.7], ['/zertifizierungen', 0.6], ['/nachhaltigkeit', 0.6],
  ['/offizieller-vertrieb', 0.6], ['/gastronomie', 0.8], ['/firmen', 0.8], ['/versand-zahlung', 0.5], ['/ratgeber', 0.6], ...ARTICLES.map((a): [string, number] => [`/ratgeber/${a.slug}`, 0.7]), ['/kontakt', 0.5], ['/agb', 0.2], ['/datenschutz', 0.2], ['/impressum', 0.2],
];

/** Sitemap mit allen Seiten in allen Sprachen, inkl. hreflang-Alternativen und Produktbildern */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const out: MetadataRoute.Sitemap = [];
  const cats = shopCategories(products, 'de');
  for (const lang of LOCALES) {
    for (const [path, priority] of PAGES) {
      out.push({ url: absolute(lp(lang, path)), lastModified: CONTENT_UPDATED, changeFrequency: 'monthly', priority, alternates: { languages: languageAlternates(path) } });
    }
    for (const c of cats) {
      const path = `/shop/kategorie/${c.slug}`;
      out.push({ url: absolute(lp(lang, path)), lastModified: CONTENT_UPDATED, changeFrequency: 'weekly', priority: 0.8, alternates: { languages: languageAlternates(path) } });
    }
    for (const p of products) {
      const path = `/shop/${p.slug}`;
      out.push({
        url: absolute(lp(lang, path)),
        lastModified: CONTENT_UPDATED,
        changeFrequency: 'weekly',
        priority: 0.9,
        alternates: { languages: languageAlternates(path) },
        images: p.images.map(productImage).filter(Boolean).map((i) => (i.startsWith('http') ? i : absolute(i))),
      });
    }
  }
  return out;
}
