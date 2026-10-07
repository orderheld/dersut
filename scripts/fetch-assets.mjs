// Lädt die offiziellen Dersut-Bilder von dersut.it nach public/brand/
// und trägt sie in src/lib/brand-manifest.json ein. Danach liefert die Webseite die lokalen Kopien aus.
// Aufruf (PowerShell, im Projektordner):  npm run fetch-assets
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const src = await readFile(path.join(root, 'src/lib/brand.ts'), 'utf8');
const block = src.slice(src.indexOf('BRAND_ASSETS = {'), src.indexOf('} as const'));
const assets = [...block.matchAll(/^\s+(\w+):\s*'(https:[^']+)'/gm)].map((m) => ({ key: m[1], url: m[2] }));
if (!assets.length) throw new Error('Keine Bild-Adressen in src/lib/brand.ts gefunden.');

const outDir = path.join(root, 'public/brand');
await mkdir(outDir, { recursive: true });
const manifestPath = path.join(root, 'src/lib/brand-manifest.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8').catch(() => '{}'));

let ok = 0;
for (const { key, url } of assets) {
  const ext = path.extname(new URL(url).pathname).toLowerCase() || '.jpg';
  const file = `${key}${ext}`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Dersut Schweiz Asset-Sync)' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const type = res.headers.get('content-type') ?? '';
    if (!type.startsWith('image/')) throw new Error(`kein Bild (${type})`);
    await writeFile(path.join(outDir, file), Buffer.from(await res.arrayBuffer()));
    manifest[key] = `/brand/${file}`;
    ok++;
    console.log(`✓ ${key}`);
  } catch (e) {
    console.warn(`✗ ${key}: ${e.message} (${url})`);
  }
}
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\n${ok} von ${assets.length} Bildern gespeichert in public/brand/.`);
console.log('Jetzt committen und pushen, dann liefert Vercel die Bilder selbst aus.');
