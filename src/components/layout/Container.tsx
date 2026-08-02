import { clsx } from "clsx";
import type { ReactNode } from "react";

export function Container({
  children,
  className,
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={clsx(
        "mx-auto w-full px-6",
        wide ? "max-w-5xl" : "max-w-3xl",
        className
      )}
    >
      {children}
    </div>
  );
}
