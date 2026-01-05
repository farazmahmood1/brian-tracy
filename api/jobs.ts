
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../src/db/index';
import { jobs } from '../src/db/schema';
import { eq, desc } from 'drizzle-orm';
import { verifyAuth } from './_utils';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        if (req.method === 'GET') {
            const allJobs = await db.select().from(jobs).orderBy(desc(jobs.postedDate));
            return res.status(200).json(allJobs);
        }

        // Protected Routes
        if (!verifyAuth(req, res)) return;

        if (req.method === 'POST') {
            const newJob = await db.insert(jobs).values(req.body).returning();
            return res.status(201).json(newJob[0]);
        }

        if (req.method === 'PUT') {
            const { id, ...data } = req.body;
            const updatedJob = await db.update(jobs).set(data).where(eq(jobs.id, id)).returning();
            return res.status(200).json(updatedJob[0]);
        }

        if (req.method === 'DELETE') {
            const { id } = req.query;
            if (!id) return res.status(400).json({ error: 'ID required' });
            await db.delete(jobs).where(eq(jobs.id, Number(id)));
            return res.status(200).json({ success: true });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
