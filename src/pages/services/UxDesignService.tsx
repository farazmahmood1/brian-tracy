import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { LineReveal, Magnetic } from "@/components/AnimationComponents";
import { GlowCard, CountUp } from "@/components/InteractiveElements";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useNavigate } from "react-router-dom";
import { UxTerminalBlock } from "@/components/AiMlVisuals";

const designServices = [
  { num: "01", title: "Web-app Design", desc: "Complex product interfaces simplified — dashboards, portals, and SaaS tools that users actually enjoy navigating." },
  { num: "02", title: "Mobile Design", desc: "Native-feeling iOS and Android experiences designed around thumb zones, gestures, and mobile-first interaction patterns." },
  { num: "03", title: "Wireframing & Prototyping", desc: "Low and high-fidelity prototypes that validate flows, surface usability issues, and align stakeholders before development." },
  { num: "04", title: "User Research", desc: "Interviews, usability tests, and behavioral analysis to ground every design decision in evidence rather than opinion." },
  { num: "05", title: "UX Audit", desc: "A structured review of your existing product identifying friction points, drop-offs, and opportunities to improve KPIs." },
  { num: "06", title: "Ongoing Design Support", desc: "Embedded design partnership for continuous product evolution — sprint-by-sprint or on-demand." },
];

const processSteps = [
  { num: "01", title: "Stakeholder Interviews", desc: "We talk to your team, users, and leadership to understand goals, constraints, and what success really looks like." },
  { num: "02", title: "Benchmarking & Trend Analysis", desc: "Competitive landscape review and design trend analysis to position your product at the forefront of your category." },
  { num: "03", title: "Userflow & Wireframes", desc: "Information architecture, user journeys, and low-fidelity wireframes that map the full product experience." },
  { num: "04", title: "Visual Direction", desc: "Moodboards, style explorations, and design language foundations — finding the right aesthetic that serves your brand." },
  { num: "05", title: "UI Design", desc: "Pixel-perfect high-fidelity screens with a complete design system — components, tokens, states, and documentation." },
  { num: "06", title: "Design Hand-off", desc: "Developer-ready Figma files, annotated specs, interactive prototypes, and a living component library." },
];

const whyUs = [
  { title: "Faster Time-to-Market", desc: "Streamlined processes and reusable design systems cut design-to-dev handoff time significantly." },
  { title: "Feasible Design", desc: "Every design decision is made with engineering constraints in mind — no beautiful concepts that can't actually be built." },
  { title: "Business-Driven Design", desc: "We optimize for your metrics — conversion, retention, activation — not just aesthetics or awards." },
  { title: "Long-Term Design Support", desc: "A design partner who grows with your product, not a one-time agency engagement." },
  { title: "Transparent and Collaborative Partnership", desc: "Weekly reviews, shared Figma workspaces, and honest conversations about trade-offs throughout every project." },
  { title: "Seamless Developer Handoff", desc: "Organized file structure, auto-layout, variables, and annotations that make developers' lives measurably easier." },
];

const stats = [
  { value: "20%", label: "Design cost reduction on average" },
  { value: "25%", label: "More efficient design-to-dev pipeline" },
  { value: "Top 50", label: "Globally ranked on Upwork" },
];

export default function UxDesignService() {
  usePageMetadata({
    title: "UI/UX Design Services | Forrof",
    description: "World-class UI/UX design services that improve user satisfaction, boost retention, and drive business growth. From web apps to mobile — we design for results.",
    keywords: "UI UX design, product design, web app design, mobile design, UX audit, wireframing, prototyping, design system",
  });

  const navigate = useNavigate();

  const heroRef = useRef(null);
  const sec1Ref = useRef(null);
  const sec2Ref = useRef(null);
  const sec3Ref = useRef(null);
  const ctaRef = useRef(null);

  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start end", "end center"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const sec1InView = useInView(sec1Ref, { once: true, margin: "-100px" });
  const sec2InView = useInView(sec2Ref, { once: true, margin: "-100px" });
  const sec3InView = useInView(sec3Ref, { once: true, margin: "-100px" });
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
              Services / Design
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
                UI/UX Design
              </motion.h1>
            </div>
            <motion.p
              className="text-lg md:text-2xl max-w-2xl leading-relaxed mt-10"
              style={{ color: "#48f0e7" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              UI/UX Design Services that Elevate Digital Experiences. We help digital products succeed with world-class UI/UX design that improves user satisfaction, boosts retention, and drives business growth.
            </motion.p>
        </div>
      </motion.section>

      {/* SECTION 1 — Design Services */}
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
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Services</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={sec1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            UI/UX Designs that Drive Results
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designServices.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={sec1InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.08 }}
              >
                <GlowCard className="p-6 md:p-8 rounded-2xl bg-card border border-border/40 hover:border-accent/40 transition-all duration-300 group h-full">
                  <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase block mb-5">
                    /{item.num}
                  </span>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-foreground transition-colors">
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
            <UxTerminalBlock />
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Design Systems That Scale</h3>
              <p className="text-muted-foreground leading-relaxed">We deliver more than mockups — complete design systems with tokens, components, and motion guidelines that keep your product consistent as it grows.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — How We Work */}
      <section ref={sec2Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            className="flex items-center justify-center gap-4 mb-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={sec2InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="number-label">/02</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Process</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl text-center mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={sec2InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            How We Work
          </motion.h2>

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
                    animate={sec2InView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.12 }}
                  >
                    <div className={`w-1/2 pr-12 ${isLeft ? "" : "md:text-right"}`}>
                      {isLeft ? (
                        <div className="md:text-right pb-16">
                          <span className="text-xs text-accent font-mono tracking-widest block mb-3">{step.num}</span>
                          <h3 className="text-xl md:text-2xl font-bold mb-3">{step.title}</h3>
                          <p className="text-muted-foreground leading-relaxed text-sm">{step.desc}</p>
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
                    <div className={`w-1/2 pl-12`}>
                      {!isLeft ? (
                        <div className="pb-16">
                          <span className="text-xs text-accent font-mono tracking-widest block mb-3">{step.num}</span>
                          <h3 className="text-xl md:text-2xl font-bold mb-3">{step.title}</h3>
                          <p className="text-muted-foreground leading-relaxed text-sm">{step.desc}</p>
                        </div>
                      ) : <div className="pb-16" />}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Why Choose Us + Stats */}
      <section ref={sec3Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={sec3InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="number-label">/03</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Why Us</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={sec3InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Why Choose Us
          </motion.h2>

          <div className="space-y-0 mb-24">
            {whyUs.map((item, i) => (
              <motion.div
                key={i}
                className="py-8 border-t border-border group cursor-pointer hover:bg-foreground/[0.02] rounded-xl transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                animate={sec3InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.08 }}
              >
                <h3 className="text-lg font-semibold mb-2 group-hover:translate-x-4 transition-transform duration-500">
                  {item.title}
                </h3>
                <div className="max-h-0 group-hover:max-h-[200px] overflow-hidden transition-all duration-500">
                  <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
            <div className="border-t border-border" />
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-8 pt-16 border-t border-border">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 40 }}
                animate={sec3InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
              >
                <p className="text-4xl md:text-6xl font-bold tracking-tighter mb-3">
                  {stat.value === "20%" && <CountUp value="20" suffix="%" delay={200} />}
                  {stat.value === "25%" && <CountUp value="25" suffix="%" delay={400} />}
                  {stat.value === "Top 50" && <><span className="mr-2">Top</span><CountUp value="50" delay={600} /></>}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="section-forced-dark section-padding py-40 relative overflow-hidden">
        <div className="relative z-10 max-w-[1800px] mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-7xl font-bold tracking-tighter mb-10"
            initial={{ opacity: 0, y: 40 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Ready to elevate your digital product?
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
                Start a Design Project
                <ArrowUpRight size={18} />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
