/// <reference path="../node_modules/@quartz-community/types/globals.d.ts" />

declare module "*.scss" {
  const content: string;
  export default content;
}

declare module "*.inline.ts" {
  const content: string;
  export default content;
}

/** Lucide's icon table with the former names as a compact JSON string; see `src/build/lucide-table.ts`. */
declare module "virtual:lucide-nodes" {
  const content: string;
  export default content;
}
