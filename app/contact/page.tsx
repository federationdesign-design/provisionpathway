import type { Metadata } from 'next';
import Band from '../../components/Band';
import ContactForm from '../../components/ContactForm';
import RichText from '../../components/RichText';
import { contactMeta, contactPage } from '../../content/contact';
import styles from '../../components/ContactPage.module.css';

export const metadata: Metadata = {
  title: contactMeta.title,
  description: contactMeta.description,
  alternates: { canonical: '/contact' },
};

// A short introduction, the contact details, then the enquiry form. The title
// band matches the legal pages, without the desktop watermark it is too short
// to hold.
export default function ContactPage() {
  return (
    <main>
      <Band as="h1" headline={contactPage.title} paragraphs={[]} ruleAbove wideText watermark={false} />

      <div className={styles.section}>
        <p className={styles.intro}>
          <RichText text={contactPage.intro} />
        </p>

        <section className={styles.part} aria-labelledby="contact-email-heading">
          <h2 className={styles.heading} id="contact-email-heading">
            {contactPage.emailHeading}
          </h2>
          <a className={styles.email} href={`mailto:${contactPage.email}`}>
            {contactPage.email}
          </a>
        </section>

        <section className={styles.part} aria-labelledby="contact-form-heading">
          <h2 className={styles.heading} id="contact-form-heading">
            {contactPage.formHeading}
          </h2>
          <ContactForm />
        </section>
      </div>
    </main>
  );
}
