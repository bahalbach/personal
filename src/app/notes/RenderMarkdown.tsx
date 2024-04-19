"use client";

import { Octokit } from "octokit";
import { Fragment, createElement, useEffect, useRef, useState } from "react";
import * as prod from "react/jsx-runtime";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkWikiLink from "remark-wiki-link";
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react";
import { unified } from "unified";
import { makeCanonical } from "./makeCanonical";

import ExternalPage from "../test/ExternalPage";

function CustomLink({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className: string;
  href: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInternal = href.startsWith("/");

  return (
    <span className="link-container">
      <a href={href}>Custom! {children}</a>
      <span className="link-preview" ref={ref}>
        {isInternal ? (
          <RenderMarkdown text="test internal link" />
        ) : (
          <ExternalPage targetUrl={href} />
        )}
      </span>
    </span>
  );
}

const production = {
  Fragment: prod.Fragment,
  jsx: prod.jsx,
  jsxs: prod.jsxs,
  components: {
    a: CustomLink,
  },
};
function useProcessor(text: string) {
  const [Content, setContent] = useState<JSX.Element>(createElement(Fragment));

  useEffect(
    function () {
      (async function () {
        const file = await unified()
          .use(remarkParse)
          .use(remarkFrontmatter)
          .use(remarkGfm)
          .use(remarkWikiLink, {
            pageResolver: (pageName: string) => {
              console.log(`link pageName: ${pageName}`);
              return [makeCanonical(pageName)];
            },
            hrefTemplate: (permalink: string) => {
              return `/${permalink}`;
            },
            aliasDivider: "|",
          })
          .use(remarkRehype)
          // @ts-ignore
          .use(rehypeReact, production)
          .process(text);

        setContent(file.result);
      })();
    },
    [text]
  );

  return Content;
}

export default function RenderMarkdown({ text }: { text: string }) {
  return useProcessor(text);
}
