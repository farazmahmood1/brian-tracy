
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trash2, Loader2, ArrowLeft, Eye } from 'lucide-react';
import { toast } from 'sonner';

export default function JobApplications() {
    const { jobId } = useParams();
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

    const fetchApplications = async () => {
        try {
            if (!jobId) return;
            const data = await api.applications.getByJobId(Number(jobId));
            setApplications(data);
        } catch (error) {
            toast.error('Failed to load applications');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, [jobId]);

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this application?')) return;
        try {
            await api.applications.delete(id);
            toast.success('Application deleted');
            fetchApplications();
        } catch (error) {
            toast.error('Delete failed');
        }
    };

    return (
        <AdminLayout>
            <div className="flex items-center gap-4 mb-6">
                <Link to="/admin/jobs">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold">Applications</h1>
            </div>

            {loading ? (
                <Loader2 className="h-8 w-8 animate-spin mx-auto" />
            ) : (
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Portfolio</TableHead>
                                <TableHead>CV</TableHead>
                                <TableHead>Cover Letter</TableHead>
                                <TableHead>Applied At</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applications.map((app) => (
                                <TableRow key={app.id}>
                                    <TableCell className="font-medium">{app.name}</TableCell>
                                    <TableCell>{app.email}</TableCell>
                                    <TableCell>
                                        {app.portfolio ? (
                                            <a href={app.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                Link
                                            </a>
                                        ) : '-'}
                                    </TableCell>
                                    <TableCell>
                                        {app.cvUrl ? (
                                            <a href={app.cvUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                View CV
                                            </a>
                                        ) : '-'}
                                    </TableCell>
                                    <TableCell>
                                        {app.coverLetter && (
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="sm" onClick={() => setSelectedLetter(app.coverLetter)}>
                                                        <Eye className="h-4 w-4 mr-2" /> View
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Cover Letter</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="mt-4 whitespace-pre-wrap">
                                                        {selectedLetter}
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(app.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(app.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {applications.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                        No applications found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}
        </AdminLayout>
    );
}
