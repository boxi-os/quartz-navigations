# quartz-navigations

Navigationen für [Quartz](https://quartz.jzhao.xyz) v5, aufgebaut aus der Ordnerstruktur des
Contents. Ein Plugin, beliebig viele Instanzen: eine Menüleiste im Header, ein Akkordeon für den
aktuellen Bereich in der Sidebar, eine Sitemap im Footer, Zurück/Weiter unter dem Artikel. Jede
Instanz wählt eigene Ebenen, Sortierung und Darstellung.

- Baum aus den Content-Ordnern zur Build-Zeit, Ordnertitel aus `index.md` oder dem Ordnernamen
- Ebenen und Umfang je Instanz: ganze Site, ein Bereich, der aktuelle Ordner, nur Geschwister
- Zehn Darstellungen: `tree`, `bar`, `accordion`, `dropdown`, `flyout`, `tabs`, `mega`,
  `columns`, `select`, `pager`; jede bringt ihre Ausrichtung mit
- Mobile-Modi je Instanz: Akkordeon, Off-Canvas-Panel mit Burger, Sprungmenü, ausgeblendet
- Sortierung: manuell (Reihenfolge-Liste in YAML, `navOrder` im Frontmatter, Nummernpräfixe in
  Dateinamen), alphabetisch oder nach Datum
- `active` auf der aktuellen Seite, `active-trail` auf jedem Ordner darüber, `aria-current="page"`
- Ganze Zeilen sind Klickflächen: eine Ordnerzeile klappt den Ordner auf, oder sie ist ein Link
  mit Aufklapp-Button am Ende; Untermenüs öffnen per Klick oder Hover
- Folgt dem Quartz-Theme (Farben, Schriften, Dark Mode); jeder Wert ist eine
  `--quartz-nav-*`-CSS-Variable, die sich in `custom.scss` überschreiben lässt
- Dezente Animationen beim Öffnen von Ordnern, Panels und Off-Canvas-Menü, aus bei
  `prefers-reduced-motion`
- Ordner- und Datei-Glyphen an jeder Zeile wie in einem Datei-Explorer, Schriftgröße und
  -stärke nach Ebene gestaffelt; eigene Icons je Seite über `navIcon: lucide:book-open` oder
  `nodeIcons` in der Konfiguration; Pfeile, Burger und Pager-Pfeile sind ebenfalls
  [Lucide](https://lucide.dev)-Icons
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
  # Header: die erste Ebene als Menüleiste, auf dem Handy als Off-Canvas-Panel
  - source: github:boxi-os/quartz-navigations
    enabled: true
    options:
      variant: bar
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

  # Footer: eine Sitemap in Spalten
  - source: github:boxi-os/quartz-navigations
    enabled: true
    options:
      variant: columns
      depth: 2
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
| `navIcon`  | Icon vor dem Titel: `lucide:<name>`, kurzer Text, Emoji oder `none` (siehe Icons).    |

Standardmäßig ausgeblendet: der Ordner `tags`, `unlisted`-Seiten, Entwürfe und die 404-Seite.

## Optionen

| Option                 | Typ                                                                                                                | Standard                                                                                               | Beschreibung                                                                                                                                                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`              | `"tree" \| "bar" \| "accordion" \| "dropdown" \| "flyout" \| "tabs" \| "mega" \| "columns" \| "select" \| "pager"` | `"tree"`                                                                                               | Darstellung, siehe unten. Jede Variante bringt ihre Ausrichtung mit.                                                                                                                                                        |
| `mobile`               | `"same" \| "accordion" \| "offcanvas" \| "select" \| "hidden"`                                                     | `"same"`                                                                                               | Darstellung unterhalb des Mobile-Breakpoints.                                                                                                                                                                               |
| `align`                | `"left" \| "center" \| "right" \| "full"`                                                                          | `"left"`                                                                                               | Ausrichtung der obersten Zeile von `bar`, `dropdown`, `mega` und `tabs`; `full` verteilt die Einträge über die ganze Breite. Andere Varianten ignorieren die Option.                                                        |
| `className`            | `string`                                                                                                           | `""`                                                                                                   | Zusätzliche Klassen am `<nav>`.                                                                                                                                                                                             |
| `id`                   | `string`                                                                                                           | Hash der Optionen                                                                                      | Stabile Instanz-ID für Element-IDs und `localStorage`. Setzen, wenn ein Layout dieselben Optionen zweimal verwendet, sonst teilen sich beide Instanzen ihre Element-IDs.                                                    |
| `title`                | `string`                                                                                                           | `""`                                                                                                   | Überschrift über der Navigation.                                                                                                                                                                                            |
| `ariaLabel`            | `string`                                                                                                           | übersetzt „Hauptnavigation“                                                                            | Zugänglicher Name des `<nav>`.                                                                                                                                                                                              |
| `chevrons`             | `boolean`                                                                                                          | `true`                                                                                                 | Pfeile an aufklappbaren Ordnern. Bei `folderClick: link` ist der Pfeil der Aufklapp-Button und immer sichtbar.                                                                                                              |
| `icons`                | `"none" \| "type" \| "custom" \| "both"`                                                                           | `"both"`                                                                                               | `type`: Ordner- und Datei-Glyphen. `custom`: `navIcon` / `nodeIcons`. `both`: eigenes Icon wo gesetzt, sonst Glyphe. `true` / `false` bedeuten `both` / `none`.                                                             |
| `iconNames`            | `{ folder, folderOpen, file, home, chevron, menu, close, previous, next }`                                         | `folder`, `folder-open`, `file`, `house`, `chevron-down`, `menu`, `x`, `chevron-left`, `chevron-right` | Lucide-Icons für die eigenen Symbole des Plugins.                                                                                                                                                                           |
| `nodeIcons`            | `Record<string, string>`                                                                                           | `{}`                                                                                                   | Icons je Pfad, z. B. `{ docs: "lucide:book-open", "docs/api": "🧩" }`; gleiche Syntax wie `navIcon`. Frontmatter gewinnt.                                                                                                   |
| `rootPath`             | `string`                                                                                                           | `""` (Site-Wurzel)                                                                                     | Ordner, an dem die Navigation beginnt, z. B. `docs` oder `de`.                                                                                                                                                              |
| `scope`                | `"root" \| "section" \| "parent" \| "current"`                                                                     | `"root"`                                                                                               | `root`: Kinder von `rootPath`. `section`: der Top-Level-Ordner der aktuellen Seite. `parent`: der Ordner, der die aktuelle Seite enthält (auf der Indexseite von `rootPath` dieser selbst). `current`: der aktuelle Ordner. |
| `depth`                | `number`                                                                                                           | `0` (unbegrenzt)                                                                                       | Ebenen unterhalb der Scope-Wurzel.                                                                                                                                                                                          |
| `hideOutsideRoot`      | `boolean`                                                                                                          | `true`                                                                                                 | Auf Seiten außerhalb von `rootPath` nichts rendern.                                                                                                                                                                         |
| `showScopeRoot`        | `boolean`                                                                                                          | `false`                                                                                                | Verlinkte Kopfzeile mit der Scope-Wurzel über der Liste.                                                                                                                                                                    |
| `showHome`             | `boolean`                                                                                                          | `false`                                                                                                | Erster Eintrag verlinkt auf die Indexseite von `rootPath`.                                                                                                                                                                  |
| `indexEntry`           | `"none" \| "first"`                                                                                                | `"none"`                                                                                               | „Übersicht“ (die Ordnerseite) als erstes Kind jedes ausgeklappten Ordners.                                                                                                                                                  |
| `sort`                 | `"manual" \| "alphabetical" \| "date"`                                                                             | `"manual"`                                                                                             | `manual`: `order`-Liste → `navOrder` → Nummernpräfix → Titel. Ohne diese Angaben alphabetisch.                                                                                                                              |
| `sortDirection`        | `"asc" \| "desc"`                                                                                                  | `"asc"`                                                                                                | Fehlende Werte (kein Datum, keine Reihenfolge) stehen immer am Ende.                                                                                                                                                        |
| `foldersFirst`         | `"first" \| "last" \| "mixed"`                                                                                     | `"first"`                                                                                              | Ordner vor den Seiten, danach oder gemeinsam sortiert.                                                                                                                                                                      |
| `dateField`            | `"created" \| "modified" \| "published"`                                                                           | `"created"`                                                                                            | Datum für `sort: date`.                                                                                                                                                                                                     |
| `order`                | `Record<string, string[]>`                                                                                         | `{}`                                                                                                   | Reihenfolge der Kinder je Ordnerpfad: `{ "": [docs, blog], docs: [intro, setup] }`. Einträge sind Slug-Segmente oder Dateinamen.                                                                                            |
| `stripNumericPrefix`   | `boolean`                                                                                                          | `false`                                                                                                | Präfixe wie `01-` / `01 ` aus Titeln entfernen, die aus Dateinamen stammen.                                                                                                                                                 |
| `frontmatterKeys`      | `{ order, title, hide, icon }`                                                                                     | `navOrder`, `navTitle`, `navHide`, `navIcon`                                                           | Frontmatter-Schlüssel, die das Plugin liest.                                                                                                                                                                                |
| `hideTags`             | `boolean`                                                                                                          | `true`                                                                                                 | Ordner `tags` ausblenden.                                                                                                                                                                                                   |
| `hideUnlisted`         | `boolean`                                                                                                          | `true`                                                                                                 | Als `unlisted` markierte Seiten ausblenden.                                                                                                                                                                                 |
| `hideDrafts`           | `boolean`                                                                                                          | `true`                                                                                                 | Seiten mit `draft: true` ausblenden.                                                                                                                                                                                        |
| `hideEmptyFolders`     | `boolean`                                                                                                          | `true`                                                                                                 | Ordner ohne sichtbare Kinder entfernen.                                                                                                                                                                                     |
| `keepIndexOnlyFolders` | `boolean`                                                                                                          | `true`                                                                                                 | Ordner behalten, deren einziger Inhalt die Indexseite ist.                                                                                                                                                                  |
| `include`              | `string[]`                                                                                                         | `[]` (alles)                                                                                           | Globs auf Slugs; `docs` behält den Teilbaum, `docs/**` alles darunter.                                                                                                                                                      |
| `exclude`              | `string[]`                                                                                                         | `[]`                                                                                                   | Globs auf Slugs zum Ausblenden, z. B. `private/**`. Wer die Indexseite eines Ordners ausschließt, entfernt den Ordner.                                                                                                      |
| `folderLink`           | `"index" \| "none" \| "first-child"`                                                                               | `"index"`                                                                                              | Wohin ein Ordnertitel verlinkt. `index` fällt auf die erste Seite zurück, wenn keine Ordnerseite existiert.                                                                                                                 |
| `folderClick`          | `"toggle" \| "link"`                                                                                               | `"toggle"`                                                                                             | Aufklappbare Ordner: die ganze Zeile klappt den Ordner, oder die Zeile ist ein Link mit Aufklapp-Button am Ende. Siehe „Ordnerzeilen“.                                                                                      |
| `folderDefaultState`   | `"collapsed" \| "open"`                                                                                            | `"collapsed"`                                                                                          | Anfangszustand aufklappbarer Ordner.                                                                                                                                                                                        |
| `expandActive`         | `boolean`                                                                                                          | `true`                                                                                                 | Ordner auf dem Pfad zur aktuellen Seite öffnen.                                                                                                                                                                             |
| `exclusive`            | `boolean`                                                                                                          | `false`                                                                                                | Nur ein offener Ordner je Ebene (`<details name>`).                                                                                                                                                                         |
| `persistState`         | `boolean`                                                                                                          | `false`                                                                                                | Offene Ordner in `localStorage` merken (nur Akkordeon).                                                                                                                                                                     |
| `trigger`              | `"click" \| "hover"`                                                                                               | `"click"`                                                                                              | Wie sich `dropdown`, `mega` und `flyout` öffnen. Hover öffnet auch bei Tastaturfokus.                                                                                                                                       |
| `breakpoints`          | `{ mobile, desktop }`                                                                                              | aus `quartz/styles/variables.scss`                                                                     | Breakpoints der Site überschreiben, z. B. `{ mobile: 640px }`.                                                                                                                                                              |
| `flyout.side`          | `"auto" \| "right" \| "left"`                                                                                      | `"auto"`                                                                                               | `flyout`: Seite, zu der die Panels öffnen. `auto` öffnet nach links, wenn die Navigation in der rechten Seitenhälfte steht (im Browser entschieden).                                                                        |
| `select.button`        | `boolean`                                                                                                          | `false`                                                                                                | `select` und `mobile: select`: Button „Los“ anzeigen. Eine Auswahl navigiert ohnehin: per Zeiger sofort, per Tastatur mit Enter.                                                                                            |
| `tabs.secondary`       | `boolean`                                                                                                          | `true`                                                                                                 | `tabs`: Kinder des aktiven Tabs in einer zweiten Zeile.                                                                                                                                                                     |
| `columns.max`          | `number`                                                                                                           | `4`                                                                                                    | `columns`: reserviert für eine Spaltenbegrenzung; das Layout nutzt derzeit ein Auto-Fit-Raster.                                                                                                                             |
| `pager.labels`         | `boolean`                                                                                                          | `true`                                                                                                 | `pager`: „Zurück“ / „Weiter“ über den Titeln anzeigen.                                                                                                                                                                      |
| `pager.order`          | `"tree" \| "siblings"`                                                                                             | `"tree"`                                                                                               | `pager`: den ganzen Baum in Lesereihenfolge durchlaufen oder nur die Geschwister der aktuellen Seite.                                                                                                                       |

Die Standardwerte stehen im Plugin-Code; Quartz reicht die YAML-Optionen unverändert durch. Die
Schreibweisen aus 0.1, `variant: vertical` / `horizontal` und `dropdownTrigger`, funktionieren
weiter und lösen eine Build-Warnung aus; die entfernte Option `style` wird mit Warnung ignoriert.

### Varianten

Jede Variante ist von Natur aus vertikal oder horizontal, eine Ausrichtungsoption gibt es nicht.

| Variante    | Ausrichtung | Ergebnis                                                                                                                                   |
| ----------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `tree`      | vertikal    | Verschachtelte Liste, alles sichtbar. Für Sidebars.                                                                                        |
| `accordion` | vertikal    | Verschachtelte Liste mit aufklappbaren Ordnern (`<details>`), aktiver Pfad offen, optional Persistenz und `exclusive`.                     |
| `flyout`    | vertikal    | Liste, deren Ordner ein Panel daneben öffnen: rechts, oder links, wenn die Navigation in der rechten Seitenhälfte steht. Klick oder Hover. |
| `bar`       | horizontal  | Erste Ebene in einer Zeile; tiefere Ebenen inline hinter dem Elternelement. Header und Footer mit ein, zwei Ebenen.                        |
| `dropdown`  | horizontal  | Zeile mit Einträgen der ersten Ebene; Ordner öffnen ein Panel darunter. Klick oder Hover.                                                  |
| `mega`      | horizontal  | Wie `dropdown`, aber das Panel zeigt die zweite Ebene als Spalten mit der dritten Ebene darunter.                                          |
| `tabs`      | horizontal  | Erste Ebene als Tab-Leiste; die Kinder des aktiven Tabs in einer zweiten Zeile.                                                            |
| `columns`   | Raster      | Erste Ebene als Spaltenüberschriften mit ihren Kindern darunter. Footer-Sitemaps.                                                          |
| `select`    | –           | Ein `<select>`-Sprungmenü mit Ordnern als Optionsgruppen. Navigiert über Quartz’ SPA-Router.                                               |
| `pager`     | –           | „Zurück“ / „Weiter“ in Lesereihenfolge des Baums. Gehört nach `afterBody`.                                                                 |

`align` richtet die oberste Zeile der horizontalen Varianten aus: `left`, `center`, `right` oder
`full`, wobei jeder Eintrag den gleichen Anteil der Breite bekommt. Unterhalb des
Mobile-Breakpoints stapeln sich die Einträge und die Ausrichtung entfällt.

Dropdown- und Mega-Panels, die rechts aus dem Viewport ragen würden, hängen stattdessen an der
rechten Kante ihres Eintrags, und ein Panel in einer scrollenden Sidebar (`overflow: auto`, die
es abschneiden würde) wird per Popover-API in den Top-Layer gehoben (ältere Browser:
`position: fixed`), an seiner Zeile verankert und schließt beim Scrollen. Beides erledigt das Client-Script beim Öffnen.

`mobile` schaltet unterhalb des Mobile-Breakpoints um: `accordion` macht aus Zeilen eine gestapelte
Liste mit aufklappbaren Ordnern, `offcanvas` verbirgt die Liste hinter einem Burger-Button in einem
einfahrenden Panel mit Schließen-Button, `select` zeigt ein Sprungmenü statt der Liste, `hidden`
blendet die Instanz aus.

### Ordnerzeilen

In `accordion`, `dropdown`, `mega` und `flyout` ist die ganze Zeile eines Ordners die Klickfläche:

- `folderClick: toggle` (Standard): Die Zeile ist die `<summary>`; ein Klick irgendwo darauf
  öffnet oder schließt den Ordner. Die Ordnerseite ist über `indexEntry: first` („Übersicht“)
  erreichbar.
- `folderClick: link`: Die Zeile ist ein Link zur Ordnerseite; am rechten Rand sitzt ein
  Aufklapp-Button mit dem Pfeil. Das ist die übliche Kombination mit `trigger: hover`: Das Panel
  öffnet beim Überfahren, der Klick folgt dem Link.

Ordner, die nur mobil klappen (`mobile: accordion` bei `bar`, `tree`, `columns`, `tabs`),
nutzen immer Link plus Button, damit der Ordner auf dem Desktop ein Link bleibt.

### Markup und Klassen

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

Die aktuelle Seite trägt `active` (auf `<li>` und `<a>`) und `aria-current="page"`; jeder Ordner
darüber trägt `active-trail`. Ordner mit Kindern bekommen zusätzlich `quartz-nav__item--parent`;
Zeilen mit eigenem Aufklapp-Button bekommen `quartz-nav__item--split`.

## Icons

Zeilen tragen eine Glyphe vor dem Titel, wie in einem Datei-Explorer: `folder` für einen
Ordner, `folder-open` solange er offen ist, `file` für eine Seite, `house` für den
`showHome`-Eintrag. Ein Ordner gilt als offen, wenn sein `<details>` offen ist oder, wo nichts
klappt (`tree`, Panels von `dropdown` und `mega`, `columns`), wenn die aktuelle Seite in ihm liegt. Wo sie erscheinen, hängt von der Variante ab:

| Variante                         | Typ-Glyphen                                                         |
| -------------------------------- | ------------------------------------------------------------------- |
| `tree`, `accordion`, `flyout`    | jede Ebene                                                          |
| `dropdown`, `mega`, `columns`    | in den Panels / Spalten (ab Ebene 2), die oberste Zeile bleibt frei |
| `bar`, `tabs`, `select`, `pager` | keine                                                               |

Ein eigenes Icon ersetzt die Glyphe dieser Zeile und wird in jeder Variante gezeigt:

- Im Frontmatter: `navIcon: lucide:book-open`, `navIcon: 📘` oder `navIcon: none` für gar kein
  Icon. In einer `index.md` setzt es das Icon des Ordners.
- In der Konfiguration: `nodeIcons: { docs: "lucide:book-open", "docs/api": "🧩" }`, nach Pfad,
  für Ordner ohne `index.md` oder wenn die Icons an einer Stelle stehen sollen. Frontmatter
  gewinnt gegen `nodeIcons`.

`icons` wählt den Modus: `both` (Standard), `type`, `custom` oder `none`. Lucide-Icons werden
als SVG eingebettet (`lucide lucide-book-open quartz-nav__icon`), `1.1em` groß, in der
gedämpften Farbe und in der Akzentfarbe auf der aktuellen Seite und ihrem Pfad. Die komplette
[Lucide](https://lucide.dev/icons)-Tabelle liegt im Plugin, in der Site ist nichts zu
installieren; ein unbekannter Name gibt eine Build-Warnung aus und rendert nichts. Die eigenen
Symbole des Plugins lassen sich über `iconNames` tauschen.

Lucide steht unter der ISC-Lizenz (siehe `node_modules/lucide-static/LICENSE`).

### Schriftstaffelung nach Ebene

Ordnerzeilen werden je Ebene kleiner und leichter, damit das Auge den Anfang eines Zweigs
findet: Ebene 1 ist der Bereich (`0.95rem`, 700), Ebene 2 ein Kapitel (`0.9rem`, 600), Ebene 3
und tiefer sind Orte (`0.875rem` / `0.8rem`, 500, ruhigere Farben). Seiten nutzen die Größe der
Ebene, gedeckelt auf `--quartz-nav-page-size`, mit Stärke 400. Ordnertitel nutzen die
Überschriftenschrift. Die oberste Zeile der horizontalen Varianten (`bar`, `dropdown`, `mega`,
`tabs`) ist stattdessen einheitlich: eine Größe, Stärke `--quartz-nav-bar-weight`. Alles ist
über die `--quartz-nav-level-*`-Variablen einstellbar.

## Styling über CSS-Variablen

Es gibt ein Stylesheet; es folgt dem Quartz-Theme (`--secondary`, `--dark`, `--lightgray`,
`--bodyFont`, …) und damit dem Dark Mode. Jeder Wert kommt aus einer `--quartz-nav-*`-Custom-Property
am Wurzelelement. Quartz legt Komponenten-CSS in `@layer quartz-base` ab, deshalb überschreibt
die ungeschichtete `quartz/styles/custom.scss` der Site sie ohne Selektor-Gefechte:

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

| Variable                                                                                                          | Standard                                                   | Wirkung                                                             |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------- |
| `--quartz-nav-gap`, `--quartz-nav-nested-gap`                                                                     | `0.25rem 0.5rem`, `0.25rem 0.5rem`                         | Abstände in horizontalen Listen                                     |
| `--quartz-nav-indent`                                                                                             | `1rem`                                                     | Einrückung verschachtelter Ebenen                                   |
| `--quartz-nav-item-padding-y`, `--quartz-nav-item-padding-x`, `--quartz-nav-radius`                               | `0.2rem`, `0.5rem`, `4px`                                  | Innenabstand der Zeilen und Eckenradius                             |
| `--quartz-nav-row-height`                                                                                         | Zeilenhöhe plus vertikaler Innenabstand                    | Höhe des Aufklapp-Buttons in geteilten Zeilen                       |
| `--quartz-nav-toggle-size`                                                                                        | `1.75rem`                                                  | Breite des Aufklapp-Buttons in geteilten Zeilen                     |
| `--quartz-nav-chevron-open-rotate`                                                                                | `180deg`                                                   | Drehung des Pfeils bei offenem Ordner (`90deg` für `chevron-right`) |
| `--quartz-nav-title-size`, `--quartz-nav-title-margin`                                                            | `1rem`, `0 0 0.5rem`                                       | Die Überschrift `title`                                             |
| `--quartz-nav-line-height`                                                                                        | `1.6`                                                      | Zeilenhöhe der Einträge                                             |
| `--quartz-nav-transition`                                                                                         | `0.2s ease` (`0s` bei reduzierter Bewegung)                | Alle Übergänge und Animationen                                      |
| `--quartz-nav-panel-min-width`, `--quartz-nav-panel-padding`, `--quartz-nav-panel-radius`, `--quartz-nav-panel-z` | `12rem`, `0.5rem`, `6px`, `20`                             | Dropdown-, Mega- und Flyout-Panels                                  |
| `--quartz-nav-mega-min-width`                                                                                     | `min(40rem, 90vw)`                                         | Breite der Mega-Panels                                              |
| `--quartz-nav-column-min-width`, `--quartz-nav-column-gap`                                                        | `10rem`, `1rem 1.5rem`                                     | Spalten bei `columns` und `mega`                                    |
| `--quartz-nav-offcanvas-width`, `--quartz-nav-offcanvas-padding`, `--quartz-nav-offcanvas-z`                      | `min(20rem, 85vw)`, `1rem`, `100`                          | Off-Canvas-Panel                                                    |
| `--quartz-nav-font`, `--quartz-nav-heading-font`                                                                  | `var(--bodyFont)`, `var(--headerFont)`                     | Schriften                                                           |
| `--quartz-nav-color`, `--quartz-nav-color-hover`, `--quartz-nav-color-active`, `--quartz-nav-color-trail`         | `--darkgray`, `--secondary`, `--secondary`, `--dark`       | Linkfarben je Zustand                                               |
| `--quartz-nav-color-static`, `--quartz-nav-color-heading`, `--quartz-nav-color-muted`                             | `--dark`, `--dark`, `--gray`                               | Ordnertitel ohne Link, Überschriften, Pfeile und Beschriftungen     |
| `--quartz-nav-bg-hover`, `--quartz-nav-bg-panel`                                                                  | `--highlight`, `--light`                                   | Hover-Hintergrund; Hintergrund von Panels und Off-Canvas            |
| `--quartz-nav-border`, `--quartz-nav-focus`                                                                       | `--lightgray`, `--secondary`                               | Rahmen, Führungslinien und Fokusringe                               |
| `--quartz-nav-shadow`, `--quartz-nav-backdrop`                                                                    | weicher Schatten, `rgba(0,0,0,.35)` (dunkler im Dark Mode) | Panel-Schatten und Off-Canvas-Hintergrund                           |
| `--quartz-nav-weight-active`, `--quartz-nav-weight-parent`                                                        | `600`, `600`                                               | Schriftstärke der aktiven Seite und der Ordnertitel                 |

Die Animationen sind bewusst klein: Pfeile drehen sich, Hover-Farben blenden über, Ordner und
Panels blenden beim Öffnen ein, das Off-Canvas-Panel fährt ein. Ordner, die offen gerendert werden
(aktiver Pfad, gemerkter Zustand), animieren beim Laden nicht. `--quartz-nav-transition: 0s`
schaltet alles ab.

## Barrierearmut

- Jede Instanz ist ein `<nav>` mit zugänglichem Namen: `ariaLabel`, sonst der sichtbare
  `title`, sonst „Hauptnavigation“ (der Pager: „Vorherige und nächste Seite“). Gib jeder Instanz
  ein eigenes `ariaLabel` oder `title`, damit die Landmarks unterscheidbar bleiben.
- Aufklappbare Ordner nutzen `<details>`/`<summary>`. Mit `folderClick: toggle` ist die Summary
  die Zeile und trägt den Titel als Text; mit `link` ist der Titel ein eigener Link und die
  Summary ein reiner Aufklapp-Button mit dem Namen „<Titel> aufklappen“. Es steckt nichts
  Interaktives in einem anderen Bedienelement.
- Die aktuelle Seite trägt `aria-current="page"`; Pfeile und Icons sind `aria-hidden`.
- Off-Canvas: Der Schalter ist eine per Tastatur erreichbare Checkbox mit `aria-expanded` und
  `aria-controls`; Escape schließt das Panel und gibt den Fokus an den Schalter zurück. Dropdown-,
  Mega- und Flyout-Panels schließen mit Escape und geben den Fokus an ihren Button zurück.
- Die Variante `select` navigiert nicht, während jemand per Pfeiltasten durch die Optionen geht;
  Enter tut es. Eine Auswahl per Maus navigiert sofort. `select.button: true` ergänzt einen
  Button „Los“ für Sites, die einen Bestätigungsschritt wollen.
- `prefers-reduced-motion` schaltet alle Übergänge und Animationen ab; Fokusringe nutzen die
  Themefarbe `--secondary`.

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

`npm run check` führt Typecheck, Linter, Formatter, 76 Tests und den Build aus; die CI macht bei
jedem Push dasselbe. Das ist keine Garantie, aber etwas, das du selbst ausführen kannst, bevor du
dem Plugin vertraust.

## Lizenz

MIT. Gebündelte Lucide-Icons: ISC, © Lucide Contributors.
