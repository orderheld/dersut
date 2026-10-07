import type { Metadata } from 'next';
import Link from 'next/link';
import { ActionForm } from '@/components/admin/ActionForm';
import { verifyResetToken } from '@/lib/auth';
import { newPasswordAction } from '../actions';

export const metadata: Metadata = { title: 'Neues Passwort' };

export default async function NewPassword({ searchParams }: { searchParams: Promise<{ t?: string }> }) {
  const { t = '' } = await searchParams;
  const email = await verifyResetToken(t);
  return (
    <div className="auth">
      <div className="auth__brand"><span>DERSUT</span><em>Admin · Schweiz</em></div>
      <h1>Neues Passwort</h1>
      {email ? (
        <>
          <p className="muted">Für {email}</p>
          <ActionForm action={newPasswordAction} className="form">
            <input type="hidden" name="t" value={t} />
            <input type="email" name="username" value={email} autoComplete="username" readOnly hidden />
            <label>Neues Passwort (min. 10 Zeichen)<input type="password" name="password" required minLength={10} autoComplete="new-password" autoFocus /></label>
            <label>Passwort wiederholen<input type="password" name="password2" required minLength={10} autoComplete="new-password" /></label>
            <button className="btn btn--primary" type="submit">Passwort speichern und anmelden</button>
          </ActionForm>
        </>
      ) : (
        <p className="muted">Der Link ist abgelaufen oder wurde schon benutzt. <Link href="/admin/passwort-vergessen">Neuen Link anfordern</Link></p>
      )}
    </div>
  );
}
