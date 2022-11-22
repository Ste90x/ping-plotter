// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { triggerPinging } from "../../src/triggerPinging";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("queryParams", req.query);
  const result = await triggerPinging(Number(req?.query?.["minutes"]));
  res.status(200).json(result);
}
