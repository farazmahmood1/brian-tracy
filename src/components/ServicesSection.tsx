import {
  motion,
  useInView,
} from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { LineReveal, Magnetic } from "./AnimationComponents";
import { useNavigate } from "react-router-dom";

const services = [
  {
    number: "01",
    title: "AI/ML Development",
    description: "Real‑world AI systems — from document intelligence to custom agents and workflows — integrated directly into your business.",
    image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&q=80",
    slug: "ai-ml",
  },
  {
    number: "02",
    title: "Enterprise Software",
    description: "Intelligent internal platforms, dashboards, and automation systems that streamline operations and unlock growth at scale.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
    slug: "enterprise",
  },
  {
    number: "03",
    title: "SaaS Development",
    description: "Revenue‑ready AI products and SaaS platforms engineered for speed, security, and effortless scalability from day one.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80",
    slug: "saas",
  },
  {
    number: "04",
    title: "MVP & POC Development",
    description: "From idea to production‑grade platform — lean MVPs and prototypes that prove your concept and attract investors fast.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    slug: "mvp",
  },
  {
    number: "05",
    title: "Product Architecture & Technical Strategy",
    description: "System design, AI strategy, and engineering direction that reduces risk and enables smarter decisions at every stage.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80",
    slug: "strategy",
  },
];

export const ServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const navigate = useNavigate();

  return (
    <div className="px-4 md:px-6 lg:px-8 pb-4 md:pb-6 lg:pb-8" style={{ backgroundColor: "#ffffff" }}>
    <section
      id="services"
      className="section-forced-dark section-padding pt-16 md:pt-20 pb-20 md:pb-24 overflow-hidden relative z-10 rounded-[1.5rem] md:rounded-[2rem]"
      style={{ boxShadow: "0 4px 30px rgba(0,0,0,0.12), 0 0 0 1px rgba(6,219,207,0.08)" }}
      ref={containerRef}
    >


      <div className="max-w-[1800px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.span
            className="number-label"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            /02
          </motion.span>
          <LineReveal className="h-px bg-border flex-1" delay={0.4} />
          <motion.span
            className="text-xs text-muted-foreground uppercase tracking-widest"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            Services
          </motion.span>
        </motion.div>

        {/* Title Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="overflow-hidden">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl pb-2 font-bold leading-[0.95]"
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.2,
              }}
            >
              Tech Solutions for Companies
            </motion.h2>
          </div>
          <motion.div
            className="flex items-end"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <p className="text-xl text-muted-foreground max-w-md leading-relaxed">
              We partner with founders and growing teams to build AI‑powered products, intelligent systems, and scalable software platforms.
            </p>
          </motion.div>
        </div>

        {/* Services List with Hover Image Effect */}
        <div className="space-y-0">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              className="group border-t border-border cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              onClick={() => navigate(`/services/${service.slug}`)}
            >
              <div className="py-6 md:py-8 flex items-start md:items-center justify-between gap-6">
                <div className="flex items-start md:items-center gap-6 md:gap-16 flex-1">
                  <span className="text-sm text-muted-foreground group-hover:text-foreground font-medium min-w-[40px] transition-colors duration-300">
                    /{service.number}
                  </span>
                  <div className="md:overflow-visible">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold group-hover:translate-x-7 transition-transform duration-500">
                      {service.title}
                    </h3>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full border border-border group-hover:bg-foreground group-hover:border-foreground group-hover:rotate-45 flex items-center justify-center transition-all duration-400">
                  <ArrowUpRight size={20} className="text-foreground group-hover:text-background transition-colors duration-300" />
                </div>
              </div>

              {/* Expandable description */}
              <div className="max-h-0 group-hover:max-h-[200px] overflow-hidden transition-all duration-500">
                <p className="text-muted-foreground pb-8 pl-0 md:pl-[104px] max-w-2xl leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
          <motion.div
            className="border-t border-border"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: 1 }}
            style={{ transformOrigin: "left" }}
          />
        </div>

        {/* CTA */}
        <motion.div
          className="flex justify-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Magnetic>
            <motion.button
              onClick={() => navigate("/services")}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-white overflow-hidden relative group font-medium"
              style={{ background: "linear-gradient(135deg, #126b66, #00d4aa)" }}
              whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(72, 240, 231, 0.4)" }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 font-medium">Explore All Services</span>
              <ArrowUpRight size={18} className="relative z-10" />
            </motion.button>
          </Magnetic>
        </motion.div>
      </div>

      {/* SEO description */}
      <div className="sr-only">
        <h3>Our Software and Digital Services</h3>
        <p>
          Forrof is a full service software agency providing branding, UI UX design,
          web development, SaaS development, SEO, digital marketing, cloud solutions,
          automation, cybersecurity, and digital transformation services for startups
          and growing businesses.
        </p>
      </div>
    </section>
    </div>
  );
};
