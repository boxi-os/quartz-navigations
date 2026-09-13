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

function isMobile(nav: HTMLElement): boolean {
  const bp = nav.dataset.bpMobile;
  return bp ? window.matchMedia(`(max-width: ${bp})`).matches : false;
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

function setupFolders(nav: HTMLElement): void {
  const id = nav.dataset.quartzNav ?? "";
  const persist = nav.dataset.persist === "true";
  const expandActive = nav.dataset.expandActive === "true";
  const mobile = isMobile(nav);
  const state = persist ? readState(id) : {};

  nav.querySelectorAll<HTMLDetailsElement>("details[data-folder]").forEach((details) => {
    const slug = details.dataset.folder ?? "";
    const onTrail = details.dataset.trail === "true";
    const stored = persist && slug in state ? state[slug] === true : undefined;
    if (details.dataset.mobileCollapsible !== undefined) {
      // Rendered open so the desktop layout works without JS; collapse on small screens.
      details.open = !mobile || onTrail || stored === true;
    } else if (stored !== undefined && !(expandActive && onTrail)) {
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
    setupSelects(nav);
    scrollActiveIntoView(nav);
  });
}

document.addEventListener("nav", setup);
