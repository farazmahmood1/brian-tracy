
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
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
                            <div className="text-2xl font-bold">--</div>
                            <p className="text-xs text-muted-foreground">Active job postings</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">--</div>
                            <p className="text-xs text-muted-foreground">Published articles</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
