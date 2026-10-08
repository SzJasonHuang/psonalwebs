"use client";

import { site } from "@/data/site";
import { Button95 } from "./Chrome";
import { WindowsLogo } from "./Icons";

/**
 * The "Enter Network Password" dialog. There is no real password — the
 * button is the door.
 */
export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="absolute inset-0 z-[19000] grid place-items-center bg-w95-desktop p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onLogin();
        }}
        className="w-full max-w-[380px] bg-w95-face bevel-raised p-[3px]"
      >
        <div
          className="flex h-[24px] items-center px-[3px]"
          style={{
            background: "linear-gradient(90deg, #000080 0%, #1084d0 100%)",
          }}
        >
          <span className="text-[13px] font-bold text-white">
            Enter Network Password
          </span>
        </div>

        <div className="flex gap-4 p-4">
          <WindowsLogo className="mt-1 size-9 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[13px] leading-relaxed">
              Type a user name and password to log on to {site.name}&apos;s
              portfolio.
            </p>

            <div className="mt-4 space-y-2">
              <label className="flex items-center gap-2 text-[13px]">
                <span className="w-[68px] shrink-0">User name:</span>
                <input
                  name="username"
                  defaultValue="Guest"
                  autoComplete="off"
                  className="min-w-0 flex-1 bg-white px-1 py-[3px] text-[13px] bevel-sunken outline-none"
                />
              </label>
              <label className="flex items-center gap-2 text-[13px]">
                <span className="w-[68px] shrink-0">Password:</span>
                <input
                  name="password"
                  type="password"
                  defaultValue="hireme"
                  autoComplete="off"
                  className="min-w-0 flex-1 bg-white px-1 py-[3px] text-[13px] bevel-sunken outline-none"
                />
              </label>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <Button95 onClick={onLogin} className="!min-w-[72px]">
                OK
              </Button95>
              <Button95 onClick={onLogin} className="!min-w-[72px]">
                Cancel
              </Button95>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
