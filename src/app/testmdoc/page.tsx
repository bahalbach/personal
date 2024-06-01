async function TestPage() {
  const targetUrl = "https://developer.chrome.com/blog/anchor-positioning-api";
  const html = await fetch(targetUrl).then((res) => res.text());

  // const root = parseMarkdown(markdown);
  // const content = await mdToReact(root.children);
  // md
  return (
    <>
      <div>test page</div>
      <code>{html}</code>
      {/* {content} */}
    </>
  );
}

export default TestPage;
