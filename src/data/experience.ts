export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | "Present";
  description: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    id: "1",
    company: "Fleischhacker Medizintechnik GmbH Co. KG",
    position: "Software Development Engineer Intern",
    location: "Germany",
    startDate: "2024-01",
    endDate: "2024-05",
    description: [
      "Led a pilot initiative to transition warehouse management systems by integrating RFID barcodes and scanners, resulting in a more accurate inventory count",
      "Created a prototype for a warehouse digital item navigation system to be integrated with a .NET-based ERP. Designed Android application to function in parallel with the ERP, enabling smart scanning and automatic updates",
      "Developed algorithms to automate task allocation to optimize warehouse operations, increasing daily output levels by 18%. Wrote an internal tool to provide hourly productivity forecasts; created models and simulated processes using Java",
      "Reported and fixed bugs in the in-house ERP, added new features based on employee requests, writing macros for Excel workflows, and implemented data constraint logic bug checks",
    ],
    technologies: ["Java", ".NET", "Android", "VB.NET", "Excel", "RFID"],
  },
  {
    id: "2",
    company: "Joint Stock Commercial Bank for Foreign Trade of Vietnam",
    position: "Cyber-Security Intern",
    location: "Vietnam",
    startDate: "2023-05",
    endDate: "2023-07",
    description: [
      "Using Burp Suite, tested the security of existing web applications through the lens of an attacker with a team of professional pen-testers. Identified a potential stored XSS vulnerability that could have affected users by creating pop-ups which could steal user's cookies",
      "Observed and monitored connections to the bank's digital banking application to find malicious addresses that could potentially harm the bank using their locally built monitoring software. Shadowed an engineer in the process of setting prevention techniques, such as re-configuring firewalls",
      "Identified and reported a Trojan malware which uses the host GPU for mining using sysinternals. Assisted in the process of removing the malware from systems affected, as well as install updates that will prevent future cases of this type of malware",
    ],
    technologies: ["Burp Suite", "sysinternals", "Network Security", "Firewalls", "Malware Analysis"],
  },
];
