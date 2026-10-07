'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Bild mit elegantem Platzhalter, falls die Quelle nicht lädt.
 * Mit `fallbackSrc` wird bei einem Fehler zuerst die Ersatzquelle versucht
 * (z. B. das Originalfoto, wenn das freigestellte Bild nicht verfügbar ist).
 */
export function Img({ src, alt, className, eager, fallbackSrc }: { src: string; alt: string; className?: string; eager?: boolean; fallbackSrc?: string }) {
  const ref = useRef<HTMLImageElement>(null);
  const [cur, setCur] = useState(src);
  useEffect(() => setCur(src), [src]);
  const usingFallback = !!fallbackSrc && cur === fallbackSrc && cur !== src;
  const fail = (img: HTMLImageElement) => {
    if (fallbackSrc && cur !== fallbackSrc) setCur(fallbackSrc);
    else img.classList.add('is-broken');
  };
  // Fehler kann schon vor der Hydration passiert sein
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) fail(img);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cur]);
  if (!cur) return null;
  const cls = [className, fallbackSrc && !usingFallback ? 'is-cut' : ''].filter(Boolean).join(' ') || undefined;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={cur}
      alt={alt}
      className={cls}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={(e) => fail(e.currentTarget)}
    />
  );
}
