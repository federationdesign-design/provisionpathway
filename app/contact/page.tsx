import type { Metadata } from 'next';
import Band from '../../components/Band';
import ContactForm from '../../components/ContactForm';
import { contactMeta, contactPage } from '../../content/contact';
import styles from '../../components/ContactPage.module.css';

export const metadata: Metadata = {
  title: contactMeta.title,
  description: contactMeta.description,
  alternates: { canonical: '/contact' },
};

// The introduction and email address sit in the green band beside the
// watermark, as the About page's body copy does, with the enquiry form below.
export default function ContactPage() {
  return (
    <main>
      <Band as="h1" headline={contactPage.title} paragraphs={contactPage.intro} ruleAbove wideText />

      <section className={styles.section} aria-labelledby="contact-form-heading">
        <h2 className={styles.heading} id="contact-form-heading">
          {contactPage.formHeading}
        </h2>
        <ContactForm />
      </section>
    </main>
  );
}
