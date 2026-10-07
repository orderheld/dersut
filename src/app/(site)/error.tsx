'use client';

import Link from 'next/link';
import { config } from '@/lib/config';

export default function Error() {
  return (
    <section className="error-page">
      <div className="wrap">
        <p className="eyebrow">Fehler</p>
        <h1 className="h1">Da ist etwas schiefgelaufen</h1>
        <p className="lead" style={{ margin: '0 auto 30px' }}>
          Bitte versuchen Sie es in einem Moment erneut oder schreiben Sie uns an {config.email.info}.
        </p>
        <Link className="btn btn--primary" href="/">Zur Startseite</Link>
      </div>
    </section>
  );
}
