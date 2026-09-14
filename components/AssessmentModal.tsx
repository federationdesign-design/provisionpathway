'use client';

import { useEffect, useRef } from 'react';
import { details, promise, cta } from '../content/homepage';
import { TickIcon } from './Icons';
import BookButton from './BookButton';
import styles from './AssessmentModal.module.css';

export default function AssessmentModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.classList.toggle('isLocked', open);
    return () => document.body.classList.remove('isLocked');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="assessment-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" className={styles.close} onClick={onClose}>
          <span className={styles.closeLabel}>Close</span>
          <span aria-hidden="true">&times;</span>
        </button>

        <h2 className={styles.title} id="assessment-modal-title">
          {cta.assessment}
        </h2>

        <p className={styles.lead}>{promise.body}</p>

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

        <div className={styles.cta}>
          <BookButton />
        </div>
      </div>
    </div>
  );
}
