'use client';

import { useEffect, useRef } from 'react';

/** Bild mit elegantem Platzhalter, falls die Quelle nicht lädt. */
export function Img({ src, alt, className, eager }: { src: string; alt: string; className?: string; eager?: boolean }) {
  const ref = useRef<HTMLImageElement>(null);
  // Fehler kann schon vor der Hydration passiert sein
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) img.classList.add('is-broken');
  }, [src]);
  if (!src) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={(e) => e.currentTarget.classList.add('is-broken')}
    />
  );
}
