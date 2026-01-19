"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { IconDownload, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn } from "@/components/magicui/fade-in";
import { BlurFade } from "@/components/magicui/blur-fade";
import { techStack, techCategories } from "@/data/tech-stack";

export default function AboutPage() {
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Resume (5).pdf';
    link.download = 'Resume (5).pdf';
    link.click();
    setShowDownloadDialog(false);
  };
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 space-y-16">
      {/* Hero Section */}
      <section className="space-y-6">
        <BlurFade delay={0}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            About Me
          </h1>
        </BlurFade>

        <BlurFade delay={0.1}>
          <p className="text-xl text-muted-foreground max-w-3xl">
            I&apos;m a passionate full stack developer who loves building modern web
            applications and software solutions that make a difference.
          </p>
        </BlurFade>
      </section>

      {/* Bio Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <FadeIn delay={0.05}>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">My Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I&apos;m currently pursuing a Bachelor of Science in Computer Science at
                  Northeastern University in Boston, maintaining a 3.47 GPA and achieving
                  Dean&apos;s List recognition. My journey in tech started at the United
                  Nations International School of Hanoi, where I earned my IB Diploma.
                </p>
                <p>
                  My professional experience spans full-stack development and cybersecurity.
                  At Fleischhacker Medizintechnik in Germany, I led the transition of warehouse
                  management systems using RFID technology and developed algorithms that increased
                  daily output by 18%. Previously, I worked as a Cyber-Security Intern at the
                  Joint Stock Commercial Bank for Foreign Trade of Vietnam, where I identified
                  critical vulnerabilities and helped protect banking systems.
                </p>
                <p>
                  I&apos;m passionate about building efficient, scalable solutions and have experience
                  across multiple programming languages including Java, C++, TypeScript, and Python. 
                  I&apos;m also interested in exploring the field of AI. My goal is to make innovative 
                  AI tools become more accessible to others, and find ways for the average
                  consumer to have access to the vast number of innovations in the industry.
                </p>
                <p>
                  Outside of coding, I&apos;m an avid association football fan and a proficient
                  recreational SCUBA diver. I also co-founded the STEM Club at UNIS Hanoi,
                  where I taught robotics to 60+ high school students.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="space-y-6">
          <FadeIn delay={0.1}>
            <Card>
              <CardHeader>
                <CardTitle>Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Education</p>
                    <p className="text-lg font-semibold">Northeastern University</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-lg font-semibold">Boston, MA</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">GPA</p>
                    <p className="text-lg font-semibold">3.47 (Dean&apos;s List)</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="text-lg font-semibold">Seeking Opportunities</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.2}>
            <button
              onClick={() => setShowDownloadDialog(true)}
              className="block w-full group"
            >
              <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardContent className="p-0 relative h-96">
                  {/* Resume Preview - slightly opaque */}
                  <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-primary/5 to-primary/10">
                    <iframe
                      src="/Resume (5).pdf"
                      className="w-full h-full opacity-40 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none"
                      title="Resume Preview"
                    />
                  </div>

                  {/* Hover text overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                    <div className="bg-background/90 backdrop-blur-sm px-6 py-3 rounded-lg border-2 border-primary">
                      <p className="text-lg font-semibold">Click to download</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </button>
          </FadeIn>
        </div>
      </section>

      {/* Download Confirmation Dialog */}
      <AnimatePresence>
        {showDownloadDialog && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowDownloadDialog(false)}
            />

            {/* Dialog Box */}
            <motion.div
              initial={{ scale: 0, rotate: -12, y: 100 }}
              animate={{ scale: 1, rotate: 0, y: 0 }}
              exit={{ scale: 0, rotate: 12, y: -100 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
            >
              <Card className="w-[90vw] max-w-md border-4 border-primary shadow-2xl">
                <CardHeader className="relative">
                  <button
                    onClick={() => setShowDownloadDialog(false)}
                    className="absolute top-4 right-4 hover:bg-muted rounded-lg p-2 transition-colors"
                  >
                    <IconX className="h-5 w-5" />
                  </button>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      <IconDownload className="h-8 w-8 text-primary" />
                    </motion.div>
                    Download Resume?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Would you like to download my resume? It contains detailed information about my education, experience, and skills.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={handleDownload}
                      size="lg"
                      className="flex-1"
                    >
                      <IconDownload className="mr-2 h-5 w-5" />
                      Yes, Download
                    </Button>
                    <Button
                      onClick={() => setShowDownloadDialog(false)}
                      variant="outline"
                      size="lg"
                      className="flex-1"
                    >
                      No, Thanks
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Skills Section */}
      <section className="space-y-8">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center">Technical Skills</h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techCategories.map((category, index) => {
            const categoryTechs = techStack.filter(
              (tech) => tech.category === category
            );
            return (
              <FadeIn key={category} delay={index * 0.15} duration={0.5} immediate>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">{category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {categoryTechs.map((tech) => (
                        <span
                          key={tech.name}
                          className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary cursor-default hover:scale-105 transition-transform duration-200"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Interests Section */}
      <section className="space-y-8">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center">
            Beyond Coding
          </h2>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Robotics", description: "Teaching & building robots" },
              { title: "Football", description: "Watching & playing" },
              { title: "SCUBA Diving", description: "Recreational diving" },
              { title: "Technology", description: "Exploring new tools" },
            ].map((interest, index) => (
              <motion.div
                key={interest.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="text-center h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{interest.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {interest.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
