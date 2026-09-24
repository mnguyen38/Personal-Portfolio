import { CopyEmailButton } from "@/components/copy-email-button";
import { LondonClock } from "@/components/london-clock";
import { Section } from "@/components/section-heading";
import { education } from "@/data/education";
import { site } from "@/data/site";
import { toolkit } from "@/data/skills";
import { cn } from "@/lib/utils";

export function Education() {
  return (
    <Section id="education">
      <div className="grid gap-10 md:grid-cols-2 md:gap-6">
        {education.map((item) => (
          <div key={item.school} className="flex flex-col gap-3 border-t border-rule pt-5">
            <span className={cn("label", item.current && "text-accent")}>
              {item.when} · {item.city}
            </span>
            <h3 className="text-[28px] font-extrabold tracking-[-0.02em]">{item.school}</h3>
            <p className="text-lg">{item.degree}</p>
            <p className="text-[15px] leading-[1.55] text-muted">{item.detail}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Toolkit() {
  return (
    <Section id="toolkit">
      <div className="grid gap-10 text-lg leading-[1.75] sm:grid-cols-3 sm:gap-6">
        {toolkit.map((group) => (
          <div key={group.title} className="flex flex-col">
            <h3 className="label pb-2.5">{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Contact() {
  const links = [
    { href: site.linkedin, label: "LinkedIn ↗" },
    { href: site.github, label: "GitHub ↗" },
    { href: site.resume, label: "Résumé ↓" },
  ];

  return (
    <Section id="contact">
      <div className="flex flex-wrap items-center gap-6">
        <a
          href={`mailto:${site.email}`}
          className="text-[clamp(1.75rem,6vw,4.5rem)] font-extrabold tracking-[-0.04em] wrap-anywhere underline decoration-accent decoration-[6px] underline-offset-14"
        >
          {site.email}
        </a>
        <CopyEmailButton />
      </div>
      <ul className="flex flex-wrap gap-8 text-[17px] font-medium">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-1 underline-offset-[5px] hover:text-accent"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function SiteFooter() {
  return (
    <footer className="label mt-auto flex flex-wrap justify-between gap-4 border-t border-foreground pt-6 pb-10">
      <span>
        © {new Date().getFullYear()} {site.name} · {site.domain}
      </span>
      <span>
        {site.city} <LondonClock />
      </span>
    </footer>
  );
}
