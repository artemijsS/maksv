import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import dbConnect from '@/utils/dbConnect';
import Page from '@/utils/page.util';
import Estate from '@/models/Estate';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        if (req.method === 'GET') {
            return await estateGet(req, res)
        } else {
            return res.status(405).json({ message: 'Method not allowed' });
        }

    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const estateGet = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        await dbConnect();

        const page = new Page(req)

        const estates = await Estate.find({
            $or: [
                { "name.lv": { $regex: page.Search, $options: 'i' } },
                { "name.ru": { $regex: page.Search, $options: 'i' } },
                { "name.en": { $regex: page.Search, $options: 'i' } },
            ]
        }).limit(page.Size).skip(page.Size * page.Page).populate('District').populate('City').sort({
            createdAt: "desc"
        });

        const estatesCount = await Estate.find({
            $or: [
                { "name.lv": { $regex: page.Search, $options: 'i' } },
                { "name.ru": { $regex: page.Search, $options: 'i' } },
                { "name.en": { $regex: page.Search, $options: 'i' } },
            ]
        }).countDocuments();

        page.setData(estates)
        page.setCount(estatesCount)

        return res.status(200).json(page.pageResponse());

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
