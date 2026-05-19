import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
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
