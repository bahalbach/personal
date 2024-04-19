// need a catch all route
// get data from github
export const fetchCache = "only-cache";
import Breadcrumbs from "./Breadcrumbs";
// import { FileTreeContext } from "../FileTreeContext";
import FileTreeContextProvider from "./FileTreeContextProvider";
import NoteTree from "./NoteTree";
import { getFileMap } from "./getFileMap";
import { makeCanonical } from "./makeCanonical";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fileMap = await getFileMap();

  return (
    <>
      {/* <FileTreeContext.Provider value={fileMap}> */}
      <FileTreeContextProvider value={fileMap}>
        <div className="p-4">
          <Breadcrumbs />
          {children}
        </div>
      </FileTreeContextProvider>
      {/* </FileTreeContext.Provider> */}
    </>
  );
}
