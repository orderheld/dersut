import Link from 'next/link';
import type { ReactNode } from 'react';
import { getDict } from '@/i18n';
import type { ShopCategory } from '@/lib/categories';
import { lp, type Locale } from '@/lib/i18n';
import { Icon } from './Icon';
import './shop.css';

const UI: Record<Locale, { all: string; nav: string }> = {
  de: { all: 'Alle Produkte', nav: 'Kategorien' },
  fr: { all: 'Tous les produits', nav: 'Catégories' },
  it: { all: 'Tutti i prodotti', nav: 'Categorie' },
  en: { all: 'All products', nav: 'Categories' },
};

/** Kompakter Kopf für Shop und Kategorieseiten: Titel, eine Zeile Text, Kategorie-Filter. Die Produkte folgen direkt darunter. */
export function ShopHead({ lang, crumbs, title, lead, cats, active, total, filter }: {
  lang: Locale;
  crumbs: [string, string?][];
  title: ReactNode;
  lead?: ReactNode;
  cats: ShopCategory[];
  active?: string;
  total: number;
  filter?: ReactNode;
}) {
  const t = getDict(lang);
  const ui = UI[lang];
  return (
    <section className="shophead">
      <div className="wrap">
        <nav className="crumbs" aria-label={t.a11y.breadcrumbs}>
          <Link href={lp(lang, '/')}>{t.nav.home}</Link>
          {crumbs.map(([name, path]) => (
            <span key={name}> &nbsp;/&nbsp; {path ? <Link href={lp(lang, path)}>{name}</Link> : name}</span>
          ))}
        </nav>
        <h1 className="shophead__title">{title}</h1>
        {lead && <p className="shophead__lead"><Icon name="truck" /> {lead}</p>}
        {(cats.length > 1 || (cats.length === 1 && cats[0].count < total)) && (
          <nav className="catnav" aria-label={ui.nav}>
            <Link className={`catnav__chip${active ? '' : ' is-active'}`} aria-current={active ? undefined : 'page'} href={lp(lang, '/shop')}>
              {ui.all} <span>{total}</span>
            </Link>
            {cats.map((c) => (
              <Link key={c.slug} className={`catnav__chip${active === c.slug ? ' is-active' : ''}`} aria-current={active === c.slug ? 'page' : undefined} href={lp(lang, `/shop/kategorie/${c.slug}`)}>
                {c.name} <span>{c.count}</span>
              </Link>
            ))}
          </nav>
        )}
        {filter}
      </div>
    </section>
  );
}
