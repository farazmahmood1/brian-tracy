import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { LineReveal, Magnetic } from "@/components/AnimationComponents";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { GlowCard } from "@/components/InteractiveElements";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { seo } from "@/constants/seo";
import { useLocation, useNavigate } from "react-router-dom";
import { SocialMediaTerminalBlock } from "@/components/AiMlVisuals";

const services = [
  { num: "01", title: "Social Media Strategy", desc: "A data-backed playbook built around your brand goals, target audience, and competitive landscape - covering platform mix, content pillars, posting cadence, and measurable KPIs." },
  { num: "02", title: "Content Creation & Copywriting", desc: "Scroll-stopping visuals, short-form video, carousels, and on-brand copy crafted by specialists who understand how each platform's algorithm rewards authenticity and consistency." },
  { num: "03", title: "Community Management", desc: "Real-time moderation, comment responses, DM handling, and proactive community building that turns followers into loyal advocates and keeps your brand voice consistent at every touchpoint." },
  { num: "04", title: "Paid Social Advertising", desc: "Full-funnel paid campaigns across Meta, LinkedIn, TikTok, and more - precision audience targeting, creative testing, budget optimization, and weekly performance reporting that ties spend directly to revenue." },
  { num: "05", title: "Analytics & Performance Reporting", desc: "Custom dashboards tracking reach, engagement, follower growth, conversion attribution, and ROI - delivered as clear executive reports that show exactly what is working and what to do next." },
  { num: "06", title: "Influencer & Partnership Marketing", desc: "End-to-end influencer identification, brief creation, contract management, and campaign tracking to amplify your message through trusted voices your target audience already follows." },
];

const platforms = [
  { num: "01", title: "Instagram", desc: "Feed posts, Reels, Stories, and collaborations engineered for visual brands - optimized for both organic reach and paid discovery campaigns." },
  { num: "02", title: "LinkedIn", desc: "Thought leadership content, executive personal branding, and B2B lead-generation campaigns that position your brand as an authority in your industry." },
  { num: "03", title: "TikTok", desc: "Trend-aware short-form video production and paid TikTok Ads that reach high-intent audiences with content designed natively for the platform's unique culture." },
  { num: "04", title: "Facebook", desc: "Community management, targeted Meta ad campaigns, and retargeting that uses Facebook's detailed audience targeting to reach the right local customers." },
  { num: "05", title: "X (Twitter)", desc: "Real-time brand presence, reactive content strategy, and conversation monitoring that keeps your brand relevant and visible in fast-moving industry discussions." },
  { num: "06", title: "YouTube", desc: "Long-form and Shorts strategy, SEO-optimized video production, and YouTube Ads that build a lasting content library driving discovery and retention." },
];

const processSteps = [
  { num: "01", title: "Audit & Strategy", desc: "We analyze your current presence, benchmark against competitors, and deliver a clear social strategy tied to specific business objectives and audience insights." },
  { num: "02", title: "Content Planning", desc: "Monthly content calendars, platform-specific creative briefs, and campaign timelines planned and approved in advance, so nothing is posted in a rush." },
  { num: "03", title: "Execution & Management", desc: "Daily publishing, community engagement, paid campaign management, and creative production handled end-to-end - you stay focused on your business while we run your channels." },
  { num: "04", title: "Reporting & Optimization", desc: "Regular performance reviews covering all key metrics with clear interpretation and actionable recommendations to continuously improve results month over month." },
];

const whyUsItems = [
  {
    num: "01",
    title: "Data-Driven Content",
    desc: "Every creative decision is grounded in analytics - from post timing and format selection to caption length and hashtag strategy. We test, measure, and iterate so your content continuously improves rather than stagnating on gut feel.",
  },
  {
    num: "02",
    title: "Brand Voice Consistency",
    desc: "A unified tone, visual identity, and messaging framework applied consistently across every platform, campaign, and community interaction - so your brand feels instantly recognizable whether someone finds you on LinkedIn, TikTok, or anywhere in between.",
  },
  {
    num: "03",
    title: "ROI-Focused Campaigns",
    desc: "Every post, ad, and campaign is tied back to measurable business outcomes - leads generated, traffic driven, revenue attributed. We are accountable to results, not vanity metrics, and our reporting is structured to prove the value of every pound spent.",
  },
];

const clientWins = [
  {
    name: "Pêche",
    logo: "https://dev.gemseeroo.com/logo/22.png",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=70&auto=format&fit=crop",
    headline: "Scaled Pêche From Niche Fashion Brand Into a Cross-Platform Powerhouse.",
    stats: [
      { value: "26.5K+", label: "Instagram Followers" },
      { value: "94K+", label: "Pinterest Impressions" },
      { value: "+777%", label: "Reach Growth" },
    ],
  },
  {
    name: "Nourishing Biologicals",
    logo: "https://dev.gemseeroo.com/logo/21.png",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=70&auto=format&fit=crop",
    headline: "Grew a Doctor-Led Skincare Brand Into a 160K+ Reach Community.",
    stats: [
      { value: "160K", label: "Accounts Reached" },
      { value: "+96.7%", label: "Reach Growth" },
      { value: "9.5K+", label: "Total Followers" },
    ],
  },
];

export default function SocialMediaService() {
  usePageMetadata(seo("/services/social-media"));

  const navigate = useNavigate();
  const location = useLocation();
  const [expandedWhy, setExpandedWhy] = useState<number | null>(null);
  const [activeWin, setActiveWin] = useState(0);
  const [winsPaused, setWinsPaused] = useState(false);

  // Scroll to hash target (e.g. /services/social-media#client-wins) after mount.
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const t = setTimeout(tryScroll, 80);
    return () => clearTimeout(t);
  }, [location.hash]);

  useEffect(() => {
    if (winsPaused) return;
    const id = setInterval(() => {
      setActiveWin((prev) => (prev + 1) % clientWins.length);
    }, 5500);
    return () => clearInterval(id);
  }, [winsPaused]);

  // Preload carousel images so slide transitions don't wait on fetch
  useEffect(() => {
    clientWins.forEach((w) => {
      const img = new Image();
      img.src = w.image;
    });
  }, []);

  const heroRef = useRef(null);
  const sec1Ref = useRef(null);
  const sec2Ref = useRef(null);
  const sec3Ref = useRef(null);
  const sec4Ref = useRef(null);
  const winsRef = useRef(null);
  const ctaRef = useRef(null);


  const sec1InView = useInView(sec1Ref, { once: true, margin: "-100px" });
  const sec2InView = useInView(sec2Ref, { once: true, margin: "-100px" });
  const sec3InView = useInView(sec3Ref, { once: true, margin: "-100px" });
  const sec4InView = useInView(sec4Ref, { once: true, margin: "-100px" });
  const winsInView = useInView(winsRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* HERO */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-end section-padding pt-28 pb-16 md:pb-24 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-[calc(50%-350px)] right-0 w-[700px] h-[700px] rounded-full blur-[130px] opacity-70"
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
              transition={{ delay: 0.3 }}
            >
              Services / Social Media
            </motion.span>
            <div className="overflow-hidden mb-6 pt-2 pb-6">
              <motion.h1
                className="text-[13vw] md:text-[10vw] xl:text-[8vw] font-bold leading-[0.95] tracking-tighter"
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
                  backgroundPosition: { duration: 3, ease: "easeInOut", delay: 1 },
                }}
              >
                Social Media Marketing
              </motion.h1>
            </div>
            <motion.p
              className="text-lg md:text-2xl max-w-2xl leading-relaxed mt-10"
              style={{ color: "#48f0e7" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Strategy, content and community management on LinkedIn, Instagram, Facebook and TikTok. We plan around the inquiries you want, and report on those.
            </motion.p>
        </div>
      </motion.section>

      {/* SECTION 1 - Platforms We Master */}
      <section ref={sec1Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={sec1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="number-label">/01</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Platforms We Master</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={sec1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Every Platform, Mastered
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={sec1InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.07 }}
              >
                <GlowCard className="p-6 md:p-8 rounded-2xl bg-card border border-border/40 hover:border-accent/40 hover:bg-foreground/[0.02] transition-all duration-300 group h-full">
                  <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase block mb-6">
                    /{item.num}
                  </span>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-foreground transition-colors">
                    {item.title}
                  </h3>
                  <div className="max-h-0 group-hover:max-h-[200px] overflow-hidden transition-all duration-500">
                    <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 - Services */}
      <section ref={sec2Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={sec2InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="number-label">/02</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Services</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={sec2InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            What We Do
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={sec2InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.08 }}
              >
                <GlowCard className="p-6 md:p-8 rounded-2xl bg-card border border-border/40 hover:border-accent/40 hover:bg-foreground/[0.02] transition-all duration-300 group h-full">
                  <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase block mb-6">
                    /{item.num}
                  </span>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-foreground transition-colors">
                    {item.title}
                  </h3>
                  <div className="max-h-0 group-hover:max-h-[200px] overflow-hidden transition-all duration-500">
                    <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 - Why Us (hover-expand list) */}
      <section ref={sec3Ref} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={sec3InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="number-label">/03</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Why Us</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={sec3InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Why Brands Choose Us
          </motion.h2>

          <div className="space-y-0">
            {whyUsItems.map((item, i) => (
              <motion.div
                key={i}
                className="border-t border-border group cursor-pointer hover:bg-foreground/[0.02] rounded-xl transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                animate={sec3InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                onClick={() => setExpandedWhy(expandedWhy === i ? null : i)}
                onMouseEnter={() => setExpandedWhy(i)}
              >
                <div className="py-6 flex items-center gap-6">
                  <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase min-w-[32px]">
                    {item.num}
                  </span>
                  <h3
                    className="text-xl font-semibold transition-transform duration-300 group-hover:translate-x-3"
                  >
                    {item.title}
                  </h3>
                </div>
                <AnimatePresence initial={false}>
                  {expandedWhy === i && (
                    <motion.div
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <p className="text-muted-foreground leading-relaxed text-sm pb-6 pl-[56px] max-w-3xl">
                        {item.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* Terminal visual */}
      <section className="section-forced-dark section-padding py-24">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <SocialMediaTerminalBlock />
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Strategy Meets Execution</h3>
              <p className="text-muted-foreground leading-relaxed">We don't just plan content - we build complete campaign engines with brand guidelines, content calendars, and real-time analytics baked in.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4 - Process (scroll-driven timeline) */}
      <section ref={sec4Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <ProcessTimeline steps={processSteps} inView={sec4InView} sectionLabel="/04" />
        </div>
      </section>

      {/* SECTION 5 - Client Wins */}
      <section id="client-wins" ref={winsRef} className="section-forced-dark section-padding py-32 scroll-mt-20">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={winsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="number-label">/05</span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Client Wins</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={winsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Real Campaigns, Real Growth
          </motion.h2>

          <motion.div
            className="relative overflow-hidden rounded-3xl min-h-[360px] md:min-h-[420px] bg-foreground/5 border border-border/40"
            initial={{ opacity: 0, y: 60 }}
            animate={winsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            onMouseEnter={() => setWinsPaused(true)}
            onMouseLeave={() => setWinsPaused(false)}
          >
            <AnimatePresence mode="wait">
              {clientWins.map((win, i) =>
                i === activeWin ? (
                  <motion.div
                    key={win.name}
                    className="absolute inset-0"
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <img
                      src={win.image}
                      alt={`${win.name} campaign`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.7) 35%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0) 95%)",
                      }}
                    />
                    <div className="relative z-10 flex flex-col justify-between h-full min-h-[360px] md:min-h-[420px] p-8 md:p-12 max-w-2xl">
                      <img
                        src={win.logo}
                        alt={`${win.name} logo`}
                        className="h-10 md:h-12 w-auto object-contain self-start bg-white rounded-md px-2 py-1"
                      />
                      <div>
                        <h3 className="text-xl md:text-3xl font-bold text-white leading-tight tracking-tight mb-8 max-w-xl">
                          {win.headline}
                        </h3>
                        <div className="flex flex-wrap gap-x-8 md:gap-x-12 gap-y-5">
                          {win.stats.map((stat) => (
                            <div key={stat.label}>
                              <div className="text-2xl md:text-4xl font-bold text-white leading-none mb-1.5 tracking-tight">
                                {stat.value}
                              </div>
                              <div className="text-[11px] md:text-xs text-white/70 uppercase tracking-wider">
                                {stat.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
          </motion.div>

          {/* Carousel dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {clientWins.map((win, i) => (
              <button
                key={win.name}
                onClick={() => setActiveWin(i)}
                aria-label={`Show ${win.name} case study`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === activeWin
                    ? "w-10 bg-foreground"
                    : "w-5 bg-foreground/25 hover:bg-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="section-forced-dark section-padding py-40 relative overflow-hidden">
        <div className="max-w-[1800px] mx-auto text-center relative z-10">
          <motion.h2
            className="text-4xl md:text-7xl font-bold tracking-tighter mb-10"
            initial={{ opacity: 0, y: 40 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Ready to grow your audience?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Magnetic>
              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-3 px-8 py-5 bg-foreground text-background rounded-full font-medium hover:opacity-80 transition-opacity"
              >
                Grow My Brand
                <ArrowUpRight size={18} />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
