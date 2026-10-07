'use client';

import { useActionState, type ReactNode } from 'react';
import { checkoutAction, type CheckoutState } from '@/app/[lang]/actions';
import { getDict } from '@/i18n';
import { de } from '@/i18n/de';
import { lp, type Locale } from '@/lib/i18n';
import { Field } from './Field';
import { Icon } from './Icon';

export function CheckoutForm({ summary, initial, lang }: { summary: ReactNode; initial: Record<string, string>; lang: Locale }) {
  const t = getDict(lang).checkout;
  const [state, action, pending] = useActionState<CheckoutState, FormData>(checkoutAction, { errors: {}, values: initial });
  const v = (k: string) => (state.values as Record<string, string>)[k] ?? '';
  const e = state.errors;
  const hasErrors = Object.keys(e).length > 0;

  return (
    <>
      {hasErrors && <div className="alert alert--err" role="alert">{e._ ?? t.checkFields}</div>}
      <form action={action} className="shopgrid" noValidate>
        <input type="hidden" name="lang" value={lang} />
        <div className="hp" aria-hidden="true"><label>Website <input type="text" name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <div>
          <div className="form-card">
            <h2>{t.address}</h2>
            <p>{t.addressNote}</p>
            <div className="fgrid">
              <Field name="salutation" label={t.salutation} optional={getDict(lang).common.optional} span={2}>
                <select id="salutation" name="salutation" defaultValue={v('salutation')}>
                  <option value=""></option>
                  {de.checkout.salutations.map((s, i) => <option key={s} value={s}>{t.salutations[i]}</option>)}
                </select>
              </Field>
              <Field name="company" label={t.company} optional={getDict(lang).common.optional} span={4} error={e.company}>
                <input id="company" name="company" defaultValue={v('company')} autoComplete="organization" />
              </Field>
              <Field name="first_name" label={t.firstName} span={3} error={e.first_name}>
                <input id="first_name" name="first_name" defaultValue={v('first_name')} required autoComplete="given-name" />
              </Field>
              <Field name="last_name" label={t.lastName} span={3} error={e.last_name}>
                <input id="last_name" name="last_name" defaultValue={v('last_name')} required autoComplete="family-name" />
              </Field>
              <Field name="street" label={t.street} error={e.street}>
                <input id="street" name="street" defaultValue={v('street')} required autoComplete="street-address" />
              </Field>
              <Field name="zip" label={t.zip} span={2} error={e.zip}>
                <input id="zip" name="zip" defaultValue={v('zip')} required inputMode="numeric" maxLength={4} autoComplete="postal-code" />
              </Field>
              <Field name="city" label={t.city} span={4} error={e.city}>
                <input id="city" name="city" defaultValue={v('city')} required autoComplete="address-level2" />
              </Field>
              <Field name="country" label={t.country} span={2}>
                <input id="country" value={getDict(lang).common.country} disabled />
              </Field>
              <Field name="email" label={t.email} span={4} error={e.email}>
                <input id="email" type="email" name="email" defaultValue={v('email')} required autoComplete="email" />
              </Field>
              <Field name="phone" label={t.phone} optional={getDict(lang).common.optional} span={3} error={e.phone}>
                <input id="phone" type="tel" name="phone" defaultValue={v('phone')} autoComplete="tel" />
              </Field>
              <Field name="note" label={t.note} optional={getDict(lang).common.optional} error={e.note}>
                <textarea id="note" name="note" rows={3} defaultValue={v('note')} />
              </Field>
            </div>
          </div>
          <div className="form-card">
            <h2>{t.payment}</h2>
            <div className="paymethod" style={{ marginTop: 18 }}>
              <Icon name="bank" />
              <div>
                <strong>{t.prepay}</strong>
                <span>{t.prepayText}</span>
              </div>
            </div>
          </div>
        </div>
        <aside className="summary">
          {summary}
          <div className={`f${e.agb ? ' f--error' : ''}`} style={{ marginBottom: 18 }}>
            <label className="check">
              <input type="checkbox" name="agb" value="1" defaultChecked={!!v('agb')} />{' '}
              <span dangerouslySetInnerHTML={{ __html: t.agb.replace('{agb}', lp(lang, '/agb')).replace('{privacy}', lp(lang, '/datenschutz')) }} />
            </label>
            {e.agb && <div className="f__err">{e.agb}</div>}
          </div>
          <button className="btn btn--primary btn--lg btn--block" type="submit" disabled={pending}>
            <Icon name="lock" /> {pending ? t.sending : t.submit}
          </button>
          <div className="summary__note"><Icon name="shield" /><span>{t.noCard}</span></div>
        </aside>
      </form>
    </>
  );
}
