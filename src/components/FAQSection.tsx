import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import { LineReveal, Magnetic } from "./AnimationComponents";
import { useNavigate } from "react-router-dom";

const faqs = [
  {
    question: "What services does Forrof provide to New Zealand and Australian businesses?",
    answer:
      "Forrof provides five core services: AI & automation (AI agents, LLM and RAG solutions, workflow automation), custom software development (web apps, SaaS, mobile apps, client portals), systems integration & data (API and Xero integrations, dashboards), SEO & AI search visibility, and performance marketing (Google, Meta, and LinkedIn ads). We specialise in LegalTech and Agriculture.",
  },
  {
    question: "Do you build software and AI for law firms?",
    answer:
      "Yes. We have built e-signing platforms, AI assistants for legal professionals, and lawyer-client applications. We build client portals, document automation, and legal AI that integrate with practice management systems such as Actionstep, LEAP, and Smokeball - designed around NZ Law Society generative AI guidance, with human review and client confidentiality built in.",
  },
  {
    question: "Do you work with farms and agribusinesses?",
    answer:
      "Yes. We build and support farm management software, offline-ready field apps, equipment and agronomy data integrations (including John Deere and Climate FieldView), and automated compliance reporting for agribusinesses in New Zealand and Australia.",
  },
  {
    question: "How much does custom software development cost?",
    answer:
      "Prices are in USD. Fixed-scope projects such as an MVP or client portal start from $7,900, single system integrations from $2,900, and AI automation workflows from $3,900. Monthly SEO starts from $890, performance marketing management from $690 plus ad spend, and a dedicated developer from $3,490 per month. Every project starts with a fixed quote, so you know the cost before work begins.",
  },
  {
    question: "Can we meet during New Zealand and Australian business hours?",
    answer:
      "Yes. We schedule live calls, demos, and support between 12pm and 5pm AEST (2pm-5pm NZT), with async updates in your inbox every morning. You get a dedicated project lead and a weekly progress demo.",
  },
  {
    question: "Is our data secure and compliant with NZ and Australian privacy law?",
    answer:
      "We design every system around the New Zealand Privacy Act 2020 and the Australian Privacy Principles - with encryption, role-based access, audit trails, and Australian data hosting options. AI solutions use enterprise APIs that do not train on your data.",
  },
  {
    question: "Who owns the code and do you provide ongoing support?",
    answer:
      "You own 100% of the source code, data, and accounts from day one. After launch we offer ongoing support, maintenance, and feature development on a monthly plan - or a full handover to your own team.",
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
          className="flex items-center gap-4 mb-12"
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
            <div className="overflow-hidden mb-8 pb-3">
              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.95]"
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
              >
                Frequently Asked Questions About Software, AI & Growth Services in NZ & Australia
              </motion.h2>
            </div>
            <motion.p
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              Didn’t find your answer? Talk with our team.
            </motion.p>
            <Magnetic strength={0.15}>
              <motion.a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/contact");
                }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white overflow-hidden relative group"
                style={{ background: "linear-gradient(135deg, #126b66, #00d4aa)" }}
                data-cursor="Ask"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  opacity: { delay: 0.6 },
                  y: { delay: 0.6 },
                  scale: { duration: 0.2, delay: 0 },
                  boxShadow: { duration: 0.2, delay: 0 },
                }}
                whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(72, 240, 231, 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
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
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                onMouseEnter={() => setOpenIndex(index)}
              >
                <button
                  className="w-full flex items-center justify-between py-8 text-left group transition-all duration-300 hover:pl-4 hover:bg-foreground/[0.03] rounded-xl"
                >
                  <span className="font-medium text-lg md:text-xl pr-8 group-hover:text-foreground group-hover:translate-x-2 transition-all duration-300">
                    {faq.question}
                  </span>
                  <motion.div
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-300"
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
                </button>
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
                        className="text-muted-foreground pb-8 pr-4 md:pr-16 leading-relaxed"
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }),
        }}
      />
      <div className="sr-only">
        <h3>Software, AI and Marketing Agency FAQ - New Zealand and Australia</h3>
        <p>
          Answers about Forrof's AI automation, custom software development, systems integration,
          SEO, performance marketing, pricing, and support for law firms and agribusinesses in New Zealand and Australia.
        </p>
      </div>
    </section>
  );
};
