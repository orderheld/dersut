import 'server-only';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { BRAND_ASSETS } from './brand';
import { one } from './db';
import { loadMedia, parseMediaPath } from './media';

/** Bildverarbeitung für Freisteller (/api/cutout) und Vorschaubilder beim Teilen (/api/og). */

const ALLOWED_HOSTS = [/^www\.dersut\.it$/, /\.public\.blob\.vercel-storage\.com$/];
const MAX_BYTES = 12 * 1024 * 1024;
const BRAND_URLS = new Set<string>(Object.values(BRAND_ASSETS));

/** Nur Bilder freistellen, die die Webseite tatsächlich verwendet (Markenbilder oder Produktbilder aus der Datenbank). */
export async function isKnownImage(src: string): Promise<boolean> {
  if (BRAND_URLS.has(src) || src.startsWith('/brand/') || src.startsWith('/uploads/') || parseMediaPath(src)) return true;
  const row = await one('SELECT 1 FROM products WHERE image = $1 OR gallery ? $1 LIMIT 1', [src]).catch(() => null);
  return !!row;
}

export async function loadImage(src: string): Promise<Buffer | null> {
  const media = parseMediaPath(src);
  if (media) return (await loadMedia(media.id, media.hash))?.data ?? null;
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

/**
 * Hintergrund transparent machen: vom Rand her erreichbare, fast weisse Pixel und der graue Bodenschatten
 * des Packshots. Der Schatten ist ein weicher Verlauf, deshalb geht die Füllung nur zu sehr ähnlichen
 * Nachbarpixeln weiter: An der Kante der Packung (auch bei silbernen Packungen) stoppt sie. Kanten weich.
 */
function cutout(px: Buffer, w: number, h: number): void {
  const n = w * h;
  const bg = new Uint8Array(n); // 1 = Hintergrund
  const lum = (i: number) => Math.min(px[i * 4], px[i * 4 + 1], px[i * 4 + 2]);
  const chroma = (i: number) => Math.max(px[i * 4], px[i * 4 + 1], px[i * 4 + 2]) - lum(i);
  const white = (i: number) => lum(i) >= 232 && chroma(i) <= 22;
  const step = (from: number, i: number) => {
    if (white(i)) return true;
    if (lum(i) < 70 || chroma(i) > 16) return false;
    const a = from * 4, b = i * 4;
    return Math.abs(px[a] - px[b]) <= 4 && Math.abs(px[a + 1] - px[b + 1]) <= 4 && Math.abs(px[a + 2] - px[b + 2]) <= 4;
  };
  const stack: number[] = [];
  const seed = (i: number) => {
    if (!bg[i] && white(i)) {
      bg[i] = 1;
      stack.push(i);
    }
  };
  const push = (from: number, i: number) => {
    if (!bg[i] && step(from, i)) {
      bg[i] = 1;
      stack.push(i);
    }
  };
  for (let x = 0; x < w; x++) { seed(x); seed((h - 1) * w + x); }
  for (let y = 0; y < h; y++) { seed(y * w); seed(y * w + w - 1); }
  while (stack.length) {
    const i = stack.pop()!;
    const x = i % w;
    if (x > 0) push(i, i - 1);
    if (x < w - 1) push(i, i + 1);
    if (i >= w) push(i, i - w);
    if (i < n - w) push(i, i + w);
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

/* ---------- Aufbereitung beim Hochladen im Admin ---------- */

/**
 * Hintergrund eines Produktfotos entfernen, auch wenn er nicht weiss ist (z. B. graues Papier, heller Tisch):
 * Die Hintergrundfarbe wird am Bildrand gemessen, von dort aus werden ähnliche Pixel und weiche Schatten
 * transparent. Gibt false zurück, wenn der Rand zu unruhig ist (kein einheitlicher Hintergrund).
 */
function removeBackground(px: Buffer, w: number, h: number): boolean {
  const n = w * h;
  const border: number[] = [];
  for (let x = 0; x < w; x++) border.push(x, (h - 1) * w + x);
  for (let y = 1; y < h - 1; y++) border.push(y * w, y * w + w - 1);
  const median = (c: number) => {
    const v = border.map((i) => px[i * 4 + c]).sort((a, b) => a - b);
    return v[v.length >> 1];
  };
  const bg = [median(0), median(1), median(2)];
  const dist = (i: number) => Math.max(Math.abs(px[i * 4] - bg[0]), Math.abs(px[i * 4 + 1] - bg[1]), Math.abs(px[i * 4 + 2] - bg[2]));
  const TOL = Math.min(...bg) >= 225 ? 24 : 30;
  const calm = border.filter((i) => dist(i) <= TOL).length / border.length;
  if (calm < 0.6) return false;

  const mask = new Uint8Array(n); // 1 = Hintergrund
  const stack: number[] = [];
  for (const i of border) if (!mask[i] && dist(i) <= TOL) { mask[i] = 1; stack.push(i); }
  const near = (a: number, b: number) =>
    Math.abs(px[a * 4] - px[b * 4]) <= 4 && Math.abs(px[a * 4 + 1] - px[b * 4 + 1]) <= 4 && Math.abs(px[a * 4 + 2] - px[b * 4 + 2]) <= 4;
  const push = (from: number, i: number) => {
    if (mask[i]) return;
    const d = dist(i);
    // weicher Schatten: nur in kleinen Schritten und nur etwas dunkler als der Hintergrund
    if (d <= TOL || (d <= 80 && near(from, i) && px[i * 4] <= bg[0] + 6)) { mask[i] = 1; stack.push(i); }
  };
  while (stack.length) {
    const i = stack.pop()!;
    const x = i % w;
    if (x > 0) push(i, i - 1);
    if (x < w - 1) push(i, i + 1);
    if (i >= w) push(i, i - w);
    if (i < n - w) push(i, i + w);
  }
  for (let i = 0; i < n; i++) {
    const o = i * 4;
    if (mask[i]) { px[o + 3] = 0; continue; }
    const x = i % w;
    const edge = (x > 0 && mask[i - 1]) || (x < w - 1 && mask[i + 1]) || (i >= w && mask[i - w]) || (i < n - w && mask[i + w]);
    if (!edge) continue;
    // Kante weich auslaufen lassen und die Hintergrundfarbe herausrechnen (kein farbiger Saum)
    const a = Math.max(0.15, Math.min(1, dist(i) / (TOL * 2.5)));
    for (let c = 0; c < 3; c++) px[o + c] = Math.max(0, Math.min(255, Math.round((px[o + c] - bg[c] * (1 - a)) / a)));
    px[o + 3] = Math.round(a * 255);
  }
  return true;
}

export type Prepared = { data: Buffer; mime: string; width: number; height: number; note: string };

/**
 * Aufbau wie die Originalfotos von Dersut (1000 × 1000, Packung 70 % hoch, mittig, unten 12.5 % Rand):
 * quadratisch auf weissem Grund, damit alle Produkte im Shop gleich gross wirken.
 */
const PACK_SIZE = 1400;
const PACK_BOX = { w: 0.74, h: 0.705, bottom: 0.125 };

/**
 * Produktfoto für den Shop aufbereiten: Hintergrund entfernen, auf das Produkt zuschneiden und
 * mittig auf eine quadratische weisse Fläche setzen. So sieht jedes neue Foto aus wie die bestehenden
 * Packshots und der Shop stellt es genau gleich frei (Bühne mit Bohnen und Schatten).
 */
export async function preparePackshot(input: Buffer): Promise<Prepared> {
  const { data, info } = await sharp(input, { limitInputPixels: 60_000_000 })
    .rotate()
    .resize({ width: 1800, height: 1800, fit: 'inside', withoutEnlargement: true })
    .flatten({ background: '#ffffff' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const cut = removeBackground(data, info.width, info.height);
  let product: Buffer;
  let note = '';
  if (cut) {
    product = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).trim({ threshold: 0 }).png().toBuffer().catch(() => Buffer.alloc(0));
    const m = product.length ? await sharp(product).metadata() : null;
    // Nur ein Fleck übrig? Dann lieber das ganze Foto nehmen
    if (!m || (m.width ?? 0) * (m.height ?? 0) < info.width * info.height * 0.03) {
      product = await sharp(input).rotate().png().toBuffer();
      note = 'Der Hintergrund liess sich nicht sauber entfernen. Das Foto wurde nur zugeschnitten.';
    }
  } else {
    product = await sharp(input).rotate().png().toBuffer();
    note = 'Der Hintergrund ist nicht einheitlich, deshalb wurde er nicht entfernt. Am besten wirkt ein Foto vor einer hellen, ruhigen Fläche.';
  }
  const { data: fitted, info: fi } = await sharp(product)
    .resize({ width: Math.round(PACK_SIZE * PACK_BOX.w), height: Math.round(PACK_SIZE * PACK_BOX.h), fit: 'inside' })
    .png()
    .toBuffer({ resolveWithObject: true });
  // Unterkante wie bei den Originalen; sehr breite Produkte (z. B. liegende Dose) mittig
  const top = Math.max(0, Math.min(PACK_SIZE - fi.height - Math.round(PACK_SIZE * PACK_BOX.bottom), Math.round((PACK_SIZE - fi.height) / 2) + Math.round(PACK_SIZE * 0.023)));
  const out = await sharp({ create: { width: PACK_SIZE, height: PACK_SIZE, channels: 3, background: '#ffffff' } })
    .composite([{ input: fitted, left: Math.round((PACK_SIZE - fi.width) / 2), top }])
    .jpeg({ quality: 90, mozjpeg: true })
    .toBuffer();
  return { data: out, mime: 'image/jpeg', width: PACK_SIZE, height: PACK_SIZE, note };
}

/** Stimmungsbild (Galerie): gedreht wie fotografiert, höchstens 1800 px, als WebP komprimiert. */
export async function preparePhoto(input: Buffer): Promise<Prepared> {
  const { data, info } = await sharp(input, { limitInputPixels: 60_000_000 })
    .rotate()
    .resize({ width: 1800, height: 1800, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 84 })
    .toBuffer({ resolveWithObject: true });
  return { data, mime: 'image/webp', width: info.width, height: info.height, note: '' };
}
