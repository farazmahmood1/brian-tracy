import type { Job, BlogPost, JobApplication, LoginCredentials } from "@/types/api";

const API_BASE = import.meta.env.VITE_API_BASE;
const TOKEN_KEY = "admin_token";

export const authToken = {
    get: () => localStorage.getItem(TOKEN_KEY),
    set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
    clear: () => localStorage.removeItem(TOKEN_KEY),
};

const authHeaders = (): Record<string, string> => {
    const token = authToken.get();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
    auth: {
        login: async (credentials: LoginCredentials) => {
            const res = await fetch(`${API_BASE}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });
            if (!res.ok) throw new Error('Login failed');
            const data = await res.json();
            if (!data.token) throw new Error('Login failed');
            authToken.set(data.token);
            return data;
        },
        me: async () => {
            return fetch(`${API_BASE}/me`, { headers: authHeaders() });
        },
    },

    jobs: {
        getAll: async (): Promise<Job[]> => {
            const res = await fetch(`${API_BASE}/jobs`);
            if (!res.ok) throw new Error('Failed to fetch jobs');
            return res.json();
        },
        create: async (data: Omit<Job, 'id' | 'createdAt'>) => {
            const res = await fetch(`${API_BASE}/jobs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...authHeaders() },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error('Failed to create job');
            return res.json();
        },
        update: async (data: Partial<Job> & { id: number }) => {
            const res = await fetch(`${API_BASE}/jobs/${data.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...authHeaders() },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error('Failed to update job');
            return res.json();
        },
        getOne: async (idOrSlug: string | number): Promise<Job> => {
            const res = await fetch(`${API_BASE}/jobs/${idOrSlug}`);
            if (!res.ok) throw new Error('Failed to fetch job');
            return res.json();
        },
        delete: async (id: number) => {
            const res = await fetch(`${API_BASE}/jobs/${id}`, {
                method: 'DELETE',
                headers: authHeaders(),
            });
            if (!res.ok) throw new Error('Failed to delete job');
            return res.json();
        },
        apply: async (data: FormData) => {
            const res = await fetch(`${API_BASE}/job-applications`, {
                method: 'POST',
                body: data,
            });
            if (!res.ok) throw new Error('Failed to submit application');
            return res.json();
        },
    },
    blogs: {
        getAll: async (): Promise<BlogPost[]> => {
            const res = await fetch(`${API_BASE}/fetch-blog-posts`);
            if (!res.ok) throw new Error('Failed to fetch blogs');
            return res.json();
        },
        create: async (data: FormData) => {
            const res = await fetch(`${API_BASE}/insertblogpost`, {
                method: 'POST',
                headers: authHeaders(),
                body: data,
            });
            if (!res.ok) throw new Error('Failed to create blog');
            return res.json();
        },
        update: async (data: FormData) => {
            const id = data.get('id');
            const res = await fetch(`${API_BASE}/update-blog-post/${id}`, {
                method: 'PUT',
                headers: authHeaders(),
                body: data,
            });
            if (!res.ok) throw new Error('Failed to update blog');
            return res.json();
        },
        getOne: async (id: number | string): Promise<BlogPost> => {
            const res = await fetch(`${API_BASE}/fetch-blog-post/${id}`);
            if (!res.ok) throw new Error('Failed to fetch blog post');
            return res.json();
        },
        getBySlug: async (slug: string): Promise<BlogPost> => {
            const res = await fetch(`${API_BASE}/fetch-blog-post-by-slug/${slug}`);
            if (!res.ok) throw new Error('Failed to fetch blog post');
            return res.json();
        },
        delete: async (id: number) => {
            const res = await fetch(`${API_BASE}/delete-blog-post/${id}`, {
                method: 'DELETE',
                headers: authHeaders(),
            });
            if (!res.ok) throw new Error('Failed to delete blog');
            return res.json();
        },
    },
    applications: {
        getAll: async (): Promise<JobApplication[]> => {
            const res = await fetch(`${API_BASE}/job-applications`, { headers: authHeaders() });
            if (!res.ok) throw new Error('Failed to fetch applications');
            return res.json();
        },
        getByJobId: async (jobId: number): Promise<JobApplication[]> => {
            const res = await fetch(`${API_BASE}/job-applications/${jobId}`, { headers: authHeaders() });
            if (!res.ok) throw new Error('Failed to fetch applications');
            return res.json();
        },
        delete: async (id: number) => {
            const res = await fetch(`${API_BASE}/job-applications/${id}`, {
                method: 'DELETE',
                headers: authHeaders(),
            });
            if (!res.ok) throw new Error('Failed to delete application');
            return res.json();
        },
    }
};
