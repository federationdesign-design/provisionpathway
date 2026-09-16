import type { Metadata } from 'next';
import LegalPage from '../../components/LegalPage';
import { cookiesPolicy } from '../../content/legal';

export const metadata: Metadata = {
  title: cookiesPolicy.metaTitle,
  description: cookiesPolicy.metaDescription,
  alternates: { canonical: cookiesPolicy.path },
};

export default function Page() {
  return <LegalPage page={cookiesPolicy} />;
}
