// need a catch all route
// get data from github

import NoteTree from "../NoteTree";
import { getFileMap } from "../getFileMap";
import { makeCanonical } from "../makeCanonical";

export default async function Page({
  params: { path },
}: {
  params: { path?: string[] };
}) {
  const fileMap = await getFileMap();
  let currentFileMap: FileMapItem = fileMap;
  const validPath: string[] = [fileMap.canonicalLabel];
  const validPathLabels: string[] = [fileMap.label];
  let invalidPath;
  let label;
  if (path) {
    for (let pathIndex = 0; pathIndex < path.length; pathIndex++) {
      label = makeCanonical(path[pathIndex]);
      if (
        !(currentFileMap.type === "directory") ||
        !currentFileMap.children.has(label)
      ) {
        invalidPath = path.slice(pathIndex);
        break;
      }
      validPath.push(label);
      currentFileMap = currentFileMap.children.get(label) as FileMapItem;
      validPathLabels.push(currentFileMap.label);
    }
  }

  const nav = (
    <nav>
      <ul className="flex gap-4 p-4">
        {validPath.map((value, pathIndex) => (
          <li key={value}>
            <a href={`/${validPath.slice(0, pathIndex + 1).join("/")}`}>
              {validPathLabels[pathIndex]}
            </a>
          </li>
        ))}
        {invalidPath?.map((value) => (
          <li className="text-red-600" key={value}>
            {value}
          </li>
        ))}
      </ul>
    </nav>
  );
  const invalidPathNotice = invalidPath ? (
    <div className="p-4">The path {invalidPath.join("/")} is not valid</div>
  ) : null;
  const noteTree = (
    <NoteTree active={true} tree={currentFileMap} path={validPath} />
  );
  return (
    <div className="p-4">
      {nav}
      {invalidPathNotice}
      {noteTree}
    </div>
  );
}
