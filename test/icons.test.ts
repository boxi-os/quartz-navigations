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
    expect(lucideIconNames().length).toBeGreaterThan(1500);
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

  it("returns nothing and warns once for unknown names", () => {
    expect(LucideIcon({ name: "no-such-icon" })).toBeNull();
    expect(LucideIcon({ name: "no-such-icon" })).toBeNull();
    expect(warn).toHaveBeenCalledTimes(1);
  });
});
