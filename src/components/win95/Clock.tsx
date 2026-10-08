"use client";

import { useEffect, useState } from "react";

function format(date: Date) {
  return date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace("AM", "AM")
    .replace("PM", "PM");
}

/**
 * Tray clock. Renders empty on the server — the time differs between server
 * and client, which would be a hydration mismatch.
 */
export function Clock() {
  const [now, setNow] = useState<string>("");

  useEffect(() => {
    const tick = () => setNow(format(new Date()));
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-[22px] min-w-[74px] items-center justify-center bg-w95-face bevel-groove px-2 text-[13px]">
      <span suppressHydrationWarning>{now}</span>
    </div>
  );
}
