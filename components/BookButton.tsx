import { bookingUrl, cta } from '../content/homepage';
import styles from './BookButton.module.css';

type Tone = 'light' | 'onDark' | 'onImage';
type Size = 'regular' | 'large';

export default function BookButton({
  tone = 'light',
  size = 'regular',
  label = cta.book,
  className = '',
}: {
  tone?: Tone;
  /** Large is the hero sized button, used at the top of the homepage and to
      close the About page. It differs from regular at desktop only. */
  size?: Size;
  label?: string;
  className?: string;
}) {
  const toneClass =
    tone === 'onDark' ? styles.onDark : tone === 'onImage' ? styles.onImage : styles.light;

  return (
    <a
      className={`${styles.button} ${toneClass} ${size === 'large' ? styles.large : ''} ${className}`}
      href={bookingUrl}
      data-cta="book-meeting"
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  );
}
