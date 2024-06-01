"use client";

import React, { createContext } from "react";

export const PathContext = createContext("");

export function PathContextProvider({
  children,
  path,
}: {
  children: React.ReactNode;
  path: string;
}) {
  return <PathContext.Provider value={path}>{children}</PathContext.Provider>;
}
