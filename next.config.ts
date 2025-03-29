import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverActions: {
    bodySizeLimit: '2mb',
    timeout: 10000, // 10 seconds
  },
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src'],
  }
};

export default nextConfig;
