import type { Metadata } from 'next';
import { requireAdmin } from '@/lib/admin';
import { OrdersView } from './OrdersView';

export const metadata: Metadata = { title: 'Zu erledigen' };

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ status?: string; q?: string; ok?: string }> }) {
  await requireAdmin();
  const { status = 'todo', q = '', ok } = await searchParams;
  return <OrdersView dashboard status={status} q={q.trim()} ok={ok} />;
}
