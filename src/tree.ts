import {
  type Frontmatter,
  frontmatterOf,
  readBoolean,
  readNumber,
  readString,
} from "./frontmatter";
import { type FileData, languageIndex, placements } from "./language";
import { treeOptionsKey } from "./options";
import { compareNodes } from "./sort";
import type { NavNode, NavTree, ResolvedOptions } from "./types";
import { globToRegExp, matchesAny } from "./util/glob";
import { warnOnce } from "./util/warn";

export type { FileData };

const NUMERIC_PREFIX = /^(\d+)[-_. ]+(.+)$/;

/** Mutable node used while collecting files; converted to `NavNode` in `finalize`. */
interface Draft {
  kind: "folder" | "page";
  segment: string;
  depth: number;
  /** Language-neutral path of the node: `docs/setup`, `docs` for a folder, `` for the root. */
  path: string;
  /** Real slug the node links to; a folder's is replaced by its index page's once one is found. */
  slug: string;
  /** Keyed by `childKey`, so a page and a folder with the same name (`about.md` next to `about/`) coexist. */
  children: Map<string, Draft>;
  /** Real directory or file name from `relativePath`, e.g. `01 Getting Started`. */
  nameHint?: string;
  /** File stem including a language suffix (`Setup.en`), when it differs from `nameHint`. */
  rawName?: string;
  frontmatter?: Frontmatter;
  data?: FileData;
  hasIndex: boolean;
  isVirtual: boolean;
  /** `Placement.rank` of the file behind the index page or page; a higher rank is not replaced. */
  rank?: number;
}

/** One file to place: its data and the language-neutral key it is placed under. */
interface Entry {
  data: FileData;
  key: string;
  rank: number;
}

function newDraft(kind: Draft["kind"], segments: string[]): Draft {
  const slug = kind === "folder" ? [...segments, "index"].join("/") : segments.join("/");
  return {
    kind,
    segment: segments[segments.length - 1] ?? "",
    depth: segments.length,
    path: segments.join("/"),
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

/** File stems that only name a folder's index page: `index`, `_index`, `index.en`. */
const INDEX_STEM = /^_?index(\.[\w-]+)?$/i;

/**
 * A title that is no title: `index`, or the file stem of an index page that note-properties
 * put in when the frontmatter has none (`index.en`, `_index`). An explicit `title: Index` stays.
 */
function isIndexTitle(title: string, draft: Draft): boolean {
  if (title === "index") return true;
  const data = draft.data;
  if (typeof data?.filePath !== "string" || typeof data.relativePath !== "string") return false;
  const stem = stripExtension(data.relativePath.split("/").pop() ?? "");
  return title === stem && INDEX_STEM.test(stem);
}

/** Directory names from `relativePath`, aligned with the last `count` key segments. */
function alignedDirs(relativePath: string | undefined, count: number): string[] | undefined {
  if (!relativePath) return undefined;
  const dirs = relativePath.split("/").slice(0, -1);
  return dirs.length >= count ? dirs.slice(dirs.length - count) : undefined;
}

function collect(entries: Entry[], opts: ResolvedOptions): Draft {
  const include = opts.include.map(globToRegExp);
  const exclude = opts.exclude.map(globToRegExp);
  const root = newDraft("folder", []);
  const matches = (patterns: RegExp[], slug: string, key: string) =>
    matchesAny(patterns, key) || (key !== slug && matchesAny(patterns, slug));

  for (const { data, key, rank } of entries) {
    const slug = typeof data.slug === "string" ? data.slug : "";
    if (!slug || slug === "404" || !key) continue;
    if (opts.hideTags && (slug === "tags" || slug.startsWith("tags/"))) continue;
    if (opts.hideUnlisted && data.unlisted === true) continue;
    const fm = frontmatterOf(data.frontmatter);
    if (opts.hideDrafts && isDraft(fm)) continue;
    if (matches(exclude, slug, key)) continue;
    if (include.length > 0 && !matches(include, slug, key)) continue;

    const segments = key.split("/");
    const isIndex = segments[segments.length - 1] === "index";
    const folderSegments = segments.slice(0, -1);
    const real = typeof data.filePath === "string";
    const relativePath = typeof data.relativePath === "string" ? data.relativePath : undefined;
    const dirParts = real ? alignedDirs(relativePath, folderSegments.length) : undefined;
    const fileName = real ? relativePath?.split("/").pop() : undefined;

    const folder = ensureFolder(root, folderSegments, dirParts);
    if (isIndex) {
      // Folder notes (`docs/docs.md`) and `_index.md` already arrive as `docs/index`. With
      // languages, `de/index` beats a root `index.md` that only inherited the default language,
      // and both beat a generated folder page.
      if (folder.hasIndex && (folder.rank ?? 0) > rank) continue;
      folder.slug = slug;
      folder.hasIndex = true;
      folder.isVirtual = !real;
      folder.frontmatter = fm;
      folder.data = data;
      folder.rank = rank;
      continue;
    }
    const existing = folder.children.get(childKey("page", segments[segments.length - 1]!));
    if (existing && (existing.rank ?? 0) > rank) continue;
    const page = newDraft("page", segments);
    page.slug = slug;
    page.frontmatter = fm;
    page.data = data;
    page.rank = rank;
    if (fileName) {
      const stem = stripExtension(fileName);
      // `Setup.en.md` → `Setup` when the key dropped the language suffix of the slug.
      const slugName = slug.split("/").pop() ?? "";
      const suffix = slugName.startsWith(page.segment) ? slugName.slice(page.segment.length) : "";
      if (suffix && stem.toLowerCase().endsWith(suffix.toLowerCase())) {
        page.nameHint = stem.slice(0, stem.length - suffix.length);
        page.rawName = stem;
      } else {
        page.nameHint = stem;
      }
    }
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
  const usable = title !== undefined && !isIndexTitle(title, draft);
  if (usable && draft.kind === "page" && draft.rawName !== undefined && title === draft.rawName) {
    out = draft.nameHint ?? title; // the file stem with its language suffix
    fromName = true;
  } else if (usable && draft.kind === "page") {
    out = title!;
    // note-properties falls back to the file stem, which still carries a numeric prefix.
    fromName = draft.nameHint !== undefined && title === draft.nameHint;
  } else if (usable && !draft.isVirtual) {
    out = title;
  } else if (draft.nameHint) {
    out = draft.nameHint;
    fromName = true;
  } else if (usable) {
    out = title!; // virtual folder page: folder-page already used the directory name
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
  folders: Map<string, NavNode>,
  comparator: (a: NavNode, b: NavNode) => number,
): NavNode | undefined {
  if (readBoolean(draft.frontmatter, opts.frontmatterKeys.hide) === true) return undefined;

  const path = draft.path;
  const node: NavNode = {
    kind: draft.kind,
    slug: draft.slug,
    path,
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
      const c = finalize(child, node.slug, path, opts, bySlug, folders, comparator);
      if (c) node.children.push(c);
    }
    node.children.sort(comparator);
    if (draft.depth > 0 && node.children.length === 0 && opts.hideEmptyFolders) {
      if (!(node.hasIndex && opts.keepIndexOnlyFolders)) return undefined;
    }
  }

  bySlug.set(node.slug, node);
  if (node.kind === "folder") folders.set(node.path, node);
  return node;
}

/**
 * Builds the navigation tree from Quartz's `allFiles`. Pure apart from `warnOnce`. `locale`
 * drives the alphabetical comparator. With `language`, only pages of that language (and
 * language-neutral generated pages) are placed, keyed by their language-neutral path.
 */
export function buildTree(
  allFiles: FileData[],
  opts: ResolvedOptions,
  locale?: string,
  language?: string,
): NavTree {
  const bySlug = new Map<string, NavNode>();
  const folders = new Map<string, NavNode>();
  const comparator = compareNodes(opts, locale);
  const entries: Entry[] = [];
  if (language === undefined) {
    for (const data of allFiles) {
      entries.push({ data, key: typeof data.slug === "string" ? data.slug : "", rank: 0 });
    }
  } else {
    const index = languageIndex(allFiles);
    for (const data of allFiles) {
      for (const p of placements(data, index)) {
        if (p.lang === language || p.lang === undefined) {
          entries.push({ data, key: p.key, rank: p.rank });
        }
      }
    }
  }
  const root = finalize(collect(entries, opts), undefined, "", opts, bySlug, folders, comparator);
  const tree: NavTree = { root: root!, bySlug, folders };
  if (language !== undefined) tree.language = language;
  return tree;
}

const cache = new WeakMap<object, Map<string, NavTree>>();

/**
 * Cached per `allFiles` identity: Quartz passes the same array to every component of one
 * build, so instances with equal tree options (and locale and language) share one tree.
 */
export function treeFromFiles(
  allFiles: FileData[],
  opts: ResolvedOptions,
  locale?: string,
  language?: string,
): NavTree {
  let perOptions = cache.get(allFiles);
  if (!perOptions) {
    perOptions = new Map();
    cache.set(allFiles, perOptions);
  }
  const key = `${language ?? ""}\n${locale ?? ""}\n${treeOptionsKey(opts)}`;
  const hit = perOptions.get(key);
  if (hit) return hit;
  const tree = buildTree(allFiles, opts, locale, language);
  perOptions.set(key, tree);
  return tree;
}
