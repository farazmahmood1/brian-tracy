
const API_BASE = '/api';

export const api = {
    auth: {
        login: async (credentials: any) => {
            const res = await fetch(`${API_BASE}/auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });
            if (!res.ok) throw new Error('Login failed');
            return res.json();
        },
    },
    jobs: {
        getAll: async () => {
            const res = await fetch(`${API_BASE}/jobs`);
            if (!res.ok) throw new Error('Failed to fetch jobs');
            return res.json();
        },
        create: async (data: any) => {
            const res = await fetch(`${API_BASE}/jobs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error('Failed to create job');
            return res.json();
        },
        update: async (data: any) => {
            const res = await fetch(`${API_BASE}/jobs`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error('Failed to update job');
            return res.json();
        },
        delete: async (id: number) => {
            const res = await fetch(`${API_BASE}/jobs?id=${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete job');
            return res.json();
        },
    },
    blogs: {
        getAll: async () => {
            const res = await fetch(`${API_BASE}/blogs`);
            if (!res.ok) throw new Error('Failed to fetch blogs');
            return res.json();
        },
        create: async (data: any) => {
            const res = await fetch(`${API_BASE}/blogs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error('Failed to create blog');
            return res.json();
        },
        update: async (data: any) => {
            const res = await fetch(`${API_BASE}/blogs`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error('Failed to update blog');
            return res.json();
        },
        delete: async (id: number) => {
            const res = await fetch(`${API_BASE}/blogs?id=${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete blog');
            return res.json();
        },
    },
};
