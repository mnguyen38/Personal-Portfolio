"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@/components/icons";

// Both icons render on the server; CSS picks one, so there's no hydration flash.
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
      className="flex size-11 items-center justify-center border border-rule transition-colors hover:border-foreground"
    >
      <MoonIcon className="dark:hidden" />
      <SunIcon className="hidden dark:block" />
    </button>
  );
}
