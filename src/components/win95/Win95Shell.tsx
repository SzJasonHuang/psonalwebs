"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import type { Post } from "@/types/post";
import { BootScreen } from "./BootScreen";
import { Desktop } from "./Desktop";
import { LoginScreen } from "./LoginScreen";
import type { WindowSpec } from "./types";

type Stage = "boot" | "login" | "desktop";

const SESSION_KEY = "w95-booted";

/** sessionStorage never changes underneath us, so there is nothing to notify. */
const subscribe = () => () => {};

/**
 * Boot -> login -> desktop. The desktop is always mounted underneath the
 * overlays so the page's content is in the markup for crawlers, and so a
 * deep-linked window is ready the moment you log in.
 */
export function Win95Shell({
  posts,
  initial,
}: {
  posts: Post[];
  initial?: WindowSpec;
}) {
  const [stage, setStage] = useState<Stage>("boot");

  // Read sessionStorage through an external store so the server snapshot
  // (false) hydrates cleanly before the client value takes over. Startup
  // then only plays once per session.
  const alreadyBooted = useSyncExternalStore(
    subscribe,
    () => sessionStorage.getItem(SESSION_KEY) !== null,
    () => false
  );

  const finish = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setStage("desktop");
  }, []);

  const current: Stage = alreadyBooted ? "desktop" : stage;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Desktop posts={posts} initial={initial} />
      {current === "boot" && <BootScreen onDone={() => setStage("login")} />}
      {current === "login" && <LoginScreen onLogin={finish} />}
    </div>
  );
}
