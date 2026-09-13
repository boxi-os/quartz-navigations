Du bist als zweites Paar Augen an zwei Quartz-Plugins und einem Handbuch. Es geht um ein Review —
nicht um Änderungen. Am Ende steht eine Liste von Befunden, über die der Nutzer entscheidet.

## Worum es geht

Drei Pakete Arbeit aus einer Sitzung, alle auf `main` gepusht, CI grün, noch **nicht released**
(beide CHANGELOGs führen sie unter „Unreleased“):

1. **quartz-navigations kann jetzt mit quartz-multilanguage.** Neue Option `language` (Vorgabe
   `auto`): Jede Navigation zeigt den Baum in der Sprache der aktuellen Seite, für alle vier
   Aufbauten des Multilanguage-Plugins. Das ist der größte und riskanteste Teil.
2. **quartz-multilanguage setzt `<html lang>` auf erzeugten Seiten.** Ordner- und Tag-Seiten
   bekamen die Sprache der Site statt ihrer eigenen.
3. **Ein neues Handbuch zu quartz-navigations**, 36 Seiten je Sprache, und eine README-Korrektur,
   die dabei entstand.

Vor dem Release 0.3.0 soll feststehen, ob das trägt.

## Umfang

| Repository                                                    | Commits                                          |
| ------------------------------------------------------------- | ------------------------------------------------ |
| `~/Development/quartz-navigations`                            | `50c0ed9` (Mehrsprachigkeit), `7da38f4` (README) |
| `~/Development/quartz-multilanguage`                          | `bde02d4` (`<html lang>`)                        |
| Vault `~/Obsidian/QuartzProjekte/quartz-navigations-handbuch` | `795fe27`                                        |

Dazu das Quartz-Projekt des Handbuchs, `~/Documents/QuartzProjekte/quartz-navigations-handbuch`
(kein eigenes Repo; die Konfiguration steht in `quartz.config.yaml`). Es ist mit dem Plugin-Stand
**`0fa4c27`** gebaut, also _vor_ `50c0ed9`.

**Verändere weder die Repos noch Vault noch Projekt.** Lesen und kopieren ist in Ordnung; für Bauten
nimm eine Kopie (`cp -Rc` auf APFS kostet kaum Platz).

Lies zuerst `CLAUDE.md` in beiden Plugin-Repos.

## Eine Besonderheit, die du wissen musst

**Alle Commits stammen von demselben Modell, das diesen Auftrag schreibt.** Der Nutzer hat die
Richtung vorgegeben, Code, Tests, Doku und Commit-Nachrichten sind meine. Lies Commit-Nachrichten
und Handbuch als Behauptungen. Wo eine Zahl steht, gilt sie als Messung; trägt sie nicht, ist das ein
Befund.

## Ein Befund steht schon fest

Beim Schreiben dieses Auftrags aufgefallen und gemessen, **nicht behoben**: `src/tree.ts` erkennt
Index-Titel jetzt mit `/^_?index(\.[\w-]+)?$/i`, damit `index.en` (Suffix-Aufbau ohne `title`) nicht
als Titel erscheint. Das Muster ist aber **ohne Rücksicht auf Groß-/Kleinschreibung und gilt immer**,
auch ohne Mehrsprachigkeit. Eine Seite `glossar/register.md` mit `title: Index` heißt seit `50c0ed9`
„register“, ein Ordner mit `index.md` und `title: Index` heißt „glossar“. Vorher war nur das exakte
`index` ausgenommen. Du musst das nicht erneut finden — aber sieh nach, ob dieselbe Art Fehler, eine
Erweiterung für den Sprachfall, die still auch den Normalfall ändert, noch an anderer Stelle steckt.

## Worauf es ankommt, in dieser Reihenfolge

### 1. Der Sprachmodus in quartz-navigations (`50c0ed9`)

Neu: `src/language.ts`. Geändert: `src/tree.ts`, `src/scope.ts`, `src/components/Navigation.tsx`,
`src/components/render.tsx`, `src/options.ts`, `src/types.ts`. Tests: `test/language.test.ts`.

Das Prinzip: quartz-multilanguage legt an jede Markdown-Seite `fileData.multilanguage = { lang,
baseSlug, source }`. Die Navigation baut je Sprache einen Baum, ordnet Seiten nach `baseSlug` ein
(sprachneutral: `en/docs/setup` und `docs/setup.en` → `docs/setup`) und verlinkt die echten Slugs.
`NavNode.slug` ist das Linkziel, `NavNode.path` der sprachneutrale Pfad.

Die Stellen, an denen ich mir am unsichersten bin:

- **Die Verzeichniszuordnung für Seiten ohne Sprache** (`languageIndex`, `placements`). Erzeugte
  Ordnerseiten tragen keine `multilanguage`-Daten. Ich lerne aus den echten Seiten, welches
  Slug-Verzeichnis zu welcher Sprache und welchem Basisverzeichnis gehört, und richte dabei
  Slug- und Basisverzeichnisse **von hinten** aus (`offset`). Das ist meine Setzung. Wo bricht sie?
  Denkbar: ein Sprachordner tiefer als die erste Ebene, ein `home` in einem anderen Ordner, gemischte
  Aufbauten (Ordner _und_ Suffix), eine Seite, deren `baseSlug` mehr Verzeichnisse hat als ihr Slug.
- **Der Rang bei Kollisionen** (`Placement.rank`, `collect`). Beanspruchen zwei Dateien denselben
  Schlüssel, gewinnt Ordner/Suffix/Frontmatter (2) gegen geerbte Standardsprache (1) gegen erzeugte
  Seite (0). **Bei gleichem Rang gewinnt die spätere** — also die Reihenfolge von `allFiles`. Ist die
  stabil? Gibt es realistische Fälle mit gleichem Rang?
- **Die Sprache der aktuellen Seite** (`languageOfPage`). Gehört eine Seite zu mehreren Sprachen oder
  zu keiner (geteilte Ordnerseite im Suffix-Aufbau, Tag-Seiten), nehme ich die Sprache, die zum
  `locale` der Site passt, sonst die erste gesehene. quartz-multilanguage entscheidet für dieselben
  Seiten mit `detectLanguage` — die **Standardsprache**. Beide Plugins können auf derselben Seite
  also verschiedene Sprachen annehmen. Wie wahrscheinlich ist das, und was sieht man dann?
- **`include`/`exclude` treffen Schlüssel _oder_ echten Slug.** Gedacht, damit `exclude: [en]`
  weiter geht. Macht das `include` im Sprachmodus unerwartet weit, oder `exclude` unerwartet scharf?
- **Synthetische Ordner-Slugs.** Ein Ordner ohne Indexseite bekommt `pfad/index` als `slug`. Mit
  `language: de` fest auf einer englischen Seite, oder in einem Suffix-Aufbau, kann dieser Slug mit
  dem echten Slug einer anderen Seite zusammenfallen. Führt das zu einer falschen Markierung `active`?
- **Titel aus Dateinamen mit Sprachsuffix** (`rawName`, `nameHint`). `Setup.en.md` ohne `title` soll
  „Setup“ heißen. Die Erkennung vergleicht das Slug-Ende mit dem Schlüssel-Ende. Was passiert bei
  Slugs, die Quartz beim Slugifizieren verändert (Leerzeichen, Umlaute, Großbuchstaben)?
- **`resolveScope` bekommt einen vierten Parameter `currentPath`.** `hideOutsideRoot` und `inBase`
  vergleichen jetzt Pfade statt Slugs. Ist das auch ohne Mehrsprachigkeit exakt das alte Verhalten?
  Die 85 alten Tests sind unverändert grün — reicht deren Abdeckung für diese Aussage?
- **Die Vorgabe `auto` ändert das Verhalten bestehender mehrsprachiger Sites** (vorher: ein Baum mit
  allen Sprachen). Das Plugin ist jung und privat, deshalb habe ich es als Vorgabe gewählt. Die
  README sagt „das Verhalten vor 0.3“ — eine 0.3 gibt es noch nicht.
- **`pickLanguage`** akzeptiert `/^[A-Za-z]{2,3}([-_][A-Za-z0-9]+)*$|^(auto|all)$/`, und
  `Navigation.tsx` bildet `en-US` auf einen gesehenen Code `en` ab. Ein Code, den keine Seite trägt,
  ergibt einen leeren Baum ohne Meldung. Sollte es eine geben?
- **Leistung.** Je Sprache ein Baum, gecacht nach `allFiles`, Sprache, Locale und Baumoptionen.
  `languageOfPage` und `placementIn` laufen je Seite je Instanz. Bei wie vielen Seiten wird das
  spürbar?

### 2. `<html lang>` in quartz-multilanguage (`bde02d4`)

`src/emitter.ts`, `fixGeneratedPageLang` und `withHtmlLang`. Quartz rendert `<html lang>` aus
`frontmatter.lang`, bevor irgendein Hook eines Nicht-Seitentyp-Plugins die erzeugten Seiten sieht.
Der Emitter schreibt das Attribut deshalb **in die fertige Datei** um.

- **Die Reihenfolge ist die Grundlage.** Ich habe in `quartz/processors/emit.ts` und
  `quartz/build.ts` gelesen, dass der `PageTypeDispatcher` vor allen anderen Emittern läuft, auch im
  Serve-Modus. Die übrigen Emitter laufen danach **parallel** (`Promise.all`). Kann ein anderer
  Emitter dieselbe HTML-Datei gleichzeitig lesen oder schreiben?
- **Ein Umschreiben der Ausgabe ist ein Eingriff in fremde Dateien.** Gibt es einen saubereren Weg,
  den ich übersehen habe — ein Hook, ein Feld in den Daten der erzeugten Seite, das Quartz früher liest?
- **`ctx.virtualPages`** steht in Quartz' `BuildCtx`, aber nicht in `@quartz-community/types`; der
  Code castet. Hält das über Quartz-Updates?
- **Partielle Neubauten.** Gemessen: nach einer Änderung im Serve-Modus bleibt `lang="en-US"`. Nicht
  gemessen: ob der Dispatcher bei einem partiellen Bau alle erzeugten Seiten neu schreibt oder nur
  einige, und ob dann Dateien mit falschem Attribut übrig bleiben.
- **`withHtmlLang`** ersetzt das erste `<html…>` per Regex. Robust genug?

### 3. Das Handbuch gegen den Code (`795fe27`)

36 Seiten je Sprache, beschreibt quartz-navigations **auf dem Stand `0fa4c27`**. Aussagen, die sich
durch `50c0ed9` erledigt haben (8.1, 8.3, 9.3, die Wörter des Plugins in 7.3 und 4.3), sind bekannt
und kein Befund; prüf das Handbuch gegen `0fa4c27`.

Gegen die Funktionen des Plugins geprüft habe ich mit einem Wegwerf-Test: die Scope-Tabelle in 3.1,
`foldersFirst` vor `order` (2.2), `stripNumericPrefix` auf Frontmatter-Titeln (2.1),
`exclude: ["docs/index"]` behält den Ordner (2.3), den Pager mit `scope: section` und
`pager.order: siblings` (4.3). **Alles andere ist gelesen, nicht gemessen.** Am unsichersten:

- **„`breakpoints` wirkt nicht je Instanz“** (6.2, 9.3): Zwei verschiedene Werte ergäben zwei
  Stylesheets, die beide auf jede Navigation greifen. Aus dem SCSS abgeleitet, nie im Browser gesehen.
- **„Der Frame dieser Website bricht bei 900 statt 800 Pixeln um“** (6.2, 8.1), abgeleitet aus
  `.quartz-gui/layout-breakpoints.json` und den `max-width`-Werten in `frames.js`.
- **Die Pager-Position** (8.1): „`priority` ordnet nur innerhalb eines Bereichs“, abgeleitet aus einem
  Screenshot, in dem der Pager unter den Backlinks stand.
- **Die Tabellen „ohne Skript“** (5.3), **„Hover nur auf Geräten mit Hover“** und die 150-ms-Verzögerung
  (5.2), **`exclusive` „in aktuellen Browsern“** (5.1).
- **`offcanvas` in einem Vorfahren mit `transform`/`filter`/Maske** (6.1, 9.3): allgemeines CSS-Wissen,
  hier nicht gemessen.
- **Die Rezepte in 8.2 und 8.3.** Keines davon wurde gebaut. Ein Tippfehler in einem Optionsnamen
  liest sich wie ein richtiger Wert — das Plugin meldet unbekannte Werte, aber keine unbekannten
  Schlüssel.
- **Die Meldungstexte in 9.2** sind aus `warnOnce`-Aufrufen abgeschrieben. Stimmen sie wörtlich?

### 4. Die README-Korrektur (`7da38f4`)

Beide Sprachen. Sie behauptet unter anderem die neue CSS-Variablentabelle und „`npm run check` führt
85 Tests aus“ (inzwischen 99, in `50c0ed9` nachgezogen). Prüf die Variablentabelle gegen
`src/components/styles/navigations.scss`.

## Was ich nicht geprüft habe

- **Den Sprachmodus im Browser.** Die vier Aufbauten (Sprachordner, Standardsprache in der Wurzel,
  Suffix, Frontmatter) sind mit echtem quartz-multilanguage **gebaut** und das HTML ausgewertet: Links,
  aktive Seite, Pager-Nachbarn, `aria-label`. Nicht angesehen: `persistState` über Sprachen hinweg,
  das Client-Skript, mobile Modi, der Sprachumschalter zusammen mit der Navigation.
- **Den Suffix- und Frontmatter-Aufbau mit Unterordnern tiefer als eine Ebene** und mit fehlenden
  Übersetzungen.
- **`publishLanguages` / `QUARTZ_LANGS`** zusammen mit dem Sprachmodus.
- **Das Handbuch-Projekt mit `50c0ed9`** — es ist noch mit `0fa4c27` gebaut.
- **Englisch gegen Deutsch im Handbuch** inhaltlich. Geprüft ist nur: 36 Paare, gleiche
  `translationKey`s, 366 Wikilinks auflösbar.

## Ablauf

    cd ~/Development/quartz-navigations && npm run check     # 99 Tests
    cd ~/Development/quartz-multilanguage && npm run check   # 61 Tests

Wenn eine davon nicht grün ist, ist das dein erster Befund.

Für echte Bauten: Kopie von `~/Documents/QuartzProjekte/quartz-navigations-handbuch` anlegen, in der
Kopie `.quartz/plugins/quartz-navigations/dist` bzw. `.quartz/plugins/quartz-multilanguage/dist` durch
das `dist/` des jeweiligen Repos ersetzen, `content` auf einen eigenen Testinhalt zeigen lassen,
`npx quartz build`. Port 8080 und 3001 belegt QuartzControl; für `--serve` andere Ports nehmen.

Sag bei jedem Befund dazu, ob du ihn **gelesen** oder **gemessen** hast, und bei einem gelesenen,
was ihn messbar machen würde.

## Form der Befunde

Je Befund eine Überschrift, die die Sache benennt, dann was passiert, dann woran du es festmachst
(Datei und Zeile, oder Seite und Element), dann eine Einschätzung der Schwere:

- **Hoch** — falsches Verhalten, das ein Nutzer ohne Umweg trifft, oder eine falsche Aussage über
  Code in Handbuch oder README, auch in einem Nebensatz.
- **Mittel** — falsch in einem erreichbaren Randfall, oder eine Aussage, die in die falsche Richtung
  führt.
- **Niedrig** — kosmetisch, oder nur mit Absicht herbeizuführen.

Kein Fix im Text — darüber entscheidet der Nutzer. Ein umständlicher Satz ist kein Befund; ein Satz,
der jemanden eine Stunde kostet, schon.

Leg das Ergebnis als `docs/REVIEW-2026-09-13.md` in `~/Development/quartz-navigations` ab (die
Befunde zu quartz-multilanguage gehören in dieselbe Datei, eigener Abschnitt).

Wenn du nichts findest, ist das ein Ergebnis. Schreib dann, wo du gesucht hast.
