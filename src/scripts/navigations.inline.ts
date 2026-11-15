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
 * Where the rail starts: below the site's top bar, so it does not slide under it. The bar is
 * the one the navigation sits in, or else whatever bar covers the top of the viewport (a rail
 * in a sidebar); 0 without one.
 */
function railTop(nav: HTMLElement): number {
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
  return bar ? Math.max(0, bar.getBoundingClientRect().bottom) : 0;
}

/**
 * The rail (Nexus menu). `closed` shows the button only (`rest: hidden`) or the icon strip
 * (`rest: icons`); `part` slides in the strip while the pointer rests on the button; `open` is
 * the full menu. Opened by hover, it closes when the pointer leaves, whatever was clicked in
 * it; opened by click or keyboard, it stays until a click outside, Escape, the button or a page
 * change. Pinned, only the button or the pin closes it, and it is restored on the next page.
 *
 * `content` says whether the page moves aside (`push`) or stays under the menu (`overlay`);
 * `hoverContent` may say otherwise for the strip and a menu opened by hover. Pushing, the script
 * sets the width on <html> (`--quartz-nav-rail-offset-left|right`) and the stylesheet pads <body>.
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
  const pinKey = `quartz-nav:${nav.dataset.quartzNav ?? ""}:rail-pinned`;
  const carryKey = `quartz-nav:${nav.dataset.quartzNav ?? ""}:rail-carry`;
  let state: RailState = "closed";
  let byHover = false;
  let pinned = false;
  // Open across a page change (`onNavigate: keep`): leaving the menu closes it, however it was
  // opened.
  let leaveArmed = false;
  let carrying = false;
  // Pixels this rail currently pushes the page by, and the panel's last measured top edge.
  let lastPx = 0;
  let lastTop = -1;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const readPinned = (): boolean => {
    try {
      return localStorage.getItem(pinKey) !== null;
    } catch {
      return false;
    }
  };
  // Besides the pin itself, the record holds what the early script in <head> needs to show the
  // menu before this script runs (rail-restore.inline.ts): side, pushed width, mobile breakpoint.
  const restoreRecord = () => ({ side, px: lastPx, bp: Number.isFinite(bpMobile) ? bpMobile : 0 });
  const writePinned = (value: boolean) => {
    try {
      if (value) localStorage.setItem(pinKey, JSON.stringify(restoreRecord()));
      else localStorage.removeItem(pinKey);
    } catch {
      // storage unavailable: the pin lasts for this page only
    }
  };

  const side = nav.classList.contains("quartz-nav--rail-right") ? "right" : "left";
  const sideClass = `quartz-nav-rail-${side}`;
  const pushClass = `quartz-nav-rail-push-${side}`;
  // One variable per side, so a rail on the left and one on the right do not overwrite each other.
  const offsetVar = `--quartz-nav-rail-offset-${side}`;
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
  const pxWidth = (name: string): number => {
    const probe = document.createElement("div");
    probe.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;width:var(${name})`;
    nav.append(probe);
    const width = probe.getBoundingClientRect().width;
    probe.remove();
    return width;
  };
  // Each rail notes on <html> how many pixels it pushes, so that a rail on the other side
  // counts them in: two menus pushing together must not squeeze the page either.
  const pushKey = side === "right" ? "quartzNavRailPushRight" : "quartzNavRailPushLeft";
  const otherKey = side === "right" ? "quartzNavRailPushLeft" : "quartzNavRailPushRight";
  const keepsView = (amount: number): boolean => {
    if (!(amount > 0) || !(bpMobile > 0)) return true;
    const other = Number(root.dataset[otherKey] ?? 0) || 0;
    return window.innerWidth - other - amount > bpMobile;
  };
  const cssWidth = (name: string, fallback: string) =>
    getComputedStyle(nav).getPropertyValue(name).trim() || fallback;
  // How far the page moves: the visible width of the panel, when the mode of the way it was
  // opened is `push`. The push class stays on while the rail can push at all, so that closing
  // animates back to 0 instead of dropping the padding at once.
  const applyOffset = () => {
    const desktop = !mobile();
    const viaHover = state === "part" || (state === "open" && byHover);
    const mode = pinned && state === "open" ? pinMode : viaHover ? hoverMode : contentMode;
    const width =
      state === "open"
        ? cssWidth("--quartz-nav-rail-open-width", "20rem")
        : state === "part" || icons
          ? cssWidth("--quartz-nav-rail-width", "3.5rem")
          : "";
    const widthVar = state === "open" ? "--quartz-nav-rail-open-width" : "--quartz-nav-rail-width";
    const px = desktop && mode === "push" && width ? pxWidth(widthVar) : 0;
    const amount = desktop && mode === "push" && width && keepsView(px) ? width : "";
    lastPx = amount && px > 0 ? Math.round(px) : 0;
    if (pinned && state === "open" && desktop) writePinned(true);
    const before = root.dataset[pushKey];
    if (amount && px > 0) root.dataset[pushKey] = String(Math.round(px));
    else delete root.dataset[pushKey];
    // The rail on the other side may now have room to push, or no longer have it.
    if (root.dataset[pushKey] !== before) {
      document.dispatchEvent(new CustomEvent(RAIL_PUSH_EVENT, { detail: side }) as never);
    }
    root.classList.toggle(pushClass, canPush && desktop);
    root.classList.toggle(sideClass, amount !== "");
    if (canPush && desktop) root.style.setProperty(offsetVar, amount || "0px");
    else root.style.removeProperty(offsetVar);
    if (amount && state === "open") nav.dataset.railPushing = "";
    else delete nav.dataset.railPushing;
  };

  const topKey = `quartz-nav:${nav.dataset.quartzNav ?? ""}:rail-top`;
  const measure = () => {
    const top = Math.round(railTop(nav));
    nav.style.setProperty("--_rail-top", `${top}px`);
    if (top === lastTop) return;
    lastTop = top;
    try {
      localStorage.setItem(topKey, String(top));
    } catch {
      // storage unavailable: the early script starts the panel at the top of the screen
    }
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
    if (!value) writePinned(false);
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
    if (!pinned) close();
  };

  // Inside a scrolling or masked sidebar a fixed panel is still clipped; the top layer is not.
  const lifted = clippingAncestor(nav) !== null && hasPopover(panel);
  if (lifted) {
    panel.setAttribute("popover", "manual");
    try {
      panel.showPopover();
    } catch {
      // not supported here; the panel stays fixed in place
    }
  }

  // A menu carried over from the previous page (pinned, or `onNavigate: keep`) is simply there,
  // without sliding in or moving the page.
  const readCarry = (): { hover: boolean } | null => {
    try {
      const raw = sessionStorage.getItem(carryKey);
      sessionStorage.removeItem(carryKey);
      if (!raw) return null;
      const carry = JSON.parse(raw) as { how?: string; at?: number };
      // A link that did not lead anywhere (an anchor on the same page) leaves a stale entry;
      // only a page that follows within seconds takes it up.
      return Date.now() - Number(carry.at) < 10000 ? { hover: carry.how === "hover" } : null;
    } catch {
      return null;
    }
  };
  const instant = () => {
    nav.dataset.railInstant = "";
    root.classList.add("quartz-nav-rail-instant");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        delete nav.dataset.railInstant;
        root.classList.remove("quartz-nav-rail-instant");
      }),
    );
  };
  const carried = readCarry();
  if (pinButton !== null && readPinned() && !mobile()) {
    instant();
    setPinned(true);
    set("open");
  } else if (carried && keepOnNavigate && !mobile()) {
    instant();
    set("open", carried.hover);
    leaveArmed = true;
  } else {
    set("closed");
  }
  // From here on this script owns the menu: the early script's stand-in styles go, and its
  // no-animation flag ends after the first frames.
  document.getElementById(RESTORE_STYLE_ID)?.remove();
  if (root.classList.contains("quartz-nav-rail-instant") && nav.dataset.railInstant === undefined) {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => root.classList.remove("quartz-nav-rail-instant")),
    );
  }

  const onTriggerClick = () => {
    if (state === "open") {
      setPinned(false);
      close();
    } else {
      set("open");
    }
  };
  // Pinning makes a menu opened by hover a deliberate one: it follows `content` from now on.
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
    if (state === "open" && (byHover || leaveArmed) && !pinned) later("closed", 300);
  };
  // After a page change the pointer may rest in the menu without ever having entered this
  // page's panel, so leaving is read from the pointer's position instead.
  const onPointerMove = (e: MouseEvent) => {
    if (!leaveArmed || state !== "open" || pinned) return;
    if (e.target instanceof Node && nav.contains(e.target)) cancel();
    else if (!timer) later("closed", 300);
  };
  // `onNavigate: keep`: a link followed from the open menu leaves it open on the next page.
  const onPanelClick = (e: MouseEvent) => {
    if (!keepOnNavigate || pinned || state !== "open" || mobile()) return;
    const link = e.target instanceof Element ? e.target.closest("a[href]") : null;
    if (!link || !panel.contains(link)) return;
    carrying = true;
    try {
      sessionStorage.setItem(
        carryKey,
        JSON.stringify({ how: byHover ? "hover" : "click", at: Date.now(), ...restoreRecord() }),
      );
    } catch {
      // storage unavailable: the menu closes as usual
      carrying = false;
    }
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
    if (e.key !== "Escape" || state === "closed" || pinned) return;
    const focused = document.activeElement;
    const inside = focused instanceof Node && nav.contains(focused);
    close();
    if (inside) trigger.focus();
  };
  const onPrenav = () => {
    if (!pinned && !carrying) set("closed");
  };
  // A sticky bar with a gap above it (a frame's padding) moves up as the page scrolls, so a
  // visible panel re-measures its top edge, at most once per frame.
  let frame = 0;
  const onReflow = () => {
    if (frame || (state === "closed" && !icons)) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      measure();
    });
  };
  const onOtherPush = (e: Event) => {
    if ((e as CustomEvent<string>).detail !== side) applyOffset();
  };
  // A narrower window may leave no room to push, a wider one may make room again.
  const onResize = () => {
    onReflow();
    applyOffset();
  };
  // Pinning belongs to wide screens: a phone closes the menu, and widening the window again
  // brings a pinned menu back.
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
  window.addEventListener("scroll", onReflow, { passive: true });
  if (hoverButton) {
    trigger.addEventListener("mouseenter", onTriggerEnter);
    trigger.addEventListener("mouseleave", onTriggerLeave);
  }
  if (hoverStrip) panel.addEventListener("mouseenter", onPanelEnter);
  const watchQuery = query && typeof query.addEventListener === "function";
  if (watchQuery) query.addEventListener("change", onQuery);
  if (icons) measure();

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
    window.removeEventListener("scroll", onReflow);
    if (frame) cancelAnimationFrame(frame);
    trigger.removeEventListener("mouseenter", onTriggerEnter);
    trigger.removeEventListener("mouseleave", onTriggerLeave);
    panel.removeEventListener("mouseenter", onPanelEnter);
    panel.removeEventListener("mouseleave", onPanelLeave);
    if (watchQuery) query.removeEventListener("change", onQuery);
    if (lifted) dropPanel(panel);
    root.classList.remove(LOCK_CLASS, sideClass, pushClass, "quartz-nav-rail-instant");
    root.style.removeProperty(offsetVar);
    delete root.dataset[pushKey];
  });
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
}

document.addEventListener("nav", setup);
