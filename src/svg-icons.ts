import fs from "fs";
import path from "path";
import { sanitizeSvg, type SanitizedSvg } from "./svg-sanitize";

/**
 * `svg:<path>` and `svg-mono:<path>`: an icon from an SVG file in the content folder, drawn inline
 * like a Lucide icon (see `svg-sanitize.ts` for what is kept of the file).
 */
export interface SvgIconRef {
  /** As written after the prefix, `/`-separated, relative to the content folder. */
  path: string;
  /** `svg-mono:` - every colour becomes `currentColor`. */
  mono: boolean;
}

/** Inline in every page, sometimes twice (rail strip and panel): a file larger than this is refused. */
export const MAX_SVG_BYTES = 50 * 1024;

export function svgIconRef(value: string | undefined): SvgIconRef | undefined {
  const m = value?.match(/^svg(-mono)?:(.*)$/i);
  if (!m) return undefined;
  return { path: m[2]!.trim(), mono: m[1] !== undefined };
}

export type SvgIconResult =
  (Extract<SanitizedSvg, { ok: true }> & { file: string }) | { ok: false; reason: string };

/**
 * The path checked and resolved inside `contentDir`: relative, without `.`/`..` segments, ending in
 * `.svg`, and, symlinks followed, still inside the content folder. A name not found as written is
 * looked for in the other Unicode normalisation too: a vault written on macOS can hold „Über.svg"
 * decomposed while the config spells it composed, and only some file systems treat the two alike.
 */
export function resolveSvgPath(
  contentDir: string,
  ref: string,
): { ok: true; file: string } | { ok: false; reason: string } {
  if (!ref) return { ok: false, reason: "no path after the prefix" };
  if (ref.includes("\\")) return { ok: false, reason: "use / in the path, not \\" };
  if (ref.startsWith("/") || /^[a-z]:/i.test(ref))
    return { ok: false, reason: "the path must be relative to the content folder" };
  const segments = ref.split("/").filter((s) => s !== "");
  if (segments.some((s) => s === "." || s === ".."))
    return { ok: false, reason: "the path may not contain . or .. segments" };
  if (!/\.svg$/i.test(ref)) return { ok: false, reason: "the file must end in .svg" };

  let base: string;
  try {
    base = fs.realpathSync(path.resolve(contentDir));
  } catch {
    return { ok: false, reason: `content folder ${contentDir} not found` };
  }
  for (const form of uniq([ref, ref.normalize("NFD"), ref.normalize("NFC")])) {
    const candidate = path.join(base, ...form.split("/").filter((s) => s !== ""));
    let real: string;
    try {
      real = fs.realpathSync(candidate);
    } catch {
      continue;
    }
    if (real !== base && !real.startsWith(base + path.sep))
      return { ok: false, reason: "the path leads out of the content folder" };
    return { ok: true, file: real };
  }
  return { ok: false, reason: "file not found" };
}

function uniq(values: string[]): string[] {
  return [...new Set(values)];
}

interface CacheEntry {
  mtimeMs: number;
  size: number;
  result: SvgIconResult;
}
const cache = new Map<string, CacheEntry>();

/** Read, checked and sanitised; read again only when the file's time or size changed. */
export function readSvgIcon(contentDir: string, ref: SvgIconRef): SvgIconResult {
  const resolved = resolveSvgPath(contentDir, ref.path);
  if (!resolved.ok) return resolved;
  let stat: fs.Stats;
  try {
    stat = fs.statSync(resolved.file);
  } catch {
    return { ok: false, reason: "file not readable" };
  }
  if (!stat.isFile()) return { ok: false, reason: "not a file" };
  if (stat.size > MAX_SVG_BYTES)
    return {
      ok: false,
      reason: `larger than ${MAX_SVG_BYTES / 1024} KB (${Math.ceil(stat.size / 1024)} KB)`,
    };
  const key = `${ref.mono ? "mono" : "svg"}|${resolved.file}`;
  const hit = cache.get(key);
  if (hit && hit.mtimeMs === stat.mtimeMs && hit.size === stat.size) return hit.result;

  let text: string;
  try {
    text = fs.readFileSync(resolved.file, "utf8");
  } catch {
    return { ok: false, reason: "file not readable" };
  }
  const sanitized = sanitizeSvg(text, path.basename(resolved.file), { mono: ref.mono });
  const result: SvgIconResult = sanitized.ok ? { ...sanitized, file: resolved.file } : sanitized;
  cache.set(key, { mtimeMs: stat.mtimeMs, size: stat.size, result });
  return result;
}

/** For tests. */
export function clearSvgIconCache(): void {
  cache.clear();
}
