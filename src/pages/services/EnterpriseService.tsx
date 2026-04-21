import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { LineReveal, Magnetic } from "@/components/AnimationComponents";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useNavigate } from "react-router-dom";
import { GlowCard } from "@/components/InteractiveElements";
import { EnterpriseArchBlock } from "@/components/AiMlVisuals";

const teamTypes = [
  { num: "01", title: "Enterprise Innovation Labs", desc: "Test ideas fast, launch pilots, and validate new digital products without disrupting core operations." },
  { num: "02", title: "CIO / CTO Offices", desc: "Engineering expertise and predictable delivery for technology leaders managing complex transformation agendas." },
  { num: "03", title: "Corporate Digital Ventures", desc: "From concept to MVP and scaling — we operate as your external venture studio with enterprise-grade discipline." },
  { num: "04", title: "Regional Divisions and R&D Departments", desc: "Launch local initiatives with global standards — strategy, design, and development under one roof." },
  { num: "05", title: "Enterprise AI / Automation Initiatives", desc: "Quick ROI, production-ready AI pilots that move from whiteboard to working system in weeks, not quarters." },
];

const challenges = [
  {
    num: "01",
    challenge: "Slow digital transformation cycles",
    approach: "Agile product teams operating in short sprints — shipping value every two weeks, not every two years.",
  },
  {
    num: "02",
    challenge: "Legacy and fragmented systems",
    approach: "Modernize module by module with a strangler-fig approach that keeps the business running during transition.",
  },
  {
    num: "03",
    challenge: "High vendor costs and opaque pricing",
    approach: "Lean, senior-led teams and transparent pricing models — you know exactly what you're paying for and why.",
  },
  {
    num: "04",
    challenge: "Bureaucracy and slow approvals",
    approach: "Dedicated pilot programs with clear success metrics that create internal momentum and executive buy-in.",
  },
  {
    num: "05",
    challenge: "Unclear AI strategy",
    approach: "Rapid AI prototyping and hands-on advisory support to identify high-value use cases and build confidence.",
  },
];

const processSteps = [
  { num: "01", title: "Strategic Alignment", desc: "Workshops with senior stakeholders to align on business outcomes, constraints, and success metrics before any work begins." },
  { num: "02", title: "Architecture & Technology Audit", desc: "Assessment of existing systems, infrastructure, and technical debt to design a forward-looking architecture." },
  { num: "03", title: "Co-Creation & Design", desc: "Product design and solution architecture developed collaboratively with your team to ensure full organizational buy-in." },
  { num: "04", title: "Development & Integration", desc: "Sprint-based delivery with integration into existing enterprise systems, data pipelines, and security frameworks." },
  { num: "05", title: "Optimization & Continuous Improvement", desc: "Post-launch performance monitoring, KPI reporting, and ongoing iteration to maximize business impact." },
];

const engagementModels = [
  {
    num: "01",
    title: "Innovation Pilot",
    desc: "Test a hypothesis quickly with a time-boxed, budget-fixed pilot — de-risk the investment before committing to full scale.",
  },
  {
    num: "02",
    title: "Strategic Partnership",
    desc: "An ongoing innovation roadmap with a dedicated team that learns your business and drives continuous improvement.",
  },
  {
    num: "03",
    title: "Augmented Enterprise Teams",
    desc: "Add senior specialists — engineers, designers, AI architects — who integrate with your existing teams and processes.",
  },
  {
    num: "04",
    title: "End-to-End Product Delivery",
    desc: "Full ownership of a product from design through deployment — we operate as your external product studio.",
  },
];

const reasons = [
  { title: "Deep Expertise in AI and Digital Innovation", desc: "Proven track record delivering AI solutions, digital platforms, and automation systems across complex enterprise environments." },
  { title: "Enterprise-Level Delivery", desc: "SOC 2-ready processes, senior engineers, and delivery standards that meet enterprise procurement and security requirements." },
  { title: "Transparent Communication and Agile Approach", desc: "Weekly demos, honest status reporting, and sprint retrospectives — no surprises, just consistent progress." },
  { title: "Focus on Measurable Business Results", desc: "Every engagement is tied to specific KPIs. We optimize for your outcomes, not deliverable counts." },
];

export default function EnterpriseService() {
  usePageMetadata({
    title: "Enterprise Software & IT Services | Forrof",
    description: "IT technology partner for enterprise innovation. Move faster, innovate smarter, and scale with confidence — from rapid pilots to production-grade platforms.",
    keywords: "enterprise software, IT consulting, digital transformation, enterprise AI, innovation lab, CTO services, enterprise development",
  });

  const navigate = useNavigate();

  const [activeChallenge, setActiveChallenge] = useState(0);

  const heroRef = useRef(null);
  const sec1Ref = useRef(null);
  const sec2Ref = useRef(null);
  const sec3Ref = useRef(null);
  const sec4Ref = useRef(null);
  const sec5Ref = useRef(null);
  const ctaRef = useRef(null);

  const sec1InView = useInView(sec1Ref, { once: true, margin: "-100px" });
  const sec2InView = useInView(sec2Ref, { once: true, margin: "-100px" });
  const sec3InView = useInView(sec3Ref, { once: true, margin: "-100px" });
  const sec4InView = useInView(sec4Ref, { once: true, margin: "-100px" });
  const sec5InView = useInView(sec5Ref, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });


  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* HERO */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-end section-padding pt-28 pb-16 md:pb-24 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-[calc(50%-350px)] right-0 w-[700px] h-[700px] rounded-full blur-[130px] opacity-70"
            style={{ background: "rgba(0, 212, 170, 0.08)" }}
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
              Services / Enterprise
            </motion.span>
            <div className="overflow-hidden mb-6 py-2">
              <motion.h1
                className="text-[13vw] md:text-[10vw] xl:text-[8vw] font-bold leading-[0.95] tracking-tighter"
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
                Enterprise Software
              </motion.h1>
            </div>
            <motion.p
              className="text-lg md:text-2xl max-w-2xl leading-relaxed mt-10"
              style={{ color: "#48f0e7" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              IT Technology Partner for Enterprise Innovation. Move Faster. Innovate Smarter. Scale with Confidence. From rapid pilots to production-grade platforms, we deliver speed, expertise, and predictable execution.
            </motion.p>
        </div>
      </motion.section>

      {/* SECTION 1 — Who We Serve (hover-expand list) */}
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
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Who We Serve</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={sec1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Fresh, Flexible IT Services for Enterprise Teams
          </motion.h2>

          <div>
            {teamTypes.map((item, i) => (
              <motion.div
                key={i}
                className="group border-t border-border py-6 md:py-8 cursor-pointer hover:bg-foreground/[0.02] rounded-xl"
                initial={{ opacity: 0, y: 40 }}
                animate={sec1InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.08 }}
              >
                <div className="flex items-center gap-6 group-hover:translate-x-4 transition-transform duration-500">
                  <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase flex-shrink-0">
                    /{item.num}
                  </span>
                  <h3 className="text-lg md:text-xl font-semibold">{item.title}</h3>
                </div>
                <div className="max-h-0 group-hover:max-h-[200px] overflow-hidden transition-all duration-500">
                  <p className="text-muted-foreground leading-relaxed text-sm pt-4 pl-[calc(1.5rem+24px)] md:pl-[calc(1.5rem+24px)]">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — Challenges (click-to-select) */}
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
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Challenges</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={sec2InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Challenges We Help Enterprise Teams Overcome
          </motion.h2>

          <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-16">
            {/* Left — clickable list */}
            <div className="space-y-2">
              {challenges.map((item, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveChallenge(i)}
                  onMouseEnter={() => setActiveChallenge(i)}
                  className={`w-full text-left flex items-center gap-4 py-4 px-4 rounded-xl transition-all duration-300 ${
                    activeChallenge === i
                      ? "bg-card border border-accent/40"
                      : "border border-transparent hover:bg-card/50"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={sec2InView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                >
                  <span className="relative flex-shrink-0 w-3 h-3">
                    <span
                      className={`absolute inset-0 rounded-full transition-all duration-300 ${
                        activeChallenge === i ? "bg-accent scale-100" : "bg-muted-foreground/30 scale-75"
                      }`}
                    />
                    {activeChallenge === i && (
                      <motion.span
                        className="absolute inset-0 rounded-full bg-accent/40"
                        initial={{ scale: 1 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase flex-shrink-0">
                    {item.num}
                  </span>
                  <span
                    className={`text-sm md:text-base font-medium transition-colors duration-300 ${
                      activeChallenge === i ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {item.challenge}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Right — detail panel */}
            <div className="relative min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeChallenge}
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="p-8 md:p-10 rounded-2xl bg-card border border-border/40"
                >
                  <div className="mb-8">
                    <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">Challenge</p>
                    <h3 className="text-xl md:text-2xl font-bold">{challenges[activeChallenge].challenge}</h3>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">Our Approach</p>
                    <p className="text-muted-foreground leading-relaxed text-base">{challenges[activeChallenge].approach}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture visual */}
      <section className="section-forced-dark section-padding py-24">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <EnterpriseArchBlock />
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Enterprise-Grade from the Ground Up</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Every system we build is designed for enterprise reality — microservices architecture, SSO integration, SOC 2 compliance, and 99.99% uptime. No shortcuts, no tech debt, no surprises.
              </p>
              <Magnetic>
                <button
                  onClick={() => navigate("/contact")}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300 font-medium"
                >
                  Discuss Your Architecture
                  <ArrowUpRight size={18} />
                </button>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — How We Work (scroll-driven timeline) */}
      <section ref={sec3Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <ProcessTimeline steps={processSteps} inView={sec3InView} sectionLabel="/03" title="How We Work with Enterprise Clients" labelText="Process" />
        </div>
      </section>

      {/* SECTION 4 — Engagement Models (GlowCard with hover-expand) */}
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
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Engagement Models</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={sec4InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Flexible Enterprise IT Services
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {engagementModels.map((model, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={sec4InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <GlowCard className="p-6 md:p-8 rounded-2xl bg-card border border-border/40 hover:border-accent/40 transition-all duration-300 group">
                  <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase block mb-5">
                    /{model.num}
                  </span>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-foreground transition-colors">
                    {model.title}
                  </h3>
                  <div className="max-h-0 group-hover:max-h-[200px] overflow-hidden transition-all duration-500">
                    <p className="text-muted-foreground leading-relaxed">{model.desc}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — Why Partner with Us (GlowCard with hover-expand) */}
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
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Why Us</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={sec5InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Why Enterprises Partner with Forrof
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {reasons.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={sec5InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <GlowCard className="p-6 md:p-10 rounded-2xl bg-card border border-border/40 hover:border-accent/40 transition-all duration-300 group">
                  <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                  <div className="max-h-0 group-hover:max-h-[200px] overflow-hidden transition-all duration-500">
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="section-forced-dark section-padding py-40 relative overflow-hidden">
        <div className="max-w-[1800px] mx-auto text-center relative z-10">
          <motion.h2
            className="text-4xl md:text-7xl font-bold tracking-tighter mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Let's accelerate enterprise innovation together.
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Tell us about your initiative. We'll respond within one business day with a tailored approach.
          </motion.p>
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
                Book a Strategy Session
                <ArrowUpRight size={18} />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
