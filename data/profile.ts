export interface Profile {
  fullName: string;
  displayName: string;
  location: string;
  title: string;
  tagline: string;
  availabilityLabel: string;
  heroHeadline: string;
  heroSubtext: string[];
  about: {
    short: string;
    paragraphs: string[];
  };
  journey: { period: string; label: string; note: string }[];
  personality: { title: string; text: string }[];
}

export const profile: Profile = {
  fullName: "Okafor Onyekachukwu David",
  displayName: "David",
  location: "Lagos, Nigeria",
  title: "Frontend Developer, Mobile App Developer & Product Designer",
  tagline: "I build clean digital experiences for brands and businesses.",
  availabilityLabel: "Open to interesting projects",
  heroHeadline:
    "Building digital experiences that are simple, thoughtful, and easy to use.",
  heroSubtext: [
    "I'm David, a Computer Science student, frontend developer, mobile app developer, and product designer based in Lagos, Nigeria. I enjoy turning ideas into clean websites, mobile experiences, and digital tools that feel smooth, useful, and easy to understand.",
    "Outside coding, I'm into football, gaming, jogging, and sports. Those parts of my life help me reset, think clearly, and bring more energy into the things I build.",
  ],
  about: {
    short:
      "I'm a Computer Science student who enjoys building clean digital products and learning how good software is designed, shipped, and improved. Away from the screen, you'll probably find me watching football, gaming, jogging, or thinking about the next thing to build.",
    paragraphs: [
      "I'm a Computer Science student and growing software engineer with a strong interest in building digital products that people can actually use.",
      "For me, coding is not just about making something work. I care about how it feels, how simple it is to use, and how well it solves the problem it was built for. I enjoy working on interfaces, systems, and small details that make a product feel cleaner and more thoughtful.",
      "I'm currently building my foundation in full-stack web development, mobile app development, product design, and problem solving. I like understanding the reason behind a tool or technology instead of only memorising syntax.",
      "Outside tech, I enjoy football, gaming, jogging, and sports. I like the discipline that comes with improvement, whether it is in code, fitness, games, or learning something new.",
      "My goal is to become the kind of engineer who can join strong teams, solve meaningful problems, and build products that are reliable, useful, and easy to use. Every project I build is part of that journey.",
    ],
  },
  journey: [
    {
      period: "Now",
      label: "Computer Science Student",
      note: "Building a strong foundation in full-stack development, system design, and software engineering fundamentals.",
    },
    {
      period: "Ongoing",
      label: "Independent Product Builder",
      note: "Shipping real projects, from small utility tools to full-stack dashboards, and learning by building rather than memorising.",
    },
    {
      period: "Always",
      label: "Continuous Learner",
      note: "Exploring AI-assisted development, automation, and modern frontend tooling to build faster and better.",
    },
  ],
  personality: [
    {
      title: "Outside the code",
      text: "Outside coding, I'm into football, gaming, jogging, and sports. Those parts of my life help me reset, think clearly, and bring more energy into the things I build.",
    },
    {
      title: "How I think",
      text: "Simple first. Then useful. Then polished. I like building things that feel clear from the first click.",
    },
    {
      title: "Currently exploring",
      text: "Full-stack development, better UI systems, mobile app workflows, and AI-assisted tools.",
    },
  ],
};

export const contact = {
  email: "okaforo253@gmail.com",
  phone: "08139765284",
  github: "https://github.com/ominiknowette/",
  linkedin: "https://www.linkedin.com/in/onyekachukwu-okafor-445456313",
  instagram: "dav.idokafor",
  instagramUrl: "https://instagram.com/dav.idokafor",
};
