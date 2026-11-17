# Plan: eigene SVG-Icons

Stand 2026-11-17, Fassung 0.5.1. Entschieden mit dem Nutzer: Pfad ab dem Content-Ordner, Farbe
wählbar, `iconNames` bleibt Lucide.

**Umgesetzt am 2026-11-17** (unveröffentlicht, CHANGELOG „Unreleased“). Was beim Umsetzen anders
kam als geplant:

- **Füllung ohne Angabe**: Inline erbt das SVG `fill` von der Seite, und Quartz gibt `a` und `li`
  die Textfarbe (gemessen in gui-test: eine Form ohne Füllung wurde im Dunkelmodus hellgrau).
  `svg:` setzt an der Wurzel deshalb `fill="black"`, `svg-mono:` `currentColor`.
- **Doppelte Ids**: Ein Ordner zeigt sein Icon auch am Eintrag „Übersicht“ (`indexEntry: first`),
  also stand jede Id zweimal auf der Seite. Jede Zeichnung bekommt ihre eigenen (`withInstance`,
  Zähler im Render-Kontext).
- **Ausfall in der Leiste**: `SvgFileIcon` wird aufgerufen, nicht eingehängt; nur so sieht
  `icon(…) ?? lead` ein `null` und zeigt das Monogramm.
- **xmldom statt Chrome**: lehnt jede DOCTYPE-Entity ab (Chrome erweitert interne) und nimmt eine
  Wurzel ohne `xmlns` als SVG (Chrome nicht). Bündel 538 → 779 KB, nur zur Build-Zeit.
- **Dev-Server**: `quartz build --serve` bemerkt die geänderte SVG (`Detected change`), rendert aber
  keine Seite neu (`Parsed 0 Markdown files`). Steht im README: neu starten.
- **Nicht angesehen**: das aufgeklappte Rail-Panel (Hover im Headless-Chrome öffnete es nicht);
  es nutzt denselben `icon()`-Weg wie die Leiste.

## Ziel

Neben `lucide:<name>`, Text, Emoji und `none` nimmt ein Icon-Wert eine SVG-Datei aus dem Vault an,
in `nodeIcons` und in `navIcon` (Frontmatter). Es sieht aus und verhält sich wie ein Lucide-Icon:
gleiche Klasse, gleiche Größe, im Rail-Streifen wie im Baum.

```yaml
nodeIcons:
  komponenten: svg:svg/baustein.svg # Farben wie gezeichnet
  grundlagen: svg-mono:svg/fundament.svg # einfarbig, folgt der Navigationsfarbe
```

```yaml
---
navIcon: svg-mono:svg/fundament.svg
---
```

## Verhalten

- **`svg:<pfad>`**: Farben bleiben, wie die Datei sie setzt. Wo das SVG `currentColor` benutzt,
  folgt es der Navigation (gedämpft, Akzent auf der aktuellen Seite und ihrer Spur).
- **`svg-mono:<pfad>`**: Jede Füll-, Strich- und Stop-Farbe außer `none`/`transparent` wird
  `currentColor`; mehrfarbige Icons werden einfarbig. Für Icons im Stil von Lucide.
- **Pfad** ab dem Content-Ordner (`ctx.argv.directory`), mit `/`, ohne führendes `/`. Groß-/Kleinschreibung
  wie auf der Platte. Ein Pfad mit `..`, ein absoluter Pfad oder einer, der über einen Symlink aus dem
  Content-Ordner führt (jedes Segment mit `lstat`), wird abgelehnt.
- **Fehler** (Datei fehlt, unlesbar, kein SVG, zu groß, Pfad abgelehnt): eine Build-Warnung je Wert
  (`warnOnce`) mit dem Grund, die Zeile zeigt kein Icon. Wie heute ein unbekannter Lucide-Name.
  Im Rail-Streifen greift dann das Monogramm, wie bei einem Eintrag ohne Icon.
- **`icons`-Modus**: `svg:`/`svg-mono:` zählen als eigenes Icon (`custom`, `both`), wie `lucide:`.
- **`iconNames`** (die Symbole des Plugins) bleibt Lucide-only.

## Umsetzung

1. **`src/svg-icons.ts` (neu): Lesen.** `svgIconRef(value)` erkennt `svg:`/`svg-mono:` und gibt
   `{ path, mono }`. `readSvgIcon(contentDir, path)` prüft den Pfad (Segmente, `lstat`, kein Ausbruch),
   liest höchstens 50 KB und cacht je absolutem Pfad und `mtimeMs` für den Lauf. Ergebnis:
   `IconNode` (dieselbe Form wie Lucides Tabelle) plus `viewBox`, oder ein Grund.
2. **`src/svg-sanitize.ts` (neu): Bereinigen** nach QuartzControls `src/utils/inlineSvg.ts`
   (262 Zeilen, dort auf Chromes `DOMParser`). Die Positivliste (Elemente, Attribute, Werte, URL-Regeln)
   wird übernommen und als Abschrift mit Herkunft markiert; nur das Parsen wechselt auf
   `@xmldom/xmldom` (hat `DOMParser`, kein `querySelectorAll`, also ein eigener Baumgang).
   Ausgabe ist kein Markup, sondern der `IconNode`-Baum: Preact setzt Attribute und Text selbst,
   es gibt kein `dangerouslySetInnerHTML`. Ids bekommen ein Präfix aus Pfad und Inhalt, Verweise
   (`url(#…)`, `href="#…"`) folgen. `<svg>` verliert `width`/`height`; fehlt `viewBox`, wird es aus
   ihnen gebildet, fehlen beide, ist das ein Fehler. `svg-mono` färbt hier um.
   - `@xmldom/xmldom` kommt in `devDependencies` und wird gebündelt (wie `lucide-static`);
     `verify-dist-bundling` prüft das. Vorher: Größe im Bündel messen und nennen.
3. **`src/icons.tsx`**: `LucideIcon` wird zu einem gemeinsamen Zeichner für Knotenbäume;
   `SvgIcon` nutzt ihn mit dem `viewBox` der Datei. Klasse `quartz-nav__icon quartz-nav__icon--svg`
   (Lucide behält `lucide lucide-<name>`).
4. **`src/components/render.tsx`** (`icon()`) und der Rail-Streifen: `svg:` vor dem Text-Fall
   erkennen. Der Content-Ordner kommt aus `props.ctx` (in den Typen `unknown`, also eingeengt);
   ohne ihn (Tests, fremder Aufrufer) eine Warnung und kein Icon.
5. **CSS**: nichts Neues erwartet; prüfen, dass `quartz-nav__icon` mit einem fremden `viewBox`
   (nicht 24×24) sitzt, und dass `fill`-lose Pfade nicht die Lucide-Regel `fill: none` erben,
   falls es eine gibt.

## Tests (vitest)

- Bereiniger: `<script>`, `on…`-Attribute, `foreignObject`, `<style>`, `xlink:href` nach außen,
  `javascript:` in `href`, `data:` außer Rasterbildern, Entities/DOCTYPE, Kommentare, CDATA;
  zwei Icons mit derselben Id auf einer Seite; `svg-mono` mit Verlauf und `style`-Farben.
  Wo QuartzControl Fälle hat, dieselben Fälle.
- Pfad: `../`, absolut, Symlink nach draußen, Symlink drinnen (erlaubt), fehlt, Ordner statt Datei,
  zu groß, kein SVG, NFD-Namen (Vault aus macOS: „Über.svg“ zerlegt auf der Platte).
- Render: Baum, Rail-Streifen, `icons: type` (kein eigenes Icon), Frontmatter schlägt `nodeIcons`.
- Gegenprobe je neuer Assertion einmal rot.

## Messen am echten Build

- gui-test (Kopie): Rail mit `svg:` und `svg-mono:`, hell und dunkel, aktuelle Seite (Akzent).
- Dev-Server: baut er neu, wenn sich nur die SVG ändert? Wenn nicht, im README sagen
  („nach Änderung neu starten“) statt eine Beobachtung einzubauen.
- Größe einer Seite vorher/nachher mit einem typischen Icon (Leiste + Panel = zweimal im HTML).

## Doku und Abschluss

- README.md / README.de.md: Abschnitt Icons, Tabelle (`nodeIcons`, `navIcon`), Sicherheitssatz
  (was entfernt wird), wie man ein Icon für `svg-mono` anlegt. Manifest-Beschreibungen in
  `package.json` (de/en), die QuartzHub im Optionsformular zeigt.
- CHANGELOG, Version 0.6.0. `npm run check`, `npm run build`, `dist/` mitcommitten.
- Release, Vorlagen-Repo, Plugin-Handbuch und Marktplatz nur auf Ansage.

## Nicht in diesem Schritt

- `svg:` in `iconNames`.
- Eine Dateiauswahl in QuartzHubs Optionsformular (der Wert bleibt freier Text).
- Icons per URL.
