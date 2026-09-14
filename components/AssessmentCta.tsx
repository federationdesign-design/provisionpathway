'use client';

import { cta } from '../content/homepage';
import { useOpenAssessmentModal } from './AssessmentModalProvider';
import styles from './AssessmentCta.module.css';

export default function AssessmentCta({ className = '' }: { className?: string }) {
  const openModal = useOpenAssessmentModal();

  return (
    <button
      type="button"
      className={`${styles.button} ${className}`}
      onClick={openModal}
      data-cta="assessment-detail"
    >
      {cta.assessment}
    </button>
  );
}
