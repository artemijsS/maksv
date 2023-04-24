import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import dbConnect from '@/utils/dbConnect';
import Page from '@/utils/page.util';
import Estate from '@/models/Estate';
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: "artemijss",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        if (req.method === 'GET') {
            return await estateGet(req, res)
        } if (req.method === 'DELETE') {
            return await estateDelete(req, res)
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
                { "type.lv": { $regex: page.Search, $options: 'i' } },
                { "type.ru": { $regex: page.Search, $options: 'i' } },
                { "type.en": { $regex: page.Search, $options: 'i' } },
            ]
        }).limit(page.Size).skip(page.Size * page.Page).populate('district').populate('city').sort({
            createdAt: "desc"
        });

        const estatesCount = await Estate.find({
            $or: [
                { "name.lv": { $regex: page.Search, $options: 'i' } },
                { "name.ru": { $regex: page.Search, $options: 'i' } },
                { "name.en": { $regex: page.Search, $options: 'i' } },
                { "type.lv": { $regex: page.Search, $options: 'i' } },
                { "type.ru": { $regex: page.Search, $options: 'i' } },
                { "type.en": { $regex: page.Search, $options: 'i' } },
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

const estateDelete = async (req: NextApiRequest, res: NextApiResponse) => {
    // @ts-ignore
    const token = req.headers.authorization.split(" ")[1];

    if (!token)
        return res.status(201).json({ message: "No Auth" });

    try {
        await dbConnect();

        // @ts-ignore
        const user = await jwt.verify(token, process.env.JWT_SECRET);

        if (!user.isAdmin)
            throw "user is not admin";

        const id = req.query.id;

        // VALIDATION
        if (!id || id === "undefined") {
            return res.status(400).json({ message: "Invalid data" });
        }

        const estate = await Estate.findById(id);

        // MAIN image delete
        // @ts-ignore
        const publicId = estate.mainImage.split("/").pop().split(".")[0];

        // @ts-ignore
        await cloudinary.uploader.destroy(publicId);

        // Images delete
        for (let image of estate.images) {
            // @ts-ignore
            const publicId = image.split("/").pop().split(".")[0];
            // @ts-ignore
            await cloudinary.uploader.destroy(publicId);
        }

        await Estate.findOneAndDelete({ _id: id })

        return res.status(200).json({ message: "Estate deleted!" })

    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
