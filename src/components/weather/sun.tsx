"use client"

import { motion } from "framer-motion"

export function Sun() {
  return (
    <motion.div
      className="absolute top-8 right-16 md:top-12 md:right-24 z-0"
      initial={{ y: "100vh", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100vh", opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 15,
        mass: 0.8,
      }}
    >
      <svg
        width="180"
        height="180"
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Tight radial gradient with many smooth stops */}
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.2" />
            <stop offset="10%" stopColor="#fbbf24" stopOpacity="0.18" />
            <stop offset="20%" stopColor="#fbbf24" stopOpacity="0.15" />
            <stop offset="30%" stopColor="#fde68a" stopOpacity="0.12" />
            <stop offset="40%" stopColor="#fde68a" stopOpacity="0.09" />
            <stop offset="50%" stopColor="#fde68a" stopOpacity="0.06" />
            <stop offset="60%" stopColor="#fef3c7" stopOpacity="0.04" />
            <stop offset="70%" stopColor="#fef3c7" stopOpacity="0.02" />
            <stop offset="80%" stopColor="#fef3c7" stopOpacity="0.01" />
            <stop offset="100%" stopColor="#fef3c7" stopOpacity="0" />
          </radialGradient>
          {/* Filter for extra glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Single outer glow with smooth gradient */}
        <circle cx="90" cy="90" r="75" fill="url(#sunGlow)" />
        {/* Main sun body with filter */}
        <circle
          cx="90"
          cy="90"
          r="45"
          fill="#fbbf24"
          filter="url(#glow)"
          opacity="0.35"
        />
      </svg>
    </motion.div>
  )
}
