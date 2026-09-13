// Quartz registers the component from `./components`; this entry is for consumers who want
// the tree helpers, e.g. from `quartz.ts`. Never add a `default` export.
export { default as Navigation } from "./components/Navigation";
export { buildTree, treeFromFiles } from "./tree";
export { resolveOptions, defaultOptions } from "./options";
export { resolveScope, chainOf, flatten } from "./scope";

export type {
  NavigationOptions,
  NavigationBreakpoints,
  NavigationFrontmatterKeys,
  NavNode,
  NavTree,
  NavVariant,
  NavMobile,
  NavStyle,
  NavScope,
  NavSort,
  ResolvedOptions,
} from "./types";
export type { Scope } from "./scope";
