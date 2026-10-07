import type { Metadata } from 'next';
import { requireAdmin } from '@/lib/admin';
import { OrdersView } from '../OrdersView';

export const metadata: Metadata = { title: 'Bestellungen' };

export default async function Orders({ searchParams }: { searchParams: Promise<{ status?: string; q?: string; ok?: string }> }) {
  await requireAdmin();
  const { status = 'all', q = '', ok } = await searchParams;
  return <OrdersView dashboard={false} status={status} q={q.trim()} ok={ok} />;
}
