import { DOMParser, onErrorStopParsing } from "@xmldom/xmldom";

/**
 * An SVG file from the vault as a node tree the navigation draws inline, like a Lucide icon.
 *
 * Inline, the SVG is part of every page and runs in it. So nothing from the file is passed
 * through: the tree is built anew from an allow list. The allow list and every check on names and
 * values come from QuartzControl 1.3's `src/utils/inlineSvg.ts` (the section marked "copied" below,
 * reformatted by prettier, otherwise unchanged); what differs is said where it differs:
 *
 * - The file is parsed with xmldom instead of Chrome's `DOMParser`, stopping at the first error.
 *   xmldom expands no entity a DOCTYPE declares (internal or external), so such a file fails
 *   instead of being expanded. A root without `xmlns` counts as SVG there (Chrome refuses it);
 *   the navigation writes `xmlns` itself.
 * - The result is a tree, not markup: Preact writes names, values and text and escapes them, so
 *   QuartzControl's escaping for HTML and Markdown has no counterpart here.
 * - An icon sits inside the navigation's own link and is decorative (`aria-hidden`): an `<a>` gives
 *   up its element and keeps its children, `<title>` and `<desc>` go, and a picture (`<image>`,
 *   `<feImage>`) may only point into the file or be a raster `data:` URL, never `https:`, since
 *   every page would load it.
 * - `mono` turns every colour into `currentColor`, so the icon follows the navigation's colours.
 */

export type SvgNode = string | SvgElement;
export interface SvgElement {
  tag: string;
  attrs: Record<string, string>;
  children: SvgNode[];
}

export type SanitizedSvg =
  | {
      ok: true;
      /** The root's attributes, without `width`/`height`; `viewBox` is always set. */
      attrs: Record<string, string>;
      children: SvgNode[];
      /** How many things were taken out (editor leftovers go without counting). */
      removed: number;
      /** One of them was a `<style>`, which held colours the icon no longer has. */
      styled: boolean;
      /** The prefix every own id got, when the file has ids (see `withInstance`). */
      idPrefix?: string;
    }
  | { ok: false; reason: string };

// ── copied from QuartzControl src/utils/inlineSvg.ts (1.3.0) ──

const SVG_NS = "http://www.w3.org/2000/svg";
const XLINK_NS = "http://www.w3.org/1999/xlink";

// No name here is one the HTML parser lets break out of foreign content (img, p, div, font, …).
const ELEMENTS = new Set([
  "svg",
  "g",
  "defs",
  "symbol",
  "use",
  "title",
  "desc",
  "switch",
  "view",
  "a",
  "image",
  "path",
  "circle",
  "ellipse",
  "line",
  "polyline",
  "polygon",
  "rect",
  "text",
  "tspan",
  "textPath",
  "linearGradient",
  "radialGradient",
  "stop",
  "clipPath",
  "mask",
  "pattern",
  "marker",
  "filter",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "animate",
  "animateMotion",
  "animateTransform",
  "set",
  "mpath",
]);
const ANIMATIONS = new Set(["animate", "animateMotion", "animateTransform", "set"]);
// What vector editors leave behind; dropped without counting, since none of it runs or loads.
const EDITOR_NS = /inkscape|sodipodi|adobe|sketch|figma|purl\.org\/dc|creativecommons|rdf-syntax/i;

// The URL parser drops tabs and newlines anywhere and C0 controls and spaces at the ends; dropping
// every such character before the check sees at least what the browser will.
// eslint-disable-next-line no-control-regex
const compact = (value: string): string => value.replace(/[\u0000- ]/g, "");
const safeHref = (element: string, value: string): boolean => {
  const v = compact(value);
  if (v.startsWith("#")) return true;
  if (element === "a") return /^(https|mailto):/i.test(v);
  if (element === "image")
    return /^https:/i.test(v) || /^data:image\/(png|jpe?g|gif|webp|avif)[;,]/i.test(v);
  return false;
};
// CSS reads `u\72 l(` as `url(`: an escape is a backslash and one to six hex digits with one
// optional space after them, or a backslash and any other character. Decoded before the question,
// so the question sees the value the way the style engine will.
const cssUnescape = (value: string): string =>
  value.replace(
    /\\(?:([0-9a-f]{1,6})[ \t\n\r\f]?|([^\n\r\f0-9a-f]))/gi,
    (_, hex: string | undefined, ch: string | undefined) =>
      hex ? String.fromCodePoint(Math.min(parseInt(hex, 16) || 0xfffd, 0x10ffff)) : (ch ?? ""),
  );
// `fill="url(https://…)"`, a `style` with an `@import`: anything in a value that leaves the file.
// `image-set("…")` and its relatives load from a bare string, without any `url(`.
const leavesFile = (raw: string): boolean => {
  const value = cssUnescape(raw);
  return (
    /url\(\s*(?!['"]?\s*#)/i.test(value) ||
    /image-set\(|image\(|cross-fade\(|\bsrc\(/i.test(value) ||
    /@import|expression\s*\(|javascript:/i.test(compact(value))
  );
};

// HTML writes attribute names in lower case and gives these SVG names their capitals back
// ("adjust SVG attributes" in the HTML parser); XML takes every name as written. A name is checked
// and written the way the site will read it - `HREF` is an `href` there, `ATTRIBUTENAME` an
// `attributeName` (forty-third review, finding 3).
const SVG_CAMEL = new Map(
  [
    "attributeName",
    "attributeType",
    "baseFrequency",
    "baseProfile",
    "calcMode",
    "clipPathUnits",
    "diffuseConstant",
    "edgeMode",
    "filterUnits",
    "glyphRef",
    "gradientTransform",
    "gradientUnits",
    "kernelMatrix",
    "kernelUnitLength",
    "keyPoints",
    "keySplines",
    "keyTimes",
    "lengthAdjust",
    "limitingConeAngle",
    "markerHeight",
    "markerUnits",
    "markerWidth",
    "maskContentUnits",
    "maskUnits",
    "numOctaves",
    "pathLength",
    "patternContentUnits",
    "patternTransform",
    "patternUnits",
    "pointsAtX",
    "pointsAtY",
    "pointsAtZ",
    "preserveAlpha",
    "preserveAspectRatio",
    "primitiveUnits",
    "refX",
    "refY",
    "repeatCount",
    "repeatDur",
    "requiredExtensions",
    "requiredFeatures",
    "specularConstant",
    "specularExponent",
    "spreadMethod",
    "startOffset",
    "stdDeviation",
    "stitchTiles",
    "surfaceScale",
    "systemLanguage",
    "tableValues",
    "targetX",
    "targetY",
    "textLength",
    "viewBox",
    "viewTarget",
    "xChannelSelector",
    "yChannelSelector",
    "zoomAndPan",
  ].map((name) => [name.toLowerCase(), name]),
);
const htmlName = (name: string): string => {
  const lower = name.toLowerCase();
  return SVG_CAMEL.get(lower) ?? lower;
};

// Ids are the page's, not the file's: two pasted icons from Figma both name a clip path
// `clip0_1_2`, from Illustrator both roots `Ebene_1`, and `url(#…)` takes the first element of the
// page with that id - the second icon wore the first one's gradient (forty-third review, nebenbei).
// So every id the file defines gets a prefix from its name and content, and every reference to one
// of them follows: `href="#…"`, `url(#…)` in any value, an animation's `begin`/`end` (`id.click`),
// and the ARIA attributes that list ids. A reference to an id the file does not define stays as
// it is.
const hash = (text: string): string => {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 0x01000193);
  return (h >>> 0).toString(36).slice(0, 5);
};
const ID_LISTS = new Set([
  "aria-labelledby",
  "aria-describedby",
  "aria-controls",
  "aria-owns",
  "aria-flowto",
  "aria-details",
  "aria-activedescendant",
  "aria-errormessage",
]);
// A reference is read the way its reader reads it, as the checks above are: `href` the way the URL
// parser does (` #s` is `#s`), a `url()` the way CSS does (`#g\31` is `#g1`), and an animation's
// `anim.1.end` with the dot belonging to the id where the file defines one with it. In each of the
// four forms the reference kept its old id and pointed nowhere (forty-fourth review, Niedrig 8).
// Written in the read form only when it is one of the file's ids, and only an id that needs no
// escaping in CSS - anything else stays as it was written.
const PLAIN_ID = /^[\w.:-]+$/;
const URL_REF = /url\(\s*(['"]?)((?:\\[0-9a-f]{1,6}[ \t\n\r\f]?|\\[^\n\r\f0-9a-f]|[^'")\s\\])+)/gi;
function rewriteIds(
  attrName: string,
  value: string,
  ids: ReadonlySet<string>,
  prefix: string,
): string {
  const own = (id: string): string => (ids.has(id) ? prefix + id : id);
  if (attrName === "id") return own(value);
  if (attrName === "href") {
    const v = compact(value);
    return v.startsWith("#") && ids.has(v.slice(1)) ? `#${own(v.slice(1))}` : value;
  }
  if (ID_LISTS.has(attrName))
    return value
      .split(/(\s+)/)
      .map((part) => (/\s/.test(part) ? part : own(part)))
      .join("");
  if (attrName === "begin" || attrName === "end") {
    return value.replace(
      /(^|;)(\s*)([^;\s]+)/g,
      (whole: string, sep: string, ws: string, token: string) => {
        const parts = token.split(".");
        for (let k = parts.length - 1; k >= 1; k--) {
          const id = parts.slice(0, k).join(".");
          if (ids.has(id)) return `${sep}${ws}${own(id)}.${parts.slice(k).join(".")}`;
        }
        return whole;
      },
    );
  }
  return value.replace(URL_REF, (whole: string, quote: string, raw: string) => {
    const ref = cssUnescape(raw);
    if (!ref.startsWith("#")) return whole;
    const id = ref.slice(1);
    return ids.has(id) && PLAIN_ID.test(id) ? `url(${quote}#${own(id)}` : whole;
  });
}

// ── end of copy ──

// DOM node types (Node.js has no global `Node`).
const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const CDATA_SECTION_NODE = 4;
const PROCESSING_INSTRUCTION_NODE = 7;

/** Decorative inside a link: no tooltip, no accessible name, no second link. */
const DROPPED = new Set(["title", "desc"]);
const UNWRAPPED = new Set(["a"]);

/** Attributes and `style` properties that carry a colour (`svg-mono:` makes them `currentColor`). */
const COLOR_PROPS = new Set([
  "fill",
  "stroke",
  "stop-color",
  "flood-color",
  "lighting-color",
  "color",
]);
const KEEP_COLOR = /^(none|transparent|currentcolor|inherit)$/i;

function monoValue(value: string): string {
  const v = value.trim();
  return KEEP_COLOR.test(v) || /^url\(/i.test(v) ? value : "currentColor";
}

function monoStyle(style: string): string {
  return style.replace(
    /(^|;)(\s*)([a-z-]+)(\s*:\s*)([^;]*)/gi,
    (whole: string, sep: string, ws: string, prop: string, colon: string, value: string) =>
      COLOR_PROPS.has(prop.toLowerCase()) ? `${sep}${ws}${prop}${colon}${monoValue(value)}` : whole,
  );
}

/** `12`, `12px`, `12.5` → the number; percentages and other units say nothing about a viewBox. */
function plainLength(value: string | undefined): number | undefined {
  const m = value?.trim().match(/^(\d+(?:\.\d+)?)(px)?$/i);
  return m ? Number(m[1]) : undefined;
}

interface DomAttr {
  namespaceURI: string | null;
  localName: string;
  value: string;
}
interface DomNode {
  nodeType: number;
  nodeValue: string | null;
  localName?: string;
  namespaceURI?: string | null;
  textContent?: string | null;
  attributes?: ArrayLike<DomAttr>;
  childNodes?: ArrayLike<DomNode>;
  getAttribute?(name: string): string | null;
}

function collectIds(node: DomNode, out: Set<string>): void {
  if (node.nodeType !== ELEMENT_NODE) return;
  const id = node.getAttribute?.("id");
  if (id) out.add(id);
  for (const child of Array.from(node.childNodes ?? [])) collectIds(child, out);
}

export function sanitizeSvg(
  text: string,
  fileName: string,
  options: { mono?: boolean } = {},
): SanitizedSvg {
  let root: DomNode;
  try {
    const doc = new DOMParser({ onError: onErrorStopParsing }).parseFromString(
      text,
      "image/svg+xml",
    );
    root = doc.documentElement as unknown as DomNode;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { ok: false, reason: `not readable as XML (${message.split("\n")[0]})` };
  }
  if (!root || root.localName !== "svg" || root.namespaceURI !== SVG_NS)
    return { ok: false, reason: "not an SVG (no <svg> root in the SVG namespace)" };

  const slug = fileName
    .replace(/\.svg$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const mono = options.mono === true;

  let removed = 0;
  let styled = false;
  const ids = new Set<string>();
  collectIds(root, ids);
  const idPrefix = `${slug || "svg"}-${hash(text)}-`;

  const write = (node: DomNode): SvgNode[] => {
    if (node.nodeType === TEXT_NODE || node.nodeType === CDATA_SECTION_NODE)
      return node.nodeValue ? [node.nodeValue] : [];
    if (node.nodeType === PROCESSING_INSTRUCTION_NODE) {
      removed++;
      return [];
    }
    if (node.nodeType !== ELEMENT_NODE) return []; // comments
    const name = node.localName ?? "";
    const children = (): SvgNode[] => Array.from(node.childNodes ?? []).flatMap(write);
    if (node.namespaceURI !== SVG_NS || !ELEMENTS.has(name)) {
      if (name === "style" && node.namespaceURI === SVG_NS && (node.textContent ?? "").trim())
        styled = true;
      if (
        !(name === "metadata" && node.namespaceURI === SVG_NS) &&
        !EDITOR_NS.test(node.namespaceURI ?? "")
      )
        removed++;
      return [];
    }
    if (DROPPED.has(name)) return [];
    if (UNWRAPPED.has(name)) {
      removed++;
      return children();
    }

    // The attributes as the site will see them: names the HTML way, the first of two that end up
    // with the same name. An own `href` wins over `xlink:href`, which is written as plain `href`.
    const seen = new Map<string, string>();
    let xlinkHref: string | null = null;
    for (const attr of Array.from(node.attributes ?? [])) {
      const ns = attr.namespaceURI;
      if (ns === XLINK_NS && attr.localName === "href") {
        xlinkHref ??= attr.value;
        continue;
      }
      if (ns !== null) {
        if (
          ns !== "http://www.w3.org/2000/xmlns/" &&
          ns !== "http://www.w3.org/XML/1998/namespace" &&
          !EDITOR_NS.test(ns)
        )
          removed++;
        continue;
      }
      // xmldom gives an `xmlns` declaration without a namespace when it has no prefix.
      if (attr.localName === "xmlns") continue;
      if (!/^[A-Za-z][\w.-]*$/.test(attr.localName)) {
        removed++;
        continue;
      }
      const html = htmlName(attr.localName);
      if (seen.has(html)) {
        removed++;
        continue;
      }
      seen.set(html, attr.value);
    }
    if (xlinkHref !== null && !seen.has("href")) seen.set("href", xlinkHref);

    if (ANIMATIONS.has(name)) {
      const target = compact(seen.get("attributeName") ?? "")
        .replace(/^.*:/, "")
        .toLowerCase();
      if (target === "href" || target.startsWith("on")) {
        removed++;
        return [];
      }
    }

    const attrs: Record<string, string> = {};
    for (const [attrName, value] of seen) {
      if (attrName.startsWith("on")) {
        removed++;
        continue;
      }
      const unsafe =
        attrName === "href"
          ? !safeHref(name === "feImage" ? "image" : name, value) || /^https:/i.test(compact(value))
          : leavesFile(value);
      if (unsafe) {
        removed++;
        continue;
      }
      let out = rewriteIds(attrName, value, ids, idPrefix);
      if (mono && COLOR_PROPS.has(attrName)) out = monoValue(out);
      if (mono && attrName === "style") out = monoStyle(out);
      attrs[attrName] = out;
    }
    return [{ tag: name, attrs, children: children() }];
  };

  const [top] = write(root);
  if (!top || typeof top === "string")
    return { ok: false, reason: "not an SVG (no <svg> root in the SVG namespace)" };
  const attrs = { ...top.attrs };
  if (!attrs.viewBox) {
    const w = plainLength(attrs.width);
    const h = plainLength(attrs.height);
    if (w === undefined || h === undefined)
      return { ok: false, reason: "has neither a viewBox nor a width and height in pixels" };
    attrs.viewBox = `0 0 ${w} ${h}`;
  }
  delete attrs.width;
  delete attrs.height;
  const own = attrs.class?.trim() ?? "";
  const cls = slug ? `svg-${slug}` : "";
  const classes = [own, cls && !own.split(/\s+/).includes(cls) ? cls : ""]
    .filter(Boolean)
    .join(" ");
  if (classes) attrs.class = classes;
  else delete attrs.class;
  // Without a fill of its own a shape is black in an image viewer - but inline it inherits `fill`
  // from the page, and Quartz gives `a` and `li` the text colour (measured in gui-test: a shape
  // without fill turned light grey in dark mode). So the root says it: black as drawn, or in
  // `mono` the navigation's colour.
  const ownFill = attrs.fill !== undefined || /(^|;)\s*fill\s*:/i.test(attrs.style ?? "");
  if (!ownFill) attrs.fill = mono ? "currentColor" : "black";
  return {
    ok: true,
    attrs,
    children: dropBlankText(top.children),
    removed,
    styled,
    ...(ids.size > 0 ? { idPrefix } : {}),
  };
}

/** Whitespace between tags is layout of the file, not text of the icon. */
function dropBlankText(nodes: SvgNode[]): SvgNode[] {
  return nodes
    .filter((n) => typeof n !== "string" || n.trim() !== "")
    .map((n) => (typeof n === "string" ? n : { ...n, children: dropBlankText(n.children) }));
}

/**
 * The same icon twice on a page (a folder row and its "overview" entry, two navigations) would
 * define its ids twice: invalid, and a gradient whose first copy sits in a hidden panel is not
 * drawn by every browser. Each drawing gets its own ids: the file's prefix with an instance mark.
 * The prefix holds a hash of the file, so it occurs only where an id was written.
 */
export function withInstance(nodes: SvgNode[], idPrefix: string, instance: string): SvgNode[] {
  const own = `${idPrefix}${instance}-`;
  return nodes.map((n) =>
    typeof n === "string"
      ? n
      : {
          tag: n.tag,
          attrs: Object.fromEntries(
            Object.entries(n.attrs).map(([k, v]) => [k, v.split(idPrefix).join(own)]),
          ),
          children: withInstance(n.children, idPrefix, instance),
        },
  );
}
