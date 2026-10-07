import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { ActionForm } from '@/components/admin/ActionForm';
import { hasAdmins } from '@/lib/auth';
import { config } from '@/lib/config';
import { setupAction } from '../actions';

export const metadata: Metadata = { title: 'Einrichten' };

export default async function Setup() {
  if (await hasAdmins()) redirect('/admin/login');
  return (
    <div className="auth">
      <div className="auth__brand"><span>DERSUT</span><em>Admin · Schweiz</em></div>
      <h1>Admin-Zugang einrichten</h1>
      <p className="muted">Willkommen! Legen Sie jetzt das erste Admin-Konto an. Diese Seite ist nur verfügbar, solange noch kein Konto existiert.</p>
      <ActionForm action={setupAction} className="form">
        <label>E-Mail<input type="email" name="email" required defaultValue={config.email.orders} /></label>
        <label>Passwort (min. 10 Zeichen)<input type="password" name="password" required minLength={10} autoComplete="new-password" /></label>
        <label>Passwort wiederholen<input type="password" name="password2" required minLength={10} autoComplete="new-password" /></label>
        <button className="btn btn--primary" type="submit">Konto anlegen</button>
      </ActionForm>
    </div>
  );
}
