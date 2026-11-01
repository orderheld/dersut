'use client';

import { useState } from 'react';

/** Galerie verwalten: Reihenfolge ändern, Bilder entfernen. Die Liste geht als Feld «gallery» mit. */
export function GalleryEditor({ initial, previews }: { initial: string[]; previews: Record<string, string> }) {
  const [list, setList] = useState(initial);
  const move = (i: number, d: number) => {
    const next = [...list];
    const j = i + d;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    setList(next);
  };
  return (
    <>
      <input type="hidden" name="gallery" value={list.join('\n')} />
      {list.length > 0 ? (
        <ul className="gallery-edit">
          {list.map((g, i) => (
            <li key={g}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previews[g] || g} alt="" loading="lazy" />
              <div>
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Nach vorne">←</button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === list.length - 1} aria-label="Nach hinten">→</button>
                <button type="button" className="danger" onClick={() => setList(list.filter((x) => x !== g))} aria-label="Entfernen">✕</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="muted small">Noch keine weiteren Bilder.</p>
      )}
    </>
  );
}
