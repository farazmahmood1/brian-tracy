import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  LineReveal,
  Magnetic,
} from "@/components/AnimationComponents";
import { useNavigate } from "react-router-dom";
import { projectsData } from "@/data/projects";
import { usePageMetadata } from "@/hooks/usePageMetadata";

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
            loading="lazy"
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
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // SEO Meta Tags
  usePageMetadata({
    title: "Projects – Forrof",
    description: "Explore our finest work across branding, design, and digital solutions. See how we help businesses grow with premium web experiences.",
  });

  const [activeFilter, setActiveFilter] = useState("All Projects");
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });
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
          ref={heroRef}
          className="relative min-h-screen flex items-end section-padding pb-24 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Animated glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute top-[calc(50%-350px)] right-0 w-[700px] h-[700px] bg-accent/20 rounded-full blur-[130px]"
              animate={{ x: [0, -60, 20, -40, 0], y: [0, 60, -40, 30, 0], opacity: [0.6, 1, 0.4, 0.9, 0.6] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]"
              animate={{ x: [0, 40, 0], y: [0, -40, 0], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background z-10" />

          <motion.div className="relative z-20 max-w-[1800px] mx-auto w-full" style={{ y: heroY, opacity: heroOpacity }}>
            <motion.span
              className="inline-block text-xs text-muted-foreground uppercase tracking-[0.3em] mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Our work
            </motion.span>
            <div className="overflow-hidden mb-6">
              <motion.h1
                className="text-[13vw] md:text-[10vw] font-bold leading-[0.88] tracking-tighter"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
              >
                Our Portfolio
              </motion.h1>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-10">
              <motion.p
                className="text-lg md:text-2xl text-muted-foreground max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Explore our finest work across branding, design, and digital solutions.
              </motion.p>
              <motion.div
                className="flex gap-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {[
                  { n: "150+", label: "Projects Shipped" },
                  { n: "50+", label: "Happy Clients" },
                  { n: "98%", label: "Satisfaction Rate" },
                ].map((s) => (
                  <div key={s.label}>
                    <span className="text-4xl md:text-5xl font-bold block leading-none mb-1">{s.n}</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* Stats and Filters Section */}
        <section className="section-padding py-20 relative">


          <motion.div
            className="max-w-[1800px] mx-auto"
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >


            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute top-[calc(50%-350px)] right-0 w-[700px] h-[700px] bg-accent/20 rounded-full blur-[130px]"
                animate={{
                  x: [0, -60, 20, -40, 0],
                  y: [0, 60, -40, 30, 0],
                  opacity: [0.6, 1, 0.4, 0.9, 0.6],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px]"
                animate={{
                  x: [0, -60, 0],
                  y: [0, 80, 0],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 w-80 h-80 bg-secondary-foreground rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
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
                  {/* {filteredProjects.length.toString().padStart(2, "0")} */}
                  150+
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
                      className={`px-5 py-3 border rounded-full text-sm transition-all duration-500 ${activeFilter === filter
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
                  onSelectProject={() => { }}
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
        <section className="section-padding py-20" >
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
