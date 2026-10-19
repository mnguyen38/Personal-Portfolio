import { sectionNumber, sections, type SectionId } from "@/data/site";

export function SectionHeading({ id, aside }: { id: SectionId; aside?: string }) {
  const title = sections.find((section) => section.id === id)?.title;

  return (
    <div className="flex items-baseline justify-between gap-6">
      <div className="flex items-baseline gap-6">
        <span className="font-mono text-sm text-accent">{sectionNumber(id)}</span>
        <h2 className="text-4xl font-extrabold tracking-[-0.03em] sm:text-[44px]">{title}</h2>
      </div>
      {aside && <span className="label hidden sm:inline">{aside}</span>}
    </div>
  );
}

export function Section({
  id,
  aside,
  children,
}: {
  id: SectionId;
  aside?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="flex flex-col gap-9 pb-20">
      <div className="-mb-9 h-0.5 bg-foreground" data-reveal="rule" aria-hidden />
      <div id={`${id}-heading`} className="pt-7" data-reveal>
        <SectionHeading id={id} aside={aside} />
      </div>
      {children}
    </section>
  );
}
