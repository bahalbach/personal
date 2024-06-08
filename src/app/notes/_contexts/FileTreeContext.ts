"use client";

import { createContext } from "react";
import { FileTreeContextValue } from "../types";

export const FileTreeContext = createContext<FileTreeContextValue>(
  undefined as unknown as FileTreeContextValue
);
