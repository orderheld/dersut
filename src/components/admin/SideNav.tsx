'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '../Icon';

type Counts = { todo: number; messages: number };

export function SideNav({ counts }: { counts: Counts }) {
  const path = usePathname();
  const is = (p: string, exact = false) => (exact ? path === p : path === p || path.startsWith(p + '/'));
  const items = [
    { href: '/admin', label: 'Zu erledigen', icon: 'clock', active: is('/admin', true), badge: counts.todo },
    { href: '/admin/bestellungen', label: 'Alle Bestellungen', icon: 'box', active: is('/admin/bestellungen') },
    { href: '/admin/produkte', label: 'Produkte', icon: 'bean', active: is('/admin/produkte') },
    { href: '/admin/nachrichten', label: 'Nachrichten', icon: 'mail', active: is('/admin/nachrichten'), badge: counts.messages },
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
