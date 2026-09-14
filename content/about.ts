// All About page copy lives here so wording can be changed without touching
// layout. Transcribed from reference/aboutpage.jpg.

export const aboutIntro = {
  headline: 'About The Provision Pathway',
  paragraphs: [
    'Provision Pathway is an independent SEND consultancy based in Warwickshire.',
    'Founded by Farzana Choudhury, who has worked in higher education since 2009. Farzana has always been driven by a passion for helping young people achieve their full potential and has spent years developing a real understanding of what it takes to support young adults and their families toward better outcomes. The team also includes members with extensive experience in SEN and behavioural management, including a BPS-accredited background in psychology.',
  ],
};

export const aboutWhatWeDo = {
  heading: 'What do we do?',
  paragraphs: [
    'We carry out structured, observation-based assessments to build an understanding of a young person\u2019s needs, strengths, and learning style. That assessment becomes the foundation for everything that may follow depending on the young person\u2019s circumstances: understanding the right provision, supporting with EHCP drafts and planning what comes next at post-16 who are considered NEET (Not in Education, Employment or Training) or at risk of becoming NEET.',
    'Our assessments aren\u2019t diagnostic and we can\u2019t promise a specific placement outcome. What we can do is give families a clear picture of what their child needs, and help them make the strongest case possible.',
    'We have built a network with local provisions, councillors and mental health provisions across Warwickshire so families get an honest view of what\u2019s actually available. At The Provision Pathway we understand it can be tough for families to navigate the complexities of alternative education pathways and what options are truly open to them.',
  ],
  image: '/assets/about-page-img.jpg',
  // Alt text written during the build, not supplied. See PLACEHOLDERS.md.
  imageAlt: 'A hand holding a pen over paperwork on a desk, beside a second person',
};

export const aboutClosing = {
  headline:
    'Book in a free 20 minute call with a member of our team to find out how The Provision Pathway can support you in your journey.',
};

export const aboutMeta = {
  title: 'About | The Provision Pathway',
  description: aboutIntro.paragraphs[0],
};
