import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vitest/config";
import { lucideTableJson } from "./src/build/lucide-table";

const LUCIDE_PACKAGE = path.resolve(__dirname, "node_modules/lucide-static");

/**
 * Mirrors the tsup loaders: `.inline.ts` and `.scss` imports resolve to strings in the
 * build, so tests must see strings too instead of executing browser code in Node; the
 * virtual Lucide module resolves to the compact JSON string.
 */
const stringImports: Plugin = {
  name: "string-imports",
  enforce: "pre",
  resolveId(id) {
    return id === "virtual:lucide-nodes" ? "\0virtual:lucide-nodes" : null;
  },
  load(id) {
    if (id === "\0virtual:lucide-nodes") {
      return { code: `export default ${JSON.stringify(lucideTableJson(LUCIDE_PACKAGE))};` };
    }
    if (/\.inline\.ts$/.test(id) || /\.scss$/.test(id)) {
      return { code: `export default ${JSON.stringify(fs.readFileSync(id, "utf8"))};` };
    }
    return null;
  },
};

export default defineConfig({
  plugins: [stringImports],
  css: { preprocessorOptions: { scss: { api: "modern-compiler" } } },
  test: {
    environment: "node",
    include: ["test/**/*.test.ts"],
    reporters: ["default"],
  },
});
