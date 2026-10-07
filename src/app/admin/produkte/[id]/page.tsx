import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Img } from '@/components/Img';
import { ActionForm } from '@/components/admin/ActionForm';
import { Flash } from '@/components/admin/Flash';
import { requireAdmin } from '@/lib/admin';
import { productImage } from '@/lib/brand';
import { getProduct, type Product } from '@/lib/products';
import { saveProductAction } from '../../actions';

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ ok?: string }> };

export const metadata: Metadata = { title: 'Produkt bearbeiten' };

const EMPTY: Product = {
  id: 0, slug: '', name: '', line: '', subtitle: 'Espressobohnen · 1 kg', description: '', notes: '', blend: '', weight: '1 kg',
  price: 0, image: '', intensity: 3, accent: '#002856', active: true, stock: null, sort: 100,
};

export default async function ProductEdit({ params, searchParams }: Props) {
  await requireAdmin();
  const { id } = await params;
  const { ok } = await searchParams;
  const p = id === 'neu' ? EMPTY : await getProduct(Number(id) || 0);
  if (!p) notFound();
  const img = productImage(p.image);

  return (
    <>
      <header className="pagehead">
        <div>
          <Link className="back" href="/admin/produkte">← Alle Produkte</Link>
          <h1>{p.id ? p.name : 'Neues Produkt'}</h1>
        </div>
        {p.id > 0 && p.active && <a className="btn btn--ghost" href={`/shop/${p.slug}`} target="_blank" rel="noopener">Im Shop ansehen ↗</a>}
      </header>
      <Flash ok={ok} />

      <ActionForm action={saveProductAction} className="grid2">
        <input type="hidden" name="id" value={p.id} />
        <div>
          <section className="card form">
            <h2>Angaben</h2>
            <label>Produktname<input name="name" required defaultValue={p.name} placeholder="z. B. Dersut Optimum Rosso" /></label>
            <div className="row2">
              <label>Linie / Badge<input name="line" defaultValue={p.line} placeholder="z. B. Optimum" /></label>
              <label>Untertitel<input name="subtitle" defaultValue={p.subtitle} placeholder="Espressobohnen · 1 kg" /></label>
            </div>
            <label>Beschreibung<textarea name="description" rows={7} defaultValue={p.description} /></label>
            <div className="row2">
              <label>Geschmacksnoten<input name="notes" defaultValue={p.notes} placeholder="Kakao, Feingebäck" /></label>
              <label>Mischung<input name="blend" defaultValue={p.blend} placeholder="Arabica & Robusta" /></label>
            </div>
            <div className="row3">
              <label>Inhalt<input name="weight" defaultValue={p.weight} placeholder="1 kg" /></label>
              <label>Intensität (1–5)<input type="number" name="intensity" min={1} max={5} defaultValue={p.intensity} /></label>
              <label>Akzentfarbe<input type="color" name="accent" defaultValue={p.accent} /></label>
            </div>
          </section>
        </div>
        <div>
          <section className="card form">
            <h2>Preis &amp; Verfügbarkeit</h2>
            <label>Preis in CHF inkl. MWST<input name="price" required inputMode="decimal" defaultValue={p.price ? (p.price / 100).toFixed(2) : ''} placeholder="29.90" /></label>
            <label>Lagerbestand <span className="muted">(leer = unbegrenzt)</span><input type="number" name="stock" min={0} defaultValue={p.stock ?? ''} /></label>
            <label className="inline"><input type="checkbox" name="active" value="1" defaultChecked={p.active} /> Im Shop sichtbar</label>
            <label>Reihenfolge <span className="muted">(kleiner = weiter vorne)</span><input type="number" name="sort" defaultValue={p.sort} /></label>
            <label>URL-Kennung <span className="muted">(optional)</span><input name="slug" defaultValue={p.slug} placeholder="wird automatisch erstellt" /></label>
          </section>
          <section className="card form">
            <h2>Bild</h2>
            {img && <div className="preview"><Img src={img} alt="" /></div>}
            <label>Neues Bild hochladen (JPG, PNG, WebP, max. 4 MB)<input type="file" name="upload" accept="image/jpeg,image/png,image/webp" /></label>
            <label>oder Bild-URL<input name="image" defaultValue={p.image} placeholder="https://… oder brand:prod_optimum" /></label>
          </section>
          <button className="btn btn--primary btn--lg btn--block" type="submit">Speichern</button>
        </div>
      </ActionForm>
    </>
  );
}
