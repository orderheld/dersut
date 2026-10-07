'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import { Logo } from './Logo';

const ABOUT = ['/geschichte', '/qualitaet', '/zertifizierungen', '/nachhaltigkeit'];

export function Header({ count }: { count: number }) {
  const path = usePathname();
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
  }, [path]);
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
          aria-label={open ? 'Menü schliessen' : 'Menü öffnen'}
          aria-expanded={open}
          aria-controls="mainnav"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>

        <Link className="logo" href="/" aria-label="Dersut Kaffee Schweiz – Startseite">
          <Logo />
          <span className="logo__ch">Schweiz</span>
        </Link>

        <nav className={`nav${open ? ' is-open' : ''}`} id="mainnav" aria-label="Hauptnavigation" style={{ ['--nav-top' as string]: `${navTop}px` }}>
          <ul className="nav__list">
            <li><Link href="/shop" className={active('/shop')}>Shop</Link></li>
            <li className="nav__has-sub">
              <Link href="/geschichte" className={ABOUT.includes(path) ? 'is-active' : ''}>Über Dersut</Link>
              <ul className="nav__sub">
                <li><Link href="/geschichte"><strong>Geschichte</strong><span>Seit 1947 in Conegliano</span></Link></li>
                <li><Link href="/qualitaet"><strong>Qualität &amp; Röstung</strong><span>Vom Kaffeegürtel in die Tasse</span></Link></li>
                <li><Link href="/zertifizierungen"><strong>Zertifizierungen</strong><span>Auszeichnungen &amp; Mitgliedschaften</span></Link></li>
                <li><Link href="/nachhaltigkeit"><strong>Nachhaltigkeit</strong><span>Verantwortung mit Weitblick</span></Link></li>
              </ul>
            </li>
            <li><Link href="/offizieller-vertrieb" className={active('/offizieller-vertrieb')}>Offizieller Vertrieb</Link></li>
            <li><Link href="/gastronomie" className={active('/gastronomie')}>Gastronomie</Link></li>
            <li><Link href="/kontakt" className={active('/kontakt')}>Kontakt</Link></li>
          </ul>
        </nav>

        <Link className={`cartlink${bump ? ' is-bump' : ''}`} href="/warenkorb" aria-label={`Warenkorb, ${count} Artikel`}>
          <Icon name="bag" />
          {count > 0 && <span className="cartlink__count">{count}</span>}
        </Link>
      </div>
    </header>
  );
}
