// Copy for the cookie consent banner and the footer control that reopens it.
// Adapted from the studio's consent system; see CONSENT_BANNER_COPY in
// PLACEHOLDERS.md.

export const consentCopy = {
  heading: 'Cookies on this site',
  body:
    'We use essential storage to remember your cookie choice. With your permission we also use Google Analytics to understand how the site is used, and Calendly to open booking on this page. Both set cookies. If you reject, booking still works and opens Calendly in a new tab. You can change your mind at any time from Cookie settings in the footer.',
  policyLink: { label: 'Read our cookies policy', href: '/cookies-policy' },
  accept: 'Accept',
  reject: 'Reject',
  close: 'Close cookie settings',
  // Shown only when the banner is reopened from the footer.
  current: {
    accepted: 'You have currently accepted these cookies.',
    rejected: 'You have currently rejected these cookies.',
  },
  settings: 'Cookie settings',
};
