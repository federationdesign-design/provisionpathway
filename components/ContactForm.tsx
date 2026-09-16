'use client';

import { useRef, useState } from 'react';
import { contactForm } from '../content/contact';
import {
  EMPTY_FIELDS,
  FIELD_ORDER,
  LIMITS,
  needsTelephone,
  validateContact,
  type ContactFields,
  type FieldErrors,
  type FieldName,
} from './contactValidation';
import RichText from './RichText';
import styles from './ContactForm.module.css';

type Status = 'idle' | 'sending' | 'sent' | 'failed' | 'rate-limited';

const copy = contactForm;

// The enquiry form. Checked in the browser before sending, for convenience,
// and again by the route handler, which is the check that counts.
//
// Errors show once the visitor first tries to send, then update as they type.
// On success the form is replaced by a confirmation. On failure an error shows
// above the send button and everything typed is kept.
export default function ContactForm() {
  const [fields, setFields] = useState<ContactFields>(EMPTY_FIELDS);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const sentRef = useRef<HTMLDivElement>(null);
  const failedRef = useRef<HTMLParagraphElement>(null);

  const update = <K extends keyof ContactFields>(name: K, value: ContactFields[K]) => {
    const next = { ...fields, [name]: value };
    setFields(next);
    if (attempted) setErrors(validateContact(next));
  };

  const focusFirstError = (found: FieldErrors) => {
    const first = FIELD_ORDER.find((name) => found[name]);
    if (!first) return;
    formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setAttempted(true);

    const found = validateContact(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      focusFirstError(found);
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      const result = await response.json().catch(() => ({}));

      if (response.ok && result.ok) {
        setStatus('sent');
        requestAnimationFrame(() => sentRef.current?.focus());
        return;
      }
      if (result.errors) {
        setErrors(result.errors);
        setStatus('idle');
        focusFirstError(result.errors);
        return;
      }
      setStatus(response.status === 429 ? 'rate-limited' : 'failed');
    } catch {
      setStatus('failed');
    }
    requestAnimationFrame(() => failedRef.current?.focus());
  };

  if (status === 'sent') {
    return (
      <div className={styles.sent} ref={sentRef} tabIndex={-1} role="status">
        <h3 className={styles.sentHeading}>{copy.sent.heading}</h3>
        <p className={styles.sentBody}>{copy.sent.body}</p>
      </div>
    );
  }

  const phoneNeeded = needsTelephone(fields.method);
  const telephoneHint =
    fields.method === '' ? copy.telephoneHint.unchosen : phoneNeeded ? copy.telephoneHint.needed : copy.telephoneHint.email;
  const hasErrors = attempted && Object.keys(errors).length > 0;

  // Label, hint and error wiring shared by every field.
  const described = (name: FieldName, hint?: boolean) =>
    [hint ? `contact-${name}-hint` : '', errors[name] ? `contact-${name}-error` : ''].filter(Boolean).join(' ') ||
    undefined;

  const errorText = (name: FieldName) =>
    errors[name] ? (
      <p className={styles.error} id={`contact-${name}-error`}>
        {errors[name]}
      </p>
    ) : null;

  return (
    <form className={styles.form} ref={formRef} onSubmit={onSubmit} noValidate>
      {hasErrors && (
        <p className={styles.summary} role="alert">
          {copy.errors.summary}
        </p>
      )}

      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-name">
          {copy.name} <span className={styles.need}>{copy.required}</span>
        </label>
        <input
          className={styles.input}
          id="contact-name"
          data-field="name"
          type="text"
          autoComplete="name"
          maxLength={LIMITS.name}
          required
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={described('name')}
          value={fields.name}
          onChange={(e) => update('name', e.target.value)}
        />
        {errorText('name')}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-email">
          {copy.email} <span className={styles.need}>{copy.required}</span>
        </label>
        <input
          className={styles.input}
          id="contact-email"
          data-field="email"
          type="email"
          autoComplete="email"
          maxLength={LIMITS.email}
          required
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={described('email')}
          value={fields.email}
          onChange={(e) => update('email', e.target.value)}
        />
        {errorText('email')}
      </div>

      {/* Asked before the telephone, because the answer decides whether a
          number is required. */}
      <fieldset className={styles.fieldset} aria-describedby={described('method')}>
        <legend className={styles.label}>
          {copy.method} <span className={styles.need}>{copy.required}</span>
        </legend>
        <div className={styles.options}>
          {copy.methods.map((option, i) => (
            <label className={styles.option} key={option.value}>
              <input
                className={styles.radio}
                type="radio"
                name="method"
                value={option.value}
                data-field={i === 0 ? 'method' : undefined}
                required
                aria-invalid={errors.method ? true : undefined}
                checked={fields.method === option.value}
                onChange={() => update('method', option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
        {errorText('method')}
      </fieldset>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-telephone">
          {copy.telephone} <span className={styles.need}>{phoneNeeded ? copy.required : copy.optional}</span>
        </label>
        <p className={styles.hint} id="contact-telephone-hint">
          {telephoneHint}
        </p>
        <input
          className={styles.input}
          id="contact-telephone"
          data-field="telephone"
          type="tel"
          autoComplete="tel"
          maxLength={LIMITS.telephone}
          required={phoneNeeded}
          aria-invalid={errors.telephone ? true : undefined}
          aria-describedby={described('telephone', true)}
          value={fields.telephone}
          onChange={(e) => update('telephone', e.target.value)}
        />
        {errorText('telephone')}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-message">
          {copy.message} <span className={styles.need}>{copy.required}</span>
        </label>
        <textarea
          className={`${styles.input} ${styles.textarea}`}
          id="contact-message"
          data-field="message"
          rows={6}
          maxLength={LIMITS.message}
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={described('message')}
          value={fields.message}
          onChange={(e) => update('message', e.target.value)}
        />
        {errorText('message')}
      </div>

      <div className={styles.field}>
        <div className={styles.consent}>
          <input
            className={styles.checkbox}
            id="contact-consent"
            data-field="consent"
            type="checkbox"
            required
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={described('consent')}
            checked={fields.consent}
            onChange={(e) => update('consent', e.target.checked)}
          />
          <label className={styles.consentLabel} htmlFor="contact-consent">
            <RichText text={copy.consent} />
          </label>
        </div>
        {errorText('consent')}
      </div>

      {/* Honeypot. Off screen and out of the tab order, so people never meet
          it; form filling scripts do, and the route handler drops anything
          that arrives with it filled. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="contact-website">{copy.honeypot}</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={fields.website}
          onChange={(e) => update('website', e.target.value)}
        />
      </div>

      {(status === 'failed' || status === 'rate-limited') && (
        <p className={styles.failed} ref={failedRef} tabIndex={-1} role="alert">
          <RichText text={status === 'rate-limited' ? copy.rateLimited : copy.failed} />
        </p>
      )}

      {/* Not disabled while sending, which would drop keyboard focus; a second
          press is ignored instead. */}
      <button className={styles.submit} type="submit" aria-disabled={status === 'sending'}>
        {status === 'sending' ? copy.sending : copy.submit}
      </button>
    </form>
  );
}
