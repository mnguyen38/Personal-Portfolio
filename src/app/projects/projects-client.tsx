"use client";

import { useState } from "react";
import { IconBrandGithub, IconArrowRight, IconExternalLink } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { FadeIn } from "@/components/magicui/fade-in";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Project } from "@/data/projects";

interface ProjectsClientProps {
  projects: Project[];
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
  const [filter, setFilter] = useState<"all" | "featured">("all");

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.featured);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 space-y-12">
      {/* Hero Section */}
      <section className="space-y-6">
        <BlurFade delay={0}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            My Projects
          </h1>
        </BlurFade>

        <BlurFade delay={0.1}>
          <p className="text-xl text-muted-foreground max-w-3xl">
            A collection of projects I&apos;ve worked on, showcasing my skills in web
            development, UI/UX design, and problem-solving.
          </p>
        </BlurFade>

        {/* Filter Buttons */}
        <BlurFade delay={0.15}>
          <div className="flex gap-4">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
            >
              All Projects ({projects.length})
            </Button>
            <Button
              variant={filter === "featured" ? "default" : "outline"}
              onClick={() => setFilter("featured")}
            >
              Featured ({projects.filter((p) => p.featured).length})
            </Button>
          </div>
        </BlurFade>
      </section>

      {/* Projects Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <FadeIn key={project.id} delay={index * 0.15} duration={0.5} immediate>
            <div className="h-full">
              <Card className="h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* Project Image Placeholder */}
                <div className="w-full h-48 bg-linear-to-br from-primary/20 to-primary/5 rounded-t-lg flex items-center justify-center">
                  {project.featured && (
                    <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                      Featured
                    </span>
                  )}
                  <IconExternalLink className="h-12 w-12 text-primary/40" />
                </div>

                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>

                <CardContent className="grow space-y-4">
                  {project.longDescription && (
                    <p className="text-sm text-muted-foreground">
                      {project.longDescription}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex gap-4 pt-4">
                  {project.githubUrl && (
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IconBrandGithub className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button size="sm" asChild className="flex-1">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live Demo
                        <IconArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {!project.githubUrl && !project.liveUrl && (
                    <Button variant="outline" size="sm" disabled className="flex-1">
                      Coming Soon
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          </FadeIn>
        ))}
      </section>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <FadeIn>
          <div className="text-center py-16 space-y-4">
            <p className="text-2xl font-semibold text-muted-foreground">
              No projects found
            </p>
            <Button onClick={() => setFilter("all")}>View All Projects</Button>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
