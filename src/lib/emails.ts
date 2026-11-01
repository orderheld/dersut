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

/*
 * Einheitliches E-Mail-Design (Kunden, Admin-Meldungen, Kontaktformular):
 * weisser Kopf mit Dersut-Logo und Art der E-Mail, klare Titel, Angaben als Tabelle,
 * Fuss wie die Signatur (Dersut Kaffee GmbH, Adresse, info@dersut.ch, dersut.ch, MWST).
 */
const NAVY = '#002856';
const GOLD = '#82754F';
const INK = '#17181c';
const TEXT = '#34363d';
const MUTED = '#6c6a64';
const LINE = '#e9e3d4';
const SOFT = '#f7f4ed';
const FONT = 'Arial,Helvetica,sans-serif';
const SERIF = "Georgia,'Times New Roman',serif";

const siteRoot = () => absUrl('/').replace(/\/$/, '');
const siteHost = () => siteRoot().replace(/^https?:\/\//, '').replace(/^www\./, '');

const h1 = (t: string) => `<h1 style="font-family:${SERIF};font-weight:normal;font-size:26px;line-height:32px;color:${NAVY};margin:0 0 14px">${t}</h1>`;
const h2 = (t: string) => `<h2 style="font-family:${FONT};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${GOLD};font-weight:bold;margin:28px 0 8px">${t}</h2>`;
const p = (t: string, style = '') => `<p style="margin:0 0 14px;${style}">${t}</p>`;
const button = (href: string, label: string) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0"><tr><td style="background:${NAVY};border-radius:4px"><a href="${esc(href)}" style="display:inline-block;color:#ffffff;text-decoration:none;padding:13px 24px;font-family:${FONT};font-size:13px;font-weight:bold;letter-spacing:1px;text-transform:uppercase">${label}</a></td></tr></table>`;

/** Angaben als zweispaltige Tabelle (Bezeichnung, Wert); Werte sind bereits HTML. */
function facts(rows: [string, string][], boxed = false): string {
  const tr = rows
    .map(([k, v]) => `<tr><td style="padding:5px 16px 5px 0;color:${MUTED};white-space:nowrap;vertical-align:top">${esc(k)}</td><td style="padding:5px 0;color:${INK};vertical-align:top">${v}</td></tr>`)
    .join('');
  const table = `<table role="presentation" cellpadding="0" cellspacing="0" style="font-family:${FONT};font-size:14px;line-height:20px">${tr}</table>`;
  return boxed
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${SOFT};border-left:3px solid ${GOLD};margin:6px 0 18px"><tr><td style="padding:16px 20px">${table}</td></tr></table>`
    : `<div style="margin:0 0 18px">${table}</div>`;
}

/** Hervorgehobener Textblock, z. B. Bemerkung oder Kopie einer Nachricht. */
const quote = (html: string) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${SOFT};margin:6px 0 18px"><tr><td style="padding:14px 18px;font-size:14px;line-height:21px;color:${TEXT}">${html}</td></tr></table>`;

function layout(body: string, opts: { lang?: Locale; label?: string; preheader?: string } = {}): string {
  const lang = opts.lang ?? 'de';
  const m = getDict(lang).mail;
  const c = config.company;
  const site = siteRoot();
  const contact = [c.phone ? esc(c.phone) : '', `<a href="mailto:${esc(config.email.info)}" style="color:${NAVY};text-decoration:none">${esc(config.email.info)}</a>`, `<a href="${esc(absUrl(lp(lang, '/')))}" style="color:${NAVY};text-decoration:none;font-weight:bold">${esc(siteHost())}</a>`].filter(Boolean).join(' &middot; ');
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="color-scheme" content="light"></head>
<body style="margin:0;padding:0;background:#f3f0e8;font-family:${FONT};color:${TEXT}">
${opts.preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(opts.preheader)}</div>` : ''}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f0e8;padding:24px 10px"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid ${LINE}">
<tr><td style="padding:24px 32px 18px;border-bottom:2px solid ${GOLD}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td style="vertical-align:middle"><a href="${esc(site)}" style="text-decoration:none"><img src="${esc(site)}/mail/dersut-logo.png" width="140" height="23" alt="DERSUT" style="display:block;width:140px;height:23px;border:0;font-family:${SERIF};font-size:22px;letter-spacing:3px;color:${GOLD}"></a></td>
${opts.label ? `<td align="right" style="vertical-align:middle;font-family:${FONT};font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${MUTED}">${esc(opts.label)}</td>` : ''}
</tr></table></td></tr>
<tr><td style="padding:30px 32px 14px;font-family:${FONT};font-size:15px;line-height:23px;color:${TEXT}">${body}</td></tr>
<tr><td style="padding:20px 32px 26px;background:#fbfaf6;border-top:1px solid ${LINE};font-family:${FONT};font-size:12px;line-height:19px;color:${MUTED}">
<strong style="color:${NAVY};font-size:13px">${esc(c.name)}</strong> &middot; ${esc(m.tagline)}<br>
${esc(`${c.street} · ${c.zip} ${c.city} · ${getDict(lang).common.country}`)}<br>
${contact}${c.vatNo ? `<br><span style="font-size:11px">${esc(c.vatNo)}</span>` : ''}
</td></tr></table></td></tr></table></body></html>`;
}

/** Fortschritt der Bestellung: Bestellt, Bezahlt, Versendet. */
function steps(o: Order, lang: Locale): string {
  const names = getDict(lang).mail.steps;
  const done = [true, !!o.paid_at || o.status === 'paid' || o.status === 'shipped', o.status === 'shipped'];
  const cells = names
    .map((n, i) => {
      const on = done[i];
      return `<td width="33%" style="padding:0 2px"><div style="height:4px;background:${on ? NAVY : LINE};border-radius:2px"></div><div style="padding-top:6px;font-size:12px;color:${on ? NAVY : MUTED};${on ? 'font-weight:bold;' : ''}">${on ? '&#10003; ' : ''}${esc(n)}</div></td>`;
    })
    .join('');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:4px 0 22px;font-family:${FONT}"><tr>${cells}</tr></table>`;
}

function items(o: Order, lang: Locale): string {
  const m = getDict(lang).mail;
  const td = `padding:10px 0;border-bottom:1px solid ${LINE};vertical-align:top`;
  const rows = o.items
    .map(
      (it) =>
        `<tr><td style="${td};width:34px;color:${MUTED}">${it.qty}&nbsp;&times;</td><td style="${td}"><strong style="color:${INK}">${esc(it.name)}</strong> <span style="color:${MUTED}">${esc(it.weight)}</span></td><td align="right" style="${td};white-space:nowrap">${chf(it.line_total)}</td></tr>`,
    )
    .join('');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:${FONT};font-size:14px;line-height:20px;margin:0 0 18px">${rows}
<tr><td></td><td style="padding:10px 0;color:${MUTED}">${esc(m.shipping)}</td><td align="right" style="padding:10px 0;white-space:nowrap">${o.shipping ? chf(o.shipping) : esc(m.free)}</td></tr>
<tr><td style="border-top:2px solid ${NAVY}"></td><td style="padding:12px 0 4px;border-top:2px solid ${NAVY};font-weight:bold;color:${INK}">Total</td><td align="right" style="padding:12px 0 4px;border-top:2px solid ${NAVY};font-weight:bold;font-size:17px;color:${NAVY};white-space:nowrap">${chf(o.total)}</td></tr>
<tr><td></td><td colspan="2" align="right" style="font-size:12px;color:${MUTED}">${esc(m.inclVat(o.vat_rate, chf(o.vat_amount)))}</td></tr></table>`;
}

const addressHtml = (o: Order) =>
  [o.company, `${o.first_name} ${o.last_name}`, o.street, `${o.zip} ${o.city}`].filter(Boolean).map((l) => esc(l)).join('<br>');

function address(o: Order, lang: Locale): string {
  return `${h2(esc(getDict(lang).mail.address))}<p style="margin:0 0 18px;font-size:14px;line-height:21px;color:${INK}">${addressHtml(o)}</p>`;
}

/** Eckdaten der Bestellung (Nummer, Datum, Zahlungsart). */
function orderFacts(o: Order, lang: Locale): string {
  const m = getDict(lang).mail;
  return facts([
    [m.orderNo, `<strong style="color:${NAVY}">${esc(o.number)}</strong>`],
    [m.orderDate, dateCh(o.created_at)],
    [m.payMethod, esc(o.payment_method === 'online' ? m.methodOnline : m.methodPrepay)],
  ]);
}

const greeting = (o: Order) => p(esc(getDict(o.lang).mail.hello(`${o.first_name} ${o.last_name}`)));
const signoff = (lang: Locale) => `<p style="margin:22px 0 8px">${esc(getDict(lang).mail.regards)}<br><strong style="color:${NAVY}">${esc(config.company.name)}</strong></p>`;
const questions = (lang: Locale) => p(esc(getDict(lang).mail.questions), `font-size:14px;color:${MUTED}`);

export function orderLink(o: Order): string {
  return absUrl(lp(o.lang, `/bestellung/${o.number}?t=${o.token}`));
}

function confirmation(o: Order): string {
  const L = o.lang;
  const m = getDict(L).mail;
  return layout(`${h1(esc(m.confTitle(o.first_name)))}
${p(m.confIntro(esc(o.number)))}
${steps(o, L)}
${p(m.confPay)}
${h2(esc(m.payDetails))}
${facts([
    [m.amount, `<strong style="font-size:17px;color:${NAVY}">${chf(o.total)}</strong>`],
    [m.holder, `<strong>${esc(config.bank.holder)}</strong>`],
    ['IBAN', `<strong style="white-space:nowrap">${ibanFormat(config.bank.iban)}</strong>`],
    [m.bank, esc(config.bank.bank)],
    [m.message, `<strong>${esc(paymentMessage(o))}</strong>`],
    [m.due, `<strong>${dateCh(dueDate(o))}</strong>`],
  ], true)}
${button(orderLink(o), m.viewOrder)}
${h2(esc(m.yourOrder))}${orderFacts(o, L)}${items(o, L)}${address(o, L)}
${questions(L)}${signoff(L)}`, { lang: L, label: m.labelConf, preheader: `${m.orderNo} ${o.number} · ${chf(o.total)}` });
}

/** Bestellbestätigung für Online-Zahlungen: geht erst raus, wenn Payrexx die Zahlung bestätigt hat. */
function online(o: Order): string {
  const L = o.lang;
  const m = getDict(L).mail;
  return layout(`${h1(esc(m.confTitle(o.first_name)))}
${p(m.confIntro(esc(o.number)))}
${steps(o, L)}
${p(`${m.paidText(chf(o.total), esc(o.number))} ${esc(m.paidNext)}`)}
${button(orderLink(o), m.viewOrderOnly)}
${h2(esc(m.yourOrder))}${orderFacts(o, L)}${items(o, L)}${address(o, L)}
${questions(L)}${signoff(L)}`, { lang: L, label: m.labelConf, preheader: `${m.orderNo} ${o.number} · ${chf(o.total)}` });
}

function paid(o: Order): string {
  const L = o.lang;
  const m = getDict(L).mail;
  return layout(`${h1(esc(m.paidTitle))}${greeting(o)}
${p(m.paidText(chf(o.total), esc(o.number)))}
${steps(o, L)}
${p(esc(m.paidNext))}
${h2(esc(m.yourOrder))}${orderFacts(o, L)}${items(o, L)}
${button(orderLink(o), m.viewOrderOnly)}
${questions(L)}${signoff(L)}`, { lang: L, label: m.labelPaid, preheader: m.paidSubject(o.number) });
}

function shipped(o: Order): string {
  const L = o.lang;
  const m = getDict(L).mail;
  const track = o.tracking
    ? `${facts([[m.trackNo('').replace(/\s+$/, ''), `<strong style="white-space:nowrap">${esc(o.tracking)}</strong>`]], true)}${button(trackingUrl(o.tracking), esc(m.track))}`
    : '';
  return layout(`${h1(esc(m.shippedTitle))}${greeting(o)}
${p(m.shippedText(esc(o.number)))}
${steps(o, L)}
${track}
${h2(esc(m.yourOrder))}${orderFacts(o, L)}${items(o, L)}${address(o, L)}
${p(esc(m.enjoy))}${signoff(L)}`, { lang: L, label: m.labelShipped, preheader: m.shippedSubject(o.number) });
}

function cancelled(o: Order): string {
  const L = o.lang;
  const m = getDict(L).mail;
  return layout(`${h1(esc(m.cancelTitle))}${greeting(o)}
${p(m.cancelText(esc(o.number)))}
${orderFacts(o, L)}
${p(esc(m.cancelMore))}${signoff(L)}`, { lang: L, label: m.labelCancel, preheader: m.cancelSubject(o.number) });
}

const LANG_LABEL: Record<Locale, string> = { de: 'Deutsch', fr: 'Französisch', it: 'Italienisch', en: 'Englisch' };

/** Meldung an info@: neue Bestellung, mit allem, was zum Abarbeiten nötig ist. */
function adminNew(o: Order): string {
  const online = o.payment_method === 'online';
  return layout(`${h1(`Neue Bestellung ${esc(o.number)}`)}
${p(online ? 'Die Zahlung ist online eingegangen. Die Bestellung kann direkt versendet werden.' : 'Vorauskasse: Bitte auf den Zahlungseingang warten, dann im Admin auf «Bezahlt ✓» klicken.')}
${facts([
    ['Total', `<strong style="font-size:17px;color:${NAVY}">${chf(o.total)}</strong>`],
    ['Zahlung', online ? '<strong style="color:#2f6b45">Online bezahlt (Payrexx)</strong>' : `Vorauskasse, Mitteilung <strong>${esc(paymentMessage(o))}</strong>`],
    ['Eingegangen', dateCh(o.created_at, true)],
    ['Sprache', LANG_LABEL[o.lang] ?? o.lang],
  ], true)}
${button(absUrl(`admin/bestellungen/${o.id}`), 'Im Admin öffnen')}
${h2('Artikel')}${items(o, 'de')}
${h2('Kunde und Lieferadresse')}
<p style="margin:0 0 18px;font-size:14px;line-height:21px;color:${INK}">${addressHtml(o)}<br><a href="mailto:${esc(o.email)}" style="color:${NAVY}">${esc(o.email)}</a>${o.phone ? ` &middot; <a href="tel:${esc(o.phone.replace(/[^\d+]/g, ''))}" style="color:${NAVY}">${esc(o.phone)}</a>` : ''}</p>
${o.note ? `${h2('Bemerkung des Kunden')}${quote(nl2br(o.note))}` : ''}`, { label: 'Neue Bestellung', preheader: `${o.number} · ${chf(o.total)} · ${o.first_name} ${o.last_name}` });
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

type ContactMsg = { name: string; email: string; phone: string; company: string; topic: string; message: string };

/**
 * Kontaktformular und Gastro-/Firmenanfrage: Meldung an info@ (Antworten geht direkt an den Absender)
 * und eine Eingangsbestätigung mit Kopie der Nachricht an den Absender.
 */
export async function sendContactMail(msg: ContactMsg, lang: Locale = 'de') {
  const topic = msg.topic || 'Allgemeine Anfrage';
  const internal = layout(`${h1(esc(topic))}
${p('Neue Anfrage über das Formular auf der Webseite. «Antworten» im E-Mail-Programm geht direkt an den Absender, oder im Admin unter Nachrichten beantworten.')}
${facts([
    ['Name', `<strong>${esc(msg.name)}</strong>`],
    ...(msg.company ? [['Firma', esc(msg.company)] as [string, string]] : []),
    ['E-Mail', `<a href="mailto:${esc(msg.email)}" style="color:${NAVY}">${esc(msg.email)}</a>`],
    ...(msg.phone ? [['Telefon', `<a href="tel:${esc(msg.phone.replace(/[^\d+]/g, ''))}" style="color:${NAVY}">${esc(msg.phone)}</a>`] as [string, string]] : []),
    ['Sprache', LANG_LABEL[lang] ?? lang],
  ], true)}
${h2('Nachricht')}${quote(nl2br(msg.message))}
${button(absUrl('admin/nachrichten'), 'Im Admin beantworten')}`, { label: 'Neue Anfrage', preheader: `${msg.name}: ${msg.message.slice(0, 90)}` });

  const m = getDict(lang).mail;
  const confirm = layout(`${h1(esc(m.contactTitle))}
${p(esc(getDict(lang).mail.hello(msg.name)))}
${p(esc(m.contactText))}
${h2(esc(m.contactCopy))}
${facts([[m.topic, esc(topic)]])}
${quote(nl2br(msg.message))}
${signoff(lang)}`, { lang, label: m.labelContact, preheader: m.contactText });

  const [r] = await Promise.all([
    sendMail({ to: config.email.contact, subject: `${topic}: ${msg.name}${msg.company ? `, ${msg.company}` : ''}`, replyTo: msg.email, html: internal }),
    sendMail({ to: msg.email, subject: m.contactSubject, replyTo: config.email.contact, html: confirm }),
  ]);
  return r;
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
<tr><td colspan="2" style="padding-top:12px;font-size:10px;line-height:14px;color:#8a8c93;">Offizieller Vertrieb von Dersut Caff&egrave; in der Schweiz${c.vatNo ? ` &middot; ${esc(c.vatNo)}` : ''}</td></tr>
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
<p style="font-size:13px;color:#6c6a64">Haben Sie das nicht angefordert? Dann ignorieren Sie diese E-Mail einfach, Ihr Passwort bleibt unverändert.</p>`, { label: 'Admin' });
}

export function testMailHtml(): string {
  return layout(`${h1('Testmail')}${p('Der E-Mail-Versand über Resend funktioniert. So sehen alle E-Mails des Shops aus.')}`, { label: 'Admin' });
}

export { statusLabel };
