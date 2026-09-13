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

export function resolveScope(
  tree: NavTree,
  currentSlug: string,
  opts: ResolvedOptions,
): Scope | undefined {
  const baseSlug = opts.rootPath ? `${opts.rootPath}/index` : "index";
  const base = tree.bySlug.get(baseSlug);
  if (!base || base.kind !== "folder") {
    warnOnce(
      `root-path:${opts.rootPath}`,
      `\`rootPath: ${opts.rootPath}\` is not a folder with visible pages.`,
    );
    return undefined;
  }
  if (
    opts.rootPath &&
    opts.hideOutsideRoot &&
    currentSlug !== baseSlug &&
    !currentSlug.startsWith(`${opts.rootPath}/`)
  ) {
    return undefined;
  }

  const chain = chainOf(tree, currentSlug);
  const current = chain[0];
  const trail = new Set(chain.slice(1).map((n) => n.slug));
  const inBase = (n: NavNode) =>
    !opts.rootPath || n.slug === base.slug || n.slug.startsWith(`${opts.rootPath}/`);

  let root: NavNode | undefined;
  switch (opts.scope) {
    case "section":
      root = chain.find((n) => n.kind === "folder" && n.depth === base.depth + 1 && inBase(n));
      break;
    case "parent":
      root = current ? (parentOf(tree, current) ?? current) : undefined;
      break;
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
  const linked = list.filter((n) => linkTarget(n, opts) !== undefined);
  const idx = linked.findIndex((n) => n.slug === current.slug);
  if (idx < 0) return {};
  return { prev: linked[idx - 1], next: linked[idx + 1] };
}
