import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LineReveal } from "./AnimationComponents";
import {
  Search,
  PenTool,
  Code,
  Rocket,
  Settings,
  Target,
  Users,
  BarChart3,
  Layers,
  Shield,
  Lightbulb,
  ClipboardList,
  CheckCircle,
  Database,
  Phone,
  Megaphone,
  Wrench,
  Share2,
  type LucideIcon,
} from "lucide-react";

/* ─── Auto-icon mapping — picks an icon from the step title ─── */
const ICON_KEYWORDS: [RegExp, LucideIcon][] = [
  [/discover|audit|research|analysis|assessment/i, Search],
  [/intro|call/i, Phone],
  [/stakeholder|interview/i, Users],
  [/plan|strategy|roadmap|inception/i, ClipboardList],
  [/benchmark|trend|report|optimi[sz]/i, BarChart3],
  [/design|ux|ui|visual|wireframe|prototype|moodboard/i, PenTool],
  [/architect|system|infrastructure/i, Layers],
  [/data|acquisition|preparation/i, Database],
  [/team|assembly|composition|co-creation/i, Users],
  [/develop|build|code|execution|engineering|agile/i, Code],
  [/test|qa|quality|assurance/i, CheckCircle],
  [/deploy|launch|ship|cloud|readiness/i, Rocket],
  [/security|compliance|shield/i, Shield],
  [/content|publishing|social|management/i, Megaphone],
  [/support|maintenance|ongoing/i, Settings],
  [/hand-?off|delivery/i, Share2],
  [/alignment|goal/i, Target],
  [/idea|concept|innovation/i, Lightbulb],
  [/integration|connect/i, Wrench],
];

function pickIcon(title: string): LucideIcon {
  for (const [pattern, icon] of ICON_KEYWORDS) {
    if (pattern.test(title)) return icon;
  }
  return Lightbulb; // fallback
}

interface ProcessStep {
  num: string;
  title: string;
  desc: string;
  icon?: LucideIcon;
  [key: string]: unknown;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
  inView: boolean;
  sectionLabel?: string;
  labelText?: string;
  title?: string;
  subtitle?: string;
}

export const ProcessTimeline = ({
  steps,
  inView,
  sectionLabel = "/03",
  labelText = "Process",
  title = "Our Process",
  subtitle,
}: ProcessTimelineProps) => {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      {/* Section label */}
      <motion.div
        className="flex items-center gap-4 mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <span className="number-label">{sectionLabel}</span>
        <LineReveal className="h-px bg-border flex-1" delay={0.3} />
        <span className="text-xs text-muted-foreground uppercase tracking-widest">
          {labelText}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h2
        className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 max-w-4xl text-center mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          className="text-muted-foreground mb-4 text-sm text-center max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}

      <div className="mb-20" />

      {/* Timeline */}
      <div ref={timelineRef} className="relative">
        {/* Center track */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border/20" />
        {/* Animated glow line */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] origin-top rounded-full"
          style={{
            height: lineHeight,
            background:
              "linear-gradient(to bottom, #48f0e7, #00d4aa, #126b66)",
            boxShadow:
              "0 0 12px rgba(72, 240, 231, 0.4), 0 0 30px rgba(0, 212, 170, 0.15)",
          }}
        />

        <div className="space-y-0">
          {steps.map((step, i) => {
            const isLeft = i % 2 === 0;
            const StepIcon = step.icon || pickIcon(step.title);

            const card = (
              <div className="relative p-5 md:p-7 rounded-xl border border-foreground/[0.06] bg-foreground/[0.02] max-w-md group hover:border-accent/20 transition-all duration-500">
                <span
                  className={`text-4xl md:text-5xl font-black text-foreground/[0.05] leading-none block mb-3 ${
                    isLeft ? "text-right" : ""
                  }`}
                >
                  {step.num}
                </span>
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {step.desc}
                </p>
              </div>
            );

            return (
              <motion.div
                key={i}
                className="relative flex items-start"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.12 }}
              >
                {/* Left side */}
                <div className="w-1/2 pr-8 md:pr-14">
                  {isLeft ? (
                    <div className="md:text-right pb-20 flex flex-col items-end">
                      {card}
                    </div>
                  ) : (
                    <div className="pb-20" />
                  )}
                </div>

                {/* Center icon node */}
                <div className="absolute left-1/2 -translate-x-1/2 top-5 z-10">
                  <motion.div
                    className="w-9 h-9 rounded-full border-2 border-accent bg-background flex items-center justify-center"
                    whileInView={{ scale: [0.3, 1.15, 1] }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 0.4 + i * 0.12,
                      ease: "backOut",
                    }}
                  >
                    <StepIcon size={14} className="text-accent" />
                  </motion.div>
                </div>

                {/* Right side */}
                <div className="w-1/2 pl-8 md:pl-14">
                  {!isLeft ? (
                    <div className="pb-20 flex flex-col items-start">
                      {card}
                    </div>
                  ) : (
                    <div className="pb-20" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
};
