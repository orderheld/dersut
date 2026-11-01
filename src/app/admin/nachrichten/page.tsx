import type { Metadata } from 'next';
import { requireAdmin } from '@/lib/admin';
import { config } from '@/lib/config';
import { query } from '@/lib/db';
import { dateCh } from '@/lib/format';
import { messageDoneAction, messageSpamAction } from '../actions';

export const metadata: Metadata = { title: 'Nachrichten' };

type Msg = { id: number; name: string; email: string; phone: string; company: string; topic: string; message: string; done: boolean; spam: string; created_at: Date };

export default async function Messages() {
  await requireAdmin();
  // Aussortierter Spam wird nach 30 Tagen automatisch gelöscht
  await query(`DELETE FROM messages WHERE spam <> '' AND created_at < now() - interval '30 days'`);
  const all = await query<Msg>('SELECT * FROM messages ORDER BY done, id DESC LIMIT 300');
  const msgs = all.filter((m) => !m.spam);
  const spam = all.filter((m) => m.spam);
  return (
    <>
      <header className="pagehead">
        <div><h1>Nachrichten</h1><p className="muted">Anfragen über das Kontaktformular. Jede Anfrage geht zusätzlich per E-Mail an {config.email.contact}. Werbung und Bots werden automatisch aussortiert.</p></div>
      </header>
      {!msgs.length && <div className="card empty">Noch keine Nachrichten.</div>}
      {msgs.map((m) => (
        <section key={m.id} className={`card msg${m.done ? ' is-done' : ''}`}>
          <div className="msg__head">
            <div>
              <strong>{m.name}</strong>{m.company ? ` · ${m.company}` : ''} <span className="badge">{m.topic || 'Allgemein'}</span><br />
              <a href={`mailto:${m.email}`}>{m.email}</a>{m.phone ? ` · ${m.phone}` : ''} · <span className="muted">{dateCh(m.created_at, true)}</span>
            </div>
            <div className="msg__actions">
              <form action={messageDoneAction}>
                <input type="hidden" name="id" value={m.id} />
                <input type="hidden" name="done" value={m.done ? '0' : '1'} />
                <button className="btn btn--ghost btn--sm" type="submit">{m.done ? 'Wieder öffnen' : 'Erledigt ✓'}</button>
              </form>
              <form action={messageSpamAction}>
                <input type="hidden" name="id" value={m.id} />
                <input type="hidden" name="spam" value="1" />
                <button className="btn btn--ghost btn--sm" type="submit">Spam</button>
              </form>
            </div>
          </div>
          <p style={{ whiteSpace: 'pre-line' }}>{m.message}</p>
        </section>
      ))}

      <details className="card spambox">
        <summary><strong>Spam ({spam.length})</strong> <span className="muted">· automatisch aussortiert, ohne E-Mail. Wird nach 30 Tagen gelöscht.</span></summary>
        {!spam.length && <p className="muted">Kein Spam in den letzten 30 Tagen.</p>}
        {spam.map((m) => (
          <div key={m.id} className="msg msg--spam">
            <div className="msg__head">
              <div>
                <strong>{m.name}</strong>{m.company ? ` · ${m.company}` : ''} · {m.email} · <span className="muted">{dateCh(m.created_at, true)}</span><br />
                <span className="badge">{m.spam}</span>
              </div>
              <form action={messageSpamAction}>
                <input type="hidden" name="id" value={m.id} />
                <input type="hidden" name="spam" value="0" />
                <button className="btn btn--ghost btn--sm" type="submit">Kein Spam</button>
              </form>
            </div>
            <p className="muted" style={{ whiteSpace: 'pre-line' }}>{m.message.slice(0, 400)}{m.message.length > 400 ? ' …' : ''}</p>
          </div>
        ))}
      </details>
    </>
  );
}
