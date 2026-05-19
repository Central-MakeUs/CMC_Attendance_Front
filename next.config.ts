import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async rewrites() {
    return [
      {
        source: '/api/graphql',
        destination: `${process.env.API_BASE_URL}/graphql`,
      },
    ];
  },
};

export default nextConfig;
