import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { Magnetic } from "@/components/AnimationComponents";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { GlowCard } from "@/components/InteractiveElements";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useNavigate } from "react-router-dom";
import { MvpTerminalBlock } from "@/components/AiMlVisuals";

const offerings = [
  { num: "01", title: "Product Discovery & Requirement Analysis", desc: "Map user needs, define scope, and establish clear success criteria before writing a single line of code." },
  { num: "02", title: "Rapid Prototyping & UX/UI Design", desc: "Clickable prototypes and polished UI in days, not months — validated with real users before development begins." },
  { num: "03", title: "Replit-Based MVPs for Rapid Iteration", desc: "Collaborative, cloud-based development environments for ultra-fast iteration and stakeholder demos." },
  { num: "04", title: "Technical Feasibility & Architecture Planning", desc: "Honest feasibility assessment and a scalable architecture plan that grows with your product." },
  { num: "05", title: "Lean Product Roadmap Planning", desc: "Prioritize ruthlessly — only the features that prove the hypothesis and attract early adopters make the cut." },
  { num: "06", title: "Early-Stage Launch & Support", desc: "Go-live support, monitoring, and rapid iteration based on real user feedback from launch day." },
  { num: "07", title: "No-Code/Low-Code MVP Solutions", desc: "Ship faster with Bubble, Webflow, or Retool when speed to market matters more than custom code." },
  { num: "08", title: "Pitch Deck & Investor-Ready Materials", desc: "Compelling pitch narrative, financial models, and demo-ready prototypes that open doors with investors." },
];

const excellence = [
  { title: "Lean & Focused", desc: "Our MVPs include only the essential features needed to test assumptions and gather feedback. This minimizes waste and maximizes learning early in the product lifecycle." },
  { title: "Rapid Prototyping", desc: "We prioritize speed and clarity — using low-code, boilerplates, and AI tools to build and iterate MVPs and POCs quickly, so ideas can be validated with real users fast." },
  { title: "Validated Learning", desc: "We integrate analytics, feedback loops, and user tracking from day one (e.g., via Mixpanel, Amplitude, or Hotjar) to help refine direction and prioritize improvements after launch." },
];

const processSteps = [
  { num: "01", title: "Planning", desc: "At Forrof, we create clear roadmaps by defining goals, scope, and timelines to ensure project success from the start." },
  { num: "02", title: "Development", desc: "Our in-house developers deliver clean, scalable code — no freelancers or part-timers — bringing your vision to life efficiently." },
  { num: "03", title: "Testing & Deployment", desc: "We thoroughly test and deploy your product with confidence, ensuring smooth performance and reliability." },
];

const delivery = [
  { title: "Notion Docs", desc: "Internal company documentation, including guidelines, rules, best practices, procedures, and policies, is stored in Notion to ensure consistency and alignment across all teams." },
  { title: "GitHub Org", desc: "Access to a large portion of our projects (that are not under NDA) to ensure cross-reviews, communication, and collaboration." },
];

const faqs = [
  { q: "What is an average time to build an MVP?", a: "Most MVPs take between 4 and 12 weeks to build, depending on complexity, the number of integrations, and whether custom design is required. A lean MVP with core features can often be delivered in 4–6 weeks; a more complex product with API integrations and a polished UI typically takes 8–12 weeks. We'll give you a precise estimate after a discovery call." },
  { q: "But can I hire an individual developer?", a: "You can — but with Forrof you get more than one developer. You get a dedicated team including a product lead, engineers, and QA, all aligned on your goal. Individual developers often lack the breadth to handle architecture, design, testing, and delivery simultaneously. Our team approach means faster velocity, fewer blind spots, and a product you can actually ship to users." },
];

export default function MvpService() {
  usePageMetadata({
    title: "MVP & POC Development Services | Forrof",
    description: "We help startups and businesses validate ideas fast and cost-effectively by building lean MVPs and prototypes that showcase core features and attract investors.",
    keywords: "MVP development, proof of concept, startup development, rapid prototyping, lean MVP, product validation",
  });

  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const heroRef = useRef(null);
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

      {/* HERO */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-end section-padding pt-28 pb-16 md:pb-24 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-[calc(50%-350px)] right-0 w-[700px] h-[700px] rounded-full blur-[130px]"
            style={{ background: "rgba(0, 212, 170, 0.08)" }}
            animate={{ x: [0, -60, 20, -40, 0], y: [0, 60, -40, 30, 0], opacity: [0.6, 1, 0.4, 0.9, 0.6] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
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
            Services / Startups &amp; MVPs
          </motion.span>
          <div className="overflow-hidden mb-6 py-2">
            <motion.h1
              className="text-[13vw] md:text-[10vw] xl:text-[8vw] font-bold leading-[0.95] tracking-tighter"
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
              MVP &amp; POC Development
            </motion.h1>
          </div>
          <motion.p
            className="text-lg md:text-2xl max-w-2xl leading-relaxed mt-10"
            style={{ color: "#48f0e7" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            We help startups and businesses validate ideas fast and cost-effectively by building lean MVPs and prototypes that showcase core features, gather user feedback, attract investors, and speed up time-to-market.
          </motion.p>
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Magnetic>
              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-80 transition-opacity"
              >
                Discuss the Project
                <ArrowUpRight size={18} />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </motion.section>

      {/* SECTION 1 — Our Approach */}
      <section ref={sec1Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={sec1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="number-label">/01</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Our Approach</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={sec1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Built Around Your Needs
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-3xl mb-16 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={sec1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            MVP and POC development isn't just a quick build — it's a strategic approach. We focus on delivering functional, testable products fast, helping you validate ideas, attract investors, and reduce time-to-market without sacrificing quality or scalability.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="p-8 md:p-10 rounded-2xl bg-card border border-border/40 hover:border-accent/40 transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              animate={sec1InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-5">Focused MVPs</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Validate your ideas quickly with functional, high-quality MVPs designed to accelerate feedback and investor interest — without wasting time or resources.
              </p>
            </motion.div>

            <motion.div
              className="p-8 md:p-10 rounded-2xl bg-card border border-border/40 hover:border-accent/40 transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              animate={sec1InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-5">Reliable PoC</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Bring your vision to life with robust POCs that demonstrate feasibility and unlock new opportunities, all built with scalability and future growth in mind.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CALLOUT — Tech Stack */}
      <section className="section-forced-dark section-padding py-24">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-[0.3em] block mb-6">
                Built With the Right Tools
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95]">
                Modern Tech Stack,<br />Proven Results
              </h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed self-end">
              We choose technologies based on what's right for your product — not what's easiest to staff. From no-code tools for speed to production-grade frameworks for scale, every decision is deliberate.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2 — What We Offer */}
      <section ref={sec2Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={sec2InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="number-label">/02</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Services</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <motion.h2
              className="text-4xl md:text-6xl font-bold tracking-tighter"
              initial={{ opacity: 0, y: 40 }}
              animate={sec2InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              What We Offer
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground leading-relaxed self-end"
              initial={{ opacity: 0, y: 30 }}
              animate={sec2InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Forrof provides services that support seamless growth, operational efficiency, and continuous innovation.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offerings.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={sec2InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.07 }}
              >
                <GlowCard className="p-6 md:p-8 rounded-2xl bg-card border border-border/40 hover:border-accent/40 transition-all duration-300 group h-full">
                  <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase block mb-5">
                    /{item.num}
                  </span>
                  <h3 className="text-base font-semibold mb-3 group-hover:text-foreground transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <div className="max-h-0 group-hover:max-h-[200px] overflow-hidden transition-all duration-500 ease-out">
                    <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Terminal visual */}
      <section className="section-forced-dark section-padding py-24">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <MvpTerminalBlock />
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-6">From Idea to Launch in Weeks</h3>
              <p className="text-muted-foreground leading-relaxed">Our MVP pipeline is optimized for speed without sacrificing quality. Validated ideas, clean code, and a product your investors can interact with.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Process */}
      <section ref={sec3Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <ProcessTimeline steps={processSteps} inView={sec3InView} sectionLabel="/03" />
        </div>
      </section>

      {/* SECTION 4 — How We Excel */}
      <section ref={sec4Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={sec4InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="number-label">/04</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Why Us</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={sec4InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            How to Excel at MVPs
          </motion.h2>

          <div className="space-y-0">
            {excellence.map((item, i) => (
              <motion.div
                key={i}
                className="py-8 border-t border-border group cursor-pointer hover:bg-foreground/[0.02] rounded-xl transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                animate={sec4InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.12 }}
              >
                <div className="flex items-start gap-6">
                  <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase pt-1 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:translate-x-4 transition-transform duration-500">
                      {item.title}
                    </h3>
                    <div className="max-h-0 group-hover:max-h-[200px] overflow-hidden transition-all duration-500">
                      <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* SECTION 5 — How We Deliver */}
      <section ref={sec5Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={sec5InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="number-label">/05</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Continuous Improvement</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <motion.h2
              className="text-4xl md:text-6xl font-bold tracking-tighter"
              initial={{ opacity: 0, y: 40 }}
              animate={sec5InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              How We Deliver Exceptional Solutions
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground leading-relaxed self-end"
              initial={{ opacity: 0, y: 30 }}
              animate={sec5InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We are constantly learning and developing. This way, we can always provide you with the most advanced and most effective solutions.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {delivery.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={sec5InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
              >
                <GlowCard className="p-8 md:p-10 rounded-2xl bg-card border border-border/40 hover:border-accent/40 transition-all duration-300 h-full">
                  <h3 className="text-2xl font-bold mb-5">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — FAQ */}
      <section ref={sec6Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={sec6InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="number-label">/06</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">FAQ</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={sec6InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Common Questions
          </motion.h2>

          <div className="max-w-4xl space-y-0">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="border-t border-border"
                initial={{ opacity: 0, y: 16 }}
                animate={sec6InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              >
                <button
                  className="w-full py-7 flex items-center justify-between gap-6 text-left group transition-all duration-300 hover:pl-4 hover:bg-foreground/[0.03] rounded-xl"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 text-xs font-semibold transition-all duration-300 group-hover:border-accent group-hover:bg-accent/10"
                      animate={{
                        borderColor: openFaq === i ? "hsl(var(--accent))" : "hsl(var(--border))",
                        backgroundColor: openFaq === i ? "hsl(var(--accent) / 0.1)" : "transparent",
                        color: openFaq === i ? "hsl(var(--accent))" : "hsl(var(--muted-foreground))",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </motion.div>
                    <span className="text-lg md:text-xl font-semibold group-hover:text-foreground group-hover:translate-x-2 transition-all duration-300">
                      {faq.q}
                    </span>
                  </div>
                  <motion.div
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center flex-shrink-0 group-hover:border-foreground group-hover:scale-110 transition-all duration-300"
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {openFaq === i
                      ? <Minus size={13} className="text-foreground" />
                      : <Plus size={13} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                    }
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <p className="text-muted-foreground leading-relaxed pb-8 pl-12 max-w-3xl">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="section-forced-dark section-padding py-40 relative overflow-hidden">
        <div className="max-w-[1800px] mx-auto text-center relative z-10">
          <motion.h2
            className="text-4xl md:text-7xl font-bold tracking-tighter mb-10"
            initial={{ opacity: 0, y: 40 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Ready to validate your idea?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Magnetic>
              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-3 px-8 py-5 bg-foreground text-background rounded-full font-medium hover:opacity-80 transition-opacity"
              >
                Start Building Your MVP
                <ArrowUpRight size={18} />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
