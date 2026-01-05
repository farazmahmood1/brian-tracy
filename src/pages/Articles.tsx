import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { useLenis } from "@/hooks/useLenis";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { api } from "@/services/api";

// Helper for author if API doesn't return full object
const getAuthor = (author: any) => {
  if (typeof author === 'string') return { name: author, avatar: '', role: 'Author' };
  return author || { name: 'Admin', avatar: '', role: 'Editor' };
}

const Articles = () => {
  useLenis();
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    api.blogs.getAll().then(data => {
      // Transform data to match UI expectations if needed
      const mapped = data.map((b: any) => ({
        ...b,
        date: b.postedDate,
        image: b.imageUrl || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80', // Fallback
        category: 'Article', // defaulting category if not in schema
        excerpt: b.content?.substring(0, 100) + '...',
        author: { name: b.author, role: 'Editor', avatar: 'https://github.com/shadcn.png' } // Mock author details
      }));
      setArticles(mapped);
    }).catch(console.error);
  }, []);

  // SEO Meta Tags
  usePageMetadata({
    title: "Articles – Forrof",
    description: "Explore our latest thoughts on design, technology, and the future of digital experiences. Ideas that inspire action.",
  });


  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const smoothHeroY = useSpring(heroY, { stiffness: 100, damping: 30 });

  const categories = ["All", ...new Set(articles.map((a) => a.category))];

  return (
    <main className="min-h-screen bg-background max-md:pt-12">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[70vh] flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background Grid */}
        <div className="absolute inset-0 overflow-hidden">
        </div>

        {/* Floating Elements */}
        {Array.from({ length: 188 }).map((_, i) => (
          <motion.div

            key={i}
            className="absolute rounded-full bg-[#004549] pointer-events-none z-30"
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

        <motion.div
          className="relative z-10 text-center px-4"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block px-6 py-2 rounded-full border border-primary/30 text-primary text-sm mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              Our Insights & Articles
            </motion.span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              Ideas That
            </motion.span>
            <motion.span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/60"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              Inspire Action
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Explore our latest thoughts on design, technology, and the future of
            digital experiences.
          </motion.p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`px-6 py-3 max-md:text-xs rounded-full border transition-all duration-300 ${index === 0
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-primary hover:text-primary"
                  }`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {articles.length > 0 ? (
            <FeaturedArticle article={articles[0]} />
          ) : (
            <div className="text-center text-muted-foreground">No articles yet.</div>
          )}
        </div>
      </section>

      {/* Articles Grid */}
      {articles.length > 1 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {articles.slice(1).map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <motion.div
          className="container mx-auto px-4 relative z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Stay in the Loop
            </motion.h2>
            <motion.p
              className="text-muted-foreground mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Get our latest insights delivered straight to your inbox. No spam,
              just quality content.
            </motion.p>
            <motion.form
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full bg-background border border-border focus:border-primary focus:outline-none transition-colors"
              />
              <motion.button
                type="submit"
                className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

const FeaturedArticle = ({ article }: { article: any }) => {
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
      <Link to={`/articles/${article.id}`}>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            itemScope
            itemType="https://schema.org/BlogPosting"
            className="relative aspect-[4/3] rounded-3xl overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <motion.img
              src={article.image}
              alt={article.title}
              loading="lazy"
              className="w-full h-full object-cover"
              initial={{ scale: 1.2 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 1.2 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            <motion.div
              className="absolute top-6 left-6 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              Featured
            </motion.div>
          </motion.div>

          <div className="space-y-6">
            <motion.span
              className="inline-block px-4 py-1 rounded-full border border-primary/30 text-primary text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              {article.category}
            </motion.span>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight group-hover:text-primary transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              {article.title}
            </motion.h2>

            <motion.p
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              {article.excerpt}
            </motion.p>

            <motion.div
              className="flex items-center gap-6 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {article.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
            </motion.div>

            <motion.div
              className="flex items-center gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <img
                src={article.author.avatar}
                loading="lazy"
                alt={article.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{article.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {article.author.role}
                </p>
              </div>
            </motion.div>

            <motion.div
              className="inline-flex items-center gap-2 text-primary font-medium"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              whileHover={{ x: 10 }}
            >
              Read Article
              <ArrowRight className="w-5 h-5" />
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
  article: any;
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
      <Link to={`/articles/${article.id}`} className="group block">
        <motion.div
          className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img
            src={article.image}
            loading="lazy"
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <motion.div
            className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
          >
            {article.category}
          </motion.div>
        </motion.div>

        <div className="space-y-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>

          <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>

          <p className="text-muted-foreground line-clamp-2">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <img
              src={article.author.avatar}
              loading="lazy"
              alt={article.author.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium">{article.author.name}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Articles;
