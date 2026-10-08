"use client";

import { useCallback, useMemo, useReducer } from "react";
import type { Geometry, WindowInstance, WindowSpec } from "./types";

/** Where the first window lands, and how far each subsequent one steps. */
const ORIGIN = { x: 48, y: 32 };
const CASCADE = 26;
const CASCADE_WRAP = 6;
/** Breathing room kept between a window and the edges of the desktop. */
const FIT_MARGIN = 16;

export type WindowMeta = {
  title: string;
  width: number;
  height: number;
};

export type ResolveWindow = (spec: WindowSpec) => WindowMeta;

type State = {
  windows: WindowInstance[];
  topZ: number;
  /** Monotonic counter for ids and cascade offsets. */
  seq: number;
};

type Action =
  | { type: "open"; spec: WindowSpec; meta: WindowMeta }
  | { type: "close"; id: string }
  | { type: "focus"; id: string }
  | { type: "minimize"; id: string }
  | { type: "toggleMax"; id: string }
  | { type: "geometry"; id: string; geo: Partial<Geometry> }
  | { type: "taskbar"; id: string }
  | { type: "maximizeAll" }
  | { type: "fit"; bounds: { width: number; height: number } };

function makeWindow(
  spec: WindowSpec,
  meta: WindowMeta,
  seq: number,
  z: number
): WindowInstance {
  const step = seq % CASCADE_WRAP;
  return {
    ...spec,
    id: `win-${seq + 1}`,
    title: meta.title,
    width: meta.width,
    height: meta.height,
    x: ORIGIN.x + step * CASCADE,
    y: ORIGIN.y + step * CASCADE,
    z,
    minimized: false,
    maximized: false,
  };
}

/** The window whose z is highest among those not minimized. */
function topmost(windows: WindowInstance[]): WindowInstance | null {
  return windows
    .filter((w) => !w.minimized)
    .reduce<WindowInstance | null>(
      (best, w) => (!best || w.z > best.z ? w : best),
      null
    );
}

function raise(state: State, id: string): State {
  const win = state.windows.find((w) => w.id === id);
  if (!win) return state;
  // Already on top and visible — nothing to do.
  if (!win.minimized && win.z === state.topZ) return state;
  const z = state.topZ + 1;
  return {
    ...state,
    topZ: z,
    windows: state.windows.map((w) =>
      w.id === id ? { ...w, z, minimized: false } : w
    ),
  };
}

function maximize(w: WindowInstance): WindowInstance {
  if (w.maximized) return w;
  return {
    ...w,
    maximized: true,
    restore: { x: w.x, y: w.y, width: w.width, height: w.height },
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "open": {
      // One window per thing — re-focus rather than opening a duplicate.
      const existing = state.windows.find(
        (w) => w.kind === action.spec.kind && w.slug === action.spec.slug
      );
      if (existing) return raise(state, existing.id);

      const z = state.topZ + 1;
      return {
        seq: state.seq + 1,
        topZ: z,
        windows: [
          ...state.windows,
          makeWindow(action.spec, action.meta, state.seq, z),
        ],
      };
    }

    case "close":
      return {
        ...state,
        windows: state.windows.filter((w) => w.id !== action.id),
      };

    case "focus":
      return raise(state, action.id);

    case "minimize":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, minimized: true } : w
        ),
      };

    case "toggleMax":
      return {
        ...state,
        windows: state.windows.map((w) => {
          if (w.id !== action.id) return w;
          if (!w.maximized) return maximize(w);
          const { restore, ...rest } = w;
          return { ...rest, ...restore, maximized: false };
        }),
      };

    case "geometry":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, ...action.geo } : w
        ),
      };

    case "taskbar": {
      const win = state.windows.find((w) => w.id === action.id);
      if (!win) return state;
      // Clicking the window that already has focus minimizes it.
      if (!win.minimized && topmost(state.windows)?.id === win.id) {
        return {
          ...state,
          windows: state.windows.map((w) =>
            w.id === action.id ? { ...w, minimized: true } : w
          ),
        };
      }
      return raise(state, action.id);
    }

    case "maximizeAll":
      return { ...state, windows: state.windows.map(maximize) };

    case "fit": {
      const { width: bw, height: bh } = action.bounds;
      if (!bw || !bh) return state;

      let changed = false;
      const windows = state.windows.map((w) => {
        if (w.maximized) return w;
        const width = Math.min(w.width, bw - FIT_MARGIN);
        const height = Math.min(w.height, bh - FIT_MARGIN);
        const x = Math.max(0, Math.min(w.x, bw - width));
        const y = Math.max(0, Math.min(w.y, bh - height));
        if (
          width === w.width &&
          height === w.height &&
          x === w.x &&
          y === w.y
        ) {
          return w;
        }
        changed = true;
        return { ...w, width, height, x, y };
      });

      // Returning the identical state when nothing moved keeps the effect
      // that dispatches this from re-rendering forever.
      return changed ? { ...state, windows } : state;
    }
  }
}

/**
 * Window manager: open/close, focus + z-order, minimize, maximize, geometry.
 * Ids and initial positions come from a counter rather than randomness or
 * viewport size, so the server and client render identically.
 */
export function useWindows(resolve: ResolveWindow, initial?: WindowSpec) {
  const [state, dispatch] = useReducer(
    reducer,
    initial,
    (spec): State =>
      spec
        ? { windows: [makeWindow(spec, resolve(spec), 0, 1)], topZ: 1, seq: 1 }
        : { windows: [], topZ: 0, seq: 0 }
  );

  const open = useCallback(
    (spec: WindowSpec) => dispatch({ type: "open", spec, meta: resolve(spec) }),
    [resolve]
  );

  const actions = useMemo(
    () => ({
      close: (id: string) => dispatch({ type: "close", id }),
      focus: (id: string) => dispatch({ type: "focus", id }),
      minimize: (id: string) => dispatch({ type: "minimize", id }),
      toggleMaximize: (id: string) => dispatch({ type: "toggleMax", id }),
      setGeometry: (id: string, geo: Partial<Geometry>) =>
        dispatch({ type: "geometry", id, geo }),
      toggleFromTaskbar: (id: string) => dispatch({ type: "taskbar", id }),
      maximizeAll: () => dispatch({ type: "maximizeAll" }),
      fit: (bounds: { width: number; height: number }) =>
        dispatch({ type: "fit", bounds }),
    }),
    []
  );

  return {
    windows: state.windows,
    activeId: topmost(state.windows)?.id ?? null,
    open,
    ...actions,
  };
}
