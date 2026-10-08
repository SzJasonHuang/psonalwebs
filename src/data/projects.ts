export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
  /** Screenshots, shown in the photo viewer. Add more files to /public/projects. */
  images?: string[];
};

export const projects: Project[] = [
  {
    slug: "roomfolio",
    title: "RoomFolio",
    description:
      "A full-stack Magic: The Gathering collection tracker built with Next.js, TypeScript, and Supabase (Postgres, Auth, RLS), featuring search, filtering, CSV import, and location management. Includes an interactive 3D \"room\" dashboard built with React Three Fiber and Three.js from a Blender-exported GLB model, with click-driven navigation and custom point-light tuning to replicate the source scene's lava-lamp lighting.",
    tags: ["Next.js", "TypeScript", "Three.js", "Supabase", "Zod", "Zustand", "Scryfall API", "Blender"],
    liveUrl: "https://repo-imkuw6ea9-szjasonhuangs-projects.vercel.app/room",
    images: ["/projects/roomfolio.png"],
  },
  {
    slug: "my-toolbox",
    title: "My Toolbox",
    description:
      "A Google Gemini API-powered, gamified interview prep platform enabling users to practice and receive AI-generated feedback. Built the backend with MongoDB Atlas and Node.js, with authentication via Auth0 supporting Google and GitHub login. Fully deployed on Vercel with a custom domain.",
    tags: ["React", "Tailwind CSS", "Node.js", "MongoDB Atlas", "Auth0", "Gemini API", "Vercel"],
    liveUrl: "https://my-toolbox.ca/",
  },
  {
    slug: "cardboard-nexus",
    title: "Cardboard Nexus",
    description:
      "An object-oriented Java card-organizing application using MVC architecture with JSON-formatted data persistence and a Java Swing UI. Implemented JUnit test suites for 4 model classes, achieving 100% test coverage.",
    tags: ["Java", "JSON", "Java Swing (GUI)", "JUnit"],
    repoUrl: "https://github.com/SzJasonHuang/CollectionNexus-PP",
  },
];
