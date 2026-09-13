# quartz-navigations

Navigations for [Quartz](https://quartz.jzhao.xyz) v5, built from the folder structure of your
content. One plugin, as many instances as you like: a horizontal menu in the header, an accordion
for the current section in the sidebar, a sitemap in the footer, previous/next links under the
article. Each instance picks its own levels, sorting, presentation and style.

- Tree from the content folders at build time, with folder titles from `index.md` or the folder
  name
- Levels and scope per instance: the whole site, one section, the current folder, only siblings
- Ten presentations: `vertical`, `horizontal`, `accordion`, `dropdown`, `flyout`, `tabs`, `mega`,
  `columns`, `select`, `pager`
- Mobile modes per instance: accordion, off-canvas panel with burger, jump menu, hidden
- Sorting: manual (order list in YAML, `navOrder` in frontmatter, numeric file prefixes),
  alphabetical or by date
- `active` on the current page, `active-trail` on every folder above it, `aria-current="page"`
- Style tiers `unstyled`, `basic` (layout only) and `full` (Quartz theme colors, dark mode)
- Works without JavaScript; the small client script adds remembered folder state, hover menus
  and the scroll lock
- Breakpoints are read from your site's `quartz/styles/variables.scss`, not hard-coded

## Installation

```bash
npx quartz plugin add github:boxi-os/quartz-navigations
```

Then add one entry per navigation to `quartz.config.yaml`. `layout` places the instance; the
plugin can be listed as often as you need.

```yaml
plugins:
  # Header: the first level, off-canvas panel on phones
  - source: github:boxi-os/quartz-navigations
    enabled: true
    options:
      variant: horizontal
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

  # Footer: a sitemap in columns, layout only
  - source: github:boxi-os/quartz-navigations
    enabled: true
    options:
      variant: columns
      depth: 2
      style: basic
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

| Key        | Effect                                                                             |
| ---------- | ---------------------------------------------------------------------------------- |
| `navOrder` | Number used by `sort: manual`. Lower first. On an `index.md` it orders the folder. |
| `navTitle` | Title shown in the navigation instead of `title`.                                  |
| `navHide`  | `true` hides the page; on an `index.md` it hides the whole folder.                 |
| `navIcon`  | Short text or emoji rendered before the title when `icons: true`.                  |

Hidden by default: the `tags` folder, `unlisted` pages, drafts and the 404 page.

## Options

| Option                 | Type                                                                                                                          | Default                                      | Description                                                                                                                                                           |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`              | `"vertical" \| "horizontal" \| "accordion" \| "dropdown" \| "flyout" \| "tabs" \| "mega" \| "columns" \| "select" \| "pager"` | `"vertical"`                                 | Presentation, see below.                                                                                                                                              |
| `mobile`               | `"same" \| "accordion" \| "offcanvas" \| "select" \| "hidden"`                                                                | `"same"`                                     | Presentation below the mobile breakpoint.                                                                                                                             |
| `style`                | `"unstyled" \| "basic" \| "full"`                                                                                             | `"full"`                                     | `unstyled`: markup and classes only. `basic`: layout, no colors. `full`: Quartz theme colors and dark mode.                                                           |
| `className`            | `string`                                                                                                                      | `""`                                         | Extra classes on the `<nav>`.                                                                                                                                         |
| `id`                   | `string`                                                                                                                      | hash of the options                          | Stable instance id for element ids and `localStorage`.                                                                                                                |
| `title`                | `string`                                                                                                                      | `""`                                         | Heading above the navigation.                                                                                                                                         |
| `ariaLabel`            | `string`                                                                                                                      | translated "Main navigation"                 | Accessible name of the `<nav>`.                                                                                                                                       |
| `chevrons`             | `boolean`                                                                                                                     | `true`                                       | Chevron icons on collapsible folders (`folderClick: toggle`; with `link` the chevron is the toggle and always shown).                                                 |
| `icons`                | `boolean`                                                                                                                     | `false`                                      | Render `navIcon` before titles.                                                                                                                                       |
| `rootPath`             | `string`                                                                                                                      | `""` (site root)                             | Folder the navigation starts at, e.g. `docs` or `de`.                                                                                                                 |
| `scope`                | `"root" \| "section" \| "parent" \| "current"`                                                                                | `"root"`                                     | `root`: children of `rootPath`. `section`: the top-level folder of the current page. `parent`: the folder containing the current page. `current`: the current folder. |
| `depth`                | `number`                                                                                                                      | `0` (unlimited)                              | Levels below the scope root.                                                                                                                                          |
| `hideOutsideRoot`      | `boolean`                                                                                                                     | `true`                                       | Render nothing on pages outside `rootPath`.                                                                                                                           |
| `showScopeRoot`        | `boolean`                                                                                                                     | `false`                                      | Linked heading with the scope root above the list.                                                                                                                    |
| `showHome`             | `boolean`                                                                                                                     | `false`                                      | First entry links to the index page of `rootPath`.                                                                                                                    |
| `indexEntry`           | `"none" \| "first"`                                                                                                           | `"none"`                                     | Add "Overview" (the folder page) as first child of every expanded folder.                                                                                             |
| `sort`                 | `"manual" \| "alphabetical" \| "date"`                                                                                        | `"manual"`                                   | `manual`: `order` list → `navOrder` → numeric prefix → title. Without any of these it is alphabetical.                                                                |
| `sortDirection`        | `"asc" \| "desc"`                                                                                                             | `"asc"`                                      | Missing values (no date, no order) always go last.                                                                                                                    |
| `foldersFirst`         | `"first" \| "last" \| "mixed"`                                                                                                | `"first"`                                    | Folders before pages, after them, or sorted together.                                                                                                                 |
| `dateField`            | `"created" \| "modified" \| "published"`                                                                                      | `"created"`                                  | Date used by `sort: date`.                                                                                                                                            |
| `order`                | `Record<string, string[]>`                                                                                                    | `{}`                                         | Child order per folder path: `{ "": [docs, blog], docs: [intro, setup] }`. Entries are slug segments or file names.                                                   |
| `stripNumericPrefix`   | `boolean`                                                                                                                     | `false`                                      | Remove `01-` / `01 ` prefixes from titles taken from file names.                                                                                                      |
| `frontmatterKeys`      | `{ order, title, hide, icon }`                                                                                                | `navOrder`, `navTitle`, `navHide`, `navIcon` | Frontmatter keys the plugin reads.                                                                                                                                    |
| `hideTags`             | `boolean`                                                                                                                     | `true`                                       | Hide the `tags` folder.                                                                                                                                               |
| `hideUnlisted`         | `boolean`                                                                                                                     | `true`                                       | Hide pages marked `unlisted`.                                                                                                                                         |
| `hideDrafts`           | `boolean`                                                                                                                     | `true`                                       | Hide pages with `draft: true`.                                                                                                                                        |
| `hideEmptyFolders`     | `boolean`                                                                                                                     | `true`                                       | Drop folders without visible children.                                                                                                                                |
| `keepIndexOnlyFolders` | `boolean`                                                                                                                     | `true`                                       | Keep folders whose only content is their index page.                                                                                                                  |
| `include`              | `string[]`                                                                                                                    | `[]` (all)                                   | Globs on slugs; `docs` keeps the subtree, `docs/**` everything below it.                                                                                              |
| `exclude`              | `string[]`                                                                                                                    | `[]`                                         | Globs on slugs to hide, e.g. `private/**`. Excluding a folder's index page removes the folder.                                                                        |
| `folderLink`           | `"index" \| "none" \| "first-child"`                                                                                          | `"index"`                                    | Where a folder title links to. `index` falls back to the first page when no folder page exists.                                                                       |
| `folderClick`          | `"link" \| "toggle"`                                                                                                          | `"link"`                                     | Collapsible folders: the title is a link (the chevron toggles) or toggles itself.                                                                                     |
| `folderDefaultState`   | `"collapsed" \| "open"`                                                                                                       | `"collapsed"`                                | Initial state of collapsible folders.                                                                                                                                 |
| `expandActive`         | `boolean`                                                                                                                     | `true`                                       | Open the folders on the path to the current page.                                                                                                                     |
| `exclusive`            | `boolean`                                                                                                                     | `false`                                      | Only one open folder per level (`<details name>`).                                                                                                                    |
| `persistState`         | `boolean`                                                                                                                     | `false`                                      | Remember open folders in `localStorage` (accordion only).                                                                                                             |
| `dropdownTrigger`      | `"click" \| "hover"`                                                                                                          | `"click"`                                    | How `dropdown`, `mega` and `flyout` panels open. Hover also opens on keyboard focus.                                                                                  |
| `breakpoints`          | `{ mobile, desktop }`                                                                                                         | from `quartz/styles/variables.scss`          | Override the site's breakpoints, e.g. `{ mobile: 640px }`.                                                                                                            |
| `tabs.secondary`       | `boolean`                                                                                                                     | `true`                                       | `tabs`: show the children of the active tab in a second row.                                                                                                          |
| `columns.max`          | `number`                                                                                                                      | `4`                                          | `columns`: reserved for a column limit; the layout currently uses an auto-fit grid.                                                                                   |
| `pager.labels`         | `boolean`                                                                                                                     | `true`                                       | `pager`: show "Previous" / "Next" above the titles.                                                                                                                   |
| `pager.order`          | `"tree" \| "siblings"`                                                                                                        | `"tree"`                                     | `pager`: walk the whole tree in reading order, or only the siblings of the current page.                                                                              |

Defaults live in the plugin code; Quartz passes the raw YAML options through.

### Variants

| Variant      | What you get                                                                                                |
| ------------ | ----------------------------------------------------------------------------------------------------------- |
| `vertical`   | Nested list, everything visible. Sidebars.                                                                  |
| `horizontal` | First level in a row; nested levels inline after the parent. Headers and footers with one or two levels.    |
| `accordion`  | Nested list with collapsible folders (`<details>`), active path open, optional persistence and `exclusive`. |
| `dropdown`   | Row of first-level entries; folders open a panel below. Click or hover.                                     |
| `flyout`     | Vertical list; folders open a panel to the right.                                                           |
| `mega`       | Like `dropdown`, but the panel shows the second level as columns with the third level below.                |
| `tabs`       | First level as a tab bar; the children of the active tab in a second row.                                   |
| `columns`    | First level as column headings with their children below. Footer sitemaps.                                  |
| `select`     | A `<select>` jump menu with folders as option groups. Navigates via Quartz's SPA router.                    |
| `pager`      | "Previous" / "Next" links in reading order of the tree. Put it in `afterBody`.                              |

`mobile` switches below the mobile breakpoint: `accordion` turns rows into a stacked list with
collapsible folders, `offcanvas` hides the list behind a burger button in a sliding panel,
`select` shows a jump menu instead of the list, `hidden` hides the instance.

### Markup and classes (for `style: unstyled`)

```
nav.quartz-nav.quartz-nav--<variant>.quartz-nav--mobile-<mode>[.quartz-nav--basic][.quartz-nav--full]
  h3.quartz-nav__title
  input.quartz-nav__toggle + label.quartz-nav__burger + label.quartz-nav__backdrop   (offcanvas)
  div.quartz-nav__panel
    div.quartz-nav__root > a.quartz-nav__root-link                                     (showScopeRoot)
    ul.quartz-nav__list[data-level]
      li.quartz-nav__item.quartz-nav__item--page|--folder[.active|.active-trail]
        a.quartz-nav__link[.active|.active-trail] > span.quartz-nav__text
        details.quartz-nav__folder > summary.quartz-nav__summary > a + span.quartz-nav__chevron
```

The current page carries `active` (on `<li>` and `<a>`) and `aria-current="page"`; every folder
above it carries `active-trail`. Folder items with children also get `quartz-nav__item--parent`.

## Styling with CSS variables

Both tiers read their values from `--quartz-nav-*` custom properties declared on the root
element, with defaults taken from Quartz's theme variables. Quartz emits component CSS inside
`@layer quartz-base`, so a site's unlayered `quartz/styles/custom.scss` overrides them without
any selector fights:

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

| Variable                                                                                                          | Default                                              | Used for                                                        |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | --------------------------------------------------------------- |
| `--quartz-nav-gap`, `--quartz-nav-nested-gap`                                                                     | `0.25rem 1rem`, `0.25rem 0.75rem`                    | Row gaps of horizontal lists                                    |
| `--quartz-nav-indent`                                                                                             | `1rem`                                               | Indentation of nested levels                                    |
| `--quartz-nav-item-padding`, `--quartz-nav-radius`                                                                | `0.15rem 0.35rem`, `4px`                             | Link padding and corner radius (`full`)                         |
| `--quartz-nav-toggle-size`                                                                                        | `1.5rem`                                             | Size of the folder toggle button                                |
| `--quartz-nav-title-size`, `--quartz-nav-title-margin`                                                            | `1rem`, `0 0 0.5rem`                                 | The `title` heading                                             |
| `--quartz-nav-line-height`                                                                                        | `1.6`                                                | Item line height (`full`)                                       |
| `--quartz-nav-transition`                                                                                         | `0.2s ease` (`0s` with reduced motion)               | All transitions                                                 |
| `--quartz-nav-panel-min-width`, `--quartz-nav-panel-padding`, `--quartz-nav-panel-radius`, `--quartz-nav-panel-z` | `12rem`, `0.5rem 0.75rem`, `6px`, `20`               | Dropdown, mega and flyout panels                                |
| `--quartz-nav-mega-min-width`                                                                                     | `min(40rem, 90vw)`                                   | Width of mega panels                                            |
| `--quartz-nav-column-min-width`, `--quartz-nav-column-gap`                                                        | `10rem`, `1rem 1.5rem`                               | Columns of `columns` and `mega`                                 |
| `--quartz-nav-offcanvas-width`, `--quartz-nav-offcanvas-padding`, `--quartz-nav-offcanvas-z`                      | `min(20rem, 85vw)`, `1rem`, `100`                    | Off-canvas panel                                                |
| `--quartz-nav-font`, `--quartz-nav-heading-font`                                                                  | `var(--bodyFont)`, `var(--headerFont)`               | Fonts (`full`)                                                  |
| `--quartz-nav-color`, `--quartz-nav-color-hover`, `--quartz-nav-color-active`, `--quartz-nav-color-trail`         | `--darkgray`, `--secondary`, `--secondary`, `--dark` | Link colors by state (`full`)                                   |
| `--quartz-nav-color-static`, `--quartz-nav-color-heading`, `--quartz-nav-color-muted`                             | `--dark`, `--dark`, `--gray`                         | Folder titles without link, headings, chevrons and labels       |
| `--quartz-nav-bg-hover`, `--quartz-nav-bg-panel`                                                                  | `--highlight`, `--light`                             | Hover background; background of popups and the off-canvas panel |
| `--quartz-nav-border`, `--quartz-nav-focus`                                                                       | `--lightgray`, `--secondary`                         | Borders and focus rings                                         |
| `--quartz-nav-shadow`, `--quartz-nav-backdrop`                                                                    | soft shadow, `rgba(0,0,0,.35)` (darker in dark mode) | Panel shadow and off-canvas backdrop                            |
| `--quartz-nav-weight-active`, `--quartz-nav-weight-parent`                                                        | `600`, `600`                                         | Font weight of the active page and of folder titles             |

## Accessibility

- Every instance is a `<nav>` with an accessible name: `ariaLabel`, else the visible `title`,
  else "Main navigation" (the pager uses "Previous and next page"). Give each instance its own
  `ariaLabel` or `title` so landmarks stay distinguishable.
- Collapsible folders use `<details>`/`<summary>`. With `folderClick: link` the folder title is
  a separate link and the summary is a pure toggle button named "Expand <title>"; nothing
  interactive is nested inside another control.
- The current page carries `aria-current="page"`; chevrons and icons are `aria-hidden`.
- Off-canvas: the toggle is a keyboard-reachable checkbox with `aria-expanded` and
  `aria-controls`; Escape closes the panel and returns focus to the toggle. Dropdown, mega and
  flyout panels close on Escape and hand focus back to their toggle.
- The `select` variant does not navigate while a keyboard user arrows through the options;
  Enter or the "Go" button does. Pointer selection navigates immediately.
- `prefers-reduced-motion` disables the transitions; focus rings use the theme's `--secondary`
  color in the `full` tier and the browser default otherwise.

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

`npm run check` runs the typecheck, the linter, the formatter, 65 tests and the build; CI does
the same on every push. That is not a guarantee, but it is something you can run yourself before
you trust the plugin.

## License

MIT
