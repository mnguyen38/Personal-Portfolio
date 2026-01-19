"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

interface Cloud {
  id: number
  size: number
  top: string
  duration: number
  delay: number
}

const clouds: Cloud[] = [
  { id: 1, size: 280, top: "8%", duration: 75, delay: 0 },
  { id: 2, size: 120, top: "22%", duration: 45, delay: 5 },
  { id: 3, size: 220, top: "12%", duration: 65, delay: 10 },
  { id: 4, size: 90, top: "38%", duration: 40, delay: 15 },
  { id: 5, size: 180, top: "5%", duration: 60, delay: 20 },
  { id: 6, size: 140, top: "45%", duration: 50, delay: 25 },
  { id: 7, size: 250, top: "18%", duration: 70, delay: 30 },
  { id: 8, size: 110, top: "32%", duration: 48, delay: 35 },
  { id: 9, size: 200, top: "28%", duration: 58, delay: 40 },
  { id: 10, size: 160, top: "15%", duration: 55, delay: 45 },
]

export function Clouds() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) return null

  const cloudColor = theme === "dark" ? "#475569" : "#cbd5e1"
  const cloudOpacity = theme === "dark" ? "0.25" : "0.35"

  return (
    <>
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute z-10"
          style={{
            top: cloud.top,
            width: cloud.size,
            height: cloud.size * 0.6,
          }}
          initial={{ x: "-100%" }}
          animate={{ x: "100vw" }}
          transition={{
            duration: cloud.duration,
            delay: cloud.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            viewBox="0 0 200 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Cloud shape using overlapping circles */}
            <g opacity={cloudOpacity} style={{ transition: "opacity 0.5s ease" }}>
              <ellipse cx="50" cy="70" rx="35" ry="25" fill={cloudColor} style={{ transition: "fill 0.5s ease" }} />
              <ellipse cx="80" cy="65" rx="40" ry="30" fill={cloudColor} style={{ transition: "fill 0.5s ease" }} />
              <ellipse cx="110" cy="70" rx="35" ry="25" fill={cloudColor} style={{ transition: "fill 0.5s ease" }} />
              <ellipse cx="140" cy="75" rx="30" ry="20" fill={cloudColor} style={{ transition: "fill 0.5s ease" }} />

              {/* Top puffs */}
              <ellipse cx="70" cy="50" rx="30" ry="25" fill={cloudColor} style={{ transition: "fill 0.5s ease" }} />
              <ellipse cx="100" cy="45" rx="35" ry="30" fill={cloudColor} style={{ transition: "fill 0.5s ease" }} />
              <ellipse cx="120" cy="55" rx="28" ry="22" fill={cloudColor} style={{ transition: "fill 0.5s ease" }} />
            </g>
          </svg>
        </motion.div>
      ))}
    </>
  )
}
