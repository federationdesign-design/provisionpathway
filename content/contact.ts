// Copy for the Contact page and its enquiry form.
//
// Inline markup follows content/legal.ts: [PLACEHOLDER: ...] is highlighted
// and [[label|href]] is a link. See CONTACT_PAGE_CONTENT in PLACEHOLDERS.md.

const email = 'info@theprovisionpathway.co.uk';
const emailLink = `[[${email}|mailto:${email}]]`;

export const contactMeta = {
  title: 'Contact | The Provision Pathway',
  description: 'Contact The Provision Pathway by email or through the enquiry form.',
};

export const contactPage = {
  title: 'Contact',
  intro: '[PLACEHOLDER: contact page introduction, not yet supplied]',
  emailHeading: 'Email',
  email,
  formHeading: 'Send a message',
};

export type ContactMethod = 'phone' | 'mobile' | 'sms' | 'email';

export const contactForm = {
  required: '(required)',
  optional: '(optional)',

  name: 'Name',
  email: 'Email',
  message: 'Message',

  method: 'Ideal method of initial contact',
  methods: [
    { value: 'phone', label: 'Phone call' },
    { value: 'mobile', label: 'Mobile call' },
    { value: 'sms', label: 'SMS or WhatsApp' },
    { value: 'email', label: 'Email' },
  ] as { value: ContactMethod; label: string }[],

  telephone: 'Telephone',
  // The hint under the telephone field follows the chosen contact method.
  telephoneHint: {
    unchosen: 'Required if you choose a phone call, mobile call, or SMS or WhatsApp.',
    needed: 'Required, so we can contact you the way you have chosen.',
    email: 'Optional, as you have chosen email.',
  },

  consent: `I agree to my enquiry being handled as set out in the [[Privacy Policy|/privacy-policy]] and [[Terms of use|/terms-of-use]].`,

  // Hidden from people; only automated form fillers complete it.
  honeypot: 'Leave this field empty',

  submit: 'Send message',
  sending: 'Sending',

  errors: {
    summary: 'Please correct the fields marked below.',
    name: 'Please enter your name.',
    nameLong: 'Please shorten your name.',
    email: 'Please enter your email address.',
    emailInvalid: 'Please enter a valid email address, like name@example.com.',
    telephone: 'Please enter a telephone number, so we can contact you the way you have chosen.',
    telephoneInvalid: 'Please enter a valid telephone number.',
    message: 'Please enter a message.',
    messageLong: 'Please shorten your message to 5,000 characters or fewer.',
    method: 'Please choose how you would like us to contact you.',
    consent: 'Please tick the box to agree before sending.',
  },

  // Shown in place of the form once the message has gone.
  sent: {
    heading: 'Thank you',
    body: 'Your message has been sent.',
  },

  // Shown above the send button; what the visitor typed is kept.
  failed: `Sorry, your message could not be sent. Please try again, or email us at ${emailLink}.`,
  rateLimited: `Too many messages have been sent from your connection. Please wait a few minutes and try again, or email us at ${emailLink}.`,
};
