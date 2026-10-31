import 'server-only';
import { config } from './config';
import { sendOrderMail } from './emails';
import { absUrl, chf } from './format';
import { lp } from './i18n';
import { addLog, getOrder, markPaidOnce, setPaymentMethod, type Order } from './orders';
import { createGateway, getGateway, isPaid } from './payrexx';
import { notifyAdmins } from './push';

const orderPath = (o: Order, extra = '') => absUrl(lp(o.lang, `/bestellung/${o.number}?t=${o.token}${extra}`));

/** Bestätigung, Admin-Mail und Push für eine neue Vorauskasse-Bestellung. */
export async function announcePrepayOrder(o: Order): Promise<void> {
  const [conf, admin] = await Promise.all([
    sendOrderMail(o, 'confirmation'),
    sendOrderMail(o, 'admin'),
    notifyAdmins({
      title: `Neue Bestellung ${o.number}`,
      body: `${o.first_name} ${o.last_name}, ${o.city} · ${chf(o.total)}`,
      url: `/admin/bestellungen/${o.id}`,
      tag: `order-${o.id}`,
    }),
  ]);
  await addLog(o.id, conf.ok ? `Bestätigung an ${o.email} gesendet.` : `Bestätigung an ${o.email} konnte nicht gesendet werden (${conf.error}).`);
  if (!admin.ok) await addLog(o.id, `Benachrichtigung an ${config.email.orders} konnte nicht gesendet werden (${admin.error}).`);
}

/**
 * Link zur Payrexx-Zahlungsseite. Ein noch offener Zahlungslink wird wiederverwendet,
 * sonst (abgebrochen, abgelaufen) wird ein neuer erstellt.
 */
export async function onlinePayLink(o: Order): Promise<string> {
  if (o.payrexx_gateway_id) {
    try {
      const g = await getGateway(o.payrexx_gateway_id);
      if (g.status === 'waiting' && g.link && g.amount === o.total) return g.link;
    } catch {
      // gelöscht oder nicht mehr abrufbar: neuen Link erstellen
    }
  }
  const g = await createGateway(o, {
    success: orderPath(o, '&zahlung=ok'),
    failed: orderPath(o, '&zahlung=fehler'),
    cancel: orderPath(o, '&zahlung=abbruch'),
  });
  await setPaymentMethod(o.id, 'online', g.id);
  return g.link;
}

/** Bei Payrexx nachfragen, ob eine offene Online-Bestellung bezahlt ist. Bei der ersten Bestätigung gehen Mails und Push raus. */
export async function syncOnlinePayment(o: Order): Promise<Order> {
  if (o.payment_method !== 'online' || o.status !== 'open' || !o.payrexx_gateway_id) return o;
  let g;
  try {
    g = await getGateway(o.payrexx_gateway_id);
  } catch (e) {
    console.error('Payrexx-Abfrage fehlgeschlagen:', e);
    return o;
  }
  if (!isPaid(g, o)) return o;
  if (!(await markPaidOnce(o.id, `Online-Zahlung über Payrexx bestätigt (${chf(o.total)}, Zahlungslink ${g.id}).`))) return (await getOrder(o.id)) ?? o;
  const paid = (await getOrder(o.id))!;
  const [conf, admin] = await Promise.all([
    sendOrderMail(paid, 'online'),
    sendOrderMail(paid, 'admin'),
    notifyAdmins({
      title: `Neue Bestellung ${paid.number} (bezahlt)`,
      body: `${paid.first_name} ${paid.last_name}, ${paid.city} · ${chf(paid.total)} online bezahlt`,
      url: `/admin/bestellungen/${paid.id}`,
      tag: `order-${paid.id}`,
    }),
  ]);
  await addLog(paid.id, conf.ok ? `Bestätigung an ${paid.email} gesendet.` : `Bestätigung an ${paid.email} konnte nicht gesendet werden (${conf.error}).`);
  if (!admin.ok) await addLog(paid.id, `Benachrichtigung an ${config.email.orders} konnte nicht gesendet werden (${admin.error}).`);
  return paid;
}
