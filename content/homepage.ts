// All homepage copy lives here so wording can be changed without touching layout.

export const site = {
  name: 'The Provision Pathway',
  // Step 2 of the roadmap: replace with the live Calendly link.
  calendlyUrl: 'https://calendly.com/PLACEHOLDER/consultation',
  gaMeasurementId: 'G-MMW4789DRX',
};

export const nav = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Pathway', href: '#pathway' },
  { label: 'Resources', href: '#resources' },
  { label: 'Contact', href: '#contact' },
];

export const intro = {
  eyebrow: 'Provision Pathway is a SEND consultancy based in Warwickshire',
  subline: 'Run independently from any school',
  body:
    'We carry out structured, observation-based assessments to build an understanding of a young person\u2019s needs, strengths, and learning style. That assessment becomes the foundation for everything that follows: understanding the right provision, supporting an EHCP draft, and planning what comes next at post-16, including for those who are NEET or at risk of becoming NEET.',
};

export const hero = {
  headline: 'Move forward with greater clarity & confidence',
};

// The comp shows three carousel dots. Only Sarah has been written so far.
// Add further entries here and the dots appear automatically.
export const personas = [
  {
    id: 'sarah',
    name: 'Meet Sarah:',
    body:
      'Sarah has spent years fighting for support. Ben\u2019s post-16 provision has broken down and he\u2019s now at home, disengaged. She knows the system, but no longer trusts it. She will only engage with someone who listens quickly and offers a credible next step.',
    image: '/assets/meet-sarah-img.png',
    imageAlt: 'A parent waiting outside a consultation room with her son',
  },
];

export const goal = {
  headline: 'Our goal is to help families move from uncertainty to a clear, achievable plan.',
  body:
    'We exist to bring together the information, experiences and professional input surrounding a young person, identify what is getting in the way, and create a practical pathway towards the right support, education or next opportunity. Rather than adding another assessment or opinion to an already complicated picture, we focus on clarity, direction and meaningful progress for both the young person and their family.',
  links: [
    { label: 'Our Goals', href: '#about' },
    { label: 'Assessment & Report', href: '#assessment' },
    { label: 'Helping Families', href: '#pathway' },
    { label: 'Request Consultation', href: '#contact' },
    { label: 'Contact us', href: '#contact' },
  ],
};

export const promise = {
  headline: 'Our assessments aren\u2019t diagnostic. We can\u2019t promise a specific outcome.',
  body:
    'What we can do is give families a clear picture of what their child needs, and help them make the strongest case possible. We also work directly with local schools and provisions across Warwickshire, so families get an honest view of what\u2019s actually available, not just a list.',
};

export const steps = [
  {
    number: '1',
    title: 'Understanding Needs',
    body: 'We listen, learn and gather information to understand your child\u2019s strengths, challenges and support needs',
  },
  {
    number: '2',
    title: 'Clearer Picture',
    body: 'We turn information into meaningful, well structured evidence that shows what your child needs and why',
  },
  {
    number: '3',
    title: 'Stronger Case',
    body: 'We help you present a clear, compelling case that reflects your child\u2019s needs and supports your goals',
  },
  {
    number: '4',
    title: 'Next Step',
    body: 'We explore the routes forward together',
  },
];

export const quote = {
  text:
    'My biggest problem was not having a vision of my future self. It felt impossible to see any future that didn\u2019t involve my bedroom walls until my folks helped me confront and focus on my problems',
  image: '/assets/boy-profile.jpg',
  imageAlt: 'A young person sitting at a desk at home',
};

export const signposts = [
  { label: 'Support planning', icon: 'care' as const, active: true },
  { label: 'Placement discussions', icon: 'people' as const, active: false },
  { label: 'Next steps', icon: 'arrow' as const, active: true },
];

export const details = {
  price: {
    label: 'Pricing: \u00a3300',
    body: 'the debrief is included in this price, not an extra cost.',
  },
  location: {
    label: 'Location:',
    body: 'The assessment itself is delivered in person, for families in the Warwickshire area.',
  },
  included: {
    label: 'What\u2019s included:',
    items: [
      'The written assessment report.',
      'A report debrief session (30\u201345 minutes)',
      'A one-page action plan with clearly written next steps',
      'Not just verbal advice.',
    ],
  },
  format: {
    label: 'Format:',
    body: 'The debrief is delivered remotely via video call as standard. In-person only if a family specifically needs it',
  },
};

export const obstacles = {
  headline: 'The biggest obstacles are often not a lack of effort, but a system that can feel fragmented, slow and difficult to navigate.',
  body: [
    'Families may be dealing with long waiting lists, unclear responsibilities, inconsistent advice, unsuitable provision, complex processes and professionals who each see only part of the picture. At the same time, parents are often balancing work, family pressures, financial concerns and the emotional strain of seeing their young person struggle.',
    'The Provision Pathway helps cut through that complexity, bringing the key issues into focus and helping families understand which obstacles can be overcome, what needs to happen next and where their energy is best directed.',
  ],
};

export const footer = {
  legal: [
    { label: 'Cookies policy', href: '#cookies' },
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Contact us', href: '#contact' },
  ],
  copyright: '\u00a9 2026 All Rights Reserved. Designed by Federation Design Company',
};

export const cta = {
  book: 'Book Online Meeting',
  assessment: 'About the assessment',
};
