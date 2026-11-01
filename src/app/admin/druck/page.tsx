import type { Metadata } from 'next';
import { Fragment } from 'react';
import { requireAdmin } from '@/lib/admin';
import { brand } from '@/lib/brand';
import { config } from '@/lib/config';
import { chf, dateCh, ibanFormat } from '@/lib/format';
import { addLog, getOrder, type Order } from '@/lib/orders';
import { dueDate, paymentMessage } from '@/lib/orders-shared';
import { swissQrSvg } from '@/lib/swissqr';
import { PrintBar } from './PrintBar';

export const metadata: Metadata = { title: 'Drucken' };

type Doc = 'rechnung' | 'lieferschein' | 'etikett';
const TITLES: Record<Doc, string> = { rechnung: 'Rechnung', lieferschein: 'Lieferschein', etikett: 'Adressetikett' };

type Props = { searchParams: Promise<{ doc?: string; ids?: string; auto?: string; format?: string }> };

const c = config.company;
const senderLines = [c.name, c.co, c.street, `${c.zip} ${c.city}`].filter(Boolean);

function recipientLines(o: Order): string[] {
  return [o.company, `${o.salutation} ${o.first_name} ${o.last_name}`.replace(/\s+/g, ' ').trim(), o.street, `${o.zip} ${o.city}`].filter(Boolean);
}

const Lines = ({ lines }: { lines: string[] }) => <>{lines.map((l, i) => <Fragment key={i}>{i > 0 && <br />}{l}</Fragment>)}</>;

/** Briefkopf: Logo links, Absender klein über dem Adressfenster (rechts, passend für C5-Fenstercouverts). */
function Letterhead({ o, title, meta }: { o: Order; title: string; meta: [string, string][] }) {
  return (
    <>
      <header className="doc__head">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="doc__logo" src={brand('logo')} alt="Dersut" />
        <div className="doc__company">
          <strong>{c.name}</strong><br />
          {c.street}, {c.zip} {c.city}<br />
          {config.email.info} · {config.primaryHost}
          {c.phone && <><br />{c.phone}</>}
        </div>
      </header>
      <div className="doc__window">
        <div className="doc__sender">{senderLines.join(' · ')}</div>
        <div className="doc__recipient"><Lines lines={recipientLines(o)} /></div>
      </div>
      <h1 className="doc__title">{title}</h1>
      <dl className="doc__meta">
        {meta.map(([k, v]) => <Fragment key={k}><dt>{k}</dt><dd>{v}</dd></Fragment>)}
      </dl>
    </>
  );
}

function Footer() {
  return (
    <footer className="doc__foot">
      <span>{c.name} · {c.street} · {c.zip} {c.city}</span>
      <span>UID {c.uid}{c.vatNo ? ` · MWST-Nr. ${c.vatNo}` : ''}</span>
      <span>{config.bank.bank} · IBAN {ibanFormat(config.bank.iban)}</span>
    </footer>
  );
}

function Invoice({ o, qr }: { o: Order; qr: string | null }) {
  const paid = o.status === 'paid' || o.status === 'shipped';
  const showQr = !paid && o.status !== 'cancelled' && !!qr;
  // Bei vielen Positionen reicht der Platz über dem Zahlteil nicht: Zahlteil dann auf eigener Seite
  const qrOwnPage = showQr && o.items.length > 3;
  return (
    <>
    <section className="doc doc--a4">
      <Letterhead
        o={o}
        title={`Rechnung ${o.number}`}
        meta={[
          ['Rechnungsdatum', dateCh(o.created_at)],
          ['Bestellnummer', o.number],
          ['Kunde', o.email],
          ...(paid ? [] : [['Zahlbar bis', dateCh(dueDate(o))] as [string, string]]),
        ]}
      />
      <table className="doc__table">
        <thead><tr><th>Artikel</th><th className="num">Menge</th><th className="num">Preis</th><th className="num">Betrag</th></tr></thead>
        <tbody>
          {o.items.map((it) => (
            <tr key={it.id}><td><strong>{it.name}</strong>{it.weight && <span className="muted"> · {it.weight}</span>}</td><td className="num">{it.qty}</td><td className="num">{chf(it.unit_price, false)}</td><td className="num">{chf(it.line_total, false)}</td></tr>
          ))}
          <tr className="sub"><td colSpan={3}>Versand Schweiz (Post)</td><td className="num">{o.shipping ? chf(o.shipping, false) : 'gratis'}</td></tr>
          <tr className="total"><td colSpan={3}>Total CHF</td><td className="num">{chf(o.total, false)}</td></tr>
          <tr className="vat"><td colSpan={3}>Im Total enthalten: MWST {o.vat_rate} %</td><td className="num">{chf(o.vat_amount, false)}</td></tr>
        </tbody>
      </table>
      {o.status === 'cancelled' ? (
        <p className="doc__stamp doc__stamp--cancel">Storniert am {dateCh(o.cancelled_at)}</p>
      ) : paid ? (
        <p className="doc__stamp">Bezahlt am {dateCh(o.paid_at)}{o.payment_method === 'online' ? ' (Online-Zahlung)' : ''}. Vielen Dank!</p>
      ) : (
        <p className="doc__text">Bitte überweisen Sie den Betrag bis {dateCh(dueDate(o))} mit dem QR-Zahlteil unten oder auf {config.bank.holder}, {config.bank.bank}, IBAN {ibanFormat(config.bank.iban)}, Mitteilung «{paymentMessage(o)}».</p>
      )}
      {!(showQr && !qrOwnPage) && <p className="doc__text">Herzlichen Dank für Ihre Bestellung und viel Genuss mit Dersut Caffè.</p>}
      {showQr && !qrOwnPage ? <QrBill o={o} qr={qr!} /> : <Footer />}
    </section>
    {qrOwnPage && (
      <section className="doc doc--a4">
        <p className="doc__text" style={{ marginTop: '20mm' }}>Zahlteil zu Rechnung {o.number} vom {dateCh(o.created_at)}</p>
        <QrBill o={o} qr={qr!} />
      </section>
    )}
    </>
  );
}

/** QR-Zahlteil nach Schweizer Standard: Empfangsschein 62 mm + Zahlteil 148 mm, 105 mm hoch, am Seitenende. */
function QrBill({ o, qr }: { o: Order; qr: string }) {
  const debtor = recipientLines(o);
  const creditor = [ibanFormat(config.bank.iban), config.bank.holder, c.street, `${c.zip} ${c.city}`];
  const amount = chf(o.total, false).replace('’', ' ');
  return (
    <div className="qrbill">
      <div className="qrbill__receipt">
        <h3>Empfangsschein</h3>
        <h4>Konto / Zahlbar an</h4><p><Lines lines={creditor} /></p>
        <h4>Zahlbar durch</h4><p><Lines lines={debtor} /></p>
        <div className="qrbill__amount"><div><h4>Währung</h4>CHF</div><div><h4>Betrag</h4>{amount}</div></div>
        <h4 className="qrbill__accept">Annahmestelle</h4>
      </div>
      <div className="qrbill__pay">
        <div className="qrbill__left">
          <h3>Zahlteil</h3>
          <div className="qrbill__qr" dangerouslySetInnerHTML={{ __html: qr }} />
          <div className="qrbill__amount"><div><h4>Währung</h4>CHF</div><div><h4>Betrag</h4>{amount}</div></div>
        </div>
        <div className="qrbill__right">
          <h4>Konto / Zahlbar an</h4><p><Lines lines={creditor} /></p>
          <h4>Zusätzliche Informationen</h4><p>{paymentMessage(o)}</p>
          <h4>Zahlbar durch</h4><p><Lines lines={debtor} /></p>
        </div>
      </div>
    </div>
  );
}

function DeliveryNote({ o }: { o: Order }) {
  const count = o.items.reduce((s, it) => s + it.qty, 0);
  return (
    <section className="doc doc--a4">
      <Letterhead
        o={o}
        title={`Lieferschein ${o.number}`}
        meta={[
          ['Bestelldatum', dateCh(o.created_at)],
          ['Lieferdatum', dateCh(o.shipped_at ?? new Date())],
          ['Bestellnummer', o.number],
          ...(o.phone ? [['Telefon', o.phone] as [string, string]] : []),
        ]}
      />
      <table className="doc__table">
        <thead><tr><th className="check">✓</th><th className="num">Menge</th><th>Artikel</th><th>Inhalt</th></tr></thead>
        <tbody>
          {o.items.map((it) => (
            <tr key={it.id}><td className="check"><span className="box" /></td><td className="num"><strong>{it.qty}</strong></td><td><strong>{it.name}</strong></td><td>{it.weight}</td></tr>
          ))}
          <tr className="total"><td></td><td className="num">{count}</td><td colSpan={2}>Artikel total</td></tr>
        </tbody>
      </table>
      {o.note && <div className="doc__note"><strong>Ihre Bemerkung</strong><br /><span style={{ whiteSpace: 'pre-line' }}>{o.note}</span></div>}
      <p className="doc__text">Bitte prüfen Sie die Lieferung bei Erhalt. Fragen beantworten wir gerne unter {config.email.info}.</p>
      <p className="doc__text">Herzlichen Dank für Ihre Bestellung und viel Genuss mit Dersut Caffè.</p>
      <Footer />
    </section>
  );
}

/** Paketetikett 10 × 15 cm (Etikettendrucker) bzw. A6: Absender, Empfänger gross, Feld für den Barcode-Kleber der Post. */
function Label({ o }: { o: Order }) {
  return (
    <section className="doc doc--label">
      <div className="label__from">
        <span>Absender</span>
        {senderLines.join(', ')}
      </div>
      <div className="label__sticker">
        <span>Platz für den Barcode-Kleber der Post<br />(Sendungsnummer)</span>
      </div>
      <div className="label__to">
        <span>Empfänger</span>
        <div><Lines lines={recipientLines(o)} /></div>
        {o.phone && <small>Tel. {o.phone}</small>}
      </div>
      <div className="label__foot">
        <span>{o.number}</span>
        <span>{o.items.reduce((s, it) => s + it.qty, 0)} Artikel</span>
        <span>{dateCh(new Date())}</span>
      </div>
    </section>
  );
}

export default async function PrintPage({ searchParams }: Props) {
  await requireAdmin();
  const sp = await searchParams;
  const doc: Doc = sp.doc === 'rechnung' || sp.doc === 'etikett' ? sp.doc : 'lieferschein';
  const ids = String(sp.ids ?? '').split(',').map(Number).filter((n) => n > 0).slice(0, 100);
  const orders = (await Promise.all(ids.map((id) => getOrder(id)))).filter((o): o is Order => !!o);
  const qrs = doc === 'rechnung' ? await Promise.all(orders.map((o) => swissQrSvg(o))) : [];
  await Promise.all(orders.map((o) => addLog(o.id, `${TITLES[doc]} zum Drucken geöffnet.`)));

  return (
    <div className={`print print--${doc}`}>
      <PrintBar title={`${TITLES[doc]}${orders.length > 1 ? ` · ${orders.length} Bestellungen` : orders[0] ? ` · ${orders[0].number}` : ''}`} auto={sp.auto === '1'}>
        {doc === 'etikett' && <span className="muted small"> · Format 10 × 15 cm. Im Druckdialog das Etikettenformat oder A6 wählen, bei A4 «Tatsächliche Grösse».</span>}
        {doc === 'rechnung' && <span className="muted small"> · Offene Vorauskasse-Rechnungen mit QR-Zahlteil. Für Fenstercouverts C5 rechts.</span>}
      </PrintBar>
      {!orders.length && <div className="card empty noprint">Keine Bestellungen ausgewählt.</div>}
      {orders.map((o, i) =>
        doc === 'rechnung' ? <Invoice key={o.id} o={o} qr={qrs[i]} /> : doc === 'etikett' ? <Label key={o.id} o={o} /> : <DeliveryNote key={o.id} o={o} />,
      )}
    </div>
  );
}
