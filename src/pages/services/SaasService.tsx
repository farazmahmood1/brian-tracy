import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { LineReveal, Magnetic } from "@/components/AnimationComponents";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useNavigate } from "react-router-dom";

const challenges = [
  { issue: "Lack of transparency", benefit: "Clear communication at every stage — you always know what's happening and why." },
  { issue: "No proper post-development support", benefit: "Dedicated post-launch support to keep your SaaS healthy and growing." },
  { issue: "Insufficient alignment with real business needs", benefit: "Deep business immersion so we build what actually moves your metrics." },
];

const serviceCards = [
  { num: "01", title: "Enterprise Application Development", desc: "Scalable, secure enterprise-grade applications built to handle complex workflows and high user volumes." },
  { num: "02", title: "Enterprise Software Development", desc: "Custom software engineered around your business processes, integrations, and compliance requirements." },
  { num: "03", title: "Custom AI/ML Solutions", desc: "AI-powered features and ML pipelines embedded natively into your SaaS product." },
  { num: "04", title: "Digital Transformation", desc: "Modernize legacy systems and processes into cloud-native SaaS platforms that scale." },
  { num: "05", title: "Cross-platform SaaS Solutions", desc: "Unified product experiences across web, mobile, and desktop from a single codebase." },
  { num: "06", title: "End-to-end SaaS Product Development", desc: "From concept to launch: product strategy, design, development, and growth engineering under one roof." },
];

const features = [
  { num: "01", title: "Rapid Launch", desc: "Ship a working MVP in as little as 4 weeks so you can start acquiring users and validating assumptions fast." },
  { num: "02", title: "Modular Architecture", desc: "Build once, evolve easily. Every feature is an independent module you can swap, extend, or deprecate without rework." },
  { num: "03", title: "Enterprise Security", desc: "SSO/SAML, end-to-end encryption, role-based access control, and SOC 2-ready audit trails by default." },
  { num: "04", title: "Cloud-Native Approach", desc: "Containers, Kubernetes, and managed cloud services for elastic scaling and zero-downtime deployments." },
  { num: "05", title: "Product Analytics Built-in", desc: "Event tracking, funnel analysis, and retention dashboards embedded from day one so you ship with insight." },
  { num: "06", title: "Dedicated Team", desc: "A cross-functional squad — PM, designer, engineers, QA — aligned to your roadmap and delivery cadence." },
];

const processSteps = [
  { num: "01", title: "Discovery & Inception", desc: "Align on goals, users, constraints, and success criteria through structured workshops and stakeholder interviews." },
  { num: "02", title: "Design Phase", desc: "UX research, wireframes, and high-fidelity UI systems that balance beauty with conversion." },
  { num: "03", title: "Development", desc: "Sprint-based engineering with weekly demos, code reviews, and continuous integration." },
  { num: "04", title: "Testing", desc: "Automated test suites, exploratory QA, performance benchmarking, and security audits." },
  { num: "05", title: "Deployment", desc: "Production-grade launch with blue-green deployments, rollback plans, and real-time monitoring." },
  { num: "06", title: "Maintenance", desc: "Ongoing feature development, dependency updates, infrastructure optimization, and incident response." },
];

const domains = [
  {
    num: "01",
    title: "Logistics & Transportation",
    desc: "We build route optimisation engines, real-time fleet tracking, driver management portals, and end-to-end supply chain visibility platforms. Integrations with shipping carriers, warehouse systems, and ERP ensure seamless operations from dispatch to delivery.",
  },
  {
    num: "02",
    title: "Legal Tech",
    desc: "Our legal tech platforms cover case management, document automation, time tracking, client billing, and compliance workflows. We build secure, GDPR-compliant systems tailored to law firms, courts, and legal service providers of all sizes.",
  },
  {
    num: "03",
    title: "Health & Wellness",
    desc: "HIPAA-compliant platforms for appointment booking, telehealth consultations, patient records, prescription management, and care coordination. We integrate with major EHR systems and build patient engagement tools that measurably improve outcomes.",
  },
  {
    num: "04",
    title: "Fintech & Finance",
    desc: "Secure financial platforms covering payment processing, portfolio management, KYC/AML compliance, open banking integrations, and real-time analytics. We build to PCI-DSS standards and meet regulatory requirements across jurisdictions.",
  },
  {
    num: "05",
    title: "Food & Restaurant Management",
    desc: "Full-stack restaurant tech — POS integrations, online ordering, kitchen display systems, inventory management, staff scheduling, and loyalty programmes. We build for independent restaurants and multi-location franchise operations alike.",
  },
  {
    num: "06",
    title: "Industrial Sector",
    desc: "Forrof digitizes manufacturing with IoT sensors, MES, and real-time OEE tracking. Integrations with SCADA/PLC and ERP unify operations, while predictive maintenance reduces downtime. Quality control and traceability are built-in into all our processes.",
  },
];

const customerStories = [
  {
    id: "carbonmade",
    title: "Carbonmade",
    subtitle: "Creative Portfolio Platform",
    desc: "Product design and scaling for Carbonmade — a leading portfolio platform that has empowered over 100,000 creative professionals to showcase their work and grow their businesses.",
    tags: ["Product Design", "SaaS", "Creative Tools"],
    stat: "100K+ Creatives",
  },
  {
    id: "loopiq",
    title: "Loopiq",
    subtitle: "Customer Engagement SaaS",
    desc: "End-to-end SaaS development for Loopiq — a customer engagement platform with real-time analytics and automated workflows, now serving 5,000+ businesses with a 38% improvement in engagement metrics.",
    tags: ["SaaS Development", "Analytics", "Automation"],
    stat: "5,000+ Businesses",
  },
  {
    id: "curogram",
    title: "Curogram",
    subtitle: "Healthcare Communication Platform",
    desc: "HIPAA-compliant communication platform connecting patients and providers — serving 50,000+ patients in its first year with a 35% reduction in wait times and SOC 2 certification achieved.",
    tags: ["Healthcare", "HIPAA", "Platform Engineering"],
    stat: "50K+ Patients",
  },
];

export default function SaasService() {
  usePageMetadata({
    title: "SaaS Development Services | Forrof",
    description: "SaaS development services engineered for speed, security, and effortless scalability. Become a leader in your niche from day one.",
    keywords: "SaaS development, enterprise SaaS, cloud-native, MVP development, SaaS architecture, scalable software",
  });

  const navigate = useNavigate();
  const [openDomain, setOpenDomain] = useState<number | null>(null);

  const heroRef = useRef(null);
  const sec1Ref = useRef(null);
  const sec2Ref = useRef(null);
  const sec3Ref = useRef(null);
  const sec4Ref = useRef(null);
  const sec5Ref = useRef(null);
  const sec6Ref = useRef(null);
  const ctaRef = useRef(null);

  const sec1InView = useInView(sec1Ref, { once: true, margin: "-100px" });
  const sec2InView = useInView(sec2Ref, { once: true, margin: "-100px" });
  const sec3InView = useInView(sec3Ref, { once: true, margin: "-100px" });
  const sec4InView = useInView(sec4Ref, { once: true, margin: "-100px" });
  const sec5InView = useInView(sec5Ref, { once: true, margin: "-100px" });
  const sec6InView = useInView(sec6Ref, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* HERO */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-end section-padding pb-16 md:pb-24 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-[calc(50%-350px)] right-0 w-[700px] h-[700px] rounded-full blur-[130px]"
            style={{ background: "rgba(0, 212, 170, 0.08)" }}
            animate={{ x: [0, -60, 20, -40, 0], y: [0, 60, -40, 30, 0], opacity: [0.6, 1, 0.4, 0.9, 0.6] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background z-10" />
        <div className="relative z-20 max-w-[1800px] mx-auto w-full">
          <motion.span
            className="inline-block text-xs uppercase tracking-[0.3em] mb-8"
            style={{ color: "#00d4aa" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Services / SaaS Development
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
              SaaS Development
            </motion.h1>
          </div>
          <motion.p
            className="text-lg md:text-2xl max-w-2xl leading-relaxed mt-10"
            style={{ color: "#48f0e7" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            SaaS Development Services That Power Scalable Software Solutions. Become a leader in your niche with SaaS development services engineered for speed, security, and effortless scalability from day one.
          </motion.p>
        </div>
      </motion.section>

      {/* SECTION 1 — Challenges & Benefits */}
      <section ref={sec1Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={sec1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="number-label">/01</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Value</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={sec1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Your Challenges Handled. Your Value Preserved
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={sec1InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-sm font-semibold mb-8 uppercase tracking-widest text-muted-foreground">
                Common Issues
              </h3>
              <ul className="space-y-4">
                {challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border/40">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400/70 flex-shrink-0" />
                    <p className="text-muted-foreground leading-relaxed">{c.issue}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={sec1InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-sm font-semibold mb-8 uppercase tracking-widest text-muted-foreground">
                How We Solve It
              </h3>
              <ul className="space-y-4">
                {challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border/40 hover:border-accent/40 transition-colors">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <p className="text-muted-foreground leading-relaxed">{c.benefit}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Services We Offer */}
      <section ref={sec2Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={sec2InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="number-label">/02</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Services</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={sec2InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            SaaS Development Services We Offer
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.map((card, i) => (
              <motion.div
                key={i}
                className="p-6 md:p-8 rounded-2xl bg-card border border-border/40 hover:border-accent/40 transition-all duration-300 group"
                initial={{ opacity: 0, y: 40 }}
                animate={sec2InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.08 }}
              >
                <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase block mb-6">
                  /{card.num}
                </span>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-foreground transition-colors">
                  {card.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — Why Choose Our SaaS Services */}
      <section ref={sec3Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={sec3InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="number-label">/03</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Why Us</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={sec3InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Why Companies Choose Our SaaS Services
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item, i) => (
              <motion.div
                key={i}
                className="pt-8 border-t border-border"
                initial={{ opacity: 0, y: 40 }}
                animate={sec3InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase block mb-4">
                  {item.num}
                </span>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — Process */}
      <section ref={sec4Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={sec4InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="number-label">/04</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Process</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={sec4InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Our Process
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                className="p-6 md:p-8 rounded-2xl bg-card border border-border/40 hover:border-accent/40 transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                animate={sec4InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.08 }}
              >
                <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase block mb-5">
                  /{step.num}
                </span>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — Business Domains */}
      <section ref={sec5Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={sec5InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="number-label">/05</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Industries</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <motion.h2
              className="text-4xl md:text-6xl font-bold tracking-tighter"
              initial={{ opacity: 0, y: 40 }}
              animate={sec5InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              SaaS Development for Diverse Business Domains
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground leading-relaxed self-end"
              initial={{ opacity: 0, y: 30 }}
              animate={sec5InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              What are the main technical blockers to long-term SaaS scalability? We've solved them across every major vertical — here's how we approach each domain.
            </motion.p>
          </div>

          <div className="space-y-0">
            {domains.map((domain, i) => (
              <motion.div
                key={i}
                className="border-t border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={sec5InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.07 }}
              >
                <button
                  className="w-full py-7 flex items-center justify-between gap-6 text-left group"
                  onClick={() => setOpenDomain(openDomain === i ? null : i)}
                >
                  <div className="flex items-center gap-8">
                    <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase min-w-[32px]">
                      /{domain.num}
                    </span>
                    <span className="text-xl md:text-2xl font-semibold group-hover:text-foreground transition-colors">
                      {domain.title}
                    </span>
                  </div>
                  <motion.div
                    className="w-9 h-9 rounded-full border border-border flex items-center justify-center flex-shrink-0 group-hover:border-foreground transition-colors"
                    animate={{ rotate: openDomain === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {openDomain === i
                      ? <Minus size={14} className="text-foreground" />
                      : <Plus size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                    }
                  </motion.div>
                </button>

                <motion.div
                  className="overflow-hidden"
                  initial={false}
                  animate={{ height: openDomain === i ? "auto" : 0, opacity: openDomain === i ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <p className="text-muted-foreground leading-relaxed pb-8 pl-0 md:pl-[88px] max-w-3xl">
                    {domain.desc}
                  </p>
                </motion.div>
              </motion.div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* SECTION 6 — Customer Stories */}
      <section ref={sec6Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={sec6InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="number-label">/06</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Case Studies</span>
          </motion.div>

          <div className="flex items-end justify-between gap-8 mb-16">
            <motion.h2
              className="text-4xl md:text-6xl font-bold tracking-tighter max-w-2xl"
              initial={{ opacity: 0, y: 40 }}
              animate={sec6InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Customer Stories at Forrof
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-lg max-w-sm leading-relaxed hidden md:block"
              initial={{ opacity: 0, y: 20 }}
              animate={sec6InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              See how we help companies and innovators turn ideas into scalable products and technology.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {customerStories.map((story, i) => (
              <motion.div
                key={i}
                className="group p-8 rounded-2xl bg-card border border-border/40 hover:border-accent/40 transition-all duration-300 flex flex-col cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                animate={sec6InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.12 }}
                onClick={() => navigate(`/project/${story.id}`)}
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase">
                    /{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                    {story.stat}
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-1 group-hover:text-foreground transition-colors">
                  {story.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-5">{story.subtitle}</p>
                <p className="text-muted-foreground leading-relaxed text-sm flex-1 mb-8">
                  {story.desc}
                </p>

                <div className="flex items-end justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {story.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-full border border-border/40 text-xs text-muted-foreground bg-background/40">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight size={18} className="shrink-0 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={sec6InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Magnetic>
              <button
                onClick={() => navigate("/projects")}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300 font-medium"
              >
                Learn More
                <ArrowUpRight size={18} />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="section-forced-dark section-padding py-40">
        <div className="max-w-[1800px] mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-7xl font-bold tracking-tighter mb-10"
            initial={{ opacity: 0, y: 40 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Ready to get premium-quality SaaS?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Magnetic>
              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-3 px-8 py-5 bg-foreground text-background rounded-full font-medium hover:opacity-80 transition-opacity"
              >
                Start Your SaaS Project
                <ArrowUpRight size={18} />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
