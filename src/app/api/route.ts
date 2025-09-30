export async function GET(_request: Request) {
  console.log({ _request });
  return Response.json({
    hello: "world",
  });
}
