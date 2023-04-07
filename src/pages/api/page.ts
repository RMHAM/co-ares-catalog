// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let pageId = req.query.pageId;
  if (pageId === undefined || typeof pageId !== "string") {
    pageId = "a9dbf678-99fa-4e03-8e60-75bade1d3d9f";
  }

  const result = await prisma.f217a_pages.findUnique({
    where: { id: pageId },
    include: {
      f217a_page_channels: true,
      organizations: true,
    },
  });
  res.json(result);
}
