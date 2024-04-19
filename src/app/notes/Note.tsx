import { Octokit } from "octokit";
import RenderMarkdown from "./RenderMarkdown";

export default async function Note({
  content,
  active,
  path,
}: {
  content: FileMapMd;
  active: boolean;
  path: string[];
}) {
  const link = <a href={`/${path.join("/")}`}>{content.label}</a>;
  if (!active) {
    return link;
  }
  const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });
  const res = await octokit.rest.git.getBlob({
    owner: "bahalbach",
    repo: "notes",
    file_sha: content.sha,
    mediaType: {
      format: "raw",
    },
  });
  console.log(`fetch ${content.label}`);
  // The type of res is incorrect, it's not taking in to
  // account mediaType.format=raw
  const text = res.data as unknown as string;

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
