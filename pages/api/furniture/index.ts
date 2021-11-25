import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';

import ConnectDb from '@middlewares/mongodb';

const Furniture = require('@models/furniture');

const handler = nc<NextApiRequest, NextApiResponse>()
    .get(async (req, res) => {
        try {
            const furniture = await Furniture.find();

            return res.status(201).json(furniture);
        } catch(err) {
            return res.status(400).json('Algo ha salido mal');
        }
    });

export default ConnectDb(handler);