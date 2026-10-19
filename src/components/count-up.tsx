"use client";

import { useEffect, useRef } from "react";

const NUMBER = /^([+−-]?)(\d+(?:\.(\d+))?)$/;
const DURATION = 1400;

// Counts a numeric value up from zero when its [data-reveal] ancestor is revealed.
// Renders the final value on the server, so the real number is always in the HTML.
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    const match = NUMBER.exec(value);
    const trigger = element?.closest("[data-reveal]");
    const animate =
      document.documentElement.classList.contains("reveal-ready") &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (!element || !match || !trigger || !animate || trigger.classList.contains("is-revealed")) return;

    const [, sign, digits, decimals] = match;
    const target = Number(digits);
    const places = decimals?.length ?? 0;
    const format = (n: number) => `${sign}${n.toFixed(places)}`;
    let frame = 0;

    element.textContent = format(0);

    function start() {
      const began = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - began) / DURATION, 1);
        const eased = 1 - Math.pow(2, -10 * progress); // ease-out-expo
        element!.textContent = progress === 1 ? value : format(target * eased);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }

    trigger.addEventListener("reveal", start, { once: true });
    return () => {
      trigger.removeEventListener("reveal", start);
      cancelAnimationFrame(frame);
      element.textContent = value;
    };
  }, [value]);

  return <span ref={ref}>{value}</span>;
}
