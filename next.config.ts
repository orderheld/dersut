import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // PGlite wird nur lokal zum Testen ohne Neon verwendet
  serverExternalPackages: ['@electric-sql/pglite'],
  // Produktbilder bis 4 MB im Admin hochladen
  experimental: { serverActions: { bodySizeLimit: '5mb' } },
  // Bildoptimierung: Originalbilder von dersut.it und Uploads (Vercel Blob) werden als WebP/AVIF
  // in passender Grösse ausgeliefert und lange im CDN gehalten
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [480, 750, 1080, 1440, 1920],
    imageSizes: [96, 160, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: 'https', hostname: 'www.dersut.it', pathname: '/media/**' },
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
    ],
  },
  // Hauptadresse ist dersutkaffee.ch: dersut.ch und alle www.-Varianten leiten dorthin weiter
  async redirects() {
    return [
      { source: '/:path*', has: [{ type: 'host', value: '(www\\.)?dersut\\.ch' }], destination: 'https://dersutkaffee.ch/:path*', permanent: true },
      { source: '/:path*', has: [{ type: 'host', value: 'www\\.dersutkaffee\\.ch' }], destination: 'https://dersutkaffee.ch/:path*', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};

export default nextConfig;
