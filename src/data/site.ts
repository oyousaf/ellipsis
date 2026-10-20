// Content adapted from the live ellipsis.earth site (October 2026), with typos and stale dates corrected.

export const site = {
  name: "Ellipsis Earth",
  shortName: "ellipsis",
  tagline: "Environmental data that drives change",
  description:
    "Ellipsis Earth powers informed decisions with robust, comparable data on environmental pollution, then puts that data to work in councils, classrooms and the stories that change behaviour.",
  email: "info@ellipsis.earth",
  location: "London, UK",
  founded: 2019,
  // Placeholder page in this concept; the real portal is never linked.
  portalUrl: "/portal",
  company: "Ellipsis Earth Ltd (12356412), 35 Thurloe Street, London SW7 2LQ",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/ellipsis-environmental/" },
    { label: "Instagram", href: "https://www.instagram.com/ellipsis.earth/" },
    { label: "X / Twitter", href: "https://twitter.com/EllipsisEarth" },
    { label: "Facebook", href: "https://www.facebook.com/EllipsisEnv/" },
  ],
};

export const nav = [
  { label: "Earth", href: "/earth", note: "monitor" },
  { label: "Educate", href: "/educate", note: "teach" },
  { label: "Stories", href: "/stories", note: "communicate" },
  { label: "About", href: "/about", note: "who we are" },
];

// Mission and vision, quoted from the original site.
export const mission = {
  goal: "To power informed decision-making by providing robust and comparable data on environmental pollution around the world.",
  problem: "Without reliable data, our best efforts are being wasted.",
  problemDetail:
    "Current solutions are wrongly applied, poorly targeted, inefficient and ineffective. Our platform identifies trends, measures impact, targets critical hotspots and shows directly whether a solution worked, so less time and money is wasted and greenwashing has nowhere to hide.",
  vision:
    "An integrated ecosystem for environmental change, through independent global research, disruptive education, exploration and creative media, all underpinned by one system for mapping the world's environmental impact.",
};

export const pillars = [
  {
    id: "earth",
    number: "01",
    name: "Earth",
    verb: "Monitor",
    href: "/earth",
    summary: "Machine-learning litter audits, cleanliness grading and hotspot forecasts for the people who keep places clean.",
    audience: ["councils", "brands", "governments", "not-for-profits"],
  },
  {
    id: "educate",
    number: "02",
    name: "Educate",
    verb: "Teach",
    href: "/educate",
    summary: "A student-led citizen science programme where young people collect real data with the same tech as our scientists.",
    audience: ["schools", "teachers", "students", "parents"],
  },
  {
    id: "stories",
    number: "03",
    name: "Stories",
    verb: "Communicate",
    href: "/stories",
    summary: "Campaigns, expeditions and journalism that turn the numbers into stories people act on.",
    audience: ["public", "press", "partners", "policy makers"],
  },
];

// Real Ellipsis imagery, served from the original site's media CDN.
const media = (id: string) => `https://static.wixstatic.com/media/${id}`;

export const photos = {
  detectRoadside: { src: media("440e40_59e6ffafef2a4a2782e761046d411cae~mv2.jpg"), alt: "Roadside litter outlined by Ellipsis Detect, each item labelled with its type and brand" },
  detectPavement: { src: media("440e40_646a2a5acbd9468b994115a215aa687a~mv2.jpg"), alt: "Pavement litter classified by type, including food containers and plastic film" },
  heatmap: { src: media("dd5303_17d9c6d9247745bb98fc0403dee005f0~mv2.jpg"), alt: "Litter heatmap over a satellite map of Bournemouth town centre and seafront" },
  students: { src: media("440e40_68a4ed5012074b5b9b361b2e37ec882c~mv2.jpg"), alt: "Two students recording litter with the Ellipsis Earth app on their phones" },
  arcticBoat: { src: media("440e40_058cdfc7177a4c1aa3e7fe152f896a10~mv2.jpg"), alt: "A red research vessel among icebergs" },
  sledDogs: { src: media("440e40_1690741e644b43dfab26f5cd55a291ab~mv2.jpg"), alt: "A sled-dog team crossing an ice sheet" },
  glacier: { src: media("440e40_227d3744b155478fa10dc7c229a48363~mv2.jpg"), alt: "An inflatable boat beneath a glacier face" },
  river: { src: media("440e40_223688459cfb451392b4a22d1ff7e379~mv2.jpg"), alt: "A raft on a glacial river through pine forest" },
};

// Wix serves resized, modern-format images from the same media URL via a /v1/fill/ transform.
export function sized(src: string, width: number, height: number) {
  return `${src}/v1/fill/w_${width},h_${height},al_c,q_80,enc_auto/photo.jpg`;
}

export const stats = [
  { value: 3000, suffix: "+", label: "litter surveys analysed" },
  { value: 24, suffix: "", label: "countries surveyed" },
  { value: 50, suffix: "+", label: "litter types classified" },
  { value: 90, suffix: "%+", label: "classification accuracy" },
];

export const capabilities = [
  {
    id: "detect",
    name: "Detect",
    kicker: "Litter auditing, automated",
    summary:
      "Machine learning that identifies more than 50 types of man-made litter from drone, vehicle and phone imagery, classified by type, weight, volume and recycling value.",
    points: ["90%+ classification accuracy", "250+ audits completed", "Man-made litter only, so the data stays actionable"],
  },
  {
    id: "grade",
    name: "Grade",
    kicker: "Cleanliness, objectively",
    summary:
      "Automated A–D street cleanliness grades aligned with DEFRA standards. Crews upload photos through the Ellipsis app and the platform grades them consistently, every time.",
    points: ["Aligned with DEFRA grading", "Consistent across teams and seasons", "Built for street cleansing crews"],
  },
  {
    id: "predict",
    name: "Predict",
    kicker: "From reactive to proactive",
    summary:
      "Built on Detect and Grade data, Predict forecasts litter trends and hotspots so resources go where they will be needed, before the problem appears.",
    points: ["Spot trends early", "Plan for peak times", "Allocate crews and bins with evidence"],
  },
];

export const howItWorks = [
  {
    step: "01",
    title: "Gather",
    body: "Imagery from any source: the Ellipsis app on iOS and Android, smartphones, drones, or cameras fixed to cars and bicycles. Use our in-house survey team or your own staff.",
  },
  {
    step: "02",
    title: "Identify",
    body: "Custom machine learning identifies litter by type with over 93% accuracy, and recognises 20+ brand logos so producers can be held to account.",
  },
  {
    step: "03",
    title: "Map",
    body: "Heatmaps, pinpoints and geofences show exactly where litter collects, how bins are performing and where it is coming from.",
  },
  {
    step: "04",
    title: "Act",
    body: "Clear recommendations target interventions, then follow-up surveys prove what worked, so budgets stop being spent on guesswork.",
  },
];

export const surveys = [
  {
    name: "Baseline",
    duration: "10 days",
    body: "A one-off snapshot of how clean your area really is, surveyed across a statistically representative sample. Geofence sites, track bin performance and locate likely sources.",
  },
  {
    name: "Campaign",
    duration: "Before & after",
    body: "Measure the effect of an intervention or anti-littering campaign by comparing survey to survey, down to individual bins and geofenced sites.",
  },
  {
    name: "Ongoing",
    duration: "Continuous",
    body: "Regular monitoring that keeps long-term targets on track and spots new hotspots as behaviour, seasons and infrastructure change.",
  },
];

export const environments = [
  { name: "Highways & motorways", detail: "Vehicle-mounted capture at road speed" },
  { name: "Beaches & coastlines", detail: "Aerial drone surveys of shorelines and harbours" },
  { name: "Towns & cities", detail: "Street-level audits of urban centres" },
  { name: "Rivers & waterways", detail: "Banks, canals and catchments mapped by air" },
  { name: "Parks & rural spaces", detail: "Green spaces, trails and countryside" },
];

export type CaseStudy = {
  id: string;
  place: string;
  country: string;
  headline: string;
  metric: string;
  metricLabel: string;
  partners?: string[];
  summary: string;
  detail?: string[];
  secondary?: { metric: string; label: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: "bournemouth",
    place: "Bournemouth, Christchurch & Poole",
    country: "United Kingdom",
    headline: "The most scientifically robust litter survey ever undertaken in the UK",
    metric: "75%",
    metricLabel: "average reduction in litter where our data informed decisions",
    partners: ["BCP Council", "Hubbub", "McDonald's"],
    summary:
      "Working with McDonald's and Hubbub, we gave BCP Council more than 90 recommendations to reduce litter across the region.",
    detail: [
      "Our trash ‘treasure maps’ showed exactly where and when to place playful interventions that reward people for binning their litter, from glow-in-the-dark bins to disco bins designed by Hubbub.",
      "Follow-up surveys then measured each intervention, and gave the council further recommendations on cleaning routes, timings and ways to cut litter at source.",
    ],
    secondary: [
      { metric: "90%", label: "less litter in some areas" },
      { metric: "73%", label: "fewer cigarette butts at targeted ballot bins" },
      { metric: "90+", label: "recommendations delivered" },
    ],
  },
  {
    id: "sorrento",
    place: "Sorrento",
    country: "Italy",
    headline: "A city-wide blueprint for tackling cigarette butt litter",
    metric: "69%",
    metricLabel: "reduction in cigarette butt littering",
    partners: ["Marevivo", "BAT"],
    summary:
      "We maximised the impact of a summer anti-littering campaign with Marevivo, which then became a blueprint for councils tackling cigarette butt litter across Italy.",
    secondary: [{ metric: "45%", label: "reduction of all litter across all sites" }],
  },
  {
    id: "amiens",
    place: "Amiens",
    country: "France",
    headline: "Putting new bins where the data said they belonged",
    metric: "38%",
    metricLabel: "reduction in littering across the city",
    summary: "Our survey data identified the best locations and types for new city-wide bins.",
  },
  {
    id: "ganges",
    place: "River Ganges",
    country: "India & Bangladesh",
    headline: "River litter data that shaped national policy",
    metric: "2",
    metricLabel: "national governments informed",
    summary:
      "Our extensive river litter data was provided to the governments of India and Bangladesh, and influenced nationwide single-use plastic bans.",
  },
  {
    id: "galapagos",
    place: "Galápagos Islands",
    country: "Ecuador",
    headline: "The first-ever baseline litter data for the Galápagos",
    metric: "1st",
    metricLabel: "baseline litter survey of the islands",
    summary:
      "Baseline data across the Galápagos was provided to the government of Ecuador, influencing a nationwide single-use plastics ban.",
  },
];

export const partners = [
  "National Geographic",
  "Keep Britain Tidy",
  "Hubbub",
  "Britvic",
  "JCDecaux",
  "McDonald's",
  "Interreg",
  "Citeo",
  "Starbucks",
  "Glasgow City Council",
  "Marevivo",
  "SUEZ",
  "BCP Council",
];

export const awards = [
  { title: "Environmental Campaign of the Year", year: 2021 },
  { title: "National Sustainability Award", year: 2021 },
  { title: "Education & Comms Award", year: 2022 },
  { title: "Best Environmental Cause Campaign", year: 2022 },
  { title: "Campaign of the Year", year: 2022 },
];

export const educate = {
  course: "Plastics, Data & Me",
  intro:
    "A complete, interactive, student-led citizen science programme delivered by multi-award-winning environmental tech leaders Ellipsis Earth.",
  // From Ellipsis Educate's own programme description.
  about: [
    "We’re passionate about working with schools to enhance our global understanding of environmental issues. We run interactive online programmes covering environmental science education, and we want your students to take part in our upcoming courses.",
    "Our current open course, Plastics, Data & Me, is available for all students to join. It runs twice a year during term time, starting in February and October, and twice a year as an intensive short course during the winter and summer breaks.",
  ],
  numbers: [
    { value: "12", label: "week programme" },
    { value: "5", label: "online modules" },
    { value: "3", label: "live expert webinars" },
    { value: "8", label: "weeks of app-based fieldwork" },
  ],
  journey: [
    { title: "Learn", body: "From pollution to experimental design, through online modules and interactive webinars." },
    { title: "Design", body: "Students create their own surveys, supported by curriculum-linked guidance." },
    { title: "Collect", body: "Fieldwork with the Ellipsis Earth app, solo or in teams, using the same tech as our scientists." },
    { title: "Analyse", body: "Dig into the data and statistics to find patterns, calculate results and compare impact." },
    { title: "Ask", body: "Talk to scientists about their research, and about the students’ own results." },
    { title: "Share", body: "Create communication pieces for a chosen audience and share the impact with the world." },
  ],
  forStudents: [
    "Use the latest image-recognition tech for a real cause",
    "Contribute to global datasets used by professional scientists",
    "Ask-a-scientist webinars with researchers and industry experts",
    "Connect with students in schools around the world",
  ],
  forEducators: [
    "Interactive gradebook to follow every student’s progress",
    "A global community of teachers to share ideas with",
    "On-demand webinar catch-up, any time",
    "All exercises, quizzes, audio and video included",
  ],
  curriculum: [
    "KS3/4",
    "GCSE & iGCSE",
    "AS/A Level",
    "IB & Extended Essay",
    "Higher education Y1/Y2",
    "STEM",
    "Geography",
    "Media & arts",
    "Languages",
    "IT",
  ],
  impact: "100% of students across 50 schools said they felt like real scientists, and would sign up again.",
  testimonials: [
    {
      quote:
        "My students not only loved using the app, the webinars and education modules, but they also loved hearing from students around the world.",
      name: "Heidi Corley",
      role: "Lynn-Rose Heights School, Canada",
    },
    {
      quote:
        "The portal was very useful, especially as it was our first time doing a project of this scope. Meeting and discussing the project with other teachers was really helpful.",
      name: "Teacher",
      role: "Ellipsis Educate school",
    },
    {
      quote:
        "Taking pictures with the app was the best part in my opinion. It was a fun thing to do, getting to use the latest technology for a good cause.",
      name: "Student",
      role: "Plastics, Data & Me",
    },
    {
      quote: "My students and I learned and discovered together. As a teacher, it was a heartwarming opportunity.",
      name: "Teacher",
      role: "Ellipsis Educate school",
    },
  ],
  faqs: [
    {
      q: "Who can take part?",
      a: "Junior, middle, senior and higher education students anywhere in the world. Materials are tailored by level and support all abilities.",
    },
    {
      q: "How is it delivered?",
      a: "Entirely online, so it works for timetabled lessons, remote learning or an after-school club. Students complete it at their own pace, from 9 to 90 days.",
    },
    {
      q: "When does it run?",
      a: "Term-time cohorts start in February and October, with intensive short courses during the winter and summer breaks.",
    },
    {
      q: "What do students need?",
      a: "A device to access the course and a smartphone or tablet with the Ellipsis Earth app for fieldwork. Everything else is included.",
    },
    {
      q: "Can we try it first?",
      a: "Yes. Get in touch and we’ll set up a teacher information session and a trial of the platform.",
    },
  ],
};

export const team = {
  leaders: [
    {
      name: "Ellie Mackay",
      role: "CEO & Founder",
      bio: "Cambridge and Imperial scientist, award-winning filmmaker and extreme-environment drone pilot. Ellie founded Ellipsis Earth in 2019 to build an integrated ecosystem for environmental change, through independent global research, disruptive education, exploration and creative media. She is a global ambassador for Women in Tech and Girls in STEM.",
    },
    {
      name: "Alex Dilnot-Smith",
      role: "COO",
      bio: "Ten years in business development for data, analytics and consumer engagement platforms, and an expert backend systems leader. Alex heads operations and oversees every major project across the global portfolio.",
    },
  ],
  groups: [
    {
      name: "Data capture",
      body: "A global network of aerial drone pilots and ground-based vehicle operators, including local capacity-building and fieldwork training in developing countries.",
    },
    {
      name: "Data analytics & SciComm",
      body: "Analysts, statisticians, modellers, infographic specialists and science communicators who turn huge datasets into campaigns, reports and public engagement.",
    },
    {
      name: "Educate",
      body: "Education developers, outreach professionals, content creators and webinar contributors from across environmental and public-engagement disciplines.",
    },
    {
      name: "Advisors",
      body: "Scientific advisors from ocean geochemistry to plastics, plus business mentors from our accelerator programmes.",
    },
  ],
  accelerators: [
    "HatchCo Lab, Geneva",
    "Sustainable Ocean Alliance, San Francisco",
    "Google for Startups Sustainability, London & Tel Aviv",
  ],
};

export const expeditions = {
  title: "World-first research expeditions",
  body: "From the Arctic ice sheet to glacial rivers, Ellipsis teams take drones and survey kit to some of the most remote places on Earth, gathering baseline data where none has existed before.",
  places: ["Arctic & Greenland", "Galápagos Islands", "River Ganges", "Canadian Rockies"],
};
