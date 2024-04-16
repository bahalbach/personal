import { Octokit } from "octokit";
import Markdoc from "@markdoc/markdoc";

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

  const ast = Markdoc.parse(text);
  const markdown = Markdoc.transform(ast);
  const html = Markdoc.renderers.html(markdown);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
