import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CopyButton } from '@/components/CopyButton';
import { Icon } from '@/components/Icon';
import { config } from '@/lib/config';
import { chf, dateCh, ibanFormat, statusLabel, trackingUrl } from '@/lib/format';
import { getOrderByNumberToken } from '@/lib/orders';
import { dueDate, paymentMessage } from '@/lib/orders-shared';
import { swissQrSvg } from '@/lib/swissqr';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ number: string }>; searchParams: Promise<{ t?: string; neu?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: `Bestellung ${(await params).number}`, robots: { index: false } };
}

export default async function Bestellung({ params, searchParams }: Props) {
  const { number } = await params;
  const { t, neu } = await searchParams;
  if (!/^[A-Z]+-\d{2}-\d{4,}$/.test(number) || !t) notFound();
  const o = await getOrderByNumberToken(number, t);
  if (!o) notFound();

  const open = o.status === 'open';
  const qr = open ? await swissQrSvg(o) : null;
  const msg = paymentMessage(o);
  const amount = (o.total / 100).toFixed(2);

  return (
    <section className="shopflow" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="confirm-hero">
          <div className="confirm-hero__icon"><Icon name="check" /></div>
          {neu && open ? (
            <>
              <h1>Grazie mille, {o.first_name}!</h1>
              <p className="lead" style={{ margin: '0 auto 18px' }}>
                Ihre Bestellung ist bei uns eingegangen. Eine Bestätigung mit allen Angaben haben wir an <strong>{o.email}</strong> gesendet.
              </p>
            </>
          ) : (
            <h1>Ihre Bestellung</h1>
          )}
          <div className="ordno">Bestellnummer <strong>{o.number}</strong> <CopyButton text={o.number} /></div>
          <p style={{ marginTop: 16 }}><span className={`ostatus ostatus--${o.status}`}>{statusLabel(o.status)}</span></p>
        </div>

        {open && (
          <div className="payinfo">
            <div>
              <p className="eyebrow">Vorauskasse</p>
              <h2>Bitte überweisen Sie {chf(o.total)}</h2>
              <p style={{ color: 'var(--muted)' }}>
                Bitte geben Sie bei der Überweisung unbedingt Ihre Bestellnummer an. Sobald der Betrag bei uns eingegangen ist, versenden wir Ihre Bestellung und informieren Sie per E-Mail.
              </p>
              <table className="paytable">
                <tbody>
                  <tr><th>Betrag</th><td className="hl">{chf(o.total)} <CopyButton text={amount} /></td></tr>
                  <tr><th>Kontoinhaber</th><td>{config.bank.holder}</td></tr>
                  <tr><th>IBAN</th><td>{ibanFormat(config.bank.iban)} <CopyButton text={config.bank.iban} /></td></tr>
                  <tr><th>Bank</th><td>{config.bank.bank}</td></tr>
                  <tr><th>Mitteilung / Zahlungszweck</th><td>{msg} <CopyButton text={msg} /></td></tr>
                  <tr><th>Zahlbar bis</th><td>{dateCh(dueDate(o))}</td></tr>
                </tbody>
              </table>
            </div>
            {qr && (
              <div className="qrbox">
                <h3>Mit der Banking-App scannen</h3>
                <div className="qrbox__code" dangerouslySetInnerHTML={{ __html: qr }} />
                <p>Swiss QR-Code mit Betrag, IBAN und Bestellnummer. Einfach in der App Ihrer Bank scannen.</p>
              </div>
            )}
          </div>
        )}

        <ol className="timeline-mini" style={{ marginBottom: 30 }}>
          <li className="is-done"><strong>1. Bestellung erhalten</strong>{dateCh(o.created_at, true)}</li>
          <li className={o.paid_at ? 'is-done' : ''}><strong>2. Zahlung eingegangen</strong>{o.paid_at ? dateCh(o.paid_at, true) : 'Wir warten auf Ihre Überweisung'}</li>
          <li className={o.shipped_at ? 'is-done' : ''}>
            <strong>3. Versendet</strong>{o.shipped_at ? dateCh(o.shipped_at, true) : 'Nach Zahlungseingang mit der Post'}
            {o.tracking && <><br /><a href={trackingUrl(o.tracking)} target="_blank" rel="noopener">Sendung verfolgen</a></>}
          </li>
        </ol>

        <div className="shopgrid">
          <div className="form-card">
            <h2>Lieferadresse</h2>
            <p style={{ color: 'var(--text)', marginTop: 14 }}>
              {o.company && <>{o.company}<br /></>}
              {`${o.salutation} ${o.first_name} ${o.last_name}`.trim()}<br />
              {o.street}<br />{o.zip} {o.city}<br />Schweiz
            </p>
            <p style={{ margin: 0 }}>
              Fragen zu Ihrer Bestellung? Schreiben Sie an{' '}
              <a href={`mailto:${config.email.orders}?subject=${encodeURIComponent('Bestellung ' + o.number)}`}>{config.email.orders}</a>.
            </p>
          </div>
          <aside className="summary" style={{ position: 'static' }}>
            <h2>Übersicht</h2>
            <ul className="summary__items">
              {o.items.map((it) => (
                <li key={it.id}><span>{it.qty} × {it.name} <small>{it.weight}</small></span><span>{chf(it.line_total)}</span></li>
              ))}
            </ul>
            <div className="summary__row"><span>Zwischensumme</span><span>{chf(o.subtotal)}</span></div>
            <div className="summary__row"><span>Versand (Post)</span><span>{chf(o.shipping)}</span></div>
            <div className="summary__row summary__row--total"><span>Total</span><span>{chf(o.total)}</span></div>
            <p className="summary__vat" style={{ margin: 0 }}>inkl. {o.vat_rate} % MWST ({chf(o.vat_amount)})</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
