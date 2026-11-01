import Link from 'next/link';
import type { ReactNode } from 'react';
import { getDict } from '@/i18n';
import { lp, type Locale } from '@/lib/i18n';
import { absolute, jsonLd } from '@/lib/seo';
import { Img } from './Img';

/** `ld`: Brotkrumen zusätzlich als JSON-LD ausgeben (aus, wenn die Seite eigene Brotkrumen-Daten liefert) */
export function PageHero({ lang, img, crumb, eyebrow, title, lead, ld = true }: { lang: Locale; img?: string; crumb: string; eyebrow?: string; title: ReactNode; lead?: ReactNode; ld?: boolean }) {
  const t = getDict(lang);
  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.nav.home, item: absolute(lp(lang, '/')) },
      { '@type': 'ListItem', position: 2, name: crumb },
    ],
  };
  return (
    <section className={`page-hero${img ? '' : ' page-hero--plain'}`}>
      {ld && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(crumbs)} />}
      {img && (
        <div className="page-hero__media">
          <Img src={img} alt="" eager />
        </div>
      )}
      <div className="wrap">
        <div className="page-hero__inner">
          <nav className="crumbs" aria-label={t.a11y.breadcrumbs}>
            <Link href={lp(lang, '/')}>{t.nav.home}</Link> &nbsp;/&nbsp; {crumb}
          </nav>
          {eyebrow && <p className={`eyebrow${img ? ' eyebrow--gold' : ''}`}>{eyebrow}</p>}
          <h1 className="h1">{title}</h1>
          {lead && <p className="lead">{lead}</p>}
        </div>
      </div>
    </section>
  );
}
