import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Plus, Minus, Check } from "lucide-react";
import { LineReveal, Magnetic } from "@/components/AnimationComponents";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { GlowCard, CountUp } from "@/components/InteractiveElements";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useNavigate } from "react-router-dom";

/* ───────────────────────── DATA ───────────────────────── */

const painPoints = [
  { title: "Estimates are slow, inconsistent, and dependent on a single estimator.", solution: "Automates accurate and consistent estimates" },
  { title: "Lack of centralized scheduling leads to downtime or crew overbooking.", solution: "Centralizes crew scheduling and dispatching" },
  { title: "Customer communication is scattered across calls and texts.", solution: "Structured client communication channels" },
  { title: "Field crews don't report progress in real time.", solution: "Real-time job progress reporting from the field" },
  { title: "Invoices and payments are frequently delayed.", solution: "Accelerated invoicing and payment processing" },
  { title: "No clear visibility into profitability per project.", solution: "Clear job profitability and margins per project" },
];

const whoWeServe = [
  { title: "Residential Painting Business Owners", desc: "For owners who want to scale without constant manual control. Transparency, margin control, and delegation without losing quality." },
  { title: "Operations Managers / Dispatchers", desc: "Centralized scheduling, crew assignment, and real-time job status for operations leaders." },
  { title: "Sales Estimators", desc: "Fast, accurate estimating tools with templates, area calculations, and material pricing." },
  { title: "Crew Leaders (Field Teams)", desc: "Mobile app with tasks, status updates, photo capture, and real-time reporting." },
  { title: "Admin / Invoicing Teams", desc: "Automated invoicing, payment tracking, and financial reporting tools." },
  { title: "Franchise Networks / Multi-Location", desc: "Multi-location management with standardized processes and centralized reporting." },
];

const useCases = [
  { title: "Estimating & Quoting Software", desc: "Generate professional, accurate quotes in minutes with built-in area calculators, material databases, and customizable templates." },
  { title: "Scheduling & Dispatch System", desc: "Centralized calendar with drag-and-drop crew assignment, route optimization, and automated conflict detection." },
  { title: "Crew Management Mobile App", desc: "Field-ready mobile app for task lists, time tracking, photo documentation, and real-time status updates." },
  { title: "CRM for Painting Contractors", desc: "Track every lead, follow-up, and client interaction from first contact through repeat business." },
  { title: "Customer Portal", desc: "Give clients a self-service portal for project status, approvals, invoices, and direct communication." },
  { title: "Job Costing & Profitability Dashboard", desc: "Real-time visibility into labor, materials, and overhead costs per project with margin tracking." },
  { title: "Inventory / Materials Tracking", desc: "Monitor paint, supplies, and equipment across jobs and warehouses with automatic reorder alerts." },
  { title: "Review & Referral Automation", desc: "Automatically request reviews after job completion and track referral sources to grow your pipeline." },
];

const services = [
  { title: "Automation & Integrations", desc: "Eliminate repetitive tasks by connecting your tools. We automate workflows across estimating, scheduling, invoicing, and communication." },
  { title: "Legacy Spreadsheet-to-System Migration", desc: "Move from scattered spreadsheets and manual processes to a centralized, reliable software system without losing data." },
  { title: "Data Dashboards & Analytics", desc: "Custom dashboards that surface the KPIs that matter: revenue per crew, job margins, close rates, and seasonal trends." },
  { title: "Security, Roles & Audit Logs", desc: "Role-based access control, activity logging, and data protection to keep your business information secure and auditable." },
  { title: "Custom Platform Development", desc: "Purpose-built platforms designed around your unique workflows, not generic tools you have to work around." },
  { title: "Mobile Software Development", desc: "Native and cross-platform mobile apps optimized for field crews, estimators, and on-the-go business owners." },
  { title: "Cloud Architecture & Scalability", desc: "Cloud-native infrastructure that grows with your business, from a single crew to multi-location operations." },
  { title: "AI-Powered Solutions", desc: "Intelligent features like predictive scheduling, smart estimating, automated follow-ups, and demand forecasting." },
];

const roiItems = [
  { title: "Reduce admin time", stat: "60%", statLabel: "Less Admin" },
  { title: "Quote-to-booking conversion", stat: "2x", statLabel: "More Bookings" },
  { title: "Fewer no-shows", stat: "85%", statLabel: "Show Rate" },
  { title: "Better crew utilization", stat: "30%", statLabel: "More Efficient" },
  { title: "Clear job profitability", stat: "100%", statLabel: "Visibility" },
];

const integrations = [
  { title: "Accounting", desc: "QuickBooks, Xero" },
  { title: "Payments", desc: "Stripe, Square" },
  { title: "Calendar", desc: "Google Calendar, Outlook" },
  { title: "Messaging", desc: "Twilio, WhatsApp" },
  { title: "Automation", desc: "Zapier, Make" },
  { title: "Mapping", desc: "Google Maps" },
];

const processSteps = [
  { num: "01", title: "Discovery & Process Analysis", desc: "We audit your current workflows, tools, and pain points to understand how your painting business operates day-to-day and where software can create the biggest impact." },
  { num: "02", title: "Solution Design & Team Assembly", desc: "We design the architecture, user experience, and integration plan, then assemble a cross-functional team matched to your project scope and timeline." },
  { num: "03", title: "Development & Iterative Delivery", desc: "We build in agile sprints with regular demos and feedback loops, delivering working software incrementally so you see value from week one." },
];

/* ─────────────────────── PAGE ─────────────────────── */

export default function PaintingPage() {
  usePageMetadata({
    title: "Software Development for Painting Companies | Forrof",
    description: "Custom software development for painting companies. Estimating, scheduling, crew management, CRM, and job costing solutions.",
    keywords: "painting software, painting company, estimating software, crew management, job costing, painting contractor software",
  });

  const navigate = useNavigate();
  const [activePain, setActivePain] = useState(0);
  const [openRole, setOpenRole] = useState<number | null>(0);
  const [activeService, setActiveService] = useState(0);

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
            className="absolute top-[calc(50%-350px)] right-[10%] w-[700px] h-[700px] rounded-full blur-[130px]"
            style={{ background: "rgba(0, 212, 170, 0.07)" }}
            animate={{ x: [0, -50, 30, -40, 0], y: [0, 50, -30, 20, 0], opacity: [0.5, 0.9, 0.4, 0.8, 0.5] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
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
            Industries / Painting
          </motion.span>
          <div className="overflow-hidden mb-6 py-2">
            <motion.h1
              className="text-[10vw] md:text-[7vw] font-bold leading-[0.95] tracking-tighter"
              style={{ background: "linear-gradient(135deg, #ffffff 0%, #48f0e7 30%, #00d4aa 60%, #126b66 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", backgroundSize: "200% 200%" }}
              initial={{ y: "110%", backgroundPosition: "0% 50%" }}
              animate={{ y: 0, backgroundPosition: "100% 50%" }}
              transition={{ y: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }, backgroundPosition: { duration: 3, ease: "easeInOut", delay: 1, repeat: Infinity, repeatType: "reverse" } }}
            >
              Software Development for Painting Companies
            </motion.h1>
          </div>
          <motion.p className="text-lg md:text-2xl max-w-3xl leading-relaxed mt-10" style={{ color: "#48f0e7" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            You can&rsquo;t scale a painting company if everything lives in spreadsheets, phone calls, and your memory. We build software that streamlines operations from scheduling and estimates to crew management.
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

      {/* ═══════════ SEC 1 — Pain Points & Solution (two-column click-to-select) ═══════════ */}
      <section ref={sec1Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/01</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Pain Points</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            From Operational Chaos to Structured Growth
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-16 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            Small daily operational tasks consume time and profit when processes are not consolidated.
          </motion.p>

          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
            <div className="space-y-0">
              {painPoints.map((p, i) => (
                <motion.button
                  key={i}
                  className="w-full text-left py-5 border-t border-border flex items-center gap-5 group transition-colors duration-300"
                  onClick={() => setActivePain(i)}
                    onMouseEnter={() => setActivePain(i)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={sec1InView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                >
                  <motion.span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    animate={{ scale: activePain === i ? 1 : 0.5, backgroundColor: activePain === i ? "#00d4aa" : "rgba(255,255,255,0.2)" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className={`text-lg font-medium transition-colors duration-300 ${activePain === i ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                    {p.title}
                  </span>
                </motion.button>
              ))}
              <div className="border-t border-border" />
            </div>

            <div className="relative min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePain}
                  className="p-8 md:p-10 rounded-2xl border border-accent/20 bg-card"
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <span className="text-xs text-accent font-medium tracking-widest uppercase block mb-4">
                    Solution {String(activePain + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{painPoints[activePain].solution}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">{painPoints[activePain].title}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 2 — Who We Serve (accordion with numbered indicators) ═══════════ */}
      <section ref={sec2Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/02</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Who We Serve</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Software Solutions Built for Every Role
          </motion.h2>

          <div className="space-y-0 mt-16">
            {whoWeServe.map((item, i) => (
              <motion.div key={i} className="border-t border-border" initial={{ opacity: 0, y: 16 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}>
                <button className="w-full py-7 flex items-center justify-between gap-6 text-left group transition-all duration-300 hover:pl-4 hover:bg-foreground/[0.03] rounded-xl" onClick={() => setOpenRole(openRole === i ? null : i)}>
                  <div className="flex items-center gap-5">
                    <motion.span
                      className="w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 text-xs font-mono transition-all duration-300 group-hover:border-accent group-hover:bg-accent/10"
                      animate={{
                        borderColor: openRole === i ? "rgba(0,212,170,0.5)" : "rgba(255,255,255,0.1)",
                        backgroundColor: openRole === i ? "rgba(0,212,170,0.1)" : "transparent",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.span animate={{ color: openRole === i ? "#00d4aa" : "rgba(255,255,255,0.4)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </motion.span>
                    </motion.span>
                    <span className="text-xl md:text-2xl font-semibold group-hover:text-foreground group-hover:translate-x-2 transition-all duration-300">{item.title}</span>
                  </div>
                  <motion.div className="w-9 h-9 rounded-full border border-border flex items-center justify-center flex-shrink-0 group-hover:border-foreground group-hover:scale-110 transition-all duration-300" animate={{ rotate: openRole === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    {openRole === i ? <Minus size={14} className="text-foreground" /> : <Plus size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />}
                  </motion.div>
                </button>
                <motion.div className="overflow-hidden" initial={false} animate={{ height: openRole === i ? "auto" : 0, opacity: openRole === i ? 1 : 0 }} transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}>
                  <p className="text-muted-foreground leading-relaxed text-sm pb-8 pl-[3.75rem] max-w-4xl">{item.desc}</p>
                </motion.div>
              </motion.div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 3 — Use Cases (hover-expand list) ═══════════ */}
      <section ref={sec3Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/03</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Use Cases</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter" initial={{ opacity: 0, y: 40 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
              End-to-End Software Development Solutions
            </motion.h2>
            <motion.p className="text-lg text-muted-foreground leading-relaxed self-end" initial={{ opacity: 0, y: 30 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
              Purpose-built tools that cover every stage of your painting business, from first estimate to final invoice.
            </motion.p>
          </div>

          <div className="space-y-0">
            {useCases.map((item, i) => (
              <motion.div
                key={i}
                className="group border-t border-border cursor-default hover:bg-foreground/[0.02] rounded-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={sec3InView ? { opacity: 1, y: 0 } : {}}
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
            <motion.div className="border-t border-border" initial={{ scaleX: 0 }} animate={sec3InView ? { scaleX: 1 } : {}} transition={{ duration: 1.5, delay: 0.8 }} style={{ transformOrigin: "left" }} />
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 4 — Services (vertical tabs with layoutId) ═══════════ */}
      <section ref={sec4Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec4InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/04</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Services</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec4InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Software Development Services
          </motion.h2>

          <div className="grid lg:grid-cols-[300px_1fr] gap-12">
            <div className="flex flex-row lg:flex-col flex-wrap gap-2">
              {services.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActiveService(i)}
                    onMouseEnter={() => setActiveService(i)}
                  className={`relative px-4 py-3 rounded-lg text-sm font-medium text-left transition-all duration-300 ${
                    activeService === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {activeService === i && (
                    <motion.div className="absolute inset-0 rounded-lg bg-foreground/5 border border-accent/30" layoutId="activeServiceTab" transition={{ duration: 0.3 }} />
                  )}
                  <span className="relative z-10">{s.title}</span>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                className="p-8 md:p-10 rounded-2xl bg-card border border-border/40"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <span className="text-xs text-accent font-medium tracking-widest uppercase block mb-4">
                  {String(activeService + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{services[activeService].title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{services[activeService].desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 5 — ROI (stat cards with CountUp) ═══════════ */}
      <section ref={sec5Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/05</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">ROI</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            The ROI of Custom Software
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-16 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            Measurable results that impact your bottom line from day one.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {roiItems.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: i * 0.08 }}>
                <GlowCard className="h-full rounded-2xl bg-card border border-border/40 hover:border-accent/40 transition-all duration-300 group">
                  <div className="p-6 md:p-8 relative z-10">
                    <div className="mb-6">
                      <span className="text-4xl md:text-5xl font-bold text-accent">
                        <CountUp value={item.stat} delay={200 + i * 100} />
                      </span>
                      <span className="block text-xs text-muted-foreground mt-1 uppercase tracking-widest">{item.statLabel}</span>
                    </div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 6 — Integrations (animated grid) ═══════════ */}
      <section ref={sec6Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec6InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/06</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Integrations</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec6InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Connected to the Tools You Already Use
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((item, i) => (
              <motion.div
                key={i}
                className="p-6 md:p-8 rounded-2xl bg-card border border-border/40 hover:border-accent/40 transition-all duration-300"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={sec6InView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Check size={18} className="text-accent flex-shrink-0" />
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm pl-[30px]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 7 — Process (scroll-driven timeline) ═══════════ */}
      <section ref={sec7Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <ProcessTimeline steps={processSteps} inView={sec7InView} sectionLabel="/07" labelText="How We Work" />
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section ref={ctaRef} className="section-forced-dark section-padding py-40">
        <div className="max-w-[1800px] mx-auto text-center">
          <motion.p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: "#00d4aa" }} initial={{ opacity: 0, y: 20 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            Ready to streamline your operations?
          </motion.p>
          <motion.h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-10" initial={{ opacity: 0, y: 40 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Let&rsquo;s build a system tailored to your painting business.
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
