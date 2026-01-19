export interface TechStack {
  name: string;
  category: string;
  icon?: string;
}

export const techStack: TechStack[] = [
  // Languages
  { name: "Java", category: "Languages" },
  { name: "C++", category: "Languages" },
  { name: "TypeScript", category: "Languages" },
  { name: "JavaScript", category: "Languages" },
  { name: "Python", category: "Languages" },
  { name: "SQL", category: "Languages" },
  { name: "C#", category: "Languages" },
  { name: "C", category: "Languages" },
  { name: "Kotlin", category: "Languages" },

  // Frameworks & Libraries
  { name: "React.js", category: "Frameworks" },
  { name: "Node.js", category: "Frameworks" },
  { name: "Next.js", category: "Frameworks" },
  { name: ".NET", category: "Frameworks" },
  { name: "Flask", category: "Frameworks" },
  { name: "Lynx", category: "Frameworks" },

  // Databases
  { name: "MySQL", category: "Databases" },
  { name: "MongoDB", category: "Databases" },

  // Tools & DevOps
  { name: "Docker", category: "Tools" },
  { name: "Git", category: "Tools" },
  { name: "Jenkins", category: "Tools" },
  { name: "Heroku", category: "Tools" },
  { name: "AWS EC2", category: "Tools" },

  // Security & Development Tools
  { name: "Burp Suite", category: "Security" },
  { name: "sysinternals", category: "Security" },
  { name: "Android Studio", category: "Mobile" },
  { name: "Excel", category: "Tools" },
];

export const techCategories = Array.from(
  new Set(techStack.map((tech) => tech.category))
);

// SimpleIcons slugs for 3D tech stack cloud (from resume)
export const TECH_STACK_SLUGS = [
  // Languages
  "java",
  "cplusplus",
  "typescript",
  "javascript",
  "python",
  "csharp",
  "c",
  "kotlin",

  // Frameworks & Libraries
  "react",
  "nodedotjs",
  "nextdotjs",
  "dotnet",
  "flask",

  // Databases
  "mysql",
  "mongodb",

  // Tools & DevOps
  "docker",
  "git",
  "jenkins",
  "heroku",
  "amazonwebservices",

  // Development Tools
  "android",
  "microsoftexcel",
];
