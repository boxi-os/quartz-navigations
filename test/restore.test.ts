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
    expect(root.classList.contains("quartz-nav-rail-push-left")).toBe(true);
    expect(root.classList.contains("quartz-nav-rail-instant")).toBe(true);
    expect(root.style.getPropertyValue("--quartz-nav-rail-offset-left")).toBe("320px");
    expect(style()).toContain('nav[data-quartz-nav="demo-rail"]{--_rail-top:69px}');
    expect(style()).toContain(
      'nav[data-quartz-nav="demo-rail"]>.quartz-nav__panel{visibility:visible;transform:none;',
    );
    expect(style()).toContain(".quartz-nav__icon--unpin{display:inline-flex}");
  });

  it("overlays instead of pushing below the mobile breakpoint, and skips small screens", () => {
    localStorage.setItem(
      "quartz-nav:l:rail-pinned",
      JSON.stringify({ side: "left", px: 320, bp: 900 }),
    );
    width(1100); // 1100 - 320 = 780 < 900
    run();
    expect(root.classList.contains("quartz-nav-rail-push-left")).toBe(false);
    expect(style()).toContain('nav[data-quartz-nav="l"]>.quartz-nav__panel{visibility:visible');
    expect(style()).toContain("box-shadow");

    document.getElementById("quartz-nav-rail-restore")?.remove();
    root.className = "";
    width(800);
    run();
    expect(document.getElementById("quartz-nav-rail-restore")).toBeNull();
  });

  it("counts a rail on the other side and takes up a fresh carry-over only", () => {
    localStorage.setItem(
      "quartz-nav:l:rail-pinned",
      JSON.stringify({ side: "left", px: 320, bp: 900 }),
    );
    sessionStorage.setItem(
      "quartz-nav:r:rail-carry",
      JSON.stringify({ how: "click", at: Date.now(), side: "right", px: 320, bp: 900 }),
    );
    sessionStorage.setItem(
      "quartz-nav:old:rail-carry",
      JSON.stringify({ how: "click", at: Date.now() - 60000, side: "right", px: 320, bp: 900 }),
    );
    width(1500); // 1500 - 320 - 320 = 860 < 900: only one side pushes
    run();
    const pushed = ["left", "right"].filter((s) =>
      root.classList.contains(`quartz-nav-rail-push-${s}`),
    );
    expect(pushed).toHaveLength(1);
    expect(style()).toContain('nav[data-quartz-nav="r"]>');
    expect(style()).not.toContain('nav[data-quartz-nav="old"]');
  });

  it("ignores malformed records and unsafe ids", () => {
    localStorage.setItem("quartz-nav:a:rail-pinned", "true");
    localStorage.setItem("quartz-nav:b:rail-pinned", "{broken");
    localStorage.setItem(
      'quartz-nav:x"]{}:rail-pinned',
      JSON.stringify({ side: "left", px: 1, bp: 1 }),
    );
    run();
    expect(root.className).toBe("");
    expect(document.getElementById("quartz-nav-rail-restore")).toBeNull();
  });
});
