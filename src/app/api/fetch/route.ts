export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  if (!url) {
    return new Response();
  }
  const text = await (await fetch(url)).text();
  return new Response(text);
}
