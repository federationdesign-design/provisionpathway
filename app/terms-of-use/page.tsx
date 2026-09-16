import type { Metadata } from 'next';
import LegalPage from '../../components/LegalPage';
import { termsOfUse } from '../../content/legal';

export const metadata: Metadata = {
  title: termsOfUse.metaTitle,
  description: termsOfUse.metaDescription,
  alternates: { canonical: termsOfUse.path },
};

export default function Page() {
  return <LegalPage page={termsOfUse} />;
}
