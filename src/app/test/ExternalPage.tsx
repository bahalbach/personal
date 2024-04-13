"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function ExternalPage({
  html: initialHtml,
  targetUrl: initialUrl,
}: // onClickLink,
{
  html: string;
  targetUrl: string;
  // onClickLink: (href: string) => void;
}) {
  const [url, setUrl] = useState(initialUrl);
  const [html, setHtml] = useState(initialHtml);
  const origin = new URL(url).origin;
  const ref = useRef<HTMLIFrameElement | null>(null);
  const ref2 = useRef<HTMLIFrameElement | null>(null);

  const onClickLink = useCallback(async (href: string) => {
    const text = await (await fetch(`/api/fetch?url=${href}`)).text();
    if (!text) {
      console.log("nothing to show");
      return;
    }
    setUrl(href);
    setHtml(text);
  }, []);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const main = doc.querySelector("main");
    doc.body.innerHTML = main?.outerHTML ?? "";
    doc.querySelectorAll('img[src^="/"]').forEach((v) => {
      const img = v as HTMLImageElement;
      img.setAttribute("src", origin + img.getAttribute("src"));
      img.setAttribute("srcset", "");
      img.addEventListener("load", () => {
        console.log("loaded", img);
      });
    });
    // doc.querySelectorAll('a[href^="/').forEach((v) => {
    //   const a = v as HTMLAnchorElement;
    //   a.addEventListener("click", (ev) => {
    //     console.log("click", ev.currentTarget);
    //   });
    // });

    const blob = new Blob([doc.body.outerHTML]);
    const blobUrl = URL.createObjectURL(blob);
    ref.current!.src = blobUrl;

    const blob2 = new Blob([html]);
    const blobUrl2 = URL.createObjectURL(blob2);
    ref2.current!.src = blobUrl2;

    ref.current?.addEventListener("load", () => {
      const iframeDocument = ref.current!.contentDocument;
      iframeDocument.querySelectorAll('a[href^="/').forEach((v) => {
        const a = v as HTMLAnchorElement;
        a.addEventListener("click", (ev) => {
          console.log("click", a.href);
          onClickLink(origin + a.href);
        });
      });
      console.log("iframeDocument", iframeDocument);
      if (iframeDocument)
        iframeDocument.body.style.backgroundColor = "lightblue";
    });

    // .addEventListener(
    //   "click",
    //   (ev: MouseEvent) => {
    //     console.log("click", ev.currentTarget);
    //   }
    // );
  }, [html, origin, onClickLink]);

  console.log(`target ${url}`);

  return (
    <div className="flex flex-col">
      Iframe 1
      <iframe ref={ref} height={800} width={800} className="bg-white w-full" />
      Iframe 2
      <iframe ref={ref2} height={800} width={800} className="bg-white w-full" />
      <code>{html}</code>
    </div>
  );
}

export default ExternalPage;
