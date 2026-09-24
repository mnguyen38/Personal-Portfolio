import type { Skill } from "./skills";

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  // "YYYY.MM" strings, rendered as-is in the timeline.
  start: string;
  end: string;
  tags: Skill[];
  bullets: string[];
}

export const experience: Experience[] = [
  {
    id: "fleischhacker",
    role: "Software Development Engineer Intern",
    company: "Fleischhacker Medizintechnik",
    location: "Germany",
    start: "2024.01",
    end: "2024.05",
    tags: ["Java", "SQL"],
    bullets: [
      "Analysed worker performance data to design Java task-allocation algorithms, increasing daily output by 18%; built a forecasting tool giving management hourly productivity predictions.",
      "Led a pilot migrating warehouse inventory to RFID tracking, with real-time bidirectional sync between Android devices and a SQL Server backend, projected to cut the semi-annual count from 2 weeks to 1.",
      "Built internal automation tools, including a VBA financial spreadsheet organiser that replaced manual data transformation.",
      "Fixed production bugs in the company's proprietary ERP and reviewed and merged teammates' code.",
    ],
  },
  {
    id: "vietcombank",
    role: "Cyber-Security Intern",
    company: "Vietcombank",
    location: "Vietnam",
    start: "2023.05",
    end: "2023.07",
    tags: ["Security"],
    bullets: [
      "Penetration-tested customer-facing banking applications with the red team; found a stored XSS vulnerability enabling session hijacking and wrote the remediation report.",
      "Monitored live traffic to the digital banking platform, flagging malicious IP addresses and collaborating on firewall rule changes to block them.",
    ],
  },
];
