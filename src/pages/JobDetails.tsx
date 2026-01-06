import { motion } from "framer-motion";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/services/api";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { ArrowLeft, Clock, Globe, ArrowUpRight, CheckCircle2, Upload } from "lucide-react";
import { Magnetic, LineReveal } from "@/components/AnimationComponents";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const JobDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const { data: job, isLoading, isError } = useQuery({
        queryKey: ['job', slug],
        queryFn: async () => {
            const allJobs = await api.jobs.getAll();
            const foundJob = allJobs.find((j: any) => {
                const jobSlug = j.title.toLowerCase().replace(/ /g, '-');
                return jobSlug === slug;
            });

            if (foundJob) return foundJob;

            if (!isNaN(Number(slug))) {
                return api.jobs.getOne(slug!);
            }

            throw new Error("Job not found");
        },
        enabled: !!slug
    });

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        portfolio: "",
        coverLetter: "",
    });
    const [cvFile, setCvFile] = useState<File | null>(null);

    usePageMetadata({
        title: job ? `${job.title} | Careers` : "Job Not Found",
        description: job ? job.description : "Job details",
        url: window.location.href,
        type: "article",
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-foreground"></div>
            </div>
        );
    }

    if (isError || !job) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Job Not Found</h1>
                    <Link to="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                        Back to Careers
                    </Link>
                </div>
            </div>
        );
    }

    const applicationMutation = useMutation({
        mutationFn: (data: any) => api.jobs.apply(data),
        onSuccess: () => {
            toast({
                title: "Application Sent!",
                description: "We'll review your application and get back to you soon.",
            });
            setFormData({ name: "", email: "", portfolio: "", coverLetter: "" });
            setCvFile(null);
        },
        onError: () => {
            toast({
                title: "Application Failed",
                description: "Something went wrong. Please try again.",
                variant: "destructive"
            });
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!cvFile) {
            toast({
                title: "CV Required",
                description: "Please upload your CV/Resume to proceed.",
                variant: "destructive"
            });
            return;
        }

        const submissionData = new FormData();
        submissionData.append('jobId', String(job.id));
        submissionData.append('name', formData.name);
        submissionData.append('email', formData.email);
        if (formData.portfolio) submissionData.append('portfolio', formData.portfolio);
        if (formData.coverLetter) submissionData.append('coverLetter', formData.coverLetter);
        submissionData.append('cv', cvFile);

        applicationMutation.mutate(submissionData);
    };

    return (
        <div className="min-h-screen bg-background text-foreground pt-32 pb-20">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-12"
                >
                    <Link
                        to="/careers"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm uppercase tracking-widest">Back to Careers</span>
                    </Link>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-20">
                    {/* Job Details Content */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Header */}
                            <span className="text-accent text-sm font-mono uppercase tracking-widest mb-4 block">
                                {job.department}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">
                                {job.title}
                            </h1>

                            <div className="flex flex-wrap gap-6 text-muted-foreground mb-12">
                                <div className="flex items-center gap-2">
                                    <Clock size={18} />
                                    {job.type}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Globe size={18} />
                                    {job.location}
                                </div>
                                <div className="text-sm bg-muted/30 px-3 py-1 rounded-full border border-border">
                                    Posted {job.postedDate}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-p:text-muted-foreground max-w-none mb-12">
                                <p className="text-xl leading-relaxed">{job.description}</p>
                            </div>

                            <LineReveal className="h-px bg-border w-full mb-12" />

                            {/* Responsibilities */}
                            {job.responsibilities && (
                                <div className="mb-12">
                                    <h3 className="text-2xl font-bold mb-6">What you'll do</h3>
                                    <ul className="space-y-4">
                                        {job.responsibilities.map((item, i) => (
                                            <li key={i} className="flex gap-4 text-muted-foreground">
                                                <CheckCircle2 size={24} className="text-accent shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Requirements */}
                            {job.requirements && (
                                <div className="mb-12">
                                    <h3 className="text-2xl font-bold mb-6">What we're looking for</h3>
                                    <ul className="space-y-4">
                                        {job.requirements.map((item, i) => (
                                            <li key={i} className="flex gap-4 text-muted-foreground">
                                                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Application Form - Sticky Sidebar */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="bg-muted/10 border border-border rounded-2xl p-8 lg:sticky lg:top-32"
                        >
                            <h3 className="text-2xl font-bold mb-2">Apply for this role</h3>
                            <p className="text-muted-foreground mb-8">Show us what you're made of.</p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {[
                                    { name: "name", label: "Full Name", type: "text", placeholder: "Jane Doe" },
                                    { name: "email", label: "Email Address", type: "email", placeholder: "jane@example.com" },
                                    { name: "portfolio", label: "Portfolio / LinkedIn URL", type: "url", placeholder: "https://..." },
                                ].map((field) => (
                                    <div key={field.name}>
                                        <label
                                            className="block text-sm font-medium mb-2 transition-colors"
                                            style={{ color: focusedField === field.name ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" }}
                                        >
                                            {field.label}
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={field.type}
                                                required
                                                value={formData[field.name as keyof typeof formData]}
                                                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                                onFocus={() => setFocusedField(field.name)}
                                                onBlur={() => setFocusedField(null)}
                                                placeholder={field.placeholder}
                                                className="w-full bg-background border-b-2 border-border py-3 focus:outline-none transition-colors placeholder:text-muted-foreground/30"
                                            />
                                            <motion.div
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground origin-left"
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: focusedField === field.name ? 1 : 0 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </div>
                                    </div>
                                ))}

                                {/* CV Upload */}
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-muted-foreground">
                                        CV / Resume
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="file"
                                            id="cv-upload"
                                            accept=".pdf,.doc,.docx"
                                            className="hidden"
                                            onChange={(e) => {
                                                if (e.target.files?.[0]) {
                                                    setCvFile(e.target.files[0]);
                                                }
                                            }}
                                        />
                                        <label
                                            htmlFor="cv-upload"
                                            className={`flex items-center justify-center gap-3 w-full p-4 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 ${cvFile
                                                ? "border-foreground/50 bg-foreground/5"
                                                : "border-border hover:border-foreground/50 hover:bg-muted/30"
                                                }`}
                                        >
                                            <Upload size={20} className={cvFile ? "text-foreground" : "text-muted-foreground"} />
                                            <span className={`text-sm font-medium ${cvFile ? "text-foreground" : "text-muted-foreground"}`}>
                                                {cvFile ? cvFile.name : "Upload CV (PDF, DOC/X)"}
                                            </span>
                                        </label>
                                        {cvFile && (
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setCvFile(null);
                                                }}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-destructive/10 hover:text-destructive rounded-full transition-colors"
                                            >
                                                <div className="w-4 h-4 relative">
                                                    <div className="absolute inset-0 bg-current rotate-45 h-0.5 top-1/2 -translate-y-[1px]" />
                                                    <div className="absolute inset-0 bg-current -rotate-45 h-0.5 top-1/2 -translate-y-[1px]" />
                                                </div>
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label
                                        className="block text-sm font-medium mb-2 transition-colors"
                                        style={{ color: focusedField === "coverLetter" ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" }}
                                    >
                                        Cover Letter (Optional)
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            rows={4}
                                            value={formData.coverLetter}
                                            onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                                            onFocus={() => setFocusedField("coverLetter")}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="Tell us why you're a great fit..."
                                            className="w-full bg-background border-b-2 border-border py-3 focus:outline-none transition-colors resize-none placeholder:text-muted-foreground/30"
                                        />
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground origin-left"
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: focusedField === "coverLetter" ? 1 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                </div>

                                <Magnetic strength={0.1}>
                                    <button
                                        type="submit"
                                        disabled={applicationMutation.isPending}
                                        className="w-full flex items-center justify-center gap-2 py-4 mt-4 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span>{applicationMutation.isPending ? 'Submitting...' : 'Submit Application'}</span>
                                        {!applicationMutation.isPending && (
                                            <ArrowUpRight size={18} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                                        )}
                                    </button>
                                </Magnetic>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
