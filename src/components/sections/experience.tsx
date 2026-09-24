"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { matchesSkill, usePortfolio } from "@/components/portfolio-state";
import { Section } from "@/components/section-heading";
import { experience } from "@/data/experience";
import { cn } from "@/lib/utils";

export function Experience() {
  const { skill } = usePortfolio();
  const [openId, setOpenId] = useState<string | null>(experience[0]?.id ?? null);

  return (
    <Section id="experience">
      <ul className="border-t border-rule">
        {experience.map((job) => {
          const open = openId === job.id;
          const panelId = `experience-${job.id}`;
          return (
            <li
              key={job.id}
              className={cn(
                "border-b border-rule transition-opacity duration-300",
                !matchesSkill(job.tags, skill) && "opacity-25",
              )}
            >
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : job.id)}
                className="grid w-full grid-cols-[minmax(0,1fr)_2.75rem] items-center gap-x-6 gap-y-2 py-7 text-left lg:grid-cols-12"
              >
                <span className="col-span-2 font-mono text-sm text-muted lg:col-span-3">
                  {job.start} — {job.end}
                </span>
                <span className="flex flex-col gap-1.5 lg:col-span-6">
                  <span className="text-xl font-bold tracking-[-0.01em] sm:text-2xl">{job.role}</span>
                  <span className="text-[17px] text-muted">
                    {job.company}, {job.location}
                  </span>
                </span>
                <span className="label hidden lg:col-span-2 lg:block">{job.tags.join(" · ")}</span>
                <span className="flex size-11 items-center justify-center justify-self-end border border-rule lg:col-span-1">
                  <ChevronDownIcon
                    width={16}
                    height={16}
                    className={cn("transition-transform duration-300", open && "rotate-180")}
                  />
                </span>
              </button>

              {/* Animates height by transitioning the grid row between 0fr and 1fr. */}
              <div
                id={panelId}
                inert={!open}
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-out",
                  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <ul className="flex list-disc flex-col gap-3 pb-8 pl-[18px] text-[17px] leading-relaxed lg:ml-[calc(25%+0.375rem)] lg:w-2/3">
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
