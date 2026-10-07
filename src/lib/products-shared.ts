import type { Locale } from './i18n';

/** Übersetzbare Produkttexte (DE liegt in den normalen Spalten, Rest in products.translations). */
export type ProductText = {
  subtitle: string;
  description: string;
  notes: string;
  blend: string;
  seoTitle: string;
  seoDescription: string;
  highlights: string[];
  details: string;
};

export type ProductTranslations = Partial<Record<Locale, Partial<ProductText>>>;

export const TRANSLATABLE_FIELDS = ['subtitle', 'description', 'notes', 'blend', 'seoTitle', 'seoDescription', 'details'] as const;
