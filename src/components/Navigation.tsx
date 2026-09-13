import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types";
import { applyBreakpoints, resolveBreakpoints } from "../breakpoints";
import { i18n } from "../i18n";
import {
  languageDirectory,
  languageIndex,
  languageOfPage,
  localeFor,
  placementIn,
} from "../language";
import { resolveOptions } from "../options";
import { resolveScope } from "../scope";
import { type FileData, treeFromFiles } from "../tree";
import type { NavigationOptions } from "../types";
import { shortHash } from "../util/hash";
import { warnOnce } from "../util/warn";
import { renderNavigation, renderPager, renderSelect, type RenderContext } from "./render";
import style from "./styles/navigations.scss";
// @ts-expect-error the inline-script loader turns this into a string; see tsup.config.ts
import script from "../scripts/navigations.inline";

export default ((userOpts?: NavigationOptions) => {
  const opts = resolveOptions(userOpts);
  // Deterministic across builds so localStorage keys and element ids stay stable.
  const id = opts.id || `nav-${shortHash(JSON.stringify({ ...opts, id: "" }))}`;
  const breakpoints = resolveBreakpoints(opts.breakpoints);
  const css = applyBreakpoints(style, breakpoints);

  const Navigation: QuartzComponent = (props: QuartzComponentProps) => {
    const { fileData, allFiles, displayClass, cfg } = props;
    const slug = typeof fileData?.slug === "string" ? fileData.slug : "";
    if (!slug) return null;

    const files = (Array.isArray(allFiles) ? allFiles : []) as FileData[];
    const siteLocale = typeof cfg?.locale === "string" ? cfg.locale : undefined;
    const langs = languageIndex(files);
    const page = (fileData ?? {}) as FileData;
    const auto = opts.language === "auto";
    const all = opts.language === "all";
    const fixed =
      auto || all
        ? undefined
        : (langs.languages.find((l) => l === opts.language) ??
          langs.languages.find((l) => l === opts.language.split(/[-_]/)[0]));
    if (!auto && !all && !fixed && langs.languages.length > 0) {
      warnOnce(
        `language-unknown:${opts.language}`,
        `\`language: ${opts.language}\` matches no page language (${langs.languages.join(", ")}).`,
      );
    }
    // `rootPath: en` names a language folder rather than a language-neutral path, as in
    // configurations written before the language mode: it shows that language's tree from the
    // folder's path there, and only on the pages inside the folder.
    const langDir = all ? undefined : languageDirectory(langs, opts.rootPath);
    let scopeOpts = opts;
    let language: string | undefined;
    if (langDir && (auto || fixed === langDir.lang)) {
      if (opts.hideOutsideRoot && !slug.startsWith(`${opts.rootPath}/`)) return null;
      scopeOpts = { ...opts, rootPath: langDir.path, hideOutsideRoot: false };
      language = langDir.lang;
    } else if (!all) {
      language = auto ? languageOfPage(page, langs, siteLocale) : (fixed ?? opts.language);
    }
    const locale = language ? localeFor(language, siteLocale) : siteLocale;
    const tree = treeFromFiles(files, opts, locale, language);
    const key = language ? placementIn(page, langs, language)?.key : undefined;
    const scope = resolveScope(tree, slug, scopeOpts, key ?? slug);
    if (!scope) return null;

    const ctx: RenderContext = {
      opts: scopeOpts,
      id,
      slug,
      tree,
      scope,
      t: i18n(locale),
      displayClass,
      mobileBreakpoint: breakpoints.mobile,
    };
    switch (opts.variant) {
      case "select":
        return renderSelect(ctx);
      case "pager":
        return renderPager(ctx);
      default:
        return renderNavigation(ctx);
    }
  };

  Navigation.css = css;
  Navigation.afterDOMLoaded = script as string;
  return Navigation;
}) satisfies QuartzComponentConstructor<NavigationOptions>;
