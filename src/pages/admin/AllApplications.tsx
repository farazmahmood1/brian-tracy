
import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Trash2, Loader2, Eye } from 'lucide-react';
import { toast } from 'sonner';

export default function AllApplications() {
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
    const [filterJobId, setFilterJobId] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

    const fetchApplications = async () => {
        try {
            const data = await api.applications.getAll();
            setApplications(data);
        } catch (error) {
            toast.error('Failed to load applications');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

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

    const toggleSort = () => {
        if (sortOrder === null) setSortOrder('asc');
        else if (sortOrder === 'asc') setSortOrder('desc');
        else setSortOrder(null);
    };

    const filteredApplications = applications
        .filter(app => {
            if (!filterJobId) return true;
            return app.jobId.toString().includes(filterJobId) || (app.jobTitle && app.jobTitle.toLowerCase().includes(filterJobId.toLowerCase()));
        })
        .sort((a, b) => {
            if (sortOrder === 'asc') return a.name.localeCompare(b.name);
            if (sortOrder === 'desc') return b.name.localeCompare(a.name);
            return 0;
        });

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h1 className="text-3xl font-bold">All Applications</h1>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Filter by Job ID..."
                            value={filterJobId}
                            onChange={(e) => setFilterJobId(e.target.value)}
                            className="pl-3 pr-10 py-2 border rounded-md text-sm w-64 text-muted-foreground"
                        />
                        {filterJobId && (
                            <button
                                onClick={() => setFilterJobId('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                ×
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {loading ? (
                <Loader2 className="h-8 w-8 animate-spin mx-auto" />
            ) : (
                <div className="border rounded-md">
                    <Table>
                        <TableHeader className='bg-muted'>
                            <TableRow>
                                <TableHead>Job</TableHead>
                                <TableHead onClick={toggleSort} className="cursor-pointer hover:bg-muted/50 transition-colors select-none">
                                    <div className="flex items-center gap-2">
                                        Name
                                        {sortOrder === 'asc' && <span className="text-xs">▲</span>}
                                        {sortOrder === 'desc' && <span className="text-xs">▼</span>}
                                    </div>
                                </TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Portfolio</TableHead>
                                <TableHead>CV</TableHead>
                                <TableHead>Cover Letter</TableHead>
                                <TableHead>Applied At</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className='bg-warning hover:bg-warning transition-colors'>
                            {filteredApplications.map((app) => (
                                <TableRow key={app.id}>
                                    <TableCell className="font-medium">
                                        {app.jobTitle ? (
                                            <span className="text-sm font-semibold">{app.jobTitle}</span>
                                        ) : (
                                            <span className="italic">Job #{app.jobId}</span>
                                        )}
                                    </TableCell>
                                    <TableCell>{app.name}</TableCell>
                                    <TableCell>{app.email}</TableCell>
                                    <TableCell>
                                        {app.portfolio ? (
                                            <HoverCard>
                                                <HoverCardTrigger asChild>
                                                    <a href={app.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                        Link
                                                    </a>
                                                </HoverCardTrigger>
                                                <HoverCardContent className="w-auto max-w-sm break-all">
                                                    <a href={app.portfolio} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                                                        {app.portfolio}
                                                    </a>
                                                </HoverCardContent>
                                            </HoverCard>
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
                            {filteredApplications.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                        No applications found matching your criteria
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
