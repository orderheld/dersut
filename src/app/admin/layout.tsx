import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import { SideNav } from '@/components/admin/SideNav';
import { currentAdmin } from '@/lib/auth';
import { orderCounts } from '@/lib/orders';
import { logoutAction } from './actions';
import './admin.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s · Dersut Admin' },
  robots: { index: false, follow: false },
  manifest: '/admin/manifest.webmanifest',
  applicationName: 'Dersut Admin',
  appleWebApp: { capable: true, title: 'Dersut Admin', statusBarStyle: 'black-translucent' },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#0e0f12' };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await currentAdmin();
  const c = admin ? await orderCounts() : null;
  return (
    <html lang="de-CH">
      <body className={admin ? 'has-side' : 'is-auth'}>
        {admin && c && (
          <aside className="side">
            <Link className="side__brand" href="/admin"><span>DERSUT</span><em>Admin · Schweiz</em></Link>
            <input type="checkbox" id="navtoggle" className="navtoggle" aria-hidden="true" tabIndex={-1} />
            <label htmlFor="navtoggle" className="burger" aria-label="Menü öffnen">
              <i /><i /><i />
              {c.open + c.paid + c.messages > 0 && <b>{c.open + c.paid + c.messages}</b>}
            </label>
            <SideNav counts={{ todo: c.open + c.paid, messages: c.messages }} />
            <div className="side__foot">
              <a href="/" target="_blank" rel="noopener">Webseite ansehen ↗</a>
              <span>{admin.email}</span>
              <form action={logoutAction}><button type="submit">Abmelden</button></form>
            </div>
          </aside>
        )}
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
