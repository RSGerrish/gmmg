import type { NextApiRequest, NextApiResponse } from 'next';
import { generateUploadURL } from '../../lib/s3';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === 'GET') {
    const url = await generateUploadURL();
    res.status(200).send({url});
  };
}