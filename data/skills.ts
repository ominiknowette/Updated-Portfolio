export interface SkillGroup {
  label: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Core",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript ES6+",
      "TypeScript",
      "Responsive Web Design",
      "Object-Oriented Programming",
    ],
  },
  {
    label: "Frameworks & Tools",
    skills: ["React", "Next.js", "Tailwind CSS", "Node.js", "Cordova", "VS Code"],
  },
  {
    label: "Data & Backend",
    skills: ["MongoDB", "Supabase", "REST APIs", "SQL & Database Fundamentals"],
  },
  {
    label: "Practice",
    skills: [
      "Git & GitHub",
      "Version Control",
      "Problem Solving",
      "Debugging",
      "Software Development Fundamentals",
      "UI Implementation",
      "AI-Assisted Development",
      "Team Collaboration",
      "App Development",
      "Continuous Learning",
    ],
  },
];

export const skills: string[] = skillGroups.flatMap((g) => g.skills);
