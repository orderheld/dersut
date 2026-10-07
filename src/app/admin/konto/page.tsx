import type { Metadata } from 'next';
import { ActionForm } from '@/components/admin/ActionForm';
import { ConfirmButton } from '@/components/admin/ConfirmButton';
import { requireAdmin } from '@/lib/admin';
import { config } from '@/lib/config';
import { query } from '@/lib/db';
import { chf, dateCh, ibanFormat } from '@/lib/format';
import { addAdminAction, changePasswordAction, removeAdminAction, testMailAction } from '../actions';

export const metadata: Metadata = { title: 'Einstellungen' };

export default async function Account() {
  const me = await requireAdmin();
  const admins = await query<{ id: number; email: string; created_at: Date }>('SELECT id, email, created_at FROM admins ORDER BY id');
  const resend = !!process.env.RESEND_API_KEY;
  const missing = [!config.company.street && 'Strasse', !config.company.zip && 'PLZ', !config.company.city && 'Ort', !config.company.uid && 'UID'].filter(Boolean);

  return (
    <>
      <header className="pagehead"><div><h1>Einstellungen</h1><p className="muted">Zugänge, Passwort und E-Mail-Versand.</p></div></header>
      {missing.length > 0 && (
        <div className="flash flash--error">
          In <code>src/lib/config.ts</code> fehlen noch: {missing.join(', ')}. Ohne vollständige Firmenadresse wird kein Swiss-QR-Code angezeigt.
        </div>
      )}
      <div className="grid2">
        <div>
          <section className="card form">
            <h2>Passwort ändern</h2>
            <ActionForm action={changePasswordAction} resetOnOk>
              <label>Aktuelles Passwort<input type="password" name="current" required autoComplete="current-password" /></label>
              <label>Neues Passwort (min. 10 Zeichen)<input type="password" name="password" required minLength={10} autoComplete="new-password" /></label>
              <label>Neues Passwort wiederholen<input type="password" name="password2" required minLength={10} autoComplete="new-password" /></label>
              <button className="btn btn--primary" type="submit">Passwort ändern</button>
            </ActionForm>
          </section>
          <section className="card form">
            <h2>E-Mail-Versand testen</h2>
            <p className="muted">
              Sendet eine Testnachricht, z. B. an eine Kundenadresse wie Gmail oder GMX. Versand über: <strong>{resend ? 'Resend' : 'nicht eingerichtet (RESEND_API_KEY fehlt)'}</strong>
            </p>
            <ActionForm action={testMailAction}>
              <label>Empfänger<input type="email" name="to" defaultValue={config.email.orders} /></label>
              <button className="btn btn--ghost" type="submit">Testmail senden</button>
            </ActionForm>
          </section>
        </div>
        <div>
          <section className="card form">
            <h2>Admin-Zugänge</h2>
            <ul className="log">
              {admins.map((a) => (
                <li key={a.id}>
                  {a.email} <span className="muted">seit {dateCh(a.created_at)}</span>
                  {a.id !== me.id && (
                    <form action={removeAdminAction} style={{ display: 'inline', marginLeft: 8 }}>
                      <input type="hidden" name="id" value={a.id} />
                      <ConfirmButton className="link-btn" confirm={`Zugang ${a.email} entfernen?`}>entfernen</ConfirmButton>
                    </form>
                  )}
                </li>
              ))}
            </ul>
            <ActionForm action={addAdminAction} resetOnOk>
              <label>E-Mail<input type="email" name="email" required /></label>
              <label>Passwort (min. 10 Zeichen)<input type="password" name="password" required minLength={10} autoComplete="new-password" /></label>
              <button className="btn btn--ghost" type="submit">Zugang hinzufügen</button>
            </ActionForm>
          </section>
          <section className="card">
            <h2>Shop-Einstellungen</h2>
            <dl className="kv">
              <dt>Versand</dt><dd>{chf(config.shop.shipping)} pauschal</dd>
              <dt>MWST</dt><dd>{config.shop.vatRate} % (inkl.)</dd>
              <dt>Zahlungsfrist</dt><dd>{config.shop.paymentDays} Tage</dd>
              <dt>Konto</dt><dd>{config.bank.holder}, {config.bank.bank}<br />{ibanFormat(config.bank.iban)}</dd>
            </dl>
            <p className="muted small">Diese Werte werden in der Datei <code>src/lib/config.ts</code> gepflegt.</p>
          </section>
        </div>
      </div>
    </>
  );
}
