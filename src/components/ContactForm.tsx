'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { contactAction, type ContactState } from '@/app/(site)/actions';
import { Field } from './Field';
import { Icon } from './Icon';

const TOPICS = ['Allgemeine Anfrage', 'Bestellung', 'Gastronomie', 'Büro', 'Partnerschaft'];

export function ContactForm({ topic }: { topic: string }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(contactAction, { sent: false, errors: {}, values: { topic } });
  const v = (k: string) => state.values[k] ?? '';
  const e = state.errors;

  if (state.sent) {
    return (
      <>
        <div className="alert alert--ok" role="status"><strong>Vielen Dank für Ihre Nachricht!</strong> Wir melden uns so rasch wie möglich bei Ihnen.</div>
        <Link className="btn btn--outline" href="/shop">Zum Shop</Link>
      </>
    );
  }

  return (
    <>
      <h2>Nachricht senden</h2>
      <p>Wir antworten in der Regel innert eines Arbeitstages.</p>
      {e._ && <div className="alert alert--err" role="alert">{e._}</div>}
      <form action={action} noValidate>
        <div className="hp" aria-hidden="true"><label>Website <input type="text" name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <div className="fgrid">
          <Field name="name" label="Name" span={3} error={e.name}><input id="name" name="name" defaultValue={v('name')} required autoComplete="name" /></Field>
          <Field name="company" label="Firma" optional span={3}><input id="company" name="company" defaultValue={v('company')} autoComplete="organization" /></Field>
          <Field name="email" label="E-Mail" span={3} error={e.email}><input id="email" type="email" name="email" defaultValue={v('email')} required autoComplete="email" /></Field>
          <Field name="phone" label="Telefon" optional span={3}><input id="phone" type="tel" name="phone" defaultValue={v('phone')} autoComplete="tel" /></Field>
          <Field name="topic" label="Thema">
            <select id="topic" name="topic" defaultValue={TOPICS.includes(v('topic')) ? v('topic') : TOPICS[0]}>
              {TOPICS.map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field name="message" label="Nachricht" error={e.message}><textarea id="message" name="message" rows={6} required defaultValue={v('message')} /></Field>
          <div className="f"><p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>Mit dem Absenden stimmen Sie der Bearbeitung Ihrer Angaben gemäss unserer <Link href="/datenschutz">Datenschutzerklärung</Link> zu.</p></div>
          <div className="f"><button className="btn btn--primary btn--lg" type="submit" disabled={pending}><Icon name="mail" /> {pending ? 'Wird gesendet …' : 'Nachricht senden'}</button></div>
        </div>
      </form>
    </>
  );
}
