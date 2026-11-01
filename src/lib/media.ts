import 'server-only';
import { createHash } from 'node:crypto';
import { one } from './db';

/**
 * Bildspeicher in der Datenbank (Tabelle media). Adresse: /api/media/<id>-<hash>.<jpg|webp|png>
 * Der Hash in der Adresse macht sie unveränderlich, deshalb darf sie im CDN dauerhaft gecacht werden.
 */
const EXT: Record<string, string> = { 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/png': 'png' };

export async function saveMedia(data: Buffer, mime: string, width: number, height: number): Promise<string> {
  const hash = createHash('sha256').update(data).digest('hex').slice(0, 16);
  const row = await one<{ id: number }>(
    `INSERT INTO media (hash, mime, data, width, height) VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (hash) DO UPDATE SET hash = EXCLUDED.hash RETURNING id`,
    [hash, mime, data, width, height],
  );
  return `/api/media/${row!.id}-${hash}.${EXT[mime] ?? 'bin'}`;
}

export function parseMediaPath(src: string): { id: number; hash: string } | null {
  const m = /^\/api\/media\/(\d+)-([0-9a-f]{16})\.(jpg|webp|png)$/.exec(src);
  return m ? { id: Number(m[1]), hash: m[2] } : null;
}

export async function loadMedia(id: number, hash: string): Promise<{ data: Buffer; mime: string } | null> {
  const row = await one<{ data: Buffer | Uint8Array | string; mime: string }>('SELECT data, mime FROM media WHERE id = $1 AND hash = $2', [id, hash]);
  if (!row) return null;
  const d = row.data;
  // Neon liefert bytea als Buffer, als Hex-String («\x…») oder als Uint8Array (PGlite)
  const data = typeof d === 'string' ? Buffer.from(d.startsWith('\\x') ? d.slice(2) : d, 'hex') : Buffer.from(d);
  return { data, mime: row.mime };
}
