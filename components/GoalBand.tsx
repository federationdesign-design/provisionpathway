import { goal } from '../content/homepage';
import Personas from './Personas';
import styles from './GoalBand.module.css';

export default function GoalBand() {
  return (
    <section className={styles.section} id="pathway">
      <Personas />

      <h2 className={styles.headline}>{goal.headline}</h2>
      <p className={styles.body}>{goal.body}</p>
    </section>
  );
}
