import fs from "fs";
import path from "path";

/**
 * The Lucide table the plugin ships, as a compact JSON string: every icon of `icon-nodes.json`
 * with its nodes, and every former name as a string naming the icon it became.
 *
 * `icon-nodes.json` holds only the current names. When Lucide renames an icon it keeps the old
 * name as an alias, but only as a file in `icons/` (lucide-static 1.74.0: `triangle-alert` is now
 * `triangle-exclamation-point`, `music` is `eighth-notes`, 312 aliases in all). Taking the table
 * alone, `navIcon: lucide:triangle-alert` drew nothing after the update. An alias file has the
 * same drawing as its icon, so each one is matched by its drawing; one that matches no icon, or
 * more than one, stops the build instead of being left out.
 *
 * Used by the `virtual:lucide-nodes` loaders in `tsup.config.ts` and `vitest.config.ts`. The keys
 * come out in a fixed order (the table's, then the aliases sorted), so `dist/` is the same on
 * every machine.
 */
export function lucideTableJson(packageDir: string): string {
  const nodes = JSON.parse(
    fs.readFileSync(path.join(packageDir, "icon-nodes.json"), "utf8"),
  ) as Record<string, unknown>;
  const iconsDir = path.join(packageDir, "icons");
  const drawing = (name: string): string =>
    fs
      .readFileSync(path.join(iconsDir, `${name}.svg`), "utf8")
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/class="[^"]*"/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const byDrawing = new Map<string, string[]>();
  for (const name of Object.keys(nodes)) {
    if (!fs.existsSync(path.join(iconsDir, `${name}.svg`))) continue;
    const key = drawing(name);
    byDrawing.set(key, [...(byDrawing.get(key) ?? []), name]);
  }

  const table: Record<string, unknown> = { ...nodes };
  const aliases = fs
    .readdirSync(iconsDir)
    .filter((f) => f.endsWith(".svg"))
    .map((f) => f.slice(0, -4))
    .filter((name) => !Object.prototype.hasOwnProperty.call(nodes, name))
    .sort();
  for (const alias of aliases) {
    const targets = byDrawing.get(drawing(alias)) ?? [];
    if (targets.length !== 1) {
      throw new Error(
        `lucide-table: alias "${alias}" matches ${targets.length === 0 ? "no icon" : `several icons (${targets.join(", ")})`}`,
      );
    }
    table[alias] = targets[0];
  }
  return JSON.stringify(table);
}
