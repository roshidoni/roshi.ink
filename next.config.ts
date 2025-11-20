import type { NextConfig } from "next";
import createMDX from "@next/mdx"


const nextConfig: NextConfig = {
  pageExtensions: ["mdx", "tsx", "jsx"],

  experimental: {
    mdxRs: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "v1plzy848idikmzs.public.blob.vercel-storage.com",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },

  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

const withMDX = createMDX({})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)