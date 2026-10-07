import type { Metadata } from 'next';
import { requireAdmin } from '@/lib/admin';
import { config } from '@/lib/config';
import { query } from '@/lib/db';
import { dateCh } from '@/lib/format';
import { messageDoneAction } from '../actions';

export const metadata: Metadata = { title: 'Nachrichten' };

type Msg = { id: number; name: string; email: string; phone: string; company: string; topic: string; message: string; done: boolean; created_at: Date };

export default async function Messages() {
  await requireAdmin();
  const msgs = await query<Msg>('SELECT * FROM messages ORDER BY done, id DESC LIMIT 300');
  return (
    <>
      <header className="pagehead">
        <div><h1>Nachrichten</h1><p className="muted">Anfragen über das Kontaktformular. Jede Anfrage geht zusätzlich per E-Mail an {config.email.contact}.</p></div>
      </header>
      {!msgs.length && <div className="card empty">Noch keine Nachrichten.</div>}
      {msgs.map((m) => (
        <section key={m.id} className={`card msg${m.done ? ' is-done' : ''}`}>
          <div className="msg__head">
            <div>
              <strong>{m.name}</strong>{m.company ? ` · ${m.company}` : ''} <span className="badge">{m.topic || 'Allgemein'}</span><br />
              <a href={`mailto:${m.email}`}>{m.email}</a>{m.phone ? ` · ${m.phone}` : ''} · <span className="muted">{dateCh(m.created_at, true)}</span>
            </div>
            <form action={messageDoneAction}>
              <input type="hidden" name="id" value={m.id} />
              <input type="hidden" name="done" value={m.done ? '0' : '1'} />
              <button className="btn btn--ghost btn--sm" type="submit">{m.done ? 'Wieder öffnen' : 'Erledigt ✓'}</button>
            </form>
          </div>
          <p style={{ whiteSpace: 'pre-line' }}>{m.message}</p>
        </section>
      ))}
    </>
  );
}
