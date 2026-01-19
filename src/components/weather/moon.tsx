"use client"

import { motion } from "framer-motion"

export function Moon() {
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
          {/* Tight radial gradient with many smooth stops - darker for better blending */}
          <radialGradient id="moonGlow" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.12" />
            <stop offset="10%" stopColor="#a5b4fc" stopOpacity="0.1" />
            <stop offset="20%" stopColor="#a5b4fc" stopOpacity="0.08" />
            <stop offset="30%" stopColor="#818cf8" stopOpacity="0.06" />
            <stop offset="40%" stopColor="#818cf8" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.03" />
            <stop offset="60%" stopColor="#6366f1" stopOpacity="0.02" />
            <stop offset="70%" stopColor="#6366f1" stopOpacity="0.01" />
            <stop offset="80%" stopColor="#6366f1" stopOpacity="0.005" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
          {/* Filter for moon glow */}
          <filter id="moonGlowFilter">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Single outer glow with smooth gradient */}
        <circle cx="90" cy="90" r="75" fill="url(#moonGlow)" />
        {/* Crescent moon shape */}
        <g filter="url(#moonGlowFilter)" opacity="0.35">
          {/* Main moon circle */}
          <circle cx="90" cy="90" r="40" fill="#e0e7ff" />
          {/* Shadow circle to create crescent */}
          <circle cx="105" cy="85" r="35" fill="#0f172a" />
        </g>
      </svg>
    </motion.div>
  )
}
