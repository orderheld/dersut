import { NextResponse, type NextRequest } from 'next/server';

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
  if (first === 'fr' || first === 'it' || first === 'en') return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/de${pathname === '/' ? '' : pathname}`;
  url.search = search;
  return NextResponse.rewrite(url);
}

export const config = {
  // Admin, interne Dateien und statische Dateien (mit Dateiendung) nicht umleiten
  matcher: ['/((?!admin|_next|api|brand/|uploads/|.*\\.[a-zA-Z0-9]+$).*)'],
};
