'use client';

import { useActionState } from 'react';
import { b2bAction, type B2BState } from '@/app/[lang]/actions';
import { B2B_FORM, type B2BKind } from '@/content/b2b';
import { getDict } from '@/i18n';
import { lp, type Locale } from '@/lib/i18n';
import { Field } from './Field';
import { Icon } from './Icon';

/** Anfrageformular für Gastronomie und Firmen (Konditionen, Angebot). */
export function B2BForm({ kind, lang }: { kind: B2BKind; lang: Locale }) {
  const f = B2B_FORM[lang];
  const T = getDict(lang);
  const [state, action, pending] = useActionState<B2BState, FormData>(b2bAction, { sent: false, errors: {}, values: {} });
  const v = (k: string) => state.values[k] ?? '';
  const e = state.errors;
  const defaultType = kind === 'office' ? 'Büro / Firma' : 'Restaurant';

  if (state.sent) return <div className="alert alert--ok" role="status" dangerouslySetInnerHTML={{ __html: f.sent }} />;

  const opt = T.common.optional;
  return (
    <form action={action} noValidate>
      <input type="hidden" name="lang" value={lang} />
      <input type="hidden" name="kind" value={kind} />
      <div className="hp" aria-hidden="true"><label>Website <input type="text" name="website" tabIndex={-1} autoComplete="off" /></label></div>
      {e._ && <div className="alert alert--err" role="alert">{e._}</div>}
      <div className="fgrid">
        <Field name="company" label={f.company} span={3} error={e.company}><input id="company" name="company" defaultValue={v('company')} required autoComplete="organization" /></Field>
        <Field name="type" label={f.type} span={3}>
          <select id="type" name="type" defaultValue={v('type') || defaultType}>
            {f.types.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </Field>
        <Field name="name" label={f.contact} span={3} error={e.name}><input id="name" name="name" defaultValue={v('name')} required autoComplete="name" /></Field>
        <Field name="place" label={f.place} span={3} optional={opt}><input id="place" name="place" defaultValue={v('place')} autoComplete="address-level2" /></Field>
        <Field name="email" label={f.email} span={3} error={e.email}><input id="email" type="email" name="email" defaultValue={v('email')} required autoComplete="email" /></Field>
        <Field name="phone" label={f.phone} span={3} optional={opt}><input id="phone" type="tel" name="phone" defaultValue={v('phone')} autoComplete="tel" /></Field>
        <Field name="volume" label={f.volume} span={3}>
          <select id="volume" name="volume" defaultValue={v('volume') || f.volumes[0][0]}>
            {f.volumes.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </Field>
        <Field name="machine" label={f.machine} span={3}>
          <select id="machine" name="machine" defaultValue={v('machine') || f.machines[kind === 'office' ? 1 : 0][0]}>
            {f.machines.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </Field>
        <Field name="message" label={f.message} optional={opt} error={e.message}><textarea id="message" name="message" rows={5} placeholder={f.messagePlaceholder} defaultValue={v('message')} /></Field>
        <div className="f"><p className="form-consent" dangerouslySetInnerHTML={{ __html: T.contact.consent.replace('{privacy}', lp(lang, '/datenschutz')) }} /></div>
        <div className="f"><button className="btn btn--primary btn--lg" type="submit" disabled={pending}><Icon name="mail" /> {pending ? f.sending : f.send}</button></div>
      </div>
    </form>
  );
}

