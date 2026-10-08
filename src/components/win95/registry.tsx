import type { ReactNode } from "react";
import { projects } from "@/data/projects";
import type { Post } from "@/types/post";
import {
  ComputerIcon,
  DocumentIcon,
  FolderOpenIcon,
  GlobeIcon,
  InfoIcon,
  ProjectsIcon,
  ResumeIcon,
} from "./Icons";
import type { WindowSpec } from "./types";
import type { WindowMeta } from "./useWindows";
import { AboutWindow } from "./windows/AboutWindow";
import { ComputerWindow } from "./windows/ComputerWindow";
import { FolderWindow } from "./windows/FolderWindow";
import { PostWindow } from "./windows/PostWindow";
import { ProjectWindow } from "./windows/ProjectWindow";
import { ProjectsWindow } from "./windows/ProjectsWindow";
import { ResumeWindow } from "./windows/ResumeWindow";

const DEFAULTS: Record<WindowSpec["kind"], Omit<WindowMeta, "title">> = {
  about: { width: 490, height: 420 },
  resume: { width: 1220, height: 820, maximized: true },
  projects: { width: 700, height: 470 },
  project: { width: 640, height: 600 },
  blog: { width: 540, height: 360 },
  post: { width: 1220, height: 820, maximized: true },
  computer: { width: 510, height: 450 },
};

export function windowIcon(spec: WindowSpec, className = "size-full"): ReactNode {
  switch (spec.kind) {
    case "about":
      return <InfoIcon className={className} />;
    case "resume":
      return <ResumeIcon className={className} />;
    case "projects":
      return <ProjectsIcon className={className} />;
    case "project":
      return <GlobeIcon className={className} />;
    case "blog":
      return <FolderOpenIcon className={className} />;
    case "post":
      return <DocumentIcon className={className} />;
    case "computer":
      return <ComputerIcon className={className} />;
  }
}

/** Title + default size for a window, resolved before it opens. */
export function resolveWindow(spec: WindowSpec, posts: Post[]): WindowMeta {
  const size = DEFAULTS[spec.kind];

  switch (spec.kind) {
    case "about":
      return { ...size, title: "About Me" };
    case "resume":
      return { ...size, title: "Resume" };
    case "projects":
      return { ...size, title: "Projects" };
    case "blog":
      return { ...size, title: "Blog" };
    case "computer":
      return { ...size, title: "My Computer" };
    case "project": {
      const project = projects.find((p) => p.slug === spec.slug);
      return { ...size, title: project ? project.title : "Project" };
    }
    case "post": {
      const post = posts.find((p) => p.slug === spec.slug);
      return { ...size, title: post ? post.title : "Document" };
    }
  }
}

/** The decorative menu bar shown on folder and document windows. */
export function windowMenu(spec: WindowSpec): string[] | undefined {
  switch (spec.kind) {
    case "projects":
    case "blog":
      return ["File", "Edit", "View", "Help"];
    case "resume":
    case "post":
    case "project":
      return ["File", "Edit", "View"];
    default:
      return undefined;
  }
}

export function renderWindow(
  spec: WindowSpec,
  posts: Post[],
  open: (spec: WindowSpec) => void
): ReactNode {
  switch (spec.kind) {
    case "about":
      return <AboutWindow onOpen={open} />;

    case "resume":
      return <ResumeWindow />;

    case "computer":
      return <ComputerWindow />;

    case "projects":
      return (
        <ProjectsWindow
          onOpen={(slug) => open({ kind: "project", slug })}
        />
      );

    case "blog":
      return (
        <FolderWindow
          noun="document"
          hint="Double-click to open"
          entries={posts.map((post) => ({
            key: post.slug,
            label: post.title,
            sublabel: post.readingTime,
            icon: <DocumentIcon className="size-full" />,
            onOpen: () => open({ kind: "post", slug: post.slug }),
          }))}
        />
      );

    case "project": {
      const project = projects.find((p) => p.slug === spec.slug);
      if (!project) return <MissingItem what="project" />;
      return <ProjectWindow project={project} />;
    }

    case "post": {
      const post = posts.find((p) => p.slug === spec.slug);
      if (!post) return <MissingItem what="document" />;
      return <PostWindow post={post} />;
    }
  }
}

function MissingItem({ what }: { what: string }) {
  return (
    <div className="m-[2px] flex flex-1 items-center justify-center bg-white bevel-sunken p-6 text-center text-[13px]">
      That {what} could not be found.
    </div>
  );
}
