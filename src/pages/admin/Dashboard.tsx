import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/services/api';

export default function Dashboard() {
    const [stats, setStats] = useState({
        jobs: 0,
        blogs: 0,
        applications: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Since we don't have a dedicated stats endpoint yet, we'll fetch lists and count
                // In a production app, this should be a single lightweight endpoint
                const [jobs, blogs, applications] = await Promise.all([
                    api.jobs.getAll().catch(() => []),
                    api.blogs.getAll().catch(() => []),
                    api.applications.getAll().catch(() => [])
                ]);

                setStats({
                    jobs: jobs.length,
                    blogs: blogs.length,
                    applications: applications.length
                });
            } catch (error) {
                console.error('Failed to load stats');
            }
        };

        fetchStats();
    }, []);

    return (
        <AdminLayout>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.jobs}</div>
                            <p className="text-xs text-muted-foreground">Active job postings</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.applications}</div>
                            <p className="text-xs text-muted-foreground">Across all jobs</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.blogs}</div>
                            <p className="text-xs text-muted-foreground">Published articles</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
