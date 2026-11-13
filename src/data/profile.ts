/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONTENT — edit everything about the portfolio here.
 *  No component needs changing to update text, links or files.
 * ─────────────────────────────────────────────────────────────
 */
import type { LucideIcon } from 'lucide-react'
import {
  Boxes,
  Calculator,
  Code,
  Database,
  Factory,
  FileText,
  Gauge,
  Globe,
  GraduationCap,
  Handshake,
  Headset,
  Layers,
  Lightbulb,
  MessagesSquare,
  Plug,
  Rocket,
  SearchCheck,
  ShieldCheck,
  ShoppingCart,
  Shuffle,
  Users,
  Workflow,
  Wrench,
} from 'lucide-react'

export const profile = {
  name: 'Shalman S',
  firstName: 'Shalman',
  title: 'Odoo Developer & Techno-Functional Consultant',
  shortTitle: 'Odoo Developer | Techno-Functional Consultant',
  location: 'Dubai, UAE',
  education: 'BE Mechanical Engineering',
  tagline:
    'I build custom Odoo solutions, automate business workflows, and transform complex business requirements into practical ERP applications.',
  availability: 'Open to Odoo projects & roles',

  /** Illustrated portrait. Unused originals (real headshot, older cartoon) are kept in /design — not published. */
  photo: '/profile-illustration.jpg',
  /** CV served from /public/cv/Shalman_S_CV.pdf */
  cvPath: '/cv/Shalman_S_CV.pdf',
  cvFileName: 'Shalman_S_Odoo_Developer_CV.pdf',
}

export const contact = {
  email: 'shalman8827@gmail.com',
  phone: '+971565489505',
  phoneDisplay: '+971 56 548 9505',
  /** wa.me needs digits only */
  whatsapp: '971565489505',
  linkedin: 'https://www.linkedin.com/in/shalman-odoo-developer',
  github: 'https://github.com/Shalmans',
}

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
] as const

export type Stat = {
  value: number
  prefix?: string
  suffix?: string
  /** Shown instead of a counter when set */
  text?: string
  /** Decimal places for the counter (e.g. 1 for 3.5) */
  decimals?: number
  label: string
  hint: string
}

export const stats: Stat[] = [
  { value: 3.5, decimals: 1, suffix: '+', label: 'Years Experience', hint: 'Odoo since 2023' },
  { value: 19, prefix: '10–', label: 'Odoo Versions', hint: 'Odoo 10 to Odoo 19' },
  { value: 0, text: 'Superhero', label: 'Odoo Rank', hint: 'Community milestone' },
]

export const about = {
  /** follows "Hi, I'm <name>, " */
  intro:
    'an Odoo Developer & Techno-Functional Consultant at Fidobe Solutions, an Odoo Gold Partner in Dubai, with 3.5+ years of hands-on Odoo experience in custom module development, ERP implementation, workflow automation and integrations.',
  body: 'I work with Python, PostgreSQL, JavaScript/OWL, XML, QWeb and REST APIs, and own the full cycle — client requirements, UAT and production deployments on Odoo.sh and Linux. I enjoy understanding business requirements and turning them into efficient technical solutions.',
  /** logo tiles — names must exist in components/ui/TechIcons.tsx */
  tech: ['Python', 'Odoo', 'PostgreSQL', 'JavaScript', 'OWL', 'XML', 'HTML5', 'CSS', 'Bootstrap', 'Git', 'Bitbucket', 'Linux'],
}

export type SkillGroup = {
  title: string
  /** level = self-assessed proficiency 0–100 — adjust to your own rating */
  skills: { name: string; level: number }[]
}

/** Six compact cards, four skills each (from the CV). */
export const skillGroups: SkillGroup[] = [
  {
    title: 'ERP & Platform',
    skills: [
      { name: 'Odoo ERP (v10 – v19)', level: 95 },
      { name: 'Odoo Community / Enterprise', level: 92 },
      { name: 'Custom Module Development', level: 94 },
      { name: 'Odoo.sh & Deployments', level: 85 },
    ],
  },
  {
    title: 'Languages & Frameworks',
    skills: [
      { name: 'Python', level: 92 },
      { name: 'XML & QWeb', level: 92 },
      { name: 'JavaScript & OWL', level: 80 },
      { name: 'HTML / CSS / Bootstrap', level: 85 },
    ],
  },
  {
    title: 'Databases & ORM',
    skills: [
      { name: 'Odoo ORM', level: 93 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'SQL Queries & Tuning', level: 80 },
      { name: 'Data Migration', level: 82 },
    ],
  },
  {
    title: 'APIs & Integrations',
    skills: [
      { name: 'REST API Integration', level: 85 },
      { name: 'XML-RPC / JSON-RPC', level: 82 },
      { name: 'Third-Party Applications', level: 80 },
      { name: 'Automated Actions & Crons', level: 88 },
    ],
  },
  {
    title: 'Functional Modules',
    skills: [
      { name: 'Sales & Purchase', level: 92 },
      { name: 'Inventory & Manufacturing', level: 86 },
      { name: 'Accounting', level: 82 },
      { name: 'CRM, HR & Payroll', level: 84 },
    ],
  },
  {
    title: 'Tools & Delivery',
    skills: [
      { name: 'Git / Bitbucket', level: 86 },
      { name: 'Linux Servers', level: 80 },
      { name: 'Access Rights & Record Rules', level: 88 },
      { name: 'UAT & Production Go-Live', level: 85 },
    ],
  },
]

export type Experience = {
  role: string
  company: string
  /** short tag shown next to the company, e.g. partner level */
  companyTag?: string
  location: string
  /** 'YYYY-MM' */
  start: string
  /** 'YYYY-MM', or null while current */
  end: string | null
  type: 'Full-time' | 'Internship'
  tech: string[]
  /** keep to ~3 short lines — the card is meant to be scanned */
  highlights: string[]
}

/** Oldest first (left → right on the timeline). Durations are calculated automatically. */
export const experience: Experience[] = [
  {
    role: 'Full Stack Python Developer Intern',
    company: 'Besant Technologies',
    location: 'Bengaluru, India',
    start: '2023-03',
    end: '2023-08',
    type: 'Internship',
    tech: ['Python', 'JavaScript', 'Odoo ORM', 'Git'],
    highlights: [
      'Web apps with Python, HTML, CSS & JS',
      'First Odoo ORM models & custom modules',
      'Debugging, testing & Git workflow',
    ],
  },
  {
    role: 'Odoo Developer & Techno‑Functional Consultant',
    company: 'Saasmate Tech Solutions',
    location: 'Salem, India',
    start: '2023-09',
    end: '2025-10',
    type: 'Full-time',
    tech: ['Python', 'XML', 'QWeb', 'PostgreSQL'],
    highlights: [
      'Customized Sales, Purchase, Inventory & Accounting',
      'Python automations, workflows & QWeb reports',
      'Performance tuning & mentoring junior devs',
    ],
  },
  {
    role: 'Odoo Developer & Techno‑Functional Consultant',
    company: 'Fidobe Solutions LLC',
    companyTag: 'Odoo Gold Partner',
    location: 'Dubai, UAE',
    start: '2025-10',
    end: null,
    type: 'Full-time',
    tech: ['Python', 'OWL', 'REST API', 'Odoo.sh'],
    highlights: [
      'ERP solutions for UAE & international clients',
      'CRM, HR/Payroll, Projects & Accounting modules',
      'OWL frontend, portals & REST API integrations',
    ],
  },
]

export type MockupKind =
  | 'calendar'
  | 'migration'
  | 'bidding'
  | 'list'
  | 'chart'
  | 'documents'
  | 'approval'
  | 'website'

export type Project = {
  name: string
  category: string
  description: string
  tech: string[]
  features: string[]
  mockup: MockupKind
  /** Optional — leave undefined until you have a real link */
  url?: string
}

export const projects: Project[] = [
  {
    name: 'ClinikMate – Appointment Management',
    category: 'Healthcare',
    description:
      'Custom Odoo app for clinics to manage patients, doctor schedules and appointments end to end.',
    tech: ['Python', 'Odoo ORM', 'XML', 'QWeb'],
    features: [
      'Calendar booking with doctor availability',
      'Appointment status workflow',
      'Patient history & visit records',
      'Printable QWeb reports',
    ],
    mockup: 'calendar',
  },
  {
    name: 'Enterprise Odoo Database Migration Engine',
    category: 'Database & Version Migration',
    description:
      'Led multi-database and module migrations on Odoo.sh and Community editions, writing automated migration scripts and resolving data compatibility issues while preserving data integrity.',
    tech: ['Python', 'Odoo.sh', 'PostgreSQL', 'Data Migration', 'OpenERP', 'QWeb'],
    features: [
      'Automated migration scripts across multiple databases',
      'Legacy OpenERP instances moved to current Odoo versions',
      'HR, Accounting & Building Management modules migrated',
      'Custom PDF/Excel reporting carried over',
    ],
    mockup: 'migration',
  },
  {
    name: 'Industrial ERP Customization & Bidding Portal',
    category: 'Manufacturing & Logistics',
    description:
      'Delivered a full Odoo Community customization spanning Sales, Purchase, MRP and Inventory workflows, with a customer-facing transportation bidding portal.',
    tech: ['Odoo Community', 'Python', 'MRP', 'SMS OTP', 'Bidding Portal', 'PostgreSQL'],
    features: [
      'Customer-facing transportation bidding portal',
      'SMS OTP login integration',
      'Customer reward system',
      'Custom accounting reports',
    ],
    mockup: 'bidding',
  },
  {
    name: 'Inventory Customization',
    category: 'Inventory',
    description:
      'Extensions to stock operations with custom fields, validations and tailored inventory reports.',
    tech: ['Python', 'XML', 'Odoo ORM'],
    features: [
      'Custom fields on transfers',
      'Validation rules on pickings',
      'Lot / serial tracking views',
      'Stock reports',
    ],
    mockup: 'list',
  },
  {
    name: 'HRMS Customization',
    category: 'Human Resources',
    description:
      'HR enhancements covering employee records, leave and attendance flows and HR reporting.',
    tech: ['Python', 'XML', 'QWeb'],
    features: [
      'Employee profile extensions',
      'Leave & attendance flows',
      'HR dashboards',
      'Custom HR reports',
    ],
    mockup: 'chart',
  },
  {
    name: 'Company Documents Management',
    category: 'Compliance',
    description:
      'Central register for company documents with expiry tracking and automatic reminders.',
    tech: ['Python', 'XML', 'Scheduled Actions'],
    features: [
      'Document register by type',
      'Expiry dates & status badges',
      'Automated reminder emails',
      'Access rights per group',
    ],
    mockup: 'documents',
  },
  {
    name: 'Expense Approval Workflow',
    category: 'Finance',
    description:
      'Multi-level approval workflow for expenses with tracking, activities and access control.',
    tech: ['Python', 'XML', 'Security Rules'],
    features: [
      'Multi-level approvals',
      'Approval activities & chatter',
      'Record rules by role',
      'Rejection with reason',
    ],
    mockup: 'approval',
  },
  {
    name: 'Odoo Website & Portal Customization',
    category: 'Website',
    description:
      'Custom website pages and customer portal views built with QWeb templates and controllers.',
    tech: ['QWeb', 'JavaScript', 'HTML', 'CSS', 'Python'],
    features: [
      'Custom website pages & snippets',
      'Customer portal views',
      'Website forms to backend',
      'Responsive layouts',
    ],
    mockup: 'website',
  },
]

export type Certification = {
  title: string
  issuer: string
  /** e.g. "Jul 2026" — omit when unknown */
  issued?: string
  skills?: string[]
  /** Direct credential link; falls back to the LinkedIn certifications page */
  url?: string
  /** Credential listed on LinkedIn (gets a "Show credential" link) */
  onLinkedIn?: boolean
  /** Badge style: issuer monogram or icon key */
  badge: 'anthropic' | 'dff' | 'besant' | 'typing' | 'photoshop'
}

export const certifications: Certification[] = [
  {
    title: 'One Million Prompters',
    issuer: 'Dubai Future Foundation',
    issued: 'Jul 2026',
    skills: ['Prompt Engineering'],
    onLinkedIn: true,
    badge: 'dff',
  },
  {
    title: 'Introduction to Model Context Protocol',
    issuer: 'Anthropic',
    issued: 'Jul 2026',
    onLinkedIn: true,
    badge: 'anthropic',
  },
  {
    title: 'Introduction to Agent Skills',
    issuer: 'Anthropic',
    issued: 'Jul 2026',
    onLinkedIn: true,
    badge: 'anthropic',
  },
  {
    title: 'Building with the Claude API',
    issuer: 'Anthropic',
    issued: 'Jul 2026',
    skills: ['Prompt Engineering', 'Claude API'],
    onLinkedIn: true,
    badge: 'anthropic',
  },
  {
    title: 'Claude Code in Action',
    issuer: 'Anthropic',
    issued: 'Feb 2026',
    skills: ['Software Development Automation'],
    onLinkedIn: true,
    badge: 'anthropic',
  },
  {
    title: 'Front-End Web Development',
    issuer: 'Besant Technologies',
    issued: 'Nov 2022',
    onLinkedIn: true,
    badge: 'besant',
  },
  {
    title: 'Python and SQL Training',
    issuer: 'Besant Technologies',
    issued: 'Oct 2022',
    onLinkedIn: true,
    badge: 'besant',
  },
  {
    title: 'English Typewriting',
    issuer: 'Higher Grade · First Class',
    badge: 'typing',
  },
  {
    title: 'Adobe Photoshop',
    issuer: 'Besant Technologies',
    badge: 'photoshop',
  },
]

/** "How I work" steps — shown as pinned cards joined by a scroll-drawn path */
export const processSteps = [
  {
    title: 'Requirement & Fit-Gap Analysis',
    text: 'Working with stakeholders to map their business processes, checking standard Odoo first and documenting only the real gaps.',
  },
  {
    title: 'Functional Configuration',
    text: 'Setting up Sales, Purchase, Inventory, MRP, HRMS and Accounting so the standard flows match how the business actually runs.',
  },
  {
    title: 'Custom Development',
    text: 'Building custom modules, QWeb reports, automations and REST API integrations where standard Odoo falls short.',
  },
  {
    title: 'Testing, Go-Live & Support',
    text: 'UAT, data migration, user training and deployment — then debugging and performance tuning after go-live.',
  },
]

/** Soft skills — compact grid under Skills */
export const softSkills: { title: string; text: string; icon: LucideIcon }[] = [
  { title: 'Client Collaboration', text: 'Turning business requirements into practical, maintainable Odoo solutions.', icon: Handshake },
  { title: 'Problem Solving', text: 'Debugging tricky issues across custom modules, migrations and integrations.', icon: Lightbulb },
  { title: 'Clear Communication', text: 'Explaining technical work to functional teams, managers and end users.', icon: MessagesSquare },
  { title: 'Requirement Analysis', text: 'Fit-gap analysis that checks standard Odoo first and documents real gaps.', icon: SearchCheck },
  { title: 'Adaptability', text: 'Working across Odoo 10 → 19 and picking up new tools, including AI-assisted dev.', icon: Shuffle },
  { title: 'Ownership', text: 'Taking features from requirement through UAT, go-live and post-launch support.', icon: ShieldCheck },
  { title: 'Teamwork', text: 'Working closely with developers, consultants and QA to deliver on schedule.', icon: Users },
  { title: 'User Training', text: 'Guiding users through UAT and training so new workflows actually get adopted.', icon: GraduationCap },
]

export type Service = { title: string; description: string; icon: LucideIcon }

export const services: Service[] = [
  {
    title: 'Odoo Custom Development',
    description: 'Custom modules, models, views and business logic built the Odoo way.',
    icon: Code,
  },
  {
    title: 'Odoo Functional Consulting',
    description: 'Mapping your processes to standard Odoo apps before writing code.',
    icon: Users,
  },
  {
    title: 'ERP Implementation',
    description: 'Setup, configuration, data migration and go-live support.',
    icon: Rocket,
  },
  {
    title: 'Business Process Automation',
    description: 'Server actions, scheduled jobs and automated rules that save hours.',
    icon: Workflow,
  },
  {
    title: 'API Integration',
    description: 'REST and XML-RPC integrations with third-party platforms.',
    icon: Plug,
  },
  {
    title: 'Technical Support',
    description: 'Debugging, performance tuning and day-to-day issue resolution.',
    icon: Headset,
  },
  {
    title: 'Report Customization',
    description: 'QWeb PDF reports, invoices and documents designed to spec.',
    icon: FileText,
  },
  {
    title: 'Workflow Development',
    description: 'Approval flows, state machines and role-based access rules.',
    icon: Layers,
  },
]

/** Floating chips around the hero portrait */
export const heroChips: { label: string; icon: LucideIcon }[] = [
  { label: 'Python', icon: Code },
  { label: 'PostgreSQL', icon: Database },
  { label: 'Odoo ORM', icon: Boxes },
  { label: 'REST API', icon: Plug },
  { label: 'MRP', icon: Factory },
  { label: 'Sales', icon: ShoppingCart },
  { label: 'Accounting', icon: Calculator },
  { label: 'Website', icon: Globe },
  { label: 'Debugging', icon: Wrench },
  { label: 'Performance', icon: Gauge },
]
