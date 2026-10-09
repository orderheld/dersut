/** Eigenes Web-App-Manifest für den Admin-Bereich: eigene App «Dersut Admin» auf dem Home-Bildschirm. */
export const dynamic = 'force-static';

export function GET() {
  return Response.json(
    {
      id: '/admin',
      name: 'Dersut Admin',
      short_name: 'Dersut Admin',
      description: 'Bestellungen, Nachrichten und Produkte von Dersut Kaffee Schweiz verwalten',
      start_url: '/admin',
      scope: '/admin',
      display: 'standalone',
      background_color: '#0e0f12',
      theme_color: '#0e0f12',
      lang: 'de-CH',
      icons: [
        { src: '/icons/admin-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: '/icons/admin-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        { src: '/icons/admin-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    { headers: { 'Content-Type': 'application/manifest+json' } },
  );
}
