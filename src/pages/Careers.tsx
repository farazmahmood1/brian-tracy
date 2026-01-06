import { motion } from "framer-motion";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { ArrowUpRight, Globe, Clock, ArrowRight } from "lucide-react";
import { Magnetic } from "@/components/AnimationComponents";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "@/services/api";

const Careers = () => {
    const [jobs, setJobs] = useState<any[]>([]);
    usePageMetadata({
        title: "Careers | Forrof",
        description: "Join our team of creators, thinkers, and builders. Explore open positions at Forrof.",
        url: window.location.href,
        type: "website",
    });

    useEffect(() => {
        api.jobs.getAll().then(setJobs).catch(console.error);
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground pt-32 pb-20">
            {/* Hero Section */}
            <div className="px-6 md:px-12 lg:px-24 mb-32">
                <div className="max-w-[1800px] mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-12"
                    >
                        Join the <br />
                        <span className="text-muted-foreground">collective.</span>
                    </motion.h1>

                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-xl"
                        >
                            We are always looking for exceptional talent to join our team.
                            If you are passionate about design, technology, and creating impactful
                            digital experiences, we want to hear from you.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="bg-accent/5 p-8 rounded-2xl border border-accent/10"
                        >
                            <h3 className="text-lg font-semibold mb-2">Don't see a fit?</h3>
                            <p className="text-muted-foreground mb-6">
                                We are always interested in meeting new people.
                                Send us your portfolio and tell us why you want to work with us.
                            </p>
                            <a href="mailto:careers@forrof.io" className="inline-flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors">
                                Email us <ArrowRight size={16} />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Job Listings */}
            <section className="px-6 md:px-12 lg:px-24">
                <div className="max-w-[1400px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mb-12 border-b border-border pb-4 flex justify-between items-end"
                    >
                        <h2 className="text-xl font-mono uppercase tracking-widest">Open Positions</h2>
                        <span className="text-muted-foreground">{jobs.length < 10 ? `0${jobs.length}` : jobs.length}</span>
                    </motion.div>

                    <div className="space-y-4">
                        {jobs.map((job, index) => (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative"
                            >
                                <Link to={`/careers/${job.title.toLowerCase().replace(/ /g, '-')}`} className="block">
                                    <div className="p-8 md:p-12 rounded-2xl bg-muted/20 border border-white/5 hover:border-accent/20 transition-all duration-500 hover:bg-muted/40 group-hover:scale-[1.01]">
                                        <div className="grid md:grid-cols-12 gap-8 items-center">
                                            {/* Title & Dept */}
                                            <div className="md:col-span-5">
                                                <h3 className="text-3xl font-bold mb-2 group-hover:text-accent transition-colors">{job.title}</h3>
                                                <span className="text-muted-foreground">{job.department}</span>
                                            </div>

                                            {/* Details */}
                                            <div className="md:col-span-4 flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <Clock size={16} />
                                                    {job.type}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Globe size={16} />
                                                    {job.location}
                                                </div>
                                            </div>

                                            {/* Arrow */}
                                            <div className="md:col-span-3 flex md:justify-end">
                                                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-background transition-all duration-300">
                                                    <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-300" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                        {jobs.length === 0 && (
                            <div className="text-center py-12 text-muted-foreground">
                                No open positions at the moment.
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Careers;
