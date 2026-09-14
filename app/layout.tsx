import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import AssessmentModalProvider from '../components/AssessmentModalProvider';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-body',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://provisionpathway.co.uk'),
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
        {/* Shared by every page: header with the pinned mobile bar, footer, and
            the one assessment lightbox. Pages render only their <main>. */}
        <AssessmentModalProvider>
          <Header />
          {children}
          <Footer />
        </AssessmentModalProvider>
      </body>
    </html>
  );
}
