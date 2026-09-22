export const profile = {
  name: "Nafisa Sadaf Fahima",
  initials: "NS",
  title: "MBBS Final-Year Student · AI Prompt Specialist · Healthcare & AI Enthusiast",
  roles: [
    "AI Prompt Specialist",
    "Final-Year MBBS Student",
    "Healthcare AI Enthusiast",
    "Medical Content Creator",
    "Digital Health Innovator",
  ],
  availability: "Accepting Healthcare AI & Prompt Engineering Roles",
  tagline: "Bridging medicine and machine intelligence.",
  summary:
    "MBBS final-year student and AI Prompt Specialist with an interest in medical research, healthcare technology, artificial intelligence, and medical education. Skilled in developing and optimizing AI prompts for accurate, structured, and useful outputs. Passionate about integrating medical knowledge with AI to support healthcare innovation, research, education, and digital health solutions.",
  location: "House 991, S.S. Road, Sirajganj, Bangladesh",
  shortLocation: "Sirajganj, Bangladesh",
  phone: "01621815481",
  phoneIntl: "+8801621815481",
  email: "nafisasadaf82@gmail.com",
  socials: {
    linkedin: "https://www.linkedin.com/in/nafisasadaf",
    github: "https://github.com/nafisasadaf",
    twitter: "https://x.com/nafisasadaf",
  },
  languages: [
    { name: "Bengali", level: "Native", pct: 100 },
    { name: "English", level: "Professional", pct: 88 },
    { name: "Hindi", level: "Conversational", pct: 70 },
  ],
};

export const metrics = [
  { value: "6", suffix: "yrs", label: "Medical training" },
  { value: "50", suffix: "+", label: "AI prompt systems" },
  { value: "3", suffix: "", label: "Languages spoken" },
  { value: "2026", suffix: "", label: "MBBS graduation" },
];

export const philosophy = [
  { step: "01", title: "Clinical Accuracy First", text: "Every prompt is grounded in evidence-based medicine and verified against clinical guidelines." },
  { step: "02", title: "Structure Over Noise", text: "Outputs are engineered to be structured, scannable and immediately useful to clinicians and learners." },
  { step: "03", title: "Human-in-the-Loop", text: "AI accelerates the work; medical judgement and empathy remain the final authority." },
];

export const focusStack = [
  "GPT-4o", "Claude", "Gemini", "Prompt Chaining", "RAG", "Medical NLP",
  "Notion", "Figma", "After Effects", "Canva", "Google Analytics", "Meta Ads",
];

export type SkillCategory = {
  id: string;
  title: string;
  icon: "stethoscope" | "brain" | "palette" | "megaphone" | "flask" | "languages";
  accent: "blue" | "green";
  description: string;
  skills: { name: string; level: number }[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "clinical",
    title: "Clinical & Medical",
    icon: "stethoscope",
    accent: "blue",
    description: "Hands-on clinical training as a final-year MBBS student.",
    skills: [
      { name: "Patient History Taking", level: 92 },
      { name: "Clinical Examination", level: 90 },
      { name: "Case Presentation", level: 88 },
      { name: "Patient Management", level: 82 },
    ],
  },
  {
    id: "ai",
    title: "AI & Prompt Engineering",
    icon: "brain",
    accent: "green",
    description: "Designing precise, structured prompts for healthcare and education.",
    skills: [
      { name: "Prompt Design & Optimization", level: 95 },
      { name: "Medical AI Workflows", level: 88 },
      { name: "LLM Evaluation & Testing", level: 84 },
      { name: "AI-Assisted Content Systems", level: 90 },
    ],
  },
  {
    id: "research",
    title: "Research & Academic",
    icon: "flask",
    accent: "blue",
    description: "Literature research and academic content development.",
    skills: [
      { name: "Literature Review", level: 90 },
      { name: "Information Organization", level: 93 },
      { name: "Academic Writing", level: 86 },
      { name: "Medical Education Design", level: 85 },
    ],
  },
  {
    id: "creative",
    title: "Creative & Design",
    icon: "palette",
    accent: "green",
    description: "Visual storytelling for medical and educational media.",
    skills: [
      { name: "Graphic Design", level: 88 },
      { name: "Animation Editing", level: 84 },
      { name: "Presentation Design", level: 90 },
      { name: "Brand Visuals", level: 80 },
    ],
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    icon: "megaphone",
    accent: "blue",
    description: "Growing health-focused audiences across digital channels.",
    skills: [
      { name: "Content Strategy", level: 86 },
      { name: "Social Media Management", level: 88 },
      { name: "Campaign Analytics", level: 78 },
      { name: "Health Communication", level: 90 },
    ],
  },
  {
    id: "languages",
    title: "Languages",
    icon: "languages",
    accent: "green",
    description: "Multilingual communication with patients and teams.",
    skills: [
      { name: "Bengali", level: 100 },
      { name: "English", level: 88 },
      { name: "Hindi", level: 70 },
    ],
  },
];

export const experience = [
  {
    role: "AI Prompt Specialist",
    company: "Healthcare AI",
    period: "2025 — Present",
    type: "Current",
    accent: "green" as const,
    bullets: [
      "Develop and optimize AI prompts for medical education, research, and healthcare applications.",
      "Explore AI tools and technologies for improving healthcare communication and workflow.",
      "Create structured AI-assisted medical and educational content.",
    ],
    tags: ["Prompt Engineering", "LLMs", "Medical Education", "Workflow Automation"],
  },
  {
    role: "MBBS Clinical Training",
    company: "Shaheed Monsur Medical College & Hospital",
    period: "2020 — 2026",
    type: "Final-Year Medical Student",
    accent: "blue" as const,
    bullets: [
      "Gained clinical experience in patient history taking, examination, case presentation, and patient management under supervision.",
      "Participated in clinical rotations, case discussions, and academic activities.",
    ],
    tags: ["Clinical Rotations", "Patient Care", "Case Discussions"],
  },
  {
    role: "Medical Research & Academic Projects",
    company: "Independent & Academic",
    period: "Ongoing",
    type: "Research",
    accent: "blue" as const,
    bullets: [
      "Interested in medical research, healthcare innovation, and the application of AI in medicine.",
      "Experienced in literature research, information organization, and academic content development.",
    ],
    tags: ["Literature Research", "Healthcare Innovation", "Academic Content"],
  },
];

export type Project = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  /** Bullet points pulled directly from the CV (experience / academic record). */
  highlights: string[];
  /** The CV experience entry this case study is grounded in. */
  context: string;
  featured: boolean;
  accent: "blue" | "green";
};

export const projects: Project[] = [
  {
    title: "MedPrompt Library",
    subtitle: "Structured prompt system for medical education",
    description:
      "A curated, versioned library of clinically-reviewed prompts that turn LLMs into reliable study partners — from OSCE case simulations to differential-diagnosis drills with structured, citation-ready outputs.",
    image: "/images/project-medprompt.jpg",
    tags: ["Prompt Engineering", "GPT-4o", "Claude", "Medical Education"],
    highlights: [
      "Develop and optimize AI prompts for medical education, research, and healthcare applications.",
      "Explore AI tools and technologies for improving healthcare communication and workflow.",
      "Create structured AI-assisted medical and educational content.",
    ],
    context: "AI Prompt Specialist · Healthcare AI (2025 — Present)",
    featured: true,
    accent: "blue",
  },
  {
    title: "ClinicNote AI",
    subtitle: "AI-assisted clinical documentation workflow",
    description:
      "A prompt-chained workflow that converts raw patient history into structured SOAP notes and patient-friendly summaries, designed to reduce documentation time while preserving clinical accuracy.",
    image: "/images/project-clinicnote.jpg",
    tags: ["Healthcare AI", "Prompt Chaining", "Workflow", "NLP"],
    highlights: [
      "Gained clinical experience in patient history taking, examination, case presentation, and patient management under supervision.",
      "Participated in clinical rotations, case discussions, and academic activities.",
    ],
    context: "MBBS Clinical Training · Shaheed Monsur Medical College & Hospital",
    featured: true,
    accent: "green",
  },
  {
    title: "Anatomy in Motion",
    subtitle: "Animated medical explainer series",
    description:
      "A series of short animated explainers that simplify complex physiology for students and patients, combining animation editing, graphic design and AI-generated scripts.",
    image: "/images/project-anatomy.jpg",
    tags: ["Animation", "Graphic Design", "Health Communication"],
    highlights: [
      "Interested in medical research, healthcare innovation, and the application of AI in medicine.",
      "Experienced in literature research, information organization, and academic content development.",
    ],
    context: "Medical Research & Academic Projects",
    featured: false,
    accent: "blue",
  },
];

export const education = [
  {
    degree: "Bachelor of Medicine & Bachelor of Surgery (MBBS)",
    institution: "Shaheed Monsur Medical College & Hospital",
    period: "2020 — 2026",
    status: "Final Year",
    detail: "Comprehensive medical training with clinical rotations across core specialties.",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Govt. Rashidazzoha Women's College",
    period: "2019",
    status: "Completed",
    detail: "Science group — pre-medical curriculum with a focus on Biology, Chemistry and Physics.",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Sirajganj Police Lines School & College",
    period: "2017",
    status: "Completed",
    detail: "Science group — foundation in sciences and mathematics.",
  },
];

export const certifications = [
  { name: "AI Prompt Engineering for Healthcare", issuer: "Self-directed specialization", year: "2025" },
  { name: "Clinical Skills & Patient Communication", issuer: "MBBS Clinical Rotations", year: "2024" },
  { name: "Digital Marketing Fundamentals", issuer: "Professional Development", year: "2023" },
  { name: "Graphic Design & Animation Editing", issuer: "Creative Practice", year: "2022" },
];

export const reference = {
  name: "Md. Nahid Islam",
  role: "CEO, Uttarbanga IT",
};

export const navLinks = [
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/education", label: "Education" },
  { href: "/contact", label: "Contact" },
];
