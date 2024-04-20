import { Octokit } from "octokit";
import { makeCanonical } from "./makeCanonical";
import { cache } from "react";
import { unstable_cache } from "next/cache";

// function CreateFileMapDir(label, canonicalLabel);

const fetchGithubTree = unstable_cache(async () => {
  const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });
  const res = await octokit.request(
    "GET /repos/{owner}/{repo}/git/trees/{tree_sha}",
    {
      owner: "bahalbach",
      repo: "notes",
      tree_sha: "main",
      recursive: "true",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
  console.log("fetch tree");
  await fetch("http://127.0.0.1:3000/api/test");

  const tree = res.data.tree;
  return tree;
});

export async function getFileMap() {
  const tree = await fetchGithubTree();
  const fileMap: FileMapDir = {
    type: "directory",
    label: "Notes",
    canonicalLabel: "notes",
    children: new Map(),
  };
  treeLoop: for (let index = 0; index < tree.length; index++) {
    const { path, type, url, sha } = tree[index];
    if (!path) continue;
    const isDir = type === "tree";
    const isMd = type === "blob" && path.endsWith(".md");
    if (!(isDir || isMd)) continue;
    if (isMd && !url) continue;

    const parts = path.split("/");
    let currentDir: FileMapDir = fileMap;
    for (let pathIndex = 0; pathIndex < parts.length - 1; pathIndex++) {
      const part = makeCanonical(parts[pathIndex]);
      const childItem = currentDir.children.get(part);
      if (!(childItem?.type === "directory")) {
        console.error("path failure at", part, fileMap, path);
        continue treeLoop;
      }
      currentDir = childItem;
    }
    const finalPart = parts.at(-1) as string;
    const canonicalLabel = makeCanonical(finalPart);
    let newChild: FileMapItem;
    if (isDir) {
      newChild = {
        type: "directory",
        label: finalPart,
        canonicalLabel,
        children: new Map(),
      };
    }
    if (isMd) {
      newChild = {
        type: "markdown",
        label: finalPart,
        canonicalLabel,
        // @ts-ignore
        url,
        // @ts-ignore
        sha,
      };
    }

    // @ts-ignore
    currentDir.children.set(canonicalLabel, newChild);
  }

  return fileMap;
}
