"use client";

import { useContext } from "react";
import { FileTreeContext } from "../_contexts/FileTreeContext";

export default function NoteTree({
  active,
  tree,
}: {
  active: boolean;
  tree: FileMapItem;
}) {
  const { pageMap } = useContext(FileTreeContext);
  const { type, label, canonicalLabel, content } = tree;

  // TODO: inactive should be something more...
  if (!active) {
    return label;
  }
  console.log("render notetree", tree);

  let topLevelText = null;
  // if (content) {
  //   const mdast = parseMarkdown(content, pageMap);
  //   const contentGroup = groupContent(label, mdast.children);

  //   topLevelText = RenderContentGroup(contentGroup);
  // }
  const topLevelHeadings = [];

  const treeNodes = [];

  if (type === "directory") {
    for (let [sublabel, node] of tree.children) {
      // const nextPath = [...path, sublabel];
      treeNodes.push(
        <li key={sublabel}>
          <NoteTree active={false} tree={node} />
        </li>
      );
    }
  }

  return topLevelText;
}
