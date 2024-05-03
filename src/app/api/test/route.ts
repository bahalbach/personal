export async function GET(request: Request) {
  const {} = new URL(request.url);
  console.log("test request");
  return new Response();
}
