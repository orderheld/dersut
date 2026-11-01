'use client';

import { useState } from 'react';

type Cat = { slug: string; de: string; fr?: string; it?: string; en?: string; text?: Partial<Record<'de' | 'fr' | 'it' | 'en', string>> };
const LANGS = [['de', 'Deutsch'], ['fr', 'Français'], ['it', 'Italiano'], ['en', 'English']] as const;

/** Kategorien als Zeilen: Name Deutsch plus optionale Übersetzungen und Text der Kategorieseite. Leere Zeile = wird entfernt. */
export function CategoryEditor({ initial, counts }: { initial: Cat[]; counts: Record<string, number> }) {
  const [rows, setRows] = useState<(Cat & { key: number })[]>(() => (initial.length ? initial : [{ slug: '', de: '' }]).map((c, key) => ({ ...c, key })));
  const [next, setNext] = useState(1000);
  return (
    <div className="cats">
      <div className="cats__row cats__head"><span>Deutsch</span><span>Français</span><span>Italiano</span><span>English</span><span /></div>
      {rows.map((c, i) => (
        <div className="cats__item" key={c.key}>
        <div className="cats__row">
          <input type="hidden" name="cat_slug" value={c.slug} />
          <input name="cat_de" defaultValue={c.de} placeholder="z. B. Bohnen" aria-label="Name Deutsch" />
          <input name="cat_fr" defaultValue={c.fr} placeholder="Grains" aria-label="Name Französisch" />
          <input name="cat_it" defaultValue={c.it} placeholder="Grani" aria-label="Name Italienisch" />
          <input name="cat_en" defaultValue={c.en} placeholder="Beans" aria-label="Name Englisch" />
          <button type="button" className="cats__del" title={counts[c.slug] ? `${counts[c.slug]} Produkte verlieren die Kategorie` : 'Entfernen'} onClick={() => setRows(rows.filter((_, j) => j !== i))}>✕</button>
        </div>
        <details className="cats__text">
          <summary>Text der Kategorieseite{c.slug ? <> · <a href={`/shop/kategorie/${c.slug}`} target="_blank" rel="noopener noreferrer">ansehen</a></> : null}{counts[c.slug] ? ` · ${counts[c.slug]} Produkt${counts[c.slug] > 1 ? 'e' : ''}` : ''}</summary>
          <p className="muted small">Leer lassen = Standardtext. Erscheint oben auf der Kategorieseite und hilft bei Google.</p>
          {LANGS.map(([l, name]) => (
            <label key={l}>{name}<textarea name={`cat_text_${l}`} rows={2} maxLength={400} defaultValue={c.text?.[l] ?? ''} /></label>
          ))}
        </details>
        </div>
      ))}
      <button type="button" className="btn btn--ghost btn--sm" onClick={() => { setRows([...rows, { slug: '', de: '', key: next }]); setNext(next + 1); }}>+ Kategorie</button>
    </div>
  );
}
