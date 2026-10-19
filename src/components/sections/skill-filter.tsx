"use client";

import { matchesSkill, usePortfolio } from "@/components/portfolio-state";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { filterSkills } from "@/data/skills";
import { cn } from "@/lib/utils";

export function SkillFilter() {
  const { skill, setSkill } = usePortfolio();
  const matches = skill
    ? [...projects, ...experience].filter((item) => matchesSkill(item.tags, skill)).length
    : 0;

  return (
    <div
      role="group"
      aria-labelledby="skill-filter-label"
      className="flex flex-wrap items-center gap-x-5 gap-y-3 pb-10"
      data-reveal
    >
      <span id="skill-filter-label" className="label">
        Filter by skill
      </span>
      <div className="flex flex-wrap gap-2">
        {filterSkills.map((name) => {
          const pressed = skill === name;
          return (
            <button
              key={name}
              type="button"
              aria-pressed={pressed}
              onClick={() => setSkill(pressed ? null : name)}
              className={cn(
                "h-10 border px-4 text-sm font-medium transition-colors",
                pressed ? "border-foreground bg-foreground text-background" : "border-rule hover:border-foreground",
              )}
            >
              {name}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="flex items-center gap-2 text-sm text-muted">
        {skill && (
          <>
            {matches} {matches === 1 ? "match" : "matches"} for {skill} ·
            <button
              type="button"
              onClick={() => setSkill(null)}
              className="font-bold text-accent underline underline-offset-[5px]"
            >
              Clear
            </button>
          </>
        )}
      </p>
    </div>
  );
}
