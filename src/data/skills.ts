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
