"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { site } from "@/data/site";
import {
  ComputerIcon,
  DocumentIcon,
  GlobeIcon,
  InfoIcon,
  ProjectsIcon,
  ResumeIcon,
} from "./Icons";
import type { WindowSpec } from "./types";

type Props = {
  onOpen: (spec: WindowSpec) => void;
  onClose: () => void;
};

const PROGRAMS: { label: string; icon: ReactNode; spec: WindowSpec }[] = [
  { label: "About Me", icon: <InfoIcon className="size-6" />, spec: { kind: "about" } },
  { label: "Resume", icon: <ResumeIcon className="size-6" />, spec: { kind: "resume" } },
  { label: "Projects", icon: <ProjectsIcon className="size-6" />, spec: { kind: "projects" } },
  { label: "Blog", icon: <DocumentIcon className="size-6" />, spec: { kind: "blog" } },
  { label: "My Computer", icon: <ComputerIcon className="size-6" />, spec: { kind: "computer" } },
];

function Item({
  icon,
  label,
  onClick,
  href,
}: {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
}) {
  const className =
    "flex w-full items-center gap-3 px-2 py-[5px] text-left text-[14px] hover:bg-w95-navy hover:text-white";

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={className}
      >
        <span className="grid size-6 shrink-0 place-items-center">{icon}</span>
        {label}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      <span className="grid size-6 shrink-0 place-items-center">{icon}</span>
      {label}
    </button>
  );
}

export function StartMenu({ onOpen, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // Click-away and Escape both dismiss, as in the original.
  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      const target = e.target as Node;
      if (ref.current?.contains(target)) return;
      // The Start button toggles itself; don't double-handle its click.
      if ((target as HTMLElement).closest?.("[data-start-button]")) return;
      onClose();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute bottom-full left-0 mb-[2px] flex w-[224px] bg-w95-face bevel-raised p-[3px]"
    >
      {/* The vertical brand bar down the left edge */}
      <div
        className="w-[26px] shrink-0"
        style={{
          background: "linear-gradient(180deg, #000080 0%, #1084d0 100%)",
        }}
      >
        <div className="flex h-full items-end justify-center pb-3">
          <span
            className="whitespace-nowrap text-[17px] font-bold tracking-wide text-white"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            {site.name}
          </span>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        {PROGRAMS.map((program) => (
          <Item
            key={program.label}
            icon={program.icon}
            label={program.label}
            onClick={() => {
              onOpen(program.spec);
              onClose();
            }}
          />
        ))}

        <div className="my-[3px] h-[2px] bevel-groove" />

        {site.social.map((link) => (
          <Item
            key={link.href}
            icon={<GlobeIcon className="size-6" />}
            label={link.label}
            href={link.href}
          />
        ))}

        <div className="my-[3px] h-[2px] bevel-groove" />

        <Item
          icon={<DocumentIcon className="size-6" />}
          label="Download Resume"
          href="/resume.pdf"
        />
      </div>
    </div>
  );
}
