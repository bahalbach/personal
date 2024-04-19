import parseContentSecurityPolicy from "content-security-policy-parser";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  if (!url) {
    return new Response("", { status: 400 });
  }
  const res = await fetch(url);
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
