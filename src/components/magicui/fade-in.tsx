"use client";

import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  immediate?: boolean;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  direction = "up",
  className,
  immediate = false,
}: FadeInProps) {
  const directions = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { y: 0, x: 20 },
    right: { y: 0, x: -20 },
  };

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...directions[direction],
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  };

  // Use animate for immediate rendering, whileInView for scroll-triggered
  if (immediate) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{
          duration,
          delay,
          ease: "easeOut",
        }}
        variants={variants}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration,
        delay,
        type: "spring",
        stiffness: 400,
        damping: 20
      }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
