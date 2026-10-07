import Link from 'next/link';
import { REGIONS, REGION_UI } from '@/content/regions';
import { lp, type Locale } from '@/lib/i18n';
import { Icon } from './Icon';

/** Querverweise auf alle Regionalseiten (interne Verlinkung für lokale Suche). */
export function RegionLinks({ lang, current }: { lang: Locale; current?: string }) {
  const ui = REGION_UI[lang];
  return (
    <section className="section section--tight">
      <div className="wrap">
        <header className="section__head section__head--center">
          <p className="eyebrow">{ui.linksEyebrow}</p>
          <h2 className="h3">{ui.linksTitle}</h2>
        </header>
        <ul className="regionlinks">
          {REGIONS.filter((r) => r.slug !== current).map((r) => (
            <li key={r.slug}>
              <Link href={lp(lang, `/region/${r.slug}`)}><Icon name="pin" /> {r.text[lang].name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
