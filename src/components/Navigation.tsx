import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types";
import { applyBreakpoints, resolveBreakpoints } from "../breakpoints";
import { i18n } from "../i18n";
import { resolveOptions } from "../options";
import { resolveScope } from "../scope";
import { type FileData, treeFromFiles } from "../tree";
import type { NavigationOptions } from "../types";
import { shortHash } from "../util/hash";
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
    const tree = treeFromFiles(files, opts);
    const scope = resolveScope(tree, slug, opts);
    if (!scope) return null;

    const ctx: RenderContext = {
      opts,
      id,
      slug,
      tree,
      scope,
      t: i18n(cfg?.locale),
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
