import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Item from '../../../models/Item';
import dbConnect from '../../../lib/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const id = req.url?.split('/')[3];
  
  console.log(req.method, 'METHOD');

  switch(req.method) {
    case "GET": {
      console.log('retreiving id ' + id);
      const item = await Item.findById(id);

      res.status(201).json(item);
      break;
    }
    case "PATCH": {
      console.log('updating id ' + id);
      res.status(200).json({"msg": `updating id ${id}`})
      break;
    }
    case "DELETE": {
      console.log('deleting id ' + id);
      const regex = /[a-zA-Z0-9]{24}/;

      if (id && !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Object ID is not valid, unable to delete item'})
      }

      const item = await Item.findOneAndDelete({_id: id});

      if (!item) {
        return res.status(400).json({error: 'No such item exists, unable to delete'});
      }

      res.status(200).json(item);
      break;
    }
  }
};