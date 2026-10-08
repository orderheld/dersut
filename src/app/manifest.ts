import type { MetadataRoute } from 'next';

/** Web-App-Manifest: Name und Symbol beim «Zum Home-Bildschirm hinzufügen» */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dersut Kaffee Schweiz',
    short_name: 'Dersut',
    description: 'Original Dersut Espresso aus Conegliano, offizieller Vertrieb Schweiz',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#fbf9f4',
    theme_color: '#002856',
    lang: 'de-CH',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
