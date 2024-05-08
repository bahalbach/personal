// need a catch all route
// get data from github

import { Link } from "next-view-transitions";

import { getNotes } from "../utils/getFileMap";
import { makeCanonical } from "../utils/makeCanonical";
import { processNotePath } from "../utils/processNotePath";
import TopSection from "../_components/TopSection";

// non generated will be a 404
// export const dynamicParams = false;
export async function generateStaticParams() {
  const { fileMap } = await getNotes();
  // const stack = [fileMap];
  const params: { path: string[] }[] = [{ path: [] }];
  const currentPath: string[] = [];
  if (process.env.NODE_ENV !== "development") {
    const genFilePaths = (curFileMap: FileMapItem) => {
      // if (curFileMap.type === "markdown") return;
      currentPath.push(curFileMap.canonicalLabel);
      params.push({ path: currentPath.slice() });
      if (curFileMap.type !== "markdown")
        curFileMap.children.forEach(genFilePaths);
      currentPath.pop();
    };
    genFilePaths(fileMap);

    console.log("gened params", params.length, params);
  }
  return params;
}

export default async function Page({
  params: { path },
}: {
  params: { path?: string[] };
}) {
  console.log("render notes page", path);
  const { fileMap } = await getNotes();

  const { currentFileMap, validPath, validPathLabels, invalidPath } =
    processNotePath(path, fileMap);

  // TODO: have nav links to go back to linking entities, for
  // when there are internal links that aren't parent-child
  const nav = (
    <nav>
      <ul className="flex gap-4 p-4">
        {validPath.map((value, pathIndex) => (
          <li key={value}>
            <Link href={`/${validPath.slice(0, pathIndex + 1).join("/")}`}>
              {validPathLabels[pathIndex]}
            </Link>
          </li>
        ))}
        {invalidPath?.map((value) => (
          <li className="text-error" key={value}>
            {value}
          </li>
        ))}
      </ul>
    </nav>
  );
  const invalidPathNotice = invalidPath ? (
    <div className="p-4">The path {invalidPath.join("/")} is not valid</div>
  ) : null;
  // const noteTree = <NoteTree active={true} tree={currentFileMap} />;
  const topSection = <TopSection tree={currentFileMap} path={invalidPath} />;
  return (
    <div className="p-4">
      {nav}
      {invalidPathNotice}
      <article className="markdown-body">{topSection}</article>
    </div>
  );
}
