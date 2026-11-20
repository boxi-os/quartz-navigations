/**
 * Runs in <head> (`beforeDOMLoaded`, Quartz's prescript), before the page is first painted.
 *
 * A pinned rail menu, one carried over a page change (`onNavigate: keep`) and the permanent
 * strip of `rest: icons` with `content: push` are otherwise set up by the main script, which
 * Quartz loads as a deferred module: the browser paints the page once with the menu closed and
 * the page unpushed, and then everything jumps (measured: a layout shift of 0.19 on a full
 * reload). This script repeats that state early, from what the main script stored, as one
 * <style>. The main script removes it after every page setup.
 *
 * Every rule is scoped to its navigation (`body:has(nav[data-quartz-nav="…"].quartz-nav--rail-left)`
 * for the page's padding), so a stored menu that the page does not have, or that has since
 * moved to the other edge or lost its strip, changes nothing. Nothing is set on <html> but the
 * no-animation flag.
 *
 * Storage, written by the main script: `quartz-nav:<id>:rail-pinned` / `rail-carry` /
 * `rail-strip` hold `{ side, px, bp, over? }` (pushed width and mobile breakpoint, in pixels;
 * `over` when the open menu lies over the page while the strip under it still pushes),
 * `quartz-nav:<id>:rail-top` the panel's last top edge.
 *
 * A plain script, wrapped so that nothing leaks into the global scope of the classic <script>.
 */
(() => {
  type Side = "left" | "right";
  type Restore = { side: Side; px: number; bp: number; over?: boolean };
  type Kind = "pinned" | "carry" | "strip";
  const STYLE_ID = "quartz-nav-rail-restore";
  const KEY = /^quartz-nav:(.+):rail-(pinned|carry|strip|top)$/;
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
    r.px >= 0 &&
    typeof r.bp === "number";
  // Instance ids are limited to [A-Za-z0-9_-] by the plugin's options; anything else is skipped.
  const safe = (id: string) => /^[A-Za-z0-9_-]+$/.test(id);

  try {
    // Per navigation: the open menu (pinned or carried) wins over the resting strip.
    const shown = new Map<string, Restore & { kind: Kind }>();
    const tops = new Map<string, number>();
    const scan = (store: Storage, session: boolean) => {
      for (let i = 0; i < store.length; i++) {
        const key = store.key(i);
        const m = key ? KEY.exec(key) : null;
        if (!key || !m || !safe(m[1]!)) continue;
        const id = m[1]!;
        const kind = m[2] as Kind | "top";
        if (kind === "top") {
          const top = Number(store.getItem(key));
          if (!session && Number.isFinite(top) && top >= 0) tops.set(id, top);
          continue;
        }
        if ((kind === "carry") !== session) continue;
        const r = parse(store.getItem(key));
        if (kind === "carry" && !(r && Date.now() - Number(r.at) < CARRY_MAX_AGE)) continue;
        if (!valid(r)) continue;
        const known = shown.get(id);
        if (!known || (known.kind === "strip" && kind !== "strip")) {
          shown.set(id, { side: r.side, px: r.px, bp: r.bp, over: r.over === true, kind });
        }
      }
    };
    scan(localStorage, false);
    scan(sessionStorage, true);

    const width = window.innerWidth;
    const rules: string[] = [];
    for (const [id, top] of tops) {
      rules.push(`nav[data-quartz-nav="${id}"]{--_rail-top:${top}px}`);
    }
    // Left before right, the order the page usually has them in: the same rule as the main
    // script, which lets a rail push only while the page keeps more than the mobile breakpoint,
    // counting what the other edge already pushes.
    const pushed: Record<Side, number> = { left: 0, right: 0 };
    const ordered = [...shown].sort(([, a], [, b]) =>
      a.side === b.side ? 0 : a.side === "left" ? -1 : 1,
    );
    let any = false;
    for (const [id, r] of ordered) {
      // Small screens never restore a menu or push the page.
      if (width <= r.bp) continue;
      any = true;
      const strip = r.kind === "strip" ? ".quartz-nav--rail-icons" : "";
      const nav = `nav[data-quartz-nav="${id}"].quartz-nav--rail-${r.side}${strip}`;
      if (r.kind !== "strip") {
        rules.push(
          `${nav}>.quartz-nav__panel{visibility:visible;transform:none;width:var(--quartz-nav-rail-open-width);transition:none}`,
          `${nav}>.quartz-nav__panel .quartz-nav__rail-head{visibility:visible}`,
          `${nav}>.quartz-nav__panel .quartz-nav__list .quartz-nav__list{display:block}`,
        );
        if (r.kind === "pinned") {
          rules.push(
            `${nav} .quartz-nav__rail-pin{color:var(--quartz-nav-color-active)}`,
            `${nav} .quartz-nav__rail-pin .quartz-nav__icon--pin{display:none}`,
            `${nav} .quartz-nav__rail-pin .quartz-nav__icon--unpin{display:inline-flex}`,
          );
        }
      }
      const other = r.side === "left" ? pushed.right : pushed.left;
      const pushes = r.px > 0 && width - other - r.px > r.bp;
      if (pushes) {
        pushed[r.side] = Math.max(pushed[r.side], r.px);
        rules.push(`body:has(${nav}){padding-${r.side}:${r.px}px}`);
      }
      if (r.kind !== "strip" && (!pushes || r.over)) {
        rules.push(`${nav}>.quartz-nav__panel{box-shadow:var(--quartz-nav-shadow)}`);
      }
    }
    // The main script then takes over without the panel sliding or the page animating.
    if (any) document.documentElement.classList.add("quartz-nav-rail-instant");
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
