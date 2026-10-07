import { FLASH } from '@/lib/admin';

export function Flash({ ok }: { ok?: string }) {
  if (!ok || !FLASH[ok]) return null;
  const isError = ok.endsWith('_failed') || ok.endsWith('_none');
  return <div className={`flash${isError ? ' flash--error' : ''}`} role="status">{FLASH[ok]}</div>;
}
