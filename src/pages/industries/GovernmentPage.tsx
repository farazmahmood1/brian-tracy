import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Plus, Minus, Check, Shield } from "lucide-react";
import { LineReveal, Magnetic } from "@/components/AnimationComponents";
import { GlowCard, CountUp } from "@/components/InteractiveElements";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useNavigate } from "react-router-dom";

/* ───────────────────────── DATA ───────────────────────── */

const challenges = [
  {
    title: "Legacy Systems and Data Silos",
    desc: "Many agencies run on legacy platforms never designed to talk to each other. We support a gradual move to modern architecture with APIs, integration layers, and clean data flows.",
  },
  {
    title: "Strict Security & Compliance Requirements",
    desc: "Government systems must meet strict security standards. We design with encryption, access control, and audit trails from the first line of code.",
  },
  {
    title: "Procurement Constraints and Long Approval Cycles",
    desc: "We are comfortable with NDAs, RFP/RFQ procedures, and detailed documentation to help justify choices during vendor selection.",
  },
  {
    title: "High Public Impact & Zero Tolerance for Downtime",
    desc: "Public systems must be reliable. We implement monitoring, backups, and disaster recovery plans aligned with criticality requirements.",
  },
  {
    title: "Need for Transparency, Audit Trails, and Reporting",
    desc: "Every change, login, and configuration update can be traced. We provide reporting that turns logs into exportable evidence.",
  },
];

const whoItsFor = [
  { title: "Central and Local Authorities", desc: "Digital transformation for ministries, municipalities, and regional authorities — from internal workflows to citizen-facing portals." },
  { title: "Social Security and Employment", desc: "Scalable systems for benefits processing, employment services, and case management across large populations." },
  { title: "Tax Services & Revenue Agencies", desc: "Secure platforms for tax filing, revenue collection, compliance monitoring, and taxpayer self-service." },
  { title: "Utilities & Energy Regulators", desc: "Monitoring dashboards, licensing portals, and regulatory compliance tools for utility oversight and energy management." },
  { title: "Procurement & Public Finance Bodies", desc: "Transparent procurement platforms, budget tracking, and financial reporting systems aligned with government accounting standards." },
  { title: "Justice, Courts & Law Enforcement", desc: "Case management, digital evidence handling, court scheduling, and secure inter-agency data sharing platforms." },
];

const services = [
  { title: "AI and Big Data Implementation", desc: "Deploy AI models and big data pipelines to improve decision-making, detect fraud, and automate repetitive government processes at scale." },
  { title: "Legacy Modernization & System Migration", desc: "Migrate aging systems to modern, maintainable architectures without disrupting ongoing operations or losing historical data." },
  { title: "Case Management Systems", desc: "Build structured workflows for tracking cases, applications, and requests from submission through resolution with full audit trails." },
  { title: "Data Integration & Interoperability (APIs)", desc: "Connect siloed systems through secure APIs and integration layers so agencies can share data reliably and in real time." },
  { title: "Government Mobile App Development", desc: "Citizen-facing and field-worker mobile applications with offline support, biometric auth, and accessibility compliance." },
  { title: "Cloud Enablement (Public/Private/Hybrid)", desc: "Architect and deploy government workloads on public, private, or hybrid cloud environments with data residency controls." },
  { title: "Maintenance Support & SLA", desc: "Ongoing support with defined SLAs covering uptime, incident response, patching, and performance monitoring." },
];

const whatWeBuild = [
  { title: "Citizen Service Portals", desc: "Self-service platforms where citizens can apply for services, track requests, and receive notifications — reducing counter visits." },
  { title: "Document & Workflow Automation", desc: "Digitize paper-based processes with automated routing, approvals, and archiving for faster turnaround and fewer errors." },
  { title: "Permits & Licensing Platforms", desc: "End-to-end systems for application submission, review, approval, and renewal of permits and licenses." },
  { title: "Public Safety & Emergency Systems", desc: "Real-time dashboards, alerting systems, and coordination tools for emergency management and public safety agencies." },
  { title: "Grant/Benefit Management Systems", desc: "Manage the full lifecycle of grants and benefits — from eligibility checks and applications to disbursement and reporting." },
  { title: "Analytics Dashboards & Reporting", desc: "Interactive dashboards that turn operational data into actionable insights for leadership and public transparency." },
  { title: "Internal HR/Procurement Platforms", desc: "Custom platforms for workforce management, recruitment, procurement workflows, and vendor management." },
  { title: "Secure Data Sharing Platforms", desc: "Controlled, auditable data exchange between agencies with role-based access, encryption, and consent management." },
];

const securityItems = [
  { title: "Security-by-Design Architecture", desc: "Security is embedded from the first design decision — not bolted on at the end. Threat modeling, secure defaults, and least-privilege access are standard." },
  { title: "DevSecOps Delivery", desc: "Automated security scanning, dependency checks, and vulnerability testing integrated into every build and deployment pipeline." },
  { title: "Audit Readiness", desc: "Comprehensive logging, change tracking, and exportable reports so your systems are always ready for internal or external audits." },
  { title: "Deployment Flexibility", desc: "On-premise, private cloud, or hybrid — we deploy where your data residency and sovereignty requirements demand." },
  { title: "Continuity & Support", desc: "Disaster recovery plans, automated backups, failover configurations, and 24/7 monitoring to keep critical systems running." },
];

const whyChooseUs = [
  { title: "UAE-Ready Delivery", desc: "Our teams understand UAE regulatory frameworks, data residency requirements, and government procurement processes.", stat: "UAE", statLabel: "Compliant" },
  { title: "Procurement-Friendly", desc: "We work within RFP/RFQ frameworks, provide detailed documentation, and support vendor evaluation processes end to end.", stat: "100%", statLabel: "RFP Ready" },
  { title: "Transparent Delivery", desc: "Weekly progress reports, demos, and open communication so stakeholders always know exactly where the project stands.", stat: "Weekly", statLabel: "Reports" },
  { title: "Integration Expertise", desc: "API-first architecture and proven experience connecting legacy systems, third-party platforms, and inter-agency data sources.", stat: "API", statLabel: "First" },
  { title: "Long-Term Support", desc: "Post-launch maintenance with defined SLAs covering uptime, incident response, patching, and continuous improvement.", stat: "SLA", statLabel: "Guaranteed" },
];

/* ─────────────────────── PAGE ─────────────────────── */

export default function GovernmentPage() {
  usePageMetadata({
    title: "Government Software Development | Forrof",
    description: "Government software development services. Secure, scalable systems for UAE agencies with data residency, audit readiness, and citizen-centric UX.",
    keywords: "government software, govtech, public sector, e-government, citizen portal, UAE government, secure government systems",
  });

  const navigate = useNavigate();
  const [openChallenge, setOpenChallenge] = useState<number | null>(0);
  const [activeWho, setActiveWho] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

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
            Industries / Government &amp; Public Sector
          </motion.span>
          <div className="overflow-hidden mb-6 py-2">
            <motion.h1
              className="text-[10vw] md:text-[7vw] font-bold leading-[0.95] tracking-tighter"
              style={{ background: "linear-gradient(135deg, #ffffff 0%, #48f0e7 30%, #00d4aa 60%, #126b66 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", backgroundSize: "200% 200%" }}
              initial={{ y: "110%", backgroundPosition: "0% 50%" }}
              animate={{ y: 0, backgroundPosition: "100% 50%" }}
              transition={{ y: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }, backgroundPosition: { duration: 3, ease: "easeInOut", delay: 1, repeat: Infinity, repeatType: "reverse" } }}
            >
              Government Software Development Services
            </motion.h1>
          </div>
          <motion.p className="text-lg md:text-2xl max-w-3xl leading-relaxed mt-10" style={{ color: "#48f0e7" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            Modernize how your authority delivers digital services without risking security or compliance. Secure, scalable systems with data in-country, audits straightforward, and public trust strong.
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

      {/* ═══════════ SEC 1 — Challenges (accordion with numbered indicators) ═══════════ */}
      <section ref={sec1Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/01</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Challenges</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Typical Challenges We Solve
          </motion.h2>

          <div className="space-y-0 mt-16">
            {challenges.map((item, i) => (
              <motion.div key={i} className="border-t border-border" initial={{ opacity: 0, y: 16 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}>
                <button className="w-full py-7 flex items-center justify-between gap-6 text-left group transition-all duration-300 hover:pl-4 hover:bg-foreground/[0.03] rounded-xl" onClick={() => setOpenChallenge(openChallenge === i ? null : i)}>
                  <div className="flex items-center gap-5">
                    <motion.span
                      className="w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 text-xs font-mono transition-all duration-300 group-hover:border-accent group-hover:bg-accent/10"
                      animate={{
                        borderColor: openChallenge === i ? "rgba(0,212,170,0.5)" : "rgba(0,0,0,0.1)",
                        backgroundColor: openChallenge === i ? "rgba(0,212,170,0.1)" : "transparent",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.span animate={{ color: openChallenge === i ? "#00d4aa" : "rgba(0,0,0,0.4)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </motion.span>
                    </motion.span>
                    <span className="text-xl md:text-2xl font-semibold group-hover:text-foreground group-hover:translate-x-2 transition-all duration-300">{item.title}</span>
                  </div>
                  <motion.div className="w-9 h-9 rounded-full border border-border flex items-center justify-center flex-shrink-0 group-hover:border-foreground group-hover:scale-110 transition-all duration-300" animate={{ rotate: openChallenge === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    {openChallenge === i ? <Minus size={14} className="text-foreground" /> : <Plus size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />}
                  </motion.div>
                </button>
                <motion.div className="overflow-hidden" initial={false} animate={{ height: openChallenge === i ? "auto" : 0, opacity: openChallenge === i ? 1 : 0 }} transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}>
                  <p className="text-muted-foreground leading-relaxed text-sm pb-8 pl-[3.75rem] max-w-4xl">{item.desc}</p>
                </motion.div>
              </motion.div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 2 — Who It's For (click-to-select with detail panel) ═══════════ */}
      <section ref={sec2Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/02</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Audience</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Who It's For
          </motion.h2>

          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start mt-16">
            <div className="space-y-0">
              {whoItsFor.map((item, i) => (
                <motion.button
                  key={i}
                  className="w-full text-left py-5 border-t border-border flex items-center gap-5 group transition-colors duration-300"
                  onClick={() => setActiveWho(i)}
                  onMouseEnter={() => setActiveWho(i)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={sec2InView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                >
                  <motion.span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    animate={{ scale: activeWho === i ? 1 : 0.5, backgroundColor: activeWho === i ? "#00d4aa" : "hsl(var(--muted))" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className={`text-lg font-medium transition-colors duration-300 ${activeWho === i ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                    {item.title}
                  </span>
                </motion.button>
              ))}
              <div className="border-t border-border" />
            </div>

            <div className="relative min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeWho}
                  className="p-8 md:p-10 rounded-2xl border border-accent/20 bg-card"
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <span className="text-xs text-accent font-medium tracking-widest uppercase block mb-3">
                    {String(activeWho + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-bold mb-3">{whoItsFor[activeWho].title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{whoItsFor[activeWho].desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 3 — Services (hover-expand list) ═══════════ */}
      <section ref={sec3Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/03</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Services</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter" initial={{ opacity: 0, y: 40 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
              Our Services in Public Sector Software Development
            </motion.h2>
            <motion.p className="text-lg text-muted-foreground leading-relaxed self-end" initial={{ opacity: 0, y: 30 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
              We design, build, and maintain secure government software that modernizes operations and improves how agencies serve their citizens.
            </motion.p>
          </div>

          <div className="space-y-0">
            {services.map((item, i) => (
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

      {/* ═══════════ SEC 4 — What We Build (vertical tabs with layoutId) ═══════════ */}
      <section ref={sec4Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec4InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/04</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Solutions</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec4InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            What We Build for Government Agencies
          </motion.h2>

          <div className="grid lg:grid-cols-[auto_1fr] gap-8 mt-16">
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
              {whatWeBuild.map((tab, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  onMouseEnter={() => setActiveTab(i)}
                  className={`relative px-5 py-3 rounded-xl text-sm font-medium text-left whitespace-nowrap lg:whitespace-normal transition-all duration-300 ${activeTab === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={sec4InView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                >
                  {activeTab === i && (
                    <motion.div className="absolute inset-0 rounded-xl bg-foreground/5 border border-accent/30" layoutId="activeGovTab" transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }} />
                  )}
                  <span className="relative z-10">{tab.title}</span>
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="p-8 md:p-10 rounded-2xl bg-card border border-border/40 flex flex-col justify-center min-h-[200px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="text-xs text-accent font-medium tracking-widest uppercase block mb-3">
                  /{String(activeTab + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl font-bold mb-3">{whatWeBuild[activeTab].title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-3xl">{whatWeBuild[activeTab].desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 5 — Security & Compliance (glow cards with Shield icons) ═══════════ */}
      <section ref={sec5Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/05</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Security</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Security &amp; Compliance Built Into Every Stage
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {securityItems.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: i * 0.08 }}>
                <GlowCard className="h-full rounded-2xl bg-card border border-border/40 hover:border-accent/40 transition-all duration-300 group">
                  <div className="p-6 md:p-8 relative z-10">
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6"
                      initial={{ scale: 0 }}
                      animate={sec5InView ? { scale: 1 } : {}}
                      transition={{ type: "spring", delay: 0.4 + i * 0.1 }}
                    >
                      <Shield size={22} className="text-accent" />
                    </motion.div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-foreground transition-colors">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="text-sm text-muted-foreground mt-12 text-center max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={sec5InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Lumitech is registered in the NATO Codification System (NCAGE) via the UAE National Codification Bureau.
          </motion.p>
        </div>
      </section>

      {/* ═══════════ SEC 6 — Why Choose Us (stat cards with CountUp) ═══════════ */}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {whyChooseUs.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={sec6InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: i * 0.08 }}>
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
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section ref={ctaRef} className="section-forced-dark section-padding py-40">
        <div className="max-w-[1800px] mx-auto text-center">
          <motion.p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: "#00d4aa" }} initial={{ opacity: 0, y: 20 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            GovTech, done right
          </motion.p>
          <motion.h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-10" initial={{ opacity: 0, y: 40 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Looking for a stable partner for public sector development?
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
