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

function generateFileMap(
  tree: { path?: string; type?: string; url?: string; sha?: string }[]
) {
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

function addItem(dirMap: PathMap, label: string, item: PathItem) {
  if (!dirMap.children.has(label)) {
    dirMap.children.set(label, [item]);
  } else {
    dirMap.children.get(label)?.push(item);
  }
}

function createPageMap(tree: FileMapDir) {
  const allLinks: string[] = [];
  const pageMap: PathMap = {
    type: "directory",
    fullPath: tree.canonicalLabel,
    children: new Map(),
  };
  const currentPath: string[] = [tree.canonicalLabel];
  const currentDirStack = [pageMap];
  const addToPageMap = (treeItem: FileMapItem) => {
    const { type, canonicalLabel } = treeItem;
    currentPath.push(canonicalLabel);
    const fullPath = `${currentPath.slice().join("/")}`;
    allLinks.push(fullPath);

    const newItem: PathItem =
      type === "markdown"
        ? {
            type: "markdown",
            fullPath,
          }
        : {
            type: "directory",
            fullPath,
            children: new Map(),
          };
    addItem(pageMap, canonicalLabel, newItem);

    const currentDir = currentDirStack.at(-1)!;
    pageMap !== currentDir && addItem(currentDir, canonicalLabel, newItem);

    if (type === "directory") {
      currentDirStack.push(newItem as PathMap);
      treeItem.children.forEach(addToPageMap);
      currentDirStack.pop();
    }
    currentPath.pop();
  };
  tree.children.forEach(addToPageMap);

  return { pageMap, allLinks };
}

/**
 * @typedef {Object} NoteInfo
 * @property {FileMapDir} fileMap - the root filemap
 * @property {PathMap} pageMap - all possible paths
 * @property {string[]} allLinks - full path for all markdown files
 */

/**
 *
 * @returns {Promise<NoteInfo>} the note info
 */
export async function getNotes() {
  const tree = await fetchGithubTree();
  /**
   * the root filempa
   */
  const fileMap = generateFileMap(tree);
  const { pageMap, allLinks } = createPageMap(fileMap);

  return { fileMap, pageMap, allLinks };
}

export function resolveInternalLink(pageMap: PathMap, internalLink: string) {
  const linkParts = `${internalLink}.md`.split("/").map(makeCanonical);
  console.log(pageMap, internalLink, linkParts);

  let currentItems: PathItem[] = [pageMap];

  linkParts.forEach((segmant) => {
    const newItems: PathItem[] = [];
    currentItems.forEach((pathItem) => {
      if (pathItem.type === "directory" && pathItem.children.has(segmant)) {
        console.log("segmant", segmant, pathItem.children.get(segmant));
        newItems.push(...pathItem.children.get(segmant)!);
      }
    });
    currentItems = newItems;
  });
  return currentItems.map((item) => item.fullPath);
}
