import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CopyButton } from '@/components/CopyButton';
import { Icon } from '@/components/Icon';
import { config } from '@/lib/config';
import { chf, dateCh, ibanFormat, statusLabel, trackingUrl } from '@/lib/format';
import { getOrderByNumberToken } from '@/lib/orders';
import { dueDate, paymentMessage } from '@/lib/orders-shared';
import { swissQrSvg } from '@/lib/swissqr';
import { getDict } from '@/i18n';
import { de } from '@/i18n/de';
import { asLocale } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ lang: string; number: string }>; searchParams: Promise<{ t?: string; neu?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, number } = await params;
  return { title: getDict(asLocale(lang)).order.metaTitle(number), robots: { index: false } };
}

export default async function Bestellung({ params, searchParams }: Props) {
  const { number, lang: l } = await params;
  const lang = asLocale(l);
  const T = getDict(lang);
  const d = T.order;
  const { t: token, neu } = await searchParams;
  if (!/^[A-Z]+-\d{2}-\d{4,}$/.test(number) || !token) notFound();
  const o = await getOrderByNumberToken(number, token);
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
              <h1>{d.thanks(o.first_name)}</h1>
              <p className="lead" style={{ margin: '0 auto 18px' }} dangerouslySetInnerHTML={{ __html: d.received.replace('{email}', o.email.replace(/[<>&"]/g, '')) }} />
            </>
          ) : (
            <h1>{d.yourOrder}</h1>
          )}
          <div className="ordno">{d.number} <strong>{o.number}</strong> <CopyButton text={o.number} label={T.common.copy} doneLabel={T.common.copied} /></div>
          <p style={{ marginTop: 16 }}><span className={`ostatus ostatus--${o.status}`}>{T.status[o.status] ?? statusLabel(o.status)}</span></p>
        </div>

        {open && (
          <div className="payinfo">
            <div>
              <p className="eyebrow">{d.prepay}</p>
              <h2>{d.pleaseTransfer(chf(o.total))}</h2>
              <p style={{ color: 'var(--muted)' }}>{d.transferText}</p>
              <table className="paytable">
                <tbody>
                  <tr><th>{d.amount}</th><td className="hl">{chf(o.total)} <CopyButton text={amount} label={T.common.copy} doneLabel={T.common.copied} /></td></tr>
                  <tr><th>{d.holder}</th><td>{config.bank.holder}</td></tr>
                  <tr><th>{d.iban}</th><td>{ibanFormat(config.bank.iban)} <CopyButton text={config.bank.iban} label={T.common.copy} doneLabel={T.common.copied} /></td></tr>
                  <tr><th>{d.bank}</th><td>{config.bank.bank}</td></tr>
                  <tr><th>{d.message}</th><td>{msg} <CopyButton text={msg} label={T.common.copy} doneLabel={T.common.copied} /></td></tr>
                  <tr><th>{d.due}</th><td>{dateCh(dueDate(o))}</td></tr>
                </tbody>
              </table>
            </div>
            {qr && (
              <div className="qrbox">
                <h3>{d.scan}</h3>
                <div className="qrbox__code" dangerouslySetInnerHTML={{ __html: qr }} />
                <p>{d.scanText}</p>
              </div>
            )}
          </div>
        )}

        <ol className="timeline-mini" style={{ marginBottom: 30 }}>
          <li className="is-done"><strong>{d.step1}</strong>{dateCh(o.created_at, true)}</li>
          <li className={o.paid_at ? 'is-done' : ''}><strong>{d.step2}</strong>{o.paid_at ? dateCh(o.paid_at, true) : d.step2Wait}</li>
          <li className={o.shipped_at ? 'is-done' : ''}>
            <strong>{d.step3}</strong>{o.shipped_at ? dateCh(o.shipped_at, true) : d.step3Wait}
            {o.tracking && <><br /><a href={trackingUrl(o.tracking)} target="_blank" rel="noopener">{d.track}</a></>}
          </li>
        </ol>

        <div className="shopgrid">
          <div className="form-card">
            <h2>{d.address}</h2>
            <p style={{ color: 'var(--text)', marginTop: 14 }}>
              {o.company && <>{o.company}<br /></>}
              {`${o.salutation === 'Divers' ? '' : T.checkout.salutations[de.checkout.salutations.indexOf(o.salutation)] ?? o.salutation} ${o.first_name} ${o.last_name}`.trim()}<br />
              {o.street}<br />{o.zip} {o.city}<br />{T.common.country}
            </p>
            <p style={{ margin: 0 }}>
              {d.questions}{' '}
              <a href={`mailto:${config.email.orders}?subject=${encodeURIComponent(d.paymentMessage(o.number))}`}>{config.email.orders}</a>.
            </p>
          </div>
          <aside className="summary" style={{ position: 'static' }}>
            <h2>{d.overview}</h2>
            <ul className="summary__items">
              {o.items.map((it) => (
                <li key={it.id}><span>{it.qty} × {it.name} <small>{it.weight}</small></span><span>{chf(it.line_total)}</span></li>
              ))}
            </ul>
            <div className="summary__row"><span>{T.cart.subtotal}</span><span>{chf(o.subtotal)}</span></div>
            <div className="summary__row"><span>{T.cart.shipping}</span><span>{chf(o.shipping)}</span></div>
            <div className="summary__row summary__row--total"><span>{T.cart.total}</span><span>{chf(o.total)}</span></div>
            <p className="summary__vat" style={{ margin: 0 }}>{T.common.inclVatRate(o.vat_rate)} ({chf(o.vat_amount)})</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
