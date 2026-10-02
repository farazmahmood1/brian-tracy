import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Zap, Layers, Network, Search, PenTool, Code, RocketIcon, Target } from "lucide-react";
import { LineReveal, Magnetic } from "@/components/AnimationComponents";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useLenis } from "@/hooks/useLenis";
import { Link, useNavigate } from "react-router-dom";

const services = [
  {
    number: "01",
    title: "AI & Automation",
    description:
      "Custom AI agents, LLM and RAG solutions, document intelligence, and workflow automation that remove manual work and plug straight into the tools your team already uses.",
    tags: ["AI Agents", "LLMs & RAG", "Workflow Automation", "Document AI"],
    icon: Zap,
    slug: "ai-automation",
    highlight: true,
    wide: true,
  },
  {
    number: "02",
    title: "Custom Software Development",
    description:
      "Web applications, SaaS platforms, mobile apps, client portals, and internal systems - built by one senior team, with full code ownership.",
    tags: ["Web Apps", "SaaS", "Mobile", "MVPs"],
    icon: Layers,
    slug: "custom-software",
    highlight: false,
    wide: false,
  },
  {
    number: "03",
    title: "Systems Integration & Data",
    description:
      "API and Xero integrations, data pipelines, and real-time dashboards that connect your systems and end double entry.",
    tags: ["APIs", "Xero", "Data Pipelines", "Dashboards"],
    icon: Network,
    slug: "systems-integration",
    highlight: false,
    wide: false,
  },
  {
    number: "04",
    title: "SEO & AI Search Visibility",
    description:
      "Technical SEO, local SEO, and generative engine optimisation to rank on Google and get cited by ChatGPT, Perplexity, and AI Overviews.",
    tags: ["Technical SEO", "Local SEO", "GEO"],
    icon: Search,
    slug: "seo",
    highlight: false,
    wide: false,
  },
  {
    number: "05",
    title: "Performance Marketing",
    description:
      "Google, Meta, LinkedIn, and TikTok ads plus social media - with server-side tracking and landing pages that turn ad spend into qualified leads.",
    tags: ["Google Ads", "Meta Ads", "Social", "CRO"],
    icon: Target,
    slug: "performance-marketing",
    highlight: false,
    wide: false,
  },
];

const process = [
  {
    step: "01",
    title: "Discover",
    description: "We dig into your business, users, and goals to define exactly what to build and why.",
    icon: Search,
  },
  {
    step: "02",
    title: "Architect",
    description: "We design the system - tech stack, AI layers, data models, and product flows - before writing a single line.",
    icon: PenTool,
  },
  {
    step: "03",
    title: "Build",
    description: "Iterative, sprint-based development with continuous feedback. You see progress every week.",
    icon: Code,
  },
  {
    step: "04",
    title: "Launch",
    description: "Production-ready deployment, QA, performance tuning, and post-launch support.",
    icon: RocketIcon,
  },
];

// Service card with cursor-tracking glow
const ServiceCard = ({
  service,
  index,
  isInView,
}: {
  service: (typeof services)[0];
  index: number;
  isInView: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const Icon = service.icon;
  const navigate = useNavigate();
  const hl = service.highlight;
  const glowColor = hl ? "rgba(0,212,170,0.12)" : "hsl(var(--accent) / 0.1)";

  // Direct DOM writes via ref - zero React re-renders during mousemove
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    const glow = glowRef.current;
    if (!rect || !glow) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    glow.style.background = `radial-gradient(250px circle at ${x}% ${y}%, ${glowColor}, transparent 70%)`;
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative rounded-3xl overflow-hidden flex flex-col cursor-pointer group border transition-all duration-300 ${service.wide ? "lg:col-span-2" : ""} ${
        hl
          ? "border-[#00d4aa]/20 hover:border-[#00d4aa]/40"
          : "bg-card border-border/40 hover:border-accent/40"
      }`}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      style={hl ? { background: "linear-gradient(160deg, #0a1317 0%, #0e2423 100%)" } : undefined}
      onClick={() => navigate(`/services/${service.slug}`)}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Gradient always magnetic to cursor */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(250px circle at 50% 50%, ${glowColor}, transparent 70%)`,
          transition: "background 0.15s ease",
        }}
      />

      <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
        {/* Top row */}
        <div className="flex items-start justify-between mb-8">
          <span className={`text-xs font-medium tracking-widest uppercase ${hl ? "text-[#00d4aa]/80" : "text-muted-foreground"}`}>
            /{service.number}
          </span>
          <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
            hl
              ? "border-[#00d4aa]/25 group-hover:bg-[#00d4aa]/90 group-hover:border-[#00d4aa]/90"
              : "border-border/50 group-hover:bg-foreground group-hover:border-foreground"
          }`}>
            <Icon size={18} className={`transition-colors duration-300 ${hl ? "text-[#00d4aa] group-hover:text-[#050a12]" : "text-muted-foreground group-hover:text-background"}`} />
          </div>
        </div>

        {/* Title */}
        <h3 className={`text-2xl md:text-3xl font-semibold leading-tight mb-4 transition-colors ${hl ? "text-white" : "group-hover:text-foreground"}`}>
          <Link to={`/services/${service.slug}`} onClick={(e) => e.stopPropagation()}>
            {service.title}
          </Link>
        </h3>

        {/* Description */}
        <p className={`leading-relaxed mb-8 flex-1 ${hl ? "text-white/65" : "text-muted-foreground"}`}>
          {service.description}
        </p>

        {/* Tags + Arrow */}
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1.5 rounded-full border text-xs ${
                  hl
                    ? "border-[#00d4aa]/20 text-[#8fd6cb] bg-[#00d4aa]/[0.06]"
                    : "border-border/40 text-muted-foreground bg-background/40"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
          <ArrowUpRight size={20} className={`shrink-0 transition-all duration-300 ${hl ? "text-[#00d4aa]/80 group-hover:translate-x-1 group-hover:-translate-y-1" : "text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1"}`} />
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  useLenis();
  const navigate = useNavigate();

  usePageMetadata({
    title: "Software, AI & Growth Services for NZ & Australia | Forrof",
    description:
      "AI & automation, custom software development, systems integration, SEO & AI search visibility, and performance marketing for New Zealand and Australian businesses.",
    keywords: "AI automation, custom software development, systems integration, Xero integration, SEO services, AI search optimisation, performance marketing, Google Ads, software agency New Zealand, software agency Australia",
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const isServicesInView = useInView(servicesRef, { once: true, margin: "-10%" });
  const isProcessInView = useInView(processRef, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const { scrollYProgress: timelineProgress } = useScroll({ target: timelineRef, offset: ["start end", "end center"] });
  const lineHeight = useTransform(timelineProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── Hero ── */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-end section-padding pb-16 md:pb-24 overflow-hidden"
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

        <motion.div
          className="relative z-20 max-w-[1800px] mx-auto w-full"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.span
            className="inline-block text-xs uppercase tracking-[0.3em] mb-8"
            style={{ color: "#00d4aa" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            What we build
          </motion.span>

          <div className="overflow-hidden mb-6 pb-6">
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
                backgroundPosition: { duration: 3, ease: "easeInOut", delay: 1 },
              }}
            >
              Our Services
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
              We partner with founders and growing teams to build AI‑powered products,
              intelligent systems, scalable software platforms, and marketing engines that drive measurable revenue.
            </motion.p>

            <motion.div
              className="flex gap-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {[
                { n: String(services.length), label: "Core Services" },
                { n: "150+", label: "Projects Shipped" },
                { n: "98%", label: "Client Satisfaction" },
              ].map((s) => (
                <div key={s.label}>
                  <span className="text-4xl md:text-5xl font-bold block leading-none mb-1">{s.n}</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* ── Services Grid ── */}
      <section className="section-forced-dark section-padding py-24" ref={servicesRef}>
        <div className="max-w-[1800px] mx-auto">
          {/* Section label */}
          <motion.div
            className="flex items-center gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="number-label">/01</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Services</span>
          </motion.div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={service.number}
                service={service}
                index={index}
                isInView={isServicesInView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section
        className="section-forced-dark section-padding py-24 relative overflow-hidden"
        ref={processRef}
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 10% 20%, rgba(0, 212, 170, 0.07) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 90% 80%, rgba(18, 107, 102, 0.06) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 50% 50%, rgba(72, 240, 231, 0.03) 0%, transparent 50%),
            linear-gradient(180deg, #050a12 0%, #06110f 50%, #050a12 100%)
          `,
        }}
      >
        {/* Animated ambient glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-[10%] left-[-5%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-50"
            style={{ background: "rgba(0, 212, 170, 0.08)" }}
          />
          <div
            className="absolute bottom-[5%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[130px] opacity-40"
            style={{ background: "rgba(72, 240, 231, 0.06)" }}
          />
          <div
            className="absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full blur-[120px] opacity-40"
            style={{ background: "rgba(18, 107, 102, 0.05)" }}
          />
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 212, 170, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 212, 170, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="max-w-[1800px] mx-auto relative z-10">
          {/* Section label */}
          <motion.div
            className="flex items-center gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="number-label">/02</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">How We Work</span>
          </motion.div>

          {/* Title */}
          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-center mx-auto max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            From idea to launch
          </motion.h2>
          <motion.p
            className="text-muted-foreground mb-20 text-center text-lg max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isProcessInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            A proven process that keeps you in the loop at every step - no black boxes, no surprises.
          </motion.p>

          {/* Premium centered timeline */}
          <div ref={timelineRef} className="relative">
            {/* Center track */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border/20" />
            {/* Animated glow line */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-0 w-[3px] origin-top rounded-full"
              style={{
                height: lineHeight,
                background: "linear-gradient(to bottom, #48f0e7, #00d4aa, #126b66)",
                boxShadow: "0 0 20px rgba(72, 240, 231, 0.5), 0 0 40px rgba(0, 212, 170, 0.2), 0 0 60px rgba(0, 212, 170, 0.1)",
              }}
            />

            <div className="space-y-0">
              {process.map((step, i) => {
                const isLeft = i % 2 === 0;
                const StepIcon = step.icon;
                return (
                  <motion.div
                    key={i}
                    className="relative flex items-start"
                    initial={{ opacity: 0, y: 60 }}
                    animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.9, delay: 0.3 + i * 0.15 }}
                  >
                    {/* Left side */}
                    <div className="w-1/2 pr-8 md:pr-16">
                      {isLeft ? (
                        <div className="md:text-right pb-20 flex flex-col items-end">
                          {/* Glass card */}
                          <div className="relative p-6 md:p-8 rounded-2xl border border-foreground/[0.08] bg-foreground/[0.03] backdrop-blur-sm max-w-md group hover:border-accent/30 transition-all duration-500">
                            {/* Corner glow */}
                            <div className="absolute -top-8 -right-8 w-24 h-24 bg-accent/10 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="flex items-center gap-4 mb-4 justify-end">
                              <span className="text-5xl md:text-6xl font-black text-foreground/[0.06] leading-none">{step.step}</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-3">{step.title}</h3>
                            <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
                          </div>
                        </div>
                      ) : <div className="pb-20" />}
                    </div>

                    {/* Center node */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-6 z-10">
                      {/* Outer pulse ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full border border-accent/30"
                        style={{ width: 48, height: 48, top: -12, left: -12 }}
                        animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                      />
                      {/* Icon circle */}
                      <motion.div
                        className="w-10 h-10 rounded-full border-2 border-accent bg-background flex items-center justify-center"
                        whileInView={{ scale: [0.3, 1.15, 1] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 + i * 0.15, ease: "backOut" }}
                      >
                        <StepIcon size={16} className="text-accent" />
                      </motion.div>
                    </div>

                    {/* Right side */}
                    <div className="w-1/2 pl-8 md:pl-16">
                      {!isLeft ? (
                        <div className="pb-20 flex flex-col items-start">
                          {/* Glass card */}
                          <div className="relative p-6 md:p-8 rounded-2xl border border-foreground/[0.08] bg-foreground/[0.03] backdrop-blur-sm max-w-md group hover:border-accent/30 transition-all duration-500">
                            <div className="absolute -top-8 -left-8 w-24 h-24 bg-accent/10 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="flex items-center gap-4 mb-4">
                              <span className="text-5xl md:text-6xl font-black text-foreground/[0.06] leading-none">{step.step}</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-3">{step.title}</h3>
                            <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
                          </div>
                        </div>
                      ) : <div className="pb-20" />}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-forced-dark section-padding py-24">
        <motion.div
          className="max-w-[1800px] mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="border border-border rounded-3xl p-12 md:p-20 relative overflow-hidden">
            {/* Card glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute top-[-200px] right-[-100px] w-[500px] h-[500px] bg-accent/15 rounded-full blur-[50px] opacity-70"
              />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
              <div>
                <motion.span
                  className="text-xs text-muted-foreground uppercase tracking-[0.3em] block mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Ready to start?
                </motion.span>
                <div className="overflow-hidden">
                  <motion.h2
                    className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight"
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
                  >
                    Let's build something great.
                  </motion.h2>
                </div>
              </div>

              <div className="flex flex-col gap-4 shrink-0">
                <Magnetic strength={0.15}>
                  <motion.a
                    href="/contact"
                    onClick={(e) => { e.preventDefault(); navigate("/contact"); }}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-white overflow-hidden relative group whitespace-nowrap"
                    style={{ background: "linear-gradient(135deg, #126b66, #00d4aa)" }}
                    whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(72, 240, 231, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="relative z-10 font-medium">Start a Project</span>
                    <ArrowUpRight size={18} className="relative z-10" />
                  </motion.a>
                </Magnetic>
                <Magnetic strength={0.15}>
                  <motion.a
                    href="/projects"
                    onClick={(e) => { e.preventDefault(); navigate("/projects"); }}
                    className="inline-flex items-center gap-3 px-8 py-4 border border-border rounded-full font-medium text-muted-foreground hover:text-foreground hover:border-foreground transition-colors whitespace-nowrap"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    View Our Work
                    <ArrowUpRight size={18} />
                  </motion.a>
                </Magnetic>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Services;
