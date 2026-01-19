"use client"

import { IconCloud } from "@/components/magicui/icon-cloud"
import { TECH_STACK_SLUGS } from "@/data/tech-stack"

export function StackCloud() {
  // Convert tech stack slugs to SimpleIcons CDN URLs
  const images = TECH_STACK_SLUGS.map(
    (slug) => `https://cdn.simpleicons.org/${slug}`
  )

  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden">
      <IconCloud images={images} />
    </div>
  )
}
