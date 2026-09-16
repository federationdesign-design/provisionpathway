import { legalIntro, type LegalBlock, type LegalPageContent } from '../content/legal';
import Band from './Band';
import RichText from './RichText';
import styles from './LegalPage.module.css';

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === 'string') {
    return (
      <p className={styles.body}>
        <RichText text={block} />
      </p>
    );
  }

  if ('list' in block) {
    return (
      <ul className={styles.list}>
        {block.list.map((item) => (
          <li className={styles.item} key={item.slice(0, 40)}>
            <RichText text={item} />
          </li>
        ))}
      </ul>
    );
  }

  // Wider than a phone screen, so the table scrolls inside its own region
  // rather than the page scrolling sideways. Focusable, so the region can be
  // scrolled from the keyboard.
  const { caption, head, rows } = block.table;
  return (
    <div className={styles.tableScroll} role="region" aria-label={caption} tabIndex={0}>
      <table className={styles.table}>
        <caption className={styles.caption}>{caption}</caption>
        <thead>
          <tr>
            {head.map((cell) => (
              <th className={styles.th} scope="col" key={cell}>
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, ...cells]) => (
            <tr key={name}>
              <th className={`${styles.th} ${styles.rowHead}`} scope="row">
                {name}
              </th>
              {cells.map((cell, i) => (
                <td className={styles.td} key={i}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// A cookies policy, privacy policy or terms of use page: the green band with
// the title, as on the About page, then the policy text. The band holds only
// the title, too short for the desktop watermark, so it is left out.
export default function LegalPage({ page }: { page: LegalPageContent }) {
  return (
    <main>
      <Band as="h1" headline={page.title} paragraphs={[]} ruleAbove wideText watermark={false} />

      <div className={styles.section}>
        <p className={styles.updated}>
          {legalIntro.lastUpdatedLabel} <RichText text={page.lastUpdated} />
        </p>

        {page.sections.map((section) => (
          <section className={styles.part} key={section.heading}>
            <h2 className={styles.heading}>{section.heading}</h2>
            {section.blocks.map((block, i) => (
              <Block block={block} key={i} />
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
