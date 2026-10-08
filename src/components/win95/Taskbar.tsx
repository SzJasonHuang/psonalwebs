"use client";

import { clsx } from "clsx";
import type { ReactNode } from "react";
import { WindowsLogo } from "./Icons";
import { Clock } from "./Clock";
import { StartMenu } from "./StartMenu";
import type { WindowInstance, WindowSpec } from "./types";

type Props = {
  windows: WindowInstance[];
  activeId: string | null;
  startOpen: boolean;
  iconFor: (win: WindowInstance) => ReactNode;
  onToggleStart: () => void;
  onCloseStart: () => void;
  onOpen: (spec: WindowSpec) => void;
  onSelectWindow: (id: string) => void;
};

export function Taskbar({
  windows,
  activeId,
  startOpen,
  iconFor,
  onToggleStart,
  onCloseStart,
  onOpen,
  onSelectWindow,
}: Props) {
  return (
    <div className="relative z-[10000] flex h-[35px] shrink-0 items-center gap-[3px] border-t-2 border-t-w95-white bg-w95-face px-[2px]">
      {startOpen && <StartMenu onOpen={onOpen} onClose={onCloseStart} />}

      <button
        type="button"
        data-start-button
        onClick={onToggleStart}
        aria-expanded={startOpen}
        className={clsx(
          "flex h-[28px] w-[66px] shrink-0 items-center gap-1 px-[4px] font-bold",
          startOpen ? "bevel-pressed" : "bevel-raised"
        )}
      >
        <WindowsLogo className="size-[19px]" />
        <span className="text-[14px]">Start</span>
      </button>

      <div className="h-[24px] w-[2px] bevel-groove" />

      {/* Open windows */}
      <div className="flex min-w-0 flex-1 items-center gap-[3px] overflow-hidden">
        {windows.map((win) => {
          const isActive = win.id === activeId && !win.minimized;
          return (
            <button
              key={win.id}
              type="button"
              onClick={() => onSelectWindow(win.id)}
              className={clsx(
                "flex h-[24px] min-w-0 max-w-[160px] flex-1 items-center gap-[5px] px-[5px] text-left text-[13px]",
                isActive ? "bevel-pressed font-bold" : "bevel-raised"
              )}
            >
              <span className="grid size-4 shrink-0 place-items-center">
                {iconFor(win)}
              </span>
              <span className="min-w-0 truncate">{win.title}</span>
            </button>
          );
        })}
      </div>

      <Clock />
    </div>
  );
}
