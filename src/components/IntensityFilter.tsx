'use client';

import { useEffect, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import type { Strength } from '@/lib/strength';


const UI: Record<Locale, { label: string; all: string } & Record<Strength, string>> = {
  de: { label: 'Geschmack', all: 'Alle', mild: 'Mild & fein', medium: 'Ausgewogen', strong: 'Kräftig' },
  fr: { label: 'Goût', all: 'Tous', mild: 'Doux & fin', medium: 'Équilibré', strong: 'Corsé' },
  it: { label: 'Gusto', all: 'Tutti', mild: 'Delicato', medium: 'Equilibrato', strong: 'Intenso' },
  en: { label: 'Taste', all: 'All', mild: 'Mild & delicate', medium: 'Balanced', strong: 'Strong' },
};

/** Filtert die Produkte im Shop nach Intensität, ohne Neuladen (blendet Karten mit data-int aus). */
export function IntensityFilter({ lang, counts }: { lang: Locale; counts: Partial<Record<Strength, number>> }) {
  const [sel, setSel] = useState<Strength | ''>('');
  useEffect(() => {
    const el = document.querySelector<HTMLElement>('.shop-list');
    if (el) el.dataset.int = sel;
  }, [sel]);
  const t = UI[lang];
  const levels = (['mild', 'medium', 'strong'] as Strength[]).filter((l) => counts[l]);
  if (levels.length < 2) return null;
  return (
    <div className="catnav catnav--sub" role="group" aria-label={t.label}>
      <span className="catnav__label">{t.label}</span>
      <button type="button" className={`catnav__chip${sel ? '' : ' is-active'}`} aria-pressed={!sel} onClick={() => setSel('')}>{t.all}</button>
      {levels.map((l) => (
        <button key={l} type="button" className={`catnav__chip${sel === l ? ' is-active' : ''}`} aria-pressed={sel === l} onClick={() => setSel(l)}>
          {t[l]} <span>{counts[l]}</span>
        </button>
      ))}
    </div>
  );
}
