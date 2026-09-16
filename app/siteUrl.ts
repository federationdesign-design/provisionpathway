// The site's canonical origin, shared by the metadata base, the sitemap and
// robots.txt. It comes from NEXT_PUBLIC_SITE_URL, set in Vercel and in
// .env.local. If that is missing or not a valid URL, the live domain is used
// rather than failing the build.
const FALLBACK_SITE_URL = 'https://www.theprovisionpathway.co.uk';

export function siteUrl(): URL {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (value) {
    try {
      return new URL(value);
    } catch {
      console.warn(`NEXT_PUBLIC_SITE_URL is not a valid URL, using ${FALLBACK_SITE_URL}`);
    }
  }
  return new URL(FALLBACK_SITE_URL);
}

/** An absolute URL on this site, for a path such as '/about'. */
export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl()).toString();
}
