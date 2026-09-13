import type { NavNode, ResolvedOptions } from "./types";

type Comparator = (a: NavNode, b: NavNode) => number;

/**
 * Missing values sort last regardless of direction, so `sort: date` with `desc` still lists
 * undated pages after the dated ones.
 */
function compareOptional(x: number | undefined, y: number | undefined, dir: number): number {
  if (x === undefined && y === undefined) return 0;
  if (x === undefined) return 1;
  if (y === undefined) return -1;
  return (x - y) * dir;
}

export function compareNodes(opts: ResolvedOptions): Comparator {
  const dir = opts.sortDirection === "desc" ? -1 : 1;
  const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });
  const byTitle: Comparator = (a, b) => collator.compare(a.title, b.title) * dir;
  const numeric =
    (get: (n: NavNode) => number | undefined): Comparator =>
    (a, b) =>
      compareOptional(get(a), get(b), dir);

  let chain: Comparator[];
  switch (opts.sort) {
    case "alphabetical":
      chain = [byTitle];
      break;
    case "date":
      chain = [numeric((n) => n.date?.getTime()), byTitle];
      break;
    default:
      chain = [
        numeric((n) => n.listOrder),
        numeric((n) => n.order),
        numeric((n) => n.prefixOrder),
        byTitle,
      ];
  }

  const foldersFirst: Comparator = (a, b) => {
    if (opts.foldersFirst === "mixed" || a.kind === b.kind) return 0;
    const folderFirst = a.kind === "folder" ? -1 : 1;
    return opts.foldersFirst === "first" ? folderFirst : -folderFirst;
  };

  return (a, b) => {
    const byKind = foldersFirst(a, b);
    if (byKind !== 0) return byKind;
    for (const cmp of chain) {
      const r = cmp(a, b);
      if (r !== 0) return r;
    }
    return 0;
  };
}
