import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import ConnectDb from '@middlewares/mongodb';

const User = require('@models/user');

const handler = nc<NextApiRequest, NextApiResponse>()
    .post(async (req, res) => {
        try {
            const { username } = req.body;

            const existingUser = await User.findOne({ username });

            if (existingUser)
                return res.status(401).json({ error: 'Usuario existente' });

            const cryptedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new User({
                ...req.body,
                password: cryptedPassword
            });

            await newUser.save();

            return res.status(201).json({ message: 'Done' });
        } catch(err) {
            return res.status(400).json('Algo ha salido mal');
        }
    });

export default ConnectDb(handler);