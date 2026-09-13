import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { resolveOptions } from "../src/options";
import { buildTree, treeFromFiles } from "../src/tree";
import type { NavigationOptions, NavNode } from "../src/types";
import { resetWarnings } from "../src/util/warn";
import { page, site, virtualFolder } from "./fixture";

let warn: ReturnType<typeof vi.spyOn>;
beforeEach(() => {
  resetWarnings();
  warn = vi.spyOn(console, "warn").mockImplementation(() => {});
});
afterEach(() => warn.mockRestore());

function tree(opts: NavigationOptions = {}, files = site()) {
  return buildTree(files, resolveOptions(opts));
}

function titles(nodes: NavNode[]): string[] {
  return nodes.map((n) => n.title);
}

function node(t: ReturnType<typeof tree>, slug: string): NavNode {
  const n = t.bySlug.get(slug);
  if (!n) throw new Error(`missing ${slug}`);
  return n;
}

describe("buildTree", () => {
  it("builds folders from slugs and keeps the root as a folder with an index", () => {
    const t = tree();
    expect(t.root.kind).toBe("folder");
    expect(t.root.slug).toBe("index");
    expect(t.root.hasIndex).toBe(true);
    expect(t.root.title).toBe("Home");
    expect(t.root.depth).toBe(0);
    expect(titles(t.root.children)).toEqual(["Blog", "Documentation", "Orte", "private"]);
    expect(titles(node(t, "orte/index").children)).toEqual(["Hüttendorf"]);
  });

  it("sorts folders first, then manual cascade: order map, navOrder, numeric prefix, title", () => {
    const docs = node(tree(), "docs/index");
    expect(titles(docs.children)).toEqual(["Guides", "Intro", "Setup", "03 Advanced"]);
    expect(node(tree(), "docs/01-intro").prefixOrder).toBe(1);

    const guides = node(tree(), "docs/guides/index");
    expect(titles(guides.children)).toEqual(["Beta", "Alpha"]);

    const ordered = node(
      tree({ order: { docs: ["02-setup", "guides", "01 Intro"] }, foldersFirst: "mixed" }),
      "docs/index",
    );
    expect(titles(ordered.children)).toEqual(["Setup", "Guides", "Intro", "03 Advanced"]);
    expect(warn).not.toHaveBeenCalled();
  });

  it("warns about unknown entries in the order map", () => {
    tree({ order: { docs: ["nope"] } });
    expect(warn).toHaveBeenCalledTimes(1);
    expect(String(warn.mock.calls[0]?.[0])).toContain('"nope"');
  });

  it("derives folder titles from the index page, the directory name or the segment", () => {
    const t = tree();
    expect(node(t, "docs/index").title).toBe("Documentation");
    expect(node(t, "docs/index").isVirtual).toBe(false);
    // Virtual folder page whose title came from folder-page; the real directory is "Guides".
    expect(node(t, "docs/guides/index").title).toBe("Guides");
    expect(node(t, "docs/guides/index").isVirtual).toBe(true);
    expect(node(t, "docs/guides/index").hasIndex).toBe(true);
    // No index at all: the directory name of a real child wins over the slug segment.
    expect(node(t, "orte/index").title).toBe("Orte");
    expect(node(t, "orte/index").hasIndex).toBe(false);
  });

  it("prefers navTitle over title", () => {
    const files = [page("a", "A.md", { title: "Alpha", navTitle: "Short" })];
    expect(node(tree({}, files), "a").title).toBe("Short");
  });

  it("strips numeric prefixes from titles that come from file names", () => {
    const docs = node(tree({ stripNumericPrefix: true }), "docs/index");
    expect(titles(docs.children)).toEqual(["Guides", "Intro", "Setup", "Advanced"]);
    const files = [page("01-a", "01-a.md", { title: "01. Keep me" })];
    expect(node(tree({ stripNumericPrefix: true }, files), "01-a").title).toBe("Keep me");
    expect(node(tree({}, files), "01-a").title).toBe("01. Keep me");
  });

  it("hides tags, 404, unlisted and draft pages by default", () => {
    const t = tree();
    for (const slug of ["tags/index", "tags/foo", "404", "about-hidden", "draft-page"]) {
      expect(t.bySlug.has(slug)).toBe(false);
    }
    const shown = tree({ hideTags: false, hideUnlisted: false, hideDrafts: false });
    expect(shown.bySlug.has("tags/foo")).toBe(true);
    expect(shown.bySlug.has("about-hidden")).toBe(true);
    expect(shown.bySlug.has("draft-page")).toBe(true);
  });

  it("hides pages and whole folders via navHide", () => {
    const t = tree();
    expect(t.bySlug.has("docs/hidden")).toBe(false);
    expect(t.bySlug.has("archive/index")).toBe(false);
    expect(t.bySlug.has("archive/old")).toBe(false);
    const custom = tree({ frontmatterKeys: { hide: "secret" } });
    expect(custom.bySlug.has("docs/hidden")).toBe(true);
  });

  it("applies exclude and include globs to pages and subtrees", () => {
    expect(tree().bySlug.has("private/secret")).toBe(true);
    const ex = tree({ exclude: ["private/**", "docs/guides"] });
    expect(ex.bySlug.has("private/secret")).toBe(false);
    expect(ex.bySlug.has("private/index")).toBe(false);
    expect(ex.bySlug.has("docs/guides/alpha")).toBe(false);
    expect(ex.bySlug.has("docs/guides/index")).toBe(false);
    expect(ex.bySlug.has("docs/01-intro")).toBe(true);

    const inc = tree({ include: ["docs"] });
    expect(titles(inc.root.children)).toEqual(["Documentation"]);
    expect(inc.bySlug.has("docs/guides/alpha")).toBe(true);
    expect(inc.bySlug.has("blog/first")).toBe(false);
  });

  it("drops empty folders unless they keep an index page", () => {
    // `blog/*` would also match `blog/index`; name the pages to keep the folder page.
    const posts = ["blog/first", "blog/second", "blog/undated"];
    const kept = tree({ exclude: posts });
    expect(kept.bySlug.has("blog/index")).toBe(true);
    expect(node(kept, "blog/index").children).toEqual([]);
    const dropped = tree({ exclude: posts, keepIndexOnlyFolders: false });
    expect(dropped.bySlug.has("blog/index")).toBe(false);
    const shown = tree({ exclude: posts, hideEmptyFolders: false });
    expect(shown.bySlug.has("blog/index")).toBe(true);
    // Excluding the index itself removes the folder entirely.
    expect(tree({ exclude: ["blog/*"] }).bySlug.has("blog/index")).toBe(false);
  });

  it("sorts by date with undated pages last, in both directions", () => {
    const asc = node(tree({ sort: "date" }), "blog/index");
    expect(titles(asc.children)).toEqual(["First post", "Second post", "Undated post"]);
    const desc = node(tree({ sort: "date", sortDirection: "desc" }), "blog/index");
    expect(titles(desc.children)).toEqual(["Second post", "First post", "Undated post"]);
    const modified = node(tree({ sort: "date", dateField: "modified" }), "blog/index");
    expect(titles(modified.children)).toEqual(["Second post", "First post", "Undated post"]);
  });

  it("supports alphabetical sorting with folders last or mixed", () => {
    const last = tree({ sort: "alphabetical", foldersFirst: "last" });
    expect(titles(last.root.children)).toEqual(["Blog", "Documentation", "Orte", "private"]);
    const docsLast = node(last, "docs/index");
    expect(titles(docsLast.children)).toEqual(["03 Advanced", "Intro", "Setup", "Guides"]);
    const mixed = tree({ sort: "alphabetical", foldersFirst: "mixed" });
    const docsMixed = node(mixed, "docs/index");
    expect(titles(docsMixed.children)).toEqual(["03 Advanced", "Guides", "Intro", "Setup"]);
  });

  it("sorts titles naturally so 2 comes before 10", () => {
    const files = [
      page("a/10-ten", "a/10 Ten.md"),
      page("a/2-two", "a/2 Two.md"),
      page("a/1-one", "a/1 One.md"),
    ];
    const a = node(tree({ sort: "alphabetical" }, files), "a/index");
    expect(titles(a.children)).toEqual(["1 One", "2 Two", "10 Ten"]);
  });

  it("reads navIcon and nodeIcons unless custom icons are off", () => {
    const files = [page("a", "A.md", { navIcon: "📘" }), page("b/c", "b/C.md")];
    expect(node(tree({}, files), "a").icon).toBe("📘");
    expect(node(tree({ icons: "type" }, files), "a").icon).toBeUndefined();
    expect(node(tree({ icons: "none" }, files), "a").icon).toBeUndefined();
    const mapped = tree(
      { nodeIcons: { a: "lucide:star", b: "lucide:folder-tree", "b/c": "none" } },
      files,
    );
    expect(node(mapped, "a").icon).toBe("📘"); // frontmatter wins
    expect(node(mapped, "b/index").icon).toBe("lucide:folder-tree");
    expect(node(mapped, "b/c").icon).toBe("none");
  });

  it("treats folder notes and _index as folder pages", () => {
    const files = [
      page("notes/index", "notes/notes.md", { title: "Notes" }),
      page("notes/one", "notes/One.md"),
      virtualFolder("misc/index", "misc"),
    ];
    const t = tree({}, files);
    expect(node(t, "notes/index").hasIndex).toBe(true);
    expect(node(t, "notes/index").isVirtual).toBe(false);
    expect(node(t, "misc/index").title).toBe("misc");
  });

  it("keeps a page and a folder with the same name, whatever the file order", () => {
    const files = [
      page("index", "index.md", { title: "Home" }),
      page("about", "about.md", { title: "About" }),
      page("about/team", "about/team.md", { title: "Team" }),
    ];
    for (const order of [files, [files[0]!, files[2]!, files[1]!]]) {
      const t = tree({}, order);
      expect(t.root.children.map((n) => `${n.kind}:${n.slug}`)).toEqual([
        "folder:about/index",
        "page:about",
      ]);
      expect(node(t, "about/index").children.map((n) => n.slug)).toEqual(["about/team"]);
      expect(node(t, "about").kind).toBe("page");
    }
  });

  it("sorts alphabetically with the site's locale instead of the build machine's", () => {
    // Swedish sorts ä after z; German and the root locale sort it next to a.
    const files = [
      page("index", "index.md", { title: "Home" }),
      page("aerger", "Ärger.md", { title: "Ärger" }),
      page("zebra", "Zebra.md", { title: "Zebra" }),
      page("apfel", "Apfel.md", { title: "Apfel" }),
    ];
    const opts = resolveOptions({ sort: "alphabetical" });
    expect(titles(buildTree(files, opts, "de-DE").root.children)).toEqual([
      "Apfel",
      "Ärger",
      "Zebra",
    ]);
    expect(titles(buildTree(files, opts, "sv-SE").root.children)).toEqual([
      "Apfel",
      "Zebra",
      "Ärger",
    ]);
  });
});

describe("treeFromFiles", () => {
  it("caches per allFiles identity, tree options and locale", () => {
    const files = site();
    const a = treeFromFiles(files, resolveOptions({ variant: "accordion" }));
    const b = treeFromFiles(files, resolveOptions({ variant: "dropdown", depth: 2 }));
    expect(a).toBe(b);
    const c = treeFromFiles(files, resolveOptions({ sort: "date" }));
    expect(c).not.toBe(a);
    const d = treeFromFiles(site(), resolveOptions());
    expect(d).not.toBe(a);
    const e = treeFromFiles(files, resolveOptions(), "de-DE");
    expect(e).not.toBe(a);
    expect(treeFromFiles(files, resolveOptions(), "de-DE")).toBe(e);
  });
});
