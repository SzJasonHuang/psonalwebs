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
    role: "Software Engineer",
    company: "KKC Classroom",
    companyUrl: "https://kkcclassroom.com/",
    location: "Remote / Toronto, ON",
    start: "June 2026",
    end: "Present",
    bullets: [
      "Shipped a high-impact product-launch waitlist in React/Next.js (SEO-optimized framework), wiring frontend components to server actions backed by the data-access layer for secure server-side persistence.",
      "Debugged existing frontend logic and fixed a StrictMode-induced double-rendering bug via a guard flag, cutting duplicate effect runs and redundant network calls.",
      "Conducted a database migration to stand up a local testing environment and authored 10+ Jest tests covering server actions, validating business logic, and preventing regressions before launch.",
    ],
  },
  {
    role: "Summer Undergraduate Teaching Assistant (CPSC 213)",
    company: "Faculty of Computer Science",
    companyUrl: "https://www.cs.ubc.ca/",
    companySuffix: "The University of British Columbia",
    location: "Vancouver, BC",
    start: "June 2026",
    end: "Present",
    bullets: [
      "Co-led weekly lab sessions with a senior PhD TA, guiding students through hands-on systems programming exercises in static and dynamic memory allocation, multithreading, and concurrency.",
      "Maintained a 99% response rate on the CPSC 213 Piazza forum, troubleshooting Java development environment setup and UBC server connection issues, and resolving logistical questions through clear written communication.",
    ],
  },
  {
    role: "Software Developer",
    company: "Motion UBC, The University of British Columbia",
    location: "Vancouver, BC",
    start: "November 2025",
    end: "Present",
    bullets: [
      "Refactored legacy PHP backend by building JWT-based AdminMiddleware and protected routes to centralize auth across 10+ endpoints, improving maintainability and reducing 95% of duplicated security logic across endpoints.",
      "Designed and deployed a fully private GCP architecture (Cloud Run + Cloud SQL) for a nonprofit dashboard with 1,000+ clients, gated behind a self-configured WireGuard VPN with per-user cryptographic keys.",
    ],
  },
  {
    role: "Undergraduate Teaching Assistant (CPSC 110)",
    company: "Faculty of Computer Science",
    companyUrl: "https://www.cs.ubc.ca/",
    companySuffix: "The University of British Columbia",
    location: "Vancouver, BC",
    start: "September 2025",
    end: "May 2026",
    bullets: [
      "Mentored 600+ first-year Computer Science students in program design, recursion, abstraction, and testing through labs and office hours, strengthening foundational problem-solving, function design and debugging skills.",
      "Supported exam invigilation and marking for 800+ students, maintaining high standards of accuracy and timely grading.",
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
      "AWS S3",
      "AWS EC2 (Certified Cloud Practitioner)",
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
