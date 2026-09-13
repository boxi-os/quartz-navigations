import type {
  NavDateField,
  NavDropdownTrigger,
  NavFolderClick,
  NavFolderLink,
  NavFolderState,
  NavFoldersFirst,
  NavIndexEntry,
  NavMobile,
  NavPagerOrder,
  NavScope,
  NavSort,
  NavSortDirection,
  NavStyle,
  NavVariant,
  NavigationOptions,
  ResolvedOptions,
} from "./types";
import { warnOnce } from "./util/warn";

const VARIANTS: readonly NavVariant[] = [
  "vertical",
  "horizontal",
  "accordion",
  "dropdown",
  "flyout",
  "tabs",
  "mega",
  "columns",
  "select",
  "pager",
];
const MOBILE: readonly NavMobile[] = ["same", "accordion", "offcanvas", "select", "hidden"];
const STYLES: readonly NavStyle[] = ["unstyled", "basic", "full"];
const SCOPES: readonly NavScope[] = ["root", "section", "parent", "current"];
const SORTS: readonly NavSort[] = ["manual", "alphabetical", "date"];
const DIRECTIONS: readonly NavSortDirection[] = ["asc", "desc"];
const FOLDERS_FIRST: readonly NavFoldersFirst[] = ["first", "last", "mixed"];
const DATE_FIELDS: readonly NavDateField[] = ["created", "modified", "published"];
const INDEX_ENTRIES: readonly NavIndexEntry[] = ["none", "first"];
const FOLDER_LINKS: readonly NavFolderLink[] = ["index", "none", "first-child"];
const FOLDER_CLICKS: readonly NavFolderClick[] = ["link", "toggle"];
const FOLDER_STATES: readonly NavFolderState[] = ["collapsed", "open"];
const TRIGGERS: readonly NavDropdownTrigger[] = ["click", "hover"];
const PAGER_ORDERS: readonly NavPagerOrder[] = ["tree", "siblings"];

/**
 * Defaults live here, not in the manifest: Quartz passes the raw YAML `options` to the
 * component constructor and never merges `quartz.defaultOptions` from package.json.
 */
export const defaultOptions = {
  variant: "vertical",
  mobile: "same",
  style: "full",
  className: "",
  id: "",
  title: "",
  ariaLabel: "",
  chevrons: true,
  icons: false,
  rootPath: "",
  scope: "root",
  depth: 0,
  hideOutsideRoot: true,
  showScopeRoot: false,
  showHome: false,
  indexEntry: "none",
  sort: "manual",
  sortDirection: "asc",
  foldersFirst: "first",
  dateField: "created",
  order: {},
  stripNumericPrefix: false,
  frontmatterKeys: { order: "navOrder", title: "navTitle", hide: "navHide", icon: "navIcon" },
  hideTags: true,
  hideUnlisted: true,
  hideDrafts: true,
  hideEmptyFolders: true,
  keepIndexOnlyFolders: true,
  include: [],
  exclude: [],
  folderLink: "index",
  folderClick: "link",
  folderDefaultState: "collapsed",
  expandActive: true,
  exclusive: false,
  persistState: false,
  dropdownTrigger: "click",
  breakpoints: {},
  tabs: { secondary: true },
  columns: { max: 4 },
  pager: { labels: true, order: "tree" },
} satisfies NavigationOptions;

function pickEnum<T extends string>(
  key: string,
  value: unknown,
  allowed: readonly T[],
  fallback: T,
): T {
  if (value === undefined) return fallback;
  if (typeof value === "string" && (allowed as readonly string[]).includes(value)) {
    return value as T;
  }
  warnOnce(
    `enum:${key}:${String(value)}`,
    `Unknown value ${JSON.stringify(value)} for \`${key}\`; using \`${fallback}\`.`,
  );
  return fallback;
}

function pickBoolean(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function pickString(value: unknown, fallback: string): string {
  return typeof value === "string" ? value.trim() : fallback;
}

function pickInt(key: string, value: unknown, fallback: number, min: number): number {
  if (value === undefined) return fallback;
  const n = typeof value === "string" ? Number(value) : value;
  if (typeof n === "number" && Number.isInteger(n) && n >= min) return n;
  warnOnce(
    `int:${key}:${String(value)}`,
    `\`${key}\` must be an integer >= ${min}; using ${fallback}.`,
  );
  return fallback;
}

function pickStringList(key: string, value: unknown): string[] {
  if (value === undefined) return [];
  const list = Array.isArray(value) ? value : [value];
  const out: string[] = [];
  for (const v of list) {
    if (typeof v === "string" && v.trim().length > 0) {
      out.push(v.trim());
    } else {
      warnOnce(
        `list:${key}:${String(v)}`,
        `Ignoring invalid \`${key}\` entry ${JSON.stringify(v)}.`,
      );
    }
  }
  return out;
}

/** `docs/`, `/docs/index`, `docs.md` and `docs/index.md` all mean the folder `docs`. */
export function normalizePath(value: string): string {
  let s = value
    .trim()
    .replace(/\\/g, "/")
    .replace(/^\/+|\/+$/g, "");
  if (s.endsWith(".md")) s = s.slice(0, -3);
  if (s === "index") return "";
  if (s.endsWith("/index")) s = s.slice(0, -"/index".length);
  return s;
}

function normalizeOrder(value: unknown): Record<string, string[]> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    if (value !== undefined) warnOnce("order:type", "`order` must be a map of folder → list.");
    return {};
  }
  const out: Record<string, string[]> = {};
  for (const [key, list] of Object.entries(value as Record<string, unknown>)) {
    const entries = pickStringList(`order.${key}`, list).map((s) => normalizePath(s));
    out[normalizePath(key)] = entries;
  }
  return out;
}

export function resolveOptions(userOpts?: NavigationOptions): ResolvedOptions {
  const user = (userOpts ?? {}) as Record<string, unknown>;
  const keys = (user.frontmatterKeys ?? {}) as Record<string, unknown>;
  const bp = (user.breakpoints ?? {}) as Record<string, unknown>;
  const tabs = (user.tabs ?? {}) as Record<string, unknown>;
  const columns = (user.columns ?? {}) as Record<string, unknown>;
  const pager = (user.pager ?? {}) as Record<string, unknown>;

  return {
    variant: pickEnum("variant", user.variant, VARIANTS, defaultOptions.variant),
    mobile: pickEnum("mobile", user.mobile, MOBILE, defaultOptions.mobile),
    style: pickEnum("style", user.style, STYLES, defaultOptions.style),
    className: pickString(user.className, ""),
    id: pickString(user.id, "").replace(/[^A-Za-z0-9_-]/g, "-"),
    title: pickString(user.title, ""),
    ariaLabel: pickString(user.ariaLabel, ""),
    chevrons: pickBoolean(user.chevrons, defaultOptions.chevrons),
    icons: pickBoolean(user.icons, defaultOptions.icons),
    rootPath: normalizePath(pickString(user.rootPath, "")),
    scope: pickEnum("scope", user.scope, SCOPES, defaultOptions.scope),
    depth: pickInt("depth", user.depth, defaultOptions.depth, 0),
    hideOutsideRoot: pickBoolean(user.hideOutsideRoot, defaultOptions.hideOutsideRoot),
    showScopeRoot: pickBoolean(user.showScopeRoot, defaultOptions.showScopeRoot),
    showHome: pickBoolean(user.showHome, defaultOptions.showHome),
    indexEntry: pickEnum("indexEntry", user.indexEntry, INDEX_ENTRIES, defaultOptions.indexEntry),
    sort: pickEnum("sort", user.sort, SORTS, defaultOptions.sort),
    sortDirection: pickEnum(
      "sortDirection",
      user.sortDirection,
      DIRECTIONS,
      defaultOptions.sortDirection,
    ),
    foldersFirst: pickEnum(
      "foldersFirst",
      user.foldersFirst,
      FOLDERS_FIRST,
      defaultOptions.foldersFirst,
    ),
    dateField: pickEnum("dateField", user.dateField, DATE_FIELDS, defaultOptions.dateField),
    order: normalizeOrder(user.order),
    stripNumericPrefix: pickBoolean(user.stripNumericPrefix, defaultOptions.stripNumericPrefix),
    frontmatterKeys: {
      order: pickString(keys.order, "") || defaultOptions.frontmatterKeys.order,
      title: pickString(keys.title, "") || defaultOptions.frontmatterKeys.title,
      hide: pickString(keys.hide, "") || defaultOptions.frontmatterKeys.hide,
      icon: pickString(keys.icon, "") || defaultOptions.frontmatterKeys.icon,
    },
    hideTags: pickBoolean(user.hideTags, defaultOptions.hideTags),
    hideUnlisted: pickBoolean(user.hideUnlisted, defaultOptions.hideUnlisted),
    hideDrafts: pickBoolean(user.hideDrafts, defaultOptions.hideDrafts),
    hideEmptyFolders: pickBoolean(user.hideEmptyFolders, defaultOptions.hideEmptyFolders),
    keepIndexOnlyFolders: pickBoolean(
      user.keepIndexOnlyFolders,
      defaultOptions.keepIndexOnlyFolders,
    ),
    include: pickStringList("include", user.include),
    exclude: pickStringList("exclude", user.exclude),
    folderLink: pickEnum("folderLink", user.folderLink, FOLDER_LINKS, defaultOptions.folderLink),
    folderClick: pickEnum(
      "folderClick",
      user.folderClick,
      FOLDER_CLICKS,
      defaultOptions.folderClick,
    ),
    folderDefaultState: pickEnum(
      "folderDefaultState",
      user.folderDefaultState,
      FOLDER_STATES,
      defaultOptions.folderDefaultState,
    ),
    expandActive: pickBoolean(user.expandActive, defaultOptions.expandActive),
    exclusive: pickBoolean(user.exclusive, defaultOptions.exclusive),
    persistState: pickBoolean(user.persistState, defaultOptions.persistState),
    dropdownTrigger: pickEnum(
      "dropdownTrigger",
      user.dropdownTrigger,
      TRIGGERS,
      defaultOptions.dropdownTrigger,
    ),
    breakpoints: {
      mobile:
        typeof bp.mobile === "string" || typeof bp.mobile === "number" ? bp.mobile : undefined,
      desktop:
        typeof bp.desktop === "string" || typeof bp.desktop === "number" ? bp.desktop : undefined,
    } as ResolvedOptions["breakpoints"],
    tabs: { secondary: pickBoolean(tabs.secondary, defaultOptions.tabs.secondary) },
    columns: { max: pickInt("columns.max", columns.max, defaultOptions.columns.max, 1) },
    pager: {
      labels: pickBoolean(pager.labels, defaultOptions.pager.labels),
      order: pickEnum("pager.order", pager.order, PAGER_ORDERS, defaultOptions.pager.order),
    },
  };
}

/** The options that change the tree itself; instances that share them share one tree per build. */
export function treeOptionsKey(opts: ResolvedOptions): string {
  return JSON.stringify({
    sort: opts.sort,
    sortDirection: opts.sortDirection,
    foldersFirst: opts.foldersFirst,
    dateField: opts.dateField,
    order: opts.order,
    stripNumericPrefix: opts.stripNumericPrefix,
    frontmatterKeys: opts.frontmatterKeys,
    hideTags: opts.hideTags,
    hideUnlisted: opts.hideUnlisted,
    hideDrafts: opts.hideDrafts,
    hideEmptyFolders: opts.hideEmptyFolders,
    keepIndexOnlyFolders: opts.keepIndexOnlyFolders,
    include: opts.include,
    exclude: opts.exclude,
    icons: opts.icons,
  });
}
