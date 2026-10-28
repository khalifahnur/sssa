import type { MediaKey } from './media';

export type ProgramCategory = 'all' | 'youth' | 'teen' | 'scholar' | 'specialist';

export interface AcademyProgram {
  id: string;
  slug: string;
  title: string;
  category: Exclude<ProgramCategory, 'all'>;
  categoryLabel: string;
  ageRange: string;
  schedule: string;
  summary: string;
  image: MediaKey;
  coachRatio: string;
  syllabus: string[];
  outcomes: string;
}

export interface FoundationPillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
}

export interface FixtureTicket {
  id: string;
  homeTeam: string;
  awayTeam: string;
  matchTitle: string;
  startsAt: string;
  dateFormatted: string;
  dayName: string;
  dayNumber: string;
  monthName: string;
  kickoffTime: string;
  location: string;
  competition: string;
  price: number;
  seatsRemaining: number;
  image: MediaKey;
  ticketCode: string;
}

export interface HighlightClip {
  id: string;
  title: string;
  date: string;
  location: string;
  duration: string;
  category: string;
  image: MediaKey;
  featured?: boolean;
  tacticalNotes: string;
  keyStats: { label: string; value: string }[];
}

export interface PlayerTestimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  outcome: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  isoDate: string;
  title: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  image: MediaKey;
  excerpt: string;
  content: string[];
}

export const BRAND_CONTACT = {
  name: 'St. Sebastian Sports Academy',
  slogan: 'Champions for Life',
  address: 'Kabarnet road,Nairobi',
  email: 'sssafc@stsebastiansportsacademy.com',
  brandEmail: 'brand@sebastian.org',
  phone: '+254 184 1243 161',
  // principal: 'Chiara Canzi',
  // headCoach: 'Alonso D. Dowson',
  foundedYear: 2025,
};

export const SPIRIT_TABS = {
  mission: {
    id: 'mission',
    label: 'OUR MISSION',
    heading: 'Holistic Athletic & Academic Excellence',
    body: 'To holistically develop young athletes through world-class football training, transformative academics, and character-building values, preparing every student to thrive, lead, and positively impact their communities.',
    bullets: [
      'UEFA & USSF A-License technical and tactical curriculum',
      'Accredited college-preparatory STEM & humanities coursework',
      'Individualized sports science, nutrition, and mental resilience',
    ],
  },
  vision: {
    id: 'vision',
    label: 'OUR VISION',
    heading: 'Structured Pathways to Lifelong Leadership',
    body: 'St. Sebastian Sports Academy empowers young athletes to turn aspiration into achievement. We exist to create clear, structured pathways that set every student up for lifelong success on the pitch and in the classroom.',
    bullets: [
      'Direct scouting partnerships with professional clubs in Europe & MLS',
      '98% university scholarship placement for graduating student-athletes',
      'Honouring St. Sebastian, patron saint of athletics, in resilience and discipline',
    ],
  },
  promise: {
    id: 'promise',
    label: 'BRAND PROMISE',
    heading: 'Champions for Life — Beyond the 90 Minutes',
    body: 'Our slogan "Champions for Life" reflects our commitment to nurturing well-rounded individuals—not only exceptional footballers, but also strong leaders, responsible citizens, and impactful members of society.',
    bullets: [
      'People-centred mentorship with a 1:8 coach-to-scholar ratio',
      'Mandatory community leadership and youth coaching service hours',
      'Lifelong alumni career network across professional sport and industry',
    ],
  },
} as const;

export const FOUNDATION_PILLARS: FoundationPillar[] = [
  {
    id: 'people-centred',
    number: '01',
    title: 'People-Centred & Passionate',
    subtitle: 'Nurturing Every Athlete to Reach Their Highest Potential',
    description:
      'We put people first. Passion for the game drives everything we do—believing that love for football paired with individualized academic and emotional support fuels players to keep growing when faced with high-pressure challenges.',
    metric: '1:8 Coach-to-Athlete Ratio',
  },
  {
    id: 'tenacious',
    number: '02',
    title: 'Tenacious Pursuit of Mastery',
    subtitle: 'Determined, Resilient & Unwavering on the Pitch',
    description:
      'Honouring St. Sebastian, patron saint of athletics, we instill relentless determination and tactical discipline. Every training block is engineered to build composure under pressure, high-tempo pressing, and technical precision.',
    metric: '18+ Hours Weekly Pitch & Tactical Lab',
  },
  {
    id: 'valiant',
    number: '03',
    title: 'Valiant Leadership & Excellence',
    subtitle: 'Acting Boldly in Our Decisions, Actions & Standards',
    description:
      'We act boldly in the standards we set both in competitive fixtures and university-prep classrooms. Student-athletes learn to take ownership of game-deciding moments while maintaining honor-roll academic standing.',
    metric: '3.78 Average Scholar-Athlete GPA',
  },
  {
    id: 'respectful',
    number: '04',
    title: 'Respectful Sportsmanship',
    subtitle: 'Upholding Mutual Respect Across Our Entire Community',
    description:
      'True champions elevate everyone around them. We uphold mutual respect between players, coaches, officials, opponents, and families—ensuring integrity shapes every victory and every lesson.',
    metric: '100% Fair Play & Community Service Record',
  },
];

export const BRAND_VALUES = [
  {
    id: 'people-centred',
    name: 'People-centred',
    definition: 'We put people first, nurturing and empowering them to reach their highest potential.',
    proof: '1:8 coach-to-athlete ratio',
  },
  {
    id: 'Opportunity & Exposure',
    name: 'Opportunity & Exposure',
    definition: 'Pathways to global platforms and elite networks.',
    proof: '18+ hours weekly on pitch & in the tactical lab',
  },
  {
    id: 'Community Values',
    name: 'Community Values',
    definition: 'Rooted in purpose, & committed to giving back..',
    proof: '3.78 average scholar-athlete ',
  },
  {
    id: 'Excellence & Innovation',
    name: 'Excellence & Innovation',
    definition: 'Leading Africa’s sport-education integration',
    proof: '100% fair play & community service record',
  },
] as const;

export const BRAND_VOICE = [
  { name: 'Aspirational', line: 'We inspire young athletes to pursue excellence.' },
  { name: 'Supportive', line: 'We nurture growth with encouragement and belief.' },
  { name: 'Professional', line: 'We communicate with credibility while nurturing talent in sports and education.' },
  { name: 'Purpose-driven', line: 'Every message reflects discipline, character, and long-term impact.' },
  { name: 'Community-focused', line: 'We emphasize teamwork, belonging, and leadership.' },
] as const;

export const ACADEMY_PROGRAMS: AcademyProgram[] = [
  {
    id: 'prog-youth',
    slug: 'youth-foundation',
    title: 'Discover Phase',
    category: 'youth',
    categoryLabel: 'Youth',
    ageRange: 'Ages 5-8',
    schedule: 'Mon / Wed / Fri · 4:00 PM – 6:00 PM',
    summary:
      'Introduces young players to technical ball mastery, bilateral coordination, spatial awareness, and joyful small-sided teamwork in a supportive environment.',
    image: 'youth-kick',
    coachRatio: '1:8 Ratio',
    syllabus: [
      'First-touch mastery, 1v1 ball manipulation, and weak-foot confidence',
      'Small-sided 4v4 and 7v7 positional rondos for rapid decision-making',
      'Agility, balance, coordination (ABC) and injury-prevention movement literacy',
      'Character workshops on teamwork, respect, and growth mindset',
    ],
    outcomes: 'Graduates transition seamlessly into competitive 11v11 academy squads with elite technical fundamentals.',
  },
  {
    id: 'prog-teen',
    slug: 'teen-competitive',
    title: 'Skill Aquisition Phase',
    category: 'teen',
    categoryLabel: 'Teen',
    ageRange: 'Ages 8-12',
    schedule: 'Tue / Thu / Sat · 4:30 PM – 7:00 PM',
    summary:
      'Refines high-speed technical execution, tactical phase play, positional versatility, and athletic conditioning for regional and national youth leagues.',
    image: 'youth-match',
    coachRatio: '1:10 Ratio',
    syllabus: [
      '11v11 tactical periodization: build-up play, high press, and transition triggers',
      ' Biometric GPS load monitoring and explosive sprint mechanics',
      'Video analysis classroom sessions using pro match footage',
      'Integrated academic tutoring and PSAT/SAT scholar preparation',
    ],
    outcomes: '86% of U15 players earn selection to regional talent ID centers or full-time U18 scholar residencies.',
  },
  {
    id: 'prog-scholar',
    slug: 'scholar-pathway',
    title: 'Game Training Phase',
    category: 'scholar',
    categoryLabel: 'Scholar',
    ageRange: 'Ages 13-15',
    schedule: 'Mon – Sat · Full-Day Residency & Academic Track',
    summary:
      'Our flagship dual-pathway combining daily professional football training, UEFA-licensed coaching, and accredited college-prep academics for aspiring pros.',
    image: 'scholars-library',
    coachRatio: '1:6 Ratio',
    syllabus: [
      'Morning technical/tactical pitch sessions + afternoon accredited academic classes',
      'Direct showcase fixtures against MLS Next, USL, and European partner academies',
      'recruitment portfolio management & highlight reel production',
      'Sports psychology, media training, and leadership certification',
    ],
    outcomes: '98% placement into scholarships or professional club contracts.',
  },
];

export const HOW_WE_HELP_SERVICES = [
  {
    id: 'camps',
    title: 'Football Holiday Camps',
    subtitle: 'Seasonal 5-Day Immersive Clinics',
    description: 'Full-day summer and winter camps blending technical skill challenges, tournament play, and character leadership workshops.',
  },
  {
    id: 'tactical',
    title: 'Tactical & Academic Labs',
    subtitle: 'Video Analysis & STEM Tutoring',
    description: 'Dedicated classroom blocks where student-athletes study positional game models alongside honours academic mentors.',
  },
  {
    id: 'group',
    title: 'Group Training Sessions',
    subtitle: 'High-Tempo Squad Rondo & Pressing',
    description: 'Small-group positional clinics engineered to accelerate ball circulation speed, vocal leadership, and collective pressing.',
  },
  {
    id: 'grassroots',
    title: 'Grass-Root Football Teams',
    subtitle: 'Community League Pathways',
    description: 'Accessible weekend development squads introducing local youth to the St. Sebastian methodology and club values.',
  },
];



export const PLAYER_TESTIMONIALS: PlayerTestimonial[] = [
  {
    id: 'rev-1',
    name: 'ALONSO D. DOWSON JR.',
    role: 'U19 Scholar Captain [Age 18]',
    quote:
      '"Proud of the team’s growth, discipline, and teamwork. St. Sebastian transformed my tactical IQ and prepared me to become a true champion on and off the field."',
    rating: 5,
    outcome: 'Committed to UNC Chapel Hill (NCAA Division I Full Scholarship)',
  },
  {
    id: 'rev-2',
    name: 'AMARA NKOSI',
    role: 'U17 Girls Elite Midfielder [Age 16]',
    quote:
      '"The balance between honours academics and UEFA-level coaching is unmatched. Our coaches care deeply about us as people first, and that confidence shows every matchday."',
    rating: 5,
    outcome: 'Selected for U17 National Youth Talent ID Camp · 3.92 GPA',
  },
  {
    id: 'rev-3',
    name: 'DAVID & ELENA MENSAH',
    role: 'Academy Parents [U12 & U15 Squads]',
    quote:
      '"Joining St. Sebastian Sports Academy was the best decision for our sons. Their respect, study habits, and technical confidence have skyrocketed in just one season."',
    rating: 5,
    outcome: 'Both sons named to the Academy Principal’s Honour Roll',
  },
];

export const BLOG_UPDATES: BlogArticle[] = [
  {
    id: 'post-1',
    slug: 'rahim-khan-scholarship',
    isoDate: '2026-10-21',
    title: 'The Academy secures 19-year-old prodigy Rahim Khan on scholarship',
    date: 'OCTOBER 21, 2026',
    author: 'CHIARA CANZI',
    category: 'Academy Signing',
    readTime: '3 min read',
    image: 'blog-tackle',
    excerpt:
      'Following a standout performance at our Autumn Scout Showcase, attacking midfielder Rahim Khan joins the Full-Time Pro & Scholar Pathway.',
    content: [
      'St. Sebastian Sports Academy is proud to announce that 19-year-old attacking midfielder Rahim Khan has been awarded our prestigious Patron Saint Full-Residency Scholarship for the 2026/27 academic and competitive season.',
      'Khan impressed Head Coach Alonso D. Dowson and visiting collegiate scouts during the October Trial Showcase, recording four assists and a 92% progressive pass completion rate across three trial matches.',
      '"Rahim embodies our four core values—People-centred, Tenacious, Valiant, and Respectful," noted Principal Chiara Canzi. "Alongside his exceptional vision in the final third, his commitment to engineering coursework makes him a model St. Sebastian scholar-athlete."',
    ],
  },
  {
    id: 'post-2',
    slug: 'thunder-fc-late-winner',
    isoDate: '2026-10-16',
    title: 'A 90th-minute goal gave St. Sebastian a 2–1 win over rival Thunder FC',
    date: 'OCTOBER 16, 2026',
    author: 'ALONSO D. DOWSON',
    category: 'Match Report',
    readTime: '4 min read',
    image: 'blog-laces',
    excerpt:
      'Tenacious pressing and tactical patience paid off in stoppage time as our U18 squad remained unbeaten at the top of the Atlantic Academy League.',
    content: [
      'In front of 1,200 supporters at Research Triangle Park Arena, the St. Sebastian U18 squad demonstrated remarkable resilience to overturn an early deficit and defeat Thunder FC 2–1 in the 90th minute.',
      'After equalizing midway through the second half through a rehearsed corner-kick routine, our midfield trio controlled 68% of possession, systematically pinning Thunder FC inside their defensive third.',
      'With 40 seconds remaining on the clock, winger Lucas Thorne combined with fullback Devon Brooks on an overlapping give-and-go before slotting home the decisive finish into the bottom corner.',
    ],
  },
  {
    id: 'post-3',
    slug: 'class-of-2026-placements',
    isoDate: '2026-10-08',
    title: 'Scholar-athletes celebrate 98% university placement and academic honours',
    date: 'OCTOBER 08, 2026',
    author: 'ST. SEBASTIAN EDITORIAL',
    category: 'Academics & Pathways',
    readTime: '5 min read',
    image: 'blog-volley',
    excerpt:
      'From local grassroots to national championships and top-tier universities, our Class of 2026 proves what it means to be Champions for Life.',
    content: [
      'True to our emblem—which unites the open book of learning with the football and mountain peaks of aspiration—St. Sebastian Sports Academy’s graduating cohort has achieved a 98% university scholarship and professional contract placement rate.',
      'Fourteen student-athletes signed NCAA Division I letters of intent this week, while three graduates accepted professional development contracts with USL Championship and European partner clubs.',
      'Our integrated daily schedule ensures that every athlete receives dedicated STEM and humanities instruction before stepping onto the training pitch each afternoon.',
    ],
  },
];

export const INSTITUTIONAL_HERO_COPY = {
  title: 'ST. SEBASTIAN SPORTS ACADEMY',
  mission:
    'Pioneering residential institution transforming youth development through elite football training, accredited Cambridge academics, and comprehensive wellness programs.',
  excellenceTagline: 'EXCELLENCE IN EVERY DETAIL',
  excellenceCopy:
    "Where athletic prowess meets academic achievement, creating tomorrow's leaders through discipline, innovation, and unwavering commitment to excellence.",
};

export const INSTITUTIONAL_METRICS = [
  { value: '400', label: 'Student Capacity' },
  { value: '11+', label: 'Starting Age' },
  { value: '24/7', label: 'Supervision' },
];

export const CORE_ACADEMY_PILLARS = [
  // {
  //   number: '01',
  //   title: 'Full-Time Academy',
  //   subtitle:
  //     'Comprehensive residential program combining elite athletics with academic excellence',
  //   image: 'scholars-campus' as const,
  //   items: [
  //     {
  //       heading: 'RESIDENTIAL LIFE',
  //       detail: 'Year-round boarding for students aged 11+',
  //     },
  //     {
  //       heading: 'ACADEMICS',
  //       detail: 'Cambridge Curriculum instruction',
  //     },
  //     {
  //       heading: 'ATHLETICS',
  //       detail: 'Elite football training & development',
  //     },
  //     {
  //       heading: 'WELLNESS',
  //       detail: 'Life skills, nutrition & mental health',
  //     },
  //   ],
  // },
  {
    number: '01',
    title: 'Coaching Camps',
    subtitle: 'Intensive short-term programs during school holidays',
    image: 'youth-kick' as const,
    items: [
      {
        heading: 'INTENSIVE SCHEDULE',
        detail: '4-5 day intensive training programs',
      },
      {
        heading: 'TECHNICAL STAFF',
        detail: 'Professional coaches and technical development',
      },
      {
        heading: 'METHODOLOGY',
        detail: 'Academy methodology exposure',
      },
      {
        heading: 'TALENT IDENTIFICATION',
        detail: 'Direct assessment for Full-Time Academy scholarships',
      },
    ],
  },
  {
    number: '02',
    title: 'Player Pathway',
    subtitle: 'Professional development and transfer opportunities',
    image: 'player-strike' as const,
    items: [
      {
        heading: 'TRACKING',
        detail: 'Long-term performance monitoring',
      },
      {
        heading: 'PLACEMENT',
        detail: 'Professional club opportunities',
      },
      {
        heading: 'INTEGRATION',
        detail: 'FIFA Connect system',
      },
      // {
      //   heading: 'REVENUE',
      //   detail: '10% sell-on fee structure',
      // },
    ],
  },
];

export const CAMPUS_FACILITIES = {
  academic: {
    category: 'Academic Campus',
    image: 'scholars-library' as const,
    highlights: [
      {
        title: 'Cambridge International Standards',
        description: 'World-class academic facilities and curriculum',
      },
      {
        title: 'Science & Computer Labs',
        description: 'State-of-the-art laboratory facilities',
      },
      {
        title: 'Study Lounges',
        description: 'Dedicated learning and collaboration spaces',
      },
    ],
  },
  residential: {
    category: 'Residential Life',
    image: 'residential' as const,
    highlights: [
      {
        title: '400 Student Capacity',
        description: 'Separate boarding houses with modern amenities',
      },
      {
        title: 'Staff Accommodation',
        description: '30 dedicated units for residential staff',
      },
      {
        title: '24/7 Pastoral Care',
        description: 'Comprehensive supervision and student support',
      },
    ],
  },
};

export const LEGACY_TIMELINE = [
  {
    year: '1985',
    title: 'Founding of St. Sebastian Sports Academy',
    description:
      'Established with a vision to unite elite technical football development with rigorous scholarship and character formation.',
  },
  {
    year: '2012',
    title: 'Cambridge International Accreditation',
    description:
      'Full integration of the Cambridge Assessment International Education curriculum alongside UEFA-methodology training.',
  },
  {
    year: '2018',
    title: 'Inaugural Academy World Cup & 30+ Partner Clubs',
    description:
      'Launch of the international tournament and expansion of our National Academy network across 20 Elite and 10 National hubs.',
  },
  {
    year: '2026',
    title: '400-Scholar Residential Campus & FIFA Connect',
    description:
      'Modern boarding houses, 30 dedicated residential staff units, 24/7 pastoral care, and FIFA Connect player pathway integration.',
  },
];


