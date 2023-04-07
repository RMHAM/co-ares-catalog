// pages/api/[...nextcrud.ts]
import NextCrud, { PrismaAdapter } from "@premieroctet/next-crud";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const nextCrudHandler = await NextCrud({
    adapter: new PrismaAdapter({
      prismaClient: prisma,
    }),
    onRequest: (req1, res1, options) => {
      // TODO: access control, see https://github.com/premieroctet/next-crud/issues/44
      console.log(JSON.stringify(options));
    },
  });
  return nextCrudHandler(req, res);
};
export default handler;
