import {
  type Frontmatter,
  frontmatterOf,
  readBoolean,
  readNumber,
  readString,
} from "./frontmatter";
import { treeOptionsKey } from "./options";
import { compareNodes } from "./sort";
import type { NavNode, NavTree, ResolvedOptions } from "./types";
import { globToRegExp, matchesAny } from "./util/glob";
import { warnOnce } from "./util/warn";

export type FileData = Record<string, unknown>;

const NUMERIC_PREFIX = /^(\d+)[-_. ]+(.+)$/;

/** Mutable node used while collecting files; converted to `NavNode` in `finalize`. */
interface Draft {
  kind: "folder" | "page";
  segment: string;
  depth: number;
  slug: string;
  /** Keyed by `childKey`, so a page and a folder with the same name (`about.md` next to `about/`) coexist. */
  children: Map<string, Draft>;
  /** Real directory or file name from `relativePath`, e.g. `01 Getting Started`. */
  nameHint?: string;
  frontmatter?: Frontmatter;
  data?: FileData;
  hasIndex: boolean;
  isVirtual: boolean;
}

function newDraft(kind: Draft["kind"], segments: string[]): Draft {
  const slug = kind === "folder" ? [...segments, "index"].join("/") : segments.join("/");
  return {
    kind,
    segment: segments[segments.length - 1] ?? "",
    depth: segments.length,
    slug,
    children: new Map(),
    hasIndex: false,
    isVirtual: false,
  };
}

function childKey(kind: Draft["kind"], segment: string): string {
  return `${kind}:${segment}`;
}

function isDraft(fm: Frontmatter | undefined): boolean {
  const v = fm?.draft;
  return v === true || (typeof v === "string" && v.trim().toLowerCase() === "true");
}

function stripExtension(name: string): string {
  const i = name.lastIndexOf(".");
  return i > 0 ? name.slice(0, i) : name;
}

function ensureFolder(root: Draft, segments: string[], dirParts: string[] | undefined): Draft {
  let node = root;
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i]!;
    let child = node.children.get(childKey("folder", seg));
    if (!child) {
      child = newDraft("folder", segments.slice(0, i + 1));
      node.children.set(childKey("folder", seg), child);
    }
    if (dirParts && child.nameHint === undefined) {
      const hint = dirParts[i];
      if (hint) child.nameHint = hint;
    }
    node = child;
  }
  return node;
}

function collect(allFiles: FileData[], opts: ResolvedOptions): Draft {
  const include = opts.include.map(globToRegExp);
  const exclude = opts.exclude.map(globToRegExp);
  const root = newDraft("folder", []);

  for (const data of allFiles) {
    const slug = typeof data.slug === "string" ? data.slug : "";
    if (!slug || slug === "404") continue;
    if (opts.hideTags && (slug === "tags" || slug.startsWith("tags/"))) continue;
    if (opts.hideUnlisted && data.unlisted === true) continue;
    const fm = frontmatterOf(data.frontmatter);
    if (opts.hideDrafts && isDraft(fm)) continue;
    if (matchesAny(exclude, slug)) continue;
    if (include.length > 0 && !matchesAny(include, slug)) continue;

    const segments = slug.split("/");
    const isIndex = segments[segments.length - 1] === "index";
    const folderSegments = segments.slice(0, -1);
    const real = typeof data.filePath === "string";
    const relativePath = typeof data.relativePath === "string" ? data.relativePath : undefined;
    const pathParts = real && relativePath ? relativePath.split("/") : undefined;
    const dirParts = pathParts?.slice(0, -1);
    const fileName = pathParts?.[pathParts.length - 1];

    const folder = ensureFolder(root, folderSegments, dirParts);
    if (isIndex) {
      // Folder notes (`docs/docs.md`) and `_index.md` already arrive as `docs/index`.
      folder.hasIndex = true;
      folder.isVirtual = !real;
      folder.frontmatter = fm;
      folder.data = data;
      continue;
    }
    const page = newDraft("page", segments);
    page.frontmatter = fm;
    page.data = data;
    if (fileName) page.nameHint = stripExtension(fileName);
    folder.children.set(childKey("page", page.segment), page);
  }
  return root;
}

function titleOf(draft: Draft, opts: ResolvedOptions): string {
  const fm = draft.frontmatter;
  const explicit = readString(fm, opts.frontmatterKeys.title);
  if (explicit) return explicit;
  const title = readString(fm, "title");
  let fromName = false;
  let out: string;
  if (title && title !== "index" && draft.kind === "page") {
    out = title;
    // note-properties falls back to the file stem, which still carries a numeric prefix.
    fromName = draft.nameHint !== undefined && title === draft.nameHint;
  } else if (title && title !== "index" && !draft.isVirtual) {
    out = title;
  } else if (draft.nameHint) {
    out = draft.nameHint;
    fromName = true;
  } else if (title && title !== "index") {
    out = title; // virtual folder page: folder-page already used the directory name
    fromName = true;
  } else {
    out = draft.segment;
    fromName = true;
  }
  if (opts.stripNumericPrefix && (fromName || NUMERIC_PREFIX.test(out))) {
    const m = NUMERIC_PREFIX.exec(out);
    if (m) out = m[2]!;
  }
  return out;
}

function prefixOrderOf(draft: Draft): number | undefined {
  const source = draft.nameHint ?? draft.segment;
  const m = NUMERIC_PREFIX.exec(source);
  return m ? Number(m[1]) : undefined;
}

function listOrderOf(draft: Draft, parentPath: string, opts: ResolvedOptions): number | undefined {
  const list = opts.order[parentPath];
  if (!list || list.length === 0) return undefined;
  const wanted = [draft.segment, draft.nameHint, draft.nameHint?.toLowerCase()].filter(
    (s): s is string => typeof s === "string",
  );
  for (let i = 0; i < list.length; i++) {
    const entry = list[i]!;
    if (wanted.includes(entry) || wanted.includes(entry.toLowerCase())) return i;
  }
  return undefined;
}

function dateOf(draft: Draft, opts: ResolvedOptions): Date | undefined {
  const dates = draft.data?.dates;
  if (dates === null || typeof dates !== "object") return undefined;
  const d = (dates as Record<string, unknown>)[opts.dateField];
  return d instanceof Date && !Number.isNaN(d.getTime()) ? d : undefined;
}

function finalize(
  draft: Draft,
  parentSlug: string | undefined,
  parentPath: string,
  opts: ResolvedOptions,
  bySlug: Map<string, NavNode>,
  comparator: (a: NavNode, b: NavNode) => number,
): NavNode | undefined {
  if (readBoolean(draft.frontmatter, opts.frontmatterKeys.hide) === true) return undefined;

  const path = draft.depth === 0 ? "" : draft.slug.replace(/\/index$/, "");
  const node: NavNode = {
    kind: draft.kind,
    slug: draft.slug,
    segment: draft.segment,
    title: titleOf(draft, opts),
    parentSlug,
    depth: draft.depth,
    children: [],
    hasIndex: draft.hasIndex,
    isVirtual: draft.isVirtual,
  };
  const order = readNumber(draft.frontmatter, opts.frontmatterKeys.order);
  if (order !== undefined) node.order = order;
  const listOrder = listOrderOf(draft, parentPath, opts);
  if (listOrder !== undefined) node.listOrder = listOrder;
  const prefixOrder = prefixOrderOf(draft);
  if (prefixOrder !== undefined) node.prefixOrder = prefixOrder;
  const date = dateOf(draft, opts);
  if (date) node.date = date;
  if (opts.icons === "custom" || opts.icons === "both") {
    const icon = readString(draft.frontmatter, opts.frontmatterKeys.icon) || opts.nodeIcons[path];
    if (icon) node.icon = icon;
  }

  if (draft.kind === "folder") {
    const list = opts.order[path];
    if (list) {
      for (const entry of list) {
        const known = [...draft.children.values()].some(
          (c) => c.segment === entry || c.nameHint === entry || c.nameHint?.toLowerCase() === entry,
        );
        if (!known) {
          warnOnce(
            `order:${path}:${entry}`,
            `\`order\` for "${path || "/"}" lists unknown entry "${entry}".`,
          );
        }
      }
    }
    for (const child of draft.children.values()) {
      const c = finalize(child, node.slug, path, opts, bySlug, comparator);
      if (c) node.children.push(c);
    }
    node.children.sort(comparator);
    if (draft.depth > 0 && node.children.length === 0 && opts.hideEmptyFolders) {
      if (!(node.hasIndex && opts.keepIndexOnlyFolders)) return undefined;
    }
  }

  bySlug.set(node.slug, node);
  return node;
}

/** Builds the navigation tree from Quartz's `allFiles`. Pure apart from `warnOnce`. */
export function buildTree(allFiles: FileData[], opts: ResolvedOptions): NavTree {
  const bySlug = new Map<string, NavNode>();
  const root = finalize(collect(allFiles, opts), undefined, "", opts, bySlug, compareNodes(opts));
  return { root: root!, bySlug };
}

const cache = new WeakMap<object, Map<string, NavTree>>();

/**
 * Cached per `allFiles` identity: Quartz passes the same array to every component of one
 * build, so instances with equal tree options share one tree.
 */
export function treeFromFiles(allFiles: FileData[], opts: ResolvedOptions): NavTree {
  let perOptions = cache.get(allFiles);
  if (!perOptions) {
    perOptions = new Map();
    cache.set(allFiles, perOptions);
  }
  const key = treeOptionsKey(opts);
  const hit = perOptions.get(key);
  if (hit) return hit;
  const tree = buildTree(allFiles, opts);
  perOptions.set(key, tree);
  return tree;
}
