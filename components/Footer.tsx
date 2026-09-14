/* eslint-disable @next/next/no-img-element */
import { footer, nav } from '../content/homepage';
import ServicesNavButton from './ServicesNavButton';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <nav className={styles.nav} aria-label="Footer">
        <ul className={styles.navList}>
          {nav.map((item) => (
            <li key={item.label}>
              {'href' in item ? (
                <a className={styles.navLink} href={item.href}>
                  {item.label}
                </a>
              ) : (
                <ServicesNavButton
                  className={`${styles.navLink} ${styles.navButton}`}
                  label={item.label}
                />
              )}
            </li>
          ))}
        </ul>
      </nav>

      <img
        className={styles.logo}
        src="/assets/logo-footer-white.svg"
        alt="The Provision Pathway"
        width={200}
        height={90}
      />

      <ul className={styles.legal}>
        {footer.legal.map((item) => (
          <li key={item.label}>
            <a className={styles.legalLink} href={item.href}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <p className={styles.copyright}>{footer.copyright}</p>
    </footer>
  );
}
