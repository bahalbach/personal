import { PhrasingContent, RootContent } from "mdast";
import { parseMarkdown } from "./parseMarkdown";
import { internalLinkToken } from "../constants";
import { ContentGroup, FileMapItem, PathMap } from "../types";

function getHeaderLinkedContent(children: PhrasingContent[]): string | null {
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    if (child.type === "link") {
      if (child.url.startsWith(internalLinkToken)) {
        return child.url;
      }
    }
    if ("children" in child) {
      const linkedContent = getHeaderLinkedContent(child.children);
      if (linkedContent) {
        return linkedContent;
      }
    }
  }
  return null;
}

function getHeaderText(children: PhrasingContent[]): string {
  return children
    .flatMap((child) => {
      // "break" | "delete" | "emphasis" | "footnoteReference" | "html" | "image" | "imageReference" | "inlineCode" | "link" | "linkReference" | "strong" | "text" | "mdxTextExpression" | "mdxJsxTextElement"
      switch (child.type) {
        case "break":
        case "delete":
        case "footnoteReference":
        case "html":
        case "image":
        case "imageReference":
        case "linkReference":
          return "";
        case "emphasis":
        case "link":
        case "strong":
        case "mdxJsxTextElement":
          return getHeaderText(child.children);
        case "text":
        case "inlineCode":
        case "mdxTextExpression":
          return child.value;
      }
    })
    .join("");
}

function groupContent(label: string, content: RootContent[]) {
  let headerCount = 0;
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
    headerText: label,
    headerId: `${label}-${headerCount++}`,
    // flatContent: [],
    baseContent: [],
    childGroups: [],
    content: [],
  };
  const contentGroups = [level1Content];
  for (let index = 0; index < content.length; index++) {
    const element = content[index];
    if (element.type === "heading") {
      if (element.depth === 1) {
        element.depth = 2;
        // TODO: better handling multiple h1
        // use level0conent?
        // console.error("multiple titles in content", label);
      }
      while (contentGroups.at(-1)!.heading.depth >= element.depth) {
        contentGroups.pop();
      }

      const newGroup: ContentGroup = {
        heading: element,
        headerText: getHeaderText(element.children),
        headerId: `${label}-${headerCount++}`,
        baseContent: [],
        childGroups: [],
        content: [],
      };
      const linkedContent = getHeaderLinkedContent(element.children);
      if (linkedContent) {
        newGroup.linkedPath = linkedContent;
      }
      contentGroups.at(-1)?.content.push(newGroup);
      // add this group as child group of the higher level heading
      if (contentGroups.at(-1)!.heading.depth === element.depth - 1) {
        contentGroups.at(-1)?.childGroups.push(newGroup);
      } else {
        contentGroups.at(-1)?.baseContent.push(newGroup);
      }

      // add this group to the end of the heading stack
      contentGroups.push(newGroup);
    } else {
      contentGroups.at(-1)?.baseContent.push(element);
      contentGroups.at(-1)!.content.push(element);
    }
  }
  return level1Content;
}

export function getContent(tree: FileMapItem, pageMap: PathMap) {
  const { type, label, content } = tree;
  const headerText = tree.label;
  let contentGroup: ContentGroup | undefined;
  let allContent;
  if (content) {
    const mdast = parseMarkdown(content, pageMap);
    allContent = mdast.children;
    contentGroup = groupContent(label, allContent);
  }
  const directoryChildren =
    type === "directory" ? [...tree.children.values()] : [];
  return {
    headerText,
    content: contentGroup?.content ?? [],
    childGroups: contentGroup?.childGroups ?? [],
    contentGroup,
    allContent,
    directoryChildren,
  };
}
