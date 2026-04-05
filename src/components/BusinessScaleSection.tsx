import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { LineReveal } from "./AnimationComponents";
import { Lightbulb, Box, LayoutGrid, Star, ArrowRight } from "lucide-react";

const businessScales = [
  {
    id: "enterprise",
    label: "Enterprise",
    icon: Lightbulb,
    number: "01",
    description:
      "For our enterprise software development service, we help businesses scale existing products and teams, modernize legacy systems, and integrate with internal and external systems, ensuring complete stability, security, and compliance.",
    focus: [
      "Reliability, predictability, and trust;",
      "Future-proof architecture solutions;",
      "Long-term partnership, not one-time projects.",
    ],
    link: "/services/enterprise",
  },
  {
    id: "mid-sized",
    label: "Mid-Sized",
    icon: LayoutGrid,
    number: "02",
    description:
      "We help fast-growing companies optimize processes and UX, add new features without impacting the existing system, and prepare for product scaling.",
    focus: [
      "Fast time-to-market with clear priorities;",
      "Scalability without over-engineering;",
      "Visible business value from every release.",
    ],
    link: "/industries/mid-sized-business",
  },
  {
    id: "small-sized",
    label: "Small-Sized",
    icon: Box,
    number: "03",
    description:
      "Our teams help with digital transformation, product launches or updates, and process automation. We build intuitive solutions without overcomplications.",
    focus: [
      "Simple and practical solutions;",
      "Turnkey solution without overload;",
      "Clear communication without technical noise.",
    ],
    link: "/industries/small-business",
  },
  {
    id: "startups",
    label: "Startups",
    icon: Star,
    number: "04",
    description:
      "We work directly with founders, helping them validate ideas and launch MVPs with rapid iterations and honest risk assessment. We test hypotheses and help prepare investor demos.",
    focus: [
      "Product-first thinking, not just coding;",
      "Active participation in vision formation;",
      "UX and core value, not unnecessary features.",
    ],
    link: "/services/mvp",
  },
];

// Helper to create arc path for filled donut segments
const createArcPath = (
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startAngle: number,
  endAngle: number
) => {
  const gap = 2;
  const s = startAngle + gap / 2;
  const e = endAngle - gap / 2;

  const startRad = ((s - 90) * Math.PI) / 180;
  const endRad = ((e - 90) * Math.PI) / 180;
  const largeArc = e - s > 180 ? 1 : 0;

  const ox1 = cx + outerR * Math.cos(startRad);
  const oy1 = cy + outerR * Math.sin(startRad);
  const ox2 = cx + outerR * Math.cos(endRad);
  const oy2 = cy + outerR * Math.sin(endRad);

  const ix1 = cx + innerR * Math.cos(endRad);
  const iy1 = cy + innerR * Math.sin(endRad);
  const ix2 = cx + innerR * Math.cos(startRad);
  const iy2 = cy + innerR * Math.sin(startRad);

  return `M ${ox1} ${oy1} A ${outerR} ${outerR} 0 ${largeArc} 1 ${ox2} ${oy2} L ${ix1} ${iy1} A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix2} ${iy2} Z`;
};

const segmentColors = [
  { active: "#00d4aa", inactive: "rgba(0, 212, 170, 0.12)" },
  { active: "#10a89e", inactive: "rgba(0, 212, 170, 0.08)" },
  { active: "#126b66", inactive: "rgba(0, 212, 170, 0.06)" },
  { active: "#0e7a73", inactive: "rgba(0, 212, 170, 0.04)" },
];

const BusinessDonut = ({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (i: number) => void;
}) => {
  const cx = 200,
    cy = 200,
    outerR = 170,
    innerR = 110;
  const segmentAngle = 360 / businessScales.length;

  const segments = useMemo(
    () =>
      businessScales.map((scale, index) => {
        const startAngle = index * segmentAngle;
        const endAngle = startAngle + segmentAngle;
        const midAngleRad =
          (((startAngle + endAngle) / 2 - 90) * Math.PI) / 180;
        const iconR = (outerR + innerR) / 2;
        const iconX = cx + iconR * Math.cos(midAngleRad);
        const iconY = cy + iconR * Math.sin(midAngleRad);

        return {
          ...scale,
          path: createArcPath(cx, cy, outerR, innerR, startAngle, endAngle),
          iconX,
          iconY,
          colors: segmentColors[index],
        };
      }),
    [segmentAngle]
  );

  return (
    <div className="relative w-[300px] h-[300px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px]">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <defs>
          <radialGradient id="center-dark-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(220, 40%, 7%)" />
            <stop offset="100%" stopColor="hsl(220, 55%, 5%)" />
          </radialGradient>
        </defs>

        {/* Dark center circle */}
        <circle cx={cx} cy={cy} r={innerR - 2} fill="url(#center-dark-gradient)" />

        {/* Segments */}
        {segments.map((seg, index) => {
          const isActive = activeIndex === index;
          return (
            <g key={seg.id}>
              <motion.path
                d={seg.path}
                className="cursor-pointer"
                fill={isActive ? seg.colors.active : seg.colors.inactive}
                onClick={() => onSelect(index)}
                animate={{
                  scale: isActive ? 1.04 : 1,
                }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                whileHover={{ scale: isActive ? 1.04 : 1.02 }}
              />

              {/* Icon on segment */}
              <foreignObject
                x={seg.iconX - 16}
                y={seg.iconY - 16}
                width={32}
                height={32}
                className="pointer-events-none"
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  <seg.icon
                    size={18}
                    className={`transition-colors duration-300 ${
                      isActive ? "text-[#050a12]" : "text-[#00d4aa]/40"
                    }`}
                  />
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>

      {/* Center label */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeIndex}
            className="text-lg md:text-xl font-semibold text-foreground"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
          >
            {businessScales[activeIndex].label}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

export const BusinessScaleSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeScale, setActiveScale] = useState(0);
  const navigate = useNavigate();

  return (
    <section
      className="section-forced-dark section-padding md:py-20 py-12 overflow-hidden relative"
      ref={containerRef}
      data-no-cursor-light
      style={{
        background: `
          radial-gradient(ellipse 50% 40% at 0% 100%, rgba(0, 212, 170, 0.06) 0%, transparent 70%),
          radial-gradient(ellipse 40% 35% at 100% 0%, rgba(18, 107, 102, 0.04) 0%, transparent 70%),
          linear-gradient(180deg, #050a12 0%, #06110f 50%, #050a12 100%)
        `,
      }}
    >
      <div className="max-w-[1800px] mx-auto relative z-10">
        {/* Header — same pattern as other sections */}
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.span className="number-label">/05</motion.span>
          <LineReveal className="h-px bg-border flex-1" delay={0.3} />
          <motion.span className="text-xs text-muted-foreground uppercase tracking-widest">
            Business Scale
          </motion.span>
        </motion.div>

        {/* Title Grid — matches site heading pattern */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="overflow-hidden">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl pb-2 font-bold leading-[0.95]"
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.2,
              }}
            >
              Solutions for Every Stage
            </motion.h2>
          </div>
          <motion.div
            className="flex items-end"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <p className="text-xl text-muted-foreground max-w-md leading-relaxed">
              From startups to enterprises, we design solutions tailored to your stage of growth — with the right focus, speed, and scale.
            </p>
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Donut Chart */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <BusinessDonut
              activeIndex={activeScale}
              onSelect={setActiveScale}
            />
          </motion.div>

          {/* Right - Accordion Content */}
          <div>
            {businessScales.map((scale, index) => (
              <motion.div
                key={scale.id}
                className={`border-b border-border cursor-pointer transition-colors duration-300 ${
                  activeScale === index ? "" : "hover:bg-foreground/[0.03]"
                }`}
                onClick={() => setActiveScale(index)}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
              >
                <div className="flex items-center gap-4 py-5">
                  <span className="text-xs text-muted-foreground/60 font-mono min-w-[24px]">
                    {scale.number}
                  </span>
                  <h3
                    className={`text-xl md:text-2xl font-semibold transition-colors duration-300 ${
                      activeScale === index
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {scale.label}
                  </h3>
                </div>

                <AnimatePresence initial={false}>
                  {activeScale === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
                        opacity: { duration: 0.3, delay: 0.1 },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pl-10">
                        <p className="text-muted-foreground leading-relaxed mb-5 text-[15px]">
                          {scale.description}
                        </p>
                        <p className="text-sm font-semibold mb-3 text-foreground/80">
                          Our focus is:
                        </p>
                        <ul className="space-y-2.5">
                          {scale.focus.map((item, i) => (
                            <motion.li
                              key={i}
                              className="flex items-start gap-3 text-muted-foreground text-sm"
                              initial={{ opacity: 0, x: 12 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.05 + i * 0.08 }}
                            >
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00d4aa] shrink-0" />
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                        <motion.button
                          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#00d4aa] hover:text-[#00f0c0] transition-colors duration-200 group"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(scale.link);
                          }}
                        >
                          Learn more
                          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
