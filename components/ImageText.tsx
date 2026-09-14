import Image from 'next/image';
import styles from './ImageText.module.css';

// A photograph beside a heading and paragraphs. Stacked on mobile, image
// first; two columns on desktop with the image on the left.
export default function ImageText({
  heading,
  paragraphs,
  image,
  imageAlt,
}: {
  heading: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
}) {
  return (
    <section className={styles.section}>
      <Image
        className={styles.image}
        src={image}
        alt={imageAlt}
        width={898}
        height={1091}
        sizes="(min-width: 1024px) 45vw, 100vw"
      />

      <div className={styles.text}>
        <h2 className={styles.heading}>{heading}</h2>
        {paragraphs.map((paragraph) => (
          <p className={styles.body} key={paragraph.slice(0, 24)}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
