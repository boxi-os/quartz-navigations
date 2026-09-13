# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`quartz-navigations` is a [Quartz](https://quartz.jzhao.xyz) v5 community plugin with one
**component** (`Navigation`) that renders navigations from the content folder structure. Several
instances with different options can be placed in one layout (header menu, section accordion,
pager, footer sitemap). The scaffold follows the sibling projects `quartz-layout-box` and
`quartz-multilanguage` (same tooling, `dist/` committed, installed via `github:`).

`AGENTS.md` (workflow and constraints) and `ARCHITECTURE.md` (lifecycle, file map) are the detailed
references; `README.md` documents all options for users.

## Commands

```bash
npm install          # install deps
npm run build        # tsup build -> dist/ (must be committed after changes to src/)
npm run dev          # tsup --watch
npm run typecheck    # tsc --noEmit
npm run lint         # eslint . --max-warnings=0
npm run format       # prettier . --check (use `prettier . --write` to fix)
npm test             # vitest run
npm run check        # typecheck + lint + format + test (run before submitting)
```

Run a single test file: `npx vitest run test/tree.test.ts`
Run tests matching a name: `npx vitest run -t "accordion"`

## Architecture

- `src/options.ts` — `resolveOptions()` merges the raw YAML options with the code defaults and
  validates enums (warnings via `warnOnce`); `treeOptionsKey()` names the options that change the
  tree. Defaults live **only** here.
- `src/tree.ts` — `buildTree(allFiles, opts)` turns Quartz's `allFiles` into `NavNode`s (folders
  carry the slug of their index page, `docs/index`); `treeFromFiles()` caches per `allFiles`
  identity and tree options. `src/sort.ts` — comparators (manual cascade, alphabetical, date).
- `src/scope.ts` — `resolveScope(tree, slug, opts)` picks the subtree to render (`rootPath`,
  `scope`) and the active trail; `flatten()` / `pagerNeighbours()` for `select` and `pager`.
- `src/links.ts` — `hrefFor()` via `resolveRelative`, `linkTarget()` for folders.
- `src/components/Navigation.tsx` — constructor: options, stable instance id (hash), breakpoints
  → CSS string, dispatch to `src/components/render.tsx` (list variants, select, pager).
- `src/components/styles/` — `_basic.scss` (layout, under `.quartz-nav--basic`), `_full.scss`
  (colors, under `.quartz-nav--full`); `navigations.scss` joins them. All tunable values are
  `--quartz-nav-*` custom properties declared in `_basic.scss` (documented in the README). Media queries use
  `__NAV_BP_MOBILE__` / `__NAV_BP_DESKTOP__`, replaced by `src/breakpoints.ts` with the values
  from the site's `quartz/styles/variables.scss` (Quartz 5 has no config option for breakpoints).
- `src/scripts/navigations.inline.ts` — browser script (persistence, popup closing, hover,
  off-canvas scroll lock, select navigation). Must stay a script (no `export`).
- `src/i18n/` — the plugin's own UI strings (`en-US`, `de-DE`).

### How Quartz wires the plugin (verified against Quartz v5)

- `category: ["component"]`; the component is registered from `./components` under `Navigation`
  and the plugin name. The YAML `layout` block resolves by **plugin name only**, so the plugin
  must expose exactly one component.
- Every YAML entry with a `layout` block instantiates the constructor with that entry's raw
  `options` (cached per `JSON.stringify(options)`); manifest `defaultOptions` are **not** merged.
- `props.allFiles` is the same array for every page of a build and includes the virtual pages of
  the folder-page plugin (`<folder>/index` with the directory name as title, no `filePath`).
- Component `css` / `afterDOMLoaded` are collected into `Set<string>`: identical strings are
  emitted once, which is why all instances share one stylesheet and one script.
- `DesktopOnly` / `MobileOnly` wrap the component in a `<div>`; `displayClass` is not passed.

### Build system (`tsup.config.ts`)

- Entry points `index`, `types`, `components/index`; everything bundled except `preact`,
  `@jackyzha0/quartz`, `vfile` (singleton externals). `.scss` → CSS string, `.inline.ts` → bundled
  browser JS string. `vitest.config.ts` mirrors both loaders for tests (raw file contents).
- `dist/` is committed; Quartz treats the plugin as pre-built and only symlinks the peers, so every
  runtime dependency (`@quartz-community/*`, `github-slugger`) must stay in `devDependencies` to
  be bundled. CI verifies this (`verify-dist-bundling`).

## Claude-Skills in diesem Projekt

Skills werden projektlokal unter `.claude/skills/` bereitgestellt, nie global. Skills, die nicht
projektspezifisch sind, liegen im gemeinsamen Store `~/.agents/skills/` und werden hierher verlinkt;
die Symlinks sind in `.gitignore` ausgenommen, weil sie absolute Pfade enthalten:

    ln -s ~/.agents/skills/projekt-dokumentieren .claude/skills/projekt-dokumentieren

Verfügbare Skills im Store: `ls ~/.agents/skills/`
