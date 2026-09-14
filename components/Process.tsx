import { promise, steps } from '../content/homepage';
import styles from './Process.module.css';

export default function Process() {
  return (
    <section className={styles.section} id="assessment">
      <h2 className={styles.headline}>{promise.headline}</h2>
      <p className={styles.lead}>{promise.body}</p>

      <ol className={styles.steps}>
        {steps.map((step) => (
          <li className={styles.step} key={step.number}>
            <span className={styles.number} aria-hidden="true">
              {step.number}
            </span>
            <div className={styles.stepText}>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
