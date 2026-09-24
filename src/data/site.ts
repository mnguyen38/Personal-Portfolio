export const site = {
  name: "Minh Nguyen",
  role: "Software Engineer",
  url: "https://minhsonnguyen.dev",
  domain: "minhsonnguyen.dev",
  email: "msn126@imperial.ac.uk",
  city: "London",
  timeZone: "Europe/London",
  status: "Open to roles",
  now: "MSc AI, Imperial",
  resume: "/minh-nguyen-resume.pdf",
  github: "https://github.com/mnguyen38",
  linkedin: "https://linkedin.com/in/mnguyen380",
  intro:
    "I build data-driven software, from warehouse task allocation that raised output by 18% to a full-stack platform with 97% test coverage. I'm now studying AI at Imperial College London.",
  description:
    "Software engineer and MSc AI student at Imperial College London. Full-stack, data and security work, from warehouse automation to options research tooling.",
} as const;

export const sections = [
  { id: "work", label: "Work", title: "Selected work" },
  { id: "experience", label: "Experience", title: "Experience" },
  { id: "education", label: "Education", title: "Education" },
  { id: "toolkit", label: "Toolkit", title: "Toolkit" },
  { id: "contact", label: "Contact", title: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export function sectionNumber(id: SectionId): string {
  const index = sections.findIndex((section) => section.id === id);
  return String(index + 1).padStart(2, "0");
}

export const highlights = [
  { value: "18", suffix: "%", label: "increase in daily warehouse output from task-allocation algorithms" },
  { value: "853", suffix: "", label: "automated tests written for PancakeOverflow" },
  { value: "97", suffix: "%", label: "statement and line coverage, gated by CI" },
  { value: "2→1", suffix: "", label: "weeks for the semi-annual inventory count (projected, RFID pilot)" },
] as const;
