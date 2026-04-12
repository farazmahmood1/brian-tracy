import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Plus, Minus, Check } from "lucide-react";
import { LineReveal, Magnetic } from "@/components/AnimationComponents";
import { GlowCard, CountUp } from "@/components/InteractiveElements";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useNavigate } from "react-router-dom";

/* ───────────────────────── DATA ───────────────────────── */

const painPoints = [
  {
    num: "01",
    title: "Lack of Real-Time Visibility and Control",
    desc: "We implemented a real-time vehicle tracking system that gave dispatchers complete visibility and allowed customers to track in real time.",
  },
  {
    num: "02",
    title: "Inefficient Planning and High Operational Costs",
    desc: "Using the TomTom API, we built a route optimization engine that reduced delivery times by 20% and eliminated scheduling chaos.",
  },
  {
    num: "03",
    title: "Complex, Opaque Paperwork",
    desc: "We digitize and automate document workflows for compliance, speed, and error prevention.",
  },
  {
    num: "04",
    title: "Fragmented IT Systems",
    desc: "We create unified logistics software platforms with smart integrations for a cohesive digital ecosystem.",
  },
];

const whoWeBuildFor = [
  {
    title: "3PLs and Freight Forwarders",
    bullets: [
      "Centralized TMS with client, shipment, and billing management",
      "Client portals for tracking, scheduling, and document access",
      "ERP/WMS/API integration and performance dashboards",
    ],
  },
  {
    title: "E-Commerce & Retail",
    bullets: [
      "Order fulfillment and last-mile delivery optimization",
      "Warehouse management and inventory tracking",
      "Returns processing and customer notifications",
    ],
  },
  {
    title: "Manufacturing Companies",
    bullets: [
      "Supply chain visibility and vendor management",
      "Production scheduling and materials tracking",
      "Quality control and compliance documentation",
    ],
  },
  {
    title: "Fleets and Carriers",
    bullets: [
      "GPS-based fleet tracking and driver management",
      "Fuel consumption monitoring and maintenance scheduling",
      "Load optimization and capacity planning",
    ],
  },
  {
    title: "Passenger Transportation",
    bullets: [
      "Real-time vehicle tracking for dispatchers and passengers",
      "Route optimization for capacity, time, and traffic",
      "Integrated dispatching and trip planning tools",
    ],
  },
];

const coreFeatures = [
  { title: "Transportation Management System (TMS)", desc: "End-to-end transport management, route planning, order handling, carrier management, and freight calculation." },
  { title: "Warehouse Management System (WMS)", desc: "Fleet and warehouse management, vehicle details, maintenance schedules, fuel monitoring, and driver management." },
  { title: "Last-Mile Delivery Module", desc: "Door-to-door delivery management, dynamic route optimization, driver mobile app, and electronic Proof of Delivery." },
  { title: "Real-time Fleet Tracking", desc: "GPS-based real-time vehicle tracking for operational control and visibility." },
  { title: "Customizable Dashboards", desc: "Widgets, KPIs, graphs, charts, and maps for monitoring key metrics." },
  { title: "Accounting Systems Integration", desc: "APIs for easy data exchange with accounting and financial systems." },
  { title: "Client & Partner Systems Integration", desc: "APIs for data exchange of orders and statuses with partners." },
  { title: "Billing & Invoicing Module", desc: "Service charge computation from tariffs and actuals with auto-invoicing." },
  { title: "AI-based Forecasting", desc: "Demand forecasting, inventory optimization, and peak load forecasting." },
  { title: "Document Management System", desc: "Central document repository with electronic approval and signature workflows." },
];

const servicesOverview = [
  { title: "IT Consulting", desc: "We analyze your logistics workflows and technology stack to define a digital strategy that aligns with your operational goals." },
  { title: "Product Discovery", desc: "Collaborative workshops to map your business model, target users, and MVP scope into an actionable product roadmap." },
  { title: "UI/UX Design", desc: "User-centered design for dispatchers, drivers, and customers that simplifies complex logistics workflows into intuitive interfaces." },
  { title: "Web Development", desc: "Scalable web platforms for fleet management, shipment tracking, and logistics operations built with modern frameworks." },
  { title: "QA Testing", desc: "Comprehensive quality assurance including functional, performance, and integration testing for mission-critical logistics systems." },
  { title: "Engagement Models", desc: "Flexible cooperation models from dedicated teams and staff augmentation to fixed-price project delivery." },
];

const whyUs = [
  { title: "Proven Transportation Expertise", desc: "Deep experience building logistics platforms that handle real-world complexity at scale.", stat: "10+", statLabel: "Projects" },
  { title: "Business Focus", desc: "Every feature is built to maximize efficiency, reduce waste, and deliver measurable cost savings.", stat: "40%", statLabel: "Cost Reduction" },
  { title: "Flexibility and Custom Solutions", desc: "Tailored architectures and workflows designed around your unique operational requirements.", stat: "Custom", statLabel: "Tailored" },
  { title: "Strong Mobile & Web Expertise", desc: "Cross-platform apps for drivers, dispatchers, and customers with real-time sync and offline support.", stat: "100+", statLabel: "Apps Built" },
  { title: "End-to-End Support", desc: "From discovery to deployment and beyond, we provide continuous support and optimization.", stat: "24/7", statLabel: "Support" },
];

const results = [
  "70% reduction in trip management time",
  "3x improvement in driver retention",
  "40% lower operational costs",
  "Scaled to manage 5,000+ vehicles",
];

/* ─────────────────────── PAGE ─────────────────────── */

export default function TransportationPage() {
  usePageMetadata({
    title: "Transportation & Logistics Software Development | Forrof",
    description: "Custom logistics and transportation software development. Route optimization, real-time tracking, TMS, WMS integrations.",
    keywords: "logistics software, transportation management, TMS, WMS, route optimization, fleet tracking, supply chain",
  });

  const navigate = useNavigate();
  const [openPain, setOpenPain] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState(0);

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

      {/* ═══════════ HERO ═══════════ */}
      <motion.section
        className="relative min-h-screen flex items-end section-padding pt-28 pb-16 md:pb-24 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-[calc(50%-350px)] right-[12%] w-[700px] h-[700px] rounded-full blur-[130px]"
            style={{ background: "rgba(0, 212, 170, 0.07)" }}
            animate={{ x: [0, -45, 35, -50, 0], y: [0, 55, -25, 35, 0], opacity: [0.5, 0.85, 0.4, 0.9, 0.5] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[15%] left-[5%] w-[500px] h-[500px] rounded-full blur-[120px]"
            style={{ background: "rgba(72, 240, 231, 0.04)" }}
            animate={{ x: [0, 30, -20, 0], y: [0, -30, 20, 0], opacity: [0.3, 0.6, 0.3, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background z-10" />

        <div className="relative z-20 max-w-[1800px] mx-auto w-full">
          <motion.span className="inline-block text-xs uppercase tracking-[0.3em] mb-8" style={{ color: "#00d4aa" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            Industries / Logistics &amp; Transportation
          </motion.span>
          <div className="overflow-hidden mb-6 py-2">
            <motion.h1
              className="text-[10vw] md:text-[7vw] font-bold leading-[0.95] tracking-tighter"
              style={{ background: "linear-gradient(135deg, #ffffff 0%, #48f0e7 30%, #00d4aa 60%, #126b66 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", backgroundSize: "200% 200%" }}
              initial={{ y: "110%", backgroundPosition: "0% 50%" }}
              animate={{ y: 0, backgroundPosition: "100% 50%" }}
              transition={{ y: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }, backgroundPosition: { duration: 3, ease: "easeInOut", delay: 1, repeat: Infinity, repeatType: "reverse" } }}
            >
              Transportation &amp; Logistics Software Development
            </motion.h1>
          </div>
          <motion.p className="text-lg md:text-2xl max-w-3xl leading-relaxed mt-10" style={{ color: "#48f0e7" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            Custom logistics software from route optimization and real-time tracking to seamless WMS and TMS integrations. Solutions that minimize costs, reduce delays, and streamline operations.
          </motion.p>
          <motion.div className="mt-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <Magnetic>
              <button onClick={() => navigate("/contact")} className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-80 transition-opacity">
                Discuss Your Project <ArrowUpRight size={18} />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </motion.section>

      {/* ═══════════ SEC 1 — Pain Points (accordion with numbered indicators) ═══════════ */}
      <section ref={sec1Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/01</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Pain Points</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Common Challenges in Logistics Software We Solve
          </motion.h2>

          <div className="space-y-0">
            {painPoints.map((item, i) => (
              <motion.div key={i} className="border-t border-border" initial={{ opacity: 0, y: 16 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}>
                <button className="w-full py-7 flex items-center justify-between gap-6 text-left group transition-all duration-300 hover:pl-4 hover:bg-foreground/[0.03] rounded-xl" onClick={() => setOpenPain(openPain === i ? null : i)}>
                  <div className="flex items-center gap-5">
                    <motion.span
                      className="w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 text-xs font-mono transition-all duration-300 group-hover:border-accent group-hover:bg-accent/10"
                      animate={{ borderColor: openPain === i ? "rgba(0,212,170,0.5)" : "rgba(255,255,255,0.1)", backgroundColor: openPain === i ? "rgba(0,212,170,0.1)" : "transparent" }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.span animate={{ color: openPain === i ? "#00d4aa" : "rgba(255,255,255,0.4)" }}>{item.num}</motion.span>
                    </motion.span>
                    <span className="text-xl md:text-2xl font-semibold group-hover:text-foreground group-hover:translate-x-2 transition-all duration-300">{item.title}</span>
                  </div>
                  <motion.div className="w-9 h-9 rounded-full border border-border flex items-center justify-center flex-shrink-0 group-hover:border-foreground group-hover:scale-110 transition-all duration-300" animate={{ rotate: openPain === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    {openPain === i ? <Minus size={14} className="text-foreground" /> : <Plus size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />}
                  </motion.div>
                </button>
                <motion.div className="overflow-hidden" initial={false} animate={{ height: openPain === i ? "auto" : 0, opacity: openPain === i ? 1 : 0 }} transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}>
                  <p className="text-muted-foreground leading-relaxed text-sm pb-8 pl-[3.75rem] max-w-4xl">{item.desc}</p>
                </motion.div>
              </motion.div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 2 — Who We Build For (vertical tabs with layoutId) ═══════════ */}
      <section ref={sec2Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/02</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Clients</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Who We Build For
          </motion.h2>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {whoWeBuildFor.map((tab, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  onMouseEnter={() => setActiveTab(i)}
                  className={`relative px-5 py-3 rounded-xl text-sm font-medium text-left whitespace-nowrap lg:whitespace-normal transition-all duration-300 ${activeTab === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={sec2InView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                >
                  {activeTab === i && (
                    <motion.div className="absolute inset-0 rounded-xl bg-foreground/5 border border-accent/30" layoutId="activeTransportTab" transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }} />
                  )}
                  <span className="relative z-10">{tab.title}</span>
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="p-8 md:p-10 rounded-2xl bg-card border border-border/40 flex flex-col justify-center min-h-[200px]"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="text-xs text-accent font-medium tracking-widest uppercase block mb-4">{String(activeTab + 1).padStart(2, "0")}</span>
                <h3 className="text-2xl md:text-3xl font-bold mb-6">{whoWeBuildFor[activeTab].title}</h3>
                <ul className="space-y-3">
                  {whoWeBuildFor[activeTab].bullets.map((bullet, bi) => (
                    <li key={bi} className="flex items-start gap-3 text-muted-foreground leading-relaxed text-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 3 — Core Features (glow cards with hover-expand) ═══════════ */}
      <section ref={sec3Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/03</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Features</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Core Features and Architecture
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-20 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            Modular, scalable components designed to cover every critical logistics workflow &mdash; from warehouse to last-mile.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((card, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: i * 0.06 }}>
                <GlowCard className="h-full rounded-2xl bg-card border border-border/40 hover:border-accent/40 transition-all duration-300 group">
                  <div className="p-6 md:p-8 relative z-10">
                    <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase block mb-6">/{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-foreground transition-colors">{card.title}</h3>
                    <div className="max-h-0 group-hover:max-h-[200px] overflow-hidden transition-all duration-500 ease-out">
                      <p className="text-muted-foreground leading-relaxed text-sm pt-1">{card.desc}</p>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 4 — Services Overview (hover-expand list) ═══════════ */}
      <section ref={sec4Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec4InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/04</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Services</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter" initial={{ opacity: 0, y: 40 }} animate={sec4InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
              Transportation and Logistics Software Development Services
            </motion.h2>
            <motion.p className="text-lg text-muted-foreground leading-relaxed self-end" initial={{ opacity: 0, y: 30 }} animate={sec4InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
              End-to-end development services to digitize, automate, and optimize your logistics operations.
            </motion.p>
          </div>

          <div className="space-y-0">
            {servicesOverview.map((item, i) => (
              <motion.div
                key={i}
                className="group border-t border-border cursor-default hover:bg-foreground/[0.02] rounded-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={sec4InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.06 }}
              >
                <div className="py-5 md:py-6 flex items-center gap-6 md:gap-16">
                  <span className="text-sm text-muted-foreground group-hover:text-accent font-medium min-w-[40px] transition-colors duration-300">
                    /{String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold group-hover:translate-x-4 transition-transform duration-500">
                    {item.title}
                  </h3>
                </div>
                <div className="max-h-0 group-hover:max-h-[200px] overflow-hidden transition-all duration-500">
                  <p className="text-muted-foreground pb-6 pl-0 md:pl-[104px] max-w-3xl leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
            <motion.div className="border-t border-border" initial={{ scaleX: 0 }} animate={sec4InView ? { scaleX: 1 } : {}} transition={{ duration: 1.5, delay: 0.8 }} style={{ transformOrigin: "left" }} />
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 5 — Why Choose Us (stat cards + results) ═══════════ */}
      <section ref={sec5Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/05</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Why Us</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Why Choose Us
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-16 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            Reduce downtime. Cut costs. Boost margins.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {whyUs.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: i * 0.08 }}>
                <GlowCard className="h-full rounded-2xl bg-card border border-border/40 hover:border-accent/40 transition-all duration-300 group">
                  <div className="p-6 md:p-8 relative z-10">
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

          {/* Results */}
          <motion.div className="border-t border-border pt-16" initial={{ opacity: 0 }} animate={sec5InView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.6 }}>
            <h3 className="text-2xl md:text-3xl font-bold mb-10">Proven Results</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {results.map((item, i) => (
                <motion.div key={i} className="flex items-center gap-4" initial={{ opacity: 0, x: -20 }} animate={sec5InView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}>
                  <motion.span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0" initial={{ scale: 0 }} animate={sec5InView ? { scale: 1 } : {}} transition={{ type: "spring", delay: 0.8 + i * 0.1 }}>
                    <Check size={16} className="text-accent" />
                  </motion.span>
                  <span className="text-foreground font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section ref={ctaRef} className="section-forced-dark section-padding py-40">
        <div className="max-w-[1800px] mx-auto text-center">
          <motion.p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: "#00d4aa" }} initial={{ opacity: 0, y: 20 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            Ready to optimize your logistics operations?
          </motion.p>
          <motion.h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-10" initial={{ opacity: 0, y: 40 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Let&rsquo;s build your logistics advantage.
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
