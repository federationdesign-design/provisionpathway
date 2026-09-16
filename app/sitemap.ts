import type { MetadataRoute } from 'next';
import { absoluteUrl } from './siteUrl';

// Every page on the site. Add new routes here as they are built. No last
// modified dates are given, since none are tracked and a build date would
// claim every page changed on every deploy.
const ROUTES = ['/', '/about', '/contact', '/cookies-policy', '/privacy-policy', '/terms-of-use'];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({ url: absoluteUrl(path) }));
}
