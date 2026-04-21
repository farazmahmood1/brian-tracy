import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { LineReveal, Magnetic } from "@/components/AnimationComponents";
import { useNavigate } from "react-router-dom";
import { projectsData } from "@/data/projects";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const projectFilters = [
  "All Projects",
  "Web Development",
  "Mobile App",
  "SaaS",
];

const countryMap: Record<string, string> = {
  "Global": "un", "USA": "us", "US": "us", "UK": "gb", "United Kingdom": "gb",
  "Canada": "ca", "Australia": "au", "Germany": "de", "France": "fr",
  "Netherlands": "nl", "Dubai": "ae", "UAE": "ae", "Saudi Arabia": "sa",
  "India": "in", "Pakistan": "pk", "Singapore": "sg", "Japan": "jp",
  "South Korea": "kr", "Brazil": "br", "Miami": "us", "New York": "us",
  "London": "gb", "Berlin": "de", "Toronto": "ca", "Sydney": "au",
};

const getCountryCode = (location: string): string => countryMap[location] || "un";

const ProjectCard = ({
  project,
}: {
  project: (typeof projectsData)[0];
  index: number;
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="group cursor-pointer"
      onClick={() => navigate(`/project/${project.id}`)}
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[16/10] bg-foreground/5">
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
      </div>

      {/* Project Info */}
      <div className="space-y-3">
        {/* Tags */}
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
    </div>
  );
};

const ProjectsPage = () => {
  const navigate = useNavigate();
  const filterRef = useRef<HTMLDivElement>(null);
  const filterInView = useInView(filterRef, { once: true, margin: "-50px" });

  usePageMetadata({
    title: "Projects – Forrof",
    description:
      "Explore our finest work across branding, design, and digital solutions. See how we help businesses grow with premium web experiences.",
  });

  const [activeFilter, setActiveFilter] = useState("All Projects");

  const filteredProjects =
    activeFilter === "All Projects"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-end section-padding pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-60"
            style={{ background: "rgba(0, 212, 170, 0.08)" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background z-10" />

        <div className="relative z-20 max-w-[1800px] mx-auto w-full">
          <motion.span
            className="inline-block text-xs uppercase tracking-[0.3em] mb-8"
            style={{ color: "#00d4aa" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Our Work
          </motion.span>
          <div className="overflow-hidden mb-6">
            <motion.h1
              className="text-[13vw] md:text-[10vw] font-bold leading-[0.88] tracking-tighter"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #48f0e7 30%, #00d4aa 60%, #126b66 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                backgroundSize: "200% 200%",
              }}
              initial={{ y: "110%", backgroundPosition: "0% 50%" }}
              animate={{ y: 0, backgroundPosition: "100% 50%" }}
              transition={{
                y: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 },
                backgroundPosition: { duration: 3, ease: "easeInOut", delay: 1, repeat: Infinity, repeatType: "reverse" },
              }}
            >
              Our Portfolio
            </motion.h1>
          </div>
          <motion.p
            className="text-lg md:text-2xl max-w-xl leading-relaxed mt-10"
            style={{ color: "#48f0e7" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Explore our finest work across branding, design, and digital
            solutions.
          </motion.p>
        </div>
      </section>

      {/* Filter + Projects */}
      <section className="section-padding pb-24 relative">
        <div className="max-w-[1800px] mx-auto">
          {/* Filters */}
          <motion.div
            ref={filterRef}
            className="flex flex-wrap gap-3 mb-16 sticky top-20 z-30 py-4 -mx-2 px-2"
            style={{
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            {projectFilters.map((filter, index) => (
              <Magnetic key={filter} strength={0.1}>
                <motion.button
                  className={`px-5 py-2.5 border rounded-full text-sm transition-all duration-300 ${
                    activeFilter === filter
                      ? "bg-foreground text-background border-foreground"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                  }`}
                  onClick={() =>
                    setActiveFilter(
                      activeFilter === filter ? "All Projects" : filter
                    )
                  }
                  initial={{ opacity: 0, y: 15 }}
                  animate={filterInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + index * 0.06 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {filter}
                  {activeFilter === "All Projects" && filter === "All Projects"
                    ? ` (${projectsData.length})`
                    : filter !== "All Projects"
                    ? ` (${
                        projectsData.filter((p) => p.category === filter).length
                      })`
                    : ` (${projectsData.length})`}
                </motion.button>
              </Magnetic>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 lg:gap-x-12 lg:gap-y-20"
            layout
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-xl text-muted-foreground">
                No projects found in this category.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-forced-light section-padding py-20">
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
            Let's create something amazing together. Get in touch with our team
            today.
          </p>
          <Magnetic strength={0.15}>
            <motion.a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                navigate("/contact");
              }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-white overflow-hidden relative group"
              style={{
                background: "linear-gradient(135deg, #126b66, #00d4aa)",
              }}
              whileHover={{
                scale: 1.03,
                boxShadow:
                  "0 0 20px rgba(72, 240, 231, 0.5), 0 0 40px rgba(72, 240, 231, 0.25)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 font-medium">
                Start a Project
              </span>
              <ArrowUpRight size={18} className="relative z-10" />
            </motion.a>
          </Magnetic>
        </motion.div>
      </section>
    </div>
  );
};

export default ProjectsPage;
