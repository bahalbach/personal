"use client";

import { FileTreeContext } from "./FileTreeContext";

// @ts-ignore
const FileTreeContextProvider = ({ value, children }) => (
  <FileTreeContext.Provider value={value}>{children}</FileTreeContext.Provider>
);

export default FileTreeContextProvider;
