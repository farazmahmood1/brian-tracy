import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { LineReveal, Magnetic } from "@/components/AnimationComponents";
import { GlowCard, CountUp } from "@/components/InteractiveElements";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useNavigate } from "react-router-dom";

const niches = [
  { num: "01", title: "Logistics & Transportation", desc: "On-demand delivery apps, fleet management, route optimisation, driver portals, and real-time shipment tracking — built to keep operations moving and customers informed at every step." },
  { num: "02", title: "Education", desc: "E-learning platforms, interactive courseware, progress tracking dashboards, live tutoring features, and gamified learning experiences that keep students engaged across devices." },
  { num: "03", title: "Healthcare & Wellness", desc: "HIPAA-compliant telehealth apps, appointment booking, electronic health records, medication reminders, wearable integrations, and patient-provider communication platforms." },
  { num: "04", title: "Fintech & Finance", desc: "Mobile banking, digital wallets, investment tracking, KYC/AML workflows, real-time market data, and secure payment flows built to PCI-DSS standards." },
  { num: "05", title: "Food & Restaurant Management", desc: "Online ordering, table reservations, kitchen display systems, loyalty programmes, and delivery-driver coordination — for independent restaurants and franchise chains alike." },
  { num: "06", title: "Social & Entertainment", desc: "Community platforms, live streaming, short-form video, real-time chat, social graphs, and creator monetisation tools designed for scale and engagement." },
  { num: "07", title: "Industrial Sector", desc: "Field service management, asset tracking, IoT sensor dashboards, predictive maintenance alerts, and offline-first apps built for environments where connectivity is unreliable." },
  { num: "08", title: "E-commerce & Marketplace", desc: "Product catalogues, smart search, cart and checkout flows, vendor portals, in-app payments, reviews, and personalised recommendations that convert browsers into buyers." },
  { num: "09", title: "Other Apps", desc: "LegalTech, Decision Intelligence, real estate, travel, SaaS companion apps, and more. If your niche isn't listed, we've likely built in it — or we'll figure it out together." },
];

const painPoints = [
  {
    title: "Communication Gaps With the Dev Team",
    desc: "No more black-box development. We offer daily recaps, weekly status calls, and regular product demo sessions so you always know exactly where your app stands — and why.",
  },
  {
    title: "User Experience (UX) Challenges",
    desc: "A confusing or outdated interface turns users away fast. We analyse flows, detect friction points, and deliver intuitive, engaging experiences that keep users coming back.",
  },
  {
    title: "Long Time-to-Market",
    desc: "We provide clear upfront estimates and update them throughout development. You'll always know which tasks could affect the timeline and can make informed trade-off decisions in real time.",
  },
  {
    title: "Unclear Requirements & Scope Creep",
    desc: "We turn vague business ideas into precise technical specifications before development starts. No surprises, no endless change requests — just clean, well-scoped execution.",
  },
];

const differentiators = [
  { title: "100+ Mobile Apps Shipped", desc: "We've successfully built and launched over 100 mobile applications for startups, growing businesses, and global enterprises across every major vertical." },
  { title: "Experts in React Native, Flutter, Kotlin & Swift", desc: "Deep expertise in every major mobile stack means we always recommend the right technology for your product — not the one we're most comfortable billing for." },
  { title: "Transparent Agile Development", desc: "We keep you involved at every planning, design, development, and testing stage. Monitor progress, give feedback early, and stay in full control of your product throughout." },
  { title: "Analytics & A/B Testing Built-In", desc: "We instrument every project with analytics and A/B testing capabilities so you can track user behaviour, validate hypotheses, and make evidence-based product decisions from day one." },
  { title: "App Store Publication & ASO Support", desc: "Full support with store submission and App Store Optimisation — ensuring your app launches smoothly and gets discovered by the right users from the moment it goes live." },
  { title: "SLA Support & Scaling Roadmap", desc: "Post-launch SLA agreements guarantee fast response times, regular updates, and proactive monitoring. Your app stays reliable, secure, and ready to scale as you grow." },
];

const stats = [
  { value: "2M+", label: "Installations" },
  { value: "5/5", label: "Rating for Cost on Clutch" },
  { value: "20+", label: "Industries Served" },
  { value: "0.1s", label: "Average Response Time" },
];

const techStack = [
  { name: "React Native", desc: "Cross-platform JavaScript framework delivering near-native performance on iOS and Android from a single, maintainable codebase." },
  { name: "Flutter", desc: "Google's UI toolkit for building natively compiled, visually expressive apps across mobile, web, and desktop from one codebase." },
  { name: "Kotlin", desc: "Modern, concise, and safe language for native Android development — full Jetpack ecosystem, Compose UI, and seamless Google integration." },
  { name: "Swift", desc: "Apple's powerful and expressive language for native iOS development — performance, safety, and deep OS integration built in from the ground up." },
];

const processSteps = [
  { num: "01", title: "Idea Assessment", desc: "Investigate user needs and market trends to shape and validate your app idea — so we build something people actually want before writing a line of code." },
  { num: "02", title: "UX Design", desc: "Design intuitive, engaging interfaces focused on user experience and usability — wireframes, prototypes, and high-fidelity screens validated with real users." },
  { num: "03", title: "App Development", desc: "Develop a robust, scalable, high-performance app architecture with sprint-based builds, continuous integration, and weekly progress demos." },
  { num: "04", title: "Quality Assurance", desc: "Automated and manual testing across real device matrices to guarantee reliability, security, and premium quality before anything reaches the store." },
  { num: "05", title: "Smooth Deployment", desc: "Managed App Store and Play Store submission with phased rollout strategy, crash monitoring from day one, and zero-downtime launch execution." },
  { num: "06", title: "Ongoing Support & Optimisation", desc: "Continuous updates, performance improvements, OS compatibility maintenance, and feature iteration based on real user feedback and analytics data." },
];

const popularServices = [
  "Custom Mobile App Development",
  "SaaS & Enterprise Mobile Systems",
  "MVP Mobile App Development",
  "AI-Powered App Integrations",
  "Cross-Platform Mobile Development",
  "Design-Driven Prototyping & UI/UX",
  "API Development & Third-Party Integrations",
  "Cloud Infrastructure & DevOps for Mobile",
  "Technical Discovery & Product Consulting",
  "QA Automation & Performance Testing",
  "Ongoing Maintenance & Support",
];

export default function MobileAppService() {
  usePageMetadata({
    title: "Mobile App Development Services | Forrof",
    description: "Expert mobile app development for iOS and Android. From native Swift and Kotlin apps to cross-platform React Native and Flutter — we build fast, functional, and future-ready mobile experiences.",
    keywords: "mobile app development, iOS development, Android development, React Native, Flutter, cross-platform apps, MVP mobile app, app store optimisation",
  });

  const navigate = useNavigate();
  const [openNiche, setOpenNiche] = useState<number | null>(null);
  const [expandedDiff, setExpandedDiff] = useState<number | null>(null);

  const heroRef = useRef(null);
  const sec1Ref = useRef(null);
  const sec2Ref = useRef(null);
  const sec3Ref = useRef(null);
  const sec4Ref = useRef(null);
  const sec5Ref = useRef(null);
  const sec6Ref = useRef(null);
  const sec7Ref = useRef(null);
  const ctaRef = useRef(null);

  const processContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: processScroll } = useScroll({
    target: processContainerRef,
    offset: ["start end", "end start"],
  });
  const processLineHeight = useTransform(processScroll, [0, 1], ["0%", "100%"]);

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

      {/* HERO */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-end section-padding pb-16 md:pb-24 overflow-hidden"
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
            Services / Mobile Development
          </motion.span>
          <div className="overflow-hidden mb-6">
            <motion.h1
              className="text-[13vw] md:text-[8vw] font-bold leading-[0.88] tracking-tighter"
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
              Mobile App Development
            </motion.h1>
          </div>
          <motion.p
            className="text-lg md:text-2xl max-w-2xl leading-relaxed mt-10"
            style={{ color: "#48f0e7" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            From first sketch to full-scale launch, we build mobile apps that are fast, functional, and future-ready — on iOS, Android, and cross-platform.
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
                Request Development Services
                <ArrowUpRight size={18} />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </motion.section>

      {/* SECTION 1 — What We Offer + Niches */}
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
            <span className="text-xs text-muted-foreground uppercase tracking-widest">What We Offer</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            <motion.h2
              className="text-4xl md:text-6xl font-bold tracking-tighter"
              initial={{ opacity: 0, y: 40 }}
              animate={sec1InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Development of Mobile Applications For Any Needs
            </motion.h2>
            <motion.div
              className="flex flex-col justify-end gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={sec1InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-muted-foreground leading-relaxed">
                We help startups and enterprises turn great ideas into powerful mobile apps. From first sketch to final launch, our process covers design, development, testing, and scaling — under one roof with a single accountable team.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We build iOS, Android, and cross-platform apps that are fast, user-friendly, and designed to deliver real business results. Our mobile engineering team works closely with you to keep the process smooth, clear, and stress-free.
              </p>
            </motion.div>
          </div>

          {/* Niches accordion */}
          <motion.p
            className="text-sm text-muted-foreground uppercase tracking-widest mb-10"
            initial={{ opacity: 0 }}
            animate={sec1InView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Our mobile app development services are ready to help you in the following niches:
          </motion.p>

          <div className="space-y-0">
            {niches.map((niche, i) => (
              <motion.div
                key={i}
                className="border-t border-border"
                initial={{ opacity: 0, y: 16 }}
                animate={sec1InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
              >
                <button
                  className="w-full py-6 flex items-center justify-between gap-6 text-left group"
                  onClick={() => setOpenNiche(openNiche === i ? null : i)}
                >
                  <div className="flex items-center gap-8">
                    <motion.span
                      className="w-10 h-10 rounded-xl border flex items-center justify-center text-xs font-medium tracking-widest flex-shrink-0"
                      animate={{
                        borderColor: openNiche === i ? "rgba(0,212,170,0.5)" : "rgba(255,255,255,0.1)",
                        backgroundColor: openNiche === i ? "rgba(0,212,170,0.1)" : "transparent",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {niche.num}
                    </motion.span>
                    <span className="text-lg md:text-xl font-semibold group-hover:text-foreground transition-colors">
                      {niche.title}
                    </span>
                  </div>
                  <motion.div
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center flex-shrink-0 group-hover:border-foreground transition-colors"
                    animate={{ rotate: openNiche === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {openNiche === i
                      ? <Minus size={13} className="text-foreground" />
                      : <Plus size={13} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                    }
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openNiche === i && (
                    <motion.div
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <p className="text-muted-foreground leading-relaxed pb-7 pl-0 md:pl-[88px] max-w-3xl text-sm">
                        {niche.desc}
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

      {/* SECTION 2 — Pain Points */}
      <section ref={sec2Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={sec2InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="number-label">/02</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Our Approach</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <motion.h2
              className="text-4xl md:text-6xl font-bold tracking-tighter"
              initial={{ opacity: 0, y: 40 }}
              animate={sec2InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Solve Your Challenge with Forrof
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {painPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={sec2InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <GlowCard className="p-8 rounded-2xl bg-card border border-border/40 hover:border-accent/40 transition-all duration-300 group">
                  <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase block mb-5">
                    /{String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-semibold mb-4">{point.title}</h3>
                  <div className="max-h-0 group-hover:max-h-[200px] overflow-hidden transition-all duration-500">
                    <p className="text-muted-foreground leading-relaxed text-sm">{point.desc}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — What Sets Us Apart */}
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
            <span className="text-xs text-muted-foreground uppercase tracking-widest">What Sets Us Apart</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <motion.h2
              className="text-4xl md:text-6xl font-bold tracking-tighter"
              initial={{ opacity: 0, y: 40 }}
              animate={sec3InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Reliable Mobile App Development Services
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground leading-relaxed self-end"
              initial={{ opacity: 0, y: 30 }}
              animate={sec3InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Many software vendors focus on delivering features. We focus on solving the business problems behind them.
            </motion.p>
          </div>

          <div className="space-y-0">
            {differentiators.map((item, i) => (
              <motion.div
                key={i}
                className="border-t border-border group cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                animate={sec3InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                onClick={() => setExpandedDiff(expandedDiff === i ? null : i)}
              >
                <div className="py-6 flex items-center gap-6">
                  <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase min-w-[32px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="text-lg font-semibold transition-transform duration-300 group-hover:translate-x-3"
                  >
                    {item.title}
                  </h3>
                </div>
                <AnimatePresence initial={false}>
                  {expandedDiff === i && (
                    <motion.div
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <p className="text-muted-foreground leading-relaxed text-sm pb-6 pl-[56px] max-w-3xl">
                        {item.desc}
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

      {/* SECTION 4 — Stats */}
      <section ref={sec4Ref} className="section-forced-dark section-padding py-24">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-border">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="text-center md:px-12"
                initial={{ opacity: 0, y: 30 }}
                animate={sec4InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <span className="text-5xl md:text-6xl font-bold block mb-3 tracking-tighter">
                  <CountUp
                    value={stat.value.replace(/[^0-9.]/g, "")}
                    suffix={stat.value.replace(/[0-9.]/g, "")}
                    delay={200 + i * 100}
                  />
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-widest">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — Tech Stack */}
      <section ref={sec5Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={sec5InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="number-label">/04</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Tech Stack</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <motion.h2
              className="text-4xl md:text-6xl font-bold tracking-tighter"
              initial={{ opacity: 0, y: 40 }}
              animate={sec5InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Modern Tech Stack, Proven Results
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground leading-relaxed self-end"
              initial={{ opacity: 0, y: 30 }}
              animate={sec5InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We work with every major mobile framework — choosing the right tool for your product, not defaulting to whatever's cheapest to staff.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={sec5InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <GlowCard className="p-8 rounded-2xl bg-card border border-border/40 hover:border-accent/40 transition-all duration-300 group h-full">
                  <h3 className="text-xl font-bold mb-4 group-hover:text-foreground transition-colors">
                    {tech.name}
                  </h3>
                  <div className="max-h-0 group-hover:max-h-[200px] overflow-hidden transition-all duration-500">
                    <p className="text-muted-foreground leading-relaxed text-sm">{tech.desc}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — Process (scroll-driven timeline) */}
      <section ref={sec6Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={sec6InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="number-label">/05</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Process</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={sec6InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Our Process
          </motion.h2>
          <motion.p
            className="text-muted-foreground mb-16 text-sm"
            initial={{ opacity: 0 }}
            animate={sec6InView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            * The process may vary from project to project since we are agile.
          </motion.p>

          <div ref={processContainerRef} className="relative">
            {/* Vertical line track */}
            <div className="absolute left-5 md:left-7 top-0 bottom-0 w-px bg-border/30" />
            {/* Animated fill */}
            <motion.div
              className="absolute left-5 md:left-7 top-0 w-px origin-top"
              style={{ height: processLineHeight, background: "#00d4aa" }}
            />

            <div className="space-y-12">
              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  className="relative pl-16 md:pl-20"
                  initial={{ opacity: 0, y: 40 }}
                  animate={sec6InView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.08 }}
                >
                  {/* Dot */}
                  <div className="absolute left-[14px] md:left-[22px] top-1 w-3 h-3 rounded-full border-2 border-accent bg-background" />
                  <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase block mb-3">
                    /{step.num}
                  </span>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm max-w-2xl">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — Popular Services */}
      <section ref={sec7Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={sec7InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="number-label">/06</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Collaboration</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.h2
              className="text-4xl md:text-6xl font-bold tracking-tighter"
              initial={{ opacity: 0, y: 40 }}
              animate={sec7InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              What Are the Most Popular Services We Provide?
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={sec7InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-0"
            >
              {popularServices.map((service, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-5 py-4 border-b border-border/60 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={sec7InView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
                >
                  <span className="text-xs text-muted-foreground font-medium tracking-widest min-w-[28px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-medium group-hover:text-foreground group-hover:translate-x-3 transition-all duration-300 text-muted-foreground">
                    {service}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="section-forced-dark section-padding py-40">
        <div className="max-w-[1800px] mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-7xl font-bold tracking-tighter mb-10"
            initial={{ opacity: 0, y: 40 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Ready to build your app?
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
                Start Building Your App
                <ArrowUpRight size={18} />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
