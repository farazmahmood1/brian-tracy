import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const marqueeItems = [
  "Branding",
  "Web Design",
  "Web Development",
  "Mobile App Development",
  "Marketing",
  "SEO",
  "UI/UX",
  "Data Solutions",
  "Cybersecurity",
  "Cloud Solutions",
  "Ecommerce Solutions",
  "Custom Software",
  "SaaS Development",
  "API Development",
  "System Integration",
  "DevOps",
  "Performance Optimization",
  "Automation",
  "CRM Solutions",
  "CMS Development",
  "Product Strategy",
  "Digital Transformation",
  "Analytics & Reporting",
];

export const MarqueeSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="py-20 overflow-hidden border-y border-border relative"
    >

      <div className="relative overflow-hidden mb-3 pb-5">
        <style>{`
          @keyframes marquee-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .marquee-left { display: flex; width: max-content; will-change: transform; }
        `}</style>

        <div
          className="marquee-left"
          style={{ animation: "marquee-left 200s linear infinite" }}
          aria-hidden
        >
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-8 shrink-0 pr-8">
              {marqueeItems.map((item, index) => (
                <div
                  key={`${setIndex}-${index}`}
                  className="flex items-center gap-6 shrink-0"
                >
                  <span className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter whitespace-nowrap text-foreground/10 hover:text-foreground/40 transition-colors duration-500">
                    {item}
                  </span>
                  <motion.div
                    className="w-4 h-4 rounded-full bg-foreground/20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Second row - continuous marquee (reverse) */}
      <div className="relative overflow-hidden pb-5">
        <style>{`
          @keyframes marquee-right { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .marquee-right { display: flex; width: max-content; will-change: transform; }
        `}</style>

        <div
          className="marquee-right"
          style={{ animation: "marquee-right 200s linear infinite reverse" }}
          aria-hidden
        >
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-8 shrink-0 pr-8">
              {[...marqueeItems].reverse().map((item, index) => (
                <div
                  key={`${setIndex}-${index}`}
                  className="flex items-center gap-6 shrink-0"
                >
                  <span className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter whitespace-nowrap text-foreground/10 hover:text-foreground/40 transition-colors duration-500 italic">
                    {item}
                  </span>
                  <motion.div
                    className="w-3 h-3 rotate-45 bg-foreground/20"
                    animate={{ rotate: [45, 225, 45] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
