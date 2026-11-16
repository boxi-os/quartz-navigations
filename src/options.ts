import type {
  NavAlign,
  NavDateField,
  NavFolderClick,
  NavFolderLink,
  NavFlyoutSide,
  NavFolderState,
  NavFoldersFirst,
  NavIcons,
  NavIndexEntry,
  NavMobile,
  NavPagerOrder,
  NavRailContent,
  NavRailExpand,
  NavRailHoverContent,
  NavRailOnNavigate,
  NavRailRest,
  NavRailSide,
  NavScope,
  NavSort,
  NavSortDirection,
  NavTrigger,
  NavVariant,
  NavigationOptions,
  ResolvedOptions,
} from "./types";
import { warnOnce } from "./util/warn";

const VARIANTS: readonly NavVariant[] = [
  "tree",
  "bar",
  "accordion",
  "dropdown",
  "flyout",
  "tabs",
  "mega",
  "columns",
  "select",
  "pager",
  "rail",
];
const MOBILE: readonly NavMobile[] = ["same", "accordion", "offcanvas", "select", "hidden"];
const ALIGNS: readonly NavAlign[] = ["left", "center", "right", "full"];
const FLYOUT_SIDES: readonly NavFlyoutSide[] = ["auto", "right", "left"];
const RAIL_RESTS: readonly NavRailRest[] = ["hidden", "icons"];
const RAIL_SIDES: readonly NavRailSide[] = ["left", "right"];
const RAIL_EXPANDS: readonly NavRailExpand[] = ["hover", "strip", "click"];
const RAIL_CONTENTS: readonly NavRailContent[] = ["overlay", "push"];
const RAIL_HOVER_CONTENTS: readonly NavRailHoverContent[] = ["same", "overlay", "push"];
const RAIL_ON_NAVIGATE: readonly NavRailOnNavigate[] = ["close", "keep"];
const SCOPES: readonly NavScope[] = ["root", "section", "parent", "current"];
const SORTS: readonly NavSort[] = ["manual", "alphabetical", "date"];
const DIRECTIONS: readonly NavSortDirection[] = ["asc", "desc"];
const FOLDERS_FIRST: readonly NavFoldersFirst[] = ["first", "last", "mixed"];
const DATE_FIELDS: readonly NavDateField[] = ["created", "modified", "published"];
const INDEX_ENTRIES: readonly NavIndexEntry[] = ["none", "first"];
const FOLDER_LINKS: readonly NavFolderLink[] = ["index", "none", "first-child"];
const FOLDER_CLICKS: readonly NavFolderClick[] = ["link", "toggle"];
const FOLDER_STATES: readonly NavFolderState[] = ["collapsed", "open"];
const TRIGGERS: readonly NavTrigger[] = ["click", "hover"];
const PAGER_ORDERS: readonly NavPagerOrder[] = ["tree", "siblings"];
const ICONS: readonly NavIcons[] = ["none", "type", "custom", "both"];

/** Option spellings from 0.1.x that still resolve, with a warning. */
const LEGACY_VARIANTS: Record<string, NavVariant> = { vertical: "tree", horizontal: "bar" };

/**
 * Defaults live here, not in the manifest: Quartz passes the raw YAML `options` to the
 * component constructor and never merges `quartz.defaultOptions` from package.json.
 */
export const defaultOptions = {
  language: "auto",
  variant: "tree",
  mobile: "same",
  align: "left",
  className: "",
  id: "",
  title: "",
  ariaLabel: "",
  chevrons: true,
  icons: "both",
  iconNames: {
    folder: "folder",
    folderOpen: "folder-open",
    file: "file",
    home: "house",
    chevron: "chevron-down",
    menu: "menu",
    close: "x",
    pin: "pin",
    unpin: "pin-off",
    previous: "chevron-left",
    next: "chevron-right",
  },
  nodeIcons: {},
  dividers: [],
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
  frontmatterKeys: {
    order: "navOrder",
    title: "navTitle",
    hide: "navHide",
    icon: "navIcon",
    divider: "navDivider",
  },
  hideTags: true,
  hideUnlisted: true,
  hideDrafts: true,
  hideEmptyFolders: true,
  keepIndexOnlyFolders: true,
  include: [],
  exclude: [],
  folderLink: "index",
  folderClick: "toggle",
  folderDefaultState: "collapsed",
  expandActive: true,
  exclusive: false,
  persistState: false,
  trigger: "click",
  breakpoints: {},
  tabs: { secondary: true },
  flyout: { side: "auto" },
  rail: {
    rest: "hidden",
    side: "left",
    expand: "hover",
    content: "overlay",
    hoverContent: "same",
    pinContent: "same",
    onNavigate: "close",
    pin: true,
    startPinned: false,
  },
  select: { button: false },
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

function pickLanguage(value: unknown): string {
  if (value === undefined) return defaultOptions.language;
  if (
    typeof value === "string" &&
    /^[A-Za-z]{2,3}([-_][A-Za-z0-9]+)*$|^(auto|all)$/.test(value.trim())
  ) {
    return value.trim().toLowerCase();
  }
  warnOnce(
    `language:${String(value)}`,
    `Unknown value ${JSON.stringify(value)} for \`language\`; using \`auto\`.`,
  );
  return defaultOptions.language;
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

function normalizeNodeIcons(value: unknown): Record<string, string> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    if (value !== undefined)
      warnOnce("nodeIcons:type", "`nodeIcons` must be a map of path → icon.");
    return {};
  }
  const out: Record<string, string> = {};
  for (const [key, icon] of Object.entries(value as Record<string, unknown>)) {
    if (typeof icon === "string" && icon.trim()) {
      out[normalizePath(key)] = icon.trim();
    } else {
      warnOnce(`nodeIcons:${key}`, `Ignoring invalid \`nodeIcons\` entry for "${key}".`);
    }
  }
  return out;
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
  const iconNames = (user.iconNames ?? {}) as Record<string, unknown>;
  const bp = (user.breakpoints ?? {}) as Record<string, unknown>;
  const tabs = (user.tabs ?? {}) as Record<string, unknown>;
  const flyout = (user.flyout ?? {}) as Record<string, unknown>;
  const rail = (user.rail ?? {}) as Record<string, unknown>;
  const select = (user.select ?? {}) as Record<string, unknown>;
  const columns = (user.columns ?? {}) as Record<string, unknown>;
  const pager = (user.pager ?? {}) as Record<string, unknown>;

  let variant = user.variant;
  if (typeof variant === "string" && variant in LEGACY_VARIANTS) {
    const renamed = LEGACY_VARIANTS[variant]!;
    warnOnce(`legacy:variant:${variant}`, `\`variant: ${variant}\` is now \`${renamed}\`.`);
    variant = renamed;
  }
  let trigger = user.trigger;
  if (trigger === undefined && user.dropdownTrigger !== undefined) {
    warnOnce("legacy:dropdownTrigger", "`dropdownTrigger` is now `trigger`.");
    trigger = user.dropdownTrigger;
  }
  if (user.style !== undefined) {
    warnOnce(
      "legacy:style",
      "`style` was removed; the navigation follows the Quartz theme, tune it with the `--quartz-nav-*` CSS variables.",
    );
  }

  const resolvedVariant = pickEnum("variant", variant, VARIANTS, defaultOptions.variant);
  let mobile = pickEnum("mobile", user.mobile, MOBILE, defaultOptions.mobile);
  // The rail is a sliding panel of its own on every screen; a second drawer or an inline
  // accordion below the breakpoint would compete with it.
  if (resolvedVariant === "rail" && (mobile === "accordion" || mobile === "offcanvas")) {
    warnOnce(
      `rail:mobile:${mobile}`,
      `\`mobile: ${mobile}\` does not apply to \`variant: rail\`, which slides in on small screens by itself; using \`same\`.`,
    );
    mobile = "same";
  }

  return {
    language: pickLanguage(user.language),
    variant: resolvedVariant,
    mobile,
    align: pickEnum("align", user.align, ALIGNS, defaultOptions.align),
    className: pickString(user.className, ""),
    id: pickString(user.id, "").replace(/[^A-Za-z0-9_-]/g, "-"),
    title: pickString(user.title, ""),
    ariaLabel: pickString(user.ariaLabel, ""),
    chevrons: pickBoolean(user.chevrons, defaultOptions.chevrons),
    icons:
      user.icons === true
        ? "both"
        : user.icons === false
          ? "none"
          : pickEnum("icons", user.icons, ICONS, defaultOptions.icons),
    iconNames: {
      folder: pickString(iconNames.folder, "") || defaultOptions.iconNames.folder,
      folderOpen: pickString(iconNames.folderOpen, "") || defaultOptions.iconNames.folderOpen,
      file: pickString(iconNames.file, "") || defaultOptions.iconNames.file,
      home: pickString(iconNames.home, "") || defaultOptions.iconNames.home,
      chevron: pickString(iconNames.chevron, "") || defaultOptions.iconNames.chevron,
      menu: pickString(iconNames.menu, "") || defaultOptions.iconNames.menu,
      close: pickString(iconNames.close, "") || defaultOptions.iconNames.close,
      pin: pickString(iconNames.pin, "") || defaultOptions.iconNames.pin,
      unpin: pickString(iconNames.unpin, "") || defaultOptions.iconNames.unpin,
      previous: pickString(iconNames.previous, "") || defaultOptions.iconNames.previous,
      next: pickString(iconNames.next, "") || defaultOptions.iconNames.next,
    },
    nodeIcons: normalizeNodeIcons(user.nodeIcons),
    dividers: pickStringList("dividers", user.dividers).map(normalizePath),
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
      divider: pickString(keys.divider, "") || defaultOptions.frontmatterKeys.divider,
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
    trigger: pickEnum("trigger", trigger, TRIGGERS, defaultOptions.trigger),
    breakpoints: {
      mobile:
        typeof bp.mobile === "string" || typeof bp.mobile === "number" ? bp.mobile : undefined,
      desktop:
        typeof bp.desktop === "string" || typeof bp.desktop === "number" ? bp.desktop : undefined,
    } as ResolvedOptions["breakpoints"],
    tabs: { secondary: pickBoolean(tabs.secondary, defaultOptions.tabs.secondary) },
    flyout: {
      side: pickEnum("flyout.side", flyout.side, FLYOUT_SIDES, defaultOptions.flyout.side),
    },
    rail: {
      rest: pickEnum("rail.rest", rail.rest, RAIL_RESTS, defaultOptions.rail.rest),
      side: pickEnum("rail.side", rail.side, RAIL_SIDES, defaultOptions.rail.side),
      expand: pickEnum("rail.expand", rail.expand, RAIL_EXPANDS, defaultOptions.rail.expand),
      content: pickEnum("rail.content", rail.content, RAIL_CONTENTS, defaultOptions.rail.content),
      hoverContent: pickEnum(
        "rail.hoverContent",
        rail.hoverContent,
        RAIL_HOVER_CONTENTS,
        defaultOptions.rail.hoverContent,
      ),
      pinContent: pickEnum(
        "rail.pinContent",
        rail.pinContent,
        RAIL_HOVER_CONTENTS,
        defaultOptions.rail.pinContent,
      ),
      onNavigate: pickEnum(
        "rail.onNavigate",
        rail.onNavigate,
        RAIL_ON_NAVIGATE,
        defaultOptions.rail.onNavigate,
      ),
      pin: pickBoolean(rail.pin, defaultOptions.rail.pin),
      startPinned: pickBoolean(rail.startPinned, defaultOptions.rail.startPinned),
    },
    select: { button: pickBoolean(select.button, defaultOptions.select.button) },
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
    nodeIcons: opts.nodeIcons,
    dividers: opts.dividers,
  });
}
