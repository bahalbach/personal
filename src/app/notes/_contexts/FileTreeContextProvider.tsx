"use client";

import { FileTreeContextValue } from "../types";
import { FileTreeContext } from "./FileTreeContext";

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
