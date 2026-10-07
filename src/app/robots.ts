import type { MetadataRoute } from 'next';
import { absUrl } from '@/lib/format';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/kasse', '/warenkorb', '/bestellung/'] },
    sitemap: absUrl('/sitemap.xml'),
  };
}
