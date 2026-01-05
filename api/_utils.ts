
import jwt from 'jsonwebtoken';
import { VercelRequest, VercelResponse } from '@vercel/node';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkeyforadminportal123';

export const verifyAuth = (req: VercelRequest, res: VercelResponse) => {
    const token = req.cookies.auth_token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ error: 'Unauthorized: No token provided' });
        return false;
    }

    try {
        jwt.verify(token, JWT_SECRET);
        return true;
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
        return false;
    }
};
