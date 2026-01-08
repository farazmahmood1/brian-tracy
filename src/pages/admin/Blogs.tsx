
import { useEffect, useRef, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Pencil, Trash2, Loader2, Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import ReactQuill from 'react-quill-new';
import "react-quill-new/dist/quill.snow.css";

export default function AdminBlogs() {
    const quillRef = useRef(null);
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<any | null>(null);

    const [imageFile, setImageFile] = useState<File | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        author: '',
        postedDate: new Date().toISOString().split('T')[0],
        content: '',
        readTime: '',
        stack: '',
        canonicalUrl: '',
        metaTitle: '',
        metaDescription: '',
        metaKeywords: '',
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
            const submitData = new FormData();
            submitData.append('title', formData.title);
            submitData.append('slug', formData.slug);
            submitData.append('canonical_tag', formData.slug);
            submitData.append('meta_title', formData.metaTitle);
            submitData.append('author', formData.author);
            submitData.append('meta_description', formData.metaDescription);
            submitData.append('meta_keywords', formData.metaKeywords);
            submitData.append('meta_tags', formData.metaKeywords);
            submitData.append('content', formData.content);
            submitData.append('upload_date', formData.postedDate);
            submitData.append('read_time', formData.readTime);
            submitData.append('stack', formData.stack);


            if (imageFile) {
                submitData.append('blogimage', imageFile);
            }

            if (editingBlog) {
                submitData.append('id', String(editingBlog.id));
                await api.blogs.update(submitData);
                toast.success('Blog updated');
            } else {
                await api.blogs.create(submitData);
                toast.success('Blog created');
            }
            setIsDialogOpen(false);
            setIsDialogOpen(false);
            setEditingBlog(null);
            setImageFile(null);
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
            slug: '',
            author: '',
            postedDate: new Date().toISOString().split('T')[0],
            content: '',
            readTime: '',
            stack: '',
            canonicalUrl: '',
            metaTitle: '',
            metaDescription: '',
            metaKeywords: '',
        });
        setImageFile(null);
    };

    const openEdit = (blog: any) => {
        setEditingBlog(blog);
        setFormData({
            title: blog.title,
            slug: blog.slug || '',
            author: blog.author,
            postedDate: blog.postedDate,
            content: blog.content,
            readTime: blog.readTime || '5',
            stack: blog.stack || '',
            canonicalUrl: blog.canonicalUrl || '',
            metaTitle: blog.metaTitle || '',
            metaDescription: blog.metaDescription || '',
            metaKeywords: blog.metaKeywords || '',
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
                                    <Input
                                        value={formData.title}
                                        onChange={e => {
                                            const title = e.target.value;
                                            setFormData(prev => ({
                                                ...prev,
                                                title,
                                                slug: prev.slug || title.toLowerCase().replace(/ /g, '-')
                                            }))
                                        }}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Slug</Label>
                                    <Input value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <Label>Author</Label>
                                    <Input value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <Label>Read Time (write time in minutes)</Label>
                                    <Input type="number" value={formData.readTime} onChange={e => setFormData({ ...formData, readTime: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Stack</Label>
                                    <Input value={formData.stack} onChange={e => setFormData({ ...formData, stack: e.target.value })} />
                                </div>
                            </div>

                            {/* SEO Fields */}
                            <div className="space-y-4 border p-4 rounded-md">
                                <h3 className="font-medium text-sm">SEO Settings</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Meta Title</Label>
                                        <Input value={formData.metaTitle} onChange={e => setFormData({ ...formData, metaTitle: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Canonical URL</Label>
                                        <Input value={formData.canonicalUrl} onChange={e => setFormData({ ...formData, canonicalUrl: e.target.value })} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Meta Description</Label>
                                    <Textarea value={formData.metaDescription} onChange={e => setFormData({ ...formData, metaDescription: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Meta Keywords</Label>
                                    <Input value={formData.metaKeywords} onChange={e => setFormData({ ...formData, metaKeywords: e.target.value })} placeholder="comma, separated, keywords" />
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div className="space-y-2">
                                <Label>Featured Image</Label>
                                <div className="flex items-center gap-4">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files?.[0]) setImageFile(e.target.files[0]);
                                        }}
                                        className="cursor-pointer"
                                    />
                                    {imageFile && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setImageFile(null)}
                                        >
                                            <X className="h-4 w-4 mr-2" /> Clear
                                        </Button>
                                    )}
                                </div>
                                {imageFile && <p className="text-sm text-muted-foreground">Selected: {imageFile.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label>Content</Label>
                                <div className="h-[300px] mb-12">
                                    <ReactQuill
                                        theme="snow"
                                        value={formData.content}
                                        onChange={(content) => setFormData({ ...formData, content })}
                                        className="h-[250px]"
                                    />
                                </div>
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
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {blogs.map((blog) => (
                                <TableRow key={blog.id}>
                                    <TableCell className="font-medium">{blog.title}</TableCell>
                                    <TableCell>{blog.uploadDate}</TableCell>
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
