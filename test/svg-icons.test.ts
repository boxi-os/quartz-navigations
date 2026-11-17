/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import os from "os";
import path from "path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import type { QuartzComponentProps } from "@quartz-community/types";
import Navigation from "../src/components/Navigation";
import { SvgFileIcon } from "../src/icons";
import {
  clearSvgIconCache,
  MAX_SVG_BYTES,
  readSvgIcon,
  resolveSvgPath,
  svgIconRef,
} from "../src/svg-icons";
import { sanitizeSvg, type SvgElement, type SvgNode } from "../src/svg-sanitize";
import type { NavigationOptions } from "../src/types";
import { resetWarnings } from "../src/util/warn";
import { site } from "./fixture";

const NS = 'xmlns="http://www.w3.org/2000/svg"';
const svg = (inner: string, attrs = 'viewBox="0 0 24 24"') => `<svg ${NS} ${attrs}>${inner}</svg>`;

let warn: ReturnType<typeof vi.spyOn>;
beforeEach(() => {
  resetWarnings();
  clearSvgIconCache();
  warn = vi.spyOn(console, "warn").mockImplementation(() => {});
});
afterEach(() => warn.mockRestore());

function ok(text: string, mono = false) {
  const r = sanitizeSvg(text, "icon.svg", { mono });
  if (!r.ok) throw new Error(r.reason);
  return r;
}

/** Every element below the root, depth first. */
function elements(nodes: SvgNode[], out: SvgElement[] = []): SvgElement[] {
  for (const n of nodes) {
    if (typeof n === "string") continue;
    out.push(n);
    elements(n.children, out);
  }
  return out;
}

const tags = (nodes: SvgNode[]) => elements(nodes).map((e) => e.tag);

describe("svgIconRef", () => {
  it("recognises svg: and svg-mono:, nothing else", () => {
    expect(svgIconRef("svg:icons/a.svg")).toEqual({ path: "icons/a.svg", mono: false });
    expect(svgIconRef("SVG-Mono: icons/a.svg ")).toEqual({ path: "icons/a.svg", mono: true });
    expect(svgIconRef("lucide:book-open")).toBeUndefined();
    expect(svgIconRef("📘")).toBeUndefined();
    expect(svgIconRef(undefined)).toBeUndefined();
  });
});

describe("sanitizeSvg", () => {
  it("keeps a plain icon and makes its size the navigation's", () => {
    const r = ok(
      svg('<path d="M1 1h22"/>', 'width="48" height="48" viewBox="0 0 24 24" fill="red"'),
    );
    expect(r.attrs).toEqual({ viewBox: "0 0 24 24", fill: "red", class: "svg-icon" });
    expect(r.children).toEqual([{ tag: "path", attrs: { d: "M1 1h22" }, children: [] }]);
    expect(r.removed).toBe(0);
  });

  it("builds a viewBox from width and height in pixels, refuses without either", () => {
    expect(ok(svg("", 'width="32px" height="16"')).attrs.viewBox).toBe("0 0 32 16");
    const none = sanitizeSvg(svg("", 'width="100%" height="100%"'), "x.svg");
    expect(none).toEqual({ ok: false, reason: expect.stringContaining("viewBox") });
  });

  it("refuses what is no SVG or no XML", () => {
    expect(sanitizeSvg("<html><body/></html>", "x.svg").ok).toBe(false);
    // Parsed as image/svg+xml, a root without xmlns is in the SVG namespace (xmldom; Chrome
    // refuses it). Harmless: the plugin writes xmlns itself.
    expect(sanitizeSvg('<svg viewBox="0 0 1 1"/>', "x.svg").ok).toBe(true);
    expect(sanitizeSvg('<svg xmlns="http://example.com/x" viewBox="0 0 1 1"/>', "x.svg").ok).toBe(
      false,
    );
    expect(sanitizeSvg(`<svg ${NS}><g></svg>`, "x.svg").ok).toBe(false);
    expect(sanitizeSvg("", "x.svg").ok).toBe(false);
  });

  it("expands no entity a DOCTYPE declares, internal or external", () => {
    const internal = `<!DOCTYPE svg [<!ENTITY a "x">]>${svg("<text>&a;</text>")}`;
    const external = `<!DOCTYPE svg [<!ENTITY a SYSTEM "file:///etc/passwd">]>${svg("<text>&a;</text>")}`;
    expect(sanitizeSvg(internal, "x.svg").ok).toBe(false);
    expect(sanitizeSvg(external, "x.svg").ok).toBe(false);
  });

  it("drops scripts, handlers, foreign content, styles, comments and processing instructions", () => {
    const r = ok(
      svg(
        `<script>alert(1)</script><style>.a{fill:red}</style><!-- c --><?pi x?>` +
          `<foreignObject><div xmlns="http://www.w3.org/1999/xhtml">x</div></foreignObject>` +
          `<path d="M0 0" onclick="alert(1)" ONLOAD="x"/>`,
        `viewBox="0 0 1 1" onload="alert(1)"`,
      ),
    );
    expect(tags(r.children)).toEqual(["path"]);
    expect(r.attrs.onload).toBeUndefined();
    expect(elements(r.children)[0]!.attrs).toEqual({ d: "M0 0" });
    expect(r.styled).toBe(true);
    expect(r.removed).toBe(7); // script, style, pi, foreignObject, 3 handlers
  });

  it("keeps no reference out of the file", () => {
    const r = ok(
      svg(
        `<use href="https://evil.example/s.svg#a"/><use xlink:href="#own"/>` +
          `<image href="https://evil.example/p.png"/><image href="data:image/png;base64,AAAA"/>` +
          `<image href="data:image/svg+xml,&lt;svg/&gt;"/><feImage href="https://evil.example/x"/>` +
          `<path id="own" fill="url(https://evil.example/#g)" style="background:u\\72 l(x)" d="M0 0"/>` +
          `<a href="javascript:alert(1)"><circle r="1"/></a>` +
          `<animate attributeName="href" to="javascript:alert(1)"/>`,
        `viewBox="0 0 1 1" xmlns:xlink="http://www.w3.org/1999/xlink"`,
      ),
    );
    const els = elements(r.children);
    expect(els.filter((e) => e.attrs.href !== undefined).map((e) => e.attrs.href)).toEqual([
      expect.stringMatching(/^#icon-\w+-own$/),
      "data:image/png;base64,AAAA",
    ]);
    const p = els.find((e) => e.tag === "path")!;
    expect(p.attrs.fill).toBeUndefined();
    expect(p.attrs.style).toBeUndefined();
    // The link goes, its drawing stays; the animation that set an href goes.
    expect(tags(r.children)).not.toContain("a");
    expect(tags(r.children)).toContain("circle");
    expect(tags(r.children)).not.toContain("animate");
  });

  it("drops title and desc without counting (the icon is decorative)", () => {
    const r = ok(svg("<title>Ebene 1</title><desc>x</desc><rect width='1' height='1'/>"));
    expect(tags(r.children)).toEqual(["rect"]);
    expect(r.removed).toBe(0);
  });

  it("drops editor leftovers without counting", () => {
    const r = ok(
      svg(
        `<metadata><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"/></metadata>` +
          `<sodipodi:namedview xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"/>` +
          `<path d="M0 0" inkscape:label="x" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"/>`,
      ),
    );
    expect(tags(r.children)).toEqual(["path"]);
    expect(r.removed).toBe(0);
  });

  it("gives every own id a prefix, so two icons from the same editor do not share a clip path", () => {
    const file = (color: string) =>
      svg(
        `<defs><clipPath id="clip0_1_2"><rect width="1" height="1"/></clipPath>` +
          `<linearGradient id="g"><stop stop-color="${color}"/></linearGradient></defs>` +
          `<path clip-path="url(#clip0_1_2)" fill="url('#g')" d="M0 0"/><use href="#other"/>`,
      );
    const a = ok(file("red"));
    const b = ok(file("blue"));
    const ids = (r: typeof a) =>
      elements(r.children).flatMap((e) => (e.attrs.id ? [e.attrs.id] : []));
    expect(ids(a)).toHaveLength(2);
    expect(ids(a).some((id) => ids(b).includes(id))).toBe(false);
    const p = elements(a.children).find((e) => e.tag === "path")!;
    expect(p.attrs["clip-path"]).toBe(`url(#${ids(a)[0]})`);
    expect(p.attrs.fill).toBe(`url('#${ids(a)[1]}')`);
    // A reference to an id the file does not define stays.
    expect(elements(a.children).find((e) => e.tag === "use")!.attrs.href).toBe("#other");
  });

  it("names attributes the way HTML will read them", () => {
    const r = ok(svg('<path D="M0 0"/>', 'VIEWBOX="0 0 2 2"'));
    expect(r.attrs.viewBox).toBe("0 0 2 2");
    expect(elements(r.children)[0]!.attrs).toEqual({ d: "M0 0" });
  });

  it("svg-mono: turns every colour into currentColor, keeps none and references", () => {
    const r = ok(
      svg(
        `<defs><linearGradient id="g"><stop stop-color="#f00"/><stop offset="1" style="stop-color: blue; stop-opacity: .5"/></linearGradient></defs>` +
          `<path d="M0 0" fill="#000" stroke="none"/><path d="M1 1" fill="url(#g)" style="fill:red;opacity:.5"/>`,
      ),
      true,
    );
    const els = elements(r.children);
    const stops = els.filter((e) => e.tag === "stop");
    expect(stops[0]!.attrs["stop-color"]).toBe("currentColor");
    expect(stops[1]!.attrs.style).toBe("stop-color: currentColor; stop-opacity: .5");
    const paths = els.filter((e) => e.tag === "path");
    expect(paths[0]!.attrs).toEqual({ d: "M0 0", fill: "currentColor", stroke: "none" });
    expect(paths[1]!.attrs.fill).toMatch(/^url\(#icon-\w+-g\)$/);
    expect(paths[1]!.attrs.style).toBe("fill:currentColor;opacity:.5");
    // Shapes without a fill of their own follow the navigation too.
    expect(r.attrs.fill).toBe("currentColor");
    expect(ok(svg(""), true).attrs.fill).toBe("currentColor");
    expect(ok(svg("", 'viewBox="0 0 1 1" fill="none"'), true).attrs.fill).toBe("none");
    // Without mono the colours stay.
    expect(ok(svg('<path d="M0 0" fill="#000"/>')).children[0]).toMatchObject({
      attrs: { fill: "#000" },
    });
    // Without mono and without a fill of its own the root says black, as an image viewer draws
    // it; inline it would inherit Quartz's text colour from the link around it.
    expect(ok(svg("")).attrs.fill).toBe("black");
    expect(ok(svg("", 'viewBox="0 0 1 1" style="fill: red"')).attrs.fill).toBeUndefined();
  });
});

describe("resolveSvgPath / readSvgIcon", () => {
  let root: string;
  let content: string;
  beforeAll(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), "nav-svg-"));
    content = path.join(root, "content");
    fs.mkdirSync(path.join(content, "icons"), { recursive: true });
    fs.writeFileSync(path.join(content, "icons", "a.svg"), svg('<path d="M0 0"/>'));
    fs.writeFileSync(
      path.join(content, "icons", "grad.svg"),
      svg(
        '<defs><linearGradient id="g"><stop stop-color="red"/></linearGradient>' +
          '<clipPath id="c"><rect width="24" height="24"/></clipPath></defs>' +
          '<rect width="24" height="24" fill="url(#g)"/>',
        'viewBox="0 0 24 24" clip-path="url(#c)"',
      ),
    );
    fs.writeFileSync(path.join(content, "icons", "U\u0308ber.svg"), svg('<path d="M1 1"/>'));
    fs.writeFileSync(
      path.join(content, "icons", "big.svg"),
      svg(`<desc>${"x".repeat(MAX_SVG_BYTES)}</desc>`),
    );
    fs.writeFileSync(path.join(content, "icons", "bad.svg"), "<svg");
    fs.mkdirSync(path.join(content, "icons", "dir.svg"));
    fs.writeFileSync(path.join(root, "secret.svg"), svg('<path d="M9 9"/>'));
    fs.symlinkSync(path.join(root, "secret.svg"), path.join(content, "icons", "out.svg"));
    fs.symlinkSync(path.join(content, "icons", "a.svg"), path.join(content, "icons", "in.svg"));
  });
  afterAll(() => fs.rmSync(root, { recursive: true, force: true }));

  const reason = (ref: string) => {
    const r = resolveSvgPath(content, ref);
    return r.ok ? "ok" : r.reason;
  };

  it("refuses paths that are not plain relative paths to an .svg", () => {
    expect(reason("")).toMatch(/no path/);
    expect(reason("/etc/x.svg")).toMatch(/relative/);
    expect(reason("C:/x.svg")).toMatch(/relative/);
    expect(reason("icons\\a.svg")).toMatch(/use \//);
    expect(reason("../secret.svg")).toMatch(/\.\./);
    expect(reason("icons/../../secret.svg")).toMatch(/\.\./);
    expect(reason("./icons/a.svg")).toMatch(/\./);
    expect(reason("icons/a.png")).toMatch(/\.svg/);
  });

  it("follows symlinks, but not out of the content folder", () => {
    expect(reason("icons/a.svg")).toBe("ok");
    expect(reason("icons//a.svg")).toBe("ok");
    expect(reason("icons/in.svg")).toBe("ok");
    expect(reason("icons/out.svg")).toMatch(/out of the content folder/);
    expect(reason("icons/missing.svg")).toMatch(/not found/);
  });

  it("finds a decomposed file name written composed", () => {
    expect(reason("icons/\u00dcber.svg")).toBe("ok");
  });

  it("reads, refuses directories, large and broken files", () => {
    const read = (p: string) => readSvgIcon(content, { path: p, mono: false });
    expect(read("icons/a.svg")).toMatchObject({ ok: true, attrs: { viewBox: "0 0 24 24" } });
    expect(read("icons/dir.svg")).toEqual({ ok: false, reason: "not a file" });
    expect(read("icons/big.svg")).toMatchObject({ ok: false, reason: expect.stringMatching(/KB/) });
    expect(read("icons/bad.svg")).toMatchObject({
      ok: false,
      reason: expect.stringMatching(/XML/),
    });
  });

  it("reads a file again once it changed", () => {
    const file = path.join(content, "icons", "change.svg");
    fs.writeFileSync(file, svg('<path d="M0 0"/>'));
    const first = readSvgIcon(content, { path: "icons/change.svg", mono: false });
    fs.writeFileSync(file, svg('<circle r="12"/>'));
    const later = new Date(Date.now() + 5000);
    fs.utimesSync(file, later, later);
    const second = readSvgIcon(content, { path: "icons/change.svg", mono: false });
    expect(first.ok && tags(first.children)).toEqual(["path"]);
    expect(second.ok && tags(second.children)).toEqual(["circle"]);
  });

  it("SvgFileIcon draws the file like a Lucide icon, warns once when it cannot", () => {
    const icon = SvgFileIcon({
      value: "svg:icons/a.svg",
      contentDir: content,
      className: "x",
    }) as any;
    expect(icon.type).toBe("svg");
    expect(icon.props.class).toBe("svg-a x");
    expect(icon.props.width).toBe("1em");
    expect(icon.props.viewBox).toBe("0 0 24 24");
    expect(icon.props["aria-hidden"]).toBe("true");
    expect(SvgFileIcon({ value: "svg:icons/missing.svg", contentDir: content })).toBeNull();
    expect(SvgFileIcon({ value: "svg:icons/missing.svg", contentDir: content })).toBeNull();
    expect(SvgFileIcon({ value: "svg:icons/a.svg", contentDir: undefined })).toBeNull();
    expect(warn.mock.calls.map((c) => String(c[0]))).toEqual([
      "[navigations] Icon `svg:icons/missing.svg`: file not found.",
      "[navigations] Icon `svg:icons/a.svg`: the content folder is unknown, so the file cannot be read.",
    ]);
  });

  const render = (opts: NavigationOptions) =>
    Navigation({ breakpoints: { mobile: "700px", desktop: "1100px" }, ...opts })({
      ctx: { argv: { directory: content } },
      fileData: { slug: "index", frontmatter: { title: "Home" } },
      cfg: { pageTitle: "Site", locale: "en-US" },
      externalResources: { css: [], js: [], additionalHead: [] },
      children: [],
      tree: {},
      allFiles: site(),
    } as unknown as QuartzComponentProps);
  // Expand the function components the way Preact would and look at what they drew.
  const walk = (n: any, out: any[] = []): any[] => {
    if (Array.isArray(n)) n.forEach((c) => walk(c, out));
    else if (n && typeof n === "object" && "type" in n) {
      if (typeof n.type === "function") return walk(n.type(n.props), out);
      out.push(n);
      walk(n.props?.children, out);
    }
    return out;
  };
  const fileIcons = (nav: unknown) =>
    walk(nav).filter(
      (v) => v.type === "svg" && String(v.props.class).includes("quartz-nav__icon--svg"),
    );

  it("in the rail strip a file icon replaces the monogram, a broken one leaves it", () => {
    const nav = render({
      variant: "rail",
      nodeIcons: { docs: "svg-mono:icons/a.svg", blog: "svg:icons/missing.svg" },
    });
    const all = walk(nav);
    const svgs = fileIcons(nav);
    expect(svgs).toHaveLength(1);
    expect(svgs[0].props.fill).toBe("currentColor");
    const monograms = all.filter(
      (v) => v.type === "span" && String(v.props.class).includes("quartz-nav__monogram"),
    );
    expect(monograms.map((m) => m.props.children)).toEqual(["B", "O", "P"]);
  });

  it("gives every drawing of the same file its own ids", () => {
    const nav = render({ indexEntry: "first", nodeIcons: { docs: "svg:icons/grad.svg" } });
    const svgs = fileIcons(nav);
    expect(svgs.length).toBeGreaterThanOrEqual(2);
    const ids = svgs.map((s) => walk(s).find((v) => v.type === "linearGradient").props.id);
    expect(new Set(ids).size).toBe(ids.length);
    svgs.forEach((s, i) => {
      expect(walk(s).find((v) => v.type === "rect" && v.props.fill).props.fill).toBe(
        `url(#${ids[i]})`,
      );
      expect(s.props["clip-path"]).toBe(
        `url(#${walk(s).find((v) => v.type === "clipPath").props.id})`,
      );
    });
  });
});
