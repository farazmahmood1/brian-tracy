import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { Magnetic } from "./AnimationComponents";
import HeroGlobe from "./HeroGlobe";

const categories = [
  "Cloud Solutions",
  "Web and app Developement",
  "Branding and Identity",
  "Social Media Marketing & SEO",
];

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress for the entire section
  // Increased height to 400vh for 4 distinct phases
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Phases:
  // 0.0 - 0.20: Phase 1 - Enter the Gate (Vertical Window -> Full Screen)
  // 0.20 - 0.60: Phase 2 - The Orbit (Rotate 360 around Earth, Trail appears)
  // 0.60 - 0.80: Phase 3 - Zoom Out (Pull back to see full Scale)
  // 0.80 - 1.00: Phase 4 - Title Reveal (Forrof appears)

  // Window Transforms
  // Start as Vertical Gate (30vw x 60vh) -> Expand to Full Viewport
  const windowWidth = useTransform(scrollYProgress, [0, 0.2], ["30vw", "100%"]);
  const windowHeight = useTransform(scrollYProgress, [0, 0.2], ["60vh", "100vh"]);
  const windowRadius = useTransform(scrollYProgress, [0.15, 0.2], ["100px", "0px"]); // Round to sharp

  // Title Animation (Forrof)
  const titleY = useTransform(scrollYProgress, [0.8, 1], ["100%", "0%"]);
  const titleOpacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);

  // Text Sidebars (Services / Mission)
  // They stay static, but might get covered by the window expanding.
  // We can fade them out slightly as we "enter" to avoid distraction, or keep them. 
  // User said "overlaps... text does not move". Natural Z-index coverage works.

  // Earth Animation Control via Proxy
  const earthProxy = useRef({
    scale: 0.5,
    rotationSpeed: 0.02,
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    orbitRotation: 0,
    trailProgress: 0,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!earthProxy.current) return;

    // Phase 1: Enter
    // Scale: 0.5 -> 1.5 (Get closer)
    let currentScale = 0.5;
    if (latest <= 0.2) {
      currentScale = 0.5 + (latest / 0.2) * 1.0; // 0.5 to 1.5
    } else if (latest <= 0.6) {
      // Phase 2: Orbit
      // Scale stays relatively close: 1.5
      currentScale = 1.5;
    } else if (latest <= 0.8) {
      // Phase 3: Zoom Out
      // Scale: 1.5 -> 0.8 (See full globe)
      const p = (latest - 0.6) / 0.2;
      currentScale = 1.5 - p * 0.7;
    } else {
      // Phase 4: Hold
      currentScale = 0.8;
    }

    // Orbit Rotation (Phase 2)
    // 0.2 to 0.6 -> 0 to 2*PI
    let rotation = 0;
    let trail = 0;

    if (latest > 0.2 && latest <= 0.6) {
      const p = (latest - 0.2) / 0.4;
      rotation = p * Math.PI * 2;

      // Trail Logic: Fade in quickly, stay, fade out at end
      if (p < 0.1) trail = p * 10; // 0->1
      else if (p > 0.9) trail = (1 - p) * 10; // 1->0
      else trail = 1;
    } else if (latest > 0.6) {
      rotation = Math.PI * 2; // Keep at 360
      trail = 0;
    }

    earthProxy.current.scale = currentScale;
    earthProxy.current.orbitRotation = rotation;
    earthProxy.current.trailProgress = trail;
    // slightly increase rotation speed?
    earthProxy.current.rotationSpeed = 0.02;
  });

  return (
    // Tall container to provide scroll space
    <section
      id="home"
      ref={containerRef}
      className="relative h-[400vh] bg-background"
    >
      {/* Sticky Viewport - This is what the user sees while scrolling */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* LEFT TEXT (Services) - Static z-10 */}
        <div className="absolute left-[5%] md:left-[10%] top-1/2 -translate-y-1/2 z-10 hidden md:block w-64">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-6">Services</h3>
            <div className="flex flex-col gap-4">
              {categories.map((cat, index) => (
                <Magnetic key={cat} strength={0.15}>
                  <a href="#services" className="group flex items-center gap-3 cursor-pointer py-1">
                    <span className="w-6 h-px bg-white/30 group-hover:w-10 group-hover:bg-white transition-all duration-300" />
                    <span className="text-sm text-white/80 group-hover:text-white transition-colors">
                      {cat}
                    </span>
                  </a>
                </Magnetic>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT TEXT (Mission) - Static z-10 */}
        <div className="absolute right-[5%] md:right-[10%] top-1/2 -translate-y-1/2 z-10 hidden md:block w-72 text-right">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h3 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-6">Our Mission</h3>
            <p className="text-lg text-white leading-relaxed font-light">
              Crafting digital experiences that transcend boundaries.
              <span className="block mt-4 text-white/60 text-sm">
                We build products that empower businesses to grow and innovate.
              </span>
            </p>

            <div className="flex gap-2 justify-end mt-6 flex-wrap">
              {["Frontend", "Backend", "Cloud"].map(tag => (
                <span key={tag} className="px-3 py-1 border border-white/20 rounded-full text-[10px] text-white/70">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* COSMIC GATE / WINDOW - Expands (z-20) */}
        <motion.div
          className="relative z-20 bg-black overflow-hidden shadow-[0_0_50px_rgba(41,142,205,0.2)] border border-white/10"
          style={{
            width: windowWidth,
            height: windowHeight,
            borderRadius: windowRadius,
          }}
        >
          {/* Inner Content - Earth & Stars */}
          <div className="absolute inset-0 w-full h-full">
            <HeroGlobe
              className="w-full h-full"
              proxy={earthProxy}
            />
          </div>

          {/* TITLE REVEAL - Inside the window (z-30) */}
          {/* Renders at the bottom, moves up */}
          <div className="absolute bottom-0 left-0 w-full flex justify-center pb-12 z-30 overflow-hidden pointer-events-none">
            <motion.h1
              className="text-[15vw] font-bold tracking-tighter text-white leading-none"
              style={{ y: titleY, opacity: titleOpacity }}
            >
              forrof
            </motion.h1>
          </div>

          {/* Scroll Prompt - Visible initially */}
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest uppercase z-30"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
          >
            Enter the Gate
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

