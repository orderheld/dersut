'use client';

import { useEffect, useRef, useState } from 'react';
import { brand } from '@/lib/brand';

export function Logo() {
  const [broken, setBroken] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  // Fehler kann schon vor der Hydration passiert sein
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setBroken(true);
  }, []);
  return (
    <span className={`logo__mark${broken ? ' logo__mark--text' : ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={ref} src={brand('logo')} alt="Dersut Caffè" className="logo__img" onError={() => setBroken(true)} />
      <span className="logo__word" aria-hidden="true">
        DERSUT<em>caffè</em>
      </span>
    </span>
  );
}
