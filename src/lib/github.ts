import { Project } from "@/data/projects";
import { featuredRepos, excludedRepos, GITHUB_USERNAME } from "@/data/github-config";

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
  updated_at: string;
}

export async function fetchGitHubRepos(): Promise<Project[]> {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      next: {
        revalidate: 3600, // Revalidate every hour
      },
    }
  );

  if (!response.ok) {
    console.error("Failed to fetch GitHub repos:", response.statusText);
    return [];
  }

  const repos: GitHubRepo[] = await response.json();

  // Filter out archived repos and excluded repos (forks are included)
  const filteredRepos = repos.filter(
    (repo) =>
      !repo.archived &&
      !excludedRepos.includes(repo.name)
  );

  // Fetch README descriptions in parallel
  const projectsWithReadme = await Promise.all(
    filteredRepos.map(async (repo) => {
      const readmeDescription = await fetchReadmeDescription(repo.name);
      return {
        id: repo.id.toString(),
        title: formatRepoName(repo.name),
        description: readmeDescription || repo.description || "No description available",
        technologies: buildTechStack(repo),
        githubUrl: repo.html_url,
        liveUrl: repo.homepage || undefined,
        featured: featuredRepos.includes(repo.name),
      };
    })
  );

  // Sort: featured first, then by most recently updated
  return projectsWithReadme.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });
}

// Fetch README and extract first few meaningful lines as description
async function fetchReadmeDescription(repoName: string): Promise<string | null> {
  try {
    // Try common README filenames
    const readmeNames = ["README.md", "readme.md", "README.rst", "README.txt"];

    for (const readmeName of readmeNames) {
      const url = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/main/${readmeName}`;
      const response = await fetch(url, {
        next: { revalidate: 3600 },
      });

      if (response.ok) {
        const content = await response.text();
        return extractDescription(content);
      }

      // Try master branch if main doesn't exist
      const masterUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/master/${readmeName}`;
      const masterResponse = await fetch(masterUrl, {
        next: { revalidate: 3600 },
      });

      if (masterResponse.ok) {
        const content = await masterResponse.text();
        return extractDescription(content);
      }
    }
  } catch (error) {
    console.error(`Failed to fetch README for ${repoName}:`, error);
  }
  return null;
}

// Extract first few meaningful lines from README content
function extractDescription(content: string): string | null {
  const lines = content.split("\n");
  const meaningfulLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip empty lines, headings, badges, and links at the start
    if (!trimmed) continue;
    if (trimmed.startsWith("#")) continue;
    if (trimmed.startsWith("![")) continue; // badges/images
    if (trimmed.startsWith("[!")) continue; // shields badges
    if (trimmed.startsWith("<")) continue; // HTML tags
    if (trimmed.startsWith("---")) continue; // horizontal rules
    if (trimmed.match(/^\[.*\]\(.*\)$/)) continue; // standalone links

    // Found a meaningful line
    meaningfulLines.push(trimmed);

    // Get first 2-3 lines or ~200 characters
    if (meaningfulLines.length >= 3 || meaningfulLines.join(" ").length >= 200) {
      break;
    }
  }

  if (meaningfulLines.length === 0) return null;

  let description = meaningfulLines.join(" ");

  // Truncate if too long
  if (description.length > 250) {
    description = description.slice(0, 247) + "...";
  }

  return description;
}

// Convert repo-name to "Repo Name"
function formatRepoName(name: string): string {
  return name
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Build tech stack from language and topics
function buildTechStack(repo: GitHubRepo): string[] {
  const techs: string[] = [];

  if (repo.language) {
    techs.push(repo.language);
  }

  // Add topics, filtering out common non-tech tags
  const techTopics = repo.topics.filter(
    (topic) =>
      !["portfolio", "personal", "website", "project", "hacktoberfest"].includes(
        topic.toLowerCase()
      )
  );

  techs.push(...techTopics.map(formatTopicName));

  return [...new Set(techs)]; // Remove duplicates
}

// Format topic names nicely
function formatTopicName(topic: string): string {
  const specialCases: Record<string, string> = {
    javascript: "JavaScript",
    typescript: "TypeScript",
    nodejs: "Node.js",
    nextjs: "Next.js",
    reactjs: "React",
    vuejs: "Vue.js",
    mongodb: "MongoDB",
    postgresql: "PostgreSQL",
    mysql: "MySQL",
    graphql: "GraphQL",
    tailwindcss: "Tailwind CSS",
    css3: "CSS",
    html5: "HTML",
  };

  return (
    specialCases[topic.toLowerCase()] ||
    topic.charAt(0).toUpperCase() + topic.slice(1)
  );
}
