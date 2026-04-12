import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { lazy, Suspense, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { LineReveal, Reveal } from "@/components/AnimationComponents";
import { CountUp } from "@/components/InteractiveElements";
import { BusinessScaleSection } from "@/components/BusinessScaleSection";
import { ContactSection } from "@/components/ContactSection";
import { OurClientsSection } from "@/components/OurClientsSection";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useLenis } from "@/hooks/useLenis";
import { Link } from "react-router-dom";

const HeroGlobe = lazy(() =>
  import("@/components/HeroGlobe").then((m) => ({ default: m.HeroGlobe }))
);

/* ─── Data ─── */

const stats = [
  { value: "50", suffix: "+", label: "Happy Clients" },
  { value: "98", suffix: "%", label: "Success Rate" },
  { value: "5", suffix: "+", label: "Years Experience" },
];

const testimonials = [
  {
    quote:
      "Forrof transformed our brand completely. Their creative vision and attention to detail exceeded all our expectations. The team is incredibly professional and delivered results that truly represent who we are.",
    name: "Sarah Mitchell",
    role: "CEO",
    company: "Bushel",
  },
  {
    quote:
      "Working with Forrof was a game-changer for our business. They understood our vision perfectly and delivered results that have significantly increased our market presence and customer engagement across all channels.",
    name: "Michael Chen",
    role: "Founder",
    company: "Curogram",
  },
  {
    quote:
      "The team at Forrof brings creativity and strategy together beautifully. Our platform has never looked better, and our engagement metrics have increased by over 200% since the redesign. Highly recommended!",
    name: "Emma Rodriguez",
    role: "Marketing Director",
    company: "Carbonmade",
  },
  {
    quote:
      "Forrof built our entire customer engagement platform from scratch. The real-time analytics and automated workflows they delivered have improved our engagement metrics by 38%. Their technical depth is unmatched.",
    name: "David Park",
    role: "CTO",
    company: "Loopiq",
  },
  {
    quote:
      "We needed an AI pipeline that could handle real-time predictions at scale. Forrof delivered it 3 weeks ahead of schedule and it's been running at 99.7% accuracy since launch. Exceptional work.",
    name: "James Wheeler",
    role: "VP of Engineering",
    company: "Meridian Labs",
  },
  {
    quote:
      "From the initial wireframes to the final deployment, Forrof treated our project like their own. They didn't just build what we asked for — they challenged our assumptions and made the product better.",
    name: "Aisha Malik",
    role: "Product Lead",
    company: "FitReps",
  },
];



/* ─── Mission card with cursor-tracking glow (matches Services page cards) ─── */
const MissionCard = ({
  card,
  index,
  isInView,
}: {
  card: { num: string; title: string; desc: string; tags: string[] };
  index: number;
  isInView: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });

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
      className="relative rounded-3xl overflow-hidden flex flex-col group border border-border/40 hover:border-accent/40 bg-card transition-all duration-300"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Cursor-tracking glow */}
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
          <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
            /{card.num}
          </span>
          <div className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center transition-all duration-300 group-hover:bg-foreground group-hover:border-foreground">
            <span className="text-muted-foreground group-hover:text-background transition-colors duration-300 text-sm">✦</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-semibold leading-tight mb-4 group-hover:text-foreground transition-colors">
          {card.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed mb-8 flex-1">
          {card.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {card.tags.map((tag) => (
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

/* ─── Scroll-driven testimonial card ─── */
const TestimonialCard = ({ t, i, total }: { t: typeof testimonials[0]; i: number; total: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 0.3, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -30]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.97]);

  return (
    <div ref={ref} className="lg:h-[70vh] flex items-center py-3 lg:py-0">
      <motion.div className="w-full" style={{ opacity, y, scale }}>
        <div className="relative p-5 md:p-8 lg:p-10 rounded-xl lg:rounded-2xl overflow-hidden bg-white border border-black/[0.06] shadow-sm">
          <div className="relative z-10">
            <svg className="w-6 h-6 lg:w-8 lg:h-8 mb-3 lg:mb-5 text-accent/25" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
            </svg>
            <p className="leading-relaxed text-sm md:text-base lg:text-lg mb-5 lg:mb-8 text-black/75">
              {t.quote}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xs lg:text-sm font-bold">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-xs lg:text-sm font-semibold text-black">{t.name}</p>
                <p className="text-[11px] lg:text-xs text-black/50">{t.role}, {t.company}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-4 lg:mt-6">
          {Array.from({ length: total }, (_, j) => (
            <div key={j} className={`h-0.5 rounded-full transition-all duration-500 ${j === i ? "w-8 bg-accent" : "w-3 bg-foreground/10"}`} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

/* ─── Page ─── */

const About = () => {
  useLenis();

  usePageMetadata({
    title: "About Us | Forrof — Full-Service Software Company",
    description:
      "Learn about Forrof — a full-service software company helping businesses scale with modern, future-ready technology from AI systems to enterprise platforms.",
    keywords:
      "about forrof, software company, AI development, enterprise solutions, digital agency, Quebec Canada",
  });

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-10%" });

  const testimonialsRef = useRef<HTMLDivElement>(null);

  const missionRef = useRef<HTMLDivElement>(null);
  const missionInView = useInView(missionRef, { once: true, margin: "-10%" });

  const chartsRef = useRef<HTMLDivElement>(null);
  const chartsInView = useInView(chartsRef, { once: true, margin: "-10%" });

  const codeRef = useRef<HTMLDivElement>(null);
  const codeInView = useInView(codeRef, { once: true, margin: "-10%" });

  return (
    <main className="overflow-x-clip">
      {/* ─── 1. HERO + GLOBE ─── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #050a12 0%, #040810 30%, #050a12 100%)",
        }}
        data-no-cursor-light
      >
        {/* Hero text — top portion */}
        <div className="relative z-10 min-h-screen flex items-center section-padding pt-28 pb-16">
          <div className="max-w-[1800px] mx-auto w-full">
            <motion.div
              className="flex items-center gap-4 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.span className="number-label">/01</motion.span>
              <LineReveal className="h-px bg-border flex-1" delay={0.3} />
              <motion.span className="text-xs text-muted-foreground uppercase tracking-widest">
                About Forrof
              </motion.span>
            </motion.div>

            <div className="max-w-4xl">
              <div className="overflow-hidden mb-8">
                <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.95] pb-4"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                We Build{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #ffffff 0%, #48f0e7 30%, #00d4aa 60%, #126b66 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    backgroundSize: "200% 200%",
                  }}
                >
                  What's Next
                </span>
              </motion.h1>
            </div>
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              A full-service software company helping businesses scale with modern,
              future-ready technology — from AI systems to enterprise platforms.
            </motion.p>
          </div>
        </div>
        </div>

        {/* Globe — full width, pushed down so top doesn't clip */}
        <div id="geographies" className="relative w-full h-screen mt-[-10vh]">
          <Suspense fallback={<div className="w-full h-full bg-[#050a12]" />}>
            <HeroGlobe className="w-full h-full" disableScrollEffect showMarkers />
          </Suspense>

          {/* Location info — right side */}
          <div className="absolute right-6 md:right-16 lg:right-24 top-1/2 -translate-y-1/2 z-10">
            <Reveal delay={0.1}>
              <div className="space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#00d4aa] animate-pulse" />
                    <span className="text-[10px] text-accent uppercase tracking-widest font-medium">Office</span>
                  </div>
                  <p className="text-sm md:text-base font-semibold">New York, USA</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#00d4aa] animate-pulse" />
                    <span className="text-[10px] text-accent uppercase tracking-widest font-medium">Office</span>
                  </div>
                  <p className="text-sm md:text-base font-semibold">Lahore, Pakistan</p>
                </div>
                <div className="pt-2 border-t border-foreground/10">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Available Worldwide</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050a12] to-transparent pointer-events-none" />
        </div>
      </section>

      {/* ─── 3. STATS ─── */}
      <section
        ref={statsRef}
        className="section-forced-dark section-padding pt-20 pb-8 relative"
        style={{
          background: "linear-gradient(180deg, #050a12 0%, #0a1520 50%, #050a12 100%)",
        }}
        data-no-cursor-light
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-3 divide-x divide-foreground/10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center px-6 py-8"
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.15 }}
              >
                <div className="flex items-baseline justify-center gap-0.5 mb-3">
                  <span className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground">
                    <CountUp value={stat.value} delay={200 + i * 100} />
                  </span>
                  <span className="text-xl md:text-2xl font-semibold text-accent">{stat.suffix}</span>
                </div>
                <p className="text-muted-foreground text-xs md:text-sm uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. CHARTS — Our Work in Numbers ─── */}
      <section
        ref={chartsRef}
        className="section-forced-dark section-padding pt-8 pb-32 relative overflow-hidden"
        data-no-cursor-light
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 10% 80%, rgba(0, 212, 170, 0.05) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 90% 20%, rgba(18, 107, 102, 0.04) 0%, transparent 60%),
            linear-gradient(180deg, #050a12 0%, #06110f 50%, #050a12 100%)
          `,
        }}
      >
        <div className="max-w-[1800px] mx-auto relative z-10">
          {/* 3-column layout */}
          <div className="grid lg:grid-cols-3 gap-8">

            {/* 1. Projects by Field — Donut */}
            <motion.div
              className="border border-foreground/[0.06] rounded-2xl p-8 bg-foreground/[0.02]"
              initial={{ opacity: 0, y: 40 }}
              animate={chartsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h3 className="text-sm font-semibold mb-8 pb-3 border-b border-foreground/10">Projects by Field</h3>
              <div className="flex items-center gap-8">
                {/* Donut chart SVG */}
                <div className="relative w-32 h-32 flex-shrink-0">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    {[
                      { value: 52, color: "#0a3d3a", offset: 0 },
                      { value: 38, color: "#126b66", offset: 52 },
                      { value: 25, color: "#00d4aa", offset: 90 },
                      { value: 37, color: "#48f0e7", offset: 115 },
                    ].map((seg, i) => (
                      <motion.circle
                        key={i}
                        cx="60" cy="60" r="45"
                        fill="none"
                        stroke={seg.color}
                        strokeWidth="18"
                        strokeDasharray={`${(seg.value / 152) * 283} 283`}
                        strokeDashoffset={`${-(seg.offset / 152) * 283}`}
                        initial={{ opacity: 0 }}
                        animate={chartsInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                      />
                    ))}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">152</span>
                  </div>
                </div>
                {/* Legend */}
                <div className="space-y-3">
                  {[
                    { label: "AI/ML", value: 52, color: "#0a3d3a" },
                    { label: "Enterprise", value: 38, color: "#126b66" },
                    { label: "SaaS", value: 25, color: "#00d4aa" },
                    { label: "MVP/Strategy", value: 37, color: "#48f0e7" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <span className="text-sm font-semibold ml-auto">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground/60 mt-6">The ranking is based on the predominant domain of a project.</p>
            </motion.div>

            {/* 2. Projects Launched — Bar Chart */}
            <motion.div
              className="border border-foreground/[0.06] rounded-2xl p-8 bg-foreground/[0.02]"
              initial={{ opacity: 0, y: 40 }}
              animate={chartsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-sm font-semibold mb-8 pb-3 border-b border-foreground/10">Project Launched</h3>
              <div className="flex items-end justify-between gap-2 h-[180px]">
                {[
                  { year: "2020", value: 15 },
                  { year: "2021", value: 25 },
                  { year: "2022", value: 35 },
                  { year: "2023", value: 28 },
                  { year: "2024", value: 42 },
                  { year: "2025", value: 48 },
                  { year: "2026", value: 12 },
                ].map((item, i) => (
                  <div key={item.year} className="flex flex-col items-center gap-1 flex-1">
                    <span className="text-[10px] text-muted-foreground font-medium">{item.value}</span>
                    <motion.div
                      className="w-full rounded-t-md"
                      style={{
                        background: `linear-gradient(to top, #0a3d3a, ${i === 5 ? "#00d4aa" : "#126b66"})`,
                      }}
                      initial={{ height: 0 }}
                      animate={chartsInView ? { height: `${(item.value / 48) * 140}px` } : {}}
                      transition={{ duration: 0.8, delay: 0.4 + i * 0.08, ease: "easeOut" }}
                    />
                    <span className="text-[10px] text-muted-foreground">{item.year}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground/60 mt-6">The ranking is based on the number of projects launched per year.</p>
            </motion.div>

            {/* 3. People per Project */}
            <motion.div
              className="border border-foreground/[0.06] rounded-2xl p-8 bg-foreground/[0.02]"
              initial={{ opacity: 0, y: 40 }}
              animate={chartsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-sm font-semibold mb-8 pb-3 border-b border-foreground/10">People per Project</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-accent">30</span>
                <span className="text-xl text-muted-foreground ml-2">/ 48 team members</span>
              </div>
              {/* Dot grid — 30 filled, 18 empty */}
              <div className="grid grid-cols-10 gap-2 mb-6">
                {Array.from({ length: 48 }, (_, i) => (
                  <motion.div
                    key={i}
                    className={`w-3 h-3 rounded-full ${i < 30 ? "bg-accent" : "bg-foreground/10"}`}
                    initial={{ scale: 0 }}
                    animate={chartsInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.02 }}
                  />
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground/60">Average number of people from the team involved in a project.</p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── 5. TESTIMONIALS — Sticky scroll ─── */}
      <section
        ref={testimonialsRef}
        className="section-forced-light relative section-padding"
      >
        <div className="max-w-[1800px] mx-auto relative z-10">
          <div className="lg:flex lg:gap-20">

            {/* Left — Sticky on desktop, compact on mobile */}
            <div className="lg:w-[40%] lg:sticky lg:top-28 lg:self-start lg:shrink-0 pt-12 pb-6 lg:py-20">
              <motion.p
                className="text-xs uppercase tracking-[0.3em] text-muted-foreground/50 mb-4 lg:mb-8 flex items-center gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <span className="w-8 h-px bg-accent/40" />
                Trusted by industry leaders
              </motion.p>
              <motion.h2
                className="text-2xl md:text-3xl lg:text-5xl font-bold leading-[1.1] tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Our customers have no margin for error.
              </motion.h2>
            </div>

            {/* Mobile — horizontal scroll */}
            <div className="lg:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-6 px-6">
              {testimonials.map((t, i) => (
                <div key={t.name} className="snap-center shrink-0 w-[85vw]">
                  <div className="p-5 rounded-xl bg-white border border-black/[0.06] shadow-sm">
                    <svg className="w-5 h-5 mb-2 text-accent/25" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                    </svg>
                    <p className="leading-relaxed text-sm mb-4 text-black/75">{t.quote}</p>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center text-accent text-[10px] font-bold">{t.name.charAt(0)}</div>
                      <div>
                        <p className="text-xs font-semibold text-black">{t.name}</p>
                        <p className="text-[10px] text-black/50">{t.role}, {t.company}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1.5 mt-3 justify-center">
                    {testimonials.map((_, j) => (
                      <div key={j} className={`h-0.5 rounded-full ${j === i ? "w-6 bg-accent" : "w-2 bg-foreground/10"}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* Desktop — scroll-driven cards */}
            <div className="hidden lg:block lg:w-[60%]">
              {testimonials.map((t, i) => (
                <TestimonialCard key={t.name} t={t} i={i} total={testimonials.length} />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════ CLIENTS MARQUEE ═══════════════ */}
      <OurClientsSection />

      {/* ═══════════════ 4. BUSINESS SCALE ═══════════════ */}
      <div id="business-scale"><BusinessScaleSection /></div>

      {/* ─── 7. MISSION & VISION ─── */}
      <section
        ref={missionRef}
        className="section-forced-dark section-padding py-32 relative overflow-hidden"
        data-no-cursor-light
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 30% 50%, rgba(0, 212, 170, 0.05) 0%, transparent 60%),
            linear-gradient(180deg, #050a12 0%, #06110f 50%, #050a12 100%)
          `,
        }}
      >
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.span className="number-label">/07</motion.span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <motion.span className="text-xs text-muted-foreground uppercase tracking-widest">
              Mission & Vision
            </motion.span>
          </motion.div>

          <div className="overflow-hidden mb-16">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.95] pb-2"
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              What Drives Us
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Our Mission",
                desc: "To empower businesses with cutting-edge technology solutions, unlocking their growth potential by connecting them with passionate and skilled engineers.",
                tags: ["Innovation", "Growth", "Partnership"],
              },
              {
                num: "02",
                title: "Our Vision",
                desc: "We envision transforming IT systems into smart, agile, and AI-driven digital assets — shaping a future where technology meets the dynamic demands of a connected world.",
                tags: ["AI-Driven", "Adaptive", "Future-Ready"],
              },
              {
                num: "03",
                title: "Our Values",
                desc: "We lead with transparency, deliver with ownership, and grow through collaboration. Every decision is guided by integrity and a relentless focus on impact.",
                tags: ["Transparency", "Ownership", "Integrity"],
              },
            ].map((card, i) => (
              <MissionCard key={card.title} card={card} index={i} isInView={missionInView} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. CODE OF CONDUCT ─── */}
      <section
        id="code-of-conduct"
        ref={codeRef}
        className="section-forced-light section-padding py-24"
      >
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            className="flex items-center gap-4 mb-12 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={codeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.span className="number-label">/08</motion.span>
            <LineReveal className="h-px bg-border w-24" delay={0.3} />
            <motion.span className="text-xs text-muted-foreground uppercase tracking-widest">
              Principles
            </motion.span>
          </motion.div>

          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Code of Business Principles
            </h2>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="text-muted-foreground leading-relaxed mb-10 text-lg">
              Forrof prioritizes legal and ethical conduct, ensuring honesty, fairness,
              and accountability for all.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-white group transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(0,212,170,0.3)]"
              style={{ background: "linear-gradient(135deg, #126b66, #00d4aa)" }}
            >
              Access Our Code of Business Principles
              <ArrowUpRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ CAREERS CTA ═══════════════ */}
      <section
        className="section-forced-dark section-padding py-32 relative overflow-hidden"
        data-no-cursor-light
        style={{
          background: `
            radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0, 212, 170, 0.06) 0%, transparent 60%),
            linear-gradient(180deg, #050a12 0%, #06110f 50%, #050a12 100%)
          `,
        }}
      >
        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <motion.p
            className="text-xs uppercase tracking-[0.3em] text-accent mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            We're hiring
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Join Our Team
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We're a team of 48 engineers, designers, and strategists building the future of software. Come work on challenging problems with talented people.
          </motion.p>
          <motion.div
            className="flex items-center justify-center gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-background bg-foreground hover:opacity-90 transition-opacity"
            >
              View Open Positions
              <ArrowUpRight size={18} />
            </Link>
            <span className="text-sm text-muted-foreground">
              5+ open roles
            </span>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ CONTACT ═══════════════ */}
      <ContactSection />
    </main>
  );
};

export default About;
