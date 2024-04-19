import { micromark } from "micromark";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export default async function Page() {
  const test1 = "([link here](https://github.com/micromark/micromark))";
  const test2 = `with the generated HTML ([Example here](https://nextjs.org/learn-pages-router/basics/dynamic-routes/render-markdown)). I could include links to child documents in the containing layout.`;

  const test3 =
    "I don't want to just render them all as individual pages, because I want to preserve the hierarchical information. The simplest way to do it would be to use `remark` and `remark-html` and `dangerouslySetInnerHTML` with the generated HTML ([Example here](https://nextjs.org/learn-pages-router/basics/dynamic-routes/render-markdown)). I could include links to child documents in the containing layout. ";

  const testText = test3;

  const res1 = String(
    await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(testText)
  );
  return (
    <div>
      <h1>Test micromark</h1>
      <iframe src="http://localhost:3000/" />
      <p>{res1}</p>
    </div>
  );
}
