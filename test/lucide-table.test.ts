import fs from "fs";
import os from "os";
import path from "path";
import { afterEach, describe, expect, it } from "vitest";
import { lucideTableJson } from "../src/build/lucide-table";

const svg = (name: string, d: string) =>
  `<!-- @license lucide-static -->\n<svg class="lucide lucide-${name}" viewBox="0 0 24 24">\n  <path d="${d}" />\n</svg>\n`;

let dir: string | undefined;
afterEach(() => {
  if (dir) fs.rmSync(dir, { recursive: true, force: true });
  dir = undefined;
});

function pkg(nodes: Record<string, unknown>, files: Record<string, string>): string {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), "lucide-table-"));
  fs.mkdirSync(path.join(dir, "icons"));
  fs.writeFileSync(path.join(dir, "icon-nodes.json"), JSON.stringify(nodes));
  for (const [name, d] of Object.entries(files))
    fs.writeFileSync(path.join(dir, "icons", `${name}.svg`), svg(name, d));
  return dir;
}

describe("lucideTableJson", () => {
  it("adds former names as pointers, sorted after the icons", () => {
    const p = pkg(
      { b: [["path", { d: "M1" }]], a: [["path", { d: "M2" }]] },
      { a: "M2", b: "M1", "z-old": "M1", "c-old": "M2" },
    );
    const table = JSON.parse(lucideTableJson(p)) as Record<string, unknown>;
    expect(Object.keys(table)).toEqual(["b", "a", "c-old", "z-old"]);
    expect(table["z-old"]).toBe("b");
    expect(table["c-old"]).toBe("a");
  });

  it("stops the build for an alias that matches no icon or several", () => {
    expect(() => lucideTableJson(pkg({ a: [] }, { a: "M1", lost: "M9" }))).toThrow(/no icon/);
    fs.rmSync(dir!, { recursive: true, force: true });
    expect(() => lucideTableJson(pkg({ a: [], b: [] }, { a: "M1", b: "M1", twin: "M1" }))).toThrow(
      /several icons \(a, b\)/,
    );
  });
});
