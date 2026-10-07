'use client';

import { getImageProps } from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

const CUTOUT_WIDTHS = [480, 800, 1200];

type Source = { src: string; srcSet?: string };

/**
 * Optimierte Quelle: Fotos laufen über die Bildoptimierung von Next (WebP/AVIF in passender Breite),
 * freigestellte Packshots (/api/cutout) bekommen eigene Breiten. SVG und data:-Bilder bleiben unverändert.
 */
function optimized(src: string, sizes: string): Source {
  if (!src || src.startsWith('data:') || /\.svg(\?|$)/i.test(src)) return { src };
  if (src.startsWith('/api/cutout')) {
    const w = (n: number) => `${src}&w=${n}`;
    return { src: w(800), srcSet: CUTOUT_WIDTHS.map((n) => `${w(n)} ${n}w`).join(', ') };
  }
  try {
    const { props } = getImageProps({ src, alt: '', fill: true, sizes });
    return { src: props.src, srcSet: props.srcSet };
  } catch {
    return { src };
  }
}

/**
 * Bild mit elegantem Platzhalter, falls die Quelle nicht lädt.
 * Reihenfolge bei Fehlern: optimierte Quelle → Originalquelle → `fallbackSrc` (z. B. das Originalfoto,
 * wenn das freigestellte Bild nicht verfügbar ist) → Platzhalter.
 * `sizes` sagt dem Browser, wie breit das Bild dargestellt wird (Standard: volle Breite).
 */
export function Img({
  src,
  alt,
  className,
  eager,
  fallbackSrc,
  sizes = '100vw',
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
  fallbackSrc?: string;
  sizes?: string;
}) {
  const ref = useRef<HTMLImageElement>(null);
  const chain = useMemo(() => {
    const list: (Source & { primary: boolean })[] = [];
    if (src) list.push({ ...optimized(src, sizes), primary: true }, { src, primary: true });
    if (fallbackSrc && fallbackSrc !== src) list.push({ ...optimized(fallbackSrc, sizes), primary: false }, { src: fallbackSrc, primary: false });
    // doppelte Einträge (z. B. SVG ohne Optimierung) entfernen
    return list.filter((s, i) => list.findIndex((o) => o.src === s.src) === i);
  }, [src, fallbackSrc, sizes]);
  const [step, setStep] = useState(0);
  const [broken, setBroken] = useState(false);
  useEffect(() => {
    setStep(0);
    setBroken(false);
  }, [chain]);

  const fail = () => {
    if (step < chain.length - 1) setStep(step + 1);
    else setBroken(true);
  };
  // Fehler kann schon vor der Hydration passiert sein
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) fail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, chain]);

  const cur = chain[step];
  if (!cur) return null;
  const cls = [className, fallbackSrc && cur.primary ? 'is-cut' : '', broken ? 'is-broken' : ''].filter(Boolean).join(' ') || undefined;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={cur.src}
      srcSet={cur.srcSet}
      sizes={cur.srcSet ? sizes : undefined}
      alt={alt}
      className={cls}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
      onError={fail}
    />
  );
}
