import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import { LineReveal, Magnetic } from "./AnimationComponents";
import { useNavigate } from "react-router-dom";
import { api } from "@/services/api";
import type { BlogPost } from "@/types/api";
import DOMPurify from "dompurify";

interface InsightDisplay {
  id: number;
  title: string;
  image: string;
  category: string;
  stack: string;
  excerpt: string;
  date: string;
  readTime: string;
  slug: string;
}

export const InsightsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [displayedInsights, setDisplayedInsights] = useState<InsightDisplay[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    api.blogs.getAll().then((data) => {
      if (cancelled) return;
      const mapped = data.slice(0, 3).map((item: BlogPost) => ({
        ...item,
        image: item.blogImage,
        category: 'Insights',
        stack: item.stack,
        // Sanitize once at data load time, not on every render
        excerpt: DOMPurify.sanitize((item.content?.substring(0, 110) ?? '') + '...'),
        date: item.uploadDate,
        readTime: item.readTime || '5',
        slug: item.slug
      }));
      setDisplayedInsights(mapped);
    }).catch(() => {
      // API unavailable — section stays empty
    });
    return () => { cancelled = true; };
  }, []);


  const handleArticleClick = (article: InsightDisplay) => {
    navigate(`/articles/${article.slug || article.id}`);
    window.scrollTo(0, 0);
  };

  return (
    <section
      className="section-forced-dark section-padding md:py-20 py-12 overflow-hidden"
      ref={containerRef}
    >

      <div className="max-w-[1800px] mx-auto relative z-10">
        {/* Header with parallax */}
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          <motion.span className="number-label">/08</motion.span>
          <LineReveal className="h-px bg-border flex-1" delay={0.3} />
          <motion.span className="text-xs text-muted-foreground uppercase tracking-widest">
            Insights
          </motion.span>
        </motion.div>

        {/* Title Grid */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-10 md:mb-16">
          <div className="overflow-hidden">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.95] pb-4"
              initial={{ y: "120%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{
                duration: 1,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.2,
              }}
            >
              Latest Insights
            </motion.h2>
          </div>
          <motion.div
            className="flex items-end"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <p className="text-xl text-muted-foreground max-w-md leading-relaxed">
              Explore expert insights on software development, UI UX design, SEO, branding, and digital transformation written by our experienced team.
            </p>
          </motion.div>
        </div>

        {/* Insights Grid — GPU-accelerated hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {displayedInsights.map((insight) => (
            <article
              itemScope
              itemType="https://schema.org/BlogPosting"
              key={insight.id}
              className="group cursor-pointer min-w-0"
              data-cursor="Read"
              onClick={() => handleArticleClick(insight)}
            >
              {/* Image Container — single composite layer */}
              <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/3]">
                {/* Main Image — use GPU-friendly scale via will-change */}
                <img
                  src={insight.image}
                  alt={`${insight.title} – Forrof software agency insights`}
                  className="absolute inset-0 w-full h-full object-cover will-change-transform transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />

                {/* Single gradient overlay instead of 3 separate layers */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent group-hover:from-background/80 transition-colors duration-500" />

                {/* Stack Badges */}
                <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-10">
                  {insight.stack?.split(",").map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-foreground text-background text-xs font-semibold rounded-full"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>

                {/* Read More Arrow — simpler animation (opacity + scale only) */}
                <div className="absolute bottom-6 right-6 w-14 h-14 bg-foreground rounded-full flex items-center justify-center scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-400 will-change-transform">
                  <ArrowUpRight className="text-background" size={20} />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Calendar size={14} />
                    {insight.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                  <span className="flex items-center gap-2">
                    <Clock size={14} />
                    {insight.readTime} minutes read
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-semibold leading-tight break-words">
                  <span className="inline-block group-hover:translate-x-2.5 transition-transform duration-400">
                    {insight.title}
                  </span>
                </h3>

                {/* Excerpt — sanitized at load time, not on render */}
                <div
                  className="text-muted-foreground text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: insight.excerpt }}
                />

                {/* Read More Link */}
                <div className="inline-flex items-center gap-2 text-sm font-medium group/link text-foreground">
                  <span className="relative">
                    Read Article
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="group-hover/link:rotate-45 transition-transform"
                  />
                </div>
              </div>
            </article>
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
                navigate("/articles");
                window.scrollTo(0, 0);
              }}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-white overflow-hidden relative group"
              style={{ background: "linear-gradient(135deg, #126b66, #00d4aa)" }}
              data-cursor="View"
              whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(72, 240, 231, 0.4)" }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 font-medium">All Insights</span>
              <ArrowUpRight size={18} className="relative z-10" />
            </motion.a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
};
