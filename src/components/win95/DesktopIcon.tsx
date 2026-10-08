"use client";

import { useRef, type ReactNode } from "react";
import { clsx } from "clsx";

type Props = {
  label: string;
  icon: ReactNode;
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
};

/**
 * Desktop icon. Authentic behaviour is select-then-double-click, but a single
 * tap opens on touch devices where double-tap is awkward and means "zoom".
 */
export function DesktopIcon({ label, icon, selected, onSelect, onOpen }: Props) {
  const lastTap = useRef(0);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    onSelect();
    // `detail` is 0 for keyboard-driven clicks and pointer type is unreliable
    // across browsers, so fall back to a manual double-tap window on touch.
    if (e.detail === 0) {
      onOpen();
      return;
    }
    if (window.matchMedia("(pointer: coarse)").matches) {
      onOpen();
      return;
    }
    const now = Date.now();
    if (now - lastTap.current < 400) onOpen();
    lastTap.current = now;
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onDoubleClick={onOpen}
      // Fixed height so the desktop can wrap columns on an exact icon count.
      className="flex h-[112px] w-[124px] flex-col items-center justify-start gap-1.5 p-1 text-center"
    >
      <span
        className={clsx(
          "grid size-16 shrink-0 place-items-center",
          // The 95 way of showing selection: a blue wash over the icon art.
          selected && "bg-w95-navy/40"
        )}
      >
        {icon}
      </span>
      <span
        className={clsx(
          "px-[3px] text-[14px] leading-tight text-white",
          selected
            ? "bg-w95-navy outline outline-1 outline-dotted outline-white"
            : // A hard outline plus a soft drop shadow, so white labels stay
              // legible over both the bright sky and the grass.
              "[text-shadow:1px_1px_0_rgba(0,0,0,0.85),-1px_1px_0_rgba(0,0,0,0.85),1px_-1px_0_rgba(0,0,0,0.85),-1px_-1px_0_rgba(0,0,0,0.85),0_2px_4px_rgba(0,0,0,0.7)]"
        )}
      >
        {label}
      </span>
    </button>
  );
}
