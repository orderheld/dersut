import 'server-only';
import { config } from './config';
import { absUrl, chf, companyAddressLines, dateCh, ibanFormat, statusLabel, trackingUrl } from './format';
import type { Order } from './orders';
import { dueDate, paymentMessage } from './orders-shared';
import { deliverMail, sendMail, type MailResult } from './mail';
import { getDict } from '@/i18n';
import { lp, type Locale } from './i18n';

const esc = (s: string | number) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const nl2br = (s: string) => esc(s).replace(/\n/g, '<br>');

const h1 = (t: string) => `<h1 style="font-family:Georgia,serif;font-weight:normal;font-size:28px;color:#17181c;margin:0 0 14px">${t}</h1>`;
const button = (href: string, label: string) =>
  `<p style="text-align:center;margin:26px 0"><a href="${esc(href)}" style="display:inline-block;background:#002856;color:#ffffff;text-decoration:none;padding:14px 26px;font-size:13px;letter-spacing:1.5px;text-transform:uppercase">${label}</a></p>`;

function layout(body: string, lang: Locale = 'de'): string {
  const m = getDict(lang).mail;
  const addr = companyAddressLines(getDict(lang).common.country).slice(1).join(' · ');
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#f6f2e9;font-family:Helvetica,Arial,sans-serif;color:#34363d">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f2e9;padding:28px 12px"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff">
<tr><td style="background:#002856;padding:26px 36px">
<span style="font-family:Georgia,'Times New Roman',serif;font-size:26px;letter-spacing:4px;color:#ffffff">DERSUT</span>
<span style="font-family:Georgia,serif;font-style:italic;font-size:14px;color:#b9aa80;padding-left:6px">caffè · Schweiz</span>
</td></tr>
<tr><td style="padding:36px 36px 10px;font-size:15px;line-height:1.6">${body}</td></tr>
<tr><td style="padding:24px 36px 34px;font-size:12.5px;line-height:1.6;color:#6c6a64;border-top:1px solid #eee8da">
${esc(config.company.name)} · ${esc(m.tagline)}<br>${esc(addr)}<br>
<a href="mailto:${config.email.orders}" style="color:#002856">${config.email.orders}</a> · <a href="${esc(absUrl(lp(lang, '/')))}" style="color:#002856">${config.primaryHost}</a>
</td></tr></table></td></tr></table></body></html>`;
}

function items(o: Order, lang: Locale): string {
  const m = getDict(lang).mail;
  const rows = o.items
    .map(
      (it) =>
        `<tr><td style="padding:9px 0;border-bottom:1px solid #eee8da">${it.qty} × ${esc(it.name)} <span style="color:#6c6a64">${esc(it.weight)}</span></td><td align="right" style="padding:9px 0;border-bottom:1px solid #eee8da">${chf(it.line_total)}</td></tr>`,
    )
    .join('');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;margin:8px 0 20px">${rows}
<tr><td style="padding:9px 0">${esc(m.shipping)}</td><td align="right" style="padding:9px 0">${o.shipping ? chf(o.shipping) : esc(m.free)}</td></tr>
<tr><td style="padding:12px 0;border-top:2px solid #002856;font-weight:bold;color:#17181c">Total</td><td align="right" style="padding:12px 0;border-top:2px solid #002856;font-weight:bold;font-size:17px;color:#002856">${chf(o.total)}</td></tr>
<tr><td colspan="2" align="right" style="font-size:12px;color:#6c6a64">${esc(m.inclVat(o.vat_rate, chf(o.vat_amount)))}</td></tr></table>`;
}

function address(o: Order, lang: Locale): string {
  return `<p style="font-size:14px;margin:0 0 20px"><strong style="color:#17181c">${esc(getDict(lang).mail.address)}</strong><br>
${o.company ? esc(o.company) + '<br>' : ''}${esc(`${o.first_name} ${o.last_name}`)}<br>${esc(o.street)}<br>${esc(`${o.zip} ${o.city}`)}</p>`;
}

const greeting = (o: Order) => `<p>${esc(getDict(o.lang).mail.hello(`${o.first_name} ${o.last_name}`))}</p>`;
const signoff = (lang: Locale) => `<p>${esc(getDict(lang).mail.regards)}<br>${esc(config.company.name)}</p>`;

export function orderLink(o: Order): string {
  return absUrl(lp(o.lang, `/bestellung/${o.number}?t=${o.token}`));
}

function confirmation(o: Order): string {
  const L = o.lang;
  const m = getDict(L).mail;
  const row = (k: string, v: string) => `<tr><td style="padding:3px 18px 3px 0;color:#6c6a64">${esc(k)}</td><td>${v}</td></tr>`;
  return layout(`${h1(esc(m.confTitle(o.first_name)))}
<p>${m.confIntro(esc(o.number))}</p>
<p>${m.confPay}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f2e9;border-left:4px solid #82754F;margin:22px 0;font-size:14px"><tr><td style="padding:20px 22px">
<div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#82754F;font-weight:bold;margin-bottom:10px">${esc(m.payDetails)}</div>
<table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px">
${row(m.amount, `<strong style="font-size:17px;color:#002856">${chf(o.total)}</strong>`)}
${row(m.holder, `<strong>${esc(config.bank.holder)}</strong>`)}
${row('IBAN', `<strong>${ibanFormat(config.bank.iban)}</strong>`)}
${row(m.bank, esc(config.bank.bank))}
${row(m.message, `<strong>${esc(paymentMessage(o))}</strong>`)}
${row(m.due, dateCh(dueDate(o)))}
</table></td></tr></table>
${button(orderLink(o), m.viewOrder)}
<h2 style="font-family:Georgia,serif;font-weight:normal;font-size:20px;color:#17181c;margin:28px 0 6px">${esc(m.yourOrder)}</h2>
${items(o, L)}${address(o, L)}
<p>${esc(m.questions)}</p>${signoff(L)}`, L);
}

/** Bestellbestätigung für Online-Zahlungen: geht erst raus, wenn Payrexx die Zahlung bestätigt hat. */
function online(o: Order): string {
  const L = o.lang;
  const m = getDict(L).mail;
  return layout(`${h1(esc(m.confTitle(o.first_name)))}
<p>${m.confIntro(esc(o.number))}</p>
<p>${m.paidText(chf(o.total), esc(o.number))} ${esc(m.paidNext)}</p>
${button(orderLink(o), m.viewOrderOnly)}
<h2 style="font-family:Georgia,serif;font-weight:normal;font-size:20px;color:#17181c;margin:28px 0 6px">${esc(m.yourOrder)}</h2>
${items(o, L)}${address(o, L)}
<p>${esc(m.questions)}</p>${signoff(L)}`, L);
}

function paid(o: Order): string {
  const L = o.lang;
  const m = getDict(L).mail;
  return layout(`${h1(esc(m.paidTitle))}${greeting(o)}
<p>${m.paidText(chf(o.total), esc(o.number))}</p>
<p>${esc(m.paidNext)}</p>${items(o, L)}${signoff(L)}`, L);
}

function shipped(o: Order): string {
  const L = o.lang;
  const m = getDict(L).mail;
  const track = o.tracking
    ? button(trackingUrl(o.tracking), esc(m.track)) + `<p style="text-align:center;font-size:13px;color:#6c6a64;margin-top:-14px">${esc(m.trackNo(o.tracking))}</p>`
    : '';
  return layout(`${h1(esc(m.shippedTitle))}${greeting(o)}
<p>${m.shippedText(esc(o.number))}</p>
${track}${items(o, L)}${address(o, L)}<p>${esc(m.enjoy)}</p>${signoff(L)}`, L);
}

function cancelled(o: Order): string {
  const L = o.lang;
  const m = getDict(L).mail;
  return layout(`${h1(esc(m.cancelTitle))}${greeting(o)}
<p>${m.cancelText(esc(o.number))}</p>
<p>${esc(m.cancelMore)}</p>${signoff(L)}`, L);
}

const LANG_LABEL: Record<Locale, string> = { de: 'Deutsch', fr: 'Französisch', it: 'Italienisch', en: 'Englisch' };

function adminNew(o: Order): string {
  return layout(`${h1(`Neue Bestellung ${o.number}`)}
<p><strong>${chf(o.total)}</strong> · ${o.payment_method === 'online' ? 'Online bezahlt (Payrexx)' : 'Vorauskasse'} · ${dateCh(o.created_at, true)} · Sprache: ${LANG_LABEL[o.lang] ?? o.lang}</p>
${items(o, 'de')}${address(o, 'de')}
<p style="font-size:14px">E-Mail: ${esc(o.email)}${o.phone ? '<br>Telefon: ' + esc(o.phone) : ''}</p>
${o.note ? `<p style="font-size:14px;background:#f6f2e9;padding:12px 14px"><strong>Bemerkung:</strong><br>${nl2br(o.note)}</p>` : ''}
${button(absUrl(`admin/bestellungen/${o.id}`), 'Im Admin öffnen')}`);
}

export type OrderMailType = 'confirmation' | 'online' | 'paid' | 'shipped' | 'cancelled' | 'admin';

export async function sendOrderMail(o: Order, type: OrderMailType): Promise<MailResult> {
  const m = getDict(o.lang).mail;
  const map = {
    confirmation: [m.confSubject(o.number), confirmation],
    online: [m.onlineSubject(o.number), online],
    paid: [m.paidSubject(o.number), paid],
    shipped: [m.shippedSubject(o.number), shipped],
    cancelled: [m.cancelSubject(o.number), cancelled],
    admin: [`Neue Bestellung ${o.number} – ${chf(o.total)}${o.payment_method === 'online' ? ' (online bezahlt)' : ''}`, adminNew],
  } as const;
  const [subject, tpl] = map[type];
  const toAdmin = type === 'admin';
  return deliverMail({
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

/** Antwort bzw. neue E-Mail aus dem Admin-Postfach: eigener Text, darunter optional die ursprüngliche Nachricht. */
/**
 * HTML-Signatur für E-Mails aus dem Admin (wie /mnt/project-files/signatur): Logo, Person, Firma, Kontakt.
 * Der Webseiten-Link führt auf die Hauptadresse dersut.ch.
 */
export function signatureHtml(): string {
  const c = config.company;
  const site = absUrl('/').replace(/\/$/, '');
  const tel = c.phone.replace(/[^\d+]/g, '');
  return `<p style="margin:0 0 14px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:19px;color:#34363d;">Freundliche Gr&uuml;sse</p>
<table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;color:#34363d;font-size:13px;line-height:19px;">
<tr><td style="padding:0 18px 0 0;vertical-align:middle;border-right:2px solid #82754F;">
<a href="${esc(site)}" style="text-decoration:none;"><img src="${esc(site)}/mail/dersut-logo.png" width="150" height="24" alt="DERSUT" style="display:block;width:150px;height:24px;border:0;"></a>
<div style="font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:12px;line-height:16px;color:#82754F;padding-top:6px;">Espresso aus Conegliano seit 1947</div>
</td><td style="padding:0 0 0 18px;vertical-align:middle;">
<div style="font-family:Georgia,'Times New Roman',serif;font-size:17px;line-height:22px;font-weight:bold;color:#002856;">${esc(c.name)}</div>
<div style="font-size:12px;line-height:18px;color:#82754F;letter-spacing:0.5px;padding-bottom:6px;">Dersut Caff&egrave; Schweiz</div>
<div>${esc(`${c.street}, ${c.zip} ${c.city}, Schweiz`)}</div>
${c.phone ? `<div style="padding-top:6px;"><span style="color:#82754F;">T</span>&nbsp;&nbsp;<a href="tel:${esc(tel)}" style="color:#34363d;text-decoration:none;">${esc(c.phone)}</a></div>` : '<div style="padding-top:6px;"></div>'}
<div><span style="color:#82754F;">E</span>&nbsp;&nbsp;<a href="mailto:${esc(config.email.info)}" style="color:#34363d;text-decoration:none;">${esc(config.email.info)}</a></div>
<div><span style="color:#82754F;">W</span>&nbsp;&nbsp;<a href="${esc(site)}" style="color:#002856;text-decoration:none;font-weight:bold;">dersut.ch</a></div>
</td></tr>
<tr><td colspan="2" style="padding-top:12px;font-size:10px;line-height:14px;color:#8a8c93;">Offizieller Vertrieb von Dersut Caff&egrave; in der Schweiz${c.uid ? ` &middot; MWST ${esc(c.uid)}` : ''}</td></tr>
</table>`;
}

/** Antwort bzw. neue E-Mail aus dem Admin-Postfach: wie eine persönliche E-Mail, mit Signatur und optional der ursprünglichen Nachricht. */
export function adminMailHtml(body: string, opts: { signature?: boolean; quote?: { name: string; date: string; text: string } } = {}): string {
  const q = opts.quote
    ? `<div style="margin-top:26px;padding:12px 16px;border-left:3px solid #d8cfb8;color:#6c6a64;font-size:13.5px">
<div style="margin-bottom:6px">${esc(opts.quote.name)} schrieb am ${esc(opts.quote.date)}:</div>${nl2br(opts.quote.text)}</div>`
    : '';
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:16px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:21px;color:#34363d;background:#ffffff">
<div style="max-width:640px">${nl2br(body)}</div>
${opts.signature ? `<div style="margin-top:22px">${signatureHtml()}</div>` : ''}
${q}
</body></html>`;
}

export function resetMailHtml(link: string): string {
  return layout(`${h1('Passwort neu setzen')}
<p>Für den Admin-Bereich von dersut.ch wurde ein neues Passwort angefordert. Der Link ist 30 Minuten gültig und funktioniert nur einmal.</p>
${button(link, 'Neues Passwort setzen')}
<p style="font-size:13px;color:#6c6a64">Haben Sie das nicht angefordert? Dann ignorieren Sie diese E-Mail einfach, Ihr Passwort bleibt unverändert.</p>`);
}

export function testMailHtml(): string {
  return layout(`${h1('Testmail')}<p>Der E-Mail-Versand über Resend funktioniert.</p>`);
}

export { statusLabel };
