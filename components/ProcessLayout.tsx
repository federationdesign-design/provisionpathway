import styles from './ProcessLayout.module.css';

// Wraps Process, QuoteFeature and AssessmentDetail. On mobile it is a plain
// block and the three sections stack in document order. On desktop it becomes
// the grid their pieces are placed into, so the steps, signposts, detail,
// obstacles copy, quote and photograph can share columns without a separate
// desktop tree.
export default function ProcessLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout} id="assessment">
      {children}
    </div>
  );
}
