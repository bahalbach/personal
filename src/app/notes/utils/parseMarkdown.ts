import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import wikiLinkPlugin from "remark-wiki-link";
import { resolveInternalLink } from "../utils/resolveInternalLink";

import { internalLinkToken } from "../constants";

export function parseMarkdown(markdown: string, pageMap?: PathMap) {
  return unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(wikiLinkPlugin, {
      pageResolver: (pageName: string) => {
        if (!pageMap) return pageName;
        const linkOptions = resolveInternalLink(pageMap, pageName);
        // console.log(`link pageName: ${pageName}, options: ${linkOptions}`);
        // return [makeCanonical(pageName)];
        // return linkOptions;
        return [linkOptions.join("|")];
      },
      hrefTemplate: (permalink: string) => {
        if (!pageMap) return permalink;
        return `${internalLinkToken}${permalink}`;
      },
      // hrefTemplate: (permalink: string) => {
      //   return `/${permalink}`;
      // },
      aliasDivider: "|",
    })
    .parse(markdown);
}
