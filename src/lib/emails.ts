import 'server-only';
import { config } from './config';
import { absUrl, chf, companyAddressLines, dateCh, ibanFormat, statusLabel, trackingUrl } from './format';
import type { Order } from './orders';
import { dueDate, paymentMessage } from './orders-shared';
import { sendMail } from './mail';

const esc = (s: string | number) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const nl2br = (s: string) => esc(s).replace(/\n/g, '<br>');

const h1 = (t: string) => `<h1 style="font-family:Georgia,serif;font-weight:normal;font-size:28px;color:#17181c;margin:0 0 14px">${t}</h1>`;
const button = (href: string, label: string) =>
  `<p style="text-align:center;margin:26px 0"><a href="${esc(href)}" style="display:inline-block;background:#002856;color:#ffffff;text-decoration:none;padding:14px 26px;font-size:13px;letter-spacing:1.5px;text-transform:uppercase">${label}</a></p>`;

function layout(body: string): string {
  const addr = companyAddressLines().slice(1).join(' · ');
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#f6f2e9;font-family:Helvetica,Arial,sans-serif;color:#34363d">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f2e9;padding:28px 12px"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff">
<tr><td style="background:#002856;padding:26px 36px">
<span style="font-family:Georgia,'Times New Roman',serif;font-size:26px;letter-spacing:4px;color:#ffffff">DERSUT</span>
<span style="font-family:Georgia,serif;font-style:italic;font-size:14px;color:#b9aa80;padding-left:6px">caffè · Schweiz</span>
</td></tr>
<tr><td style="padding:36px 36px 10px;font-size:15px;line-height:1.6">${body}</td></tr>
<tr><td style="padding:24px 36px 34px;font-size:12.5px;line-height:1.6;color:#6c6a64;border-top:1px solid #eee8da">
${esc(config.company.name)} · Offizieller Vertrieb von Dersut Caffè in der Schweiz<br>${esc(addr)}<br>
<a href="mailto:${config.email.orders}" style="color:#002856">${config.email.orders}</a> · <a href="${esc(config.siteUrl)}" style="color:#002856">${config.primaryHost}</a>
</td></tr></table></td></tr></table></body></html>`;
}

function items(o: Order): string {
  const rows = o.items
    .map(
      (it) =>
        `<tr><td style="padding:9px 0;border-bottom:1px solid #eee8da">${it.qty} × ${esc(it.name)} <span style="color:#6c6a64">${esc(it.weight)}</span></td><td align="right" style="padding:9px 0;border-bottom:1px solid #eee8da">${chf(it.line_total)}</td></tr>`,
    )
    .join('');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;margin:8px 0 20px">${rows}
<tr><td style="padding:9px 0">Versand (Post)</td><td align="right" style="padding:9px 0">${chf(o.shipping)}</td></tr>
<tr><td style="padding:12px 0;border-top:2px solid #002856;font-weight:bold;color:#17181c">Total</td><td align="right" style="padding:12px 0;border-top:2px solid #002856;font-weight:bold;font-size:17px;color:#002856">${chf(o.total)}</td></tr>
<tr><td colspan="2" align="right" style="font-size:12px;color:#6c6a64">inkl. ${o.vat_rate} % MWST (${chf(o.vat_amount)})</td></tr></table>`;
}

function address(o: Order): string {
  return `<p style="font-size:14px;margin:0 0 20px"><strong style="color:#17181c">Lieferadresse</strong><br>
${o.company ? esc(o.company) + '<br>' : ''}${esc(`${o.first_name} ${o.last_name}`)}<br>${esc(o.street)}<br>${esc(`${o.zip} ${o.city}`)}</p>`;
}

const greeting = (o: Order) => `<p>Guten Tag ${esc(`${o.first_name} ${o.last_name}`)}</p>`;
const signoff = `<p>Herzliche Grüsse<br>${esc(config.company.name)}</p>`;

export function orderLink(o: Order): string {
  return absUrl(`bestellung/${o.number}?t=${o.token}`);
}

function confirmation(o: Order): string {
  const row = (k: string, v: string) => `<tr><td style="padding:3px 18px 3px 0;color:#6c6a64">${k}</td><td>${v}</td></tr>`;
  return layout(`${h1(`Grazie mille, ${esc(o.first_name)}!`)}
<p>Vielen Dank für Ihre Bestellung bei Dersut Kaffee Schweiz. Ihre Bestellnummer lautet <strong style="color:#002856">${o.number}</strong>.</p>
<p>Bitte überweisen Sie den Gesamtbetrag per Vorauskasse. Sobald Ihre Zahlung eingegangen ist, versenden wir Ihre Bestellung mit der Post.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f2e9;border-left:4px solid #82754F;margin:22px 0;font-size:14px"><tr><td style="padding:20px 22px">
<div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#82754F;font-weight:bold;margin-bottom:10px">Zahlungsangaben</div>
<table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px">
${row('Betrag', `<strong style="font-size:17px;color:#002856">${chf(o.total)}</strong>`)}
${row('Kontoinhaber', `<strong>${esc(config.bank.holder)}</strong>`)}
${row('IBAN', `<strong>${ibanFormat(config.bank.iban)}</strong>`)}
${row('Bank', esc(config.bank.bank))}
${row('Mitteilung', `<strong>${esc(paymentMessage(o))}</strong>`)}
${row('Zahlbar bis', dateCh(dueDate(o)))}
</table></td></tr></table>
${button(orderLink(o), 'Bestellung &amp; QR-Code ansehen')}
<h2 style="font-family:Georgia,serif;font-weight:normal;font-size:20px;color:#17181c;margin:28px 0 6px">Ihre Bestellung</h2>
${items(o)}${address(o)}
<p>Bei Fragen antworten Sie einfach auf diese E-Mail.</p>${signoff}`);
}

function paid(o: Order): string {
  return layout(`${h1('Zahlung erhalten')}${greeting(o)}
<p>Ihre Zahlung von <strong>${chf(o.total)}</strong> für die Bestellung <strong style="color:#002856">${o.number}</strong> ist bei uns eingegangen. Herzlichen Dank!</p>
<p>Wir bereiten Ihr Paket jetzt vor und informieren Sie, sobald es unterwegs ist.</p>${items(o)}${signoff}`);
}

function shipped(o: Order): string {
  const track = o.tracking
    ? button(trackingUrl(o.tracking), 'Sendung verfolgen') + `<p style="text-align:center;font-size:13px;color:#6c6a64;margin-top:-14px">Sendungsnummer ${esc(o.tracking)}</p>`
    : '';
  return layout(`${h1('Ihr Espresso ist unterwegs')}${greeting(o)}
<p>Ihre Bestellung <strong style="color:#002856">${o.number}</strong> wurde mit der Schweizerischen Post an Sie versendet.</p>
${track}${items(o)}${address(o)}<p>Wir wünschen Ihnen viel Genuss mit Dersut. Buon caffè!</p>${signoff}`);
}

function cancelled(o: Order): string {
  return layout(`${h1('Bestellung storniert')}${greeting(o)}
<p>Ihre Bestellung <strong>${o.number}</strong> wurde storniert. Falls Sie bereits bezahlt haben, erstatten wir den Betrag selbstverständlich vollständig zurück.</p>
<p>Haben Sie Fragen oder möchten Sie erneut bestellen? Antworten Sie einfach auf diese E-Mail.</p>${signoff}`);
}

function adminNew(o: Order): string {
  return layout(`${h1(`Neue Bestellung ${o.number}`)}
<p><strong>${chf(o.total)}</strong> · Vorauskasse · ${dateCh(o.created_at, true)}</p>
${items(o)}${address(o)}
<p style="font-size:14px">E-Mail: ${esc(o.email)}${o.phone ? '<br>Telefon: ' + esc(o.phone) : ''}</p>
${o.note ? `<p style="font-size:14px;background:#f6f2e9;padding:12px 14px"><strong>Bemerkung:</strong><br>${nl2br(o.note)}</p>` : ''}
${button(absUrl(`admin/bestellungen/${o.id}`), 'Im Admin öffnen')}`);
}

export type OrderMailType = 'confirmation' | 'paid' | 'shipped' | 'cancelled' | 'admin';

export async function sendOrderMail(o: Order, type: OrderMailType): Promise<boolean> {
  const map = {
    confirmation: [`Ihre Bestellung ${o.number} – Zahlungsangaben`, confirmation],
    paid: [`Zahlung erhalten – Bestellung ${o.number}`, paid],
    shipped: [`Ihre Bestellung ${o.number} ist unterwegs`, shipped],
    cancelled: [`Bestellung ${o.number} storniert`, cancelled],
    admin: [`Neue Bestellung ${o.number} – ${chf(o.total)}`, adminNew],
  } as const;
  const [subject, tpl] = map[type];
  const toAdmin = type === 'admin';
  return sendMail({
    to: toAdmin ? config.email.orders : o.email,
    subject,
    html: tpl(o),
    replyTo: toAdmin ? o.email : config.email.orders,
  });
}

export function mailTypeForStatus(status: string): OrderMailType {
  return status === 'open' ? 'confirmation' : (status as OrderMailType);
}

export async function sendContactMail(m: { name: string; email: string; phone: string; company: string; topic: string; message: string }) {
  return sendMail({
    to: config.email.contact,
    subject: `Kontaktanfrage: ${m.topic || 'Allgemein'} – ${m.name}`,
    replyTo: m.email,
    html: layout(`${h1(`Kontaktanfrage: ${esc(m.topic || 'Allgemein')}`)}
<p style="font-size:14px"><strong>${esc(m.name)}</strong>${m.company ? ' · ' + esc(m.company) : ''}<br>${esc(m.email)}${m.phone ? ' · ' + esc(m.phone) : ''}</p>
<p style="background:#f6f2e9;padding:16px 18px">${nl2br(m.message)}</p>`),
  });
}

export function testMailHtml(): string {
  return layout(`${h1('Testmail')}<p>Der E-Mail-Versand über Resend funktioniert.</p>`);
}

export { statusLabel };
