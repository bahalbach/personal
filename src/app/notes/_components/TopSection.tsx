"use client";

import type { Heading, RootContent } from "mdast";
import { useContext, Fragment, useRef } from "react";
import { FileTreeContext } from "../_contexts/FileTreeContext";
import { processNotePath } from "../utils/processNotePath";
import { mdToReact } from "../utils/mdToReact";
import { getContent } from "../utils/getContent";
import { Link } from "@bahalbach/next-view-transitions";
import { ContentGroup, FileMapDir, FileMapItem, PathMap } from "../types";
import { isContentGroup } from "../utils/isContentGroup";

export default function TopSection({
  tree,
  content,
  directoryChildren,
  path,
}: {
  tree: FileMapItem;
  content: (RootContent | ContentGroup)[];
  directoryChildren: FileMapItem[];
  path?: string[];
}) {
  const headerText = tree.label;
  const sections: React.ReactNode[] = [];

  sections.push(simpleRenderContent(content));

  directoryChildren.forEach((node, i) =>
    sections.push(<Preview key={i} tree={node} />)
  );

  return (
    <div
      style={{
        viewTransitionName: tree.canonicalLabel,
      }}
    >
      {<h1>{headerText}</h1>}
      {sections}
    </div>
  );
}

function RenderHeading(cg: ContentGroup, adjustHeadings: boolean) {
  const text = mdToReact(cg.heading.children);
  const depth = cg.heading.depth + (adjustHeadings ? 1 : 0);
  switch (depth) {
    case 1:
      return <h1 id={cg.headerId}>{text}</h1>;
    case 2:
      return <h2 id={cg.headerId}>{text}</h2>;
    case 3:
      return <h3 id={cg.headerId}>{text}</h3>;
    case 4:
      return <h4 id={cg.headerId}>{text}</h4>;
    case 5:
      return <h5 id={cg.headerId}>{text}</h5>;
    case 6:
    default:
      return <h6 id={cg.headerId}>{text}</h6>;
  }
}

/**
 * TODO: make work with links in headers like Section
 * @param content
 * @returns
 */
function simpleRenderContent(
  content: (ContentGroup | RootContent)[],
  adjustHeadings: boolean = false
) {
  return content.map((child, index) => {
    if (isContentGroup(child)) {
      return (
        <Section key={index} cg={child} adjustHeadings={adjustHeadings} />
        // {/* {RenderHeading(child.heading, adjustHeadings)}
        // {simpleRenderContent(child.content, adjustHeadings)} */}
        // {/* {simpleRenderContent(child.childGroups, adjustHeadings)} */}
      );
    } else {
      return <Fragment key={index}>{mdToReact([child])}</Fragment>;
    }
  });
}

function getLinkedContent(link: string, fileMap: FileMapDir, pageMap: PathMap) {
  const { currentFileMap } = processNotePath(link.split("/").slice(2), fileMap);
  return getContent(currentFileMap, pageMap);
}

function Preview({ tree }: { tree: FileMapItem }) {
  // const currentPath = useContext(PathContext);
  // const path = `${currentPath}/${tree.canonicalLabel}`;
  const { pageMap } = useContext(FileTreeContext);
  const { headerText, content, directoryChildren } = getContent(tree, pageMap);
  const topLevelContent = simpleRenderContent(content, true);
  const headingRef = useRef<HTMLHeadingElement>(null);

  return (
    <div
      ref={headingRef}
      className="max-h-48 overflow-auto border border-secondary px-4 my-8 mx-4"
      style={{
        viewTransitionName: tree.canonicalLabel,
      }}
    >
      <Link shallow={true} href={tree.fullpath}>
        <h2>{headerText}</h2>
      </Link>
      {topLevelContent}
      {directoryChildren.map((node, i) => (
        <h3 key={i}>{node.label}</h3>
      ))}
    </div>
  );
}

function Section({
  cg,
  adjustHeadings,
}: {
  cg: ContentGroup;
  adjustHeadings: boolean;
}) {
  const heading = RenderHeading(cg, adjustHeadings);
  if (cg.content.length === 0) return heading;
  return (
    <details open>
      <summary>{heading}</summary>
      {simpleRenderContent(cg.content, adjustHeadings)}
    </details>
  );
}
