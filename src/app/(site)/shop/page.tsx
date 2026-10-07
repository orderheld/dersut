import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { ProductCard } from '@/components/ProductCard';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Onlineshop',
  description: 'Dersut Espressobohnen online bestellen – Lieferung in die ganze Schweiz.',
};

export default async function Shop() {
  const products = await getProducts();
  return (
    <>
      <PageHero
        crumb="Shop"
        eyebrow="Onlineshop"
        title={<>Espresso aus <em>Conegliano</em></>}
        lead="Original Dersut Caffè, direkt vom offiziellen Vertrieb in der Schweiz. Versand in die ganze Schweiz für pauschal CHF 9.–."
      />
      <section className="section">
        <div className="wrap">
          <div className="pgrid">
            {products.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
          <p className="center" style={{ marginTop: 50, color: 'var(--muted)' }}>
            Weitere Produkte folgen: Das Sortiment wird laufend und je nach Saison erweitert.
          </p>
        </div>
      </section>
    </>
  );
}
