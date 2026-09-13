import { linkTarget } from "./links";
import type { NavNode, NavTree, ResolvedOptions } from "./types";
import { warnOnce } from "./util/warn";

export interface Scope {
  /** Folder named by `rootPath` (the site root by default). */
  base: NavNode;
  /** Folder whose children are rendered. */
  root: NavNode;
  /** Node of the current page, if it is part of the tree. */
  current?: NavNode;
  /** Slugs of the current node's ancestors (folders on the active path). */
  trail: Set<string>;
}

/** Current node first, site root last. Empty when the slug is not in the tree. */
export function chainOf(tree: NavTree, slug: string): NavNode[] {
  const out: NavNode[] = [];
  let node = tree.bySlug.get(slug);
  while (node) {
    out.push(node);
    node = node.parentSlug !== undefined ? tree.bySlug.get(node.parentSlug) : undefined;
  }
  return out;
}

function parentOf(tree: NavTree, node: NavNode): NavNode | undefined {
  return node.parentSlug !== undefined ? tree.bySlug.get(node.parentSlug) : undefined;
}

/** `docs/index` → `docs`, `index` → ``. */
export function pathOfSlug(slug: string): string {
  return slug === "index" ? "" : slug.replace(/\/index$/, "");
}

/**
 * `currentPath` is the language-neutral path of the current page (see `language.ts`); it
 * defaults to the path of `currentSlug`.
 */
export function resolveScope(
  tree: NavTree,
  currentSlug: string,
  opts: ResolvedOptions,
  currentPath: string = pathOfSlug(currentSlug),
): Scope | undefined {
  const base = tree.folders.get(opts.rootPath);
  if (!base) {
    warnOnce(
      `root-path:${opts.rootPath}`,
      `\`rootPath: ${opts.rootPath}\` is not a folder with visible pages.`,
    );
    return undefined;
  }
  if (
    opts.rootPath &&
    opts.hideOutsideRoot &&
    currentPath !== opts.rootPath &&
    !currentPath.startsWith(`${opts.rootPath}/`)
  ) {
    return undefined;
  }

  const chain = chainOf(tree, currentSlug);
  const current = chain[0];
  const trail = new Set(chain.slice(1).map((n) => n.slug));
  const inBase = (n: NavNode) =>
    !opts.rootPath || n.path === opts.rootPath || n.path.startsWith(`${opts.rootPath}/`);

  let root: NavNode | undefined;
  switch (opts.scope) {
    case "section":
      root = chain.find((n) => n.kind === "folder" && n.depth === base.depth + 1 && inBase(n));
      break;
    case "parent": {
      // The base folder's parent lies outside `rootPath`; its index page shows the base itself.
      const parent = current ? parentOf(tree, current) : undefined;
      root = parent && inBase(parent) ? parent : current;
      break;
    }
    case "current":
      root = current ? (current.kind === "folder" ? current : parentOf(tree, current)) : undefined;
      break;
    default:
      root = base;
  }
  if (!root || root.kind !== "folder" || !inBase(root)) return undefined;
  return { base, root, current, trail };
}

/** Pre-order list of the nodes rendered below `root`, honouring `depth`. */
export function flatten(root: NavNode, opts: ResolvedOptions): NavNode[] {
  const out: NavNode[] = [];
  const walk = (node: NavNode, level: number) => {
    for (const child of node.children) {
      out.push(child);
      if (child.kind === "folder" && (opts.depth === 0 || level < opts.depth)) {
        walk(child, level + 1);
      }
    }
  };
  walk(root, 1);
  return out;
}

export function pagerNeighbours(
  tree: NavTree,
  scope: Scope,
  opts: ResolvedOptions,
): { prev?: NavNode; next?: NavNode } {
  const { current } = scope;
  if (!current) return {};
  let list: NavNode[];
  if (opts.pager.order === "siblings") {
    const parent = parentOf(tree, current);
    list = parent ? parent.children : [];
  } else {
    list = flatten(scope.root, opts);
    if (scope.root.hasIndex && linkTarget(scope.root, opts)) list = [scope.root, ...list];
  }
  // A folder without its own page links to its first page, so both rows share one target and
  // "Previous" on that page would point at the page itself. Rows whose target is another
  // row's own page are skipped; the current row always stays.
  const entries = list
    .map((node) => ({ node, target: linkTarget(node, opts) }))
    .filter((e): e is { node: NavNode; target: string } => e.target !== undefined);
  const own = (e: { node: NavNode; target: string }) =>
    e.node.slug === e.target || e.node.slug === current.slug;
  const ownTargets = new Set(entries.filter(own).map((e) => e.target));
  const linked = entries.filter((e) => own(e) || !ownTargets.has(e.target)).map((e) => e.node);
  const idx = linked.findIndex((n) => n.slug === current.slug);
  if (idx < 0) return {};
  return { prev: linked[idx - 1], next: linked[idx + 1] };
}
