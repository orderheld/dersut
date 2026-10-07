'use client';

import { useState } from 'react';
import { Img } from './Img';

export type GalleryImage = { src: string; alt: string; pack: boolean };

/** Produktbilder: grosse Bühne mit Thumbnails. Packshots (weisser Hintergrund) werden freigestellt dargestellt. */
export function ProductGallery({ images, badge, fallback, labels }: { images: GalleryImage[]; badge: string; fallback: [string, string]; labels: { gallery: string; show: string[]; prev: string; next: string } }) {
  const [i, setI] = useState(0);
  const cur = images[i];
  const go = (d: number) => setI((i + d + images.length) % images.length);
  return (
    <div className="pg">
      <div className={`pg__stage${cur?.pack ? ' is-pack' : ' is-photo'}`}>
        <span className="pcard__badge">{badge}</span>
        {images.map((im, n) => (
          <div key={im.src} className={`pg__slide${n === i ? ' is-on' : ''}${im.pack ? ' is-pack' : ''}`} aria-hidden={n !== i}>
            <Img src={im.src} alt={im.alt} eager={n === 0} />
          </div>
        ))}
        {cur?.pack && <span className="pg__floor" aria-hidden="true" />}
        <span className="pcard__fallback" aria-hidden="true"><span>{fallback[0]}</span><small>{fallback[1]}</small></span>
        {images.length > 1 && (
          <>
            <button type="button" className="pg__nav pg__nav--prev" aria-label={labels.prev} onClick={() => go(-1)}>‹</button>
            <button type="button" className="pg__nav pg__nav--next" aria-label={labels.next} onClick={() => go(1)}>›</button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <ul className="pg__thumbs" aria-label={labels.gallery}>
          {images.map((im, n) => (
            <li key={im.src}>
              <button type="button" className={`pg__thumb${n === i ? ' is-on' : ''}${im.pack ? ' is-pack' : ''}`} aria-label={labels.show[n]} aria-current={n === i} onClick={() => setI(n)}>
                <Img src={im.src} alt="" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
