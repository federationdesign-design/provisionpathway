/* eslint-disable @next/next/no-img-element */
import { goal } from '../content/homepage';
import { TriangleIcon } from './Icons';
import Personas from './Personas';
import styles from './GoalBand.module.css';

export default function GoalBand() {
  return (
    <section className={styles.section} id="pathway">
      <Personas className={styles.personas} />

      <h2 className={styles.headline}>{goal.headline}</h2>
      <p className={styles.body}>{goal.body}</p>

      {/* Desktop only: watermark logo and quick links in the left column. */}
      <img
        className={styles.watermark}
        src="/assets/logo-footer-white.svg"
        alt=""
        aria-hidden="true"
        width={720}
        height={664}
      />

      <nav className={styles.links} aria-label="Quick links">
        <ul className={styles.linkList}>
          {goal.links.map((link) => (
            <li key={link.label}>
              <a className={styles.link} href={link.href}>
                <TriangleIcon className={styles.linkIcon} />
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
