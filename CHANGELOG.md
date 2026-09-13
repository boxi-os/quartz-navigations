# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2026-09-13

### Added

- Multilingual sites with quartz-multilanguage. The new option `language` (default `auto`) shows
  the tree of the current page's language for every layout of that plugin: language folders,
  the default language in the root, language suffixes in file names and languages in the
  frontmatter. Pages are placed by their language-neutral path (`baseSlug`), generated folder
  pages are assigned through the pages next to them, and a language folder's start page wins over
  a root `index.md`, even one with the language in its frontmatter. Pages that belong to several
  languages or none (shared folder pages, tag pages) get the default language, as in
  quartz-multilanguage. `language: all` ignores languages, a language code fixes one; a code no
  page carries is reported in the build log.
- The plugin's words ("Previous", "Overview", …) and alphabetical sorting follow the page
  language on multilingual sites.
- `NavNode.path` (language-neutral path) and `NavTree.folders` (folders by path).

### Changed

- Multilingual sites get the tree of the page's language by default (`language: auto`); up to
  0.2 one tree held every language, with the language folders as folders. `language: all`
  restores that.
- `rootPath`, `order`, `nodeIcons`, `include` and `exclude` refer to language-neutral paths on
  multilingual sites; `include` and `exclude` also match the real slug. A `rootPath` naming a
  language folder (`rootPath: en`) keeps working: it shows that language's tree from the folder
  on, only on pages inside it. Sites without quartz-multilanguage are unaffected.

### Fixed

- A folder whose `_index.md` has no title is named after the folder instead of `_index`.

## [0.2.1] - 2026-09-13

### Fixed

- A page and a folder with the same name (`about.md` next to `about/`) no longer overwrite
  each other in the tree; which one survived depended on the file order.
- The pager never links to the current page any more. A folder without its own page (or with
  `folderLink: first-child`) links to its first page, and "Previous" on that page pointed back
  at itself.
- The desktop rule that hides the toggle of folders collapsing only on mobile is now the exact
  negation of the mobile media query. At exactly the mobile breakpoint both `min-width` and
  `max-width` matched, hiding the toggle while the script collapsed the folders.
- Alphabetical sorting uses the site's `locale` from the Quartz config instead of the build
  machine's locale, so accented titles sort the same on every machine.
- `scope: parent` on the index page of `rootPath` shows the children of `rootPath` instead of
  rendering nothing.
- Folders that only collapse on mobile follow the viewport when it crosses the mobile
  breakpoint after the page has loaded (rotation, window resize).
- `showHome` without an index page under `rootPath` no longer renders an empty `<nav>`.

### Removed

- The unused "Close menu" translation string.

## [0.2.0] - 2026-09-13

### Changed

- Variants now imply their orientation: `vertical` is `tree`, `horizontal` is `bar`; the old
  names still resolve with a build warning. `dropdownTrigger` is `trigger` (same values, old
  name still accepted with a warning).
- Whole rows are click targets. `folderClick` defaults to `toggle`: the entire row of a
  collapsible folder is the `<summary>` and opens or closes it. With `link` the row is a link
  that fills its width and a toggle button with the chevron sits at its right edge. Folders that
  only collapse on mobile always use the link-plus-button layout.
- One stylesheet that follows the Quartz theme; the `--quartz-nav-*` variables stay the
  override surface. `--quartz-nav-item-padding` became `--quartz-nav-item-padding-y` /
  `--quartz-nav-item-padding-x`; `--quartz-nav-weight-parent` was replaced by the level
  weights; `--quartz-nav-color-trail` now defaults to `--secondary`; new `--quartz-nav-row-height`,
  `--quartz-nav-chevron-open-rotate`, `--quartz-nav-icon-size`, `--quartz-nav-color-icon`,
  `--quartz-nav-bg-active`, `--quartz-nav-accent-bar`, `--quartz-nav-folder-font`.
- Subtle animations: hover colors fade, chevrons rotate, opening folders and popup panels fade
  in, the off-canvas panel slides. Folders rendered open (active trail, remembered state) do not
  animate on page load; the client script sets `data-animate` on first interaction.
- Entries of the horizontal rows, of popup panels and of the tab rows no longer wrap inside
  themselves (`white-space: nowrap`); panels grow to fit and the mega panel lays its columns
  out with flex-wrap instead of a fixed grid. Stacked mobile lists wrap as before.
- Off-canvas panel has a close button (Lucide `x`) inside the panel.
- Pager links show arrow icons next to the labels.

### Added

- `flyout.side: auto | right | left`: flyout panels open to the left when the navigation sits in
  the right half of the page (`auto`, decided by the client script) or when fixed; the chevron of
  an open flyout folder points to the panel's side. Dropdown and mega panels that would leave
  the viewport flip to their item's right edge (`quartz-nav__list--flip`); panels inside a
  scrolling or masked container are lifted into the top layer (Popover API, `position: fixed`
  as fallback), anchored to their row, and close on scroll.
- `select.button` (default `false`): the "Go" button next to a select is opt-in; choosing an
  option navigates on its own, keyboard selection on Enter.
- `align: left | center | right | full` for the top row of `bar`, `dropdown`, `mega` and `tabs`.
- Explorer-style row glyphs: `folder` / `folder-open` for folders (open while the `<details>` is
  open or, where nothing collapses, while the current page lies inside),
  `file` for pages, `house` for the home entry, in `tree`, `accordion` and `flyout` on every
  level and inside `dropdown`, `mega` and `columns` panels. `icons: none | type | custom | both`
  (default `both`; booleans still accepted) switches them; `nodeIcons` sets icons per path from
  the config, `navIcon: none` suppresses one row's icon.
- Type scale by level: folder rows step down in size and weight (`--quartz-nav-level-*`), pages
  are capped at `--quartz-nav-page-size`, horizontal top rows are uniform
  (`--quartz-nav-bar-weight`). The current page gets a tinted background and, in the vertical
  variants, an accent bar; the guide line of the list holding it and the icons on its trail take
  the accent color.
- Lucide icons: `navIcon: lucide:<name>` renders an inline SVG (`lucide lucide-<name>
quartz-nav__icon`); unknown names warn once. The full icon table from `lucide-static` is bundled
  as a compact JSON string and parsed on first use.
- `iconNames` option (`folder`, `folderOpen`, `file`, `home`, `chevron`, `menu`, `close`,
  `previous`, `next`) to swap the plugin's own Lucide icons.
- `LucideIcon`, `hasLucideIcon`, `lucideIconNames` and `lucideName` exported from the main entry.

### Removed

- The `style` option and the `unstyled` / `basic` / `full` tiers, together with the
  `quartz-nav--basic` / `quartz-nav--full` classes and `data-style`. A `style` value in YAML is
  ignored with a warning.

## [0.1.0] - 2026-09-13

### Added

- `Navigation` component that builds a navigation tree from Quartz's `allFiles` at build time.
  Folder titles come from the folder's `index.md` (`navTitle`, then `title`), the real directory
  name or the slug segment; pages generated by the folder-page plugin count as folder pages.
- Multiple instances per site: every `quartz.config.yaml` entry with a `layout` block is one
  navigation with its own options. All instances share one stylesheet and one client script.
- Levels and scope: `rootPath`, `scope: root | section | parent | current`, `depth`,
  `showScopeRoot`, `showHome`, `indexEntry`, `hideOutsideRoot`.
- Ten presentations via `variant`: `vertical`, `horizontal`, `accordion`, `dropdown`, `flyout`,
  `tabs`, `mega`, `columns`, `select` and `pager`; mobile modes via `mobile`: `same`,
  `accordion`, `offcanvas`, `select`, `hidden`.
- Sorting: `sort: manual` (YAML `order` map, `navOrder` frontmatter, numeric file prefixes,
  natural title order), `alphabetical` and `date` with `sortDirection`, `foldersFirst`,
  `dateField` and `stripNumericPrefix`.
- Filtering: `hideTags`, `hideUnlisted`, `hideDrafts`, `hideEmptyFolders`,
  `keepIndexOnlyFolders`, `include` / `exclude` globs and the `navHide` frontmatter key.
- Active state: `active` and `aria-current="page"` on the current page, `active-trail` on every
  folder above it, computed at build time so it survives SPA navigation.
- Folder behaviour: `folderLink`, `folderClick`, `folderDefaultState`, `expandActive`,
  `exclusive`, `persistState`, `dropdownTrigger`.
- Style tiers `unstyled`, `basic` and `full`; the stylesheet's media queries use the breakpoints
  of the site's `quartz/styles/variables.scss`, overridable with `breakpoints`.
- Client script for remembered folder state, closing of dropdown panels (Escape, outside click,
  navigation), hover opening, the off-canvas scroll lock and select-based navigation, with
  `window.addCleanup` for every listener.
- Accessibility: distinct landmark names per instance (`ariaLabel`, `title`, variant default),
  folder titles as separate links next to a named toggle button instead of a link inside
  `<summary>`, `aria-expanded` / `aria-controls` on the off-canvas toggle, focus return on
  Escape for off-canvas and popup panels, keyboard-safe `select` navigation with a "Go" button,
  `prefers-reduced-motion` support and visible focus rings.
- All layout and color values as `--quartz-nav-*` custom properties on the root element, with
  defaults from Quartz's theme variables, so sites restyle the navigation from `custom.scss`.
- UI strings in English and German (`ariaLabel`, "Overview", "Home", "Previous", "Next",
  "Jump to…").
