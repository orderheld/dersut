'use client';

import { useRef, useState } from 'react';

const MAX_SIDE = 2400;

/** Grosse Handyfotos schon im Browser verkleinern: schneller Upload und kein Grössenlimit-Problem. */
async function shrink(file: File): Promise<File> {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return file;
  try {
    const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' });
    const scale = Math.min(1, MAX_SIDE / Math.max(bmp.width, bmp.height));
    if (scale === 1 && file.size < 3.5 * 1024 * 1024) return file;
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext('2d')!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const type = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, type, 0.92));
    if (!blob) return file;
    return new File([blob], file.name.replace(/\.\w+$/, type === 'image/png' ? '.png' : '.jpg'), { type });
  } catch {
    return file;
  }
}

/** Bild-Upload mit Ziehen &amp; Ablegen, sofortiger Vorschau und automatischer Verkleinerung. */
export function ImageUpload({ name, multiple, hint }: { name: string; multiple?: boolean; hint: string }) {
  const input = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [over, setOver] = useState(false);

  async function take(list: FileList | File[]) {
    const files = [...list].filter((f) => f.type.startsWith('image/')).slice(0, multiple ? 10 : 1);
    if (!files.length || !input.current) return;
    setBusy(true);
    const small = await Promise.all(files.map(shrink));
    const dt = new DataTransfer();
    small.forEach((f) => dt.items.add(f));
    input.current.files = dt.files;
    previews.forEach((u) => URL.revokeObjectURL(u));
    setPreviews(small.map((f) => URL.createObjectURL(f)));
    setBusy(false);
  }

  return (
    <div
      className={`drop${over ? ' is-over' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => { e.preventDefault(); setOver(false); take(e.dataTransfer.files); }}
    >
      <input
        ref={input}
        type="file"
        name={name}
        multiple={multiple}
        accept="image/jpeg,image/png,image/webp"
        onChange={(e) => { if (e.target.files?.length && !busy) take(e.target.files); }}
      />
      {previews.length ? (
        <div className="drop__previews">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {previews.map((u) => <img key={u} src={u} alt="" />)}
        </div>
      ) : (
        <div className="drop__hint"><strong>{multiple ? 'Fotos hierher ziehen' : 'Foto hierher ziehen'}</strong> oder klicken zum Auswählen<br /><span className="muted small">{hint}</span></div>
      )}
      {busy && <div className="drop__busy">Wird vorbereitet …</div>}
      {previews.length > 0 && <div className="small muted">Wird beim Speichern hochgeladen und aufbereitet.</div>}
    </div>
  );
}
