import type { Metadata } from 'next';
import Link from 'next/link';
import { ActionForm } from '@/components/admin/ActionForm';
import { config } from '@/lib/config';
import { forgotPasswordAction } from '../actions';

export const metadata: Metadata = { title: 'Passwort vergessen' };

export default function ForgotPassword() {
  return (
    <div className="auth">
      <div className="auth__brand"><span>DERSUT</span><em>Admin · Schweiz</em></div>
      <h1>Passwort vergessen</h1>
      <p className="muted">Wir senden Ihnen einen Link, mit dem Sie ein neues Passwort setzen.</p>
      <ActionForm action={forgotPasswordAction} className="form">
        <label>E-Mail<input type="email" name="email" required defaultValue={config.email.orders} autoComplete="username" /></label>
        <button className="btn btn--primary" type="submit">Link senden</button>
      </ActionForm>
      <p><Link href="/admin/login">Zurück zur Anmeldung</Link></p>
    </div>
  );
}
