import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { LineReveal, Magnetic } from "@/components/AnimationComponents";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { GlowCard } from "@/components/InteractiveElements";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { seo } from "@/constants/seo";
import { useNavigate } from "react-router-dom";
import { SocialMediaTerminalBlock } from "@/components/AiMlVisuals";

const services = [
  { num: "01", title: "Google Search Ads", desc: "High-intent keyword campaigns built around buyer-stage queries - exact-match, broad-match, and dynamic search ads engineered to capture the moment someone Googles for what you sell." },
  { num: "02", title: "Performance Max (PMax)", desc: "Multi-asset PMax campaigns running across Search, Display, YouTube, Discover, and Maps simultaneously - fed by audience signals and creative variants tuned to your conversion data." },
  { num: "03", title: "YouTube Ads", desc: "Skippable, non-skippable, and bumper video campaigns targeting in-market and custom intent audiences - for brand-building and direct-response funnels that work in tandem with search." },
  { num: "04", title: "Google Display & Discovery", desc: "Visual remarketing and prospecting campaigns across the Google Display Network - keeping your brand in front of warm audiences and pulling in lookalikes at low CPMs." },
  { num: "05", title: "Google Local Service Ads", desc: "Verified LSA setup and management - pay-per-lead campaigns that show up at the very top of local search results, above traditional ads, with Google's trust badge attached." },
  { num: "06", title: "Google Shopping & Merchant Center", desc: "Product feed optimization, Shopping campaigns, and Merchant Center setup for ecommerce and product-based businesses - driving qualified product-intent traffic at scale." },
];

const platforms = [
  { num: "01", title: "Search", desc: "The highest-converting Google channel - targeted keyword campaigns that capture buyers at the exact moment of intent. Where 80% of our clients see their best ROAS." },
  { num: "02", title: "Performance Max", desc: "Google's AI-powered campaign type running across Search, Display, YouTube, Discover, and Gmail simultaneously - fed by your conversion data and audience signals." },
  { num: "03", title: "YouTube", desc: "Video-first campaigns for brand authority and direct-response - skippable, non-skippable, and bumper formats targeting in-market audiences and custom intent segments." },
  { num: "04", title: "Display Network", desc: "Visual remarketing and prospecting across millions of partner sites - for staying in front of warm audiences after they leave your site without converting." },
  { num: "05", title: "Local Service Ads", desc: "Pay-per-lead local placement above all other ads, with Google's verified trust badge - the highest-intent placement Google offers for service businesses." },
  { num: "06", title: "Shopping & Merchant", desc: "Product feed campaigns for ecommerce - driving qualified product-intent shoppers from Google Search and Shopping tabs straight to checkout." },
];

const processSteps = [
  { num: "01", title: "Account Audit & Strategy", desc: "We audit your existing Google Ads account, competitor spend, keyword gaps, and historical conversion data - then build a campaign blueprint tied to specific revenue targets." },
  { num: "02", title: "Tracking & Conversion Setup", desc: "Server-side conversion tracking via Google Ads API, enhanced conversions, and clean attribution - so every click is tied back to revenue, not just form fills." },
  { num: "03", title: "Campaign Launch", desc: "Tightly themed ad groups, conversion-optimized landing pages, and our 500+ negative keyword library applied from day one - eliminating wasted spend before it starts." },
  { num: "04", title: "Optimization & Scale", desc: "Weekly bid adjustments, creative refreshes, and search query mining. Winning campaigns get scaled, losers get killed. CPA drops month over month while volume climbs." },
];

const whyUsItems = [
  {
    num: "01",
    title: "500+ Negative Keyword Library",
    desc: "Years of running Google Ads for service businesses means we already know what doesn't work. Our negative keyword library is applied from the moment your campaign launches, automatically cutting out tyre-kickers, job seekers, and competitor research traffic before they ever click.",
  },
  {
    num: "02",
    title: "API-Level Conversion Tracking",
    desc: "We feed conversion data back into Google Ads via the API, not just the pixel. Cleaner, richer signals mean Google's algorithm learns faster and bids smarter - your CPA drops automatically over time instead of staying flat or creeping up.",
  },
  {
    num: "03",
    title: "Conversion-Optimized Landing Pages",
    desc: "Every ad group gets a landing page engineered to match user intent at that funnel stage. Headline, hero, social proof, and CTA all tuned to the keyword cluster driving the click - because the best ad in the world dies on a generic homepage.",
  },
];

export default function GoogleAdsService() {
  usePageMetadata(seo("/services/google-ads"));

  const navigate = useNavigate();
  const [expandedWhy, setExpandedWhy] = useState<number | null>(null);

  const heroRef = useRef(null);
  const sec1Ref = useRef(null);
  const sec2Ref = useRef(null);
  const sec3Ref = useRef(null);
  const sec4Ref = useRef(null);
  const ctaRef = useRef(null);

  const sec1InView = useInView(sec1Ref, { once: true, margin: "-100px" });
  const sec2InView = useInView(sec2Ref, { once: true, margin: "-100px" });
  const sec3InView = useInView(sec3Ref, { once: true, margin: "-100px" });
  const sec4InView = useInView(sec4Ref, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

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
              Services / Google Ads
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
                Google Ads Management
              </motion.h1>
            </div>
            <motion.p
              className="text-lg md:text-2xl max-w-2xl leading-relaxed mt-10"
              style={{ color: "#48f0e7" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Google Ads built on tight keyword targeting, conversion tracking that reaches your CRM, and landing pages built by our own developers.
            </motion.p>
        </div>
      </motion.section>

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
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Campaign Types</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={sec1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Every Google Surface, Mastered
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
              <h3 className="text-2xl md:text-3xl font-bold mb-6">A Self-Improving Ad Account</h3>
              <p className="text-muted-foreground leading-relaxed">API-level conversion tracking, weekly search-query mining, and continuous landing page CRO - your CPA drops month over month while volume climbs, instead of staying flat for years.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={sec4Ref} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <ProcessTimeline steps={processSteps} inView={sec4InView} sectionLabel="/04" />
        </div>
      </section>

      <section ref={ctaRef} className="section-forced-dark section-padding py-40 relative overflow-hidden">
        <div className="max-w-[1800px] mx-auto text-center relative z-10">
          <motion.h2
            className="text-4xl md:text-7xl font-bold tracking-tighter mb-10"
            initial={{ opacity: 0, y: 40 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Get more from your Google budget.
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
                Get a Free Google Ads Audit
                <ArrowUpRight size={18} />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
