// Skills that visitors can filter projects and experience by.
export const filterSkills = [
  "Full-stack",
  "TypeScript",
  "Python",
  "Java",
  "SQL",
  "AI",
  "Linux",
  "Security",
  "Finance",
] as const;

export type Skill = (typeof filterSkills)[number];

export const toolkit = [
  {
    title: "Languages",
    items: ["Python", "C++ / C / C#", "Java", "TypeScript / JavaScript", "SQL"],
  },
  {
    title: "Data & ML",
    items: ["PyTorch", "PostgreSQL", "MySQL / SQL Server", "MongoDB"],
  },
  {
    title: "Environment & tools",
    items: ["Linux", "Git", "Docker", "AWS EC2", "CI/CD"],
  },
] as const;
