import type { Translation } from "../i18n";
import { LucideIcon, lucideName } from "../icons";
import { hrefFor, linkTarget } from "../links";
import { flatten, pagerNeighbours, type Scope } from "../scope";
import type { NavNode, NavTree, ResolvedOptions } from "../types";
import { classNames } from "../util/lang";

export interface RenderContext {
  opts: ResolvedOptions;
  id: string;
  slug: string;
  tree: NavTree;
  scope: Scope;
  t: Translation;
  displayClass?: string;
  mobileBreakpoint: string;
}

/** Variants whose folders open as panels; they never start open and are never persisted. */
export const POPUP_VARIANTS = new Set(["dropdown", "mega", "flyout"]);
/** Variants whose first level is a row and therefore has an alignment. */
export const ROW_VARIANTS = new Set(["bar", "dropdown", "mega", "tabs"]);

type State = "active" | "active-trail" | undefined;

function stateOf(node: NavNode, ctx: RenderContext): State {
  if (node.slug === ctx.slug) return "active";
  if (ctx.scope.trail.has(node.slug)) return "active-trail";
  return undefined;
}

type TypeIcon = "folder" | "folder-open" | "folder-toggle" | "file" | "home";

/** Variants whose rows carry folder/file glyphs at a level; horizontal top rows never do. */
function typeIconsAt(level: number, ctx: RenderContext): boolean {
  switch (ctx.opts.variant) {
    case "tree":
    case "accordion":
    case "flyout":
      return true;
    case "dropdown":
    case "mega":
    case "columns":
      return level >= 2;
    default:
      return false;
  }
}

function typeIconEl(kind: TypeIcon, ctx: RenderContext) {
  const names = ctx.opts.iconNames;
  const one = (name: string, mod: string) => (
    <LucideIcon name={name} className={`quartz-nav__icon quartz-nav__icon--${mod}`} />
  );
  switch (kind) {
    case "folder":
      return one(names.folder, "folder");
    case "folder-open":
      return one(names.folderOpen, "folder-open");
    case "folder-toggle":
      // Both glyphs are rendered; the stylesheet shows the one matching the <details> state.
      return (
        <>
          {one(names.folder, "folder")}
          {one(names.folderOpen, "folder-open")}
        </>
      );
    case "file":
      return one(names.file, "file");
    case "home":
      return one(names.home, "home");
  }
}

/**
 * A custom icon (`navIcon` / `nodeIcons`) wins over the type glyph; `none` suppresses both.
 * `typeIcon` is what the row would show by its kind, already filtered by variant and level.
 */
function icon(node: NavNode, ctx: RenderContext, typeIcon?: TypeIcon) {
  const mode = ctx.opts.icons;
  if ((mode === "custom" || mode === "both") && node.icon) {
    if (node.icon.toLowerCase() === "none") return null;
    const lucide = lucideName(node.icon);
    if (lucide) return <LucideIcon name={lucide} className="quartz-nav__icon" />;
    return (
      <span class="quartz-nav__icon" aria-hidden="true">
        {node.icon}
      </span>
    );
  }
  if ((mode === "type" || mode === "both") && typeIcon) return typeIconEl(typeIcon, ctx);
  return null;
}

function label(node: NavNode, ctx: RenderContext, text?: string, typeIcon?: TypeIcon) {
  return (
    <>
      {icon(node, ctx, typeIcon)}
      <span class="quartz-nav__text">{text ?? node.title}</span>
    </>
  );
}

/** Title as a link when the node has a target, otherwise as plain text. */
function titleEl(
  node: NavNode,
  ctx: RenderContext,
  extra?: {
    forceStatic?: boolean;
    className?: string;
    text?: string;
    target?: string;
    typeIcon?: TypeIcon;
  },
) {
  const state = stateOf(node, ctx);
  const target = extra?.target ?? (extra?.forceStatic ? undefined : linkTarget(node, ctx.opts));
  const cls = classNames("quartz-nav__link", extra?.className, state);
  if (!target) {
    return (
      <span class={classNames(cls, "quartz-nav__link--static")}>
        {label(node, ctx, extra?.text, extra?.typeIcon)}
      </span>
    );
  }
  return (
    <a
      class={cls}
      href={hrefFor(ctx.slug, target)}
      aria-current={state === "active" ? "page" : undefined}
    >
      {label(node, ctx, extra?.text, extra?.typeIcon)}
    </a>
  );
}

function chevron(ctx: RenderContext) {
  return (
    <span class="quartz-nav__chevron" aria-hidden="true">
      <LucideIcon name={ctx.opts.iconNames.chevron} className="quartz-nav__chevron-icon" />
    </span>
  );
}

function levelAllowed(level: number, ctx: RenderContext): boolean {
  return ctx.opts.depth === 0 || level <= ctx.opts.depth;
}

function variantCollapsible(level: number, ctx: RenderContext): boolean {
  switch (ctx.opts.variant) {
    case "accordion":
    case "flyout":
      return true;
    case "dropdown":
    case "mega":
      return level === 1;
    default:
      return false;
  }
}

function renderList(nodes: NavNode[], level: number, ctx: RenderContext, extraClass?: string) {
  if (nodes.length === 0) return null;
  return (
    <ul class={classNames("quartz-nav__list", extraClass)} data-level={String(level)}>
      {nodes.map((n) => renderItem(n, level, ctx))}
    </ul>
  );
}

function indexEntry(node: NavNode, ctx: RenderContext, level: number) {
  if (ctx.opts.indexEntry !== "first" || !node.hasIndex) return null;
  const active = node.slug === ctx.slug;
  return (
    <li
      class={classNames(
        "quartz-nav__item",
        "quartz-nav__item--page",
        "quartz-nav__item--index",
        active ? "active" : undefined,
      )}
      data-slug={node.slug}
    >
      {titleEl(node, ctx, {
        target: node.slug,
        text: ctx.t.nav.overview,
        typeIcon: typeIconsAt(level, ctx) ? "file" : undefined,
      })}
    </li>
  );
}

function renderItem(node: NavNode, level: number, ctx: RenderContext) {
  const { opts } = ctx;
  const state = stateOf(node, ctx);
  const showChildren =
    node.kind === "folder" && node.children.length > 0 && levelAllowed(level + 1, ctx);
  const byVariant = showChildren && variantCollapsible(level, ctx);
  const byMobile = showChildren && !byVariant && opts.mobile === "accordion";
  const collapsible = byVariant || byMobile;
  const itemClass = classNames(
    "quartz-nav__item",
    node.kind === "folder" ? "quartz-nav__item--folder" : "quartz-nav__item--page",
    showChildren ? "quartz-nav__item--parent" : undefined,
    state,
  );

  const withType = typeIconsAt(level, ctx);
  const pageIcon: TypeIcon | undefined = withType ? "file" : undefined;

  if (!collapsible) {
    // The glyph reports the folder's state, not whether its children happen to be visible:
    // open only when the current page lies inside it.
    const folderIcon: TypeIcon | undefined = withType
      ? state !== undefined
        ? "folder-open"
        : "folder"
      : undefined;
    return (
      <li class={itemClass} data-slug={node.slug}>
        {titleEl(node, ctx, { typeIcon: node.kind === "folder" ? folderIcon : pageIcon })}
        {showChildren && (
          <ul class="quartz-nav__list" data-level={String(level + 1)}>
            {indexEntry(node, ctx, level + 1)}
            {node.children.map((c) => renderItem(c, level + 1, ctx))}
          </ul>
        )}
      </li>
    );
  }

  const onTrail = state !== undefined;
  const popup = POPUP_VARIANTS.has(opts.variant) && byVariant;
  const open = byMobile
    ? true
    : !popup && (opts.folderDefaultState === "open" || (opts.expandActive && onTrail));
  // With `folderClick: toggle` the whole row is the <summary>. With `link` the row is a link
  // and the summary a separate toggle button named "Expand <title>" at its end; a link inside
  // <summary> would nest two controls, which assistive technology handles badly. Folders that
  // only collapse on mobile keep their link on desktop, so they always use the split layout.
  const target = opts.folderClick === "toggle" && !byMobile ? undefined : linkTarget(node, opts);
  const separateLink = target !== undefined;
  const toggleIcon: TypeIcon | undefined = withType ? "folder-toggle" : undefined;
  return (
    <li
      class={classNames(itemClass, separateLink ? "quartz-nav__item--split" : undefined)}
      data-slug={node.slug}
    >
      {separateLink && titleEl(node, ctx, { target, typeIcon: toggleIcon })}
      <details
        class="quartz-nav__folder"
        open={open}
        name={opts.exclusive ? `${ctx.id}-l${level}` : undefined}
        data-folder={node.slug}
        data-trail={onTrail ? "true" : undefined}
        data-mobile-collapsible={byMobile ? "true" : undefined}
      >
        <summary
          class={classNames(
            "quartz-nav__summary",
            separateLink ? "quartz-nav__summary--toggle" : undefined,
          )}
        >
          {separateLink ? (
            <span class="quartz-nav__sr-only">{ctx.t.nav.expand({ title: node.title })}</span>
          ) : (
            titleEl(node, ctx, { forceStatic: true, typeIcon: toggleIcon })
          )}
          {(opts.chevrons || separateLink) && chevron(ctx)}
        </summary>
        <ul class="quartz-nav__list" data-level={String(level + 1)}>
          {indexEntry(node, ctx, level + 1)}
          {node.children.map((c) => renderItem(c, level + 1, ctx))}
        </ul>
      </details>
    </li>
  );
}

function renderTabs(ctx: RenderContext) {
  const { root } = ctx.scope;
  const primary = (
    <ul class="quartz-nav__list quartz-nav__tabs" data-level="1">
      {root.children.map((n) => (
        <li
          class={classNames(
            "quartz-nav__item",
            n.kind === "folder" ? "quartz-nav__item--folder" : "quartz-nav__item--page",
            stateOf(n, ctx),
          )}
          data-slug={n.slug}
        >
          {titleEl(n, ctx)}
        </li>
      ))}
    </ul>
  );
  const activeTab = root.children.find(
    (n) => n.kind === "folder" && (n.slug === ctx.slug || ctx.scope.trail.has(n.slug)),
  );
  const secondary =
    ctx.opts.tabs.secondary && activeTab && levelAllowed(2, ctx)
      ? renderList(activeTab.children, 2, ctx, "quartz-nav__subtabs")
      : null;
  return (
    <>
      {primary}
      {secondary}
    </>
  );
}

function homeEntry(ctx: RenderContext) {
  const { base } = ctx.scope;
  if (!ctx.opts.showHome || !base.hasIndex) return null;
  const active = base.slug === ctx.slug;
  return (
    <li
      class={classNames(
        "quartz-nav__item",
        "quartz-nav__item--page",
        "quartz-nav__item--home",
        active ? "active" : undefined,
      )}
      data-slug={base.slug}
    >
      {titleEl(base, ctx, {
        target: base.slug,
        text: ctx.t.nav.home,
        typeIcon: typeIconsAt(1, ctx) ? "home" : undefined,
      })}
    </li>
  );
}

function selectEl(ctx: RenderContext, id: string) {
  const { root } = ctx.scope;
  const nodes = flatten(root, ctx.opts);
  const option = (node: NavNode, level: number) => {
    const target = linkTarget(node, ctx.opts);
    const indent = "  ".repeat(Math.max(0, level - 1));
    return (
      <option
        value={target ? hrefFor(ctx.slug, target) : ""}
        disabled={!target}
        selected={node.slug === ctx.slug}
      >
        {indent + node.title}
      </option>
    );
  };
  // Level-1 folders become groups so the list stays readable without indentation tricks.
  const items: unknown[] = [];
  for (const child of root.children) {
    if (child.kind === "folder" && child.children.length > 0 && levelAllowed(2, ctx)) {
      const inner = nodes.filter(
        (n) => n.slug !== child.slug && n.slug.startsWith(child.slug.replace(/index$/, "")),
      );
      const indexTarget = linkTarget(child, ctx.opts);
      items.push(
        <optgroup label={child.title}>
          {indexTarget && (
            <option value={hrefFor(ctx.slug, indexTarget)} selected={child.slug === ctx.slug}>
              {ctx.t.nav.overview}
            </option>
          )}
          {inner.map((n) => option(n, n.depth - child.depth))}
        </optgroup>,
      );
    } else {
      items.push(option(child, 1));
    }
  }
  const hasCurrent = ctx.scope.current !== undefined && nodes.some((n) => n.slug === ctx.slug);
  return (
    <div class="quartz-nav__jump">
      <select
        class="quartz-nav__select"
        id={id}
        aria-label={ctx.opts.title ? undefined : navLabel(ctx)}
      >
        <option value="" disabled selected={!hasCurrent}>
          {ctx.t.nav.jumpTo}
        </option>
        {items}
      </select>
      {ctx.opts.select.button && (
        <button type="button" class="quartz-nav__go" data-select={id}>
          {ctx.t.nav.go}
        </button>
      )}
    </div>
  );
}

/**
 * Several instances on one page need distinct landmark names: an explicit `ariaLabel`, then
 * the visible `title`, then a variant-specific default.
 */
function navLabel(ctx: RenderContext): string {
  if (ctx.opts.ariaLabel) return ctx.opts.ariaLabel;
  if (ctx.opts.title) return ctx.opts.title;
  return ctx.opts.variant === "pager" ? ctx.t.nav.pager : ctx.t.nav.label;
}

function rootClass(ctx: RenderContext, ...extra: (string | undefined)[]) {
  const { opts } = ctx;
  return classNames(
    ctx.displayClass,
    "quartz-nav",
    `quartz-nav--${opts.variant}`,
    `quartz-nav--mobile-${opts.mobile}`,
    ROW_VARIANTS.has(opts.variant) ? `quartz-nav--align-${opts.align}` : undefined,
    opts.variant === "flyout" && opts.flyout.side === "left"
      ? "quartz-nav--flyout-left"
      : undefined,
    opts.className || undefined,
    ...extra,
  );
}

function rootData(ctx: RenderContext) {
  const { opts } = ctx;
  return {
    "data-quartz-nav": ctx.id,
    "data-variant": opts.variant,
    "data-mobile": opts.mobile,
    "data-persist": opts.persistState && !POPUP_VARIANTS.has(opts.variant) ? "true" : undefined,
    "data-expand-active": opts.expandActive ? "true" : undefined,
    "data-trigger": POPUP_VARIANTS.has(opts.variant) ? opts.trigger : undefined,
    "data-flyout-side": opts.variant === "flyout" ? opts.flyout.side : undefined,
    "data-bp-mobile": ctx.mobileBreakpoint,
  };
}

export function renderNavigation(ctx: RenderContext) {
  const { opts, t } = ctx;
  const { root } = ctx.scope;
  const ariaLabel = navLabel(ctx);
  const offcanvas = opts.mobile === "offcanvas";
  const toggleId = `${ctx.id}-toggle`;
  const panelId = `${ctx.id}-panel`;

  // The home entry needs an index page under `rootPath`; tabs have no place for it.
  const home = opts.variant === "tabs" ? null : homeEntry(ctx);
  if (root.children.length === 0 && !home) return null;
  const body =
    opts.variant === "tabs" ? (
      renderTabs(ctx)
    ) : (
      <ul class="quartz-nav__list" data-level="1">
        {home}
        {root.children.map((n) => renderItem(n, 1, ctx))}
      </ul>
    );

  return (
    <nav class={rootClass(ctx)} aria-label={ariaLabel} {...rootData(ctx)}>
      {opts.title && <h3 class="quartz-nav__title">{opts.title}</h3>}
      {offcanvas && (
        <>
          <input
            type="checkbox"
            id={toggleId}
            class="quartz-nav__toggle"
            aria-label={t.nav.toggleMenu}
            aria-controls={panelId}
            aria-expanded="false"
          />
          <label for={toggleId} class="quartz-nav__burger" aria-hidden="true">
            <LucideIcon name={opts.iconNames.menu} size="1.5em" />
          </label>
          <label for={toggleId} class="quartz-nav__backdrop" aria-hidden="true"></label>
        </>
      )}
      {opts.mobile === "select" && (
        <div class="quartz-nav__mobile-select">{selectEl(ctx, `${ctx.id}-select`)}</div>
      )}
      <div class="quartz-nav__panel" id={panelId}>
        {offcanvas && (
          <label for={toggleId} class="quartz-nav__close" aria-hidden="true">
            <LucideIcon name={opts.iconNames.close} size="1.5em" />
          </label>
        )}
        {opts.showScopeRoot && (
          <div class="quartz-nav__root">
            {titleEl(root, ctx, {
              className: "quartz-nav__root-link",
              typeIcon: typeIconsAt(1, ctx) ? "folder-open" : undefined,
            })}
          </div>
        )}
        {body}
      </div>
    </nav>
  );
}

export function renderSelect(ctx: RenderContext) {
  const id = `${ctx.id}-select`;
  return (
    <nav class={rootClass(ctx)} aria-label={navLabel(ctx)} {...rootData(ctx)}>
      {ctx.opts.title && (
        <label class="quartz-nav__title" for={id}>
          {ctx.opts.title}
        </label>
      )}
      {selectEl(ctx, id)}
    </nav>
  );
}

export function renderPager(ctx: RenderContext) {
  const { prev, next } = pagerNeighbours(ctx.tree, ctx.scope, ctx.opts);
  if (!prev && !next) return null;
  const { t, opts } = ctx;
  const link = (node: NavNode, rel: "prev" | "next") => {
    const target = linkTarget(node, opts)!;
    const arrow = (
      <span class="quartz-nav__pager-icon" aria-hidden="true">
        <LucideIcon name={rel === "prev" ? opts.iconNames.previous : opts.iconNames.next} />
      </span>
    );
    return (
      <a class={`quartz-nav__${rel}`} rel={rel} href={hrefFor(ctx.slug, target)}>
        {rel === "prev" && arrow}
        <span class="quartz-nav__pager-body">
          {opts.pager.labels && (
            <span class="quartz-nav__pager-label">
              {rel === "prev" ? t.nav.previous : t.nav.next}
            </span>
          )}
          <span class="quartz-nav__pager-title">{label(node, ctx)}</span>
        </span>
        {rel === "next" && arrow}
      </a>
    );
  };
  return (
    <nav class={rootClass(ctx)} aria-label={navLabel(ctx)} {...rootData(ctx)}>
      {prev ? link(prev, "prev") : <span class="quartz-nav__prev quartz-nav__prev--empty"></span>}
      {next ? link(next, "next") : <span class="quartz-nav__next quartz-nav__next--empty"></span>}
    </nav>
  );
}
