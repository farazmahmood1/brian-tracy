import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState, Suspense } from "react";
import { Magnetic, LineReveal } from "./AnimationComponents";
import Earth3D from "./Earth3D";

const categories = [
  "Cloud Solutions",
  "Web and app Developement",
  "Branding and Identity",
  "Social Media Marketing & SEO",
];

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth spring physics for parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });

  // Parallax transforms
  const earthOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);

  // Text animations to move to header
  // Moves up, scales down significantly to match header size
  const heroTextY = useTransform(smoothProgress, [0, 0.25], ["0vh", "-42vh"]);
  const heroTextScale = useTransform(smoothProgress, [0, 0.25], [1, 0.15]); // Adjust scale to match ~30px / ~14vw
  const heroTextOpacity = useTransform(smoothProgress, [0.15, 0.25], [1, 0]); // Fade out as it reaches top

  // Twinkling stars effect
  const [stars, setStars] = useState<
    Array<{ id: number; x: number; y: number; delay: number; duration: number }>
  >([]);

  useEffect(() => {
    const generatedStars = [...Array(100)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 4,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[100vh] flex items-center overflow-hidden bg-background"
    >
      {/* Twinkling Stars Background */}
      <div className="absolute inset-0 z-[1]">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: "2px",
              height: "2px",
              background: "#ffffff",
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Gradient Overlay - Deep blue gradient from black to dark blue */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(10, 30, 70, 0.7) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* 3D Earth Globe with Parallax */}
      <motion.div
        className="absolute -left-[20%] md:-left-[40%] top-[130%] -translate-y-[60%] z-10 w-[100vw] md:w-[80vw] lg:w-[80vw] aspect-square pointer-events-auto"
        style={{
          opacity: earthOpacity,
          willChange: "transform"

          // scale: earthScale,
        }}
      >
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <motion.div
                className="w-[60%] aspect-square rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, #4da6ff 0%, #1a4a7a 40%, #0a1a2a 80%, #000000 100%)",
                  boxShadow:
                    "0 0 100px rgba(77, 166, 255, 0.3), inset -30px -30px 80px rgba(0,0,0,0.8)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
            </div>
          }
        >
          <Earth3D className="w-[120vw] h-full" />
        </Suspense>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="relative z-20 section-padding w-full"
      >
        <div className="max-w-[1800px] mx-auto max-[1500px]:mt-28 ">
          {/* Top Label */}
          <motion.div
            className="flex items-center gap-4 mb-8 mt-28"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.span
              className="number-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              /01
            </motion.span>
            <LineReveal
              className="h-px bg-border flex-1 max-w-[100px]"
              delay={0.6}
            />
            <motion.span
              className="text-xs text-muted-foreground uppercase tracking-widest"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              Space of Creative Solutions
            </motion.span>
          </motion.div>

          {/* Main Logo Typography */}
          <motion.div
            className="overflow-hidden mb-6"
            style={{
              background: "transparent",
              y: heroTextY,
              scale: heroTextScale,
              opacity: heroTextOpacity,
              transformOrigin: "left center"
            }}
          >
            <motion.h1
              className="text-[18vw] md:text-[14vw] font-bold leading-[0.85] tracking-tighter"
              initial={{ y: "120%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 1.4,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.3,
              }}
            >
              Forrof<sup className="text-[4vw]">®</sup>
            </motion.h1>
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.div
          className="flex items-start gap-8 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.span
            className="text-sm text-muted-foreground writing-vertical hidden md:block"
            // style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            Full-service Creative Agency
          </motion.span>
        </motion.div>

        {/* Categories - Interactive List */}
        <motion.div
          className="flex flex-col gap-4 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {categories.map((cat, index) => (
            <Magnetic key={cat} strength={0.15}>
              <motion.a
                href="#services"
                className="group flex items-center gap-4 py-1 cursor-pointer"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                whileHover={{ x: 10 }}
              >
                <motion.span className="w-8 h-px bg-muted-foreground group-hover:w-16 group-hover:bg-foreground transition-all duration-500" />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                  {cat}
                </span>
              </motion.a>
            </Magnetic>
          ))}
        </motion.div>

        {/* Right side description */}
        <motion.div
          className="absolute right-0 bottom-[10%] -translate-y-1/2 max-w-[370px] hidden xl:block mr-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="flex flex-col items-center gap-5">
            <div className="">
              <p className="text-lg font-light text-foreground leading-tight">
                Whether through robust APIs, scalable cloud solutions, or
                seamless integrations,
                <span className="font-extralight text-foreground/70">
                  we build digital products that empower businesses to grow
                  and innovate.
                </span>
              </p>
            </div>
            <div className="flex gap-3 -ml-10">
              <span className="px-4 py-2 border border-white rounded-full text-xs ">
                Frontend
              </span>
              <span className="px-4 py-2 border border-white rounded-full text-xs ">
                Backend
              </span>
              <span className="px-4 py-2 border border-white rounded-full text-xs ">
                Cloud
              </span>
              <span className="px-5 py-1 border border-white rounded-full text-base ">
                +
              </span>
            </div>
          </div>
        </motion.div>

      </motion.div>

    </section >
  );
};
