import dbConnect from "../../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'
import Item from '../../../models/Item';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect();
    
    switch(req.method) {
        case "GET": {
            const items = await Item.find({});
            console.log(items, 'items');

            res.status(201).json(items);
            break;
        }
        case "POST": { // Add Document to DB
            const { name, description, imageUrl, options, quantity, onSale } = req.body;
            console.log(req.body);

            try {
                const newItem = await Item.create({
                    name: name,
                    description: description,
                    imgUrl: imageUrl,
                    options: options,
                    quantity: quantity,
                    onSale: onSale,
                });
                // const newItem = await Item.create({name, size, price});
                res.status(201).json({success: true, data: newItem});
            } catch (error: any) {
                res.status(400).json({error: error.message})
            }
        }
        break;
    default:
        res.status(400).json({ success: false })
        break;
    }

};