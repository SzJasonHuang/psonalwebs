"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

const LINES = [
  "Award Modular BIOS v4.51PG, An Energy Star Ally",
  "Copyright (C) 1984-95, Award Software, Inc.",
  "",
  "PENTIUM-S CPU at 133MHz",
  "Memory Test : 65536K OK",
  "",
  "Detecting HDD Primary Master  ... PORTFOLIO-95",
  "Detecting HDD Primary Slave   ... None",
  "",
  "Starting Windows 95 ...",
];

/** BIOS POST screen. Types itself out, then hands over to the login prompt. */
export function BootScreen({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= LINES.length) {
      const id = setTimeout(onDone, 600);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 260 : 130);
    return () => clearTimeout(id);
  }, [shown, onDone]);

  return (
    <button
      type="button"
      onClick={onDone}
      aria-label="Skip startup"
      className="absolute inset-0 z-[20000] flex cursor-default flex-col items-start justify-start bg-black px-7 py-6 text-left font-[family-name:var(--font-w95-mono)] text-[14px] leading-[1.5] text-[#c8c8c8]"
    >
      {LINES.slice(0, shown).map((line, i) => (
        <div key={i}>{line || " "}</div>
      ))}
      {shown >= LINES.length && (
        <div className="mt-4 text-[#888]">
          {site.name} - press any key to continue
        </div>
      )}
    </button>
  );
}
