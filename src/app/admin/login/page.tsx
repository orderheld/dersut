import type { Metadata } from 'next';
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
        <label>E-Mail<input type="email" name="email" required autoFocus autoComplete="username" /></label>
        <label>Passwort<input type="password" name="password" required autoComplete="current-password" /></label>
        <button className="btn btn--primary" type="submit">Anmelden</button>
      </ActionForm>
    </div>
  );
}
