"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useTheme } from "next-themes";
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { SearchIcon } from "@/components/icons";
import { usePortfolio } from "@/components/portfolio-state";
import { projects } from "@/data/projects";
import { sections, site } from "@/data/site";
import { switchTheme } from "@/lib/theme-transition";
import { cn, copyText, scrollToSection } from "@/lib/utils";
import { openWriteup } from "@/lib/writeup-link";

interface Command {
  id: string;
  label: string;
  group: "Section" | "Project" | "Write-up" | "Action" | "Link";
  run: () => void;
}

export function CommandMenu({ writeupIds }: { writeupIds: string[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listboxId = useId();
  // Set when a command moves focus elsewhere, so Radix doesn't yank it back to the trigger.
  const skipFocusRestore = useRef(false);
  const { resolvedTheme, setTheme } = useTheme();
  const { setProjectIndex } = usePortfolio();

  useEffect(() => {
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((current) => !current);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const commands = useMemo<Command[]>(() => {
    // Deferred so the dialog's scroll lock is released before we scroll.
    const goTo = (id: string) => () => {
      skipFocusRestore.current = true;
      window.setTimeout(() => scrollToSection(id), 0);
    };
    const openLink = (url: string) => () => window.open(url, "_blank", "noopener,noreferrer");

    return [
      ...sections.map((section) => ({
        id: `section-${section.id}`,
        label: section.title,
        group: "Section" as const,
        run: goTo(section.id),
      })),
      ...projects.map((project, index) => ({
        id: `project-${project.id}`,
        label: project.name,
        group: "Project" as const,
        run: () => {
          setProjectIndex(index);
          goTo("work")();
        },
      })),
      ...projects
        .filter((project) => writeupIds.includes(project.id))
        .map((project) => ({
          id: `writeup-${project.id}`,
          label: `Read: ${project.name}`,
          group: "Write-up" as const,
          run: () => {
            skipFocusRestore.current = true;
            setProjectIndex(projects.indexOf(project));
            // Deferred so this menu has fully closed before the reader opens.
            window.setTimeout(() => openWriteup(project.id), 0);
          },
        })),
      {
        id: "action-theme",
        label: resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode",
        group: "Action",
        // Deferred so the menu has closed before the page crossfades.
        run: () => {
          const next = resolvedTheme === "dark" ? "light" : "dark";
          window.setTimeout(() => switchTheme(next, setTheme), 0);
        },
      },
      { id: "action-email", label: "Copy email address", group: "Action", run: () => void copyText(site.email) },
      { id: "action-resume", label: "Download résumé", group: "Action", run: openLink(site.resume) },
      { id: "link-linkedin", label: "LinkedIn", group: "Link", run: openLink(site.linkedin) },
      { id: "link-github", label: "GitHub", group: "Link", run: openLink(site.github) },
    ];
  }, [resolvedTheme, setTheme, setProjectIndex, writeupIds]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return commands;
    return commands.filter((command) => `${command.label} ${command.group}`.toLowerCase().includes(needle));
  }, [commands, query]);

  const activeIndex = Math.min(active, Math.max(results.length - 1, 0));
  const activeCommand = results[activeIndex];

  useEffect(() => {
    if (!activeCommand) return;
    document.getElementById(`${listboxId}-${activeCommand.id}`)?.scrollIntoView({ block: "nearest" });
  }, [activeCommand, listboxId]);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (next) {
      setQuery("");
      setActive(0);
    }
  }

  function run(command: Command) {
    setOpen(false);
    command.run();
  }

  function onInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((activeIndex + 1) % Math.max(results.length, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((activeIndex - 1 + results.length) % Math.max(results.length, 1));
    } else if (event.key === "Enter" && activeCommand) {
      event.preventDefault();
      run(activeCommand);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="flex h-11 items-center gap-3 border border-rule pr-3 pl-4 text-sm text-muted transition-colors hover:border-foreground"
        >
          <span className="hidden sm:inline">Search</span>
          <SearchIcon className="sm:hidden" />
          <kbd className="hidden border border-rule px-1.5 py-0.5 font-mono text-xs text-foreground sm:inline">⌘K</kbd>
          <span className="sr-only">Open command menu</span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-overlay" />
        <Dialog.Content
          aria-describedby={undefined}
          onCloseAutoFocus={(event) => {
            if (skipFocusRestore.current) {
              event.preventDefault();
              skipFocusRestore.current = false;
            }
          }}
          className="fixed top-[12vh] left-1/2 z-50 flex w-[min(640px,calc(100vw-2rem))] -translate-x-1/2 flex-col border border-foreground bg-background text-foreground shadow-[0_24px_64px_rgba(0,0,0,0.25)]"
        >
          <Dialog.Title className="sr-only">Command menu</Dialog.Title>
          <div className="flex items-center gap-3 border-b border-rule px-5">
            <SearchIcon className="shrink-0" />
            <input
              autoFocus
              type="text"
              role="combobox"
              aria-label="Search commands"
              aria-expanded="true"
              aria-controls={listboxId}
              aria-activedescendant={activeCommand ? `${listboxId}-${activeCommand.id}` : undefined}
              aria-autocomplete="list"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActive(0);
              }}
              onKeyDown={onInputKeyDown}
              placeholder="Jump to a section, project or action…"
              className="h-15 grow bg-transparent text-lg outline-none placeholder:text-muted"
            />
            <kbd className="border border-rule px-1.5 py-0.5 font-mono text-[11px] text-muted">ESC</kbd>
          </div>

          <ul id={listboxId} role="listbox" aria-label="Commands" className="max-h-[min(420px,60vh)] overflow-auto p-2">
            {results.map((command, index) => (
              <li
                key={command.id}
                id={`${listboxId}-${command.id}`}
                role="option"
                aria-selected={index === activeIndex}
                onMouseMove={() => setActive(index)}
                onClick={() => run(command)}
                className={cn(
                  "grid min-h-12 cursor-pointer grid-cols-[minmax(0,1fr)_auto_1.5rem] items-center gap-3 px-3.5 text-base",
                  index === activeIndex && "bg-card",
                )}
              >
                <span className="truncate">{command.label}</span>
                <span className="label text-[11px]">{command.group}</span>
                <span className="text-sm text-accent" aria-hidden>
                  {index === activeIndex ? "↵" : ""}
                </span>
              </li>
            ))}
            {results.length === 0 && (
              <li className="px-3.5 py-5 text-[15px] text-muted">No results for “{query}”</li>
            )}
          </ul>

          <div className="label flex gap-5 border-t border-rule px-5 py-3 text-[11px]" aria-hidden>
            <span>↑↓ Navigate</span>
            <span>↵ Open</span>
            <span>Esc Close</span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
