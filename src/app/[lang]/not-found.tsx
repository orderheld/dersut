'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getDict } from '@/i18n';
import { localeFromPath, lp } from '@/lib/i18n';

export default function NotFound() {
  const lang = localeFromPath(usePathname() ?? '/');
  const t = getDict(lang);
  return (
    <section className="error-page">
      <div className="wrap">
        <p className="eyebrow">404</p>
        <h1 className="h1">{t.notFound.title}</h1>
        <p className="lead" style={{ margin: '0 auto 30px' }}>{t.notFound.text}</p>
        <Link className="btn btn--primary" href={lp(lang, '/')}>{t.common.toHome}</Link>{' '}
        <Link className="btn btn--outline" href={lp(lang, '/shop')}>{t.common.toShop}</Link>
      </div>
    </section>
  );
}
