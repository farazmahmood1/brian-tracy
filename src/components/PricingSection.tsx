import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowUpRight } from "lucide-react";
import { LineReveal, Magnetic } from "./AnimationComponents";

// All prices in USD. "market" is a typical agency range for comparison.
const pricingPlans = [
  {
    name: "Fixed-Scope Project",
    price: "$2,900",
    period: "starting",
    description: "Integrations, AI automations, MVPs, and client portals - delivered against a fixed quote.",
    features: [
      "Fixed price agreed before work starts",
      "Discovery, design, build, and launch",
      "Weekly demos in your time zone",
      "Full source code and documentation",
      "30 days of post-launch support",
    ],
    highlighted: true,
  },
  {
    name: "Monthly Growth Retainer",
    price: "$690",
    period: "/month",
    description: "SEO, AI search visibility, performance marketing, and ongoing support.",
    features: [
      "Monthly SEO or ad management plan",
      "Tracking and reporting tied to inquiries",
      "Ongoing maintenance and improvements",
      "Month-to-month after initial setup",
      "Dedicated account lead",
    ],
    highlighted: false,
  },
  {
    name: "Dedicated Team",
    price: "$3,490",
    period: "/month per developer",
    description: "Senior engineers embedded in your roadmap, working your business hours.",
    features: [
      "Full-time senior developers",
      "Daily overlap with your working hours",
      "Project lead and QA included",
      "Scale the team up or down monthly",
      "No recruitment or HR overheads",
    ],
    highlighted: false,
  },
];

const servicePrices: { service: string; slug: string; price: string; unit: string; market: string | null }[] = [
  { service: "AI & Automation", slug: "ai-automation", price: "From $3,900", unit: "per workflow", market: "$5,000–$15,000 typical" },
  { service: "Custom Software Development", slug: "custom-software", price: "From $7,900", unit: "MVP / client portal", market: "$12,000–$18,000 typical" },
  { service: "Systems Integration & Data", slug: "systems-integration", price: "From $2,900", unit: "per integration", market: null },
  { service: "SEO & AI Search Visibility", slug: "seo", price: "From $890", unit: "per month", market: "$1,000–$3,300/mo typical" },
  { service: "Performance Marketing", slug: "performance-marketing", price: "From $690", unit: "per month + ad spend", market: "$550–$1,300/mo or 10–20% typical" },
];

export const PricingSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section
      id="pricing"
      className="section-forced-dark section-padding md:py-20 py-24 overflow-hidden"
      ref={containerRef}
    >
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="number-label">/05</span>
          <LineReveal className="h-px bg-border flex-1" delay={0.3} />
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Pricing</span>
        </motion.div>

        {/* Title Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="overflow-hidden">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.95] pb-4"
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            >
              Transparent Software &amp; Marketing Pricing
            </motion.h2>
          </div>
          <motion.div
            className="flex items-end"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <p className="text-xl text-muted-foreground max-w-md leading-relaxed mb-2">
              Senior-level delivery at a fraction of typical agency rates. All prices in USD,
              with a fixed quote before any work begins.
            </p>
          </motion.div>
        </div>

        {/* Engagement models */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-3xl p-8 md:p-10 flex flex-col border ${
                plan.highlighted ? "border-[#00d4aa]/25" : "border-border bg-card/50"
              }`}
              style={plan.highlighted ? { background: "linear-gradient(160deg, #0a1317 0%, #0e2423 100%)" } : undefined}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 + index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h3 className="text-sm font-medium uppercase tracking-widest mb-6 text-muted-foreground">{plan.name}</h3>
              <div className="flex items-baseline gap-2 mb-4 flex-wrap">
                <span className="text-5xl md:text-6xl font-bold">{plan.price}</span>
                <span className="text-base text-muted-foreground">{plan.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-8 leading-relaxed">{plan.description}</p>
              <ul className="space-y-3 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center bg-foreground/10 shrink-0">
                      <Check size={12} />
                    </span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Magnetic strength={0.1}>
                <a
                  href="#contact"
                  className={`flex items-center justify-center gap-2 py-4 rounded-full font-medium transition-opacity hover:opacity-85 ${
                    plan.highlighted ? "bg-[#00d4aa] text-[#050a12]" : "bg-foreground text-background"
                  }`}
                >
                  Get a Fixed Quote
                  <ArrowUpRight size={18} />
                </a>
              </Magnetic>
            </motion.div>
          ))}
        </div>

        {/* Starting prices by service - hidden for now
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">
            Starting Prices by Service (USD)
          </h3>
          <div className="border-t border-border">
            {servicePrices.map((row) => (
              <Link
                key={row.slug}
                to={`/services/${row.slug}`}
                className="group grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_auto] items-center gap-2 md:gap-6 py-5 border-b border-border"
              >
                <span className="text-lg md:text-xl font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  {row.service}
                </span>
                <span>
                  <span className="text-lg font-semibold text-[#8fd6cb]">{row.price}</span>{" "}
                  <span className="text-sm text-muted-foreground">{row.unit}</span>
                </span>
                <span className="text-sm text-muted-foreground">
                  {row.market ? (
                    <>Typical agencies: <span className="line-through decoration-muted-foreground/50">{row.market}</span></>
                  ) : (
                    "Fixed quote per system"
                  )}
                </span>
                <ArrowUpRight size={18} className="hidden md:block text-muted-foreground group-hover:text-foreground transition-colors" />
              </Link>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Market ranges are typical published agency rates in USD. Final pricing depends on
            scope - every engagement starts with a fixed quote.
          </p>
        </motion.div>
        */}
      </div>
    </section>
  );
};
