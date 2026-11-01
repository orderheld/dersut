import { loadMedia, parseMediaPath } from '@/lib/media';

/** Liefert hochgeladene Bilder aus der Datenbank aus (unveränderlich, lange gecacht). */
export const runtime = 'nodejs';

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const ref = parseMediaPath(`/api/media/${file}`);
  const m = ref ? await loadMedia(ref.id, ref.hash).catch(() => null) : null;
  if (!m) return new Response('Bild nicht gefunden', { status: 404 });
  return new Response(new Uint8Array(m.data), {
    headers: { 'Content-Type': m.mime, 'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable' },
  });
}
