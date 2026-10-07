import 'server-only';
import QRCode from 'qrcode';
import { config } from './config';
import type { Order } from './orders';
import { paymentMessage } from './orders-shared';

/**
 * Swiss-QR-Code (QR-Rechnung, Version 0200) als SVG.
 * Gibt null zurück, solange die Firmenadresse in config.ts nicht vollständig ist
 * (die Empfängeradresse ist im Standard Pflicht).
 */
export async function swissQrSvg(o: Order): Promise<string | null> {
  const c = config.company;
  if (!c.street || !c.zip || !c.city) return null;
  const clean = (s: string, max: number) => s.replace(/\s+/g, ' ').trim().slice(0, max);
  const debtor = clean(`${o.company ? o.company + ', ' : ''}${o.first_name} ${o.last_name}`, 70);
  const payload = [
    'SPC', '0200', '1',
    config.bank.iban.replace(/\s+/g, '').toUpperCase(),
    'S', clean(config.bank.holder, 70), clean(c.street, 70), '', clean(c.zip, 16), clean(c.city, 35), 'CH',
    '', '', '', '', '', '', '',
    (o.total / 100).toFixed(2), 'CHF',
    'S', debtor, clean(o.street, 70), '', clean(o.zip, 16), clean(o.city, 35), 'CH',
    'NON', '',
    clean(paymentMessage(o), 140),
    'EPD',
  ].join('\n');

  const qr = QRCode.create(payload, { errorCorrectionLevel: 'M' });
  const n = qr.modules.size;
  const size = 46;
  const cell = size / n;
  let path = '';
  for (let r = 0; r < n; r++) {
    for (let col = 0; col < n; col++) {
      if (qr.modules.get(r, col)) path += `M${(col * cell).toFixed(4)} ${(r * cell).toFixed(4)}h${cell.toFixed(4)}v${cell.toFixed(4)}h-${cell.toFixed(4)}z`;
    }
  }
  // Schweizerkreuz 7 × 7 mm in der Mitte
  const cross =
    '<rect x="19.5" y="19.5" width="7" height="7" fill="#fff"/><rect x="20" y="20" width="6" height="6" fill="#000"/>' +
    '<rect x="22.4" y="21.1" width="1.2" height="3.8" fill="#fff"/><rect x="21.1" y="22.4" width="3.8" height="1.2" fill="#fff"/>';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 46" shape-rendering="crispEdges" role="img" aria-label="Swiss QR-Code für die Zahlung"><rect width="46" height="46" fill="#fff"/><path d="${path}" fill="#000"/>${cross}</svg>`;
}
