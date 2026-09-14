import { site, cta } from '../content/homepage';
import styles from './BookButton.module.css';

type Tone = 'light' | 'onDark' | 'onImage';

export default function BookButton({
  tone = 'light',
  label = cta.book,
  className = '',
}: {
  tone?: Tone;
  label?: string;
  className?: string;
}) {
  const toneClass =
    tone === 'onDark' ? styles.onDark : tone === 'onImage' ? styles.onImage : styles.light;

  return (
    <a
      className={`${styles.button} ${toneClass} ${className}`}
      href={site.calendlyUrl}
      data-cta="book-meeting"
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  );
}
