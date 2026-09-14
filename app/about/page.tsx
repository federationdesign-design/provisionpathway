import type { Metadata } from 'next';
import Band from '../../components/Band';
import ImageText from '../../components/ImageText';
import ClosingCta from '../../components/ClosingCta';
import { aboutIntro, aboutWhatWeDo, aboutClosing, aboutMeta } from '../../content/about';

export const metadata: Metadata = {
  title: aboutMeta.title,
  description: aboutMeta.description,
};

export default function AboutPage() {
  return (
    <main>
      <Band
        as="h1"
        headline={aboutIntro.headline}
        paragraphs={aboutIntro.paragraphs}
        ruleAbove
        wideText
      />
      <ImageText
        heading={aboutWhatWeDo.heading}
        paragraphs={aboutWhatWeDo.paragraphs}
        image={aboutWhatWeDo.image}
        imageAlt={aboutWhatWeDo.imageAlt}
      />
      <ClosingCta headline={aboutClosing.headline} />
    </main>
  );
}
