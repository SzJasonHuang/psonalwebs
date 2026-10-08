"use client";

import Image from "next/image";
import { useState } from "react";
import { clsx } from "clsx";

/** Small square nav button — narrower than the standard dialog Button95. */
function NavButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="bg-w95-face px-3 py-[3px] text-[13px] bevel-raised active:bevel-pressed"
    >
      {children}
    </button>
  );
}

/**
 * The photo display: a screenshot in a sunken frame, with gallery controls
 * when a project has more than one image.
 */
export function PhotoDisplay({
  images,
  alt,
  className,
  sizes = "(min-width: 768px) 560px, 100vw",
  fill = false,
}: {
  images: string[];
  alt: string;
  className?: string;
  sizes?: string;
  /** Grow to absorb the parent's spare height instead of a fixed aspect. */
  fill?: boolean;
}) {
  const [index, setIndex] = useState(0);
  // Guard against the caller swapping to a project with fewer images.
  const current = Math.min(index, Math.max(images.length - 1, 0));
  const count = images.length;

  return (
    <figure
      className={clsx(
        "bg-w95-face p-[3px] bevel-sunken",
        fill && "flex min-h-0 flex-col",
        className
      )}
    >
      <div
        className={clsx(
          "relative w-full overflow-hidden bg-black",
          fill ? "min-h-0 flex-1" : "aspect-video"
        )}
      >
        {count > 0 ? (
          <Image
            src={images[current]}
            alt={count > 1 ? `${alt} screenshot ${current + 1}` : `${alt} screenshot`}
            fill
            className="object-contain"
            sizes={sizes}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-w95-face">
            <div className="text-center text-[12px] text-[#555]">
              <svg
                viewBox="0 0 32 32"
                className="mx-auto mb-1 size-7 opacity-60"
                shapeRendering="crispEdges"
                aria-hidden="true"
              >
                <rect x="3" y="6" width="26" height="20" fill="#808080" />
                <rect x="4" y="7" width="24" height="18" fill="#c0c0c0" />
                <circle cx="11" cy="13" r="2" fill="#808080" />
                <path d="M5 24l7-8 5 5 4-3 6 6z" fill="#909090" />
              </svg>
              No preview available
            </div>
          </div>
        )}
      </div>

      {count > 1 && (
        <figcaption className="mt-[3px] flex shrink-0 items-center justify-between gap-2">
          <NavButton
            label="Previous screenshot"
            onClick={() => setIndex((current - 1 + count) % count)}
          >
            ◀
          </NavButton>
          <span className="bevel-groove px-3 py-[3px] text-[12px]">
            {current + 1} / {count}
          </span>
          <NavButton
            label="Next screenshot"
            onClick={() => setIndex((current + 1) % count)}
          >
            ▶
          </NavButton>
        </figcaption>
      )}
    </figure>
  );
}
