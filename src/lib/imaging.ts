import 'server-only';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { BRAND_ASSETS } from './brand';
import { one } from './db';

/** Bildverarbeitung für Freisteller (/api/cutout) und Vorschaubilder beim Teilen (/api/og). */

const ALLOWED_HOSTS = [/^www\.dersut\.it$/, /\.public\.blob\.vercel-storage\.com$/];
const MAX_BYTES = 12 * 1024 * 1024;
const BRAND_URLS = new Set<string>(Object.values(BRAND_ASSETS));

/** Nur Bilder freistellen, die die Webseite tatsächlich verwendet (Markenbilder oder Produktbilder aus der Datenbank). */
export async function isKnownImage(src: string): Promise<boolean> {
  if (BRAND_URLS.has(src) || src.startsWith('/brand/') || src.startsWith('/uploads/')) return true;
  const row = await one('SELECT 1 FROM products WHERE image = $1 OR gallery ? $1 LIMIT 1', [src]).catch(() => null);
  return !!row;
}

export async function loadImage(src: string): Promise<Buffer | null> {
  if (src.startsWith('/brand/') || src.startsWith('/uploads/')) {
    const file = path.join(process.cwd(), 'public', path.normalize(src).replace(/^(\.\.[/\\])+/, ''));
    if (!file.startsWith(path.join(process.cwd(), 'public'))) return null;
    return readFile(file).catch(() => null);
  }
  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return null;
  }
  if (url.protocol !== 'https:' || !ALLOWED_HOSTS.some((h) => h.test(url.hostname))) return null;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Dersut Schweiz)' }, redirect: 'error' });
  if (!res.ok || !(res.headers.get('content-type') ?? '').startsWith('image/')) return null;
  if (Number(res.headers.get('content-length') ?? 0) > MAX_BYTES) return null;
  const buf = Buffer.from(await res.arrayBuffer());
  return buf.length > MAX_BYTES ? null : buf;
}

/** Hintergrund (vom Rand her erreichbare, fast weisse Pixel) transparent machen, Kanten weich. */
function cutout(px: Buffer, w: number, h: number): void {
  const n = w * h;
  const bg = new Uint8Array(n); // 1 = Hintergrund
  const near = (i: number, lim: number) => {
    const o = i * 4;
    const r = px[o], g = px[o + 1], b = px[o + 2];
    const mn = Math.min(r, g, b), mx = Math.max(r, g, b);
    return mn >= lim && mx - mn <= 22;
  };
  const stack: number[] = [];
  const push = (i: number) => {
    if (!bg[i] && near(i, 232)) {
      bg[i] = 1;
      stack.push(i);
    }
  };
  for (let x = 0; x < w; x++) { push(x); push((h - 1) * w + x); }
  for (let y = 0; y < h; y++) { push(y * w); push(y * w + w - 1); }
  while (stack.length) {
    const i = stack.pop()!;
    const x = i % w;
    if (x > 0) push(i - 1);
    if (x < w - 1) push(i + 1);
    if (i >= w) push(i - w);
    if (i < n - w) push(i + w);
  }
  for (let i = 0; i < n; i++) {
    const o = i * 4;
    if (bg[i]) {
      px[o + 3] = 0;
      continue;
    }
    // Kantenpixel neben dem Hintergrund: weiche Transparenz und Weiss herausrechnen
    const x = i % w;
    const edge = (x > 0 && bg[i - 1]) || (x < w - 1 && bg[i + 1]) || (i >= w && bg[i - w]) || (i < n - w && bg[i + w]);
    if (!edge) continue;
    const mn = Math.min(px[o], px[o + 1], px[o + 2]);
    const a = Math.max(0.15, Math.min(1, (255 - mn) / 70));
    for (let c = 0; c < 3; c++) px[o + c] = Math.max(0, Math.min(255, Math.round((px[o + c] - 255 * (1 - a)) / a)));
    px[o + 3] = Math.round(a * 255);
  }
}


/** Packshot freistellen: transparenter Hintergrund, auf den Inhalt zugeschnitten (PNG mit Alpha). */
export async function cutoutImage(input: Buffer, max = 1400): Promise<Buffer> {
  const { data, info } = await sharp(input, { limitInputPixels: 40_000_000 })
    .rotate()
    .resize({ width: max, height: max, fit: 'inside', withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  cutout(data, info.width, info.height);
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).trim({ threshold: 0 }).png().toBuffer();
}
