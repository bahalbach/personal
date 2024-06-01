import * as prod from "react/jsx-runtime";
import { unified } from "unified";

import type { Root, RootContent } from "mdast";
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react";
import CustomLink from "../_components/CustomLink";

const production = {
  Fragment: prod.Fragment,
  jsx: prod.jsx,
  jsxs: prod.jsxs,
  components: {
    a: CustomLink,
  },
};
export function mdToReact(content: RootContent[]) {
  const tree: Root = {
    type: "root",
    children: content,
  };
  const rhast = unified().use(remarkRehype).runSync(tree);
  // @ts-ignore
  const html = unified().use(rehypeReact, production).stringify(rhast);
  return html;
}

export async function RenderMdastToHtml(mdast: Root) {
  const rhast = unified().use(remarkRehype).runSync(mdast);
  // @ts-ignore
  const html = unified().use(rehypeReact, production).stringify(rhast);

  const topLevelText = (
    <div
      className="markdown-content p-2 focus:bg-black focus-within:outline focus-within:outline-2 focus-within:outline-green-400"
      tabIndex={0}
    >
      {html}
    </div>
  );
  return topLevelText;
}
