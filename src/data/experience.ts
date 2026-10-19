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
  // The story behind the role; the résumé has the bullet points.
  story: string[];
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
    story: [
      "I joined a medical-technology company whose warehouse still assigned work by hand, and whose inventory count took two weeks, twice a year.",
      "Over five months I turned worker performance data into a task-allocation algorithm that lifted daily output by 18%, and led a pilot moving inventory to RFID, with Android scanners syncing to the ERP's SQL Server backend in real time. It's projected to halve that count.",
      "Everything I built went straight into daily use on the warehouse floor.",
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
    story: [
      "Three months on the other side of the fence: working with the red team to attack the customer-facing apps of one of Vietnam's largest banks.",
      "I found a stored XSS vulnerability that could hijack a customer's session and wrote the report on how to fix it, and I watched live banking traffic for malicious addresses to block.",
    ],
  },
];
