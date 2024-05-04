"use client";

import React, { createContext, useLayoutEffect } from "react";

type Theme = null;

const ThemeContext = createContext(null);

export { ThemeContext };

export default function ThemeContextProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: Theme;
}) {
  useLayoutEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    let theme = prefersDark ? "dark" : "light";
    try {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme !== null) {
        theme = savedTheme;
      }
    } catch {}
    const root = document.querySelector(":root")!;
    root.classList.add(theme);
    // root.style.setProperty("--dark-mode", !s);
  }, []);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
