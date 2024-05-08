// need a catch all route
// get data from github

// TODO: Should I have this?
// export const fetchCache = "only-cache";

import { Metadata } from "next";
import Breadcrumbs from "./_components/Breadcrumbs";
// import { FileTreeContext } from "../FileTreeContext";
import FileTreeContextProvider from "./_contexts/FileTreeContextProvider";
import NoteTree from "./_components/NoteTree";
import { getNotes } from "./utils/getFileMap";
import { makeCanonical } from "./utils/makeCanonical";

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
    <>
      {/* <FileTreeContext.Provider value={fileMap}> */}
      <FileTreeContextProvider value={fileMap}>
        <div className="p-4">
          {/* <Breadcrumbs /> */}
          {children}
        </div>
      </FileTreeContextProvider>
      {/* </FileTreeContext.Provider> */}
    </>
  );
}
