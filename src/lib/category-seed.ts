import { DEFAULT_CATEGORIES } from '@/content/categories';
import { parseSettings, SETTINGS_KEY } from './settings-core';

type Q = (text: string, params?: unknown[]) => Promise<Record<string, any>[]>;
const FLAG = 'categories_seeded';

/**
 * Einmalig: Startkategorien anlegen (nur wenn noch keine existieren) und Produkte ohne Kategorie
 * den Kaffeebohnen zuordnen (das ganze bisherige Sortiment sind Bohnen). Danach nie wieder,
 * damit Änderungen im Admin bestehen bleiben.
 */
export async function seedCategories(q: Q): Promise<void> {
  const done = await q('SELECT 1 FROM app_settings WHERE key = $1', [FLAG]);
  if (done.length) return;
  const rows = await q('SELECT value FROM app_settings WHERE key = $1', [SETTINGS_KEY]);
  const s = parseSettings(rows[0]?.value);
  if (!s.categories.length) {
    s.categories = DEFAULT_CATEGORIES;
    await q(`INSERT INTO app_settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`, [SETTINGS_KEY, JSON.stringify(s)]);
  }
  if (s.categories.some((c) => c.slug === 'kaffeebohnen')) await q(`UPDATE products SET category = 'kaffeebohnen' WHERE category = ''`);
  await q(`INSERT INTO app_settings (key, value) VALUES ($1, '1') ON CONFLICT (key) DO NOTHING`, [FLAG]);
}
