//READ: https://nextjs.org/docs/app/api-reference/file-conventions/route

type ResponseData = {
  message: string;
};

export async function GET() {
  return Response.json({ status: "ok" });
}

export async function POST(_: Request) {
  //TODO: create a new meal
  Response.json({ message: "Hello from Next.js!" });
}

export async function PATCH() {
  //PATCH does partial update e.g. Fields that need to be updated by the client,
  // only that field is updated without modifying the other field.
  //TODO: update a meal
  return Response.json({ status: "ok" });
}
export async function PUT() {
  //PUT replaces the entire resource if it exists or creates new if it does not exist
  //TODO: update a meal
  return Response.json({ status: "ok" });
}
export async function DELETE() {
  //TODO: deleet a  meal
  return Response.json({ status: "ok" });
}
