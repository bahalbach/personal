import { FileMapDir, FileMapItem } from "../types";

export function processNotePath(
  path: string[] | undefined,
  fileMap: FileMapDir
) {
  let currentFileMap: FileMapItem = fileMap;
  const validPath: string[] = [fileMap.canonicalLabel];
  const validPathLabels: string[] = [fileMap.label];
  let invalidPath;
  let label;

  if (path) {
    for (let pathIndex = 0; pathIndex < path.length; pathIndex++) {
      label = path[pathIndex];
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

  return {
    currentFileMap,
    validPath,
    validPathLabels,
    invalidPath,
  };
}
