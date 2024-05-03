import { Octokit } from "octokit";
import { cache } from "react";
import { unstable_cache } from "next/cache";

export const getGithubFileContent = unstable_cache(
  async (sha: string, label: string) => {
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
  },
  ["github-markdown-page"]
);
