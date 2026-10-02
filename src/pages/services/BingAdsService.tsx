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
  { num: "01", title: "Bing Search Ads", desc: "Keyword-targeted search campaigns on Bing, Yahoo, AOL, and DuckDuckGo - reaching the 1 billion+ searches per day that happen outside Google, often at 30-50% lower CPCs." },
  { num: "02", title: "Microsoft Audience Network", desc: "Display campaigns across MSN, Outlook.com, Microsoft Edge, and partner sites - native ads with strong B2B and 35+ demographic reach." },
  { num: "03", title: "LinkedIn Profile Targeting", desc: "Microsoft's exclusive LinkedIn integration - target search ads by job title, company, and industry without paying LinkedIn's premium CPMs." },
  { num: "04", title: "Google Ads Import", desc: "Mirror your Google Ads campaigns to Microsoft Ads in minutes, then refine for Bing's audience differences - capturing incremental volume at lower cost without rebuilding." },
  { num: "05", title: "Bing Shopping & Product Ads", desc: "Product feed campaigns with Microsoft Merchant Center setup - reaching shoppers on Bing and Yahoo who often have higher purchase intent and AOV than Google equivalents." },
  { num: "06", title: "Conversion Tracking & Reporting", desc: "UET tag implementation, offline conversion imports, and weekly reporting tied back to revenue - so you see exactly where Microsoft Ads complements your Google budget." },
];

const formats = [
  { num: "01", title: "Search Ads", desc: "Keyword-targeted text ads on Bing, Yahoo, AOL, and DuckDuckGo - the workhorse format with often dramatically lower CPCs than Google." },
  { num: "02", title: "Shopping Ads", desc: "Product listing ads with images, prices, and merchant info - powered by Microsoft Merchant Center for ecommerce campaigns." },
  { num: "03", title: "Microsoft Audience Network", desc: "Native display ads across MSN, Outlook.com, and Edge - reaching audiences with strong purchase intent." },
  { num: "04", title: "Dynamic Search Ads", desc: "Auto-generated ads based on your website content - useful for catching long-tail searches without exhaustive keyword research." },
  { num: "05", title: "App Install Ads", desc: "Drive iOS and Android app installs through Microsoft search and audience placements - often lower CPI than Google or Meta." },
  { num: "06", title: "Multimedia Ads", desc: "Image-driven search ads with AI-optimized headlines and visuals - newer format with strong CTR for visual brands." },
];

const processSteps = [
  { num: "01", title: "Audit & Import", desc: "We audit your existing Google Ads (if any), import the structure to Microsoft Ads, and refine for Bing's distinct audience and intent profile." },
  { num: "02", title: "UET & Tracking Setup", desc: "Microsoft's UET tag, conversion goals, offline conversion imports, and clean attribution - so the algorithm bids on real revenue, not just clicks." },
  { num: "03", title: "Launch & Test", desc: "Search, Shopping, and Audience Network campaigns launched in parallel with B2B-focused targeting layers (LinkedIn Profile, age, demographics)." },
  { num: "04", title: "Optimize & Scale", desc: "Weekly bid adjustments, search query mining, and budget reallocation to winners. Microsoft Ads usually scales without saturation, so volume can climb steadily." },
];

const whyUsItems = [
  {
    num: "01",
    title: "30-50% Lower CPCs Than Google",
    desc: "Bing/Microsoft Ads consistently delivers lower cost per click than Google for the same keywords - often 30-50% cheaper. We help you capture incremental qualified search volume without paying Google's premium auction prices.",
  },
  {
    num: "02",
    title: "LinkedIn Profile Targeting",
    desc: "Microsoft Ads is the only paid search platform that lets you layer LinkedIn job title, company, and industry targeting on top of search keywords. For B2B service businesses this is the main advantage: high-intent search traffic filtered to actual decision-makers only.",
  },
  {
    num: "03",
    title: "Older, Wealthier, More B2B",
    desc: "The Microsoft Ads audience skews 35+ and has higher household income and stronger B2B representation than Google. For services, finance, and B2B SaaS, this is often a higher-converting audience even at the same CPC.",
  },
];

export default function BingAdsService() {
  usePageMetadata(seo("/services/bing-ads"));

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
              Services / Microsoft (Bing) Ads
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
                Microsoft Ads Management
              </motion.h1>
            </div>
            <motion.p
              className="text-lg md:text-2xl max-w-2xl leading-relaxed mt-10"
              style={{ color: "#48f0e7" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Microsoft Ads management. Bing reaches desktop and office users with the same search intent as Google, usually at a lower cost per click.
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
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Ad Formats</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={sec1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Every Microsoft Ad Format
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formats.map((item, i) => (
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
                  <h3 className="text-xl font-semibold transition-transform duration-300 group-hover:translate-x-3">
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
              <h3 className="text-2xl md:text-3xl font-bold mb-6">The Channel Most Agencies Ignore</h3>
              <p className="text-muted-foreground leading-relaxed">Microsoft Ads delivers Google-quality intent at often half the CPC, with LinkedIn Profile Targeting for B2B, which most agencies never mention.</p>
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
            Capture the audience Google misses.
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
                Get a Free Microsoft Ads Audit
                <ArrowUpRight size={18} />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
