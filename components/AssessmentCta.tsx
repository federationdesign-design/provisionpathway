'use client';

import { useState } from 'react';
import { cta } from '../content/homepage';
import AssessmentModal from './AssessmentModal';
import styles from './AssessmentCta.module.css';

export default function AssessmentCta({ className = '' }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={`${styles.button} ${className}`}
        onClick={() => setOpen(true)}
        data-cta="assessment-detail"
      >
        {cta.assessment}
      </button>

      <AssessmentModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
