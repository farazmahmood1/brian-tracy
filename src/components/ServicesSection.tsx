import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  Reveal,
  LineReveal,
  Magnetic,
  TextReveal,
} from "./AnimationComponents";

const services = [
  {
    number: "01",
    title: "Branding and Identity",
    description:
      "We create distinctive brand identities that communicate your values and resonate with your target audience through strategic design thinking.",
    image:
      "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&q=80",
  },
  {
    number: "02",
    title: "UI/UX and Product Design",
    description:
      "User-centered design solutions that combine aesthetics with functionality for seamless digital experiences that users love.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
  },
  {
    number: "03",
    title: "Social Media Marketing",
    description:
      "Strategic social media campaigns that build communities, increase engagement, and drive meaningful conversions for your brand.",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80",
  },
  {
    number: "04",
    title: "SEO Optimization",
    description:
      "Data-driven SEO strategies that improve visibility, organic traffic, and search engine rankings to grow your business.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
  {
    number: "05",
    title: "Web Development",
    description:
      "Custom web solutions built with modern technologies for performance, scalability, and exceptional user engagement.",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80",
  },
  {
    number: "06",
    title: "Content Creation",
    description:
      "Compelling visual and written content that tells your brand story and captures the attention of your audience.",
    image:
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&q=80",
  },
];

export const ServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      id="services"
      className="section-padding md:py-40 py-24 relative overflow-hidden"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Floating image that follows cursor when hovering */}
      <motion.div
        className="fixed pointer-events-none z-50 w-64 h-80 rounded-xl overflow-hidden"
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 160,
          opacity: hoveredIndex !== null ? 1 : 0,
          scale: hoveredIndex !== null ? 1 : 0.8,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      >
        {hoveredIndex !== null && (
          <motion.img
            src={services[hoveredIndex].image}
            alt={services[hoveredIndex].title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </motion.div>

      <div className="max-w-[1800px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.span
            className="number-label"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            /02
          </motion.span>
          <LineReveal className="h-px bg-border flex-1" delay={0.4} />
          <motion.span
            className="text-xs text-muted-foreground uppercase tracking-widest"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            Services
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
              What we can do for your brand
            </motion.h2>
          </div>
          <motion.div
            className="flex items-end"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <p className="text-xl text-muted-foreground max-w-md leading-relaxed">
              We provide comprehensive creative solutions tailored to elevate
              your brand presence and accelerate business growth.
            </p>
          </motion.div>
        </div>

        {/* Services List with Hover Image Effect */}
        <div className="space-y-0">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              className="group border-t border-border cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="py-8 md:py-10 flex items-start md:items-center justify-between gap-6">
                <div className="flex items-start md:items-center gap-6 md:gap-16 flex-1">
                  <motion.span
                    className="text-sm text-muted-foreground font-medium min-w-[40px]"
                    animate={{
                      color:
                        hoveredIndex === index
                          ? "hsl(var(--foreground))"
                          : "hsl(var(--muted-foreground))",
                    }}
                  >
                    /{service.number}
                  </motion.span>
                  <div className="md:overflow-visible">
                    <motion.h3
                      className="text-2xl md:text-4xl lg:text-5xl font-semibold"
                      animate={{
                        x: hoveredIndex === index ? 30 : 0,
                      }}
                      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      {service.title}
                    </motion.h3>
                  </div>
                </div>
                <motion.div
                  className="w-12 h-12 rounded-full border border-border flex items-center justify-center"
                  animate={{
                    backgroundColor:
                      hoveredIndex === index
                        ? "hsl(var(--foreground))"
                        : "transparent",
                    borderColor:
                      hoveredIndex === index
                        ? "hsl(var(--foreground))"
                        : "hsl(var(--border))",
                    rotate: hoveredIndex === index ? 45 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <ArrowUpRight
                    size={20}
                    className={
                      hoveredIndex === index
                        ? "text-background"
                        : "text-foreground"
                    }
                  />
                </motion.div>
              </div>

              {/* Expandable description */}
              <motion.div
                className="overflow-hidden"
                initial={{ height: 0 }}
                animate={{
                  height: hoveredIndex === index ? "auto" : 0,
                }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <p className="text-muted-foreground pb-8 pl-0 md:pl-[104px] max-w-2xl leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
          <motion.div
            className="border-t border-border"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: 1 }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </div>
    </section>
  );
};
