import { promises as fs } from "fs";

export async function local_cache<T>(label: string, getter: () => Promise<T>) {
  if (process.env.NODE_ENV !== "development") return getter();
  const filepath = process.cwd() + `/github_files/${label}.json`;
  try {
    const fileContent = await fs.readFile(filepath, "utf8");
    const content: T = JSON.parse(fileContent);
    return content;
  } catch {}

  const content = await getter();

  try {
    const fileContent = JSON.stringify(content);
    await fs.writeFile(filepath, fileContent, "utf8");
  } catch {}

  return content;
}
