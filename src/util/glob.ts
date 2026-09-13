/**
 * Minimal glob support for `include` / `exclude`: `**` matches across segments, `*` within one
 * segment, `?` one character. Patterns are anchored to the whole slug.
 */
export function globToRegExp(glob: string): RegExp {
  let re = "";
  const g = glob.trim().replace(/^\/+|\/+$/g, "");
  for (let i = 0; i < g.length; i++) {
    const c = g[i]!;
    if (c === "*") {
      if (g[i + 1] === "*") {
        re += ".*";
        i++;
      } else {
        re += "[^/]*";
      }
    } else if (c === "?") {
      re += "[^/]";
    } else {
      re += /[.+^${}()|[\]\\]/.test(c) ? `\\${c}` : c;
    }
  }
  return new RegExp(`^${re}$`);
}

/**
 * Tests the slug itself, its simplified form (`docs/index` → `docs`) and every folder prefix,
 * so that `docs` matches the whole subtree and `docs/**` matches everything below it.
 */
export function matchesAny(patterns: RegExp[], slug: string): boolean {
  if (patterns.length === 0) return false;
  const candidates = new Set<string>([slug]);
  const simplified = slug === "index" ? "" : slug.replace(/\/index$/, "");
  candidates.add(simplified);
  const segments = simplified.split("/").filter((s) => s.length > 0);
  for (let i = 1; i < segments.length; i++) {
    candidates.add(segments.slice(0, i).join("/"));
  }
  for (const c of candidates) {
    for (const p of patterns) {
      if (p.test(c)) return true;
    }
  }
  return false;
}
