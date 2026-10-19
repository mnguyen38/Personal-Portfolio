"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

// The period after "Nguyen" is interactive: click it and it spirals out into a small
// constellation of quick links. Each time, the orbs get new colours and sizes; on close
// they come loose and float away off the screen.

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "How I work", href: "#principles" },
  { label: "Contact", href: "#contact" },
  { label: "Résumé ↓", href: site.resume, external: true },
];

// Orb colours (light / dark). Five are drawn at random each time the constellation opens.
const PALETTE = [
  "bg-accent",
  "bg-foreground",
  "bg-[#E0461F] dark:bg-[#FF8A65]",
  "bg-[#0B7A55] dark:bg-[#6FD6A2]",
  "bg-[#7C4DFF] dark:bg-[#B9A2F0]",
  "bg-[#D6336C] dark:bg-[#F783AC]",
  "bg-[#E8A33D] dark:bg-[#FFC857]",
  "bg-[#0B8AA8] dark:bg-[#5FD3E6]",
];
const MIN_SIZE = 8;
const MAX_SIZE = 26;

// Where the constellation lands: an arc up and to the right of the dot (0° = right, negative = up).
const WIDE_ANGLES = [-80, -58, -36, -14, 8];
const SPIRAL_TURN = 240;
// Distance from an orb's centre to its label: half the largest orb plus a gap.
const LABEL_OFFSET = MAX_SIZE / 2 + 8;

type Phase = "closed" | "open" | "releasing";

// Each link lands at a polar offset from the dot; the spiral rotates it into place.
interface Point {
  angle: number;
  radius: number;
}

interface Orb {
  size: number;
  color: string;
  drift: number;
}

// Where an orb floats off to when released, relative to where it was resting.
interface Release {
  x: number;
  y: number;
  scale: number;
  duration: number;
  delay: number;
}

// Used until the first open, so server and client render the same thing.
const INITIAL_ORBS: Orb[] = LINKS.map((_, index) => ({ size: 14, color: PALETTE[index], drift: 6 + index * 0.6 }));

const random = (min: number, max: number) => min + Math.random() * (max - min);

function randomOrbs(): Orb[] {
  const colors = [...PALETTE].sort(() => Math.random() - 0.5);
  return LINKS.map((_, index) => ({
    size: Math.round(random(MIN_SIZE, MAX_SIZE)),
    color: colors[index],
    drift: random(5, 9),
  }));
}

// Mostly upward, like released balloons, and far enough to leave the screen from anywhere.
function randomReleases(): Release[] {
  const reach = Math.max(window.innerWidth, window.innerHeight);
  return LINKS.map(() => {
    const angle = ((-90 + random(-65, 65)) * Math.PI) / 180;
    const distance = reach * random(1, 1.4);
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      scale: random(0.6, 1.3),
      duration: random(1800, 3000),
      delay: random(0, 220),
    };
  });
}

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function HeroDot() {
  const [phase, setPhase] = useState<Phase>("closed");
  // While true, transitions are off: used to put released orbs back without them flying home.
  const [snap, setSnap] = useState(false);
  const [orbs, setOrbs] = useState<Orb[]>(INITIAL_ORBS);
  const [releases, setReleases] = useState<Release[]>([]);
  const [layout, setLayout] = useState<{ points: Point[]; narrow: boolean }>({
    points: WIDE_ANGLES.map((angle) => ({ angle, radius: 220 })),
    narrow: false,
  });
  const dotRef = useRef<HTMLSpanElement>(null);
  const phaseRef = useRef<Phase>("closed");
  const releaseTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => () => window.clearTimeout(releaseTimer.current), []);

  function measure() {
    const dot = dotRef.current?.getBoundingClientRect();
    const section = dotRef.current?.closest("section")?.getBoundingClientRect();
    if (!dot || !section) return;
    const cx = dot.left + dot.width / 2;
    const cy = dot.top + dot.height / 2;
    const room = section.right - cx;

    if (room >= 300) {
      // Wide: an arc in the empty space to the right, leaving about 150px for the longest label.
      const radius = Math.min(300, room - 150);
      setLayout({ points: WIDE_ANGLES.map((angle) => ({ angle, radius })), narrow: false });
      return;
    }
    // Narrow: no room beside the name, so the links settle into a column under it,
    // aligned to the page's left edge, over a blurred backdrop.
    const points = LINKS.map((_, index) => {
      const dx = section.left + MAX_SIZE / 2 - cx;
      const dy = 72 + index * 56 + Math.max(0, section.top - cy);
      return { angle: (Math.atan2(dy, dx) * 180) / Math.PI, radius: Math.hypot(dx, dy) };
    });
    setLayout({ points, narrow: true });
  }

  // Put everything back at the dot instantly, with transitions off for a couple of frames.
  const reset = useCallback((then?: () => void) => {
    window.clearTimeout(releaseTimer.current);
    setSnap(true);
    setPhase("closed");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setSnap(false);
        then?.();
      }),
    );
  }, []);

  const close = useCallback(() => {
    if (phaseRef.current !== "open") return;
    if (reducedMotion()) {
      reset();
      return;
    }
    const next = randomReleases();
    setReleases(next);
    setPhase("releasing");
    const longest = Math.max(...next.map((release) => release.duration + release.delay));
    releaseTimer.current = window.setTimeout(() => reset(), longest + 100);
  }, [reset]);

  function open() {
    measure();
    setOrbs(randomOrbs());
    setPhase("open");
  }

  function onClick() {
    if (phase === "open") close();
    else if (phase === "releasing") reset(open);
    else open();
  }

  // On narrow screens the name is lifted above the backdrop while the links are open.
  useEffect(() => {
    const lifted = phase === "open" && layout.narrow;
    document.documentElement.classList.toggle("dot-open", lifted);
    return () => document.documentElement.classList.remove("dot-open");
  }, [phase, layout.narrow]);

  // Close on Escape or a click anywhere else.
  useEffect(() => {
    if (phase !== "open") return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    const onPointer = (event: PointerEvent) => {
      if (!dotRef.current?.contains(event.target as Node)) close();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [phase, close]);

  const isOpen = phase === "open";
  const releasing = phase === "releasing";
  // Released orbs float away from where they were resting, so they stay "placed" until reset.
  const placed = isOpen || releasing;

  return (
    <span
      ref={dotRef}
      className="relative inline-block align-baseline"
      style={{ width: "0.2em", height: "0.2em", marginLeft: "0.03em" }}
    >
      <button
        type="button"
        onClick={onClick}
        aria-label={isOpen ? "Close quick links" : "Open quick links"}
        aria-expanded={isOpen}
        className={cn(
          "hero-dot absolute inset-0 rounded-full bg-accent transition-transform duration-500 ease-out hover:scale-110",
          isOpen && "scale-90",
        )}
      />

      {isOpen &&
        layout.narrow &&
        createPortal(<div aria-hidden className="dot-backdrop fixed inset-0 z-30 bg-background/85 backdrop-blur-sm" />, document.body)}

      <span
        className={cn(
          "pointer-events-none absolute top-1/2 left-1/2 font-mono leading-none font-normal tracking-normal",
          layout.narrow ? "text-[15px]" : "text-[13px]",
        )}
      >
        {LINKS.map((link, index) => {
          const { angle, radius } = layout.points[index];
          const orb = orbs[index];
          const release = releases[index];
          const rotation = placed ? angle : angle - SPIRAL_TURN;
          // Opening: orbs swing out in turn, then each label follows once its orb has landed.
          const swing = snap ? "none" : `transform 900ms var(--ease-out-expo) ${index * 60}ms`;
          const flying = releasing && release;

          const labelTransition = snap
            ? "none"
            : isOpen
              ? `opacity 450ms ease ${620 + index * 60}ms, transform 600ms var(--ease-out-expo) ${620 + index * 60}ms`
              : "opacity 150ms ease, transform 150ms ease";

          // Released: sideways and upward motion use different easings, so each orb curves away.
          const floatX = flying ? `transform ${release.duration}ms cubic-bezier(0.45, 0, 0.55, 1) ${release.delay}ms` : "none";
          const orbTransition = snap
            ? "none"
            : flying
              ? `transform ${release.duration}ms cubic-bezier(0.5, 0, 0.85, 0.6) ${release.delay}ms, opacity ${release.duration * 0.5}ms ease ${release.delay + release.duration * 0.5}ms, scale 300ms ease`
              : `scale 300ms ease, opacity 300ms ease ${isOpen ? index * 60 : 0}ms`;

          return (
            <span key={link.label} className="absolute top-0 left-0" style={{ transform: `rotate(${rotation}deg)`, transition: swing }}>
              <span
                className="absolute top-0 left-0"
                style={{ transform: `translateX(${placed ? radius : 0}px)`, transition: swing }}
              >
                {/* A zero-size anchor at the landing point; counter-rotated so the label stays level. */}
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  tabIndex={isOpen ? 0 : -1}
                  aria-hidden={!isOpen}
                  onClick={close}
                  className={cn("group absolute top-0 left-0 text-foreground outline-none", isOpen && "pointer-events-auto")}
                  style={{ transform: `rotate(${-rotation}deg)`, transition: swing }}
                >
                  <span
                    className="absolute top-0 left-0"
                    style={{ transform: flying ? `translateX(${release.x}px)` : "none", transition: floatX }}
                  >
                    {/* Only the orb drifts; the labels stay in a steady column. */}
                    <span
                      className={cn(
                        "absolute rounded-full group-hover:scale-125 group-focus-visible:ring-2 group-focus-visible:ring-accent group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background",
                        orb.color,
                        placed && "orb-drift",
                      )}
                      style={{
                        width: orb.size,
                        height: orb.size,
                        left: -orb.size / 2,
                        top: -orb.size / 2,
                        opacity: isOpen ? 1 : 0,
                        transform: flying ? `translateY(${release.y}px) scale(${release.scale})` : "none",
                        transition: orbTransition,
                        ["--drift" as string]: `${orb.drift}s`,
                        animationDelay: `${-index * 1.3}s`,
                      }}
                    />
                  </span>
                  <span
                    className="absolute top-0 bg-background/90 px-1.5 py-1 whitespace-nowrap uppercase group-hover:text-accent group-focus-visible:text-accent"
                    style={{
                      // One shared edge for every label, clear of the largest orb.
                      left: LABEL_OFFSET,
                      opacity: isOpen ? 1 : 0,
                      transform: `translate(${isOpen ? 0 : -8}px, -50%)`,
                      transition: labelTransition,
                    }}
                  >
                    {link.label}
                  </span>
                </a>
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
