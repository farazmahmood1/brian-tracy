import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Plus, Minus, Check } from "lucide-react";
import { LineReveal, Magnetic } from "@/components/AnimationComponents";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { GlowCard, CountUp } from "@/components/InteractiveElements";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useNavigate } from "react-router-dom";

/* ───────────────────────── DATA ───────────────────────── */

const challenges = [
  { title: "Legacy systems that can't scale", desc: "Aging SCADA/HMI solutions struggle with modern data, UX expectations, and system integration." },
  { title: "Lack of real-time operational visibility", desc: "Without live data from sensors, machines, and control systems, decision-making is delayed and reactive." },
  { title: "Manual processes & error-prone workflows", desc: "Paper logs, spreadsheets, and isolated apps result in human errors, lost time, and compliance risks." },
  { title: "Disconnected OT & IT environments", desc: "Engineering, maintenance, and production teams operate in silos, slowing down efficiency and innovation." },
  { title: "Difficulty adapting to change", desc: "Rigid systems make it hard to integrate new hardware, automate workflows, or respond to market shifts." },
];

const valuePoints = [
  "Seamlessly integrate with existing machinery and platforms",
  "Enable real-time monitoring and alerts",
  "Reduce manual input through automation",
  "Improve safety, compliance, and operational efficiency",
  "Scale your systems as your factory evolves",
];

const solutions = [
  "Enterprise Resource Planning (ERP)",
  "Enterprise Asset Management (EAM)",
  "Product Lifecycle Management (PLM)",
  "Manufacturing Execution Systems (MES)",
  "Industrial Analytics & Business Intelligence",
  "IoT Integration & Remote Monitoring",
  "SCADA/HMI Modernization",
  "Predictive Maintenance & Process Automation",
];

const serviceItems = [
  { num: "01", title: "Custom Industrial Software Development", desc: "We design and develop tailored platforms that align with your production processes, operational logic, and infrastructure." },
  { num: "02", title: "Industrial Web & Mobile Applications", desc: "Build internal tools, dashboards, field service apps, or remote control interfaces\u2014available on any device." },
  { num: "03", title: "Legacy System Modernization", desc: "Refactor or rebuild outdated SCADA, MES, ERP, or HMI systems to improve performance, scalability, and UX." },
  { num: "04", title: "IoT & Industrial Connectivity", desc: "Integrate sensors, PLCs, and machines with cloud platforms or on-prem solutions to gain real-time visibility." },
  { num: "05", title: "Cloud Migration & Infrastructure Setup", desc: "Move your infrastructure to AWS, Azure, or GCP with proper security, scalability, and redundancy in place." },
  { num: "06", title: "Data Analytics & Visualization", desc: "Build BI dashboards and analytics pipelines to extract insights from your operational and sensor data." },
  { num: "07", title: "AI & Predictive Maintenance", desc: "Use ML models to forecast machine failures, optimize maintenance schedules, and reduce unplanned downtime." },
  { num: "08", title: "QA & Test Automation for Industrial Systems", desc: "Ensure your mission-critical systems run smoothly through rigorous testing and automation practices." },
  { num: "09", title: "DevOps for Manufacturing Environments", desc: "Set up CI/CD pipelines, infrastructure as code, and containerization for industrial-grade software delivery." },
];

const aiCapabilities = [
  { title: "Predictive Maintenance", desc: "Detect anomalies before failures happen. We apply machine learning to sensor data to forecast equipment issues, reduce unplanned downtime, and optimize maintenance schedules." },
  { title: "Visual Quality Control", desc: "Use computer vision to inspect products on the assembly line, identifying defects with greater speed and accuracy than manual inspection." },
  { title: "AI-Powered Process Optimization", desc: "Leverage AI to optimize production parameters, reduce waste, and improve throughput across your manufacturing processes." },
  { title: "Computer Vision for Safety & Compliance", desc: "Analyze video feeds from the factory floor to detect safety violations and ensure compliance with regulatory standards." },
  { title: "Intelligent Document & Workflow Automation", desc: "Automate document processing, approval workflows, and reporting to eliminate manual bottlenecks and reduce human error." },
];

const processSteps = [
  { num: "01", title: "Project Discovery", desc: "We start by understanding your business goals, technical requirements, and product vision to ensure the right foundation." },
  { num: "02", title: "Team Assembly", desc: "We build a dedicated in-house team and craft a clear, strategic industrial development plan tailored to your project." },
  { num: "03", title: "Project Execution", desc: "Our expert team moves fast, working in sync with your goals to deliver high-quality results with speed and precision." },
];

const whyUs = [
  { title: "Own certified engineers", desc: "PLC, SCADA, IoT \u2014 deep understanding of industrial protocols, control systems, and real-time architectures.", stat: "50+", statLabel: "Engineers" },
  { title: "100% NDA and IP protection", desc: "Full legal transparency and ownership \u2014 your data and code are always safe.", stat: "100%", statLabel: "IP Protected" },
  { title: "Guaranteed support 24/7", desc: "We provide global coverage and rapid response to critical production issues.", stat: "24/7", statLabel: "Support" },
  { title: "Proven results", desc: "Time-to-market acceleration, 30\u201360% downtime reduction, and improved system visibility.", stat: "60%", statLabel: "Less Downtime" },
  { title: "Flexible team scaling", desc: "Start small and scale fast \u2014 no overhead, no delays, no long hiring cycles.", stat: "2x", statLabel: "Faster Scale" },
  { title: "End-to-end delivery", desc: "Business analysts, designers, and QA engineers ensure full-cycle delivery, not just coding.", stat: "E2E", statLabel: "Full Cycle" },
];

const techTabs = [
  { title: "SCADA & Industrial Protocols", desc: "Modbus, OPC UA, MQTT \u2014 we integrate modern and legacy systems with industrial control hardware." },
  { title: "Cloud & Edge Computing", desc: "Deploy workloads across AWS, Azure, GCP, and edge devices with k3s, containers, and GitOps pipelines." },
  { title: "IoT & Embedded Development", desc: "Build firmware and connectivity layers for sensors, PLCs, and gateways using Zephyr, FreeRTOS, and custom stacks." },
  { title: "Web & Mobile Development", desc: "React, Next.js, React Native, and Flutter for internal tools, dashboards, and field service applications." },
  { title: "AI & Computer Vision", desc: "TensorFlow, PyTorch, ONNX Runtime, and TensorRT for predictive maintenance, quality control, and safety monitoring." },
  { title: "Data Engineering & Visualization", desc: "InfluxDB, TimescaleDB, Apache Kafka, Grafana, and custom BI dashboards for operational intelligence." },
];

/* ─────────────────────── PAGE ─────────────────────── */

export default function IndustrialSectorPage() {
  usePageMetadata({
    title: "Industrial Software Development | Forrof",
    description: "Custom industrial software development to optimize your factory\u2019s performance. SCADA, MES, HMI, IoT, and predictive AI powering your operations.",
    keywords: "industrial software, SCADA, MES, HMI, IoT, predictive maintenance, factory automation, industrial IoT",
  });

  const navigate = useNavigate();
  const [openAi, setOpenAi] = useState<number | null>(0);
  const [activeTech, setActiveTech] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(0);

  // Section refs
  const sec1Ref = useRef(null);
  const sec2Ref = useRef(null);
  const sec3Ref = useRef(null);
  const sec4Ref = useRef(null);
  const sec5Ref = useRef(null);
  const sec6Ref = useRef(null);
  const sec7Ref = useRef(null);
  const ctaRef = useRef(null);

  const sec1InView = useInView(sec1Ref, { once: true, margin: "-100px" });
  const sec2InView = useInView(sec2Ref, { once: true, margin: "-100px" });
  const sec3InView = useInView(sec3Ref, { once: true, margin: "-100px" });
  const sec4InView = useInView(sec4Ref, { once: true, margin: "-100px" });
  const sec5InView = useInView(sec5Ref, { once: true, margin: "-100px" });
  const sec6InView = useInView(sec6Ref, { once: true, margin: "-100px" });
  const sec7InView = useInView(sec7Ref, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });


  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ═══════════ HERO ═══════════ */}
      <motion.section
        className="relative min-h-screen flex items-end section-padding pt-28 pb-16 md:pb-24 overflow-hidden"
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
            Industries / Industrial Sector
          </motion.span>
          <div className="overflow-hidden mb-6 py-2">
            <motion.h1
              className="text-[10vw] md:text-[7vw] font-bold leading-[0.95] tracking-tighter"
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
              Custom Industrial Software Development
            </motion.h1>
          </div>
          <motion.p
            className="text-lg md:text-2xl max-w-3xl leading-relaxed mt-10"
            style={{ color: "#48f0e7" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Cut downtime and raise yield with SCADA, MES, HMI, IoT, and predictive AI powering your operations. Expect clear KPIs, transparent ROI, and continuous improvement.
          </motion.p>
          <motion.div className="mt-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <Magnetic>
              <button onClick={() => navigate("/contact")} className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-80 transition-opacity">
                Request a Consultation
                <ArrowUpRight size={18} />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </motion.section>

      {/* ═══════════ SEC 1 — Challenges (interactive select, not boxes) ═══════════ */}
      <section ref={sec1Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/01</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Challenges</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Challenges We Crush, Value You Keep
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-16 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            Industrial companies often operate with outdated, disconnected systems &mdash; making growth expensive and inefficient.
          </motion.p>

          {/* Interactive challenge selector — click to reveal */}
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
            {/* Left: challenge list */}
            <div className="space-y-0">
              {challenges.map((c, i) => (
                <motion.button
                  key={i}
                  className={`w-full text-left py-5 border-t border-border flex items-center gap-5 group transition-colors duration-300 ${activeChallenge === i ? "" : ""}`}
                  onClick={() => setActiveChallenge(i)}
                    onMouseEnter={() => setActiveChallenge(i)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={sec1InView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                >
                  <motion.span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    animate={{ scale: activeChallenge === i ? 1 : 0.5, backgroundColor: activeChallenge === i ? "#00d4aa" : "rgba(255,255,255,0.2)" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className={`text-lg font-medium transition-colors duration-300 ${activeChallenge === i ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                    {c.title}
                  </span>
                </motion.button>
              ))}
              <div className="border-t border-border" />
            </div>

            {/* Right: animated detail panel */}
            <div className="relative min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeChallenge}
                  className="p-8 md:p-10 rounded-2xl border border-border/40 bg-card"
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <span className="text-xs text-accent font-medium tracking-widest uppercase block mb-4">
                    Challenge {String(activeChallenge + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{challenges[activeChallenge].title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">{challenges[activeChallenge].desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Value proposition sub-section with staggered check reveals */}
          <motion.div className="mt-24" initial={{ opacity: 0, y: 40 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.5 }}>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 max-w-3xl">
              We build tailored software that modernizes your operations, without the cost of in-house development.
            </h3>
            <p className="text-muted-foreground max-w-3xl mb-10 leading-relaxed">
              With Forrof, you get access to a dedicated outsourced engineering team that understands industrial complexity &mdash; and delivers modern, robust software that works.
            </p>
            <ul className="space-y-4 max-w-2xl">
              {valuePoints.map((point, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -30 }}
                  animate={sec1InView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                >
                  <motion.span
                    className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0"
                    initial={{ scale: 0 }}
                    animate={sec1InView ? { scale: 1 } : {}}
                    transition={{ type: "spring", delay: 0.8 + i * 0.1 }}
                  >
                    <Check size={14} className="text-accent" />
                  </motion.span>
                  <span className="text-foreground">{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ SEC 2 — From Problem to Product (animated reveal grid) ═══════════ */}
      <section ref={sec2Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/02</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Solutions</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter" initial={{ opacity: 0, y: 40 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
              From Problem to Product
            </motion.h2>
            <motion.p className="text-lg text-muted-foreground leading-relaxed self-end" initial={{ opacity: 0, y: 30 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
              We help industrial companies modernize operations, gain control over assets, and improve efficiency through tailored software.
            </motion.p>
          </div>

          {/* Hover-reveal list (like ServicesSection) */}
          <div className="space-y-0">
            {solutions.map((title, i) => (
              <motion.div
                key={i}
                className="group border-t border-border cursor-default hover:bg-foreground/[0.02] rounded-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={sec2InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.06 }}
              >
                <div className="py-5 md:py-6 flex items-center gap-6 md:gap-16">
                  <span className="text-sm text-muted-foreground group-hover:text-accent font-medium min-w-[40px] transition-colors duration-300">
                    /{String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold group-hover:translate-x-4 transition-transform duration-500">
                    {title}
                  </h3>
                </div>
              </motion.div>
            ))}
            <motion.div className="border-t border-border" initial={{ scaleX: 0 }} animate={sec2InView ? { scaleX: 1 } : {}} transition={{ duration: 1.5, delay: 1 }} style={{ transformOrigin: "left" }} />
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 3 — Services (glow cards with hover expand) ═══════════ */}
      <section ref={sec3Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/03</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Services</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Our Services at a Glance
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-20 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            Full-cycle industrial software development to modernize operations and accelerate digital transformation.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceItems.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={sec3InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.06 }}
              >
                <GlowCard className="h-full rounded-2xl bg-card border border-border/40 hover:border-accent/40 transition-all duration-300 group">
                  <div className="p-6 md:p-8 relative z-10">
                    <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase block mb-6">/{card.num}</span>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-foreground transition-colors">{card.title}</h3>
                    {/* Description reveals on hover */}
                    <div className="max-h-0 group-hover:max-h-[200px] overflow-hidden transition-all duration-500 ease-out">
                      <p className="text-muted-foreground leading-relaxed text-sm pt-1">{card.desc}</p>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>

          <motion.div className="mt-12" initial={{ opacity: 0, y: 20 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.6 }}>
            <Magnetic>
              <button onClick={() => navigate("/contact")} className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300 font-medium">
                Contact Us <ArrowUpRight size={18} />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ SEC 4 — AI & Computer Vision (accordion) ═══════════ */}
      <section ref={sec4Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec4InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/04</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">AI &amp; Vision</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec4InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Smarter Operations: Driven by AI and Computer Vision
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-16 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec4InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            We build smart custom software solutions for industrial services to optimize processes, reduce downtime, and unlock new levels of efficiency.
          </motion.p>

          <div className="space-y-0">
            {aiCapabilities.map((item, i) => (
              <motion.div key={i} className="border-t border-border" initial={{ opacity: 0, y: 16 }} animate={sec4InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}>
                <button className="w-full py-7 flex items-center justify-between gap-6 text-left group transition-all duration-300 hover:pl-4 hover:bg-foreground/[0.03] rounded-xl" onClick={() => setOpenAi(openAi === i ? null : i)}>
                  <div className="flex items-center gap-5">
                    <motion.span
                      className="w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 text-xs font-mono transition-all duration-300 group-hover:border-accent group-hover:bg-accent/10"
                      animate={{
                        borderColor: openAi === i ? "rgba(0,212,170,0.5)" : "rgba(255,255,255,0.1)",
                        backgroundColor: openAi === i ? "rgba(0,212,170,0.1)" : "transparent",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.span animate={{ color: openAi === i ? "#00d4aa" : "rgba(255,255,255,0.4)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </motion.span>
                    </motion.span>
                    <span className="text-xl md:text-2xl font-semibold group-hover:text-foreground group-hover:translate-x-2 transition-all duration-300">{item.title}</span>
                  </div>
                  <motion.div
                    className="w-9 h-9 rounded-full border border-border flex items-center justify-center flex-shrink-0 group-hover:border-foreground group-hover:scale-110 transition-all duration-300"
                    animate={{ rotate: openAi === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {openAi === i ? <Minus size={14} className="text-foreground" /> : <Plus size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />}
                  </motion.div>
                </button>
                <motion.div
                  className="overflow-hidden"
                  initial={false}
                  animate={{ height: openAi === i ? "auto" : 0, opacity: openAi === i ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <motion.p
                    className="text-muted-foreground leading-relaxed text-sm pb-8 pl-[3.75rem] max-w-4xl"
                    initial={{ y: -10 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.desc}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 5 — Process (scroll-driven timeline) ═══════════ */}
      <section ref={sec5Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <ProcessTimeline steps={processSteps} inView={sec5InView} sectionLabel="/05" labelText="How We Work" />
        </div>
      </section>

      {/* ═══════════ SEC 6 — Why Choose Us (stat cards with counters) ═══════════ */}
      <section ref={sec6Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec6InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/06</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Why Us</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec6InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Why Choose Us
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-16 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec6InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            We combine industrial expertise with flexible delivery to help you innovate faster and more cost-effectively.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={sec6InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.08 }}
              >
                <GlowCard className="h-full rounded-2xl bg-card border border-border/40 hover:border-accent/40 transition-all duration-300 group">
                  <div className="p-6 md:p-8 relative z-10">
                    {/* Animated stat */}
                    <div className="mb-6">
                      <span className="text-4xl md:text-5xl font-bold text-accent">
                        <CountUp value={item.stat} delay={200 + i * 100} />
                      </span>
                      <span className="block text-xs text-muted-foreground mt-1 uppercase tracking-widest">{item.statLabel}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 7 — Technology Expertise (interactive tabs) ═══════════ */}
      <section ref={sec7Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec7InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/07</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Tech Stack</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec7InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Technology Expertise &amp; Engineering Capabilities
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-16 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec7InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            Our engineering team combines deep domain knowledge with hands-on experience in industrial-grade software stacks.
          </motion.p>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Tab buttons (vertical) */}
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {techTabs.map((tab, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveTech(i)}
                    onMouseEnter={() => setActiveTech(i)}
                  className={`relative px-5 py-3 rounded-xl text-sm font-medium text-left whitespace-nowrap lg:whitespace-normal transition-all duration-300 ${
                    activeTech === i
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={sec7InView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                >
                  {activeTech === i && (
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-foreground/5 border border-accent/30"
                      layoutId="activeTechTab"
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                  )}
                  <span className="relative z-10">{tab.title}</span>
                </motion.button>
              ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTech}
                className="p-8 md:p-10 rounded-2xl bg-card border border-border/40 flex flex-col justify-center min-h-[200px]"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="text-xs text-accent font-medium tracking-widest uppercase block mb-4">
                  {String(activeTech + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{techTabs[activeTech].title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{techTabs[activeTech].desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section ref={ctaRef} className="section-forced-dark section-padding py-40">
        <div className="max-w-[1800px] mx-auto text-center">
          <motion.p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: "#00d4aa" }} initial={{ opacity: 0, y: 20 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            Expertise that ships
          </motion.p>
          <motion.h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-10" initial={{ opacity: 0, y: 40 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Industry-grade solutions with measurable outcomes.
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }}>
            <Magnetic>
              <button onClick={() => navigate("/contact")} className="inline-flex items-center gap-3 px-8 py-5 bg-foreground text-background rounded-full font-medium hover:opacity-80 transition-opacity">
                Contact Us <ArrowUpRight size={18} />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
