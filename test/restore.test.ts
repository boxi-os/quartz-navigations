// @vitest-environment jsdom
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

/**
 * The early script runs in <head> before the first paint (Quartz's prescript) and repeats a
 * restored rail menu from storage. Run it the way the browser does: once, as a classic script.
 */
const source = ts.transpileModule(
  fs.readFileSync(path.join(__dirname, "../src/scripts/rail-restore.inline.ts"), "utf8"),
  { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.None } },
).outputText;
const run = () => new Function(source)();

const root = document.documentElement;
const style = () => document.getElementById("quartz-nav-rail-restore")?.textContent ?? "";
const width = (value: number) =>
  Object.defineProperty(window, "innerWidth", { value, configurable: true });

/** A Storage with `length` and `key()`, which the script walks to find the stored menus. */
class MemoryStorage {
  private map = new Map<string, string>();
  get length() {
    return this.map.size;
  }
  key(i: number) {
    return [...this.map.keys()][i] ?? null;
  }
  getItem(k: string) {
    return this.map.get(k) ?? null;
  }
  setItem(k: string, v: string) {
    this.map.set(k, String(v));
  }
  removeItem(k: string) {
    this.map.delete(k);
  }
  clear() {
    this.map.clear();
  }
}

beforeAll(() => {
  for (const name of ["localStorage", "sessionStorage"]) {
    const store = new MemoryStorage();
    for (const target of [globalThis, window]) {
      Object.defineProperty(target, name, { value: store, configurable: true });
    }
  }
});

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  document.getElementById("quartz-nav-rail-restore")?.remove();
  root.className = "";
  root.removeAttribute("style");
  width(1700);
});

describe("rail restore script", () => {
  it("does nothing without stored menus", () => {
    run();
    expect(root.className).toBe("");
    expect(document.getElementById("quartz-nav-rail-restore")).toBeNull();
  });

  it("shows a pinned menu open and pushes the page before the main script runs", () => {
    localStorage.setItem(
      "quartz-nav:demo-rail:rail-pinned",
      JSON.stringify({ side: "left", px: 320, bp: 900 }),
    );
    localStorage.setItem("quartz-nav:demo-rail:rail-top", "69");
    run();
    const nav = 'nav[data-quartz-nav="demo-rail"].quartz-nav--rail-left';
    expect(style()).toContain('nav[data-quartz-nav="demo-rail"]{--_rail-top:69px}');
    expect(style()).toContain(`${nav}>.quartz-nav__panel{visibility:visible;transform:none;`);
    expect(style()).toContain(".quartz-nav__icon--unpin{display:inline-flex}");
    // The padding only applies where that very navigation is on the page.
    expect(style()).toContain(`body:has(${nav}){padding-left:320px}`);
    // Nothing on <html> but the no-animation flag: a page without the rail stays as it is.
    expect(root.className).toBe("quartz-nav-rail-instant");
    expect(root.getAttribute("style")).toBeNull();
  });

  it("pushes for the permanent strip of `rest: icons` with `content: push`", () => {
    localStorage.setItem(
      "quartz-nav:strip:rail-strip",
      JSON.stringify({ side: "right", px: 56, bp: 900 }),
    );
    run();
    const nav = 'nav[data-quartz-nav="strip"].quartz-nav--rail-right.quartz-nav--rail-icons';
    expect(style()).toContain(`body:has(${nav}){padding-right:56px}`);
    expect(style()).not.toContain("visibility:visible");
  });

  it("lets an open menu win over the strip of the same navigation", () => {
    localStorage.setItem(
      "quartz-nav:x:rail-strip",
      JSON.stringify({ side: "left", px: 56, bp: 900 }),
    );
    localStorage.setItem(
      "quartz-nav:x:rail-pinned",
      JSON.stringify({ side: "left", px: 320, bp: 900 }),
    );
    run();
    expect(style()).toContain("padding-left:320px");
    expect(style()).not.toContain("padding-left:56px");
  });

  it("keeps the shadow of a menu laid over a page that the strip still pushes", () => {
    localStorage.setItem(
      "quartz-nav:over:rail-pinned",
      JSON.stringify({ side: "left", px: 56, bp: 900, over: true }),
    );
    run();
    const nav = 'nav[data-quartz-nav="over"].quartz-nav--rail-left';
    expect(style()).toContain(`body:has(${nav}){padding-left:56px}`);
    expect(style()).toContain(`${nav}>.quartz-nav__panel{box-shadow:var(--quartz-nav-shadow)}`);
  });

  it("overlays instead of pushing below the mobile breakpoint, and skips small screens", () => {
    localStorage.setItem(
      "quartz-nav:l:rail-pinned",
      JSON.stringify({ side: "left", px: 320, bp: 900 }),
    );
    width(1100); // 1100 - 320 = 780 < 900
    run();
    expect(style()).not.toContain("padding-left");
    expect(style()).toContain(
      'nav[data-quartz-nav="l"].quartz-nav--rail-left>.quartz-nav__panel{visibility:visible',
    );
    expect(style()).toContain("box-shadow");

    document.getElementById("quartz-nav-rail-restore")?.remove();
    root.className = "";
    width(800);
    run();
    expect(document.getElementById("quartz-nav-rail-restore")).toBeNull();
    expect(root.className).toBe("");
  });

  it("counts a rail on the other side, left first, and takes up a fresh carry-over only", () => {
    sessionStorage.setItem(
      "quartz-nav:r:rail-carry",
      JSON.stringify({ how: "click", at: Date.now(), side: "right", px: 320, bp: 900 }),
    );
    localStorage.setItem(
      "quartz-nav:l:rail-pinned",
      JSON.stringify({ side: "left", px: 320, bp: 900 }),
    );
    sessionStorage.setItem(
      "quartz-nav:old:rail-carry",
      JSON.stringify({ how: "click", at: Date.now() - 60000, side: "right", px: 320, bp: 900 }),
    );
    width(1500); // 1500 - 320 - 320 = 860 < 900: only one side pushes, the left one
    run();
    expect(style()).toContain("padding-left:320px");
    expect(style()).not.toContain("padding-right");
    expect(style()).toContain('nav[data-quartz-nav="r"].quartz-nav--rail-right>');
    expect(style()).not.toContain('nav[data-quartz-nav="old"]');
  });

  it("ignores malformed records and unsafe ids", () => {
    localStorage.setItem("quartz-nav:a:rail-pinned", "true");
    localStorage.setItem("quartz-nav:b:rail-pinned", "{broken");
    localStorage.setItem(
      "quartz-nav:c:rail-pinned",
      JSON.stringify({ side: "left", px: -5, bp: 1 }),
    );
    localStorage.setItem(
      'quartz-nav:x"]{}:rail-pinned',
      JSON.stringify({ side: "left", px: 1, bp: 1 }),
    );
    run();
    expect(root.className).toBe("");
    expect(document.getElementById("quartz-nav-rail-restore")).toBeNull();
  });
});
