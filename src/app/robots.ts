import type { MetadataRoute } from 'next';
import { absUrl } from '@/lib/format';
import { LOCALES, lp } from '@/lib/i18n';

const PRIVATE = ['/kasse', '/warenkorb', '/bestellung/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', ...LOCALES.flatMap((l) => PRIVATE.map((p) => lp(l, p)))] },
    sitemap: absUrl('/sitemap.xml'),
    host: absUrl('/'),
  };
}
