export type ExperienceEntry = {
  role: string;
  company: string;
  companyUrl?: string;
  companySuffix?: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
};

export type EducationEntry = {
  school: string;
  degree: string;
  location: string;
  start: string;
  end: string;
  bullets?: string[];
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "Product Development Engineer Co-op",
    company: "Critical Environment Technologies",
    companyUrl: "https://www.critical-environment.com/",
    location: "Delta, BC",
    start: "September 2026",
    end: "Present",
    bullets: [
      "Re-architected 20,000+ records into append-only revision logs and trigger-maintained current-state tables in PostgreSQL, replacing 4 text relationships with foreign keys across projects, quotes, orders, shipments, and invoices.",
      "Engineered a pull-request-driven CI/CD pipeline for a system configurator using GitHub Actions, integrating TestLab's AI-powered Playwright E2E testing alongside Vitest unit tests to automate validation before Vercel deployment.",
      "Resolved a critical webhook renewal bug by replacing delete-and-recreate logic with in-place PATCH updates and conditional cleanup on HTTP 404, preventing subscription loss during failed renewals.",
    ],
  },
  {
    role: "Software Engineer",
    company: "KKC Classroom",
    companyUrl: "https://kkcclassroom.com/",
    location: "Remote / Toronto, ON",
    start: "June 2026",
    end: "September 2026",
    bullets: [
      "Shipped a high-impact product-launch waitlist in React/Next.js, wiring frontend components to server actions backed by a data-access layer and PostgreSQL for secure server-side persistence.",
      "Engineered an AWS CloudFront CDN for podcast snippets and trailer delivery, implementing long-lived Cache-Control policies to optimize browser caching and reduce repeat CloudFront requests by 40%.",
      "Collaborated in an Agile, user-requirement-driven development environment, using GitHub CI/CD workflows, pull requests, and code reviews to validate changes, incorporate team feedback, and reliably ship production features.",
    ],
  },
  {
    role: "Software Developer",
    company: "Motion UBC, The University of British Columbia",
    location: "Vancouver, BC",
    start: "November 2025",
    end: "August 2026",
    bullets: [
      "Refactored legacy PHP Laravel backend by building JWT-based AdminMiddleware and protected routes to centralize auth across 10+ endpoints, improving maintainability and reducing 95% of duplicated security logic across endpoints.",
      "Designed and deployed a fully private GCP architecture (Cloud Run + Cloud SQL) for a nonprofit dashboard with 1,000+ clients, gated behind a self-configured WireGuard VPN with per-user cryptographic keys.",
    ],
  },
  {
    role: "Undergraduate Teaching Assistant - CPSC 110 & CPSC 213",
    company: "Faculty of Computer Science",
    companyUrl: "https://www.cs.ubc.ca/",
    companySuffix: "The University of British Columbia",
    location: "Vancouver, BC",
    start: "September 2025",
    end: "September 2026",
    bullets: [
      "Mentored 600+ first-year CPSC 110 students in program design, abstraction, and testing through labs and office hours.",
      "Co-led weekly CPSC 213 systems programming labs with a senior PhD teaching assistant, guiding students through complex memory and concurrency exercises and translating low-level concepts into clear, actionable explanations.",
    ],
  },
];

export const education: EducationEntry[] = [
  {
    school: "The University of British Columbia",
    degree:
      "Bachelor of Commerce, Combined Major in Business and Computer Science, Minor in Data Science",
    location: "Vancouver, BC",
    start: "September 2024",
    end: "Present",
    bullets: [
      "Relevant Coursework: Data Cleaning and Machine Learning (DSCI 100), Computations, Programs and Programming (CPSC 110), Software Construction (CPSC 210), Computer Systems (CPSC 213), Software Engineering (CPSC 310)",
    ],
  },
];

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: [
      "C++ (CMake, Valgrind)",
      "Java",
      "JavaScript",
      "TypeScript",
      "Python (Beautiful Soup, NumPy)",
      "SQL",
    ],
  },
  {
    category: "Web & Databases",
    items: [
      "HTML",
      "CSS",
      "Vercel",
      "Supabase",
      "AWS (Certified Cloud Practitioner)",
      "MySQL",
      "MongoDB",
    ],
  },
  {
    category: "Frameworks",
    items: [
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "Mongoose",
      "Tailwind CSS",
      "Zod",
      "Zustand",
    ],
  },
  {
    category: "Tools",
    items: [
      "Tableau",
      "Power BI",
      "Microsoft Excel",
      "Microsoft Word",
      "Microsoft PowerPoint",
      "Copilot",
      "Claude",
      "Cursor",
    ],
  },
];
