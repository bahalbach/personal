import type { RootContent } from "mdast";

type FileMapBase = {
  label: string;
  canonicalLabel: string;
  // lastUpdated: Date;
  // path: string[];
  fullpath: string;
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

/**
 * grouped content for all content following this header
 * but before the next this level header
 */
type ContentGroup = {
  heading: Heading;
  headerText: string;
  headerId: string;
  linkedPath?: string;
  /**
   * all content after this header and before the first this+1 level header
   * in a flat array
   */
  // flatContent: RootContent[];
  /**
   * all content after this header and before the first this+1 level header
   * gouped into ContentGroups
   */
  baseContent: (ContentGroup | RootContent)[];
  /**
   * grouped content for each this+1 level header
   */
  childGroups: ContentGroup[];
  /**
   * baseContent and childGroups
   */
  content: (ContentGroup | RootContent)[];
  // content: (RootContent | ContentGroup)[];
};

export {
  FileMapBase,
  FileMapDir,
  FileMapItem,
  FileMapMd,
  FileTreeContextValue,
  PathItem,
  PathMap,
  ContentGroup,
};
