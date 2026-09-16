import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Analytics from '../components/Analytics';
import AssessmentModalProvider from '../components/AssessmentModalProvider';
import CalendlyBooking from '../components/CalendlyBooking';
import CookieBanner from '../components/CookieBanner';
import CookieConsentProvider from '../components/CookieConsentProvider';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { siteUrl } from './siteUrl';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-body',
});

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: 'The Provision Pathway | SEND consultancy in Warwickshire',
  description:
    'Independent SEND consultancy in Warwickshire. Structured, observation-based assessments that help families understand a young person\u2019s needs and plan a clear next step.',
  openGraph: {
    title: 'The Provision Pathway',
    description:
      'Independent SEND consultancy in Warwickshire. Move forward with greater clarity and confidence.',
    type: 'website',
    locale: 'en_GB',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f9f9f9',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={jakarta.variable}>
      <body>
        {/* Shared by every page: the cookie banner, header with the pinned
            mobile bar, footer, and the one assessment lightbox. Pages render
            only their <main>. Analytics and Calendly read the visitor's cookie
            decision and load nothing without consent. */}
        <CookieConsentProvider>
          <CookieBanner />
          <AssessmentModalProvider>
            <Header />
            {children}
            <Footer />
          </AssessmentModalProvider>
          <CalendlyBooking />
          <Analytics />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
