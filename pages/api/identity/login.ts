import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import ConnectDb from '@middlewares/mongodb';

const User = require('@models/user');

const handler = nc<NextApiRequest, NextApiResponse>()
    .post(async (req, res) => {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({ username });

            if (!user)
                return res.status(404).json({ error: 'Este usuario no existe ' });

            const validPassword = await bcrypt.compare(password, user.password);

            if (validPassword) {
                const token = jwt.sign({ _id: user._id, admin: user.admin }, process.env.TOKEN_KEY as string);

                return res.status(200).json({ token });
            }
            else
                return res.status(401).json({ error: 'Credenciales invalidas' });
        } catch(err) {
            return res.status(400).json('Algo ha salido mal');
        }
    })

export default ConnectDb(handler);