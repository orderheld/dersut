import manifest from './brand-manifest.json';

/**
 * Offizielle Bildmaterialien von Dersut Caffè S.p.A. (dersut.it).
 * `npm run fetch-assets` lädt sie nach public/brand/ und trägt sie in brand-manifest.json ein.
 * Danach liefert die Webseite die lokalen Kopien aus, sonst die Originale von dersut.it.
 */
export const BRAND_ASSETS = {
  logo: 'https://www.dersut.it/media/55/13/21/1707408531/dersut.png',
  hero_1: 'https://www.dersut.it/media/0f/b8/e5/1715271479/02-ABC-Dersut.jpg',
  img_1: 'https://www.dersut.it/media/fd/2d/ee/1699978610/dersut-img-1.jpg',
  img_2: 'https://www.dersut.it/media/6b/61/7d/1699978610/dersut-img-2.jpg',
  img_3: 'https://www.dersut.it/media/e7/82/84/1699978610/dersut-img-3.jpg',
  img_4: 'https://www.dersut.it/media/d8/2e/bd/1699978610/dersut-img-4.jpg',
  macchina: 'https://www.dersut.it/media/8b/96/bb/1699980496/macchina-caffe.jpg',
  tazze: 'https://www.dersut.it/media/48/52/27/1699980495/tazze-caffe.jpg',
  storia: 'https://www.dersut.it/media/08/28/fa/1699980496/dersut-caffe-storia.jpg',
  museo: 'https://www.dersut.it/media/ce/f9/19/1699980496/museo-dersut-2005.jpg',
  vincenzo: 'https://www.dersut.it/media/b9/14/8c/1700039855/vincenzo-dersut.jpg',
  famiglia: 'https://www.dersut.it/media/86/89/71/1700039855/desktop-famiglia.jpg',
  nuova_sede: 'https://www.dersut.it/media/11/a6/4d/1732699197/2024-nuova-sede%20%281%29.jpg',
  fiori: 'https://www.dersut.it/media/4d/2b/79/1700039855/fiori-caffe.jpg',
  history_0: 'https://www.dersut.it/media/a9/46/55/1734604411/history-img-0.jpg',
  history_1: 'https://www.dersut.it/media/58/98/2f/1700039854/history-img-1.jpg',
  history_2: 'https://www.dersut.it/media/ed/7c/1e/1700039855/history-img-2.jpg',
  history_3: 'https://www.dersut.it/media/4a/07/31/1700039855/history-img-3.jpg',
  history_4: 'https://www.dersut.it/media/20/a2/77/1700039855/history-img-4.jpg',
  history_5: 'https://www.dersut.it/media/86/39/dd/1700039854/history-img-5.jpg',
  history_6: 'https://www.dersut.it/media/62/5f/48/1700039854/history-img-6.jpg',
  history_7: 'https://www.dersut.it/media/0a/fe/6f/1700039855/history-img-7.jpg',
  caffe: 'https://www.dersut.it/media/4c/3a/6b/1700066779/caffe.jpg',
  tostatura: 'https://www.dersut.it/media/01/13/3f/1700066778/tosatura-caffe.jpg',
  selezione: 'https://www.dersut.it/media/93/52/2c/1700066778/selezione-caffe.jpg',
  foglie: 'https://www.dersut.it/media/4c/6d/81/1699980496/foglie-con-chicchi-caffe.png',
  premio_sole: 'https://www.dersut.it/media/fa/f4/0f/1761649571/premio-sole24ore-2025.png',
  cert_gitc: 'https://www.dersut.it/media/bf/d1/be/1699980508/cer1.jpg',
  cert_legalita: 'https://www.dersut.it/media/52/a1/5f/1699980508/cer2.jpg',
  cert_confind: 'https://www.dersut.it/media/cd/3a/2a/1714471504/cer3.jpg',
  cert_comisso: 'https://www.dersut.it/media/1c/5f/db/1699980508/cer4.jpg',
  cert_aidaf: 'https://www.dersut.it/media/a0/87/6e/1699980508/cer5.jpg',
  cert_consorzio: 'https://www.dersut.it/media/62/03/7c/1699980508/cer6.jpg',
  cert_iei: 'https://www.dersut.it/media/78/bc/1c/1699980508/cer7.jpg',
  cert_camaleonte: 'https://www.dersut.it/media/9e/78/b8/1749629941/cer8v2.jpg',
  cert_gold: 'https://www.dersut.it/media/26/f2/5b/1699980508/cer9.jpg',
  cert_sca: 'https://www.dersut.it/media/e8/6e/ac/1699980508/cer10.jpg',
  cert_villani: 'https://www.dersut.it/media/60/2f/0b/1699980508/cer11.jpg',
  cert_csr: 'https://www.dersut.it/media/fa/30/3e/1699980508/cer12.jpg',
  cert_sole24: 'https://www.dersut.it/media/ca/0a/05/1761577339/PIS2025-Sole24.jpg',
  cert_best: 'https://www.dersut.it/media/5d/e4/33/1761577329/Best-Performer-2025.jpg',
  prod_optimum: 'https://www.dersut.it/media/45/f2/2f/1705477721/Grani%20Optimum%20SP.jpg',
  prod_domus: 'https://www.dersut.it/media/87/43/b9/1705477319/Grani%20Domus%20OS.jpg',
} as const;

export type BrandKey = keyof typeof BRAND_ASSETS;

const local = manifest as Record<string, string>;

export function brand(key: BrandKey): string {
  return local[key] ?? BRAND_ASSETS[key];
}

/** Bildquelle eines Produkts: «brand:key», Upload-URL oder Pfad. */
export function productImage(image: string): string {
  if (image.startsWith('brand:')) {
    const key = image.slice(6) as BrandKey;
    return key in BRAND_ASSETS ? brand(key) : '';
  }
  return image;
}

/** Freigestellte Version eines Packshots (transparenter Hintergrund), siehe /api/cutout. */
export function cutoutImage(src: string): string {
  return src ? `/api/cutout?src=${encodeURIComponent(src)}` : '';
}
