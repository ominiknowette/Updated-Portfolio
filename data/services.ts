import type { LucideIcon } from "lucide-react";
import { Code2, Smartphone, PenTool, Bug } from "lucide-react";

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    title: "Frontend Development",
    description:
      "I build responsive websites that are clean, fast, and easy to use across devices.",
    icon: Code2,
  },
  {
    title: "Mobile App Development",
    description:
      "I create simple mobile experiences with a focus on usability, structure, and smooth interaction.",
    icon: Smartphone,
  },
  {
    title: "Product & UI Design",
    description:
      "I design clear interfaces, mockups, and layouts that help ideas feel more real and usable.",
    icon: PenTool,
  },
  {
    title: "Quality Assurance",
    description:
      "I review and test digital products to improve usability, responsiveness, performance, and overall user experience.",
    icon: Bug,
  },
];

export const process = [
  {
    step: "Discover",
    detail: "Understand the goal, the users, and what success actually looks like.",
  },
  {
    step: "Design",
    detail: "Wireframe and design clean, usable interfaces before writing code.",
  },
  {
    step: "Build",
    detail: "Develop with clean, maintainable code that holds up in the real world.",
  },
  {
    step: "Test & Ship",
    detail: "QA across devices, refine details, and deliver a working product.",
  },
];
