'use client';

import { useEffect, useRef } from 'react';
import { services } from '../content/homepage';
import { TickIcon } from './Icons';
import BookButton from './BookButton';
import styles from './AssessmentModal.module.css';

// The services popup. One instance, rendered by AssessmentModalProvider and
// opened from the Pathway nav item and the About the assessment button. All
// copy comes from `services` in the content layer.
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

  const headingId = (id: string) => `service-${id}-title`;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={services.map((service) => headingId(service.id)).join(' ')}
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" className={styles.close} onClick={onClose}>
          <span className={styles.closeLabel}>Close</span>
          <span aria-hidden="true">&times;</span>
        </button>

        {services.map((service) => {
          const List = service.list.ordered ? 'ol' : 'ul';
          return (
            <section
              className={styles.service}
              key={service.id}
              aria-labelledby={headingId(service.id)}
            >
              <h2 className={styles.title} id={headingId(service.id)}>
                {service.name}
              </h2>

              {service.facts.map((fact) => (
                <p className={styles.block} key={fact.label}>
                  <strong className={styles.label}>{fact.label}</strong> {fact.body}
                </p>
              ))}

              <div className={styles.block}>
                <strong className={styles.label}>{service.list.label}</strong>
                <List className={styles.ticks}>
                  {service.list.items.map((item, i) => (
                    <li className={styles.tickItem} key={item}>
                      {service.list.ordered ? (
                        <span className={styles.stepNumber} aria-hidden="true">
                          {i + 1}
                        </span>
                      ) : (
                        <TickIcon className={styles.tick} />
                      )}
                      <span>{item}</span>
                    </li>
                  ))}
                </List>
              </div>
            </section>
          );
        })}

        <div className={styles.cta}>
          <BookButton />
        </div>
      </div>
    </div>
  );
}
