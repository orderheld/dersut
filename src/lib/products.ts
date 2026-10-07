import 'server-only';
import { query, one } from './db';
import type { Locale } from './i18n';
import type { ProductText, ProductTranslations } from './products-shared';

export type Product = {
  id: number;
  slug: string;
  name: string;
  line: string;
  subtitle: string;
  description: string;
  notes: string;
  blend: string;
  weight: string;
  price: number;
  image: string;
  intensity: number;
  accent: string;
  active: boolean;
  stock: number | null;
  sort: number;
  translations: ProductTranslations;
  gallery: string[];
};

/** Produkt mit Texten in der gewünschten Sprache (fehlende Felder fallen auf Deutsch zurück). */
export type LocalizedProduct = Product & Pick<ProductText, 'seoTitle' | 'seoDescription' | 'highlights' | 'details'> & { images: string[] };

function parseJson<T>(v: unknown, fallback: T): T {
  if (v == null) return fallback;
  if (typeof v === 'string') {
    try {
      return JSON.parse(v) as T;
    } catch {
      return fallback;
    }
  }
  return v as T;
}

function normalize(p: Product): Product {
  return { ...p, translations: parseJson(p.translations, {}), gallery: parseJson(p.gallery, []) };
}

export function localizeProduct(raw: Product, lang: Locale = 'de'): LocalizedProduct {
  const p = normalize(raw);
  const de = p.translations.de ?? {};
  const t = lang === 'de' ? de : { ...de, ...(p.translations[lang] ?? {}) };
  const pick = (k: 'subtitle' | 'description' | 'notes' | 'blend') => (lang !== 'de' && p.translations[lang]?.[k]) || p[k];
  const images = [p.image, ...p.gallery.filter((g) => g && g !== p.image)].filter(Boolean);
  return {
    ...p,
    subtitle: pick('subtitle'),
    description: pick('description'),
    notes: pick('notes'),
    blend: pick('blend'),
    seoTitle: t.seoTitle || `${p.name} ${p.weight}`,
    seoDescription: t.seoDescription || pick('description').slice(0, 158),
    highlights: (lang !== 'de' && p.translations[lang]?.highlights?.length ? p.translations[lang]!.highlights : de.highlights) ?? [],
    details: (lang !== 'de' && p.translations[lang]?.details) || de.details || '',
    images,
  };
}

export async function getProducts(onlyActive = true, lang: Locale = 'de'): Promise<LocalizedProduct[]> {
  const rows = await query<Product>(`SELECT * FROM products ${onlyActive ? 'WHERE active' : ''} ORDER BY sort, id`);
  return rows.map((r) => localizeProduct(r, lang));
}

export async function getProductBySlug(slug: string, lang: Locale = 'de'): Promise<LocalizedProduct | null> {
  const r = await one<Product>('SELECT * FROM products WHERE slug = $1 AND active', [slug]);
  return r ? localizeProduct(r, lang) : null;
}

export async function getProduct(id: number): Promise<Product | null> {
  const r = await one<Product>('SELECT * FROM products WHERE id = $1', [id]);
  return r ? normalize(r) : null;
}

export function isSoldOut(p: Product): boolean {
  return p.stock !== null && p.stock <= 0;
}
