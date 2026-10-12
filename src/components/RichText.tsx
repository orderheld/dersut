import Link from 'next/link';
import { Fragment } from 'react';
import { lp, type Locale } from '@/lib/i18n';

/** Text mit internen Links im Format [Text](/pfad); Pfade ohne Sprachpräfix werden lokalisiert. */
export function RichText({ text, lang }: { text: string; lang: Locale }) {
  const parts = text.split(/(\[[^\]]+\]\(\/[^)\s]*\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = /^\[([^\]]+)\]\((\/[^)\s]*)\)$/.exec(part);
        return m ? <Link key={i} href={lp(lang, m[2])}>{m[1]}</Link> : <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

/** Für Meta-Daten und JSON-LD: Links entfernen, nur den Text behalten */
export const plainText = (text: string) => text.replace(/\[([^\]]+)\]\(\/[^)\s]*\)/g, '$1');
