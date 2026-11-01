import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CopyButton } from '@/components/CopyButton';
import { ConfirmButton } from '@/components/admin/ConfirmButton';
import { Flash } from '@/components/admin/Flash';
import { requireAdmin } from '@/lib/admin';
import { config } from '@/lib/config';
import { chf, dateCh, ibanFormat, statusLabel, trackingUrl } from '@/lib/format';
import { LOCALE_NAMES, lp } from '@/lib/i18n';
import { getLogs, getOrder } from '@/lib/orders';
import { dueDate, paymentMessage } from '@/lib/orders-shared';
import { deleteOrderAction, noteAction, orderStatusAction, resendMailAction, trackingAction } from '../../actions';

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ ok?: string; mail?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const o = await getOrder(Number((await params).id) || 0);
  return { title: o ? `Bestellung ${o.number}` : 'Bestellung' };
}

export default async function OrderDetail({ params, searchParams }: Props) {
  await requireAdmin();
  const id = Number((await params).id);
  const o = id ? await getOrder(id) : null;
  if (!o) notFound();
  const { ok, mail } = await searchParams;
  const logs = await getLogs(o.id);
  const msg = paymentMessage(o);
  const addr = [o.company, `${o.first_name} ${o.last_name}`.trim(), o.street, `${o.zip} ${o.city}`].filter(Boolean).join('\n');

  const StatusForm = ({ status, children }: { status: string; children: React.ReactNode }) => (
    <form action={orderStatusAction}>
      <input type="hidden" name="id" value={o.id} />
      <input type="hidden" name="status" value={status} />
      {children}
    </form>
  );

  return (
    <>
      <header className="pagehead">
        <div>
          <Link className="back" href="/admin/bestellungen">← Alle Bestellungen</Link>
          <h1>Bestellung {o.number} <span className={`badge badge--${o.status}`}>{statusLabel(o.status)}</span>{o.is_test && <> <span className="badge badge--test">TEST (Testcode)</span></>}</h1>
          <p className="muted">Eingegangen am {dateCh(o.created_at, true)} · {o.payment_method === 'online' ? `Online-Zahlung (Payrexx)${o.payrexx_gateway_id ? `, Zahlungslink ${o.payrexx_gateway_id}` : ''}` : <>Vorauskasse · zahlbar bis {dateCh(dueDate(o))}</>}</p>
        </div>
        <a className="btn btn--ghost" href={lp(o.lang, `/bestellung/${o.number}?t=${o.token}`)} target="_blank" rel="noopener">Kundenansicht ↗</a>
      </header>
      <Flash ok={ok} mail={mail} />

      <ol className="steps">
        <li className="is-done">Bestellt<small>{dateCh(o.created_at)}</small></li>
        {o.status === 'cancelled' ? (
          <li className="is-now">Storniert<small>{dateCh(o.cancelled_at)}</small></li>
        ) : (
          <>
            <li className={o.paid_at ? 'is-done' : 'is-now'}>Bezahlt<small>{o.paid_at ? dateCh(o.paid_at) : 'ausstehend'}</small></li>
            <li className={o.shipped_at ? 'is-done' : o.paid_at ? 'is-now' : ''}>Versendet<small>{o.shipped_at ? dateCh(o.shipped_at) : 'offen'}</small></li>
          </>
        )}
      </ol>

      <div className="grid2">
        <div>
          <section className="card actions">
            <h2>Nächster Schritt</h2>
            {o.status === 'open' && (
              <>
                <p>Warten auf Zahlung von <strong>{chf(o.total)}</strong> mit der Mitteilung <strong>«{msg}»</strong>. Sobald der Betrag auf dem Konto ist:</p>
                <StatusForm status="paid">
                  <label className="inline"><input type="checkbox" name="notify" value="1" defaultChecked /> Kunden per E-Mail über den Zahlungseingang informieren</label>
                  <ConfirmButton className="btn btn--paid btn--lg" confirm="Zahlung als eingegangen markieren?" mail={o.email}>✓ Als bezahlt markieren</ConfirmButton>
                </StatusForm>
              </>
            )}
            {o.status === 'paid' && (
              <>
                <p id="versand">Bezahlt am {dateCh(o.paid_at, true)}. Paket bereit machen und mit der Post versenden.</p>
                <StatusForm status="shipped">
                  <label>Sendungsnummer der Post <span className="muted">(optional, erscheint in der E-Mail)</span><input name="tracking" placeholder="z. B. 99.00.123456.12345678" defaultValue={o.tracking} /></label>
                  <label className="inline"><input type="checkbox" name="notify" value="1" defaultChecked /> Kunden per E-Mail über den Versand informieren</label>
                  <ConfirmButton className="btn btn--ship btn--lg" confirm="Bestellung als versendet markieren?" mail={o.email}>📦 Als versendet markieren</ConfirmButton>
                </StatusForm>
              </>
            )}
            {o.status === 'shipped' && (
              <>
                <p>✓ Bezahlt am {dateCh(o.paid_at, true)} · Versendet am {dateCh(o.shipped_at, true)}.</p>
                <form action={trackingAction} className="row">
                  <input type="hidden" name="id" value={o.id} />
                  <input name="tracking" placeholder="Sendungsnummer" defaultValue={o.tracking} />
                  <button className="btn btn--ghost" type="submit">Speichern</button>
                </form>
                {o.tracking && <p><a href={trackingUrl(o.tracking)} target="_blank" rel="noopener">Sendung bei der Post verfolgen ↗</a></p>}
              </>
            )}
            {o.status === 'cancelled' && <p>Diese Bestellung wurde am {dateCh(o.cancelled_at, true)} storniert.</p>}

            <details className="more">
              <summary>Weitere Aktionen</summary>
              <div className="more__body">
                <form action={resendMailAction} className="row">
                  <input type="hidden" name="id" value={o.id} />
                  <ConfirmButton className="btn btn--ghost btn--sm" confirm={`E-Mail «${statusLabel(o.status)}» erneut senden?`} mail={o.email}>✉ Letzte E-Mail erneut senden</ConfirmButton>
                </form>
                {o.status !== 'cancelled' && (
                  <StatusForm status="cancelled">
                    <label className="inline"><input type="checkbox" name="notify" value="1" defaultChecked /> Kunden informieren</label>
                    <ConfirmButton className="btn btn--danger btn--sm" confirm={`Bestellung ${o.number} wirklich stornieren?`} mail={o.email}>Stornieren</ConfirmButton>
                  </StatusForm>
                )}
                {o.status !== 'open' && (
                  <StatusForm status="open">
                    <ConfirmButton className="btn btn--ghost btn--sm" confirm="Status auf «Zahlung ausstehend» zurücksetzen?">Auf «Zahlung ausstehend» zurücksetzen</ConfirmButton>
                  </StatusForm>
                )}
                <form action={deleteOrderAction} className="danger-zone">
                  <input type="hidden" name="id" value={o.id} />
                  <ConfirmButton className="btn btn--danger btn--sm" confirm={`Bestellung ${o.number} endgültig löschen?\n\nArtikel und Verlauf werden mit gelöscht, der Lagerbestand wird zurückgebucht. Der Kunde wird nicht informiert. Das kann nicht rückgängig gemacht werden.`}>🗑 Bestellung endgültig löschen</ConfirmButton>
                  <span className="muted small">Für Testbestellungen. Echte Bestellungen besser stornieren.</span>
                </form>
              </div>
            </details>
          </section>

          <section className="card">
            <h2>Artikel</h2>
            <table className="table table--plain">
              <tbody>
                {o.items.map((it) => (
                  <tr key={it.id}>
                    <td>{it.qty} ×</td>
                    <td><strong>{it.name}</strong> <span className="muted">{it.weight} · à {chf(it.unit_price)}</span></td>
                    <td className="num">{chf(it.line_total)}</td>
                  </tr>
                ))}
                <tr><td></td><td className="muted">Zwischensumme</td><td className="num">{chf(o.subtotal)}</td></tr>
                <tr><td></td><td className="muted">Versand (Post)</td><td className="num">{o.shipping ? chf(o.shipping) : 'Gratis'}</td></tr>
                {o.discount > 0 && <tr><td></td><td className="muted">Testrabatt</td><td className="num">– {chf(o.discount)}</td></tr>}
                <tr className="total"><td></td><td>Total</td><td className="num">{chf(o.total)}</td></tr>
                <tr><td></td><td className="muted small">davon MWST {o.vat_rate} %</td><td className="num muted small">{chf(o.vat_amount)}</td></tr>
              </tbody>
            </table>
          </section>

          <section className="card">
            <h2>Verlauf</h2>
            <ul className="log">
              {logs.map((l) => <li key={l.id}><span className="muted">{dateCh(l.created_at, true)}</span> {l.message}</li>)}
            </ul>
          </section>
        </div>

        <div>
          <section className="card">
            <h2>Kunde &amp; Lieferadresse</h2>
            <p className="address">
              {o.company && <><strong>{o.company}</strong><br /></>}
              {`${o.salutation} ${o.first_name} ${o.last_name}`.trim()}<br />
              {o.street}<br />{o.zip} {o.city}<br />Schweiz
            </p>
            <p>
              <a href={`mailto:${o.email}?subject=${encodeURIComponent('Ihre Bestellung ' + o.number)}`}>{o.email}</a>
              {o.phone && <><br /><a href={`tel:${o.phone}`}>{o.phone}</a></>}
            </p>
            <CopyButton text={addr} className="btn btn--ghost btn--sm" label="Adresse kopieren" />
            {o.note && <div className="note"><strong>Bemerkung des Kunden</strong><br /><span style={{ whiteSpace: 'pre-line' }}>{o.note}</span></div>}
          </section>

          <section className="card">
            <h2>Dokumente drucken</h2>
            <div className="docs">
              <a href={`/admin/druck?doc=lieferschein&ids=${o.id}`}><i>📄</i>Lieferschein</a>
              <a href={`/admin/druck?doc=rechnung&ids=${o.id}`}><i>🧾</i>Rechnung</a>
              <a href={`/admin/druck?doc=etikett&ids=${o.id}`}><i>🏷️</i>Adressetikett</a>
            </div>
          </section>

          <section className="card">
            <h2>Interne Notiz</h2>
            <form action={noteAction}>
              <input type="hidden" name="id" value={o.id} />
              <textarea name="admin_note" rows={4} placeholder="Nur für das Team sichtbar" defaultValue={o.admin_note} />
              <button className="btn btn--ghost btn--sm" type="submit">Notiz speichern</button>
            </form>
          </section>

          <section className="card">
            <h2>Zahlungsabgleich</h2>
            <dl className="kv">
              <dt>Sprache</dt><dd>{LOCALE_NAMES[o.lang] ?? o.lang}</dd>
              <dt>Betrag</dt><dd>{chf(o.total)}</dd>
              <dt>Mitteilung</dt><dd>{msg}</dd>
              <dt>Konto</dt><dd>{ibanFormat(config.bank.iban)}</dd>
            </dl>
          </section>
        </div>
      </div>
    </>
  );
}
