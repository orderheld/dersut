'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

/** Tabellenzeile, die beim Klick die Detailseite öffnet (ausser bei Klick auf Bedienelemente). */
export function RowLink({ href, children }: { href: string; children: ReactNode }) {
  const router = useRouter();
  return (
    <tr
      style={{ cursor: 'pointer' }}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('input,a,button,label,select')) return;
        router.push(href);
      }}
    >
      {children}
    </tr>
  );
}
