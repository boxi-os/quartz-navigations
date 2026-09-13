export { Navigation } from './components/index.js';
import { ResolvedOptions, NavTree, NavigationOptions, NavNode } from './types.js';
export { NavMobile, NavScope, NavSort, NavVariant, NavigationBreakpoints, NavigationFrontmatterKeys, NavigationIconNames } from './types.js';
import { h } from 'preact';
import '@quartz-community/types';

type FileData = Record<string, unknown>;
/**
 * Builds the navigation tree from Quartz's `allFiles`. Pure apart from `warnOnce`. `locale`
 * (the site's `cfg.locale`) drives the alphabetical comparator.
 */
declare function buildTree(allFiles: FileData[], opts: ResolvedOptions, locale?: string): NavTree;
/**
 * Cached per `allFiles` identity: Quartz passes the same array to every component of one
 * build, so instances with equal tree options (and locale) share one tree.
 */
declare function treeFromFiles(allFiles: FileData[], opts: ResolvedOptions, locale?: string): NavTree;

/**
 * Defaults live here, not in the manifest: Quartz passes the raw YAML `options` to the
 * component constructor and never merges `quartz.defaultOptions` from package.json.
 */
declare const defaultOptions: {
    variant: "tree";
    mobile: "same";
    align: "left";
    className: string;
    id: string;
    title: string;
    ariaLabel: string;
    chevrons: true;
    icons: "both";
    iconNames: {
        folder: string;
        folderOpen: string;
        file: string;
        home: string;
        chevron: string;
        menu: string;
        close: string;
        previous: string;
        next: string;
    };
    nodeIcons: {};
    rootPath: string;
    scope: "root";
    depth: number;
    hideOutsideRoot: true;
    showScopeRoot: false;
    showHome: false;
    indexEntry: "none";
    sort: "manual";
    sortDirection: "asc";
    foldersFirst: "first";
    dateField: "created";
    order: {};
    stripNumericPrefix: false;
    frontmatterKeys: {
        order: string;
        title: string;
        hide: string;
        icon: string;
    };
    hideTags: true;
    hideUnlisted: true;
    hideDrafts: true;
    hideEmptyFolders: true;
    keepIndexOnlyFolders: true;
    include: never[];
    exclude: never[];
    folderLink: "index";
    folderClick: "toggle";
    folderDefaultState: "collapsed";
    expandActive: true;
    exclusive: false;
    persistState: false;
    trigger: "click";
    breakpoints: {};
    tabs: {
        secondary: true;
    };
    flyout: {
        side: "auto";
    };
    select: {
        button: false;
    };
    columns: {
        max: number;
    };
    pager: {
        labels: true;
        order: "tree";
    };
};
declare function resolveOptions(userOpts?: NavigationOptions): ResolvedOptions;

interface Scope {
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
declare function chainOf(tree: NavTree, slug: string): NavNode[];
declare function resolveScope(tree: NavTree, currentSlug: string, opts: ResolvedOptions): Scope | undefined;
/** Pre-order list of the nodes rendered below `root`, honouring `depth`. */
declare function flatten(root: NavNode, opts: ResolvedOptions): NavNode[];

/** `lucide:book-open` → `book-open`; anything else → `undefined`. */
declare function lucideName(value: string | undefined): string | undefined;
declare function hasLucideIcon(name: string): boolean;
declare function lucideIconNames(): string[];
interface LucideIconProps {
    name: string;
    className?: string;
    /** CSS length; defaults to `1em`. */
    size?: string;
}
/** Inline SVG of a Lucide icon, or nothing (with one warning) for an unknown name. */
declare function LucideIcon({ name, className, size }: LucideIconProps): h.JSX.Element | null;

export { LucideIcon, NavNode, NavTree, NavigationOptions, ResolvedOptions, type Scope, buildTree, chainOf, defaultOptions, flatten, hasLucideIcon, lucideIconNames, lucideName, resolveOptions, resolveScope, treeFromFiles };
