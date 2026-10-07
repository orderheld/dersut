'use client';

import { useState } from 'react';

export function QtyInput({ name, initial, min = 1, max = 50, onCommit }: { name: string; initial: number; min?: number; max?: number; onCommit?: (v: number) => void }) {
  const [v, setV] = useState(initial);
  const change = (n: number) => {
    const next = Math.max(min, Math.min(max, n));
    setV(next);
    onCommit?.(next);
  };
  return (
    <div className="qty">
      <button type="button" aria-label="Weniger" onClick={() => change(v - 1)}>−</button>
      <input
        type="number"
        name={name}
        value={v}
        min={min}
        max={max}
        aria-label="Menge"
        onChange={(e) => setV(Number(e.target.value) || min)}
        onBlur={() => change(v)}
      />
      <button type="button" aria-label="Mehr" onClick={() => change(v + 1)}>+</button>
    </div>
  );
}
