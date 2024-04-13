// import { DOMParser, parseHTML } from "linkedom";
import ExternalPage from "./ExternalPage";

async function TestPage() {
  const targetUrl = "https://refactoring.guru/design-patterns/catalog";
  const onClickLink = (href: string) => {
    console.log(href);
  };

  const html = await fetch(targetUrl).then((res) => res.text());

  return (
    <>
      <div>test page</div>
      <code>{"text"}</code>
      <ExternalPage targetUrl={targetUrl} html={html} />
    </>
  );
}

export default TestPage;
