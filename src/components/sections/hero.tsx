import { LondonClock } from "@/components/london-clock";
import { highlights, site } from "@/data/site";

export function Hero() {
  const facts = [
    { label: "Role", value: site.role },
    { label: "Now", value: site.now },
    { label: site.city, value: <LondonClock /> },
    {
      label: "Status",
      value: (
        <span className="flex items-center gap-2">
          <span className="size-2.5 bg-accent" aria-hidden />
          {site.status}
        </span>
      ),
    },
  ];

  return (
    <section aria-label="Introduction" className="flex flex-col gap-14 pt-16 pb-16 sm:pt-20">
      <h1 className="text-[clamp(4.5rem,15.6vw,12.5rem)] leading-[0.86] font-extrabold tracking-[-0.055em]">
        Minh
        <br />
        Nguyen<span className="text-accent">.</span>
      </h1>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-6">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-7 lg:col-span-5">
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-1.5">
              <dt className="label">{fact.label}</dt>
              <dd className="text-lg font-medium">{fact.value}</dd>
            </div>
          ))}
        </dl>
        <p className="text-2xl leading-[1.35] font-medium tracking-[-0.01em] sm:text-[28px] lg:col-span-6 lg:col-start-7">
          {site.intro}
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-px border-y border-rule bg-rule lg:grid-cols-4">
        {highlights.map((item) => (
          <li key={item.label} className="flex flex-col gap-2.5 bg-background py-7 pr-6 [&:not(:nth-child(2n+1))]:pl-6 lg:[&:not(:first-child)]:pl-6">
            <span className="text-5xl leading-none font-extrabold tracking-[-0.04em] sm:text-[64px]">
              {item.value.includes("→") ? (
                <>
                  {item.value.split("→")[0]}
                  <span className="text-accent">→</span>
                  {item.value.split("→")[1]}
                </>
              ) : (
                item.value
              )}
              <span className="text-accent">{item.suffix}</span>
            </span>
            <span className="text-[15px] leading-[1.45] text-muted">{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
