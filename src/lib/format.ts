import { config } from './config';

export function chf(rappen: number, withCurrency = true): string {
  const s = (rappen / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '’');
  return withCurrency ? `CHF ${s}` : s;
}

export function toRappen(v: string): number {
  const n = parseFloat(String(v).replace(/[^\d.,-]/g, '').replace(',', '.'));
  return Number.isFinite(n) ? Math.round(n * 100) : 0;
}

const tz = 'Europe/Zurich';

export function dateCh(d: Date | string | null | undefined, withTime = false): string {
  if (!d) return '–';
  const date = new Date(d);
  const opts: Intl.DateTimeFormatOptions = { timeZone: tz, day: '2-digit', month: '2-digit', year: 'numeric' };
  if (withTime) Object.assign(opts, { hour: '2-digit', minute: '2-digit' });
  return new Intl.DateTimeFormat('de-CH', opts).format(date);
}

export function ibanFormat(iban: string): string {
  return iban.replace(/\s+/g, '').toUpperCase().replace(/(.{4})/g, '$1 ').trim();
}

export function vatFromGross(gross: number, rate: number): number {
  return Math.round((gross * rate) / (100 + rate));
}

export function slugify(s: string): string {
  return (
    s
      .toLowerCase()
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/[èé]/g, 'e').replace(/à/g, 'a')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'produkt'
  );
}

export function companyAddressLines(country = 'Schweiz'): string[] {
  const c = config.company;
  const lines = [c.name];
  if (c.co) lines.push(c.co);
  if (c.street) lines.push(c.street);
  if (c.zip || c.city) lines.push(`${c.zip} ${c.city}`.trim());
  lines.push(country);
  return lines;
}

export const STATUS_LABELS: Record<string, string> = {
  open: 'Zahlung ausstehend',
  paid: 'Bezahlt',
  shipped: 'Versendet',
  cancelled: 'Storniert',
};

export function statusLabel(s: string): string {
  return STATUS_LABELS[s] ?? s;
}

export function trackingUrl(tracking: string): string {
  return 'https://service.post.ch/ekp-web/ui/entry/shipping/1/?formattedParcelCodes=' + encodeURIComponent(tracking);
}

export function absUrl(path = '/'): string {
  return config.siteUrl.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
}
