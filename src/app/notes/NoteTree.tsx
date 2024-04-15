import Note from "./Note";

export default function NoteTree({
  label,
  tree,
  path,
}: {
  label: string;
  tree: FileMapItem;
  path: string[];
}) {
  if (tree.type === "markdown") {
    return <Note label={label} content={tree} />;
  }

  const treeNodes = [];

  for (let [sublabel, node] of tree.children) {
    const nextPath = [...path, sublabel];
    treeNodes.push(
      <li key={sublabel}>
        <NoteTree label={node.label} tree={node} path={nextPath} />
      </li>
    );
  }
  return (
    <div>
      <h2>
        <a href={`/notes/${path.join("/")}`}>{label}</a>
      </h2>
      <ul className="pl-4">{treeNodes}</ul>
    </div>
  );
}
