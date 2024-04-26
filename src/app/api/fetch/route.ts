import parseContentSecurityPolicy from "content-security-policy-parser";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams; // new URL(request.url);
  const url = searchParams.get("url");
  if (!url) {
    return new Response("", { status: 400 });
  }
  console.log("api fetch", url);
  const res = await fetch(url, {
    method: "HEAD",
  });
  const xFrameOptions = res.headers.get("x-frame-options");
  let allowEmbedding = !xFrameOptions;

  const cspHeader = res.headers.get("content-security-policy");
  if (cspHeader) {
    const csp = parseContentSecurityPolicy(cspHeader);
    if (csp.get("frame-ancestors")) {
      allowEmbedding = false;
    }
  }
  const text = await res.text();
  return Response.json({
    allowEmbedding,
    text,
  });
}
