import Note from "./Note";

export default function NoteTree({
  active,
  tree,
  path,
}: {
  active: boolean;
  tree: FileMapItem;
  path: string[];
}) {
  if (tree.type === "markdown") {
    return <Note active={active} content={tree} path={path} />;
  }

  const link = <a href={`/${path.join("/")}`}>{tree.label}</a>;

  if (!active) {
    return link;
  }
  const treeNodes = [];

  for (let [sublabel, node] of tree.children) {
    const nextPath = [...path, sublabel];
    treeNodes.push(
      <li key={sublabel}>
        <NoteTree active={false} tree={node} path={nextPath} />
      </li>
    );
  }
  return (
    <div>
      <h2>{link}</h2>
      <ul className="pl-4">{treeNodes}</ul>
    </div>
  );
}
