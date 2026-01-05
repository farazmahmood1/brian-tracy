
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../src/db/index';
import { blogs } from '../src/db/schema';
import { eq, desc } from 'drizzle-orm';
import { verifyAuth } from './_utils';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        if (req.method === 'GET') {
            const allBlogs = await db.select().from(blogs).orderBy(desc(blogs.postedDate));
            return res.status(200).json(allBlogs);
        }

        // Protected Routes
        if (!verifyAuth(req, res)) return;

        if (req.method === 'POST') {
            const newBlog = await db.insert(blogs).values(req.body).returning();
            return res.status(201).json(newBlog[0]);
        }

        if (req.method === 'PUT') {
            const { id, ...data } = req.body;
            const updatedBlog = await db.update(blogs).set(data).where(eq(blogs.id, id)).returning();
            return res.status(200).json(updatedBlog[0]);
        }

        if (req.method === 'DELETE') {
            const { id } = req.query;
            if (!id) return res.status(400).json({ error: 'ID required' });
            await db.delete(blogs).where(eq(blogs.id, Number(id)));
            return res.status(200).json({ success: true });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
