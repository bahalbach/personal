type FileMapMd = {
  type: "markdown";
  label: string;
  canonicalLabel: string;
  url: string;
};
type FileMapDir = {
  type: "directory";
  label: string;
  canonicalLabel: string;
  children: Map<string, FileMapMd | FileMapDir>;
};
type FileMapItem = FileMapMd | FileMapDir;

type FileMap = string | { [key: string]: FileMap };
type BaseFileMap = { [key: string]: FileMap };
