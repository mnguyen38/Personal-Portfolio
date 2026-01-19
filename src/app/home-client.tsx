"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IconBrandGithub, IconBrandLinkedin, IconMail, IconArrowRight } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn } from "@/components/magicui/fade-in";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Project } from "@/data/projects";
import { StackCloud } from "@/components/tech-stack/stack-cloud";

interface HomeClientProps {
  featuredProjects: Project[];
}

export function HomeClient({ featuredProjects }: HomeClientProps) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 space-y-24">
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-12rem)] flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <BlurFade delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Hi, I&apos;m{" "}
Minh
            </h1>
          </BlurFade>

          <BlurFade delay={0.3}>
            <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground">
              Computer Science Student & Software Engineer
            </p>
          </BlurFade>

          <BlurFade delay={0.5}>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Computer Science student at Northeastern University with experience in full-stack
              development, cybersecurity, and warehouse automation. Passionate about building
              efficient solutions and optimizing systems.
            </p>
          </BlurFade>

          <BlurFade delay={0.7}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/projects">
                  View My Work
                  <IconArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">About Me</Link>
              </Button>
            </div>
          </BlurFade>

          <BlurFade delay={0.9}>
            <div className="flex items-center justify-center gap-4 pt-4">
              <motion.a
                href="https://github.com/mnguyen38"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub Profile"
              >
                <IconBrandGithub className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/mnguyen380"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn Profile"
              >
                <IconBrandLinkedin className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="mailto:nguyen.minh8@northeastern.edu"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <IconMail className="h-6 w-6" />
              </motion.a>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="space-y-8">
        <FadeIn>
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold">Featured Projects</h2>
            <p className="text-muted-foreground">
              Some of my recent work
            </p>
          </div>
        </FadeIn>

        {featuredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project, index) => (
              <FadeIn key={project.id} delay={index * 0.1}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.githubUrl && (
                        <Button variant="outline" size="sm" asChild>
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
                        <Button size="sm" asChild>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Live
                            <IconArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        ) : (
          <FadeIn>
            <p className="text-center text-muted-foreground">
              No featured projects yet. Check out all my work below!
            </p>
          </FadeIn>
        )}

        <FadeIn delay={0.4}>
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">
                View All Projects
                <IconArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </FadeIn>
      </section>

      {/* Tech Stack Section */}
      <section className="space-y-8">
        <FadeIn>
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold">Tech Stack</h2>
            <p className="text-muted-foreground">
              Technologies I work with
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="max-w-2xl mx-auto">
            <StackCloud />
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
