"use client";

import { useRef } from "react";
import { internalLinkToken } from "../constants";
import ExternalPage from "../_components/ExternalPage";
import { usePathname } from "next/navigation";

function prefixInCommon(a: string, b: string) {
  let i = 0;
  const end = Math.min(a.length, b.length);
  while (i < end) {
    if (a[i] !== b[i]) {
      return i;
    }
    i += 1;
  }
  return i;
}

export default function CustomLink({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className: string;
  href: string;
}) {
  // const currentPath = useContext(CurrentPathContext).join("/");
  const currentPath = usePathname() ?? "";
  // const catchLink = useContext(LinkCatchingContext);
  const ref = useRef<HTMLDivElement>(null);
  const isInternal = href.startsWith(internalLinkToken);

  // TODO: need to find link using file tree

  let internalLink = "";
  if (isInternal) {
    const internalLinkOptions = href.replace(internalLinkToken, "").split("|");
    let longestInCommon = -1;
    for (let i = 0; i < internalLinkOptions.length; i++) {
      const length = prefixInCommon(currentPath, internalLinkOptions[i]);
      if (length > longestInCommon) {
        internalLink = `/${internalLinkOptions[i]}`;
        longestInCommon = length;
      }
    }
    // console.log("link", href, internalLinkOptions, internalLink);
    // catchLink?.(internalLink);
  }

  return (
    <span className="link-container">
      <a href={isInternal ? internalLink : href}>Custom! {children}</a>
      <span className="link-preview" ref={ref}>
        {isInternal ? (
          // <RenderMarkdown text="test internal link" />
          <span className="p-2 bg-black text-white border-blue-500 border">
            TODO: internal link
          </span>
        ) : (
          <ExternalPage targetUrl={href} />
        )}
      </span>
    </span>
  );
}
