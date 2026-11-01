import { useId } from 'react';

/**
 * Goldmedaille als Vektor-Symbol (gestochen scharf auf jedem Bildschirm).
 * Zeigt «Gold Medal», das Jahr und «International Coffee Tasting» im Ring.
 */
export function Medal({ year, label, className = '' }: { year: string; label: string; className?: string }) {
  const id = useId().replace(/:/g, '');
  const g = `mg${id}`;
  const r = `mr${id}`;
  const p = `mp${id}`;
  return (
    <svg className={`medal ${className}`} viewBox="0 0 120 120" role="img" aria-label={label}>
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F7E9B9" />
          <stop offset=".35" stopColor="#D9B45A" />
          <stop offset=".7" stopColor="#B08A33" />
          <stop offset="1" stopColor="#E6C979" />
        </linearGradient>
        <radialGradient id={r} cx=".5" cy=".38" r=".7">
          <stop offset="0" stopColor="#0E3B73" />
          <stop offset="1" stopColor="#001A3A" />
        </radialGradient>
        <path id={p} d="M60 105 A45 45 0 1 1 60 15 A45 45 0 1 1 60 105" />
      </defs>
      {/* Zackenrand */}
      <path
        fill={`url(#${g})`}
        d={Array.from({ length: 36 }, (_, i) => {
          const a = (i / 36) * Math.PI * 2;
          const rad = i % 2 ? 55.5 : 59;
          return `${i ? 'L' : 'M'}${(60 + rad * Math.sin(a)).toFixed(2)} ${(60 - rad * Math.cos(a)).toFixed(2)}`;
        }).join(' ') + 'Z'}
      />
      <circle cx="60" cy="60" r="53" fill={`url(#${g})`} stroke="#8F6F25" strokeWidth=".6" />
      <circle cx="60" cy="60" r="38" fill={`url(#${r})`} stroke="#F3DE9C" strokeWidth="1.4" />
      <circle cx="60" cy="60" r="34.5" fill="none" stroke="#D9B45A" strokeWidth=".5" strokeDasharray="1.2 1.6" />
      <text fontFamily="Inter, Arial, sans-serif" fontSize="6.9" fontWeight="600" letterSpacing="1.05" fill="#4A3A12">
        <textPath href={`#${p}`} startOffset="50%" textAnchor="middle">INTERNATIONAL COFFEE TASTING</textPath>
      </text>
      <g fill="#F3DE9C">
        <path d="M60 31.5l1.3 2.7 3 .4-2.2 2.1.5 3-2.6-1.4-2.6 1.4.5-3-2.2-2.1 3-.4z" />
      </g>
      <text x="60" y="58" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="17" fontWeight="600" fill="#F3DE9C" letterSpacing="1.5">GOLD</text>
      <text x="60" y="68.5" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontSize="7.4" fontWeight="600" fill="#F3DE9C" letterSpacing="2.6">MEDAL</text>
      <path d="M44 73.5h32" stroke="#D9B45A" strokeWidth=".6" />
      <text x="60" y="85" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="13" fontWeight="600" fill="#fff" letterSpacing="1">{year}</text>
    </svg>
  );
}

/**
 * Hausmarke im Stil der Medaille, aber ohne Auszeichnung: «Dersut Caffè · Conegliano · Dal 1947».
 * Für Mischungen ohne eigene Medaille (zeigt die Herkunft, keine Prämierung).
 */
export function HouseSeal({ label, className = '' }: { label: string; className?: string }) {
  const id = useId().replace(/:/g, '');
  const g = `sg${id}`;
  const r = `sr${id}`;
  const p = `sp${id}`;
  return (
    <svg className={`medal ${className}`} viewBox="0 0 120 120" role="img" aria-label={label}>
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E9E2CF" />
          <stop offset=".5" stopColor="#B9AA80" />
          <stop offset="1" stopColor="#82754F" />
        </linearGradient>
        <radialGradient id={r} cx=".5" cy=".38" r=".7">
          <stop offset="0" stopColor="#0E3B73" />
          <stop offset="1" stopColor="#001A3A" />
        </radialGradient>
        <path id={p} d="M60 105 A45 45 0 1 1 60 15 A45 45 0 1 1 60 105" />
      </defs>
      <circle cx="60" cy="60" r="57" fill={`url(#${g})`} />
      <circle cx="60" cy="60" r="53" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth=".6" />
      <circle cx="60" cy="60" r="38" fill={`url(#${r})`} stroke="#E9E2CF" strokeWidth="1.4" />
      <text fontFamily="Inter, Arial, sans-serif" fontSize="6.9" fontWeight="600" letterSpacing="1.4" fill="#2B2615">
        <textPath href={`#${p}`} startOffset="50%" textAnchor="middle">DERSUT CAFFÈ · CONEGLIANO · ITALIA</textPath>
      </text>
      <text x="60" y="52" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontSize="7" fontWeight="600" fill="#E9E2CF" letterSpacing="2.6">DAL</text>
      <text x="60" y="70" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="19" fontWeight="600" fill="#fff" letterSpacing="1">1947</text>
      <path d="M46 76h28" stroke="#B9AA80" strokeWidth=".6" />
      <text x="60" y="85" textAnchor="middle" fontFamily="Inter, Arial, sans-serif" fontSize="5.6" fontWeight="600" fill="#E9E2CF" letterSpacing="1.6">ORIGINALE</text>
    </svg>
  );
}
