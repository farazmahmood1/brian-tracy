import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { LineReveal, Magnetic } from "./AnimationComponents";

const testimonials = [
  {
    quote:
      "Forrof transformed our brand completely. Their creative vision and attention to detail exceeded all our expectations. The team is incredibly professional and delivered results that truly represent who we are as a company.",
    author: "Sarah Mitchell",
    role: "CEO",
    company: "TechStart Inc.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
  },
  {
    quote:
      "Working with Forrof was a game-changer for our business. They understood our vision perfectly and delivered results that have significantly increased our market presence and customer engagement across all channels.",
    author: "Michael Chen",
    role: "Founder",
    company: "Wellness Co.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
  },
  {
    quote:
      "The team at Forrof brings creativity and strategy together beautifully. Our brand has never looked better, and our engagement metrics have increased by over 200% since the rebrand. Highly recommended!",
    author: "Emma Rodriguez",
    role: "Marketing Director",
    company: "FashionHub",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
  },
];

const stats = [
  { label: "Happy Clients", value: "30", suffix: "+" },
  { label: "Success Rate", value: "98", suffix: "%" },
  { label: "Years Experience", value: "8", suffix: "+" },
];

export const TestimonialsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });
  const quoteY = useTransform(smoothProgress, [0, 1], [50, -50]);

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
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
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
      className="section-padding md:py-40 max-md:pt-28 relative overflow-hidden border-t border-border"
      ref={containerRef}
    >
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.span className="number-label">/05</motion.span>
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
                className="text-5xl md:text-6xl font-bold leading-tight"
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
              >
                What our clients say about us
              </motion.h2>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.15 }}
                >
                  <motion.div
                    className="text-5xl md:text-6xl font-bold mb-2 flex items-baseline"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{
                      delay: 0.6 + index * 0.15,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
                    <CountUp value={parseInt(stat.value)} isInView={isInView} />
                    <span className="text-2xl">{stat.suffix}</span>
                  </motion.div>
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
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
            <motion.div
              style={{ y: quoteY }}
              className="absolute -top-10 -left-10 opacity-10"
            >
              <Quote size={120} />
            </motion.div>

            {/* Testimonial Content with Slide Animation */}
            <div className="relative min-h-[350px] overflow-hidden">
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
                  <blockquote className="text-2xl md:text-3xl leading-relaxed mb-10 font-light">
                    "{testimonials[current].quote}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <motion.img
                      src={testimonials[current].image}
                      alt={testimonials[current].author}
                      className="w-14 h-14 rounded-full object-cover grayscale"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    />
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
            <div className="flex items-center gap-4 mt-12">
              <Magnetic strength={0.2}>
                <motion.button
                  onClick={prev}
                  className="w-14 h-14 rounded-full border border-border flex items-center justify-center group overflow-hidden relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-foreground"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <ChevronLeft size={20} className="relative z-10" />
                </motion.button>
              </Magnetic>
              <Magnetic strength={0.2}>
                <motion.button
                  onClick={next}
                  className="w-14 h-14 rounded-full border border-border flex items-center justify-center group overflow-hidden relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-foreground"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <ChevronRight size={20} className="relative z-10" />
                </motion.button>
              </Magnetic>

              <div className="flex-1" />

              {/* Dots with Progress Animation */}
              <div className="flex gap-3">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setDirection(index > current ? 1 : -1);
                      setCurrent(index);
                    }}
                    className="relative h-1 rounded-full overflow-hidden"
                    animate={{
                      width: index === current ? 40 : 16,
                      backgroundColor:
                        index === current
                          ? "hsl(var(--foreground))"
                          : "hsl(var(--border))",
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {index === current && (
                      <motion.div
                        className="absolute inset-0 bg-muted-foreground origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 6, ease: "linear" }}
                        key={current}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Counter component for animated numbers
const CountUp = ({ value, isInView }: { value: number; isInView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, isInView]);

  return <span>{count}</span>;
};
