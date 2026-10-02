import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { LineReveal, Magnetic } from "@/components/AnimationComponents";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { GlowCard } from "@/components/InteractiveElements";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { seo } from "@/constants/seo";
import { useNavigate, useLocation } from "react-router-dom";
import { SocialMediaTerminalBlock } from "@/components/AiMlVisuals";

const services = [
  { num: "01", title: "Search & Performance Max", desc: "High-intent Google Search and PMax campaigns engineered with keyword clusters, dynamic location insertion, and conversion-optimized ad copy that captures buyers at the exact moment of intent." },
  { num: "02", title: "Paid Social (Meta, TikTok, LinkedIn)", desc: "Full-funnel paid social across Facebook, Instagram, TikTok, and LinkedIn - combining audience signals, scroll-stopping creative, and conversion-tested messaging that drives leads, not vanity engagement." },
  { num: "03", title: "Retargeting & Remarketing", desc: "Multi-channel retargeting funnels that stay in front of warm prospects with sequenced creative and offer-based messaging - so site visitors who didn't convert come back and book." },
  { num: "04", title: "Local Service Ads (LSA)", desc: "Verified Google LSA setup and management for service businesses - pay-per-lead campaigns that show up at the top of local search and convert at the highest intent stage." },
  { num: "05", title: "Conversion Tracking & API", desc: "Server-side, API-level conversion tracking across Google, Meta, and TikTok - feeding clean signals back so platform algorithms learn faster and your CPA drops month over month." },
  { num: "06", title: "Landing Page CRO", desc: "Custom conversion-optimized landing pages built per ad group, matched to user intent at every funnel stage - because the best ad in the world dies on a bad page." },
];

const platforms: { num: string; title: string; desc: string; slug?: string }[] = [
  { num: "01", title: "Google Ads", desc: "Search, Performance Max, YouTube, and Display campaigns built around high-intent keyword clusters and conversion-optimized creative - the highest-converting channel for most service businesses.", slug: "google-ads" },
  { num: "02", title: "Meta Ads (Facebook & Instagram)", desc: "Audience-targeted, creative-led campaigns across Feed, Reels, and Stories - pairing precision targeting with high-impact visuals that turn social scrolling into qualified leads.", slug: "meta-ads" },
  { num: "03", title: "LinkedIn Ads", desc: "B2B-grade campaigns targeting senior decision-makers by company, role, and industry - for high-ticket services where one closed account pays for the whole quarter.", slug: "linkedin-ads" },
  { num: "04", title: "TikTok Ads", desc: "Short-form video campaigns that engage cold audiences with native, scroll-friendly creative - generating affordable leads from a channel most competitors are still ignoring.", slug: "tiktok-ads" },
  { num: "05", title: "Microsoft (Bing) Ads", desc: "Untapped audiences at lower CPCs - Bing campaigns deliver Google-level intent at a fraction of the cost, especially for B2B and 35+ demographics.", slug: "bing-ads" },
  { num: "06", title: "Yelp & Local Service Ads", desc: "Local placement when buyers are ready to book: tuned bidding, optimized profiles and call tracking that ties spend to booked jobs.", slug: "yelp-ads" },
];

const processSteps = [
  { num: "01", title: "Audit & Strategy", desc: "We audit your existing ad spend, competitors, and conversion data - then build a channel mix and budget allocation tied to your specific revenue targets." },
  { num: "02", title: "Tracking & Setup", desc: "Server-side tracking, conversion API, pixel hardening, and clean attribution - so every dollar is tracked back to the lead, the meeting, and the closed deal." },
  { num: "03", title: "Launch & Test", desc: "Multiple ad groups, creative variants, and audience tests launched simultaneously - we find your winning formula in weeks, not quarters." },
  { num: "04", title: "Scale & Optimize", desc: "Winning ads get scaled, losing ads get killed weekly. Continuous CRO on landing pages and creative iteration keeps CPA dropping while volume climbs." },
];

const clientWins = [
  {
    name: "GreenWorks",
    logo: "https://dev.gemseeroo.com/logo/18.png",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80&auto=format&fit=crop",
    headline: "Rebuilt Campaign Structure To Support High-Volume, Cost-Efficient Growth.",
    stats: [
      { value: "400+", label: "Qualified Leads" },
      { value: "150+", label: "Bookings" },
      { value: "$111K+", label: "Revenue Generated" },
    ],
  },
  {
    name: "Linkhorn Inspection Group",
    logo: "https://dev.gemseeroo.com/logo/13.png",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80&auto=format&fit=crop",
    headline: "Turned Strategic Campaign Precision Into Measurable Revenue Growth.",
    stats: [
      { value: "600+", label: "Qualified Leads" },
      { value: "250+", label: "Bookings" },
      { value: "$181K+", label: "Revenue Generated" },
    ],
  },
  {
    name: "RedFish Inspections",
    logo: "https://dev.gemseeroo.com/logo/20.png",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80&auto=format&fit=crop",
    headline: "Scaled Local Inspection Demand Into Predictable Pipeline Growth.",
    stats: [
      { value: "720+", label: "Qualified Leads" },
      { value: "290+", label: "Bookings" },
      { value: "$215K+", label: "Revenue Generated" },
    ],
  },
];

const whyUsItems = [
  {
    num: "01",
    title: "Intent-First Targeting",
    desc: "Most agencies measure success in impressions and clicks. We measure it in qualified leads and closed revenue. Every campaign starts with intent mapping - capturing audiences already searching today, not just spraying impressions at lookalikes.",
  },
  {
    num: "02",
    title: "Signal Stacking & Negative Filters",
    desc: "Years of campaign data feed our 500+ negative keyword library, applied from day one. We layer inclusion and exclusion signals across audiences, devices, and locations to filter out tire-kickers, job seekers, and competitors before they ever see your ad.",
  },
  {
    num: "03",
    title: "API-Level Tracking",
    desc: "We go beyond pixel tracking - server-side conversion API feeds cleaner data back into Google and Meta, letting algorithms learn faster and bid smarter. The result is a self-improving system where CPA drops month over month, not stays flat.",
  },
];

export default function PaidAdsService() {
  usePageMetadata(seo("/services/paid-ads"));

  const navigate = useNavigate();
  const location = useLocation();
  const [expandedWhy, setExpandedWhy] = useState<number | null>(null);
  const [activeWin, setActiveWin] = useState(0);
  const [winsPaused, setWinsPaused] = useState(false);

  useEffect(() => {
    if (winsPaused) return;
    const id = setInterval(() => {
      setActiveWin((prev) => (prev + 1) % clientWins.length);
    }, 5500);
    return () => clearInterval(id);
  }, [winsPaused]);

  // Scroll to hash target (e.g. /services/paid-ads#client-wins) after mount.
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
              Services / Paid Ads
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
                Paid Ads That Pay Off
              </motion.h1>
            </div>
            <motion.p
              className="text-lg md:text-2xl max-w-2xl leading-relaxed mt-10"
              style={{ color: "#48f0e7" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Google, Meta, LinkedIn and TikTok campaigns, with conversion tracking wired into your CRM so you can see which ads bring in paying customers.
            </motion.p>
        </div>
      </motion.section>

      {/* SECTION 1 - Platforms */}
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
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Platforms We Run</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={sec1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Every Platform, Every Funnel Stage
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={sec1InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.07 }}
                onClick={item.slug ? () => navigate(`/services/${item.slug}`) : undefined}
                className={item.slug ? "cursor-pointer" : ""}
              >
                <GlowCard className="p-6 md:p-8 rounded-2xl bg-card border border-border/40 hover:border-accent/40 hover:bg-foreground/[0.02] transition-all duration-300 group h-full">
                  <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase block mb-6">
                    /{item.num}
                  </span>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-foreground transition-colors">
                    {item.title}
                    {item.slug && <span className="ml-2 text-accent text-sm">↗</span>}
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

      {/* SECTION 3 - Why Us */}
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
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Every Click, Tracked. Every Dollar, Justified.</h3>
              <p className="text-muted-foreground leading-relaxed">Server-side conversion API, full-funnel attribution, and weekly performance reviews - you see exactly which platform, audience, and ad drove each lead, each meeting, and each closed deal.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4 - Process */}
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
            Real Campaigns, Real Revenue
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
                      alt={`${win.name} team`}
                      loading="lazy"
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
            Find out which ads bring in customers.
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
                Get a Free Ad Spend Audit
                <ArrowUpRight size={18} />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
