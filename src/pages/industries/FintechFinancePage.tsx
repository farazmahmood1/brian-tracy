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
  {
    title: "Slow and Costly Customer Onboarding (KYC)",
    desc: "Turn days into minutes. We automate identity verification and background checks, enabling a fully digital KYC process that\u2019s secure, fast, and compliant.",
  },
  {
    title: "Legacy Tech Holding You Back",
    desc: "Modernize without a full rebuild. We add a flexible, API-enabled layer over legacy systems so you can launch new financial products to market quickly and integrate with partners easily.",
  },
  {
    title: "Poor Customer Experience & No Personalization",
    desc: "Provide the correct product at the right time. Our solutions translate customers\u2019 behavior and provide individual financial products in an easy, modern user interface.",
  },
  {
    title: "Advanced Regulatory Compliance (PSD2, PCI DSS, GDPR)",
    desc: "We embed compliance into your platform foundation so that you can expand globally without sleepless nights spent for audits.",
  },
];

const serviceOfferings = [
  {
    title: "Product Discovery",
    desc: "We perform collaborative workshops to identify your business model, target market, and MVP, then map a clear product development roadmap. This allows us to prioritize each feature and technology decision based on your market goals from day one.",
  },
  {
    title: "Architectural Consulting",
    desc: "We design secure, scalable architectures that meet regulatory requirements and support future growth \u2014 from microservices to event-driven systems built for financial workloads.",
  },
  {
    title: "Investment Platforms (WealthTech)",
    desc: "Build robo-advisors, portfolio management tools, and goal-tracking dashboards that deliver personalized, transparent investor experiences at scale.",
  },
  {
    title: "Custom AI/ML Solutions",
    desc: "Leverage machine learning for fraud detection, credit scoring, risk assessment, and personalized financial product recommendations.",
  },
  {
    title: "Blockchain Solutions",
    desc: "From DeFi protocols to tokenized assets and smart contracts \u2014 we build blockchain applications with security, transparency, and regulatory compliance built in.",
  },
];

const industryVerticals = [
  {
    title: "Wealth Management Software",
    desc: "Customized wealth management platforms that integrate portfolio management, goal tracking, and reporting. Our offerings enable advisors to deliver customized, transparent, and collaborative investor experiences.",
  },
  {
    title: "Trading Platforms",
    desc: "Secure, high-performance trading platforms with low latency, intuitive UI, and high-quality analytics, enabling seamless execution of trades across different asset classes in real time.",
  },
  {
    title: "Blockchain Apps",
    desc: "Blockchain applications with greater security and transparency. From DeFi solutions to payment gateway platforms, we integrate smart contracts and asset tokenization into scalable and future-proofed solutions.",
  },
  {
    title: "Digital Wallets",
    desc: "Secure, easy-to-use digital wallets with seamless payment gateway integration. Our focus is on user-experience design, advanced encryption, and effortless onboarding to build engagement and trust.",
  },
  {
    title: "Asset Management Solutions",
    desc: "Complete asset management software that simplifies portfolio analysis, risk management, and compliance. Custom fintech software development services maximize operating efficiency while not sacrificing sophisticated, multi-asset investment strategies.",
  },
];

const whyUs = [
  { title: "Deep FinTech Domain Expertise", desc: "Established history of delivery in complex financial systems, ranging from robo-advisors to multi-asset trading platforms.", stat: "10+", statLabel: "Years in FinTech" },
  { title: "ROI-Driven Development", desc: "Each feature is constructed to maximize efficiency, profitability, and quantifiable business value.", stat: "3x", statLabel: "Avg ROI" },
  { title: "Mission-Critical Reliability", desc: "Systems designed for 99.99% uptime, handling sensitive financial information with unyielding accuracy.", stat: "99.99%", statLabel: "Uptime" },
  { title: "Professional-Level UX", desc: "Intuitive interfaces that streamline complex workflows for maximum adoption and productivity.", stat: "40%", statLabel: "Faster Adoption" },
  { title: "Custom & Scalable Architecture", desc: "Solutions scaled to your business, configured for global expansion.", stat: "Global", statLabel: "Scale Ready" },
  { title: "Security-First Philosophy", desc: "Compliance-friendly design with encryption, secure APIs, and rigorous testing.", stat: "100%", statLabel: "Audit Ready" },
];

const complianceStandards = ["PCI DSS", "GDPR", "PSD2", "SOC 2", "KYC/AML", "HIPAA"];

const techStack = [
  { name: "React Native", desc: "Cross-platform mobile framework delivering near-native performance for iOS and Android fintech apps from a single codebase." },
  { name: "Flutter", desc: "Google\u2019s UI toolkit for building natively compiled, visually expressive fintech apps across mobile, web, and desktop." },
  { name: "Kotlin", desc: "Modern, safe language for native Android development \u2014 full Jetpack ecosystem and seamless Google integration for banking apps." },
  { name: "Swift", desc: "Apple\u2019s powerful language for native iOS development \u2014 performance, safety, and deep OS integration for financial applications." },
];

const processSteps = [
  { num: "01", title: "Project Discovery", desc: "We analyze your business goals, compliance needs, and financial procedures to create clearly articulated goals, optimize processes, and isolate the best digital opportunities." },
  { num: "02", title: "Team Composition", desc: "We assemble multidisciplinary teams with fintech, security, and compliance backgrounds, linked to your project scope, regulatory requirements, and growth plans." },
  { num: "03", title: "Project Delivery", desc: "From MVP through enterprise-scale implementation, secure payment processing gateways, trading platforms, wealth management solutions, and scalable architectures for sustained success." },
];

/* ─────────────────────── PAGE ─────────────────────── */

export default function FintechFinancePage() {
  usePageMetadata({
    title: "FinTech Software Development | Forrof",
    description: "Custom fintech software development for payment platforms, lending systems, risk management tools, and analytics dashboards engineered for growth.",
    keywords: "fintech development, payment platform, lending software, trading platform, wealth management, blockchain, KYC, PCI DSS, financial software",
  });

  const navigate = useNavigate();
  const [activePain, setActivePain] = useState(0);
  const [openVertical, setOpenVertical] = useState<number | null>(0);
  const [activeTech, setActiveTech] = useState(0);

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
          <div
            className="absolute top-[calc(50%-350px)] right-[10%] w-[700px] h-[700px] rounded-full blur-[130px] opacity-60"
            style={{ background: "rgba(0, 212, 170, 0.07)" }}
          />
          <div
            className="absolute bottom-[15%] left-[5%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-40"
            style={{ background: "rgba(72, 240, 231, 0.04)" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background z-10" />

        <div className="relative z-20 max-w-[1800px] mx-auto w-full">
          <motion.span className="inline-block text-xs uppercase tracking-[0.3em] mb-8" style={{ color: "#00d4aa" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            Industries / FinTech &amp; Finance
          </motion.span>
          <div className="overflow-hidden mb-6 py-2">
            <motion.h1
              className="text-[10vw] md:text-[7vw] font-bold leading-[0.95] tracking-tighter"
              style={{ background: "linear-gradient(135deg, #ffffff 0%, #48f0e7 30%, #00d4aa 60%, #126b66 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", backgroundSize: "200% 200%" }}
              initial={{ y: "110%", backgroundPosition: "0% 50%" }}
              animate={{ y: 0, backgroundPosition: "100% 50%" }}
              transition={{ y: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }, backgroundPosition: { duration: 3, ease: "easeInOut", delay: 1, repeat: Infinity, repeatType: "reverse" } }}
            >
              Custom FinTech Software Development
            </motion.h1>
          </div>
          <motion.p className="text-lg md:text-2xl max-w-3xl leading-relaxed mt-10" style={{ color: "#48f0e7" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            Custom-built payment platforms, lending systems, risk management tools, and analytics dashboards engineered to fit your business model, streamline financial operations, and deliver measurable ROI as you grow.
          </motion.p>
          <motion.div className="mt-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <Magnetic>
              <button onClick={() => navigate("/contact")} className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-80 transition-opacity">
                Discuss the Project <ArrowUpRight size={18} />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </motion.section>

      {/* ═══════════ SEC 1 — Pain Points (click-to-select) ═══════════ */}
      <section ref={sec1Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/01</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Pain Points</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Pain Points We Solve
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-16 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            73% of executives say poor decision-making costs them revenue, often because systems, compliance, and customer experiences aren&rsquo;t working in sync.
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
                    animate={{ scale: activePain === i ? 1 : 0.5, backgroundColor: activePain === i ? "#00d4aa" : "hsl(var(--muted))" }}
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
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{painPoints[activePain].title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">{painPoints[activePain].desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 2 — Service Offerings (hover-expand list) ═══════════ */}
      <section ref={sec2Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/02</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Services</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter" initial={{ opacity: 0, y: 40 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
              FinTech Development Services
            </motion.h2>
            <motion.p className="text-lg text-muted-foreground leading-relaxed self-end" initial={{ opacity: 0, y: 30 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
              We design and build secure, scalable, and regulation-ready products that help you innovate faster and operate smarter.
            </motion.p>
          </div>

          <div className="space-y-0">
            {serviceOfferings.map((item, i) => (
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
                    {item.title}
                  </h3>
                </div>
                <div className="max-h-0 group-hover:max-h-[200px] overflow-hidden transition-all duration-500">
                  <p className="text-muted-foreground pb-6 pl-0 md:pl-[104px] max-w-3xl leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
            <motion.div className="border-t border-border" initial={{ scaleX: 0 }} animate={sec2InView ? { scaleX: 1 } : {}} transition={{ duration: 1.5, delay: 0.8 }} style={{ transformOrigin: "left" }} />
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 3 — Industry Verticals (accordion with indicators) ═══════════ */}
      <section ref={sec3Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/03</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Industries</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            FinTech Development Services Tailored by Industry
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-16 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            Industry-specific fintech solutions that address unique challenges in wealth management, trading, payments, blockchain, and asset management.
          </motion.p>

          <div className="space-y-0">
            {industryVerticals.map((item, i) => (
              <motion.div key={i} className="border-t border-border" initial={{ opacity: 0, y: 16 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}>
                <button className="w-full py-7 flex items-center justify-between gap-6 text-left group transition-all duration-300 hover:pl-4 hover:bg-foreground/[0.04] rounded-xl" onClick={() => setOpenVertical(openVertical === i ? null : i)} onMouseEnter={() => setOpenVertical(i)}>
                  <div className="flex items-center gap-5">
                    <motion.span
                      className="w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 text-xs font-mono transition-all duration-300 group-hover:border-accent group-hover:bg-accent/10"
                      animate={{
                        borderColor: openVertical === i ? "rgba(0,212,170,0.5)" : "hsl(var(--border))",
                        backgroundColor: openVertical === i ? "rgba(0,212,170,0.1)" : "transparent",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.span animate={{ color: openVertical === i ? "#00d4aa" : "hsl(var(--muted-foreground))" }}>
                        {String(i + 1).padStart(2, "0")}
                      </motion.span>
                    </motion.span>
                    <span className="text-xl md:text-2xl font-semibold group-hover:text-foreground group-hover:translate-x-4 transition-all duration-300">{item.title}</span>
                  </div>
                  <motion.div className="w-9 h-9 rounded-full border border-border flex items-center justify-center flex-shrink-0 group-hover:border-foreground group-hover:scale-110 transition-all duration-300" animate={{ rotate: openVertical === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    {openVertical === i ? <Minus size={14} className="text-foreground" /> : <Plus size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />}
                  </motion.div>
                </button>
                <motion.div className="overflow-hidden" initial={false} animate={{ height: openVertical === i ? "auto" : 0, opacity: openVertical === i ? 1 : 0 }} transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}>
                  <p className="text-muted-foreground leading-relaxed text-sm pb-8 pl-[3.75rem] max-w-4xl">{item.desc}</p>
                </motion.div>
              </motion.div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 4 — Why Choose Us (stat cards with counters) ═══════════ */}
      <section ref={sec4Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec4InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/04</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Why Us</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec4InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Why Choose Us
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-16 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec4InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            Cut risks. Increase efficiency. Drive growth with FinTech software and custom AI/ML solutions built for your business reality.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={sec4InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: i * 0.08 }}>
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

      {/* ═══════════ SEC 5 — Compliance & Security ═══════════ */}
      <section ref={sec5Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/05</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Compliance</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6" initial={{ opacity: 0, y: 40 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
                Regulatory Compliance &amp; Technologies
              </motion.h2>
              <motion.p className="text-muted-foreground leading-relaxed mb-10" initial={{ opacity: 0, y: 20 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
                We ensure every fintech solution meets the highest security and compliance standards from day one. Our engineering approach integrates compliance into architecture and workflows &mdash; covering data encryption, secure APIs, role-based access control, and continuous security testing.
              </motion.p>
              <div className="flex flex-wrap gap-3">
                {complianceStandards.map((std, i) => (
                  <motion.span
                    key={std}
                    className="px-4 py-2 rounded-full border border-accent/30 text-sm font-medium text-accent bg-accent/5"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={sec5InView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                  >
                    {std}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Tech Stack tabs */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }}>
              <h3 className="text-sm font-semibold mb-6 uppercase tracking-widest text-muted-foreground">Tech Stack</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {techStack.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTech(i)}
                    onMouseEnter={() => setActiveTech(i)}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeTech === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {activeTech === i && (
                      <motion.div className="absolute inset-0 rounded-lg bg-foreground/5 border border-accent/30" layoutId="activeTechTab" transition={{ duration: 0.3 }} />
                    )}
                    <span className="relative z-10">{t.name}</span>
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTech}
                  className="p-6 rounded-2xl bg-card border border-border/40"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <h4 className="text-lg font-semibold mb-2">{techStack[activeTech].name}</h4>
                  <p className="text-muted-foreground leading-relaxed text-sm">{techStack[activeTech].desc}</p>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 6 — Process (scroll-driven timeline) ═══════════ */}
      <section ref={sec6Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <ProcessTimeline steps={processSteps} inView={sec6InView} sectionLabel="/06" title="How We Build Scalable FinTech Solutions" labelText="How We Work" />
        </div>
      </section>

      {/* ═══════════ SEC 7 — Scale CTA ═══════════ */}
      <section ref={sec7Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec7InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/07</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Scale</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter" initial={{ opacity: 0, y: 40 }} animate={sec7InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
              Future-ready FinTech Solutions for Growing Enterprises
            </motion.h2>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={sec7InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                From custom payment gateways and lending platforms to advanced risk management and analytics tools &mdash; our solutions are tailored to your business model, streamline financial workflows, and deliver proven ROI as you scale.
              </p>
              <Magnetic>
                <button onClick={() => navigate("/contact")} className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300 font-medium">
                  Request a Consultation <ArrowUpRight size={18} />
                </button>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section ref={ctaRef} className="section-forced-dark section-padding py-40">
        <div className="max-w-[1800px] mx-auto text-center">
          <motion.p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: "#00d4aa" }} initial={{ opacity: 0, y: 20 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            Dealing with legacy tech?
          </motion.p>
          <motion.h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-10" initial={{ opacity: 0, y: 40 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            It&rsquo;s time to transform.
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
