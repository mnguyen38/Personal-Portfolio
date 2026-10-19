export const site = {
  name: "Minh Nguyen",
  role: "Software Engineer",
  // Vercel serves the site on www; the bare domain redirects there.
  url: "https://www.minhsonnguyen.dev",
  domain: "minhsonnguyen.dev",
  email: "msn126@imperial.ac.uk",
  city: "London",
  timeZone: "Europe/London",
  now: "MSc AI, Imperial",
  internships: "From May 2027",
  fullTime: "From Oct 2027",
  resume: "/minh-nguyen-resume.pdf",
  github: "https://github.com/mnguyen38",
  linkedin: "https://linkedin.com/in/mnguyen380",
  intro:
    "I like problems where messy real-world data meets software: warehouse floors, bank traffic, options markets and, lately, WiFi signals. I'm studying AI at Imperial and looking for software, ML and quant engineering roles.",
  lookingFor:
    "I'm looking for software, ML and quant engineering internships from May 2027, and full-time roles from October 2027. If you're building something with interesting data, I'd like to hear about it.",
  description:
    "Software engineer and MSc AI student at Imperial College London, looking for software, ML and quant engineering internships (May 2027) and full-time roles (Oct 2027).",
} as const;

export const sections = [
  { id: "work", label: "Work", title: "Selected work" },
  { id: "experience", label: "Experience", title: "Experience" },
  { id: "principles", label: "How I work", title: "How I work" },
  { id: "education", label: "Education", title: "Education" },
  { id: "contact", label: "Contact", title: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export function sectionNumber(id: SectionId): string {
  const index = sections.findIndex((section) => section.id === id);
  return String(index + 1).padStart(2, "0");
}

// What I'm working on right now: shown under the hero instead of résumé metrics.
export const currently = [
  { label: "Building", value: "An automated options research and paper-trading platform" },
  { label: "Researching", value: "What your WiFi signals reveal about who's home" },
  { label: "Studying", value: "The maths and practice of modern AI, from optimisation to deep learning" },
] as const;

export interface Highlight {
  value: string;
  suffix: string;
  label: string;
  // Set for stats refreshed daily from the trading app, e.g. "Updated 24 Sep 2026".
  note?: string;
}

export const principles = [
  {
    title: "Measure before optimising",
    body: "At Fleischhacker, the 18% output gain came from reading worker performance data before touching the allocation logic, not from intuition.",
  },
  {
    title: "Tests are the spec",
    body: "On PancakeOverflow we wrote 853 tests at 97% coverage, so three people could change the same codebase every sprint without breaking each other's work.",
  },
  {
    title: "Get it in front of real users early",
    body: "The RFID pilot went straight onto the warehouse floor with Android devices syncing to the live backend, instead of living in a demo.",
  },
  {
    title: "Think like the attacker",
    body: "Pen-testing a bank, redacting documents, asking what your router knows about you: I like knowing how things break.",
  },
] as const;

export const tooling =
  "Python for research and ML, TypeScript for products, Java and C++ when it has to be fast, SQL everywhere, Linux underneath.";
