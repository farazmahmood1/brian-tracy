import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { LineReveal, Magnetic } from "@/components/AnimationComponents";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { GlowCard, CountUp } from "@/components/InteractiveElements";
import { TechLogo } from "@/components/TechLogo";
import { usePageMetadata } from "@/hooks/usePageMetadata";

export interface ServicePageContent {
  slug: string;
  name: string;
  /** Defaults to the Services section; industry pages pass { label: "Industries", path: "/industries" } */
  section?: { label: string; path: string };
  meta: { title: string; description: string; keywords: string };
  hero: { heading: string; intro: string; cta: string };
  valueProp: { heading: string; intro: string; problems: string[]; answers: { title: string; desc: string }[] };
  services: { heading: string; intro: string; cards: { title: string; desc: string; slug?: string }[] };
  visual: { heading: string; desc: string; terminal: ReactNode };
  stats: { value: string; label: string }[];
  techStack: { intro: string; items: { name: string; desc: string }[] };
  whyUs: { title: string; desc: string }[];
  sideVisual: ReactNode;
  industries: { label?: string; heading: string; items: { title: string; points: string[] }[] };
  process: { steps: { num: string; title: string; desc: string }[]; note?: string };
  faqs: { q: string; a: string }[];
  cta: { heading: string; label: string };
}

const SITE_URL = "https://forrof.io";

/* Decorative terminal panel. Lines starting with "$" or "✓" are highlights,
   lines starting with "⬡" are group headings, everything else is a row. */
export const TerminalBlock = ({ lines }: { lines: string[] }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const colorFor = (line: string) =>
    line.startsWith("$") || line.startsWith("✓") ? "#48f0e7" : line.startsWith("⬡") ? "#e0e0e0" : "#00d4aa";

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-border/40 bg-[#0a0f14] p-6 md:p-8 font-mono text-xs md:text-sm overflow-hidden relative"
    >
      <div className="flex gap-2 mb-6">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-green-500/60" />
      </div>
      <div className="space-y-1">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            className="whitespace-pre min-h-[1.25em]"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
            style={{ color: colorFor(line) }}
          >
            {line}
          </motion.div>
        ))}
      </div>
      <motion.div
        className="w-2 h-4 bg-accent/80 mt-2"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-[30px]" />
    </div>
  );
};

const SectionLabel = ({ num, label, inView }: { num: string; label: string; inView: boolean }) => (
  <motion.div
    className="flex items-center gap-4 mb-20"
    initial={{ opacity: 0, y: 20 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.8 }}
  >
    <span className="number-label">{num}</span>
    <LineReveal className="h-px bg-border flex-1" delay={0.3} />
    <span className="text-xs text-muted-foreground uppercase tracking-widest">{label}</span>
  </motion.div>
);

export const ServicePageTemplate = ({ content: c }: { content: ServicePageContent }) => {
  const section = c.section ?? { label: "Services", path: "/services" };
  const pageUrl = `${SITE_URL}${section.path}/${c.slug}`;
  usePageMetadata({ ...c.meta, url: pageUrl });

  const navigate = useNavigate();
  const [activeProblem, setActiveProblem] = useState(0);
  const [openIndustry, setOpenIndustry] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const refs = {
    value: useRef(null),
    services: useRef(null),
    stats: useRef(null),
    tech: useRef(null),
    why: useRef(null),
    industries: useRef(null),
    process: useRef(null),
    faq: useRef(null),
    cta: useRef(null),
  };
  const opts = { once: true, margin: "-100px" } as const;
  const inView = {
    value: useInView(refs.value, opts),
    services: useInView(refs.services, opts),
    stats: useInView(refs.stats, opts),
    tech: useInView(refs.tech, opts),
    why: useInView(refs.why, opts),
    industries: useInView(refs.industries, opts),
    process: useInView(refs.process, opts),
    faq: useInView(refs.faq, opts),
    cta: useInView(refs.cta, opts),
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: c.name,
        serviceType: c.name,
        description: c.meta.description,
        url: pageUrl,
        provider: { "@type": "Organization", name: "Forrof", url: SITE_URL },
        areaServed: [
          { "@type": "Country", name: "New Zealand" },
          { "@type": "Country", name: "Australia" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: c.name,
          itemListElement: c.services.cards.map((card) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: card.title, description: card.desc },
          })),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: c.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: section.label, item: `${SITE_URL}${section.path}` },
          { "@type": "ListItem", position: 3, name: c.name, item: pageUrl },
        ],
      },
    ],
  };

  const answer = c.valueProp.answers[Math.min(activeProblem, c.valueProp.answers.length - 1)];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* HERO */}
      <motion.section
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
          <motion.nav
            aria-label="Breadcrumb"
            className="inline-block text-xs uppercase tracking-[0.3em] mb-8"
            style={{ color: "#00d4aa" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {section.path === "/services" ? (
              <Link to="/services" className="hover:opacity-70 transition-opacity">{section.label}</Link>
            ) : (
              section.label
            )}{" "}
            / {c.name}
          </motion.nav>
          <div className="overflow-hidden mb-6 pt-2 pb-6">
            <motion.h1
              className="text-[11vw] md:text-[8vw] xl:text-[7vw] font-bold leading-[0.95] tracking-tighter"
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
              {c.hero.heading}
            </motion.h1>
          </div>
          <motion.p
            className="text-lg md:text-2xl max-w-2xl leading-relaxed mt-10"
            style={{ color: "#48f0e7" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {c.hero.intro}
          </motion.p>
          <motion.div className="mt-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <Magnetic>
              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-80 transition-opacity"
              >
                {c.hero.cta}
                <ArrowUpRight size={18} />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </motion.section>

      {/* /01 VALUE PROPOSITION */}
      <section ref={refs.value} className="section-forced-light section-padding py-32 relative overflow-hidden">
        <div className="max-w-[1800px] mx-auto relative z-10">
          <SectionLabel num="/01" label="Value Proposition" inView={inView.value} />
          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={inView.value ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {c.valueProp.heading}
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-3xl mb-20 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView.value ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {c.valueProp.intro}
          </motion.p>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView.value ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-sm font-semibold mb-8 uppercase tracking-widest text-muted-foreground">Key Problems We Solve</h3>
              <ul className="space-y-3">
                {c.valueProp.problems.map((problem, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-4 p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                      activeProblem === i
                        ? "bg-accent/10 border-accent/40 scale-[1.02] shadow-lg shadow-accent/5"
                        : "bg-card border-border/40 hover:border-accent/20 hover:scale-[1.02] hover:shadow-md hover:bg-accent/[0.03]"
                    }`}
                    onClick={() => setActiveProblem(i)}
                    onMouseEnter={() => setActiveProblem(i)}
                  >
                    <span
                      className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-300 ${
                        activeProblem === i ? "bg-accent" : "bg-muted-foreground/40"
                      }`}
                    />
                    <p className="text-muted-foreground leading-relaxed">{problem}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView.value ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-sm font-semibold mb-8 uppercase tracking-widest text-muted-foreground">How Forrof Solves It</h3>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProblem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                  className="p-8 rounded-2xl bg-card border border-accent/40"
                >
                  <span className="text-xs text-accent font-medium tracking-widest uppercase block mb-4">
                    {String(activeProblem + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-2xl font-semibold mb-4">{answer.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{answer.desc}</p>
                </motion.div>
              </AnimatePresence>
              <div className="mt-6 flex gap-2">
                {c.valueProp.answers.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Show point ${i + 1}`}
                    onClick={() => setActiveProblem(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeProblem === i ? "bg-accent w-6" : "bg-border hover:bg-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* /02 SERVICES OVERVIEW */}
      <section ref={refs.services} className="section-forced-dark section-padding py-32 relative overflow-hidden">
        <div className="max-w-[1800px] mx-auto relative z-10">
          <SectionLabel num="/02" label="Services" inView={inView.services} />
          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <motion.h2
              className="text-4xl md:text-6xl font-bold tracking-tighter"
              initial={{ opacity: 0, y: 40 }}
              animate={inView.services ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {c.services.heading}
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground leading-relaxed self-end"
              initial={{ opacity: 0, y: 30 }}
              animate={inView.services ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {c.services.intro}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {c.services.cards.map((card, i) => {
              const body = (
                <GlowCard className="p-6 md:p-8 rounded-2xl bg-card border border-border/40 hover:border-accent/40 transition-all duration-300 group h-full">
                  <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase block mb-6">
                    /{String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-foreground transition-colors">
                    {card.title}
                    {card.slug && <ArrowUpRight size={16} className="inline ml-2 text-accent" />}
                  </h3>
                  <div className="max-h-0 group-hover:max-h-[200px] overflow-hidden transition-all duration-500">
                    <p className="text-muted-foreground leading-relaxed text-sm">{card.desc}</p>
                  </div>
                </GlowCard>
              );
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView.services ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.08 }}
                >
                  {card.slug ? <Link to={`/services/${card.slug}`} className="block h-full">{body}</Link> : body}
                </motion.div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {c.visual.terminal}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView.services ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-6">{c.visual.heading}</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">{c.visual.desc}</p>
              <Magnetic>
                <button
                  onClick={() => navigate("/contact")}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300 font-medium"
                >
                  Request a Consultation
                  <ArrowUpRight size={18} />
                </button>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={refs.stats} className="section-forced-dark section-padding py-24">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-border">
            {c.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center md:px-12"
                initial={{ opacity: 0, y: 30 }}
                animate={inView.stats ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <span className="text-5xl md:text-6xl font-bold block mb-3 tracking-tighter">
                  <CountUp value={stat.value} delay={200 + i * 100} />
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-widest">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* /03 TECH STACK */}
      <section ref={refs.tech} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <SectionLabel num="/03" label="Tech Stack" inView={inView.tech} />
          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <motion.h2
              className="text-4xl md:text-6xl font-bold tracking-tighter"
              initial={{ opacity: 0, y: 40 }}
              animate={inView.tech ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Modern Tech Stack, Proven Results
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground leading-relaxed self-end"
              initial={{ opacity: 0, y: 30 }}
              animate={inView.tech ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {c.techStack.intro}
            </motion.p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.techStack.items.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 40 }}
                animate={inView.tech ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <GlowCard className="p-8 rounded-2xl bg-card border border-border/40 hover:border-accent/40 transition-all duration-300 group h-full">
                  <TechLogo name={tech.name} className="w-10 h-10 mb-6" />
                  <h3 className="text-xl font-bold mb-4 group-hover:text-foreground transition-colors">{tech.name}</h3>
                  <div className="max-h-0 group-hover:max-h-[200px] overflow-hidden transition-all duration-500">
                    <p className="text-muted-foreground leading-relaxed text-sm">{tech.desc}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* /04 WHY US */}
      <section ref={refs.why} className="section-forced-dark section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <SectionLabel num="/04" label="Why Us" inView={inView.why} />
          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={inView.why ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Why Choose Forrof
          </motion.h2>
          <div className="grid lg:grid-cols-[1fr_0.6fr] gap-12 lg:gap-16 items-start">
            <div>
              {c.whyUs.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="border-t border-border group py-8"
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView.why ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                >
                  <div className="flex items-center gap-6">
                    <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase min-w-[32px]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-semibold group-hover:translate-x-4 transition-transform duration-500">{item.title}</h3>
                  </div>
                  <div className="max-h-0 group-hover:max-h-[200px] overflow-hidden transition-all duration-500">
                    <p className="text-muted-foreground leading-relaxed text-sm mt-4 pl-[56px]">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
              <div className="border-t border-border" />
            </div>
            <div className="hidden lg:block sticky top-28">{c.sideVisual}</div>
          </div>
        </div>
      </section>

      {/* /05 INDUSTRIES */}
      <section ref={refs.industries} className="section-forced-light section-padding py-32 relative overflow-hidden">
        <div className="max-w-[1800px] mx-auto">
          <SectionLabel num="/05" label={c.industries.label ?? "Industries"} inView={inView.industries} />
          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={inView.industries ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {c.industries.heading}
          </motion.h2>
          <div className="space-y-0">
            {c.industries.items.map((industry, i) => {
              const isOpen = openIndustry === i;
              return (
                <motion.div
                  key={industry.title}
                  className="border-t border-border"
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView.industries ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}
                >
                  <button
                    className="w-full py-7 flex items-center justify-between gap-6 text-left group transition-all duration-300 hover:pl-4 hover:bg-foreground/[0.03] rounded-xl"
                    onClick={() => setOpenIndustry(isOpen ? null : i)}
                    onMouseEnter={() => setOpenIndustry(i)}
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-6">
                      <motion.span
                        className="w-10 h-10 rounded-xl border flex items-center justify-center text-xs font-semibold flex-shrink-0 transition-all duration-300 group-hover:border-accent group-hover:bg-accent/10"
                        animate={{
                          borderColor: isOpen ? "hsl(var(--accent))" : "hsl(var(--border))",
                          backgroundColor: isOpen ? "hsl(var(--accent) / 0.1)" : "transparent",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </motion.span>
                      <h3 className="text-xl md:text-2xl font-semibold group-hover:text-foreground group-hover:translate-x-2 transition-all duration-300">
                        {industry.title}
                      </h3>
                    </div>
                    <motion.div
                      className="w-9 h-9 rounded-full border border-border flex items-center justify-center flex-shrink-0 group-hover:border-foreground group-hover:scale-110 transition-all duration-300"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isOpen ? <Minus size={14} className="text-foreground" /> : <Plus size={14} className="text-muted-foreground" />}
                    </motion.div>
                  </button>
                  <motion.div
                    className="overflow-hidden"
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <ul className="space-y-4 pb-8 max-w-4xl pl-16">
                      {industry.points.map((point) => (
                        <li key={point} className="flex items-start gap-4">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                          <p className="text-muted-foreground leading-relaxed text-sm">{point}</p>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              );
            })}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* /06 PROCESS */}
      <section ref={refs.process} className="section-forced-dark section-padding py-32 overflow-hidden">
        <div className="max-w-[1800px] mx-auto">
          <ProcessTimeline steps={c.process.steps} inView={inView.process} sectionLabel="/06" subtitle={c.process.note} />
        </div>
      </section>

      {/* /07 FAQ */}
      <section ref={refs.faq} className="section-forced-light section-padding py-32">
        <div className="max-w-[1800px] mx-auto">
          <SectionLabel num="/07" label="FAQ" inView={inView.faq} />
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-24">
            <motion.h2
              className="text-4xl md:text-6xl font-bold tracking-tighter"
              initial={{ opacity: 0, y: 40 }}
              animate={inView.faq ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {c.name} FAQs
            </motion.h2>
            <div>
              {c.faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={faq.q} className="border-t border-border">
                    <button
                      className="w-full py-6 flex items-center justify-between gap-6 text-left group"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                    >
                      <h3 className="text-lg md:text-xl font-semibold">{faq.q}</h3>
                      <span className="w-9 h-9 rounded-full border border-border flex items-center justify-center flex-shrink-0 group-hover:border-foreground transition-colors">
                        {isOpen ? <Minus size={14} /> : <Plus size={14} className="text-muted-foreground" />}
                      </span>
                    </button>
                    <motion.div
                      className="overflow-hidden"
                      initial={false}
                      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <p className="text-muted-foreground leading-relaxed pb-6 max-w-3xl">{faq.a}</p>
                    </motion.div>
                  </div>
                );
              })}
              <div className="border-t border-border" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={refs.cta} className="section-forced-dark section-padding py-40 relative overflow-hidden">
        <div className="max-w-[1800px] mx-auto text-center relative z-10">
          <motion.h2
            className="text-4xl md:text-7xl font-bold tracking-tighter mb-10"
            initial={{ opacity: 0, y: 40 }}
            animate={inView.cta ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {c.cta.heading}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView.cta ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Magnetic>
              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-3 px-8 py-5 bg-foreground text-background rounded-full font-medium hover:opacity-80 transition-opacity"
              >
                {c.cta.label}
                <ArrowUpRight size={18} />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
