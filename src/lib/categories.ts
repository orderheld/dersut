import 'server-only';
import type { Locale } from './i18n';
import type { LocalizedProduct } from './products';
import { categoryLabel, currentSettings, type Category } from './settings-core';

export type ShopCategory = Category & { name: string; count: number };

/** Kategorien mit mindestens einem sichtbaren Produkt, in der Reihenfolge aus dem Admin. */
export function shopCategories(products: LocalizedProduct[], lang: Locale): ShopCategory[] {
  return currentSettings()
    .categories.map((c) => ({ ...c, name: categoryLabel(c, lang), count: products.filter((p) => p.category === c.slug).length }))
    .filter((c) => c.count > 0);
}
