import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { LineReveal, Magnetic } from "./AnimationComponents";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const words =
  "We build intelligent products and business systems that turn software into a growth engine.".split(
    " "
  );

// Simple whileInView word reveal — no scroll-linked hooks
const WordByWordReveal = ({ words }: { words: string[] }) => (
  <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight">
    {words.map((word, i) => (
      <motion.span
        key={i}
        className="inline-block mr-[0.3em]"
        initial={{ opacity: 0.15, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 0.5, delay: i * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {word}
      </motion.span>
    ))}
  </p>
);

export const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const navigate = useNavigate();

  return (
    <section
      className="section-forced-light section-padding md:py-20 py-12 overflow-hidden"
      ref={containerRef}
      data-no-cursor-light
    >

      {/* Large decorative text in background — static, no scroll animation */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span className="text-[25vw] font-bold text-foreground/[0.04] whitespace-nowrap">
          FORROF
        </span>
      </div>

      <div className="max-w-[1800px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.span className="number-label">/04</motion.span>
          <LineReveal className="h-px bg-border flex-1" delay={0.3} />
          <motion.span className="text-xs text-muted-foreground uppercase tracking-widest">
            About Us
          </motion.span>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Big statement with word-by-word animation */}
          <div className="relative">
            <WordByWordReveal words={words} />

            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-4 flex-wrap">
                <Magnetic strength={0.15}>
                  <motion.a
                    href="/contact"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/contact");
                    }}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white overflow-hidden relative group"
                    style={{ background: "linear-gradient(135deg, #126b66, #00d4aa)" }}
                    data-cursor="Let's Talk"
                    whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(72, 240, 231, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 font-medium">
                      Start a Project
                    </span>
                    <ArrowUpRight size={18} className="relative z-10" />
                  </motion.a>
                </Magnetic>
                <motion.a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/about");
                    window.scrollTo(0, 0);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-foreground/20 text-foreground font-medium text-sm hover:bg-foreground hover:text-background transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  About Us
                  <ArrowUpRight size={14} />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Right - Parallax Image Stack */}
          <motion.div
            className="relative h-[350px] sm:h-[450px] lg:h-[600px]"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            {/* Background image */}
            <motion.div
              className="absolute top-0 right-0 w-4/5 h-4/5 rounded-2xl lg:rounded-3xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Team collaboration"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/20" />
            </motion.div>

            {/* Foreground image */}
            <motion.div
              className="absolute bottom-0 left-0 w-2/3 h-2/3 rounded-3xl overflow-hidden border-4 border-background"
              initial={{ y: 100, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 1 }}
            >
              <img
                src={`${import.meta.env.VITE_SERVER}/about-image.jpeg`}
                alt="Creative work"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Floating stat card */}
            <motion.div
              className="absolute right-2 sm:right-0 lg:-right-8 bottom-1/4 bg-foreground text-background p-4 sm:p-6 rounded-2xl shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1, duration: 0.6 }}
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
      </div>
    </section>
  );
};
