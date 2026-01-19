"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BlurFadeProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  blur?: string;
  className?: string;
}

export function BlurFade({
  children,
  delay = 0,
  duration = 0.4,
  blur = "6px",
  className,
}: BlurFadeProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: `blur(${blur})`,
        y: 20,
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
      }}
      transition={{
        delay,
        duration,
        ease: [0.4, 0.0, 0.2, 1],
        type: "spring",
        stiffness: 400,
        damping: 20,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
