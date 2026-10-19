import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Project write-ups are MDX files under src/content/projects.
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // The site used to have separate pages; keep old links working.
  async redirects() {
    return [
      { source: "/projects", destination: "/#work", permanent: true },
      { source: "/experience", destination: "/#experience", permanent: true },
      { source: "/about", destination: "/#education", permanent: true },
    ];
  },
};

export default createMDX()(nextConfig);
