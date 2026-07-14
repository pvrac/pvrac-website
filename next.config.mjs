/** @type {import('next').NextConfig} */

// GitHub Pages serves project repos at https://<user>.github.io/<repo>/,
// so pages/assets need a basePath of "/<repo>" unless this is a
// "<user>.github.io" root repo. The deploy workflow sets NEXT_BASE_PATH
// automatically based on the repo name — see .github/workflows/deploy.yml.
// For local dev this is left unset, so the site runs at "/" as normal.
const basePath = process.env.NEXT_BASE_PATH || '';

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  env: {
    // Exposed to the client so plain <a href> / <img src> links to files in
    // /public (PDF forms, etc.) can be prefixed manually — next/image and
    // next/link handle basePath automatically, but raw paths don't.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
