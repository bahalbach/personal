"use client";

function toggleTheme() {
  const root = document.querySelector(":root")!;
  let oldTheme = "light";
  let newTheme = "dark";
  if (root.classList.contains("dark")) {
    oldTheme = "dark";
    newTheme = "light";
  }
  root.classList.replace(oldTheme, newTheme);
  try {
    localStorage.setItem("theme", newTheme);
  } catch {}
}

export default function ThemeToggle() {
  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="w-10 h-10 p-3 rounded focus:outline-none"
      onClick={() => toggleTheme()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        className="w-4 h-4 text-yellow"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          className="opacity-light"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          className="opacity-dark"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  );
}
