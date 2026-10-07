'use client';

import { useState } from 'react';

export function CopyButton({ text, className = 'copy', label = 'Kopieren' }: { text: string; className?: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={`${className}${done ? ' is-done' : ''}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          const ta = document.createElement('textarea');
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          ta.remove();
        }
        setDone(true);
        setTimeout(() => setDone(false), 1800);
      }}
    >
      {done ? 'Kopiert' : label}
    </button>
  );
}
