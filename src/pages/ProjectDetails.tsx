import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ExternalLink,
  ArrowUpRight,
  Search,
  Briefcase,
  Lock,
} from "lucide-react";
import { projectsData } from "@/data/projects";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const nextProjectRef = useRef<HTMLElement>(null);
  const [hasNavigated, setHasNavigated] = useState(false);
  const [showHoldTight, setShowHoldTight] = useState(false);
  const [progress, setProgress] = useState(0);

  const project = projectsData.find((p) => p.id === id);
  const projectIndex = projectsData.findIndex((p) => p.id === id);
  const nextProject =
    projectsData.length > 0
      ? projectsData[(Math.max(0, projectIndex) + 1) % projectsData.length]
      : undefined;

  // Manual scroll tracking for reliability
  const handleScroll = useCallback(() => {
    if (!nextProjectRef.current) return;

    const section = nextProjectRef.current;
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // When section top reaches viewport bottom = 0%
    // When section top reaches viewport top = 100%
    const sectionTop = rect.top;
    const scrollProgress = Math.max(
      0,
      Math.min(100, ((windowHeight - sectionTop) / windowHeight) * 100)
    );

    setProgress(scrollProgress);

    // Allow re-triggering: once the user scrolls back up, unlock navigation.
    if (scrollProgress <= 5 && hasNavigated) {
      setHasNavigated(false);
      setShowHoldTight(false);
    }

    if (scrollProgress >= 60 && !showHoldTight) {
      setShowHoldTight(true);
    } else if (scrollProgress < 60 && showHoldTight) {
      setShowHoldTight(false);
    }

    if (scrollProgress >= 95 && !hasNavigated && nextProject) {
      setHasNavigated(true);
      setTimeout(() => {
        navigate(`/project/${nextProject.id}`);
      }, 500);
    }
  }, [hasNavigated, showHoldTight, nextProject, navigate, id]);

  // Attach scroll listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Reset state on route change
  useEffect(() => {
    setHasNavigated(false);
    setShowHoldTight(false);
    setProgress(0);
  }, [id]);

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
    <div ref={containerRef} className="bg-background text-foreground">
      {/* Hero Section - Clean like MDX */}
      <section className="px-6 pt-44 pb-20  space-y-12">
        {/* Title - Large and centered */}
        <div className="overflow-hidden">
          <motion.h1
            className="text-[14vw] md:text-[12vw] lg:text-[10vw] font-bold leading-[0.9] tracking-tighter text-center"
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

          {/* Mobile Marquee */}
          <div className="relative overflow-hidden mb-12">
            <style>{`
              @keyframes marquee-mobile { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
              .marquee-mobile-track { display: flex; gap: 1.5rem; will-change: transform; }
            `}</style>

            <div
              className="marquee-mobile-track"
              style={{ animation: "marquee-mobile 25s linear infinite" }}
            >
              {(project.responsive ?? [])
                .concat(project.responsive ?? [])
                .map((src, i) => (
                  <div
                    key={`${src}-${i}`}
                    className="relative flex-shrink-0 w-[200px] md:w-[280px] aspect-[9/16] rounded-xl overflow-hidden group"
                  >
                    <img
                      src={src}
                      alt={`Mobile ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
            </div>
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
            {project.techStack.map((tech, index) => (
              <motion.div
                key={tech}
                className="px-6 py-4 border border-border rounded-full text-sm font-medium hover:bg-foreground hover:text-background transition-all duration-300 cursor-default"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Project Section - Simple scroll progress */}
      <section ref={nextProjectRef} className="h-screen relative">
        <div className="h-full flex flex-col items-center justify-center px-6">
          <div className="relative z-10 text-center max-w-[600px]">
            {/* Next Project Title */}
            <motion.h2
              className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Next project
            </motion.h2>

            {/* Dynamic Text - Changes based on progress */}
            <AnimatePresence mode="wait">
              {showHoldTight ? (
                <motion.p
                  key="hold-tight"
                  className="text-lg text-foreground mb-10 font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  Hold tight, we're taking you to another project ✨
                </motion.p>
              ) : (
                <motion.p
                  key="keep-scrolling"
                  className="text-lg text-muted-foreground mb-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  Keep Scrolling
                </motion.p>
              )}
            </AnimatePresence>

            {/* Progress Bar */}
            <div className="w-full max-w-[400px] h-[2px] bg-border/50 mx-auto overflow-hidden rounded-full">
              <div
                className="h-full bg-foreground origin-left transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Next Project Preview */}
            <motion.div
              className="mt-12 text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-sm uppercase tracking-[0.2em]">
                {nextProject.title}
              </span>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetails;
