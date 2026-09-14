import { signposts, details, obstacles } from '../content/homepage';
import { CareIcon, PeopleIcon, ArrowIcon, TickIcon } from './Icons';
import BookButton from './BookButton';
import AssessmentCta from './AssessmentCta';
import styles from './AssessmentDetail.module.css';

const icons = {
  care: CareIcon,
  people: PeopleIcon,
  arrow: ArrowIcon,
};

export default function AssessmentDetail() {
  return (
    <section className={styles.section}>
      <div className={styles.post} aria-hidden="true" />

      <ul className={styles.signs}>
        {signposts.map((sign) => {
          const Icon = icons[sign.icon];
          return (
            <li key={sign.label} className={styles.signItem}>
              <div className={`${styles.sign} ${sign.active ? styles.signOn : styles.signOff}`}>
                <div className={styles.signInner}>
                  <Icon className={styles.signIcon} />
                  <span className={styles.signLabel}>{sign.label}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.detail}>
        <div className={styles.facts}>
          <p className={styles.block}>
            <strong className={styles.label}>{details.price.label}</strong>
            <br />
            {details.price.body}
          </p>

          <p className={styles.block}>
            <strong className={styles.label}>{details.location.label}</strong>{' '}
            {details.location.body}
          </p>

          <div className={styles.block}>
            <strong className={styles.label}>{details.included.label}</strong>
            <ul className={styles.ticks}>
              {details.included.items.map((item) => (
                <li className={styles.tickItem} key={item}>
                  <TickIcon className={styles.tick} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className={styles.block}>
            <strong className={styles.label}>{details.format.label}</strong>
            <br />
            {details.format.body}
          </p>
        </div>

        <div className={styles.obstacles}>
          <h2 className={styles.obstacleHeadline}>{obstacles.headline}</h2>

          {obstacles.body.map((para) => (
            <p className={styles.block} key={para.slice(0, 24)}>
              {para}
            </p>
          ))}
        </div>

        <div className={styles.closingCta}>
          <AssessmentCta />
          <BookButton />
        </div>
      </div>
    </section>
  );
}
