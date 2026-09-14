import Image from 'next/image';
import { quote } from '../content/homepage';
import BookButton from './BookButton';
import styles from './QuoteFeature.module.css';

export default function QuoteFeature() {
  return (
    <section className={styles.section}>
      <Image
        className={styles.image}
        src={quote.image}
        alt={quote.imageAlt}
        fill
        sizes="100vw"
      />
      <div className={styles.scrim} />

      <blockquote className={styles.quote}>
        <span className={styles.mark} aria-hidden="true">
          &ldquo;
        </span>
        <p className={styles.text}>{quote.text}</p>
      </blockquote>

      <div className={styles.cta}>
        <BookButton tone="onImage" />
      </div>
    </section>
  );
}
