export { Navigation } from './components/index.js';
import { ResolvedOptions, NavTree, NavigationOptions, NavNode } from './types.js';
export { NavMobile, NavScope, NavSort, NavStyle, NavVariant, NavigationBreakpoints, NavigationFrontmatterKeys } from './types.js';
import '@quartz-community/types';

type FileData = Record<string, unknown>;
/** Builds the navigation tree from Quartz's `allFiles`. Pure apart from `warnOnce`. */
declare function buildTree(allFiles: FileData[], opts: ResolvedOptions): NavTree;
/**
 * Cached per `allFiles` identity: Quartz passes the same array to every component of one
 * build, so instances with equal tree options share one tree.
 */
declare function treeFromFiles(allFiles: FileData[], opts: ResolvedOptions): NavTree;

/**
 * Defaults live here, not in the manifest: Quartz passes the raw YAML `options` to the
 * component constructor and never merges `quartz.defaultOptions` from package.json.
 */
declare const defaultOptions: {
    variant: "vertical";
    mobile: "same";
    style: "full";
    className: string;
    id: string;
    title: string;
    ariaLabel: string;
    chevrons: true;
    icons: false;
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
    folderClick: "link";
    folderDefaultState: "collapsed";
    expandActive: true;
    exclusive: false;
    persistState: false;
    dropdownTrigger: "click";
    breakpoints: {};
    tabs: {
        secondary: true;
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

export { NavNode, NavTree, NavigationOptions, ResolvedOptions, type Scope, buildTree, chainOf, defaultOptions, flatten, resolveOptions, resolveScope, treeFromFiles };
