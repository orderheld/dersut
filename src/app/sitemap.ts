import type { MetadataRoute } from 'next';
import { absUrl } from '@/lib/format';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

const PAGES = ['/', '/shop', '/geschichte', '/qualitaet', '/zertifizierungen', '/nachhaltigkeit', '/offizieller-vertrieb', '/gastronomie', '/versand-zahlung', '/kontakt', '/agb', '/datenschutz', '/impressum'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  return [...PAGES.map((p) => ({ url: absUrl(p) })), ...products.map((p) => ({ url: absUrl(`/shop/${p.slug}`) }))];
}
