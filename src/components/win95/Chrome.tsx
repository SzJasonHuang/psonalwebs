"use client";

import { useRef, type ReactNode } from "react";
import { clsx } from "clsx";

/**
 * Sunken white content area — the inside of a folder or document window.
 * Deliberately carries no padding of its own: callers set it, and a base
 * padding here would collide with theirs (clsx concatenates, it does not
 * resolve Tailwind conflicts).
 */
export function Well({
  children,
  className,
  white = true,
}: {
  children: ReactNode;
  className?: string;
  white?: boolean;
}) {
  return (
    <div
      className={clsx(
        "m-[2px] min-h-0 flex-1 overflow-auto bevel-sunken",
        white && "bg-white",
        className
      )}
    >
      {children}
    </div>
  );
}

/** Status bar with sunken panels, as at the bottom of an Explorer window. */
export function StatusBar({ panels }: { panels: string[] }) {
  return (
    <div className="flex shrink-0 items-center gap-[2px] p-[2px]">
      {panels.map((panel, i) => (
        <div
          key={panel}
          className={clsx(
            "bevel-groove px-[6px] py-[2px] text-[12px]",
            i === 0 ? "flex-1" : "shrink-0"
          )}
        >
          {panel}
        </div>
      ))}
    </div>
  );
}

export function Button95({
  children,
  onClick,
  href,
  download,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  download?: boolean;
  className?: string;
}) {
  const classes = clsx(
    "inline-flex min-w-[86px] items-center justify-center gap-1.5 bg-w95-face px-3 py-[5px] text-[13px] bevel-raised active:bevel-pressed",
    className
  );
  const external = href?.startsWith("http") || href?.startsWith("mailto:");

  if (href) {
    return (
      <a
        href={href}
        download={download}
        target={external && !download ? "_blank" : undefined}
        rel={external && !download ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

/** A labelled group box, the 95 way of sectioning a dialog. */
export function GroupBox({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <fieldset
      className={clsx(
        "border border-l-w95-grey border-t-w95-grey border-r-w95-white border-b-w95-white px-3 pb-3 pt-1",
        className
      )}
    >
      <legend className="px-1 text-[13px] font-bold">{label}</legend>
      {children}
    </fieldset>
  );
}

/**
 * An item inside a folder view. Matches DesktopIcon's open behaviour:
 * double-click on precise pointers, single tap on touch.
 */
export function FolderItem({
  label,
  icon,
  onOpen,
  sublabel,
}: {
  label: string;
  icon: ReactNode;
  onOpen: () => void;
  sublabel?: string;
}) {
  const lastTap = useRef(0);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (e.detail === 0 || window.matchMedia("(pointer: coarse)").matches) {
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
      title={sublabel ? `${label} - ${sublabel}` : label}
      className="group flex w-[104px] flex-col items-center gap-1 p-2 text-center"
    >
      <span className="grid size-8 place-items-center">{icon}</span>
      <span className="px-[3px] text-[13px] leading-tight group-hover:bg-w95-navy group-hover:text-white">
        {label}
      </span>
    </button>
  );
}
