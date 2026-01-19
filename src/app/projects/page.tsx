import { fetchGitHubRepos } from "@/lib/github";
import { ProjectsClient } from "./projects-client";

export default async function ProjectsPage() {
  const projects = await fetchGitHubRepos();

  return <ProjectsClient projects={projects} />;
}
