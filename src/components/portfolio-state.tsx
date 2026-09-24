"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Skill } from "@/data/skills";

interface PortfolioState {
  skill: Skill | null;
  setSkill: (skill: Skill | null) => void;
  projectIndex: number;
  setProjectIndex: (index: number) => void;
}

const PortfolioContext = createContext<PortfolioState | null>(null);

// Shared UI state: the skill filter dims non-matching work and experience, and the
// command menu can open a project in the work section.
export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [skill, setSkill] = useState<Skill | null>(null);
  const [projectIndex, setProjectIndex] = useState(0);

  const value = useMemo(
    () => ({ skill, setSkill, projectIndex, setProjectIndex }),
    [skill, projectIndex],
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error("usePortfolio must be used within PortfolioProvider");
  return context;
}

export function matchesSkill(tags: readonly Skill[], skill: Skill | null) {
  return skill === null || tags.includes(skill);
}
