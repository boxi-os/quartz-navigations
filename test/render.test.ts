/* eslint-disable @typescript-eslint/no-explicit-any */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { QuartzComponentProps } from "@quartz-community/types";
import Navigation from "../src/components/Navigation";
import type { NavigationOptions } from "../src/types";
import { resetWarnings } from "../src/util/warn";
import { site } from "./fixture";

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

function classes(v: VNode): string[] {
  return String(v.props.class ?? "")
    .split(" ")
    .filter(Boolean);
}

describe("Navigation component", () => {
  it("renders a vertical tree with root classes, data attributes and relative links", () => {
    const nav = render({}, "docs/guides/alpha")!;
    expect(nav.type).toBe("nav");
    expect(classes(nav)).toEqual([
      "quartz-nav",
      "quartz-nav--vertical",
      "quartz-nav--mobile-same",
      "quartz-nav--basic",
      "quartz-nav--full",
    ]);
    expect(nav.props["aria-label"]).toBe("Main navigation");
    expect(nav.props["data-variant"]).toBe("vertical");
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

  it("uses displayClass, className, unstyled and basic tiers", () => {
    const nav = render({ style: "unstyled", className: "site-nav" }, "index", {
      displayClass: "desktop-only",
    })!;
    expect(classes(nav)).toEqual([
      "desktop-only",
      "quartz-nav",
      "quartz-nav--vertical",
      "quartz-nav--mobile-same",
      "site-nav",
    ]);
    expect(classes(render({ style: "basic" }, "index")!)).not.toContain("quartz-nav--full");
    expect(classes(render({ style: "basic" }, "index")!)).toContain("quartz-nav--basic");
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
    const nav = render({ variant: "accordion" }, "docs/guides/alpha")!;
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
    const toggle = render(
      { variant: "accordion", folderClick: "toggle", chevrons: false },
      "index",
    )!;
    expect(findAll(toggle, "summary").every((s) => findAll(s, "a").length === 0)).toBe(true);
    expect(findAll(toggle, "li", "quartz-nav__item--split")).toEqual([]);
    expect(text(find(toggle, "summary"))).toBe("Blog");
    expect(findAll(toggle, "span", "quartz-nav__chevron")).toEqual([]);
    // With `link` the chevron is the only visible toggle, so `chevrons: false` cannot hide it.
    const linkMode = render({ variant: "accordion", chevrons: false }, "index")!;
    expect(findAll(linkMode, "span", "quartz-nav__chevron").length).toBe(5);
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
    const mega = render({ variant: "mega", dropdownTrigger: "hover" }, "index")!;
    expect(mega.props["data-trigger"]).toBe("hover");
    const flyout = render({ variant: "flyout" }, "index")!;
    expect(findAll(flyout, "details").length).toBe(5);
  });

  it("horizontal with mobile accordion renders open, mobile-only collapsible folders", () => {
    const nav = render({ variant: "horizontal", mobile: "accordion" }, "index")!;
    const details = findAll(nav, "details");
    expect(details.length).toBe(5);
    expect(
      details.every((d) => d.props.open && d.props["data-mobile-collapsible"] === "true"),
    ).toBe(true);
    expect(classes(nav)).toContain("quartz-nav--mobile-accordion");
  });

  it("offcanvas renders the checkbox, burger and backdrop before the panel", () => {
    const nav = render({ variant: "horizontal", mobile: "offcanvas", id: "top" }, "index")!;
    const input = find(nav, "input");
    expect(input.props.type).toBe("checkbox");
    expect(input.props.id).toBe("top-toggle");
    expect(input.props["aria-expanded"]).toBe("false");
    expect(input.props["aria-controls"]).toBe("top-panel");
    const labels = findAll(nav, "label");
    expect(labels.map((l) => l.props.for)).toEqual(["top-toggle", "top-toggle"]);
    expect(classes(labels[1]!)).toContain("quartz-nav__backdrop");
    expect(find(nav, "div", "quartz-nav__panel").props.id).toBe("top-panel");
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
    const go = find(nav, "button", "quartz-nav__go");
    expect(go.props["data-select"]).toBe(find(nav, "select").props.id);
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
    expect(next.props.href).toBe("../../docs/01-intro");
    const noLabels = render({ variant: "pager", pager: { labels: false } }, "docs/guides/alpha")!;
    expect(text(find(noLabels, "a", "quartz-nav__next"))).toBe("Intro");
    expect(render({ variant: "pager" }, "tags/foo")).toBeNull();
    const first = render({ variant: "pager" }, "index")!;
    expect(find(first, "span", "quartz-nav__prev--empty")).toBeTruthy();
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
