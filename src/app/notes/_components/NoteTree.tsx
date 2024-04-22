import Link from "next/link";
import Note from "./Note";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import wikiLinkPlugin from "remark-wiki-link";
import { makeCanonical } from "../utils/makeCanonical";
import { getNotes, resolveInternalLink } from "../utils/getFileMap";
import { getGithubFileContent } from "../utils/getGithubFileContent";

import type { Heading, Parent, RootContent } from "mdast";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

export default async function NoteTree({
  active,
  tree,
  path,
}: {
  active: boolean;
  tree: FileMapItem;
  path: string[];
}) {
  // console.log("render noteTree", path, active);
  const { pageMap } = await getNotes();
  if (tree.type === "markdown") {
    return <Note active={active} content={tree} path={path} />;
  }
  const { type, label, canonicalLabel, children } = tree;

  const link = <Link href={`/${path.join("/")}`}>{label}</Link>;

  // TODO: inactive should be something more...
  if (!active) {
    return link;
  }

  let topLevelText = null;
  const topLevelHeadings = [];

  const topLevelContent = (children.get("index.md") ??
    children.get(`${label}.md`) ??
    children.get(`${label.toLowerCase()}.md`)) as FileMapMd | undefined;
  if (topLevelContent) {
    const text = await getGithubFileContent(
      topLevelContent.sha,
      topLevelContent.label
    );
    const mdast = unified()
      .use(remarkParse)
      .use(remarkFrontmatter)
      .use(remarkGfm)
      // .use(wikiLinkPlugin, {
      //   pageResolver: (pageName: string) => {
      //     const linkOptions = resolveInternalLink(pageMap, pageName);
      //     console.log(`link pageName: ${pageName}, options: ${linkOptions}`);
      //     // return [makeCanonical(pageName)];
      //     return linkOptions;
      //   },
      //   hrefTemplate: (permalink: string) => {
      //     return `/${permalink}`;
      //   },
      //   aliasDivider: "|",
      // })
      .parse(text);

    const startContent: RootContent[] = [];
    type ContentGroup = {
      heading?: Heading;
      content: RootContent[];
    };
    const contentGroups: ContentGroup[] = [
      {
        content: startContent,
      },
    ];
    for (let index = 0; index < mdast.children.length; index++) {
      const node = mdast.children[index];
      if (node.type === "heading" && node.depth == 2) {
        contentGroups.push({ heading: node, content: [] });
      } else {
        contentGroups.at(-1)?.content.push(node);
      }
    }

    mdast.children = startContent;

    // startContent
    const rhast = await unified().use(remarkRehype).run(mdast);
    const html = unified().use(rehypeStringify).stringify(rhast);

    topLevelText = (
      <div
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    );
    console.dir(mdast);
  }

  // const f = await mdProcessor.process(contentMd);

  const treeNodes = [];

  for (let [sublabel, node] of children) {
    const nextPath = [...path, sublabel];
    treeNodes.push(
      <li key={sublabel}>
        <NoteTree active={false} tree={node} path={nextPath} />
      </li>
    );
  }
  return (
    <div>
      <h2>{link}</h2>
      {topLevelText}
      <ul className="pl-4">{treeNodes}</ul>
    </div>
  );
}
