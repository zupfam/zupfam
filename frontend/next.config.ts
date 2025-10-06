import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/vendor/:vendorId',
        destination: '/vendor/[vendorId]',
      },
    ]
  },
};

export default nextConfig;
