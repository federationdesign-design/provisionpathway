/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { footer, nav } from '../content/homepage';
import CookieSettingsButton from './CookieSettingsButton';
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
                <Link className={styles.navLink} href={item.href}>
                  {item.label}
                </Link>
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
            <Link className={styles.legalLink} href={item.href}>
              {item.label}
            </Link>
          </li>
        ))}
        <li>
          <CookieSettingsButton className={`${styles.legalLink} ${styles.legalButton}`} />
        </li>
      </ul>

      <p className={styles.copyright}>{footer.copyright}</p>
    </footer>
  );
}
