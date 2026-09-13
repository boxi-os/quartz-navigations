import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { resolveOptions } from "../src/options";
import { chainOf, flatten, pagerNeighbours, resolveScope } from "../src/scope";
import { linkTarget } from "../src/links";
import { buildTree } from "../src/tree";
import type { NavigationOptions } from "../src/types";
import { resetWarnings } from "../src/util/warn";
import { page, site } from "./fixture";

let warn: ReturnType<typeof vi.spyOn>;
beforeEach(() => {
  resetWarnings();
  warn = vi.spyOn(console, "warn").mockImplementation(() => {});
});
afterEach(() => warn.mockRestore());

function scope(slug: string, userOpts: NavigationOptions = {}) {
  const opts = resolveOptions(userOpts);
  const tree = buildTree(site(), opts);
  return { tree, opts, scope: resolveScope(tree, slug, opts) };
}

describe("chainOf", () => {
  it("walks from the current node to the root", () => {
    const tree = buildTree(site(), resolveOptions());
    expect(chainOf(tree, "docs/guides/alpha").map((n) => n.slug)).toEqual([
      "docs/guides/alpha",
      "docs/guides/index",
      "docs/index",
      "index",
    ]);
    expect(chainOf(tree, "tags/foo")).toEqual([]);
  });
});

describe("resolveScope", () => {
  it("scope root shows the site root with the ancestors as trail", () => {
    const { scope: s } = scope("docs/guides/alpha");
    expect(s?.root.slug).toBe("index");
    expect(s?.current?.slug).toBe("docs/guides/alpha");
    expect([...s!.trail]).toEqual(["docs/guides/index", "docs/index", "index"]);
  });

  it("scope section picks the top-level folder of the current page", () => {
    expect(scope("docs/guides/alpha", { scope: "section" }).scope?.root.slug).toBe("docs/index");
    expect(scope("docs/index", { scope: "section" }).scope?.root.slug).toBe("docs/index");
    // A page directly below the root has no section.
    expect(scope("index", { scope: "section" }).scope).toBeUndefined();
    expect(scope("tags/foo", { scope: "section" }).scope).toBeUndefined();
  });

  it("scope parent and current resolve relative to the page's folder", () => {
    expect(scope("docs/guides/alpha", { scope: "parent" }).scope?.root.slug).toBe(
      "docs/guides/index",
    );
    expect(scope("docs/guides/index", { scope: "parent" }).scope?.root.slug).toBe("docs/index");
    expect(scope("docs/guides/index", { scope: "current" }).scope?.root.slug).toBe(
      "docs/guides/index",
    );
    expect(scope("docs/01-intro", { scope: "current" }).scope?.root.slug).toBe("docs/index");
    expect(scope("index", { scope: "parent" }).scope?.root.slug).toBe("index");
    expect(scope("tags/foo", { scope: "parent" }).scope).toBeUndefined();
  });

  it("rootPath restricts the tree and hides the navigation elsewhere", () => {
    expect(scope("docs/01-intro", { rootPath: "docs" }).scope?.root.slug).toBe("docs/index");
    expect(scope("docs/index", { rootPath: "docs" }).scope?.root.slug).toBe("docs/index");
    expect(scope("blog/first", { rootPath: "docs" }).scope).toBeUndefined();
    expect(scope("blog/first", { rootPath: "docs", hideOutsideRoot: false }).scope?.root.slug).toBe(
      "docs/index",
    );
    // Section relative to rootPath: the level-1 folder below docs.
    expect(
      scope("docs/guides/alpha", { rootPath: "docs", scope: "section" }).scope?.root.slug,
    ).toBe("docs/guides/index");
  });

  it("warns and renders nothing for an unknown rootPath", () => {
    expect(scope("index", { rootPath: "nope" }).scope).toBeUndefined();
    expect(warn).toHaveBeenCalledTimes(1);
  });
});

describe("flatten and pagerNeighbours", () => {
  it("flattens in tree order and honours depth", () => {
    const { tree, opts } = scope("index");
    expect(flatten(tree.root, opts).map((n) => n.slug)).toEqual([
      "blog/index",
      "blog/first",
      "blog/second",
      "blog/undated",
      "docs/index",
      "docs/guides/index",
      "docs/guides/beta",
      "docs/guides/alpha",
      "docs/01-intro",
      "docs/02-setup",
      "docs/03-advanced",
      "orte/index",
      "orte/huettendorf",
      "private/index",
      "private/secret",
    ]);
    const shallow = scope("index", { depth: 1 });
    expect(flatten(shallow.tree.root, shallow.opts).map((n) => n.slug)).toEqual([
      "blog/index",
      "docs/index",
      "orte/index",
      "private/index",
    ]);
  });

  it("finds previous and next across the tree, including folder index pages", () => {
    const { tree, opts, scope: s } = scope("docs/guides/alpha");
    const { prev, next } = pagerNeighbours(tree, s!, opts);
    expect(prev?.slug).toBe("docs/guides/beta");
    expect(next?.slug).toBe("docs/01-intro");

    const first = scope("index");
    const atRoot = pagerNeighbours(first.tree, first.scope!, first.opts);
    expect(atRoot.prev).toBeUndefined();
    expect(atRoot.next?.slug).toBe("blog/index");
  });

  it("skips folders without a link and can stay within siblings", () => {
    const noIndex = scope("orte/huettendorf", { folderLink: "none" });
    expect(pagerNeighbours(noIndex.tree, noIndex.scope!, noIndex.opts).prev?.slug).toBe(
      "docs/03-advanced",
    );
    const siblings = scope("docs/01-intro", { pager: { order: "siblings" } });
    const n = pagerNeighbours(siblings.tree, siblings.scope!, siblings.opts);
    expect(n.prev?.slug).toBe("docs/guides/index");
    expect(n.next?.slug).toBe("docs/02-setup");
  });

  it("never links to the current page when a folder row targets its first page", () => {
    // No `docs/index`: the folder row links to `docs/one`, like `folderLink: first-child`.
    const files = [
      page("index", "index.md", { title: "Home" }),
      page("docs/one", "docs/one.md", { title: "One" }),
      page("docs/two", "docs/two.md", { title: "Two" }),
      page("zeta", "zeta.md", { title: "Zeta" }),
    ];
    const at = (slug: string, userOpts: NavigationOptions = {}) => {
      const opts = resolveOptions(userOpts);
      const tree = buildTree(files, opts);
      const s = resolveScope(tree, slug, opts)!;
      const { prev, next } = pagerNeighbours(tree, s, opts);
      return { prev: prev && linkTarget(prev, opts), next: next && linkTarget(next, opts) };
    };
    expect(at("docs/one")).toEqual({ prev: "index", next: "docs/two" });
    expect(at("docs/two")).toEqual({ prev: "docs/one", next: "zeta" });
    expect(at("index")).toEqual({ prev: undefined, next: "docs/one" });

    // With `first-child` every folder row targets its first page; the folder's own index
    // page still gets a pager, and the first page never points back at itself.
    const withIndex = scope("docs/index", { folderLink: "first-child" });
    const onIndex = pagerNeighbours(withIndex.tree, withIndex.scope!, withIndex.opts);
    expect(onIndex.next?.slug).toBe("docs/guides/beta");
    const first = scope("docs/guides/beta", { folderLink: "first-child" });
    const onFirst = pagerNeighbours(first.tree, first.scope!, first.opts);
    expect(onFirst.prev?.slug).toBe("docs/index");
    expect(linkTarget(onFirst.prev!, first.opts)).not.toBe("docs/guides/beta");
  });
});
