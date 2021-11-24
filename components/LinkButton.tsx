import React, { ReactNode } from "react";

export default function LinkButton({
  href,
  text,
  icon,
}: {
  icon: ReactNode;
  href: string;
  text: string;
}) {
  return (
    <button className="flex items-center gap-2 text-2xl text-white  my-2 border border-blue-500 px-4 py-2 bg-blue-500 hover:bg-blue-700">
      {icon}
      <a href={href} target="_blank" rel="noopener noreferrer">
        <span>{text}</span>
      </a>
    </button>
  );
}
