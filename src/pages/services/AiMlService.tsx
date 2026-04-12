import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { LineReveal, Magnetic } from "@/components/AnimationComponents";
import { GlowCard } from "@/components/InteractiveElements";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useNavigate } from "react-router-dom";
import { AiCodeBlock, DnaHelix3D } from "@/components/AiMlVisuals";

const problems = [
  "Struggling to automate manual, time-consuming processes?",
  "Sitting on massive amounts of data, but can't extract real insights?",
  "Want to use AI but don't know where to start or what's realistic?",
  "Investing in AI tools that never reach production or generate ROI?",
  "Concerned about data privacy, ethics, or industry compliance?",
];

const valueProps = [
  { title: "AI Strategy & Roadmapping", desc: "We help you identify the right use cases and align AI goals with business value — no hype, no wasted spend." },
  { title: "ML Model Development & Deployment", desc: "We build and deploy custom models that solve specific problems and scale with your growth." },
  { title: "Data Engineering & MLOps", desc: "Our team creates clean, reliable data pipelines and supports continuous model monitoring and improvement." },
  { title: "Ethical AI by Design", desc: "Transparency, explainability, and compliance are embedded in every step of development." },
  { title: "Full Ownership", desc: "You retain all rights to the code, models, and data — no vendor lock-in, no hidden traps." },
];

const serviceCards = [
  {
    num: "01",
    title: "AI Consulting",
    desc: "To provide AI and ML development services, we investigate your inquiry and offer an expert solution on how to cover it with AI. This is a part of our workflow that is performed during the discovery phase.",
  },
  {
    num: "02",
    title: "Custom AI and ML Solutions",
    desc: "We guarantee that our AI and ML solutions are tailored to your unique business needs and will perfectly fit your company's workflow.",
  },
  {
    num: "03",
    title: "Proof of Value / AI Prototype",
    desc: "Our team of experts in artificial intelligence and machine learning services can offer a fast AI solution in only 4–6 weeks to test the hypothesis.",
  },
  {
    num: "04",
    title: "Generative AI & LLM-based Solutions",
    desc: "These AI development services integrate different AI language models to automate complicated manual processes and make them smarter. If you are looking for unique solutions related to AI integrations, we are ready to help.",
  },
  {
    num: "05",
    title: "Predictive Analytics & Forecasting",
    desc: "Based on historical data, we can teach a particular model to forecast the future. This type of AI & ML service is often connected to fintech or marketing — for example, predicting how likely a certain client will repay a loan.",
  },
  {
    num: "06",
    title: "AI-Powered Product Integrations",
    desc: "We connect advanced AI/ML capabilities directly into your existing tools — recommendations, search, vision, NLP — to boost efficiency and business value.",
  },
];

const whyUs = [
  {
    title: "Structured Onboarding Process",
    desc: "Forrof ensures a smooth start by aligning on goals, KPIs, technical requirements, and project roadmap from day one through post-launch.",
  },
  {
    title: "Cross-Functional Teams",
    desc: "AI scientists, software engineers, and domain experts collaborate from day one to deliver aligned, high-impact results.",
  },
  {
    title: "Ongoing Support and Training",
    desc: "We provide continuous education and onboarding for both your internal teams and end users.",
  },
  {
    title: "Customer-Centric Approach",
    desc: "At Forrof, we dive deep into your idea, assess its feasibility, and recommend the most efficient and scalable implementation.",
  },
  {
    title: "No Vendor Lock-In",
    desc: "You retain full ownership of the source code, data, and machine learning models — everything we build is yours.",
  },
];

const industries = [
  {
    title: "Logistics & Transportation",
    points: [
      "Route optimisation & real-time ETA prediction: ML models that analyse traffic, weather, and historical patterns to dynamically reroute fleets and cut delivery times.",
      "Demand forecasting: Predict shipment volumes and capacity needs to avoid overstaffing or under-resourcing peak periods.",
      "Anomaly detection in supply chains: Automatically flag delays, suspicious cargo movements, or process deviations before they escalate.",
    ],
  },
  {
    title: "Education",
    points: [
      "Adaptive learning paths: AI that personalises content difficulty and pacing based on individual student performance data.",
      "Automated grading & feedback: NLP models that assess written assignments, flag plagiarism, and deliver instant feedback.",
      "Student retention prediction: Identify at-risk students early using engagement signals and intervene with targeted support.",
    ],
  },
  {
    title: "Healthcare & Wellness",
    points: [
      "Clinical decision support: ML-assisted diagnostic tools that help clinicians identify conditions faster from imaging, lab results, or patient history.",
      "Patient risk stratification: Predict readmission risk, deterioration, or medication non-compliance to prioritise care resources.",
      "Medical NLP & record summarisation: Automatically extract structured insights from unstructured clinical notes and discharge summaries.",
    ],
  },
  {
    title: "Fintech & Finance",
    points: [
      "Fraud detection in real time: Behavioural models that flag anomalous transactions with sub-100ms latency at scale.",
      "Credit scoring & loan risk assessment: Predict how likely a client is to repay using alternative data sources alongside traditional credit signals.",
      "Algorithmic trading & market forecasting: Time-series models for price prediction, volatility modelling, and portfolio optimisation.",
    ],
  },
  {
    title: "Food & Restaurant Management",
    points: [
      "Demand forecasting & inventory optimisation: Predict daily order volumes to reduce food waste and avoid stockouts.",
      "Dynamic menu pricing: Adjust prices in real time based on demand, time of day, and competitor data.",
      "Customer churn prediction: Identify loyal customers showing disengagement signals and trigger retention campaigns proactively.",
    ],
  },
  {
    title: "Social Media & Entertainment",
    points: [
      "Content recommendation engines: Personalised feeds and discovery systems that increase engagement and session length.",
      "Sentiment analysis & moderation: NLP models that detect toxic content, misinformation, or policy violations at scale.",
      "Creator analytics: Identify which content formats, topics, and posting schedules maximise reach and follower growth.",
    ],
  },
  {
    title: "Industrial Sector",
    points: [
      "Predictive maintenance for equipment: Analyse sensor data from machinery to predict equipment failures, enabling proactive maintenance and minimising costly downtime.",
      "Automated quality control: Use computer vision to inspect products on the assembly line, identifying defects with greater speed and accuracy than human inspection.",
      "Workplace safety monitoring: Analyse video feeds from the factory floor to detect safety violations (e.g., lack of protective gear) and prevent accidents.",
    ],
  },
];

const processSteps = [
  {
    num: "01",
    title: "Planning & Strategy",
    desc: "We define the project vision, use cases, and measurable goals. Whether it's traditional ML, deep learning, or broader AI (NLP, computer vision, automation), we align on scope, data needs, risks, and timeline from day one.",
  },
  {
    num: "02",
    title: "Data Acquisition & Preparation",
    desc: "AI systems are only as strong as their data. We acquire relevant datasets, ensure data quality, handle bias, and prepare the training pipeline — including labeling, structuring, cleaning, and augmentation when needed.",
  },
  {
    num: "03",
    title: "AI/ML Development",
    desc: "Our in-house experts architect the intelligence layer — whether it's an ML model, rule-based AI system, or hybrid approach. We handle algorithm selection, feature engineering, model training, and optimisation in secure environments.",
  },
  {
    num: "04",
    title: "Evaluation & Simulation",
    desc: "We validate model performance through real-world simulations, metrics like F1-score and precision-recall, and AI-specific tests like explainability (XAI), hallucination rates (for LLMs), or false positive mitigation.",
  },
  {
    num: "05",
    title: "Deployment & Integration",
    desc: "We deploy models into live environments using APIs, microservices, or edge AI where needed. Whether embedded in web apps, mobile, or enterprise systems — the goal is frictionless delivery with CI/CD pipelines.",
  },
  {
    num: "06",
    title: "Monitoring, Feedback & Iteration",
    desc: "After launch, we monitor behaviour in production — tracking model drift, user feedback, latency, and performance. Our MLOps/AIOps stack supports automated retraining, rollback, and adjustments to keep your system intelligent and adaptive.",
  },
];

export default function AiMlService() {
  usePageMetadata({
    title: "AI/ML Development Services | Forrof",
    description: "Unlock business potential with custom AI & ML development services. We build machine learning solutions that cut downtime, accelerate decisions, and keep operations running seamlessly.",
    keywords: "AI development, machine learning, MLOps, AI consulting, LLM solutions, predictive analytics",
  });

  const navigate = useNavigate();
  const [openIndustry, setOpenIndustry] = useState<number | null>(null);
  const [activeChallenge, setActiveChallenge] = useState(0);

  const heroRef = useRef(null);
  const sec1Ref = useRef(null);
  const sec2Ref = useRef(null);
  const sec3Ref = useRef(null);
  const sec4Ref = useRef(null);
  const sec5Ref = useRef(null);
  const ctaRef = useRef(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const sec1InView = useInView(sec1Ref, { once: true, margin: "-100px" });
  const sec2InView = useInView(sec2Ref, { once: true, margin: "-100px" });
  const sec3InView = useInView(sec3Ref, { once: true, margin: "-100px" });
  const sec4InView = useInView(sec4Ref, { once: true, margin: "-100px" });
  const sec5InView = useInView(sec5Ref, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
              Services / AI &amp; Machine Learning
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
                AI/ML Development
              </motion.h1>
            </div>
            <motion.p
              className="text-lg md:text-2xl max-w-2xl leading-relaxed mt-10"
              style={{ color: "#48f0e7" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              We build custom AI and machine learning solutions that cut downtime, accelerate decisions, and keep your operations running seamlessly.
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

      {/* SECTION 1 — Value Proposition (click-to-select challenge/benefit) */}
      <section ref={sec1Ref} className="section-forced-light section-padding py-32 relative overflow-hidden">
        <div className="max-w-[1800px] mx-auto relative z-10">
          <motion.div
            className="flex items-center gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={sec1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="number-label">/01</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Value Proposition</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={sec1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Your Business Deserves More Than Generic AI
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-3xl mb-20 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={sec1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Do you need AI/ML that solves problems and drives outcomes? Our expert AI/ML development services understand your data and fit your workflow.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
            {/* Key Problems — click-to-select */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={sec1InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-sm font-semibold mb-8 uppercase tracking-widest text-muted-foreground">
                Key Problems We Solve
              </h3>
              <ul className="space-y-3">
                {problems.map((problem, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-4 p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                      activeChallenge === i
                        ? "bg-accent/10 border-accent/40 scale-[1.02] shadow-lg shadow-accent/5"
                        : "bg-card border-border/40 hover:border-accent/20 hover:scale-[1.02] hover:shadow-md hover:bg-accent/[0.03]"
                    }`}
                    onClick={() => setActiveChallenge(i)}
                    onMouseEnter={() => setActiveChallenge(i)}
                  >
                    <span
                      className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-300 ${
                        activeChallenge === i ? "bg-accent" : "bg-muted-foreground/40"
                      }`}
                    />
                    <p className="text-muted-foreground leading-relaxed">{problem}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Value Props — animated detail panel */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={sec1InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-sm font-semibold mb-8 uppercase tracking-widest text-muted-foreground">
                Forrof's Value Proposition
              </h3>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeChallenge}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                  className="p-8 rounded-2xl bg-card border border-accent/40"
                >
                  <span className="text-xs text-accent font-medium tracking-widest uppercase block mb-4">
                    {String(activeChallenge + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-2xl font-semibold mb-4">{valueProps[activeChallenge].title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{valueProps[activeChallenge].desc}</p>
                </motion.div>
              </AnimatePresence>
              <div className="mt-6 flex gap-2">
                {valueProps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveChallenge(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeChallenge === i ? "bg-accent w-6" : "bg-border hover:bg-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* SECTION 2 — Services Overview (GlowCard with hover-reveal descriptions) */}
      <section ref={sec2Ref} className="section-forced-dark section-padding py-32 relative overflow-hidden">
        <div className="max-w-[1800px] mx-auto relative z-10">
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
              AI and ML Development Services Overview
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground leading-relaxed self-end"
              initial={{ opacity: 0, y: 30 }}
              animate={sec2InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Forrof provides AI/ML services that support seamless growth, operational efficiency, and continuous innovation — from prototype to production.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {serviceCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={sec2InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.08 }}
              >
                <GlowCard className="p-6 md:p-8 rounded-2xl bg-card border border-border/40 hover:border-accent/40 transition-all duration-300 group h-full">
                  <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase block mb-6">
                    /{card.num}
                  </span>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-foreground transition-colors">
                    {card.title}
                  </h3>
                  <div className="max-h-0 group-hover:max-h-[200px] overflow-hidden transition-all duration-500">
                    <p className="text-muted-foreground leading-relaxed text-sm">{card.desc}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>

          {/* Code block visual */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AiCodeBlock />
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={sec2InView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Production-Ready from Day One</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Our models don't just work in notebooks — they ship to production with monitoring, scaling, and CI/CD built in. From data pipeline to deployed endpoint, every step is engineered for reliability.
              </p>
              <Magnetic>
                <button
                  onClick={() => navigate("/contact")}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300 font-medium"
                >
                  Request a Consultation
                  <ArrowUpRight size={18} />
                </button>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Why Choose Us (hover-expand list) */}
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

          <div className="grid lg:grid-cols-[1fr_0.6fr] gap-12 lg:gap-16 items-start">
            <div>
              {whyUs.map((item, i) => (
                <motion.div
                  key={i}
                  className="border-t border-border group py-8"
                  initial={{ opacity: 0, y: 40 }}
                  animate={sec3InView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                >
                  <div className="flex items-center gap-6">
                    <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase min-w-[32px]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-semibold group-hover:translate-x-4 transition-transform duration-500">
                      {item.title}
                    </h3>
                  </div>
                  <div className="max-h-0 group-hover:max-h-[200px] overflow-hidden transition-all duration-500">
                    <p className="text-muted-foreground leading-relaxed text-sm mt-4 pl-[56px]">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
              <div className="border-t border-border" />
            </div>

            {/* Side 3D element */}
            <div className="hidden lg:block sticky top-28">
              <DnaHelix3D className="h-[500px] w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — Industries (accordion with numbered indicator boxes) */}
      <section ref={sec4Ref} className="section-forced-dark section-padding py-32 relative overflow-hidden">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={sec4InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="number-label">/04</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Industries</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={sec4InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Our AI and ML Development Services Across Industries
          </motion.h2>

          <div className="space-y-0">
            {industries.map((industry, i) => {
              const isOpen = openIndustry === i;
              return (
                <motion.div
                  key={i}
                  className="border-t border-border"
                  initial={{ opacity: 0, y: 16 }}
                  animate={sec4InView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}
                >
                  <button
                    className="w-full py-7 flex items-center justify-between gap-6 text-left group transition-all duration-300 hover:pl-4 hover:bg-foreground/[0.03] rounded-xl"
                    onClick={() => setOpenIndustry(isOpen ? null : i)}
                  >
                    <div className="flex items-center gap-6">
                      <motion.span
                        className="w-10 h-10 rounded-xl border flex items-center justify-center text-xs font-semibold flex-shrink-0 transition-all duration-300 group-hover:border-accent group-hover:bg-accent/10"
                        animate={{
                          borderColor: isOpen ? "hsl(var(--accent))" : "hsl(var(--border))",
                          backgroundColor: isOpen ? "hsl(var(--accent) / 0.1)" : "transparent",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </motion.span>
                      <span className="text-xl md:text-2xl font-semibold group-hover:text-foreground group-hover:translate-x-2 transition-all duration-300">
                        {industry.title}
                      </span>
                    </div>
                    <motion.div
                      className="w-9 h-9 rounded-full border border-border flex items-center justify-center flex-shrink-0 group-hover:border-foreground group-hover:scale-110 transition-all duration-300"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isOpen
                        ? <Minus size={14} className="text-foreground" />
                        : <Plus size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                      }
                    </motion.div>
                  </button>
                  <motion.div
                    className="overflow-hidden"
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <ul className="space-y-4 pb-8 max-w-4xl pl-16">
                      {industry.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-4">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                          <p className="text-muted-foreground leading-relaxed text-sm">{point}</p>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              );
            })}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>


      {/* SECTION 5 — Process (centered alternating timeline) */}
      <section ref={sec5Ref} className="section-forced-dark section-padding py-32 overflow-hidden">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={sec5InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="number-label">/05</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">How We Work</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={sec5InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Our Process
          </motion.h2>
          <motion.p
            className="text-muted-foreground mb-20 text-sm text-center"
            initial={{ opacity: 0 }}
            animate={sec5InView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            * The processes of AI/ML development may vary from project to project since we are agile.
          </motion.p>

          <div ref={timelineRef} className="relative">
            {/* Center line track */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border/30" />
            {/* Animated accent fill line */}
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
                    animate={sec5InView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.12 }}
                  >
                    {/* Left content */}
                    <div className={`w-1/2 pr-12 ${isLeft ? "" : "md:text-right"}`}>
                      {isLeft ? (
                        <div className="md:text-right pb-16">
                          <span className="text-xs text-accent font-mono tracking-widest block mb-3">
                            {step.num}
                          </span>
                          <h3 className="text-xl md:text-2xl font-bold mb-3">{step.title}</h3>
                          <p className="text-muted-foreground leading-relaxed text-sm">{step.desc}</p>
                        </div>
                      ) : (
                        <div className="pb-16" />
                      )}
                    </div>

                    {/* Center dot */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-1 z-10">
                      <motion.div
                        className="w-4 h-4 rounded-full border-2 border-accent bg-background"
                        whileInView={{ scale: [0.5, 1.2, 1] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
                      />
                    </div>

                    {/* Right content */}
                    <div className={`w-1/2 pl-12 ${isLeft ? "" : ""}`}>
                      {!isLeft ? (
                        <div className="pb-16">
                          <span className="text-xs text-accent font-mono tracking-widest block mb-3">
                            {step.num}
                          </span>
                          <h3 className="text-xl md:text-2xl font-bold mb-3">{step.title}</h3>
                          <p className="text-muted-foreground leading-relaxed text-sm">{step.desc}</p>
                        </div>
                      ) : (
                        <div className="pb-16" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="section-forced-dark section-padding py-40 relative overflow-hidden">
        {/* Background 3D element */}
        <div className="max-w-[1800px] mx-auto text-center relative z-10">
          <motion.h2
            className="text-4xl md:text-7xl font-bold tracking-tighter mb-10"
            initial={{ opacity: 0, y: 40 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Ready to unlock AI for your business?
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
                Request a Consultation
                <ArrowUpRight size={18} />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
