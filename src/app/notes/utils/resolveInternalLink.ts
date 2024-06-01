import { makeCanonical } from "./makeCanonical";

export function resolveInternalLink(pageMap: PathMap, internalLink: string) {
  const linkParts = internalLink.split("/").map(makeCanonical);
  // console.log(pageMap, internalLink, linkParts);

  let currentItems: PathItem[] = [pageMap];

  linkParts.forEach((segmant) => {
    const newItems: PathItem[] = [];
    currentItems.forEach((pathItem) => {
      if (pathItem.type === "directory" && pathItem.children.has(segmant)) {
        // console.log("segmant", segmant, pathItem.children.get(segmant));
        newItems.push(...pathItem.children.get(segmant)!);
      }
    });
    currentItems = newItems;
  });
  return currentItems.map((item) => item.fullPath);
}
