type FileMapBase = {
  label: string;
  canonicalLabel: string;
  // lastUpdated: Date;
};
type FileMapMd = FileMapBase & {
  type: "markdown";
  url: string;
  sha: string;
};
type FileMapDir = FileMapBase & {
  type: "directory";
  children: Map<string, FileMapMd | FileMapDir>;
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
