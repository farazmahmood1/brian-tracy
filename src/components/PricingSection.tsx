import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { useRef } from "react";
import { Check, ArrowUpRight, Star } from "lucide-react";
import { LineReveal, Magnetic, Reveal } from "./AnimationComponents";

const pricingPlans = [
  {
    name: "Per Project",
    price: "$5,490",
    description: "Perfect for one-time projects and specific deliverables",
    features: [
      "Brand identity design",
      "Website design & development",
      "Marketing materials",
      "Social media assets",
      "Unlimited revisions",
      "Source files included",
    ],
    highlighted: false,
  },
  {
    name: "Monthly",
    price: "$8,990",
    period: "/month",
    description: "Ongoing partnership for continuous growth and support",
    features: [
      "Everything in Per Project",
      "Dedicated design team",
      "Priority support 24/7",
      "Monthly strategy calls",
      "Content creation",
      "Performance analytics",
      "SEO optimization",
      "Social media management",
    ],
    highlighted: true,
  },
];

export const PricingSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });
  const rotateLeft = useTransform(smoothProgress, [0, 1], [5, -5]);
  const rotateRight = useTransform(smoothProgress, [0, 1], [-5, 5]);

  return (
    <section
      id="pricing"
      className="section-padding md:py-40 py-24 relative overflow-hidden border-t border-border"
      ref={containerRef}
    >
      {/* Decorative floating elements */}
      <motion.div
        className="absolute top-20 right-20 opacity-20"
        animate={{ rotate: 360, y: [0, -20, 0] }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          y: { duration: 4, repeat: Infinity },
        }}
      >
        <Star size={100} />
      </motion.div>

      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.span className="number-label">/04</motion.span>
          <LineReveal className="h-px bg-border flex-1" delay={0.3} />
          <motion.span className="text-xs text-muted-foreground uppercase tracking-widest">
            Pricing
          </motion.span>
        </motion.div>

        {/* Title Grid */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <div className="overflow-hidden">
            <motion.h2
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95]"
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.2,
              }}
            >
              Simple, transparent pricing
            </motion.h2>
          </div>
          <motion.div
            className="flex items-end"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <p className="text-xl text-muted-foreground max-w-md leading-relaxed">
              Choose the plan that works best for your business. All plans
              include our commitment to excellence and results.
            </p>
          </motion.div>
        </div>

        {/* Pricing Cards with 3D Tilt Effect */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-3xl p-10 md:p-12 overflow-hidden ${
                plan.highlighted
                  ? "bg-foreground text-background"
                  : "border border-border bg-card/50"
              }`}
              initial={{ opacity: 0, y: 80, rotateX: 10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{
                duration: 1,
                delay: 0.5 + index * 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={{
                y: -15,
                scale: 1.02,
                transition: { duration: 0.4 },
              }}
              style={{
                rotate: index === 0 ? rotateLeft : rotateRight,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Popular Badge with Pulse */}
              {plan.highlighted && (
                <motion.span
                  className="absolute top-6 right-6 px-4 py-1.5 bg-background text-foreground text-xs font-semibold rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.8 + index * 0.2, type: "spring" }}
                >
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Popular
                  </motion.span>
                </motion.span>
              )}

              {/* Plan Name */}
              <motion.h3
                className="text-sm font-medium uppercase tracking-widest mb-6 opacity-60"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 0.6, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.2 }}
              >
                {plan.name}
              </motion.h3>

              {/* Price with Counter Animation */}
              <div className="flex items-baseline gap-2 mb-4">
                <motion.span
                  className="text-6xl md:text-7xl font-bold"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: 0.7 + index * 0.2,
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  {plan.price}
                </motion.span>
                {plan.period && (
                  <motion.span
                    className="text-xl opacity-60"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 0.6, x: 0 } : {}}
                    transition={{ delay: 0.8 + index * 0.2 }}
                  >
                    {plan.period}
                  </motion.span>
                )}
              </div>

              {/* Description */}
              <motion.p
                className={`text-sm mb-10 ${
                  plan.highlighted ? "opacity-70" : "text-muted-foreground"
                }`}
                initial={{ opacity: 0 }}
                animate={
                  isInView ? { opacity: plan.highlighted ? 0.7 : 1 } : {}
                }
                transition={{ delay: 0.8 + index * 0.2 }}
              >
                {plan.description}
              </motion.p>

              {/* Features with Staggered Animation */}
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, featureIndex) => (
                  <motion.li
                    key={feature}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      delay: 0.9 + index * 0.2 + featureIndex * 0.05,
                    }}
                  >
                    <motion.div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        plan.highlighted
                          ? "bg-background/20"
                          : "bg-foreground/10"
                      }`}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Check size={12} />
                    </motion.div>
                    <span
                      className={`text-sm ${
                        plan.highlighted ? "opacity-90" : ""
                      }`}
                    >
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button with Hover Effect */}
              <Magnetic strength={0.1}>
                <motion.a
                  href="#contact"
                  className={`flex items-center justify-center gap-2 py-5 rounded-full font-medium overflow-hidden relative group ${
                    plan.highlighted
                      ? "bg-background text-foreground"
                      : "bg-foreground text-background"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span
                    className={`absolute inset-0 ${
                      plan.highlighted ? "bg-foreground" : "bg-background"
                    }`}
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      plan.highlighted
                        ? "group-hover:text-foreground"
                        : "group-hover:text-background"
                    }`}
                  >
                    Get Started
                  </span>
                  <ArrowUpRight
                    size={18}
                    className={`relative z-10 transition-colors duration-300 ${
                      plan.highlighted
                        ? "group-hover:text-foreground"
                        : "group-hover:text-background"
                    }`}
                  />
                </motion.a>
              </Magnetic>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
