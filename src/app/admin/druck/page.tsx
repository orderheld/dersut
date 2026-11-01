import type { Metadata } from 'next';
import { Fragment } from 'react';
import { requireAdmin } from '@/lib/admin';
import { brand } from '@/lib/brand';
import { config } from '@/lib/config';
import { chf, dateCh, ibanFormat } from '@/lib/format';
import { getOrder, type Order } from '@/lib/orders';
import { dueDate, paymentMessage } from '@/lib/orders-shared';
import { swissQrSvg } from '@/lib/swissqr';
import { PrintBar } from './PrintBar';

export const metadata: Metadata = { title: 'Drucken' };

type Doc = 'rechnung' | 'lieferschein' | 'etikett';
const TITLES: Record<Doc, string> = { rechnung: 'Rechnung', lieferschein: 'Lieferschein', etikett: 'Adressetikett' };

type Props = { searchParams: Promise<{ doc?: string; ids?: string; auto?: string; format?: string }> };

const c = config.company;
const senderLines = () => [c.name, c.street, `${c.zip} ${c.city}`].filter(Boolean);
/** Webadresse ohne https:// (z. B. dersut.ch) */
const host = () => config.siteUrl.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
/** Swiss Standard: «CHE-123.456.789 MWST» */
const vatLine = () => c.vatNo || (c.uid ? `UID ${c.uid}` : '');

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
          {c.street} · {c.zip} {c.city}<br />
          {[c.phone, config.email.info, host()].filter(Boolean).join(' · ')}<br />
          {vatLine()}
        </div>
      </header>
      <div className="doc__window">
        <div className="doc__sender">{senderLines().join(' · ')}</div>
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
      <span>{[c.name, c.street, `${c.zip} ${c.city}`, config.email.info, host()].join(' · ')}</span>
      <span>{[vatLine(), config.bank.bank, `IBAN ${ibanFormat(config.bank.iban)}`].filter(Boolean).join(' · ')}</span>
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
        <thead><tr><th className="pos">Pos.</th><th>Artikel</th><th className="num">Menge</th><th className="num">Preis CHF</th><th className="num">Betrag CHF</th></tr></thead>
        <tbody>
          {o.items.map((it, i) => (
            <tr key={it.id}><td className="pos">{i + 1}</td><td><strong>{it.name}</strong>{it.weight && <span className="muted"> · {it.weight}</span>}</td><td className="num">{it.qty}</td><td className="num">{chf(it.unit_price, false)}</td><td className="num">{chf(it.line_total, false)}</td></tr>
          ))}
        </tbody>
      </table>
      <dl className="doc__totals">
        <dt>Zwischensumme</dt><dd>{chf(o.subtotal, false)}</dd>
        <dt>Versand Schweiz (Post)</dt><dd>{o.shipping ? chf(o.shipping, false) : 'gratis'}</dd>
        {o.discount > 0 && <><dt>Testrabatt</dt><dd>– {chf(o.discount, false)}</dd></>}
        <dt className="t">Total CHF</dt><dd className="t">{chf(o.total, false)}</dd>
        <dt className="v">inkl. MWST {o.vat_rate} %</dt><dd className="v">{chf(o.vat_amount, false)}</dd>
      </dl>
      {o.status === 'cancelled' ? (
        <p className="doc__stamp doc__stamp--cancel">Storniert am {dateCh(o.cancelled_at)}</p>
      ) : paid ? (
        <p className="doc__stamp">Bezahlt am {dateCh(o.paid_at)}{o.payment_method === 'online' ? ' (Online-Zahlung)' : ''}. Vielen Dank!</p>
      ) : (
        showQr && !qrOwnPage ? (
          <p className="doc__text">Zahlbar bis <strong>{dateCh(dueDate(o))}</strong> mit dem QR-Zahlteil unten. Vielen Dank für Ihre Bestellung.</p>
        ) : (
        <div className="doc__pay">
          <p>Zahlbar bis <strong>{dateCh(dueDate(o))}</strong>{showQr ? ' mit dem QR-Zahlteil auf der nächsten Seite oder' : ''} per Überweisung:</p>
          <dl>
            <dt>Konto</dt><dd>{config.bank.holder} · {config.bank.bank}</dd>
            <dt>IBAN</dt><dd>{ibanFormat(config.bank.iban)}</dd>
            <dt>Mitteilung</dt><dd>{paymentMessage(o)}</dd>
          </dl>
        </div>
        )
      )}
      {!(showQr && !qrOwnPage) && <p className="doc__text">Herzlichen Dank für Ihre Bestellung und viel Genuss mit Dersut Caffè.</p>}
      {showQr && !qrOwnPage ? <QrBill o={o} qr={qr!} /> : <Footer />}
    </section>
    {qrOwnPage && (
      <section className="doc doc--a4">
        <header className="doc__head doc__head--small">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="doc__logo" src={brand('logo')} alt="Dersut" />
          <div className="doc__company"><strong>Zahlteil zu Rechnung {o.number}</strong><br />vom {dateCh(o.created_at)} · Betrag CHF {chf(o.total, false)}</div>
        </header>
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
        <thead><tr><th className="pos">Pos.</th><th>Artikel</th><th>Inhalt</th><th className="num">Menge</th><th className="check">Geprüft</th></tr></thead>
        <tbody>
          {o.items.map((it, i) => (
            <tr key={it.id}><td className="pos">{i + 1}</td><td><strong>{it.name}</strong></td><td>{it.weight}</td><td className="num"><strong>{it.qty}</strong></td><td className="check"><span className="box" /></td></tr>
          ))}
          <tr className="total"><td></td><td colSpan={2}>Total Artikel</td><td className="num">{count}</td><td></td></tr>
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={brand('logo')} alt="Dersut" />
        <div><span>Absender</span>{c.name}<br />{c.street}, {c.zip} {c.city}</div>
      </div>
      <div className="label__sticker">
        <span>Barcode-Kleber der Post hier aufkleben</span>
      </div>
      {/* Schrift so wählen, dass auch lange Firmennamen auf eine Zeile passen */}
      <div className="label__to" style={{ fontSize: `${Math.min(14, Math.max(9, 400 / Math.max(...recipientLines(o).map((l) => l.length))))}pt` }}>
        <span>Empfänger</span>
        <div><Lines lines={recipientLines(o)} /></div>
        {o.phone && <small>Tel. {o.phone}</small>}
      </div>
      <div className="label__foot">
        <span>Bestellung {o.number}</span>
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
