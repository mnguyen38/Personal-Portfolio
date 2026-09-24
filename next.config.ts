import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site used to have separate pages; keep old links working.
  async redirects() {
    return [
      { source: "/projects", destination: "/#work", permanent: true },
      { source: "/experience", destination: "/#experience", permanent: true },
      { source: "/about", destination: "/#education", permanent: true },
    ];
  },
};

export default nextConfig;
