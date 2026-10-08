'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useActionState } from 'react';
import { contactAction, type ContactState } from '@/app/[lang]/actions';
import { getDict } from '@/i18n';
import { lp, type Locale } from '@/lib/i18n';
import { Field } from './Field';
import { Icon } from './Icon';

export function ContactForm({ topic, lang }: { topic: string; lang: Locale }) {
  const t = getDict(lang).contact;
  const TOPICS = t.topics.map(([value]) => value);
  const [state, action, pending] = useActionState<ContactState, FormData>(contactAction, { sent: false, errors: {}, values: { topic } });
  const v = (k: string) => state.values[k] ?? '';
  const e = state.errors;

  if (state.sent) {
    return (
      <>
        <div className="alert alert--ok" role="status" dangerouslySetInnerHTML={{ __html: t.sent }} />
        <Link className="btn btn--outline" href={lp(lang, '/shop')}>{getDict(lang).common.toShop}</Link>
      </>
    );
  }

  return (
    <>
      <h2>{t.formTitle}</h2>
      <p>{t.formNote}</p>
      {e._ && <div className="alert alert--err" role="alert">{e._}</div>}
      <form action={action} noValidate>
        <input type="hidden" name="lang" value={lang} />
        <div className="hp" aria-hidden="true"><label>Website <input type="text" name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <div className="fgrid">
          <Field name="name" label={t.name} span={3} error={e.name}><input id="name" name="name" defaultValue={v('name')} required autoComplete="name" /></Field>
          <Field name="company" label={t.company} optional={getDict(lang).common.optional} span={3}><input id="company" name="company" defaultValue={v('company')} autoComplete="organization" /></Field>
          <Field name="email" label={t.email} span={3} error={e.email}><input id="email" type="email" name="email" defaultValue={v('email')} required autoComplete="email" /></Field>
          <Field name="phone" label={t.phoneLabel} optional={getDict(lang).common.optional} span={3}><input id="phone" type="tel" name="phone" defaultValue={v('phone')} autoComplete="tel" /></Field>
          <Field name="topic" label={t.topic}>
            <select id="topic" name="topic" defaultValue={TOPICS.includes(v('topic')) ? v('topic') : TOPICS[0]}>
              {t.topics.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </Field>
          <Field name="message" label={t.message} error={e.message}><textarea id="message" name="message" rows={6} required defaultValue={v('message')} /></Field>
          <div className="f"><p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }} dangerouslySetInnerHTML={{ __html: t.consent.replace('{privacy}', lp(lang, '/datenschutz')) }} /></div>
          <div className="f"><button className="btn btn--primary btn--lg" type="submit" disabled={pending}><Icon name="mail" /> {pending ? t.sending : t.send}</button></div>
        </div>
      </form>
    </>
  );
}

function WithTopic({ lang }: { lang: Locale }) {
  return <ContactForm topic={useSearchParams().get('thema') ?? ''} lang={lang} />;
}

/** Kontaktformular, Thema aus ?thema=… vorausgewählt. Die Seite selbst bleibt statisch (Cache). */
export function ContactFormAuto({ lang }: { lang: Locale }) {
  return (
    <Suspense fallback={<ContactForm topic="" lang={lang} />}>
      <WithTopic lang={lang} />
    </Suspense>
  );
}
