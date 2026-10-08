"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Post } from "@/types/post";
import {
  ComputerIcon,
  FolderIcon,
  InfoIcon,
  ProjectsIcon,
  ResumeIcon,
} from "./Icons";
import { DesktopIcon } from "./DesktopIcon";
import { Taskbar } from "./Taskbar";
import { Window } from "./Window";
import { renderWindow, resolveWindow, windowIcon, windowMenu } from "./registry";
import type { WindowInstance, WindowSpec } from "./types";
import { useWindows } from "./useWindows";

/** Below this width, floating windows are unusable — open them maximized. */
const FLOATING_MIN_WIDTH = 700;

const SHORTCUTS: { label: string; icon: React.ReactNode; spec: WindowSpec }[] = [
  { label: "About Me", icon: <InfoIcon className="size-full" />, spec: { kind: "about" } },
  { label: "My Computer", icon: <ComputerIcon className="size-full" />, spec: { kind: "computer" } },
  { label: "Resume", icon: <ResumeIcon className="size-full" />, spec: { kind: "resume" } },
  { label: "Projects", icon: <ProjectsIcon className="size-full" />, spec: { kind: "projects" } },
  { label: "Blog", icon: <FolderIcon className="size-full" />, spec: { kind: "blog" } },
];

export function Desktop({
  posts,
  initial,
}: {
  posts: Post[];
  initial?: WindowSpec;
}) {
  const areaRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const [selected, setSelected] = useState<string | null>(null);
  const [startOpen, setStartOpen] = useState(false);

  // Clamp a window's default size to whatever desktop space actually exists,
  // so it never opens larger than the screen it lands on.
  const resolve = useCallback(
    (spec: WindowSpec) => {
      const meta = resolveWindow(spec, posts);
      if (!bounds.width || !bounds.height) return meta;
      return {
        ...meta,
        width: Math.min(meta.width, bounds.width - 16),
        height: Math.min(meta.height, bounds.height - 16),
      };
    },
    [posts, bounds]
  );

  const {
    windows,
    activeId,
    open,
    close,
    focus,
    minimize,
    toggleMaximize,
    setGeometry,
    toggleFromTaskbar,
    maximizeAll,
    fit,
  } = useWindows(resolve, initial);

  // Track the desktop area so windows can be clamped inside it.
  useEffect(() => {
    const el = areaRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setBounds({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // On phones, windows are always full-screen. Everywhere else, keep them
  // inside the desktop when it shrinks.
  const narrow = bounds.width > 0 && bounds.width < FLOATING_MIN_WIDTH;
  useEffect(() => {
    if (narrow) {
      maximizeAll();
      return;
    }
    fit(bounds);
  }, [narrow, bounds, windows.length, maximizeAll, fit]);

  const openWindow = useCallback(
    (spec: WindowSpec) => {
      open(spec);
      setStartOpen(false);
    },
    [open]
  );

  const iconFor = useCallback(
    (win: WindowInstance) => windowIcon(win, "size-full"),
    []
  );

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div
        ref={areaRef}
        onPointerDown={(e) => {
          // Clicking bare desktop clears the icon selection.
          if (e.target === e.currentTarget) setSelected(null);
        }}
        style={{
          backgroundImage: "url(/wallpaper.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          // Keep the art blocky when it scales past its native size.
          imageRendering: "pixelated",
        }}
        // The teal shows through until the wallpaper loads.
        className="relative min-h-0 flex-1 overflow-hidden bg-w95-desktop"
      >
        {/* Shortcuts */}
        <div
          className="pointer-events-none absolute inset-0 flex flex-col flex-wrap content-start gap-1 p-2"
          style={{ maxHeight: "100%" }}
        >
          {SHORTCUTS.map((shortcut) => (
            <div key={shortcut.label} className="pointer-events-auto">
              <DesktopIcon
                label={shortcut.label}
                icon={shortcut.icon}
                selected={selected === shortcut.label}
                onSelect={() => setSelected(shortcut.label)}
                onOpen={() => openWindow(shortcut.spec)}
              />
            </div>
          ))}
        </div>

        {/* Windows */}
        {windows.map((win) => (
          <Window
            key={win.id}
            win={win}
            active={win.id === activeId}
            icon={windowIcon(win, "size-4")}
            bounds={bounds}
            menu={windowMenu(win)}
            onFocus={() => focus(win.id)}
            onClose={() => close(win.id)}
            onMinimize={() => minimize(win.id)}
            onToggleMaximize={() => toggleMaximize(win.id)}
            onGeometry={(geo) => setGeometry(win.id, geo)}
          >
            {renderWindow(win, posts, openWindow)}
          </Window>
        ))}
      </div>

      <Taskbar
        windows={windows}
        activeId={activeId}
        startOpen={startOpen}
        iconFor={iconFor}
        onToggleStart={() => setStartOpen((v) => !v)}
        onCloseStart={() => setStartOpen(false)}
        onOpen={openWindow}
        onSelectWindow={toggleFromTaskbar}
      />
    </div>
  );
}
