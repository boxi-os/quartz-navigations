// @vitest-environment jsdom
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

/**
 * Runs the browser script the way Quartz does: compiled to plain JS, evaluated once per page
 * load, driven by the `nav` event. jsdom provides window/document.
 */
const cleanups: (() => void)[] = [];
let mobile = false;

function details(slug: string, open: boolean, extra = "") {
  return `<li class="quartz-nav__item quartz-nav__item--folder quartz-nav__item--split">
    <a class="quartz-nav__link" href="./${slug}">${slug}</a>
    <details class="quartz-nav__folder" ${open ? "open" : ""} data-folder="${slug}" ${extra}>
      <summary class="quartz-nav__summary quartz-nav__summary--toggle"><span class="quartz-nav__sr-only">Expand ${slug}</span></summary>
      <ul class="quartz-nav__list" data-level="2"><li class="quartz-nav__item"><a class="quartz-nav__link quartz-nav__link--child" href="./x">x</a></li></ul>
    </details></li>`;
}

function mount(html: string) {
  document.documentElement.className = "";
  document.body.dataset.slug = "docs/index";
  document.body.dataset.basepath = "";
  document.body.innerHTML = `<main><button id="outside">outside</button></main>${html}`;
}

/** Listeners on the mobile media query; `resize()` flips `mobile` and fires them. */
const mediaListeners = new Set<() => void>();

function resize(toMobile: boolean) {
  mobile = toMobile;
  for (const fn of mediaListeners) fn();
}

async function nav() {
  for (const fn of cleanups.splice(0)) fn();
  document.dispatchEvent(new CustomEvent("nav", { detail: { url: "docs/index" } }) as never);
  await new Promise((r) => setTimeout(r, 0));
}

beforeAll(() => {
  const store = new Map<string, string>();
  const memoryStorage = {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, String(v)),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
  };
  for (const target of [globalThis, window]) {
    Object.defineProperty(target, "localStorage", { value: memoryStorage, configurable: true });
  }
  window.matchMedia = ((query: string) => ({
    get matches() {
      return query.includes("max-width") ? mobile : query.includes("hover") ? true : false;
    },
    media: query,
    addEventListener: (type: string, fn: () => void) => {
      if (type === "change" && query.includes("max-width")) mediaListeners.add(fn);
    },
    removeEventListener: (_type: string, fn: () => void) => void mediaListeners.delete(fn),
  })) as never;
  window.addCleanup = (fn) => cleanups.push(fn as () => void);
  // Quartz's SPA router takes link clicks over; jsdom would otherwise try to navigate.
  document.addEventListener("click", (e) => {
    if (e.target instanceof Element && e.target.closest("a[href]:not([href^='#'])"))
      e.preventDefault();
  });
  const source = fs.readFileSync(
    path.join(__dirname, "../src/scripts/navigations.inline.ts"),
    "utf8",
  );
  // esbuild refuses to run inside jsdom's realm, so strip types with the TypeScript compiler.
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.None },
  });
  new Function(outputText)();
});

beforeEach(() => {
  localStorage.clear();
  mobile = false;
  delete (window as { spaNavigate?: unknown }).spaNavigate;
});

describe("client script", () => {
  it("restores and stores accordion state when persistence is on", async () => {
    localStorage.setItem("quartz-nav:side", JSON.stringify({ "a/index": true, "b/index": false }));
    mount(
      `<nav data-quartz-nav="side" data-variant="accordion" data-persist="true" data-expand-active="true" data-bp-mobile="800px">
        <div class="quartz-nav__panel"><ul class="quartz-nav__list" data-level="1">
          ${details("a/index", false)}${details("b/index", true, 'data-trail="true"')}${details("c/index", false)}
        </ul></div></nav>`,
    );
    await nav();
    const all = document.querySelectorAll<HTMLDetailsElement>("details");
    expect(all[0]!.open).toBe(true); // stored open
    expect(all[1]!.open).toBe(true); // stored closed, but on the active trail
    expect(all[2]!.open).toBe(false); // untouched

    all[2]!.open = true;
    all[2]!.dispatchEvent(new Event("toggle"));
    // jsdom also fires `toggle` for folders that were open at parse time, so only the
    // entries this test changed are asserted.
    const stored = JSON.parse(localStorage.getItem("quartz-nav:side")!);
    expect(stored["a/index"]).toBe(true);
    expect(stored["c/index"]).toBe(true);
  });

  it("does not let a remembered folder evict the trail folder of its exclusive group", async () => {
    // `exclusive` renders `<details name>`; the browser keeps at most one of a group open, so
    // restoring "a" here would close "b", which is the folder the current page sits in.
    localStorage.setItem("quartz-nav:side", JSON.stringify({ "a/index": true }));
    mount(
      `<nav data-quartz-nav="side" data-variant="accordion" data-persist="true" data-expand-active="true" data-bp-mobile="800px">
        <div class="quartz-nav__panel"><ul class="quartz-nav__list" data-level="1">
          ${details("a/index", false, 'name="side-l1"')}${details("b/index", true, 'name="side-l1" data-trail="true"')}
        </ul></div></nav>`,
    );
    await nav();
    const all = document.querySelectorAll<HTMLDetailsElement>("details");
    expect(all[0]!.open).toBe(false); // remembered, but its group is claimed by the trail
    expect(all[1]!.open).toBe(true); // the page's own chapter stays open
  });

  it("still restores a remembered folder when no trail folder claims its group", async () => {
    // The front page of a site: nothing is on the trail, so persistence is the only opinion.
    localStorage.setItem("quartz-nav:side", JSON.stringify({ "a/index": true }));
    mount(
      `<nav data-quartz-nav="side" data-variant="accordion" data-persist="true" data-expand-active="true" data-bp-mobile="800px">
        <div class="quartz-nav__panel"><ul class="quartz-nav__list" data-level="1">
          ${details("a/index", false, 'name="side-l1"')}${details("b/index", false, 'name="side-l1"')}
        </ul></div></nav>`,
    );
    await nav();
    const all = document.querySelectorAll<HTMLDetailsElement>("details");
    expect(all[0]!.open).toBe(true);
    expect(all[1]!.open).toBe(false);
  });

  it("keeps a remembered folder of another exclusive group", async () => {
    // One group per level: a chapter on level 1 must not silence a remembered sub-folder that
    // belongs to a different group.
    localStorage.setItem("quartz-nav:side", JSON.stringify({ "deep/index": true }));
    mount(
      `<nav data-quartz-nav="side" data-variant="accordion" data-persist="true" data-expand-active="true" data-bp-mobile="800px">
        <div class="quartz-nav__panel"><ul class="quartz-nav__list" data-level="1">
          ${details("b/index", true, 'name="side-l1" data-trail="true"')}${details("deep/index", false, 'name="side-l2"')}
        </ul></div></nav>`,
    );
    await nav();
    const all = document.querySelectorAll<HTMLDetailsElement>("details");
    expect(all[0]!.open).toBe(true);
    expect(all[1]!.open).toBe(true);
  });

  it("leaves folders alone without persistence", async () => {
    localStorage.setItem("quartz-nav:side", JSON.stringify({ "a/index": true }));
    mount(
      `<nav data-quartz-nav="side" data-variant="accordion" data-bp-mobile="800px">
        <div class="quartz-nav__panel"><ul class="quartz-nav__list">${details("a/index", false)}</ul></div></nav>`,
    );
    await nav();
    expect(document.querySelector("details")!.open).toBe(false);
  });

  it("collapses mobile-only folders on small screens, except the active trail", async () => {
    const html = `<nav data-quartz-nav="top" data-variant="bar" data-mobile="accordion" data-bp-mobile="800px">
        <div class="quartz-nav__panel"><ul class="quartz-nav__list">
          ${details("a/index", true, 'data-mobile-collapsible="true"')}
          ${details("b/index", true, 'data-mobile-collapsible="true" data-trail="true"')}
        </ul></div></nav>`;
    mount(html);
    await nav();
    let all = document.querySelectorAll<HTMLDetailsElement>("details");
    expect([all[0]!.open, all[1]!.open]).toEqual([true, true]);

    mobile = true;
    mount(html);
    await nav();
    all = document.querySelectorAll<HTMLDetailsElement>("details");
    expect([all[0]!.open, all[1]!.open]).toEqual([false, true]);
  });

  it("follows the viewport when it crosses the mobile breakpoint", async () => {
    mount(
      `<nav data-quartz-nav="top" data-variant="bar" data-mobile="accordion" data-bp-mobile="800px">
        <div class="quartz-nav__panel"><ul class="quartz-nav__list">
          ${details("a/index", true, 'data-mobile-collapsible="true"')}
          ${details("b/index", true, 'data-mobile-collapsible="true" data-trail="true"')}
        </ul></div></nav>`,
    );
    await nav();
    const all = document.querySelectorAll<HTMLDetailsElement>("details");
    expect([all[0]!.open, all[1]!.open]).toEqual([true, true]);
    resize(true);
    expect([all[0]!.open, all[1]!.open]).toEqual([false, true]);
    resize(false);
    expect([all[0]!.open, all[1]!.open]).toEqual([true, true]);
    // The listener is removed with the other cleanups.
    await nav();
    expect(mediaListeners.size).toBe(1);
  });

  it("closes dropdown panels on Escape, outside clicks and prenav", async () => {
    mount(
      `<nav data-quartz-nav="top" data-variant="dropdown" data-trigger="click" data-bp-mobile="800px">
        <div class="quartz-nav__panel"><ul class="quartz-nav__list">${details("a/index", true)}${details("b/index", false)}</ul></div></nav>`,
    );
    await nav();
    const [a, b] = Array.from(document.querySelectorAll<HTMLDetailsElement>("details"));
    a!.querySelector<HTMLAnchorElement>("a.quartz-nav__link--child")!.focus();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(a!.open).toBe(false);
    // Focus moves back to the toggle instead of vanishing with the panel.
    expect(document.activeElement).toBe(a!.querySelector("summary"));

    a!.open = true;
    document.getElementById("outside")!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(a!.open).toBe(false);

    a!.open = true;
    const inner = a!.querySelector("a")!;
    inner.addEventListener("click", (e) => e.preventDefault()); // jsdom cannot navigate
    inner.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    expect(a!.open).toBe(true); // clicks inside keep it open

    b!.open = true;
    b!.dispatchEvent(new Event("toggle"));
    expect(a!.open).toBe(false); // siblings close each other
    expect(b!.open).toBe(true);

    document.dispatchEvent(new CustomEvent("prenav") as never);
    expect(b!.open).toBe(false);
  });

  it("opens dropdown panels on hover when configured", async () => {
    vi.useFakeTimers();
    mount(
      `<nav data-quartz-nav="top" data-variant="dropdown" data-trigger="hover" data-bp-mobile="800px">
        <div class="quartz-nav__panel"><ul class="quartz-nav__list">${details("a/index", false)}</ul></div></nav>`,
    );
    await vi.runAllTimersAsync();
    for (const fn of cleanups.splice(0)) fn();
    document.dispatchEvent(new CustomEvent("nav", { detail: { url: "docs/index" } }) as never);
    await vi.runAllTimersAsync();
    const item = document.querySelector("li.quartz-nav__item--folder")!;
    const d = item.querySelector("details")!;
    item.dispatchEvent(new MouseEvent("mouseenter"));
    expect(d.open).toBe(true);
    item.dispatchEvent(new MouseEvent("mouseleave"));
    expect(d.open).toBe(true);
    await vi.advanceTimersByTimeAsync(200);
    expect(d.open).toBe(false);
    vi.useRealTimers();
  });

  it("mirrors an automatic flyout in the right half of the page and flips overflowing panels", async () => {
    mount(
      `<nav data-quartz-nav="side" data-variant="flyout" data-flyout-side="auto" data-trigger="click" data-bp-mobile="800px">
        <div class="quartz-nav__panel"><ul class="quartz-nav__list">${details("a/index", false)}</ul></div></nav>
       <nav data-quartz-nav="top" data-variant="dropdown" data-trigger="click" data-bp-mobile="800px">
        <div class="quartz-nav__panel"><ul class="quartz-nav__list">${details("b/index", false)}</ul></div></nav>`,
    );
    const flyout = document.querySelector<HTMLElement>('[data-quartz-nav="side"]')!;
    const rect = (x: number, w: number) =>
      ({ left: x, right: x + w, width: w, top: 0, bottom: 10, height: 10 }) as DOMRect;
    Object.defineProperty(window, "innerWidth", { value: 1000, configurable: true });
    flyout.getBoundingClientRect = () => rect(700, 200); // right half
    await nav();
    expect(flyout.classList.contains("quartz-nav--flyout-left")).toBe(true);
    flyout.getBoundingClientRect = () => rect(0, 200);
    await nav();
    expect(flyout.classList.contains("quartz-nav--flyout-left")).toBe(false);

    const list = document.querySelector<HTMLElement>('[data-quartz-nav="top"] details > ul')!;
    const d = list.parentElement as HTMLDetailsElement;
    list.getBoundingClientRect = () => rect(900, 300); // sticks out on the right
    d.open = true;
    d.dispatchEvent(new Event("toggle"));
    expect(list.classList.contains("quartz-nav__list--flip")).toBe(true);
    d.open = false;
    d.dispatchEvent(new Event("toggle"));
    expect(list.classList.contains("quartz-nav__list--flip")).toBe(false);
  });

  it("anchors panels inside a scrolling container with fixed positioning", async () => {
    mount(
      `<aside style="overflow: auto"><nav data-quartz-nav="side" data-variant="flyout" data-flyout-side="right" data-trigger="click" data-bp-mobile="800px">
        <div class="quartz-nav__panel"><ul class="quartz-nav__list">${details("a/index", false)}</ul></div></nav></aside>`,
    );
    Object.defineProperty(window, "innerWidth", { value: 1000, configurable: true });
    await nav();
    const d = document.querySelector<HTMLDetailsElement>("details")!;
    const list = d.querySelector<HTMLElement>(":scope > ul")!;
    d.getBoundingClientRect = () =>
      ({ left: 20, right: 220, width: 200, top: 300, bottom: 332, height: 32 }) as DOMRect;
    d.open = true;
    d.dispatchEvent(new Event("toggle"));
    expect(list.style.position).toBe("fixed");
    expect(list.style.top).toBe("300px");
    expect(list.style.left).toBe("224px");
    document.dispatchEvent(new Event("scroll") as never); // stale coordinates: the panel closes
    expect(d.open).toBe(false);
    d.dispatchEvent(new Event("toggle"));
    expect(list.style.position).toBe("");

    // With the Popover API the panel goes to the top layer, where masks cannot reach it.
    const shown: string[] = [];
    const proto = HTMLElement.prototype as unknown as Record<string, unknown>;
    proto.showPopover = function (this: HTMLElement) {
      shown.push("show:" + this.getAttribute("popover"));
    };
    proto.hidePopover = function () {
      shown.push("hide");
    };
    d.open = true;
    d.dispatchEvent(new Event("toggle"));
    expect(shown).toEqual(["show:manual"]);
    expect(list.style.position).toBe("fixed");
    d.open = false;
    d.dispatchEvent(new Event("toggle"));
    expect(shown).toEqual(["show:manual", "hide"]);
    expect(list.hasAttribute("popover")).toBe(false);
    delete proto.showPopover;
    delete proto.hidePopover;
  });

  it("locks scrolling while the off-canvas panel is open and closes it on Escape", async () => {
    mount(
      `<nav data-quartz-nav="top" data-variant="bar" data-mobile="offcanvas" data-bp-mobile="800px">
        <input type="checkbox" id="top-toggle" class="quartz-nav__toggle" aria-expanded="false">
        <label for="top-toggle" class="quartz-nav__burger"></label>
        <label for="top-toggle" class="quartz-nav__backdrop"></label>
        <div class="quartz-nav__panel" id="top-panel"><ul class="quartz-nav__list"><li><a href="./a" id="inside">a</a></li></ul></div></nav>`,
    );
    await nav();
    const toggle = document.querySelector<HTMLInputElement>("input")!;
    toggle.checked = true;
    toggle.dispatchEvent(new Event("change"));
    expect(document.documentElement.classList.contains("quartz-nav-lock")).toBe(true);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    document.getElementById("inside")!.focus();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(toggle.checked).toBe(false);
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(document.documentElement.classList.contains("quartz-nav-lock")).toBe(false);
    expect(document.activeElement).toBe(toggle);

    toggle.checked = true;
    toggle.dispatchEvent(new Event("change"));
    document.dispatchEvent(new CustomEvent("prenav") as never);
    expect(toggle.checked).toBe(false);

    toggle.checked = true;
    toggle.dispatchEvent(new Event("change"));
    for (const fn of cleanups.splice(0)) fn(); // SPA teardown removes the lock
    expect(document.documentElement.classList.contains("quartz-nav-lock")).toBe(false);
  });

  it("rail: hover slides in the strip, then the full menu; leaving closes it", async () => {
    vi.useFakeTimers();
    try {
      mount(
        `<header style="position: sticky"><nav data-quartz-nav="r" data-variant="rail" data-rail-rest="hidden" data-rail-expand="hover" data-bp-mobile="800px" class="quartz-nav quartz-nav--rail quartz-nav--rail-hidden quartz-nav--rail-left">
          <button type="button" class="quartz-nav__rail-trigger" aria-expanded="false"></button>
          <div class="quartz-nav__rail-backdrop"></div>
          <div class="quartz-nav__panel" id="r-panel"><ul class="quartz-nav__list" data-level="1"><li><a href="./a" id="inside">a</a></li></ul></div></nav></header>`,
      );
      for (const fn of cleanups.splice(0)) fn();
      document.dispatchEvent(new CustomEvent("nav", { detail: { url: "docs/index" } }) as never);
      const navEl = document.querySelector<HTMLElement>("nav")!;
      const trigger = navEl.querySelector<HTMLButtonElement>("button")!;
      const panel = navEl.querySelector<HTMLElement>(".quartz-nav__panel")!;
      expect(navEl.dataset.railState).toBe("closed");
      expect(navEl.style.getPropertyValue("--_rail-top")).toBe("");

      trigger.dispatchEvent(new MouseEvent("mouseenter"));
      expect(navEl.dataset.railState).toBe("part");
      expect(navEl.style.getPropertyValue("--_rail-top")).toBe("0px");
      expect(trigger.getAttribute("aria-expanded")).toBe("false");
      trigger.dispatchEvent(new MouseEvent("mouseleave"));
      panel.dispatchEvent(new MouseEvent("mouseenter"));
      vi.advanceTimersByTime(800);
      expect(navEl.dataset.railState).toBe("open");
      expect(trigger.getAttribute("aria-expanded")).toBe("true");
      panel.dispatchEvent(new MouseEvent("mouseleave"));
      vi.advanceTimersByTime(800);
      expect(navEl.dataset.railState).toBe("closed");

      // Opened by hover, it closes on leaving even after something was clicked or focused in it.
      panel.dispatchEvent(new MouseEvent("mouseenter"));
      panel.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      document.getElementById("inside")!.focus();
      panel.dispatchEvent(new MouseEvent("mouseleave"));
      vi.advanceTimersByTime(800);
      expect(navEl.dataset.railState).toBe("closed");
      // Opened by the button, it stays until a click outside.
      trigger.click();
      panel.dispatchEvent(new MouseEvent("mouseleave"));
      vi.advanceTimersByTime(800);
      expect(navEl.dataset.railState).toBe("open");
      document.getElementById("outside")!.click();
      expect(navEl.dataset.railState).toBe("closed");
    } finally {
      vi.useRealTimers();
    }
  });

  it("rail: the button toggles, Escape, the backdrop and prenav close, mobile locks scrolling", async () => {
    mount(
      `<nav data-quartz-nav="r" data-variant="rail" data-rail-rest="hidden" data-rail-expand="click" data-bp-mobile="800px" class="quartz-nav quartz-nav--rail quartz-nav--rail-hidden quartz-nav--rail-left">
        <button type="button" class="quartz-nav__rail-trigger" aria-expanded="false"></button>
        <div class="quartz-nav__rail-backdrop"></div>
        <div class="quartz-nav__panel" id="r-panel"><ul class="quartz-nav__list" data-level="1"><li><a href="./a" id="inside">a</a></li></ul></div></nav>`,
    );
    await nav();
    const navEl = document.querySelector<HTMLElement>("nav")!;
    const trigger = navEl.querySelector<HTMLButtonElement>("button")!;
    const lock = () => document.documentElement.classList.contains("quartz-nav-lock");
    // `expand: click`: hovering does nothing.
    trigger.dispatchEvent(new MouseEvent("mouseenter"));
    expect(navEl.dataset.railState).toBe("closed");
    trigger.click();
    expect(navEl.dataset.railState).toBe("open");
    expect(lock()).toBe(false);
    trigger.click();
    expect(navEl.dataset.railState).toBe("closed");

    resize(true);
    trigger.click();
    expect(lock()).toBe(true);
    document.getElementById("inside")!.focus();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(navEl.dataset.railState).toBe("closed");
    expect(lock()).toBe(false);
    expect(document.activeElement).toBe(trigger);

    trigger.click();
    navEl.querySelector<HTMLElement>(".quartz-nav__rail-backdrop")!.click();
    expect(navEl.dataset.railState).toBe("closed");
    trigger.click();
    document.dispatchEvent(new CustomEvent("prenav") as never);
    expect(navEl.dataset.railState).toBe("closed");

    // Keyboard focus entering the panel opens the full menu.
    document.getElementById("inside")!.focus();
    expect(navEl.dataset.railState).toBe("open");
    for (const fn of cleanups.splice(0)) fn();
    expect(lock()).toBe(false);
  });

  it("rail: a permanent strip pushes the page with `content: push`, except on mobile", async () => {
    mount(
      `<nav data-quartz-nav="r" data-variant="rail" data-rail-rest="icons" data-rail-expand="hover" data-rail-content="push" data-bp-mobile="800px" class="quartz-nav quartz-nav--rail quartz-nav--rail-icons quartz-nav--rail-right" style="--quartz-nav-rail-width: 4rem">
        <button type="button" class="quartz-nav__rail-trigger" aria-expanded="false"></button>
        <div class="quartz-nav__panel"><ul class="quartz-nav__list" data-level="1"><li><a href="./a" id="inside">a</a></li></ul></div></nav>`,
    );
    await nav();
    const root = document.documentElement;
    expect(root.classList.contains("quartz-nav-rail-right")).toBe(true);
    expect(root.style.getPropertyValue("--quartz-nav-rail-offset-right")).toBe("4rem");
    expect(root.classList.contains("quartz-nav-rail-push-right")).toBe(true);
    resize(true);
    expect(root.classList.contains("quartz-nav-rail-right")).toBe(false);
    expect(root.style.getPropertyValue("--quartz-nav-rail-offset-right")).toBe("");
    resize(false);
    expect(root.classList.contains("quartz-nav-rail-right")).toBe(true);
    for (const fn of cleanups.splice(0)) fn();
    expect(root.classList.contains("quartz-nav-rail-right")).toBe(false);
    expect(root.style.getPropertyValue("--quartz-nav-rail-offset-right")).toBe("");
  });

  it("rail: a pinned menu stays open, survives a page change and unpins with the menu button", async () => {
    const html = `<nav data-quartz-nav="pin" data-variant="rail" data-rail-rest="hidden" data-rail-expand="click" data-bp-mobile="800px" class="quartz-nav quartz-nav--rail quartz-nav--rail-hidden quartz-nav--rail-left">
        <button type="button" class="quartz-nav__rail-trigger" aria-expanded="false"></button>
        <div class="quartz-nav__panel"><div class="quartz-nav__rail-head"><button type="button" class="quartz-nav__rail-pin" aria-pressed="false"></button></div>
        <ul class="quartz-nav__list" data-level="1"><li><a href="./a" id="inside">a</a></li></ul></div></nav>`;
    mount(html);
    await nav();
    let navEl = document.querySelector<HTMLElement>("nav")!;
    const pin = navEl.querySelector<HTMLButtonElement>(".quartz-nav__rail-pin")!;
    navEl.querySelector<HTMLButtonElement>(".quartz-nav__rail-trigger")!.click();
    pin.click();
    expect(pin.getAttribute("aria-pressed")).toBe("true");
    // The record also feeds the early script in <head>: side, pushed width, mobile breakpoint.
    expect(JSON.parse(localStorage.getItem("quartz-nav:pin:rail-pinned")!)).toEqual({
      side: "left",
      px: 0,
      bp: 800,
    });
    document.getElementById("outside")!.click();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    document.dispatchEvent(new CustomEvent("prenav") as never);
    expect(navEl.dataset.railState).toBe("open");

    // The next page restores it, without animation.
    mount(html);
    await nav();
    navEl = document.querySelector<HTMLElement>("nav")!;
    expect(navEl.dataset.railState).toBe("open");
    expect(navEl.querySelector(".quartz-nav__rail-pin")!.getAttribute("aria-pressed")).toBe("true");
    // Not on a phone.
    resize(true);
    expect(navEl.dataset.railState).toBe("closed");
    resize(false);
    expect(navEl.dataset.railState).toBe("open");

    navEl.querySelector<HTMLButtonElement>(".quartz-nav__rail-trigger")!.click();
    expect(navEl.dataset.railState).toBe("closed");
    expect(localStorage.getItem("quartz-nav:pin:rail-pinned")).toBeNull();
  });

  it("rail: push moves the page however the menu was opened, unless hoverContent says otherwise", async () => {
    const html = (hover: string) =>
      `<nav data-quartz-nav="push" data-variant="rail" data-rail-rest="hidden" data-rail-expand="hover" data-rail-content="push" data-rail-hover-content="${hover}" data-bp-mobile="800px" class="quartz-nav quartz-nav--rail quartz-nav--rail-hidden quartz-nav--rail-left" style="--quartz-nav-rail-open-width: 18rem; --quartz-nav-rail-width: 4rem">
        <button type="button" class="quartz-nav__rail-trigger" aria-expanded="false"></button>
        <div class="quartz-nav__panel"><div class="quartz-nav__rail-head"><button type="button" class="quartz-nav__rail-pin" aria-pressed="false"></button></div><ul class="quartz-nav__list" data-level="1"><li><a href="./a" id="inside">a</a></li></ul></div></nav>`;
    const root = document.documentElement;
    const offset = () => root.style.getPropertyValue("--quartz-nav-rail-offset-left");

    // `hoverContent: same`: the strip and a menu opened by hover push as well.
    mount(html("same"));
    await nav();
    let navEl = document.querySelector<HTMLElement>("nav")!;
    let panel = navEl.querySelector<HTMLElement>(".quartz-nav__panel")!;
    expect(root.classList.contains("quartz-nav-rail-push-left")).toBe(true);
    expect(offset()).toBe("0px");
    navEl.querySelector("button")!.dispatchEvent(new MouseEvent("mouseenter"));
    expect(offset()).toBe("4rem");
    panel.dispatchEvent(new MouseEvent("mouseenter"));
    expect(offset()).toBe("18rem");
    expect(navEl.dataset.railPushing).toBe("");
    document.getElementById("outside")!.click();
    expect(offset()).toBe("0px");

    // `hoverContent: overlay`: hover lays it over the page, a click or the pin pushes.
    mount(html("overlay"));
    await nav();
    navEl = document.querySelector<HTMLElement>("nav")!;
    panel = navEl.querySelector<HTMLElement>(".quartz-nav__panel")!;
    panel.dispatchEvent(new MouseEvent("mouseenter"));
    expect(navEl.dataset.railState).toBe("open");
    expect(offset()).toBe("0px");
    navEl.querySelector<HTMLButtonElement>(".quartz-nav__rail-pin")!.click();
    expect(offset()).toBe("18rem");
    navEl.querySelector<HTMLButtonElement>(".quartz-nav__rail-trigger")!.click();
    expect(offset()).toBe("0px");
    navEl.querySelector<HTMLButtonElement>(".quartz-nav__rail-trigger")!.click();
    expect(offset()).toBe("18rem");
    resize(true);
    expect(root.classList.contains("quartz-nav-rail-push-left")).toBe(false);
    expect(offset()).toBe("");
    for (const fn of cleanups.splice(0)) fn();
    expect(root.classList.contains("quartz-nav-rail-left")).toBe(false);
  });

  it("rail: a rail on each side keeps its own offset and push state", async () => {
    mount(
      `<nav data-quartz-nav="l" data-variant="rail" data-rail-rest="hidden" data-rail-expand="click" data-rail-content="push" data-bp-mobile="800px" class="quartz-nav quartz-nav--rail quartz-nav--rail-hidden quartz-nav--rail-left" style="--quartz-nav-rail-open-width: 18rem">
        <button type="button" class="quartz-nav__rail-trigger" aria-expanded="false"></button>
        <div class="quartz-nav__panel"><div class="quartz-nav__rail-head"><button type="button" class="quartz-nav__rail-pin" aria-pressed="false"></button></div><ul class="quartz-nav__list" data-level="1"><li><a href="./a">a</a></li></ul></div></nav>
      <nav data-quartz-nav="r" data-variant="rail" data-rail-rest="icons" data-rail-expand="strip" data-rail-content="overlay" data-bp-mobile="800px" class="quartz-nav quartz-nav--rail quartz-nav--rail-icons quartz-nav--rail-right" style="--quartz-nav-rail-width: 4rem">
        <button type="button" class="quartz-nav__rail-trigger" aria-expanded="false"></button>
        <div class="quartz-nav__panel"><div class="quartz-nav__rail-head"><button type="button" class="quartz-nav__rail-pin" aria-pressed="false"></button></div><ul class="quartz-nav__list" data-level="1"><li><a href="./b">b</a></li></ul></div></nav>`,
    );
    await nav();
    const root = document.documentElement;
    const [left, right] = Array.from(document.querySelectorAll<HTMLElement>("nav"));
    left!.querySelector<HTMLButtonElement>(".quartz-nav__rail-trigger")!.click();
    left!.querySelector<HTMLButtonElement>(".quartz-nav__rail-pin")!.click();
    const pushedLeft = () => [
      root.classList.contains("quartz-nav-rail-push-left"),
      root.style.getPropertyValue("--quartz-nav-rail-offset-left"),
    ];
    expect(pushedLeft()).toEqual([true, "18rem"]);
    // Opening and pinning the right rail must not touch the left one.
    right!.querySelector(".quartz-nav__panel")!.dispatchEvent(new MouseEvent("mouseenter"));
    right!.querySelector<HTMLButtonElement>(".quartz-nav__rail-pin")!.click();
    expect(right!.dataset.railState).toBe("open");
    expect(pushedLeft()).toEqual([true, "18rem"]);
    // The right one overlays: nothing moves on its side.
    expect(root.style.getPropertyValue("--quartz-nav-rail-offset-right")).toBe("");
    expect(root.classList.contains("quartz-nav-rail-push-right")).toBe(false);
    right!.querySelector<HTMLButtonElement>(".quartz-nav__rail-trigger")!.click();
    expect(pushedLeft()).toEqual([true, "18rem"]);
    for (const fn of cleanups.splice(0)) fn();
  });

  it("rail: `pinContent: push` lets an overlaying menu sit beside the page once pinned", async () => {
    mount(
      `<nav data-quartz-nav="pc" data-variant="rail" data-rail-rest="hidden" data-rail-expand="click" data-rail-content="overlay" data-rail-pin-content="push" data-bp-mobile="800px" class="quartz-nav quartz-nav--rail quartz-nav--rail-hidden quartz-nav--rail-left" style="--quartz-nav-rail-open-width: 18rem">
        <button type="button" class="quartz-nav__rail-trigger" aria-expanded="false"></button>
        <div class="quartz-nav__panel"><div class="quartz-nav__rail-head"><button type="button" class="quartz-nav__rail-pin" aria-pressed="false"></button></div><ul class="quartz-nav__list" data-level="1"><li><a href="./a">a</a></li></ul></div></nav>`,
    );
    await nav();
    const root = document.documentElement;
    const navEl = document.querySelector<HTMLElement>("nav")!;
    const offset = () => root.style.getPropertyValue("--quartz-nav-rail-offset-left");
    expect(root.classList.contains("quartz-nav-rail-push-left")).toBe(true);
    navEl.querySelector<HTMLButtonElement>(".quartz-nav__rail-trigger")!.click();
    expect(offset()).toBe("0px");
    navEl.querySelector<HTMLButtonElement>(".quartz-nav__rail-pin")!.click();
    expect(offset()).toBe("18rem");
    navEl.querySelector<HTMLButtonElement>(".quartz-nav__rail-pin")!.click();
    expect(offset()).toBe("0px");
    expect(navEl.dataset.railState).toBe("open");
    for (const fn of cleanups.splice(0)) fn();
  });

  it("rail: `onNavigate: keep` carries the open menu to the next page until the pointer leaves", async () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "Date"] });
    try {
      const html = (keep: string) =>
        `<nav data-quartz-nav="kn" data-variant="rail" data-rail-rest="hidden" data-rail-expand="click" data-rail-on-navigate="${keep}" data-bp-mobile="800px" class="quartz-nav quartz-nav--rail quartz-nav--rail-hidden quartz-nav--rail-left">
          <button type="button" class="quartz-nav__rail-trigger" aria-expanded="false"></button>
          <div class="quartz-nav__panel"><ul class="quartz-nav__list" data-level="1"><li><a href="/other-page" id="link">a</a></li></ul></div></nav>`;
      const go = () => {
        for (const fn of cleanups.splice(0)) fn();
        document.dispatchEvent(new CustomEvent("nav", { detail: { url: "docs/index" } }) as never);
      };
      mount(html("keep"));
      go();
      let navEl = document.querySelector<HTMLElement>("nav")!;
      navEl.querySelector<HTMLButtonElement>(".quartz-nav__rail-trigger")!.click();
      document.getElementById("link")!.click();
      document.dispatchEvent(new CustomEvent("prenav") as never);
      expect(navEl.dataset.railState).toBe("open");
      // The next page shows it open; moving the pointer off it closes it.
      mount(html("keep"));
      go();
      navEl = document.querySelector<HTMLElement>("nav")!;
      expect(navEl.dataset.railState).toBe("open");
      document
        .getElementById("link")!
        .dispatchEvent(new MouseEvent("mousemove", { bubbles: true }));
      vi.advanceTimersByTime(800);
      expect(navEl.dataset.railState).toBe("open");
      document
        .getElementById("outside")!
        .dispatchEvent(new MouseEvent("mousemove", { bubbles: true }));
      vi.advanceTimersByTime(800);
      expect(navEl.dataset.railState).toBe("closed");

      // `close` (default): a followed link closes it, and nothing is carried over.
      mount(html("close"));
      go();
      navEl = document.querySelector<HTMLElement>("nav")!;
      navEl.querySelector<HTMLButtonElement>(".quartz-nav__rail-trigger")!.click();
      document.getElementById("link")!.click();
      document.dispatchEvent(new CustomEvent("prenav") as never);
      expect(navEl.dataset.railState).toBe("closed");
      mount(html("keep"));
      go();
      expect(document.querySelector<HTMLElement>("nav")!.dataset.railState).toBe("closed");
      for (const fn of cleanups.splice(0)) fn();
    } finally {
      vi.useRealTimers();
    }
  });

  it("rail: pushes while the page stays above the mobile breakpoint, overlays below it", async () => {
    const proto = HTMLElement.prototype;
    const rect = proto.getBoundingClientRect;
    // The probe the script measures the panel width with reports 320px.
    proto.getBoundingClientRect = function (this: HTMLElement) {
      const width = this.style.width.includes("--quartz-nav-rail-open-width") ? 320 : 0;
      return { width, height: 0, top: 0, left: 0, right: width, bottom: 0, x: 0, y: 0 } as DOMRect;
    };
    const innerWidth = window.innerWidth;
    try {
      mount(
        `<nav data-quartz-nav="bp" data-variant="rail" data-rail-rest="hidden" data-rail-expand="click" data-rail-content="push" data-bp-mobile="900px" data-bp-desktop="1200px" class="quartz-nav quartz-nav--rail quartz-nav--rail-hidden quartz-nav--rail-left" style="--quartz-nav-rail-open-width: 20rem">
          <button type="button" class="quartz-nav__rail-trigger" aria-expanded="false"></button>
          <div class="quartz-nav__panel"><ul class="quartz-nav__list" data-level="1"><li><a href="./a">a</a></li></ul></div></nav>`,
      );
      await nav();
      const root = document.documentElement;
      const navEl = document.querySelector<HTMLElement>("nav")!;
      const offset = () => root.style.getPropertyValue("--quartz-nav-rail-offset-left");
      Object.defineProperty(window, "innerWidth", { value: 1700, configurable: true });
      navEl.querySelector<HTMLButtonElement>("button")!.click();
      expect(offset()).toBe("320px");
      // A desktop page may get narrower than the desktop breakpoint: 1328 - 320 = 1008.
      Object.defineProperty(window, "innerWidth", { value: 1328, configurable: true });
      window.dispatchEvent(new Event("resize"));
      await new Promise((r) => setTimeout(r, 50)); // resizing is handled once per frame
      expect(offset()).toBe("320px");
      // But not narrower than the mobile one: 1100 - 320 = 780 < 900, the menu overlays.
      Object.defineProperty(window, "innerWidth", { value: 1100, configurable: true });
      window.dispatchEvent(new Event("resize"));
      await new Promise((r) => setTimeout(r, 50)); // resizing is handled once per frame
      expect(offset()).toBe("0px");
      expect(navEl.dataset.railPushing).toBeUndefined();
      // Widening the window brings the push back.
      Object.defineProperty(window, "innerWidth", { value: 1240, configurable: true });
      window.dispatchEvent(new Event("resize"));
      await new Promise((r) => setTimeout(r, 50)); // resizing is handled once per frame
      expect(offset()).toBe("320px");
      for (const fn of cleanups.splice(0)) fn();
    } finally {
      proto.getBoundingClientRect = rect;
      Object.defineProperty(window, "innerWidth", { value: innerWidth, configurable: true });
    }
  });

  it("rail: two pushing rails together keep the page in its layout", async () => {
    const proto = HTMLElement.prototype;
    const rect = proto.getBoundingClientRect;
    proto.getBoundingClientRect = function (this: HTMLElement) {
      const width = this.style.width.includes("--quartz-nav-rail-open-width") ? 320 : 0;
      return { width, height: 0, top: 0, left: 0, right: width, bottom: 0, x: 0, y: 0 } as DOMRect;
    };
    const innerWidth = window.innerWidth;
    Object.defineProperty(window, "innerWidth", { value: 1500, configurable: true });
    const rail = (id: string, side: string) =>
      `<nav data-quartz-nav="${id}" data-variant="rail" data-rail-rest="hidden" data-rail-expand="click" data-rail-content="push" data-bp-mobile="900px" data-bp-desktop="1200px" class="quartz-nav quartz-nav--rail quartz-nav--rail-hidden quartz-nav--rail-${side}" style="--quartz-nav-rail-open-width: 20rem">
        <button type="button" class="quartz-nav__rail-trigger" aria-expanded="false"></button>
        <div class="quartz-nav__panel"><div class="quartz-nav__rail-head"><button type="button" class="quartz-nav__rail-pin" aria-pressed="false"></button></div><ul class="quartz-nav__list" data-level="1"><li><a href="./a">a</a></li></ul></div></nav>`;
    try {
      mount(rail("two-l", "left") + rail("two-r", "right"));
      await nav();
      const root = document.documentElement;
      const [left, right] = Array.from(document.querySelectorAll<HTMLElement>("nav"));
      const offsets = () => [
        root.style.getPropertyValue("--quartz-nav-rail-offset-left"),
        root.style.getPropertyValue("--quartz-nav-rail-offset-right"),
      ];
      // Both pinned, so that a click on one is not a click outside the other.
      left!.querySelector<HTMLButtonElement>(".quartz-nav__rail-pin")!.click();
      expect(offsets()).toEqual(["320px", "0px"]);
      // 1500 - 320 - 320 = 860 would be below the mobile breakpoint: the right one overlays.
      right!.querySelector<HTMLButtonElement>(".quartz-nav__rail-pin")!.click();
      expect(right!.dataset.railState).toBe("open");
      expect(offsets()).toEqual(["320px", "0px"]);
      // Once the left one closes, the right one has room and pushes.
      left!.querySelector<HTMLButtonElement>(".quartz-nav__rail-trigger")!.click();
      expect(left!.dataset.railState).toBe("closed");
      expect(offsets()).toEqual(["0px", "320px"]);
      for (const fn of cleanups.splice(0)) fn();
      expect(root.style.getPropertyValue("--quartz-nav-rail-offset-right")).toBe("");
    } finally {
      proto.getBoundingClientRect = rect;
      Object.defineProperty(window, "innerWidth", { value: innerWidth, configurable: true });
    }
  });

  it("rail: takes over from the early script and remembers the panel's top edge", async () => {
    const style = document.createElement("style");
    style.id = "quartz-nav-rail-restore";
    document.head.append(style);
    document.documentElement.classList.add("quartz-nav-rail-instant");
    mount(
      `<nav data-quartz-nav="hand" data-variant="rail" data-rail-rest="icons" data-rail-expand="click" data-bp-mobile="800px" class="quartz-nav quartz-nav--rail quartz-nav--rail-icons quartz-nav--rail-left">
        <button type="button" class="quartz-nav__rail-trigger" aria-expanded="false"></button>
        <div class="quartz-nav__panel"><ul class="quartz-nav__list" data-level="1"><li><a href="./a">a</a></li></ul></div></nav>`,
    );
    await nav();
    expect(document.getElementById("quartz-nav-rail-restore")).toBeNull();
    expect(localStorage.getItem("quartz-nav:hand:rail-top")).toBe("0");
    for (const fn of cleanups.splice(0)) fn();
  });

  it("rail: the early script's stand-in style goes even on a page without a rail", async () => {
    const style = document.createElement("style");
    style.id = "quartz-nav-rail-restore";
    document.head.append(style);
    mount(
      `<nav data-quartz-nav="plain" data-variant="tree"><div class="quartz-nav__panel"></div></nav>`,
    );
    await nav();
    expect(document.getElementById("quartz-nav-rail-restore")).toBeNull();
  });

  it("rail: two rails on the same edge push by the wider, and neither undoes the other", async () => {
    const rail = (id: string, content: string, width: string) =>
      `<nav data-quartz-nav="${id}" data-variant="rail" data-rail-rest="hidden" data-rail-expand="click" data-rail-content="${content}" data-bp-mobile="800px" class="quartz-nav quartz-nav--rail quartz-nav--rail-hidden quartz-nav--rail-left" style="--quartz-nav-rail-open-width: ${width}">
        <button type="button" class="quartz-nav__rail-trigger" aria-expanded="false"></button>
        <div class="quartz-nav__panel"><div class="quartz-nav__rail-head"><button type="button" class="quartz-nav__rail-pin" aria-pressed="false"></button></div><ul class="quartz-nav__list" data-level="1"><li><a href="./a">a</a></li></ul></div></nav>`;
    localStorage.setItem(
      "quartz-nav:a:rail-pinned",
      JSON.stringify({ side: "left", px: 0, bp: 800 }),
    );
    mount(rail("a", "push", "18rem") + rail("b", "overlay", "10rem"));
    await nav();
    const root = document.documentElement;
    const [a] = Array.from(document.querySelectorAll<HTMLElement>("nav"));
    // A was restored pinned and pushes; B, set up after it and closed, must not clear that.
    expect(a!.dataset.railState).toBe("open");
    expect(root.classList.contains("quartz-nav-rail-push-left")).toBe(true);
    expect(root.style.getPropertyValue("--quartz-nav-rail-offset-left")).toBe("18rem");
    window.dispatchEvent(new Event("resize"));
    await new Promise((r) => setTimeout(r, 50));
    expect(root.style.getPropertyValue("--quartz-nav-rail-offset-left")).toBe("18rem");
    for (const fn of cleanups.splice(0)) fn();
    expect(root.classList.contains("quartz-nav-rail-push-left")).toBe(false);
    expect(root.style.getPropertyValue("--quartz-nav-rail-offset-left")).toBe("");
  });

  it("rail: a pin holds on wide screens only, and comes back after a narrow load", async () => {
    const html = `<nav data-quartz-nav="hold" data-variant="rail" data-rail-rest="hidden" data-rail-expand="click" data-bp-mobile="800px" class="quartz-nav quartz-nav--rail quartz-nav--rail-hidden quartz-nav--rail-left">
        <button type="button" class="quartz-nav__rail-trigger" aria-expanded="false"></button>
        <div class="quartz-nav__rail-backdrop"></div>
        <div class="quartz-nav__panel"><div class="quartz-nav__rail-head"><button type="button" class="quartz-nav__rail-pin" aria-pressed="false"></button></div><ul class="quartz-nav__list" data-level="1"><li><a href="./a" id="inside">a</a></li></ul></div></nav>`;
    localStorage.setItem(
      "quartz-nav:hold:rail-pinned",
      JSON.stringify({ side: "left", px: 0, bp: 800 }),
    );
    // Loaded narrow: closed, but the pin is known.
    mobile = true;
    mount(html);
    await nav();
    const navEl = document.querySelector<HTMLElement>("nav")!;
    const trigger = navEl.querySelector<HTMLButtonElement>(".quartz-nav__rail-trigger")!;
    expect(navEl.dataset.railState).toBe("closed");
    expect(navEl.querySelector(".quartz-nav__rail-pin")!.getAttribute("aria-pressed")).toBe("true");
    // On the phone the menu closes like any other: outside click and Escape work.
    trigger.click();
    expect(navEl.dataset.railState).toBe("open");
    document.getElementById("outside")!.click();
    expect(navEl.dataset.railState).toBe("closed");
    trigger.click();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(navEl.dataset.railState).toBe("closed");
    // Closing with the button on the phone does not unpin.
    trigger.click();
    trigger.click();
    expect(localStorage.getItem("quartz-nav:hold:rail-pinned")).not.toBeNull();
    // Widening brings it back open.
    resize(false);
    expect(navEl.dataset.railState).toBe("open");
    for (const fn of cleanups.splice(0)) fn();
  });

  it("rail: `onNavigate: keep` ignores modified clicks and links to the same page", async () => {
    mount(
      `<nav data-quartz-nav="mod" data-variant="rail" data-rail-rest="hidden" data-rail-expand="click" data-rail-on-navigate="keep" data-bp-mobile="800px" class="quartz-nav quartz-nav--rail quartz-nav--rail-hidden quartz-nav--rail-left">
        <button type="button" class="quartz-nav__rail-trigger" aria-expanded="false"></button>
        <div class="quartz-nav__panel"><ul class="quartz-nav__list" data-level="1"><li><a href="/other" id="other">a</a></li><li><a href="#here" id="here">b</a></li></ul></div></nav>`,
    );
    await nav();
    const navEl = document.querySelector<HTMLElement>("nav")!;
    navEl.querySelector<HTMLButtonElement>("button")!.click();
    document
      .getElementById("other")!
      .dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, ctrlKey: true }));
    document.getElementById("here")!.click();
    expect(sessionStorage.getItem("quartz-nav:mod:rail-carry")).toBeNull();
    document.dispatchEvent(new CustomEvent("prenav") as never);
    expect(navEl.dataset.railState).toBe("closed");
    for (const fn of cleanups.splice(0)) fn();
  });

  it("rail: a pushing strip is stored for the early script, and forgotten without one", async () => {
    const html = (rest: string) =>
      `<nav data-quartz-nav="st" data-variant="rail" data-rail-rest="${rest}" data-rail-expand="click" data-rail-content="push" data-bp-mobile="800px" class="quartz-nav quartz-nav--rail quartz-nav--rail-${rest} quartz-nav--rail-right">
        <button type="button" class="quartz-nav__rail-trigger" aria-expanded="false"></button>
        <div class="quartz-nav__panel"><ul class="quartz-nav__list" data-level="1"><li><a href="./a">a</a></li></ul></div></nav>`;
    mount(html("icons"));
    await nav();
    expect(JSON.parse(localStorage.getItem("quartz-nav:st:rail-strip")!)).toMatchObject({
      side: "right",
      bp: 800,
    });
    mount(html("hidden"));
    await nav();
    expect(localStorage.getItem("quartz-nav:st:rail-strip")).toBeNull();
    for (const fn of cleanups.splice(0)) fn();
  });

  it("rail: `expand: strip` ignores hovering the button but expands the strip", async () => {
    mount(
      `<nav data-quartz-nav="s" data-variant="rail" data-rail-rest="icons" data-rail-expand="strip" data-bp-mobile="800px" class="quartz-nav quartz-nav--rail quartz-nav--rail-icons quartz-nav--rail-left">
        <button type="button" class="quartz-nav__rail-trigger" aria-expanded="false"></button>
        <div class="quartz-nav__panel"><ul class="quartz-nav__list" data-level="1"><li><a href="./a">a</a></li></ul></div></nav>`,
    );
    await nav();
    const navEl = document.querySelector<HTMLElement>("nav")!;
    navEl.querySelector("button")!.dispatchEvent(new MouseEvent("mouseenter"));
    expect(navEl.dataset.railState).toBe("closed");
    navEl.querySelector(".quartz-nav__panel")!.dispatchEvent(new MouseEvent("mouseenter"));
    expect(navEl.dataset.railState).toBe("open");
  });

  it("navigates when a select option is chosen", async () => {
    const spa = vi.fn(() => Promise.resolve());
    (window as { spaNavigate?: unknown }).spaNavigate = spa;
    mount(
      `<nav data-quartz-nav="jump" data-variant="select" data-bp-mobile="800px">
        <select class="quartz-nav__select" id="jump-select"><option value="" disabled selected>Jump</option><option value="../docs/intro">Intro</option><option value="../docs/setup">Setup</option></select>
        <button type="button" class="quartz-nav__go" data-select="jump-select">Go</button></nav>`,
    );
    await nav();
    const select = document.querySelector("select")!;
    select.dispatchEvent(new Event("pointerdown"));
    select.value = "../docs/intro";
    select.dispatchEvent(new Event("change"));
    expect(spa).toHaveBeenCalledTimes(1);
    const url = (spa.mock.calls[0] as unknown as [URL])[0];
    expect(url).toBeInstanceOf(URL);
    expect(url.pathname.endsWith("/docs/intro")).toBe(true);

    // Arrowing through the options must not navigate; Enter or the button does.
    select.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));
    select.value = "../docs/setup";
    select.dispatchEvent(new Event("change"));
    expect(spa).toHaveBeenCalledTimes(1);
    select.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    expect(spa).toHaveBeenCalledTimes(2);
    document.querySelector<HTMLButtonElement>("button.quartz-nav__go")!.click();
    expect(spa).toHaveBeenCalledTimes(3);
    expect((spa.mock.calls[2] as unknown as [URL])[0].pathname.endsWith("/docs/setup")).toBe(true);
  });

  it("flags folders for the open animation only once someone interacts with them", async () => {
    mount(
      `<nav data-quartz-nav="side" data-variant="accordion" data-bp-mobile="800px">
        <div class="quartz-nav__panel"><ul class="quartz-nav__list">${details("a/index", true, 'data-trail="true"')}${details("b/index", false)}</ul></div></nav>`,
    );
    await nav();
    const [a, b] = Array.from(document.querySelectorAll<HTMLDetailsElement>("details"));
    expect(a!.dataset.animate).toBeUndefined(); // open on load: no animation
    expect(b!.dataset.animate).toBeUndefined();
    b!.querySelector("summary")!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(b!.dataset.animate).toBe("");
    a!.querySelector("summary")!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(a!.dataset.animate).toBeUndefined(); // closing an open folder does not flag it
  });

  it("registers cleanups for every listener", async () => {
    mount(
      `<nav data-quartz-nav="side" data-variant="accordion" data-persist="true" data-bp-mobile="800px">
        <div class="quartz-nav__panel"><ul class="quartz-nav__list">${details("a/index", false)}</ul></div></nav>`,
    );
    await nav();
    expect(cleanups.length).toBeGreaterThan(0);
  });
});
