"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/data/site";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: site.timeZone,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

function subscribe(onTick: () => void) {
  const id = window.setInterval(onTick, 1000);
  return () => window.clearInterval(id);
}

// Rendered as a placeholder on the server, then ticks every second on the client.
export function LondonClock() {
  const time = useSyncExternalStore(
    subscribe,
    () => formatter.format(new Date()),
    () => null,
  );

  return (
    <time className="tabular-nums" suppressHydrationWarning>
      {time ?? "--:--:--"}
    </time>
  );
}
