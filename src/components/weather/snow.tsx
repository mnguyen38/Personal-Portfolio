"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useMemo, useState, useEffect } from "react"

interface Snowflake {
  id: number
  x: number
  delay: number
  duration: number
  opacity: number
  size: number
  drift: number
  isFlake: boolean // 20-25% chance of being a snowflake shape
}

export function Snow() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate snowflakes once and keep them stable
  /* eslint-disable react-hooks/purity */
  const snowflakes: Snowflake[] = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => {
      const isFlake = Math.random() < 0.22 // 22% chance of being a snowflake shape
      return {
        id: i,
        x: Math.random() * 100, // Random horizontal position (%)
        delay: Math.random() * 5, // Random delay (0-5s)
        duration: Math.random() * 3 + 5, // Random duration (5-8s) - slower than rain
        opacity: Math.random() * 0.6 + 0.3, // Random opacity (0.3-0.9)
        size: isFlake ? Math.random() * 6 + 10 : Math.random() * 4 + 3, // Snowflakes: 10-16px, Circles: 3-7px
        drift: Math.random() * 30 - 15, // Random horizontal drift (-15 to 15px)
        isFlake,
      }
    }), []
  )
  /* eslint-enable react-hooks/purity */

  if (!mounted) return null

  // Colors based on theme
  const snowColor = theme === "dark" ? "#e0e7ff" : "#f1f5f9"

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute"
          style={{
            left: `${flake.x}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
          }}
          initial={{ top: "-10%", x: 0 }}
          animate={{
            top: "110%",
            x: [0, flake.drift, -flake.drift, flake.drift, 0],
            rotate: flake.isFlake ? [0, 360] : 0,
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            repeat: Infinity,
            ease: "linear",
            x: {
              duration: flake.duration,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: flake.duration * 2,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {flake.isFlake ? (
            // Snowflake SVG shape
            <svg
              width={flake.size}
              height={flake.size}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L12 22M12 2L9 5M12 2L15 5M12 22L9 19M12 22L15 19M2 12L22 12M2 12L5 9M2 12L5 15M22 12L19 9M22 12L19 15M5.636 5.636L18.364 18.364M5.636 5.636L8.05 8.05M18.364 18.364L15.95 15.95M18.364 5.636L5.636 18.364M18.364 5.636L15.95 8.05M5.636 18.364L8.05 15.95"
                stroke={snowColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transition: "stroke 0.5s ease" }}
              />
            </svg>
          ) : (
            // Simple circle
            <div
              className="w-full h-full rounded-full"
              style={{
                backgroundColor: snowColor,
                boxShadow: `0 0 ${flake.size}px rgba(255, 255, 255, 0.5)`,
                transition: "background-color 0.5s ease, box-shadow 0.5s ease",
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}
