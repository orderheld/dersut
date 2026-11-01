'use client';

import { useRef } from 'react';
import { ActionForm, type FormState } from './ActionForm';
import { ConfirmButton } from './ConfirmButton';

/** Textbausteine für häufige Antworten: werden an der Cursor-Position eingefügt. */
const TEMPLATES: [string, string][] = [
  ['Danke', 'vielen Dank für Ihre Nachricht und Ihr Interesse an Dersut Caffè.'],
  ['Offerte folgt', 'gerne stellen wir Ihnen eine persönliche Offerte zusammen. Damit wir passend rechnen können: Wie viel Kaffee brauchen Sie ungefähr pro Woche, und welche Maschine setzen Sie ein?'],
  ['Degustation', 'gerne bringen wir Ihnen Muster zur Degustation vorbei. Wann passt es Ihnen in den nächsten Tagen?'],
  ['Versand', 'Ihre Bestellung ist unterwegs. Die Post liefert in der Regel innert 1 bis 2 Werktagen.'],
];

export function Composer({
  action, to, subject, greeting, signature, messageId, compact,
}: {
  action: (prev: FormState, fd: FormData) => Promise<FormState>;
  to?: string;
  subject?: string;
  greeting?: string;
  signature: string; // HTML der Signatur (Vorschau)
  messageId?: number;
  compact?: boolean;
}) {
  const ta = useRef<HTMLTextAreaElement>(null);
  const touched = useRef(false);
  const insert = (text: string) => {
    const el = ta.current;
    if (!el) return;
    // Noch nicht ins Textfeld geklickt: Baustein unter die Anrede setzen
    const first = el.value.indexOf('\n\n');
    const at = touched.current ? (el.selectionStart ?? el.value.length) : first >= 0 ? first + 2 : el.value.length;
    const end = touched.current ? Math.max(at, el.selectionEnd ?? at) : at;
    el.value = el.value.slice(0, at) + text + el.value.slice(end);
    el.focus();
    el.selectionStart = el.selectionEnd = at + text.length;
    touched.current = true;
  };
  return (
    <ActionForm action={action} className="form composer">
      {messageId && <input type="hidden" name="id" value={messageId} />}
      <div className={compact ? 'row2' : ''}>
        <label>An<input name="to" type="email" required defaultValue={to} placeholder="kunde@beispiel.ch" /></label>
        <label>Betreff<input name="subject" required defaultValue={subject} /></label>
      </div>
      <div className="tpl">
        <span className="muted small">Textbausteine:</span>
        {TEMPLATES.map(([k, v]) => <button key={k} type="button" onClick={() => insert(v)}>{k}</button>)}
      </div>
      <textarea ref={ta} onFocus={() => (touched.current = true)} onClick={() => (touched.current = true)} name="body" rows={compact ? 9 : 14} required defaultValue={`${greeting ?? 'Grüezi'}\n\n`} />
      <details className="sigbox" open>
        <summary><label className="inline small" onClick={(e) => e.stopPropagation()}><input type="checkbox" name="sig" value="1" defaultChecked /> Signatur anhängen</label></summary>
        <div className="sigbox__preview" dangerouslySetInnerHTML={{ __html: signature }} />
      </details>
      <div className="composer__foot">
        {messageId && <label className="inline small"><input type="checkbox" name="quote" value="1" defaultChecked /> Ursprüngliche Nachricht anhängen</label>}
        {messageId && <label className="inline small"><input type="checkbox" name="done" value="1" defaultChecked /> Danach als erledigt ablegen</label>}
        <ConfirmButton className="btn btn--primary" confirm="E-Mail jetzt senden?" mail="field:to" mailAlways>Senden ➤</ConfirmButton>
      </div>
      <p className="muted small">Absender: info@dersut.ch. Antworten des Kunden kommen im normalen E-Mail-Postfach an.</p>
    </ActionForm>
  );
}
