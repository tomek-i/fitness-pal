import { NextApiRequest, NextApiResponse } from "next";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  ok(res, { status: "ok" });
}

const ok = (res: NextApiResponse, args: unknown) => {
  res.status(200).json(args);
};
