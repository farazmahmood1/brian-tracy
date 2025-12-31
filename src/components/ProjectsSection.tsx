import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  LineReveal,
  Magnetic,
  ImageReveal,
  ScaleReveal,
} from "./AnimationComponents";
import { useNavigate } from "react-router-dom";
import { projectsData } from "@/data/projects";

const projectFilters = ["All Projects", "Web Development", "Mobile App"];

export const ProjectsSection = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });
  const backgroundY = useTransform(smoothProgress, [0, 1], [0, -150]);
  const counterScale = useTransform(smoothProgress, [0, 0.3], [0.8, 1]);

  // Filter projects based on active filter, limit to 4 for main page
  const filteredProjects =
    activeFilter === "All Projects" || !activeFilter
      ? projectsData.slice(0, 4)
      : projectsData.filter((p) => p.category === activeFilter).slice(0, 4);

  return (
    <section
      id="projects"
      className="section-padding md:py-40 py-20 relative overflow-hidden"
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
          <motion.span className="number-label">/03</motion.span>
          <LineReveal className="h-px bg-border flex-1" delay={0.3} />
          <motion.span className="text-xs text-muted-foreground uppercase tracking-widest">
            Projects
          </motion.span>
        </motion.div>

        {/* Stats and Filters */}
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
              {projectsData.length.toString().padStart(2, "0")}
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
                    setActiveFilter(activeFilter === filter ? null : filter)
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

        {/* Projects Grid with Staggered Animation - 2 per row, 2 rows */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 80 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1,
                delay: 0.5 + index * 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              onClick={() => {
                navigate(`/project/${project.id}`);
              }}
            >
              {/* Image Container - Landscape */}
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
                    transition={{ duration: 1.5, delay: 0.6 + index * 0.2 }}
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
                  transition={{ delay: 0.8 + index * 0.2 }}
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
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.2 }}
                  >
                    {project.title}
                  </motion.h3>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    whileHover={{ rotate: 45 }}
                    transition={{ delay: 0.9 + index * 0.2 }}
                  >
                    <ArrowUpRight className="text-primary" size={24} />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button with Animated Border */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
        >
          <Magnetic strength={0.15}>
            <motion.a
              href="/projects"
              onClick={(e) => {
                e.preventDefault();
                navigate("/projects");
              }}
              className="inline-flex items-center gap-3 px-10 py-5 border border-border rounded-full overflow-hidden relative group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                className="absolute inset-0 bg-foreground"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              />
              <span className="relative z-10 font-medium  transition-colors duration-300">
                All Projects
              </span>
              <ArrowUpRight
                size={18}
                className="relative z-10 transition-colors duration-300"
              />
            </motion.a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
};
