'use client';

import { useState } from 'react';
import { getDict } from '@/i18n';
import type { Locale } from '@/lib/i18n';

export function QtyInput({ name, initial, lang, min = 1, max = 50, onCommit }: { name: string; initial: number; lang: Locale; min?: number; max?: number; onCommit?: (v: number) => void }) {
  const t = getDict(lang).a11y;
  const [v, setV] = useState(initial);
  // Rohtext während der Eingabe, damit ein geleertes Feld nicht sofort auf das Minimum springt
  const [text, setText] = useState<string | null>(null);
  const change = (n: number) => {
    const next = Math.max(min, Math.min(max, Math.floor(n) || min));
    setV(next);
    setText(null);
    onCommit?.(next);
  };
  return (
    <div className="qty">
      <button type="button" aria-label={t.less} onClick={() => change(v - 1)}>−</button>
      <input
        type="number"
        name={name}
        value={text ?? v}
        min={min}
        max={max}
        aria-label={t.qty}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => text !== null && change(text === '' ? v : Number(text))}
        onKeyDown={(e) => { if (e.key === 'Enter' && text !== null) change(text === '' ? v : Number(text)); }}
      />
      <button type="button" aria-label={t.more} onClick={() => change(v + 1)}>+</button>
    </div>
  );
}
