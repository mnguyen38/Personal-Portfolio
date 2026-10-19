"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useSyncExternalStore, type ReactNode } from "react";
import { projects } from "@/data/projects";
import { replaceWriteup, writeupIdFromHash } from "@/lib/writeup-link";
import { cn } from "@/lib/utils";

export interface ReaderWriteup {
  id: string;
  draft: boolean;
  minutes: number;
  body: ReactNode;
}

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

const pad = (n: number) => String(n).padStart(2, "0");

export function ProjectReader({ writeups }: { writeups: ReaderWriteup[] }) {
  const hash = useSyncExternalStore(subscribe, () => window.location.hash, () => "");
  const openId = writeupIdFromHash(hash);
  const index = writeups.findIndex((writeup) => writeup.id === openId);
  const writeup = writeups[index];
  const project = projects.find((item) => item.id === openId);
  const previous = writeups[index - 1];
  const next = writeups[index + 1];
  const nextProject = next && projects.find((item) => item.id === next.id);

  return (
    <Dialog.Root open={Boolean(writeup && project)} onOpenChange={(open) => !open && replaceWriteup(null)}>
      <Dialog.Portal>
        <Dialog.Overlay className="reader-overlay fixed inset-0 z-50 bg-overlay" />
        {writeup && project && (
          <Dialog.Content
            onOpenAutoFocus={(event) => {
              // Focus the text rather than the first button, so arrow keys scroll it right away.
              event.preventDefault();
              document.getElementById("reader-body")?.focus();
            }}
            className="reader-sheet fixed inset-y-0 right-0 z-50 flex w-full max-w-[760px] flex-col border-l border-foreground bg-background text-foreground shadow-[-24px_0_64px_rgba(0,0,0,0.18)]">
            <div className="flex h-[72px] shrink-0 items-center justify-between gap-4 border-b border-rule px-5 sm:px-8">
              <p className="label flex items-center gap-3">
                <span>
                  Write-up {pad(index + 1)} / {pad(writeups.length)}
                </span>
                <span className="h-4 w-px bg-rule" aria-hidden />
                <span>{writeup.minutes} min read</span>
                {writeup.draft && <span className="bg-accent px-1.5 py-0.5 text-background">Draft</span>}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous write-up"
                  disabled={!previous}
                  onClick={() => previous && replaceWriteup(previous.id)}
                  className="size-11 border border-rule transition-colors enabled:hover:border-foreground disabled:opacity-30"
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Next write-up"
                  disabled={!next}
                  onClick={() => next && replaceWriteup(next.id)}
                  className="size-11 border border-rule transition-colors enabled:hover:border-foreground disabled:opacity-30"
                >
                  →
                </button>
                <Dialog.Close className="flex h-11 items-center gap-2.5 border border-foreground px-3.5 text-sm font-bold">
                  Close
                  <kbd className="hidden font-mono text-[11px] font-normal text-muted sm:inline">ESC</kbd>
                </Dialog.Close>
              </div>
            </div>

            {/* Keyed so each write-up starts scrolled to the top. */}
            <div
              key={writeup.id}
              id="reader-body"
              tabIndex={-1}
              className="panel-in grow overflow-y-auto px-5 pt-10 pb-16 outline-none sm:px-14"
            >
              <p className="label text-accent">{project.kicker}</p>
              <Dialog.Title className="mt-4 text-[clamp(2.25rem,6vw,3.25rem)] leading-[0.98] font-extrabold tracking-[-0.04em]">
                {project.name}
              </Dialog.Title>
              <Dialog.Description className="mt-6 text-xl leading-[1.4] font-medium tracking-[-0.01em] sm:text-2xl">
                {project.summary}
              </Dialog.Description>

              <dl className="mt-8 grid gap-5 border-y border-rule py-5 text-sm sm:grid-cols-3">
                <div className="flex flex-col gap-1">
                  <dt className="label text-[11px]">My role</dt>
                  <dd className="leading-[1.45]">{project.role}</dd>
                </div>
                {project.facts.slice(0, 1).map((fact) => (
                  <div key={fact.label} className="flex flex-col gap-1">
                    <dt className="label text-[11px]">{fact.label}</dt>
                    <dd className="leading-[1.45]">{fact.value}</dd>
                  </div>
                ))}
                <div className="flex flex-col gap-1">
                  <dt className="label text-[11px]">Links</dt>
                  <dd className="flex flex-wrap gap-x-4 gap-y-1 font-bold">
                    {project.links.length > 0
                      ? project.links.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-4 hover:text-accent"
                          >
                            {link.label} ↗
                          </a>
                        ))
                      : <span className="font-normal text-muted">None yet</span>}
                  </dd>
                </div>
              </dl>

              {project.metrics.length > 0 && (
                <dl className={cn("mt-8 grid gap-4", project.metrics.length > 1 ? "grid-cols-3" : "grid-cols-1")}>
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="flex flex-col-reverse justify-end gap-1">
                      <dt className="text-[13px] text-muted">{metric.label}</dt>
                      <dd className="text-4xl font-extrabold tracking-[-0.03em] text-accent">{metric.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <article className="mt-12">{writeup.body}</article>

              {next && nextProject && (
                <button
                  type="button"
                  onClick={() => replaceWriteup(next.id)}
                  className="group mt-16 flex w-full items-center justify-between gap-6 border-t-2 border-foreground pt-6 text-left"
                >
                  <span className="flex flex-col gap-1.5">
                    <span className="label">Next write-up</span>
                    <span className="text-2xl font-extrabold tracking-[-0.02em] sm:text-3xl">{nextProject.name}</span>
                  </span>
                  <span className="text-3xl transition-transform group-hover:translate-x-1.5" aria-hidden>
                    →
                  </span>
                </button>
              )}
            </div>
          </Dialog.Content>
        )}
      </Dialog.Portal>
    </Dialog.Root>
  );
}
