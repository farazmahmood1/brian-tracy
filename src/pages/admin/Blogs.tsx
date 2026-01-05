
import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminBlogs() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<any | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        postedDate: new Date().toISOString().split('T')[0],
        content: '',
        imageUrl: '',
        readTime: '5 min read',
    });

    const fetchBlogs = async () => {
        try {
            const data = await api.blogs.getAll();
            setBlogs(data);
        } catch (error) {
            toast.error('Failed to load blogs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingBlog) {
                await api.blogs.update({ ...formData, id: editingBlog.id });
                toast.success('Blog updated');
            } else {
                await api.blogs.create(formData);
                toast.success('Blog created');
            }
            setIsDialogOpen(false);
            setEditingBlog(null);
            resetForm();
            fetchBlogs();
        } catch (error) {
            toast.error('Operation failed');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure?')) return;
        try {
            await api.blogs.delete(id);
            toast.success('Blog deleted');
            fetchBlogs();
        } catch (error) {
            toast.error('Delete failed');
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            author: '',
            postedDate: new Date().toISOString().split('T')[0],
            content: '',
            imageUrl: '',
            readTime: '5 min read',
        });
    };

    const openEdit = (blog: any) => {
        setEditingBlog(blog);
        setFormData({
            title: blog.title,
            author: blog.author,
            postedDate: blog.postedDate,
            content: blog.content,
            imageUrl: blog.imageUrl || '',
            readTime: blog.readTime || '5 min read',
        });
        setIsDialogOpen(true);
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Blogs</h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => { setEditingBlog(null); resetForm(); }}>
                            <Plus className="mr-2 h-4 w-4" /> Add Blog
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingBlog ? 'Edit Blog' : 'New Blog'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Title</Label>
                                    <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <Label>Author</Label>
                                    <Input value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <Label>Read Time</Label>
                                    <Input value={formData.readTime} onChange={e => setFormData({ ...formData, readTime: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Image URL</Label>
                                    <Input value={formData.imageUrl} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Content (Markdown)</Label>
                                <Textarea className="min-h-[200px]" value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} required />
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
                                <TableHead>Author</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {blogs.map((blog) => (
                                <TableRow key={blog.id}>
                                    <TableCell className="font-medium">{blog.title}</TableCell>
                                    <TableCell>{blog.author}</TableCell>
                                    <TableCell>{blog.postedDate}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="ghost" size="icon" onClick={() => openEdit(blog)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(blog.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {blogs.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                        No blogs found
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
