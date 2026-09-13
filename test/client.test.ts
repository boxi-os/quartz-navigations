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
