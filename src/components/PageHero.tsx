import Link from 'next/link';
import type { ReactNode } from 'react';
import { Img } from './Img';

export function PageHero({ img, crumb, eyebrow, title, lead }: { img?: string; crumb: string; eyebrow?: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <section className={`page-hero${img ? '' : ' page-hero--plain'}`}>
      {img && (
        <div className="page-hero__media">
          <Img src={img} alt="" eager />
        </div>
      )}
      <div className="wrap">
        <div className="page-hero__inner">
          <nav className="crumbs" aria-label="Brotkrumen">
            <Link href="/">Startseite</Link> &nbsp;/&nbsp; {crumb}
          </nav>
          {eyebrow && <p className={`eyebrow${img ? ' eyebrow--gold' : ''}`}>{eyebrow}</p>}
          <h1 className="h1">{title}</h1>
          {lead && <p className="lead">{lead}</p>}
        </div>
      </div>
    </section>
  );
}
