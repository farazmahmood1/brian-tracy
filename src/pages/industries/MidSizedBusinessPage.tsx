import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Plus, Minus, Check } from "lucide-react";
import { LineReveal, Magnetic } from "@/components/AnimationComponents";
import { GlowCard, CountUp } from "@/components/InteractiveElements";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useNavigate } from "react-router-dom";

/* ───────────────────────── DATA ───────────────────────── */

const whoWeHelp = [
  { title: "Health & Wellness", desc: "Secure patient portals, booking systems, and internal platforms ensuring HIPAA/GDPR compliance." },
  { title: "Manufacturing & Industrial", desc: "Custom ERP systems, IoT solutions, and platforms that optimize supply chain management." },
  { title: "Retail & E-commerce", desc: "E-commerce platforms, mobile shopping apps, loyalty systems, and POS integrations." },
  { title: "Finance & FinTech", desc: "Secure portals, mobile apps, onboarding flows, and tools complying with industry standards." },
  { title: "LegalTech & Law", desc: "Document management, secure client portals, and litigation support software." },
  { title: "Governance & Public Sector", desc: "Citizen portals, workflow systems replacing spreadsheets and email chains." },
];

const challenges = [
  { title: "Outdated systems and manual processes", solution: "We conduct a thorough audit, then modernize and automate your core operations with tailor-made, scalable solutions." },
  { title: "High cost of maintaining in-house IT", solution: "Get the expertise of an entire senior technical department without massive salary overhead or recruitment costs." },
  { title: "Disconnected Tools and Platforms", solution: "We connect ERP, CRM, WMS, and other tools so data flows automatically between systems." },
  { title: "Operational Inefficiency and Blind Spots", solution: "We set up event pipelines, dashboards, and reporting for real-time visibility into performance and costs." },
  { title: "Lack of Technical Expertise at the Top", solution: "We act as your long-term technology ally, providing continuous guidance and consulting." },
];

const valueItems = [
  { title: "Operational Efficiency", desc: "Automate repetitive tasks, streamline workflows, and eliminate bottlenecks so your team spends time on what actually matters." },
  { title: "Cost Optimization", desc: "Reduce overhead by consolidating tools, automating processes, and leveraging flexible engagement models that scale with your needs." },
  { title: "Transparency", desc: "Real-time dashboards, regular reporting, and open communication so you always know what's happening with your technology investments." },
  { title: "Business Agility", desc: "Modular, scalable architecture that lets you pivot quickly, launch new products, and respond to market changes without rebuilding from scratch." },
  { title: "Strategic Partnership", desc: "More than a vendor \u2014 we embed with your leadership team to align technology decisions with long-term business goals." },
];

const whatWeBuild = [
  { title: "Web & Mobile", desc: "Responsive web platforms, progressive web apps, and native mobile applications tailored to your business workflows and customer needs." },
  { title: "Integrations", desc: "Seamless connections between ERP, CRM, WMS, payment gateways, and third-party APIs to unify your data and operations." },
  { title: "Data & Analytics", desc: "Custom dashboards, BI pipelines, and reporting systems that turn raw data into actionable business intelligence." },
  { title: "Cloud & DevOps", desc: "Cloud migration, infrastructure-as-code, CI/CD pipelines, and container orchestration for reliable, scalable deployments." },
  { title: "Security & Compliance", desc: "End-to-end encryption, access control, audit trails, and architecture designed to meet HIPAA, GDPR, SOC 2, and ISO 27001 standards." },
  { title: "AI (Only ROI-Positive)", desc: "We implement AI where it delivers measurable value \u2014 predictive analytics, intelligent automation, and NLP \u2014 not hype-driven experiments." },
];

const engagementModels = [
  { title: "Full-Cycle Project Delivery", desc: "We own the entire lifecycle from discovery and design through development, QA, deployment, and post-launch support. You get a fixed scope, timeline, and budget with full transparency at every milestone.", bestFor: "Companies with a clear project scope who want end-to-end execution without managing individual resources." },
  { title: "Dedicated Development Team", desc: "A cross-functional team assembled specifically for your product \u2014 developers, designers, QA, and a project manager \u2014 working exclusively on your initiatives under your direction.", bestFor: "Growing businesses that need long-term development capacity and want full control over priorities and roadmap." },
  { title: "Staff Augmentation", desc: "We embed senior engineers, architects, or specialists directly into your existing team to fill skill gaps, accelerate delivery, or handle peak workloads.", bestFor: "Teams that already have processes in place but need specific expertise or extra bandwidth fast." },
];

const howWeWork = [
  { title: "Governance & Cadence", desc: "Weekly standups, bi-weekly demos, monthly steering meetings, and quarterly reviews keep every stakeholder aligned and informed." },
  { title: "30/60/90 Plan", desc: "A structured onboarding plan: assess and stabilize in the first 30 days, optimize in 60, and deliver measurable impact by 90." },
  { title: "Artifacts & Documentation", desc: "Living documentation, architecture decision records, runbooks, and handover packages maintained from day one." },
  { title: "Quality & Security by Design", desc: "Automated testing, code reviews, static analysis, and security scanning baked into every sprint \u2014 not bolted on at the end." },
  { title: "Release Flow & Environments", desc: "Staging, pre-production, and production environments with feature flags, blue-green deployments, and automated rollback." },
  { title: "Support & SLAs", desc: "Defined response and resolution times for critical, high, medium, and low-priority issues with 24/7 on-call for production incidents." },
  { title: "Communication & Tools", desc: "Slack, Jira, Confluence, and your preferred tools \u2014 we adapt to your ecosystem, not the other way around." },
  { title: "Roles & Responsibilities", desc: "Clear RACI matrices for every engagement so there is never ambiguity about who owns what." },
  { title: "Handover Readiness", desc: "Knowledge transfer sessions, documented APIs, infrastructure runbooks, and training so you can take full ownership at any point." },
  { title: "KPIs & Success Metrics", desc: "Velocity, cycle time, defect rates, uptime, and business KPIs tracked transparently so success is objective, not subjective." },
];

/* ─────────────────────── PAGE ─────────────────────── */

export default function MidSizedBusinessPage() {
  usePageMetadata({
    title: "IT Solutions for Mid-Size Businesses | Forrof",
    description: "Reliable IT partner for mid-size businesses. Web platforms, mobile apps, ERPs, integrations, and ongoing support.",
    keywords: "mid-size business IT, medium business software, ERP, integrations, outsourced IT, digital transformation",
  });

  const navigate = useNavigate();
  const [activeWho, setActiveWho] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(0);
  const [openEngagement, setOpenEngagement] = useState<number | null>(0);
  const [activeHow, setActiveHow] = useState(0);

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
            Services / Mid-Sized Business
          </motion.span>
          <div className="overflow-hidden mb-6 py-2">
            <motion.h1
              className="text-[10vw] md:text-[7vw] font-bold leading-[0.95] tracking-tighter"
              style={{ background: "linear-gradient(135deg, #ffffff 0%, #48f0e7 30%, #00d4aa 60%, #126b66 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", backgroundSize: "200% 200%" }}
              initial={{ y: "110%", backgroundPosition: "0% 50%" }}
              animate={{ y: 0, backgroundPosition: "100% 50%" }}
              transition={{ y: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }, backgroundPosition: { duration: 3, ease: "easeInOut", delay: 1, repeat: Infinity, repeatType: "reverse" } }}
            >
              Reliable IT Partner for Mid-Size Businesses
            </motion.h1>
          </div>
          <motion.p className="text-lg md:text-2xl max-w-3xl leading-relaxed mt-10" style={{ color: "#48f0e7" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            Focus on strategy, we'll handle the tech. We design, build, and maintain IT solutions for mid-size companies: web platforms, mobile apps, ERPs, and all the integrations in between.
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

      {/* ═══════════ SEC 1 — Who We Help (vertical tabs with layoutId) ═══════════ */}
      <section ref={sec1Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/01</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Industries</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Who We Help
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-16 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            We partner with mid-size companies across diverse industries, delivering technology solutions that match their specific operational needs and compliance requirements.
          </motion.p>

          <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-start">
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
              {whoWeHelp.map((item, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveWho(i)}
                  onMouseEnter={() => setActiveWho(i)}
                  className={`relative px-5 py-3 rounded-xl text-sm font-medium text-left whitespace-nowrap lg:whitespace-normal transition-all duration-300 ${activeWho === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={sec1InView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                >
                  {activeWho === i && (
                    <motion.div className="absolute inset-0 rounded-xl bg-foreground/5 border border-accent/30" layoutId="activeMidWhoTab" transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }} />
                  )}
                  <span className="relative z-10">{item.title}</span>
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeWho}
                className="p-8 md:p-10 rounded-2xl bg-card border border-border/40 flex flex-col justify-center min-h-[200px]"
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="text-xs text-accent font-medium tracking-widest uppercase block mb-4">
                  {String(activeWho + 1).padStart(2, "0")} / {String(whoWeHelp.length).padStart(2, "0")}
                </span>
                <h3 className="text-2xl font-bold mb-3">{whoWeHelp[activeWho].title}</h3>
                <p className="text-muted-foreground leading-relaxed">{whoWeHelp[activeWho].desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 2 — Challenges (click-to-select) ═══════════ */}
      <section ref={sec2Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/02</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Challenges</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Common Challenges We Solve
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-16 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            Mid-size businesses face unique IT hurdles. We've seen them all and know exactly how to fix them.
          </motion.p>

          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
            <div className="space-y-0">
              {challenges.map((c, i) => (
                <motion.button
                  key={i}
                  className="w-full text-left py-5 border-t border-border flex items-center gap-5 group transition-colors duration-300"
                  onClick={() => setActiveChallenge(i)}
                  onMouseEnter={() => setActiveChallenge(i)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={sec2InView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                >
                  <motion.span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    animate={{ scale: activeChallenge === i ? 1 : 0.5, backgroundColor: activeChallenge === i ? "#00d4aa" : "hsl(var(--muted))" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className={`text-lg font-medium transition-colors duration-300 ${activeChallenge === i ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                    {c.title}
                  </span>
                </motion.button>
              ))}
              <div className="border-t border-border" />
            </div>

            <div className="relative min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeChallenge}
                  className="p-8 md:p-10 rounded-2xl border border-accent/20 bg-card"
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <span className="text-xs text-red-400 font-medium tracking-widest uppercase block mb-3">
                    Challenge {String(activeChallenge + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-bold mb-4">{challenges[activeChallenge].title}</h3>

                  <span className="text-xs text-accent font-medium tracking-widest uppercase block mb-3">
                    Our Approach
                  </span>
                  <p className="text-muted-foreground leading-relaxed">{challenges[activeChallenge].solution}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 3 — Value (glow cards with hover-expand) ═══════════ */}
      <section ref={sec3Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/03</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Value</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Value for Founders &amp; Decision-Makers
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-20 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            Tangible outcomes that impact your bottom line, not just technical deliverables.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valueItems.map((card, i) => (
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

      {/* ═══════════ SEC 4 — What We Build (hover-expand list) ═══════════ */}
      <section ref={sec4Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec4InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/04</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Solutions</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter" initial={{ opacity: 0, y: 40 }} animate={sec4InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
              What We Build
            </motion.h2>
            <motion.p className="text-lg text-muted-foreground leading-relaxed self-end" initial={{ opacity: 0, y: 30 }} animate={sec4InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
              End-to-end technology solutions designed for mid-size companies that need enterprise-grade quality without enterprise-grade complexity.
            </motion.p>
          </div>

          <div className="space-y-0">
            {whatWeBuild.map((item, i) => (
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

      {/* ═══════════ SEC 5 — Engagement Models (accordion with numbered indicators) ═══════════ */}
      <section ref={sec5Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/05</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Engagement</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Engagement Options
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-16 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            Choose the collaboration model that fits your team structure, timeline, and budget.
          </motion.p>

          <div className="space-y-0">
            {engagementModels.map((item, i) => (
              <motion.div key={i} className="border-t border-border" initial={{ opacity: 0, y: 16 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}>
                <button className="w-full py-7 flex items-center justify-between gap-6 text-left group transition-all duration-300 hover:pl-4 hover:bg-foreground/[0.03] rounded-xl" onClick={() => setOpenEngagement(openEngagement === i ? null : i)}>
                  <div className="flex items-center gap-5">
                    <motion.span
                      className="w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 text-xs font-mono transition-all duration-300 group-hover:border-accent group-hover:bg-accent/10"
                      animate={{
                        borderColor: openEngagement === i ? "rgba(0,212,170,0.5)" : "hsl(var(--border))",
                        backgroundColor: openEngagement === i ? "rgba(0,212,170,0.1)" : "transparent",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.span animate={{ color: openEngagement === i ? "#00d4aa" : "hsl(var(--muted-foreground))" }}>
                        {String(i + 1).padStart(2, "0")}
                      </motion.span>
                    </motion.span>
                    <span className="text-xl md:text-2xl font-semibold group-hover:text-foreground group-hover:translate-x-2 transition-all duration-300">{item.title}</span>
                  </div>
                  <motion.div className="w-9 h-9 rounded-full border border-border flex items-center justify-center flex-shrink-0 group-hover:border-foreground group-hover:scale-110 transition-all duration-300" animate={{ rotate: openEngagement === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    {openEngagement === i ? <Minus size={14} className="text-foreground" /> : <Plus size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />}
                  </motion.div>
                </button>
                <motion.div className="overflow-hidden" initial={false} animate={{ height: openEngagement === i ? "auto" : 0, opacity: openEngagement === i ? 1 : 0 }} transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}>
                  <div className="pb-8 pl-[3.75rem] max-w-4xl">
                    <p className="text-muted-foreground leading-relaxed text-sm mb-4">{item.desc}</p>
                    <p className="text-sm"><span className="text-accent font-medium">Best For:</span> <span className="text-muted-foreground">{item.bestFor}</span></p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 6 — How We Work (vertical tabs with layoutId) ═══════════ */}
      <section ref={sec6Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec6InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/06</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Process</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec6InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            How We Work
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-16 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec6InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            Transparent, structured, and built for long-term collaboration. Here's what working with us looks like from day one.
          </motion.p>

          <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-start">
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
              {howWeWork.map((item, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveHow(i)}
                  onMouseEnter={() => setActiveHow(i)}
                  className={`relative px-5 py-3 rounded-xl text-sm font-medium text-left whitespace-nowrap lg:whitespace-normal transition-all duration-300 ${activeHow === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={sec6InView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                >
                  {activeHow === i && (
                    <motion.div className="absolute inset-0 rounded-xl bg-foreground/5 border border-accent/30" layoutId="activeMidHowTab" transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }} />
                  )}
                  <span className="relative z-10">{item.title}</span>
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeHow}
                className="p-8 md:p-10 rounded-2xl bg-card border border-border/40 flex flex-col justify-center min-h-[200px]"
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="text-xs text-accent font-medium tracking-widest uppercase block mb-4">
                  Step {String(activeHow + 1).padStart(2, "0")} / {String(howWeWork.length).padStart(2, "0")}
                </span>
                <h3 className="text-2xl font-bold mb-3">{howWeWork[activeHow].title}</h3>
                <p className="text-muted-foreground leading-relaxed">{howWeWork[activeHow].desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section ref={ctaRef} className="section-forced-dark section-padding py-40">
        <div className="max-w-[1800px] mx-auto text-center">
          <motion.p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: "#00d4aa" }} initial={{ opacity: 0, y: 20 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            Your technology partner
          </motion.p>
          <motion.h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-10" initial={{ opacity: 0, y: 40 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Focus on strategy, not tech issues. Let us handle the technology.
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
