"use client";

import { site } from "@/data/site";
import { Button95, StatusBar, Well } from "../Chrome";
import { InfoIcon } from "../Icons";
import type { WindowSpec } from "../types";

export function AboutWindow({ onOpen }: { onOpen: (spec: WindowSpec) => void }) {
  return (
    <>
      <Well className="px-6 py-5">
        <div className="flex items-start gap-4">
          <InfoIcon className="size-8 shrink-0" />
          <div className="min-w-0">
            <h1 className="text-[17px] font-bold">{site.name}</h1>
            <p className="mt-[2px] text-[13px] text-[#444]">
              Software Engineer · {site.location}
            </p>
          </div>
        </div>

        <div className="my-4 h-[2px] bevel-groove" />

        <p className="text-[13px] leading-relaxed">{site.tagline}</p>
        <p className="mt-3 text-[13px] leading-relaxed">
          I care about clean interfaces, dependable systems, and writing code
          that&apos;s easy for the next person to read - currently a Product
          Development Engineer co-op at Critical Environment Technologies.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Button95 onClick={() => onOpen({ kind: "resume" })}>
            Open Resume
          </Button95>
          <Button95 onClick={() => onOpen({ kind: "projects" })}>
            Open Projects
          </Button95>
          <Button95 href={`mailto:${site.email}`}>Email Me</Button95>
        </div>
      </Well>
      <StatusBar panels={[site.email, site.location]} />
    </>
  );
}
