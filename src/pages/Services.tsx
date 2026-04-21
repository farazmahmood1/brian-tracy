import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Zap, Brain, Layers, Rocket, Map, Palette, Smartphone, Megaphone, Search, PenTool, Code, RocketIcon } from "lucide-react";
import { LineReveal, Magnetic } from "@/components/AnimationComponents";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useLenis } from "@/hooks/useLenis";
import { useNavigate } from "react-router-dom";

const services = [
  {
    number: "01",
    title: "AI/ML Development",
    description:
      "Real‑world AI systems — from document intelligence to custom agents and workflows — integrated directly into your business.",
    tags: ["LLMs", "Agents", "Workflows", "RAG"],
    icon: Zap,
    slug: "ai-ml",
    highlight: false,
  },
  {
    number: "02",
    title: "Enterprise Software",
    description:
      "Intelligent internal platforms, dashboards, and automation systems that streamline operations and unlock growth at scale.",
    tags: ["Dashboards", "Automation", "Internal Tools"],
    icon: Layers,
    slug: "enterprise",
    highlight: true,
  },
  {
    number: "03",
    title: "SaaS Development",
    description:
      "Revenue‑ready AI products and SaaS platforms engineered for speed, security, and effortless scalability from day one.",
    tags: ["AI/ML", "SaaS", "Full-Stack", "APIs"],
    icon: Brain,
    slug: "saas",
    highlight: false,
  },
  {
    number: "04",
    title: "MVP & POC Development",
    description:
      "From idea to production‑grade platform — lean MVPs and prototypes that prove your concept and attract investors fast.",
    tags: ["Architecture", "MVP", "Scaling", "DevOps"],
    icon: Rocket,
    slug: "mvp",
    highlight: false,
  },
  {
    number: "05",
    title: "Product Architecture & Technical Strategy",
    description:
      "System design, AI strategy, and engineering direction that reduces risk and enables smarter decisions at every stage.",
    tags: ["Strategy", "System Design", "CTO-as-a-Service"],
    icon: Map,
    slug: "strategy",
    highlight: false,
  },
  {
    number: "06",
    title: "Mobile App Development",
    description:
      "Native iOS and Android apps, and cross‑platform solutions built for performance, polish, and real user delight.",
    tags: ["iOS", "Android", "React Native", "Flutter"],
    icon: Smartphone,
    slug: "mobile",
    highlight: false,
  },
  {
    number: "07",
    title: "Branding & UI/UX",
    description:
      "Brand systems, product design, and growth‑ready UX that drives adoption, conversion, and long‑term loyalty.",
    tags: ["UI/UX", "Branding", "Prototyping", "Growth"],
    icon: Palette,
    slug: "ux-design",
    highlight: false,
  },
  {
    number: "08",
    title: "Social Media Marketing",
    description:
      "Data‑driven social strategies, content creation, and paid campaigns that grow your audience and turn followers into customers.",
    tags: ["Content", "Paid Ads", "Analytics", "Growth"],
    icon: Megaphone,
    slug: "social-media",
    highlight: false,
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
    description: "We design the system — tech stack, AI layers, data models, and product flows — before writing a single line.",
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
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const Icon = service.icon;
  const navigate = useNavigate();
  const hl = service.highlight;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative rounded-3xl overflow-hidden flex flex-col cursor-pointer group border transition-all duration-300 ${
        hl
          ? "border-[#00d4aa]/40 hover:border-[#48f0e7]/60"
          : "bg-card border-border/40 hover:border-accent/40"
      }`}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      style={hl ? { background: "linear-gradient(to bottom, #050a12 0%, #126b66 100%)" } : undefined}
      onClick={() => navigate(`/services/${service.slug}`)}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Gradient always magnetic to cursor */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: hl
            ? `radial-gradient(250px circle at ${pos.x}% ${pos.y}%, rgba(0,212,170,0.25), transparent 70%)`
            : `radial-gradient(250px circle at ${pos.x}% ${pos.y}%, hsl(var(--accent) / 0.22), transparent 70%)`,
          transition: "background 0.15s ease",
        }}
      />

      <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
        {/* Top row */}
        <div className="flex items-start justify-between mb-8">
          <span className={`text-xs font-medium tracking-widest uppercase ${hl ? "text-[#00d4aa]" : "text-muted-foreground"}`}>
            /{service.number}
          </span>
          <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
            hl
              ? "border-[#00d4aa]/40 group-hover:bg-[#00d4aa] group-hover:border-[#00d4aa]"
              : "border-border/50 group-hover:bg-foreground group-hover:border-foreground"
          }`}>
            <Icon size={18} className={`transition-colors duration-300 ${hl ? "text-[#00d4aa] group-hover:text-[#050a12]" : "text-muted-foreground group-hover:text-background"}`} />
          </div>
        </div>

        {/* Title */}
        <h3 className={`text-2xl md:text-3xl font-semibold leading-tight mb-4 transition-colors ${hl ? "text-white" : "group-hover:text-foreground"}`}>
          {service.title}
        </h3>

        {/* Description */}
        <p className={`leading-relaxed mb-8 flex-1 ${hl ? "text-[#48f0e7]/70" : "text-muted-foreground"}`}>
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
                    ? "border-[#00d4aa]/30 text-[#48f0e7] bg-[#126b66]/30"
                    : "border-border/40 text-muted-foreground bg-background/40"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
          <ArrowUpRight size={20} className={`shrink-0 transition-all duration-300 ${hl ? "text-[#00d4aa] group-hover:translate-x-1 group-hover:-translate-y-1" : "text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1"}`} />
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  useLenis();
  const navigate = useNavigate();

  usePageMetadata({
    title: "Services | Forrof",
    description:
      "Explore our comprehensive software and digital services including AI development, SaaS platforms, and product strategy.",
    keywords: "AI development, SaaS, internal tools, automation, product design",
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
              intelligent systems, and scalable software platforms.
            </motion.p>

            <motion.div
              className="flex gap-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {[
                { n: "8", label: "Core Services" },
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
            A proven process that keeps you in the loop at every step — no black boxes, no surprises.
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
