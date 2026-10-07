import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // PGlite wird nur lokal zum Testen ohne Neon verwendet
  serverExternalPackages: ['@electric-sql/pglite'],
  // Produktbilder bis 4 MB im Admin hochladen
  experimental: { serverActions: { bodySizeLimit: '5mb' } },
  // dersutkaffee.ch und www.* leiten auf dersut.ch weiter (zusätzlich zur Domain-Einstellung in Vercel)
  async redirects() {
    return [
      { source: '/:path*', has: [{ type: 'host', value: '(www\\.)?dersutkaffee\\.ch' }], destination: 'https://dersut.ch/:path*', permanent: true },
      { source: '/:path*', has: [{ type: 'host', value: 'www\\.dersut\\.ch' }], destination: 'https://dersut.ch/:path*', permanent: true },
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
