/**
 * Pixel-style icons drawn inline so the site ships no binary art.
 * All are square, designed on a 32x32 grid, and render crisply at 16/24/32px.
 */

type IconProps = { className?: string };

const crisp = { shapeRendering: "crispEdges" as const };

export function FolderIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...crisp} aria-hidden="true">
      <path d="M2 7h11l3 3h14v18H2z" fill="#000" />
      <path d="M3 8h10l3 3h13v3H3z" fill="#ffdf7f" />
      <path d="M3 11h26v16H3z" fill="#f0c040" />
      <path d="M3 11h26v2H3z" fill="#ffe9a8" />
      <path d="M3 25h26v2H3z" fill="#c99a1e" />
    </svg>
  );
}

export function FolderOpenIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...crisp} aria-hidden="true">
      <path d="M2 7h11l3 3h13v17H2z" fill="#000" />
      <path d="M3 8h10l3 3h12v2H3z" fill="#ffdf7f" />
      <path d="M3 13h23v13H3z" fill="#e0b030" />
      <path d="M7 13h25l-5 13H3z" fill="#ffdf7f" />
      <path d="M7 13h25l-1 3H6z" fill="#fff0c0" />
    </svg>
  );
}

export function DocumentIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...crisp} aria-hidden="true">
      <path d="M6 2h14l6 6v22H6z" fill="#000" />
      <path d="M7 3h12v6h6v20H7z" fill="#fff" />
      <path d="M20 3l5 5h-5z" fill="#c0c0c0" />
      <g fill="#808080">
        <rect x="10" y="13" width="12" height="1" />
        <rect x="10" y="16" width="12" height="1" />
        <rect x="10" y="19" width="12" height="1" />
        <rect x="10" y="22" width="8" height="1" />
      </g>
    </svg>
  );
}

export function ResumeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...crisp} aria-hidden="true">
      <path d="M6 2h14l6 6v22H6z" fill="#000" />
      <path d="M7 3h12v6h6v20H7z" fill="#fff" />
      <path d="M20 3l5 5h-5z" fill="#c0c0c0" />
      <circle cx="13" cy="15" r="3" fill="#000080" />
      <path d="M9 22c0-2.5 1.8-4 4-4s4 1.5 4 4z" fill="#000080" />
      <g fill="#808080">
        <rect x="18" y="14" width="6" height="1" />
        <rect x="18" y="17" width="6" height="1" />
        <rect x="10" y="24" width="14" height="1" />
        <rect x="10" y="26" width="10" height="1" />
      </g>
    </svg>
  );
}

export function ComputerIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...crisp} aria-hidden="true">
      <path d="M3 4h26v18H3z" fill="#000" />
      <path d="M4 5h24v16H4z" fill="#c0c0c0" />
      <path d="M6 7h20v12H6z" fill="#000" />
      <path d="M7 8h18v10H7z" fill="#008080" />
      <path d="M7 8h18v3H7z" fill="#00a0a0" />
      <path d="M9 23h14v3H9z" fill="#000" />
      <path d="M10 24h12v1H10z" fill="#c0c0c0" />
      <path d="M5 26h22v4H5z" fill="#000" />
      <path d="M6 27h20v2H6z" fill="#c0c0c0" />
      <rect x="22" y="27" width="3" height="1" fill="#008000" />
    </svg>
  );
}

export function ProjectsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...crisp} aria-hidden="true">
      <path d="M2 7h11l3 3h14v18H2z" fill="#000" />
      <path d="M3 8h10l3 3h13v3H3z" fill="#a8c8f0" />
      <path d="M3 11h26v16H3z" fill="#6098d8" />
      <path d="M3 11h26v2H3z" fill="#c8dcf8" />
      <g fill="#fff">
        <rect x="8" y="16" width="4" height="7" />
        <rect x="14" y="14" width="4" height="9" />
        <rect x="20" y="18" width="4" height="5" />
      </g>
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...crisp} aria-hidden="true">
      <path d="M2 7h28v18H2z" fill="#000" />
      <path d="M3 8h26v16H3z" fill="#fff" />
      <path d="M3 8l13 10L29 8z" fill="#e0e0e0" />
      <path d="M3 8h26L16 19z" fill="#c0c0c0" />
    </svg>
  );
}

export function GlobeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...crisp} aria-hidden="true">
      <circle cx="16" cy="16" r="13" fill="#000" />
      <circle cx="16" cy="16" r="12" fill="#3080d0" />
      <path
        d="M4 16h24M16 4c4 4 4 20 0 24M16 4c-4 4-4 20 0 24"
        stroke="#fff"
        strokeWidth="1"
        fill="none"
      />
      <path d="M7 9c5 3 13 3 18 0M7 23c5-3 13-3 18 0" stroke="#fff" strokeWidth="1" fill="none" />
    </svg>
  );
}

export function InfoIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...crisp} aria-hidden="true">
      <circle cx="16" cy="16" r="13" fill="#000" />
      <circle cx="16" cy="16" r="12" fill="#fff" />
      <circle cx="16" cy="16" r="11" fill="#000080" />
      <rect x="14" y="8" width="4" height="4" fill="#fff" />
      <rect x="14" y="14" width="4" height="11" fill="#fff" />
    </svg>
  );
}

export function WarningIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...crisp} aria-hidden="true">
      <path d="M16 2L31 29H1z" fill="#000" />
      <path d="M16 5L28.5 28h-25z" fill="#ffe000" />
      <rect x="14" y="12" width="4" height="9" fill="#000" />
      <rect x="14" y="23" width="4" height="3" fill="#000" />
    </svg>
  );
}

/** The four-pane flag on the Start button. */
export function WindowsLogo({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M2 8.5L14 5v10.5H2z" fill="#ff3b30" />
      <path d="M15.5 4.6L30 1v14.5H15.5z" fill="#4cd964" />
      <path d="M2 17h12v10.5L2 24z" fill="#5ac8fa" />
      <path d="M15.5 17H30v14l-14.5-3.6z" fill="#ffcc00" />
    </svg>
  );
}

/* ---- Title-bar control glyphs ---- */

export function MinimizeGlyph() {
  return (
    <svg viewBox="0 0 10 10" className="size-[10px]" {...crisp} aria-hidden="true">
      <rect x="1" y="7" width="7" height="2" fill="#000" />
    </svg>
  );
}

export function MaximizeGlyph() {
  return (
    <svg viewBox="0 0 10 10" className="size-[10px]" {...crisp} aria-hidden="true">
      <rect x="1" y="1" width="8" height="8" fill="#000" />
      <rect x="2" y="3" width="6" height="5" fill="#c0c0c0" />
    </svg>
  );
}

export function RestoreGlyph() {
  return (
    <svg viewBox="0 0 10 10" className="size-[10px]" {...crisp} aria-hidden="true">
      <rect x="3" y="1" width="6" height="6" fill="#000" />
      <rect x="4" y="3" width="4" height="3" fill="#c0c0c0" />
      <rect x="1" y="3" width="6" height="6" fill="#000" />
      <rect x="2" y="5" width="4" height="3" fill="#c0c0c0" />
    </svg>
  );
}

export function CloseGlyph() {
  return (
    <svg viewBox="0 0 10 10" className="size-[10px]" aria-hidden="true">
      <path
        d="M2 2l6 6M8 2l-6 6"
        stroke="#000"
        strokeWidth="1.6"
        strokeLinecap="butt"
      />
    </svg>
  );
}
