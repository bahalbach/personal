import { Metadata } from "next";
import FileTreeContextProvider from "./_contexts/FileTreeContextProvider";
import { getNotes } from "./utils/getFileMap";

export const metadata: Metadata = {
  title: "Notes",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fileMap = await getNotes();

  return (
    <FileTreeContextProvider value={fileMap}>
      {children}
    </FileTreeContextProvider>
  );
}
