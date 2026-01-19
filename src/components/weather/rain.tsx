"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useMemo, useState, useEffect } from "react"

interface Raindrop {
  id: number
  x: number
  delay: number
  duration: number
  opacity: number
  length: number
}

export function Rain() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate raindrops once and keep them stable
  /* eslint-disable react-hooks/purity */
  const raindrops: Raindrop[] = useMemo(() =>
    Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // Random horizontal position (%)
      delay: Math.random() * 5, // Random delay (0-5s)
      duration: Math.random() * 1 + 2, // Random duration (2-3s)
      opacity: Math.random() * 0.3 + 0.2, // Random opacity (0.2-0.5)
      length: Math.random() * 20 + 10, // Random length (10-30px)
    })), []
  )
  /* eslint-enable react-hooks/purity */

  if (!mounted) return null

  // Colors based on theme
  const rainColor = theme === "dark" ? "#6b7280" : "#94a3b8"

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {raindrops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute"
          style={{
            left: `${drop.x}%`,
            width: "2.5px",
            height: `${drop.length}px`,
            background: `linear-gradient(to bottom, transparent, ${rainColor})`,
            opacity: drop.opacity,
            transition: "background 0.5s ease",
          }}
          initial={{ top: "-10%" }}
          animate={{ top: "110%" }}
          transition={{
            duration: drop.duration,
            delay: drop.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}
