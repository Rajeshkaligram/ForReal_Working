import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Proxy backend requests through /rent-api/* to avoid Next.js /api conflict ──
  // /api/* is reserved by Next.js for API routes — use a different prefix
  async rewrites() {
    return [
      {
        source: "/rent-api/:path*",
        destination: "https://rentasuit.ca/api/v1.0/:path*",
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rentasuit.ca",
      },
      {
        protocol: "https",
        hostname: "**.rentasuit.ca",
      },
    ],
  },
};

export default nextConfig;
