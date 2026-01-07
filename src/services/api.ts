const API_BASE = 'https://morgan-shell.vercel.app/api/v1';

export const api = {
    auth: {
        login: async (credentials: any) => {
            const res = await fetch(`${API_BASE}/login`, {
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
            const res = await fetch(`${API_BASE}/jobs/${data.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error('Failed to update job');
            return res.json();
        },
        getOne: async (idOrSlug: string | number) => {
            const res = await fetch(`${API_BASE}/jobs/${idOrSlug}`);
            if (!res.ok) throw new Error('Failed to fetch job');
            return res.json();
        },
        delete: async (id: number) => {
            const res = await fetch(`${API_BASE}/jobs/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete job');
            return res.json();
        },
        apply: async (data: any) => {
            const isFormData = data instanceof FormData;
            const headers: Record<string, string> = isFormData ? {} : { 'Content-Type': 'application/json' };

            const res = await fetch(`${API_BASE}/job-applications`, {
                method: 'POST',
                headers,
                body: isFormData ? data : JSON.stringify(data),
            });
            if (!res.ok) throw new Error('Failed to submit application');
            return res.json();
        },
    },
    blogs: {
        getAll: async () => {
            const res = await fetch(`${API_BASE}/fetch-blog-posts`);
            if (!res.ok) throw new Error('Failed to fetch blogs');
            return res.json();
        },
        create: async (data: any) => {
            const isFormData = data instanceof FormData;
            const headers: Record<string, string> = isFormData ? {} : { 'Content-Type': 'application/json' };

            const res = await fetch(`${API_BASE}/insertblogpost`, {
                method: 'POST',
                headers,
                body: isFormData ? data : JSON.stringify(data),
            });
            if (!res.ok) throw new Error('Failed to create blog');
            return res.json();
        },
        update: async (data: any) => {
            const isFormData = data instanceof FormData;
            const headers: Record<string, string> = isFormData ? {} : { 'Content-Type': 'application/json' };

            const res = await fetch(`${API_BASE}/update-blog-post/${data.id}`, {
                method: 'PUT',
                headers,
                body: isFormData ? data : JSON.stringify(data),
            });
            if (!res.ok) throw new Error('Failed to update blog');
            return res.json();
        },
        delete: async (id: number) => {
            const res = await fetch(`${API_BASE}/delete-blog-post/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete blog');
            return res.json();
        },
    },
    applications: {
        getAll: async () => {
            const res = await fetch(`${API_BASE}/job-applications`);
            if (!res.ok) throw new Error('Failed to fetch applications');
            return res.json();
        },
        getByJobId: async (jobId: number) => {
            const res = await fetch(`${API_BASE}/job-applications/${jobId}`);
            if (!res.ok) throw new Error('Failed to fetch applications');
            return res.json();
        },
        delete: async (id: number) => {
            const res = await fetch(`${API_BASE}/applications/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete application');
            return res.json();
        },
    }
};
