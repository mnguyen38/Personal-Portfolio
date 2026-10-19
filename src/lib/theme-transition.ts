// Softly switches between light and dark.
//
// Where the View Transitions API exists, the whole page crossfades as one image
// (timing in globals.css). Elsewhere, every colour fades together via `.theme-fade`.
// With reduced motion, the switch is instant.
export function switchTheme(next: "light" | "dark", setTheme: (theme: string) => void) {
  const root = document.documentElement;

  // Apply the class ourselves so the change lands inside the transition;
  // next-themes then persists it (and re-applying the same class is a no-op).
  const apply = () => {
    root.classList.remove("light", "dark");
    root.classList.add(next);
    root.style.colorScheme = next;
    setTheme(next);
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    apply();
    return;
  }

  if (typeof document.startViewTransition === "function") {
    // Freeze per-element transitions so only the page-level crossfade runs.
    root.classList.add("theme-switching");
    const transition = document.startViewTransition(apply);
    transition.finished.finally(() => root.classList.remove("theme-switching"));
    return;
  }

  root.classList.add("theme-fade");
  apply();
  window.setTimeout(() => root.classList.remove("theme-fade"), 600);
}
