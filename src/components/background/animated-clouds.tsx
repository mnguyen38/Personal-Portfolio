"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { useWeather } from "@/contexts/weather-context"
import { Sun } from "@/components/weather/sun"
import { Moon } from "@/components/weather/moon"
import { Stars } from "@/components/weather/stars"
import { Clouds } from "@/components/weather/clouds"
import { Rain } from "@/components/weather/rain"
import { Snow } from "@/components/weather/snow"
import { AnimatePresence } from "framer-motion"

export function AnimatedClouds() {
  const { theme } = useTheme()
  const { isRaining, isSnowing } = useWeather()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Stars - only in dark mode, behind everything */}
      {theme === "dark" && <Stars />}

      {/* Sun and Moon with animated transitions */}
      <AnimatePresence mode="wait">
        {theme !== "dark" ? (
          <Sun key="sun" />
        ) : (
          <Moon key="moon" />
        )}
      </AnimatePresence>

      {/* Animated clouds */}
      <Clouds />

      {/* Rain - controlled from header */}
      {isRaining && <Rain />}

      {/* Snow - controlled from header */}
      {isSnowing && <Snow />}
    </div>
  )
}
