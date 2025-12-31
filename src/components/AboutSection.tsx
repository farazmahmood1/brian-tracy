import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { LineReveal, Magnetic } from "./AnimationComponents";
import { ArrowUpRight, Award, Users, Globe, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "We pursue perfection in every pixel and every interaction.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working together with clients to achieve remarkable results.",
  },
  {
    icon: Globe,
    title: "Innovation",
    description: "Pushing boundaries with cutting-edge design and technology.",
  },
  {
    icon: Zap,
    title: "Impact",
    description: "Creating work that drives measurable business growth.",
  },
];

const words =
  "We are a creative agency that transforms brands through strategic design and digital innovation".split(
    " "
  );

// Separate component to handle word-by-word animation with hooks
const WordByWordReveal = ({
  words,
  scrollProgress,
}: {
  words: string[];
  scrollProgress: MotionValue<number>;
}) => {
  return (
    <motion.p className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
      {words.map((word, i) => (
        <WordItem
          key={i}
          word={word}
          index={i}
          totalWords={words.length}
          scrollProgress={scrollProgress}
        />
      ))}
    </motion.p>
  );
};

// Individual word component with hooks at proper level
const WordItem = ({
  word,
  index,
  totalWords,
  scrollProgress,
}: {
  word: string;
  index: number;
  totalWords: number;
  scrollProgress: MotionValue<number>;
}) => {
  const start = index / totalWords;
  const end = start + 1 / totalWords;

  const opacity = useTransform(scrollProgress, [start, end], [0.2, 1]);
  const y = useTransform(scrollProgress, [start, end], [20, 0]);

  return (
    <motion.span
      className="inline-block mr-[0.3em]"
      style={{
        opacity,
        y,
      }}
    >
      {word}
    </motion.span>
  );
};

export const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const textRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: textScrollProgress } = useScroll({
    target: textRef,
    offset: ["start 1", "end 0.7"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });
  const imageX = useTransform(smoothProgress, [0, 1], [-100, 100]);
  const imageRotate = useTransform(smoothProgress, [0, 1], [-5, 5]);
  const statsY = useTransform(smoothProgress, [0, 1], [100, -50]);

  return (
    <section
      className="section-padding md:py-40 py-12 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Large decorative text in background */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{
          scale: useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]),
        }}
      >
        <span className="text-[25vw] font-bold text-foreground/[0.02] whitespace-nowrap">
          FORROF
        </span>
      </motion.div>

      <div className="max-w-[1800px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.span className="number-label">/10</motion.span>
          <LineReveal className="h-px bg-border flex-1" delay={0.3} />
          <motion.span className="text-xs text-muted-foreground uppercase tracking-widest">
            About Us
          </motion.span>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          {/* Left - Big statement with word-by-word animation */}
          <div ref={textRef} className="relative">
            <WordByWordReveal
              words={words}
              scrollProgress={textScrollProgress}
            />

            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              <Magnetic strength={0.15}>
                <motion.a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/contact");
                  }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full overflow-hidden relative group"
                  data-cursor="Let's Talk"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-muted"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                  <span className="relative z-10 font-medium  transition-colors duration-300">
                    Start a Project
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="relative z-10 transition-colors"
                  />
                </motion.a>
              </Magnetic>
            </motion.div>
          </div>

          {/* Right - Parallax Image Stack */}
          <motion.div
            className="relative h-[600px]"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            {/* Background image */}
            <motion.div
              className="absolute top-0 right-0 w-4/5 h-4/5 rounded-3xl overflow-hidden"
              style={{ x: imageX, rotate: imageRotate }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Team collaboration"
                className="w-full h-full object-cover"
                initial={{ scale: 1.5 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 2 }}
              />
              <div className="absolute inset-0 bg-foreground/20" />
            </motion.div>

            {/* Foreground image */}
            <motion.div
              className="absolute bottom-0 left-0 w-2/3 h-2/3 rounded-3xl overflow-hidden border-4 border-background"
              style={{
                x: useTransform(imageX, (v) => -v * 0.5),
                rotate: useTransform(imageRotate, (v) => -v),
              }}
              initial={{ y: 100, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 1 }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                alt="Creative work"
                className="w-full h-full object-cover"
                initial={{ scale: 1.5 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 2, delay: 0.3 }}
              />
            </motion.div>

            {/* Floating stat card */}
            <motion.div
              className="absolute -right-8 bottom-1/4 bg-foreground text-background p-6 rounded-2xl shadow-2xl"
              style={{ y: statsY }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <motion.span
                className="text-5xl font-bold block"
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 1.2 }}
              >
                150+
              </motion.span>
              <span className="text-sm opacity-70">Projects Delivered</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Values Grid with Staggered Animation */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="p-8 border border-border rounded-2xl group hover:bg-foreground hover:border-foreground transition-colors duration-500 cursor-pointer"
              data-cursor={value.title}
              initial={{ opacity: 0, y: 60, rotateX: -20 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{
                duration: 1,
                delay: 0.8 + index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={{ y: -10, scale: 1.02 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="w-14 h-14 rounded-full border border-border flex items-center justify-center mb-6 group-hover:bg-background group-hover:border-background transition-all duration-500"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <value.icon className="w-6 h-6 group-hover:text-foreground transition-colors" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-background transition-colors">
                {value.title}
              </h3>
              <p className="text-muted-foreground group-hover:text-background/70 transition-colors text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
