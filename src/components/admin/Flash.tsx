import { FLASH } from '@/lib/admin';

/** Rückmeldung nach einer Aktion. «mail» nennt die Empfänger einer gesendeten E-Mail. */
export function Flash({ ok, mail }: { ok?: string; mail?: string }) {
  if (!ok || !FLASH[ok]) return null;
  const isError = ok.endsWith('_failed') || ok.endsWith('_none');
  return (
    <div className={`flash${isError ? ' flash--error' : ''}`} role="status">
      {mail && !isError ? FLASH[ok].replace(' Der Kunde wurde per E-Mail informiert.', '') : FLASH[ok]}
      {mail && !isError && <div className="flash__mail">✉ E-Mail gesendet an <strong>{mail}</strong></div>}
    </div>
  );
}
