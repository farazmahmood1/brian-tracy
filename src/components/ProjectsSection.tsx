import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  LineReveal,
  Magnetic,
} from "./AnimationComponents";
import { useNavigate } from "react-router-dom";
import { projectsData } from "@/data/projects";

const projectFilters = ["All Projects", "Web Development", "Mobile App", "SaaS"];

const countryMap: Record<string, string> = {
  "Global": "un",
  "USA": "us",
  "US": "us",
  "UK": "gb",
  "United Kingdom": "gb",
  "Canada": "ca",
  "Australia": "au",
  "Germany": "de",
  "France": "fr",
  "Netherlands": "nl",
  "Dubai": "ae",
  "UAE": "ae",
  "Saudi Arabia": "sa",
  "India": "in",
  "Pakistan": "pk",
  "Singapore": "sg",
  "Japan": "jp",
  "South Korea": "kr",
  "Brazil": "br",
  "Miami": "us",
  "New York": "us",
  "London": "gb",
  "Berlin": "de",
  "Toronto": "ca",
  "Sydney": "au",
};

const getCountryCode = (location: string): string =>
  countryMap[location] || "un";

export const ProjectsSection = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredProjects = useMemo(() =>
    activeFilter === "All Projects" || !activeFilter
      ? projectsData.slice(0, 4)
      : projectsData.filter((p) => p.category === activeFilter).slice(0, 4),
    [activeFilter]
  );

  return (
    <section
      id="projects"
      className="section-padding md:py-20 py-20 relative overflow-hidden"
      ref={containerRef}
      data-no-cursor-light
      style={{ background: "#000000" }}
    >
      <div className="max-w-[1800px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-12"
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

        {/* Title Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="overflow-hidden">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl pb-2 font-bold leading-[0.95]"
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            >
              Customer Stories at Forrof
            </motion.h2>
          </div>
          <motion.div
            className="flex flex-col justify-end gap-6"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <p className="text-xl text-muted-foreground max-w-md leading-relaxed">
              See how we help companies and innovators turn ideas into scalable products and technology.
            </p>
            {/* Filter Tags */}
            <div className="flex flex-wrap gap-3">
              {projectFilters.map((filter, index) => (
                <Magnetic key={filter} strength={0.1}>
                  <motion.button
                    className={`px-5 py-2.5 border rounded-full text-sm transition-all duration-500 ${activeFilter === filter
                      ? "bg-foreground text-background border-foreground"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                      }`}
                    onClick={() =>
                      setActiveFilter(activeFilter === filter ? null : filter)
                    }
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 + index * 0.08 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {filter}
                  </motion.button>
                </Magnetic>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Projects Grid */}
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
              onClick={() => navigate(`/project/${project.id}`)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[16/8]">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-fill"
                  />
                </motion.div>
                <motion.div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
              </div>

              {/* Project Info */}
              <div className="space-y-3">
                {/* Tags as green bordered pills */}
                <div className="flex items-center gap-2 flex-wrap">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 border border-[#48f0e7]/40 text-white/80 rounded-full text-[10px] uppercase tracking-[0.15em]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title with Arrow */}
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl md:text-3xl font-semibold text-primary group-hover:text-primary/80 transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="text-[#00d4aa] group-hover:rotate-45 transition-transform duration-300" size={22} />
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                  {project.overview}
                </p>

                {/* Flag + Date */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground/60 pt-1">
                  {project.location && (
                    <span className="flex items-center gap-1.5">
                      <img
                        src={`https://flagcdn.com/16x12/${getCountryCode(project.location)}.png`}
                        alt={project.location}
                        width={16}
                        height={12}
                        className="rounded-sm"
                      />
                      {project.location}
                    </span>
                  )}
                  {project.date && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                      <span>{project.date}</span>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
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
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-white overflow-hidden relative group"
              style={{ background: "linear-gradient(135deg, #126b66, #00d4aa)" }}
              whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(72, 240, 231, 0.5), 0 0 40px rgba(72, 240, 231, 0.25), 0 0 60px rgba(72, 240, 231, 0.1)" }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 font-medium">All Projects</span>
              <ArrowUpRight size={18} className="relative z-10" />
            </motion.a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
};
