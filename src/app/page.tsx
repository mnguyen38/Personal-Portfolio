import { PortfolioProvider } from "@/components/portfolio-state";
import { SiteHeader } from "@/components/site-header";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { SkillFilter } from "@/components/sections/skill-filter";
import { Contact, Education, SiteFooter, Toolkit } from "@/components/sections/static-sections";
import { Work } from "@/components/sections/work";

export default function HomePage() {
  return (
    <PortfolioProvider>
      <div id="top" className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-8 lg:px-16">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">
          <Hero />
          <SkillFilter />
          <Work />
          <Experience />
          <Education />
          <Toolkit />
          <Contact />
        </main>
        <SiteFooter />
      </div>
    </PortfolioProvider>
  );
}
