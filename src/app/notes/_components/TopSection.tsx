"use client";

import type { Heading, RootContent } from "mdast";
import { useContext, Fragment, useRef } from "react";
import { FileTreeContext } from "../_contexts/FileTreeContext";
import { processNotePath } from "../utils/processNotePath";
import { mdToReact } from "../utils/mdToReact";
import { getContent } from "../utils/getContent";
import { Link } from "next-view-transitions";
import { PathContext } from "../_contexts/PathContext";

export default function TopSection({
  tree,
  path,
}: {
  tree: FileMapItem;
  path?: string[];
}) {
  const { pageMap, fileMap } = useContext(FileTreeContext);
  let { content, childGroups, allContent, directoryChildren, contentGroup } =
    getContent(tree, pageMap);
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

function RenderHeading(header: Heading, adjustHeadings: boolean) {
  const text = mdToReact(header.children);
  const depth = header.depth + (adjustHeadings ? 1 : 0);
  switch (depth) {
    case 1:
      return <h1>{text}</h1>;
    case 2:
      return <h2>{text}</h2>;
    case 3:
      return <h3>{text}</h3>;
    case 4:
      return <h4>{text}</h4>;
    case 5:
      return <h5>{text}</h5>;
    case 6:
    default:
      return <h6>{text}</h6>;
  }
}

function isContentGroup(obj: any): obj is ContentGroup {
  return (
    typeof obj === "object" &&
    "heading" in obj &&
    "content" in obj &&
    Array.isArray(obj.content) &&
    "childGroups" in obj &&
    Array.isArray(obj.childGroups)
  );
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
  const currentPath = useContext(PathContext);
  const path = `${currentPath}/${tree.canonicalLabel}`;
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
      <Link href={path}>
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
  const heading = RenderHeading(cg.heading, adjustHeadings);
  if (cg.content.length === 0) return heading;
  return (
    <details open>
      <summary>{heading}</summary>
      {simpleRenderContent(cg.content, adjustHeadings)}
    </details>
  );
}
