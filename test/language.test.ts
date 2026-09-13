/* eslint-disable @typescript-eslint/no-explicit-any */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { QuartzComponentProps } from "@quartz-community/types";
import Navigation from "../src/components/Navigation";
import { languageIndex, languageOfPage, placements } from "../src/language";
import { resolveOptions } from "../src/options";
import { pagerNeighbours, resolveScope } from "../src/scope";
import { buildTree } from "../src/tree";
import type { NavigationOptions, NavNode } from "../src/types";
import { resetWarnings } from "../src/util/warn";
import { page, virtualFolder } from "./fixture";
import type { FileData } from "../src/tree";

let warn: ReturnType<typeof vi.spyOn>;
beforeEach(() => {
  resetWarnings();
  warn = vi.spyOn(console, "warn").mockImplementation(() => {});
});
afterEach(() => warn.mockRestore());

/** A page as quartz-multilanguage leaves it: `fileData.multilanguage` with lang and baseSlug. */
function ml(
  slug: string,
  relativePath: string,
  lang: string,
  baseSlug: string,
  frontmatter: Record<string, unknown> = {},
): FileData {
  const source =
    typeof frontmatter.lang === "string" ? "frontmatter" : slug === baseSlug ? "default" : "folder";
  return page(slug, relativePath, frontmatter, {
    multilanguage: { lang, baseSlug, source },
  });
}

/** `de/` and `en/` folders. `en/docs` has no index.md, so folder-page generates one. */
function folderSite(): FileData[] {
  return [
    ml("de/index", "de/index.md", "de", "index", { title: "Start" }),
    ml("de/docs/index", "de/docs/index.md", "de", "docs/index", { title: "Doku" }),
    ml("de/docs/01-setup", "de/docs/01 Setup.md", "de", "docs/01-setup", { title: "Einrichten" }),
    ml("de/docs/02-faq", "de/docs/02 FAQ.md", "de", "docs/02-faq", { title: "Fragen" }),
    ml("en/index", "en/index.md", "en", "index", { title: "Home" }),
    ml("en/docs/01-setup", "en/Docs/01 Setup.md", "en", "docs/01-setup", { title: "Setup" }),
    ml("en/docs/02-faq", "en/Docs/02 FAQ.md", "en", "docs/02-faq", { title: "Questions" }),
    virtualFolder("en/docs/index", "Docs"),
  ];
}

/** Default language in the root, English under `en/` — the layout of the handbooks. */
function rootSite(): FileData[] {
  return [
    ml("index", "index.md", "de", "index", { title: "Start" }),
    ml("kapitel/index", "kapitel/index.md", "de", "kapitel/index", { title: "Kapitel" }),
    ml("kapitel/eins", "kapitel/eins.md", "de", "kapitel/eins", { title: "Eins" }),
    ml("kapitel/zwei", "kapitel/zwei.md", "de", "kapitel/zwei", { title: "Zwei" }),
    ml("en/index", "en/index.md", "en", "index", { title: "Home" }),
    ml("en/chapter/one", "en/chapter/one.md", "en", "chapter/one", { title: "One" }),
    virtualFolder("en/chapter/index", "chapter"),
  ];
}

/** Language suffixes in the file name: `Setup.en.md` next to `Setup.md`. */
function suffixSite(): FileData[] {
  return [
    ml("index", "index.md", "de", "index", { title: "Start" }),
    ml("index.en", "index.en.md", "en", "index", { title: "Home" }),
    ml("docs/setup", "docs/Setup.md", "de", "docs/setup", { title: "Einrichten" }),
    // No title: note-properties falls back to the file stem, suffix included.
    ml("docs/setup.en", "docs/Setup.en.md", "en", "docs/setup", { title: "Setup.en" }),
    virtualFolder("docs/index", "docs"),
  ];
}

/** Language from frontmatter only: pages of both languages side by side. */
function frontmatterSite(): FileData[] {
  return [
    ml("index", "index.md", "de", "index", { title: "Start" }),
    ml("blog/hallo", "blog/hallo.md", "de", "blog/hallo", { title: "Hallo", lang: "de" }),
    ml("blog/hello", "blog/hello.md", "en", "blog/hello", { title: "Hello", lang: "en" }),
    virtualFolder("blog/index", "blog"),
  ];
}

function tree(files: FileData[], language?: string, opts: NavigationOptions = {}) {
  return buildTree(files, resolveOptions(opts), language, language);
}

function describeTree(node: NavNode): string[] {
  const out: string[] = [];
  const walk = (n: NavNode, prefix: string) => {
    for (const c of n.children) {
      out.push(`${prefix}${c.title} → ${c.slug}`);
      walk(c, `${prefix}  `);
    }
  };
  walk(node, "");
  return out;
}

describe("languageIndex", () => {
  it("learns the languages and where generated pages belong", () => {
    const files = folderSite();
    const index = languageIndex(files);
    expect(index.languages).toEqual(["de", "en"]);
    expect(placements(virtualFolder("en/docs/index", "Docs"), index)).toEqual([
      { lang: "en", key: "docs/index", rank: 0 },
    ]);
    // A generated folder page shared by both languages of a suffix site.
    const suffix = languageIndex(suffixSite());
    expect(placements(virtualFolder("docs/index", "docs"), suffix)).toEqual([
      { lang: "de", key: "docs/index", rank: 0 },
      { lang: "en", key: "docs/index", rank: 0 },
    ]);
    expect(languageIndex(files)).toBe(index);
  });

  it("finds the language of generated pages, preferring the default language when ambiguous", () => {
    // Like quartz-multilanguage: the language of unmarked pages, whatever the site locale.
    const suffix = languageIndex(suffixSite());
    expect(suffix.defaultLanguage).toBe("de");
    const shared = virtualFolder("docs/index", "docs");
    expect(languageOfPage(shared, suffix, "en-US")).toBe("de");
    expect(languageOfPage({ slug: "tags/foo" }, suffix, "en-US")).toBe("de");
    // Every page marked (language folders only): the site locale decides.
    const folders = languageIndex(folderSite());
    expect(folders.defaultLanguage).toBeUndefined();
    expect(languageOfPage({ slug: "tags/foo" }, folders, "en-US")).toBe("en");
    expect(languageOfPage({ slug: "tags/foo" }, folders, "de-DE")).toBe("de");
    expect(languageOfPage({ slug: "x" }, languageIndex([page("x", "x.md")]), "de-DE")).toBe(
      undefined,
    );
  });
});

describe("language trees", () => {
  it("language folders: one tree per language without the language folder", () => {
    const files = folderSite();
    expect(describeTree(tree(files, "de").root)).toEqual([
      "Doku → de/docs/index",
      "  Einrichten → de/docs/01-setup",
      "  Fragen → de/docs/02-faq",
    ]);
    const en = tree(files, "en");
    expect(en.root.slug).toBe("en/index");
    expect(en.root.title).toBe("Home");
    expect(describeTree(en.root)).toEqual([
      "Docs → en/docs/index",
      "  Setup → en/docs/01-setup",
      "  Questions → en/docs/02-faq",
    ]);
    expect(en.folders.get("docs")?.isVirtual).toBe(true);
  });

  it("a language folder's start page beats a root index.md that only inherited the language", () => {
    const files = [
      ml("index", "index.md", "de", "index", { title: "Sprachwahl" }),
      ...folderSite(),
    ];
    const de = tree(files, "de");
    expect(de.root.slug).toBe("de/index");
    expect(de.root.title).toBe("Start");
    expect(tree([...folderSite(), files[0]!], "de").root.slug).toBe("de/index");
  });

  it("a language folder's start page beats a root index.md with the language in its frontmatter", () => {
    const root = ml("index", "index.md", "de", "index", { title: "Sprachwahl", lang: "de" });
    for (const files of [
      [root, ...folderSite()],
      [...folderSite(), root],
    ]) {
      expect(tree(files, "de").root.slug).toBe("de/index");
    }
  });

  it("default language in the root: the other language's folder is not part of it", () => {
    const files = rootSite();
    expect(describeTree(tree(files, "de").root)).toEqual([
      "Kapitel → kapitel/index",
      "  Eins → kapitel/eins",
      "  Zwei → kapitel/zwei",
    ]);
    expect(describeTree(tree(files, "en").root)).toEqual([
      "chapter → en/chapter/index",
      "  One → en/chapter/one",
    ]);
  });

  it("suffixes: shared folders, the suffix left out of titles taken from file names", () => {
    const files = suffixSite();
    const en = tree(files, "en");
    expect(en.root.slug).toBe("index.en");
    expect(describeTree(en.root)).toEqual(["docs → docs/index", "  Setup → docs/setup.en"]);
    expect(describeTree(tree(files, "de").root)).toEqual([
      "docs → docs/index",
      "  Einrichten → docs/setup",
    ]);
  });

  it("frontmatter: pages of other languages in the same folder drop out", () => {
    const files = frontmatterSite();
    expect(describeTree(tree(files, "de").root)).toEqual([
      "blog → blog/index",
      "  Hallo → blog/hallo",
    ]);
    expect(describeTree(tree(files, "en").root)).toEqual([
      "blog → blog/index",
      "  Hello → blog/hello",
    ]);
  });

  it("paths in the options are language-neutral", () => {
    const files = folderSite();
    const opts = resolveOptions({
      rootPath: "docs",
      order: { docs: ["02-faq", "01-setup"] },
      nodeIcons: { "docs/01-setup": "lucide:wrench" },
      exclude: ["docs/02-faq"],
    });
    for (const [lang, slug] of [
      ["de", "de/docs/01-setup"],
      ["en", "en/docs/01-setup"],
    ] as const) {
      const t = buildTree(files, opts, lang, lang);
      const s = resolveScope(t, slug, opts, "docs/01-setup");
      expect(s?.root.slug).toBe(`${lang}/docs/${lang === "de" ? "index" : "index"}`);
      expect(s?.root.children.map((c) => [c.slug, c.icon])).toEqual([[slug, "lucide:wrench"]]);
    }
    // `order` is applied per language with the same keys.
    const ordered = tree(files, "en", { order: { docs: ["02-faq", "01-setup"] } });
    expect(ordered.folders.get("docs")!.children.map((c) => c.title)).toEqual([
      "Questions",
      "Setup",
    ]);
    // hideOutsideRoot compares language-neutral paths.
    const t = buildTree(files, opts, "en", "en");
    expect(resolveScope(t, "en/index", opts, "index")).toBeUndefined();
  });

  it("the pager stays inside the page's language", () => {
    const files = rootSite();
    const opts = resolveOptions({ variant: "pager" });
    const de = buildTree(files, opts, "de", "de");
    const last = resolveScope(de, "kapitel/zwei", opts, "kapitel/zwei")!;
    expect(pagerNeighbours(de, last, opts)).toMatchObject({ prev: { slug: "kapitel/eins" } });
    expect(pagerNeighbours(de, last, opts).next).toBeUndefined();
    const en = buildTree(files, opts, "en", "en");
    const home = resolveScope(en, "en/index", opts, "index")!;
    expect(pagerNeighbours(en, home, opts).next?.slug).toBe("en/chapter/index");
  });
});

const props = (files: FileData[], slug: string, locale = "de-DE") =>
  ({
    ctx: { argv: { serve: false } },
    fileData: files.find((f) => f.slug === slug) ?? { slug },
    cfg: { pageTitle: "Site", locale },
    externalResources: { css: [], js: [], additionalHead: [] },
    children: [],
    tree: {},
    allFiles: files,
  }) as unknown as QuartzComponentProps;

type VNode = { type: unknown; props: Record<string, any> };

function walk(node: unknown, out: VNode[] = []): VNode[] {
  if (Array.isArray(node)) node.forEach((n) => walk(n, out));
  else if (node && typeof node === "object" && "type" in node) {
    const v = node as VNode;
    if (typeof v.type === "function") walk((v.type as (p: unknown) => unknown)(v.props), out);
    else {
      out.push(v);
      walk(v.props?.children, out);
    }
  }
  return out;
}

function text(node: unknown): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(text).join("");
  return text((node as VNode).props?.children);
}

function render(opts: NavigationOptions, files: FileData[], slug: string, locale?: string) {
  return Navigation({ breakpoints: { mobile: "700px" }, ...opts })(
    props(files, slug, locale),
  ) as VNode | null;
}

/** Build warnings apart from the one about the test environment's missing variables.scss. */
const warnings = () =>
  warn.mock.calls.map((c) => String(c[0])).filter((m) => !m.includes("variables.scss"));

const links = (nav: VNode | null) =>
  walk(nav)
    .filter((v) => v.type === "a")
    .map((a) => text(a));

describe("Navigation with quartz-multilanguage", () => {
  it("auto: each page gets the navigation of its language, with its words", () => {
    const files = rootSite();
    const de = render({ showHome: true }, files, "kapitel/eins")!;
    expect(links(de)).toEqual(["Start", "Kapitel", "Eins", "Zwei"]);
    expect(de.props["aria-label"]).toBe("Hauptnavigation");
    const en = render({ showHome: true }, files, "en/chapter/one")!;
    expect(links(en)).toEqual(["Home", "chapter", "One"]);
    expect(en.props["aria-label"]).toBe("Main navigation");
    const pager = render({ variant: "pager" }, files, "en/chapter/one")!;
    expect(text(pager)).toContain("Previous");
  });

  it("marks a generated folder page of the current language active", () => {
    const nav = render({}, folderSite(), "en/docs/index")!;
    const active = walk(nav).filter(
      (v) => v.type === "li" && String(v.props.class).split(" ").includes("active"),
    );
    expect(active.map((l) => l.props["data-slug"])).toEqual(["en/docs/index"]);
  });

  it("all: ignores languages, as before", () => {
    const nav = render({ language: "all", depth: 1 }, rootSite(), "kapitel/eins")!;
    expect(links(nav)).toEqual(["Home", "Kapitel"]); // the `en` folder, titled by en/index
  });

  it("a fixed language shows that language on every page", () => {
    const nav = render({ language: "en-US", depth: 1 }, rootSite(), "kapitel/eins")!;
    expect(links(nav)).toEqual(["chapter"]);
  });

  it("warns about a fixed language no page carries", () => {
    expect(render({ language: "fr" }, rootSite(), "kapitel/eins")).toBeNull();
    expect(warnings()).toEqual(["[navigations] `language: fr` matches no page language (de, en)."]);
    render({ language: "fr" }, [page("x", "x.md")], "x");
    expect(warnings()).toHaveLength(1);
  });

  it("rootPath naming a language folder keeps working, as before the language mode", () => {
    const files = rootSite();
    const en = { rootPath: "en", variant: "tree" } as const;
    expect(render(en, files, "kapitel/eins")).toBeNull();
    const nav = render(en, files, "en/chapter/one")!;
    expect(links(nav)).toEqual(["chapter", "One"]);
    expect(nav.props["aria-label"]).toBe("Main navigation");
    expect(render({ variant: "pager", rootPath: "en" }, files, "en/index")).not.toBeNull();
    // The German counterpart of the old configuration.
    expect(render({ exclude: ["en"] }, files, "en/chapter/one")).toBeNull();
    expect(links(render({ exclude: ["en"] }, files, "kapitel/eins"))).toEqual([
      "Kapitel",
      "Eins",
      "Zwei",
    ]);
    // Without hideOutsideRoot the English tree shows on German pages, too.
    const everywhere = render({ rootPath: "en", hideOutsideRoot: false }, files, "kapitel/eins");
    expect(links(everywhere)).toEqual(["chapter", "One"]);
    expect(warnings()).toEqual([]);
  });

  it("showScopeRoot renders no nameless row for a language tree without a start page", () => {
    const files = frontmatterSite();
    const en = walk(render({ showScopeRoot: true }, files, "blog/hello"));
    expect(en.some((v) => String(v.props.class).includes("quartz-nav__root-link"))).toBe(false);
    const de = walk(render({ showScopeRoot: true }, files, "blog/hallo"));
    const rootLink = de.find((v) => String(v.props.class).includes("quartz-nav__root-link"));
    expect(text(rootLink)).toBe("Start");
  });

  it("rejects values that are no language", () => {
    expect(resolveOptions({ language: "deutsch mit umlaut" }).language).toBe("auto");
    expect(String(warn.mock.calls[0]?.[0])).toContain("`language`");
  });
});
