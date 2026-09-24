"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { cn, copyText } from "@/lib/utils";

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timeout.current), []);

  async function handleCopy() {
    if (!(await copyText(site.email))) return;
    setCopied(true);
    window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "h-12 min-w-28 border border-foreground px-5 text-[15px] font-bold transition-colors",
        copied ? "bg-foreground text-background" : "hover:bg-card",
      )}
    >
      <span aria-live="polite">{copied ? "Copied ✓" : "Copy"}</span>
      <span className="sr-only"> email address</span>
    </button>
  );
}
