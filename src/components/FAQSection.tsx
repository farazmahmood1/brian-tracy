import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import { LineReveal, Magnetic } from "./AnimationComponents";
import { useNavigate } from "react-router-dom";

const faqs = [
  {
    question: "What services does Forrof offer?",
    answer:
      "We offer a comprehensive range of creative services including brand identity design, UI/UX design, web development, social media marketing, SEO optimization, and content creation. Our team works closely with clients to deliver tailored solutions that drive results.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary depending on scope and complexity. A brand identity project typically takes 4-6 weeks, while a complete website design and development project may take 8-12 weeks. We provide detailed timelines during our initial consultation.",
  },
  {
    question: "What is your pricing structure?",
    answer:
      "We offer flexible pricing options including per-project rates starting from $5,490 and monthly retainer packages starting from $8,990/month. The exact pricing depends on the scope of work and deliverables required.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes! We work with clients worldwide. Our team is experienced in remote collaboration and we use modern tools to ensure seamless communication across different time zones and cultures.",
  },
  {
    question: "What is your revision policy?",
    answer:
      "All our packages include unlimited revisions to ensure you are completely satisfied with the final deliverables. We believe in collaborative work and value your feedback throughout the entire design process.",
  },
];

export const FAQSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <section
      className="section-padding md:py-40 py-24 relative overflow-hidden border-t border-border"
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
                Common questions
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
    </section>
  );
};
