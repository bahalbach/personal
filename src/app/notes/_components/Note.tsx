import { Octokit } from "octokit";
import RenderMarkdown from "./RenderMarkdown";
import Link from "next/link";
import { cache } from "react";
import { unstable_cache } from "next/cache";

export default function Note({
  content,
  active,
}: {
  content: FileMapMd;
  active: boolean;
}) {
  // console.log("remder note", path, active);
  // const link = <Link href={`/${path.join("/")}`}>{content.label}</Link>;
  if (!active) {
    // return link;
    return content.label;
  }
  console.log("TODO: use context");
  const text = "test test TODO";
  return <RenderMarkdown text={text} />;

  // const file = await unified()
  //   .use(remarkParse)
  //   .use(remarkFrontmatter)
  //   .use(remarkGfm)
  //   .use(remarkWikiLink, {
  //     pageResolver: (pageName: string) => {
  //       console.log(`link pageName: ${pageName}`);
  //       return [makeCanonical(pageName)];
  //     },
  //     hrefTemplate: (permalink: string) => {
  //       return `/${permalink}`;
  //     },
  //     aliasDivider: "|",
  //   })
  //   .use(remarkRehype)
  //   .use(rehypeStringify)
  //   .process(text);
  // const html = String(file);

  // return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
