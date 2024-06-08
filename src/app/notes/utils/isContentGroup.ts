import { ContentGroup } from "../types";

export function isContentGroup(obj: any): obj is ContentGroup {
  return (
    typeof obj === "object" &&
    "heading" in obj &&
    "content" in obj &&
    Array.isArray(obj.content) &&
    "childGroups" in obj &&
    Array.isArray(obj.childGroups)
  );
}
