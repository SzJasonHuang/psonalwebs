"use client";

import type { Project } from "@/data/projects";
import { Button95, GroupBox, StatusBar, Well } from "../Chrome";
import { PhotoDisplay } from "../PhotoDisplay";

export function ProjectWindow({ project }: { project: Project }) {
  const images = project.images ?? [];

  return (
    <>
      <Well className="px-6 py-5">
        <div className="max-w-[80ch]">
          <h1 className="text-[17px] font-bold">{project.title}</h1>

          <PhotoDisplay
            images={images}
            alt={project.title}
            className="mt-3"
            sizes="(min-width: 768px) 560px, 100vw"
          />

          <p className="mt-4 text-[13px] leading-relaxed">
            {project.description}
          </p>

          <GroupBox label="Built with" className="mt-4">
            <ul className="flex flex-wrap gap-x-3 gap-y-1 text-[13px]">
              {project.tags.map((tag) => (
                <li key={tag}>· {tag}</li>
              ))}
            </ul>
          </GroupBox>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.liveUrl && (
              <Button95 href={project.liveUrl}>Open Live Site</Button95>
            )}
            {project.repoUrl && (
              <Button95 href={project.repoUrl}>View Source</Button95>
            )}
          </div>
        </div>
      </Well>
      <StatusBar
        panels={[
          project.title,
          images.length > 0
            ? `${images.length} screenshot${images.length === 1 ? "" : "s"}`
            : "No preview",
          `${project.tags.length} technologies`,
        ]}
      />
    </>
  );
}
