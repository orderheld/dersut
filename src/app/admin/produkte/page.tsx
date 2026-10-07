import type { Metadata } from 'next';
import Link from 'next/link';
import { Img } from '@/components/Img';
import { RowLink } from '@/components/admin/RowLink';
import { requireAdmin } from '@/lib/admin';
import { productImage } from '@/lib/brand';
import { chf } from '@/lib/format';
import { getProducts } from '@/lib/products';

export const metadata: Metadata = { title: 'Produkte' };

export default async function Products() {
  await requireAdmin();
  const products = await getProducts(false);
  return (
    <>
      <header className="pagehead">
        <div><h1>Produkte</h1><p className="muted">Preise, Texte, Bilder und Verfügbarkeit verwalten. Neue Produkte erscheinen sofort im Shop.</p></div>
        <Link className="btn btn--primary" href="/admin/produkte/neu">+ Neues Produkt</Link>
      </header>
      <div className="card table-wrap">
        <table className="table">
          <thead><tr><th></th><th>Produkt</th><th className="num">Preis</th><th>Lager</th><th>Sichtbar</th><th className="num">Reihenfolge</th></tr></thead>
          <tbody>
            {products.map((p) => (
              <RowLink key={p.id} href={`/admin/produkte/${p.id}`}>
                <td className="thumb"><Img src={productImage(p.image)} alt="" /></td>
                <td><Link className="ordlink" href={`/admin/produkte/${p.id}`}>{p.name}</Link><br /><span className="muted">{p.subtitle}</span></td>
                <td className="num"><strong>{chf(p.price)}</strong></td>
                <td>{p.stock === null ? <span className="muted">unbegrenzt</span> : p.stock <= 0 ? <span className="badge badge--cancelled">ausverkauft</span> : `${p.stock} Stk.`}</td>
                <td>{p.active ? <span className="badge badge--shipped">im Shop</span> : <span className="badge">ausgeblendet</span>}</td>
                <td className="num muted">{p.sort}</td>
              </RowLink>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
