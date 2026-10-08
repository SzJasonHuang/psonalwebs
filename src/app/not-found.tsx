import Link from "next/link";
import { WarningIcon } from "@/components/win95/Icons";

export default function NotFound() {
  return (
    <div className="grid h-full place-items-center bg-w95-desktop p-4">
      <div className="w-full max-w-[400px] bg-w95-face bevel-raised p-[3px]">
        <div
          className="flex h-[24px] items-center px-[3px]"
          style={{
            background: "linear-gradient(90deg, #000080 0%, #1084d0 100%)",
          }}
        >
          <span className="text-[13px] font-bold text-white">
            Portfolio 95
          </span>
        </div>

        <div className="flex gap-4 p-5">
          <WarningIcon className="size-8 shrink-0" />
          <div className="min-w-0">
            <p className="text-[13px] font-bold">
              This page could not be found.
            </p>
            <p className="mt-2 text-[13px] leading-relaxed">
              The program has performed an illegal operation, or the page
              simply doesn&apos;t exist.
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-2 pb-5">
          <Link
            href="/"
            className="inline-flex min-w-[86px] items-center justify-center bg-w95-face px-3 py-[5px] text-[13px] bevel-raised active:bevel-pressed"
          >
            Back to Desktop
          </Link>
        </div>
      </div>
    </div>
  );
}
