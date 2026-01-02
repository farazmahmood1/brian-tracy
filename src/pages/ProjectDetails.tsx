import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { WarpTransition, WarpMode } from "@/components/WarpTransition";
import {
  ExternalLink,
  ArrowUpRight,
  Search,
  Briefcase,
  Lock,
  Atom,
  Server,
  Wind,
  Database,
  PenTool,
  Smartphone,
  Code2,
  Flame,
  CreditCard,
  Map,
  Cpu,
  Cloud,
  Gamepad2,
  Layers,
  Globe,
  Zap,
  Rocket,
  Layers as LayersIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Magnetic } from "@/components/AnimationComponents";

// Icon mapping for tech stack
const techIcons: Record<string, React.ElementType> = {
  "React": Atom,
  "React Native": Smartphone,
  "Node.js": Server,
  "Express": Server,
  "Next.js": Cpu,
  "TypeScript": Code2,
  "JavaScript": Code2,
  "Tailwind CSS": Wind,
  "Framer Motion": LayersIcon,
  "PostgreSQL": Database,
  "MongoDB": Database,
  "GraphQL": Globe,
  "Firebase": Flame,
  "AWS": Cloud,
  "Stripe": CreditCard,
  "Mapbox": Map,
  "Unity": Gamepad2,
  "Figma": PenTool,
  "Encryption Libraries": Lock,
  "SAAS": Cloud, // Fallback
};
import { projectsData } from "@/data/projects";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const nextProjectRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const [warpMode, setWarpMode] = useState<WarpMode>("idle");
  const [chargeProgress, setChargeProgress] = useState(0);
  const [responsiveIndex, setResponsiveIndex] = useState(0);
  const isHolding = useRef(false);
  const holdInterval = useRef<NodeJS.Timeout>();

  const project = projectsData.find((p) => p.id === id);
  const projectIndex = projectsData.findIndex((p) => p.id === id);
  const nextProject = projectsData[
    (projectsData.findIndex((p) => p.id === id) + 1) % projectsData.length
  ];

  // Check for entry warp
  useEffect(() => {
    if (location.state?.warped) {
      setWarpMode("warping_in");
      // Reset to idle after animation
      const timer = setTimeout(() => {
        setWarpMode("idle");
        // Clear history state so reload doesn't re-trigger?
        // Or just leave it.
        navigate(location.pathname, { replace: true, state: {} });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [location.state, location.pathname, navigate]);

  // Handle Dynamic Meta Tags
  useEffect(() => {
    if (project) {
      // Update Title
      const originalTitle = document.title;
      if (project.metaTitle) {
        document.title = project.metaTitle;
      } else {
        document.title = `${project.title} | Case Study – Forrof`;
      }

      // Update Description
      const metaDescription = document.querySelector('meta[name="description"]');
      const originalDescription = metaDescription?.getAttribute("content");

      if (metaDescription && project.metaDescription) {
        metaDescription.setAttribute("content", project.metaDescription);
      }

      return () => {
        // Restore original tags if needed, or let other pages handle it
        document.title = originalTitle;
        if (metaDescription && originalDescription) {
          metaDescription.setAttribute("content", originalDescription);
        }
      };
    }
  }, [project]);



  const fxAudioRef = useRef<HTMLAudioElement | null>(null);
  const wasPlayingRef = useRef(false); // Track if BG music was playing

  useEffect(() => {
    fxAudioRef.current = new Audio("https://dev.gemseeroo.com/fx-light-90387.mp3");
    fxAudioRef.current.volume = 1.0;
    return () => {
      if (fxAudioRef.current) {
        fxAudioRef.current.pause();
        fxAudioRef.current = null;
      }
    };
  }, []);

  const startHold = () => {
    if (warpMode !== "idle") return; // Don't allow if already warping
    isHolding.current = true;
    setWarpMode("charging");

    window.dispatchEvent(new Event("music:pause"));

    if (fxAudioRef.current) {
      fxAudioRef.current.currentTime = 0;
      fxAudioRef.current.volume = 1.0;
      fxAudioRef.current.play().catch(console.error);
    }

    // Increment progress
    holdInterval.current = setInterval(() => {
      setChargeProgress(prev => {
        if (prev >= 100) {
          finishWarp();
          return 100;
        }
        return prev + 2;
      });
    }, 20);
  };

  const endHold = () => {
    isHolding.current = false;
    if (holdInterval.current) clearInterval(holdInterval.current);

    // If not complete, decay progress and fade out sound
    if (chargeProgress < 100 && warpMode !== "warping_out") {
      setWarpMode("idle");

      // Fade out FX
      if (fxAudioRef.current) {
        const fadeOut = setInterval(() => {
          if (fxAudioRef.current && fxAudioRef.current.volume > 0.1) {
            fxAudioRef.current.volume -= 0.1;
          } else {
            clearInterval(fadeOut);
            if (fxAudioRef.current) {
              fxAudioRef.current.pause();
              fxAudioRef.current.currentTime = 0;
            }
            // Resume BG music after fade out? Or immediately?
            // User said "if I unhold... decrease the sound... slowly".
            // "until fx-light sound is completed" applied to the pause.
            // So we should resume BG music now.
            window.dispatchEvent(new Event("music:resume"));
          }
        }, 100);
      } else {
        window.dispatchEvent(new Event("music:resume"));
      }

      const decay = setInterval(() => {
        setChargeProgress(prev => {
          if (prev <= 0) {
            clearInterval(decay);
            return 0;
          }
          return prev - 5;
        });
      }, 20);
    }
  };

  const finishWarp = () => {
    if (holdInterval.current) clearInterval(holdInterval.current);
    setWarpMode("warping_out");

    // Wait for animation then navigate
    // FX sound continues playing until it ends naturally
    setTimeout(() => {
      if (nextProject) {
        navigate(`/project/${nextProject.id}`, { state: { warped: true } });
        setChargeProgress(0);
        // Resume BG music when we leave? Or maybe on the next page?
        // Navigation might unmount us.
        // If we want music to resume, we should do it here or in the cleanup.
        window.dispatchEvent(new Event("music:resume"));
      }
    }, 2500); // 2.5s warp duration
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link
            to="/projects"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Projects
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-background text-foreground min-h-screen">
      {/* Warp Transition Overlay */}
      <WarpTransition mode={warpMode} chargeProgress={chargeProgress} />

      {/* Hero Section - Clean like MDX */}
      <section className="px-6 pt-44 pb-20  space-y-12">
        {/* Title - Large and centered */}
        <div className="overflow-hidden">
          <motion.h1
            className="text-[14vw] md:text-[12vw] lg:text-[10vw] font-bold leading-[0.9] tracking-tighter text-center pb-7"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {project.title}
          </motion.h1>
        </div>

        {/* Tags - Top */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {project.tags.map((tag, index) => (
            <motion.span
              key={tag}
              className="px-6 py-3 border border-border rounded-full text-[10px] md:text-base uppercase tracking-[0.15em] font-extralight text-muted-foreground"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* Hero Image - Full width */}
      <motion.section
        className="px-6 md:px-12 lg:px-20 pb-20"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <div className="max-w-[1600px] mx-auto">
          <div className="relative w-full aspect-[16/8] rounded-2xl overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6 }}
              loading="lazy"
            />
          </div>
        </div>
      </motion.section>

      {/* Project Overview */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-40">
        <div className="max-w-[1600px] mx-auto">
          <div className="">
            {/* Overview Text */}
            <motion.div
              className="lg:col-span-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="text-3xl uppercase tracking-[0.2em] text-muted-foreground mb-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Project overview
              </motion.h2>
              <motion.p
                className="text-xl md:text-3xl lg:text-4xl leading-[1.4] font-light"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {project.overview}
              </motion.p>
            </motion.div>

            {/* Metadata */}
            <motion.div
              className="mt-6 flex  gap-12 flex-wrap"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="">
                <span className="text-lg uppercase tracking-[0.2em] text-muted-foreground mr-3">
                  Date
                </span>
                <span className="text-lg font-light">{project.date}</span>
              </div>
              <div>
                <span className="text-lg uppercase tracking-[0.2em] text-muted-foreground mr-3">
                  Location
                </span>
                <span className="text-lg font-light">{project.location}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="px-6 md:px-12 lg:px-20 py-8 md:py-12">
        <div className="max-w-[1600px] mx-auto">
          {/* Section Header with Blob Effect */}
          <div className="relative mb-20">
            {/* Blob Background */}
            <div className="absolute -top-20 -left-40 w-96 h-96 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-3xl opacity-40 pointer-events-none" />
            <div className="absolute -top-10 -right-32 w-80 h-80 bg-gradient-to-l from-primary/15 to-transparent rounded-full blur-3xl opacity-30 pointer-events-none" />

            <motion.h2
              className="text-5xl md:text-7xl lg:text-9xl text-center font-bold mb-20 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Design process
            </motion.h2>
          </div>

          {/* Process Cards */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {project.designProcess.map((phase, index) => {
              const icons = [Search, Briefcase, Lock];
              const IconComponent = icons[index];

              return (
                <motion.div
                  key={phase.phase}
                  className="relative rounded-3xl bg-card border border-border/30 overflow-hidden min-h-[320px] flex flex-col"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                >
                  {/* Animated Blob Background */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {/* Primary light gray blob - bottom left */}
                    <motion.div
                      className="absolute bottom-0 left-0 w-[280px] h-[280px] rounded-full blur-[80px]"
                      style={{
                        background: `
    radial-gradient(
      circle,
      hsl(220 5% 9% / 0.25) 0%,
      hsl(220 5% 7% / 0.18) 30%,
      transparent 75%
    )
  `,
                      }}
                      animate={{
                        x: [0, 30, 0],
                        y: [0, -20, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 8 + index * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    {/* Secondary warm gray blob - center */}
                    <motion.div
                      className="absolute bottom-10 left-1/4 w-[200px] h-[200px] rounded-full blur-[60px]"
                      style={{
                        background:
                          "radial-gradient(circle, hsl(30 25% 82% / 0.7) 0%, hsl(25 15% 85% / 0.4) 60%, transparent 80%)",
                      }}
                      animate={{
                        x: [0, -20, 0],
                        y: [0, 15, 0],
                        scale: [0.9, 1.05, 0.9],
                      }}
                      transition={{
                        duration: 10 + index * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    {/* Subtle accent blob - top area */}
                    <motion.div
                      className="absolute top-20 right-10 w-[120px] h-[120px] rounded-full blur-[50px]"
                      style={{
                        background:
                          "radial-gradient(circle, hsl(0 0% 90% / 0.5) 0%, transparent 70%)",
                      }}
                      animate={{
                        x: [0, 15, 0],
                        y: [0, 10, 0],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 6 + index * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 p-8 flex flex-col h-full">
                    {/* Icon and Hours - Top Row */}
                    <div className="flex items-center justify-between mb-auto">
                      <motion.div
                        className="flex-shrink-0 w-12 h-12 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.1 }}
                      >
                        <IconComponent
                          size={20}
                          className="text-muted-foreground"
                        />
                      </motion.div>
                      <motion.div
                        className="text-sm font-medium text-muted-foreground"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.15 }}
                      >
                        {phase.hours}
                      </motion.div>
                    </div>

                    {/* Phase Name - Large Title */}
                    <h3 className="text-3xl md:text-4xl font-semibold mb-6 mt-8">
                      {phase.phase}
                    </h3>

                    {/* Tasks - As badges */}
                    <div className="flex flex-wrap gap-2">
                      {phase.tasks.map((task, taskIndex) => (
                        <motion.div
                          key={task}
                          className="px-4 py-2 border border-border/40 bg-background/40 backdrop-blur-sm rounded-full text-xs text-muted-foreground font-light hover:bg-background/60 transition-colors"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: index * 0.15 + taskIndex * 0.08 + 0.2,
                          }}
                        >
                          {task}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Initial Concepts - Marquee Style */}
      <section className="py-24 md:py-40 overflow-hidden">
        <div className="md:ml-28 max-md:text-center max-md:px-4">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Initial concepts
            </h2>
          </motion.div>
        </div>

        {/* Marquee Row 1 - Left to Right */}
        <div className="relative mb-6">
          <motion.div
            className="flex gap-6"
            animate={{ x: [0, -1920] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {[...project.concepts, ...project.concepts].map(
              (concept, index) => (
                <motion.div
                  key={index}
                  className="relative shrink-0 w-[300px] md:w-[400px] aspect-[16/8] rounded-xl overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={concept}
                    alt={`Concept ${index + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              )
            )}
          </motion.div>
        </div>

        {/* Marquee Row 2 - Right to Left */}
        <div className="relative">
          <motion.div
            className="flex gap-6"
            animate={{ x: [-1920, 0] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
          >
            {[...project.concepts, ...project.concepts]
              .reverse()
              .map((concept, index) => (
                <motion.div
                  key={index}
                  className="relative shrink-0 w-[300px] md:w-[400px] aspect-[16/8] rounded-xl overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={concept}
                    alt={`Concept ${index + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
          </motion.div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl uppercase tracking-[0.2em] text-muted-foreground mb-12">
              The challenge
            </h2>
            <p className="text-xl md:text-3xl lg:text-4xl leading-[1.4] font-light mb-16">
              {project.challenge}
            </p>

            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 border border-foreground rounded-full text-sm uppercase tracking-[0.15em] font-medium hover:bg-foreground hover:text-background transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Experience
              <ArrowUpRight size={16} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Collage Gallery */}
      <section className=" py-16 md:py-24">
        <div className="w-[100vw]">
          <div className="w-full">
            {project.gallery.map((img, index) => (
              <motion.div
                key={index}
                className="relative w-full aspect-video overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                <motion.img
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsive Showcase */}
      <section className="px-6 md:px-12 lg:px-20 py-24 md:py-40">
        <div className="max-w-[1600px] mx-auto max-md:text-center">
          <motion.h2
            className="text-3xl md:text-5xl uppercase tracking-[0.2em] text-muted-foreground mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Responsive
          </motion.h2>

          {/* Slider Container */}
          <div className="relative overflow-hidden mb-12">
            <motion.div
              className="flex gap-6"
              animate={{
                x: `-${responsiveIndex * (window.innerWidth < 768 ? 216 : 304)}px`, // approximate width + gap (200+16 or 280+24)
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              {(project.responsive ?? []).map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className="relative flex-shrink-0 w-[200px] md:w-[280px] aspect-[9/16] rounded-xl overflow-hidden group"
                >
                  <img
                    src={src}
                    loading="lazy"
                    alt={`Mobile ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4 justify-start">
            <Magnetic strength={0.2}>
              <motion.button
                onClick={() => {
                  setResponsiveIndex((prev) => Math.max(0, prev - 1));
                }}
                disabled={responsiveIndex === 0}
                className="w-14 h-14 rounded-full border border-border flex items-center justify-center group overflow-hidden relative disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.span
                  className="absolute inset-0 bg-foreground"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <ChevronLeft size={20} className="relative z-10 group-hover:text-background transition-colors" />
              </motion.button>
            </Magnetic>
            <Magnetic strength={0.2}>
              <motion.button
                onClick={() => {
                  const maxIndex = (project.responsive?.length || 0) - (window.innerWidth < 768 ? 1 : 3); // Conservative max
                  setResponsiveIndex((prev) =>
                    Math.min((project.responsive?.length || 1) - 1, prev + 1)
                  );
                }}
                disabled={!project.responsive || responsiveIndex >= project.responsive.length - 1} // Simplified check
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
                <ChevronRight size={20} className="relative z-10 group-hover:text-background transition-colors" />
              </motion.button>
            </Magnetic>
          </div>
        </div>
      </section>


      {/* The Impact */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl uppercase tracking-[0.2em] text-muted-foreground mb-12">
              The impact
            </h2>
            <p className="text-xl md:text-3xl lg:text-4xl leading-[1.4] font-light">
              {project.impact}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-6 md:px-12 lg:px-20 pt-16 md:pt-24">
        <div className="max-w-[1600px] mx-auto">
          <motion.h2
            className="text-3xl md:text-5xl uppercase tracking-[0.2em] text-muted-foreground mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Tech stack
          </motion.h2>

          <div className="flex flex-wrap gap-4">
            {project.techStack.map((tech, index) => {
              const Icon = techIcons[tech] || Zap;
              return (
                <motion.div
                  key={tech}
                  className="p-4 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center transition-all duration-300 cursor-default group relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                  title={tech}
                >
                  <Icon className="w-6 h-6 text-white" />
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {tech}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Next Project Interaction Area */}
      <section className="min-h-[50vh] flex flex-col items-center justify-center relative pb-32 mt-[200px]">
        <div className="text-center space-y-8 z-10">
          <h3 className="text-2xl md:text-3xl font-light text-muted-foreground">
            Ready for the next mission?
          </h3>
          <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
            {nextProject.title}
          </h2>

          {/* Hold Button */}
          <div
            className="relative group cursor-pointer w-32 h-32 mx-auto flex items-center justify-center"
            onMouseDown={startHold}
            onMouseUp={endHold}
            onMouseLeave={endHold}
            onTouchStart={startHold}
            onTouchEnd={endHold}
          >
            {/* Ring Progress */}
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64" cy="64" r="60"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                className="text-white/10"
              />
              <circle
                cx="64" cy="64" r="60"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                className="text-white transition-all duration-75" // faster update
                strokeDasharray={2 * Math.PI * 60}
                strokeDashoffset={2 * Math.PI * 60 * (1 - chargeProgress / 100)}
              />
            </svg>

            {/* Inner Button Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <Rocket className={`w-8 h-8 mb-2 transition-transform duration-300 ${chargeProgress > 0 ? 'translate-y-[-4px]' : ''}`} />
              <span className="text-xs font-medium tracking-widest uppercase">
                {chargeProgress >= 100 ? "WARPING..." : "HOLD"}
              </span>
            </div>

            {/* Glow effect */}
            <div
              className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl transition-opacity duration-300"
              style={{ opacity: chargeProgress / 100 }}
            />
          </div>

          <p className="text-sm text-muted-foreground animate-pulse">
            Hold to warp to next project
          </p>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetails;
