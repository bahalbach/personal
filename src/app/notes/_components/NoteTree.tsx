"use client";

import * as prod from "react/jsx-runtime";
import Link from "next/link";
import Note from "./Note";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import wikiLinkPlugin from "remark-wiki-link";
import { makeCanonical } from "../utils/makeCanonical";
import { getNotes, resolveInternalLink } from "../utils/getFileMap";

import type {
  Heading,
  Parent,
  PhrasingContent,
  Root,
  RootContent,
} from "mdast";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  Fragment,
  useMemo,
} from "react";
import { FileTreeContext } from "../_contexts/FileTreeContext";
import rehypeReact from "rehype-react";
import ExternalPage from "./ExternalPage";
import { processNotePath } from "../utils/processNotePath";
const internalLinkToken = "internal:";

function parseMarkdown(markdown: string, pageMap: PathMap) {
  return unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(wikiLinkPlugin, {
      pageResolver: (pageName: string) => {
        const linkOptions = resolveInternalLink(pageMap, pageName);
        // console.log(`link pageName: ${pageName}, options: ${linkOptions}`);
        // return [makeCanonical(pageName)];
        // return linkOptions;
        return [linkOptions.join("|")];
      },
      hrefTemplate: (permalink: string) => {
        return `${internalLinkToken}${permalink}`;
      },
      // hrefTemplate: (permalink: string) => {
      //   return `/${permalink}`;
      // },
      aliasDivider: "|",
    })
    .parse(markdown);
}

function RenderText(text: PhrasingContent[]) {
  return mdToReact(text);
  return text.map((node) => {
    switch (node.type) {
      case "text":
        return node.value;
        break;
      default:
        break;
    }
  });
}

// function RenderMdast(mdast: Root, label: string) {
//   const contentGroup = groupContent(mdast.children);
//   console.log(contentGroup);

//   const children = RenderContentGroup(contentGroup);
//   return children;
// }

/**
 * grouped content for all content following this header
 * but before the next this level header
 */
type ContentGroup = {
  heading: Heading;
  /**
   * all content after this header and before the first this+1 level header
   * in a flat array
   */
  // flatContent: RootContent[];
  /**
   * all content after this header and before the first this+1 level header
   * gouped into ContentGroups
   */
  content: (ContentGroup | RootContent)[];
  /**
   * grouped content for each this+1 level header
   */
  childGroups: ContentGroup[];
  // content: (RootContent | ContentGroup)[];
};
function isContentGroup(obj: any): obj is ContentGroup {
  return "level" in obj && "content" in obj && Array.isArray(obj.content);
}

//  just make custom header and link components instead of custom everything...

const LinkCatchingContext = createContext<((link: string) => void) | undefined>(
  undefined
);
const CurrentPathContext = createContext<string[]>([]);

function RenderHeading(header: Heading) {
  const text = RenderText(header.children);
  switch (header.depth) {
    case 1:
      return <h1>{text}</h1>;
    case 2:
      return <h2>{text}</h2>;
    case 3:
      return <h3>{text}</h3>;
    case 4:
      return <h4>{text}</h4>;
    case 5:
      return <h5>{text}</h5>;
    case 6:
      return <h6>{text}</h6>;
  }
}

/**
 * TODO: make work with links in headers like Section
 * @param content
 * @returns
 */
function simpleRenderContent(content: (ContentGroup | RootContent)[]) {
  return content.map((child, index) => {
    if (isContentGroup(child)) {
      <Fragment key={`${index}`}>
        {RenderHeading(child.heading)}
        {simpleRenderContent(child.content)}
        {simpleRenderContent(child.childGroups)}
      </Fragment>;
    } else {
      return <Fragment key={index}>{mdToReact([child])}</Fragment>;
    }
  });
}

function getContent(tree: FileMapItem, pageMap: PathMap) {
  const { type, label, content } = tree;
  const headerText = tree.label;
  let contentGroup;
  if (content) {
    const mdast = parseMarkdown(content, pageMap);
    contentGroup = groupContent(label, mdast.children);
  }
  const directoryChildren =
    type === "directory" ? [...tree.children.values()] : [];
  return {
    headerText,
    content: contentGroup?.content ?? [],
    childGroups: contentGroup?.childGroups ?? [],
    directoryChildren,
  };
}

export function TopSection({ tree }: { tree: FileMapItem }) {
  const { pageMap } = useContext(FileTreeContext);
  const { headerText, content, childGroups, directoryChildren } = getContent(
    tree,
    pageMap
  );
  return (
    <>
      {<h1>{headerText}</h1>}
      {simpleRenderContent(content)}
      {childGroups.map((cg, i) => (
        <Section key={i} cg={cg} />
      ))}
      {directoryChildren.map((node, i) => (
        <Preview key={i} tree={node} />
      ))}
    </>
  );
}

function Preview({ tree }: { tree: FileMapItem }) {
  const { pageMap } = useContext(FileTreeContext);
  const { headerText, content, childGroups, directoryChildren } = getContent(
    tree,
    pageMap
  );

  const topLevelChildren = childGroups.map((cg, index) =>
    RenderHeading(cg.heading)
  );
  return (
    <>
      <h2>{headerText}</h2>
      {simpleRenderContent(content)}
      {topLevelChildren}
      {directoryChildren.map((node, i) => (
        <h3 key={i}>{node.label}</h3>
      ))}
    </>
  );
}

function Section({ cg }: { cg: ContentGroup }) {
  const { fileMap, pageMap } = useContext(FileTreeContext);
  const [headerLink, setHeaderLink] = useState<string | null>(null);
  const catchLink = useCallback(
    (link: string) => {
      if (headerLink === null) {
        setHeaderLink(link);
      }
    },
    [headerLink]
  );
  const headerText = RenderHeading(cg.heading);
  const header = (
    <LinkCatchingContext.Provider value={catchLink}>
      {headerText}
    </LinkCatchingContext.Provider>
  );

  const renderedContent = simpleRenderContent(cg.content);

  const {
    content: linkedContent,
    childGroups: linkedChildGroups,
    directoryChildren: linkedDirectoryChildren,
  } = useMemo(() => {
    if (headerLink === null)
      return {
        content: [],
        childGroups: [],
        directoryChildren: [],
      };
    const { currentFileMap } = processNotePath(
      headerLink?.split("/").slice(2),
      fileMap
    );
    return getContent(currentFileMap, pageMap);
  }, [headerLink, fileMap, pageMap]);

  // if (headerLink)
  //   console.log(
  //     "got header link",
  //     headerLink,
  //     headerLink?.split("/").slice(2),
  //     currentFileMap,
  //     validPath,
  //     invalidPath
  //   );
  const childGroupHeaders = [...cg.childGroups, ...linkedChildGroups].map(
    (childGroup) => {
      return RenderHeading(childGroup.heading);
    }
  );
  return (
    <details>
      <summary>{header}</summary>
      {renderedContent}
      {/* TODO, adjust heading levels */}
      {simpleRenderContent(linkedContent)}
      {childGroupHeaders}
    </details>
  );
}

function isIncludeInternalLink(content: PhrasingContent[]) {
  return content.some((node) => {
    return node.type === "link";
  });
}

function RenderContentGroup(cg: ContentGroup) {
  const renderedContent = mdToReact(cg.baseContent);
  const childGroups = cg.childGroups.map((childGroup) => {
    return RenderContentGroup(childGroup);
  });

  const header = RenderHeading(cg.heading);

  return (
    <Section header={header} content={[renderedContent, ...childGroups]} />
  );
}

// type ContentGroup = {
//   heading?: Heading;
//   content: RootContent[];
// };
// function getContentGroups(content: RootContent[]) {
//   let lowestHeadingSeen: 1 | 2 | 3 | 4 | 5 | 6 = 6;
//   for (let index = 0; index < content.length; index++) {
//     const node = content[index];
//     if (node.type === "heading") {
//       if (lowestHeadingSeen === null) {
//         lowestHeadingSeen = node.depth;
//       } else if (node.depth < lowestHeadingSeen) {
//         lowestHeadingSeen = node.depth;
//       }
//     }
//   }
//   const startContent: RootContent[] = [];
//   const contentGroups: ContentGroup[] = [
//     {
//       content: startContent,
//       level: lowestHeadingSeen,
//     },
//   ];

//   for (let index = 0; index < content.length; index++) {
//     const node = content[index];
//     if (node.type === "heading" && node.depth === lowestHeadingSeen) {
//       contentGroups.push({
//         heading: node,
//         content: [],
//         level: lowestHeadingSeen,
//       });
//     } else {
//       contentGroups.at(-1)?.content.push(node);
//     }
//   }

//   return contentGroups;
// }

function groupContent(label: string, content: RootContent[]) {
  const level1Content: ContentGroup = {
    heading: {
      type: "heading",
      depth: 1,
      children: [
        {
          type: "text",
          value: label,
        },
      ],
    },
    // flatContent: [],
    content: [],
    childGroups: [],
  };
  const contentGroups = [level1Content];
  for (let index = 0; index < content.length; index++) {
    const element = content[index];
    if (element.type === "heading") {
      if (element.depth === 1) {
        element.depth = 2;
        // TODO: better handling multiple h1
        // use level0conent?
        console.error("multiple titles in content", content);
      }
      while (contentGroups.at(-1)!.heading.depth >= element.depth) {
        contentGroups.pop();
      }
      const newGroup = {
        heading: element,
        content: [],
        // flatContent: [],
        childGroups: [],
      };
      // add this group as child group of the higher level heading
      if (contentGroups.at(-1)!.heading.depth === element.depth - 1) {
        contentGroups.at(-1)?.childGroups.push(newGroup);
      } else {
        contentGroups.at(-1)?.content.push(newGroup);
      }

      // add this group to the end of the heading stack
      contentGroups.push(newGroup);
    } else {
      contentGroups.at(-1)!.content.push(element);
    }
  }
  return level1Content;
}

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

function CustomLink({
  children,
  className,
  href,
  ...rest
}: {
  children: React.ReactNode;
  className: string;
  href: string;
}) {
  const currentPath = useContext(CurrentPathContext).join("/");
  const catchLink = useContext(LinkCatchingContext);
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
    catchLink?.(internalLink);
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

const production = {
  Fragment: prod.Fragment,
  jsx: prod.jsx,
  jsxs: prod.jsxs,
  components: {
    a: CustomLink,
  },
};
function mdToReact(content: RootContent[]) {
  const tree: Root = {
    type: "root",
    children: content,
  };
  const rhast = unified().use(remarkRehype).runSync(tree);
  // @ts-ignore
  const html = unified().use(rehypeReact, production).stringify(rhast);
  return html;
}
async function RenderMdastToHtml(mdast: Root) {
  // startContent
  const rhast = unified().use(remarkRehype).runSync(mdast);
  // @ts-ignore
  const html = unified().use(rehypeReact, production).stringify(rhast);

  const topLevelText = (
    <div
      className="markdown-content p-2 focus:bg-black focus-within:outline focus-within:outline-2 focus-within:outline-green-400"
      tabIndex={0}
    >
      {html}
    </div>
  );
  // console.dir(mdast);
  return topLevelText;
}

export default function NoteTree({
  active,
  tree,
}: {
  active: boolean;
  tree: FileMapItem;
}) {
  const { pageMap } = useContext(FileTreeContext);
  const { type, label, canonicalLabel, content } = tree;

  // TODO: inactive should be something more...
  if (!active) {
    return label;
  }
  console.log("render notetree", tree);

  let topLevelText = null;
  if (content) {
    const mdast = parseMarkdown(content, pageMap);
    const contentGroup = groupContent(label, mdast.children);

    topLevelText = RenderContentGroup(contentGroup);
  }
  const topLevelHeadings = [];

  const treeNodes = [];

  if (type === "directory") {
    for (let [sublabel, node] of tree.children) {
      // const nextPath = [...path, sublabel];
      treeNodes.push(
        <li key={sublabel}>
          <NoteTree active={false} tree={node} />
        </li>
      );
    }
  }

  return topLevelText;
}
