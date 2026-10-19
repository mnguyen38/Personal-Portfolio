import type { Skill } from "./skills";

export interface Project {
  id: string;
  name: string;
  kicker: string;
  status: "Ongoing" | "Shipped";
  tags: Skill[];
  // One-line hook: why it's interesting, not what's on the résumé.
  summary: string;
  // What I personally did.
  role: string;
  metrics: { value: string; label: string }[];
  facts: { label: string; value: string }[];
  // The first link is rendered as the primary action.
  links: { label: string; url: string }[];
  // Long-form write-up in src/content/projects/<id>.mdx.
  // "draft" write-ups only appear in local development (`npm run dev`).
  writeup?: "draft" | "published";
}

export const projects: Project[] = [
  {
    id: "options-backtester",
    name: "Options Backtesting Framework",
    kicker: "Quant · Full-stack · Live",
    status: "Ongoing",
    tags: ["Full-stack", "TypeScript", "SQL", "Finance"],
    summary:
      "Test an options idea on history, then let it trade on paper before trusting it with real money. Two automated strategies run side by side, and the leader's numbers update on this site every trading day.",
    role: "Built it end to end: data, backtest engine, live paper-trading engine and dashboard.",
    metrics: [],
    facts: [
      { label: "Stack", value: "Next.js, TypeScript, PostgreSQL + Drizzle, Vitest" },
      { label: "Broker", value: "Alpaca API (paper trading)" },
    ],
    links: [
      { label: "Live app", url: "https://trading-app-kappa-eight.vercel.app" },
      { label: "Code", url: "https://github.com/mnguyen38/trading-app" },
    ],
    writeup: "draft",
  },
  {
    id: "pancake-overflow",
    name: "PancakeOverflow",
    kicker: "Full-stack · Team lead",
    status: "Shipped",
    tags: ["Full-stack", "TypeScript"],
    summary:
      "My first time leading an engineering team: a Q&A platform for developers who love cooking, shipped in one semester without letting quality slip.",
    role: "Team lead of three. Owned code review and the CI/CD pipeline.",
    metrics: [
      { value: "853", label: "automated tests" },
      { value: "97%", label: "statement & line coverage" },
      { value: "23", label: "features shipped" },
    ],
    facts: [
      { label: "Stack", value: "TypeScript, React, Node.js, Express, MongoDB" },
      { label: "Team", value: "With Cecily Stevens and Edward Ibarra" },
    ],
    links: [
      { label: "Code", url: "https://github.com/mnguyen38/fall25-project-fall25-project-group-516" },
    ],
    writeup: "draft",
  },
  {
    id: "expense-tracker",
    name: "Expense Tracker with AI Integration",
    kicker: "Python · LLM · Local-first",
    status: "Shipped",
    tags: ["Python", "AI", "SQL", "Finance"],
    summary:
      "A local-first finance app that reads bank statement PDFs from any bank. Known banks go through plain parsers, everything else through Claude, and every statement is reconciled to the cent before you see a number.",
    role: "Built it end to end: parsers, Claude integration, SQLite ledger, local web app and the monthly report.",
    metrics: [
      { value: "266", label: "automated tests" },
      { value: "85%", label: "line coverage" },
      { value: "19/19", label: "transactions read from a bank it had never seen" },
    ],
    facts: [
      { label: "Stack", value: "Python, Claude API (structured outputs), pdfplumber, SQLite" },
      { label: "Runs", value: "On your machine: CLI, local web app and a monthly report" },
    ],
    links: [{ label: "Code", url: "https://github.com/mnguyen38/Expense-Tracker" }],
    writeup: "draft",
  },
  {
    id: "document-redaction",
    name: "Document Redaction Add-in",
    kicker: "Office add-in · Privacy",
    status: "Shipped",
    tags: ["TypeScript", "Security"],
    summary:
      "Black out sensitive information before a Word document leaves your hands. The tricky part is telling a person's name apart from an ordinary capitalised phrase.",
    role: "Built the detectors and the add-in's React interface.",
    metrics: [{ value: "13", label: "sensitive-data types detected" }],
    facts: [
      { label: "Stack", value: "React, TypeScript, Vite, Office.js" },
      { label: "Runs in", value: "Word desktop and Word on the web" },
    ],
    links: [{ label: "Code", url: "https://github.com/mnguyen38/document-redaction-addin" }],
    writeup: "draft",
  },
  {
    id: "wifi-sensing",
    name: "WiFi Sensing Research",
    kicker: "Signal processing · Privacy",
    status: "Ongoing",
    tags: ["Linux", "Security"],
    summary:
      "Can your router tell when you're home? I'm measuring how much consumer WiFi signals reveal about occupancy, then building a countermeasure against it.",
    role: "Research project: data collection with custom router firmware on Linux, signal analysis, and a countermeasure in progress.",
    metrics: [],
    facts: [
      { label: "Tools", value: "Nexmon CSI, Linux" },
      { label: "Status", value: "Collecting data; no results yet" },
    ],
    links: [],
    writeup: "draft",
  },
];
