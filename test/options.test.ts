import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { defaultOptions, normalizePath, resolveOptions, treeOptionsKey } from "../src/options";
import { resetWarnings } from "../src/util/warn";

let warn: ReturnType<typeof vi.spyOn>;
beforeEach(() => {
  resetWarnings();
  warn = vi.spyOn(console, "warn").mockImplementation(() => {});
});
afterEach(() => warn.mockRestore());

describe("resolveOptions", () => {
  it("returns the defaults when called without arguments", () => {
    const opts = resolveOptions();
    expect(opts.variant).toBe(defaultOptions.variant);
    expect(opts.sort).toBe("manual");
    expect(opts.frontmatterKeys).toEqual(defaultOptions.frontmatterKeys);
    expect(opts.depth).toBe(0);
    expect(warn).not.toHaveBeenCalled();
  });

  it("falls back on unknown enum values and warns once", () => {
    const opts = resolveOptions({ variant: "carousel" as never, scope: "nope" as never });
    expect(opts.variant).toBe("vertical");
    expect(opts.scope).toBe("root");
    expect(warn).toHaveBeenCalledTimes(2);
    resolveOptions({ variant: "carousel" as never });
    expect(warn).toHaveBeenCalledTimes(2);
  });

  it("normalizes rootPath and order keys", () => {
    const opts = resolveOptions({
      rootPath: "/docs/index.md",
      order: { "/": ["docs/", "blog"], "docs/index": ["02-setup.md", "01-intro"] },
    });
    expect(opts.rootPath).toBe("docs");
    expect(opts.order).toEqual({ "": ["docs", "blog"], docs: ["02-setup", "01-intro"] });
  });

  it("rejects negative depth and non-integers", () => {
    expect(resolveOptions({ depth: -1 }).depth).toBe(0);
    expect(resolveOptions({ depth: 1.5 }).depth).toBe(0);
    expect(resolveOptions({ depth: "2" as never }).depth).toBe(2);
    expect(warn).toHaveBeenCalledTimes(2);
  });

  it("keeps custom frontmatter keys and fills missing ones", () => {
    const opts = resolveOptions({ frontmatterKeys: { order: "weight" } });
    expect(opts.frontmatterKeys).toEqual({
      order: "weight",
      title: "navTitle",
      hide: "navHide",
      icon: "navIcon",
    });
  });

  it("sanitizes the id for use in element ids", () => {
    expect(resolveOptions({ id: "main nav/1" }).id).toBe("main-nav-1");
  });

  it("drops invalid include/exclude entries", () => {
    const opts = resolveOptions({ exclude: ["private/**", 3 as never, " "] });
    expect(opts.exclude).toEqual(["private/**"]);
  });
});

describe("normalizePath", () => {
  it("treats folder spellings alike", () => {
    for (const s of ["docs", "docs/", "/docs", "docs/index", "docs/index.md", "docs.md"]) {
      expect(normalizePath(s)).toBe("docs");
    }
    expect(normalizePath("index")).toBe("");
    expect(normalizePath("")).toBe("");
  });
});

describe("treeOptionsKey", () => {
  it("ignores presentation options", () => {
    const a = treeOptionsKey(resolveOptions({ variant: "accordion", depth: 2 }));
    const b = treeOptionsKey(resolveOptions({ variant: "dropdown", rootPath: "docs" }));
    expect(a).toBe(b);
    expect(treeOptionsKey(resolveOptions({ sort: "date" }))).not.toBe(a);
  });
});
