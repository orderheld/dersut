'use client';

import { useRef, useState } from 'react';
import { ActionForm, type FormState } from './ActionForm';
import { ConfirmButton } from './ConfirmButton';

export type Contact = { email: string; name: string };

/**
 * Vorlagen für häufige Antworten: jeweils ein vollständiger, zusammenhängender Text.
 * Eine Vorlage ersetzt den Text unter der Anrede; «[…]» markiert Stellen zum Ergänzen
 * und wird nach dem Einfügen gleich markiert, damit man direkt weiterschreiben kann.
 */
const TEMPLATES: { key: string; label: string; text: string }[] = [
  {
    key: 'antwort',
    label: 'Allgemeine Antwort',
    text: 'Vielen Dank für Ihre Nachricht und Ihr Interesse an Dersut Caffè.\n\n[…]\n\nBei Fragen sind wir jederzeit gerne für Sie da.',
  },
  {
    key: 'offerte',
    label: 'Offerte Gastronomie',
    text:
      'Vielen Dank für Ihre Anfrage. Gerne erstellen wir Ihnen eine persönliche Offerte für Ihren Betrieb.\n\n' +
      'Damit wir passend rechnen können, benötigen wir noch ein paar Angaben:\n' +
      '– Wie viel Kaffee brauchen Sie ungefähr pro Woche?\n' +
      '– Welche Kaffeemaschine setzen Sie ein?\n' +
      '– Wünschen Sie ganze Bohnen oder gemahlenen Kaffee?\n\n' +
      'Sobald wir Ihre Angaben haben, erhalten Sie die Offerte innert 1 bis 2 Werktagen.',
  },
  {
    key: 'buero',
    label: 'Kaffee fürs Büro',
    text:
      'Vielen Dank für Ihre Anfrage. Gerne beraten wir Sie, welcher Kaffee zu Ihrem Team passt.\n\n' +
      'Damit wir Ihnen einen passenden Vorschlag machen können: Wie viele Personen trinken bei Ihnen täglich Kaffee, und welche Maschine haben Sie im Einsatz?\n\n' +
      'Wir melden uns danach mit einem Angebot bei Ihnen.',
  },
  {
    key: 'degustation',
    label: 'Degustation anbieten',
    text:
      'Vielen Dank für Ihr Interesse. Gerne bringen wir Ihnen Muster unserer Mischungen zur Degustation vorbei, unverbindlich und kostenlos.\n\n' +
      'Wann passt es Ihnen in den nächsten Tagen? Nennen Sie uns einfach zwei oder drei mögliche Termine: […]',
  },
  {
    key: 'versand',
    label: 'Bestellung ist unterwegs',
    text:
      'Ihre Bestellung ist unterwegs. Die Post liefert in der Regel innert 1 bis 2 Werktagen.\n\n' +
      'Die Sendungsnummer finden Sie in der Versandbestätigung, die wir Ihnen separat zugestellt haben.\n\n' +
      'Wir wünschen Ihnen viel Genuss mit Dersut Caffè.',
  },
  {
    key: 'rueckfrage',
    label: 'Rückfrage',
    text: 'Vielen Dank für Ihre Nachricht. Damit wir Ihnen weiterhelfen können, benötigen wir noch folgende Angaben:\n\n[…]\n\nBesten Dank für Ihre Rückmeldung.',
  },
];

const PLACEHOLDER = '[…]';

export function Composer({
  action, to, subject, greeting, signature, messageId, compact, contacts = [],
}: {
  action: (prev: FormState, fd: FormData) => Promise<FormState>;
  to?: string;
  subject?: string;
  greeting?: string;
  signature: string; // HTML der Signatur (Vorschau)
  messageId?: number;
  compact?: boolean;
  contacts?: Contact[];
}) {
  const ta = useRef<HTMLTextAreaElement>(null);
  const [tpl, setTpl] = useState('');
  const [warn, setWarn] = useState(false);
  const greet = (name?: string) => (name ? `Guten Tag ${name}` : greeting ?? 'Guten Tag');
  const firstLine = () => (ta.current?.value.split('\n')[0] ?? greet()).trim() || greet();
  const isUntouched = () => {
    const v = ta.current?.value.trim() ?? '';
    return !v || v === firstLine() || TEMPLATES.some((t) => v === `${firstLine()}\n\n${t.text}`.trim());
  };

  const apply = (key: string) => {
    const el = ta.current;
    const t = TEMPLATES.find((x) => x.key === key);
    if (!el || !t) return;
    if (!isUntouched() && !window.confirm('Den bisherigen Text durch die Vorlage ersetzen? Die Anrede bleibt.')) {
      setTpl('');
      return;
    }
    const head = `${firstLine()}\n\n`;
    el.value = head + t.text;
    el.focus();
    // Platzhalter markieren, sonst Cursor ans Ende
    const at = el.value.indexOf(PLACEHOLDER);
    if (at >= 0) el.setSelectionRange(at, at + PLACEHOLDER.length);
    else el.setSelectionRange(el.value.length, el.value.length);
    setTpl(key);
  };

  // Bei einer neuen E-Mail: Anrede mit dem Namen des gewählten Kunden setzen, solange noch nichts geschrieben ist
  const onTo = (value: string) => {
    const c = contacts.find((x) => x.email.toLowerCase() === value.trim().toLowerCase());
    const el = ta.current;
    if (!c || !el || messageId) return;
    const rest = el.value.split('\n').slice(1).join('\n');
    el.value = `${greet(c.name)}\n${rest || '\n'}`;
  };

  return (
    <ActionForm action={action} className="form composer">
      {messageId && <input type="hidden" name="id" value={messageId} />}
      <div className={compact ? 'row2' : 'composer__head'}>
        <label>
          An
          <input
            name="to"
            type="email"
            inputMode="email"
            autoComplete="email"
            list="composer-contacts"
            required
            defaultValue={to}
            placeholder="kunde@beispiel.ch"
            onChange={(e) => onTo(e.currentTarget.value)}
          />
        </label>
        <datalist id="composer-contacts">
          {contacts.map((c) => <option key={c.email} value={c.email}>{c.name}</option>)}
        </datalist>
        <label>Betreff<input name="subject" required defaultValue={subject} autoComplete="off" /></label>
      </div>
      <div className="composer__tpl">
        <label className="composer__tplsel">
          Vorlage
          <select value={tpl} onChange={(e) => apply(e.currentTarget.value)}>
            <option value="">Ohne Vorlage (frei schreiben)</option>
            {TEMPLATES.map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}
          </select>
        </label>
        <span className="muted small">Ersetzt den Text unter der Anrede. Stellen mit «{PLACEHOLDER}» bitte ergänzen.</span>
      </div>
      <label className="composer__body">
        Nachricht
        <textarea ref={ta} name="body" rows={compact ? 10 : 14} required defaultValue={`${greet()}\n\n`} />
      </label>
      <details className="sigbox">
        <summary><label className="inline small" onClick={(e) => e.stopPropagation()}><input type="checkbox" name="sig" value="1" defaultChecked /> Signatur anhängen</label> <span className="muted small">Vorschau</span></summary>
        <div className="sigbox__preview" dangerouslySetInnerHTML={{ __html: signature }} />
      </details>
      {warn && <div className="flash flash--error" role="alert">Bitte zuerst die markierte Stelle «{PLACEHOLDER}» im Text ergänzen.</div>}
      <div
        className="composer__foot"
        onClickCapture={(e) => {
          // Nicht ergänzte Vorlage-Stelle: nicht senden, sondern die Stelle markieren
          const el = ta.current;
          if (!el || !(e.target as HTMLElement).closest('button[type=submit]')) return;
          const at = el.value.indexOf(PLACEHOLDER);
          if (at < 0) return setWarn(false);
          e.preventDefault();
          e.stopPropagation();
          setWarn(true);
          el.focus();
          el.setSelectionRange(at, at + PLACEHOLDER.length);
        }}
      >
        <div className="composer__opts">
          {messageId && <label className="inline small"><input type="checkbox" name="quote" value="1" defaultChecked /> Ursprüngliche Nachricht anhängen</label>}
          {messageId && <label className="inline small"><input type="checkbox" name="done" value="1" defaultChecked /> Danach als erledigt ablegen</label>}
        </div>
        <ConfirmButton className="btn btn--primary" confirm="E-Mail jetzt senden?" mail="field:to" mailAlways>Senden ➤</ConfirmButton>
      </div>
      <p className="muted small">Absender: info@dersut.ch. Antworten des Kunden kommen im normalen E-Mail-Postfach an.</p>
    </ActionForm>
  );
}
