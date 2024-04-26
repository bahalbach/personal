type FileMapBase = {
  label: string;
  canonicalLabel: string;
  // lastUpdated: Date;
  path: string[];
};
type FileMapMd = FileMapBase & {
  type: "markdown";
  content: string;
};
type FileMapDir = FileMapBase & {
  type: "directory";
  children: Map<string, FileMapMd | FileMapDir>;
  content?: string;
};
type FileMapItem = FileMapMd | FileMapDir;

type PathItem = {
  fullPath: string;
} & (
  | {
      type: "markdown";
    }
  | {
      type: "directory";
      children: Map<string, PathItem[]>;
    }
);
type PathMap = {
  type: "directory";
  fullPath: string;
  children: Map<string, PathItem[]>;
};

type FileTreeContextValue = {
  fileMap: FileMapDir;
  pageMap: PathMap;
  allLinks: string[];
};
