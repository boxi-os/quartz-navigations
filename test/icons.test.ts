import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { hasLucideIcon, LucideIcon, lucideIconNames, lucideName } from "../src/icons";
import { resetWarnings } from "../src/util/warn";

let warn: ReturnType<typeof vi.spyOn>;
beforeEach(() => {
  resetWarnings();
  warn = vi.spyOn(console, "warn").mockImplementation(() => {});
});
afterEach(() => warn.mockRestore());

describe("lucide icons", () => {
  it("recognises the lucide: prefix", () => {
    expect(lucideName("lucide:book-open")).toBe("book-open");
    expect(lucideName("Lucide: Book-Open ")).toBe("book-open");
    expect(lucideName("📘")).toBeUndefined();
    expect(lucideName("")).toBeUndefined();
    expect(lucideName(undefined)).toBeUndefined();
  });

  it("ships the full icon table", () => {
    expect(lucideIconNames().length).toBeGreaterThan(2300);
    expect(hasLucideIcon("chevron-down")).toBe(true);
    expect(hasLucideIcon("menu")).toBe(true);
    expect(hasLucideIcon("x")).toBe(true);
    expect(hasLucideIcon("no-such-icon")).toBe(false);
  });

  it("renders an inline SVG with Lucide's attributes", () => {
    const svg = LucideIcon({ name: "chevron-down", className: "extra", size: "2em" })!;
    expect(svg.type).toBe("svg");
    expect(svg.props.class).toBe("lucide lucide-chevron-down extra");
    expect(svg.props.width).toBe("2em");
    expect(svg.props.viewBox).toBe("0 0 24 24");
    expect(svg.props.stroke).toBe("currentColor");
    expect(svg.props["aria-hidden"]).toBe("true");
    const children = svg.props.children as { type: string; props: Record<string, string> }[];
    expect(children[0]!.type).toBe("path");
    expect(children[0]!.props.d).toBe("m6 9 6 6 6-6");
    expect(warn).not.toHaveBeenCalled();
  });

  it("keeps the former names of renamed icons (lucide-static 1.74 renamed 42 of 1.45's)", () => {
    // Former names drawn by their new icon; none of them is in icon-nodes.json any more.
    const renamed: Record<string, string> = {
      "triangle-alert": "triangle-exclamation-point",
      "circle-alert": "circle-exclamation-point",
      music: "eighth-notes",
      bold: "letter-b",
      heading: "letter-h",
    };
    for (const [old, now] of Object.entries(renamed)) {
      expect(hasLucideIcon(old)).toBe(true);
      const a = LucideIcon({ name: old })!;
      const b = LucideIcon({ name: now })!;
      expect(a.props.class).toBe(`lucide lucide-${old}`);
      const drawing = (v: typeof a) =>
        (v.props.children as { type: string; props: Record<string, string> }[]).map((c) => [
          c.type,
          c.props,
        ]);
      expect(drawing(a).length).toBeGreaterThan(0);
      expect(drawing(a)).toEqual(drawing(b));
    }
    expect(lucideIconNames()).toContain("triangle-alert");
    expect(warn).not.toHaveBeenCalled();
  });

  it("returns nothing and warns once for unknown names", () => {
    expect(LucideIcon({ name: "no-such-icon" })).toBeNull();
    expect(LucideIcon({ name: "no-such-icon" })).toBeNull();
    expect(warn).toHaveBeenCalledTimes(1);
  });
});
