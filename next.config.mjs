/** @type {import('next').NextConfig} */

const basePath = process.env.NEXT_BASE_PATH ?? '';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  basePath,
  assetPrefix: basePath || undefined,

  // Exposed to the client so withBasePath() can prefix files under /public.
  // Next does NOT apply basePath to public assets (next/image src, CSS url(),
  // metadata icons) on static export, so we prefix those ourselves.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
