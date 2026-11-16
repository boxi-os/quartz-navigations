/**
 * Client-side part of quartz-navigations. Attached as `afterDOMLoaded` of the component and
 * driven by Quartz's `nav` event. Everything the markup needs works without this script
 * (`<details>`, a checkbox for the off-canvas panel); it only adds persistence, closing
 * behaviour, hover opening, the open animation flag, the scroll lock and select-based
 * navigation.
 *
 * No `declare global` here: the inline-script loader strips `export` statements, so this
 * file must stay a script, not a module.
 */
type NavState = Record<string, boolean>;

const POPUPS = ["dropdown", "mega", "flyout"];
const LOCK_CLASS = "quartz-nav-lock";
const RAIL_PUSH_EVENT = "quartz-nav-rail-push";
/** The <style> the early script (rail-restore.inline.ts) adds for restored menus. */
const RESTORE_STYLE_ID = "quartz-nav-rail-restore";

function storageKey(id: string): string {
  return `quartz-nav:${id}`;
}

function readState(id: string): NavState {
  try {
    const raw = localStorage.getItem(storageKey(id));
    const parsed: unknown = raw ? JSON.parse(raw) : {};
    return parsed !== null && typeof parsed === "object" ? (parsed as NavState) : {};
  } catch {
    return {};
  }
}

function writeState(id: string, state: NavState): void {
  try {
    localStorage.setItem(storageKey(id), JSON.stringify(state));
  } catch {
    // storage may be unavailable (private mode, quota); the navigation still works
  }
}

function mobileQuery(nav: HTMLElement): MediaQueryList | undefined {
  const bp = nav.dataset.bpMobile;
  return bp ? window.matchMedia(`(max-width: ${bp})`) : undefined;
}

/**
 * Folders animate when they open, but not when the page renders them open (active trail,
 * remembered state): the animation is bound to `data-animate`, which is set on a folder the
 * first time someone interacts with it.
 */
function markAnimated(details: HTMLDetailsElement): void {
  if (!details.open && details.dataset.animate === undefined) details.dataset.animate = "";
}

function setupAnimation(nav: HTMLElement): void {
  nav.querySelectorAll<HTMLElement>("summary.quartz-nav__summary").forEach((summary) => {
    const details = summary.parentElement;
    if (!(details instanceof HTMLDetailsElement)) return;
    const onClick = () => markAnimated(details);
    summary.addEventListener("click", onClick);
    window.addCleanup(() => summary.removeEventListener("click", onClick));
  });
}

/**
 * Names of the exclusive groups that already hold a folder on the active trail.
 *
 * `exclusive` renders `<details name="…">`, a native group in which the browser keeps at most
 * one open - opening one closes the others, and that includes an `open` set from script. So a
 * remembered folder restored below would not simply be an extra open folder: it would *close*
 * the one the current page sits in. Measured on a real site before this guard existed: after
 * opening one chapter, every chapter visited afterwards rendered open and was shut again a
 * moment later.
 *
 * The trail wins, because it is the one state the page itself asks for. Only groups that have a
 * trail folder are listed; with no trail folder in the group - on a front page, say - the
 * remembered folder is restored as before, which is the whole point of `persistState`.
 */
function trailClaimedGroups(nav: HTMLElement): Set<string> {
  const claimed = new Set<string>();
  nav.querySelectorAll<HTMLDetailsElement>("details[data-folder][name]").forEach((details) => {
    if (details.dataset.trail === "true") claimed.add(details.getAttribute("name") ?? "");
  });
  return claimed;
}

function setupFolders(nav: HTMLElement): void {
  const id = nav.dataset.quartzNav ?? "";
  const persist = nav.dataset.persist === "true";
  const expandActive = nav.dataset.expandActive === "true";
  const query = mobileQuery(nav);
  const state = persist ? readState(id) : {};
  const claimed = expandActive ? trailClaimedGroups(nav) : new Set<string>();
  // Folders that only collapse on mobile are rendered open so the desktop layout works
  // without JS; they follow the viewport, also when it crosses the breakpoint later.
  const mobileOnly: (() => void)[] = [];

  nav.querySelectorAll<HTMLDetailsElement>("details[data-folder]").forEach((details) => {
    const slug = details.dataset.folder ?? "";
    const onTrail = details.dataset.trail === "true";
    const stored = persist && slug in state ? state[slug] === true : undefined;
    // Opening this one would close the trail folder of its own exclusive group.
    const wouldEvictTrail =
      stored === true && !onTrail && claimed.has(details.getAttribute("name") ?? "\u0000");
    if (details.dataset.mobileCollapsible !== undefined) {
      const applyViewport = () => {
        const remembered = persist && slug in state ? state[slug] === true : false;
        details.open = !(query?.matches ?? false) || onTrail || (remembered && !wouldEvictTrail);
      };
      applyViewport();
      mobileOnly.push(applyViewport);
    } else if (stored !== undefined && !(expandActive && onTrail) && !wouldEvictTrail) {
      details.open = stored;
    }
    if (!persist) return;
    const onToggle = () => {
      state[slug] = details.open;
      writeState(id, state);
    };
    details.addEventListener("toggle", onToggle);
    window.addCleanup(() => details.removeEventListener("toggle", onToggle));
  });

  if (query && mobileOnly.length > 0 && typeof query.addEventListener === "function") {
    const onChange = () => mobileOnly.forEach((apply) => apply());
    query.addEventListener("change", onChange);
    window.addCleanup(() => query.removeEventListener("change", onChange));
  }
}

/**
 * Nearest ancestor that would clip a panel: a scrolling sidebar (`overflow`), a masked or
 * clipped box (`mask-image`, `clip-path`), or layout containment. Or `null`.
 */
function clippingAncestor(el: HTMLElement): HTMLElement | null {
  let e = el.parentElement;
  while (e && e !== document.body) {
    const cs = getComputedStyle(e);
    const clips =
      cs.overflow !== "visible" ||
      cs.overflowX !== "visible" ||
      cs.overflowY !== "visible" ||
      (cs.maskImage && cs.maskImage !== "none") ||
      (cs.clipPath && cs.clipPath !== "none") ||
      (cs.contain && cs.contain !== "none");
    if (clips) return e;
    e = e.parentElement;
  }
  return null;
}

const hasPopover = (el: HTMLElement): boolean => typeof el.showPopover === "function";

/**
 * Takes a panel out of its clipping ancestors: into the top layer via the Popover API where
 * available (a mask or `overflow` on an ancestor cannot touch it there), otherwise
 * `position: fixed`, which escapes `overflow` but not a mask.
 */
function liftPanel(list: HTMLElement): void {
  if (hasPopover(list)) {
    list.setAttribute("popover", "manual");
    try {
      list.showPopover();
    } catch {
      // already shown, or the element cannot be a popover; the fixed styles below still apply
    }
  }
  list.style.position = "fixed";
}

function dropPanel(list: HTMLElement): void {
  if (hasPopover(list) && list.hasAttribute("popover")) {
    try {
      list.hidePopover();
    } catch {
      // not shown
    }
    list.removeAttribute("popover");
  }
  list.style.position = "";
  list.style.top = "";
  list.style.left = "";
  list.style.right = "";
}

/**
 * Panels must not leave the viewport and must not be clipped. A flyout in the right half of
 * the page opens to the left (`flyout.side: auto`); a dropdown or mega panel that would stick
 * out on the right hangs from its item's right edge; a panel inside a scrolling container
 * (which would clip it) is lifted into the top layer (Popover API) or, failing that, taken out
 * of flow with `position: fixed`, and closed on scroll.
 */
function placePanels(nav: HTMLElement): void {
  const variant = nav.dataset.variant ?? "";
  const flyout = variant === "flyout";
  if (flyout && nav.dataset.flyoutSide === "auto") {
    const rect = nav.getBoundingClientRect();
    const left = rect.width > 0 && rect.left + rect.width / 2 > window.innerWidth / 2;
    nav.classList.toggle("quartz-nav--flyout-left", left);
  }
  const clipped = clippingAncestor(nav) !== null;
  const fixedPanels = new Set<HTMLElement>();
  nav.querySelectorAll<HTMLDetailsElement>("details.quartz-nav__folder").forEach((details) => {
    const list = details.querySelector<HTMLElement>(":scope > ul");
    if (!list) return;
    const reset = () => {
      list.classList.remove("quartz-nav__list--flip");
      dropPanel(list);
      fixedPanels.delete(list);
    };
    const onToggle = () => {
      reset();
      if (!details.open) return;
      const row = details.getBoundingClientRect();
      const nested = details.parentElement?.closest("details.quartz-nav__folder") !== null;
      if (clipped && !nested && row.width > 0) {
        // Anchored to the row instead of the clipping container.
        const toLeft = flyout && nav.classList.contains("quartz-nav--flyout-left");
        liftPanel(list);
        list.style.top = `${flyout ? row.top : row.bottom + 4}px`;
        if (toLeft) {
          list.style.left = "auto";
          list.style.right = `${window.innerWidth - row.left + 4}px`;
        } else {
          list.style.right = "auto";
          list.style.left = `${flyout ? row.right + 4 : row.left}px`;
        }
        fixedPanels.add(list);
      }
      if (flyout) return;
      const r = list.getBoundingClientRect();
      if (r.width > 0 && r.right > window.innerWidth) {
        if (list.style.position === "fixed") {
          list.style.left = "auto";
          list.style.right = `${window.innerWidth - row.right}px`;
        } else {
          list.classList.add("quartz-nav__list--flip");
        }
      }
    };
    details.addEventListener("toggle", onToggle);
    window.addCleanup(() => details.removeEventListener("toggle", onToggle));
  });
  if (!clipped) return;
  // Fixed coordinates go stale while the container scrolls, so such panels close.
  const onScroll = () => {
    for (const list of fixedPanels) {
      const details = list.parentElement;
      if (details instanceof HTMLDetailsElement) details.open = false;
    }
  };
  document.addEventListener("scroll", onScroll, true);
  window.addCleanup(() => document.removeEventListener("scroll", onScroll, true));
}

function setupPopups(nav: HTMLElement): void {
  if (!POPUPS.includes(nav.dataset.variant ?? "")) return;
  placePanels(nav);
  const all = () =>
    Array.from(nav.querySelectorAll<HTMLDetailsElement>("details.quartz-nav__folder"));
  const closeAll = (except?: HTMLDetailsElement) => {
    for (const d of all()) {
      if (d !== except && !(except && d.contains(except))) d.open = false;
    }
  };

  // Opening one panel closes its siblings, as menus are expected to behave.
  for (const details of all()) {
    const onToggle = () => {
      if (!details.open) return;
      const parentList = details.parentElement?.parentElement;
      if (!parentList) return;
      for (const other of parentList.querySelectorAll<HTMLDetailsElement>(
        ":scope > li > details",
      )) {
        if (other !== details) other.open = false;
      }
    };
    details.addEventListener("toggle", onToggle);
    window.addCleanup(() => details.removeEventListener("toggle", onToggle));
  }

  const onClick = (e: MouseEvent) => {
    if (!(e.target instanceof Node) || !nav.contains(e.target)) closeAll();
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key !== "Escape") return;
    // Keyboard users would otherwise be left inside a panel that just disappeared.
    const focused = document.activeElement;
    const owner = all().find((d) => d.open && focused instanceof Node && d.contains(focused));
    closeAll();
    owner?.querySelector<HTMLElement>("summary")?.focus();
  };
  const onPrenav = () => closeAll();
  document.addEventListener("click", onClick);
  document.addEventListener("keydown", onKey);
  document.addEventListener("prenav", onPrenav);
  window.addCleanup(() => document.removeEventListener("click", onClick));
  window.addCleanup(() => document.removeEventListener("keydown", onKey));
  window.addCleanup(() => document.removeEventListener("prenav", onPrenav));

  const hover = nav.dataset.trigger === "hover" && window.matchMedia("(hover: hover)").matches;
  if (!hover) return;
  nav.querySelectorAll<HTMLLIElement>("li.quartz-nav__item--folder").forEach((item) => {
    const details = item.querySelector<HTMLDetailsElement>(":scope > details");
    if (!details) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const open = () => {
      if (timer) clearTimeout(timer);
      markAnimated(details);
      details.open = true;
    };
    const close = () => {
      timer = setTimeout(() => {
        details.open = false;
      }, 150);
    };
    const onFocusOut = (e: FocusEvent) => {
      if (!(e.relatedTarget instanceof Node) || !item.contains(e.relatedTarget)) close();
    };
    item.addEventListener("mouseenter", open);
    item.addEventListener("mouseleave", close);
    item.addEventListener("focusin", open);
    item.addEventListener("focusout", onFocusOut);
    window.addCleanup(() => {
      if (timer) clearTimeout(timer);
      item.removeEventListener("mouseenter", open);
      item.removeEventListener("mouseleave", close);
      item.removeEventListener("focusin", open);
      item.removeEventListener("focusout", onFocusOut);
    });
  });
}

function setupOffcanvas(nav: HTMLElement): void {
  if (nav.dataset.mobile !== "offcanvas") return;
  const toggle = nav.querySelector<HTMLInputElement>("input.quartz-nav__toggle");
  if (!toggle) return;
  const panel = nav.querySelector<HTMLElement>(".quartz-nav__panel");
  const apply = () => {
    document.documentElement.classList.toggle(LOCK_CLASS, toggle.checked);
    toggle.setAttribute("aria-expanded", String(toggle.checked));
  };
  const close = () => {
    if (!toggle.checked) return;
    const focused = document.activeElement;
    toggle.checked = false;
    apply();
    if (panel && focused instanceof Node && panel.contains(focused)) toggle.focus();
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") close();
  };
  apply();
  toggle.addEventListener("change", apply);
  document.addEventListener("keydown", onKey);
  document.addEventListener("prenav", close);
  window.addCleanup(() => {
    toggle.removeEventListener("change", apply);
    document.removeEventListener("keydown", onKey);
    document.removeEventListener("prenav", close);
    document.documentElement.classList.remove(LOCK_CLASS);
  });
}

type RailState = "closed" | "part" | "open";

/**
 * A sticky or fixed bar at the top of the viewport among `el` and its ancestors: starting in
 * the top 15% (a sticky bar may keep a gap above it) and at most 30% as high. A sticky sidebar
 * column is neither, and must not push the rail below its own bottom. `wide` also asks for half
 * the viewport's width, for bars found by position rather than as the navigation's own.
 */
function topBarAround(el: Element | null, wide: boolean): HTMLElement | null {
  let e = el;
  while (e && e !== document.body && e !== document.documentElement) {
    const pos = getComputedStyle(e).position;
    if (pos === "sticky" || pos === "fixed") {
      const r = e.getBoundingClientRect();
      if (
        r.top <= window.innerHeight * 0.15 &&
        (!wide || r.width >= window.innerWidth / 2) &&
        r.height > 0 &&
        r.height <= window.innerHeight * 0.3
      ) {
        return e as HTMLElement;
      }
    }
    e = e.parentElement;
  }
  return null;
}

/**
 * The site's top bar the rail starts below: the one the navigation sits in, or else whatever
 * bar covers the top of the viewport (a rail in a sidebar); `null` without one.
 */
function findTopBar(nav: HTMLElement): HTMLElement | null {
  let bar = topBarAround(nav.parentElement, false);
  if (!bar && typeof document.elementsFromPoint === "function") {
    const ys = [1, 0.05, 0.1].map((f) => Math.max(1, Math.round(window.innerHeight * f)));
    for (const y of ys) {
      for (const hit of document.elementsFromPoint(window.innerWidth / 2, y)) {
        if (nav.contains(hit)) continue;
        bar = topBarAround(hit, true);
        if (bar) break;
      }
      if (bar) break;
    }
  }
  return bar;
}

type RailSide = "left" | "right";
type RailPush = { px: number; css: string; can: boolean };

/**
 * What every rail on the page pushes, per screen edge. Rails on the same edge overlap, so the
 * page moves by the widest of them; each rail only reports its own share and `syncRailSide`
 * writes the result to <html>, so that no rail overwrites another's.
 */
const railPushes: Record<RailSide, Map<HTMLElement, RailPush>> = {
  left: new Map(),
  right: new Map(),
};

function railPushedPx(side: RailSide): number {
  let px = 0;
  for (const p of railPushes[side].values()) px = Math.max(px, p.px);
  return px;
}

function syncRailSide(side: RailSide): void {
  const root = document.documentElement;
  const entries = [...railPushes[side].values()];
  const can = entries.some((p) => p.can);
  const widest = entries.reduce<RailPush | undefined>(
    (best, p) => (p.css && (!best || p.px > best.px) ? p : best),
    undefined,
  );
  const before = root.style.getPropertyValue(`--quartz-nav-rail-offset-${side}`);
  root.classList.toggle(`quartz-nav-rail-push-${side}`, can);
  root.classList.toggle(`quartz-nav-rail-${side}`, widest !== undefined);
  // Pixels where the width could be measured: a token such as `min(20rem, 100vw)` read from
  // the navigation would resolve against <html> instead and may differ (`em`) or be invalid
  // for the registered length (`%`).
  const value = widest ? (widest.px > 0 ? `${widest.px}px` : widest.css) : "0px";
  if (can) root.style.setProperty(`--quartz-nav-rail-offset-${side}`, value);
  else root.style.removeProperty(`--quartz-nav-rail-offset-${side}`);
  // The rail on the other edge may now have room to push, or no longer have it.
  if (root.style.getPropertyValue(`--quartz-nav-rail-offset-${side}`) !== before) {
    document.dispatchEvent(new CustomEvent(RAIL_PUSH_EVENT, { detail: side }) as never);
  }
}

/**
 * The rail (Nexus menu). `closed` shows the button only (`rest: hidden`) or the icon strip
 * (`rest: icons`); `part` slides in the strip while the pointer rests on the button; `open` is
 * the full menu. Opened by hover, it closes when the pointer leaves, whatever was clicked in
 * it; opened by click or keyboard, it stays until a click outside, Escape, the button or a page
 * change. Pinned, only the button or the pin closes it, and it is restored on the next page;
 * pinning holds on wide screens only, a phone treats a pinned menu like any other.
 *
 * `content` says whether the page moves aside (`push`) or stays under the menu (`overlay`);
 * `hoverContent` and `pinContent` may say otherwise for hover and pin. Pushing, the script
 * reports its width to `syncRailSide`, which sets `--quartz-nav-rail-offset-left|right` on
 * <html>, and the stylesheet pads <body>.
 */
function setupRail(nav: HTMLElement): void {
  if (nav.dataset.variant !== "rail") return;
  const trigger = nav.querySelector<HTMLButtonElement>("button.quartz-nav__rail-trigger");
  const panel = nav.querySelector<HTMLElement>(":scope > .quartz-nav__panel");
  if (!trigger || !panel) return;
  const backdrop = nav.querySelector<HTMLElement>(":scope > .quartz-nav__rail-backdrop");
  const pinButton = panel.querySelector<HTMLButtonElement>("button.quartz-nav__rail-pin");
  const icons = nav.dataset.railRest === "icons";
  const contentMode = nav.dataset.railContent === "push" ? "push" : "overlay";
  const modeOf = (setting: string | undefined) =>
    setting === "push" || setting === "overlay" ? setting : contentMode;
  const hoverMode = modeOf(nav.dataset.railHoverContent);
  const pinMode = modeOf(nav.dataset.railPinContent);
  const canPush = [contentMode, hoverMode, pinMode].includes("push");
  // `onNavigate: keep`: a link clicked in the menu does not close it; the next page shows it
  // open again, and it closes once the pointer leaves it.
  const keepOnNavigate = nav.dataset.railOnNavigate === "keep";
  const query = mobileQuery(nav);
  const mobile = () => query?.matches ?? false;
  const canHover = window.matchMedia("(hover: hover)").matches;
  const expand = nav.dataset.railExpand ?? "hover";
  const hoverButton = canHover && expand === "hover";
  const hoverStrip = canHover && (expand === "hover" || expand === "strip");
  const root = document.documentElement;
  const side: RailSide = nav.classList.contains("quartz-nav--rail-right") ? "right" : "left";
  const otherSide: RailSide = side === "left" ? "right" : "left";
  const id = nav.dataset.quartzNav ?? "";
  const pinKey = `quartz-nav:${id}:rail-pinned`;
  const carryKey = `quartz-nav:${id}:rail-carry`;
  const stripKey = `quartz-nav:${id}:rail-strip`;
  const topKey = `quartz-nav:${id}:rail-top`;
  let state: RailState = "closed";
  let byHover = false;
  let pinned = false;
  // Open across a page change (`onNavigate: keep`): leaving the menu closes it, however it was
  // opened.
  let leaveArmed = false;
  // When a link in the menu was followed with `onNavigate: keep`; the page change that follows
  // within seconds leaves the menu open.
  let carryAt = 0;
  // Pixels this rail currently pushes the page by, and the panel's last measured top edge.
  let lastPx = 0;
  let lastTop = -1;
  let timer: ReturnType<typeof setTimeout> | undefined;

  // A pin holds on wide screens only. On a phone the menu closes like any other, and the pin
  // stays remembered for the next wide window.
  const holding = () => pinned && !mobile();

  const storage = (store: "local" | "session") =>
    store === "local" ? window.localStorage : window.sessionStorage;
  const remember = (store: "local" | "session", key: string, value: string | null) => {
    try {
      const s = storage(store);
      if (value === null) s.removeItem(key);
      else if (s.getItem(key) !== value) s.setItem(key, value);
    } catch {
      // storage unavailable: the state lasts for this page only
    }
  };
  const recall = (store: "local" | "session", key: string): string | null => {
    try {
      return storage(store).getItem(key);
    } catch {
      return null;
    }
  };

  // The page switches its layout by the window's width, not by the room left beside a pushing
  // menu. A desktop layout may get narrower, down to the tablet range; but where pushing would
  // leave less than the mobile breakpoint, the page could not show its mobile layout, so the
  // rail lies over the page instead.
  const bpPx = (value: string | undefined): number => {
    const m = /^([0-9.]+)(px|rem|em)$/.exec((value ?? "").trim());
    if (!m) return NaN;
    // Media queries resolve rem and em against the initial font size, not the page's.
    return Number(m[1]) * (m[2] === "px" ? 1 : 16);
  };
  const bpMobile = bpPx(nav.dataset.bpMobile);
  // What the early script in <head> needs to show the menu before this script runs
  // (rail-restore.inline.ts): edge, pushed width, mobile breakpoint.
  const restoreRecord = () => ({ side, px: lastPx, bp: Number.isFinite(bpMobile) ? bpMobile : 0 });
  const pxWidth = (name: string): number => {
    const probe = document.createElement("div");
    probe.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;width:var(${name})`;
    nav.append(probe);
    const width = probe.getBoundingClientRect().width;
    probe.remove();
    return width;
  };
  // A rail pushing on the other edge counts in: two menus together must not squeeze the page.
  const keepsView = (amount: number): boolean => {
    if (!(amount > 0) || !(bpMobile > 0)) return true;
    return window.innerWidth - railPushedPx(otherSide) - amount > bpMobile;
  };
  const cssWidth = (name: string, fallback: string) =>
    getComputedStyle(nav).getPropertyValue(name).trim() || fallback;
  // How far the page moves: the visible width of the panel, when the mode of the way it was
  // opened is `push`. The push class stays on while the rail can push at all, so that closing
  // animates back to 0 instead of dropping the padding at once.
  const applyOffset = () => {
    const desktop = !mobile();
    const viaHover = state === "part" || (state === "open" && byHover);
    const mode = holding() && state === "open" ? pinMode : viaHover ? hoverMode : contentMode;
    const widthVar =
      state === "open"
        ? "--quartz-nav-rail-open-width"
        : state === "part" || icons
          ? "--quartz-nav-rail-width"
          : "";
    const pushes = desktop && mode === "push" && widthVar !== "";
    const px = pushes ? Math.round(pxWidth(widthVar)) : 0;
    const on = pushes && keepsView(px);
    lastPx = on ? px : 0;
    railPushes[side].set(nav, {
      px: lastPx,
      css: on ? cssWidth(widthVar, state === "open" ? "20rem" : "3.5rem") : "",
      can: canPush && desktop,
    });
    syncRailSide(side);
    if (on && state === "open") nav.dataset.railPushing = "";
    else delete nav.dataset.railPushing;
    if (holding() && state === "open") remember("local", pinKey, JSON.stringify(restoreRecord()));
    // The permanent strip's push, for the early script as well.
    if (icons && state === "closed" && desktop) {
      remember("local", stripKey, contentMode === "push" ? JSON.stringify(restoreRecord()) : null);
    }
  };

  let bar: HTMLElement | null | undefined;
  // `full` searches the top bar again (layout changes); otherwise the known bar's position is
  // read, which is all a scroll needs.
  const measure = (full = false) => {
    if (full || bar === undefined || (bar && !bar.isConnected)) bar = findTopBar(nav);
    const top = bar ? Math.max(0, Math.round(bar.getBoundingClientRect().bottom)) : 0;
    nav.style.setProperty("--_rail-top", `${top}px`);
    if (top === lastTop) return;
    lastTop = top;
    remember("local", topKey, String(top));
  };
  const cancel = () => {
    if (timer) clearTimeout(timer);
    timer = undefined;
  };
  const set = (next: RailState, viaHover = false) => {
    cancel();
    if (next !== "closed") measure();
    state = next;
    byHover = next === "open" && viaHover;
    leaveArmed = false;
    nav.dataset.railState = next;
    trigger.setAttribute("aria-expanded", String(next === "open"));
    root.classList.toggle(LOCK_CLASS, next === "open" && mobile());
    applyOffset();
  };
  const setPinned = (value: boolean) => {
    pinned = value;
    pinButton?.setAttribute("aria-pressed", String(value));
    applyOffset();
    if (!value) remember("local", pinKey, null);
  };
  // The grace period lets the pointer travel from the button to the strip, which may sit at
  // the other end of the header.
  const later = (next: RailState, ms: number) => {
    cancel();
    timer = setTimeout(() => set(next), ms);
  };
  const close = () => {
    if (state === "closed") return;
    const focused = document.activeElement;
    set("closed");
    // A hidden panel would leave the keyboard nowhere; the strip of `rest: icons` stays.
    if ((!icons || mobile()) && focused instanceof Node && panel.contains(focused)) {
      trigger.focus();
    }
  };
  // Clicks outside, Escape, leaving focus and page changes close only a menu that is not pinned.
  const dismiss = () => {
    if (!holding()) close();
  };

  // Inside a scrolling or masked sidebar a fixed panel is still clipped; the top layer is not.
  let lifted = clippingAncestor(nav) !== null && hasPopover(panel);
  if (lifted) {
    panel.setAttribute("popover", "manual");
    try {
      panel.showPopover();
    } catch {
      // Not possible here: without the attribute the panel stays an ordinary fixed box, rather
      // than a popover the browser keeps hidden.
      panel.removeAttribute("popover");
      lifted = false;
    }
  }

  // A menu carried over from the previous page (pinned, or `onNavigate: keep`) is simply there,
  // without sliding in or moving the page.
  const readCarry = (): { hover: boolean } | null => {
    const raw = recall("session", carryKey);
    remember("session", carryKey, null);
    if (!raw) return null;
    try {
      const carry = JSON.parse(raw) as { how?: string; at?: number };
      // A link that did not lead anywhere leaves a stale entry; only a page that follows
      // within seconds takes it up.
      return Date.now() - Number(carry.at) < 10000 ? { hover: carry.how === "hover" } : null;
    } catch {
      return null;
    }
  };
  const instant = () => {
    nav.dataset.railInstant = "";
    root.classList.add("quartz-nav-rail-instant");
    requestAnimationFrame(() => requestAnimationFrame(() => delete nav.dataset.railInstant));
  };
  // A pin of a rail that no longer offers one is forgotten, so the early script stops showing it.
  if (!pinButton) remember("local", pinKey, null);
  if (!icons) remember("local", stripKey, null);
  const storedPin = pinButton !== null && recall("local", pinKey) !== null;
  const carried = readCarry();
  if (storedPin && !mobile()) {
    instant();
    setPinned(true);
    set("open");
  } else if (carried && keepOnNavigate && !mobile()) {
    instant();
    set("open", carried.hover);
    leaveArmed = true;
  } else {
    // Loaded on a small screen, a stored pin waits for a wide window.
    if (storedPin) {
      pinned = true;
      pinButton?.setAttribute("aria-pressed", "true");
    }
    set("closed");
  }

  const onTriggerClick = () => {
    if (state === "open") {
      // Closing on a phone leaves the pin for the next wide window.
      if (!mobile()) setPinned(false);
      close();
    } else {
      set("open");
    }
  };
  // Pinning makes a menu opened by hover a deliberate one: it follows `pinContent` from now on.
  const onPinClick = () => {
    setPinned(!pinned);
    if (pinned && state !== "open") {
      set("open");
    } else if (byHover) {
      byHover = false;
      applyOffset();
    }
  };
  const onTriggerEnter = () => {
    if (state === "closed" && !mobile()) set("part");
    else if (state === "part") cancel();
  };
  const onTriggerLeave = () => {
    if (state === "part") later("closed", 700);
  };
  const onPanelEnter = () => {
    cancel();
    if (state !== "open" && !mobile()) set("open", true);
  };
  const onPanelLeave = () => {
    if (state === "open" && (byHover || leaveArmed) && !holding()) later("closed", 300);
  };
  // After a page change the pointer may rest in the menu without ever having entered this
  // page's panel, so leaving is read from the pointer's position instead.
  const onPointerMove = (e: MouseEvent) => {
    if (!leaveArmed || state !== "open" || holding()) return;
    if (e.target instanceof Node && nav.contains(e.target)) cancel();
    else if (!timer) later("closed", 300);
  };
  // `onNavigate: keep`: a link followed from the open menu leaves it open on the next page.
  // Only a plain click on a link to another page of this site counts: a modified click opens a
  // new tab and an anchor stays on this page, and neither should keep the menu open later.
  const onPanelClick = (e: MouseEvent) => {
    if (!keepOnNavigate || holding() || state !== "open" || mobile()) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = e.target instanceof Element ? e.target.closest("a[href]") : null;
    if (!(link instanceof HTMLAnchorElement) || !panel.contains(link)) return;
    if ((link.target && link.target !== "_self") || link.hasAttribute("download")) return;
    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin) return;
    if (url.pathname === window.location.pathname && url.search === window.location.search) return;
    carryAt = Date.now();
    remember(
      "session",
      carryKey,
      JSON.stringify({ how: byHover ? "hover" : "click", at: carryAt, ...restoreRecord() }),
    );
  };
  const onFocusIn = () => {
    if (state !== "open") set("open");
  };
  const onFocusOut = (e: FocusEvent) => {
    const to = e.relatedTarget;
    if (to instanceof Node && !nav.contains(to)) dismiss();
  };
  const onDocClick = (e: MouseEvent) => {
    if (state !== "closed" && (!(e.target instanceof Node) || !nav.contains(e.target))) dismiss();
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key !== "Escape" || state === "closed" || holding()) return;
    const focused = document.activeElement;
    const inside = focused instanceof Node && nav.contains(focused);
    close();
    if (inside) trigger.focus();
  };
  const onPrenav = () => {
    const carrying = carryAt > 0 && Date.now() - carryAt < 10000;
    carryAt = 0;
    if (!holding() && !carrying) set("closed");
  };
  // Scrolling moves a sticky bar with a gap above it (a frame's padding), resizing may change
  // the layout and the room to push; both are handled at most once per frame.
  let frame = 0;
  let resized = false;
  const schedule = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (state !== "closed" || icons) measure(resized);
      if (resized) applyOffset();
      resized = false;
    });
  };
  const onScroll = () => {
    if (state !== "closed" || icons) schedule();
  };
  const onResize = () => {
    resized = true;
    schedule();
  };
  const onOtherPush = (e: Event) => {
    if ((e as CustomEvent<string>).detail !== side) applyOffset();
  };
  // A phone closes a pinned menu; widening the window again brings it back.
  const onQuery = () => {
    if (mobile() && state === "part") set("closed");
    else if (mobile() && pinned && state === "open") set("closed");
    else if (!mobile() && pinned && state !== "open") set("open");
    else applyOffset();
    root.classList.toggle(LOCK_CLASS, state === "open" && mobile());
  };

  trigger.addEventListener("click", onTriggerClick);
  pinButton?.addEventListener("click", onPinClick);
  panel.addEventListener("focusin", onFocusIn);
  panel.addEventListener("click", onPanelClick);
  panel.addEventListener("mouseleave", onPanelLeave);
  document.addEventListener("mousemove", onPointerMove, { passive: true });
  nav.addEventListener("focusout", onFocusOut);
  backdrop?.addEventListener("click", close);
  document.addEventListener("click", onDocClick);
  document.addEventListener("keydown", onKey);
  document.addEventListener("prenav", onPrenav);
  window.addEventListener("resize", onResize);
  document.addEventListener(RAIL_PUSH_EVENT, onOtherPush);
  window.addEventListener("scroll", onScroll, { passive: true });
  if (hoverButton) {
    trigger.addEventListener("mouseenter", onTriggerEnter);
    trigger.addEventListener("mouseleave", onTriggerLeave);
  }
  if (hoverStrip) panel.addEventListener("mouseenter", onPanelEnter);
  const watchQuery = query && typeof query.addEventListener === "function";
  if (watchQuery) query.addEventListener("change", onQuery);
  if (icons) measure(true);

  window.addCleanup(() => {
    cancel();
    trigger.removeEventListener("click", onTriggerClick);
    pinButton?.removeEventListener("click", onPinClick);
    panel.removeEventListener("focusin", onFocusIn);
    panel.removeEventListener("click", onPanelClick);
    document.removeEventListener("mousemove", onPointerMove);
    nav.removeEventListener("focusout", onFocusOut);
    backdrop?.removeEventListener("click", close);
    document.removeEventListener("click", onDocClick);
    document.removeEventListener("keydown", onKey);
    document.removeEventListener("prenav", onPrenav);
    window.removeEventListener("resize", onResize);
    document.removeEventListener(RAIL_PUSH_EVENT, onOtherPush);
    window.removeEventListener("scroll", onScroll);
    if (frame) cancelAnimationFrame(frame);
    trigger.removeEventListener("mouseenter", onTriggerEnter);
    trigger.removeEventListener("mouseleave", onTriggerLeave);
    panel.removeEventListener("mouseenter", onPanelEnter);
    panel.removeEventListener("mouseleave", onPanelLeave);
    if (watchQuery) query.removeEventListener("change", onQuery);
    if (lifted) dropPanel(panel);
    root.classList.remove(LOCK_CLASS);
    railPushes[side].delete(nav);
    syncRailSide(side);
  });
}

/**
 * After every page setup: the early script's stand-in styles go, whether or not a rail on this
 * page claimed them (a stored menu may belong to a rail this page does not have), and its
 * no-animation flag ends after the first frames.
 */
function settleRailRestore(): void {
  document.getElementById(RESTORE_STYLE_ID)?.remove();
  const root = document.documentElement;
  if (!root.classList.contains("quartz-nav-rail-instant")) return;
  requestAnimationFrame(() =>
    requestAnimationFrame(() => root.classList.remove("quartz-nav-rail-instant")),
  );
}

function setupSelects(nav: HTMLElement): void {
  nav.querySelectorAll<HTMLSelectElement>("select.quartz-nav__select").forEach((select) => {
    const go = () => {
      const href = select.value;
      if (!href) return;
      const url = new URL(href, window.location.href);
      if (typeof window.spaNavigate === "function") {
        void window.spaNavigate(url, false);
      } else {
        window.location.assign(url.toString());
      }
    };
    // Browsers fire `change` while a keyboard user arrows through a closed select, so a
    // change reached by keyboard waits for Enter or the "Go" button (WCAG 3.2.2).
    let viaKeyboard = false;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        go();
      } else if (e.key.startsWith("Arrow") || e.key === "Home" || e.key === "End") {
        viaKeyboard = true;
      }
    };
    const onPointer = () => {
      viaKeyboard = false;
    };
    const onChange = () => {
      if (!viaKeyboard) go();
    };
    select.addEventListener("keydown", onKeyDown);
    select.addEventListener("pointerdown", onPointer);
    select.addEventListener("change", onChange);
    window.addCleanup(() => {
      select.removeEventListener("keydown", onKeyDown);
      select.removeEventListener("pointerdown", onPointer);
      select.removeEventListener("change", onChange);
    });
    const button = nav.querySelector<HTMLButtonElement>(`button[data-select="${select.id}"]`);
    if (button) {
      button.addEventListener("click", go);
      window.addCleanup(() => button.removeEventListener("click", go));
    }
  });
}

function scrollActiveIntoView(nav: HTMLElement): void {
  const variant = nav.dataset.variant ?? "";
  if (!["tree", "accordion", "flyout"].includes(variant)) return;
  const panel = nav.querySelector<HTMLElement>(".quartz-nav__panel");
  const active = panel?.querySelector<HTMLElement>("a.active");
  if (!panel || !active || panel.scrollHeight <= panel.clientHeight) return;
  if (typeof active.scrollIntoView === "function") active.scrollIntoView({ block: "nearest" });
}

function setup(): void {
  document.querySelectorAll<HTMLElement>("nav[data-quartz-nav]").forEach((nav) => {
    setupAnimation(nav);
    setupFolders(nav);
    setupPopups(nav);
    setupOffcanvas(nav);
    setupRail(nav);
    setupSelects(nav);
    scrollActiveIntoView(nav);
  });
  settleRailRestore();
}

document.addEventListener("nav", setup);
