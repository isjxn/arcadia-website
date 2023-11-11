import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth';
import { authOptions } from '~/server/auth';
import { db } from '~/server/db';

type ResponseData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const session = await getServerSession(req, res, authOptions);
  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  if (!user || user.rank !== 'ADMIN') {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { id, pinned } = JSON.parse(req.body as string) as { id: number, pinned: boolean };

  await db.blogPost.update({
    where: {
      id,
    },
    data: {
      pinned,
    },
  });

  res.status(200).json({ message: 'Success' })
}