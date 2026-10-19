import { PortfolioProvider } from "@/components/portfolio-state";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteHeader } from "@/components/site-header";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { SkillFilter } from "@/components/sections/skill-filter";
import { Contact, Education, Principles, SiteFooter } from "@/components/sections/static-sections";
import { Work } from "@/components/sections/work";
import { getWriteups } from "@/content/projects";
import { writeupHref } from "@/lib/writeup-link";

export default function HomePage() {
  const writeups = getWriteups();
  const writeupIds = writeups.map((writeup) => writeup.id);
  const tradingHref = writeupIds.includes("options-backtester") ? writeupHref("options-backtester") : "#work";

  return (
    <PortfolioProvider>
      <div id="top" className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-8 lg:px-16">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to content
        </a>
        <SiteHeader writeupIds={writeupIds} />
        <main id="main">
          <Hero tradingHref={tradingHref} />
          <SkillFilter />
          <Work writeups={writeups} />
          <Experience />
          <Principles />
          <Education />
          <Contact />
        </main>
        <SiteFooter />
      </div>
      <ScrollReveal />
    </PortfolioProvider>
  );
}
