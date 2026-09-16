// Validation for the enquiry form, shared by the form in the browser and the
// route handler at app/api/contact. The browser check is a convenience; the
// route handler runs the same check again and is the one that counts.

import { contactForm, type ContactMethod } from '../content/contact';

export type ContactFields = {
  name: string;
  email: string;
  method: ContactMethod | '';
  telephone: string;
  message: string;
  consent: boolean;
  /** Honeypot. Empty for every real visitor. */
  website: string;
};

export type FieldName = 'name' | 'email' | 'method' | 'telephone' | 'message' | 'consent';
export type FieldErrors = Partial<Record<FieldName, string>>;

// In the order the fields appear, so the first error can take focus.
export const FIELD_ORDER: FieldName[] = ['name', 'email', 'method', 'telephone', 'message', 'consent'];

export const LIMITS = { name: 100, email: 254, telephone: 30, message: 5000 };

export const EMPTY_FIELDS: ContactFields = {
  name: '',
  email: '',
  method: '',
  telephone: '',
  message: '',
  consent: false,
  website: '',
};

const METHODS = contactForm.methods.map((m) => m.value);
const PHONE_METHODS: ContactMethod[] = ['phone', 'mobile', 'sms'];

/** Three of the four contact methods cannot be used without a number. */
export function needsTelephone(method: ContactFields['method']): boolean {
  return method !== '' && PHONE_METHODS.includes(method);
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Digits with the usual separators, and an optional leading plus. UK and
// international numbers run from 10 to 15 digits.
const PHONE_CHARS = /^\+?[\d\s().-]+$/;

function isTelephone(value: string): boolean {
  const digits = value.replace(/\D/g, '').length;
  return PHONE_CHARS.test(value) && digits >= 10 && digits <= 15;
}

const text = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

/** Reads fields from anything, such as a parsed request body, safely. */
export function readFields(input: unknown): ContactFields {
  const body = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>;
  const method = text(body.method);
  return {
    name: text(body.name),
    email: text(body.email),
    method: (METHODS as string[]).includes(method) ? (method as ContactMethod) : '',
    telephone: text(body.telephone),
    message: text(body.message),
    consent: body.consent === true,
    website: text(body.website),
  };
}

export function validateContact(fields: ContactFields): FieldErrors {
  const e = contactForm.errors;
  const errors: FieldErrors = {};

  if (!fields.name) errors.name = e.name;
  else if (fields.name.length > LIMITS.name) errors.name = e.nameLong;

  if (!fields.email) errors.email = e.email;
  else if (fields.email.length > LIMITS.email || !EMAIL_PATTERN.test(fields.email)) {
    errors.email = e.emailInvalid;
  }

  if (!fields.method) errors.method = e.method;

  if (!fields.telephone) {
    if (needsTelephone(fields.method)) errors.telephone = e.telephone;
  } else if (fields.telephone.length > LIMITS.telephone || !isTelephone(fields.telephone)) {
    errors.telephone = e.telephoneInvalid;
  }

  if (!fields.message) errors.message = e.message;
  else if (fields.message.length > LIMITS.message) errors.message = e.messageLong;

  if (!fields.consent) errors.consent = e.consent;

  return errors;
}
