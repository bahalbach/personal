// import { DOMParser, parseHTML } from "linkedom";
import ExternalPage from "../notes/_components/ExternalPage";

async function TestPage() {
  const targetUrl = "https://refactoring.guru/design-patterns/catalog";

  return (
    <>
      <div>test page</div>
      <code>{"text"}</code>
      <ExternalPage targetUrl={targetUrl} />
    </>
  );
}

export default TestPage;
