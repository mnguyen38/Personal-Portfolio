import "server-only";

import fs from "node:fs";
import path from "node:path";
import type { Highlight } from "@/data/site";

// sharpe.json and returns.json are written daily by the trading app's GitHub Action.
// They're read at build time; a missing or malformed file just hides its stat.

interface Trader {
  name: string;
  type: string;
}

interface SharpeFile {
  sharpe: number;
  trader: Trader;
  asOf: string;
  // Date of the first daily snapshot, when the file provides it.
  since?: string;
  tradingDays: number;
}

interface ReturnsFile {
  totalReturnPct: number;
  trader: Trader;
  asOf: string;
  since?: string;
  tradingDays: number;
}

function readDataFile(name: string): unknown {
  try {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), "src/data", name), "utf8"));
  } catch {
    return null;
  }
}

const isNumber = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);

function isTrader(value: unknown): value is Trader {
  const trader = value as Trader | null;
  return typeof trader?.name === "string" && typeof trader?.type === "string";
}

function hasCommonFields(data: Record<string, unknown>) {
  return isTrader(data.trader) && typeof data.asOf === "string" && isNumber(data.tradingDays);
}

function readSharpe(): SharpeFile | null {
  const data = readDataFile("sharpe.json") as Record<string, unknown> | null;
  return data && isNumber(data.sharpe) && hasCommonFields(data) ? (data as unknown as SharpeFile) : null;
}

function readReturns(): ReturnsFile | null {
  const data = readDataFile("returns.json") as Record<string, unknown> | null;
  return data && isNumber(data.totalReturnPct) && hasCommonFields(data) ? (data as unknown as ReturnsFile) : null;
}

function formatDate(isoDate: string) {
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(date);
}

function period(file: { since?: string; tradingDays: number }) {
  return typeof file.since === "string" ? `since ${formatDate(file.since)}` : `over ${file.tradingDays} trading days`;
}

export function getTradingHighlights(): Highlight[] {
  const highlights: Highlight[] = [];
  const sharpe = readSharpe();
  const returns = readReturns();

  if (sharpe) {
    highlights.push({
      value: sharpe.sharpe.toFixed(2),
      suffix: "",
      label: `annualised Sharpe ratio of the best strategy, ${period(sharpe)}`,
      note: `Updated ${formatDate(sharpe.asOf)}`,
    });
  }

  if (returns) {
    const pct = returns.totalReturnPct;
    highlights.push({
      value: `${pct >= 0 ? "+" : "−"}${Math.abs(pct).toFixed(2)}`,
      suffix: "%",
      label: `total return of the leading strategy, ${period(returns)}`,
      note: `Updated ${formatDate(returns.asOf)}`,
    });
  }

  return highlights;
}
