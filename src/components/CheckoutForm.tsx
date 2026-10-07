'use client';

import { useActionState, type ReactNode } from 'react';
import { checkoutAction, type CheckoutState } from '@/app/(site)/actions';
import { Field } from './Field';
import { Icon } from './Icon';

export function CheckoutForm({ summary, initial }: { summary: ReactNode; initial: Record<string, string> }) {
  const [state, action, pending] = useActionState<CheckoutState, FormData>(checkoutAction, { errors: {}, values: initial });
  const v = (k: string) => (state.values as Record<string, string>)[k] ?? '';
  const e = state.errors;
  const hasErrors = Object.keys(e).length > 0;

  return (
    <>
      {hasErrors && <div className="alert alert--err" role="alert">{e._ ?? 'Bitte prüfen Sie die markierten Felder.'}</div>}
      <form action={action} className="shopgrid" noValidate>
        <div className="hp" aria-hidden="true"><label>Website <input type="text" name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <div>
          <div className="form-card">
            <h2>Lieferadresse</h2>
            <p>Wir liefern an Adressen in der ganzen Schweiz.</p>
            <div className="fgrid">
              <Field name="salutation" label="Anrede" optional span={2}>
                <select id="salutation" name="salutation" defaultValue={v('salutation')}>
                  <option value=""></option>
                  <option>Frau</option><option>Herr</option><option>Divers</option>
                </select>
              </Field>
              <Field name="company" label="Firma" optional span={4} error={e.company}>
                <input id="company" name="company" defaultValue={v('company')} autoComplete="organization" />
              </Field>
              <Field name="first_name" label="Vorname" span={3} error={e.first_name}>
                <input id="first_name" name="first_name" defaultValue={v('first_name')} required autoComplete="given-name" />
              </Field>
              <Field name="last_name" label="Nachname" span={3} error={e.last_name}>
                <input id="last_name" name="last_name" defaultValue={v('last_name')} required autoComplete="family-name" />
              </Field>
              <Field name="street" label="Strasse und Nr." error={e.street}>
                <input id="street" name="street" defaultValue={v('street')} required autoComplete="street-address" />
              </Field>
              <Field name="zip" label="PLZ" span={2} error={e.zip}>
                <input id="zip" name="zip" defaultValue={v('zip')} required inputMode="numeric" maxLength={4} autoComplete="postal-code" />
              </Field>
              <Field name="city" label="Ort" span={4} error={e.city}>
                <input id="city" name="city" defaultValue={v('city')} required autoComplete="address-level2" />
              </Field>
              <Field name="country" label="Land" span={2}>
                <input id="country" value="Schweiz" disabled />
              </Field>
              <Field name="email" label="E-Mail" span={4} error={e.email}>
                <input id="email" type="email" name="email" defaultValue={v('email')} required autoComplete="email" />
              </Field>
              <Field name="phone" label="Telefon" optional span={3} error={e.phone}>
                <input id="phone" type="tel" name="phone" defaultValue={v('phone')} autoComplete="tel" />
              </Field>
              <Field name="note" label="Bemerkung" optional error={e.note}>
                <textarea id="note" name="note" rows={3} defaultValue={v('note')} />
              </Field>
            </div>
          </div>
          <div className="form-card">
            <h2>Zahlungsart</h2>
            <div className="paymethod" style={{ marginTop: 18 }}>
              <Icon name="bank" />
              <div>
                <strong>Vorauskasse per Banküberweisung</strong>
                <span>Nach Abschluss der Bestellung erhalten Sie Ihre Bestellnummer, die Bankverbindung und einen QR-Code für Ihre Banking-App. Wir versenden, sobald der Betrag eingegangen ist.</span>
              </div>
            </div>
          </div>
        </div>
        <aside className="summary">
          {summary}
          <div className={`f${e.agb ? ' f--error' : ''}`} style={{ marginBottom: 18 }}>
            <label className="check">
              <input type="checkbox" name="agb" value="1" defaultChecked={!!v('agb')} />{' '}
              <span>Ich habe die <a href="/agb" target="_blank">AGB</a> und die <a href="/datenschutz" target="_blank">Datenschutzerklärung</a> gelesen und akzeptiere sie.</span>
            </label>
            {e.agb && <div className="f__err">{e.agb}</div>}
          </div>
          <button className="btn btn--primary btn--lg btn--block" type="submit" disabled={pending}>
            <Icon name="lock" /> {pending ? 'Bestellung wird gesendet …' : 'Zahlungspflichtig bestellen'}
          </button>
          <div className="summary__note"><Icon name="shield" /><span>Keine Kartendaten nötig. Ihre Angaben werden nur zur Abwicklung Ihrer Bestellung verwendet.</span></div>
        </aside>
      </form>
    </>
  );
}
