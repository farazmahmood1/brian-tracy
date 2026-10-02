import {
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { LineReveal } from "./AnimationComponents";

const testimonials = [
  {
    quote:
      "Forrof transformed our brand completely. Their creative vision and attention to detail exceeded all our expectations. The team is incredibly professional and delivered results that truly represent who we are as a company.",
    author: "Sarah Mitchell",
    role: "CEO",
    company: "Bushel",
  },
  {
    quote:
      "Working with Forrof was a game-changer for our business. They understood our vision perfectly and delivered results that have significantly increased our market presence and customer engagement across all channels.",
    author: "Michael Chen",
    role: "Founder",
    company: "Curogram",
  },
  {
    quote:
      "The team at Forrof brings creativity and strategy together beautifully. Our platform has never looked better, and our engagement metrics have increased by over 200% since the redesign. Highly recommended!",
    author: "Emma Rodriguez",
    role: "Marketing Director",
    company: "Carbonmade",
  },
  {
    quote:
      "Forrof rebuilt our entire paid ads funnel and took us from 1.8x to 5.4x ROAS in under 90 days. Cost per qualified lead dropped 62%. They actually understand performance marketing, not just spending budget.",
    author: "Daniel Park",
    role: "Head of Growth",
    company: "SalesHero",
  },
  {
    quote:
      "Forrof shipped a platform that exposes institutional-grade quant logic through a no-code interface — live trading, backtests, ML signals — without ever feeling overwhelming. Our paid signups doubled post-launch.",
    author: "Jonathan Reeves",
    role: "Founder & CEO",
    company: "Signal Sigma",
  },
  {
    quote:
      "Quidget went from idea to a production AI assistant in three months. Integrations, conversational UX, analytics — everything was thought through. Enterprise customers consistently call out how polished it feels.",
    author: "Priya Anand",
    role: "Co-Founder",
    company: "Quidget AI",
  },
  {
    quote:
      "Forrof relaunched FynoSign and ran our Google and Meta ads in parallel. The product cut drop-off by 41%, and paid ads are now closing contracts at less than half our previous CAC. Best agency partnership we've had.",
    author: "Marcus Whitmore",
    role: "VP Marketing",
    company: "FynoSign",
  },
  {
    quote:
      "Loopiq was a complex build — real-time data, multiple integrations, a tricky permissions model — and Forrof delivered it cleanly. They communicated like in-house engineers and shipped on every milestone.",
    author: "Sophie Lambert",
    role: "Product Lead",
    company: "Loopiq",
  },
  {
    quote:
      "Forrof rebuilt our campaign structure from the ground up and pulled in 400+ qualified leads, 150+ bookings, and over $111K in revenue. High-volume, cost-efficient growth — exactly what we hired them to deliver.",
    author: "Aaron Boyle",
    role: "Operations Director",
    company: "GreenWorks",
  },
  {
    quote:
      "Forrof turned strategic campaign precision into measurable revenue growth — 600+ qualified leads, 250+ bookings, and $181K in revenue. Pipeline we can finally forecast against month over month.",
    author: "Brian Hollister",
    role: "Marketing Director",
    company: "Linkhorn Inspection Group",
  },
  {
    quote:
      "Forrof scaled our local inspection demand into a predictable pipeline — 720+ qualified leads, 290+ bookings, and $215K in revenue. They run paid ads like a growth engine, not a media buy.",
    author: "Nate Beaumont",
    role: "Owner",
    company: "RedFish Inspections",
  },
];

const stats = [
  { label: "Happy Clients", value: "50", suffix: "+" },
  { label: "Success Rate", value: "98", suffix: "%" },
  { label: "Years Experience", value: "5", suffix: "+" },
];

export const TestimonialsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const statsCycle = 0; // Removed 15s re-trigger - was causing cascading re-renders & animation jank


  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard navigation for carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section
      className="section-forced-light section-padding md:py-20 py-12 overflow-hidden"
      ref={containerRef}
      data-no-cursor-light
    >
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.span className="number-label">/06</motion.span>
          <LineReveal className="h-px bg-border flex-1" delay={0.3} />
          <motion.span className="text-xs text-muted-foreground uppercase tracking-widest">
            Testimonials
          </motion.span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left Column - Stats with Counter Animation */}
          <motion.div
            className="space-y-16"
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 1.2,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <div className="overflow-hidden">
              <motion.h2
                className="text-4xl md:text-5xl font-bold leading-tight"
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
              >
                What our clients say about us
              </motion.h2>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8">
              {stats.map((stat, index) => {
                const d = statsCycle === 0 ? 0.5 : 0.1;
                return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: d + index * 0.15 }}
                >
                  <motion.div
                    className="text-3xl sm:text-5xl md:text-6xl font-bold mb-2 flex items-baseline"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{
                      delay: d + 0.1 + index * 0.15,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
                    <CountUp value={parseInt(stat.value)} isInView={isInView} cycle={statsCycle} />
                    <span className="text-2xl">{stat.suffix}</span>
                  </motion.div>
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column - Testimonial Carousel */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 1.2,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {/* Quote Icon */}
            <div className="absolute -top-10 -left-10 opacity-10">
              <Quote size={120} />
            </div>

            {/* Testimonial Content with Slide Animation */}
            <div className="relative min-h-[340px] sm:min-h-[300px] md:min-h-[280px] overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute inset-0"
                >
                  <blockquote className="text-xl md:text-2xl leading-relaxed mb-6 font-light">
                    "{testimonials[current].quote}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <motion.div
                      aria-hidden
                      className="w-14 h-14 rounded-full flex items-center justify-center text-base font-semibold tracking-wide bg-[#126b66]/15 text-[#126b66] border border-[#126b66]/30 shrink-0"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {testimonials[current].author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </motion.div>
                    <div>
                      <p className="font-semibold text-lg">
                        {testimonials[current].author}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {testimonials[current].role},{" "}
                        {testimonials[current].company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-14 h-14 rounded-full border border-[#126b66]/30 flex items-center justify-center group overflow-hidden relative hover:bg-[#126b66] transition-colors duration-300"
              >
                <ChevronLeft size={20} className="relative z-10 group-hover:text-white transition-colors" />
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="w-14 h-14 rounded-full border border-[#126b66]/30 flex items-center justify-center group overflow-hidden relative hover:bg-[#126b66] transition-colors duration-300"
              >
                <ChevronRight size={20} className="relative z-10 group-hover:text-white transition-colors" />
              </button>

              <div className="flex-1" />

              {/* Dots with Progress Animation */}
              {/* CSS class toggle instead of animated width (no layout reflow) */}
              <div className="flex gap-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    aria-label={`Go to testimonial ${index + 1}`}
                    onClick={() => {
                      setDirection(index > current ? 1 : -1);
                      setCurrent(index);
                    }}
                    className={`relative h-1 rounded-full overflow-hidden transition-all duration-400 ${
                      index === current ? "w-10 bg-[#126b66]" : "w-4 bg-[#126b66]/20"
                    }`}
                  >
                    {index === current && (
                      <motion.div
                        className="absolute inset-0 bg-[#00d4aa] origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 6, ease: "linear" }}
                        key={current}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Visual Stats Row */}
        <motion.div
          className="mt-12 pt-10 border-t border-border grid md:grid-cols-3 gap-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: statsCycle === 0 ? 1.2 : 0.1, duration: 0.8 }}
        >
          {/* Donut Chart - Projects by Field */}
          {(() => {
            const bd = statsCycle === 0 ? 1.3 : 0.2;
            const bdMs = statsCycle === 0 ? 1300 : 200;
            return (
          <div>
            <h4 className="text-sm font-semibold mb-1">Projects by Field</h4>
            <div className="w-full h-px bg-foreground/20 mb-6" />
            <div className="flex items-center gap-6">
              <div className="relative shrink-0 w-[120px] h-[120px]">
                <svg width="120" height="120" viewBox="0 0 200 200">
                  <g transform="rotate(-90, 100, 100)">
                    <motion.circle cx="100" cy="100" r="80" fill="none" strokeWidth="32"
                      stroke="#126b66"
                      strokeDashoffset={0}
                      initial={{ strokeDasharray: "0 503" }}
                      animate={isInView ? { strokeDasharray: "172 331" } : {}}
                      transition={{ duration: 1.2, delay: bd, ease: [0.25, 0.1, 0.25, 1] }} />
                    <motion.circle cx="100" cy="100" r="80" fill="none" strokeWidth="32"
                      stroke="#00d4aa"
                      strokeDashoffset={-172}
                      initial={{ strokeDasharray: "0 503" }}
                      animate={isInView ? { strokeDasharray: "126 377" } : {}}
                      transition={{ duration: 1.2, delay: bd + 0.15, ease: [0.25, 0.1, 0.25, 1] }} />
                    <motion.circle cx="100" cy="100" r="80" fill="none" strokeWidth="32"
                      stroke="#0a9d8a"
                      strokeDashoffset={-298}
                      initial={{ strokeDasharray: "0 503" }}
                      animate={isInView ? { strokeDasharray: "83 420" } : {}}
                      transition={{ duration: 1.2, delay: bd + 0.3, ease: [0.25, 0.1, 0.25, 1] }} />
                    <motion.circle cx="100" cy="100" r="80" fill="none" strokeWidth="32"
                      stroke="#126b66"
                      strokeOpacity={0.3}
                      strokeDashoffset={-381}
                      initial={{ strokeDasharray: "0 503" }}
                      animate={isInView ? { strokeDasharray: "122 381" } : {}}
                      transition={{ duration: 1.2, delay: bd + 0.45, ease: [0.25, 0.1, 0.25, 1] }} />
                  </g>
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
                  <CountUp value={152} isInView={isInView} delay={bdMs} cycle={statsCycle} />
                </span>
              </div>
              <div className="space-y-2 text-sm">
                {[
                  { label: "AI/ML", count: 52, opacity: "bg-[#126b66]" },
                  { label: "Enterprise", count: 38, opacity: "bg-[#00d4aa]" },
                  { label: "SaaS", count: 25, opacity: "bg-[#0a9d8a]" },
                  { label: "Paid Ads", count: 37, opacity: "bg-[#126b66]/30 border border-[#126b66]/50" },
                ].map(({ label, count, opacity }, i) => (
                  <motion.div
                    key={label}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: bd + i * 0.12, duration: 0.4 }}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${opacity}`} />
                    <span>{label} <span className="text-muted-foreground ml-1">{count}</span></span>
                  </motion.div>
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-5 leading-relaxed">
              The ranking is based on the predominant domain of a project.
            </p>
          </div>
            );
          })()}

          {/* Bar Chart - Project Launched */}
          {(() => {
            const bd = statsCycle === 0 ? 1.3 : 0.2;
            const bdMs = statsCycle === 0 ? 1300 : 200;
            const bars = [
              { year: "2020", value: 15, shade: "#126b66" },
              { year: "2021", value: 25, shade: "#0a9d8a" },
              { year: "2022", value: 35, shade: "#00d4aa" },
              { year: "2023", value: 28, shade: "#0a9d8a" },
              { year: "2024", value: 42, shade: "#126b66" },
              { year: "2025", value: 48, shade: "#00d4aa" },
              { year: "2026", value: 12, shade: "#0a9d8a" },
            ];
            const max = Math.max(...bars.map(b => b.value));
            return (
              <div>
                <h4 className="text-sm font-semibold mb-1">Project Launched</h4>
                <div className="w-full h-px bg-foreground/20 mb-6" />
                <div className="flex gap-2 mb-1">
                  {bars.map((bar, i) => (
                    <motion.div
                      key={bar.year}
                      className="flex-1 text-center text-xs font-medium"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: bd + i * 0.08 }}
                    >
                      <CountUp value={bar.value} isInView={isInView} delay={bdMs + i * 80} cycle={statsCycle} />
                    </motion.div>
                  ))}
                </div>
                <div className="flex items-end gap-2 h-28">
                  {bars.map((bar, i) => (
                    <motion.div
                      key={bar.year}
                      className="flex-1 rounded-t-sm"
                      style={{
                        backgroundColor: bar.shade,
                        transformOrigin: "bottom",
                        height: `${(bar.value / max) * 100}%`,
                      }}
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                      transition={{ duration: 0.7, delay: bd + i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                  ))}
                </div>
                <div className="flex gap-2 mt-1">
                  {bars.map(bar => (
                    <span key={bar.year} className="flex-1 text-center text-xs text-muted-foreground">{bar.year}</span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-5 leading-relaxed">
                  The ranking is based on the number of projects launched per year.
                </p>
              </div>
            );
          })()}

          {/* Team Involvement - dot grid */}
          {(() => {
            const bd = statsCycle === 0 ? 1.3 : 0.2;
            const bdMs = statsCycle === 0 ? 1300 : 200;
            return (
          <div>
            <h4 className="text-sm font-semibold mb-1">People per Project</h4>
            <div className="w-full h-px bg-foreground/20 mb-6" />
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-bold">
                <CountUp value={6} isInView={isInView} delay={bdMs} cycle={statsCycle} />
              </span>
              <span className="text-lg text-muted-foreground">/ 17 team members</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {Array.from({ length: 17 }, (_, i) => (
                <motion.div
                  key={i}
                  className={`w-[14px] h-[14px] rounded-full ${
                    i < 6 ? "bg-[#126b66]" : "bg-[#126b66]/15"
                  }`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: bd + i * 0.02, duration: 0.3 }}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Average number of people from the team involved in a project.
            </p>
          </div>
            );
          })()}
        </motion.div>
      </div>
    </section>
  );
};

// Counter - RAF + direct DOM write, zero setState calls during animation
const CountUp = ({ value, isInView, delay = 0, cycle = 0 }: { value: number; isInView: boolean; delay?: number; cycle?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isInView || !ref.current) return;
    if (ref.current) ref.current.textContent = "0";
    let raf: number;
    const timeout = setTimeout(() => {
      const start = performance.now();
      const duration = 1000;
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
        if (ref.current) ref.current.textContent = String(Math.floor(eased * value));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [isInView, value, delay, cycle]);

  return <span ref={ref}>0</span>;
};
