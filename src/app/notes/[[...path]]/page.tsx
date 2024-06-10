import { Suspense } from "react";
import PageContent from "./PageContent";
import { getNotes } from "../utils/getFileMap";
import { FileMapDir, FileMapItem } from "../types";

function generatePaths(fileMap: FileMapDir) {
  const paths: string[][] = [];
  const currentPath: string[] = [];
  const genFilePaths = (curFileMap: FileMapItem) => {
    currentPath.push(curFileMap.canonicalLabel);
    // slice from 1, because 'notes' is already in this route
    paths.push(currentPath.slice(1));
    if (curFileMap.type !== "markdown")
      curFileMap.children.forEach(genFilePaths);
    currentPath.pop();
  };
  genFilePaths(fileMap);
  return paths;
}

// Trying out this as a client component, comment out below
// non generated will be a 404
export const dynamicParams = process.env.NODE_ENV === "development";

export async function generateStaticParams() {
  if (process.env.NODE_ENV === "development") {
    return [];
  }
  const { fileMap } = await getNotes();
  const params = generatePaths(fileMap).map((path) => ({ path }));
  return params;
}

export default async function Page() {
  return (
    // <Suspense>
    <PageContent />
    // </Suspense>
  );
}
