# quartz-navigations

Navigationen für [Quartz](https://quartz.jzhao.xyz) v5, aufgebaut aus der Ordnerstruktur des
Contents. Ein Plugin, beliebig viele Instanzen: ein horizontales Menü im Header, ein Akkordeon
für den aktuellen Bereich in der Sidebar, eine Sitemap im Footer, Zurück/Weiter unter dem Artikel.
Jede Instanz wählt eigene Ebenen, Sortierung, Darstellung und Stil.

- Baum aus den Content-Ordnern zur Build-Zeit, Ordnertitel aus `index.md` oder dem Ordnernamen
- Ebenen und Umfang je Instanz: ganze Site, ein Bereich, der aktuelle Ordner, nur Geschwister
- Zehn Darstellungen: `vertical`, `horizontal`, `accordion`, `dropdown`, `flyout`, `tabs`,
  `mega`, `columns`, `select`, `pager`
- Mobile-Modi je Instanz: Akkordeon, Off-Canvas-Panel mit Burger, Sprungmenü, ausgeblendet
- Sortierung: manuell (Reihenfolge-Liste in YAML, `navOrder` im Frontmatter, Nummernpräfixe in
  Dateinamen), alphabetisch oder nach Datum
- `active` auf der aktuellen Seite, `active-trail` auf jedem Ordner darüber, `aria-current="page"`
- Stilstufen `unstyled`, `basic` (nur Layout) und `full` (Quartz-Themefarben, Dark Mode)
- Funktioniert ohne JavaScript; das kleine Client-Script ergänzt gemerkten Ordnerzustand,
  Hover-Menüs und die Scroll-Sperre
- Breakpoints kommen aus `quartz/styles/variables.scss` der Site, nicht fest verdrahtet

## Installation

```bash
npx quartz plugin add github:boxi-os/quartz-navigations
```

Danach je Navigation einen Eintrag in `quartz.config.yaml` anlegen. `layout` platziert die
Instanz; das Plugin kann beliebig oft aufgeführt werden.

```yaml
plugins:
  # Header: die erste Ebene, auf dem Handy als Off-Canvas-Panel
  - source: github:boxi-os/quartz-navigations
    enabled: true
    options:
      variant: horizontal
      depth: 1
      mobile: offcanvas
    layout:
      position: header
      priority: 20

  # Sidebar: der Bereich, zu dem die aktuelle Seite gehört, als Akkordeon
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

  # Unter dem Artikel: Zurück / Weiter
  - source: github:boxi-os/quartz-navigations
    enabled: true
    options:
      variant: pager
    layout:
      position: afterBody
      priority: 10

  # Footer: eine Sitemap in Spalten, nur Layout
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

## Wie der Baum entsteht

Jede Seite wird ein Knoten; jeder Ordner wird ein Knoten, dessen Link die Ordnerseite ist
(`docs/index`). Quartz’ Folder-Page-Plugin erzeugt diese Seite, wenn es keine `index.md` gibt,
Ordner sind also immer verlinkbar. Titel kommen in dieser Reihenfolge aus: dem Frontmatter-Feld
`navTitle`, dem Seitentitel, dem echten Verzeichnis- oder Dateinamen, dem Slug-Segment.

Seiten steuern sich selbst über Frontmatter (Schlüssel konfigurierbar über `frontmatterKeys`):

| Schlüssel  | Wirkung                                                                               |
| ---------- | ------------------------------------------------------------------------------------- |
| `navOrder` | Zahl für `sort: manual`. Kleiner zuerst. In einer `index.md` sortiert sie den Ordner. |
| `navTitle` | Titel in der Navigation statt `title`.                                                |
| `navHide`  | `true` blendet die Seite aus; in einer `index.md` den ganzen Ordner.                  |
| `navIcon`  | Kurzer Text oder Emoji vor dem Titel, wenn `icons: true`.                             |

Standardmäßig ausgeblendet: der Ordner `tags`, `unlisted`-Seiten, Entwürfe und die 404-Seite.

## Optionen

| Option                 | Typ                                                                                                                           | Standard                                     | Beschreibung                                                                                                                                                              |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`              | `"vertical" \| "horizontal" \| "accordion" \| "dropdown" \| "flyout" \| "tabs" \| "mega" \| "columns" \| "select" \| "pager"` | `"vertical"`                                 | Darstellung, siehe unten.                                                                                                                                                 |
| `mobile`               | `"same" \| "accordion" \| "offcanvas" \| "select" \| "hidden"`                                                                | `"same"`                                     | Darstellung unterhalb des Mobile-Breakpoints.                                                                                                                             |
| `style`                | `"unstyled" \| "basic" \| "full"`                                                                                             | `"full"`                                     | `unstyled`: nur Markup und Klassen. `basic`: Layout ohne Farben. `full`: Quartz-Themefarben und Dark Mode.                                                                |
| `className`            | `string`                                                                                                                      | `""`                                         | Zusätzliche Klassen am `<nav>`.                                                                                                                                           |
| `id`                   | `string`                                                                                                                      | Hash der Optionen                            | Stabile Instanz-ID für Element-IDs und `localStorage`.                                                                                                                    |
| `title`                | `string`                                                                                                                      | `""`                                         | Überschrift über der Navigation.                                                                                                                                          |
| `ariaLabel`            | `string`                                                                                                                      | übersetzt „Hauptnavigation“                  | Zugänglicher Name des `<nav>`.                                                                                                                                            |
| `chevrons`             | `boolean`                                                                                                                     | `true`                                       | Pfeilsymbole an aufklappbaren Ordnern (`folderClick: toggle`; bei `link` ist der Pfeil der Schalter und immer sichtbar).                                                  |
| `icons`                | `boolean`                                                                                                                     | `false`                                      | `navIcon` vor den Titeln rendern.                                                                                                                                         |
| `rootPath`             | `string`                                                                                                                      | `""` (Site-Wurzel)                           | Ordner, an dem die Navigation beginnt, z. B. `docs` oder `de`.                                                                                                            |
| `scope`                | `"root" \| "section" \| "parent" \| "current"`                                                                                | `"root"`                                     | `root`: Kinder von `rootPath`. `section`: der Top-Level-Ordner der aktuellen Seite. `parent`: der Ordner, der die aktuelle Seite enthält. `current`: der aktuelle Ordner. |
| `depth`                | `number`                                                                                                                      | `0` (unbegrenzt)                             | Ebenen unterhalb der Scope-Wurzel.                                                                                                                                        |
| `hideOutsideRoot`      | `boolean`                                                                                                                     | `true`                                       | Auf Seiten außerhalb von `rootPath` nichts rendern.                                                                                                                       |
| `showScopeRoot`        | `boolean`                                                                                                                     | `false`                                      | Verlinkte Kopfzeile mit der Scope-Wurzel über der Liste.                                                                                                                  |
| `showHome`             | `boolean`                                                                                                                     | `false`                                      | Erster Eintrag verlinkt auf die Indexseite von `rootPath`.                                                                                                                |
| `indexEntry`           | `"none" \| "first"`                                                                                                           | `"none"`                                     | „Übersicht“ (die Ordnerseite) als erstes Kind jedes ausgeklappten Ordners.                                                                                                |
| `sort`                 | `"manual" \| "alphabetical" \| "date"`                                                                                        | `"manual"`                                   | `manual`: `order`-Liste → `navOrder` → Nummernpräfix → Titel. Ohne diese Angaben alphabetisch.                                                                            |
| `sortDirection`        | `"asc" \| "desc"`                                                                                                             | `"asc"`                                      | Fehlende Werte (kein Datum, keine Reihenfolge) stehen immer am Ende.                                                                                                      |
| `foldersFirst`         | `"first" \| "last" \| "mixed"`                                                                                                | `"first"`                                    | Ordner vor den Seiten, danach oder gemeinsam sortiert.                                                                                                                    |
| `dateField`            | `"created" \| "modified" \| "published"`                                                                                      | `"created"`                                  | Datum für `sort: date`.                                                                                                                                                   |
| `order`                | `Record<string, string[]>`                                                                                                    | `{}`                                         | Reihenfolge der Kinder je Ordnerpfad: `{ "": [docs, blog], docs: [intro, setup] }`. Einträge sind Slug-Segmente oder Dateinamen.                                          |
| `stripNumericPrefix`   | `boolean`                                                                                                                     | `false`                                      | Präfixe wie `01-` / `01 ` aus Titeln entfernen, die aus Dateinamen stammen.                                                                                               |
| `frontmatterKeys`      | `{ order, title, hide, icon }`                                                                                                | `navOrder`, `navTitle`, `navHide`, `navIcon` | Frontmatter-Schlüssel, die das Plugin liest.                                                                                                                              |
| `hideTags`             | `boolean`                                                                                                                     | `true`                                       | Ordner `tags` ausblenden.                                                                                                                                                 |
| `hideUnlisted`         | `boolean`                                                                                                                     | `true`                                       | Als `unlisted` markierte Seiten ausblenden.                                                                                                                               |
| `hideDrafts`           | `boolean`                                                                                                                     | `true`                                       | Seiten mit `draft: true` ausblenden.                                                                                                                                      |
| `hideEmptyFolders`     | `boolean`                                                                                                                     | `true`                                       | Ordner ohne sichtbare Kinder entfernen.                                                                                                                                   |
| `keepIndexOnlyFolders` | `boolean`                                                                                                                     | `true`                                       | Ordner behalten, deren einziger Inhalt die Indexseite ist.                                                                                                                |
| `include`              | `string[]`                                                                                                                    | `[]` (alles)                                 | Globs auf Slugs; `docs` behält den Teilbaum, `docs/**` alles darunter.                                                                                                    |
| `exclude`              | `string[]`                                                                                                                    | `[]`                                         | Globs auf Slugs zum Ausblenden, z. B. `private/**`. Wer die Indexseite eines Ordners ausschließt, entfernt den Ordner.                                                    |
| `folderLink`           | `"index" \| "none" \| "first-child"`                                                                                          | `"index"`                                    | Wohin ein Ordnertitel verlinkt. `index` fällt auf die erste Seite zurück, wenn keine Ordnerseite existiert.                                                               |
| `folderClick`          | `"link" \| "toggle"`                                                                                                          | `"link"`                                     | Aufklappbare Ordner: Titel ist ein Link (der Pfeil klappt) oder klappt selbst.                                                                                            |
| `folderDefaultState`   | `"collapsed" \| "open"`                                                                                                       | `"collapsed"`                                | Anfangszustand aufklappbarer Ordner.                                                                                                                                      |
| `expandActive`         | `boolean`                                                                                                                     | `true`                                       | Ordner auf dem Pfad zur aktuellen Seite öffnen.                                                                                                                           |
| `exclusive`            | `boolean`                                                                                                                     | `false`                                      | Nur ein offener Ordner je Ebene (`<details name>`).                                                                                                                       |
| `persistState`         | `boolean`                                                                                                                     | `false`                                      | Offene Ordner in `localStorage` merken (nur Akkordeon).                                                                                                                   |
| `dropdownTrigger`      | `"click" \| "hover"`                                                                                                          | `"click"`                                    | Wie sich `dropdown`, `mega` und `flyout` öffnen. Hover öffnet auch bei Tastaturfokus.                                                                                     |
| `breakpoints`          | `{ mobile, desktop }`                                                                                                         | aus `quartz/styles/variables.scss`           | Breakpoints der Site überschreiben, z. B. `{ mobile: 640px }`.                                                                                                            |
| `tabs.secondary`       | `boolean`                                                                                                                     | `true`                                       | `tabs`: Kinder des aktiven Tabs in einer zweiten Zeile.                                                                                                                   |
| `columns.max`          | `number`                                                                                                                      | `4`                                          | `columns`: reserviert für eine Spaltenbegrenzung; das Layout nutzt derzeit ein Auto-Fit-Raster.                                                                           |
| `pager.labels`         | `boolean`                                                                                                                     | `true`                                       | `pager`: „Zurück“ / „Weiter“ über den Titeln anzeigen.                                                                                                                    |
| `pager.order`          | `"tree" \| "siblings"`                                                                                                        | `"tree"`                                     | `pager`: den ganzen Baum in Lesereihenfolge durchlaufen oder nur die Geschwister der aktuellen Seite.                                                                     |

Die Standardwerte stehen im Plugin-Code; Quartz reicht die YAML-Optionen unverändert durch.

### Varianten

| Variante     | Ergebnis                                                                                                               |
| ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `vertical`   | Verschachtelte Liste, alles sichtbar. Für Sidebars.                                                                    |
| `horizontal` | Erste Ebene in einer Zeile; tiefere Ebenen inline hinter dem Elternelement. Header und Footer mit ein, zwei Ebenen.    |
| `accordion`  | Verschachtelte Liste mit aufklappbaren Ordnern (`<details>`), aktiver Pfad offen, optional Persistenz und `exclusive`. |
| `dropdown`   | Zeile mit Einträgen der ersten Ebene; Ordner öffnen ein Panel darunter. Klick oder Hover.                              |
| `flyout`     | Vertikale Liste; Ordner öffnen ein Panel rechts daneben.                                                               |
| `mega`       | Wie `dropdown`, aber das Panel zeigt die zweite Ebene als Spalten mit der dritten Ebene darunter.                      |
| `tabs`       | Erste Ebene als Tab-Leiste; die Kinder des aktiven Tabs in einer zweiten Zeile.                                        |
| `columns`    | Erste Ebene als Spaltenüberschriften mit ihren Kindern darunter. Footer-Sitemaps.                                      |
| `select`     | Ein `<select>`-Sprungmenü mit Ordnern als Optionsgruppen. Navigiert über Quartz’ SPA-Router.                           |
| `pager`      | „Zurück“ / „Weiter“ in Lesereihenfolge des Baums. Gehört nach `afterBody`.                                             |

`mobile` schaltet unterhalb des Mobile-Breakpoints um: `accordion` macht aus Zeilen eine gestapelte
Liste mit aufklappbaren Ordnern, `offcanvas` verbirgt die Liste hinter einem Burger-Button in einem
einfahrenden Panel, `select` zeigt ein Sprungmenü statt der Liste, `hidden` blendet die Instanz aus.

### Markup und Klassen (für `style: unstyled`)

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

Die aktuelle Seite trägt `active` (auf `<li>` und `<a>`) und `aria-current="page"`; jeder Ordner
darüber trägt `active-trail`. Ordner mit Kindern bekommen zusätzlich `quartz-nav__item--parent`.

## Styling über CSS-Variablen

Beide Stilstufen lesen ihre Werte aus `--quartz-nav-*`-Custom-Properties am Wurzelelement, die
Standardwerte kommen aus den Quartz-Themevariablen. Quartz legt Komponenten-CSS in
`@layer quartz-base` ab, deshalb überschreibt die ungeschichtete `quartz/styles/custom.scss`
der Site sie ohne Selektor-Gefechte:

```scss
.quartz-nav {
  --quartz-nav-indent: 1.5rem;
  --quartz-nav-color-active: var(--tertiary);
}

// Nur eine Instanz (der Wert von `id`, alternativ `className`)
.quartz-nav[data-quartz-nav="side"] {
  --quartz-nav-bg-hover: transparent;
}
```

| Variable                                                                                                          | Standard                                                   | Wirkung                                                         |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------- |
| `--quartz-nav-gap`, `--quartz-nav-nested-gap`                                                                     | `0.25rem 1rem`, `0.25rem 0.75rem`                          | Abstände in horizontalen Listen                                 |
| `--quartz-nav-indent`                                                                                             | `1rem`                                                     | Einrückung verschachtelter Ebenen                               |
| `--quartz-nav-item-padding`, `--quartz-nav-radius`                                                                | `0.15rem 0.35rem`, `4px`                                   | Innenabstand und Eckenradius der Links (`full`)                 |
| `--quartz-nav-toggle-size`                                                                                        | `1.5rem`                                                   | Größe des Aufklapp-Buttons                                      |
| `--quartz-nav-title-size`, `--quartz-nav-title-margin`                                                            | `1rem`, `0 0 0.5rem`                                       | Die Überschrift `title`                                         |
| `--quartz-nav-line-height`                                                                                        | `1.6`                                                      | Zeilenhöhe der Einträge (`full`)                                |
| `--quartz-nav-transition`                                                                                         | `0.2s ease` (`0s` bei reduzierter Bewegung)                | Alle Übergänge                                                  |
| `--quartz-nav-panel-min-width`, `--quartz-nav-panel-padding`, `--quartz-nav-panel-radius`, `--quartz-nav-panel-z` | `12rem`, `0.5rem 0.75rem`, `6px`, `20`                     | Dropdown-, Mega- und Flyout-Panels                              |
| `--quartz-nav-mega-min-width`                                                                                     | `min(40rem, 90vw)`                                         | Breite der Mega-Panels                                          |
| `--quartz-nav-column-min-width`, `--quartz-nav-column-gap`                                                        | `10rem`, `1rem 1.5rem`                                     | Spalten bei `columns` und `mega`                                |
| `--quartz-nav-offcanvas-width`, `--quartz-nav-offcanvas-padding`, `--quartz-nav-offcanvas-z`                      | `min(20rem, 85vw)`, `1rem`, `100`                          | Off-Canvas-Panel                                                |
| `--quartz-nav-font`, `--quartz-nav-heading-font`                                                                  | `var(--bodyFont)`, `var(--headerFont)`                     | Schriften (`full`)                                              |
| `--quartz-nav-color`, `--quartz-nav-color-hover`, `--quartz-nav-color-active`, `--quartz-nav-color-trail`         | `--darkgray`, `--secondary`, `--secondary`, `--dark`       | Linkfarben je Zustand (`full`)                                  |
| `--quartz-nav-color-static`, `--quartz-nav-color-heading`, `--quartz-nav-color-muted`                             | `--dark`, `--dark`, `--gray`                               | Ordnertitel ohne Link, Überschriften, Pfeile und Beschriftungen |
| `--quartz-nav-bg-hover`, `--quartz-nav-bg-panel`                                                                  | `--highlight`, `--light`                                   | Hover-Hintergrund; Hintergrund von Panels und Off-Canvas        |
| `--quartz-nav-border`, `--quartz-nav-focus`                                                                       | `--lightgray`, `--secondary`                               | Rahmen und Fokusringe                                           |
| `--quartz-nav-shadow`, `--quartz-nav-backdrop`                                                                    | weicher Schatten, `rgba(0,0,0,.35)` (dunkler im Dark Mode) | Panel-Schatten und Off-Canvas-Hintergrund                       |
| `--quartz-nav-weight-active`, `--quartz-nav-weight-parent`                                                        | `600`, `600`                                               | Schriftstärke der aktiven Seite und der Ordnertitel             |

## Barrierearmut

- Jede Instanz ist ein `<nav>` mit zugänglichem Namen: `ariaLabel`, sonst der sichtbare
  `title`, sonst „Hauptnavigation“ (der Pager: „Vorherige und nächste Seite“). Gib jeder Instanz
  ein eigenes `ariaLabel` oder `title`, damit die Landmarks unterscheidbar bleiben.
- Aufklappbare Ordner nutzen `<details>`/`<summary>`. Mit `folderClick: link` ist der Ordnertitel
  ein eigener Link und die Summary ein reiner Aufklapp-Button mit dem Namen „<Titel> aufklappen“;
  es steckt nichts Interaktives in einem anderen Bedienelement.
- Die aktuelle Seite trägt `aria-current="page"`; Pfeile und Icons sind `aria-hidden`.
- Off-Canvas: Der Schalter ist eine per Tastatur erreichbare Checkbox mit `aria-expanded` und
  `aria-controls`; Escape schließt das Panel und gibt den Fokus an den Schalter zurück. Dropdown-,
  Mega- und Flyout-Panels schließen mit Escape und geben den Fokus an ihren Button zurück.
- Die Variante `select` navigiert nicht, während jemand per Pfeiltasten durch die Optionen geht;
  Enter oder der Button „Los“ tun es. Eine Auswahl per Maus navigiert sofort.
- `prefers-reduced-motion` schaltet die Übergänge ab; Fokusringe nutzen in der Stufe `full` die
  Themefarbe `--secondary`, sonst die Browser-Voreinstellung.

## Zusammenspiel mit anderen Plugins

- **Explorer**: beide können nebeneinander laufen. Dieses Plugin nutzt eigene Klassennamen, die
  Explorer-Styles greifen also nicht.
- **Breadcrumbs**: unberührt; sie lesen dieselben Ordnertitel.
- **quartz-multilanguage**: bei Sprachordnern (`de/…`, `en/…`) `scope: section` für eine
  Navigation je Sprache verwenden, oder eine Instanz je Sprache mit `rootPath: de` / `rootPath: en`;
  `hideOutsideRoot` blendet die jeweils falsche aus.

Die englische Fassung dieser README ist [README.md](README.md).

## Entwicklung

```bash
npm install
npm run check   # Typecheck + Lint + Format + Tests
npm run build   # schreibt dist/ (wird committet, Quartz installiert daraus)
```

`dist/` ist absichtlich committet. Nach jeder Änderung unter `src/` `npm run build` ausführen und
das aktualisierte `dist/` mit committen.

## Wie das hier entstanden ist

Ein Hobbyprojekt, ein Geschwister von [quartz-layout-box](https://github.com/boxi-os/quartz-layout-box)
und [quartz-multilanguage](https://github.com/boxi-os/quartz-multilanguage).

Eines möchte ich offen sagen: Der Code ist zum größten Teil mit
[Claude Code](https://claude.com/claude-code) entstanden; die Commits sagen das mit einer
`Co-Authored-By`-Zeile. Mir ist bewusst, dass Vibe Coding umstritten ist, und ich will hier nichts
verstecken.

## Wie gut ist der Code geprüft?

`npm run check` führt Typecheck, Linter, Formatter, 65 Tests und den Build aus; die CI macht bei
jedem Push dasselbe. Das ist keine Garantie, aber etwas, das du selbst ausführen kannst, bevor du
dem Plugin vertraust.

## Lizenz

MIT
