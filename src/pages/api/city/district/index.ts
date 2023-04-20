import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import dbConnect from '@/utils/dbConnect';
import Page from '@/utils/page.util';
import City from '@/models/City';
import District from '@/models/District';

const ObjectId = mongoose.Types.ObjectId;


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        if (req.method === 'DELETE') {
            return await districtDelete(req, res);
        } else {
            return res.status(405).json({ message: 'Method not allowed' });
        }

    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


const districtDelete = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization.split(" ")[1];

    if (!token)
        return res.status(201).json({ message: "No Auth" });

    try {
        await dbConnect();

        const user = await jwt.verify(token, process.env.JWT_SECRET);

        if (!user.isAdmin)
            throw "user is not admin";

        const id = req.query.id

        if (!id || id === "undefined") {
            return res.status(200).json({ message: "Nothing to delete, id is empty" })
        }


        await District.findOneAndDelete({ _id: id })


        return res.status(200).json({ message: "District deleted!" })

    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
