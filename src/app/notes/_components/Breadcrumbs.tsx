"use client";

import { useContext } from "react";
import { FileTreeContext } from "../_contexts/FileTreeContext";
import {
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";

export default function Breadcrumbs() {
  const fileMap = useContext(FileTreeContext);
  let currentFileMap: FileMapItem = fileMap;
  const segments = useSelectedLayoutSegment();

  return (
    <ul>
      <li key={"notes"}>Notes</li>
      {segments?.split("/").map((segment, index) => {
        if (
          currentFileMap.type === "directory" &&
          currentFileMap.children.has(segment)
        ) {
          currentFileMap = currentFileMap.children.get(segment)!;
          return <li key={index}>{currentFileMap.label}</li>;
        }
      })}
    </ul>
  );
}
