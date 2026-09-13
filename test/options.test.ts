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
    expect(opts.variant).toBe("tree");
    expect(opts.scope).toBe("root");
    expect(warn).toHaveBeenCalledTimes(2);
    resolveOptions({ variant: "carousel" as never });
    expect(warn).toHaveBeenCalledTimes(2);
  });

  it("maps the 0.1 option names and warns about the removed style option", () => {
    const opts = resolveOptions({
      variant: "horizontal",
      dropdownTrigger: "hover",
      style: "basic",
    } as never);
    expect(opts.variant).toBe("bar");
    expect(opts.trigger).toBe("hover");
    expect(warn).toHaveBeenCalledTimes(3);
    expect(resolveOptions({ variant: "vertical" } as never).variant).toBe("tree");
    expect(resolveOptions({ trigger: "hover", dropdownTrigger: "click" } as never).trigger).toBe(
      "hover",
    );
  });

  it("fills missing icon names and defaults folder rows to toggling", () => {
    expect(resolveOptions().folderClick).toBe("toggle");
    expect(resolveOptions({ iconNames: { chevron: "chevron-right" } }).iconNames).toEqual({
      folder: "folder",
      folderOpen: "folder-open",
      file: "file",
      home: "house",
      chevron: "chevron-right",
      menu: "menu",
      close: "x",
      previous: "chevron-left",
      next: "chevron-right",
    });
  });

  it("resolves icon modes, booleans and the nodeIcons map", () => {
    expect(resolveOptions().icons).toBe("both");
    expect(resolveOptions({ icons: true }).icons).toBe("both");
    expect(resolveOptions({ icons: false }).icons).toBe("none");
    expect(resolveOptions({ icons: "type" }).icons).toBe("type");
    expect(resolveOptions({ icons: "nope" as never }).icons).toBe("both");
    expect(warn).toHaveBeenCalledTimes(1);
    const opts = resolveOptions({
      nodeIcons: { "/docs/": "lucide:book-open", "docs/api.md": "🧩", bad: 3 as never },
    });
    expect(opts.nodeIcons).toEqual({ docs: "lucide:book-open", "docs/api": "🧩" });
    expect(treeOptionsKey(opts)).not.toBe(treeOptionsKey(resolveOptions()));
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
