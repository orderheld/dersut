'use client';

import { getImageProps } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { brand } from '@/lib/brand';

/** Originallogo von dersut.it (566 × 92 px), dargestellt mit höchstens 46 px Höhe */
const W = 283;
const H = 46;

function logoProps() {
  const src = brand('logo');
  // Lokale Kopie über die Bildoptimierung (WebP/AVIF, lange gecacht); externe Adresse unverändert
  if (!src.startsWith('/')) return { src };
  const { props } = getImageProps({ src, alt: '', width: W, height: H, quality: 90 });
  return { src: props.src, srcSet: props.srcSet };
}

export function Logo() {
  const [broken, setBroken] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  // Fehler kann schon vor der Hydration passiert sein
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setBroken(true);
  }, []);
  const { src, srcSet } = logoProps();
  return (
    <span className={`logo__mark${broken ? ' logo__mark--text' : ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={ref} src={src} srcSet={srcSet} width={W} height={H} alt="Dersut Caffè" className="logo__img" decoding="async" onError={() => setBroken(true)} />
      <span className="logo__word" aria-hidden="true">
        DERSUT<em>caffè</em>
      </span>
    </span>
  );
}
