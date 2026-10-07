'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getDict } from '@/i18n';
import { config } from '@/lib/config';
import { localeFromPath, lp } from '@/lib/i18n';

export default function Error() {
  const lang = localeFromPath(usePathname() ?? '/');
  const t = getDict(lang);
  return (
    <section className="error-page">
      <div className="wrap">
        <p className="eyebrow">{t.error.eyebrow}</p>
        <h1 className="h1">{t.error.title}</h1>
        <p className="lead" style={{ margin: '0 auto 30px' }}>{t.error.text(config.email.info)}</p>
        <Link className="btn btn--primary" href={lp(lang, '/')}>{t.common.toHome}</Link>
      </div>
    </section>
  );
}
