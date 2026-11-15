/**
 * Runs in <head> (`beforeDOMLoaded`, Quartz's prescript), before the page is first painted.
 *
 * A pinned rail menu, or one carried over a page change (`onNavigate: keep`), is otherwise
 * restored by the main script, which Quartz loads as a deferred module: the browser paints the
 * page once with the menu closed and the page unpushed, and then everything jumps (measured: a
 * layout shift of 0.19 on a full reload). This script repeats the restored state early from what
 * the main script stored: classes and offsets on <html>, and a <style> that shows each restored
 * panel open. The main script removes the <style> when it takes over.
 *
 * The navigation does not exist yet, so everything it needs comes from storage:
 * `quartz-nav:<id>:rail-pinned` / `rail-carry` hold `{ side, px, bp }` (pushed width and mobile
 * breakpoint, in pixels), `quartz-nav:<id>:rail-top` the panel's last top edge.
 *
 * A plain script, wrapped so that nothing leaks into the global scope of the classic <script>.
 */
(() => {
  type Restore = { side: "left" | "right"; px: number; bp: number };
  const STYLE_ID = "quartz-nav-rail-restore";
  const KEY = /^quartz-nav:(.+):rail-(pinned|carry|top)$/;
  const CARRY_MAX_AGE = 10000;

  const parse = (raw: string | null): (Partial<Restore> & { at?: number }) | null => {
    if (!raw) return null;
    try {
      const value: unknown = JSON.parse(raw);
      return value !== null && typeof value === "object" ? (value as Partial<Restore>) : null;
    } catch {
      return null;
    }
  };
  const valid = (r: Partial<Restore> | null): r is Restore =>
    r !== null &&
    (r.side === "left" || r.side === "right") &&
    typeof r.px === "number" &&
    typeof r.bp === "number";
  // Instance ids are limited to [A-Za-z0-9_-] by the plugin's options; anything else is skipped.
  const safe = (id: string) => /^[A-Za-z0-9_-]+$/.test(id);

  try {
    const open = new Map<string, Restore>();
    const pinned = new Set<string>();
    const tops = new Map<string, number>();
    const scan = (store: Storage, carry: boolean) => {
      for (let i = 0; i < store.length; i++) {
        const key = store.key(i);
        const m = key ? KEY.exec(key) : null;
        if (!m || !safe(m[1]!)) continue;
        const [, id, kind] = m as unknown as [string, string, string];
        if (!carry && kind === "top") {
          const top = Number(store.getItem(key!));
          if (Number.isFinite(top) && top >= 0) tops.set(id, top);
        } else if ((kind === "pinned" && !carry) || (kind === "carry" && carry)) {
          const r = parse(store.getItem(key!));
          if (carry && !(r && Date.now() - Number(r.at) < CARRY_MAX_AGE)) continue;
          if (!valid(r) || open.has(id)) continue;
          open.set(id, r);
          if (kind === "pinned") pinned.add(id);
        }
      }
    };
    scan(localStorage, false);
    scan(sessionStorage, true);

    const root = document.documentElement;
    const width = window.innerWidth;
    const pushed = { left: 0, right: 0 };
    const rules: string[] = [];
    for (const [id, top] of tops) {
      rules.push(`nav[data-quartz-nav="${id}"]{--_rail-top:${top}px}`);
    }
    for (const [id, r] of open) {
      // Small screens never restore a menu.
      if (width <= r.bp) continue;
      const nav = `nav[data-quartz-nav="${id}"]`;
      rules.push(
        `${nav}>.quartz-nav__panel{visibility:visible;transform:none;width:var(--quartz-nav-rail-open-width);transition:none}`,
        `${nav}>.quartz-nav__panel .quartz-nav__rail-head{visibility:visible}`,
        `${nav}>.quartz-nav__panel .quartz-nav__list .quartz-nav__list{display:block}`,
      );
      if (pinned.has(id)) {
        rules.push(
          `${nav} .quartz-nav__rail-pin{color:var(--quartz-nav-color-active)}`,
          `${nav} .quartz-nav__rail-pin .quartz-nav__icon--pin{display:none}`,
          `${nav} .quartz-nav__rail-pin .quartz-nav__icon--unpin{display:inline-flex}`,
        );
      }
      const other = r.side === "left" ? pushed.right : pushed.left;
      // The same rule as the main script: push only while the page keeps more than the mobile
      // breakpoint, counting the other side.
      if (r.px > 0 && width - other - r.px > r.bp) pushed[r.side] = r.px;
      else rules.push(`${nav}>.quartz-nav__panel{box-shadow:var(--quartz-nav-shadow)}`);
    }
    if (open.size > 0) root.classList.add("quartz-nav-rail-instant");
    for (const side of ["left", "right"] as const) {
      if (!pushed[side]) continue;
      root.classList.add(`quartz-nav-rail-push-${side}`, `quartz-nav-rail-${side}`);
      root.style.setProperty(`--quartz-nav-rail-offset-${side}`, `${pushed[side]}px`);
    }
    if (rules.length > 0) {
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.textContent = rules.join("\n");
      document.head.append(style);
    }
  } catch {
    // Storage blocked or unavailable: the main script restores the menu as before.
  }
})();
