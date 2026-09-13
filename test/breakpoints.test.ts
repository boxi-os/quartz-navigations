import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  applyBreakpoints,
  parseBreakpoints,
  readProjectBreakpoints,
  resolveBreakpoints,
} from "../src/breakpoints";
import { resetWarnings } from "../src/util/warn";

const VARIABLES = `@use "sass:map";
$breakpoints: (
  mobile: 640px,
  desktop: 1100px,
);
$mobile: "(max-width: #{map.get($breakpoints, mobile)})";
`;

let dir: string;
let warn: ReturnType<typeof vi.spyOn>;
beforeEach(() => {
  resetWarnings();
  warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  dir = fs.mkdtempSync(path.join(os.tmpdir(), "navigations-"));
});
afterEach(() => {
  warn.mockRestore();
  fs.rmSync(dir, { recursive: true, force: true });
});

describe("parseBreakpoints", () => {
  it("reads the sass map", () => {
    expect(parseBreakpoints(VARIABLES)).toEqual({ mobile: "640px", desktop: "1100px" });
    expect(parseBreakpoints("$breakpoints: (mobile: 50rem, desktop: 80rem)")).toEqual({
      mobile: "50rem",
      desktop: "80rem",
    });
    expect(parseBreakpoints("nothing here")).toEqual({});
    expect(parseBreakpoints("$breakpoints: (mobile: calc(1px + 2px))")).toEqual({});
  });
});

describe("resolveBreakpoints", () => {
  it("uses the site's variables.scss when present", () => {
    fs.mkdirSync(path.join(dir, "quartz", "styles"), { recursive: true });
    fs.writeFileSync(path.join(dir, "quartz", "styles", "variables.scss"), VARIABLES);
    expect(readProjectBreakpoints(dir)).toEqual({ mobile: "640px", desktop: "1100px" });
    expect(resolveBreakpoints(undefined, dir)).toEqual({ mobile: "640px", desktop: "1100px" });
    expect(warn).not.toHaveBeenCalled();
  });

  it("lets options override single values", () => {
    fs.mkdirSync(path.join(dir, "quartz", "styles"), { recursive: true });
    fs.writeFileSync(path.join(dir, "quartz", "styles", "variables.scss"), VARIABLES);
    expect(resolveBreakpoints({ mobile: "700px" }, dir)).toEqual({
      mobile: "700px",
      desktop: "1100px",
    });
    expect(resolveBreakpoints({ mobile: 720 as never, desktop: "bogus" }, dir)).toEqual({
      mobile: "720px",
      desktop: "1100px",
    });
  });

  it("falls back to Quartz's defaults with one warning when the file is missing", () => {
    expect(resolveBreakpoints(undefined, dir)).toEqual({ mobile: "800px", desktop: "1200px" });
    resolveBreakpoints(undefined, dir);
    expect(warn).toHaveBeenCalledTimes(1);
  });
});

describe("applyBreakpoints", () => {
  it("replaces every placeholder", () => {
    const css =
      "@media (max-width: __NAV_BP_MOBILE__){a{}} @media (min-width: __NAV_BP_MOBILE__){b{}} @media (min-width: __NAV_BP_DESKTOP__){c{}}";
    expect(applyBreakpoints(css, { mobile: "640px", desktop: "1100px" })).toBe(
      "@media (max-width: 640px){a{}} @media (min-width: 640px){b{}} @media (min-width: 1100px){c{}}",
    );
  });
});
