# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- Rail: with `content: push`, every page change slid the page in from the window edge. The rail's
  SPA cleanup dropped the push at once, Quartz reads the layout before the next page's rail sets
  it again, and the offset's transition started from 0. The cleanup now leaves the push until the
  next page has set up its rails; a page without a rail on that edge still drops it.

## [0.6.2] - 2026-11-21

### Added

- `--quartz-nav-rail-gap` (default `0px`): room between a pushing rail and the page. It counts
  into `--quartz-nav-rail-offset-left|right`, so a full-width header that pulls itself back by the
  offset still reaches the window edge.

### Fixed

- Rail: with `rest: icons` and `content: push`, a menu opened with `hoverContent: overlay` or
  pinned with `pinContent: overlay` dropped the strip's push, and the page slid under the menu by
  the strip's width. The page now stays beside the strip while the menu lies over it (with its
  shadow, also in the early `<head>` script).

## [0.6.1] - 2026-11-17

### Changed

- Lucide icons updated from lucide-static 1.45.0 to 1.74.0: 2089 icons (before 1834). Lucide
  renamed 42 icons since (`triangle-alert` is `triangle-exclamation-point`, `music` is
  `eighth-notes`, …); the former names keep working, the table now carries all 312 of them as
  pointers to their new icon, so `navIcon: lucide:triangle-alert` still draws.

## [0.6.0] - 2026-11-17

### Added

- Own SVG icons: `svg:<path>` and `svg-mono:<path>` in `navIcon` and `nodeIcons` draw an SVG file
  from the content folder inline, like a Lucide icon. `svg:` keeps the file's colours, `svg-mono:`
  turns them into `currentColor`. The file is rebuilt from an allow list (taken from
  QuartzControl's "Insert image", parsed with xmldom): no scripts, handlers, `<style>`, links,
  outside references or DOCTYPE entities; ids get a prefix per drawing. Paths outside the content
  folder, files over 50 KB and unreadable files log one build warning and draw no icon (the rail
  strip shows the monogram).

## [0.5.1] - 2026-11-16

### Added

- Dividers: `navDivider: true` in a page's frontmatter (on an `index.md`, the folder's) or its
  path in the new option `dividers` draws a line before the entry (`li.quartz-nav__divider`,
  `role="separator"`), across lists and upright in rows; never at the top of a list. New
  frontmatter key `frontmatterKeys.divider`, custom properties `--quartz-nav-divider-color` and
  `--quartz-nav-divider-gap`.
- `rail.startPinned`: the menu starts pinned on wide screens until a visitor unpins it; the unpin
  is remembered in `localStorage`.

### Fixed

- Rail: a menu that was pinned and then unpinned stayed open until the next click; where hover
  opens the menu, leaving it closes it again.

## [0.5.0] - 2026-11-16

### Added

- `variant: rail` (German label “Randmenü”): a menu button where the layout puts the navigation and
  a panel at the screen edge in three states (closed, a strip of level-1 icons, the full menu with
  collapsible folders). Level-1 rows without a custom icon show a monogram. The panel starts below
  the site's sticky bar and is lifted into the top layer inside clipping sidebars.
- Rail options: `rail.rest` (`hidden` / `icons`), `rail.side` (`left` / `right`), `rail.expand`
  (`hover` / `strip` / `click`), `rail.content` (`overlay` / `push`), `rail.hoverContent` and
  `rail.pinContent` (`same` / `overlay` / `push`, for what hover shows and for a pinned menu),
  `rail.pin` (a pin button that keeps the menu open across clicks, Escape and page changes,
  remembered in `localStorage`, on wide screens only) and `rail.onNavigate` (`close` / `keep`: a
  link followed from the open menu leaves it open on the next page until the pointer leaves it;
  modified clicks, new-tab links and links to the same page are ignored). New icon names
  `iconNames.pin` / `iconNames.unpin`.
- Pushing pads `<body>` by `--quartz-nav-rail-offset-left|right` (in pixels, registered with
  `@property` so it animates; rails on the same edge push by the widest). Where pushing would leave
  the page less than the mobile breakpoint, counting a pushing rail on the other side, the rail lies
  over the page instead. The README shows how a header across the full window stays in place.
- A `beforeDOMLoaded` script shows a pinned, pushing rail before the first paint, so a full load
  does not make the page jump (layout shift of a reload on the test site: 0.19 before, the page's
  own 0.03 after). Its rules are scoped to their navigation (`body:has(…)`).

### Changed

- Breakpoints come from the frame breakpoints QuartzHub writes (`.quartz-gui/layout-breakpoints.json`)
  where present, before `quartz/styles/variables.scss`, so the navigation switches at the same width
  as the page layout. Breakpoints of 0 or below are rejected.
- `mobile: accordion` and `offcanvas` do not apply to the rail, which slides in by itself; they fall
  back to `same` with a warning.
- `LICENSE` names boxi-os as the copyright holder instead of “Quartz Community”.

## [0.4.3] - 2026-10-18

### Changed

- Three German descriptions in `quartz.configSchema` say “Button” instead of “Knopf”, the word
  QuartzControl uses everywhere else. No option or default changed.

## [0.4.2] - 2026-10-15

### Changed

- The option groups of `quartz.configSchema` follow what an editor needs: the variant and the options
  only some variants read (`align`, `trigger`, the folder behaviour, `tabs`, `flyout`, `select`,
  `columns`, `pager`) in one group, then Page selection, Hide, Order, Labels and icons, On
  smartphones and Technical (`ariaLabel`, `className`, `id`, `frontmatterKeys`). The group
  "Presentation" with eleven unrelated options and "Variant options" are gone. Options and their
  defaults are unchanged.

## [0.4.1] - 2026-10-07

### Fixed

- 17 German descriptions in `quartz.configSchema` began with the rest of a Markdown table row -
  ``string` | `"auto"` | Zusammenspiel …`` - because the option table of `README.de.md` they were
  taken from was split at escaped pipes. Three more pointed at sections of the README (“siehe
  unten”) that an editor does not have. The variant options now come last in the order, after the
  groups they depend on. A test now rejects a description with an odd number of backticks or a pipe
  between code spans.

## [0.4.0] - 2026-10-07

### Added

- `quartz.configSchema` in `package.json`: a JSON Schema of all 46 options, nested ones included,
  with descriptions in English and German, groups, an order, German labels for the choices and the
  conditions under which an option applies — the `tabs`, `flyout`, `columns` and `pager` blocks only
  with their variant, `align` with `bar`, `dropdown`, `mega` and `tabs`, `trigger` with `dropdown`,
  `mega` and `flyout`, `dateField` with `sort: date`. Quartz itself only passes it on; editors such
  as QuartzControl build their option form from it. A test holds the schema against
  `NavigationOptions` and every type it uses, and against `quartz.defaultOptions`, in both
  directions.

## [0.3.2] - 2026-09-21

### Fixed

- A title that wraps onto a second line keeps its icon beside the first line. Rows centred their
  items, so the icon sat halfway down a two-line title (11.9 px below the first line's middle in
  a 250 px sidebar). Rows now align to the top, and the icon box and the chevron are one line
  tall (`1lh`) with the glyph centred inside. On a single line nothing moves; measured in
  Chromium and WebKit.

## [0.3.1] - 2026-09-20

### Fixed

- `persistState` no longer closes the folder of the current page. With `exclusive` the folders of
  one level are a native `<details name>` group in which the browser keeps at most one open, so
  restoring a remembered folder after the page had rendered evicted the one the current page sits
  in. On a site with `expandActive` (the default) and both options on, that meant only the first
  folder ever opened by hand stayed open, and every chapter visited afterwards was shut again a
  moment after it appeared. A remembered folder is now skipped when another folder of its own
  exclusive group is on the active trail; with no trail folder in the group - on a front page, say
  - it is restored as before.
- `pager` no longer shows an empty card where a direction is missing. The first page of a site has
  no "previous" and the last has no "next", and the placeholder that keeps the remaining button on
  its side inherited the button's border, radius and padding.
- `pager` stacks below the mobile breakpoint instead of squeezing both buttons into halves of a
  phone-width line, where `max-width: 48%` leaves 168px for a page title.

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
