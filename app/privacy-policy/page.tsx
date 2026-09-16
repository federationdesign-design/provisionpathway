import type { Metadata } from 'next';
import LegalPage from '../../components/LegalPage';
import { privacyPolicy } from '../../content/legal';

export const metadata: Metadata = {
  title: privacyPolicy.metaTitle,
  description: privacyPolicy.metaDescription,
  alternates: { canonical: privacyPolicy.path },
};

export default function Page() {
  return <LegalPage page={privacyPolicy} />;
}
