"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { projects } from "@/data/projects";
import { Button95, StatusBar } from "../Chrome";
import { GlobeIcon } from "../Icons";
import { PhotoDisplay } from "../PhotoDisplay";

/**
 * Explorer-style browser: a list of projects on the left, a preview pane with
 * the screenshot and summary on the right. Container queries (not viewport
 * breakpoints) drive the stacking, because the window is resizable
 * independently of the page.
 */
export function ProjectsWindow({
  onOpen,
}: {
  onOpen: (slug: string) => void;
}) {
  const [selected, setSelected] = useState(projects[0]?.slug ?? "");
  const project = projects.find((p) => p.slug === selected) ?? projects[0];

  return (
    <>
      <div className="@container flex min-h-0 flex-1 flex-col p-[2px]">
        <div className="flex min-h-0 flex-1 flex-col gap-[3px] @md:flex-row">
          {/* Project list */}
          <ul
            className="min-h-[74px] shrink-0 overflow-auto bg-white bevel-sunken p-[2px] @md:h-auto @md:w-[38%]"
            role="listbox"
            aria-label="Projects"
          >
            {projects.map((p) => {
              const isSelected = p.slug === project?.slug;
              return (
                <li key={p.slug}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => setSelected(p.slug)}
                    onDoubleClick={() => onOpen(p.slug)}
                    className={clsx(
                      "flex w-full items-center gap-2 px-2 py-[5px] text-left text-[13px]",
                      isSelected
                        ? "bg-w95-navy text-white"
                        : "hover:bg-w95-navy/10"
                    )}
                  >
                    <GlobeIcon className="size-4 shrink-0" />
                    <span className="truncate">{p.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Preview pane */}
          {project && (
            <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white bevel-sunken px-4 py-3">
              {/* The photo absorbs the pane's spare height so a wide window
                  doesn't leave a block of empty white below the buttons. */}
              <PhotoDisplay
                key={project.slug}
                fill
                images={project.images ?? []}
                alt={project.title}
                className="min-h-[120px] flex-1"
                sizes="(min-width: 768px) 420px, 100vw"
              />

              <h2 className="mt-3 shrink-0 text-[14px] font-bold">
                {project.title}
              </h2>
              {/* Clamped to whole lines so the preview never cuts a line in
                  half, and the buttons stay in view. */}
              <p className="mt-1 line-clamp-3 shrink-0 text-[13px] leading-relaxed text-[#333]">
                {project.description}
              </p>

              <p className="mt-2 shrink-0 truncate text-[12px] text-[#555]">
                {project.tags.slice(0, 5).join(" · ")}
              </p>

              <div className="mt-3 flex shrink-0 flex-wrap gap-2">
                <Button95 onClick={() => onOpen(project.slug)}>Open</Button95>
                {project.liveUrl && (
                  <Button95 href={project.liveUrl}>Live Site</Button95>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <StatusBar
        panels={[
          `${projects.length} object${projects.length === 1 ? "" : "s"}`,
          project?.title ?? "",
        ]}
      />
    </>
  );
}
