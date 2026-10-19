import { CopyEmailButton } from "@/components/copy-email-button";
import { LondonClock } from "@/components/london-clock";
import { Section } from "@/components/section-heading";
import { education } from "@/data/education";
import { principles, site, tooling } from "@/data/site";
import { cn, revealDelay } from "@/lib/utils";

export function Education() {
  return (
    <Section id="education">
      <div className="grid gap-10 md:grid-cols-2 md:gap-6">
        {education.map((item, index) => (
          <div
            key={item.school}
            className="flex flex-col gap-3 border-t border-rule pt-5"
            data-reveal
            style={revealDelay(index, 120)}
          >
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

export function Principles() {
  return (
    <Section id="principles">
      <ol className="grid gap-px border-y border-rule bg-rule md:grid-cols-2">
        {principles.map((principle, index) => (
          <li key={principle.title} className={cn("flex bg-background py-8 pr-6", index % 2 === 1 && "md:pl-8")}>
            <div className="flex flex-col gap-3" data-reveal style={revealDelay(index % 2, 120)}>
              <span className="font-mono text-sm text-accent">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="text-[26px] leading-tight font-extrabold tracking-[-0.02em]">{principle.title}</h3>
              <p className="text-[17px] leading-relaxed text-muted">{principle.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="max-w-3xl text-xl leading-normal font-medium" data-reveal>
        {tooling}
      </p>
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
      <p className="max-w-3xl text-2xl leading-[1.35] font-medium tracking-[-0.01em]" data-reveal>
        {site.lookingFor}
      </p>
      <div className="flex flex-wrap items-center gap-6" data-reveal style={revealDelay(1, 120)}>
        <a
          href={`mailto:${site.email}`}
          className="text-[clamp(1.75rem,6vw,4.5rem)] font-extrabold tracking-[-0.04em] wrap-anywhere underline decoration-accent decoration-[6px] underline-offset-14"
        >
          {site.email}
        </a>
        <CopyEmailButton />
      </div>
      <ul className="flex flex-wrap gap-8 text-[17px] font-medium" data-reveal style={revealDelay(2, 120)}>
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
