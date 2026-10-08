import sharp from 'sharp';
import { cutoutImage, isKnownImage, loadImage } from '@/lib/imaging';
import { WORDMARK_CAFFE, WORDMARK_DERSUT } from '@/lib/wordmark';

/**
 * Vorschaubild beim Teilen (Google, WhatsApp, Facebook, LinkedIn …): 1200 × 630 px, JPEG.
 * /api/og?src=<Bild>          Foto, zugeschnitten, mit Dersut-Wortmarke
 * /api/og?src=<Packshot>&pack=1  freigestellter Packshot auf ruhiger Fläche
 * /api/og                      nur Wortmarke (Rückfall)
 */
export const runtime = 'nodejs';

const W = 1200;
const H = 630;
const NAVY = '#002856';
const GOLD = '#b9aa80';

const wordmark = (x: number, y: number, scale: number, color = '#fff') =>
  `<g transform="translate(${x} ${y}) scale(${scale})"><path d="${WORDMARK_DERSUT}" fill="${color}"/><path d="${WORDMARK_CAFFE}" fill="${GOLD}"/></g>`;

function plain(): Promise<Buffer> {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="${NAVY}"/>
    ${wordmark(W / 2 - 300 * 1.5, H / 2 - 115 * 1.5, 1.5)}
    <rect x="${W / 2 - 70}" y="${H / 2 + 120}" width="140" height="2" fill="${GOLD}"/></svg>`;
  return sharp(Buffer.from(svg)).jpeg({ quality: 86 }).toBuffer();
}

async function photo(input: Buffer): Promise<Buffer> {
  const base = await sharp(input, { limitInputPixels: 40_000_000 }).rotate().resize(W, H, { fit: 'cover', position: 'attention' }).toBuffer();
  const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#00112a" stop-opacity=".88"/><stop offset=".55" stop-color="#001a3a" stop-opacity=".45"/><stop offset="1" stop-color="#001a3a" stop-opacity="0"/></linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    ${wordmark(-30, 380, 1.05)}
    <rect x="80" y="${H - 52}" width="120" height="2" fill="${GOLD}"/></svg>`;
  return sharp(base).composite([{ input: Buffer.from(overlay) }]).jpeg({ quality: 84, mozjpeg: true }).toBuffer();
}

async function pack(input: Buffer): Promise<Buffer> {
  const cut = await sharp(await cutoutImage(input, 1000)).resize({ height: 520, width: 520, fit: 'inside' }).png().toBuffer();
  const meta = await sharp(cut).metadata();
  const cw = meta.width ?? 0;
  const ch = meta.height ?? 0;
  // weicher Schatten: Umriss der Packung, unscharf und halbtransparent
  const PAD = 40;
  const padded = await sharp({ create: { width: cw + 2 * PAD, height: ch + 2 * PAD, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: cut, left: PAD, top: PAD }])
    .png()
    .toBuffer();
  const alpha = await sharp(padded).extractChannel(3).blur(16).linear(0.3, 0).raw().toBuffer();
  const shadow = await sharp({ create: { width: cw + 2 * PAD, height: ch + 2 * PAD, channels: 3, background: '#2a1d10' } })
    .joinChannel(alpha, { raw: { width: cw + 2 * PAD, height: ch + 2 * PAD, channels: 1 } })
    .png()
    .toBuffer();
  const left = Math.round(W * 0.68 - cw / 2);
  const top = Math.round(H / 2 - ch / 2);
  const bg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="#f3eee4"/>
    <rect width="${W * 0.42}" height="${H}" fill="${NAVY}"/>${wordmark(-40, 190, 0.95)}
    <rect x="70" y="${H - 150}" width="110" height="2" fill="${GOLD}"/></svg>`;
  return sharp(Buffer.from(bg))
    .composite([
      { input: shadow, left: left - PAD + 8, top: top - PAD + 18 },
      { input: cut, left, top },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer();
}

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  if ([...params.keys()].some((k) => k !== 'src' && k !== 'pack')) return new Response('Ungültige Anfrage', { status: 400 });
  const src = params.get('src') ?? '';
  let out: Buffer;
  let ok = !src;
  try {
    const input = src && (await isKnownImage(src)) ? await loadImage(src).catch(() => null) : null;
    out = input ? await (params.get('pack') === '1' ? pack(input) : photo(input)) : await plain();
    ok = ok || !!input;
  } catch (e) {
    console.error('Vorschaubild fehlgeschlagen:', e);
    out = await plain();
    ok = false;
  }
  return new Response(new Uint8Array(out), {
    headers: { 'Content-Type': 'image/jpeg', 'Cache-Control': ok ? 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400' : 'public, max-age=300, s-maxage=3600' },
  });
}
