import Link from 'next/link';
import styles from './LegalPage.module.css';

// Renders the inline markup used in content/legal.ts: placeholders are
// highlighted, and [[label|href]] becomes a link.
const TOKEN = /(\[PLACEHOLDER:[^\]]*\]|\[\[[^\]|]+\|[^\]]+\]\])/;

export default function LegalText({ text }: { text: string }) {
  return (
    <>
      {text.split(TOKEN).map((part, i) => {
        if (part.startsWith('[PLACEHOLDER:')) {
          return (
            <mark className={styles.placeholder} key={i}>
              {part}
            </mark>
          );
        }
        if (part.startsWith('[[')) {
          const [label, href] = part.slice(2, -2).split('|');
          if (href.startsWith('/')) {
            return (
              <Link className={styles.link} href={href} key={i}>
                {label}
              </Link>
            );
          }
          const external = href.startsWith('http');
          return (
            <a
              className={styles.link}
              href={href}
              key={i}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {label}
            </a>
          );
        }
        return part;
      })}
    </>
  );
}
