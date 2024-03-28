import dbConnect from "../../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../models/User';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect();
    
    switch(req.method) {
        case "GET": {
            const user = await User.find({});
            console.log('got users');
            console.log(user, 'user');
            res.status(201).json(user);
            break;
        }
        case "POST": { // Add Document to DB
            const { name, email, admin, lastLogin, cart } = req.body;

            try {
                const newUser = await User.create({
                    name: name,
                    email: email,
                    admin: admin,
                    lastLogin: lastLogin,
                    cart: cart,
                });
                res.status(201).json({success: true, data: newUser});
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