import type { Skill } from "./skills";

export interface Project {
  id: string;
  name: string;
  kicker: string;
  status: "Ongoing" | "Shipped";
  tags: Skill[];
  summary: string;
  metrics: { value: string; label: string }[];
  bullets: string[];
  facts: { label: string; value: string }[];
  // The first link is rendered as the primary action.
  links: { label: string; url: string }[];
}

export const projects: Project[] = [
  {
    id: "options-backtester",
    name: "Options Backtesting Framework",
    kicker: "Quant · Full-stack · Live",
    status: "Ongoing",
    tags: ["Full-stack", "TypeScript", "SQL", "Finance"],
    summary:
      "A platform for researching options strategies: backtest them on historical market data, then forward-test them live on a paper trading account.",
    metrics: [],
    bullets: [
      "Backtests options strategies on historical data, focused on single-name (idiosyncratic) opportunities rather than macro positioning.",
      "Runs selected strategies through an automated trading engine on a paper account, with live market data, implied-volatility measurement and an activity log.",
      "Backed by PostgreSQL, with unit and integration test suites running in CI.",
    ],
    facts: [
      { label: "Stack", value: "Next.js, TypeScript, PostgreSQL + Drizzle, Vitest" },
      { label: "Broker", value: "Alpaca API" },
    ],
    links: [
      { label: "Live app", url: "https://trading-app-kappa-eight.vercel.app" },
      { label: "Code", url: "https://github.com/mnguyen38/trading-app" },
    ],
  },
  {
    id: "pancake-overflow",
    name: "PancakeOverflow",
    kicker: "Full-stack · Team lead",
    status: "Shipped",
    tags: ["Full-stack", "TypeScript"],
    summary:
      "A Q&A platform for developers who love cooking, built by a team of three for Northeastern's Fundamentals of Software Engineering course.",
    metrics: [
      { value: "853", label: "automated tests" },
      { value: "97%", label: "statement & line coverage" },
      { value: "23", label: "features shipped" },
    ],
    bullets: [
      "Led the team across Agile sprints and reviewed teammates' pull requests.",
      "Built a GitHub Actions CI/CD pipeline for automated testing and deployment.",
    ],
    facts: [
      { label: "Stack", value: "TypeScript, React, Node.js, Express, MongoDB" },
      { label: "Team", value: "With Cecily Stevens and Edward Ibarra" },
    ],
    links: [
      { label: "Live site", url: "https://pancake-overflow.onrender.com" },
      { label: "Code", url: "https://github.com/mnguyen38/fall25-project-fall25-project-group-516" },
    ],
  },
  {
    id: "expense-tracker",
    name: "AI Expense Tracker",
    kicker: "Python · LLM · Automation",
    status: "Shipped",
    tags: ["Python", "AI", "Finance"],
    summary:
      "Turns bank-statement PDFs from any bank into categorised spending, using Claude to extract and categorise each transaction.",
    metrics: [],
    bullets: [
      "Parses statements in any format with AI-powered PDF extraction, then categorises every transaction with Claude.",
      "Syncs results to a Google Sheets budget, imports transactions from email notifications and sends SMS alerts when spending crosses a threshold.",
    ],
    facts: [
      { label: "Stack", value: "Python, Anthropic API, Google Sheets API" },
      { label: "Use", value: "Personal budgeting and FIRE tracking" },
    ],
    links: [{ label: "Code", url: "https://github.com/mnguyen38/Expense-Tracker" }],
  },
  {
    id: "document-redaction",
    name: "Document Redaction Add-in",
    kicker: "Office add-in · Privacy",
    status: "Shipped",
    tags: ["TypeScript", "Security"],
    summary: "A Microsoft Word add-in that detects sensitive information in a document and redacts it.",
    metrics: [{ value: "13", label: "sensitive-data types detected" }],
    bullets: [
      "Detects emails, phone numbers, SSNs, card numbers, addresses, medical record numbers, names and more.",
      "Lets users choose which types to redact, handles headers, titles and tables, and stamps a CONFIDENTIAL header.",
    ],
    facts: [
      { label: "Stack", value: "React, TypeScript, Vite, Office.js" },
      { label: "Runs in", value: "Word desktop and Word on the web" },
    ],
    links: [{ label: "Code", url: "https://github.com/mnguyen38/document-redaction-addin" }],
  },
  {
    id: "wifi-sensing",
    name: "WiFi Sensing Research",
    kicker: "Signal processing · Privacy",
    status: "Ongoing",
    tags: ["Linux", "Security"],
    summary:
      "Research into how much consumer WiFi signals reveal about home occupancy, and a software countermeasure against that inference.",
    metrics: [],
    bullets: [
      "Extracting WiFi channel state information from a consumer router using Nexmon CSI firmware on Linux.",
      "Analysing noisy signal data for occupancy patterns across walls, floors, distance and signal strength.",
    ],
    facts: [
      { label: "Tools", value: "Nexmon CSI, Linux" },
      { label: "Goal", value: "Occupancy-inference countermeasure" },
    ],
    links: [],
  },
];
