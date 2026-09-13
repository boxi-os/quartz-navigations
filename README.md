# quartz-navigations

Navigations for [Quartz](https://quartz.jzhao.xyz) v5, built from the folder structure of your
content. One plugin, as many instances as you like: a menu bar in the header, an accordion for the
current section in the sidebar, a sitemap in the footer, previous/next links under the article.
Each instance picks its own levels, sorting and presentation.

- Tree from the content folders at build time, with folder titles from `index.md` or the folder
  name
- Levels and scope per instance: the whole site, one section, the current folder, only siblings
- Ten presentations: `tree`, `bar`, `accordion`, `dropdown`, `flyout`, `tabs`, `mega`, `columns`,
  `select`, `pager`; each one implies its orientation
- Mobile modes per instance: accordion, off-canvas panel with burger, jump menu, hidden
- Sorting: manual (order list in YAML, `navOrder` in frontmatter, numeric file prefixes),
  alphabetical or by date
- `active` on the current page, `active-trail` on every folder above it, `aria-current="page"`
- Whole rows are click targets: a folder row toggles the folder, or is a link with a toggle
  button at its end; submenus open on click or on hover
- Follows the Quartz theme (colors, fonts, dark mode); every value is a `--quartz-nav-*` CSS
  variable you can override from `custom.scss`
- Subtle animations for opening folders, panels and the off-canvas menu, off with
  `prefers-reduced-motion`
- Folder and file glyphs on every row like a file explorer, with sizes and weights stepping
  down by level; per-page icons via `navIcon: lucide:book-open` or `nodeIcons` in the config;
  chevrons, burger and pager arrows are [Lucide](https://lucide.dev) icons too
- Works without JavaScript; the small client script adds remembered folder state, hover menus
  and the scroll lock
- Breakpoints are read from your site's `quartz/styles/variables.scss`, not hard-coded

## Installation

```bash
npx quartz plugin add github:boxi-os/quartz-navigations
```

Then add one entry per navigation to `quartz.config.yaml`. `layout` places the instance; the
plugin can be listed as often as you need. An entry without a `layout` block is not dropped:
Quartz places it at the plugin's default, `left` with `priority: 10`.

```yaml
plugins:
  # Header: the first level as a menu bar, off-canvas panel on phones
  - source: github:boxi-os/quartz-navigations
    enabled: true
    options:
      variant: bar
      depth: 1
      mobile: offcanvas
    layout:
      position: header
      priority: 20

  # Sidebar: the section the current page belongs to, as an accordion
  - source: github:boxi-os/quartz-navigations
    enabled: true
    options:
      variant: accordion
      scope: section
      showScopeRoot: true
      persistState: true
    layout:
      position: left
      priority: 20
      display: desktop-only

  # Under the article: previous / next
  - source: github:boxi-os/quartz-navigations
    enabled: true
    options:
      variant: pager
    layout:
      position: afterBody
      priority: 10

  # Footer: a sitemap in columns
  - source: github:boxi-os/quartz-navigations
    enabled: true
    options:
      variant: columns
      depth: 2
    layout:
      position: footer
      priority: 10
```

## How the tree is built

Every page becomes a node; every folder becomes a node whose link is the folder page
(`docs/index`). Quartz's folder-page plugin generates that page when there is no `index.md`, so
folders are always linkable. Titles come from, in this order: the `navTitle` frontmatter key, the
page title, the real directory or file name, the slug segment.

Pages control themselves through frontmatter (keys configurable via `frontmatterKeys`):

| Key        | Effect                                                                               |
| ---------- | ------------------------------------------------------------------------------------ |
| `navOrder` | Number used by `sort: manual`. Lower first. On an `index.md` it orders the folder.   |
| `navTitle` | Title shown in the navigation instead of `title`.                                    |
| `navHide`  | `true` hides the page; on an `index.md` it hides the whole folder.                   |
| `navIcon`  | Icon before the title: `lucide:<name>`, short text, an emoji, or `none` (see Icons). |

Hidden by default: the `tags` folder, `unlisted` pages, drafts and the 404 page.

## Options

| Option                 | Type                                                                                                               | Default                                                                                                | Description                                                                                                                                                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`              | `"tree" \| "bar" \| "accordion" \| "dropdown" \| "flyout" \| "tabs" \| "mega" \| "columns" \| "select" \| "pager"` | `"tree"`                                                                                               | Presentation, see below. Each variant implies its orientation.                                                                                                                                                                                           |
| `mobile`               | `"same" \| "accordion" \| "offcanvas" \| "select" \| "hidden"`                                                     | `"same"`                                                                                               | Presentation below the mobile breakpoint.                                                                                                                                                                                                                |
| `align`                | `"left" \| "center" \| "right" \| "full"`                                                                          | `"left"`                                                                                               | Alignment of the top row of `bar`, `dropdown`, `mega` and `tabs`; `full` spreads the entries over the whole width. Ignored by the other variants.                                                                                                        |
| `className`            | `string`                                                                                                           | `""`                                                                                                   | Extra classes on the `<nav>`.                                                                                                                                                                                                                            |
| `id`                   | `string`                                                                                                           | hash of the options                                                                                    | Stable instance id for element ids and `localStorage`. Set it when one layout uses the same options twice, otherwise both instances share their element ids.                                                                                             |
| `title`                | `string`                                                                                                           | `""`                                                                                                   | Heading above the navigation.                                                                                                                                                                                                                            |
| `ariaLabel`            | `string`                                                                                                           | translated "Main navigation"                                                                           | Accessible name of the `<nav>`.                                                                                                                                                                                                                          |
| `chevrons`             | `boolean`                                                                                                          | `true`                                                                                                 | Chevrons on collapsible folders. With `folderClick: link` the chevron is the toggle button and always shown.                                                                                                                                             |
| `icons`                | `"none" \| "type" \| "custom" \| "both"`                                                                           | `"both"`                                                                                               | `type`: folder and file glyphs. `custom`: `navIcon` / `nodeIcons`. `both`: custom where set, glyph elsewhere. `true` / `false` mean `both` / `none`.                                                                                                     |
| `iconNames`            | `{ folder, folderOpen, file, home, chevron, menu, close, previous, next }`                                         | `folder`, `folder-open`, `file`, `house`, `chevron-down`, `menu`, `x`, `chevron-left`, `chevron-right` | Lucide icons for the plugin's own symbols.                                                                                                                                                                                                               |
| `nodeIcons`            | `Record<string, string>`                                                                                           | `{}`                                                                                                   | Icons per path, e.g. `{ docs: "lucide:book-open", "docs/api": "🧩" }`; same syntax as `navIcon`. Frontmatter wins.                                                                                                                                       |
| `rootPath`             | `string`                                                                                                           | `""` (site root)                                                                                       | Folder the navigation starts at, e.g. `docs` or `de`.                                                                                                                                                                                                    |
| `scope`                | `"root" \| "section" \| "parent" \| "current"`                                                                     | `"root"`                                                                                               | `root`: children of `rootPath`. `section`: the top-level folder of the current page. `parent`: the folder containing the current page (`rootPath` itself on its index page). `current`: the current folder.                                              |
| `depth`                | `number`                                                                                                           | `0` (unlimited)                                                                                        | Levels below the scope root.                                                                                                                                                                                                                             |
| `hideOutsideRoot`      | `boolean`                                                                                                          | `true`                                                                                                 | Render nothing on pages outside `rootPath`.                                                                                                                                                                                                              |
| `showScopeRoot`        | `boolean`                                                                                                          | `false`                                                                                                | Linked heading with the scope root above the list.                                                                                                                                                                                                       |
| `showHome`             | `boolean`                                                                                                          | `false`                                                                                                | First entry links to the index page of `rootPath`.                                                                                                                                                                                                       |
| `indexEntry`           | `"none" \| "first"`                                                                                                | `"none"`                                                                                               | Add "Overview" (the folder page) as first child of every expanded folder.                                                                                                                                                                                |
| `sort`                 | `"manual" \| "alphabetical" \| "date"`                                                                             | `"manual"`                                                                                             | `manual`: `order` list → `navOrder` → numeric prefix → title. Without any of these it is alphabetical. `foldersFirst` is applied before all of them.                                                                                                     |
| `sortDirection`        | `"asc" \| "desc"`                                                                                                  | `"asc"`                                                                                                | Missing values (no date, no order) always go last.                                                                                                                                                                                                       |
| `foldersFirst`         | `"first" \| "last" \| "mixed"`                                                                                     | `"first"`                                                                                              | Folders before pages, after them, or sorted together.                                                                                                                                                                                                    |
| `dateField`            | `"created" \| "modified" \| "published"`                                                                           | `"created"`                                                                                            | Date used by `sort: date`.                                                                                                                                                                                                                               |
| `order`                | `Record<string, string[]>`                                                                                         | `{}`                                                                                                   | Child order per folder path: `{ "": [docs, blog], docs: [intro, setup] }`. Entries are slug segments or file names.                                                                                                                                      |
| `stripNumericPrefix`   | `boolean`                                                                                                          | `false`                                                                                                | Remove a leading number and its separator (`01-`, `01 `, `01_`, `01.`) from titles. Applies to every title starting that way, frontmatter `title` included (`1.2 – Setup` becomes `2 – Setup`); `navTitle` is left alone.                                |
| `frontmatterKeys`      | `{ order, title, hide, icon }`                                                                                     | `navOrder`, `navTitle`, `navHide`, `navIcon`                                                           | Frontmatter keys the plugin reads.                                                                                                                                                                                                                       |
| `hideTags`             | `boolean`                                                                                                          | `true`                                                                                                 | Hide the `tags` folder.                                                                                                                                                                                                                                  |
| `hideUnlisted`         | `boolean`                                                                                                          | `true`                                                                                                 | Hide pages marked `unlisted`.                                                                                                                                                                                                                            |
| `hideDrafts`           | `boolean`                                                                                                          | `true`                                                                                                 | Hide pages with `draft: true`.                                                                                                                                                                                                                           |
| `hideEmptyFolders`     | `boolean`                                                                                                          | `true`                                                                                                 | Drop folders without visible children.                                                                                                                                                                                                                   |
| `keepIndexOnlyFolders` | `boolean`                                                                                                          | `true`                                                                                                 | Keep folders whose only content is their index page.                                                                                                                                                                                                     |
| `include`              | `string[]`                                                                                                         | `[]` (all)                                                                                             | Globs on slugs; `docs` keeps the subtree, `docs/**` everything below it.                                                                                                                                                                                 |
| `exclude`              | `string[]`                                                                                                         | `[]`                                                                                                   | Globs on slugs to hide, e.g. `private/**`. A folder name matches its whole subtree; `docs/*` also matches `docs/index` and everything below, so the folder disappears. Excluding only `docs/index` keeps the folder, which then links to its first page. |
| `folderLink`           | `"index" \| "none" \| "first-child"`                                                                               | `"index"`                                                                                              | Where a folder title links to. `index` falls back to the first page when no folder page exists.                                                                                                                                                          |
| `folderClick`          | `"toggle" \| "link"`                                                                                               | `"toggle"`                                                                                             | Collapsible folders: the whole row toggles the folder, or the row is a link with a toggle button at its end. See "Folder rows".                                                                                                                          |
| `folderDefaultState`   | `"collapsed" \| "open"`                                                                                            | `"collapsed"`                                                                                          | Initial state of collapsible folders.                                                                                                                                                                                                                    |
| `expandActive`         | `boolean`                                                                                                          | `true`                                                                                                 | Open the folders on the path to the current page.                                                                                                                                                                                                        |
| `exclusive`            | `boolean`                                                                                                          | `false`                                                                                                | Only one open folder per level (`<details name>`).                                                                                                                                                                                                       |
| `persistState`         | `boolean`                                                                                                          | `false`                                                                                                | Remember open folders in `localStorage` (accordion only).                                                                                                                                                                                                |
| `trigger`              | `"click" \| "hover"`                                                                                               | `"click"`                                                                                              | How `dropdown`, `mega` and `flyout` panels open. Hover also opens on keyboard focus.                                                                                                                                                                     |
| `breakpoints`          | `{ mobile, desktop }`                                                                                              | from `quartz/styles/variables.scss`                                                                    | Override the site's breakpoints, e.g. `{ mobile: 640px }`. The stylesheet is shared by all instances, so use the same value in every entry. `desktop` is accepted but currently unused.                                                                  |
| `flyout.side`          | `"auto" \| "right" \| "left"`                                                                                      | `"auto"`                                                                                               | `flyout`: side the panels open to. `auto` opens to the left when the navigation sits in the right half of the page (decided in the browser).                                                                                                             |
| `select.button`        | `boolean`                                                                                                          | `false`                                                                                                | `select` and `mobile: select`: show a "Go" button. Choosing an option navigates anyway: pointer selection at once, keyboard selection on Enter.                                                                                                          |
| `tabs.secondary`       | `boolean`                                                                                                          | `true`                                                                                                 | `tabs`: show the children of the active tab in a second row.                                                                                                                                                                                             |
| `columns.max`          | `number`                                                                                                           | `4`                                                                                                    | `columns`: reserved for a column limit; the layout currently uses an auto-fit grid.                                                                                                                                                                      |
| `pager.labels`         | `boolean`                                                                                                          | `true`                                                                                                 | `pager`: show "Previous" / "Next" above the titles.                                                                                                                                                                                                      |
| `pager.order`          | `"tree" \| "siblings"`                                                                                             | `"tree"`                                                                                               | `pager`: walk the whole tree in reading order, or only the siblings of the current page.                                                                                                                                                                 |

Defaults live in the plugin code; Quartz passes the raw YAML options through. The 0.1 spellings
`variant: vertical` / `horizontal` and `dropdownTrigger` still work with a build warning; the
removed `style` option is ignored with a warning.

### Variants

Each variant is either vertical or horizontal by nature, so there is no orientation option.

| Variant     | Orientation | What you get                                                                                                                                    |
| ----------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `tree`      | vertical    | Nested list, everything visible. Sidebars.                                                                                                      |
| `accordion` | vertical    | Nested list with collapsible folders (`<details>`), active path open, optional persistence and `exclusive`.                                     |
| `flyout`    | vertical    | List whose folders open a panel beside it: to the right, or to the left when the navigation sits in the right half of the page. Click or hover. |
| `bar`       | horizontal  | First level in a row; nested levels inline after the parent. Headers and footers with one or two levels.                                        |
| `dropdown`  | horizontal  | Row of first-level entries; folders open a panel below. Click or hover.                                                                         |
| `mega`      | horizontal  | Like `dropdown`, but the panel shows the second level as columns with the third level below.                                                    |
| `tabs`      | horizontal  | First level as a tab bar; the children of the active tab in a second row.                                                                       |
| `columns`   | grid        | First level as column headings with their children below. Footer sitemaps.                                                                      |
| `select`    | –           | A `<select>` jump menu with folders as option groups. Navigates via Quartz's SPA router.                                                        |
| `pager`     | –           | "Previous" / "Next" links in reading order of the tree. Put it in `afterBody`.                                                                  |

`align` places the top row of the horizontal variants: `left`, `center`, `right`, or `full`,
where every entry takes an equal share of the width. With `mobile: accordion` or `offcanvas` the
entries stack below the mobile breakpoint and the alignment is dropped; with `mobile: same` the row
wraps.

Dropdown and mega panels that would stick out of the viewport on the right hang from their
item's right edge instead, and a panel inside a scrolling sidebar (`overflow: auto`, which
would clip it) is lifted into the top layer with the Popover API (older browsers: `position:
fixed`), anchored to its row, and closes when the page scrolls.
The client script handles both when a panel opens.

`mobile` switches below the mobile breakpoint: `accordion` turns rows into a stacked list with
collapsible folders, `offcanvas` hides the list behind a burger button in a sliding panel with a
close button, `select` shows a jump menu instead of the list, `hidden` hides the instance.

### Folder rows

In `accordion`, `dropdown`, `mega` and `flyout` the whole row of a folder is the click target:

- `folderClick: toggle` (default): the row is the `<summary>`; clicking anywhere on it opens or
  closes the folder. The folder page is reachable through `indexEntry: first` ("Overview").
- `folderClick: link`: the row is a link to the folder page; a toggle button with the chevron
  sits at its right edge. This is the usual pairing with `trigger: hover`, where the panel opens
  on hover and the click follows the link.

Folders that only collapse on mobile (`mobile: accordion` on `bar`, `tree`, `columns`, `tabs`)
always use the link-plus-button layout, so the folder stays a link on desktop.

### Markup and classes

```
nav.quartz-nav.quartz-nav--<variant>.quartz-nav--mobile-<mode>
  h3.quartz-nav__title
  input.quartz-nav__toggle + label.quartz-nav__burger + label.quartz-nav__backdrop   (offcanvas)
  div.quartz-nav__panel
    label.quartz-nav__close                                                          (offcanvas)
    div.quartz-nav__root > a.quartz-nav__root-link                                     (showScopeRoot)
    ul.quartz-nav__list[data-level]
      li.quartz-nav__item.quartz-nav__item--page|--folder[.active|.active-trail]
        a.quartz-nav__link[.active|.active-trail] > svg|span.quartz-nav__icon[--folder|--folder-open|--file] + span.quartz-nav__text
        details.quartz-nav__folder[data-folder][data-trail][data-animate]
          summary.quartz-nav__summary > span.quartz-nav__link--static + span.quartz-nav__chevron   (toggle)
          summary.quartz-nav__summary.quartz-nav__summary--toggle > span.quartz-nav__sr-only + chevron (link)
```

The current page carries `active` (on `<li>` and `<a>`) and `aria-current="page"`; every folder
above it carries `active-trail`. Folder items with children also get `quartz-nav__item--parent`;
rows with a separate toggle button get `quartz-nav__item--split`.

## Icons

Rows carry a glyph before the title, the way a file explorer does: `folder` for a folder,
`folder-open` while it is open, `file` for a page, `house` for the `showHome` entry. A folder
counts as open when its `<details>` is open, or, where nothing collapses (`tree`, panels of
`dropdown` and `mega`, `columns`), when the current page lies inside it. Where they appear depends on the variant:

| Variant                          | Type glyphs                                                              |
| -------------------------------- | ------------------------------------------------------------------------ |
| `tree`, `accordion`, `flyout`    | every level                                                              |
| `dropdown`, `mega`, `columns`    | inside the panels / columns (level 2 and below), the top row stays clean |
| `bar`, `tabs`, `select`, `pager` | none                                                                     |

A custom icon replaces the glyph on that row and is shown in every variant except `select`, whose
options can only hold text:

- In frontmatter: `navIcon: lucide:book-open`, `navIcon: 📘`, or `navIcon: none` to show nothing.
  On an `index.md` it sets the folder's icon.
- In the config: `nodeIcons: { docs: "lucide:book-open", "docs/api": "🧩" }`, keyed by path,
  for folders without an `index.md` or when the icons should live in one place. Frontmatter
  wins over `nodeIcons`.

`icons` picks the mode: `both` (default), `type`, `custom` or `none`. Lucide icons are inlined
as SVG (`lucide lucide-book-open quartz-nav__icon`), sized `1.1em`, in the muted color and in
the accent color on the current page and its trail. The full [Lucide](https://lucide.dev/icons)
table ships with the plugin, nothing to install in the site; an unknown name logs one build
warning and renders nothing. The plugin's own symbols can be swapped through `iconNames`.

Lucide is released under the ISC license (see `node_modules/lucide-static/LICENSE`).

### Type scale by level

Folder rows step down in size and weight so the eye finds the top of a branch: level 1 is the
section (`0.95rem`, 700), level 2 a chapter (`0.9rem`, 600), level 3 and below are places
(`0.875rem` / `0.8rem`, 500, quieter colors). Pages use the level's size capped at
`--quartz-nav-page-size` and weight 400. Folder titles use the heading font. The top row of the
horizontal variants (`bar`, `dropdown`, `mega`, `tabs`) is uniform instead: one size, weight
`--quartz-nav-bar-weight`. All of it is tunable through the `--quartz-nav-level-*` variables.

## Styling with CSS variables

There is one stylesheet; it follows the Quartz theme (`--secondary`, `--dark`, `--lightgray`,
`--bodyFont`, …) and therefore dark mode. Every value is read from a `--quartz-nav-*` custom
property declared on the root element. Quartz emits component CSS inside `@layer quartz-base`,
so a site's unlayered `quartz/styles/custom.scss` overrides them without any selector fights:

```scss
.quartz-nav {
  --quartz-nav-indent: 1.5rem;
  --quartz-nav-color-active: var(--tertiary);
}

// One instance only (the value of `id`, or use `className`)
.quartz-nav[data-quartz-nav="side"] {
  --quartz-nav-bg-hover: transparent;
}
```

| Variable                                                                                                          | Default                                                   | Used for                                                         |
| ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------------------- |
| `--quartz-nav-gap`, `--quartz-nav-nested-gap`                                                                     | `0.25rem 0.5rem`, `0.25rem 0.5rem`                        | Gaps in horizontal lists                                         |
| `--quartz-nav-indent`                                                                                             | `1rem`                                                    | Indentation of nested levels                                     |
| `--quartz-nav-item-padding-y`, `--quartz-nav-item-padding-x`, `--quartz-nav-radius`                               | `0.2rem`, `0.5rem`, `4px`                                 | Row padding and corner radius                                    |
| `--quartz-nav-row-height`                                                                                         | line height plus vertical padding                         | Height of the toggle button in split rows                        |
| `--quartz-nav-toggle-size`                                                                                        | `1.75rem`                                                 | Width of the toggle button in split rows                         |
| `--quartz-nav-chevron-open-rotate`                                                                                | `180deg`                                                  | Chevron rotation of an open folder (`90deg` for `chevron-right`) |
| `--quartz-nav-title-size`, `--quartz-nav-title-margin`                                                            | `1rem`, `0 0 0.5rem`                                      | The `title` heading                                              |
| `--quartz-nav-line-height`                                                                                        | `1.6`                                                     | Row line height                                                  |
| `--quartz-nav-transition`                                                                                         | `0.2s ease` (`0s` with reduced motion)                    | Every transition and animation                                   |
| `--quartz-nav-panel-min-width`, `--quartz-nav-panel-padding`, `--quartz-nav-panel-radius`, `--quartz-nav-panel-z` | `12rem`, `0.5rem`, `6px`, `20`                            | Dropdown, mega and flyout panels                                 |
| `--quartz-nav-mega-min-width`                                                                                     | `min(40rem, 90vw)`                                        | Width of mega panels                                             |
| `--quartz-nav-column-min-width`, `--quartz-nav-column-gap`                                                        | `10rem`, `1rem 1.5rem`                                    | Columns of `columns` and `mega`                                  |
| `--quartz-nav-offcanvas-width`, `--quartz-nav-offcanvas-padding`, `--quartz-nav-offcanvas-z`                      | `min(20rem, 85vw)`, `1rem`, `100`                         | Off-canvas panel                                                 |
| `--quartz-nav-font`, `--quartz-nav-heading-font`                                                                  | `var(--bodyFont)`, `var(--headerFont)`                    | Fonts                                                            |
| `--quartz-nav-color`, `--quartz-nav-color-hover`, `--quartz-nav-color-active`, `--quartz-nav-color-trail`         | `--darkgray`, `--secondary`, `--secondary`, `--secondary` | Link colors by state                                             |
| `--quartz-nav-color-static`, `--quartz-nav-color-heading`, `--quartz-nav-color-muted`                             | `--dark`, `--dark`, `--gray`                              | Folder titles without link, headings, chevrons and labels        |
| `--quartz-nav-bg-hover`, `--quartz-nav-bg-panel`                                                                  | `--highlight`, `--light`                                  | Hover background; background of popups and the off-canvas panel  |
| `--quartz-nav-border`, `--quartz-nav-focus`                                                                       | `--lightgray`, `--secondary`                              | Borders, guide lines and focus rings                             |
| `--quartz-nav-shadow`, `--quartz-nav-backdrop`                                                                    | soft shadow, `rgba(0,0,0,.35)` (darker in dark mode)      | Panel shadow and off-canvas backdrop                             |
| `--quartz-nav-weight-active`                                                                                      | `600`                                                     | Font weight of the active page                                   |
| `--quartz-nav-color-icon`, `--quartz-nav-bg-active`                                                               | `--gray`, `--highlight`                                   | Glyphs and icons; background of the current page                 |
| `--quartz-nav-icon-size`, `--quartz-nav-accent-bar`                                                               | `1.1em`, `3px`                                            | Icon size; accent bar on the current page in vertical variants   |
| `--quartz-nav-folder-font`                                                                                        | `var(--quartz-nav-heading-font)`                          | Font of folder titles                                            |
| `--quartz-nav-level-1-size` … `--quartz-nav-level-4-size`                                                         | `0.95rem`, `0.9rem`, `0.875rem`, `0.8rem`                 | Folder row size by level (level 4 and deeper share the last)     |
| `--quartz-nav-level-1-weight` … `--quartz-nav-level-4-weight`                                                     | `700`, `600`, `500`, `500`                                | Folder row weight by level                                       |
| `--quartz-nav-page-size`, `--quartz-nav-page-weight`                                                              | `0.875rem`, `400`                                         | Size cap and weight of page rows                                 |
| `--quartz-nav-bar-weight`                                                                                         | `500`                                                     | Weight of the top row of `bar`, `dropdown`, `mega`, `tabs`       |

Animations are deliberately small: chevrons rotate, hover colors fade, opening folders and panels
fade in, the off-canvas panel slides. Folders that render open (active trail, remembered state)
do not animate on page load. Set `--quartz-nav-transition: 0s` to switch everything off.

## Accessibility

- Every instance is a `<nav>` with an accessible name: `ariaLabel`, else the visible `title`,
  else "Main navigation" (the pager uses "Previous and next page"). Give each instance its own
  `ariaLabel` or `title` so landmarks stay distinguishable.
- Collapsible folders use `<details>`/`<summary>`. With `folderClick: toggle` the summary is the
  row and carries the title as text; with `link` the title is a separate link and the summary a
  pure toggle button named "Expand <title>". Nothing interactive is nested inside another control.
- The current page carries `aria-current="page"`; chevrons and icons are `aria-hidden`.
- Off-canvas: the toggle is a keyboard-reachable checkbox with `aria-expanded` and
  `aria-controls`; Escape closes the panel and returns focus to the toggle. Dropdown, mega and
  flyout panels close on Escape and hand focus back to their toggle.
- The `select` variant does not navigate while a keyboard user arrows through the options;
  Enter does. Pointer selection navigates immediately. `select.button: true` adds an explicit
  "Go" button for sites that want a confirmation step.
- `prefers-reduced-motion` disables all transitions and animations; focus rings use the theme's
  `--secondary` color.

## Working with other plugins

- **Explorer**: both can coexist. This plugin uses its own class names, so the explorer's styles
  never leak in.
- **Breadcrumbs**: unaffected; they read the same folder titles.
- **quartz-multilanguage**: with language folders (`de/…`, `en/…`) use `scope: section` for a
  per-language navigation, or one instance per language with `rootPath: de` / `rootPath: en`;
  `hideOutsideRoot` hides the wrong one.

A German version of this README is in [README.de.md](README.de.md).

## Development

```bash
npm install
npm run check   # typecheck + lint + format + tests
npm run build   # writes dist/ (committed, Quartz installs from it)
```

`dist/` is committed on purpose. After changing anything under `src/`, run `npm run build` and
commit the updated `dist/`.

## How this was built

A hobby project, a sibling of [quartz-layout-box](https://github.com/boxi-os/quartz-layout-box)
and [quartz-multilanguage](https://github.com/boxi-os/quartz-multilanguage).

One thing I want to be open about: the code was written mostly with
[Claude Code](https://claude.com/claude-code); the commits say so with a `Co-Authored-By` line. I
am aware that vibe coding is a contested subject, and I do not want to hide anything here.

## How well is the code checked?

`npm run check` runs the typecheck, the linter, the formatter and 85 tests; CI runs the same on
every push, builds the plugin and verifies that the committed `dist/` matches the build. That is not a guarantee, but it is something you can run yourself before
you trust the plugin.

## License

MIT. Bundled Lucide icons: ISC, © Lucide Contributors.
