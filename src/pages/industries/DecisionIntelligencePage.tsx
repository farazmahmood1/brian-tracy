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
    title: "Data Paralysis: Many Dashboards, Few Decisions",
    what: "Everyone has a dashboard; no one agrees on the next move. Teams spend meetings reconciling numbers, not choosing actions. By the time the \"right\" chart is found, the window has closed.",
    good: "A short list of trusted signals tied to a clear decision playbook\u2014if X, then do Y. Fewer charts, faster choices.",
    helps: [
      "Turn raw metrics into ranked signals with recommended next steps.",
      "Standardize definitions in one semantic layer so Sales, Ops, and Finance see the same truth.",
      "Bring actions into the same view (approve, launch, pause) instead of sending people to five other tools.",
    ],
  },
  {
    title: "Slow and Disconnected Decision-Making",
    what: "Critical decisions bounce between email threads, Slack channels, and spreadsheets. Approvals stall, context gets lost, and by the time a choice is made the data is stale.",
    good: "Decisions flow through a single auditable pipeline with clear owners, deadlines, and automatic escalation.",
    helps: [
      "Route decisions to the right people with pre-set approval workflows.",
      "Surface real-time data and recommendations inside the decision flow.",
      "Track every choice with timestamps, rationale, and outcome feedback loops.",
    ],
  },
  {
    title: "Hidden Cognitive Biases and \"Gut Feeling\" Decisions",
    what: "Leaders rely on intuition shaped by recency, anchoring, and confirmation bias. Good outcomes get attributed to skill; bad ones to luck. The org never learns which judgment calls actually work.",
    good: "Transparent, probabilistic forecasts with calibration scores\u2014so the org knows whose instincts are actually sharp.",
    helps: [
      "Replace gut calls with structured probabilistic reasoning and confidence bands.",
      "Track forecast accuracy over time to surface hidden decision talent.",
      "Provide explainable recommendations with assumptions and audit trails.",
    ],
  },
];

const caseStudies = [
  {
    title: "Decision Intelligence Platform for Strategic HR Planning",
    client: "Arq Decisions",
    desc: "A decision intelligence platform built for HR and business leaders to find and empower your organization\u2019s \u201cintuition geniuses\u201d. Identifies employees who consistently make accurate calls under uncertainty, then routes high-impact questions to them.",
    howItWorks: [
      { step: "Micro-forecasting challenges", detail: "Turn real business uncertainties into short, focused questions." },
      { step: "Probabilistic answers", detail: "Participants submit probabilities and brief reasoning. We track calibration and discrimination." },
      { step: "Decision routing", detail: "The platform assembles a panel of high scorers and produces an explainable brief with recommended actions." },
      { step: "Closed-loop learning", detail: "When outcomes arrive, scores update and highlight which arguments were most predictive." },
    ],
    impact: [
      "Cut debate time by elevating proven-accurate voices",
      "Reduce recency bias with transparent, data-backed forecasts",
      "Spot emerging leaders with sharp judgment",
      "Every recommendation comes with confidence and audit trail",
    ],
  },
  {
    title: "AI-Powered Patent Analysis Platform",
    client: "Amunet IP",
    desc: "A decision intelligence platform for legal and corporate development teams. Analyzes the full substance of a patent\u2014claims, specification, citations, prosecution history\u2014and produces an objective Patent Quality Score.",
    howItWorks: [
      { step: "Ingest & enrich", detail: "Parse full-text filings and families; normalize assignees, jurisdictions, classes." },
      { step: "Score the asset", detail: "Compute a composite score using claim breadth, citation strength, and prosecution risk factors." },
      { step: "Decision brief", detail: "Get a concise memo: red flags, comparable assets, valuation bands, and recommended actions." },
      { step: "Closed-loop updates", detail: "Scores refresh as new citations appear, office actions arrive, or litigation occurs." },
    ],
    impact: [
      "Triage large patent lists to a defensible buy list",
      "Tie offer ranges to transparent quality and risk factors",
      "Catch claim-scope pitfalls before they become costly",
      "See how assets strengthen or overlap your current IP",
    ],
  },
];

const solutionCards = [
  {
    title: "Predictive & Prescriptive Analytics",
    desc: "Use predictive analytics to forecast future trends, sales, and customer behavior. We also apply prescriptive analytics to recommend the specific, optimal actions needed to achieve business goals.",
  },
  {
    title: "Automated Decision Engines",
    desc: "Develop automated decision engines that execute high-volume, operational choices in real-time. These systems use machine learning and business rules for tasks like dynamic pricing or fraud detection.",
  },
  {
    title: "Anomaly Detection + Smart Alerts",
    desc: "Smart alerts provide not just a warning but also root-cause context, enabling you to act decisively. Detect outliers across operations, finance, and customer behavior in real time.",
  },
];

const serviceNiches = [
  {
    title: "Web Services",
    points: [
      "Convert insight to revenue: Pricing, promotions, and feature rollouts tied to predicted impact.",
      "Customer health & churn: Early-warning signals and \u201cnext best action\u201d playbooks.",
      "SRE & ops decisions: Traffic routing, autoscaling, and incident triage with clear thresholds.",
    ],
    deliverables: "Decision playbooks, real-time signals \u2192 actions, write-back to your CRM/BI/SRE tools.",
  },
  {
    title: "AI & ML",
    points: [
      "Model governance: Bias checks, drift alerts, and approval workflows with reason codes and audit trails.",
      "Experiment orchestration: Prioritize tests, auto-stop losers, and promote winners with pre-set gates.",
      "Inference economics: Smart routing (A/B, shadow, canary) to balance accuracy, latency, and cost.",
    ],
    deliverables: "Governance dashboards, champion\u2013challenger pipelines, decision memos on model changes.",
  },
  {
    title: "IT Consulting",
    points: [
      "Portfolio & resourcing: Score initiatives by value/risk; optimize staffing and sequencing.",
      "SLA/SLO steering: Triggered actions for capacity, incident response, and vendor management.",
      "Standards & compliance: Policy-as-decision flows with auditable approvals.",
    ],
    deliverables: "Prioritization frameworks, capacity levers, automated approval workflows.",
  },
  {
    title: "Data Science",
    points: [
      "From insight to action: Turn metrics into ranked signals with recommended next steps.",
      "Forecasting at scale: Scenario planning and what-ifs with clear decision thresholds.",
      "Reusable logic layer: Shared definitions (semantic layer) so teams act on the same truth.",
    ],
    deliverables: "Decision briefs, scenario packs, semantic layer + playbooks for business users.",
  },
];

const whyUs = [
  { title: "Decisions in Minutes", desc: "We develop and integrate custom platforms that automate your decision-making cycles, giving you a decisive speed advantage in the market.", stat: "10x", statLabel: "Faster Decisions" },
  { title: "More Than Just Code", desc: "Our team members are your partners with a product mindset. We dive into your business goals to anticipate bottlenecks and ensure the final product delivers real value.", stat: "100%", statLabel: "Product Mindset" },
  { title: "Flexibility and Custom Solutions", desc: "We build fully custom solutions tailored to your unique processes, offering more flexibility than rigid off-the-shelf products.", stat: "Custom", statLabel: "Built for You" },
  { title: "From Data to Profit", desc: "We create turnkey systems that transform your data into profitable decisions, directly impacting revenue growth and cost reduction.", stat: "73%", statLabel: "ROI Boost" },
];

/* ─────────────────────── PAGE ─────────────────────── */

export default function DecisionIntelligencePage() {
  usePageMetadata({
    title: "Decision Intelligence Solutions | Forrof",
    description: "Custom decision intelligence software development services. Put your data to work and act with confidence using AI-powered decision platforms.",
    keywords: "decision intelligence, DI software, predictive analytics, prescriptive analytics, automated decisions, AI decision-making",
  });

  const navigate = useNavigate();
  const [activePain, setActivePain] = useState(0);
  const [activeCase, setActiveCase] = useState(0);
  const [activeCaseStep, setActiveCaseStep] = useState(0);
  const [activeNiche, setActiveNiche] = useState(0);

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

  const currentCase = caseStudies[activeCase];

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
            className="absolute top-[calc(50%-350px)] left-[20%] w-[700px] h-[700px] rounded-full blur-[130px]"
            style={{ background: "rgba(0, 212, 170, 0.07)" }}
            animate={{ x: [0, 40, -30, 50, 0], y: [0, -50, 30, -20, 0], opacity: [0.5, 0.9, 0.4, 0.8, 0.5] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full blur-[120px]"
            style={{ background: "rgba(72, 240, 231, 0.05)" }}
            animate={{ x: [0, -30, 20, 0], y: [0, 30, -20, 0], opacity: [0.3, 0.7, 0.4, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
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
            Industries / Decision Intelligence
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
              Decision Intelligence Solutions
            </motion.h1>
          </div>
          <motion.p
            className="text-lg md:text-2xl max-w-3xl leading-relaxed mt-10"
            style={{ color: "#48f0e7" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Put your data to work and act with confidence using our custom decision intelligence software development services for large businesses and enterprises.
          </motion.p>
          <motion.div className="mt-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <Magnetic>
              <button onClick={() => navigate("/contact")} className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-80 transition-opacity">
                Request a Consultation <ArrowUpRight size={18} />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </motion.section>

      {/* ═══════════ SEC 1 — Pain Points (interactive deep-dive panels) ═══════════ */}
      <section ref={sec1Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/01</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Pain Points</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            From Pain Points to Proven Value
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-16 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            73% of executives say poor decision-making costs them revenue. Our decision intelligence services elevate your corporate decision-making framework.
          </motion.p>

          {/* Pain point tabs */}
          <div className="flex flex-wrap gap-3 mb-10">
            {painPoints.map((p, i) => (
              <motion.button
                key={i}
                onClick={() => setActivePain(i)}
                onMouseEnter={() => setActivePain(i)}
                className={`relative px-5 py-3 rounded-xl text-sm font-medium text-left transition-all duration-300 ${
                  activePain === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={sec1InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              >
                {activePain === i && (
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-foreground/5 border border-accent/30"
                    layoutId="activePainTab"
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                )}
                <span className="relative z-10">{p.title}</span>
              </motion.button>
            ))}
          </div>

          {/* Active pain point content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePain}
              className="grid lg:grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Left: problem & ideal state */}
              <div className="space-y-8">
                <div className="p-6 rounded-2xl bg-card border border-border/40">
                  <span className="text-xs text-red-400/80 font-medium uppercase tracking-widest block mb-3">What it looks like</span>
                  <p className="text-muted-foreground leading-relaxed">{painPoints[activePain].what}</p>
                </div>
                <div className="p-6 rounded-2xl bg-card border border-accent/20">
                  <span className="text-xs text-accent font-medium uppercase tracking-widest block mb-3">What good looks like</span>
                  <p className="text-foreground leading-relaxed">{painPoints[activePain].good}</p>
                </div>
              </div>

              {/* Right: how we help */}
              <div className="p-6 md:p-8 rounded-2xl bg-card border border-border/40">
                <span className="text-xs text-accent font-medium uppercase tracking-widest block mb-6">How our DI services help</span>
                <ul className="space-y-5">
                  {painPoints[activePain].helps.map((h, j) => (
                    <motion.li
                      key={j}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: j * 0.1 }}
                    >
                      <motion.span
                        className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.1 + j * 0.1 }}
                      >
                        <Check size={14} className="text-accent" />
                      </motion.span>
                      <p className="text-muted-foreground leading-relaxed">{h}</p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════ SEC 2 — Case Studies (interactive showcase) ═══════════ */}
      <section ref={sec2Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/02</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Case Studies</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            DI Software Use Cases Per Industry
          </motion.h2>

          {/* Case selector */}
          <div className="flex gap-4 mb-10">
            {caseStudies.map((cs, i) => (
              <motion.button
                key={i}
                onClick={() => { setActiveCase(i); setActiveCaseStep(0); }}
                className={`px-6 py-3 rounded-full text-sm font-medium border transition-all duration-300 ${
                  activeCase === i
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/50"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={sec2InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              >
                {cs.client}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {/* Description */}
              <div className="p-6 md:p-8 rounded-2xl bg-card border border-border/40 mb-8">
                <h3 className="text-2xl font-bold mb-3">{currentCase.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-4xl">{currentCase.desc}</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* How it works — step-by-step interactive */}
                <div>
                  <span className="text-xs text-accent font-medium uppercase tracking-widest block mb-6">How it works</span>
                  <div className="space-y-0">
                    {currentCase.howItWorks.map((s, i) => (
                      <div key={i} className="border-t border-border">
                        <button
                          className="w-full py-5 flex items-center justify-between gap-4 text-left group transition-all duration-300 hover:pl-4 hover:bg-accent/[0.06] rounded-xl"
                          onClick={() => setActiveCaseStep(activeCaseStep === i ? -1 : i)}
                        >
                          <div className="flex items-center gap-4">
                            <motion.span
                              className="w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 text-xs font-mono transition-all duration-300 group-hover:border-accent group-hover:bg-accent/10"
                              animate={{
                                borderColor: activeCaseStep === i ? "rgba(0,212,170,0.5)" : "hsl(var(--border))",
                                backgroundColor: activeCaseStep === i ? "rgba(0,212,170,0.1)" : "transparent",
                              }}
                            >
                              <motion.span animate={{ color: activeCaseStep === i ? "#00d4aa" : "hsl(var(--muted-foreground))" }}>
                                {String(i + 1).padStart(2, "0")}
                              </motion.span>
                            </motion.span>
                            <span className={`font-medium group-hover:translate-x-4 transition-all duration-300 ${activeCaseStep === i ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                              {s.step}
                            </span>
                          </div>
                          <motion.div
                            className="w-7 h-7 rounded-full border border-border flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300"
                            animate={{ rotate: activeCaseStep === i ? 180 : 0 }}
                          >
                            {activeCaseStep === i ? <Minus size={12} /> : <Plus size={12} className="text-muted-foreground" />}
                          </motion.div>
                        </button>
                        <motion.div
                          className="overflow-hidden"
                          initial={false}
                          animate={{ height: activeCaseStep === i ? "auto" : 0, opacity: activeCaseStep === i ? 1 : 0 }}
                          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                          <p className="text-muted-foreground text-sm leading-relaxed pb-5 pl-12">{s.detail}</p>
                        </motion.div>
                      </div>
                    ))}
                    <div className="border-t border-border" />
                  </div>
                </div>

                {/* Impact */}
                <div>
                  <span className="text-xs text-accent font-medium uppercase tracking-widest block mb-6">Why it matters</span>
                  <div className="space-y-4">
                    {currentCase.impact.map((imp, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                      >
                        <motion.span
                          className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: 0.1 + i * 0.08 }}
                        >
                          <Check size={14} className="text-accent" />
                        </motion.span>
                        <p className="text-muted-foreground leading-relaxed">{imp}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════ SEC 3 — Solutions (glow cards) ═══════════ */}
      <section ref={sec3Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/03</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Solutions</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Our Decision Intelligence Software Solutions
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-16 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            Available for businesses of all sizes and budgets. Our experts are always ready to assist you with custom solutions developed exclusively for your needs.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-6">
            {solutionCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={sec3InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <GlowCard className="h-full rounded-2xl bg-card border border-border/40 hover:border-accent/40 transition-all duration-300 group">
                  <div className="p-6 md:p-8 relative z-10">
                    <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase block mb-6">/{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="text-xl font-semibold mb-4 group-hover:text-foreground transition-colors">{card.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{card.desc}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 4 — Services by Niche (vertical tabs) ═══════════ */}
      <section ref={sec4Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec4InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/04</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Services</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec4InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Our Services
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-16 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec4InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            We specialize in custom decision intelligence development built around your workflows, data, and governance.
          </motion.p>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Tab buttons */}
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {serviceNiches.map((niche, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveNiche(i)}
                  onMouseEnter={() => setActiveNiche(i)}
                  className={`relative px-5 py-3 rounded-xl text-sm font-medium text-left whitespace-nowrap lg:whitespace-normal transition-all duration-300 ${
                    activeNiche === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={sec4InView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                >
                  {activeNiche === i && (
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-foreground/5 border border-accent/30"
                      layoutId="activeNicheTab"
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                  )}
                  <span className="relative z-10">{niche.title}</span>
                </motion.button>
              ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNiche}
                className="p-8 md:p-10 rounded-2xl bg-card border border-border/40"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-6">{serviceNiches[activeNiche].title}</h3>
                <ul className="space-y-4 mb-8">
                  {serviceNiches[activeNiche].points.map((point, j) => (
                    <motion.li
                      key={j}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: j * 0.08 }}
                    >
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      <p className="text-muted-foreground leading-relaxed">{point}</p>
                    </motion.li>
                  ))}
                </ul>
                <div className="pt-6 border-t border-border/40">
                  <span className="text-xs text-accent font-medium uppercase tracking-widest block mb-2">Typical deliverables</span>
                  <p className="text-foreground/80 leading-relaxed">{serviceNiches[activeNiche].deliverables}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div className="mt-12" initial={{ opacity: 0, y: 20 }} animate={sec4InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.6 }}>
            <Magnetic>
              <button onClick={() => navigate("/contact")} className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300 font-medium">
                Contact Us <ArrowUpRight size={18} />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ SEC 5 — Why Choose Us (stat cards) ═══════════ */}
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
            We provide decision intelligence custom software development solutions that turn your data, models, and workflows into clear, auditable actions.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={sec5InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.08 }}
              >
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
            Smarter decisions, faster
          </motion.p>
          <motion.h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-10" initial={{ opacity: 0, y: 40 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Ready to turn data into decisions?
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
