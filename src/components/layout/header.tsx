"use client"

import { cn } from "@/lib/utils"
import {
  IconArrowUp,
  IconBrandGithub,
  IconMenu2,
  IconMoon,
  IconSun,
  IconX,
  IconCloud,
  IconCloudRain,
  IconSnowflake,
} from "@tabler/icons-react"
import { TbFocusAuto } from "react-icons/tb"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { useWeather } from "@/contexts/weather-context"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { weatherCondition, cycleWeather, temperature } = useWeather()
  const [mounted, setMounted] = useState(false)

  // Scroll detection logic
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY

    if (currentScrollY === 0) {
      setIsScrolled(false)
    } else if (currentScrollY > 0) {
      setIsScrolled(true)
    }
  }, [])

  // Handle mounting (for theme to avoid hydration mismatch)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  // Set up scroll listener
  useEffect(() => {
    // Initialize scroll state - synchronizing with external browser state
    const initScroll = window.scrollY > 0
    if (initScroll !== isScrolled) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsScrolled(initScroll)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll, isScrolled])

  // Re-check scroll position on route change
  useEffect(() => {
    const currentScroll = window.scrollY > 0
    if (currentScroll !== isScrolled) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsScrolled(currentScroll)
    }
  }, [pathname, isScrolled])

  if (!mounted) return null

  return (
    <>
      <header className="sticky top-8 z-50 px-4">
        <div
          className={cn(
            "mx-auto flex justify-between gap-10 items-center transition-all duration-300 p-4",
            isScrolled
              ? "bg-background/80 backdrop-blur-md border border-border/40 xl:w-[90%] shadow-lg rounded-3xl"
              : "bg-transparent w-full xl:w-[70%]"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">
              Minh&apos;s Portfolio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="flex-1 items-center gap-3 justify-center hidden md:flex">
            {navigation.map((item) => (
              <HeaderLink
                key={item.name}
                title={item.name}
                href={item.href}
                isActive={pathname === item.href}
              />
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* GitHub Link */}
            <a
              href="https://github.com/mnguyen38"
              target="_blank"
              rel="noopener noreferrer"
              className="border p-2 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              aria-label="GitHub Profile"
            >
              <IconBrandGithub className="w-5 h-5" />
            </a>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="border p-2 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <IconSun className="w-5 h-5" />
              ) : (
                <IconMoon className="w-5 h-5" />
              )}
            </button>

            {/* Weather Toggle - Cycles through none/rain/snow/auto */}
            <button
              onClick={cycleWeather}
              className="border p-2 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              aria-label="Cycle Weather"
            >
              {weatherCondition === "none" && <IconCloud className="w-5 h-5" />}
              {weatherCondition === "rain" && <IconCloudRain className="w-5 h-5" />}
              {weatherCondition === "snow" && <IconSnowflake className="w-5 h-5" />}
              {weatherCondition === "auto" && <TbFocusAuto className="w-5 h-5" />}
            </button>

            {/* Temperature Display - Persists once fetched */}
            {temperature !== null && (
              <div className="hidden md:flex items-center gap-1 text-sm px-3 py-2 border rounded-2xl">
                <span className="font-medium">Boston,</span>
                <span>{temperature}°</span>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden border p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <IconX className="w-5 h-5" />
              ) : (
                <IconMenu2 className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 bg-background/80 backdrop-blur-md border border-border/40 rounded-3xl shadow-lg">
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-2 rounded-xl transition-colors",
                    pathname === item.href
                      ? "bg-foreground text-background"
                      : "hover:bg-muted"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <ScrollToTopButton />
    </>
  )
}

// Active link component with highlighting
function HeaderLink({
  title,
  href,
  isActive
}: {
  title: string
  href: string
  isActive: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200",
        isActive
          ? "bg-foreground text-background shadow-md"
          : "hover:bg-muted"
      )}
    >
      {title}
    </Link>
  )
}

// Scroll to top button that appears after scrolling
function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <button
      className="fixed bottom-8 right-8 size-12 bg-foreground/80 backdrop-blur-md rounded-xl hover:scale-110 active:scale-95 transition-all duration-300 z-50 shadow-lg"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }}
      aria-label="Scroll to top"
    >
      <IconArrowUp className="text-background mx-auto w-5 h-5" />
    </button>
  )
}
