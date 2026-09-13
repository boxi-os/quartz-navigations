import { h } from "preact";
// The build inlines Lucide's icon table as a compact JSON string (see tsup.config.ts and
// vitest.config.ts); it is parsed on first use so sites without Lucide icons pay nothing.
import raw from "virtual:lucide-nodes";
import { classNames } from "./util/lang";
import { warnOnce } from "./util/warn";

type IconNode = [tag: string, attrs: Record<string, string>][];

let table: Record<string, IconNode> | undefined;

function icons(): Record<string, IconNode> {
  if (!table) table = JSON.parse(raw) as Record<string, IconNode>;
  return table;
}

export const LUCIDE_PREFIX = "lucide:";

/** `lucide:book-open` → `book-open`; anything else → `undefined`. */
export function lucideName(value: string | undefined): string | undefined {
  if (!value || !value.toLowerCase().startsWith(LUCIDE_PREFIX)) return undefined;
  return value.slice(LUCIDE_PREFIX.length).trim().toLowerCase();
}

export function hasLucideIcon(name: string): boolean {
  return Object.prototype.hasOwnProperty.call(icons(), name);
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
  const node = icons()[name];
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
