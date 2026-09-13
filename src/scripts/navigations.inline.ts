/**
 * Client-side part of quartz-navigations. Attached as `afterDOMLoaded` of the component and
 * driven by Quartz's `nav` event. Everything the markup needs works without this script
 * (`<details>`, a checkbox for the off-canvas panel); it only adds persistence, closing
 * behaviour, hover opening, the scroll lock and select-based navigation.
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

function setupPopups(nav: HTMLElement): void {
  if (!POPUPS.includes(nav.dataset.variant ?? "")) return;
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
  if (!["vertical", "accordion", "flyout"].includes(variant)) return;
  const panel = nav.querySelector<HTMLElement>(".quartz-nav__panel");
  const active = panel?.querySelector<HTMLElement>("a.active");
  if (!panel || !active || panel.scrollHeight <= panel.clientHeight) return;
  if (typeof active.scrollIntoView === "function") active.scrollIntoView({ block: "nearest" });
}

function setup(): void {
  document.querySelectorAll<HTMLElement>("nav[data-quartz-nav]").forEach((nav) => {
    setupFolders(nav);
    setupPopups(nav);
    setupOffcanvas(nav);
    setupSelects(nav);
    scrollActiveIntoView(nav);
  });
}

document.addEventListener("nav", setup);
