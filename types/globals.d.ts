/// <reference path="../node_modules/@quartz-community/types/globals.d.ts" />

declare module "*.scss" {
  const content: string;
  export default content;
}

declare module "*.inline.ts" {
  const content: string;
  export default content;
}

/** Lucide's `icon-nodes.json` as a compact JSON string; see `tsup.config.ts`. */
declare module "virtual:lucide-nodes" {
  const content: string;
  export default content;
}
