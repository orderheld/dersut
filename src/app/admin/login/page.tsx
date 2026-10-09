import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ActionForm } from '@/components/admin/ActionForm';
import { currentAdmin, hasAdmins } from '@/lib/auth';
import { loginAction } from '../actions';

export const metadata: Metadata = { title: 'Anmelden' };

export default async function Login() {
  if (await currentAdmin()) redirect('/admin');
  if (!(await hasAdmins())) redirect('/admin/setup');
  return (
    <div className="auth">
      <div className="auth__brand"><span>DERSUT</span><em>Admin · Schweiz</em></div>
      <h1>Anmelden</h1>
      <ActionForm action={loginAction} className="form">
        {/* Für Passwort-Manager: fester Benutzername, nicht sichtbar */}
        <input type="text" name="username" value="Dersut Admin" autoComplete="username" readOnly hidden />
        <label>Passwort<input type="password" name="password" required autoFocus autoComplete="current-password" /></label>
        <button className="btn btn--primary" type="submit">Anmelden</button>
      </ActionForm>
      <p><Link href="/admin/passwort-vergessen">Passwort vergessen?</Link></p>
    </div>
  );
}
