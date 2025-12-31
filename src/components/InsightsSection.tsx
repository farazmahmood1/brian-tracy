import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import { LineReveal, Magnetic } from "./AnimationComponents";
import { useNavigate } from "react-router-dom";

const insights = [
  {
    title: "The Future of Brand Identity in a Digital-First World",
    category: "Branding",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
    excerpt:
      "Exploring how digital transformation is reshaping brand identity strategies for modern businesses.",
  },
  {
    title: "Mastering the Art of Micro-Interactions in UI Design",
    category: "UI/UX",
    date: "Dec 10, 2024",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
    excerpt:
      "How subtle animations and micro-interactions can dramatically improve user experience.",
  },
  {
    title: "SEO Trends That Will Dominate 2025",
    category: "Marketing",
    date: "Dec 5, 2024",
    readTime: "10 min read",
    image:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80",
    excerpt:
      "Stay ahead of the curve with these emerging SEO strategies and techniques.",
  },
];

export const InsightsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });
  const headerY = useTransform(smoothProgress, [0, 0.3], [100, 0]);
  const headerOpacity = useTransform(smoothProgress, [0, 0.3], [0, 1]);

  return (
    <section
      className="section-padding md:py-40 py-12 relative overflow-hidden border-t border-border"
      ref={containerRef}
    >
      {/* Floating background elements */}
      <motion.div
        className="absolute top-40 right-0 w-[500px] h-[500px] rounded-full bg-foreground/[0.02] blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <div className="max-w-[1800px] mx-auto relative z-10">
        {/* Header with parallax */}
        <motion.div
          className="flex items-center gap-4 mb-20"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <motion.span className="number-label">/09</motion.span>
          <LineReveal className="h-px bg-border flex-1" delay={0.3} />
          <motion.span className="text-xs text-muted-foreground uppercase tracking-widest">
            Insights
          </motion.span>
        </motion.div>

        {/* Title Grid */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <div className="overflow-hidden">
            <motion.h2
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95]"
              initial={{ y: "120%", rotateX: -45 }}
              animate={isInView ? { y: 0, rotateX: 0 } : {}}
              transition={{
                duration: 1.4,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.2,
              }}
            >
              Latest thoughts & articles
            </motion.h2>
          </div>
          <motion.div
            className="flex items-end"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <p className="text-xl text-muted-foreground max-w-md leading-relaxed">
              Explore our collection of insights, tips, and industry trends to
              help elevate your brand.
            </p>
          </motion.div>
        </div>

        {/* Insights Grid with Advanced Hover Effects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {insights.map((insight, index) => (
            <motion.article
              key={insight.title}
              className="group cursor-pointer"
              data-cursor="Read"
              initial={{ opacity: 0, y: 100, rotateY: -10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{
                duration: 1.2,
                delay: 0.4 + index * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Image Container with Multiple Layers */}
              <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/3]">
                {/* Background blur layer */}
                <motion.div
                  className="absolute inset-0 bg-foreground/5 backdrop-blur-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Main Image with Parallax */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    scale: hoveredIndex === index ? 1.15 : 1,
                    filter:
                      hoveredIndex === index
                        ? "brightness(0.7)"
                        : "brightness(1)",
                  }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <motion.img
                    src={insight.image}
                    alt={insight.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.4, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 1.8, delay: 0.5 + index * 0.15 }}
                  />
                </motion.div>

                {/* Gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"
                  animate={{ opacity: hoveredIndex === index ? 0.8 : 0.5 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Category Badge */}
                <motion.span
                  className="absolute top-6 left-6 px-4 py-2 bg-foreground text-background text-xs font-semibold rounded-full"
                  initial={{ opacity: 0, y: -30, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ delay: 0.7 + index * 0.15, type: "spring" }}
                  whileHover={{ scale: 1.1 }}
                >
                  {insight.category}
                </motion.span>

                {/* Read More Arrow */}
                <motion.div
                  className="absolute bottom-6 right-6 w-14 h-14 bg-foreground rounded-full flex items-center justify-center"
                  initial={{ scale: 0, opacity: 0, rotate: -180 }}
                  animate={{
                    scale: hoveredIndex === index ? 1 : 0,
                    opacity: hoveredIndex === index ? 1 : 0,
                    rotate: hoveredIndex === index ? 0 : -180,
                  }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <ArrowUpRight className="text-background" size={20} />
                </motion.div>
              </div>

              {/* Content with Staggered Animation */}
              <div className="space-y-4">
                {/* Meta Info */}
                <motion.div
                  className="flex items-center gap-4 text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.8 + index * 0.15 }}
                >
                  <span className="flex items-center gap-2">
                    <Calendar size={14} />
                    {insight.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                  <span className="flex items-center gap-2">
                    <Clock size={14} />
                    {insight.readTime}
                  </span>
                </motion.div>

                {/* Title with Hover Effect */}
                <div className="overflow-hidden">
                  <motion.h3
                    className="text-xl md:text-2xl font-semibold leading-tight"
                    initial={{ y: "100%" }}
                    animate={isInView ? { y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.9 + index * 0.15 }}
                  >
                    <motion.span
                      className="inline-block"
                      animate={{ x: hoveredIndex === index ? 10 : 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {insight.title}
                    </motion.span>
                  </motion.h3>
                </div>

                {/* Excerpt with Fade */}
                <motion.p
                  className="text-muted-foreground text-sm leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1 + index * 0.15 }}
                >
                  {insight.excerpt}
                </motion.p>

                {/* Read More Link */}
                <motion.a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-medium group/link"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.1 + index * 0.15 }}
                  whileHover={{ x: 5 }}
                >
                  <span className="relative">
                    Read Article
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-px bg-foreground origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="group-hover/link:rotate-45 transition-transform"
                  />
                </motion.a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5 }}
        >
          <Magnetic strength={0.15}>
            <motion.a
              href="/articles"
              onClick={(e) => {
                e.preventDefault();
                navigate("/contact");
              }}
              className="inline-flex items-center gap-3 px-10 py-5 border border-border rounded-full overflow-hidden relative group"
              data-cursor="View"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                className="absolute inset-0 bg-foreground"
                initial={{ x: "-100%", skewX: -20 }}
                whileHover={{ x: 0, skewX: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              />
              <span className="relative z-10 font-medium">All Insights</span>
              <ArrowUpRight size={18} className="relative z-10" />
            </motion.a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
};
