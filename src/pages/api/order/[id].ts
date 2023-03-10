import clientPromise from "../../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.url?.split('/')[3];

  switch(req.method) {
    case "GET": {
      console.log('retreiving id ' + id);
      res.status(200).json({"msg": `retrieving id ${id}`})
    }
    case "PATCH": {
      console.log('updating id ' + id);
      res.status(200).json({"msg": `updating id ${id}`})
    }
    case "DELETE": {
      console.log('deleting id ' + id);
      res.status(200).json({"msg": `deleting id ${id}`})
    }
  }
};