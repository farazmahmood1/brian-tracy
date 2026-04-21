import { useRef, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useInView,
} from "framer-motion";
import { ArrowUpRight, Clock, Calendar, ArrowRight } from "lucide-react";
import { useLenis } from "@/hooks/useLenis";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { api } from "@/services/api";
import type { ArticleDisplay } from "@/types/api";
import type { BlogPost } from "@/types/api";
import DOMPurify from "dompurify";

const getAvatarUrl = (seed: string | number) =>
  `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(String(seed))}`;

const Articles = () => {
  useLenis();
  const [articles, setArticles] = useState<ArticleDisplay[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    let cancelled = false;
    api.blogs.getAll().then(data => {
      if (cancelled) return;
      const mapped = data.map((b: BlogPost) => ({
        ...b,
        date: b.uploadDate,
        stack: b.stack,
        image: b.blogImage || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80',
        category: 'Article',
        excerpt: (b.content?.substring(0, 100) ?? '') + '...',
        author: { name: b.author || 'Admin', role: 'Editor', avatar: getAvatarUrl(b.slug || b.id || b.title) }
      }));
      setArticles(mapped);
    }).catch(() => {});
    return () => { cancelled = true; };
  }, []);

  usePageMetadata({
    title: "Articles – Forrof",
    description: "Explore our latest thoughts on design, technology, and the future of digital experiences. Ideas that inspire action.",
  });

  const categories = useMemo(() =>
    ["All", ...Array.from(new Set(articles.flatMap(article => article.stack ? article.stack.split(',').map((s: string) => s.trim()) : [])))].filter(Boolean),
    [articles]
  );

  const filteredArticles = useMemo(() =>
    selectedCategory === "All"
      ? articles
      : articles.filter(article => article.stack?.split(',').map((s: string) => s.trim()).includes(selectedCategory)),
    [articles, selectedCategory]
  );

  return (
    <main className="min-h-screen max-md:pt-12 overflow-x-hidden" style={{ background: "#060608" }}>
      {/* Hero Section */}
      <motion.section
        className="section-forced-dark relative min-h-[60vh] md:min-h-screen flex items-end section-padding pb-12 md:pb-24 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-[calc(50%-350px)] right-0 w-[400px] md:w-[700px] h-[400px] md:h-[700px] rounded-full blur-[130px] opacity-70"
            style={{ background: "rgba(0, 212, 170, 0.08)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[50px] opacity-50"
            style={{ background: "rgba(18, 107, 102, 0.1)" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#060608] via-[#060608]/40 to-[#060608] z-10" />

        <motion.div className="relative z-20 max-w-[1800px] mx-auto w-full">
          <motion.span
            className="inline-block text-xs uppercase tracking-[0.3em] mb-8"
            style={{ color: "#00d4aa" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Our insights
          </motion.span>
          <div className="overflow-hidden mb-6">
            <motion.h1
              className="text-[10vw] md:text-[10vw] font-bold leading-[0.88] tracking-tighter"
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
                y: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 },
                backgroundPosition: { duration: 3, ease: "easeInOut", delay: 1, repeat: Infinity, repeatType: "reverse" },
              }}
            >
              Articles & Ideas
            </motion.h1>
          </div>
          <motion.p
            className="text-lg md:text-2xl max-w-xl leading-relaxed mt-10"
            style={{ color: "#48f0e7" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Explore our latest thoughts on design, technology, and the future of digital experiences.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Category Filter + Featured — Elevated rounded container */}
      <section className="relative py-6 md:py-10">
        <div className="max-w-[1800px] mx-auto section-padding">
          {/* Raised panel with slightly lighter bg + border radius */}
          <motion.div
            className="rounded-3xl overflow-hidden border border-white/[0.06]"
            style={{ background: "linear-gradient(180deg, #0e1012 0%, #0a0c0e 100%)" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Filter bar inside panel */}
            <div className="px-6 md:px-12 py-8 border-b border-white/[0.06]">
              <motion.div
                className="flex flex-wrap gap-3 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2.5 max-md:text-xs rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                      ? "bg-[#00d4aa] text-[#0a0a0a] shadow-[0_0_20px_rgba(72,240,231,0.3)]"
                      : "bg-white/[0.04] text-white/50 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white/80 hover:border-white/15"
                      }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* Featured article inside panel */}
            <div className="p-6 md:p-12">
              {filteredArticles.length > 0 ? (
                <FeaturedArticle article={filteredArticles[0]} />
              ) : (
                <div className="text-center text-white/30 text-lg py-20">No articles found for this category.</div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid — Different bg tone with inner rounded cards */}
      {filteredArticles.length > 1 && (
        <section className="relative py-16 md:py-24">
          {/* Subtle ambient glow behind grid */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[200px] bg-[#126b66]/8" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[180px] bg-[#00d4aa]/5" />
          </div>

          <div className="max-w-[1800px] mx-auto section-padding relative z-10">
            {/* Section title */}
            <motion.div
              className="flex items-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs text-[#00d4aa]/60 uppercase tracking-[0.2em] font-medium">More articles</span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {filteredArticles.slice(1).map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Newsletter Section — Distinct bordered rounded container */}
      <section className="relative py-10 md:py-16">
        <div className="max-w-[1200px] mx-auto section-padding">
          <motion.div
            className="relative rounded-3xl overflow-hidden p-10 md:p-16"
            style={{
              background: "linear-gradient(135deg, rgba(18, 107, 102, 0.15) 0%, rgba(0, 212, 170, 0.05) 50%, rgba(18, 107, 102, 0.1) 100%)",
              border: "1px solid rgba(0, 212, 170, 0.15)",
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Inner glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[120px] bg-[#00d4aa]/8" />
            </div>
            {/* Noise texture */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: "128px" }} />

            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/20 text-[#00d4aa] text-xs font-medium uppercase tracking-wider mb-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Newsletter
              </motion.div>
              <motion.h2
                className="text-3xl md:text-5xl font-bold mb-5 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Stay in the Loop
              </motion.h2>
              <motion.p
                className="text-white/40 mb-10 text-base md:text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Get our latest insights delivered straight to your inbox. No spam,
                just quality content.
              </motion.p>
              <motion.form
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const email = (form.elements.namedItem("newsletter_email") as HTMLInputElement)?.value;
                  if (email) {
                    window.location.href = `mailto:hello@forrof.io?subject=Newsletter Subscription&body=Please add ${email} to your newsletter.`;
                    form.reset();
                  }
                }}
              >
                <input
                  type="email"
                  name="newsletter_email"
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 rounded-2xl bg-white/[0.06] border border-white/10 text-white placeholder:text-white/25 focus:border-[#00d4aa]/40 focus:outline-none focus:ring-2 focus:ring-[#00d4aa]/10 transition-all text-sm"
                />
                <motion.button
                  type="submit"
                  className="px-8 py-4 rounded-2xl font-medium text-[#0a0a0a] text-sm"
                  style={{ background: "linear-gradient(135deg, #00d4aa, #126b66)" }}
                  whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(72, 240, 231, 0.35)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Subscribe
                </motion.button>
              </motion.form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom spacer */}
      <div className="h-16" />
    </main>
  );
};

const FeaturedArticle = ({ article }: { article: ArticleDisplay }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <Link to={`/articles/${article.slug || article.id}`}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 lg:gap-14 items-center">
          {/* Image */}
          <motion.div
            itemScope
            itemType="https://schema.org/BlogPosting"
            className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              src={article.image}
              alt={article.title}
              loading="lazy"
              className="w-full h-full object-cover"
              initial={{ scale: 1.15 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 1.2 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c0e]/90 via-[#0a0c0e]/30 to-transparent" />
            <div className="absolute inset-0 bg-[#0a0c0e]/10 group-hover:bg-transparent transition-colors duration-500" />

            {/* Featured badge */}
            <motion.div
              className="absolute top-5 left-5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase"
              style={{ background: "linear-gradient(135deg, #00d4aa, #126b66)", color: "#0a0a0a" }}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              Featured
            </motion.div>

            {/* Arrow on hover */}
            <div className="absolute bottom-5 right-5 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 border border-white/20">
              <ArrowUpRight className="text-white" size={18} />
            </div>
          </motion.div>

          {/* Content */}
          <div className="space-y-5">
            {/* Tags */}
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              {article.stack?.split(",").map((tag: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-[#00d4aa]/10 text-[#00d4aa] border border-[#00d4aa]/20"
                >
                  {tag.trim()}
                </span>
              ))}
            </motion.div>

            <motion.h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.1] text-white group-hover:text-[#00d4aa] transition-colors duration-500"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              {article.title}
            </motion.h2>

            <motion.div
              className="text-base text-white/45 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.excerpt) }}
            />

            <motion.div
              className="flex items-center gap-4 text-sm text-white/35"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#00d4aa]/50" />
                {article.date}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/15" />
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#00d4aa]/50" />
                {article.readTime} min read
              </span>
            </motion.div>

            {/* Author + CTA */}
            <motion.div
              className="flex items-center justify-between pt-5 border-t border-white/[0.06]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  loading="lazy"
                  alt={article.author.name}
                  className="w-9 h-9 rounded-full object-cover border border-white/10"
                />
                <div>
                  <p className="font-medium text-white text-sm">{article.author.name}</p>
                  <p className="text-xs text-white/35">{article.author.role}</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-2 text-[#00d4aa] text-sm font-medium group-hover:gap-3 transition-all duration-300">
                Read Article
                <ArrowRight className="w-4 h-4" />
              </span>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ArticleCard = ({
  article,
  index,
}: {
  article: ArticleDisplay;
  index: number;
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6 }}
    >
      <Link to={`/articles/${article.slug || article.id}`} className="group block">
        {/* Card with rounded bg */}
        <div
          className="rounded-2xl overflow-hidden border border-white/[0.06] transition-all duration-500 group-hover:border-white/[0.12] group-hover:shadow-[0_8px_40px_rgba(0,212,170,0.06)]"
          style={{ background: "linear-gradient(180deg, #0f1114 0%, #0b0d0f 100%)" }}
        >
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <motion.img
              src={article.image}
              loading="lazy"
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d0f] via-transparent to-transparent opacity-60" />
            <div className="absolute inset-0 bg-[#0a0a0a]/5 group-hover:bg-transparent transition-colors duration-500" />

            {/* Tags */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
              {article.stack?.split(",").map((tag: string, i: number) => (
                <motion.span
                  key={i}
                  className="px-3 py-1 text-[11px] font-semibold rounded-full bg-black/40 backdrop-blur-md text-white/90 border border-white/10"
                  initial={{ opacity: 0, y: -20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.5 + index * 0.1 + i * 0.08,
                    type: "spring",
                  }}
                >
                  {tag.trim()}
                </motion.span>
              ))}
            </div>

            {/* Hover arrow */}
            <div className="absolute bottom-4 right-4 w-10 h-10 bg-[#00d4aa] rounded-full flex items-center justify-center scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-400 shadow-[0_0_20px_rgba(72,240,231,0.4)]">
              <ArrowUpRight className="text-[#0a0a0a]" size={16} />
            </div>
          </div>

          {/* Card content */}
          <div className="p-5 md:p-6 space-y-3">
            {/* Meta */}
            <div className="flex items-center gap-3 text-xs text-white/30">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-[#00d4aa]/40" />
                {article.date}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/10" />
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[#00d4aa]/40" />
                {article.readTime} min read
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-white group-hover:text-[#00d4aa] transition-colors duration-300 line-clamp-2 leading-snug">
              {article.title}
            </h3>

            {/* Excerpt */}
            <div
              className="text-white/35 text-sm line-clamp-2 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }}
            />

            {/* Author row */}
            <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
              <div className="flex items-center gap-2.5">
                <img
                  src={article.author.avatar}
                  loading="lazy"
                  alt={article.author.name}
                  className="w-7 h-7 rounded-full object-cover border border-white/10"
                />
                <span className="text-xs font-medium text-white/50">{article.author.name}</span>
              </div>
              <span className="text-xs text-[#00d4aa]/50 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                Read <ArrowRight size={12} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Articles;
