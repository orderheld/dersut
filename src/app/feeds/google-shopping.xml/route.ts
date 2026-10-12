import { productImage } from '@/lib/brand';
import { config } from '@/lib/config';
import { asLocale, lp, LOCALE_TAGS } from '@/lib/i18n';
import { getProducts, isSoldOut } from '@/lib/products';
import { absolute } from '@/lib/seo';
import { getDict } from '@/i18n';

/**
 * Produktfeed für das Google Merchant Center (kostenlose Einträge in Google Shopping).
 * URL: /feeds/google-shopping.xml (Deutsch), ?lang=fr|it|en für weitere Sprachen.
 */
export const revalidate = 3600;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const money = (rappen: number) => `${(rappen / 100).toFixed(2)} CHF`;

export async function GET(req: Request) {
  const lang = asLocale(new URL(req.url).searchParams.get('lang') ?? 'de');
  const products = await getProducts(true, lang);
  const ship = config.shop.shipping, free = config.shop.freeShippingFrom;
  const items = products
    .map((p) => {
      const images = p.images.map(productImage).filter(Boolean);
      const shipping = p.price >= free ? 0 : ship;
      return `    <item>
      <g:id>${esc(p.slug)}</g:id>
      <g:item_group_id>${esc(p.line || p.slug)}</g:item_group_id>
      <title>${esc(`${p.name} ${p.subtitle}`)}</title>
      <description>${esc(p.description)}</description>
      <link>${esc(absolute(lp(lang, `/shop/${p.slug}`)))}</link>
      <g:image_link>${esc(images[0] ?? '')}</g:image_link>
${images.slice(1, 10).map((i) => `      <g:additional_image_link>${esc(i)}</g:additional_image_link>`).join('\n')}
      <g:availability>${isSoldOut(p) ? 'out_of_stock' : 'in_stock'}</g:availability>
      <g:price>${money(p.price)}</g:price>
      <g:brand>Dersut Caffè</g:brand>
      <g:condition>new</g:condition>
      <g:identifier_exists>no</g:identifier_exists>
      <g:google_product_category>1868</g:google_product_category>
      <g:product_type>${esc(`${getDict(lang).nav.shop} > ${p.subtitle}`)}</g:product_type>
      <g:unit_pricing_measure>1000g</g:unit_pricing_measure>
      <g:unit_pricing_base_measure>1kg</g:unit_pricing_base_measure>
      <g:shipping_weight>1.1 kg</g:shipping_weight>
      <g:shipping>
        <g:country>CH</g:country>
        <g:service>Post CH</g:service>
        <g:price>${money(shipping)}</g:price>
        <g:min_handling_time>1</g:min_handling_time>
        <g:max_handling_time>2</g:max_handling_time>
        <g:min_transit_time>1</g:min_transit_time>
        <g:max_transit_time>2</g:max_transit_time>
      </g:shipping>
    </item>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${esc(getDict(lang).meta.siteName)}</title>
    <link>${esc(absolute(lp(lang, '/')))}</link>
    <description>${esc(getDict(lang).meta.defaultDescription)}</description>
    <language>${LOCALE_TAGS[lang]}</language>
${items}
  </channel>
</rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
