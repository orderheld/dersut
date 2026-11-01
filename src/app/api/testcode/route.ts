import { NextResponse } from 'next/server';
import { isValidTestCode, TEST_COOKIE } from '@/lib/testcode';

export const dynamic = 'force-dynamic';

/**
 * Testlink aus dem Admin (Firma & Shop → Testcode): /api/testcode?c=… schaltet in diesem Browser
 * für 24 Stunden den Testpreis von CHF 0.05 frei. /api/testcode?aus=1 beendet den Testmodus.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('c') ?? '';
  const ok = !url.searchParams.has('aus') && (await isValidTestCode(code));
  const res = NextResponse.redirect(new URL(ok ? '/warenkorb' : '/', url), 303);
  res.headers.set('Cache-Control', 'no-store');
  res.headers.set('X-Robots-Tag', 'noindex');
  if (ok) {
    res.cookies.set(TEST_COOKIE, code, { httpOnly: true, sameSite: 'lax', secure: url.protocol === 'https:', path: '/', maxAge: 60 * 60 * 24 });
  } else {
    res.cookies.delete(TEST_COOKIE);
  }
  return res;
}
