/* eslint-disable @next/next/no-img-element */
import { intro, hero } from '../content/homepage';
import styles from './Opening.module.css';

export default function Opening() {
  return (
    <section className={styles.section} id="about">
      <p className={styles.eyebrow}>{intro.eyebrow}</p>
      <p className={styles.subline}>{intro.subline}</p>

      <hr className={styles.rule} />

      <p className={styles.body}>{intro.body}</p>

      <div className={styles.heroWrap}>
        <h1 className={styles.headline}>{hero.headline}</h1>

        <div className={styles.art} aria-hidden="true">
          <img
            className={styles.path}
            src="/assets/path-illustration_green.svg"
            alt=""
            width={3386}
            height={2968}
          />
          {/* Header watches this id to decide when the mobile pinned bar shows. */}
          <img
            id="hero-watermark"
            className={styles.watermark}
            src="/assets/logo-green.svg"
            alt=""
            width={200}
            height={80}
          />
        </div>
      </div>

      <div className={styles.divider} aria-hidden="true" />
    </section>
  );
}
