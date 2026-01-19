"use client";

import { IconBriefcase, IconMapPin, IconCalendar } from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn } from "@/components/magicui/fade-in";
import { BlurFade } from "@/components/magicui/blur-fade";
import { experiences } from "@/data/experience";

function formatDate(dateString: string) {
  if (dateString === "Present") return "Present";
  const [year, month] = dateString.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function ExperiencePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 space-y-12">
      {/* Hero Section */}
      <section className="space-y-6">
        <BlurFade delay={0}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Experience
          </h1>
        </BlurFade>

        <BlurFade delay={0.1}>
          <p className="text-xl text-muted-foreground max-w-3xl">
            My journey as a software developer, working with teams from around the world.
          </p>
        </BlurFade>
      </section>

      {/* Timeline */}
      <section className="relative space-y-8">
        {/* Timeline Line */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-border ml-6" />

        {experiences.map((experience, index) => (
          <FadeIn key={experience.id} delay={index * 0.15} duration={0.5} immediate>
            <div className="relative">
              {/* Timeline Dot */}
              <div className="hidden md:block absolute left-0 top-8 w-12 h-12 ml-0 items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-primary border-4 border-background" />
              </div>

              <Card className="md:ml-20 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="space-y-2">
                      <CardTitle className="text-2xl">
                        {experience.position}
                      </CardTitle>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <IconBriefcase className="h-4 w-4" />
                          <span className="font-semibold">
                            {experience.company}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <IconMapPin className="h-4 w-4" />
                          <span>{experience.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
                      <IconCalendar className="h-4 w-4" />
                      <span>
                        {formatDate(experience.startDate)} -{" "}
                        {formatDate(experience.endDate)}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Description */}
                  <ul className="space-y-2">
                    {experience.description.map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-2 items-start text-muted-foreground"
                      >
                        <span className="text-primary shrink-0">•</span>
                        <span className="flex-1">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Technologies Used:</p>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary cursor-default hover:scale-105 transition-transform duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </FadeIn>
        ))}
      </section>
    </div>
  );
}
