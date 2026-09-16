import type { MetadataRoute } from 'next';
import { absoluteUrl, siteUrl } from './siteUrl';

// Every page may be crawled. The contact form's route handler only accepts
// posted submissions, so it is kept out of crawlers' way.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: siteUrl().origin,
  };
}
