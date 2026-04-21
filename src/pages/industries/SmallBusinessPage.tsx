import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Plus, Minus, Check } from "lucide-react";
import { LineReveal, Magnetic } from "@/components/AnimationComponents";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { GlowCard, CountUp } from "@/components/InteractiveElements";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useNavigate } from "react-router-dom";

/* ───────────────────────── DATA ───────────────────────── */

const clients = [
  { num: "01", title: "Retail & Food", desc: "We help cafés, restaurants, and local chains increase online sales and reduce operational chaos with websites, analytics, delivery integrations and CRM systems." },
  { num: "02", title: "Services & Construction", desc: "Custom platforms for scheduling, project tracking, and client management for service-based businesses." },
  { num: "03", title: "Professional Services", desc: "Digital tools for consultants, agencies, and firms to streamline operations and client delivery." },
  { num: "04", title: "Digital & SaaS Companies", desc: "Technical partnerships for growing software companies that need to scale their product and team." },
  { num: "05", title: "Beauty & Wellness", desc: "Booking systems, client management, and marketing tools for salons, spas, and wellness studios." },
];

const valueProps = [
  { title: "Fast Delivery", desc: "We move quickly without cutting corners. Most projects launch in weeks, not months, so you start seeing results sooner." },
  { title: "Clear Communication", desc: "No jargon, no ghosting. You get regular updates, honest timelines, and a single point of contact who actually listens." },
  { title: "Affordable & Flexible", desc: "Fixed-scope pricing, transparent estimates, and flexible engagement models designed for real small business budgets." },
  { title: "Expert Guidance", desc: "We don't just build what you ask for — we help you figure out the smartest approach based on your goals and budget." },
  { title: "Reliable Partnership", desc: "We stick around after launch. Ongoing support, quick fixes, and proactive improvements keep your systems running smoothly." },
];

const challenges = [
  { title: "No time for IT headaches", help: "We take full ownership: plan, build, launch, and maintain your solution so you stay focused on the business." },
  { title: "Old website that doesn't sell", help: "We redesign and rebuild it into a modern, fast, mobile-ready product that improves conversions." },
  { title: "Limited budget", help: "We start with a fixed-scope, high-value phase and scale later: transparent estimates, no surprise costs." },
  { title: "No in-house tech team", help: "We act as your on-demand IT department: dev, QA, DevOps, and product guidance without hiring." },
  { title: "Manual processes eat time", help: "We map your manual processes and build simple automations that save hours and reduce errors." },
];

const processSteps = [
  { num: "01", title: "Intro Call & Discovery", desc: "We learn about your business, goals, and pain points. No commitment — just a clear conversation about what's possible and what makes sense for your budget." },
  { num: "02", title: "Plan & Estimate", desc: "We define the scope, timeline, and cost upfront. You get a transparent proposal with no hidden fees so you can make an informed decision." },
  { num: "03", title: "Design & Build", desc: "Our team designs, develops, and tests your solution in short sprints. You see progress every week and can give feedback along the way." },
  { num: "04", title: "Launch & Feedback", desc: "We deploy your solution, monitor performance, and gather real user feedback to make sure everything works as expected." },
  { num: "05", title: "Support & Growth", desc: "After launch, we provide ongoing maintenance, quick fixes, and strategic improvements to help your business grow." },
];

const services = [
  { title: "Website Development", desc: "Custom websites and landing pages built for speed, SEO, and conversions — designed to represent your brand and drive results." },
  { title: "Mobile Solutions", desc: "Native and cross-platform mobile apps that keep your customers engaged and your operations accessible from anywhere." },
  { title: "Automation Tools", desc: "Workflow automations that eliminate repetitive tasks, reduce errors, and free up your team to focus on what matters." },
  { title: "Custom Solutions", desc: "Tailored platforms, dashboards, and internal tools built specifically for your business processes and goals." },
  { title: "Branding/UX/UI & Design", desc: "Professional branding, user experience design, and interface design that make your business look credible and feel intuitive." },
  { title: "AI-Driven Services", desc: "Smart features powered by AI — from chatbots and recommendations to data analysis and predictive insights." },
  { title: "Maintenance & Support", desc: "Ongoing technical support, performance monitoring, security updates, and continuous improvements to keep your systems healthy." },
];

const engagementOptions = [
  { title: "Project-Based Work", desc: "A clearly scoped project with a fixed timeline and budget. Ideal for one-time builds like a website, app, or automation." },
  { title: "Ongoing Partnership", desc: "A retainer-based relationship where we handle your IT needs month-to-month — from updates and support to new feature development." },
  { title: "Extended Team", desc: "We embed developers, designers, or QA engineers directly into your workflow. You manage priorities; we deliver the work." },
  { title: "Consulting-First Model", desc: "Not sure what you need? We start with a paid discovery session to audit your tech, define priorities, and build a roadmap." },
];

const whyUsItems = [
  "Clear communication, no bureaucracy",
  "Fast and transparent delivery",
  "Personal approach: work directly with founders",
  "Full-cycle service: design, build, support",
  "Small business experience across US, EU & UAE",
];

/* ─────────────────────── PAGE ─────────────────────── */

export default function SmallBusinessPage() {
  usePageMetadata({
    title: "IT Services for Small Business | Forrof",
    description: "IT solutions for small businesses. Fast delivery, clear communication, affordable pricing, and expert guidance.",
    keywords: "small business IT, IT services, small business software, website development, automation, small business tech",
  });

  const navigate = useNavigate();
  const [openClient, setOpenClient] = useState<number | null>(0);
  const [activeChallenge, setActiveChallenge] = useState(0);
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
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div className="absolute top-[calc(50%-350px)] right-[15%] w-[700px] h-[700px] rounded-full blur-[130px]" style={{ background: "rgba(0, 212, 170, 0.07)" }} animate={{ x: [0, -40, 30, -50, 0], y: [0, 60, -30, 40, 0], opacity: [0.5, 0.8, 0.4, 0.9, 0.5] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background z-10" />

        <div className="relative z-20 max-w-[1800px] mx-auto w-full">
          <motion.span className="inline-block text-xs uppercase tracking-[0.3em] mb-8" style={{ color: "#00d4aa" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            Services / Small Business
          </motion.span>
          <div className="overflow-hidden mb-6 py-2">
            <motion.h1
              className="text-[10vw] md:text-[7vw] font-bold leading-[0.95] tracking-tighter"
              style={{ background: "linear-gradient(135deg, #ffffff 0%, #48f0e7 30%, #00d4aa 60%, #126b66 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", backgroundSize: "200% 200%" }}
              initial={{ y: "110%", backgroundPosition: "0% 50%" }}
              animate={{ y: 0, backgroundPosition: "100% 50%" }}
              transition={{ y: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }, backgroundPosition: { duration: 3, ease: "easeInOut", delay: 1, repeat: Infinity, repeatType: "reverse" } }}
            >
              IT Services Small Businesses Trust
            </motion.h1>
          </div>
          <motion.p className="text-lg md:text-2xl max-w-3xl leading-relaxed mt-10" style={{ color: "#48f0e7" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            IT shouldn&rsquo;t cost you time, money, and sleep. We ensure IT solutions for small businesses stop being a pain and start delivering results.
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

      {/* ═══════════ SEC 1 — Who We Work With (accordion with numbered indicators, light) ═══════════ */}
      <section ref={sec1Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/01</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Who We Work With</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Our Clients: Who We Work With
          </motion.h2>

          <div className="space-y-0">
            {clients.map((item, i) => (
              <motion.div key={i} className="border-t border-border" initial={{ opacity: 0, y: 16 }} animate={sec1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}>
                <button className="w-full py-7 flex items-center justify-between gap-6 text-left group transition-all duration-300 hover:pl-4 hover:bg-foreground/[0.03] rounded-xl" onClick={() => setOpenClient(openClient === i ? null : i)}>
                  <div className="flex items-center gap-5">
                    <motion.span
                      className="w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 text-xs font-mono transition-all duration-300 group-hover:border-accent group-hover:bg-accent/10"
                      animate={{ borderColor: openClient === i ? "rgba(0,212,170,0.5)" : "rgba(255,255,255,0.1)", backgroundColor: openClient === i ? "rgba(0,212,170,0.1)" : "transparent" }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.span animate={{ color: openClient === i ? "#00d4aa" : "rgba(255,255,255,0.4)" }}>{item.num}</motion.span>
                    </motion.span>
                    <span className="text-xl md:text-2xl font-semibold group-hover:text-foreground group-hover:translate-x-2 transition-all duration-300">{item.title}</span>
                  </div>
                  <motion.div className="w-9 h-9 rounded-full border border-border flex items-center justify-center flex-shrink-0 group-hover:border-foreground group-hover:scale-110 transition-all duration-300" animate={{ rotate: openClient === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    {openClient === i ? <Minus size={14} className="text-foreground" /> : <Plus size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />}
                  </motion.div>
                </button>
                <motion.div className="overflow-hidden" initial={false} animate={{ height: openClient === i ? "auto" : 0, opacity: openClient === i ? 1 : 0 }} transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}>
                  <p className="text-muted-foreground leading-relaxed text-sm pb-8 pl-[3.75rem] max-w-4xl">{item.desc}</p>
                </motion.div>
              </motion.div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 2 — Value Props (hover-expand list, dark) ═══════════ */}
      <section ref={sec2Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/02</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Value</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Real Results with IT Solutions for Small Business
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valueProps.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={sec2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: i * 0.06 }}>
                <GlowCard className="h-full rounded-2xl bg-card border border-border/40 hover:border-accent/40 transition-all duration-300 group">
                  <div className="p-6 md:p-8 relative z-10">
                    <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase block mb-6">/{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-foreground transition-colors">{item.title}</h3>
                    <div className="max-h-0 group-hover:max-h-[200px] overflow-hidden transition-all duration-500 ease-out">
                      <p className="text-muted-foreground leading-relaxed text-sm pt-1">{item.desc}</p>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 3 — Challenges (click-to-select with detail panel, light) ═══════════ */}
      <section ref={sec3Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/03</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Challenges</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec3InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Challenges Solved by IT Providers
          </motion.h2>

          <div className="grid lg:grid-cols-[1fr_1fr] gap-8">
            <div className="space-y-3">
              {challenges.map((item, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveChallenge(i)}
                    onMouseEnter={() => setActiveChallenge(i)}
                  className={`w-full text-left px-6 py-5 rounded-xl border transition-all duration-300 ${activeChallenge === i ? "border-accent/50 bg-accent/5" : "border-border/40 hover:border-foreground/20"}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={sec3InView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-mono ${activeChallenge === i ? "text-accent" : "text-muted-foreground"}`}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={`text-lg font-semibold ${activeChallenge === i ? "text-foreground" : "text-muted-foreground"}`}>{item.title}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeChallenge}
                className="p-8 md:p-10 rounded-2xl bg-card border border-border/40 flex flex-col justify-center min-h-[250px]"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="text-xs text-accent font-medium tracking-widest uppercase block mb-4">Challenge</span>
                <h3 className="text-2xl md:text-3xl font-bold mb-6">{challenges[activeChallenge].title}</h3>
                <span className="text-xs text-accent font-medium tracking-widest uppercase block mb-3">How We Help</span>
                <p className="text-muted-foreground leading-relaxed text-lg">{challenges[activeChallenge].help}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 4 — Process (scroll-driven timeline, dark) ═══════════ */}
      <section ref={sec4Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <ProcessTimeline steps={processSteps} inView={sec4InView} sectionLabel="/04" title="Simple IT Services Workflow" labelText="Process" />
        </div>
      </section>

      {/* ═══════════ SEC 5 — Services (vertical tabs with layoutId, light) ═══════════ */}
      <section ref={sec5Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/05</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Services</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec5InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Our IT Services for Small Businesses
          </motion.h2>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {services.map((svc, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveService(i)}
                    onMouseEnter={() => setActiveService(i)}
                  className={`relative px-5 py-3 rounded-xl text-sm font-medium text-left whitespace-nowrap lg:whitespace-normal transition-all duration-300 ${activeService === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={sec5InView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                >
                  {activeService === i && (
                    <motion.div className="absolute inset-0 rounded-xl bg-foreground/5 border border-accent/30" layoutId="activeSmallBizServiceTab" transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }} />
                  )}
                  <span className="relative z-10">{svc.title}</span>
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                className="p-8 md:p-10 rounded-2xl bg-card border border-border/40 flex flex-col justify-center min-h-[200px]"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="text-xs text-accent font-medium tracking-widest uppercase block mb-4">{String(activeService + 1).padStart(2, "0")}</span>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{services[activeService].title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{services[activeService].desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 6 — Engagement Options (glow cards, dark) ═══════════ */}
      <section ref={sec6Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec6InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/06</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Engagement</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec6InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Engagement Options
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {engagementOptions.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={sec6InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: i * 0.08 }}>
                <GlowCard className="h-full rounded-2xl bg-card border border-border/40 hover:border-accent/40 transition-all duration-300 group">
                  <div className="p-6 md:p-8 relative z-10">
                    <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase block mb-6">/{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-foreground transition-colors">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SEC 7 — Why Us (animated checks, light) ═══════════ */}
      <section ref={sec7Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div className="flex items-center gap-4 mb-20" initial={{ opacity: 0, y: 20 }} animate={sec7InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <span className="number-label">/07</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Why Us</span>
          </motion.div>

          <motion.h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl" initial={{ opacity: 0, y: 40 }} animate={sec7InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            What Makes Us a Trusted Small Business Partner
          </motion.h2>

          <div className="space-y-6">
            {whyUsItems.map((item, i) => (
              <motion.div key={i} className="flex items-center gap-5 py-4 border-b border-border" initial={{ opacity: 0, x: -30 }} animate={sec7InView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}>
                <motion.span className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0" initial={{ scale: 0 }} animate={sec7InView ? { scale: 1 } : {}} transition={{ type: "spring", delay: 0.3 + i * 0.12 }}>
                  <Check size={18} className="text-accent" />
                </motion.span>
                <span className="text-xl md:text-2xl font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section ref={ctaRef} className="section-forced-dark section-padding py-40">
        <div className="max-w-[1800px] mx-auto text-center">
          <motion.p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: "#00d4aa" }} initial={{ opacity: 0, y: 20 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            Small business IT, done right
          </motion.p>
          <motion.h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-10" initial={{ opacity: 0, y: 40 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            Let&rsquo;s build intelligent systems that help your business grow
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
