'use client';

import type { ReactNode } from 'react';

/**
 * Absende-Knopf mit Rückfrage; optional mit eigener Server-Aktion (formAction).
 * Mit «mail» nennt die Rückfrage zusätzlich, an wen eine E-Mail geht. Hat das Formular ein
 * Häkchen «notify», wird die E-Mail nur erwähnt, wenn es angehakt ist (ausser «mailAlways»).
 * mail="field:to" nimmt die Adresse aus dem Feld «to», mail="selected" zählt die angehakten Bestellungen (Sammelaktion).
 */
export function ConfirmButton({
  confirm,
  mail,
  mailAlways,
  children,
  className,
  formAction,
  form,
}: {
  confirm?: string;
  mail?: string;
  mailAlways?: boolean;
  children: ReactNode;
  className?: string;
  formAction?: (fd: FormData) => void | Promise<void>;
  form?: string;
}) {
  return (
    <button
      type="submit"
      className={className}
      formAction={formAction}
      form={form}
      onClick={(e) => {
        const f = e.currentTarget.form;
        const notify = f?.elements.namedItem('notify');
        const st = f?.elements.namedItem('status');
        const toOpen = st instanceof HTMLSelectElement && (st.value === 'open' || st.value === 'delete'); // Zurücksetzen sendet keine E-Mail
        const sends = !!mail && !toOpen && (mailAlways || !(notify instanceof HTMLInputElement) || notify.checked);
        let to = mail;
        if (mail === 'field:to') {
          const el = f?.elements.namedItem('to');
          to = el instanceof HTMLInputElement ? el.value.trim() : '';
          if (!to) return; // Pflichtfeld: der Browser meldet es selbst
        } else if (mail === 'selected') {
          const n = f ? f.querySelectorAll('input[name="ids"]:checked').length : 0;
          to = n === 1 ? 'den Kunden der ausgewählten Bestellung' : `die Kunden der ${n} ausgewählten Bestellungen`;
        }
        if (st instanceof HTMLSelectElement && st.value === 'delete') {
          // Sammelaktion «endgültig löschen»: eigene, deutliche Rückfrage, keine E-Mail
          const n = f ? f.querySelectorAll('input[name="ids"]:checked').length : 0;
          if (!window.confirm(`${n === 1 ? 'Die ausgewählte Bestellung' : `Die ${n} ausgewählten Bestellungen`} endgültig löschen?\n\nArtikel und Verlauf werden mit gelöscht, der Lagerbestand wird zurückgebucht. Das kann nicht rückgängig gemacht werden.`)) e.preventDefault();
          return;
        }
        const text = [confirm, sends ? `✉ Es wird eine E-Mail an ${to} gesendet.` : ''].filter(Boolean).join('\n\n');
        if (text && !window.confirm(text)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
