
import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Pencil, Trash2, Loader2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function AdminJobs() {
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<any | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        department: '',
        type: 'Full-time',
        location: '',
        postedDate: new Date().toISOString().split('T')[0],
        description: '',
        requirements: '',
        responsibilities: '',
    });

    const fetchJobs = async () => {
        try {
            const data = await api.jobs.getAll();
            setJobs(data);
        } catch (error) {
            toast.error('Failed to load jobs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                requirements: formData.requirements.split('\n').filter(Boolean),
                responsibilities: formData.responsibilities.split('\n').filter(Boolean),
            };

            if (editingJob) {
                await api.jobs.update({ ...payload, id: editingJob.id });
                toast.success('Job updated');
            } else {
                await api.jobs.create(payload);
                toast.success('Job created');
            }
            setIsDialogOpen(false);
            setEditingJob(null);
            resetForm();
            fetchJobs();
        } catch (error) {
            toast.error('Operation failed');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure?')) return;
        try {
            await api.jobs.delete(id);
            toast.success('Job deleted');
            fetchJobs();
        } catch (error) {
            toast.error('Delete failed');
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            department: '',
            type: 'Full-time',
            location: '',
            postedDate: new Date().toISOString().split('T')[0],
            description: '',
            requirements: '',
            responsibilities: '',
        });
    };

    const openEdit = (job: any) => {
        setEditingJob(job);
        setFormData({
            title: job.title,
            department: job.department,
            type: job.type,
            location: job.location,
            postedDate: job.postedDate,
            description: job.description,
            requirements: job.requirements.join('\n'),
            responsibilities: job.responsibilities.join('\n'),
        });
        setIsDialogOpen(true);
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Jobs</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => { setEditingJob(null); resetForm(); }}>
                            <Plus className="mr-2 h-4 w-4" /> Add Job
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingJob ? 'Edit Job' : 'New Job'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Title</Label>
                                    <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <Label>Department</Label>
                                    <Input value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <Label>Type</Label>
                                    <Input value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <Label>Location</Label>
                                    <Input value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
                            </div>
                            <div className="space-y-2">
                                <Label>Requirements (one per line)</Label>
                                <Textarea className="min-h-[100px]" value={formData.requirements} onChange={e => setFormData({ ...formData, requirements: e.target.value })} required />
                            </div>
                            <div className="space-y-2">
                                <Label>Responsibilities (one per line)</Label>
                                <Textarea className="min-h-[100px]" value={formData.responsibilities} onChange={e => setFormData({ ...formData, responsibilities: e.target.value })} required />
                            </div>
                            <Button type="submit" className="w-full">Save</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {loading ? (
                <Loader2 className="h-8 w-8 animate-spin mx-auto" />
            ) : (
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {jobs.map((job) => (
                                <TableRow key={job.id}>
                                    <TableCell className="font-medium">{job.title}</TableCell>
                                    <TableCell>{job.department}</TableCell>
                                    <TableCell>{job.location}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="ghost" size="icon" onClick={() => openEdit(job)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Link to={`/admin/jobs/${job.id}/applications`}>
                                            <Button variant="ghost" size="icon" title="View Applications">
                                                <Users className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(job.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {jobs.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                        No jobs found
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
