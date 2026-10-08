import { NextResponse, type NextRequest } from 'next/server';
import { CART_COUNT_COOKIE } from '@/lib/cart-shared';

/** Ältere Warenkörbe haben noch kein lesbares Anzahl-Cookie: einmalig nachtragen. */
function withCartCount(request: NextRequest, res: NextResponse): NextResponse {
  const raw = request.cookies.get('dersut_cart')?.value;
  if (!raw || request.cookies.has(CART_COUNT_COOKIE)) return res;
  let n = 0;
  try {
    for (const v of Object.values(JSON.parse(raw) as Record<string, unknown>)) n += Math.max(0, Math.floor(Number(v)) || 0);
  } catch {
    return res;
  }
  res.cookies.set(CART_COUNT_COOKIE, String(n), { sameSite: 'lax', secure: request.nextUrl.protocol === 'https:', path: '/', maxAge: 60 * 60 * 24 * 30 });
  return res;
}

/**
 * Sprach-Routing: Deutsch ohne Präfix (/shop → intern /de/shop),
 * /fr, /it, /en direkt, /de/... wird auf die Adresse ohne Präfix umgeleitet.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const first = pathname.split('/')[1];

  if (first === 'de') {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || '/';
    return NextResponse.redirect(url, 308);
  }
  if (first === 'fr' || first === 'it' || first === 'en') return withCartCount(request, NextResponse.next());

  const url = request.nextUrl.clone();
  url.pathname = `/de${pathname === '/' ? '' : pathname}`;
  url.search = search;
  return withCartCount(request, NextResponse.rewrite(url));
}

export const config = {
  // Admin, interne Dateien und statische Dateien (mit Dateiendung) nicht umleiten
  matcher: ['/((?!admin|_next|api|brand/|uploads/|.*\\.[a-zA-Z0-9]+$).*)'],
};
