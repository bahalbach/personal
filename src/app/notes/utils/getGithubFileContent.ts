import { Octokit } from "octokit";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { local_cache } from "./local_cache";

export const getGithubFileContent = cache(
  unstable_cache(
    async (sha: string, label: string) => {
      async function getter() {
        const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });

        const res = await octokit.rest.git.getBlob({
          owner: "bahalbach",
          repo: "notes",
          file_sha: sha,
          mediaType: {
            format: "raw",
          },
        });
        console.log(`fetch ${label}, sha ${sha}`);
        // The type of res is incorrect, it's not taking in to
        // account mediaType.format=raw
        const text = res.data as unknown as string;
        return text;
      }

      return local_cache(`${label}-${sha}`, getter);
    },
    ["github-markdown-page"]
  )
);
