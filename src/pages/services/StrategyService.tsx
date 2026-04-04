import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { LineReveal, Magnetic } from "@/components/AnimationComponents";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useNavigate } from "react-router-dom";
import { GlowCard } from "@/components/InteractiveElements";

const offerings = [
  { num: "01", title: "Technical Due Diligence", desc: "Deep code, architecture, and team assessments for investors, acquirers, and boards making high-stakes decisions." },
  { num: "02", title: "System Design & Architecture Review", desc: "Identify bottlenecks, single points of failure, and scaling risks before they become production incidents." },
  { num: "03", title: "AI Strategy & Roadmapping", desc: "Translate AI capabilities into a prioritized roadmap aligned with business goals, team maturity, and budget reality." },
  { num: "04", title: "CTO-as-a-Service", desc: "Fractional technical leadership for early-stage teams — product decisions, hiring, vendor evaluation, and engineering culture." },
  { num: "05", title: "Technology Stack Selection", desc: "Objective guidance on frameworks, cloud providers, databases, and tooling based on your product trajectory, not vendor bias." },
  { num: "06", title: "Engineering Process & DevOps Consulting", desc: "CI/CD pipelines, code review culture, sprint structure, and on-call practices that scale with your team." },
];

const pillars = [
  { num: "01", title: "Business-First Thinking", desc: "Every architecture decision is evaluated against business impact — cost, speed, risk, and competitive advantage — not just technical elegance." },
  { num: "02", title: "Honest, Independent Advice", desc: "No vendor relationships. No hidden incentives. We tell you what to build, what to buy, and what to avoid, based purely on what's right for your product." },
  { num: "03", title: "Senior-Level Expertise", desc: "Advice from engineers who have designed and scaled systems in production — not consultants reading documentation." },
];

const processSteps = [
  { num: "01", title: "Discovery", desc: "We start by understanding your business context, current architecture, team strengths, and the decisions you're facing." },
  { num: "02", title: "Assessment", desc: "Deep technical review — codebase, infrastructure, data models, and team workflows — to map risk and opportunity." },
  { num: "03", title: "Strategy Delivery", desc: "A clear, prioritized action plan with concrete recommendations, trade-off analysis, and an implementation roadmap." },
  { num: "04", title: "Ongoing Advisory", desc: "Embedded advisory support through implementation — available for architecture reviews, hire interviews, and critical decisions." },
];

export default function StrategyService() {
  usePageMetadata({
    title: "Product Architecture & Technical Strategy | Forrof",
    description: "We partner with teams on system design, AI strategy, and engineering direction to reduce risk and build smarter.",
    keywords: "technical strategy, product architecture, CTO as a service, system design, AI roadmap, engineering consulting",
  });

  const navigate = useNavigate();

  const heroRef = useRef(null);
  const sec1Ref = useRef(null);
  const sec2Ref = useRef(null);
  const sec3Ref = useRef(null);
  const ctaRef = useRef(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const sec1InView = useInView(sec1Ref, { once: true, margin: "-100px" });
  const sec2InView = useInView(sec2Ref, { once: true, margin: "-100px" });
  const sec3InView = useInView(sec3Ref, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start end", "end center"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
            Services / Architecture &amp; Strategy
          </motion.span>
          <div className="overflow-hidden mb-6">
            <motion.h1
              className="text-[8vw] md:text-[6vw] font-bold leading-[0.88] tracking-tighter"
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
              Product Architecture &amp; Technical Strategy
            </motion.h1>
          </div>
          <motion.p
            className="text-lg md:text-2xl max-w-2xl leading-relaxed mt-10"
            style={{ color: "#48f0e7" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            We partner with founders and engineering leaders on system design, AI strategy, and technical direction — reducing risk and enabling smarter, faster decisions at every stage of growth.
          </motion.p>
        </div>
      </motion.section>

      {/* SECTION 1 — What We Offer (GlowCard with hover-expand) */}
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
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Services</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={sec1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            What We Offer
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={sec1InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.07 }}
              >
                <GlowCard className="p-6 md:p-8 rounded-2xl bg-card border border-border/40 hover:border-accent/40 transition-all duration-300 group">
                  <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase block mb-5">
                    /{item.num}
                  </span>
                  <h3 className="text-base font-semibold mb-3 group-hover:text-foreground transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <div className="max-h-0 group-hover:max-h-[200px] overflow-hidden transition-all duration-500">
                    <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — Our Approach (hover-expand list) */}
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
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Our Approach</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={sec2InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            How We Think
          </motion.h2>

          <div>
            {pillars.map((item, i) => (
              <motion.div
                key={i}
                className="group border-t border-border py-6 md:py-8 cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                animate={sec2InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.12 }}
              >
                <div className="flex items-center gap-6 group-hover:translate-x-4 transition-transform duration-500">
                  <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase flex-shrink-0">
                    /{item.num}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold">{item.title}</h3>
                </div>
                <div className="max-h-0 group-hover:max-h-[200px] overflow-hidden transition-all duration-500">
                  <p className="text-muted-foreground leading-relaxed pt-4 pl-[calc(1.5rem+24px)] md:pl-[calc(1.5rem+24px)]">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — Process (scroll-driven timeline) */}
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
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Process</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={sec3InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Our Process
          </motion.h2>

          <div ref={timelineRef} className="relative pl-12 md:pl-20">
            {/* Timeline track */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border">
              <motion.div
                className="w-full bg-accent origin-top"
                style={{ height: lineHeight }}
              />
            </div>

            <div className="space-y-16">
              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  className="relative"
                  initial={{ opacity: 0, y: 40 }}
                  animate={sec3InView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                >
                  {/* Dot */}
                  <div className="absolute -left-[calc(3rem-6px)] md:-left-[calc(5rem-6px)] top-1 w-3 h-3 rounded-full bg-border border-2 border-background" />
                  <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase block mb-4">
                    /{step.num}
                  </span>
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm max-w-2xl">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
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
            Ready to build smarter?
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
                Start a Strategy Engagement
                <ArrowUpRight size={18} />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
