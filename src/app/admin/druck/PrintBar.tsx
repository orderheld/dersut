'use client';

import { useEffect } from 'react';

/** Leiste über der Druckvorschau (wird nicht mitgedruckt). Mit ?auto=1 öffnet sich der Druckdialog sofort. */
export function PrintBar({ title, auto, children }: { title: string; auto?: boolean; children?: React.ReactNode }) {
  useEffect(() => {
    if (auto) setTimeout(() => window.print(), 400);
  }, [auto]);
  return (
    <div className="printbar noprint">
      <div><strong>{title}</strong>{children}</div>
      <div className="printbar__btns">
        <button type="button" className="btn btn--ghost" onClick={() => (history.length > 1 ? history.back() : window.close())}>← Zurück</button>
        <button type="button" className="btn btn--primary" onClick={() => window.print()}>🖨 Drucken</button>
      </div>
    </div>
  );
}
