import type { Metadata } from 'next';
import Link from 'next/link';
import { Img } from '@/components/Img';
import { RowLink } from '@/components/admin/RowLink';
import { requireAdmin } from '@/lib/admin';
import { cutoutImage, productImage } from '@/lib/brand';
import { chf } from '@/lib/format';
import { getProducts } from '@/lib/products';
import { Flash } from '@/components/admin/Flash';
import { toggleProductAction } from '../actions';
import { categoryName } from '@/lib/settings-core';

export const metadata: Metadata = { title: 'Produkte' };

export default async function Products({ searchParams }: { searchParams: Promise<{ ok?: string }> }) {
  await requireAdmin();
  const { ok } = await searchParams;
  const products = await getProducts(false);
  return (
    <>
      <header className="pagehead">
        <div><h1>Produkte</h1><p className="muted">Preise, Texte, Bilder und Verfügbarkeit verwalten. Neue Produkte erscheinen sofort im Shop.</p></div>
        <Link className="btn btn--primary" href="/admin/produkte/neu">+ Neues Produkt</Link>
      </header>
      <Flash ok={ok} />
      <div className="card table-wrap">
        <table className="table table--cards table--products">
          <thead><tr><th></th><th>Produkt</th><th className="num">Preis</th><th>Lager</th><th>Sichtbar</th><th className="num">Reihenfolge</th></tr></thead>
          <tbody>
            {products.map((p) => (
              <RowLink key={p.id} href={`/admin/produkte/${p.id}`}>
                <td className="thumb c-thumb"><Img src={cutoutImage(productImage(p.image))} fallbackSrc={productImage(p.image)} alt="" /></td>
                <td className="c-name"><Link className="ordlink" href={`/admin/produkte/${p.id}`}>{p.name}</Link><br /><span className="muted">{p.subtitle}{p.category ? ` · ${categoryName(p.category, 'de') || p.category}` : ' · ohne Kategorie'}</span></td>
                <td className="num c-price"><strong>{chf(p.price)}</strong></td>
                <td className="c-stock">{p.stock === null ? <span className="muted">unbegrenzt</span> : p.stock <= 0 ? <span className="badge badge--cancelled">ausverkauft</span> : `${p.stock} Stk.`}</td>
                <td className="c-vis">
                  <form action={toggleProductAction}>
                    <input type="hidden" name="id" value={p.id} />
                    <button type="submit" className={`switch${p.active ? ' is-on' : ''}`} title={p.active ? 'Klicken zum Ausblenden' : 'Klicken zum Einblenden'}>
                      <i /> {p.active ? 'im Shop' : 'ausgeblendet'}
                    </button>
                  </form>
                </td>
                <td className="num muted c-sort">{p.sort}</td>
              </RowLink>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
