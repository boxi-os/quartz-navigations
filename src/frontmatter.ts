export type Frontmatter = Record<string, unknown>;

/** Narrows `fileData.frontmatter`, which Quartz types as an open record. */
export function frontmatterOf(value: unknown): Frontmatter | undefined {
  return value !== null && typeof value === "object" ? (value as Frontmatter) : undefined;
}

export function readString(fm: Frontmatter | undefined, key: string): string | undefined {
  const v = fm?.[key];
  if (typeof v === "string") {
    const s = v.trim();
    return s.length > 0 ? s : undefined;
  }
  if (typeof v === "number") return String(v);
  return undefined;
}

/** Accepts numbers and numeric strings, as YAML authors write both. */
export function readNumber(fm: Frontmatter | undefined, key: string): number | undefined {
  const v = fm?.[key];
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim() !== "") {
    const n = Number(v);
    if (Number.isFinite(n)) return n;
  }
  return undefined;
}

export function readBoolean(fm: Frontmatter | undefined, key: string): boolean | undefined {
  const v = fm?.[key];
  if (typeof v === "boolean") return v;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    if (s === "true" || s === "yes") return true;
    if (s === "false" || s === "no") return false;
  }
  return undefined;
}
