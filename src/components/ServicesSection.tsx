import {
  motion,
  useInView,
} from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { LineReveal, Magnetic } from "./AnimationComponents";
import { Link, useNavigate } from "react-router-dom";

const services: { number: string; title: string; description: string; tags: string[]; slug: string }[] = [
  {
    number: "01",
    title: "AI & Automation",
    description: "Custom AI agents, LLM and RAG solutions, document intelligence, and workflow automation that remove manual work and plug into the tools you already use.",
    tags: ["AI Agents", "LLMs & RAG", "Workflow Automation"],
    slug: "ai-automation",
  },
  {
    number: "02",
    title: "Custom Software Development",
    description: "Web applications, SaaS platforms, mobile apps, client portals, and internal systems - built by one senior team, with full code ownership.",
    tags: ["Web Apps", "SaaS", "Mobile Apps"],
    slug: "custom-software",
  },
  {
    number: "03",
    title: "Systems Integration & Data",
    description: "API integrations, accounting and CRM sync, data pipelines and real-time dashboards that connect your systems and end double entry.",
    tags: ["API Integrations", "Data Pipelines", "Dashboards"],
    slug: "systems-integration",
  },
  {
    number: "04",
    title: "SEO & AI Search Visibility",
    description: "Technical SEO, local SEO, and AI search optimization that put your business at the top of Google - and inside ChatGPT, Perplexity, and AI Overviews answers.",
    tags: ["Technical SEO", "Local SEO", "GEO"],
    slug: "seo",
  },
  {
    number: "05",
    title: "Performance Marketing",
    description: "Google, Meta, LinkedIn, and TikTok ads plus social media - with server-side tracking and landing pages that turn ad spend into qualified leads.",
    tags: ["Google Ads", "Meta Ads", "Social Media"],
    slug: "performance-marketing",
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

        {/* Title + description stacked */}
        <div className="mb-16">
          <div className="overflow-hidden">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl pb-2 font-bold leading-[0.95] tracking-tight max-w-5xl"
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.2,
              }}
            >
              Software Development, AI &amp; Growth Marketing Services
            </motion.h2>
          </div>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mt-6 md:mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Five services from one senior team: software, AI, integrations, SEO and paid ads.
          </motion.p>
        </div>

        {/* Services List with Hover Image Effect */}
        <div className="space-y-0">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              className="group border-t border-border"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
            >
              <Link to={`/services/${service.slug}`} className="block">
                <div className="py-6 md:py-8 flex items-start md:items-center justify-between gap-6">
                  <div className="flex items-start md:items-center gap-6 md:gap-16 flex-1">
                    <span className="text-sm text-muted-foreground group-hover:text-foreground font-medium min-w-[40px] transition-colors duration-300">
                      /{service.number}
                    </span>
                    <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6 flex-1">
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold group-hover:translate-x-7 transition-transform duration-500">
                        {service.title}
                      </h3>
                      <ul className="flex flex-wrap gap-2 lg:ml-auto lg:mr-8" aria-label={`${service.title} services`}>
                        {service.tags.map((tag) => (
                          <li
                            key={tag}
                            className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground group-hover:border-[#00d4aa]/40 group-hover:text-[#00d4aa] transition-colors duration-300"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="w-12 h-12 shrink-0 rounded-full border border-border group-hover:bg-foreground group-hover:border-foreground group-hover:rotate-45 flex items-center justify-center transition-all duration-400">
                    <ArrowUpRight size={20} className="text-foreground group-hover:text-background transition-colors duration-300" />
                  </div>
                </div>

                {/* Expandable description */}
                <div className="max-h-0 group-hover:max-h-[200px] overflow-hidden transition-all duration-500">
                  <p className="text-muted-foreground pb-8 pl-0 md:pl-[104px] max-w-2xl leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Link>
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
        <h3>Custom Software Development, AI Automation and Growth Marketing Services</h3>
        <p>
          Forrof is a custom software development, AI automation and growth marketing agency:
          AI and automation, custom software development, systems integration and data,
          SEO and AI search visibility, and performance marketing.
        </p>
      </div>
    </section>
    </div>
  );
};
