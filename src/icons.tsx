import { h, type ComponentChild } from "preact";
// The build inlines Lucide's icon table as a compact JSON string (see tsup.config.ts and
// vitest.config.ts); it is parsed on first use so sites without Lucide icons pay nothing.
import raw from "virtual:lucide-nodes";
import { readSvgIcon, svgIconRef } from "./svg-icons";
import { withInstance, type SvgNode } from "./svg-sanitize";
import { classNames } from "./util/lang";
import { warnOnce } from "./util/warn";

type IconNode = [tag: string, attrs: Record<string, string>][];

/** An icon's nodes, or for a former name the name of the icon it became. */
let table: Record<string, IconNode | string> | undefined;

function icons(): Record<string, IconNode | string> {
  if (!table) table = JSON.parse(raw) as Record<string, IconNode | string>;
  return table;
}

/** The nodes of an icon by its name or a former name (`triangle-alert` → `triangle-exclamation-point`). */
function nodesOf(name: string): IconNode | undefined {
  const all = icons();
  if (!Object.prototype.hasOwnProperty.call(all, name)) return undefined;
  const entry = all[name];
  const target = typeof entry === "string" ? all[entry] : entry;
  return Array.isArray(target) ? target : undefined;
}

export const LUCIDE_PREFIX = "lucide:";

/** `lucide:book-open` → `book-open`; anything else → `undefined`. */
export function lucideName(value: string | undefined): string | undefined {
  if (!value || !value.toLowerCase().startsWith(LUCIDE_PREFIX)) return undefined;
  return value.slice(LUCIDE_PREFIX.length).trim().toLowerCase();
}

export function hasLucideIcon(name: string): boolean {
  return nodesOf(name) !== undefined;
}

export function lucideIconNames(): string[] {
  return Object.keys(icons());
}

export interface LucideIconProps {
  name: string;
  className?: string;
  /** CSS length; defaults to `1em`. */
  size?: string;
}

/** Inline SVG of a Lucide icon, or nothing (with one warning) for an unknown name. */
export function LucideIcon({ name, className, size = "1em" }: LucideIconProps) {
  const node = nodesOf(name);
  if (!node) {
    warnOnce(`lucide:${name}`, `Unknown Lucide icon \`${name}\`; see https://lucide.dev/icons`);
    return null;
  }
  return (
    <svg
      class={classNames("lucide", `lucide-${name}`, className)}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      {node.map(([tag, attrs]) => h(tag, attrs))}
    </svg>
  );
}

export interface SvgFileIconProps {
  /** The icon value as written: `svg:<path>` or `svg-mono:<path>`. */
  value: string;
  /** The content folder the path is relative to (Quartz's `argv.directory`). */
  contentDir: string | undefined;
  className?: string;
  /** CSS length; defaults to `1em`. */
  size?: string;
  /** Distinguishes this drawing from others of the same file on the page (its ids). */
  instance?: string;
}

function svgChildren(nodes: SvgNode[]): ComponentChild[] {
  return nodes.map((n) =>
    typeof n === "string" ? n : h(n.tag, n.attrs, ...svgChildren(n.children)),
  );
}

/**
 * Inline SVG of a file from the content folder, sanitised (`svg-sanitize.ts`); nothing, with one
 * warning, when the file cannot be used. A file that lost parts on the way says so once as well.
 */
export function SvgFileIcon({
  value,
  contentDir,
  className,
  size = "1em",
  instance,
}: SvgFileIconProps) {
  const ref = svgIconRef(value);
  if (!ref) return null;
  if (!contentDir) {
    warnOnce(
      `svg:${value}`,
      `Icon \`${value}\`: the content folder is unknown, so the file cannot be read.`,
    );
    return null;
  }
  const icon = readSvgIcon(contentDir, ref);
  if (!icon.ok) {
    warnOnce(`svg:${value}`, `Icon \`${value}\`: ${icon.reason}.`);
    return null;
  }
  if (icon.removed > 0) {
    const style = icon.styled
      ? ", among them a <style>: colours set there are lost (export with presentation attributes)"
      : "";
    warnOnce(
      `svg-removed:${icon.file}:${ref.mono}`,
      `Icon \`${value}\`: ${icon.removed} part(s) that cannot be inlined safely were removed${style}.`,
    );
  }
  const root: SvgNode = { tag: "svg", attrs: icon.attrs, children: icon.children };
  const [drawn] =
    icon.idPrefix && instance ? withInstance([root], icon.idPrefix, instance) : [root];
  const { class: own, ...attrs } = (drawn as Exclude<SvgNode, string>).attrs;
  return h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      ...attrs,
      class: classNames(own, className),
      width: size,
      height: size,
      "aria-hidden": "true",
      focusable: "false",
    },
    ...svgChildren((drawn as Exclude<SvgNode, string>).children),
  );
}
