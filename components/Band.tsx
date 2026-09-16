/* eslint-disable @next/next/no-img-element */
import { TriangleIcon } from './Icons';
import RichText from './RichText';
import styles from './Band.module.css';

type Link = { label: string; href: string };

// The green band shared by the homepage goal section and the About page
// introduction. On desktop the watermark logo (and any quick links) take the
// left column, with the headline, paragraphs and any media across the rest.
//
// `media` renders first in the document so it leads on mobile, as the
// homepage carousel does, and moves beneath the text on desktop.
export default function Band({
  id,
  as: Heading = 'h2',
  headline,
  paragraphs,
  media,
  links,
  ruleAbove = false,
  wideText = false,
  watermark = true,
}: {
  id?: string;
  as?: 'h1' | 'h2';
  headline: string;
  paragraphs: string[];
  media?: React.ReactNode;
  links?: Link[];
  /** Grey rule across the top, for a band that sits directly under the header. */
  ruleAbove?: boolean;
  /** Longer text measure, as set on the About comp. */
  wideText?: boolean;
  /** Desktop watermark logo. Off for a band too short to hold it, which also
      drops the left column so the text sits on the page gutter. */
  watermark?: boolean;
}) {
  const className = [
    styles.section,
    ruleAbove ? styles.ruleAbove : '',
    wideText ? styles.wideText : '',
    watermark ? '' : styles.noWatermark,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={className} id={id}>
      {media && <div className={styles.media}>{media}</div>}

      <Heading className={styles.headline}>{headline}</Heading>
      {paragraphs.map((paragraph) => (
        <p className={styles.body} key={paragraph.slice(0, 24)}>
          <RichText text={paragraph} />
        </p>
      ))}

      {/* Desktop only: watermark logo and quick links in the left column. */}
      {watermark && (
        <img
          className={styles.watermark}
          src="/assets/logo-footer-white.svg"
          alt=""
          aria-hidden="true"
          width={720}
          height={664}
        />
      )}

      {links && (
        <nav className={styles.links} aria-label="Quick links">
          <ul className={styles.linkList}>
            {links.map((link) => (
              <li key={link.label}>
                <a className={styles.link} href={link.href}>
                  <TriangleIcon className={styles.linkIcon} />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </section>
  );
}
