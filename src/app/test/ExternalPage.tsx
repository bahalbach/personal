"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Remeber to set targetUrl as the key of this component
 * so that it's recreated for new urls
 *
 * @param param0
 * @returns
 */
function ExternalPage({ targetUrl }: { targetUrl: string }) {
  const [url, setUrl] = useState(targetUrl);
  const [html, setHtml] = useState("");
  const [allowEmbedding, setAllowEmbedding] = useState(false);
  const ref = useRef<HTMLIFrameElement | null>(null);
  const ref2 = useRef<HTMLIFrameElement | null>(null);

  const loadUrl = useCallback(async (href: string) => {
    const res = await fetch(`/api/fetch?url=${href}`);
    if (!res.ok) return;
    // TODO: use tRPC here?
    const { allowEmbedding, text } = await res.json();
    setUrl(href);
    setHtml(text);
    setAllowEmbedding(allowEmbedding);
  }, []);

  useEffect(() => {
    loadUrl(targetUrl);
  }, [targetUrl, loadUrl]);

  const onClickLink = loadUrl;

  const origin = new URL(url).origin;

  useEffect(() => {
    if (!ref.current) return;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const main = doc.querySelector("main");
    const firstHeaderParent = doc.querySelector(
      "h1, h2, h3, h4, h5, h6"
    )?.parentElement;
    const highestHeaderParent = (
      doc.querySelector("h1") ??
      doc.querySelector("h2") ??
      doc.querySelector("h3") ??
      doc.querySelector("h4") ??
      doc.querySelector("h5") ??
      doc.querySelector("h6")
    )?.parentElement;
    // console.log("main", doc.body.outerHTML);
    doc.body.innerHTML =
      main?.outerHTML ?? highestHeaderParent?.outerHTML ?? "";
    doc.querySelectorAll('img[src^="/"]').forEach((v) => {
      const img = v as HTMLImageElement;
      img.setAttribute("src", origin + img.getAttribute("src"));
      img.setAttribute("srcset", "");
      img.addEventListener("load", () => {
        // console.log("loaded", img);
      });
    });
    // doc.querySelectorAll('a[href^="/').forEach((v) => {
    //   const a = v as HTMLAnchorElement;
    //   a.addEventListener("click", (ev) => {
    //     console.log("click", ev.currentTarget);
    //   });
    // });

    // console.log("main", doc.body.outerHTML);
    const blob = new Blob([doc.body.outerHTML], { type: "text/html" });
    const blobUrl = URL.createObjectURL(blob);
    ref.current.src = blobUrl;

    // const blob2 = new Blob([html]);
    // const blobUrl2 = URL.createObjectURL(blob2);
    // ref2.current!.src = blobUrl2;

    ref.current.addEventListener("load", () => {
      if (!ref.current) return;
      const iframeDocument = ref.current.contentDocument;
      iframeDocument.querySelectorAll('a[href^="/').forEach((v) => {
        const a = v as HTMLAnchorElement;
        a.addEventListener("click", (ev) => {
          console.log("click", a.href);
          onClickLink(origin + a.href);
        });
      });
      // console.log("iframeDocument", iframeDocument);
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

  // console.log(`target ${url}`);

  return (
    <div className="grid grid-cols-1 row-start-1 row-end-2">
      {/* Iframe 1 */}
      {allowEmbedding ? (
        <iframe
          ref={ref2}
          style={{ opacity: allowEmbedding ? 1 : 0 }}
          height={800}
          width={800}
          className="bg-white w-full row-start-1 row-end-2 col-start-1 col-end-2"
          src={url}
        />
      ) : (
        <iframe
          ref={ref}
          style={{ opacity: allowEmbedding ? 0 : 1 }}
          height={800}
          width={800}
          className="bg-white w-full row-start-1 row-end-2 col-start-1 col-end-2 "
        />
      )}
    </div>
  );
}

export default ExternalPage;
