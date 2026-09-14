import Header from '../components/Header';
import Opening from '../components/Opening';
import GoalBand from '../components/GoalBand';
import ProcessLayout from '../components/ProcessLayout';
import Process from '../components/Process';
import QuoteFeature from '../components/QuoteFeature';
import AssessmentDetail from '../components/AssessmentDetail';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Opening />
        <GoalBand />
        <ProcessLayout>
          <Process />
          <QuoteFeature />
          <AssessmentDetail />
        </ProcessLayout>
      </main>
      <Footer />
    </>
  );
}
