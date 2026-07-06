export type ProjectStatus = "Completed" | "In Development";

export interface Project {
  slug: string;
  title: string;
  type: string;
  description: string;
  tools: string[];
  link: string | null;
  status: ProjectStatus;
  preview: "calculator" | "romantic" | "dashboard" | "portfolio" | "school";
}

export const projects: Project[] = [
  {
    slug: "array-calculator",
    title: "Array Calculator",
    type: "JavaScript Utility Tool",
    description:
      "A small JavaScript utility I built while practicing array methods, input handling, and basic logic. It helped me understand how simple tools can solve specific problems quickly.",
    tools: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/ominiknowette/ArrayCalc",
    status: "Completed",
    preview: "calculator",
  },
  {
    slug: "dashivine",
    title: "Dashivine",
    type: "Interactive Romantic Website",
    description:
      "A creative romantic web experience built for a client's proposal idea. This project helped me explore interaction, emotion, and storytelling through a simple website.",
    tools: ["HTML", "CSS", "JavaScript"],
    link: "https://dashivine.xyz",
    status: "Completed",
    preview: "romantic",
  },
  {
    slug: "smart-leads-dashboard",
    title: "Smart Leads Dashboard",
    type: "Full-Stack CRM / Lead Management System",
    description:
      "A full-stack CRM-style dashboard built to manage leads and sales opportunities. This project pushed me deeper into frontend structure, backend APIs, authentication, database design, and dashboard UI.",
    tools: [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "React Icons",
      "Axios",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "JWT",
      "bcryptjs",
      "Helmet",
      "Docker",
      "Docker Compose",
    ],
    link: "https://smart-leads-management-system.netlify.app/",
    status: "Completed",
    preview: "dashboard",
  },
  {
    slug: "simple-portfolio",
    title: "Simple Portfolio",
    type: "Personal Portfolio Website",
    description:
      "A clean portfolio project I built while practicing layout structure, responsive design, and simple personal branding on the web.",
    tools: ["HTML", "CSS", "JavaScript"],
    link: "https://ominiknowette.github.io/Portfolio/",
    status: "Completed",
    preview: "portfolio",
  },
  {
    slug: "madonna-catholic-college",
    title: "Madonna Catholic College",
    type: "School Portal / Educational Website",
    description:
      "An ongoing school portal project designed to support academic information, student access, and digital communication. It is helping me understand how larger systems are planned and structured.",
    tools: ["Next.js", "TypeScript", "Node.js", "Supabase"],
    link: null,
    status: "In Development",
    preview: "school",
  },
];
