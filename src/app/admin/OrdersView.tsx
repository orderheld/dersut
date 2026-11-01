import Link from 'next/link';
import { CheckAll } from '@/components/admin/CheckAll';
import { ConfirmButton } from '@/components/admin/ConfirmButton';
import { Flash } from '@/components/admin/Flash';
import { PrintSelected } from '@/components/admin/PrintSelected';
import { RowLink } from '@/components/admin/RowLink';
import { chf, dateCh, statusLabel } from '@/lib/format';
import { listOrders, orderCounts } from '@/lib/orders';
import { bulkAction, quickPaidAction } from './actions';

const TABS: [string, string][] = [
  ['todo', 'Zu erledigen'],
  ['open', 'Zahlung ausstehend'],
  ['paid', 'Bezahlt · zu versenden'],
  ['shipped', 'Versendet'],
  ['cancelled', 'Storniert'],
  ['all', 'Alle'],
];

export async function OrdersView({ dashboard, status, q, ok, mail }: { dashboard: boolean; status: string; q: string; ok?: string; mail?: string }) {
  const base = dashboard ? '/admin' : '/admin/bestellungen';
  const [orders, counts] = await Promise.all([listOrders(status, q), orderCounts()]);
  const tabCount = (k: string) => (k === 'todo' ? counts.open + counts.paid : k in counts && k !== 'shipped' && k !== 'cancelled' ? counts[k as 'open' | 'paid'] : 0);
  const dayAgo = Date.now() - 24 * 3600 * 1000;
  const here = `${base}?status=${status}${q ? `&q=${encodeURIComponent(q)}` : ''}`;

  return (
    <>
      <header className="pagehead">
        <div>
          <h1>{dashboard ? 'Guten Tag' : 'Bestellungen'}</h1>
          <p className="muted">{dashboard ? 'Hier sehen Sie alle Bestellungen, die auf Zahlung oder Versand warten.' : 'Alle Bestellungen im Überblick.'}</p>
        </div>
        <a className="btn btn--ghost" href="/admin/bestellungen/export.csv">CSV exportieren</a>
      </header>
      <Flash ok={ok} mail={mail} />
      {dashboard && (
        <ol className="howto">
          <li><b>1</b><span>Zahlung auf dem Konto gesehen? Bei der Bestellung auf <em>Bezahlt ✓</em> klicken.</span></li>
          <li><b>2</b><span>Bestellung öffnen, <em>Lieferschein</em> und <em>Etikett</em> drucken, Paket packen.</span></li>
          <li><b>3</b><span>Paket bei der Post aufgeben und <em>Als versendet</em> markieren. Der Kunde erhält eine E-Mail.</span></li>
        </ol>
      )}

      <div className="stats">
        <Link className="stat stat--open" href={`${base}?status=open`}><span>Zahlung ausstehend</span><strong>{counts.open}</strong><small>{chf(counts.openSum)} offen</small></Link>
        <Link className="stat stat--paid" href={`${base}?status=paid`}><span>Bezahlt · zu versenden</span><strong>{counts.paid}</strong><small>bereit für die Post</small></Link>
        <Link className="stat stat--shipped" href={`${base}?status=shipped`}><span>Versendet</span><strong>{counts.shipped}</strong><small>abgeschlossen</small></Link>
        <div className="stat"><span>Umsatz (bezahlt)</span><strong>{chf(counts.revenue)}</strong><small>inkl. MWST und Versand</small></div>
      </div>

      <div className="toolbar">
        <nav className="tabs">
          {TABS.map(([k, label]) => (
            <Link key={k} href={`${base}?status=${k}${q ? `&q=${encodeURIComponent(q)}` : ''}`} className={status === k ? 'is-active' : ''}>
              {label}{tabCount(k) ? <b>{tabCount(k)}</b> : null}
            </Link>
          ))}
        </nav>
        <form method="get" action={base} className="search">
          <input type="hidden" name="status" value={status} />
          <input type="search" name="q" defaultValue={q} placeholder="Bestellnr., Name, E-Mail, Ort …" />
        </form>
      </div>

      {!orders.length ? (
        <div className="card empty">Keine Bestellungen in dieser Ansicht.{dashboard && status === 'todo' ? ' Alles erledigt. 🎉' : ''}</div>
      ) : (
        <form action={bulkAction}>
          <input type="hidden" name="back" value={here} />
          <div className="card table-wrap">
            <table className="table table--cards table--orders">
              <thead>
                <tr>
                  <th className="w-check"><CheckAll name="ids" /></th>
                  <th>Bestellung</th><th>Datum</th><th>Kunde</th><th>Artikel</th><th className="num">Total</th><th>Status</th><th className="num">Aktion</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <RowLink key={o.id} href={`/admin/bestellungen/${o.id}`} className={`st st--${o.status}`}>
                    <td className="w-check c-check"><input type="checkbox" name="ids" value={o.id} aria-label="Auswählen" /></td>
                    <td className="c-no">
                      <Link className="ordlink" href={`/admin/bestellungen/${o.id}`}>{o.number}</Link>
                      {o.created_at.getTime() > dayAgo && o.status !== 'cancelled' && <span className="is-new">NEU</span>}
                      {o.is_test && <span className="badge badge--test">TEST</span>}
                      <span className="pay">{o.payment_method === 'online' ? 'Online bezahlt' : 'Vorauskasse'}</span>
                    </td>
                    <td className="muted c-date">{dateCh(o.created_at, true)}</td>
                    <td className="c-cust"><strong>{o.first_name} {o.last_name}</strong><br /><span className="muted">{o.company ? `${o.company} · ` : ''}{o.zip} {o.city}</span></td>
                    <td className="muted c-items">{o.item_count} Stk.</td>
                    <td className="num c-total"><strong>{chf(o.total)}</strong></td>
                    <td className="c-status"><span className={`badge badge--${o.status}`}>{statusLabel(o.status)}</span></td>
                    <td className="num c-act">
                      {o.status === 'open' && (
                        <ConfirmButton
                          className="btn btn--sm btn--paid"
                          formAction={quickPaidAction.bind(null, o.id)}
                          confirm={`Zahlung für ${o.number} über ${chf(o.total)} als eingegangen markieren?`}
                          mail={o.email}
                          mailAlways
                        >
                          Bezahlt ✓
                        </ConfirmButton>
                      )}
                      {o.status === 'paid' && <Link className="btn btn--sm btn--ship" href={`/admin/bestellungen/${o.id}#versand`}>Versenden →</Link>}
                    </td>
                  </RowLink>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bulkbar">
            <span>Ausgewählte Bestellungen:</span>
            <select name="status" defaultValue="paid">
              <option value="paid">als bezahlt markieren</option>
              <option value="shipped">als versendet markieren</option>
              <option value="cancelled">stornieren</option>
              <option value="open">auf «Zahlung ausstehend» zurücksetzen</option>
              <option value="delete">endgültig löschen (z. B. Testbestellungen)</option>
            </select>
            <label className="inline"><input type="checkbox" name="notify" value="1" defaultChecked /> Kunden per E-Mail informieren</label>
            <ConfirmButton className="btn btn--primary btn--sm" confirm="Status der ausgewählten Bestellungen ändern?" mail="selected">Ausführen</ConfirmButton>
            <PrintSelected />
          </div>
        </form>
      )}
    </>
  );
}
