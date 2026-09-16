// Copy for the cookies policy, privacy policy and terms of use.
//
// Adapted from the studio's policies for another project, and not yet reviewed
// by the client. See LEGAL_PAGES_REVIEW in PLACEHOLDERS.md.
//
// Inline markup, rendered by components/RichText.tsx:
//   [PLACEHOLDER: ...]   shown highlighted, so unconfirmed detail can never be
//                        mistaken for confirmed detail
//   [[label|href]]       a link

// A paragraph, a bulleted list, or a table.
export type LegalBlock =
  | string
  | { list: string[] }
  | { table: { caption: string; head: string[]; rows: string[][] } };

export type LegalSection = { heading: string; blocks: LegalBlock[] };

export type LegalPageContent = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  path: string;
  lastUpdated: string;
  sections: LegalSection[];
};

const email = 'info@theprovisionpathway.co.uk';
const emailLink = `[[${email}|mailto:${email}]]`;

// Provisional company details. Every one is a visible placeholder until the
// client confirms it.
const company = '[PLACEHOLDER: registered company name: The Provision Pathway]';
const address = '[PLACEHOLDER: registered address: 123 Fake Street]';
const ico = '[PLACEHOLDER: ICO registration: none held]';
const dpContact = '[PLACEHOLDER: data protection contact: Zara Azad]';

const draftNotice =
  '[PLACEHOLDER: draft adapted from another project, awaiting review by the client and a qualified adviser]';
const lastUpdated = '[PLACEHOLDER: date this page is approved]';

export const legalIntro = { lastUpdatedLabel: 'Last updated:' };

export const cookiesPolicy: LegalPageContent = {
  title: 'Cookies policy',
  metaTitle: 'Cookies policy | The Provision Pathway',
  metaDescription: 'The cookies and similar technologies used on The Provision Pathway website, and how to manage them.',
  path: '/cookies-policy',
  lastUpdated,
  sections: [
    {
      heading: 'About this policy',
      blocks: [
        draftNotice,
        `This policy explains the cookies and similar technologies used on this website, run by ${company}. For how we handle personal data more widely, see our [[Privacy Policy|/privacy-policy]].`,
      ],
    },
    {
      heading: 'What cookies are',
      blocks: [
        'Cookies are small text files placed on your device when you visit a website. Similar technologies, such as your browser’s local storage, work in much the same way. Under UK GDPR and the Privacy and Electronic Communications Regulations (PECR), we must ask for your consent before using any that are not strictly necessary.',
      ],
    },
    {
      heading: 'What we use',
      blocks: [
        'Strictly necessary: we store your cookie choice in your browser’s local storage, so we do not ask you again on every page. It is not a cookie and it is not sent to us. The website itself sets no other cookies.',
        'Analytics and booking: only if you choose Accept, we load Google Analytics, to understand how the website is used, and Calendly’s booking window, so you can book a consultation without leaving the page. Both set cookies. Nothing from either is loaded until you accept.',
        {
          table: {
            caption: 'Cookies and storage used on this website',
            head: ['Name', 'Set by', 'Purpose', 'Lasts', 'Category'],
            rows: [
              ['tpp-cookie-consent', 'This website (local storage)', 'Remembers whether you accepted or rejected cookies', 'Until you clear it', 'Strictly necessary'],
              ['_ga', 'Google Analytics', 'Tells visits by different people apart', 'Up to 2 years', 'Analytics and booking'],
              ['_ga_MMW4789DRX', 'Google Analytics', 'Keeps track of your current visit', 'Up to 2 years', 'Analytics and booking'],
              ['__cf_bm', 'Cloudflare, for Calendly', 'Protects the booking window against automated traffic', '30 minutes', 'Analytics and booking'],
              ['_cfuvid', 'Cloudflare, for Calendly', 'Limits the rate of requests to the booking window', 'Until you close your browser', 'Analytics and booking'],
              ['OptanonConsent', 'Calendly', 'Records your cookie choices on Calendly', '1 year', 'Analytics and booking'],
              ['m', 'Stripe, for Calendly', 'Fraud prevention for payments taken through Calendly', 'Up to 2 years', 'Analytics and booking'],
            ],
          },
        },
        'This table lists what we observed being set on this website in September 2026. Google, Calendly, Cloudflare and Stripe control their own cookies and may change them.',
      ],
    },
    {
      heading: 'Booking without cookies',
      blocks: [
        'If you reject cookies, or have not yet chosen, you can still book a consultation. The booking buttons open Calendly in a new tab instead, where Calendly’s own privacy and cookie policies apply.',
      ],
    },
    {
      heading: 'Managing your choice',
      blocks: [
        'When you first visit, you are asked to accept or reject. You can change your choice at any time using Cookie settings in the footer of any page.',
        'If you withdraw consent, we stop Google Analytics and delete the Google Analytics cookies set on this website. Cookies set by Calendly, Cloudflare and Stripe belong to their own websites, so we cannot delete them for you. You can remove them, and any other cookies, in your browser settings. For more about managing cookies, visit [[allaboutcookies.org|https://www.allaboutcookies.org]].',
        `If you have any questions about how we use cookies, contact us at ${emailLink}.`,
      ],
    },
    {
      heading: 'Changes to this policy',
      blocks: [
        'We may update this policy from time to time. The current version will always be on this page. If we make a significant change to the cookies we use, we will ask for your choice again.',
      ],
    },
  ],
};

export const privacyPolicy: LegalPageContent = {
  title: 'Privacy Policy',
  metaTitle: 'Privacy Policy | The Provision Pathway',
  metaDescription: 'How The Provision Pathway collects, uses and protects personal data under UK GDPR.',
  path: '/privacy-policy',
  lastUpdated,
  sections: [
    {
      heading: 'Who we are',
      blocks: [
        draftNotice,
        `${company} is the data controller for the personal information collected through this website. Our registered address is ${address}. Our data protection contact is ${dpContact}, who you can reach at ${emailLink}. ICO registration: ${ico}.`,
        'This policy explains what personal data we collect through this website, why we collect it, how we use it, and your rights under UK GDPR and the Data Protection Act 2018.',
      ],
    },
    {
      heading: 'What data we collect',
      blocks: [
        {
          list: [
            'When you send an enquiry through our contact form: your name, email address, telephone number if you give one, how you would like us to contact you, your message, and your agreement to us handling your enquiry.',
            'When you book a consultation through Calendly: the details you enter in Calendly’s booking form, such as your name and email address.',
            'When you email us directly: your email address and anything you include in your message.',
            'With your consent only: information about how you use the website, collected by Google Analytics, such as the pages you view, how you arrived, and the type of device and browser you use.',
            'When you visit the website: technical information such as your IP address, which our hosting provider processes in order to deliver the website to you.',
          ],
        },
      ],
    },
    {
      heading: 'Information about young people',
      blocks: [
        'Enquiries often concern a child or young person. A message may include information about their needs, health or education. Information about health is special category data under UK GDPR and needs extra protection. Please share only what we need to reply to your first enquiry; more detail can follow once we are in touch.',
        '[PLACEHOLDER: condition for processing special category data, to be confirmed]',
      ],
    },
    {
      heading: 'Why we use your data, and our legal basis',
      blocks: [
        {
          list: [
            'To reply to your enquiry in the way you prefer. Legal basis: consent, which you give with the checkbox on the contact form.',
            'To arrange and hold a consultation you have booked. Legal basis: taking steps at your request before entering into a contract.',
            'To understand how the website is used and improve it. Legal basis: consent, which you give by accepting cookies.',
            'To deliver the website and keep it secure. Legal basis: legitimate interests.',
          ],
        },
        'Where we rely on consent, you can withdraw it at any time. Withdrawing consent does not affect anything we did with your data before you withdrew it.',
      ],
    },
    {
      heading: 'How contact form enquiries are handled',
      blocks: [
        'When you submit the contact form, your enquiry is sent to us by email. We do not store submissions in a database or anywhere on the website. The email in our inbox is the only record.',
      ],
    },
    {
      heading: 'Who we share data with',
      blocks: [
        'We use the following services to run this website. Each receives only what it needs to do its job.',
        {
          list: [
            'Vercel hosts the website. It processes technical information such as IP addresses to deliver pages, and passes contact form submissions on to be emailed to us without storing them.',
            'Resend sends contact form submissions to our inbox. It receives the contents of your enquiry.',
            'Calendly handles consultation bookings. It receives the details you enter when you book. If you have accepted cookies, it also sets cookies when the booking window opens on this website.',
            'Google Analytics 4 measures how the website is used. It receives usage and device information, and only if you have accepted cookies.',
          ],
        },
        'These providers may process data outside the UK. [PLACEHOLDER: safeguards for international transfers, to be confirmed]',
        'We do not sell your personal data to anyone.',
      ],
    },
    {
      heading: 'How long we keep your data',
      blocks: [
        {
          list: [
            'Enquiry emails: [PLACEHOLDER: retention period for enquiry emails]',
            'Consultation booking records: [PLACEHOLDER: retention period for Calendly booking records]',
            'Website analytics data: [PLACEHOLDER: Google Analytics data retention setting]',
            'Your cookie choice: stored in your own browser until you clear it, or until we ask again after changing our cookies policy.',
          ],
        },
      ],
    },
    {
      heading: 'Your rights',
      blocks: [
        'Under UK GDPR you have the following rights:',
        {
          list: [
            'Right of access: you can ask for a copy of the personal data we hold about you.',
            'Right to rectification: you can ask us to correct inaccurate data.',
            'Right to erasure: you can ask us to delete your data in certain circumstances.',
            'Right to restrict processing: you can ask us to limit how we use your data.',
            'Right to data portability: you can ask for your data in a structured, machine readable format.',
            'Right to object: you can object to processing based on legitimate interests.',
            'Right to withdraw consent: where we rely on consent, you can withdraw it at any time.',
            'Rights about automated decision making: we do not make automated decisions about you or profile you.',
          ],
        },
        `To exercise any of these rights, contact ${dpContact} at ${emailLink}. We will respond within one month. If you are unhappy with how we handle your data, you have the right to complain to the Information Commissioner’s Office (ICO) at [[ico.org.uk|https://ico.org.uk]].`,
      ],
    },
    {
      heading: 'Cookies',
      blocks: [
        'This website uses cookies only with your consent. See our [[Cookies policy|/cookies-policy]] for full details and how to change your choice.',
      ],
    },
    {
      heading: 'Changes to this policy',
      blocks: [
        'We may update this policy from time to time. The current version will always be on this page, with the date it was last updated.',
      ],
    },
  ],
};

export const termsOfUse: LegalPageContent = {
  title: 'Terms of use',
  metaTitle: 'Terms of use | The Provision Pathway',
  metaDescription: 'The terms that apply to using The Provision Pathway website.',
  path: '/terms-of-use',
  lastUpdated,
  sections: [
    {
      heading: 'About these terms',
      blocks: [
        draftNotice,
        `These terms apply to your use of this website, which is run by ${company}, ${address} (${emailLink}). By using the website, you agree to these terms.`,
        'These terms cover the website only. [PLACEHOLDER: whether separate terms apply to assessments and coaching, and where to find them]',
      ],
    },
    {
      heading: 'Information on this website',
      blocks: [
        'The information on this website is general. It is not advice about any individual young person, and you should not rely on it as such. We aim to keep it accurate and up to date, but we do not guarantee that it is.',
      ],
    },
    {
      heading: 'Enquiries and bookings',
      blocks: [
        'Consultations are booked through Calendly, and Calendly’s own terms apply to its booking service. When you use the contact form, we handle your enquiry as set out in our [[Privacy Policy|/privacy-policy]].',
      ],
    },
    {
      heading: 'Using the website',
      blocks: [
        'You must not misuse the website. That includes trying to gain unauthorised access to it, introducing anything harmful such as viruses, interfering with how it works, or using the contact form to send unsolicited or automated messages.',
      ],
    },
    {
      heading: 'Intellectual property',
      blocks: [
        `The content of this website, including its text, logo and artwork, belongs to ${company} or is used with permission. You may view it and print it for your own personal use, but you must not copy, publish or reuse it for any other purpose without our written permission.`,
      ],
    },
    {
      heading: 'Links to other websites',
      blocks: [
        'This website links to other websites, such as Calendly. We are not responsible for the content or privacy practices of other websites.',
      ],
    },
    {
      heading: 'Availability',
      blocks: [
        'We do not guarantee that the website will always be available or free from errors. We may change, suspend or withdraw it at any time.',
      ],
    },
    {
      heading: 'Liability',
      blocks: [
        'As far as the law allows, we are not liable for any loss or damage arising from your use of this website or your reliance on its content. Nothing in these terms limits or excludes any liability that cannot be limited or excluded by law.',
      ],
    },
    {
      heading: 'Privacy and cookies',
      blocks: [
        'Our [[Privacy Policy|/privacy-policy]] explains how we handle personal data, and our [[Cookies policy|/cookies-policy]] explains the cookies we use.',
      ],
    },
    {
      heading: 'Governing law',
      blocks: [
        'These terms are governed by the laws of England and Wales, and any disputes are subject to the exclusive jurisdiction of the courts of England and Wales.',
      ],
    },
    {
      heading: 'Changes to these terms',
      blocks: [
        'We may update these terms from time to time. The current version will always be on this page, with the date it was last updated.',
      ],
    },
  ],
};
