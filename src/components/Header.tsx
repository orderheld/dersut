'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { CART_EVENT, readCartCount } from '@/lib/cart-shared';
import { LOCALES, LOCALE_NAMES, lp, stripLocale, type Locale } from '@/lib/i18n';
import { Icon } from './Icon';
import { Logo } from './Logo';

const ABOUT = ['/geschichte', '/qualitaet', '/zertifizierungen', '/nachhaltigkeit'];
const BUSINESS = ['/gastronomie', '/firmen'];

export type HeaderLabels = Record<
  | 'menuOpen' | 'menuClose' | 'mainNav' | 'home' | 'cart' | 'language' | 'country'
  | 'shop' | 'about' | 'history' | 'historySub' | 'quality' | 'qualitySub' | 'certs' | 'certsSub'
  | 'sustainability' | 'sustainabilitySub' | 'distribution' | 'gastro' | 'gastroSub' | 'business' | 'office' | 'officeSub' | 'contact',
  string
>;

/** Anzahl Artikel im Warenkorb aus dem lesbaren Cookie; aktualisiert sich bei Seitenwechsel und nach Änderungen. */
function useCartCount(fullPath: string): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const read = (e?: Event) => {
      const d = (e as CustomEvent | undefined)?.detail;
      setCount(typeof d === 'number' ? d : readCartCount());
    };
    read();
    window.addEventListener(CART_EVENT, read);
    window.addEventListener('focus', read);
    return () => {
      window.removeEventListener(CART_EVENT, read);
      window.removeEventListener('focus', read);
    };
  }, [fullPath]);
  return count;
}

export function Header({ lang, labels: t }: { lang: Locale; labels: HeaderLabels }) {
  const fullPath = usePathname();
  const count = useCartCount(fullPath);
  const path = stripLocale(fullPath);
  const L = (p: string) => lp(lang, p);
  const [langOpen, setLangOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bump, setBump] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const prev = useRef(count);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    setOpen(false);
    setLangOpen(false);
  }, [fullPath]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);
  useEffect(() => {
    if (count > prev.current) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 500);
      prev.current = count;
      return () => clearTimeout(t);
    }
    prev.current = count;
  }, [count]);

  const active = (href: string) => (path === href || path.startsWith(href + '/') ? 'is-active' : '');
  const navTop = headerRef.current ? headerRef.current.getBoundingClientRect().bottom : 72;

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}`} id="top" ref={headerRef}>
      <div className="wrap header__inner">
        <button
          className="burger"
          type="button"
          aria-label={open ? t.menuClose : t.menuOpen}
          aria-expanded={open}
          aria-controls="mainnav"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>

        <Link className="logo" href={L('/')} aria-label={t.home}>
          <Logo />
          <span className="logo__ch">{t.country}</span>
        </Link>

        <nav className={`nav${open ? ' is-open' : ''}`} id="mainnav" aria-label={t.mainNav} style={{ ['--nav-top' as string]: `${navTop}px` }}>
          <ul className="nav__list">
            <li><Link href={L('/shop')} className={active('/shop')}>{t.shop}</Link></li>
            <li className="nav__has-sub">
              <Link href={L('/geschichte')} className={ABOUT.includes(path) ? 'is-active' : ''}>{t.about}</Link>
              <ul className="nav__sub">
                <li><Link href={L('/geschichte')}><strong>{t.history}</strong><span>{t.historySub}</span></Link></li>
                <li><Link href={L('/qualitaet')}><strong>{t.quality}</strong><span>{t.qualitySub}</span></Link></li>
                <li><Link href={L('/zertifizierungen')}><strong>{t.certs}</strong><span>{t.certsSub}</span></Link></li>
                <li><Link href={L('/nachhaltigkeit')}><strong>{t.sustainability}</strong><span>{t.sustainabilitySub}</span></Link></li>
              </ul>
            </li>
            <li><Link href={L('/offizieller-vertrieb')} className={active('/offizieller-vertrieb')}>{t.distribution}</Link></li>
            <li className="nav__has-sub">
              <Link href={L('/gastronomie')} className={BUSINESS.includes(path) ? 'is-active' : ''}>{t.business}</Link>
              <ul className="nav__sub">
                <li><Link href={L('/gastronomie')}><strong>{t.gastro}</strong><span>{t.gastroSub}</span></Link></li>
                <li><Link href={L('/firmen')}><strong>{t.office}</strong><span>{t.officeSub}</span></Link></li>
              </ul>
            </li>
            <li><Link href={L('/kontakt')} className={active('/kontakt')}>{t.contact}</Link></li>
          </ul>
          <ul className="nav__langs" aria-label={t.language}>
            {LOCALES.map((l) => (
              <li key={l}>
                <a href={lp(l, path)} hrefLang={l} lang={l} onClick={(e) => { if (window.location.search) e.currentTarget.href = lp(l, path) + window.location.search; }} className={l === lang ? 'is-active' : ''} aria-current={l === lang ? 'true' : undefined}>
                  {LOCALE_NAMES[l]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={`langsw${langOpen ? ' is-open' : ''}`}>
          <button type="button" className="langsw__btn" aria-label={t.language} aria-expanded={langOpen} onClick={() => setLangOpen(!langOpen)}>
            {lang.toUpperCase()}
            <svg viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
          </button>
          <ul className="langsw__menu">
            {LOCALES.map((l) => (
              <li key={l}>
                <a href={lp(l, path)} hrefLang={l} lang={l} onClick={(e) => { if (window.location.search) e.currentTarget.href = lp(l, path) + window.location.search; }} className={l === lang ? 'is-active' : ''}>
                  <b>{l.toUpperCase()}</b> {LOCALE_NAMES[l]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <Link className={`cartlink${bump ? ' is-bump' : ''}`} href={L('/warenkorb')} aria-label={count > 0 ? `${t.cart} (${count})` : t.cart}>
          <Icon name="bag" />
          {count > 0 && <span className="cartlink__count">{count}</span>}
        </Link>
      </div>
    </header>
  );
}
