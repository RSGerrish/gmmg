import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import dbConnect from '../../../lib/mongodb';

import User from '../../../models/User';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const id = req.url?.split('/')[3];

  console.log(id, 'id');
  console.log(req.method, 'METHOD');

  switch(req.method) {
    case "PATCH": {
      if (id && !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user'})
      }

      console.log(req.body, 'req.body')

      const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
      })

      if (!user) {
        return res.status(404).json({error: 'No such user'});
      }

      res.status(200).json(user);
      //Continue from here
    }
  }
}