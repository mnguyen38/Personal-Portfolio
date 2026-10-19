"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@/components/icons";
import { switchTheme } from "@/lib/theme-transition";

// Both icons render on the server; CSS picks one, so there's no hydration flash.
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => switchTheme(resolvedTheme === "dark" ? "light" : "dark", setTheme)}
      aria-label="Toggle dark mode"
      className="flex size-11 items-center justify-center border border-rule transition-colors hover:border-foreground"
    >
      <MoonIcon className="dark:hidden" />
      <SunIcon className="hidden dark:block" />
    </button>
  );
}
