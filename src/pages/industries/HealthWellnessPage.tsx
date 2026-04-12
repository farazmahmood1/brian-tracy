import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Plus, Minus, Check, Shield } from "lucide-react";
import { LineReveal, Magnetic } from "@/components/AnimationComponents";
import { GlowCard, CountUp } from "@/components/InteractiveElements";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useNavigate } from "react-router-dom";

/* ───────────────────────── DATA ───────────────────────── */

const painPoints = [
  { num: "01", title: "Navigating HIPAA / GDPR compliance", desc: "Healthcare data comes with high stakes. Without airtight privacy and security from day one, even the best product idea can stall in legal reviews or lose user trust. We bake compliance into every layer of your platform, not bolt it on later." },
  { num: "02", title: "Lack of UX expertise in the wellness domain", desc: "Nowadays, wellness users expect more than smooth flows. They expect support, motivation, and a sense of care. Generic templates don\u2019t cut it anymore. We design emotionally intelligent user journeys grounded in behavior science and wellness psychology." },
  { num: "03", title: "Poor user retention", desc: "Acquiring users is hard. Keeping them is harder. Without personalization, goal tracking, or habit-building UX, engagement drops fast. Our solutions are built to foster long-term use, not just first-time installs." },
  { num: "04", title: "Limited in-house engineering capacity", desc: "Many wellness teams lack deep expertise for the healthcare sector in mobile, cloud, or compliance-heavy systems. We fill those gaps with cross-functional teams experienced in regulated digital health environments." },
  { num: "05", title: "Falling behind in AI integration", desc: "Today\u2019s top wellness platforms are powered by AI, from personalized coaching to predictive insights. Without these features, you risk being perceived as outdated. We help you integrate AI where it adds real, lasting value." },
];

const serviceCards = [
  { title: "Wellness App Development", desc: "We create personalized wellness experiences through mobile and web platforms focused on nutrition, sleep, and lifestyle. These apps are built with secure infrastructure, behavioral UX, AI-powered features and are aligned with HIPAA and GDPR standards from day one." },
  { title: "Fitness & Activity Tracking", desc: "From workout logging to real-time vitals monitoring, we design smart tracking tools that go beyond basic step counters. Integrated with wearables and powered by machine learning, they offer users clear insights into performance and progress." },
  { title: "Mental Health Platforms", desc: "Our team delivers emotionally aware digital tools for mood tracking, journaling, and guided therapy. Built with FHIR-ready architecture and adaptive content delivery, these platforms support engagement, privacy, and clinical relevance." },
  { title: "Telehealth & Remote Care", desc: "We build cross-platform tools for virtual consultations, remote monitoring, and clinical messaging, all using standards like HL7 and FHIR. This is healthcare software development designed for speed and safety." },
  { title: "Wearable Integration", desc: "We connect your product to fitness trackers, biosensors, and medical-grade devices. Collected data is interpreted through AI and surfaced to users as personalized guidance, forming the foundation of future-ready healthcare software solutions." },
];

const processSteps = [
  { num: "01", title: "Discovery & Compliance Planning", desc: "We begin with stakeholder workshops and technical audits to define your product\u2019s goals, compliance needs (HIPAA, GDPR, ISO 27001), and AI opportunities.", outcome: "A clear roadmap and a compliance-first development strategy." },
  { num: "02", title: "UX/UI Design & System Architecture", desc: "Wellness apps must be more than visually polished. They must be emotionally intuitive and technically sound. We map user journeys, design clean flows, and architect systems aligned with HL7/FHIR standards.", outcome: "Seamless, human-centered experiences backed by scalable architecture." },
  { num: "03", title: "Agile Development & AI Integration", desc: "Security is baked into every layer. We use end-to-end encryption, role-based access, penetration testing, and can support SOC 2 audits as needed.", outcome: "A secure, regulation-ready product that users and partners can trust." },
  { num: "04", title: "Deployment & Cloud Readiness", desc: "We deploy your solution to compliant infrastructure on AWS, Azure, or GCP. With CI/CD pipelines, monitoring, and infrastructure-as-code.", outcome: "Smooth, scalable operations with minimal downtime and easy iteration." },
  { num: "05", title: "Post-Launch Support & Optimization", desc: "After launch, we stay involved. From performance monitoring to AI model tuning and user-driven updates, we help your product evolve with the market.", outcome: "A living solution that improves over time, built with the future in mind." },
];

const whyUsQuick = [
  "Compliance-first mindset",
  "Built-in AI, not bolted on",
  "Rapid iterations with user feedback",
  "Infrastructure optimized for data and privacy",
];

const securityFeatures = [
  { title: "HIPAA, GDPR & ISO 27001 Compliance", desc: "Your product is built from day one to meet HIPAA and GDPR standards, with ISO 27001-aligned processes that safeguard user data at every layer." },
  { title: "End-to-End Data Encryption", desc: "Sensitive health data is encrypted in transit and at rest (AES-256, TLS 1.2+), protecting your users from breaches and ensuring peace of mind." },
  { title: "Regular Security Audits", desc: "We perform internal and third-party audits, code reviews, and penetration testing \u2014 before and after launch \u2014 to maintain the highest level of product security." },
  { title: "SOC 2 Support (On Request)", desc: "Need formal certification? We help align your product with SOC 2 controls, including documentation, system audits, and implementation of security best practices." },
  { title: "Role-Based Access & Monitoring", desc: "Granular permissions, user-level logging, and real-time activity monitoring come built-in, supporting secure workflows and audit-readiness from the start." },
];

const techServices = [
  { title: "Custom Health & Wellness App Development", desc: "Design and build secure mobile/web apps for fitness, nutrition, sleep, and mental health. Tailored UX and scalable, cloud-native architecture." },
  { title: "AI & ML Integration", desc: "Embed intelligent features like personalized coaching, predictive health insights, and adaptive content delivery powered by machine learning." },
  { title: "Wearable & Sensor Integration", desc: "Connect your product to fitness trackers, biosensors, and medical-grade devices with real-time data pipelines and AI interpretation." },
  { title: "Telehealth & Remote Care Solutions", desc: "Build HIPAA-compliant video consultations, remote monitoring dashboards, and clinical messaging systems." },
  { title: "HIPAA / GDPR Compliance Consulting", desc: "Expert guidance on regulatory requirements, data protection strategies, and audit preparation for digital health products." },
  { title: "Cloud Architecture & DevOps", desc: "Deploy on compliant AWS, Azure, or GCP infrastructure with CI/CD pipelines, monitoring, and infrastructure-as-code." },
];

const whyChooseUs = [
  { title: "6+ Years in Wellness & Healthtech", desc: "From fitness to mental health \u2014 we\u2019ve built secure, user-loved apps across the full wellness spectrum.", stat: "6+", statLabel: "Years" },
  { title: "Flexible Hiring Model", desc: "Scale fast with vetted experts \u2014 from a single developer to a full-stack delivery team.", stat: "Flex", statLabel: "Team Model" },
  { title: "100% On-Time Delivery", desc: "Agile sprints, clear roadmaps, and no surprises. We ship when we say we will.", stat: "100%", statLabel: "On Time" },
  { title: "Compliance-First Engineering", desc: "HIPAA, GDPR, HL7/FHIR, ISO 27001 \u2014 integrated from day one, not retrofitted later.", stat: "Day 1", statLabel: "Compliant" },
  { title: "Top-Rated by Clients", desc: "5.0 average on Clutch and Upwork. Backed by real results and long-term partnerships.", stat: "5.0", statLabel: "Rating" },
  { title: "AI-Native Development Team", desc: "We build with OpenAI, ML, and computer vision \u2014 making your product smarter from the inside out.", stat: "AI", statLabel: "Native" },
];

/* ─────────────────────── PAGE ─────────────────────── */

export default function HealthWellnessPage() {
  usePageMetadata({
    title: "Health & Wellness Software Development | Forrof",
    description: "Custom wellness and healthcare software development services. From fitness apps to mental health platforms, we build compliant, AI-powered solutions.",
    keywords: "healthcare software, wellness app development, HIPAA compliant, fitness app, mental health platform, telehealth, wearable integration, health tech",
  });

  const navigate = useNavigate();
  const [openPain, setOpenPain] = useState<number | null>(0);
  const [activeTech, setActiveTech] = useState(0);
  const [openSecurity, setOpenSecurity] = useState<number | null>(0);

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

  const timelineRef = useRef(null);
  const { scrollYProgress: timelineProgress } = useScroll({ target: timelineRef, offset: ["start end", "end center"] });
  const lineHeight = useTransform(timelineProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ═══════════ HERO ═══════════ */}
      <motion.section
        className="relative min-h-screen flex items-end section-padding pt-28 pb-16 md:pb-24 overflow-hidden"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div className="absolute top-[calc(50%-350px)] right-[15%] w-[700px] h-[700px] rounded-full blur-[130px]" style={{ background: "rgba(0, 212, 170, 0.07)" }} animate={{ x: [0, -40, 30, -50, 0], y: [0, 60, -30, 40, 0], opacity: [0.5, 0.8, 0.4, 0.9, 0.5] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background z-10" />

        <div className="relative z-20 max-w-[1800px] mx-auto w-full">
          <motion.span className="inline-block text-xs uppercase tracking-[0.3em] mb-8" style={{ color: "#00d4aa" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            Industries / Health &amp; Wellness
          </motion.span>
          <div className="overflow-hidden mb-6 py-2">
            <motion.h1
              className="text-[10vw] md:text-[7vw] font-bold leading-[0.95] tracking-tighter"
              style={{ background: "linear-gradient(135deg, #ffffff 0%, #48f0e7 30%, #00d4aa 60%, #126b66 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", backgroundSize: "200% 200%" }}
              initial={{ y: "110%", backgroundPosition: "0% 50%" }}
              animate={{ y: 0, backgroundPosition: "100% 50%" }}
              transition={{ y: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }, backgroundPosition: { duration: 3, ease: "easeInOut", delay: 1, repeat: Infinity, repeatType: "reverse" } }}
            >
              Health &amp; Wellness Software Development
            </motion.h1>
          </div>
          <motion.p className="text-lg md:text-2xl max-w-3xl leading-relaxed mt-10" style={{ color: "#48f0e7" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            From fitness apps to mental health platforms, our custom software improves engagement, streamlines workflows, and makes healthy living easier for everyone.
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
            Struggling to Bring Your Wellness Product to Market?
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-16 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            Launching a digital health or wellness product today means navigating compliance minefields, delivering experiences users actually return to, and keeping up with AI innovation &mdash; all while balancing speed, safety, and limited resources.
          </motion.p>

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

      {/* ═══════════ SEC 2 — Services (glow cards with hover-expand) ═══════════ */}
      <section ref={sec2Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/02</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Services</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Custom Healthcare Software Development
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-20 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            Our team builds custom medical software solutions designed specifically for the wellness industry &mdash; from mobile fitness apps and mental health platforms to AI-powered remote care systems.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.map((card, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: i * 0.06 }}>
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

          <motion.div className="mt-12" initial={{ opacity: 0, y: 20 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.5 }}>
            <Magnetic>
              <button onClick={() => navigate("/contact")} className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300 font-medium">
                Request a Consultation <ArrowUpRight size={18} />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ SEC 3 — Process (scroll-driven timeline with outcomes) ═══════════ */}
      <section ref={sec3Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/03</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">How We Work</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl text-center mx-auto" initial={{ opacity: 0, y: 40 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            How We Build Custom Healthcare Software Solutions
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-16 leading-relaxed text-center mx-auto" initial={{ opacity: 0, y: 20 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            The health &amp; wellness industry is now heavily driven by AI. Our structured process reflects what we&rsquo;ve learned delivering custom healthcare software solutions across fitness, mental health, remote care, and beyond.
          </motion.p>

          <div ref={timelineRef} className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border/30" />
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] origin-top rounded-full"
              style={{
                height: lineHeight,
                background: "linear-gradient(to bottom, #48f0e7, #00d4aa, #126b66)",
                boxShadow: "0 0 12px rgba(72, 240, 231, 0.4), 0 0 30px rgba(0, 212, 170, 0.15)",
              }}
            />
            <div className="space-y-0">
              {processSteps.map((step, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    className="relative flex items-start"
                    initial={{ opacity: 0, y: 50 }}
                    animate={sec3InView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.12 }}
                  >
                    <div className={`w-1/2 pr-12 ${isLeft ? "" : "md:text-right"}`}>
                      {isLeft ? (
                        <div className="md:text-right pb-16">
                          <span className="text-xs text-accent font-mono tracking-widest block mb-3">{step.num}</span>
                          <h3 className="text-xl md:text-2xl font-bold mb-3">{step.title}</h3>
                          <p className="text-muted-foreground leading-relaxed text-sm mb-3">{step.desc}</p>
                          <div className="flex items-start gap-2 text-sm justify-end">
                            <span className="text-accent font-medium">Outcome:</span>
                            <span className="text-foreground/80">{step.outcome}</span>
                          </div>
                        </div>
                      ) : <div className="pb-16" />}
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 top-1 z-10">
                      <motion.div
                        className="w-4 h-4 rounded-full border-2 border-accent bg-background"
                        whileInView={{ scale: [0.5, 1.2, 1] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
                      />
                    </div>
                    <div className="w-1/2 pl-12">
                      {!isLeft ? (
                        <div className="pb-16">
                          <span className="text-xs text-accent font-mono tracking-widest block mb-3">{step.num}</span>
                          <h3 className="text-xl md:text-2xl font-bold mb-3">{step.title}</h3>
                          <p className="text-muted-foreground leading-relaxed text-sm mb-3">{step.desc}</p>
                          <div className="flex items-start gap-2 text-sm">
                            <span className="text-accent font-medium">Outcome:</span>
                            <span className="text-foreground/80">{step.outcome}</span>
                          </div>
                        </div>
                      ) : <div className="pb-16" />}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.p className="text-xs text-muted-foreground mt-12" initial={{ opacity: 0 }} animate={sec3InView ? { opacity: 1 } : {}} transition={{ delay: 1 }}>
            * The processes of custom healthcare software development may vary from project to project since we are agile.
          </motion.p>
        </div>
      </section>

      {/* ═══════════ SEC 4 — Why Us Quick (animated checklist) ═══════════ */}
      <section ref={sec4Ref} className="section-forced-dark section-padding py-24">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUsQuick.map((item, i) => (
              <motion.div key={i} className="flex items-center gap-4" initial={{ opacity: 0, x: -20 }} animate={sec4InView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <motion.span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0" initial={{ scale: 0 }} animate={sec4InView ? { scale: 1 } : {}} transition={{ type: "spring", delay: 0.2 + i * 0.1 }}>
                  <Check size={16} className="text-accent" />
                </motion.span>
                <span className="text-foreground font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 5 — Security & Compliance (accordion) ═══════════ */}
      <section ref={sec5Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/04</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Security</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Secure and Compliant Healthcare Software Solutions
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-16 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            We build wellness software with privacy, safety, and regulation at the core &mdash; meeting the same standards used by top-tier healthcare organizations worldwide.
          </motion.p>

          <div className="space-y-0">
            {securityFeatures.map((item, i) => (
              <motion.div key={i} className="border-t border-border" initial={{ opacity: 0, y: 16 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}>
                <button className="w-full py-7 flex items-center justify-between gap-6 text-left group transition-all duration-300 hover:pl-4 hover:bg-foreground/[0.03] rounded-xl" onClick={() => setOpenSecurity(openSecurity === i ? null : i)}>
                  <div className="flex items-center gap-5">
                    <motion.span
                      className="w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:border-accent group-hover:bg-accent/10"
                      animate={{ borderColor: openSecurity === i ? "rgba(0,212,170,0.5)" : "rgba(255,255,255,0.1)", backgroundColor: openSecurity === i ? "rgba(0,212,170,0.1)" : "transparent" }}
                      transition={{ duration: 0.3 }}
                    >
                      <Shield size={16} className={openSecurity === i ? "text-accent" : "text-muted-foreground/40"} />
                    </motion.span>
                    <span className="text-xl md:text-2xl font-semibold group-hover:text-foreground group-hover:translate-x-2 transition-all duration-300">{item.title}</span>
                  </div>
                  <motion.div className="w-9 h-9 rounded-full border border-border flex items-center justify-center flex-shrink-0 group-hover:border-foreground group-hover:scale-110 transition-all duration-300" animate={{ rotate: openSecurity === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    {openSecurity === i ? <Minus size={14} className="text-foreground" /> : <Plus size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />}
                  </motion.div>
                </button>
                <motion.div className="overflow-hidden" initial={false} animate={{ height: openSecurity === i ? "auto" : 0, opacity: openSecurity === i ? 1 : 0 }} transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}>
                  <p className="text-muted-foreground leading-relaxed text-sm pb-8 pl-[3.75rem] max-w-4xl">{item.desc}</p>
                </motion.div>
              </motion.div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 6 — Tech Services (vertical tabs) ═══════════ */}
      <section ref={sec6Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec6InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/05</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Technologies</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec6InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Healthcare Software Development Services &amp; Technologies
          </motion.h2>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {techServices.map((svc, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveTech(i)}
                    onMouseEnter={() => setActiveTech(i)}
                  className={`relative px-5 py-3 rounded-xl text-sm font-medium text-left whitespace-nowrap lg:whitespace-normal transition-all duration-300 ${activeTech === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={sec6InView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                >
                  {activeTech === i && (
                    <motion.div className="absolute inset-0 rounded-xl bg-foreground/5 border border-accent/30" layoutId="activeHealthTechTab" transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }} />
                  )}
                  <span className="relative z-10">{svc.title}</span>
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTech}
                className="p-8 md:p-10 rounded-2xl bg-card border border-border/40 flex flex-col justify-center min-h-[200px]"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="text-xs text-accent font-medium tracking-widest uppercase block mb-4">{String(activeTech + 1).padStart(2, "0")}</span>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{techServices[activeTech].title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{techServices[activeTech].desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 7 — Why Choose Us (stat cards) ═══════════ */}
      <section ref={sec7Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec7InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/06</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Why Us</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec7InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Why Choose Us
          </motion.h2>
          <motion.p className="text-lg text-muted-foreground max-w-3xl mb-16 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={sec7InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            Your healthtech product deserves deep domain expertise, built-in compliance, and a team that delivers &mdash; not just clean code.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={sec7InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: i * 0.08 }}>
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
            Wellness tech, done right
          </motion.p>
          <motion.h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-10" initial={{ opacity: 0, y: 40 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Let&rsquo;s turn your healthcare vision into a scalable solution.
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
