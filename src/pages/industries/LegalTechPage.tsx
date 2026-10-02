import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Plus, Minus, Check } from "lucide-react";
import { LineReveal, Magnetic } from "@/components/AnimationComponents";
import { GlowCard, CountUp } from "@/components/InteractiveElements";
import { TechLogo } from "@/components/TechLogo";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { seo } from "@/constants/seo";
import { useNavigate } from "react-router-dom";

/* ───────────────────────── DATA ───────────────────────── */

const challenges = [
  {
    problem: "Double entry across disconnected tools",
    problemDesc: "Matter details re-typed between intake forms, Actionstep, LEAP or Smokeball, Xero, and email - wasting billable hours and creating errors.",
    solution: "Practice management integrations",
    solutionDesc: "We connect your practice management system with Xero, e-signing, document storage, and intake forms, so every record updates once and flows everywhere.",
  },
  {
    problem: "Manual documents and signatures",
    problemDesc: "Hours spent drafting from templates, chasing signatures, and searching PDFs, inboxes, and shared drives.",
    solution: "Document automation & e-signing",
    solutionDesc: "Template-driven drafting, legally binding electronic signatures, and searchable document storage - built from our experience shipping the FynoSign e-signature platform.",
  },
  {
    problem: "Using AI without risking client confidentiality",
    problemDesc: "Staff are already pasting client information into public AI tools, with no firm policy, audit trail, or accuracy checks.",
    solution: "Private legal AI, built to NZLS guidance",
    solutionDesc: "Private AI assistants that cite their sources, keep a human in the loop, never train on your data, and align with NZ Law Society generative AI guidance and the Australian Privacy Principles.",
  },
];

const whoWeServe = [
  { title: "Small & Mid-Sized Law Firms", desc: "Firms of 2-50 lawyers across New Zealand and Australia that want to automate admin, improve client service, and get more from their practice management system." },
  { title: "Property & Conveyancing Practices", desc: "Intake, document, and settlement workflows that integrate with your practice management system and cut repetitive conveyancing admin." },
  { title: "Family, Immigration & Personal Injury Firms", desc: "Client portals, intake automation, and document collection for high-volume, client-facing practice areas." },
  { title: "In-house Legal Teams", desc: "Contract management, matter tracking, and approval workflows for corporate legal and compliance teams." },
  { title: "Barristers & Boutique Practices", desc: "Lightweight tools for research, document review, and scheduling - without enterprise software overheads." },
  { title: "LegalTech Startups", desc: "MVP development, AI integration, and scalable architecture for founders building products for the NZ and Australian legal market." },
];

const services = [
  { title: "Practice Management Integrations", desc: "Connect Actionstep, LEAP, Smokeball, and other practice management systems with Xero, e-signing, intake forms, and document storage via their APIs." },
  { title: "Client Portals & Intake Automation", desc: "Secure, branded portals for onboarding, document sharing, matter updates, and messaging - with automated intake and conflict-check data capture." },
  { title: "Legal AI Assistants", desc: "Private AI chatbots that answer questions over your precedents, templates, and firm knowledge - with citations lawyers can verify." },
  { title: "Document Automation & E-Signing", desc: "Template-driven drafting and legally binding electronic signatures that remove hours of manual document work every week." },
  { title: "Contract Review & Clause Extraction", desc: "AI-assisted review that flags risky clauses, missing terms, and key dates across large document sets - with lawyer sign-off." },
  { title: "Custom Legal Software", desc: "Bespoke matter, workflow, and reporting tools when off-the-shelf software does not fit how your firm works." },
  { title: "Law Firm SEO & Google Ads", desc: "Practice-area pages, local SEO, and Google Ads campaigns that bring in enquiries from people searching for a lawyer in your city." },
  { title: "AI & Automation Compliance Check", desc: "A technical audit of where your systems use AI or automated decision-making - ahead of Australia's December 2026 Privacy Act transparency requirements." },
];

const useCases = [
  { title: "Automated Client Intake", desc: "Online intake forms that capture client details, collect conflict-check data, and create the matter in your practice management system automatically." },
  { title: "Client Portal for Matter Updates", desc: "Clients check progress, upload documents, and sign forms in one secure place - fewer 'any update?' phone calls and emails." },
  { title: "Firm Knowledge Assistant", desc: "An AI assistant trained on your precedents and internal guides, so junior staff find answers in seconds instead of interrupting partners." },
  { title: "Practice Management + Xero Sync", desc: "Invoices, payments, and client records kept in sync between your practice management system and Xero, with no double entry." },
  { title: "E-Signature Workflows", desc: "Send, sign, and file engagement letters and agreements digitally, with a full audit trail - the core of our FynoSign platform." },
  { title: "Contract Review Pipeline", desc: "Upload a contract set and receive a clause-by-clause summary, risk flags, and key dates - reviewed and approved by your lawyers." },
];

const technologies = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Python", ".NET", "FastAPI"] },
  { category: "AI", items: ["OpenAI", "Claude", "LangChain", "Hugging Face"] },
  { category: "Cloud & Data", items: ["AWS", "Azure", "PostgreSQL", "Elasticsearch"] },
  { category: "Integrations", items: ["Xero", "Zapier", "Make"] },
];

const dataSecurity = [
  "End-to-end encryption (AES-256, TLS 1.2+)",
  "Role-based access control and matter-level permissions",
  "Comprehensive audit trails",
  "Two-factor authentication (2FA)",
  "Australian data hosting options",
];

const regulatoryCompliance = [
  "NZ Privacy Act 2020",
  "Australian Privacy Principles",
  "NZLS AI Guidance",
  "Notifiable Data Breaches",
  "ADM Transparency (Dec 2026)",
  "Client Confidentiality",
];

const whyChooseUs = [
  { title: "Real legal products in production", desc: "We have built an e-signature platform (FynoSign), an AI chatbot for legal professionals, and a complete lawyer-client application.", stat: "3", statLabel: "Legal Platforms Built" },
  { title: "Built around your practice software", desc: "We integrate with Actionstep, LEAP, Smokeball, and Xero instead of asking your firm to change systems.", stat: "0", statLabel: "Systems Replaced" },
  { title: "Live calls in NZ & AU hours", desc: "Calls, demos, and support between 12-5pm AEST and 2-5pm NZT, with a dedicated project lead.", stat: "5h", statLabel: "Daily Overlap" },
  { title: "Fixed-price first projects", desc: "Start with a fixed-scope integration, portal, or AI pilot - so you see results before committing to more.", stat: "100%", statLabel: "Fixed Quotes" },
  { title: "Rated on Clutch", desc: "Clients rate our value for cost 5/5 on Clutch.", stat: "5/5", statLabel: "Cost Rating" },
  { title: "Privacy-first AI", desc: "Enterprise AI APIs that never train on your data, with human review built into every legal AI workflow.", stat: "0", statLabel: "Training on Your Data" },
];

/* ─────────────────────── PAGE ─────────────────────── */

export default function LegalTechPage() {
  usePageMetadata(seo("/industries/legaltech"));

  const navigate = useNavigate();
  const [activeChallenge, setActiveChallenge] = useState(0);
  const [openServe, setOpenServe] = useState<number | null>(0);

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
            Industries / LegalTech &amp; Law
          </motion.span>
          <div className="overflow-hidden mb-6 pt-2 pb-6">
            <motion.h1
              className="text-[10vw] md:text-[7vw] font-bold leading-[0.95] tracking-tighter"
              style={{ background: "linear-gradient(135deg, #ffffff 0%, #48f0e7 30%, #00d4aa 60%, #126b66 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", backgroundSize: "200% 200%" }}
              initial={{ y: "110%", backgroundPosition: "0% 50%" }}
              animate={{ y: 0, backgroundPosition: "100% 50%" }}
              transition={{ y: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }, backgroundPosition: { duration: 3, ease: "easeInOut", delay: 1 } }}
            >
              Legal Software &amp; AI for NZ &amp; Australian Law Firms
            </motion.h1>
          </div>
          <motion.p className="text-lg md:text-2xl max-w-3xl leading-relaxed mt-10" style={{ color: "#48f0e7" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            Practice management integrations, client portals, document automation, and private legal AI - built around Actionstep, LEAP, Smokeball, and Xero, by the team behind the FynoSign e-signature platform.
          </motion.p>
          <motion.div className="mt-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <Magnetic>
              <button onClick={() => navigate("/contact")} className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-80 transition-opacity">
                Book a Free Legal Tech Consultation <ArrowUpRight size={18} />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </motion.section>

      {/* ═══════════ SEC 1 - Challenges (click-to-select with detail panel) ═══════════ */}
      <section ref={sec1Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/01</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Challenges</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Problems We Solve for Law Firms
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-16 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            Most firms we speak to lose hours every week to double entry, manual documents, and unclear rules for using AI with client information.
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
                  animate={sec1InView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                >
                  <motion.span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    animate={{ scale: activeChallenge === i ? 1 : 0.5, backgroundColor: activeChallenge === i ? "#00d4aa" : "hsl(var(--muted))" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className={`text-lg font-medium transition-colors duration-300 ${activeChallenge === i ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                    {c.problem}
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
                    Problem {String(activeChallenge + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{challenges[activeChallenge].problem}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{challenges[activeChallenge].problemDesc}</p>

                  <span className="text-xs text-accent font-medium tracking-widest uppercase block mb-3">
                    Solution {String(activeChallenge + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{challenges[activeChallenge].solution}</h3>
                  <p className="text-muted-foreground leading-relaxed">{challenges[activeChallenge].solutionDesc}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 2 - Who We Serve (accordion with numbered indicators) ═══════════ */}
      <section ref={sec2Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/02</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Clients</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Whom Do We Serve?
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-16 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            We work with law firms and legal teams across New Zealand and Australia - from boutique practices to in-house legal departments.
          </motion.p>

          <div className="space-y-0">
            {whoWeServe.map((item, i) => (
              <motion.div key={i} className="border-t border-border" initial={{ opacity: 0, y: 16 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}>
                <button className="w-full py-7 flex items-center justify-between gap-6 text-left group transition-all duration-300 hover:pl-4 hover:bg-foreground/[0.04] rounded-xl" onClick={() => setOpenServe(openServe === i ? null : i)} onMouseEnter={() => setOpenServe(i)}>
                  <div className="flex items-center gap-5">
                    <motion.span
                      className="w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 text-xs font-mono transition-all duration-300 group-hover:border-accent group-hover:bg-accent/10"
                      animate={{
                        borderColor: openServe === i ? "rgba(0,212,170,0.5)" : "hsl(var(--border))",
                        backgroundColor: openServe === i ? "rgba(0,212,170,0.1)" : "transparent",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.span animate={{ color: openServe === i ? "#00d4aa" : "hsl(var(--muted-foreground))" }}>
                        {String(i + 1).padStart(2, "0")}
                      </motion.span>
                    </motion.span>
                    <span className="text-xl md:text-2xl font-semibold group-hover:text-foreground group-hover:translate-x-4 transition-all duration-300">{item.title}</span>
                  </div>
                  <motion.div className="w-9 h-9 rounded-full border border-border flex items-center justify-center flex-shrink-0 group-hover:border-foreground group-hover:scale-110 transition-all duration-300" animate={{ rotate: openServe === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    {openServe === i ? <Minus size={14} className="text-foreground" /> : <Plus size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />}
                  </motion.div>
                </button>
                <motion.div className="overflow-hidden" initial={false} animate={{ height: openServe === i ? "auto" : 0, opacity: openServe === i ? 1 : 0 }} transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}>
                  <p className="text-muted-foreground leading-relaxed text-sm pb-8 pl-[3.75rem] max-w-4xl">{item.desc}</p>
                </motion.div>
              </motion.div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 3 - Services (hover-expand list) ═══════════ */}
      <section ref={sec3Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/03</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Services</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter" initial={{ opacity: 0, y: 40 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
              Legal Software Development Services
            </motion.h2>
            <motion.p className="text-lg text-muted-foreground leading-relaxed self-end" initial={{ opacity: 0, y: 30 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
              Software, AI, and growth services designed for how New Zealand and Australian law firms actually work.
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

      {/* ═══════════ SEC 4 - Use Cases (glow cards with hover-expand) ═══════════ */}
      <section ref={sec4Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec4InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/04</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Use Cases</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec4InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Use Cases &amp; Solutions
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-20 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec4InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            Practical solutions that save fee-earner time and improve client service from the first month.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((card, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={sec4InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: i * 0.06 }}>
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

      {/* ═══════════ SEC 5 - Technologies & Compliance (three-column checklist) ═══════════ */}
      <section ref={sec5Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/05</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Tech &amp; Compliance</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Privacy, Security &amp; Technologies
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-16 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            Every solution is designed around the NZ Privacy Act 2020, the Australian Privacy Principles, and your professional confidentiality obligations.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Technologies */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }}>
              <h3 className="text-sm font-semibold mb-8 uppercase tracking-widest text-muted-foreground">Technologies</h3>
              <div className="space-y-6">
                {technologies.map((group, gi) => (
                  <div key={gi}>
                    <span className="text-xs text-accent font-medium tracking-widest uppercase block mb-3">{group.category}</span>
                    <div className="space-y-2">
                      {group.items.map((item, ii) => (
                        <motion.div
                          key={ii}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={sec5InView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.4, delay: 0.4 + gi * 0.1 + ii * 0.04 }}
                        >
                          <TechLogo name={item} className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm text-foreground">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Data Security */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }}>
              <h3 className="text-sm font-semibold mb-8 uppercase tracking-widest text-muted-foreground">Data Security</h3>
              <div className="space-y-3">
                {dataSecurity.map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={sec5InView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.06 }}
                  >
                    <motion.span
                      className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0"
                      initial={{ scale: 0 }}
                      animate={sec5InView ? { scale: 1 } : {}}
                      transition={{ type: "spring", delay: 0.6 + i * 0.08 }}
                    >
                      <Check size={14} className="text-accent" />
                    </motion.span>
                    <span className="text-sm text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Regulatory Compliance */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.5 }}>
              <h3 className="text-sm font-semibold mb-8 uppercase tracking-widest text-muted-foreground">Regulatory Compliance</h3>
              <div className="space-y-3">
                {regulatoryCompliance.map((std, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={sec5InView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                  >
                    <motion.span
                      className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0"
                      initial={{ scale: 0 }}
                      animate={sec5InView ? { scale: 1 } : {}}
                      transition={{ type: "spring", delay: 0.7 + i * 0.1 }}
                    >
                      <Check size={14} className="text-accent" />
                    </motion.span>
                    <span className="text-sm font-medium text-foreground">{std}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 6 - Why Choose Us (stat cards with CountUp) ═══════════ */}
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
            Legal products we have actually shipped, integrations with the software your firm already uses, and a team available during your business hours.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            LegalTech, done right
          </motion.p>
          <motion.h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-10" initial={{ opacity: 0, y: 40 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Ready to modernize your legal practice?
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
