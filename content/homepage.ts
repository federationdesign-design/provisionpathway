// All homepage copy lives here so wording can be changed without touching layout.

export const site = {
  name: 'The Provision Pathway',
  // Step 2 of the roadmap: replace with the live Calendly link.
  calendlyUrl: 'https://calendly.com/PLACEHOLDER/consultation',
  gaMeasurementId: 'G-MMW4789DRX',
};

// A nav item either links somewhere or opens the services popup.
export type NavItem = { label: string; href: string } | { label: string; opens: 'services' };

export const nav: NavItem[] = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Pathway', opens: 'services' },
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

// Carousel entries. One dot is shown per entry, so adding or removing an
// entry here updates the carousel automatically.
export const personas = [
  {
    id: 'sarah',
    name: 'Meet Sarah:',
    body:
      'Sarah has spent years fighting for support. Ben\u2019s post-16 provision has broken down and he\u2019s now at home, disengaged. She knows the system, but no longer trusts it. She will only engage with someone who listens quickly and offers a credible next step.',
    image: '/assets/meet-sarah-img.png',
    imageAlt: 'A parent waiting outside a consultation room with her son',
  },
  {
    id: 'claire',
    name: 'Meet Claire:',
    body:
      'Claire has heard a different explanation from every professional. School, CAMHS, GP and private specialists all seem to see a different version of Ava. Ava is at home and declining. Claire is overloaded, guilty and desperate for one clear picture of what is happening.',
    image: '/assets/meetclair.jpg',
    imageAlt: 'A parent sitting alone at a kitchen counter with a cup of tea',
  },
  {
    id: 'james',
    name: 'Meet James:',
    body:
      'James is practical and action-focused. He accepts that Leo needs help and wants options, timelines and a defined next step. He has researched widely and is ready to pay for support, but he has little patience for vague advice or long waiting lists.',
    image: '/assets/meetjames.jpg',
    imageAlt: 'A parent at a table reading paperwork, head in hand',
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

// The services popup, opened from the Pathway nav item and the About the
// assessment button. Entered exactly as supplied. The assessment Location line
// and its first inclusion disagree on in person versus virtual delivery; this
// is logged in PLACEHOLDERS.md for the studio, not resolved here.
export const services = [
  {
    id: 'assessment',
    name: 'Pathway Assessment',
    facts: [
      {
        label: 'Purpose:',
        body: 'An independent, structured assessment of a child\u2019s needs, strengths, and learning style. Written up as a clear report the family can actually use, with a follow-up debrief included as standard.',
      },
      {
        label: 'Pricing:',
        body: '\u00a3300 (the debrief is included in this price, not an extra cost)',
      },
      {
        label: 'Location:',
        body: 'The assessment itself is delivered in person or virtually (dependant on personal circumstances), for families in the Warwickshire area. The debrief afterwards is remote.',
      },
    ],
    list: {
      label: 'What\u2019s included',
      ordered: false,
      items: [
        'The assessment itself, delivered in person, and the written report.',
        'A report debrief session (30 to 45 minutes), delivered within 1 to 2 weeks of the report being sent.',
        'A one-page written action plan with clear next steps, not just verbal advice.',
      ],
    },
  },
  {
    id: 'coaching',
    name: 'Post-16 / Year 11 Destination Coaching',
    facts: [
      {
        label: 'Purpose:',
        body: 'Supporting Post 16 students, particularly those who are NEET or at risk of becoming NEET, to explore their options and plan a realistic next step in education, training, or work.',
      },
      {
        label: 'Pricing:',
        body: '2-session package \u00a3220 (each session is 60 minutes)',
      },
    ],
    list: {
      label: 'Session structure',
      ordered: true,
      items: [
        'Explore: understand the young person\u2019s interests, strengths, and options.',
        'Map: lay out realistic pathways, further education, training, apprenticeships, or work.',
        'Apply: practical support with applications and next steps.',
      ],
    },
  },
];

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
