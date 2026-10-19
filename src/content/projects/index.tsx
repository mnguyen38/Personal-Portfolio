import "server-only";

import fs from "node:fs";
import path from "node:path";
import type { MDXContent } from "mdx/types";
import { projects } from "@/data/projects";
import DocumentRedaction from "./document-redaction.mdx";
import ExpenseTracker from "./expense-tracker.mdx";
import OptionsBacktester from "./options-backtester.mdx";
import PancakeOverflow from "./pancake-overflow.mdx";
import WifiSensing from "./wifi-sensing.mdx";

const content: Record<string, MDXContent> = {
  "options-backtester": OptionsBacktester,
  "pancake-overflow": PancakeOverflow,
  "expense-tracker": ExpenseTracker,
  "document-redaction": DocumentRedaction,
  "wifi-sensing": WifiSensing,
};

export interface Writeup {
  id: string;
  draft: boolean;
  minutes: number;
  body: React.ReactNode;
}

const WORDS_PER_MINUTE = 220;

function readingMinutes(id: string) {
  try {
    const source = fs.readFileSync(path.join(process.cwd(), "src/content/projects", `${id}.mdx`), "utf8");
    const words = source.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  } catch {
    return 1;
  }
}

// Published write-ups everywhere; drafts only in `npm run dev`, so they can be
// previewed locally without going live.
export function getWriteups(): Writeup[] {
  const showDrafts = process.env.NODE_ENV === "development";

  return projects.flatMap((project) => {
    const Body = content[project.id];
    if (!Body || !project.writeup) return [];
    const draft = project.writeup === "draft";
    if (draft && !showDrafts) return [];
    return [{ id: project.id, draft, minutes: readingMinutes(project.id), body: <Body /> }];
  });
}
