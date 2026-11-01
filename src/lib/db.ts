import 'server-only';
import { neon } from '@neondatabase/serverless';
import { ADDED_PRODUCTS, SCHEMA, SEED_PRODUCTS } from './schema';
import { SEED_TRANSLATIONS, SEO_DESCRIPTION_UPDATES } from './product-seed-i18n';
import { applySettings, parseSettings, SETTINGS_KEY } from './settings-core';
import { seedCategories } from './category-seed';

export type Row = Record<string, any>;
export type Query = { text: string; params?: unknown[] };

type Driver = {
  query: (text: string, params?: unknown[]) => Promise<Row[]>;
  transaction: (queries: Query[]) => Promise<void>;
};

let driver: Promise<Driver> | null = null;
let settingsLoadedAt = 0;

/** Stammdaten aus dem Admin übernehmen (beim Start und danach höchstens einmal pro Minute neu). */
async function refreshSettings(d: Driver): Promise<void> {
  settingsLoadedAt = Date.now();
  const rows = await d.query('SELECT value FROM app_settings WHERE key = $1', [SETTINGS_KEY]).catch(() => []);
  applySettings(parseSettings(rows[0]?.value));
}

async function createDriver(): Promise<Driver> {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL fehlt. Bitte in .env.local bzw. in Vercel eintragen.');
  }

  // Lokaler Test ohne Neon: DATABASE_URL="pglite:./.data"
  if (url.startsWith('pglite:')) {
    const { PGlite } = await import('@electric-sql/pglite');
    // Eine Instanz pro Prozess: Seiten und API-Routen liegen in getrennten Bundles und würden sonst
    // dieselbe Datenbankdatei zweimal öffnen (führt lokal zu «RuntimeError: Aborted()»).
    const g = globalThis as { __dersutPglite?: InstanceType<typeof PGlite> };
    const db = (g.__dersutPglite ??= new PGlite(url.slice('pglite:'.length) || undefined));
    return {
      query: async (text, params = []) => (await db.query<Row>(text, params as any[])).rows,
      transaction: async (queries) => {
        await db.transaction(async (tx) => {
          for (const q of queries) await tx.query(q.text, (q.params ?? []) as any[]);
        });
      },
    };
  }

  const sql = neon(url);
  return {
    query: async (text, params = []) => (await sql.query(text, params as any[])) as Row[],
    transaction: async (queries) => {
      await sql.transaction(queries.map((q) => sql.query(q.text, (q.params ?? []) as any[])));
    },
  };
}

async function getDriver(): Promise<Driver> {
  if (!driver) {
    driver = (async () => {
      const d = await createDriver();
      // Tabellen anlegen (idempotent) und Startsortiment einfügen
      for (const stmt of SCHEMA) await d.query(stmt);
      const [{ n }] = await d.query('SELECT COUNT(*)::int AS n FROM products');
      if (n === 0) {
        for (const p of SEED_PRODUCTS) {
          const keys = Object.keys(p);
          await d.query(
            `INSERT INTO products (${keys.join(', ')}) VALUES (${keys.map((_, i) => '$' + (i + 1)).join(', ')})`,
            Object.values(p),
          );
        }
      }
      // Neue Sorten einmalig ins bestehende Sortiment aufnehmen (Kategorie wie die übrigen Espressobohnen)
      for (const slug of ADDED_PRODUCTS) {
        const flag = `seed_product:${slug}`;
        if ((await d.query('SELECT 1 FROM app_settings WHERE key = $1', [flag])).length) continue;
        const p = SEED_PRODUCTS.find((x) => x.slug === slug);
        if (p) {
          const keys = Object.keys(p);
          await d.query(
            `INSERT INTO products (${keys.join(', ')}, category)
             VALUES (${keys.map((_, i) => '$' + (i + 1)).join(', ')},
               COALESCE((SELECT category FROM products WHERE category <> '' ORDER BY sort, id LIMIT 1), ''))
             ON CONFLICT (slug) DO NOTHING`,
            Object.values(p),
          );
        }
        await d.query(`INSERT INTO app_settings (key, value) VALUES ($1, '1') ON CONFLICT (key) DO NOTHING`, [flag]);
      }
      // Übersetzungen und Galerie der Startprodukte nachtragen, solange noch leer
      for (const [slug, seed] of Object.entries(SEED_TRANSLATIONS)) {
        await d.query(
          `UPDATE products SET translations = CASE WHEN translations = '{}'::jsonb THEN $2::jsonb ELSE translations END,
             gallery = CASE WHEN gallery = '[]'::jsonb THEN $3::jsonb ELSE gallery END
           WHERE slug = $1`,
          [slug, JSON.stringify(seed.translations), JSON.stringify(seed.gallery)],
        );
      }
      for (const [slug, lang, old, next] of SEO_DESCRIPTION_UPDATES) {
        await d.query(
          `UPDATE products SET translations = jsonb_set(translations, ARRAY[$2::text, 'seoDescription'], to_jsonb($4::text))
           WHERE slug = $1 AND translations -> $2::text ->> 'seoDescription' = $3`,
          [slug, lang, old, next],
        );
      }
      await seedCategories(d.query);
      await refreshSettings(d);
      return d;
    })().catch((e) => {
      driver = null;
      throw e;
    });
  }
  return driver;
}

export async function query<T = Row>(text: string, params: unknown[] = []): Promise<T[]> {
  const d = await getDriver();
  if (Date.now() - settingsLoadedAt > 60_000) await refreshSettings(d);
  return (await d.query(text, params)) as T[];
}

export async function one<T = Row>(text: string, params: unknown[] = []): Promise<T | null> {
  return (await query<T>(text, params))[0] ?? null;
}

/** Nach dem Speichern im Admin sofort übernehmen. */
export async function reloadSettings(): Promise<void> {
  await refreshSettings(await getDriver());
}

export async function transaction(queries: Query[]): Promise<void> {
  await (await getDriver()).transaction(queries);
}

/**
 * Vor dem Anzeigen von Texten mit Versandbeträgen oder Firmendaten aufrufen: stellt sicher, dass die
 * Einstellungen aus dem Admin geladen sind (auch auf Seiten, die sonst keine Datenbank brauchen).
 */
export async function settingsReady(): Promise<void> {
  const d = await getDriver();
  if (Date.now() - settingsLoadedAt > 60_000) await refreshSettings(d);
}
