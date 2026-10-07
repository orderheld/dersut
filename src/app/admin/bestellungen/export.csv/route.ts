import { currentAdmin } from '@/lib/auth';
import { query } from '@/lib/db';
import { statusLabel } from '@/lib/format';

export const dynamic = 'force-dynamic';

const fmtDate = (d: Date | string | null) =>
  d ? new Intl.DateTimeFormat('de-CH', { timeZone: 'Europe/Zurich', dateStyle: 'short', timeStyle: 'short' }).format(new Date(d)) : '';

export async function GET() {
  if (!(await currentAdmin())) return new Response('Nicht angemeldet', { status: 401 });
  const rows = await query(`
    SELECT o.*, (SELECT string_agg(i.qty || ' x ' || i.name, ', ' ORDER BY i.id) FROM order_items i WHERE i.order_id = o.id) AS artikel
    FROM orders o ORDER BY o.id DESC`);
  const head = ['Bestellnummer', 'Datum', 'Status', 'Anrede', 'Vorname', 'Nachname', 'Firma', 'Strasse', 'PLZ', 'Ort', 'E-Mail', 'Telefon',
    'Artikel', 'Zwischensumme', 'Versand', 'Total', 'MWST', 'Bezahlt am', 'Versendet am', 'Sendungsnummer', 'Bemerkung'];
  const cell = (v: unknown) => {
    let s = String(v ?? '');
    if (/^[=+\-@]/.test(s)) s = "'" + s; // Formel-Injection in Excel verhindern
    return /[;"\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const money = (r: number) => (Number(r) / 100).toFixed(2);
  const lines = rows.map((o) =>
    [o.number, fmtDate(o.created_at), statusLabel(o.status), o.salutation, o.first_name, o.last_name, o.company, o.street, o.zip, o.city,
      o.email, o.phone, o.artikel, money(o.subtotal), money(o.shipping), money(o.total), money(o.vat_amount), fmtDate(o.paid_at),
      fmtDate(o.shipped_at), o.tracking, o.note].map(cell).join(';'),
  );
  const csv = '﻿' + [head.join(';'), ...lines].join('\r\n');
  const date = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="dersut-bestellungen-${date}.csv"`,
      'Cache-Control': 'no-store',
    },
  });
}
