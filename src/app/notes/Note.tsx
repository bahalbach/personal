import { Octokit } from "octokit";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

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

  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(text);

  return <div dangerouslySetInnerHTML={{ __html: String(file) }} />;
}
