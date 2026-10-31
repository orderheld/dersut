import { getOrderByNumber } from '@/lib/orders';
import { syncOnlinePayment } from '@/lib/payment';

export const dynamic = 'force-dynamic';

/**
 * Webhook von Payrexx (im Payrexx-Konto unter Webhooks eintragen: https://dersutkaffee.ch/api/payrexx).
 * Der Inhalt dient nur als Hinweis, welche Bestellung betroffen ist: Den Zahlungsstatus fragen wir
 * danach selbst bei Payrexx ab. So kann ein gefälschter Aufruf keine Bestellung als bezahlt markieren.
 */
export async function POST(req: Request) {
  const raw = await req.text();
  let refs: string[] = [];
  try {
    const j = JSON.parse(raw);
    const t = j?.transaction ?? {};
    refs = [t.referenceId, t.invoice?.referenceId];
  } catch {
    // Format «Normal (PHP-Post)»: transaction[referenceId]=…
    const p = new URLSearchParams(raw);
    refs = [p.get('transaction[referenceId]'), p.get('transaction[invoice][referenceId]')].map(String);
  }
  const number = refs.map((r) => String(r ?? '').trim()).find((r) => /^[A-Z]+-\d{2}-\d{4,}$/.test(r));
  if (number) {
    const o = await getOrderByNumber(number);
    if (o) await syncOnlinePayment(o);
  }
  return Response.json({ ok: true });
}
