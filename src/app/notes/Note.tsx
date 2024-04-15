export default function Note({
  label,
  content,
}: {
  label: string;
  content: FileMapMd;
}) {
  return (
    <article>
      <h3>{content.label}</h3>
      Content {content.url}
    </article>
  );
}
