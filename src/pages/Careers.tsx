import { motion } from "framer-motion";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { ArrowUpRight, Globe, Clock, ArrowRight } from "lucide-react";
import { Magnetic } from "@/components/AnimationComponents";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import type { Job } from "@/types/api";

const Careers = () => {
    const [jobs, setJobs] = useState<Job[]>([]);

    usePageMetadata({
        title: "Careers | Forrof",
        description: "Join our team of creators, thinkers, and builders. Explore open positions at Forrof.",
        url: window.location.href,
        type: "website",
    });

    useEffect(() => {
        let cancelled = false;
        api.jobs.getAll().then(data => {
            if (!cancelled) setJobs(data);
        }).catch(() => {
            // Jobs API unavailable — empty list shown
        });
        return () => { cancelled = true; };
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* Hero Section */}
            <motion.section
                className="relative min-h-[70vh] md:min-h-screen flex items-end section-padding pb-16 md:pb-24 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div
                        className="absolute top-[calc(50%-350px)] right-0 w-[700px] h-[700px] rounded-full blur-[130px] opacity-70"
                        style={{ background: "rgba(0, 212, 170, 0.08)" }}
                    />
                    <div
                        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[50px] opacity-50"
                        style={{ background: "rgba(18, 107, 102, 0.1)" }}
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background z-10" />

                <motion.div className="relative z-20 max-w-[1800px] mx-auto w-full">
                    <motion.span
                        className="inline-block text-xs uppercase tracking-[0.3em] mb-8"
                        style={{ color: "#00d4aa" }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        We're hiring
                    </motion.span>
                    <div className="overflow-hidden mb-6">
                        <motion.h1
                            className="text-[13vw] md:text-[10vw] font-bold leading-[0.88] tracking-tighter"
                            style={{
                                background: "linear-gradient(135deg, #ffffff 0%, #48f0e7 30%, #00d4aa 60%, #126b66 100%)",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                color: "transparent",
                                backgroundSize: "200% 200%",
                            }}
                            initial={{ y: "110%", backgroundPosition: "0% 50%" }}
                            animate={{ y: 0, backgroundPosition: "100% 50%" }}
                            transition={{
                                y: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 },
                                backgroundPosition: { duration: 3, ease: "easeInOut", delay: 1, repeat: Infinity, repeatType: "reverse" },
                            }}
                        >
                            Join the Team
                        </motion.h1>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-10">
                        <motion.p
                            className="text-lg md:text-2xl max-w-xl leading-relaxed"
                            style={{ color: "#48f0e7" }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            We're always looking for exceptional people who are passionate about building great software and digital experiences.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <Magnetic strength={0.15}>
                                <a
                                    href="mailto:careers@forrof.io"
                                    className="inline-flex items-center gap-3 px-8 py-4 border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-foreground transition-colors font-medium whitespace-nowrap"
                                >
                                    Email us directly <ArrowRight size={16} />
                                </a>
                            </Magnetic>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.section>

            {/* Job Listings */}
            <section className="section-forced-dark px-6 md:px-12 lg:px-24 py-20 mb-0">
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
                                    <div className="p-8 md:p-12 rounded-2xl bg-foreground/5 border border-border hover:border-accent/40 transition-all duration-500 hover:bg-foreground/10 group-hover:scale-[1.01]">
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
