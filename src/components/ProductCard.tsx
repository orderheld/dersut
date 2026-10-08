import Link from 'next/link';
import type { CSSProperties } from 'react';
import { getDict } from '@/i18n';
import { cutoutImage, productImage } from '@/lib/brand';
import { chf } from '@/lib/format';
import { lp, type Locale } from '@/lib/i18n';
import { isSoldOut, type Product } from '@/lib/products';
import { AddToCart } from './AddToCart';
import { Img } from './Img';
import { Intensity } from './Intensity';
import { PackDeco } from './PackDeco';

/** `level`: Überschriftenebene des Produktnamens (2 auf Seiten ohne Zwischentitel, sonst 3) */
export function ProductCard({ p, lang, level = 3 }: { p: Product; lang: Locale; level?: 2 | 3 }) {
  const H = level === 2 ? 'h2' : 'h3';
  const t = getDict(lang);
  const href = lp(lang, `/shop/${p.slug}`);
  return (
    <article className="pcard" style={{ '--accent': p.accent } as CSSProperties}>
      <Link className="pcard__media is-pack" href={href}>
        <span className="pcard__badge">{p.line}</span>
        <PackDeco />
        <Img src={cutoutImage(productImage(p.image))} fallbackSrc={productImage(p.image)} alt={`${p.name} ${p.weight}`} className="pcard__img" />
        <span className="pcard__fallback" aria-hidden="true">
          <span>{p.line}</span>
          <small>{p.weight}</small>
        </span>
      </Link>
      <div className="pcard__body">
        <p className="eyebrow">{p.subtitle}</p>
        <H className="pcard__title"><Link href={href}>{p.name}</Link></H>
        <p className="pcard__notes">{p.notes}</p>
        <Intensity value={p.intensity} lang={lang} />
        <div className="pcard__foot">
          <div className="price">{chf(p.price)}<small>{t.common.inclVat}</small></div>
          <AddToCart productId={p.id} soldOut={isSoldOut(p)} lang={lang} />
        </div>
      </div>
    </article>
  );
}
