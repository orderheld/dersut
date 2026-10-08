import { cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';

/** Formularfeld mit Label und Fehlermeldung (Klassen aus site.css bzw. admin.css). Die Fehlermeldung ist mit dem Eingabefeld verknüpft. */
export function Field({ name, label, error, span, optional, children }: { name: string; label: ReactNode; error?: string; span?: 2 | 3 | 4; optional?: boolean | string; children: ReactNode }) {
  const errId = `${name}-err`;
  const input = error && isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, { 'aria-invalid': true, 'aria-describedby': errId })
    : children;
  return (
    <div className={`f${span ? ` f--${span}` : ''}${error ? ' f--error' : ''}`}>
      <label htmlFor={name}>
        {label} {optional && <span className="opt">{typeof optional === 'string' ? optional : '(optional)'}</span>}
      </label>
      {input}
      {error && <div className="f__err" id={errId}>{error}</div>}
    </div>
  );
}
