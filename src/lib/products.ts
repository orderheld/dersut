import 'server-only';
import { query, one } from './db';

export type Product = {
  id: number;
  slug: string;
  name: string;
  line: string;
  subtitle: string;
  description: string;
  notes: string;
  blend: string;
  weight: string;
  price: number;
  image: string;
  intensity: number;
  accent: string;
  active: boolean;
  stock: number | null;
  sort: number;
};

export async function getProducts(onlyActive = true): Promise<Product[]> {
  return query<Product>(`SELECT * FROM products ${onlyActive ? 'WHERE active' : ''} ORDER BY sort, id`);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return one<Product>('SELECT * FROM products WHERE slug = $1 AND active', [slug]);
}

export async function getProduct(id: number): Promise<Product | null> {
  return one<Product>('SELECT * FROM products WHERE id = $1', [id]);
}

export function isSoldOut(p: Product): boolean {
  return p.stock !== null && p.stock <= 0;
}
