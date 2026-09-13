# Architecture Reference

Machine-readable architecture overview for `quartz-navigations`, a Quartz v5 plugin with one
component.

## Plugin Lifecycle

1. **Loading**: Quartz reads the `quartz` manifest in `package.json` (`category: ["component"]`),
   imports `dist/components/index.js` and registers `Navigation` under its export name and the
   plugin name.
2. **Initialization**: every `quartz.config.yaml` entry with a `layout` block calls the
   constructor with its raw `options`. The constructor runs `resolveOptions()`, derives a stable
   instance id (explicit `id` or a hash of the options), reads the site's breakpoints from
   `quartz/styles/variables.scss` and replaces the placeholders in the compiled stylesheet.
   Quartz caches instances per options, so identical entries share one instance.
3. **Resource collection** (`ComponentResources` emitter, before any page renders): the
   component's `css` and `afterDOMLoaded` strings are collected. All instances produce the same
   two strings, so the site gets one stylesheet and one script.
4. **Render** (per page): `treeFromFiles(allFiles)` returns the tree for this build (built once
   per tree-relevant option set, cached by array identity). `resolveScope()` picks the subtree
   for the current page and computes the active trail. The variant renderer emits `<nav>` markup
   with `active` / `active-trail` classes and relative links (`resolveRelative`). Nothing is
   deferred to the browser.
5. **Browser**: `navigations.inline.ts` runs on every `nav` event: restores remembered folder
   state, collapses mobile-only folders on small screens, flags folders with `data-animate` on
   first interaction (so the open animation never plays for folders rendered open), closes popup
   panels on Escape, outside clicks and navigation, opens them on hover when configured, manages
   the off-canvas scroll lock and navigates when a `<select>` option is chosen. Every listener is
   registered with `window.addCleanup`.

## Data Model

- `NavNode` (`src/types.ts`): `kind` (`folder` | `page`), `slug` (folders: `docs/index`, root:
  `index`), `segment`, `title`, `parentSlug`, `depth`, `children`, `hasIndex`, `isVirtual`,
  optional `order`, `listOrder`, `prefixOrder`, `date`, `icon`.
- `NavTree`: `root` plus `bySlug` map for ancestor lookups.
- `Scope` (`src/scope.ts`): `base` (the `rootPath` folder), `root` (folder whose children are
  rendered), `current` (node of the current page, if visible), `trail` (ancestor slugs).
- Markup contract (see README, "Markup and classes"): `nav.quartz-nav` with variant and mobile
  classes and `data-*` attributes read by the client script (`data-quartz-nav`, `data-variant`,
  `data-mobile`, `data-persist`, `data-trigger`, `data-bp-mobile`); folders as
  `details[data-folder][data-trail][data-mobile-collapsible][data-animate]`.
- Icons (`src/icons.tsx`): `navIcon` values starting with `lucide:` and the plugin's own symbols
  (`iconNames`) resolve against Lucide's icon table, imported as the virtual module
  `virtual:lucide-nodes` (a compact JSON string, parsed lazily) and rendered as inline SVG.

## Build System

`tsup` bundles three entry points (`index`, `types`, `components/index`) to `dist/` with code
splitting, so the shared code (including the ~360 KB Lucide table) is emitted once as a chunk.
Left external are only the singletons that must resolve to the host's instance: `preact`, `vfile`
and `@jackyzha0/quartz`. Everything else is inlined — `@quartz-community/utils`,
`github-slugger`, `lucide-static` — because Quartz never installs a pre-built plugin's
`dependencies`, only its `peerDependencies`; runtime packages therefore live in
`devDependencies`. `.scss` imports compile to CSS strings (the breakpoint placeholders survive
compilation and are replaced at construction time), `.inline.ts` imports bundle to browser JS
strings, `virtual:lucide-nodes` resolves to `node_modules/lucide-static/icon-nodes.json` as a
compact JSON string. `vitest.config.ts` provides the same loaders for tests. `dist/` is committed.

## Directory Structure

- `src/`
  - `index.ts`: main entry (component, tree helpers, types). `components/index.ts`: what Quartz
    imports.
  - `types.ts`: `NavigationOptions`, `ResolvedOptions`, `NavNode`, `NavTree`.
  - `options.ts`: defaults, `resolveOptions()`, `normalizePath()`, `treeOptionsKey()`.
  - `frontmatter.ts`: narrowing helpers for frontmatter values.
  - `tree.ts`: `buildTree()`, `treeFromFiles()`. `sort.ts`: `compareNodes()`.
  - `scope.ts`: `resolveScope()`, `chainOf()`, `flatten()`, `pagerNeighbours()`.
  - `links.ts`: `hrefFor()`, `linkTarget()`, `firstPage()`.
  - `icons.tsx`: `LucideIcon`, `lucideName()`, `hasLucideIcon()`, `lucideIconNames()`.
  - `breakpoints.ts`: `parseBreakpoints()`, `resolveBreakpoints()`, `applyBreakpoints()`.
  - `components/Navigation.tsx`: constructor. `components/render.tsx`: markup per variant.
  - `components/styles/navigations.scss`: the single stylesheet (custom properties, layout per
    variant, animations, mobile modes).
  - `scripts/navigations.inline.ts`: browser script.
  - `i18n/`: plugin UI strings.
  - `util/warn.ts` (`warnOnce`), `util/lang.ts` (`classNames`), `util/glob.ts`, `util/hash.ts`,
    `build/validate-manifest.ts`.
- `test/`: vitest tests (`options`, `breakpoints`, `tree`, `scope`, `render`, `icons`, `client`)
  and `fixture.ts` (sample site).
- `dist/`: build output (committed).
- `package.json`: manifest (`quartz` field) and dependencies. `tsup.config.ts`: build configuration.
