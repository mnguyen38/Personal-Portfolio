"use client";

import { useRef } from "react";
import { matchesSkill, usePortfolio } from "@/components/portfolio-state";
import { Section } from "@/components/section-heading";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

export function Work() {
  const { skill, projectIndex, setProjectIndex } = usePortfolio();
  const panelRef = useRef<HTMLElement>(null);
  const project = projects[projectIndex];

  function select(index: number) {
    setProjectIndex(index);
    // In the stacked (mobile) layout the panel sits below the list, so bring it into view.
    if (window.matchMedia("(max-width: 1023px)").matches) {
      panelRef.current?.scrollIntoView({ block: "start" });
    }
  }

  return (
    <Section id="work" aside="Select a project">
      <div className="grid items-start gap-6 lg:grid-cols-12">
        <ul className="border-t border-rule lg:col-span-5">
          {projects.map((item, index) => {
            const selected = index === projectIndex;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  aria-pressed={selected}
                  aria-controls="project-panel"
                  onClick={() => select(index)}
                  className={cn(
                    "group grid w-full grid-cols-[2.75rem_minmax(0,1fr)_1.5rem] items-center gap-3 border-b border-rule px-4 py-6 text-left transition-[opacity,background-color] duration-300",
                    selected ? "bg-card" : "hover:bg-card/60",
                    !matchesSkill(item.tags, skill) && "opacity-25",
                  )}
                >
                  <span className={cn("font-mono text-[13px]", selected ? "text-accent" : "text-muted")}>
                    {pad(index + 1)}
                  </span>
                  <span className="flex flex-col gap-1.5">
                    <span className="text-[22px] font-bold tracking-[-0.01em]">{item.name}</span>
                    <span className="label">{item.kicker}</span>
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "text-xl transition-transform group-hover:translate-x-1.5",
                      selected ? "text-accent" : "text-muted",
                    )}
                  >
                    →
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <article
          ref={panelRef}
          id="project-panel"
          aria-live="polite"
          className="flex scroll-mt-6 lg:min-h-[560px] flex-col gap-5.5 bg-card p-7 sm:p-10 lg:col-span-6 lg:col-start-7"
        >
          <span className="label">
            Project {pad(projectIndex + 1)} / {pad(projects.length)} · {project.status}
          </span>
          <h3 className="text-4xl leading-[1.02] font-extrabold tracking-[-0.03em] sm:text-[44px]">{project.name}</h3>
          <p className="text-[19px] leading-normal">{project.summary}</p>

          {project.metrics.length > 0 && (
            <dl className="grid grid-cols-3 gap-4 border-y border-rule py-5">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="flex flex-col-reverse justify-end gap-1">
                  <dt className="text-[13px] text-muted">{metric.label}</dt>
                  <dd className="text-3xl font-extrabold tracking-[-0.03em] text-accent sm:text-4xl">{metric.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <ul className="flex list-disc flex-col gap-2.5 pl-[18px] text-base leading-[1.55]">
            {project.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>

          <dl className="grid grid-cols-[110px_minmax(0,1fr)] gap-x-4 gap-y-2.5 text-[15px]">
            {project.facts.map((fact) => (
              <div key={fact.label} className="contents">
                <dt className="label pt-[3px]">{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
            {project.links.length > 0 ? (
              project.links.map((link, index) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex h-11 items-center border border-foreground px-[18px] text-[15px] font-bold transition-transform hover:-translate-y-0.5",
                    index === 0 && "bg-foreground text-background",
                  )}
                >
                  {link.label} ↗
                </a>
              ))
            ) : (
              <span className="label">Write-up in progress</span>
            )}
          </div>
        </article>
      </div>
    </Section>
  );
}
