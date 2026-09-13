/* eslint-disable @typescript-eslint/no-explicit-any */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { QuartzComponentProps } from "@quartz-community/types";
import Navigation from "../src/components/Navigation";
import type { NavigationOptions } from "../src/types";
import { resolveOptions } from "../src/options";
import { resetWarnings } from "../src/util/warn";

const resolveOptionsAlign = (value: string) => resolveOptions({ align: value as never }).align;
import { page, site } from "./fixture";

type VNode = { type: unknown; props: Record<string, any> };

let warn: ReturnType<typeof vi.spyOn>;
beforeEach(() => {
  resetWarnings();
  warn = vi.spyOn(console, "warn").mockImplementation(() => {});
});
afterEach(() => warn.mockRestore());

const allFiles = site();

function makeProps(slug: string, overrides: Record<string, unknown> = {}): QuartzComponentProps {
  const fileData = allFiles.find((f) => f.slug === slug) ?? { slug, frontmatter: { title: slug } };
  return {
    ctx: { argv: { serve: false } },
    fileData,
    cfg: { pageTitle: "Site", locale: "en-US" },
    externalResources: { css: [], js: [], additionalHead: [] },
    children: [],
    tree: {},
    allFiles,
    ...overrides,
  } as unknown as QuartzComponentProps;
}

function render(opts: NavigationOptions, slug: string, overrides = {}): VNode | null {
  return Navigation({ breakpoints: { mobile: "700px", desktop: "1100px" }, ...opts })(
    makeProps(slug, overrides),
  ) as VNode | null;
}

/** Depth-first list of every element vnode below (and including) `node`. */
function walk(node: unknown, out: VNode[] = []): VNode[] {
  if (Array.isArray(node)) {
    node.forEach((n) => walk(n, out));
  } else if (node && typeof node === "object" && "type" in node) {
    const v = node as VNode;
    if (typeof v.type === "function") {
      // Function components (the Lucide icon) render lazily; expand them like Preact would.
      walk((v.type as (props: Record<string, any>) => unknown)(v.props), out);
      return out;
    }
    if (typeof v.type === "string") out.push(v);
    walk(v.props?.children, out);
  }
  return out;
}

function findAll(node: unknown, type: string, cls?: string): VNode[] {
  return walk(node).filter(
    (v) =>
      v.type === type &&
      (cls === undefined ||
        String(v.props.class ?? "")
          .split(" ")
          .includes(cls)),
  );
}

function find(node: unknown, type: string, cls?: string): VNode {
  const hit = findAll(node, type, cls)[0];
  if (!hit) throw new Error(`no <${type}${cls ? `.${cls}` : ""}>`);
  return hit;
}

function text(node: unknown): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(text).join("");
  return text((node as VNode).props?.children);
}

/** Warnings from the plugin except the breakpoint fallback, which every test triggers. */
function warnings(): string[] {
  return warn.mock.calls.map((c) => String(c[0])).filter((m) => !m.includes("variables.scss"));
}

function classes(v: VNode): string[] {
  return String(v.props.class ?? "")
    .split(" ")
    .filter(Boolean);
}

describe("Navigation component", () => {
  it("renders a tree with root classes, data attributes and relative links", () => {
    const nav = render({}, "docs/guides/alpha")!;
    expect(nav.type).toBe("nav");
    expect(classes(nav)).toEqual(["quartz-nav", "quartz-nav--tree", "quartz-nav--mobile-same"]);
    expect(nav.props["aria-label"]).toBe("Main navigation");
    expect(nav.props["data-variant"]).toBe("tree");
    expect(nav.props["data-style"]).toBeUndefined();
    expect(nav.props["data-bp-mobile"]).toBe("700px");
    expect(nav.props["data-quartz-nav"]).toMatch(/^nav-[a-z0-9]+$/);

    const level1 = find(nav, "ul", "quartz-nav__list");
    expect(level1.props["data-level"]).toBe("1");
    const links = findAll(nav, "a").map((a) => [text(a), a.props.href]);
    expect(links).toContainEqual(["Documentation", "../../docs/"]);
    expect(links).toContainEqual(["Alpha", "../../docs/guides/alpha"]);
    expect(links).toContainEqual(["Hüttendorf", "../../orte/huettendorf"]);
    expect(findAll(nav, "details")).toEqual([]);
  });

  it("marks the current page active and its ancestors as active-trail", () => {
    const nav = render({}, "docs/guides/alpha")!;
    const active = findAll(nav, "a", "active");
    expect(active.map(text)).toEqual(["Alpha"]);
    expect(active[0]!.props["aria-current"]).toBe("page");
    const trail = findAll(nav, "a", "active-trail").map(text);
    expect(trail).toEqual(["Documentation", "Guides"]);
    const li = findAll(nav, "li", "active-trail").map((l) => l.props["data-slug"]);
    expect(li).toEqual(["docs/index", "docs/guides/index"]);
    expect(findAll(nav, "a", "active").map((a) => a.props["aria-current"])).toEqual(["page"]);
  });

  it("marks a folder active when its index page is the current page", () => {
    const nav = render({}, "docs/index")!;
    expect(findAll(nav, "li", "active").map((l) => l.props["data-slug"])).toEqual(["docs/index"]);
    expect(findAll(nav, "li", "active-trail")).toEqual([]);
  });

  it("uses displayClass and className and still understands the 0.1 option names", () => {
    const nav = render({ className: "site-nav" }, "index", { displayClass: "desktop-only" })!;
    expect(classes(nav)).toEqual([
      "desktop-only",
      "quartz-nav",
      "quartz-nav--tree",
      "quartz-nav--mobile-same",
      "site-nav",
    ]);
    const legacy = render(
      {
        variant: "horizontal",
        style: "basic",
        dropdownTrigger: "hover",
      } as unknown as NavigationOptions,
      "index",
    )!;
    expect(classes(legacy)).toContain("quartz-nav--bar");
    expect(classes(legacy)).not.toContain("quartz-nav--basic");
    expect(warnings()).toEqual([
      "[navigations] `variant: horizontal` is now `bar`.",
      "[navigations] `dropdownTrigger` is now `trigger`.",
      "[navigations] `style` was removed; the navigation follows the Quartz theme, tune it with the `--quartz-nav-*` CSS variables.",
    ]);
  });

  it("limits depth and honours rootPath and scope", () => {
    const shallow = render({ depth: 1 }, "docs/guides/alpha")!;
    expect(findAll(shallow, "ul").length).toBe(1);
    expect(findAll(shallow, "a").map(text)).toEqual(["Blog", "Documentation", "Orte", "private"]);

    const section = render({ scope: "section", depth: 2 }, "docs/guides/alpha")!;
    expect(findAll(section, "a").map(text)).toEqual([
      "Guides",
      "Beta",
      "Alpha",
      "Intro",
      "Setup",
      "03 Advanced",
    ]);
    expect(render({ rootPath: "docs" }, "blog/first")).toBeNull();
    expect(render({ scope: "section" }, "index")).toBeNull();
  });

  it("renders the scope root, the home entry and folder index entries on request", () => {
    const nav = render(
      { scope: "section", showScopeRoot: true, showHome: true, indexEntry: "first" },
      "docs/guides/alpha",
    )!;
    const root = find(nav, "a", "quartz-nav__root-link");
    expect(text(root)).toBe("Documentation");
    expect(classes(root)).toContain("active-trail");
    const home = find(nav, "li", "quartz-nav__item--home");
    expect(text(home)).toBe("Home");
    expect(find(home, "a").props.href).toBe("../../");
    const overview = find(nav, "li", "quartz-nav__item--index");
    expect(text(overview)).toBe("Overview");
    expect(find(overview, "a").props.href).toBe("../../docs/guides/");
  });

  it("renders folders without index as static text or first-child links", () => {
    const none = render({ folderLink: "none" }, "index")!;
    const statics = findAll(none, "span", "quartz-nav__link--static").map(text);
    expect(statics).toEqual(["Blog", "Documentation", "Guides", "Orte", "private"]);
    const first = render({ folderLink: "first-child" }, "index")!;
    const orte = findAll(first, "a").find((a) => text(a) === "Orte")!;
    expect(orte.props.href).toBe("./orte/huettendorf");
    const dflt = render({}, "index")!;
    expect(findAll(dflt, "a").find((a) => text(a) === "Orte")!.props.href).toBe(
      "./orte/huettendorf",
    );
    expect(findAll(dflt, "a").find((a) => text(a) === "Blog")!.props.href).toBe("./blog/");
  });

  it("accordion: details for every folder, open along the active path", () => {
    const nav = render({ variant: "accordion", folderClick: "link" }, "docs/guides/alpha")!;
    const details = findAll(nav, "details");
    expect(details.map((d) => [d.props["data-folder"], d.props.open])).toEqual([
      ["blog/index", false],
      ["docs/index", true],
      ["docs/guides/index", true],
      ["orte/index", false],
      ["private/index", false],
    ]);
    expect(details[1]!.props["data-trail"]).toBe("true");
    expect(findAll(nav, "summary").length).toBe(5);
    expect(findAll(nav, "span", "quartz-nav__chevron").length).toBe(5);
    // The title link is a sibling of <details>; the summary is a pure toggle with a name.
    const first = find(nav, "li", "quartz-nav__item--split");
    const [link, folder] = first.props.children as [VNode, VNode];
    expect(link.type).toBe("a");
    expect(text(link)).toBe("Blog");
    expect(folder.type).toBe("details");
    const summary = find(folder, "summary", "quartz-nav__summary--toggle");
    expect(findAll(summary, "a")).toEqual([]);
    expect(text(find(summary, "span", "quartz-nav__sr-only"))).toBe("Expand Blog");

    const open = render({ variant: "accordion", folderDefaultState: "open" }, "index")!;
    expect(findAll(open, "details").every((d) => d.props.open)).toBe(true);
    const closed = render({ variant: "accordion", expandActive: false }, "docs/guides/alpha")!;
    expect(findAll(closed, "details").every((d) => !d.props.open)).toBe(true);
    const exclusive = render({ variant: "accordion", exclusive: true, id: "side" }, "index")!;
    expect(find(exclusive, "details").props.name).toBe("side-l1");
    expect(exclusive.props["data-quartz-nav"]).toBe("side");
  });

  it("accordion: by default the whole row toggles and carries the title", () => {
    const nav = render({ variant: "accordion" }, "docs/guides/alpha")!;
    expect(findAll(nav, "li", "quartz-nav__item--split")).toEqual([]);
    const summary = find(nav, "summary");
    expect(findAll(summary, "a")).toEqual([]);
    expect(text(find(summary, "span", "quartz-nav__link--static"))).toBe("Blog");
    expect(classes(find(summary, "span", "quartz-nav__link--static"))).not.toContain("active");
    expect(findAll(nav, "span", "quartz-nav__chevron").length).toBe(5);
    const chevronSvg = find(summary, "svg", "quartz-nav__chevron-icon");
    expect(classes(chevronSvg)).toContain("lucide-chevron-down");
    expect(chevronSvg.props["aria-hidden"]).toBe("true");
    // The folder page stays reachable through the index entry.
    const withIndex = render({ variant: "accordion", indexEntry: "first" }, "docs/guides/alpha")!;
    expect(findAll(withIndex, "li", "quartz-nav__item--index").length).toBe(3);
    const noChevrons = render({ variant: "accordion", chevrons: false }, "index")!;
    expect(findAll(noChevrons, "span", "quartz-nav__chevron")).toEqual([]);
    // With `link` the chevron is the only visible toggle, so `chevrons: false` cannot hide it.
    const linkMode = render(
      { variant: "accordion", folderClick: "link", chevrons: false },
      "index",
    )!;
    expect(findAll(linkMode, "span", "quartz-nav__chevron").length).toBe(5);
    const custom = render({ variant: "accordion", iconNames: { chevron: "plus" } }, "index")!;
    expect(classes(find(custom, "svg", "quartz-nav__chevron-icon"))).toContain("lucide-plus");
  });

  it("dropdown and mega: only the first level collapses and never starts open", () => {
    const nav = render({ variant: "dropdown", persistState: true }, "docs/guides/alpha")!;
    const details = findAll(nav, "details");
    expect(details.map((d) => d.props["data-folder"])).toEqual([
      "blog/index",
      "docs/index",
      "orte/index",
      "private/index",
    ]);
    expect(details.every((d) => d.props.open === false)).toBe(true);
    expect(nav.props["data-persist"]).toBeUndefined();
    expect(nav.props["data-trigger"]).toBe("click");
    const mega = render({ variant: "mega", trigger: "hover" }, "index")!;
    expect(mega.props["data-trigger"]).toBe("hover");
    const flyout = render({ variant: "flyout" }, "index")!;
    expect(findAll(flyout, "details").length).toBe(5);
    expect(flyout.props["data-flyout-side"]).toBe("auto");
    expect(classes(flyout)).not.toContain("quartz-nav--flyout-left");
    const leftFlyout = render({ variant: "flyout", flyout: { side: "left" } }, "index")!;
    expect(leftFlyout.props["data-flyout-side"]).toBe("left");
    expect(classes(leftFlyout)).toContain("quartz-nav--flyout-left");
    expect(nav.props["data-flyout-side"]).toBeUndefined();
  });

  it("bar with mobile accordion renders open, mobile-only collapsible folders", () => {
    const nav = render({ variant: "bar", mobile: "accordion" }, "index")!;
    const details = findAll(nav, "details");
    expect(details.length).toBe(5);
    expect(
      details.every((d) => d.props.open && d.props["data-mobile-collapsible"] === "true"),
    ).toBe(true);
    expect(classes(nav)).toContain("quartz-nav--mobile-accordion");
    // The folder must stay a link on desktop, so the row is split whatever `folderClick` says.
    expect(findAll(nav, "li", "quartz-nav__item--split").length).toBe(5);
    expect(findAll(nav, "a").map(text)).toContain("Blog");
  });

  it("aligns the row variants and ignores align elsewhere", () => {
    expect(classes(render({ variant: "bar" }, "index")!)).toContain("quartz-nav--align-left");
    expect(classes(render({ variant: "tabs", align: "full" }, "index")!)).toContain(
      "quartz-nav--align-full",
    );
    expect(classes(render({ variant: "dropdown", align: "center" }, "index")!)).toContain(
      "quartz-nav--align-center",
    );
    const tree = render({ align: "right" }, "index")!;
    expect(classes(tree).some((c) => c.startsWith("quartz-nav--align-"))).toBe(false);
    expect(resolveOptionsAlign("nope")).toBe("left");
  });

  it("offcanvas renders the checkbox, burger and backdrop before the panel", () => {
    const nav = render({ variant: "bar", mobile: "offcanvas", id: "top" }, "index")!;
    const input = find(nav, "input");
    expect(input.props.type).toBe("checkbox");
    expect(input.props.id).toBe("top-toggle");
    expect(input.props["aria-expanded"]).toBe("false");
    expect(input.props["aria-controls"]).toBe("top-panel");
    const labels = findAll(nav, "label");
    expect(labels.map((l) => l.props.for)).toEqual(["top-toggle", "top-toggle", "top-toggle"]);
    expect(classes(labels[0]!)).toContain("quartz-nav__burger");
    expect(classes(find(labels[0]!, "svg"))).toContain("lucide-menu");
    expect(classes(labels[1]!)).toContain("quartz-nav__backdrop");
    const panel = find(nav, "div", "quartz-nav__panel");
    expect(panel.props.id).toBe("top-panel");
    expect(classes(find(panel, "label"))).toContain("quartz-nav__close");
    expect(classes(find(panel, "svg"))).toContain("lucide-x");
    expect(nav.props["data-mobile"]).toBe("offcanvas");
  });

  it("mobile select adds a select next to the list", () => {
    const nav = render({ mobile: "select" }, "docs/01-intro")!;
    const select = find(nav, "select");
    expect(find(nav, "div", "quartz-nav__mobile-select")).toBeTruthy();
    const selected = findAll(select, "option").filter((o) => o.props.selected);
    expect(selected.map(text)).toEqual(["Intro"]);
    expect(findAll(select, "optgroup").map((g) => g.props.label)).toEqual([
      "Blog",
      "Documentation",
      "Orte",
      "private",
    ]);
  });

  it("select variant renders a jump menu with a placeholder", () => {
    const nav = render({ variant: "select", title: "Go to" }, "tags/foo")!;
    expect(classes(nav)).toContain("quartz-nav--select");
    expect(find(nav, "label").props.for).toBe(find(nav, "select").props.id);
    const options = findAll(nav, "option");
    expect(text(options[0]!)).toBe("Jump to…");
    expect(options[0]!.props.selected).toBe(true);
    expect(options[0]!.props.disabled).toBe(true);
    const hrefs = options.map((o) => o.props.value);
    expect(hrefs).toContain("../blog/first");
    expect(findAll(nav, "optgroup").find((g) => g.props.label === "Documentation")).toBeTruthy();
    const overview = options.find((o) => text(o) === "Overview")!;
    expect(overview.props.value).toBe("../blog/");
    // Choosing an option navigates on its own; the "Go" button is opt-in.
    expect(findAll(nav, "button", "quartz-nav__go")).toEqual([]);
    const withButton = render({ variant: "select", select: { button: true } }, "tags/foo")!;
    const go = find(withButton, "button", "quartz-nav__go");
    expect(go.props["data-select"]).toBe(find(withButton, "select").props.id);
    expect(text(go)).toBe("Go");
    // Labelled by the visible <label>, so no aria-label on the select itself.
    expect(find(nav, "select").props["aria-label"]).toBeUndefined();
    expect(find(render({ variant: "select" }, "index")!, "select").props["aria-label"]).toBe(
      "Main navigation",
    );
  });

  it("tabs render the first level as a bar plus the active tab's children", () => {
    const nav = render({ variant: "tabs" }, "docs/guides/alpha")!;
    const tabs = find(nav, "ul", "quartz-nav__tabs");
    expect(findAll(tabs, "a").map(text)).toEqual(["Blog", "Documentation", "Orte", "private"]);
    expect(findAll(tabs, "li", "active-trail").length).toBe(1);
    const sub = find(nav, "ul", "quartz-nav__subtabs");
    expect(findAll(sub, "a").map(text)).toEqual([
      "Guides",
      "Beta",
      "Alpha",
      "Intro",
      "Setup",
      "03 Advanced",
    ]);
    const noSub = render({ variant: "tabs", tabs: { secondary: false } }, "docs/guides/alpha")!;
    expect(findAll(noSub, "ul", "quartz-nav__subtabs")).toEqual([]);
    const oneLevel = render({ variant: "tabs", depth: 1 }, "docs/guides/alpha")!;
    expect(findAll(oneLevel, "ul", "quartz-nav__subtabs")).toEqual([]);
  });

  it("pager links to the previous and next page in tree order", () => {
    const nav = render({ variant: "pager" }, "docs/guides/alpha")!;
    expect(classes(nav)).toContain("quartz-nav--pager");
    const prev = find(nav, "a", "quartz-nav__prev");
    const next = find(nav, "a", "quartz-nav__next");
    expect(prev.props.rel).toBe("prev");
    expect(prev.props.href).toBe("../../docs/guides/beta");
    expect(text(prev)).toBe("PreviousBeta");
    expect(classes(find(prev, "svg"))).toContain("lucide-chevron-left");
    expect(classes(find(next, "svg"))).toContain("lucide-chevron-right");
    expect(next.props.href).toBe("../../docs/01-intro");
    const noLabels = render({ variant: "pager", pager: { labels: false } }, "docs/guides/alpha")!;
    expect(text(find(noLabels, "a", "quartz-nav__next"))).toBe("Intro");
    expect(render({ variant: "pager" }, "tags/foo")).toBeNull();
    const first = render({ variant: "pager" }, "index")!;
    expect(find(first, "span", "quartz-nav__prev--empty")).toBeTruthy();
  });

  it("renders navIcon as text or as a Lucide icon", () => {
    const files = [
      ...allFiles,
      page("docs/emoji", "docs/Emoji.md", { title: "Emoji", navIcon: "📘" }),
      page("docs/lucide", "docs/Lucide.md", { title: "Lucide", navIcon: "lucide:Book-Open" }),
      page("docs/unknown", "docs/Unknown.md", { title: "Unknown", navIcon: "lucide:no-such" }),
    ];
    const nav = render({ icons: "custom", depth: 2 }, "index", { allFiles: files })!;
    const item = (title: string) => findAll(nav, "a").find((a) => text(a).endsWith(title))!;
    expect(text(find(item("Emoji"), "span", "quartz-nav__icon"))).toBe("📘");
    const svg = find(item("Lucide"), "svg", "quartz-nav__icon");
    expect(classes(svg)).toContain("lucide-book-open");
    expect(svg.props.width).toBe("1em");
    expect(findAll(svg, "path").length).toBeGreaterThan(0);
    expect(findAll(item("Unknown"), "svg")).toEqual([]);
    expect(findAll(item("Unknown"), "span", "quartz-nav__icon")).toEqual([]);
    expect(warnings()).toEqual([
      "[navigations] Unknown Lucide icon `no-such`; see https://lucide.dev/icons",
    ]);
    const off = render({ icons: "none", depth: 2 }, "index", { allFiles: files })!;
    expect(findAll(off, "svg", "quartz-nav__icon")).toEqual([]);
    expect(findAll(off, "span", "quartz-nav__icon")).toEqual([]);
  });

  it("draws folder and file glyphs by variant and level, custom icons win", () => {
    const iconsOf = (nav: VNode, cls = "quartz-nav__icon") =>
      findAll(nav, "svg", cls).map((s) => classes(s).find((c) => c.startsWith("lucide-")));
    const tree = render({}, "docs/guides/alpha")!;
    // Folders with visible children are open, leaf folders closed, pages are files.
    const docs = findAll(tree, "li", "quartz-nav__item--folder").find(
      (l) => l.props["data-slug"] === "docs/index",
    )!;
    expect(iconsOf(find(docs, "a"))).toEqual(["lucide-folder-open"]);
    // Expanded but not on the trail: still the closed glyph.
    const blog = findAll(tree, "li", "quartz-nav__item--folder").find(
      (l) => l.props["data-slug"] === "blog/index",
    )!;
    expect(findAll(blog, "ul").length).toBe(1);
    expect(iconsOf(find(blog, "a"))).toEqual(["lucide-folder"]);
    expect(iconsOf(findAll(tree, "li", "quartz-nav__item--page")[0]!)).toEqual(["lucide-file"]);
    const shallow = render({ depth: 1 }, "index")!;
    expect(iconsOf(shallow)).toEqual([
      "lucide-folder",
      "lucide-folder",
      "lucide-folder",
      "lucide-folder",
    ]);
    // Collapsible folders carry both glyphs; the stylesheet picks one.
    const accordion = render({ variant: "accordion" }, "index")!;
    const summary = find(accordion, "summary");
    expect(iconsOf(summary)).toEqual(["lucide-folder", "lucide-folder-open"]);
    expect(classes(findAll(summary, "svg")[1]!)).toContain("quartz-nav__icon--folder-open");
    const split = render({ variant: "accordion", folderClick: "link" }, "index")!;
    expect(iconsOf(find(split, "li", "quartz-nav__item--split").props.children[0])).toEqual([
      "lucide-folder",
      "lucide-folder-open",
    ]);
    // Horizontal top rows stay clean; dropdown panels get glyphs from level 2 on.
    expect(iconsOf(render({ variant: "bar" }, "index")!)).toEqual([]);
    expect(iconsOf(render({ variant: "tabs" }, "docs/guides/alpha")!)).toEqual([]);
    const dropdown = render({ variant: "dropdown", indexEntry: "first" }, "index")!;
    expect(iconsOf(find(dropdown, "summary"))).toEqual([]);
    const panel = find(dropdown, "details").props.children[1];
    expect(iconsOf(panel)).toContain("lucide-file");
    expect(iconsOf(find(panel, "li", "quartz-nav__item--index"))).toEqual(["lucide-file"]);
    // Home and scope root entries, custom names and the type-only mode.
    const withHome = render(
      {
        scope: "section",
        showHome: true,
        showScopeRoot: true,
        iconNames: { home: "house-plus", file: "file-text", folderOpen: "folder-tree" },
      },
      "docs/guides/alpha",
    )!;
    expect(iconsOf(find(withHome, "li", "quartz-nav__item--home"))).toEqual(["lucide-house-plus"]);
    expect(iconsOf(find(withHome, "a", "quartz-nav__root-link"))).toEqual(["lucide-folder-tree"]);
    expect(iconsOf(withHome)).toContain("lucide-file-text");
    const files = [
      ...allFiles,
      page("docs/custom", "docs/Custom.md", { title: "Custom", navIcon: "lucide:star" }),
      page("docs/bare", "docs/Bare.md", { title: "Bare", navIcon: "none" }),
    ];
    const both = render({ nodeIcons: { "docs/01-intro": "🧩" } }, "index", { allFiles: files })!;
    const row = (title: string) => findAll(both, "a").find((a) => text(a).endsWith(title))!;
    expect(iconsOf(row("Custom"))).toEqual(["lucide-star"]);
    expect(findAll(row("Bare"), "svg")).toEqual([]);
    expect(text(find(row("Intro"), "span", "quartz-nav__icon"))).toBe("🧩");
    const typeOnly = render({ icons: "type" }, "index", { allFiles: files })!;
    const typeRow = (title: string) => findAll(typeOnly, "a").find((a) => text(a).endsWith(title))!;
    expect(iconsOf(typeRow("Custom"))).toEqual(["lucide-file"]);
    expect(iconsOf(typeRow("Intro"))).toEqual(["lucide-file"]);
  });

  it("renders the title, icons and German labels", () => {
    const nav = render({ title: "Inhalt", icons: true }, "index", {
      cfg: { locale: "de-DE" },
    })!;
    expect(text(find(nav, "h3", "quartz-nav__title"))).toBe("Inhalt");
    expect(nav.props["aria-label"]).toBe("Inhalt");
    const german = render({}, "index", { cfg: { locale: "de-DE" } })!;
    expect(german.props["aria-label"]).toBe("Hauptnavigation");
    const custom = render({ ariaLabel: "Docs" }, "index")!;
    expect(custom.props["aria-label"]).toBe("Docs");
    // Landmarks of several instances must stay distinguishable.
    expect(render({ title: "Inhalt" }, "index")!.props["aria-label"]).toBe("Inhalt");
    expect(render({ variant: "pager" }, "docs/01-intro")!.props["aria-label"]).toBe(
      "Previous and next page",
    );
  });

  it("attaches one stylesheet and one script per instance and keeps ids stable", () => {
    const a = Navigation({ variant: "accordion", breakpoints: { mobile: "700px" } });
    const b = Navigation({ variant: "accordion", breakpoints: { mobile: "700px" } });
    expect(typeof a.css).toBe("string");
    expect(a.css).toBe(b.css);
    expect(typeof a.afterDOMLoaded).toBe("string");
    const idOf = (c: typeof a) => (c(makeProps("index")) as VNode).props["data-quartz-nav"];
    expect(idOf(a)).toBe(idOf(b));
    const c = Navigation({ variant: "dropdown", breakpoints: { mobile: "700px" } });
    expect(idOf(c)).not.toBe(idOf(a));
  });

  it("renders nothing without a slug or without visible entries", () => {
    expect(render({}, "index", { fileData: {} })).toBeNull();
    expect(render({ include: ["nothing/**"] }, "index")).toBeNull();
  });
});
