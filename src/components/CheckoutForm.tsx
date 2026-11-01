'use client';

import { useActionState, useEffect, useRef, useState, type ReactNode } from 'react';
import { checkoutAction, type CheckoutState } from '@/app/[lang]/actions';
import { getDict } from '@/i18n';
import { lp, type Locale } from '@/lib/i18n';
import { Field } from './Field';
import { Icon } from './Icon';
import './shop.css';

/** Hinweise zur Zahlungsart: Online klar als «jetzt bezahlen», Vorauskasse rot mit Empfehlung für Online */
const PAY: Record<Locale, { recommended: string; onlineNow: string; prepayWarn: string; prepayTip: string; switchOnline: string }> = {
  de: {
    recommended: 'Empfohlen',
    onlineNow: 'Sie bezahlen jetzt online: Nach «Bestellen und bezahlen» öffnet sich die sichere Zahlungsseite. Danach versenden wir sofort.',
    prepayWarn: 'Bei Vorauskasse versenden wir erst, wenn Ihr Geld auf unserem Konto eingetroffen ist. Das dauert meist 1 bis 3 Werktage.',
    prepayTip: 'Wir empfehlen die Online-Zahlung, dann ist Ihr Kaffee sofort unterwegs.',
    switchOnline: 'Online bezahlen wählen',
  },
  fr: {
    recommended: 'Recommandé',
    onlineNow: 'Vous payez maintenant en ligne : après « Commander et payer », la page de paiement sécurisée s’ouvre. Nous expédions ensuite immédiatement.',
    prepayWarn: 'Avec le paiement anticipé, nous n’expédions qu’une fois votre argent arrivé sur notre compte, généralement en 1 à 3 jours ouvrables.',
    prepayTip: 'Nous recommandons le paiement en ligne : votre café part tout de suite.',
    switchOnline: 'Choisir le paiement en ligne',
  },
  it: {
    recommended: 'Consigliato',
    onlineNow: 'Pagate ora online: dopo «Ordina e paga» si apre la pagina di pagamento sicura. Poi spediamo subito.',
    prepayWarn: 'Con il pagamento anticipato spediamo solo quando il denaro è arrivato sul nostro conto, di solito in 1–3 giorni lavorativi.',
    prepayTip: 'Consigliamo il pagamento online: il vostro caffè parte subito.',
    switchOnline: 'Scegliere il pagamento online',
  },
  en: {
    recommended: 'Recommended',
    onlineNow: 'You pay online now: after “Order and pay”, the secure payment page opens. We then ship right away.',
    prepayWarn: 'With payment in advance, we only ship once your money has reached our account, usually within 1 to 3 working days.',
    prepayTip: 'We recommend paying online, so your coffee is on its way immediately.',
    switchOnline: 'Choose online payment',
  },
};

export function CheckoutForm({ summary, initial, lang, online = false }: { summary: ReactNode; initial: Record<string, string>; lang: Locale; online?: boolean }) {
  const t = getDict(lang).checkout;
  const [state, action, pending] = useActionState<CheckoutState, FormData>(checkoutAction, { errors: {}, values: initial });
  const v = (k: string) => (state.values as Record<string, string>)[k] ?? '';
  const e = state.errors;
  const hasErrors = Object.keys(e).length > 0;
  const formRef = useRef<HTMLFormElement>(null);
  const [method, setMethod] = useState(online ? 'online' : 'prepay');
  // Nach einem Fehler zum ersten markierten Feld springen (wichtig auf dem Handy)
  useEffect(() => {
    if (!hasErrors) return;
    const el = formRef.current?.querySelector<HTMLElement>('.f--error input, .f--error select, .f--error textarea');
    if (el) {
      el.focus({ preventScroll: true });
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [state, hasErrors]);

  return (
    <>
      {hasErrors && <div className="alert alert--err" role="alert">{e._ ?? t.checkFields}</div>}
      <form action={action} className="shopgrid" noValidate ref={formRef}>
        <input type="hidden" name="lang" value={lang} />
        <div className="hp" aria-hidden="true"><label>Website <input type="text" name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <div>
          <div className="form-card">
            <h2>{t.address}</h2>
            <p>{t.addressNote}</p>
            <div className="fgrid">
              <Field name="first_name" label={t.firstName} span={3} error={e.first_name}>
                <input id="first_name" name="first_name" defaultValue={v('first_name')} required autoComplete="given-name" autoCapitalize="words" enterKeyHint="next" />
              </Field>
              <Field name="last_name" label={t.lastName} span={3} error={e.last_name}>
                <input id="last_name" name="last_name" defaultValue={v('last_name')} required autoComplete="family-name" autoCapitalize="words" enterKeyHint="next" />
              </Field>
              <Field name="company" label={t.company} optional={getDict(lang).common.optional} error={e.company}>
                <input id="company" name="company" defaultValue={v('company')} autoComplete="organization" />
              </Field>
              <Field name="street" label={t.street} error={e.street}>
                <input id="street" name="street" defaultValue={v('street')} required autoComplete="address-line1" autoCapitalize="words" enterKeyHint="next" />
              </Field>
              <Field name="zip" label={t.zip} span={2} error={e.zip}>
                <input id="zip" name="zip" defaultValue={v('zip')} required inputMode="numeric" maxLength={4} autoComplete="postal-code" pattern="[0-9]*" enterKeyHint="next" />
              </Field>
              <Field name="city" label={t.city} span={4} error={e.city}>
                <input id="city" name="city" defaultValue={v('city')} required autoComplete="address-level2" autoCapitalize="words" enterKeyHint="next" />
              </Field>
              <Field name="email" label={t.email} span={3} error={e.email}>
                <input id="email" type="email" name="email" defaultValue={v('email')} required autoComplete="email" inputMode="email" autoCapitalize="off" spellCheck={false} enterKeyHint="next" />
              </Field>
              <Field name="phone" label={t.phone} optional={getDict(lang).common.optional} span={3} error={e.phone}>
                <input id="phone" type="tel" name="phone" defaultValue={v('phone')} autoComplete="tel" inputMode="tel" enterKeyHint="next" />
              </Field>
            </div>
          </div>
          <div className="form-card">
            <h2>{t.payment}</h2>
            {online ? (
              <div className="paychoice" role="radiogroup" aria-label={t.payment}>
                <label className={`paymethod paymethod--choice${method === 'online' ? ' is-on' : ''}`}>
                  <input type="radio" name="payment" value="online" checked={method === 'online'} onChange={() => setMethod('online')} />
                  <Icon name="lock" />
                  <div>
                    <strong>{t.online} <em className="paymethod__badge">{PAY[lang].recommended}</em></strong>
                    <span>{t.onlineText}</span>
                  </div>
                </label>
                <label className={`paymethod paymethod--choice${method === 'prepay' ? ' is-on' : ''}`}>
                  <input type="radio" name="payment" value="prepay" checked={method === 'prepay'} onChange={() => setMethod('prepay')} />
                  <Icon name="bank" />
                  <div>
                    <strong>{t.prepay}</strong>
                    <span>{t.prepayText}</span>
                  </div>
                </label>
                {method === 'online' ? (
                  <div className="paynote paynote--ok" role="status"><Icon name="lock" /><span>{PAY[lang].onlineNow}</span></div>
                ) : (
                  <div className="paynote paynote--warn" role="alert">
                    <strong>{PAY[lang].prepayWarn}</strong>
                    <span>{PAY[lang].prepayTip}</span>
                    <button type="button" className="btn btn--primary btn--sm" onClick={() => setMethod('online')}>{PAY[lang].switchOnline}</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="paymethod" style={{ marginTop: 18 }}>
                <Icon name="bank" />
                <div>
                  <strong>{t.prepay}</strong>
                  <span>{t.prepayText}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="summary">
          {summary}
          <div className="fgrid" style={{ marginBottom: 14 }}>
            <Field name="note" label={t.note} optional={getDict(lang).common.optional} error={e.note}>
              <textarea id="note" name="note" rows={2} defaultValue={v('note')} />
            </Field>
          </div>
          <div className={`f${e.agb ? ' f--error' : ''}`} style={{ marginBottom: 18 }}>
            <label className="check">
              <input type="checkbox" name="agb" value="1" defaultChecked={!!v('agb')} />{' '}
              <span dangerouslySetInnerHTML={{ __html: t.agb.replace('{agb}', lp(lang, '/agb')).replace('{privacy}', lp(lang, '/datenschutz')) }} />
            </label>
            {e.agb && <div className="f__err">{e.agb}</div>}
          </div>
          <button className="btn btn--primary btn--lg btn--block" type="submit" disabled={pending}>
            <Icon name="lock" /> {pending ? t.sending : method === 'online' ? t.submitOnline : t.submit}
          </button>
          <div className="summary__note"><Icon name="shield" /><span>{method === 'online' ? t.securePay : t.noCard}</span></div>
        </div>
      </form>
    </>
  );
}
