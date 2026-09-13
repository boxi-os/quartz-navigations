import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vitest/config";

const LUCIDE_NODES = path.resolve(__dirname, "node_modules/lucide-static/icon-nodes.json");

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
      const text = JSON.stringify(JSON.parse(fs.readFileSync(LUCIDE_NODES, "utf8")));
      return { code: `export default ${JSON.stringify(text)};` };
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
