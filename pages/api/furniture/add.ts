import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';

import ConnectDb from '@middlewares/mongodb';

const Furniture = require('@models/furniture');

const handler = nc<NextApiRequest, NextApiResponse>()
    .post(async (req, res) => {
        try {
            console.log(req.body);

            const newFurniture = new Furniture({
                ...req.body,
            });

            await newFurniture.save();

            return res.status(201).json({ message: 'Done' });
        } catch(err) {
            return res.status(400).json('Algo ha salido mal');
        }
    });

export default ConnectDb(handler);