"use client";

import type { ReactNode } from "react";
import { FolderItem, StatusBar, Well } from "../Chrome";

export type FolderEntry = {
  key: string;
  label: string;
  sublabel?: string;
  icon: ReactNode;
  onOpen: () => void;
};

/** An Explorer-style icon grid, shared by the Projects and Blog folders. */
export function FolderWindow({
  entries,
  hint,
  noun,
}: {
  entries: FolderEntry[];
  hint: string;
  noun: string;
}) {
  return (
    <>
      <Well>
        <div className="flex flex-wrap content-start p-3">
          {entries.map((entry) => (
            <FolderItem
              key={entry.key}
              label={entry.label}
              sublabel={entry.sublabel}
              icon={entry.icon}
              onOpen={entry.onOpen}
            />
          ))}
        </div>
      </Well>
      <StatusBar
        panels={[`${entries.length} ${noun}${entries.length === 1 ? "" : "s"}`, hint]}
      />
    </>
  );
}
