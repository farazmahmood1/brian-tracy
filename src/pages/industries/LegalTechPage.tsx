import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Plus, Minus, Check } from "lucide-react";
import { LineReveal, Magnetic } from "@/components/AnimationComponents";
import { GlowCard, CountUp } from "@/components/InteractiveElements";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useNavigate } from "react-router-dom";

/* ───────────────────────── DATA ───────────────────────── */

const challenges = [
  {
    problem: "Outdated legacy systems",
    problemDesc: "On-premise platforms limit agility and can\u2019t keep up with today\u2019s remote, digital-first workflows.",
    solution: "Cloud-native legal platforms",
    solutionDesc: "Our solutions are accessible anywhere, seamlessly integrated, and built to scale with your practice or department.",
  },
  {
    problem: "Manual document handling",
    problemDesc: "Hours wasted searching, editing, or chasing signatures across PDFs, inboxes, and folders.",
    solution: "Automated workflows & digital signatures",
    solutionDesc: "From intake to archive \u2014 streamline every step with no-code flows and legally binding e-signing.",
  },
  {
    problem: "Security blind spots",
    problemDesc: "Sensitive data exposed due to the lack of encryption, poor access control, or missing compliance standards.",
    solution: "Built-in compliance & data protection",
    solutionDesc: "ISO 27001-ready infrastructure with encryption, audit trails, and granular access controls.",
  },
];

const whoWeServe = [
  { title: "Law Firms", desc: "Custom practice management, case workflow, and billing platforms that improve productivity and client communication." },
  { title: "In-house Legal Departments", desc: "Streamlined contract management, compliance tracking, and collaboration tools for corporate legal teams." },
  { title: "LegalTech Startups", desc: "MVP development, AI integration, and scalable architecture for legal technology innovators." },
  { title: "Notaries & Real Estate Law", desc: "Digital notarization, document management, and transaction platforms for real estate legal professionals." },
  { title: "Corporate Compliance Teams", desc: "Regulatory monitoring, policy automation, and audit trail management for enterprise compliance." },
  { title: "Immigration Agencies", desc: "Case tracking, document automation, and AI-powered analysis for immigration law practices." },
];

const services = [
  { title: "Custom Legal Software Development", desc: "End-to-end platforms built around your workflows \u2014 case tracking, billing, client interaction, and compliance built in." },
  { title: "Case & Document Management Systems", desc: "Organize, search, and collaborate on case files, contracts, and court documents securely and efficiently." },
  { title: "Legal CRM & Client Portals", desc: "Improve intake, case status transparency, and communication through branded, secure client-facing solutions." },
  { title: "Smart Contract Development", desc: "Blockchain-backed contracts with automated execution and verification for transactions, IP, and digital signatures." },
  { title: "Compliance & Risk Management Tools", desc: "Monitor regulations, automate policy enforcement, and maintain audit trails to ensure legal and industry compliance." },
  { title: "AI & NLP for Legal Analytics", desc: "Use machine learning to extract insights from large volumes of legal documents, case law, and contracts." },
  { title: "e-Signature & Workflow Automation", desc: "Legally binding digital signatures and workflow automation to speed up operations and reduce human error." },
  { title: "AI Solutions for Immigration Cases", desc: "Advanced AI solutions to support immigration case analysis and streamline the process of obtaining U.S. visas." },
];

const useCases = [
  { title: "End-to-End Legal Practice Management", desc: "Unified platforms covering case intake, scheduling, billing, document management, and client communication in one system." },
  { title: "Contract Lifecycle Management (CLM)", desc: "Automate contract creation, negotiation, approval, execution, and renewal with full audit trail visibility." },
  { title: "Legal Document Intelligence", desc: "AI-powered document review, clause extraction, and risk analysis across thousands of legal documents in minutes." },
  { title: "Legal Client Portals & Intake Systems", desc: "Secure, branded portals for client onboarding, case status updates, document sharing, and communication." },
  { title: "Regulatory & Compliance Automation", desc: "Automated regulatory monitoring, policy enforcement, and compliance reporting for legal and corporate teams." },
  { title: "Smart Contracts & Blockchain Notarization", desc: "Tamper-proof, blockchain-verified contracts and digital notarization for secure, transparent legal transactions." },
];

const technologies = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Angular"] },
  { category: "Backend", items: ["Node.js", "Python", ".NET", "Java", "Go"] },
  { category: "Cloud", items: ["AWS", "Azure", "GCP", "Docker", "Kubernetes"] },
  { category: "Data", items: ["PostgreSQL", "MongoDB", "Elasticsearch", "Redis", "GraphQL"] },
  { category: "Blockchain", items: ["Ethereum", "Solidity", "Hyperledger", "IPFS", "Web3.js"] },
];

const dataSecurity = [
  "End-to-end encryption (AES-256, TLS 1.2+)",
  "Role-based access control (RBAC)",
  "Comprehensive audit trails",
  "Two-factor authentication (2FA)",
  "Zero-trust architecture",
];

const regulatoryCompliance = [
  "HIPAA",
  "GDPR",
  "ISO 27001",
  "SOC 2",
];

const whyChooseUs = [
  { title: "80% US & EU clients", desc: "We work primarily with Western-market law firms and legal departments, understanding their compliance and workflow expectations.", stat: "80%", statLabel: "Western Markets" },
  { title: "ISO 27001 & GDPR compliant", desc: "Our infrastructure and processes meet the highest international security and data protection standards.", stat: "100%", statLabel: "Compliant" },
  { title: "LegalTech-savvy analysts", desc: "Our team includes subject matter experts who understand legal workflows, terminology, and regulatory requirements.", stat: "SME", statLabel: "Domain Experts" },
  { title: "70% less document handling time", desc: "Our automation solutions dramatically reduce manual document processing, freeing legal professionals to focus on high-value work.", stat: "70%", statLabel: "Time Saved" },
  { title: "Top-rated on Clutch", desc: "Consistently rated 5.0 by our legal industry clients for quality, communication, and delivery.", stat: "5.0", statLabel: "Rating" },
  { title: "AI-powered workflows", desc: "We integrate AI and NLP into legal workflows for smarter document analysis, case prediction, and process automation.", stat: "AI", statLabel: "Built In" },
];

/* ─────────────────────── PAGE ─────────────────────── */

export default function LegalTechPage() {
  usePageMetadata({
    title: "Legal Software Development | Forrof",
    description: "Custom legal software development for law firms & legaltech. Case management, document automation, compliance tools, and AI-powered legal analytics.",
    keywords: "legal software, legaltech, case management, document automation, compliance, smart contracts, legal AI",
  });

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
            Industries / LegalTech &amp; Law
          </motion.span>
          <div className="overflow-hidden mb-6 py-2">
            <motion.h1
              className="text-[10vw] md:text-[7vw] font-bold leading-[0.95] tracking-tighter"
              style={{ background: "linear-gradient(135deg, #ffffff 0%, #48f0e7 30%, #00d4aa 60%, #126b66 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", backgroundSize: "200% 200%" }}
              initial={{ y: "110%", backgroundPosition: "0% 50%" }}
              animate={{ y: 0, backgroundPosition: "100% 50%" }}
              transition={{ y: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }, backgroundPosition: { duration: 3, ease: "easeInOut", delay: 1, repeat: Infinity, repeatType: "reverse" } }}
            >
              Custom Legal Software Development
            </motion.h1>
          </div>
          <motion.p className="text-lg md:text-2xl max-w-3xl leading-relaxed mt-10" style={{ color: "#48f0e7" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            Secure, scalable, and reliable IT solutions tailored specifically for lawyers. Efficient, customized, and guaranteed to perform brilliantly.
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

      {/* ═══════════ SEC 1 — Challenges (click-to-select with detail panel) ═══════════ */}
      <section ref={sec1Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/01</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Challenges</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Solving Legal Tech Challenges
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-16 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            We understand the challenges you may face regarding disconnected software, loads of manual tasks, and security risks.
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

      {/* ═══════════ SEC 2 — Who We Serve (accordion with numbered indicators) ═══════════ */}
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
            We partner with legal organizations of all sizes &mdash; from solo practitioners to enterprise compliance departments &mdash; delivering tailored solutions for every legal workflow.
          </motion.p>

          <div className="space-y-0">
            {whoWeServe.map((item, i) => (
              <motion.div key={i} className="border-t border-border" initial={{ opacity: 0, y: 16 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}>
                <button className="w-full py-7 flex items-center justify-between gap-6 text-left group transition-all duration-300 hover:pl-6 hover:bg-accent/10 hover:border-l-2 hover:border-l-accent rounded-xl" onClick={() => setOpenServe(openServe === i ? null : i)} onMouseEnter={() => setOpenServe(i)}>
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
              Legal Software Development Services
            </motion.h2>
            <motion.p className="text-lg text-muted-foreground leading-relaxed self-end" initial={{ opacity: 0, y: 30 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
              We design and build secure, scalable, and compliance-ready legal software that helps you innovate faster and operate smarter.
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

      {/* ═══════════ SEC 4 — Use Cases (glow cards with hover-expand) ═══════════ */}
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
            Real-world legal technology solutions we build for law firms, corporate legal teams, and legaltech companies.
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

      {/* ═══════════ SEC 5 — Technologies & Compliance (three-column checklist) ═══════════ */}
      <section ref={sec5Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/05</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Tech &amp; Compliance</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Regulatory Compliance &amp; Technologies
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-16 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            We ensure every legal solution meets the highest security and compliance standards from day one, with compliance built into architecture and workflows.
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
                          <Check size={14} className="text-accent flex-shrink-0" />
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
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-16 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec6InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            Deep legal domain expertise, compliance-first engineering, and a proven track record of delivering results for law firms and legal departments worldwide.
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
