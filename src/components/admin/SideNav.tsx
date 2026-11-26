'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Icon } from '../Icon';

type Counts = { todo: number; messages: number };

export function SideNav({ counts }: { counts: Counts }) {
  const path = usePathname();
  // Handy: Menü nach dem Antippen eines Eintrags wieder schliessen
  useEffect(() => {
    const t = document.getElementById('navtoggle') as HTMLInputElement | null;
    if (t) t.checked = false;
  }, [path]);
  const is = (p: string, exact = false) => (exact ? path === p : path === p || path.startsWith(p + '/'));
  const items = [
    { href: '/admin', label: 'Zu erledigen', icon: 'clock', active: is('/admin', true), badge: counts.todo },
    { href: '/admin/bestellungen', label: 'Alle Bestellungen', icon: 'box', active: is('/admin/bestellungen') },
    { href: '/admin/produkte', label: 'Produkte', icon: 'bean', active: is('/admin/produkte') },
    { href: '/admin/nachrichten', label: 'Nachrichten', icon: 'mail', active: is('/admin/nachrichten'), badge: counts.messages },
    { href: '/admin/shop', label: 'Firma & Shop', icon: 'flag', active: is('/admin/shop') },
    { href: '/admin/konto', label: 'Einstellungen', icon: 'lock', active: is('/admin/konto') },
  ];
  return (
    <nav className="side__nav">
      {items.map((i) => (
        <Link key={i.href} href={i.href} className={i.active ? 'is-active' : ''}>
          <Icon name={i.icon} /> {i.label} {!!i.badge && <b>{i.badge}</b>}
        </Link>
      ))}
    </nav>
  );
}

/** Handy: feste Leiste unten mit den wichtigsten Bereichen, mit dem Daumen erreichbar. «Mehr» öffnet das ganze Menü. */
export function TabBar({ counts }: { counts: Counts }) {
  const path = usePathname();
  const is = (p: string, exact = false) => (exact ? path === p : path === p || path.startsWith(p + '/'));
  const items = [
    { href: '/admin', label: 'Erledigen', icon: 'clock', active: is('/admin', true), badge: counts.todo },
    { href: '/admin/bestellungen', label: 'Bestellungen', icon: 'box', active: is('/admin/bestellungen') },
    { href: '/admin/produkte', label: 'Produkte', icon: 'bean', active: is('/admin/produkte') },
    { href: '/admin/nachrichten', label: 'Nachrichten', icon: 'mail', active: is('/admin/nachrichten'), badge: counts.messages },
  ];
  const more = is('/admin/shop') || is('/admin/konto');
  const close = () => {
    const t = document.getElementById('navtoggle') as HTMLInputElement | null;
    if (t) t.checked = false;
  };
  return (
    <nav className="tabbar" aria-label="Hauptbereiche">
      {items.map((i) => (
        <Link key={i.href} href={i.href} className={i.active ? 'is-active' : ''} aria-current={i.active ? 'page' : undefined} onClick={close}>
          <Icon name={i.icon} />
          <span>{i.label}</span>
          {!!i.badge && <b>{i.badge}</b>}
        </Link>
      ))}
      <label htmlFor="navtoggle" className={more ? 'is-active' : ''}>
        <Icon name="menu" />
        <span>Mehr</span>
      </label>
    </nav>
  );
}
