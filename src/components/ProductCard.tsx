import Link from 'next/link';
import type { CSSProperties } from 'react';
import { productImage } from '@/lib/brand';
import { chf } from '@/lib/format';
import { isSoldOut, type Product } from '@/lib/products';
import { AddToCart } from './AddToCart';
import { Img } from './Img';
import { Intensity } from './Intensity';

export function ProductCard({ p }: { p: Product }) {
  return (
    <article className="pcard" style={{ '--accent': p.accent } as CSSProperties}>
      <Link className="pcard__media" href={`/shop/${p.slug}`}>
        <span className="pcard__badge">{p.line}</span>
        <Img src={productImage(p.image)} alt={`${p.name} ${p.weight}`} className="pcard__img" />
        <span className="pcard__fallback" aria-hidden="true">
          <span>{p.line}</span>
          <small>{p.weight}</small>
        </span>
      </Link>
      <div className="pcard__body">
        <p className="eyebrow">{p.subtitle}</p>
        <h3 className="pcard__title"><Link href={`/shop/${p.slug}`}>{p.name}</Link></h3>
        <p className="pcard__notes">{p.notes}</p>
        <Intensity value={p.intensity} />
        <div className="pcard__foot">
          <div className="price">{chf(p.price)}<small>inkl. MWST</small></div>
          <AddToCart productId={p.id} soldOut={isSoldOut(p)} />
        </div>
      </div>
    </article>
  );
}
