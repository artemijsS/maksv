import jwt from 'jsonwebtoken';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
    const { token } = req.body;

    await dbConnect();

    try {

        const user = await jwt.verify(token, process.env.JWT_SECRET);

        const existingUser = await User.findOne({ _id: user.userId });

        if (!existingUser.isAdmin)
            throw "user is not admin"

        return res.status(200).json({ id: user.userId });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
