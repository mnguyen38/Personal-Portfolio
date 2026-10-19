import { CommandMenu } from "@/components/command-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/data/site";

const navItems = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#principles", label: "How I work" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader({ writeupIds }: { writeupIds: string[] }) {
  return (
    <header className="flex items-center justify-between gap-6 border-b border-foreground py-6">
      <a href="#top" className="text-[15px] font-extrabold tracking-[0.08em] uppercase">
        {site.name}
      </a>
      <nav aria-label="Primary" className="flex items-center gap-2 text-[15px] font-medium sm:gap-3">
        <ul className="mr-4 hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="underline-offset-[5px] hover:underline">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <CommandMenu writeupIds={writeupIds} />
        <ThemeToggle />
        <a
          href={site.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 items-center bg-foreground px-5 font-bold text-background transition-opacity hover:opacity-85"
        >
          Résumé<span className="hidden sm:inline">&nbsp;↓</span>
        </a>
      </nav>
    </header>
  );
}
