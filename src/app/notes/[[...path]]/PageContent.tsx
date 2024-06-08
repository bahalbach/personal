"use client";

import { Link } from "next-view-transitions";

import { processNotePath } from "../utils/processNotePath";
import TopSection from "../_components/TopSection";
import { PathContextProvider } from "../_contexts/PathContext";
import { useContext } from "react";
import { FileTreeContext } from "../_contexts/FileTreeContext";
import { usePathname } from "next/navigation";
import { getContent } from "../utils/getContent";
import { ContentGroup, FileMapItem } from "../types";
import { RootContent } from "mdast";
import { isContentGroup } from "../utils/isContentGroup";

export default function Page() {
  const pathname = usePathname();
  const path = pathname.split("/").slice(2);
  const { pageMap, fileMap } = useContext(FileTreeContext);
  const { currentFileMap, validPath, validPathLabels, invalidPath } =
    processNotePath(path, fileMap);
  let { content, childGroups, allContent, directoryChildren, contentGroup } =
    getContent(currentFileMap, pageMap);

  // TODO: have nav links to go back to linking entities, for
  // when there are internal links that aren't parent-child
  const nav = (
    <nav>
      <ul className="flex gap-4 p-4">
        {validPath.map((value, pathIndex) => (
          <li key={`${pathIndex}-${value}`}>
            <Link
              shallow={true}
              href={`/${validPath.slice(0, pathIndex + 1).join("/")}`}
            >
              {validPathLabels[pathIndex]}
            </Link>
          </li>
        ))}
        {invalidPath?.map((value, pathIndex) => (
          <li className="text-error" key={`invalid-${pathIndex}-${value}`}>
            {value}
          </li>
        ))}
      </ul>
    </nav>
  );
  const invalidPathNotice = invalidPath ? (
    <div className="p-4">The path {invalidPath.join("/")} is not valid</div>
  ) : null;

  const files = <Files fileMap={fileMap} validPath={validPath.slice(1)} />;

  const topSection = (
    <TopSection
      tree={currentFileMap}
      content={content}
      directoryChildren={directoryChildren}
      path={invalidPath}
    />
  );

  const contentOutline = <Outline content={content} />;

  const mainSection = (
    <PathContextProvider path={`/${validPath.join("/")}`}>
      {nav}
      {invalidPathNotice}
      <article className="markdown-body">{topSection}</article>
    </PathContextProvider>
  );

  const filesSidebar = <div className="hidden md:block">{files}</div>;
  const outlineSidebar = (
    <div className="hidden md:block">{contentOutline}</div>
  );

  return (
    <div className="p-2 md:p-8 flex">
      {filesSidebar}
      <div>{mainSection}</div>
      {outlineSidebar}
    </div>
  );
}

function Outline({ content }: { content: (RootContent | ContentGroup)[] }) {
  return (
    <ul>
      {content.filter(isContentGroup).map((cg) => (
        <li className="ml-4" key={cg.headerText}>
          <a href={`#${cg.headerId}`}>{cg.headerText}</a>
          <Outline content={cg.content} />
        </li>
      ))}
    </ul>
  );
}

function Files({
  fileMap,
  validPath,
  highlight = true,
  showAll = false,
}: {
  fileMap: FileMapItem;
  validPath: string[];
  highlight?: boolean;
  showAll?: boolean;
}) {
  const link = (
    <Link
      shallow={true}
      className={`${highlight ? "text-theme font-bold" : ""}`}
      href={fileMap.fullpath}
    >
      {fileMap.label}
    </Link>
  );
  if (fileMap.type !== "directory") {
    return link;
  }

  const childItems = [];
  for (const [key, value] of fileMap.children) {
    const highlightChild = validPath[0] === key;

    if (!showAll && !highlight) continue;
    childItems.push(
      <li className="ml-4" key={key}>
        <Files
          fileMap={value}
          validPath={validPath.slice(1)}
          highlight={highlightChild}
          showAll={showAll}
        />
      </li>
    );
  }

  return (
    <div>
      {link}
      <ul>{childItems}</ul>
    </div>
  );
}
