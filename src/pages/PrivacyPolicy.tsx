import { motion } from "framer-motion";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
    usePageMetadata({
        title: "Privacy Policy | Forrof",
        description: "Learn how Forrof collects, uses, and safeguards your information.",
        url: window.location.href,
        type: "website",
    });

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    };

    const stagger = {
        visible: { transition: { staggerChildren: 0.1 } },
    };

    return (
        <div className="min-h-screen bg-background text-foreground pt-32 pb-20 px-6 md:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto relative">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-12"
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm uppercase tracking-widest">Back to Home</span>
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="mb-20"
                >
                    <motion.h1
                        variants={fadeInUp}
                        className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
                    >
                        Privacy Policy
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl"
                    >
                        We value your trust. This policy outlines how we handle your personal data.
                    </motion.p>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={stagger}
                    className="space-y-20"
                >
                    <motion.section variants={fadeInUp} className="prose prose-lg dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-muted-foreground max-w-none">
                        <span className="text-sm font-mono text-accent mb-4 block">01.</span>
                        <h2 className="text-3xl md:text-4xl mb-8">Data Collection & Usage</h2>

                        <p>
                            At Forrof, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclosure, and safeguard your information when you visit our website forrof.io.
                        </p>

                        <h3 className="text-2xl mt-8 mb-4">Collection of Data</h3>
                        <p>
                            We collect information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the Website or otherwise when you contact us.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground my-6">
                            <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number.</li>
                            <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed.</li>
                        </ul>

                        <h3 className="text-2xl mt-8 mb-4">Use of Your Information</h3>
                        <p>
                            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. We may use information collected about you via the Site to:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground my-6">
                            <li>Create and manage your account.</li>
                            <li>Compile anonymous statistical data and analysis for use internally or with third parties.</li>
                            <li>Email you regarding your account or order.</li>
                            <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
                        </ul>
                    </motion.section>

                    {/* Contact Block */}
                    <motion.div
                        variants={fadeInUp}
                        className="p-8 md:p-12 rounded-2xl bg-muted/30 border border-border mt-20"
                    >
                        <h3 className="text-2xl font-bold mb-4">Questions?</h3>
                        <p className="text-muted-foreground mb-6">If you have any questions about our Privacy Policy, please contact us.</p>
                        <a href="mailto:privacy@forrof.io" className="text-lg font-medium border-b border-foreground pb-0.5 hover:text-accent hover:border-accent transition-colors">
                            privacy@forrof.io
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
