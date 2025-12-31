import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { useRef } from "react";
import { LineReveal, Magnetic, ImageReveal } from "./AnimationComponents";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";
import { Linkedin, Twitter } from "lucide-react";

const team = [
  { name: "Alex Thompson", role: "Creative Director", image: team1 },
  { name: "Maria Santos", role: "Lead Designer", image: team2 },
  { name: "David Miller", role: "Brand Strategist", image: team3 },
  { name: "Emma Wilson", role: "Marketing Lead", image: team4 },
];

export const TeamSection = () => {
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

  return (
    <section
      id="about"
      className="section-padding md:py-40 max-md:pt-28 max-md:pb-16  relative overflow-hidden"
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
          <motion.span className="number-label">/06</motion.span>
          <LineReveal className="h-px bg-border flex-1" delay={0.3} />
          <motion.span className="text-xs text-muted-foreground uppercase tracking-widest">
            Team
          </motion.span>
        </motion.div>

        {/* Title */}
        <motion.div
          className="mb-24 max-w-4xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="overflow-hidden">
            <motion.h2
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95]"
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.3,
              }}
            >
              Meet the creative minds behind Forrof
            </motion.h2>
          </div>
        </motion.div>

        {/* Team Grid with Staggered Reveal */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              className="group"
              initial={{ opacity: 0, y: 80 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1,
                delay: 0.4 + index * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {/* Image with Multiple Effects */}
              <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[3/4]">
                {/* Image with Reveal and Hover Zoom */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1.4, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 1.5, delay: 0.5 + index * 0.15 }}
                >
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                  />
                </motion.div>

                {/* Gradient Overlay */}
                <motion.div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-700" />

                {/* Social Links on Hover */}
                <motion.div
                  className="absolute bottom-6 left-6 right-6 flex gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                >
                  <Magnetic strength={0.3}>
                    <motion.a
                      href="#"
                      className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Linkedin size={16} className="text-background" />
                    </motion.a>
                  </Magnetic>
                  <Magnetic strength={0.3}>
                    <motion.a
                      href="#"
                      className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Twitter size={16} className="text-background" />
                    </motion.a>
                  </Magnetic>
                </motion.div>
              </div>

              {/* Info with Slide Effect */}
              <div className="overflow-hidden">
                <motion.h3
                  className="text-xl font-semibold mb-1"
                  initial={{ y: "100%" }}
                  animate={isInView ? { y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.15 }}
                  whileHover={{ x: 10 }}
                >
                  {member.name}
                </motion.h3>
              </div>
              <motion.p
                className="text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 + index * 0.15 }}
              >
                {member.role}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
