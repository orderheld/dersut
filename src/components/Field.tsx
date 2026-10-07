import type { ReactNode } from 'react';

/** Formularfeld mit Label und Fehlermeldung (Klassen aus site.css bzw. admin.css). */
export function Field({ name, label, error, span, optional, children }: { name: string; label: ReactNode; error?: string; span?: 2 | 3 | 4; optional?: boolean; children: ReactNode }) {
  return (
    <div className={`f${span ? ` f--${span}` : ''}${error ? ' f--error' : ''}`}>
      <label htmlFor={name}>
        {label} {optional && <span className="opt">(optional)</span>}
      </label>
      {children}
      {error && <div className="f__err">{error}</div>}
    </div>
  );
}
