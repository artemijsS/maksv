import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    const { token } = req.body;


    try {

        const user = await jwt.verify(token, process.env.JWT_SECRET);

        if (!user.isAdmin)
            throw "user is not admin"

        return res.status(200).json({ id: user.userId });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
