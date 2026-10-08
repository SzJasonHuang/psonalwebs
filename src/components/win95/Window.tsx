"use client";

import { useRef, type ReactNode } from "react";
import { clsx } from "clsx";
import {
  CloseGlyph,
  MaximizeGlyph,
  MinimizeGlyph,
  RestoreGlyph,
} from "./Icons";
import type { Geometry, WindowInstance } from "./types";

const TITLE_BAR_ACTIVE = "linear-gradient(90deg, #000080 0%, #1084d0 100%)";
const TITLE_BAR_IDLE = "#757579";

const MIN_WIDTH = 280;
const MIN_HEIGHT = 180;

type Props = {
  win: WindowInstance;
  active: boolean;
  icon: ReactNode;
  /** Size of the desktop area, for clamping. 0 means "not measured yet". */
  bounds: { width: number; height: number };
  menu?: string[];
  children: ReactNode;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onGeometry: (geo: Partial<Geometry>) => void;
};

/** A 95 title-bar button: 17x17, raised, pressed-in while held. */
function ControlButton({
  label,
  onClick,
  children,
  className,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      // Keep mousedown from starting a drag or stealing focus mid-press.
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={clsx(
        "grid size-[17px] place-items-center bg-w95-face bevel-raised active:bevel-pressed",
        className
      )}
    >
      <span className="pointer-events-none translate-y-px">{children}</span>
    </button>
  );
}

export function Window({
  win,
  active,
  icon,
  bounds,
  menu,
  children,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onGeometry,
}: Props) {
  // Offset from the pointer to the window origin, captured on drag start.
  const drag = useRef<{ dx: number; dy: number } | null>(null);
  const resize = useRef<{ x: number; y: number; w: number; h: number } | null>(
    null
  );

  function clampX(x: number) {
    if (!bounds.width) return x;
    // Always leave enough title bar on screen to grab.
    return Math.min(Math.max(x, -win.width + 90), bounds.width - 90);
  }

  function clampY(y: number) {
    if (!bounds.height) return y;
    return Math.min(Math.max(y, 0), bounds.height - 24);
  }

  function startDrag(e: React.PointerEvent<HTMLDivElement>) {
    if (win.maximized || e.button !== 0) return;
    onFocus();
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { dx: e.clientX - win.x, dy: e.clientY - win.y };
  }

  function onDragMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    onGeometry({
      x: clampX(e.clientX - drag.current.dx),
      y: clampY(e.clientY - drag.current.dy),
    });
  }

  function endDrag(e: React.PointerEvent<HTMLDivElement>) {
    drag.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }

  function startResize(e: React.PointerEvent<HTMLDivElement>) {
    if (win.maximized || e.button !== 0) return;
    e.stopPropagation();
    onFocus();
    e.currentTarget.setPointerCapture(e.pointerId);
    resize.current = {
      x: e.clientX,
      y: e.clientY,
      w: win.width,
      h: win.height,
    };
  }

  function onResizeMove(e: React.PointerEvent<HTMLDivElement>) {
    const start = resize.current;
    if (!start) return;
    onGeometry({
      width: Math.max(MIN_WIDTH, start.w + (e.clientX - start.x)),
      height: Math.max(MIN_HEIGHT, start.h + (e.clientY - start.y)),
    });
  }

  const geometry = win.maximized
    ? { left: 0, top: 0, width: "100%", height: "100%" }
    : { left: win.x, top: win.y, width: win.width, height: win.height };

  return (
    <div
      role="dialog"
      aria-label={win.title}
      onPointerDown={onFocus}
      style={{ ...geometry, zIndex: win.z, display: win.minimized ? "none" : undefined }}
      className="absolute flex flex-col bg-w95-face bevel-raised p-[3px]"
    >
      {/* Title bar */}
      <div
        onPointerDown={startDrag}
        onPointerMove={onDragMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={onToggleMaximize}
        style={{ background: active ? TITLE_BAR_ACTIVE : TITLE_BAR_IDLE }}
        className={clsx(
          "flex h-[24px] shrink-0 touch-none select-none items-center gap-1 pl-[3px] pr-[2px]",
          win.maximized ? "cursor-default" : "cursor-move"
        )}
      >
        <span className="grid size-4 shrink-0 place-items-center">{icon}</span>
        <span className="min-w-0 flex-1 truncate text-[13px] font-bold text-white">
          {win.title}
        </span>
        <div className="flex shrink-0 items-center gap-[2px]">
          <ControlButton label="Minimize" onClick={onMinimize}>
            <MinimizeGlyph />
          </ControlButton>
          <ControlButton
            label={win.maximized ? "Restore" : "Maximize"}
            onClick={onToggleMaximize}
          >
            {win.maximized ? <RestoreGlyph /> : <MaximizeGlyph />}
          </ControlButton>
          <ControlButton label="Close" onClick={onClose} className="ml-[2px]">
            <CloseGlyph />
          </ControlButton>
        </div>
      </div>

      {/* Menu bar — decorative, as in the original */}
      {menu && (
        <div className="flex shrink-0 select-none items-center gap-1 px-[2px] py-[2px] text-[13px]">
          {menu.map((item) => (
            <span
              key={item}
              className="px-[6px] py-[1px] hover:bg-w95-navy hover:text-white"
            >
              <u>{item.slice(0, 1)}</u>
              {item.slice(1)}
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>

      {/* Resize grip */}
      {!win.maximized && (
        <div
          onPointerDown={startResize}
          onPointerMove={onResizeMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className="absolute bottom-0 right-0 size-[16px] cursor-nwse-resize touch-none"
          aria-hidden="true"
        >
          <svg viewBox="0 0 16 16" className="size-full" shapeRendering="crispEdges">
            <g fill="#ffffff">
              <rect x="11" y="4" width="2" height="2" />
              <rect x="7" y="8" width="2" height="2" />
              <rect x="11" y="8" width="2" height="2" />
              <rect x="3" y="12" width="2" height="2" />
              <rect x="7" y="12" width="2" height="2" />
              <rect x="11" y="12" width="2" height="2" />
            </g>
            <g fill="#808080">
              <rect x="12" y="5" width="1" height="1" />
              <rect x="8" y="9" width="1" height="1" />
              <rect x="12" y="9" width="1" height="1" />
              <rect x="4" y="13" width="1" height="1" />
              <rect x="8" y="13" width="1" height="1" />
              <rect x="12" y="13" width="1" height="1" />
            </g>
          </svg>
        </div>
      )}
    </div>
  );
}
