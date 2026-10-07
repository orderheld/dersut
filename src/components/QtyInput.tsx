'use client';

import { useState } from 'react';
import { getDict } from '@/i18n';
import type { Locale } from '@/lib/i18n';

export function QtyInput({ name, initial, lang, min = 1, max = 50, onCommit }: { name: string; initial: number; lang: Locale; min?: number; max?: number; onCommit?: (v: number) => void }) {
  const t = getDict(lang).a11y;
  const [v, setV] = useState(initial);
  const change = (n: number) => {
    const next = Math.max(min, Math.min(max, n));
    setV(next);
    onCommit?.(next);
  };
  return (
    <div className="qty">
      <button type="button" aria-label={t.less} onClick={() => change(v - 1)}>−</button>
      <input
        type="number"
        name={name}
        value={v}
        min={min}
        max={max}
        aria-label={t.qty}
        onChange={(e) => setV(Number(e.target.value) || min)}
        onBlur={() => change(v)}
      />
      <button type="button" aria-label={t.more} onClick={() => change(v + 1)}>+</button>
    </div>
  );
}
