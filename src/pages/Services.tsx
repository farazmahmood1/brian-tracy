import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Zap, Brain, Layers, Rocket, Map, Paintbrush } from "lucide-react";
import { LineReveal, Magnetic } from "@/components/AnimationComponents";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useLenis } from "@/hooks/useLenis";
import { useNavigate } from "react-router-dom";

const services = [
  {
    number: "01",
    title: "AI Products & SaaS Development",
    description:
      "We design and build revenue‑ready AI products, SaaS platforms, and modern applications with strong technical foundations.",
    tags: ["AI/ML", "SaaS", "Full-Stack", "APIs"],
    icon: Brain,
    size: "large",
  },
  {
    number: "02",
    title: "AI Business Systems & Internal Tools",
    description:
      "Intelligent internal platforms, dashboards, and automation systems that streamline operations and unlock growth.",
    tags: ["Dashboards", "Automation", "Internal Tools"],
    icon: Layers,
    size: "small",
  },
  {
    number: "03",
    title: "AI Integrations, Agents & Automation",
    description:
      "Real‑world AI systems — from document intelligence to custom agents and workflows — integrated into your business.",
    tags: ["LLMs", "Agents", "Workflows", "RAG"],
    icon: Zap,
    size: "small",
  },
  {
    number: "04",
    title: "MVP → Scalable Platform Engineering",
    description:
      "We help founders go from idea to production‑grade platform with scalable architecture and long‑term product vision.",
    tags: ["Architecture", "MVP", "Scaling", "DevOps"],
    icon: Rocket,
    size: "large",
  },
  {
    number: "05",
    title: "Product Architecture & Technical Strategy",
    description:
      "We partner with teams on system design, AI strategy, and engineering direction to reduce risk and build smarter.",
    tags: ["Strategy", "System Design", "CTO-as-a-Service"],
    icon: Map,
    size: "small",
  },
  {
    number: "06",
    title: "Product Design, UX & Growth Enablement",
    description:
      "Product‑focused UI/UX, brand systems, and growth‑ready experiences that support adoption, conversion, and long‑term success.",
    tags: ["UI/UX", "Branding", "Prototyping", "Growth"],
    icon: Paintbrush,
    size: "small",
  },
];

const process = [
  {
    step: "01",
    title: "Discover",
    description: "We dig into your business, users, and goals to define exactly what to build and why.",
  },
  {
    step: "02",
    title: "Architect",
    description: "We design the system — tech stack, AI layers, data models, and product flows — before writing a single line.",
  },
  {
    step: "03",
    title: "Build",
    description: "Iterative, sprint-based development with continuous feedback. You see progress every week.",
  },
  {
    step: "04",
    title: "Launch",
    description: "Production-ready deployment, QA, performance tuning, and post-launch support.",
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-3xl bg-card border border-border/40 overflow-hidden flex flex-col cursor-default group"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Gradient always magnetic to cursor */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(250px circle at ${pos.x}% ${pos.y}%, hsl(var(--accent) / 0.22), transparent 70%)`,
          transition: "background 0.15s ease",
        }}
      />

      <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
        {/* Top row */}
        <div className="flex items-start justify-between mb-8">
          <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase">
            /{service.number}
          </span>
          <div className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center">
            <Icon size={18} className="text-muted-foreground" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-semibold leading-tight mb-4 group-hover:text-foreground transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed mb-8 flex-1">
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full border border-border/40 text-xs text-muted-foreground bg-background/40"
            >
              {tag}
            </span>
          ))}
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

  const isServicesInView = useInView(servicesRef, { once: true, margin: "-10%" });
  const isProcessInView = useInView(processRef, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── Hero ── */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-end section-padding pb-24 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Animated glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-[calc(50%-350px)] right-0 w-[700px] h-[700px] bg-accent/20 rounded-full blur-[130px]"
            animate={{
              x: [0, -60, 20, -40, 0],
              y: [0, 60, -40, 30, 0],
              opacity: [0.6, 1, 0.4, 0.9, 0.6],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]"
            animate={{ x: [0, 40, 0], y: [0, -40, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background z-10" />

        <motion.div
          className="relative z-20 max-w-[1800px] mx-auto w-full"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.span
            className="inline-block text-xs text-muted-foreground uppercase tracking-[0.3em] mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            What we build
          </motion.span>

          <div className="overflow-hidden mb-6">
            <motion.h1
              className="text-[13vw] md:text-[10vw] font-bold leading-[0.88] tracking-tighter"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            >
              Our Services
            </motion.h1>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-10">
            <motion.p
              className="text-lg md:text-2xl text-muted-foreground max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              We partner with founders and growing teams to build AI‑powered products,
              intelligent systems, and scalable software platforms.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="flex gap-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {[
                { n: "6", label: "Core Services" },
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
      <section className="section-padding py-24 relative" ref={servicesRef}>
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
      <section className="section-padding py-24 relative overflow-hidden" ref={processRef}>
        {/* Accent glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-[calc(50%-300px)] left-0 w-[600px] h-[600px] bg-accent/15 rounded-full blur-[130px]"
            animate={{
              x: [0, 60, -20, 40, 0],
              y: [0, -60, 40, -30, 0],
              opacity: [0.5, 0.9, 0.3, 0.8, 0.5],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
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
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            <div className="overflow-hidden">
              <motion.h2
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95]"
                initial={{ y: "100%" }}
                animate={isProcessInView ? { y: 0 } : {}}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
              >
                From idea to launch
              </motion.h2>
            </div>
            <motion.div
              className="flex items-end"
              initial={{ opacity: 0, y: 30 }}
              animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <p className="text-xl text-muted-foreground max-w-md leading-relaxed">
                A proven process that keeps you in the loop at every step — no black boxes, no surprises.
              </p>
            </motion.div>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                className="border-t border-border pt-10 pb-12 pr-8"
                initial={{ opacity: 0, y: 40 }}
                animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + index * 0.12 }}
              >
                <span className="text-xs text-muted-foreground uppercase tracking-widest mb-6 block">
                  /{step.step}
                </span>
                <h3 className="text-3xl md:text-4xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding py-24">
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
              <motion.div
                className="absolute top-[-200px] right-[-100px] w-[500px] h-[500px] bg-accent/15 rounded-full blur-[100px]"
                animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
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
                    className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-80 transition-opacity whitespace-nowrap"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    Start a Project
                    <ArrowUpRight size={18} />
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
