"use client";

import { createContext } from "react";

export const FileTreeContext = createContext<FileMapDir>({
  type: "directory",
  label: "Notes",
  canonicalLabel: "notes",
  children: new Map(),
});
