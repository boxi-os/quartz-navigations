export type {
  BuildCtx,
  FullSlug,
  GlobalConfiguration,
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
  QuartzPluginData,
} from "@quartz-community/types";

export type NavVariant =
  | "vertical"
  | "horizontal"
  | "accordion"
  | "dropdown"
  | "flyout"
  | "tabs"
  | "mega"
  | "columns"
  | "select"
  | "pager";
export type NavMobile = "same" | "accordion" | "offcanvas" | "select" | "hidden";
export type NavStyle = "unstyled" | "basic" | "full";
export type NavScope = "root" | "section" | "parent" | "current";
export type NavSort = "manual" | "alphabetical" | "date";
export type NavSortDirection = "asc" | "desc";
export type NavFoldersFirst = "first" | "last" | "mixed";
export type NavDateField = "created" | "modified" | "published";
export type NavIndexEntry = "none" | "first";
export type NavFolderLink = "index" | "none" | "first-child";
export type NavFolderClick = "link" | "toggle";
export type NavFolderState = "collapsed" | "open";
export type NavDropdownTrigger = "click" | "hover";
export type NavPagerOrder = "tree" | "siblings";

export interface NavigationFrontmatterKeys {
  /** Numeric sort key of a page or folder index. Defaults to `navOrder`. */
  order?: string;
  /** Title shown in the navigation instead of the page title. Defaults to `navTitle`. */
  title?: string;
  /** `true` hides the page, or the folder when set on its index page. Defaults to `navHide`. */
  hide?: string;
  /** Short text or emoji rendered before the title when `icons` is on. Defaults to `navIcon`. */
  icon?: string;
}

export interface NavigationBreakpoints {
  /** Mobile breakpoint, e.g. `800px`. Defaults to the value in `quartz/styles/variables.scss`. */
  mobile?: string;
  /** Desktop breakpoint, e.g. `1200px`. Defaults to the value in `quartz/styles/variables.scss`. */
  desktop?: string;
}

export interface NavigationOptions {
  /** Presentation. Defaults to `vertical`. */
  variant?: NavVariant;
  /** Presentation below the mobile breakpoint. Defaults to `same`. */
  mobile?: NavMobile;
  /** How much CSS the plugin ships: none, layout only, or layout with colors. Defaults to `full`. */
  style?: NavStyle;
  /** Extra class names on the root element. Defaults to none. */
  className?: string;
  /** Stable instance id used for `localStorage` and element ids. Defaults to a hash of the options. */
  id?: string;
  /** Heading rendered above the navigation. Defaults to none. */
  title?: string;
  /** Accessible name of the `<nav>`. Defaults to a translated "Main navigation". */
  ariaLabel?: string;
  /** Render chevrons on collapsible folders. Defaults to `true`. */
  chevrons?: boolean;
  /** Render the `navIcon` frontmatter value before titles. Defaults to `false`. */
  icons?: boolean;
  /** Folder the navigation starts at, e.g. `docs`. Defaults to the site root. */
  rootPath?: string;
  /** Which subtree to show relative to the current page. Defaults to `root`. */
  scope?: NavScope;
  /** Number of levels below the scope root; `0` means unlimited. Defaults to `0`. */
  depth?: number;
  /** Render nothing on pages outside `rootPath`. Defaults to `true`. */
  hideOutsideRoot?: boolean;
  /** Render the scope root as a linked heading above the list. Defaults to `false`. */
  showScopeRoot?: boolean;
  /** Prepend a link to the index page of `rootPath`. Defaults to `false`. */
  showHome?: boolean;
  /** Add the folder index page as the first child of an expanded folder. Defaults to `none`. */
  indexEntry?: NavIndexEntry;
  /** Sort mode. Defaults to `manual` (order map, `navOrder`, numeric prefix, title). */
  sort?: NavSort;
  /** Sort direction. Defaults to `asc`. */
  sortDirection?: NavSortDirection;
  /** Where folders go relative to pages. Defaults to `first`. */
  foldersFirst?: NavFoldersFirst;
  /** Date used by `sort: date`. Defaults to `created`. */
  dateField?: NavDateField;
  /** Explicit child order per folder path, e.g. `{ "": ["docs", "blog"], docs: ["intro"] }`. */
  order?: Record<string, string[]>;
  /** Remove a numeric prefix such as `01-` from titles taken from file names. Defaults to `false`. */
  stripNumericPrefix?: boolean;
  /** Frontmatter keys read by the plugin. */
  frontmatterKeys?: NavigationFrontmatterKeys;
  /** Hide the `tags` folder. Defaults to `true`. */
  hideTags?: boolean;
  /** Hide pages marked `unlisted`. Defaults to `true`. */
  hideUnlisted?: boolean;
  /** Hide pages with `draft: true`. Defaults to `true`. */
  hideDrafts?: boolean;
  /** Drop folders that end up without visible children. Defaults to `true`. */
  hideEmptyFolders?: boolean;
  /** Keep folders whose only content is their index page. Defaults to `true`. */
  keepIndexOnlyFolders?: boolean;
  /** Globs on slugs; when set, only matching pages and subtrees are shown. Defaults to all. */
  include?: string[];
  /** Globs on slugs to hide, e.g. `private/**`. Defaults to none. */
  exclude?: string[];
  /** Where a folder title links to. Defaults to `index`. */
  folderLink?: NavFolderLink;
  /** Whether a collapsible folder title is a link or toggles the folder. Defaults to `link`. */
  folderClick?: NavFolderClick;
  /** Initial state of collapsible folders. Defaults to `collapsed`. */
  folderDefaultState?: NavFolderState;
  /** Open folders on the path to the current page. Defaults to `true`. */
  expandActive?: boolean;
  /** Only one open folder per level (`<details name>`). Defaults to `false`. */
  exclusive?: boolean;
  /** Remember open folders in `localStorage`. Defaults to `false`. */
  persistState?: boolean;
  /** How dropdown, mega and flyout panels open. Defaults to `click`. */
  dropdownTrigger?: NavDropdownTrigger;
  /** Override the breakpoints read from `quartz/styles/variables.scss`. */
  breakpoints?: NavigationBreakpoints;
  /** Options of the `tabs` variant. */
  tabs?: {
    /** Show the children of the active tab in a second row. Defaults to `true`. */
    secondary?: boolean;
  };
  /** Options of the `columns` variant. */
  columns?: {
    /** Maximum number of columns. Defaults to `4`. */
    max?: number;
  };
  /** Options of the `pager` variant. */
  pager?: {
    /** Show "Previous" / "Next" labels above the titles. Defaults to `true`. */
    labels?: boolean;
    /** Walk the whole tree in order or only the siblings of the current page. Defaults to `tree`. */
    order?: NavPagerOrder;
  };
}

export interface ResolvedOptions {
  variant: NavVariant;
  mobile: NavMobile;
  style: NavStyle;
  className: string;
  id: string;
  title: string;
  ariaLabel: string;
  chevrons: boolean;
  icons: boolean;
  rootPath: string;
  scope: NavScope;
  depth: number;
  hideOutsideRoot: boolean;
  showScopeRoot: boolean;
  showHome: boolean;
  indexEntry: NavIndexEntry;
  sort: NavSort;
  sortDirection: NavSortDirection;
  foldersFirst: NavFoldersFirst;
  dateField: NavDateField;
  order: Record<string, string[]>;
  stripNumericPrefix: boolean;
  frontmatterKeys: Required<NavigationFrontmatterKeys>;
  hideTags: boolean;
  hideUnlisted: boolean;
  hideDrafts: boolean;
  hideEmptyFolders: boolean;
  keepIndexOnlyFolders: boolean;
  include: string[];
  exclude: string[];
  folderLink: NavFolderLink;
  folderClick: NavFolderClick;
  folderDefaultState: NavFolderState;
  expandActive: boolean;
  exclusive: boolean;
  persistState: boolean;
  dropdownTrigger: NavDropdownTrigger;
  breakpoints: NavigationBreakpoints;
  tabs: { secondary: boolean };
  columns: { max: number };
  pager: { labels: boolean; order: NavPagerOrder };
}

/** One entry of the navigation tree. Folders carry the slug of their index page (`docs/index`). */
export interface NavNode {
  kind: "folder" | "page";
  slug: string;
  /** Last slug segment; empty for the site root. */
  segment: string;
  title: string;
  parentSlug?: string;
  /** `0` for the site root. */
  depth: number;
  children: NavNode[];
  /** Folder: an index page exists (real or generated by the folder-page plugin). */
  hasIndex: boolean;
  /** Folder: the index page is generated, there is no `index.md`. */
  isVirtual: boolean;
  order?: number;
  listOrder?: number;
  prefixOrder?: number;
  date?: Date;
  icon?: string;
}

export interface NavTree {
  root: NavNode;
  bySlug: Map<string, NavNode>;
}
