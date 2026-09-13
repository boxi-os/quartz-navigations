# quartz-navigations

Provider-agnostic instruction file for AI coding assistants working on this repository.

## Project Overview

`quartz-navigations` is a Quartz v5 component plugin. It builds a navigation tree from the content
folder structure at build time and renders it in ten presentations; one YAML entry per instance.
See `ARCHITECTURE.md` for the lifecycle and file map, `README.md` for user-facing options.

## Files to Modify

- `src/options.ts`: option defaults and validation (single source of truth for defaults).
- `src/tree.ts`, `src/sort.ts`, `src/scope.ts`, `src/links.ts`, `src/language.ts`: pure tree logic — add tests in
  `test/` for every change.
- `src/components/Navigation.tsx` (constructor) and `src/components/render.tsx` (markup).
- `src/components/styles/navigations.scss`: the single stylesheet; every tunable value is a
  `--quartz-nav-*` custom property (document new ones in both READMEs); keep the breakpoint
  placeholders `__NAV_BP_MOBILE__` / `__NAV_BP_DESKTOP__` in media queries.
- `src/icons.tsx`: Lucide lookup and inline SVG rendering.
- `src/breakpoints.ts`: reads the site's `quartz/styles/variables.scss`.
- `src/scripts/navigations.inline.ts`: browser script.
- `src/i18n/locales/*.ts`: plugin UI strings; add a locale by copying `en-US.ts` and registering
  it in `src/i18n/index.ts`.
- `src/types.ts`: `NavigationOptions` (single definition, documented per field) and `NavNode`.
- `package.json` → `quartz` manifest: keep `defaultOptions` in sync with `src/options.ts`; the
  manifest must declare exactly one component.
- `test/`: vitest tests (`test/fixture.ts` holds the shared sample site).

## Leave Alone

- `dist/`: build output. **Tracked and committed** (Quartz installs from it). Rebuild with
  `npm run build` after any change under `src/` and commit the result.
- `.github/`: CI configuration.
- `tsup.config.ts`: only touch to add native-dependency exclusions or build-time loaders (the
  `.scss`, `.inline.ts` and `virtual:lucide-nodes` loaders must stay mirrored in
  `vitest.config.ts`).

## Workflow

1. Change code under `src/` and add/adjust tests in `test/`.
2. `npm run check` (typecheck, lint, prettier, vitest) must pass.
3. `npm run build`, commit `dist/` together with the source change. CI rebuilds `dist/` and fails
   if the result differs from the committed one, and checks every emitted `.js` file for unbundled
   external imports.
4. Update `README.md` / `README.de.md` (options table) and `CHANGELOG.md`.

## Constraints

- Quartz calls the component constructor with the raw YAML `options`; manifest `defaultOptions`
  are not merged in. Keep defaults in `src/options.ts`.
- The manifest declares exactly one component (`Navigation`); Quartz resolves the YAML `layout`
  block by plugin name, which only works with a single component. Never add a `default` export to
  `src/index.ts`.
- The tree is built from `props.allFiles` (which includes the folder-page plugin's virtual pages)
  and cached per array identity. Never import from Quartz core; only `@quartz-community/types`
  and `@quartz-community/utils` subpaths (`/path`, `/lang`) are available.
- Component `css` and `afterDOMLoaded` must stay one string for all instances (Quartz dedupes by
  content). Instance-specific behaviour goes into classes and `data-*` attributes.
- Never hard-code breakpoints in SCSS; use the placeholders replaced by `applyBreakpoints`.
- `preact` and `vfile` stay peerDependencies and external; everything else must be bundled:
  `@quartz-community/*` live in `dependencies` and are forced into the bundle by `noExternal`,
  other runtime packages (`lucide-static`) go into `devDependencies`. Never widen `noExternal`
  in `tsup.config.ts` beyond `@quartz-community/`.
- Animations must not play for folders rendered open; keep them bound to `data-animate`, which
  only the client script sets on interaction.
- The inline script must stay a plain script (no `export`, no `declare global`), and every
  `addEventListener` needs a matching `window.addCleanup()` for SPA navigation.
- All code, comments, docs and commit messages in English; `README.de.md` mirrors `README.md`.
