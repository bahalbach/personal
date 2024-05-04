import React, { ReactNode } from "react";

// add small link button for "view project" and "project github" links
export default function LinkButton({
  href,
  text,
  icon,
  text_size = "text-2xl",
}: {
  icon: ReactNode;
  href: string;
  text: string;
  text_size?: string;
}) {
  return (
    <button
      className={`flex items-center gap-2 ${text_size} text-white  my-2 border border-theme px-4 py-2 bg-theme hover:bg-themeDark`}
    >
      {icon}
      <a href={href} target="_blank" rel="noopener noreferrer">
        <span>{text}</span>
      </a>
    </button>
  );
}
