import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Scrolls to an on-page section and keeps the URL hash in sync.
// Smooth vs. instant follows the CSS scroll-behavior (reduced-motion aware).
export function scrollToSection(id: string) {
  const target = document.getElementById(id)
  if (!target) return
  target.scrollIntoView({ block: "start" })
  history.replaceState(null, "", `#${id}`)
}

// Inline style that staggers [data-reveal] siblings (see ScrollReveal).
export function revealDelay(index: number, step = 80): React.CSSProperties {
  return { "--reveal-delay": `${index * step}ms` } as React.CSSProperties
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
