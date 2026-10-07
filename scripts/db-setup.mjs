// Prüft die Verbindung zur Neon-Datenbank. Die Tabellen legt die Webseite beim ersten Aufruf selbst an.
// Aufruf (PowerShell):  npm run db:setup   (liest DATABASE_URL aus .env.local)
import { readFile } from 'node:fs/promises';
import { neon } from '@neondatabase/serverless';

let url = process.env.DATABASE_URL;
if (!url) {
  const env = await readFile('.env.local', 'utf8').catch(() => '');
  url = env.match(/^DATABASE_URL\s*=\s*"?([^"\r\n]+)"?/m)?.[1];
}
if (!url || url.startsWith('pglite:')) {
  console.error('Bitte DATABASE_URL (Neon) in .env.local eintragen.');
  process.exit(1);
}
const sql = neon(url);
const [{ version }] = await sql`SELECT version()`;
console.log('✓ Verbindung zu Neon steht:', version.split(',')[0]);
const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY 1`;
console.log(tables.length ? `Tabellen: ${tables.map((t) => t.table_name).join(', ')}` : 'Noch keine Tabellen. Sie werden beim ersten Aufruf der Webseite angelegt.');
