import { fetchGitHubRepos } from "@/lib/github";
import { HomeClient } from "./home-client";

export default async function HomePage() {
  const projects = await fetchGitHubRepos();
  const featuredProjects = projects.filter((p) => p.featured);

  return <HomeClient featuredProjects={featuredProjects} />;
}
