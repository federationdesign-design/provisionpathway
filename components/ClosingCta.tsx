/* eslint-disable @next/next/no-img-element */
import BookButton from './BookButton';
import styles from './ClosingCta.module.css';

// Closing call to action: headline and booking button, with the pathway
// artwork and the green stacked logo running down to the footer.
export default function ClosingCta({ headline }: { headline: string }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.headline}>{headline}</h2>

      <div className={styles.cta}>
        <BookButton size="large" />
      </div>

      <div className={styles.art} aria-hidden="true">
        <img
          className={styles.path}
          src="/assets/path-illustration_green.svg"
          alt=""
          width={3386}
          height={2968}
        />
        <img
          className={styles.watermark}
          src="/assets/logo-green.svg"
          alt=""
          width={720}
          height={664}
        />
      </div>
    </section>
  );
}
