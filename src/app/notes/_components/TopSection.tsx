"use client";

import type { Heading, PhrasingContent, RootContent } from "mdast";
import {
  createContext,
  useContext,
  useState,
  Fragment,
  useRef,
  MutableRefObject,
  RefObject,
} from "react";
import { FileTreeContext } from "../_contexts/FileTreeContext";
import { processNotePath } from "../utils/processNotePath";
import { usePathname, useRouter } from "next/navigation";
import { mdToReact } from "../utils/mdToReact";
import { getContent } from "../utils/getContent";
import { flushSync } from "react-dom";
import { motion } from "framer-motion";
import { Link } from "next-view-transitions";

export default function TopSection({
  tree,
  path,
}: {
  tree: FileMapItem;
  path?: string[];
}) {
  const { pageMap, fileMap } = useContext(FileTreeContext);
  let { content, childGroups, allContent, directoryChildren, contentGroup } =
    getContent(tree, pageMap);
  const [selected, setSelected] = useState(0);
  const headerText = tree.label;
  const sections: React.ReactNode[] = [];
  const mainHeadingRef = useRef<HTMLHeadingElement>(null);

  sections.push(simpleRenderContent(content));

  // TODO: uncomment to work on routing to markdown headings
  // if (contentGroup !== undefined) {
  //   for (let index = 0; index < (path?.length ?? 0); index++) {
  //     const i = parseInt(path![index], 10);
  //     if (i === 0) {
  //       break;
  //       // sections.push({
  //       //   label: 0,
  //       //   content: simpleRenderContent(contentGroup.content),
  //       // });
  //     } else if (i > 0 && i <= contentGroup.childGroups.length) {
  //       contentGroup = contentGroup.childGroups[i - 1];
  //     }
  //   }
  //   headerText = RenderText(contentGroup.heading.children)
  //   sections.push({
  //     label: 0,
  //     content: simpleRenderContent(contentGroup.content),
  //   });
  //   if (contentGroup.linkedPath) {
  //     const { } = getLinkedContent(contentGroup.linkedPath, fileMap, pageMap)
  //   }
  // }
  // if (path === undefined) {
  //   childGroups.forEach((cg, i) => {
  //     sections.push({
  //       label: i + 1,
  //       content: <Section cg={cg} />,
  //     })
  //   }
  //   );
  directoryChildren.forEach((node, i) =>
    sections.push(
      <Preview key={i} tree={node} mainHeadingRef={mainHeadingRef} />
    )
  );
  // }

  return (
    // <motion.div layout layoutId={tree.canonicalLabel}>
    <div
      style={{
        viewTransitionName: "top-section",
      }}
    >
      {
        <h1
          ref={mainHeadingRef}
          style={{
            viewTransitionName: tree.canonicalLabel,
          }}
        >
          {headerText}
        </h1>
      }
      {sections}
      {/* </motion.div> */}
    </div>
  );
}

const LinkCatchingContext = createContext<((link: string) => void) | undefined>(
  undefined
);
const CurrentPathContext = createContext<string[]>([]);

function RenderHeading(header: Heading, adjustHeadings: boolean) {
  const text = mdToReact(header.children);
  const depth = header.depth + (adjustHeadings ? 1 : 0);
  switch (depth) {
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
    default:
      return <h6>{text}</h6>;
  }
}

function isContentGroup(obj: any): obj is ContentGroup {
  return (
    typeof obj === "object" &&
    "heading" in obj &&
    "content" in obj &&
    Array.isArray(obj.content) &&
    "childGroups" in obj &&
    Array.isArray(obj.childGroups)
  );
}
/**
 * TODO: make work with links in headers like Section
 * @param content
 * @returns
 */
function simpleRenderContent(
  content: (ContentGroup | RootContent)[],
  adjustHeadings: boolean = false
) {
  return content.map((child, index) => {
    if (isContentGroup(child)) {
      return (
        <Section key={index} cg={child} adjustHeadings={adjustHeadings} />
        // {/* {RenderHeading(child.heading, adjustHeadings)}
        // {simpleRenderContent(child.content, adjustHeadings)} */}
        // {/* {simpleRenderContent(child.childGroups, adjustHeadings)} */}
      );
    } else {
      return <Fragment key={index}>{mdToReact([child])}</Fragment>;
    }
  });
}

// function LinkableSection({
//   selected,
//   children,
//   label,
// }: {
//   selected: boolean;
//   children: React.ReactNode;
//   label: string;
// }) {
//   const router = useRouter();
//   const currentPath = usePathname();

//   return (
//     <div
//       className={`section-container ${selected ? "selected" : ""}`}
//       onClick={() => {
//         // @ts-expect-error
//         if (!document.startViewTransition) {
//           router.push(`${currentPath}/${label}`);
//           return;
//         }
//         // @ts-expect-error
//         document.startViewTransition(() => {
//           router.push(`${currentPath}/${label}`);
//         });
//       }}
//     >
//       {children}
//     </div>
//   );
// }

function getLinkedContent(link: string, fileMap: FileMapDir, pageMap: PathMap) {
  const { currentFileMap } = processNotePath(link.split("/").slice(2), fileMap);
  return getContent(currentFileMap, pageMap);
}

function Preview({
  tree,
  mainHeadingRef,
}: {
  tree: FileMapItem;
  mainHeadingRef: RefObject<HTMLHeadingElement>;
}) {
  // const router = useRouter();
  const currentPath = usePathname();
  const path = `${currentPath}/${tree.canonicalLabel}`;
  // router.prefetch(path);
  const { pageMap } = useContext(FileTreeContext);
  const { headerText, content, directoryChildren } = getContent(tree, pageMap);
  const topLevelContent = simpleRenderContent(content, true);
  const headingRef = useRef<HTMLHeadingElement>(null);

  return (
    <div
      ref={headingRef}
      className="max-h-48 overflow-auto border border-secondary px-4 my-8 mx-4"
    >
      <Link href={path}>
        <h2
          // className={
          //   tree.canonicalLabel === "leetcode" ? "notes-main-heading" : ""
          // }
          style={{
            viewTransitionName: tree.canonicalLabel,
          }}
        >
          {headerText}
        </h2>
      </Link>
      {topLevelContent}
      {directoryChildren.map((node, i) => (
        <h3 key={i}>{node.label}</h3>
      ))}
      {/* </motion.div> */}
    </div>
  );
}

function Section({
  cg,
  adjustHeadings,
}: {
  cg: ContentGroup;
  adjustHeadings: boolean;
}) {
  const heading = RenderHeading(cg.heading, adjustHeadings);
  if (cg.content.length === 0) return heading;
  return (
    <details open>
      <summary>{heading}</summary>
      {simpleRenderContent(cg.content, adjustHeadings)}
    </details>
  );
}

function isIncludeInternalLink(content: PhrasingContent[]) {
  return content.some((node) => {
    return node.type === "link";
  });
}
