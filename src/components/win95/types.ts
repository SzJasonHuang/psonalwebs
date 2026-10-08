export type WindowKind =
  | "about"
  | "resume"
  | "projects"
  | "project"
  | "blog"
  | "post"
  | "computer";

/** What to open. `slug` identifies which project or post. */
export type WindowSpec = {
  kind: WindowKind;
  slug?: string;
};

export type Geometry = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type WindowInstance = WindowSpec &
  Geometry & {
    id: string;
    title: string;
    z: number;
    minimized: boolean;
    maximized: boolean;
    /** Geometry to return to when un-maximizing. */
    restore?: Geometry;
  };
