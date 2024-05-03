"use client";

import { FileTreeContext } from "./FileTreeContext";

// @ts-ignore
const FileTreeContextProvider = ({
  value,
  children,
}: {
  value: FileTreeContextValue;
  children: React.ReactNode;
}) => (
  <FileTreeContext.Provider value={value}>{children}</FileTreeContext.Provider>
);

export default FileTreeContextProvider;
