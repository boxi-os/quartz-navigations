import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { jsxs, jsx, Fragment } from 'preact/jsx-runtime';

createRequire(import.meta.url);

// src/util/warn.ts
var warned = /* @__PURE__ */ new Set();
function warnOnce(key, message) {
  if (warned.has(key)) return;
  warned.add(key);
  console.warn(`[navigations] ${message}`);
}

// src/breakpoints.ts
var defaultBreakpoints = { mobile: "800px", desktop: "1200px" };
var BREAKPOINTS_FILE = path.join("quartz", "styles", "variables.scss");
var MOBILE_PLACEHOLDER = "__NAV_BP_MOBILE__";
var DESKTOP_PLACEHOLDER = "__NAV_BP_DESKTOP__";
function parseBreakpoints(scss) {
  const map = /\$breakpoints\s*:\s*\(([^)]*)\)/.exec(scss);
  if (!map) return {};
  const out = {};
  for (const entry of map[1].split(",")) {
    const m = /^\s*(mobile|desktop)\s*:\s*([0-9.]+(?:px|rem|em))\s*$/.exec(entry);
    if (m) out[m[1]] = m[2];
  }
  return out;
}
function readProjectBreakpoints(cwd = process.cwd()) {
  const file = path.join(cwd, BREAKPOINTS_FILE);
  try {
    if (!fs.existsSync(file)) return void 0;
    return parseBreakpoints(fs.readFileSync(file, "utf8"));
  } catch {
    return void 0;
  }
}
function validLength(value) {
  if (typeof value === "number" && Number.isFinite(value)) return `${value}px`;
  if (typeof value === "string" && /^[0-9.]+(px|rem|em)$/.test(value.trim())) return value.trim();
  return void 0;
}
function resolveBreakpoints(override, cwd = process.cwd()) {
  const project = readProjectBreakpoints(cwd);
  if (!project) {
    warnOnce(
      "breakpoints-file",
      `Could not read ${BREAKPOINTS_FILE}; using ${defaultBreakpoints.mobile} / ${defaultBreakpoints.desktop} as breakpoints.`
    );
  }
  return {
    mobile: validLength(override?.mobile) ?? project?.mobile ?? defaultBreakpoints.mobile,
    desktop: validLength(override?.desktop) ?? project?.desktop ?? defaultBreakpoints.desktop
  };
}
function applyBreakpoints(css, bp) {
  return css.split(MOBILE_PLACEHOLDER).join(bp.mobile).split(DESKTOP_PLACEHOLDER).join(bp.desktop);
}

// src/i18n/locales/en-US.ts
var en_US_default = {
  nav: {
    label: "Main navigation",
    toggleMenu: "Toggle menu",
    closeMenu: "Close menu",
    home: "Home",
    overview: "Overview",
    previous: "Previous",
    next: "Next",
    jumpTo: "Jump to\u2026",
    go: "Go",
    pager: "Previous and next page",
    expand: ({ title }) => `Expand ${title}`
  }
};

// src/i18n/locales/de-DE.ts
var deDE = {
  nav: {
    label: "Hauptnavigation",
    toggleMenu: "Men\xFC umschalten",
    closeMenu: "Men\xFC schlie\xDFen",
    home: "Start",
    overview: "\xDCbersicht",
    previous: "Zur\xFCck",
    next: "Weiter",
    jumpTo: "Springe zu\u2026",
    go: "Los",
    pager: "Vorherige und n\xE4chste Seite",
    expand: ({ title }) => `${title} aufklappen`
  }
};
var de_DE_default = deDE;

// src/i18n/index.ts
var locales = {
  "en-US": en_US_default,
  "de-DE": de_DE_default
};
function i18n(locale) {
  if (!locale) return en_US_default;
  const exact = locales[locale];
  if (exact) return exact;
  const primary = locale.toLowerCase().split(/[-_]/)[0];
  for (const [key, value] of Object.entries(locales)) {
    if (key.toLowerCase().split("-")[0] === primary) return value;
  }
  return en_US_default;
}

// src/options.ts
var VARIANTS = [
  "vertical",
  "horizontal",
  "accordion",
  "dropdown",
  "flyout",
  "tabs",
  "mega",
  "columns",
  "select",
  "pager"
];
var MOBILE = ["same", "accordion", "offcanvas", "select", "hidden"];
var STYLES = ["unstyled", "basic", "full"];
var SCOPES = ["root", "section", "parent", "current"];
var SORTS = ["manual", "alphabetical", "date"];
var DIRECTIONS = ["asc", "desc"];
var FOLDERS_FIRST = ["first", "last", "mixed"];
var DATE_FIELDS = ["created", "modified", "published"];
var INDEX_ENTRIES = ["none", "first"];
var FOLDER_LINKS = ["index", "none", "first-child"];
var FOLDER_CLICKS = ["link", "toggle"];
var FOLDER_STATES = ["collapsed", "open"];
var TRIGGERS = ["click", "hover"];
var PAGER_ORDERS = ["tree", "siblings"];
var defaultOptions = {
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
  pager: { labels: true, order: "tree" }
};
function pickEnum(key, value, allowed, fallback) {
  if (value === void 0) return fallback;
  if (typeof value === "string" && allowed.includes(value)) {
    return value;
  }
  warnOnce(
    `enum:${key}:${String(value)}`,
    `Unknown value ${JSON.stringify(value)} for \`${key}\`; using \`${fallback}\`.`
  );
  return fallback;
}
function pickBoolean(value, fallback) {
  return typeof value === "boolean" ? value : fallback;
}
function pickString(value, fallback) {
  return typeof value === "string" ? value.trim() : fallback;
}
function pickInt(key, value, fallback, min) {
  if (value === void 0) return fallback;
  const n = typeof value === "string" ? Number(value) : value;
  if (typeof n === "number" && Number.isInteger(n) && n >= min) return n;
  warnOnce(
    `int:${key}:${String(value)}`,
    `\`${key}\` must be an integer >= ${min}; using ${fallback}.`
  );
  return fallback;
}
function pickStringList(key, value) {
  if (value === void 0) return [];
  const list = Array.isArray(value) ? value : [value];
  const out = [];
  for (const v of list) {
    if (typeof v === "string" && v.trim().length > 0) {
      out.push(v.trim());
    } else {
      warnOnce(
        `list:${key}:${String(v)}`,
        `Ignoring invalid \`${key}\` entry ${JSON.stringify(v)}.`
      );
    }
  }
  return out;
}
function normalizePath(value) {
  let s = value.trim().replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
  if (s.endsWith(".md")) s = s.slice(0, -3);
  if (s === "index") return "";
  if (s.endsWith("/index")) s = s.slice(0, -"/index".length);
  return s;
}
function normalizeOrder(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    if (value !== void 0) warnOnce("order:type", "`order` must be a map of folder \u2192 list.");
    return {};
  }
  const out = {};
  for (const [key, list] of Object.entries(value)) {
    const entries = pickStringList(`order.${key}`, list).map((s) => normalizePath(s));
    out[normalizePath(key)] = entries;
  }
  return out;
}
function resolveOptions(userOpts) {
  const user = userOpts ?? {};
  const keys = user.frontmatterKeys ?? {};
  const bp = user.breakpoints ?? {};
  const tabs = user.tabs ?? {};
  const columns = user.columns ?? {};
  const pager = user.pager ?? {};
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
      defaultOptions.sortDirection
    ),
    foldersFirst: pickEnum(
      "foldersFirst",
      user.foldersFirst,
      FOLDERS_FIRST,
      defaultOptions.foldersFirst
    ),
    dateField: pickEnum("dateField", user.dateField, DATE_FIELDS, defaultOptions.dateField),
    order: normalizeOrder(user.order),
    stripNumericPrefix: pickBoolean(user.stripNumericPrefix, defaultOptions.stripNumericPrefix),
    frontmatterKeys: {
      order: pickString(keys.order, "") || defaultOptions.frontmatterKeys.order,
      title: pickString(keys.title, "") || defaultOptions.frontmatterKeys.title,
      hide: pickString(keys.hide, "") || defaultOptions.frontmatterKeys.hide,
      icon: pickString(keys.icon, "") || defaultOptions.frontmatterKeys.icon
    },
    hideTags: pickBoolean(user.hideTags, defaultOptions.hideTags),
    hideUnlisted: pickBoolean(user.hideUnlisted, defaultOptions.hideUnlisted),
    hideDrafts: pickBoolean(user.hideDrafts, defaultOptions.hideDrafts),
    hideEmptyFolders: pickBoolean(user.hideEmptyFolders, defaultOptions.hideEmptyFolders),
    keepIndexOnlyFolders: pickBoolean(
      user.keepIndexOnlyFolders,
      defaultOptions.keepIndexOnlyFolders
    ),
    include: pickStringList("include", user.include),
    exclude: pickStringList("exclude", user.exclude),
    folderLink: pickEnum("folderLink", user.folderLink, FOLDER_LINKS, defaultOptions.folderLink),
    folderClick: pickEnum(
      "folderClick",
      user.folderClick,
      FOLDER_CLICKS,
      defaultOptions.folderClick
    ),
    folderDefaultState: pickEnum(
      "folderDefaultState",
      user.folderDefaultState,
      FOLDER_STATES,
      defaultOptions.folderDefaultState
    ),
    expandActive: pickBoolean(user.expandActive, defaultOptions.expandActive),
    exclusive: pickBoolean(user.exclusive, defaultOptions.exclusive),
    persistState: pickBoolean(user.persistState, defaultOptions.persistState),
    dropdownTrigger: pickEnum(
      "dropdownTrigger",
      user.dropdownTrigger,
      TRIGGERS,
      defaultOptions.dropdownTrigger
    ),
    breakpoints: {
      mobile: typeof bp.mobile === "string" || typeof bp.mobile === "number" ? bp.mobile : void 0,
      desktop: typeof bp.desktop === "string" || typeof bp.desktop === "number" ? bp.desktop : void 0
    },
    tabs: { secondary: pickBoolean(tabs.secondary, defaultOptions.tabs.secondary) },
    columns: { max: pickInt("columns.max", columns.max, defaultOptions.columns.max, 1) },
    pager: {
      labels: pickBoolean(pager.labels, defaultOptions.pager.labels),
      order: pickEnum("pager.order", pager.order, PAGER_ORDERS, defaultOptions.pager.order)
    }
  };
}
function treeOptionsKey(opts) {
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
    icons: opts.icons
  });
}

// node_modules/@quartz-community/utils/dist/path.js
function simplifySlug(fp) {
  const res = stripSlashes(trimSuffix(fp, "index"), true);
  return res.length === 0 ? "/" : res;
}
function joinSegments(...args) {
  if (args.length === 0) {
    return "";
  }
  let joined = args.filter((segment) => segment !== "" && segment !== "/").map((segment) => stripSlashes(segment)).join("/");
  const first = args[0];
  const last = args[args.length - 1];
  if (first?.startsWith("/")) {
    joined = "/" + joined;
  }
  if (last?.endsWith("/")) {
    joined = joined + "/";
  }
  return joined;
}
function endsWith(s, suffix) {
  return s === suffix || s.endsWith("/" + suffix);
}
function trimSuffix(s, suffix) {
  if (endsWith(s, suffix)) {
    s = s.slice(0, -suffix.length);
  }
  return s;
}
function stripSlashes(s, onlyStripPrefix) {
  if (s.startsWith("/")) {
    s = s.substring(1);
  }
  if (!onlyStripPrefix && s.endsWith("/")) {
    s = s.slice(0, -1);
  }
  return s;
}
function pathToRoot(slug2) {
  let rootPath = slug2.split("/").filter((x) => x !== "").slice(0, -1).map((_) => "..").join("/");
  if (rootPath.length === 0) {
    rootPath = ".";
  }
  return rootPath;
}
function resolveRelative(current, target) {
  const res = joinSegments(pathToRoot(current), simplifySlug(target));
  return res;
}

// src/links.ts
function hrefFor(current, target) {
  return resolveRelative(current, target);
}
function firstPage(node) {
  for (const child of node.children) {
    if (child.kind === "page") return child;
    if (child.hasIndex) return child;
    const nested = firstPage(child);
    if (nested) return nested;
  }
  return void 0;
}
function linkTarget(node, opts) {
  if (node.kind === "page") return node.slug;
  switch (opts.folderLink) {
    case "none":
      return void 0;
    case "first-child":
      return firstPage(node)?.slug;
    default:
      return node.hasIndex ? node.slug : firstPage(node)?.slug;
  }
}

// src/scope.ts
function chainOf(tree, slug2) {
  const out = [];
  let node = tree.bySlug.get(slug2);
  while (node) {
    out.push(node);
    node = node.parentSlug !== void 0 ? tree.bySlug.get(node.parentSlug) : void 0;
  }
  return out;
}
function parentOf(tree, node) {
  return node.parentSlug !== void 0 ? tree.bySlug.get(node.parentSlug) : void 0;
}
function resolveScope(tree, currentSlug, opts) {
  const baseSlug = opts.rootPath ? `${opts.rootPath}/index` : "index";
  const base = tree.bySlug.get(baseSlug);
  if (!base || base.kind !== "folder") {
    warnOnce(
      `root-path:${opts.rootPath}`,
      `\`rootPath: ${opts.rootPath}\` is not a folder with visible pages.`
    );
    return void 0;
  }
  if (opts.rootPath && opts.hideOutsideRoot && currentSlug !== baseSlug && !currentSlug.startsWith(`${opts.rootPath}/`)) {
    return void 0;
  }
  const chain = chainOf(tree, currentSlug);
  const current = chain[0];
  const trail = new Set(chain.slice(1).map((n) => n.slug));
  const inBase = (n) => !opts.rootPath || n.slug === base.slug || n.slug.startsWith(`${opts.rootPath}/`);
  let root;
  switch (opts.scope) {
    case "section":
      root = chain.find((n) => n.kind === "folder" && n.depth === base.depth + 1 && inBase(n));
      break;
    case "parent":
      root = current ? parentOf(tree, current) ?? current : void 0;
      break;
    case "current":
      root = current ? current.kind === "folder" ? current : parentOf(tree, current) : void 0;
      break;
    default:
      root = base;
  }
  if (!root || root.kind !== "folder" || !inBase(root)) return void 0;
  return { base, root, current, trail };
}
function flatten(root, opts) {
  const out = [];
  const walk = (node, level) => {
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
function pagerNeighbours(tree, scope, opts) {
  const { current } = scope;
  if (!current) return {};
  let list;
  if (opts.pager.order === "siblings") {
    const parent = parentOf(tree, current);
    list = parent ? parent.children : [];
  } else {
    list = flatten(scope.root, opts);
    if (scope.root.hasIndex && linkTarget(scope.root, opts)) list = [scope.root, ...list];
  }
  const linked = list.filter((n) => linkTarget(n, opts) !== void 0);
  const idx = linked.findIndex((n) => n.slug === current.slug);
  if (idx < 0) return {};
  return { prev: linked[idx - 1], next: linked[idx + 1] };
}

// src/frontmatter.ts
function frontmatterOf(value) {
  return value !== null && typeof value === "object" ? value : void 0;
}
function readString(fm, key) {
  const v = fm?.[key];
  if (typeof v === "string") {
    const s = v.trim();
    return s.length > 0 ? s : void 0;
  }
  if (typeof v === "number") return String(v);
  return void 0;
}
function readNumber(fm, key) {
  const v = fm?.[key];
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim() !== "") {
    const n = Number(v);
    if (Number.isFinite(n)) return n;
  }
  return void 0;
}
function readBoolean(fm, key) {
  const v = fm?.[key];
  if (typeof v === "boolean") return v;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    if (s === "true" || s === "yes") return true;
    if (s === "false" || s === "no") return false;
  }
  return void 0;
}

// src/sort.ts
function compareOptional(x, y, dir) {
  if (x === void 0 && y === void 0) return 0;
  if (x === void 0) return 1;
  if (y === void 0) return -1;
  return (x - y) * dir;
}
function compareNodes(opts) {
  const dir = opts.sortDirection === "desc" ? -1 : 1;
  const collator = new Intl.Collator(void 0, { numeric: true, sensitivity: "base" });
  const byTitle = (a, b) => collator.compare(a.title, b.title) * dir;
  const numeric = (get) => (a, b) => compareOptional(get(a), get(b), dir);
  let chain;
  switch (opts.sort) {
    case "alphabetical":
      chain = [byTitle];
      break;
    case "date":
      chain = [numeric((n) => n.date?.getTime()), byTitle];
      break;
    default:
      chain = [
        numeric((n) => n.listOrder),
        numeric((n) => n.order),
        numeric((n) => n.prefixOrder),
        byTitle
      ];
  }
  const foldersFirst = (a, b) => {
    if (opts.foldersFirst === "mixed" || a.kind === b.kind) return 0;
    const folderFirst = a.kind === "folder" ? -1 : 1;
    return opts.foldersFirst === "first" ? folderFirst : -folderFirst;
  };
  return (a, b) => {
    const byKind = foldersFirst(a, b);
    if (byKind !== 0) return byKind;
    for (const cmp of chain) {
      const r = cmp(a, b);
      if (r !== 0) return r;
    }
    return 0;
  };
}

// src/util/glob.ts
function globToRegExp(glob) {
  let re = "";
  const g = glob.trim().replace(/^\/+|\/+$/g, "");
  for (let i = 0; i < g.length; i++) {
    const c = g[i];
    if (c === "*") {
      if (g[i + 1] === "*") {
        re += ".*";
        i++;
      } else {
        re += "[^/]*";
      }
    } else if (c === "?") {
      re += "[^/]";
    } else {
      re += /[.+^${}()|[\]\\]/.test(c) ? `\\${c}` : c;
    }
  }
  return new RegExp(`^${re}$`);
}
function matchesAny(patterns, slug2) {
  if (patterns.length === 0) return false;
  const candidates = /* @__PURE__ */ new Set([slug2]);
  const simplified = slug2 === "index" ? "" : slug2.replace(/\/index$/, "");
  candidates.add(simplified);
  const segments = simplified.split("/").filter((s) => s.length > 0);
  for (let i = 1; i < segments.length; i++) {
    candidates.add(segments.slice(0, i).join("/"));
  }
  for (const c of candidates) {
    for (const p of patterns) {
      if (p.test(c)) return true;
    }
  }
  return false;
}

// src/tree.ts
var NUMERIC_PREFIX = /^(\d+)[-_. ]+(.+)$/;
function newDraft(kind, segments) {
  const slug2 = kind === "folder" ? [...segments, "index"].join("/") : segments.join("/");
  return {
    kind,
    segment: segments[segments.length - 1] ?? "",
    depth: segments.length,
    slug: slug2,
    children: /* @__PURE__ */ new Map(),
    hasIndex: false,
    isVirtual: false
  };
}
function isDraft(fm) {
  const v = fm?.draft;
  return v === true || typeof v === "string" && v.trim().toLowerCase() === "true";
}
function stripExtension(name) {
  const i = name.lastIndexOf(".");
  return i > 0 ? name.slice(0, i) : name;
}
function ensureFolder(root, segments, dirParts) {
  let node = root;
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    let child = node.children.get(seg);
    if (!child || child.kind !== "folder") {
      child = newDraft("folder", segments.slice(0, i + 1));
      node.children.set(seg, child);
    }
    if (dirParts && child.nameHint === void 0) {
      const hint = dirParts[i];
      if (hint) child.nameHint = hint;
    }
    node = child;
  }
  return node;
}
function collect(allFiles, opts) {
  const include = opts.include.map(globToRegExp);
  const exclude = opts.exclude.map(globToRegExp);
  const root = newDraft("folder", []);
  for (const data of allFiles) {
    const slug2 = typeof data.slug === "string" ? data.slug : "";
    if (!slug2 || slug2 === "404") continue;
    if (opts.hideTags && (slug2 === "tags" || slug2.startsWith("tags/"))) continue;
    if (opts.hideUnlisted && data.unlisted === true) continue;
    const fm = frontmatterOf(data.frontmatter);
    if (opts.hideDrafts && isDraft(fm)) continue;
    if (matchesAny(exclude, slug2)) continue;
    if (include.length > 0 && !matchesAny(include, slug2)) continue;
    const segments = slug2.split("/");
    const isIndex = segments[segments.length - 1] === "index";
    const folderSegments = segments.slice(0, -1);
    const real = typeof data.filePath === "string";
    const relativePath = typeof data.relativePath === "string" ? data.relativePath : void 0;
    const pathParts = real && relativePath ? relativePath.split("/") : void 0;
    const dirParts = pathParts?.slice(0, -1);
    const fileName = pathParts?.[pathParts.length - 1];
    const folder = ensureFolder(root, folderSegments, dirParts);
    if (isIndex) {
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
    folder.children.set(page.segment, page);
  }
  return root;
}
function titleOf(draft, opts) {
  const fm = draft.frontmatter;
  const explicit = readString(fm, opts.frontmatterKeys.title);
  if (explicit) return explicit;
  const title = readString(fm, "title");
  let fromName = false;
  let out;
  if (title && title !== "index" && draft.kind === "page") {
    out = title;
    fromName = draft.nameHint !== void 0 && title === draft.nameHint;
  } else if (title && title !== "index" && !draft.isVirtual) {
    out = title;
  } else if (draft.nameHint) {
    out = draft.nameHint;
    fromName = true;
  } else if (title && title !== "index") {
    out = title;
    fromName = true;
  } else {
    out = draft.segment;
    fromName = true;
  }
  if (opts.stripNumericPrefix && (fromName || NUMERIC_PREFIX.test(out))) {
    const m = NUMERIC_PREFIX.exec(out);
    if (m) out = m[2];
  }
  return out;
}
function prefixOrderOf(draft) {
  const source = draft.nameHint ?? draft.segment;
  const m = NUMERIC_PREFIX.exec(source);
  return m ? Number(m[1]) : void 0;
}
function listOrderOf(draft, parentPath, opts) {
  const list = opts.order[parentPath];
  if (!list || list.length === 0) return void 0;
  const wanted = [draft.segment, draft.nameHint, draft.nameHint?.toLowerCase()].filter(
    (s) => typeof s === "string"
  );
  for (let i = 0; i < list.length; i++) {
    const entry = list[i];
    if (wanted.includes(entry) || wanted.includes(entry.toLowerCase())) return i;
  }
  return void 0;
}
function dateOf(draft, opts) {
  const dates = draft.data?.dates;
  if (dates === null || typeof dates !== "object") return void 0;
  const d = dates[opts.dateField];
  return d instanceof Date && !Number.isNaN(d.getTime()) ? d : void 0;
}
function finalize(draft, parentSlug, parentPath, opts, bySlug, comparator) {
  if (readBoolean(draft.frontmatter, opts.frontmatterKeys.hide) === true) return void 0;
  const path2 = draft.depth === 0 ? "" : draft.slug.replace(/\/index$/, "");
  const node = {
    kind: draft.kind,
    slug: draft.slug,
    segment: draft.segment,
    title: titleOf(draft, opts),
    parentSlug,
    depth: draft.depth,
    children: [],
    hasIndex: draft.hasIndex,
    isVirtual: draft.isVirtual
  };
  const order = readNumber(draft.frontmatter, opts.frontmatterKeys.order);
  if (order !== void 0) node.order = order;
  const listOrder = listOrderOf(draft, parentPath, opts);
  if (listOrder !== void 0) node.listOrder = listOrder;
  const prefixOrder = prefixOrderOf(draft);
  if (prefixOrder !== void 0) node.prefixOrder = prefixOrder;
  const date = dateOf(draft, opts);
  if (date) node.date = date;
  if (opts.icons) {
    const icon = readString(draft.frontmatter, opts.frontmatterKeys.icon);
    if (icon) node.icon = icon;
  }
  if (draft.kind === "folder") {
    const list = opts.order[path2];
    if (list) {
      for (const entry of list) {
        const known = [...draft.children.values()].some(
          (c) => c.segment === entry || c.nameHint === entry || c.nameHint?.toLowerCase() === entry
        );
        if (!known) {
          warnOnce(
            `order:${path2}:${entry}`,
            `\`order\` for "${path2 || "/"}" lists unknown entry "${entry}".`
          );
        }
      }
    }
    for (const child of draft.children.values()) {
      const c = finalize(child, node.slug, path2, opts, bySlug, comparator);
      if (c) node.children.push(c);
    }
    node.children.sort(comparator);
    if (draft.depth > 0 && node.children.length === 0 && opts.hideEmptyFolders) {
      if (!(node.hasIndex && opts.keepIndexOnlyFolders)) return void 0;
    }
  }
  bySlug.set(node.slug, node);
  return node;
}
function buildTree(allFiles, opts) {
  const bySlug = /* @__PURE__ */ new Map();
  const root = finalize(collect(allFiles, opts), void 0, "", opts, bySlug, compareNodes(opts));
  return { root, bySlug };
}
var cache = /* @__PURE__ */ new WeakMap();
function treeFromFiles(allFiles, opts) {
  let perOptions = cache.get(allFiles);
  if (!perOptions) {
    perOptions = /* @__PURE__ */ new Map();
    cache.set(allFiles, perOptions);
  }
  const key = treeOptionsKey(opts);
  const hit = perOptions.get(key);
  if (hit) return hit;
  const tree = buildTree(allFiles, opts);
  perOptions.set(key, tree);
  return tree;
}

// src/util/hash.ts
function shortHash(input) {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  return hash.toString(36);
}

// node_modules/@quartz-community/utils/dist/lang.js
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
var POPUP_VARIANTS = /* @__PURE__ */ new Set(["dropdown", "mega", "flyout"]);
var chevron = /* @__PURE__ */ jsx(
  "svg",
  {
    class: "quartz-nav__chevron-icon",
    viewBox: "0 0 24 24",
    width: "16",
    height: "16",
    "aria-hidden": "true",
    children: /* @__PURE__ */ jsx(
      "polyline",
      {
        points: "6 9 12 15 18 9",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2",
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }
    )
  }
);
var burger = /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", width: "24", height: "24", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
  "path",
  {
    d: "M4 6h16M4 12h16M4 18h16",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round"
  }
) });
function stateOf(node, ctx) {
  if (node.slug === ctx.slug) return "active";
  if (ctx.scope.trail.has(node.slug)) return "active-trail";
  return void 0;
}
function label(node, ctx, text) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    ctx.opts.icons && node.icon && /* @__PURE__ */ jsx("span", { class: "quartz-nav__icon", "aria-hidden": "true", children: node.icon }),
    /* @__PURE__ */ jsx("span", { class: "quartz-nav__text", children: text ?? node.title })
  ] });
}
function titleEl(node, ctx, extra) {
  const state = stateOf(node, ctx);
  const target = extra?.target ?? (extra?.forceStatic ? void 0 : linkTarget(node, ctx.opts));
  const cls = classNames("quartz-nav__link", extra?.className, state);
  if (!target) {
    return /* @__PURE__ */ jsx("span", { class: classNames(cls, "quartz-nav__link--static"), children: label(node, ctx, extra?.text) });
  }
  return /* @__PURE__ */ jsx(
    "a",
    {
      class: cls,
      href: hrefFor(ctx.slug, target),
      "aria-current": state === "active" ? "page" : void 0,
      children: label(node, ctx, extra?.text)
    }
  );
}
function levelAllowed(level, ctx) {
  return ctx.opts.depth === 0 || level <= ctx.opts.depth;
}
function variantCollapsible(level, ctx) {
  switch (ctx.opts.variant) {
    case "accordion":
    case "flyout":
      return true;
    case "dropdown":
    case "mega":
      return level === 1;
    default:
      return false;
  }
}
function renderList(nodes, level, ctx, extraClass) {
  if (nodes.length === 0) return null;
  return /* @__PURE__ */ jsx("ul", { class: classNames("quartz-nav__list", extraClass), "data-level": String(level), children: nodes.map((n) => renderItem(n, level, ctx)) });
}
function indexEntry(node, ctx) {
  if (ctx.opts.indexEntry !== "first" || !node.hasIndex) return null;
  const active = node.slug === ctx.slug;
  return /* @__PURE__ */ jsx(
    "li",
    {
      class: classNames(
        "quartz-nav__item",
        "quartz-nav__item--page",
        "quartz-nav__item--index",
        active ? "active" : void 0
      ),
      "data-slug": node.slug,
      children: titleEl(node, ctx, { target: node.slug, text: ctx.t.nav.overview })
    }
  );
}
function renderItem(node, level, ctx) {
  const { opts } = ctx;
  const state = stateOf(node, ctx);
  const showChildren = node.kind === "folder" && node.children.length > 0 && levelAllowed(level + 1, ctx);
  const byVariant = showChildren && variantCollapsible(level, ctx);
  const byMobile = showChildren && !byVariant && opts.mobile === "accordion";
  const collapsible = byVariant || byMobile;
  const itemClass = classNames(
    "quartz-nav__item",
    node.kind === "folder" ? "quartz-nav__item--folder" : "quartz-nav__item--page",
    showChildren ? "quartz-nav__item--parent" : void 0,
    state
  );
  if (!collapsible) {
    return /* @__PURE__ */ jsxs("li", { class: itemClass, "data-slug": node.slug, children: [
      titleEl(node, ctx),
      showChildren && /* @__PURE__ */ jsxs("ul", { class: "quartz-nav__list", "data-level": String(level + 1), children: [
        indexEntry(node, ctx),
        node.children.map((c) => renderItem(c, level + 1, ctx))
      ] })
    ] });
  }
  const onTrail = state !== void 0;
  const popup = POPUP_VARIANTS.has(opts.variant) && byVariant;
  const open = byMobile ? true : !popup && (opts.folderDefaultState === "open" || opts.expandActive && onTrail);
  const target = opts.folderClick === "toggle" ? void 0 : linkTarget(node, opts);
  const separateLink = target !== void 0;
  return /* @__PURE__ */ jsxs(
    "li",
    {
      class: classNames(itemClass, separateLink ? "quartz-nav__item--split" : void 0),
      "data-slug": node.slug,
      children: [
        separateLink && titleEl(node, ctx, { target }),
        /* @__PURE__ */ jsxs(
          "details",
          {
            class: "quartz-nav__folder",
            open,
            name: opts.exclusive ? `${ctx.id}-l${level}` : void 0,
            "data-folder": node.slug,
            "data-trail": onTrail ? "true" : void 0,
            "data-mobile-collapsible": byMobile ? "true" : void 0,
            children: [
              /* @__PURE__ */ jsxs(
                "summary",
                {
                  class: classNames(
                    "quartz-nav__summary",
                    separateLink ? "quartz-nav__summary--toggle" : void 0
                  ),
                  children: [
                    separateLink ? /* @__PURE__ */ jsx("span", { class: "quartz-nav__sr-only", children: ctx.t.nav.expand({ title: node.title }) }) : titleEl(node, ctx, { forceStatic: true }),
                    (opts.chevrons || separateLink) && /* @__PURE__ */ jsx("span", { class: "quartz-nav__chevron", "aria-hidden": "true", children: chevron })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs("ul", { class: "quartz-nav__list", "data-level": String(level + 1), children: [
                indexEntry(node, ctx),
                node.children.map((c) => renderItem(c, level + 1, ctx))
              ] })
            ]
          }
        )
      ]
    }
  );
}
function renderTabs(ctx) {
  const { root } = ctx.scope;
  const primary = /* @__PURE__ */ jsx("ul", { class: "quartz-nav__list quartz-nav__tabs", "data-level": "1", children: root.children.map((n) => /* @__PURE__ */ jsx(
    "li",
    {
      class: classNames(
        "quartz-nav__item",
        n.kind === "folder" ? "quartz-nav__item--folder" : "quartz-nav__item--page",
        stateOf(n, ctx)
      ),
      "data-slug": n.slug,
      children: titleEl(n, ctx)
    }
  )) });
  const activeTab = root.children.find(
    (n) => n.kind === "folder" && (n.slug === ctx.slug || ctx.scope.trail.has(n.slug))
  );
  const secondary = ctx.opts.tabs.secondary && activeTab && levelAllowed(2, ctx) ? renderList(activeTab.children, 2, ctx, "quartz-nav__subtabs") : null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    primary,
    secondary
  ] });
}
function homeEntry(ctx) {
  const { base } = ctx.scope;
  if (!ctx.opts.showHome || !base.hasIndex) return null;
  const active = base.slug === ctx.slug;
  return /* @__PURE__ */ jsx(
    "li",
    {
      class: classNames(
        "quartz-nav__item",
        "quartz-nav__item--page",
        "quartz-nav__item--home",
        active ? "active" : void 0
      ),
      "data-slug": base.slug,
      children: titleEl(base, ctx, { target: base.slug, text: ctx.t.nav.home })
    }
  );
}
function selectEl(ctx, id) {
  const { root } = ctx.scope;
  const nodes = flatten(root, ctx.opts);
  const option = (node, level) => {
    const target = linkTarget(node, ctx.opts);
    const indent = "\xA0\xA0".repeat(Math.max(0, level - 1));
    return /* @__PURE__ */ jsx(
      "option",
      {
        value: target ? hrefFor(ctx.slug, target) : "",
        disabled: !target,
        selected: node.slug === ctx.slug,
        children: indent + node.title
      }
    );
  };
  const items = [];
  const grouped = /* @__PURE__ */ new Set();
  for (const child of root.children) {
    if (child.kind === "folder" && child.children.length > 0 && levelAllowed(2, ctx)) {
      const inner = nodes.filter(
        (n) => n.slug !== child.slug && n.slug.startsWith(child.slug.replace(/index$/, ""))
      );
      inner.forEach((n) => grouped.add(n.slug));
      grouped.add(child.slug);
      const indexTarget = linkTarget(child, ctx.opts);
      items.push(
        /* @__PURE__ */ jsxs("optgroup", { label: child.title, children: [
          indexTarget && /* @__PURE__ */ jsx("option", { value: hrefFor(ctx.slug, indexTarget), selected: child.slug === ctx.slug, children: ctx.t.nav.overview }),
          inner.map((n) => option(n, n.depth - child.depth))
        ] })
      );
    } else if (!grouped.has(child.slug)) {
      items.push(option(child, 1));
    }
  }
  const hasCurrent = ctx.scope.current !== void 0 && nodes.some((n) => n.slug === ctx.slug);
  return /* @__PURE__ */ jsxs("div", { class: "quartz-nav__jump", children: [
    /* @__PURE__ */ jsxs(
      "select",
      {
        class: "quartz-nav__select",
        id,
        "aria-label": ctx.opts.title ? void 0 : navLabel(ctx),
        children: [
          /* @__PURE__ */ jsx("option", { value: "", disabled: true, selected: !hasCurrent, children: ctx.t.nav.jumpTo }),
          items
        ]
      }
    ),
    /* @__PURE__ */ jsx("button", { type: "button", class: "quartz-nav__go", "data-select": id, children: ctx.t.nav.go })
  ] });
}
function navLabel(ctx) {
  if (ctx.opts.ariaLabel) return ctx.opts.ariaLabel;
  if (ctx.opts.title) return ctx.opts.title;
  return ctx.opts.variant === "pager" ? ctx.t.nav.pager : ctx.t.nav.label;
}
function rootClass(ctx, ...extra) {
  const { opts } = ctx;
  return classNames(
    ctx.displayClass,
    "quartz-nav",
    `quartz-nav--${opts.variant}`,
    `quartz-nav--mobile-${opts.mobile}`,
    opts.style !== "unstyled" ? "quartz-nav--basic" : void 0,
    opts.style === "full" ? "quartz-nav--full" : void 0,
    opts.className || void 0,
    ...extra
  );
}
function rootData(ctx) {
  const { opts } = ctx;
  return {
    "data-quartz-nav": ctx.id,
    "data-variant": opts.variant,
    "data-mobile": opts.mobile,
    "data-style": opts.style,
    "data-persist": opts.persistState && !POPUP_VARIANTS.has(opts.variant) ? "true" : void 0,
    "data-expand-active": opts.expandActive ? "true" : void 0,
    "data-trigger": POPUP_VARIANTS.has(opts.variant) ? opts.dropdownTrigger : void 0,
    "data-bp-mobile": ctx.mobileBreakpoint
  };
}
function renderNavigation(ctx) {
  const { opts, t } = ctx;
  const { root } = ctx.scope;
  const ariaLabel = navLabel(ctx);
  const offcanvas = opts.mobile === "offcanvas";
  const toggleId = `${ctx.id}-toggle`;
  const panelId = `${ctx.id}-panel`;
  const body = opts.variant === "tabs" ? renderTabs(ctx) : /* @__PURE__ */ jsxs("ul", { class: "quartz-nav__list", "data-level": "1", children: [
    homeEntry(ctx),
    root.children.map((n) => renderItem(n, 1, ctx))
  ] });
  if (root.children.length === 0 && !opts.showHome) return null;
  return /* @__PURE__ */ jsxs("nav", { class: rootClass(ctx), "aria-label": ariaLabel, ...rootData(ctx), children: [
    opts.title && /* @__PURE__ */ jsx("h3", { class: "quartz-nav__title", children: opts.title }),
    offcanvas && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          id: toggleId,
          class: "quartz-nav__toggle",
          "aria-label": t.nav.toggleMenu,
          "aria-controls": panelId,
          "aria-expanded": "false"
        }
      ),
      /* @__PURE__ */ jsx("label", { for: toggleId, class: "quartz-nav__burger", "aria-hidden": "true", children: burger }),
      /* @__PURE__ */ jsx("label", { for: toggleId, class: "quartz-nav__backdrop", "aria-hidden": "true" })
    ] }),
    opts.mobile === "select" && /* @__PURE__ */ jsx("div", { class: "quartz-nav__mobile-select", children: selectEl(ctx, `${ctx.id}-select`) }),
    /* @__PURE__ */ jsxs("div", { class: "quartz-nav__panel", id: panelId, children: [
      opts.showScopeRoot && /* @__PURE__ */ jsx("div", { class: "quartz-nav__root", children: titleEl(root, ctx, { className: "quartz-nav__root-link" }) }),
      body
    ] })
  ] });
}
function renderSelect(ctx) {
  const id = `${ctx.id}-select`;
  return /* @__PURE__ */ jsxs("nav", { class: rootClass(ctx), "aria-label": navLabel(ctx), ...rootData(ctx), children: [
    ctx.opts.title && /* @__PURE__ */ jsx("label", { class: "quartz-nav__title", for: id, children: ctx.opts.title }),
    selectEl(ctx, id)
  ] });
}
function renderPager(ctx) {
  const { prev, next } = pagerNeighbours(ctx.tree, ctx.scope, ctx.opts);
  if (!prev && !next) return null;
  const { t, opts } = ctx;
  const link = (node, rel) => {
    const target = linkTarget(node, opts);
    return /* @__PURE__ */ jsxs("a", { class: `quartz-nav__${rel}`, rel, href: hrefFor(ctx.slug, target), children: [
      opts.pager.labels && /* @__PURE__ */ jsx("span", { class: "quartz-nav__pager-label", children: rel === "prev" ? t.nav.previous : t.nav.next }),
      /* @__PURE__ */ jsx("span", { class: "quartz-nav__pager-title", children: label(node, ctx) })
    ] });
  };
  return /* @__PURE__ */ jsxs("nav", { class: rootClass(ctx), "aria-label": navLabel(ctx), ...rootData(ctx), children: [
    prev ? link(prev, "prev") : /* @__PURE__ */ jsx("span", { class: "quartz-nav__prev quartz-nav__prev--empty" }),
    next ? link(next, "next") : /* @__PURE__ */ jsx("span", { class: "quartz-nav__next quartz-nav__next--empty" })
  ] });
}

// src/components/styles/navigations.scss
var navigations_default = 'html.quartz-nav-lock {\n  overflow: hidden;\n}\n\n.quartz-nav--basic {\n  --quartz-nav-gap: 0.25rem 1rem;\n  --quartz-nav-nested-gap: 0.25rem 0.75rem;\n  --quartz-nav-indent: 1rem;\n  --quartz-nav-item-padding: 0.15rem 0.35rem;\n  --quartz-nav-radius: 4px;\n  --quartz-nav-toggle-size: 1.5rem;\n  --quartz-nav-title-size: 1rem;\n  --quartz-nav-title-margin: 0 0 0.5rem;\n  --quartz-nav-line-height: 1.6;\n  --quartz-nav-transition: 0.2s ease;\n  --quartz-nav-panel-min-width: 12rem;\n  --quartz-nav-panel-padding: 0.5rem 0.75rem;\n  --quartz-nav-panel-radius: 6px;\n  --quartz-nav-panel-z: 20;\n  --quartz-nav-mega-min-width: min(40rem, 90vw);\n  --quartz-nav-column-min-width: 10rem;\n  --quartz-nav-column-gap: 1rem 1.5rem;\n  --quartz-nav-offcanvas-width: min(20rem, 85vw);\n  --quartz-nav-offcanvas-padding: 1rem;\n  --quartz-nav-offcanvas-z: 100;\n  --quartz-nav-font: var(--bodyFont, inherit);\n  --quartz-nav-heading-font: var(--headerFont, inherit);\n  --quartz-nav-color: var(--darkgray, #4e4e4e);\n  --quartz-nav-color-hover: var(--secondary, #284b63);\n  --quartz-nav-color-active: var(--secondary, #284b63);\n  --quartz-nav-color-trail: var(--dark, #2b2b2b);\n  --quartz-nav-color-static: var(--dark, #2b2b2b);\n  --quartz-nav-color-heading: var(--dark, #2b2b2b);\n  --quartz-nav-color-muted: var(--gray, #9c9c9c);\n  --quartz-nav-bg-hover: var(--highlight, rgba(143, 159, 169, 0.15));\n  --quartz-nav-bg-panel: var(--light, #fff);\n  --quartz-nav-border: var(--lightgray, #e5e5e5);\n  --quartz-nav-focus: var(--secondary, #284b63);\n  --quartz-nav-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);\n  --quartz-nav-backdrop: rgba(0, 0, 0, 0.35);\n  --quartz-nav-weight-active: 600;\n  --quartz-nav-weight-parent: 600;\n}\n.quartz-nav--basic .quartz-nav__list {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.quartz-nav--basic .quartz-nav__title {\n  margin: var(--quartz-nav-title-margin);\n  font-size: var(--quartz-nav-title-size);\n}\n.quartz-nav--basic .quartz-nav__link {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35em;\n  text-decoration: none;\n}\n.quartz-nav--basic .quartz-nav__item {\n  margin: 0;\n}\n.quartz-nav--basic .quartz-nav__summary {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n  cursor: pointer;\n  list-style: none;\n}\n.quartz-nav--basic .quartz-nav__summary::-webkit-details-marker {\n  display: none;\n}\n.quartz-nav--basic .quartz-nav__chevron {\n  display: inline-flex;\n  flex: none;\n  transition: transform var(--quartz-nav-transition);\n}\n.quartz-nav--basic .quartz-nav__sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0 0 0 0);\n  white-space: nowrap;\n  border: 0;\n}\n.quartz-nav--basic .quartz-nav__item--split {\n  position: relative;\n}\n.quartz-nav--basic .quartz-nav__item--split > .quartz-nav__link {\n  padding-right: calc(var(--quartz-nav-toggle-size) + 0.25rem);\n}\n.quartz-nav--basic .quartz-nav__summary--toggle {\n  position: absolute;\n  top: 0;\n  right: 0;\n  justify-content: center;\n  min-width: var(--quartz-nav-toggle-size);\n  min-height: var(--quartz-nav-toggle-size);\n  padding: 0.1rem 0.25rem;\n}\n.quartz-nav--basic .quartz-nav__jump {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n}\n.quartz-nav--basic .quartz-nav__go {\n  font: inherit;\n  cursor: pointer;\n}\n.quartz-nav--basic details[open] > .quartz-nav__summary .quartz-nav__chevron {\n  transform: rotate(180deg);\n}\n.quartz-nav--basic .quartz-nav__list .quartz-nav__list {\n  padding-left: var(--quartz-nav-indent);\n}\n.quartz-nav--basic .quartz-nav__toggle,\n.quartz-nav--basic .quartz-nav__burger,\n.quartz-nav--basic .quartz-nav__backdrop,\n.quartz-nav--basic .quartz-nav__mobile-select {\n  display: none;\n}\n.quartz-nav--basic .quartz-nav__select {\n  max-width: 100%;\n}\n.quartz-nav--basic.quartz-nav--horizontal > .quartz-nav__panel > .quartz-nav__list,\n.quartz-nav--basic.quartz-nav--horizontal > .quartz-nav__panel > .quartz-nav__tabs, .quartz-nav--basic.quartz-nav--dropdown > .quartz-nav__panel > .quartz-nav__list,\n.quartz-nav--basic.quartz-nav--dropdown > .quartz-nav__panel > .quartz-nav__tabs, .quartz-nav--basic.quartz-nav--mega > .quartz-nav__panel > .quartz-nav__list,\n.quartz-nav--basic.quartz-nav--mega > .quartz-nav__panel > .quartz-nav__tabs, .quartz-nav--basic.quartz-nav--tabs > .quartz-nav__panel > .quartz-nav__list,\n.quartz-nav--basic.quartz-nav--tabs > .quartz-nav__panel > .quartz-nav__tabs {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: var(--quartz-nav-gap);\n}\n.quartz-nav--basic.quartz-nav--horizontal .quartz-nav__list .quartz-nav__list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--quartz-nav-nested-gap);\n  padding-left: 0;\n}\n.quartz-nav--basic.quartz-nav--horizontal .quartz-nav__item--parent > .quartz-nav__link::after {\n  content: ":"/"";\n}\n.quartz-nav--basic.quartz-nav--dropdown > .quartz-nav__panel > .quartz-nav__list > .quartz-nav__item--folder, .quartz-nav--basic.quartz-nav--mega > .quartz-nav__panel > .quartz-nav__list > .quartz-nav__item--folder {\n  position: relative;\n}\n.quartz-nav--basic.quartz-nav--dropdown .quartz-nav__folder > .quartz-nav__list, .quartz-nav--basic.quartz-nav--mega .quartz-nav__folder > .quartz-nav__list {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: var(--quartz-nav-panel-z);\n  min-width: var(--quartz-nav-panel-min-width);\n  padding: var(--quartz-nav-panel-padding);\n  background: var(--quartz-nav-bg-panel);\n}\n.quartz-nav--basic.quartz-nav--dropdown .quartz-nav__folder .quartz-nav__list .quartz-nav__list, .quartz-nav--basic.quartz-nav--mega .quartz-nav__folder .quartz-nav__list .quartz-nav__list {\n  position: static;\n  min-width: 0;\n  padding: 0 0 0 var(--quartz-nav-indent);\n  background: none;\n}\n.quartz-nav--basic.quartz-nav--mega .quartz-nav__folder > .quartz-nav__list {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(var(--quartz-nav-column-min-width), 1fr));\n  gap: var(--quartz-nav-column-gap);\n  min-width: var(--quartz-nav-mega-min-width);\n}\n.quartz-nav--basic.quartz-nav--flyout .quartz-nav__item--folder {\n  position: relative;\n}\n.quartz-nav--basic.quartz-nav--flyout .quartz-nav__folder > .quartz-nav__list {\n  position: absolute;\n  top: 0;\n  left: 100%;\n  z-index: var(--quartz-nav-panel-z);\n  min-width: var(--quartz-nav-panel-min-width);\n  padding: var(--quartz-nav-panel-padding);\n  background: var(--quartz-nav-bg-panel);\n}\n.quartz-nav--basic.quartz-nav--tabs .quartz-nav__tabs {\n  border-bottom: 1px solid currentColor;\n}\n.quartz-nav--basic.quartz-nav--tabs .quartz-nav__tabs > .quartz-nav__item > .quartz-nav__link {\n  padding: 0.25rem 0;\n  border-bottom: 2px solid transparent;\n  margin-bottom: -1px;\n}\n.quartz-nav--basic.quartz-nav--tabs .quartz-nav__tabs > .quartz-nav__item.active > .quartz-nav__link,\n.quartz-nav--basic.quartz-nav--tabs .quartz-nav__tabs > .quartz-nav__item.active-trail > .quartz-nav__link {\n  border-bottom-color: currentColor;\n}\n.quartz-nav--basic.quartz-nav--tabs .quartz-nav__subtabs {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--quartz-nav-nested-gap);\n  padding: 0.35rem 0 0;\n}\n.quartz-nav--basic.quartz-nav--tabs .quartz-nav__subtabs .quartz-nav__list {\n  display: none;\n}\n.quartz-nav--basic.quartz-nav--columns > .quartz-nav__panel > .quartz-nav__list {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(var(--quartz-nav-column-min-width), 1fr));\n  gap: var(--quartz-nav-column-gap);\n}\n.quartz-nav--basic.quartz-nav--columns .quartz-nav__list .quartz-nav__list {\n  padding-left: 0;\n}\n.quartz-nav--basic.quartz-nav--columns > .quartz-nav__panel > .quartz-nav__list > .quartz-nav__item > .quartz-nav__link {\n  font-weight: var(--quartz-nav-weight-parent);\n  margin-bottom: 0.25rem;\n}\n.quartz-nav--basic.quartz-nav--pager {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  margin: 1.5rem 0;\n}\n.quartz-nav--basic.quartz-nav--pager .quartz-nav__prev,\n.quartz-nav--basic.quartz-nav--pager .quartz-nav__next {\n  display: inline-flex;\n  flex-direction: column;\n  text-decoration: none;\n  max-width: 48%;\n}\n.quartz-nav--basic.quartz-nav--pager .quartz-nav__next {\n  margin-left: auto;\n  text-align: right;\n  align-items: flex-end;\n}\n.quartz-nav--basic.quartz-nav--pager .quartz-nav__pager-label {\n  font-size: 0.8em;\n  opacity: 0.75;\n}\n@media all and (min-width: __NAV_BP_MOBILE__) {\n  .quartz-nav--basic details[data-mobile-collapsible] > .quartz-nav__summary--toggle {\n    visibility: hidden;\n  }\n  .quartz-nav--basic details[data-mobile-collapsible] > .quartz-nav__summary:not(.quartz-nav__summary--toggle) {\n    pointer-events: none;\n  }\n  .quartz-nav--basic details[data-mobile-collapsible] > .quartz-nav__summary .quartz-nav__chevron {\n    display: none;\n  }\n  .quartz-nav--basic .quartz-nav__item--split:has(details[data-mobile-collapsible]) > .quartz-nav__link {\n    padding-right: 0;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .quartz-nav--basic {\n    --quartz-nav-transition: 0s;\n  }\n}\n@media all and (max-width: __NAV_BP_MOBILE__) {\n  .quartz-nav--basic.quartz-nav--mobile-hidden {\n    display: none;\n  }\n  .quartz-nav--basic.quartz-nav--mobile-accordion > .quartz-nav__panel > .quartz-nav__list,\n  .quartz-nav--basic.quartz-nav--mobile-accordion > .quartz-nav__panel > .quartz-nav__tabs,\n  .quartz-nav--basic.quartz-nav--mobile-accordion .quartz-nav__subtabs, .quartz-nav--basic.quartz-nav--mobile-offcanvas > .quartz-nav__panel > .quartz-nav__list,\n  .quartz-nav--basic.quartz-nav--mobile-offcanvas > .quartz-nav__panel > .quartz-nav__tabs,\n  .quartz-nav--basic.quartz-nav--mobile-offcanvas .quartz-nav__subtabs {\n    display: block;\n  }\n  .quartz-nav--basic.quartz-nav--mobile-accordion .quartz-nav__list .quartz-nav__list,\n  .quartz-nav--basic.quartz-nav--mobile-accordion .quartz-nav__folder > .quartz-nav__list, .quartz-nav--basic.quartz-nav--mobile-offcanvas .quartz-nav__list .quartz-nav__list,\n  .quartz-nav--basic.quartz-nav--mobile-offcanvas .quartz-nav__folder > .quartz-nav__list {\n    display: block;\n    position: static;\n    min-width: 0;\n    padding: 0 0 0 var(--quartz-nav-indent);\n    background: none;\n  }\n  .quartz-nav--basic.quartz-nav--mobile-accordion .quartz-nav__item--parent > .quartz-nav__link::after, .quartz-nav--basic.quartz-nav--mobile-offcanvas .quartz-nav__item--parent > .quartz-nav__link::after {\n    content: none;\n  }\n  .quartz-nav--basic.quartz-nav--mobile-select .quartz-nav__mobile-select {\n    display: block;\n  }\n  .quartz-nav--basic.quartz-nav--mobile-select .quartz-nav__panel {\n    display: none;\n  }\n  .quartz-nav--basic.quartz-nav--mobile-offcanvas .quartz-nav__burger {\n    display: inline-flex;\n    cursor: pointer;\n  }\n  .quartz-nav--basic.quartz-nav--mobile-offcanvas .quartz-nav__toggle {\n    display: block;\n    position: absolute;\n    width: 1px;\n    height: 1px;\n    margin: -1px;\n    padding: 0;\n    overflow: hidden;\n    clip: rect(0 0 0 0);\n    white-space: nowrap;\n    border: 0;\n  }\n  .quartz-nav--basic.quartz-nav--mobile-offcanvas .quartz-nav__panel {\n    position: fixed;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    z-index: var(--quartz-nav-offcanvas-z);\n    width: var(--quartz-nav-offcanvas-width);\n    overflow-y: auto;\n    padding: var(--quartz-nav-offcanvas-padding);\n    box-sizing: border-box;\n    background: var(--quartz-nav-bg-panel);\n    transform: translateX(-100%);\n    transition: transform var(--quartz-nav-transition);\n  }\n  .quartz-nav--basic.quartz-nav--mobile-offcanvas .quartz-nav__backdrop {\n    display: block;\n    position: fixed;\n    inset: 0;\n    z-index: calc(var(--quartz-nav-offcanvas-z) - 1);\n    visibility: hidden;\n    opacity: 0;\n    transition: opacity var(--quartz-nav-transition), visibility var(--quartz-nav-transition);\n  }\n  .quartz-nav--basic.quartz-nav--mobile-offcanvas .quartz-nav__toggle:checked ~ .quartz-nav__panel {\n    transform: translateX(0);\n  }\n  .quartz-nav--basic.quartz-nav--mobile-offcanvas .quartz-nav__toggle:checked ~ .quartz-nav__backdrop {\n    visibility: visible;\n    opacity: 1;\n  }\n  .quartz-nav--basic.quartz-nav--mobile-offcanvas .quartz-nav__toggle:focus-visible ~ .quartz-nav__burger {\n    outline: 2px solid var(--quartz-nav-focus);\n    outline-offset: 2px;\n  }\n}\n\n:root[saved-theme=dark] .quartz-nav--basic {\n  --quartz-nav-shadow: 0 6px 24px rgba(0, 0, 0, 0.6);\n  --quartz-nav-backdrop: rgba(0, 0, 0, 0.55);\n}\n\n.quartz-nav--full {\n  font-family: var(--quartz-nav-font);\n}\n.quartz-nav--full .quartz-nav__title {\n  font-family: var(--quartz-nav-heading-font);\n  color: var(--quartz-nav-color-heading);\n}\n.quartz-nav--full .quartz-nav__link {\n  color: var(--quartz-nav-color);\n  padding: var(--quartz-nav-item-padding);\n  margin: 0 -0.35rem;\n  border-radius: var(--quartz-nav-radius);\n  transition: background-color var(--quartz-nav-transition), color var(--quartz-nav-transition);\n}\n.quartz-nav--full .quartz-nav__link:hover, .quartz-nav--full .quartz-nav__link:focus-visible {\n  color: var(--quartz-nav-color-hover);\n  background-color: var(--quartz-nav-bg-hover);\n}\n.quartz-nav--full .quartz-nav__link.active {\n  color: var(--quartz-nav-color-active);\n  font-weight: var(--quartz-nav-weight-active);\n}\n.quartz-nav--full .quartz-nav__link.active-trail {\n  color: var(--quartz-nav-color-trail);\n}\n.quartz-nav--full .quartz-nav__link.quartz-nav__link--static {\n  color: var(--quartz-nav-color-static);\n  cursor: default;\n}\n.quartz-nav--full .quartz-nav__link.quartz-nav__link--static:hover {\n  background: none;\n}\n.quartz-nav--full .quartz-nav__item {\n  line-height: var(--quartz-nav-line-height);\n}\n.quartz-nav--full .quartz-nav__item--parent > .quartz-nav__link,\n.quartz-nav--full .quartz-nav__summary > .quartz-nav__link {\n  font-weight: var(--quartz-nav-weight-parent);\n}\n.quartz-nav--full .quartz-nav__summary {\n  border-radius: var(--quartz-nav-radius);\n  padding-right: 0.25rem;\n}\n.quartz-nav--full .quartz-nav__summary:hover, .quartz-nav--full .quartz-nav__summary:focus-visible {\n  background-color: var(--quartz-nav-bg-hover);\n}\n.quartz-nav--full .quartz-nav__summary:focus-visible {\n  outline: 2px solid var(--quartz-nav-focus);\n  outline-offset: 1px;\n}\n.quartz-nav--full .quartz-nav__summary--toggle {\n  color: var(--quartz-nav-color-muted);\n  padding-right: 0.25rem;\n}\n.quartz-nav--full .quartz-nav__summary--toggle:hover, .quartz-nav--full .quartz-nav__summary--toggle:focus-visible {\n  color: var(--quartz-nav-color-hover);\n}\n.quartz-nav--full .quartz-nav__link:focus-visible,\n.quartz-nav--full .quartz-nav__go:focus-visible,\n.quartz-nav--full .quartz-nav__select:focus-visible {\n  outline: 2px solid var(--quartz-nav-focus);\n  outline-offset: 1px;\n}\n.quartz-nav--full .quartz-nav__chevron {\n  color: var(--quartz-nav-color-muted);\n}\n.quartz-nav--full .quartz-nav__list .quartz-nav__list {\n  border-left: 1px solid var(--quartz-nav-border);\n  margin-left: 0.35rem;\n  padding-left: calc(var(--quartz-nav-indent) - 0.25rem);\n}\n.quartz-nav--full .quartz-nav__root {\n  margin-bottom: 0.5rem;\n  font-family: var(--quartz-nav-heading-font);\n  font-size: 1.05rem;\n}\n.quartz-nav--full .quartz-nav__pager-title,\n.quartz-nav--full .quartz-nav__root-link {\n  color: var(--quartz-nav-color-heading);\n}\n.quartz-nav--full.quartz-nav--dropdown .quartz-nav__folder > .quartz-nav__list, .quartz-nav--full.quartz-nav--mega .quartz-nav__folder > .quartz-nav__list, .quartz-nav--full.quartz-nav--flyout .quartz-nav__folder > .quartz-nav__list {\n  border: 1px solid var(--quartz-nav-border);\n  border-radius: var(--quartz-nav-panel-radius);\n  box-shadow: var(--quartz-nav-shadow);\n  margin: 0.25rem 0 0;\n}\n.quartz-nav--full.quartz-nav--flyout .quartz-nav__folder > .quartz-nav__list {\n  margin: 0 0 0 0.25rem;\n}\n.quartz-nav--full.quartz-nav--dropdown .quartz-nav__folder .quartz-nav__list .quartz-nav__list, .quartz-nav--full.quartz-nav--mega .quartz-nav__folder .quartz-nav__list .quartz-nav__list {\n  border: 0;\n  box-shadow: none;\n  margin: 0;\n}\n.quartz-nav--full.quartz-nav--horizontal .quartz-nav__list .quartz-nav__list, .quartz-nav--full.quartz-nav--columns .quartz-nav__list .quartz-nav__list, .quartz-nav--full.quartz-nav--mega .quartz-nav__folder > .quartz-nav__list > .quartz-nav__item > .quartz-nav__list {\n  border-left: 0;\n  margin-left: 0;\n  padding-left: 0;\n}\n.quartz-nav--full.quartz-nav--mega .quartz-nav__folder > .quartz-nav__list > .quartz-nav__item > .quartz-nav__link {\n  color: var(--quartz-nav-color-heading);\n  font-family: var(--quartz-nav-heading-font);\n}\n.quartz-nav--full.quartz-nav--tabs .quartz-nav__tabs {\n  border-bottom-color: var(--quartz-nav-border);\n}\n.quartz-nav--full.quartz-nav--tabs .quartz-nav__tabs > .quartz-nav__item > .quartz-nav__link {\n  border-radius: 0;\n  margin: 0 0 -1px;\n  padding: 0.35rem 0.25rem;\n}\n.quartz-nav--full.quartz-nav--tabs .quartz-nav__tabs > .quartz-nav__item > .quartz-nav__link:hover, .quartz-nav--full.quartz-nav--tabs .quartz-nav__tabs > .quartz-nav__item > .quartz-nav__link:focus-visible {\n  background: none;\n}\n.quartz-nav--full.quartz-nav--tabs .quartz-nav__tabs > .quartz-nav__item.active > .quartz-nav__link,\n.quartz-nav--full.quartz-nav--tabs .quartz-nav__tabs > .quartz-nav__item.active-trail > .quartz-nav__link {\n  color: var(--quartz-nav-color-active);\n  border-bottom-color: var(--quartz-nav-color-active);\n}\n.quartz-nav--full.quartz-nav--tabs .quartz-nav__subtabs {\n  border: 0;\n  margin: 0;\n}\n.quartz-nav--full.quartz-nav--columns > .quartz-nav__panel > .quartz-nav__list > .quartz-nav__item > .quartz-nav__link {\n  color: var(--quartz-nav-color-heading);\n  font-family: var(--quartz-nav-heading-font);\n}\n.quartz-nav--full.quartz-nav--pager {\n  border-top: 1px solid var(--quartz-nav-border);\n  padding-top: 1rem;\n}\n.quartz-nav--full.quartz-nav--pager .quartz-nav__prev,\n.quartz-nav--full.quartz-nav--pager .quartz-nav__next {\n  color: var(--quartz-nav-color);\n  padding: 0.5rem 0.75rem;\n  margin: 0;\n  border: 1px solid var(--quartz-nav-border);\n  border-radius: var(--quartz-nav-panel-radius);\n  transition: border-color var(--quartz-nav-transition);\n}\n.quartz-nav--full.quartz-nav--pager .quartz-nav__prev:hover, .quartz-nav--full.quartz-nav--pager .quartz-nav__prev:focus-visible,\n.quartz-nav--full.quartz-nav--pager .quartz-nav__next:hover,\n.quartz-nav--full.quartz-nav--pager .quartz-nav__next:focus-visible {\n  border-color: var(--quartz-nav-color-hover);\n  background: none;\n}\n.quartz-nav--full.quartz-nav--pager .quartz-nav__pager-label {\n  color: var(--quartz-nav-color-muted);\n}\n.quartz-nav--full .quartz-nav__select,\n.quartz-nav--full .quartz-nav__go {\n  font: inherit;\n  color: var(--quartz-nav-color-heading);\n  background-color: var(--quartz-nav-bg-panel);\n  border: 1px solid var(--quartz-nav-border);\n  border-radius: var(--quartz-nav-panel-radius);\n  padding: 0.35rem 0.5rem;\n}\n.quartz-nav--full .quartz-nav__go:hover {\n  border-color: var(--quartz-nav-color-hover);\n  color: var(--quartz-nav-color-hover);\n}\n.quartz-nav--full .quartz-nav__burger {\n  color: var(--quartz-nav-color-heading);\n  padding: 0.25rem;\n  border-radius: var(--quartz-nav-radius);\n}\n.quartz-nav--full .quartz-nav__burger:hover {\n  background-color: var(--quartz-nav-bg-hover);\n}\n.quartz-nav--full .quartz-nav__backdrop {\n  background: var(--quartz-nav-backdrop);\n}\n.quartz-nav--full.quartz-nav--mobile-offcanvas .quartz-nav__panel {\n  box-shadow: var(--quartz-nav-shadow);\n}';

// src/scripts/navigations.inline.ts
var navigations_inline_default = 'var p=["dropdown","mega","flyout"],m="quartz-nav-lock";function E(e){return`quartz-nav:${e}`}function L(e){try{let t=localStorage.getItem(E(e)),r=t?JSON.parse(t):{};return r!==null&&typeof r=="object"?r:{}}catch{return{}}}function w(e,t){try{localStorage.setItem(E(e),JSON.stringify(t))}catch{}}function g(e){let t=e.dataset.bpMobile;return t?window.matchMedia(`(max-width: ${t})`).matches:!1}function y(e){let t=e.dataset.quartzNav??"",r=e.dataset.persist==="true",a=e.dataset.expandActive==="true",l=g(e),c=r?L(t):{};e.querySelectorAll("details[data-folder]").forEach(s=>{let n=s.dataset.folder??"",o=s.dataset.trail==="true",i=r&&n in c?c[n]===!0:void 0;if(s.dataset.mobileCollapsible!==void 0?s.open=!l||o||i===!0:i!==void 0&&!(a&&o)&&(s.open=i),!r)return;let d=()=>{c[n]=s.open,w(t,c)};s.addEventListener("toggle",d),window.addCleanup(()=>s.removeEventListener("toggle",d))})}function h(e){if(!p.includes(e.dataset.variant??""))return;let t=()=>Array.from(e.querySelectorAll("details.quartz-nav__folder")),r=n=>{for(let o of t())o!==n&&!(n&&o.contains(n))&&(o.open=!1)};for(let n of t()){let o=()=>{if(!n.open)return;let i=n.parentElement?.parentElement;if(i)for(let d of i.querySelectorAll(":scope > li > details"))d!==n&&(d.open=!1)};n.addEventListener("toggle",o),window.addCleanup(()=>n.removeEventListener("toggle",o))}let a=n=>{(!(n.target instanceof Node)||!e.contains(n.target))&&r()},l=n=>{if(n.key!=="Escape")return;let o=document.activeElement,i=t().find(d=>d.open&&o instanceof Node&&d.contains(o));r(),i?.querySelector("summary")?.focus()},c=()=>r();document.addEventListener("click",a),document.addEventListener("keydown",l),document.addEventListener("prenav",c),window.addCleanup(()=>document.removeEventListener("click",a)),window.addCleanup(()=>document.removeEventListener("keydown",l)),window.addCleanup(()=>document.removeEventListener("prenav",c)),e.dataset.trigger==="hover"&&window.matchMedia("(hover: hover)").matches&&e.querySelectorAll("li.quartz-nav__item--folder").forEach(n=>{let o=n.querySelector(":scope > details");if(!o)return;let i,d=()=>{i&&clearTimeout(i),o.open=!0},u=()=>{i=setTimeout(()=>{o.open=!1},150)},f=v=>{(!(v.relatedTarget instanceof Node)||!n.contains(v.relatedTarget))&&u()};n.addEventListener("mouseenter",d),n.addEventListener("mouseleave",u),n.addEventListener("focusin",d),n.addEventListener("focusout",f),window.addCleanup(()=>{i&&clearTimeout(i),n.removeEventListener("mouseenter",d),n.removeEventListener("mouseleave",u),n.removeEventListener("focusin",d),n.removeEventListener("focusout",f)})})}function S(e){if(e.dataset.mobile!=="offcanvas")return;let t=e.querySelector("input.quartz-nav__toggle");if(!t)return;let r=e.querySelector(".quartz-nav__panel"),a=()=>{document.documentElement.classList.toggle(m,t.checked),t.setAttribute("aria-expanded",String(t.checked))},l=()=>{if(!t.checked)return;let s=document.activeElement;t.checked=!1,a(),r&&s instanceof Node&&r.contains(s)&&t.focus()},c=s=>{s.key==="Escape"&&l()};a(),t.addEventListener("change",a),document.addEventListener("keydown",c),document.addEventListener("prenav",l),window.addCleanup(()=>{t.removeEventListener("change",a),document.removeEventListener("keydown",c),document.removeEventListener("prenav",l),document.documentElement.classList.remove(m)})}function T(e){e.querySelectorAll("select.quartz-nav__select").forEach(t=>{let r=()=>{let o=t.value;if(!o)return;let i=new URL(o,window.location.href);typeof window.spaNavigate=="function"?window.spaNavigate(i,!1):window.location.assign(i.toString())},a=!1,l=o=>{o.key==="Enter"?(o.preventDefault(),r()):(o.key.startsWith("Arrow")||o.key==="Home"||o.key==="End")&&(a=!0)},c=()=>{a=!1},s=()=>{a||r()};t.addEventListener("keydown",l),t.addEventListener("pointerdown",c),t.addEventListener("change",s),window.addCleanup(()=>{t.removeEventListener("keydown",l),t.removeEventListener("pointerdown",c),t.removeEventListener("change",s)});let n=e.querySelector(`button[data-select="${t.id}"]`);n&&(n.addEventListener("click",r),window.addCleanup(()=>n.removeEventListener("click",r)))})}function M(e){let t=e.dataset.variant??"";if(!["vertical","accordion","flyout"].includes(t))return;let r=e.querySelector(".quartz-nav__panel"),a=r?.querySelector("a.active");!r||!a||r.scrollHeight<=r.clientHeight||typeof a.scrollIntoView=="function"&&a.scrollIntoView({block:"nearest"})}function k(){document.querySelectorAll("nav[data-quartz-nav]").forEach(e=>{y(e),h(e),S(e),T(e),M(e)})}document.addEventListener("nav",k);\n';

// src/components/Navigation.tsx
var Navigation_default = ((userOpts) => {
  const opts = resolveOptions(userOpts);
  const id = opts.id || `nav-${shortHash(JSON.stringify({ ...opts, id: "" }))}`;
  const breakpoints = resolveBreakpoints(opts.breakpoints);
  const css = applyBreakpoints(navigations_default, breakpoints);
  const Navigation = (props) => {
    const { fileData, allFiles, displayClass, cfg } = props;
    const slug2 = typeof fileData?.slug === "string" ? fileData.slug : "";
    if (!slug2) return null;
    const files = Array.isArray(allFiles) ? allFiles : [];
    const tree = treeFromFiles(files, opts);
    const scope = resolveScope(tree, slug2, opts);
    if (!scope) return null;
    const ctx = {
      opts,
      id,
      slug: slug2,
      tree,
      scope,
      t: i18n(cfg?.locale),
      displayClass,
      mobileBreakpoint: breakpoints.mobile
    };
    switch (opts.variant) {
      case "select":
        return renderSelect(ctx);
      case "pager":
        return renderPager(ctx);
      default:
        return renderNavigation(ctx);
    }
  };
  Navigation.css = css;
  Navigation.afterDOMLoaded = navigations_inline_default;
  return Navigation;
});

export { Navigation_default as Navigation, buildTree, chainOf, defaultOptions, flatten, resolveOptions, resolveScope, treeFromFiles };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map