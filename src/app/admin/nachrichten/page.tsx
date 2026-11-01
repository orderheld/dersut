import type { Metadata } from 'next';
import Link from 'next/link';
import { Composer } from '@/components/admin/Composer';
import { ConfirmButton } from '@/components/admin/ConfirmButton';
import { requireAdmin } from '@/lib/admin';
import { query, one } from '@/lib/db';
import { signatureHtml } from '@/lib/emails';
import { chf, dateCh, statusLabel } from '@/lib/format';
import {
  messageDeleteAction, messageDoneAction, messageSpamAction, messageTrashAction, messageUnreadAction, sendAdminMailAction,
} from '../actions';

export const metadata: Metadata = { title: 'Nachrichten' };

type Msg = {
  id: number; name: string; email: string; phone: string; company: string; topic: string; message: string;
  done: boolean; spam: string; created_at: Date; read_at: Date | null; deleted_at: Date | null;
};
type Out = { id: number; message_id: number | null; to_email: string; subject: string; body: string; ok: boolean; error: string; sent_by: string; created_at: Date };

const FOLDERS = [
  ['inbox', 'Posteingang', `spam = '' AND deleted_at IS NULL AND NOT done`],
  ['done', 'Erledigt', `spam = '' AND deleted_at IS NULL AND done`],
  ['sent', 'Gesendet', ''],
  ['spam', 'Spam', `spam <> '' AND deleted_at IS NULL`],
  ['trash', 'Papierkorb', `deleted_at IS NOT NULL`],
] as const;
type Folder = (typeof FOLDERS)[number][0];

type Props = { searchParams: Promise<{ f?: string; id?: string; q?: string; neu?: string; to?: string; sent?: string }> };


export default async function Messages({ searchParams }: Props) {
  await requireAdmin();
  const signature = signatureHtml();
  const sp = await searchParams;
  const folder: Folder = (FOLDERS.find(([k]) => k === sp.f)?.[0] ?? 'inbox') as Folder;
  const q = (sp.q ?? '').trim();
  const openId = Number(sp.id) || 0;
  const compose = sp.neu === '1';

  // Aufräumen: Spam und Papierkorb nach 30 Tagen endgültig löschen
  await query(`DELETE FROM messages WHERE (spam <> '' AND created_at < now() - interval '30 days') OR deleted_at < now() - interval '30 days'`);

  const counts = await one<Record<string, number>>(
    `SELECT COUNT(*) FILTER (WHERE spam = '' AND deleted_at IS NULL AND NOT done)::int AS inbox,
            COUNT(*) FILTER (WHERE spam = '' AND deleted_at IS NULL AND NOT done AND read_at IS NULL)::int AS unread,
            COUNT(*) FILTER (WHERE spam <> '' AND deleted_at IS NULL)::int AS spam,
            COUNT(*) FILTER (WHERE deleted_at IS NOT NULL)::int AS trash
     FROM messages`,
  );

  const search = q ? `%${q}%` : null;
  const list = folder === 'sent'
    ? []
    : await query<Msg>(
        `SELECT * FROM messages WHERE ${FOLDERS.find(([k]) => k === folder)![2]}
         ${search ? 'AND (name ILIKE $1 OR email ILIKE $1 OR company ILIKE $1 OR message ILIKE $1 OR topic ILIKE $1)' : ''}
         ORDER BY id DESC LIMIT 300`,
        search ? [search] : [],
      );
  const sent = folder === 'sent'
    ? await query<Out>(`SELECT * FROM mail_out ${search ? 'WHERE to_email ILIKE $1 OR subject ILIKE $1 OR body ILIKE $1' : ''} ORDER BY id DESC LIMIT 300`, search ? [search] : [])
    : [];

  let open: Msg | null = null;
  let replies: Out[] = [];
  let orders: { id: number; number: string; status: string; total: number; created_at: Date }[] = [];
  if (openId && folder !== 'sent') {
    open = await one<Msg>('SELECT * FROM messages WHERE id = $1', [openId]);
    if (open) {
      if (!open.read_at) await query('UPDATE messages SET read_at = now() WHERE id = $1', [open.id]);
      replies = await query<Out>('SELECT * FROM mail_out WHERE message_id = $1 ORDER BY id', [open.id]);
      orders = await query('SELECT id, number, status, total, created_at FROM orders WHERE lower(email) = lower($1) ORDER BY id DESC LIMIT 10', [open.email]);
    }
  }
  const openSent = folder === 'sent' && openId ? await one<Out>('SELECT * FROM mail_out WHERE id = $1', [openId]) : null;

  const href = (p: Record<string, string | number | undefined>) => {
    const u = new URLSearchParams();
    const all = { f: folder, q: q || undefined, ...p };
    for (const [k, v] of Object.entries(all)) if (v !== undefined && v !== '') u.set(k, String(v));
    return `/admin/nachrichten?${u}`;
  };
  const listHref = href({});
  const Hidden = ({ id, back = listHref }: { id: number; back?: string }) => (
    <><input type="hidden" name="id" value={id} /><input type="hidden" name="back" value={back} /></>
  );

  return (
    <>
      <header className="pagehead">
        <div><h1>Nachrichten</h1><p className="muted">Anfragen über die Webseite beantworten, ablegen oder löschen. Werbung und Bots landen automatisch im Spam.</p></div>
        <Link className="btn btn--primary" href={href({ neu: 1 })}>✎ Neue E-Mail</Link>
      </header>

      {sp.sent && (
        <div className="flash flash--sent" role="status">
          <strong>✉ E-Mail gesendet</strong> an {sp.sent}. Eine Kopie liegt im Ordner «Gesendet».
        </div>
      )}

      <div className={`mailbox${open || openSent || compose ? ' has-open' : ''}`}>
        <nav className="mailbox__folders">
          {FOLDERS.map(([k, label]) => {
            const n = k === 'inbox' ? counts?.unread : k === 'spam' ? counts?.spam : k === 'trash' ? counts?.trash : 0;
            return (
              <Link key={k} href={`/admin/nachrichten?f=${k}`} className={folder === k ? 'is-active' : ''}>
                {label}{!!n && <b>{n}</b>}
              </Link>
            );
          })}
        </nav>

        <div className="mailbox__list">
          <form method="get" action="/admin/nachrichten" className="mailbox__search">
            <input type="hidden" name="f" value={folder} />
            <input type="search" name="q" defaultValue={q} placeholder="Suchen …" />
          </form>
          {folder === 'sent'
            ? sent.map((m) => (
                <Link key={m.id} href={href({ id: m.id })} className={`mitem${m.id === openId ? ' is-active' : ''}`}>
                  <span className="mitem__top"><strong>An {m.to_email}</strong><time>{dateCh(m.created_at)}</time></span>
                  <span className="mitem__subj">{m.ok ? '' : '⚠ '}{m.subject}</span>
                  <span className="mitem__prev">{m.body.slice(0, 90)}</span>
                </Link>
              ))
            : list.map((m) => (
                <Link key={m.id} href={href({ id: m.id })} className={`mitem${m.id === openId ? ' is-active' : ''}${!m.read_at && folder === 'inbox' ? ' is-unread' : ''}`}>
                  <span className="mitem__top"><strong>{m.name}</strong><time>{dateCh(m.created_at)}</time></span>
                  <span className="mitem__subj">{m.topic || 'Allgemeine Anfrage'}{m.company ? ` · ${m.company}` : ''}</span>
                  <span className="mitem__prev">{folder === 'spam' ? m.spam : m.message.slice(0, 90)}</span>
                </Link>
              ))}
          {(folder === 'sent' ? !sent.length : !list.length) && (
            <p className="mailbox__empty">{q ? 'Nichts gefunden.' : folder === 'inbox' ? 'Posteingang leer. Alles erledigt. 🎉' : 'Keine Nachrichten.'}</p>
          )}
        </div>

        <div className="mailbox__view">
          {compose && (
            <section className="mview">
              <Link className="back mview__back" href={listHref}>← Zurück</Link>
              <h2 className="mview__title">Neue E-Mail</h2>
              <Composer action={sendAdminMailAction} to={sp.to} signature={signature} />
            </section>
          )}

          {!compose && openSent && (
            <section className="mview">
              <Link className="back mview__back" href={listHref}>← Zurück</Link>
              <h2 className="mview__title">{openSent.subject}</h2>
              <p className="muted small">An {openSent.to_email} · {dateCh(openSent.created_at, true)} · gesendet von {openSent.sent_by || 'Admin'}</p>
              {!openSent.ok && <div className="flash flash--error">Nicht zugestellt: {openSent.error}</div>}
              <div className="mview__body">{openSent.body}</div>
              {openSent.message_id && <p><Link href={`/admin/nachrichten?f=done&id=${openSent.message_id}`}>Zur ursprünglichen Anfrage →</Link></p>}
            </section>
          )}

          {!compose && open && (
            <section className="mview">
              <Link className="back mview__back" href={listHref}>← Zurück</Link>
              <div className="mview__tools">
                {open.deleted_at ? (
                  <>
                    <form action={messageTrashAction}><Hidden id={open.id} /><input type="hidden" name="restore" value="1" /><button className="btn btn--ghost btn--sm">Wiederherstellen</button></form>
                    <form action={messageDeleteAction}><Hidden id={open.id} /><ConfirmButton className="btn btn--danger btn--sm" confirm="Nachricht endgültig löschen?">Endgültig löschen</ConfirmButton></form>
                  </>
                ) : (
                  <>
                    {!open.spam && (
                      <form action={messageDoneAction}><Hidden id={open.id} /><input type="hidden" name="done" value={open.done ? '0' : '1'} /><button className="btn btn--ghost btn--sm">{open.done ? '↩ In den Posteingang' : '✓ Erledigt'}</button></form>
                    )}
                    <form action={messageUnreadAction}><Hidden id={open.id} /><button className="btn btn--ghost btn--sm">Ungelesen</button></form>
                    <form action={messageSpamAction}><Hidden id={open.id} /><input type="hidden" name="spam" value={open.spam ? '0' : '1'} /><button className="btn btn--ghost btn--sm">{open.spam ? 'Kein Spam' : 'Spam'}</button></form>
                    <form action={messageTrashAction}><Hidden id={open.id} /><button className="btn btn--danger btn--sm">🗑 Löschen</button></form>
                  </>
                )}
              </div>
              <h2 className="mview__title">{open.topic || 'Allgemeine Anfrage'}</h2>
              <div className="mview__from">
                <span className="avatar">{open.name.trim().charAt(0).toUpperCase()}</span>
                <div>
                  <strong>{open.name}</strong>{open.company ? ` · ${open.company}` : ''}<br />
                  <a href={`mailto:${open.email}`}>{open.email}</a>{open.phone && <> · <a href={`tel:${open.phone}`}>{open.phone}</a></>}
                  <br /><span className="muted small">{dateCh(open.created_at, true)}</span>
                </div>
              </div>
              {open.spam && <div className="flash flash--error">Als Spam aussortiert: {open.spam}</div>}
              <div className="mview__body">{open.message}</div>

              {orders.length > 0 && (
                <div className="mview__orders">
                  <strong>Bestellungen dieses Kunden</strong>
                  {orders.map((o) => (
                    <Link key={o.id} href={`/admin/bestellungen/${o.id}`}>
                      {o.number} · {dateCh(o.created_at)} · {chf(o.total)} <span className={`badge badge--${o.status}`}>{statusLabel(o.status)}</span>
                    </Link>
                  ))}
                </div>
              )}

              {replies.map((r) => (
                <div key={r.id} className={`reply${r.ok ? '' : ' reply--failed'}`}>
                  <div className="small muted">{r.ok ? 'Ihre Antwort' : '⚠ Nicht zugestellt'} · {dateCh(r.created_at, true)} · {r.sent_by}</div>
                  <div className="mview__body">{r.body}</div>
                </div>
              ))}

              {!open.deleted_at && !open.spam && (
                <div className="mview__reply">
                  <h3>Antworten</h3>
                  <Composer
                    key={`${open.id}-${replies.length}`}
                    action={sendAdminMailAction}
                    messageId={open.id}
                    to={open.email}
                    subject={`Re: ${open.topic || 'Ihre Anfrage bei Dersut Kaffee Schweiz'}`}
                    greeting={`Grüezi ${open.name.split(' ')[0]}`}
                    signature={signature}
                    compact
                  />
                </div>
              )}
            </section>
          )}

          {!compose && !open && !openSent && (
            <div className="mview mview--empty"><span>✉</span><p>Nachricht links auswählen</p></div>
          )}
        </div>
      </div>
    </>
  );
}
