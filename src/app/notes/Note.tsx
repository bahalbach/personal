import { Octokit } from "octokit";
import RenderMarkdown from "./RenderMarkdown";
import Link from "next/link";
import { cache } from "react";
import { unstable_cache } from "next/cache";

const getGithubFileContent = unstable_cache(
  cache(async (sha: string, label: string) => {
    const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });
    const res = await octokit.rest.git.getBlob({
      owner: "bahalbach",
      repo: "notes",
      file_sha: sha,
      mediaType: {
        format: "raw",
      },
    });
    console.log(`fetch ${label}`);

    // The type of res is incorrect, it's not taking in to
    // account mediaType.format=raw
    const text = res.data as unknown as string;
    return text;
  }),
  ["github-markdown-page"]
);
export default async function Note({
  content,
  active,
  path,
}: {
  content: FileMapMd;
  active: boolean;
  path: string[];
}) {
  const link = <Link href={`/${path.join("/")}`}>{content.label}</Link>;
  if (!active) {
    return link;
  }
  const text = await getGithubFileContent(content.sha, content.label);

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
