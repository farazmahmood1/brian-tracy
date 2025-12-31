import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import {
  LineReveal,
  Magnetic,
  TextReveal,
} from "@/components/AnimationComponents";
import { useNavigate } from "react-router-dom";
import { projectsData } from "@/data/projects";

const projectFilters = ["All Projects", "Web Development", "Mobile App"];

// Individual Project Card Component
const ProjectCard = ({
  project,
  index,
  isInView,
  onSelectProject,
}: {
  project: (typeof projectsData)[0];
  index: number;
  isInView: boolean;
  onSelectProject: (project: (typeof projectsData)[0]) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });
  const imageY = useTransform(smoothProgress, [0, 1], [50, -50]);
  const imageScale = useTransform(smoothProgress, [0, 1], [0.95, 1.05]);
  const contentY = useTransform(smoothProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={ref}
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1,
        delay: index * 0.2,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onClick={() => {
        navigate(`/project/${project.id}`);
      }}
    >
      <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[16/8]">
        {/* Main Image with Parallax */}
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-fill"
            initial={{ scale: 1.2, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.2 + index * 0.2 }}
          />
        </motion.div>

        {/* Subtle Gradient Overlay */}
        <motion.div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
      </div>

      {/* Project Info Below Image */}
      <div className="space-y-2">
        {/* Category Tags */}
        <motion.div
          className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 + index * 0.2 }}
        >
          {project.tags.slice(0, 3).map((tag, tagIndex) => (
            <span key={tag}>
              {tag}
              {tagIndex < Math.min(project.tags.length, 3) - 1 && (
                <span className="ml-2">/</span>
              )}
            </span>
          ))}
        </motion.div>

        {/* Title with Arrow */}
        <div className="flex items-center gap-3">
          <motion.h3
            className="text-2xl md:text-3xl font-semibold text-primary group-hover:text-primary/80 transition-colors"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
          >
            {project.title}
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            whileHover={{ rotate: 45 }}
            transition={{ delay: 0.5 + index * 0.2 }}
          >
            <ArrowUpRight className="text-primary" size={24} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  // Removed selectedProject state and modal logic
  const [activeFilter, setActiveFilter] = useState("All Projects");
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });
  const backgroundY = useTransform(smoothProgress, [0, 1], [0, -200]);
  const backgroundScale = useTransform(smoothProgress, [0, 1], [1, 1.2]);
  const counterScale = useTransform(smoothProgress, [0, 0.3], [0.8, 1]);

  const filteredProjects =
    activeFilter === "All Projects"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  return (
    <>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Hero Section */}
        <motion.section
          className="relative h-[70vh] min-h-[500px] overflow-hidden flex items-end section-padding pb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Floating particles */}
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-foreground/20 pointer-events-none z-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: 2 + Math.random() * 4,
                height: 2 + Math.random() * 4,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Parallax Background Image */}
          <motion.div
            className="absolute inset-0"
            style={{ scale: backgroundScale, opacity: 0.7 }}
          >
            <img
              src={projectsData[0].image}
              alt="Portfolio Hero"
              className="w-full h-full object-cover scale-105 blur-[2px] brightness-75"
            />
          </motion.div>

          {/* Animated Gradient Overlay */}
          <motion.div
            className="absolute inset-0 z-10"
            style={{ opacity: 0.85 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
          </motion.div>

          {/* Hero Content */}
          <motion.div className="absolute inset-0 z-20 section-padding pb-20 pt-40 max-md:pt-52">
            <div className="max-w-[1800px] mx-auto w-full">
              <div className="overflow-hidden mb-6">
                <motion.h1
                  className="text-[12vw] md:text-[10vw] font-bold leading-[0.9] tracking-tighter"
                  initial={{ y: "120%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1.2,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: 0.4,
                  }}
                >
                  Our Creative Portfolio
                </motion.h1>
              </div>
              <motion.p
                className="text-lg md:text-2xl text-muted-foreground max-w-2xl mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Explore our finest work across branding, design, and digital
                solutions
              </motion.p>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div
              className="flex flex-col items-center gap-2"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span className="text-xs text-muted-foreground tracking-widest uppercase">
                Scroll
              </span>
              <motion.div
                className="w-px h-12 bg-gradient-to-b from-foreground to-transparent"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                style={{ transformOrigin: "top" }}
              />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Stats and Filters Section */}
        <section className="section-padding py-40 relative">
          <motion.div
            className="max-w-[1800px] mx-auto"
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="grid lg:grid-cols-2 gap-16 mb-20">
              {/* Big Number Counter */}
              <motion.div
                style={{ scale: counterScale }}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <motion.span
                  className="text-[12rem] md:text-[16rem] font-bold leading-none tracking-tighter block"
                  initial={{ y: 100, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{
                    duration: 1.2,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: 0.4,
                  }}
                >
                  {filteredProjects.length.toString().padStart(2, "0")}
                </motion.span>
              </motion.div>

              {/* Filter Tags */}
              <motion.div
                className="flex flex-wrap gap-4 items-end content-end"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
              >
                {projectFilters.map((filter, index) => (
                  <Magnetic key={filter} strength={0.1}>
                    <motion.button
                      className={`px-5 py-3 border rounded-full text-sm transition-all duration-500 ${
                        activeFilter === filter
                          ? "bg-foreground text-background border-foreground"
                          : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                      }`}
                      onClick={() =>
                        setActiveFilter(
                          activeFilter === filter ? "All Projects" : filter
                        )
                      }
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {filter}
                    </motion.button>
                  </Magnetic>
                ))}
              </motion.div>
            </div>

            {/* Projects Grid - 2 per row */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
              layout
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  isInView={isInView}
                  onSelectProject={() => {}}
                />
              ))}
            </motion.div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-xl text-muted-foreground">
                  No projects found in this category.
                </p>
              </motion.div>
            )}
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="section-padding py-20 border-t border-border">
          <motion.div
            className="max-w-[1800px] mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to start your project?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's create something amazing together. Get in touch with our
              team today.
            </p>
            <Magnetic strength={0.15}>
              <motion.a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/contact");
                }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-80 transition-opacity"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start a Project
                <ArrowUpRight size={18} />
              </motion.a>
            </Magnetic>
          </motion.div>
        </section>
      </div>

      {/* Project Modal removed, now using route navigation */}
    </>
  );
};

export default ProjectsPage;
