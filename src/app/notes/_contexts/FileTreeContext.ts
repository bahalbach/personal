"use client";

import { createContext } from "react";

export const FileTreeContext = createContext<FileTreeContextValue>(
  undefined as unknown as FileTreeContextValue
);
