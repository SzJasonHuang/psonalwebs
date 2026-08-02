import Link from "next/link";
import { clsx } from "clsx";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
  download?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-150";

const variants = {
  primary: "bg-accent text-accent-foreground hover:bg-accent/90",
  secondary:
    "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border border-zinc-200",
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
  download,
}: ButtonProps) {
  const classes = clsx(base, variants[variant], className);
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  if (download || isExternal) {
    return (
      <a
        href={href}
        className={classes}
        download={download}
        target={isExternal && !download ? "_blank" : undefined}
        rel={isExternal && !download ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
