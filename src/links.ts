import type { FullSlug } from "@quartz-community/types";
import { resolveRelative } from "@quartz-community/utils/path";
import type { NavNode, ResolvedOptions } from "./types";

/** Relative href from the current page to a node; folders resolve to `../docs/`. */
export function hrefFor(current: string, target: string): string {
  return resolveRelative(current as FullSlug, target as FullSlug) as string;
}

/** First page in tree order below a folder, descending into subfolders. */
export function firstPage(node: NavNode): NavNode | undefined {
  for (const child of node.children) {
    if (child.kind === "page") return child;
    if (child.hasIndex) return child;
    const nested = firstPage(child);
    if (nested) return nested;
  }
  return undefined;
}

/** Slug a node links to, or `undefined` when the node has no link. */
export function linkTarget(node: NavNode, opts: ResolvedOptions): string | undefined {
  if (node.kind === "page") return node.slug;
  switch (opts.folderLink) {
    case "none":
      return undefined;
    case "first-child":
      return firstPage(node)?.slug;
    default:
      return node.hasIndex ? node.slug : firstPage(node)?.slug;
  }
}
