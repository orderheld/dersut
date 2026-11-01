'use client';

import { useState } from 'react';

type Cat = { slug: string; de: string; fr?: string; it?: string; en?: string };

/** Kategorien als Zeilen: Name Deutsch plus optionale Übersetzungen. Leere Zeile = wird entfernt. */
export function CategoryEditor({ initial, counts }: { initial: Cat[]; counts: Record<string, number> }) {
  const [rows, setRows] = useState<(Cat & { key: number })[]>(() => (initial.length ? initial : [{ slug: '', de: '' }]).map((c, key) => ({ ...c, key })));
  const [next, setNext] = useState(1000);
  return (
    <div className="cats">
      <div className="cats__row cats__head"><span>Deutsch</span><span>Français</span><span>Italiano</span><span>English</span><span /></div>
      {rows.map((c, i) => (
        <div className="cats__row" key={c.key}>
          <input type="hidden" name="cat_slug" value={c.slug} />
          <input name="cat_de" defaultValue={c.de} placeholder="z. B. Bohnen" aria-label="Name Deutsch" />
          <input name="cat_fr" defaultValue={c.fr} placeholder="Grains" aria-label="Name Französisch" />
          <input name="cat_it" defaultValue={c.it} placeholder="Grani" aria-label="Name Italienisch" />
          <input name="cat_en" defaultValue={c.en} placeholder="Beans" aria-label="Name Englisch" />
          <button type="button" className="cats__del" title={counts[c.slug] ? `${counts[c.slug]} Produkte verlieren die Kategorie` : 'Entfernen'} onClick={() => setRows(rows.filter((_, j) => j !== i))}>✕</button>
        </div>
      ))}
      <button type="button" className="btn btn--ghost btn--sm" onClick={() => { setRows([...rows, { slug: '', de: '', key: next }]); setNext(next + 1); }}>+ Kategorie</button>
    </div>
  );
}
