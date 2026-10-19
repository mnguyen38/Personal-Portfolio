import { CountUp } from "@/components/count-up";
import { HeroDot } from "@/components/hero-dot";
import { LondonClock } from "@/components/london-clock";
import { currently, site } from "@/data/site";
import { getTradingHighlights } from "@/lib/trading-stats";
import { cn, revealDelay } from "@/lib/utils";

export function Hero({ tradingHref }: { tradingHref: string }) {
  const live = getTradingHighlights();

  const facts = [
    { label: "Now", value: site.now },
    { label: site.city, value: <LondonClock /> },
    { label: "Internships", value: site.internships },
    { label: "Full-time", value: site.fullTime },
  ];

  return (
    <section aria-label="Introduction" className="flex flex-col gap-14 pt-16 pb-16 sm:pt-20">
      <h1 aria-label={site.name} className="hero-name text-[clamp(4.5rem,15.6vw,12.5rem)] leading-[0.86] font-extrabold tracking-[-0.055em]">
        <span className="hero-line block">Minh</span>
        <span className="hero-line block" style={revealDelay(1, 120)}>
          Nguyen<HeroDot />
        </span>
      </h1>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-6">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-7 lg:col-span-5">
          {facts.map((fact, index) => (
            <div key={fact.label} className="flex flex-col gap-1.5" data-reveal style={revealDelay(index + 4)}>
              <dt className="label">{fact.label}</dt>
              <dd className="text-lg font-medium">{fact.value}</dd>
            </div>
          ))}
        </dl>
        <p
          className="text-2xl leading-[1.35] font-medium tracking-[-0.01em] sm:text-[28px] lg:col-span-6 lg:col-start-7"
          data-reveal
          style={revealDelay(5)}
        >
          {site.intro}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="label" data-reveal style={revealDelay(3)}>
          Currently
        </h2>
        <ul className="grid gap-px border-y border-rule bg-rule sm:grid-cols-3">
          {currently.map((item, index) => (
            <li key={item.label} className={cn("flex bg-background py-6 pr-6", index > 0 && "sm:pl-6")}>
              <div className="flex flex-col gap-2" data-reveal style={revealDelay(index + 3)}>
                <span className="font-mono text-sm text-accent">{item.label}</span>
                <span className="text-xl leading-snug font-medium tracking-[-0.01em]">{item.value}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {live.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="label flex items-center gap-2" data-reveal>
            <span className="size-1.5 rounded-full bg-accent" aria-hidden />
            Live from my trading engine
          </h2>
          {/* Reveals sit inside each cell: the cells' background draws the grid lines. */}
          {/* One cell per stat plus the explainer, so there are never empty cells. */}
          <ul
            className={cn(
              "grid gap-px border-y border-rule bg-rule sm:grid-cols-2",
              live.length > 1 && "lg:grid-cols-3",
            )}
          >
            {live.map((item, index) => (
              <li key={item.label} className={cn("flex bg-background py-7 pr-6", index > 0 && "sm:pl-6")}>
                <div className="flex grow flex-col gap-2.5" data-reveal style={revealDelay(index)}>
                  <span className="text-5xl leading-none font-extrabold tracking-[-0.04em] sm:text-[64px]">
                    <CountUp value={item.value} />
                    <span className="text-accent">{item.suffix}</span>
                  </span>
                  <span className="text-[15px] leading-[1.45] text-muted">{item.label}</span>
                  {item.note && <span className="label mt-auto pt-1">{item.note}</span>}
                </div>
              </li>
            ))}
            <li
              className={cn(
                "flex bg-background py-7 pr-6",
                live.length > 1 ? "sm:col-span-2 lg:col-span-1 lg:pl-6" : "sm:pl-6",
              )}
            >
              <div className="flex flex-col gap-4" data-reveal style={revealDelay(live.length)}>
                <p className="text-[17px] leading-normal">
                  Two automated strategies compete on a paper-trading account. These numbers come from the leader
                  and update here every trading day.
                </p>
                <a href={tradingHref} className="font-bold text-accent underline underline-offset-[5px]">
                  How it works →
                </a>
              </div>
            </li>
          </ul>
        </div>
      )}
    </section>
  );
}
