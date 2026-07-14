// Prefixes a root-relative path with the configured basePath, for use in
// plain <a href> / <img src> to files under /public (next/image and
// next/link already do this automatically for their own props).
export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${base}${path}`;
}
