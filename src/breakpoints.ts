import fs from "fs";
import path from "path";
import type { NavigationBreakpoints } from "./types";
import { warnOnce } from "./util/warn";

export interface Breakpoints {
  mobile: string;
  desktop: string;
}

/** Quartz's own defaults from `quartz/styles/variables.scss`. */
export const defaultBreakpoints: Breakpoints = { mobile: "800px", desktop: "1200px" };

export const BREAKPOINTS_FILE = path.join("quartz", "styles", "variables.scss");

export const MOBILE_PLACEHOLDER = "__NAV_BP_MOBILE__";
export const DESKTOP_PLACEHOLDER = "__NAV_BP_DESKTOP__";

/** Reads `$breakpoints: (mobile: 800px, desktop: 1200px)` from the contents of `variables.scss`. */
export function parseBreakpoints(scss: string): Partial<Breakpoints> {
  const map = /\$breakpoints\s*:\s*\(([^)]*)\)/.exec(scss);
  if (!map) return {};
  const out: Partial<Breakpoints> = {};
  for (const entry of map[1]!.split(",")) {
    const m = /^\s*(mobile|desktop)\s*:\s*([0-9.]+(?:px|rem|em))\s*$/.exec(entry);
    if (m) out[m[1] as keyof Breakpoints] = m[2]!;
  }
  return out;
}

/**
 * Quartz 5 has no configuration option for breakpoints; sites change them in
 * `quartz/styles/variables.scss`. The plugin runs inside the site's build, so the file is read
 * relative to the working directory.
 */
export function readProjectBreakpoints(cwd = process.cwd()): Partial<Breakpoints> | undefined {
  const file = path.join(cwd, BREAKPOINTS_FILE);
  try {
    if (!fs.existsSync(file)) return undefined;
    return parseBreakpoints(fs.readFileSync(file, "utf8"));
  } catch {
    return undefined;
  }
}

function validLength(value: unknown): string | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return `${value}px`;
  if (typeof value === "string" && /^[0-9.]+(px|rem|em)$/.test(value.trim())) return value.trim();
  return undefined;
}

export function resolveBreakpoints(
  override: NavigationBreakpoints | undefined,
  cwd = process.cwd(),
): Breakpoints {
  const project = readProjectBreakpoints(cwd);
  if (!project) {
    warnOnce(
      "breakpoints-file",
      `Could not read ${BREAKPOINTS_FILE}; using ${defaultBreakpoints.mobile} / ${defaultBreakpoints.desktop} as breakpoints.`,
    );
  }
  return {
    mobile: validLength(override?.mobile) ?? project?.mobile ?? defaultBreakpoints.mobile,
    desktop: validLength(override?.desktop) ?? project?.desktop ?? defaultBreakpoints.desktop,
  };
}

/** Replaces the placeholders the stylesheet uses in its media queries. */
export function applyBreakpoints(css: string, bp: Breakpoints): string {
  return css.split(MOBILE_PLACEHOLDER).join(bp.mobile).split(DESKTOP_PLACEHOLDER).join(bp.desktop);
}
