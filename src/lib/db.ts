import 'server-only';
import { neon } from '@neondatabase/serverless';
import { SCHEMA, SEED_PRODUCTS } from './schema';
import { SEED_TRANSLATIONS } from './product-seed-i18n';

export type Row = Record<string, any>;
export type Query = { text: string; params?: unknown[] };

type Driver = {
  query: (text: string, params?: unknown[]) => Promise<Row[]>;
  transaction: (queries: Query[]) => Promise<void>;
};

let driver: Promise<Driver> | null = null;

async function createDriver(): Promise<Driver> {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL fehlt. Bitte in .env.local bzw. in Vercel eintragen.');
  }

  // Lokaler Test ohne Neon: DATABASE_URL="pglite:./.data"
  if (url.startsWith('pglite:')) {
    const { PGlite } = await import('@electric-sql/pglite');
    const db = new PGlite(url.slice('pglite:'.length) || undefined);
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
      // Übersetzungen und Galerie der Startprodukte nachtragen, solange noch leer
      for (const [slug, seed] of Object.entries(SEED_TRANSLATIONS)) {
        await d.query(
          `UPDATE products SET translations = CASE WHEN translations = '{}'::jsonb THEN $2::jsonb ELSE translations END,
             gallery = CASE WHEN gallery = '[]'::jsonb THEN $3::jsonb ELSE gallery END
           WHERE slug = $1`,
          [slug, JSON.stringify(seed.translations), JSON.stringify(seed.gallery)],
        );
      }
      return d;
    })().catch((e) => {
      driver = null;
      throw e;
    });
  }
  return driver;
}

export async function query<T = Row>(text: string, params: unknown[] = []): Promise<T[]> {
  return (await (await getDriver()).query(text, params)) as T[];
}

export async function one<T = Row>(text: string, params: unknown[] = []): Promise<T | null> {
  return (await query<T>(text, params))[0] ?? null;
}

export async function transaction(queries: Query[]): Promise<void> {
  await (await getDriver()).transaction(queries);
}
