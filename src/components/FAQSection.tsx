import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import { LineReveal, Magnetic } from "./AnimationComponents";
import { useNavigate } from "react-router-dom";

const faqs = [
  {
    question: "What software and digital services does Forrof provide?",
    answer:
      "Forrof is a full service software agency offering branding, UI UX design, custom web development, mobile app development, SaaS solutions, SEO, digital marketing, cloud solutions, automation, cybersecurity, and digital transformation services for businesses of all sizes.",
  },
  {
    question: "How long does a custom software or web development project take?",
    answer:
      "Project timelines depend on scope and complexity. UI UX design and branding projects typically take 4 to 6 weeks, while custom web development, SaaS platforms, and mobile applications usually take 8 to 12 weeks. A detailed timeline is shared after project discovery.",
  },
  {
    question: "How much does custom software development cost at Forrof?",
    answer:
      "Pricing depends on project requirements, features, and complexity. Our custom software and web development projects typically start from $5,490, with monthly retainers available from $8,990 per month for ongoing design, development, and SEO services.",
  },
  {
    question: "Do you work with international and remote clients?",
    answer:
      "Yes, Forrof works with international clients worldwide. We specialize in remote collaboration using modern communication tools to deliver web development, software, and digital solutions across different time zones.",
  },
  {
    question: "Do you offer revisions and ongoing support?",
    answer:
      "Yes, all our projects include revisions to ensure complete satisfaction. We also provide ongoing support, performance optimization, SEO maintenance, and feature enhancements after project delivery.",
  },
];


export const FAQSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <section
      className="section-padding md:py-20 py-24 relative overflow-hidden"
      ref={containerRef}
    >
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.span className="number-label">/07</motion.span>
          <LineReveal className="h-px bg-border flex-1" delay={0.3} />
          <motion.span className="text-xs text-muted-foreground uppercase tracking-widest">
            FAQ
          </motion.span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left Column - Title & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 1.2,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <div className="overflow-hidden mb-8">
              <motion.h2
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95]"
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
              >
                Frequently Asked Questions About Our Software and Digital Services
              </motion.h2>
            </div>
            <motion.p
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              Didn't find the answer? Ask us about our services!
            </motion.p>
            <Magnetic strength={0.15}>
              <motion.a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/contact");
                }}
                className="inline-flex items-center gap-3 px-8 py-4 border border-border rounded-full overflow-hidden relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="absolute inset-0 bg-foreground"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
                <span className="relative z-10 font-medium">
                  Ask your Question
                </span>
                <ArrowUpRight size={18} className="relative z-10" />
              </motion.a>
            </Magnetic>
          </motion.div>

          {/* Right Column - FAQ Accordion */}
          <motion.div
            className="space-y-0"
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 1.2,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="border-t border-border"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <motion.button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full flex items-center justify-between py-8 text-left group"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="font-medium text-lg md:text-xl pr-8 group-hover:text-foreground transition-colors">
                    {faq.question}
                  </span>
                  <motion.div
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center shrink-0"
                    animate={{
                      rotate: openIndex === index ? 180 : 0,
                      backgroundColor:
                        openIndex === index
                          ? "hsl(var(--foreground))"
                          : "transparent",
                      borderColor:
                        openIndex === index
                          ? "hsl(var(--foreground))"
                          : "hsl(var(--border))",
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {openIndex === index ? (
                      <Minus size={16} className="text-background" />
                    ) : (
                      <Plus size={16} />
                    )}
                  </motion.div>
                </motion.button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <motion.p
                        className="text-muted-foreground pb-8 pr-16 leading-relaxed"
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        {faq.answer}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
            <motion.div
              className="border-t border-border"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, delay: 1 }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>
        </div>
      </div>

      <div className="sr-only">
        <h3>Software Agency FAQ</h3>
        <p>
          Learn more about Forrof’s software development, web development, UI UX design,
          SEO services, pricing, timelines, and international client support.
        </p>
      </div>
    </section>
  );
};
