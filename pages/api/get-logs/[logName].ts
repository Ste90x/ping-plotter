// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { readLog } from "../../../src/getLogs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("queryParams", req.query);
  res.status(200).json(readLog(req.query["logName"] as string));
}
