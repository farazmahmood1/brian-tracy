
import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'adminCEOforrof32112321@forrof.io';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Pakistan$123';
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkeyforadminportal123';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const token = jwt.sign({ role: 'admin', email }, JWT_SECRET, { expiresIn: '24h' });

        // Set HTTP-only cookie
        res.setHeader('Set-Cookie', `auth_token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict; Secure`);

        return res.status(200).json({ success: true, token }); // Return token as well for client-side state if needed
    }

    return res.status(401).json({ error: 'Invalid credentials' });
}
