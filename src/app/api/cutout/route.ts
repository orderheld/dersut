import sharp from 'sharp';
import { CUTOUT_VERSION } from '@/lib/brand';
import { cutoutImage, isKnownImage, loadImage } from '@/lib/imaging';

/**
 * Stellt Produktfotos frei: Der weisse Hintergrund eines Packshots wird transparent.
 * Nur Flächen, die mit dem Bildrand verbunden sind, werden entfernt, helle Stellen
 * auf der Packung bleiben erhalten. Ergebnis: WebP mit Transparenz, lange im CDN gecacht.
 * Aufruf: /api/cutout?v=<Version>&src=<Bild-URL oder /brand/…-Pfad>&w=<480|800|1200|1400>
 */
export const runtime = 'nodejs';

const MAX = 1400;
const WIDTHS = [480, 800, 1200, 1400];

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const src = params.get('src') ?? '';
  // Nur feste Breiten und keine weiteren Parameter: So kann niemand den CDN-Cache umgehen
  const width = params.has('w') ? Number(params.get('w')) : MAX;
  const extra = [...params.keys()].some((k) => !['src', 'w', 'v'].includes(k));
  if (!WIDTHS.includes(width) || extra || (params.has('v') && params.get('v') !== CUTOUT_VERSION)) return new Response('Ungültige Anfrage', { status: 400 });
  const input = src && (await isKnownImage(src)) ? await loadImage(src).catch(() => null) : null;
  if (!input) return new Response('Bild nicht gefunden', { status: 404 });
  try {
    const png = await cutoutImage(input, MAX);
    const sized = await sharp(png).resize({ width, height: width, fit: 'inside', withoutEnlargement: true }).webp({ quality: width < MAX ? 85 : 88, alphaQuality: 90 }).toBuffer();
    return new Response(new Uint8Array(sized), {
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable',
      },
    });
  } catch (e) {
    console.error('Freistellen fehlgeschlagen:', e);
    return new Response('Fehler', { status: 500 });
  }
}
