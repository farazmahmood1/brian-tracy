import { motion } from "framer-motion";
import { useRef, useMemo, Suspense, lazy, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { LineReveal } from "./AnimationComponents";
const HeroGlobe = lazy(() => import("./HeroGlobe"));

const generateStars = (count: number) =>
  Array.from({ length: count }, (_, i) => {
    const seq = i % 3;
    const idx = Math.floor(i / 3);
    const x = seq === 0
      ? (idx * 137.508 + 23.7) % 100
      : seq === 1
        ? (idx * 173.21 + 61.4) % 100
        : (idx * 97.361 + 8.9) % 100;
    const y = seq === 0
      ? (idx * 97.361 + 41.2) % 100
      : seq === 1
        ? (idx * 137.508 + 77.3) % 100
        : (idx * 211.73 + 15.6) % 100;
    return {
      id: i,
      x,
      y,
      delay: (i * 0.31) % 4,
      duration: 1.5 + (i * 0.19) % 5,
      size: i % 17 === 0 ? 3 : i % 7 === 0 ? 2.5 : i % 3 === 0 ? 1.5 : 1,
      opacity: i % 11 === 0 ? 0.9 : i % 5 === 0 ? 0.7 : 0.4,
    };
  });

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);

  // Native scroll parallax — no Framer Motion useScroll, no React re-renders.
  // Completely stops processing once the hero section scrolls fully off-screen.
  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    const globe = globeRef.current;
    if (!container || !content || !globe) return;

    let rafId = 0;

    // Use IntersectionObserver to only attach scroll listener when hero is visible
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const h = container.offsetHeight;
        if (rect.bottom < 0) {
          content.style.transform = `translate3d(0, -80px, 0)`;
          content.style.opacity = "0";
          globe.style.opacity = "0";
          return;
        }
        const progress = Math.min(1, Math.max(0, -rect.top / h));
        content.style.transform = `translate3d(0, ${progress * -80}px, 0)`;
        content.style.opacity = String(Math.max(0, 1 - progress / 0.35));
        globe.style.opacity = String(Math.max(0, 1 - progress / 0.5));
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener("scroll", onScroll, { passive: true });
        } else {
          window.removeEventListener("scroll", onScroll);
          cancelAnimationFrame(rafId);
        }
      },
      { rootMargin: "100px" }
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const [starCount] = useState(() => window.innerWidth < 768 ? 20 : 40);
  const stars = useMemo(() => generateStars(starCount), [starCount]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-[100vh] flex items-end overflow-hidden bg-background"
      data-no-cursor-light
    >
      {/* Twinkling Stars */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {stars.map((s) => (
          <div
            key={s.id}
            className="star"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              "--d": `${s.duration}s`,
              "--delay": `-${s.delay}s`,
              "--base-o": `${s.opacity}`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 25% 50% at 100% 50%, rgba(18,107,102,0.08) 0%, transparent 60%), #000" }}
      />

      {/* 3D Earth Globe */}
      <div
        ref={globeRef}
        className="absolute -left-[20%] md:-left-[40%] top-[70%] md:top-[130%] -translate-y-[60%] z-10 w-[100vw] md:w-[80vw] lg:w-[80vw] aspect-square pointer-events-auto"
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
          <HeroGlobe className="w-[120vw] h-full" />
        </Suspense>
      </div>

      {/* Main Content */}
      <div
        ref={contentRef}
        className="relative z-20 px-4 md:px-8 lg:px-16 xl:px-20 w-full h-full flex flex-col justify-between pt-[18vh] pb-[6vh] md:pb-[8vh]"
      >
        {/* Top — /01 label + heading + subtitle + CTA */}
        <div className="max-w-[1800px] mx-auto w-full">
          {/* /01 Section Label */}
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.span
              className="text-sm font-mono text-white/40 tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              /01
            </motion.span>
            <LineReveal
              className="h-px bg-gradient-to-r from-white/30 to-transparent flex-1 max-w-[140px]"
              delay={0.6}
            />
            <motion.span
              className="text-[11px] text-white/40 uppercase tracking-[0.25em] font-light"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              Space of Intelligent AI Products & Business Systems
            </motion.span>
          </motion.div>

          <motion.div
            className="flex-shrink-0"
          >
            <motion.h1
              className="text-[11vw] md:text-[6.5vw] lg:text-[4.5vw] font-bold leading-[1.05] tracking-[-0.03em]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
            >
              <span className="text-white">
                Building Intelligent Software.
              </span>
              <br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #ffffff 0%, #48f0e7 40%, #00d4aa 70%, #126b66 100%)" }}>
                for the AI Era.
              </span>
            </motion.h1>

            <motion.p
              className="text-sm text-white/70 font-normal mt-5 max-w-[440px] leading-[1.8]"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              We design and build custom software, AI systems, and digital platforms for companies worldwide — helping businesses scale with modern, future‑ready technology.
            </motion.p>

              <motion.a
                href="/contact"
                className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-black font-semibold text-sm mt-8 cursor-pointer group relative overflow-hidden transition-all duration-700 ease-in-out hover:shadow-[0_0_30px_rgba(72,240,231,0.4),0_0_60px_rgba(72,240,231,0.15)] hover:scale-[1.04] active:scale-[0.97]"
                style={{
                  background: "linear-gradient(135deg, #48f0e7 0%, #00d4aa 40%, #126b66 70%, #0a3d3a 100%)",
                }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
              >
                Let's Talk
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-700" />
              </motion.a>
          </motion.div>
        </div>

        {/* Bottom-right — description + tags */}
        <div className="max-w-[1800px] mx-auto w-full flex justify-end">
          <motion.div
            className="max-w-[400px] hidden xl:flex flex-col items-end gap-6 flex-shrink-0"
          >
            <motion.p
              className="text-[15px] leading-[1.8] text-right font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="text-white/90">
                Whether through AI‑powered platforms, scalable product architectures, or intelligent automation systems,
              </span>{" "}
              <span className="text-white/40">
                we design and build software that becomes a long‑term business asset, not just an app.
              </span>
            </motion.p>
            <div className="flex gap-3 flex-wrap justify-end">
              {["AI", "ML", "SaaS"].map((tag, i) => (
                <motion.span
                  key={tag}
                  className="px-5 py-2 border-2 border-[#48f0e7]/40 text-white/80 rounded-full text-[11px] uppercase tracking-[0.2em] hover:border-[#48f0e7]/70 hover:text-[#48f0e7] transition-colors duration-300"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + i * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {tag}
                </motion.span>
              ))}
              <motion.span
                className="w-[34px] h-[34px] border-2 border-[#48f0e7]/40 text-white/80 rounded-full text-sm flex items-center justify-center hover:border-[#48f0e7]/70 hover:text-[#48f0e7] transition-colors duration-300"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                +
              </motion.span>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};
