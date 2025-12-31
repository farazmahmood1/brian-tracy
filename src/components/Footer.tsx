import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import {
  Twitter,
  Instagram,
  Linkedin,
  Dribbble,
  ArrowUpRight,
} from "lucide-react";
import { Magnetic, LineReveal } from "./AnimationComponents";

const footerLinks = {
  services: ["Branding", "UI/UX Design", "Web Development", "Marketing", "SEO"],
  company: ["About", "Team", "Careers", "Blog", "Contact"],
  social: [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ],
};

export const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });
  const textY = useTransform(smoothProgress, [0, 1], [100, 0]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [0, 1]);

  // Enhanced parallax background animations - same as hero section
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const backgroundScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  return (
    <footer
      className="section-padding md:py-20 max-md:pb-10 border-t border-border relative overflow-hidden"
      ref={containerRef}
    >
      {/* Animated background gradient blobs - same as hero section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-foreground/5 rounded-full blur-3xl"
          style={{
            y: backgroundY,
            scale: backgroundScale,
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-foreground/5 rounded-full blur-3xl"
          style={{
            y: backgroundY,
            scale: backgroundScale,
          }}
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-foreground/3 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
          style={{
            scale: backgroundScale,
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-[1800px] mx-auto relative z-10">
        {/* Big Logo with Parallax */}
        <motion.div className="mb-20 overflow-hidden" style={{ opacity }}>
          <motion.h2
            className="text-[15vw] font-bold leading-none tracking-tighter text-foreground/5"
            style={{ y: textY }}
          >
            Forrof®
          </motion.h2>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & Description */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Magnetic strength={0.1}>
              <motion.a
                href="#home"
                className="text-3xl font-bold tracking-tight inline-block mb-6"
                whileHover={{ scale: 1.02 }}
              >
                Forrof<sup className="text-sm">®</sup>
              </motion.a>
            </Magnetic>
            <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
              We are a creative design agency that makes brands unforgettable
              through strategic design and digital innovation.
            </p>
            <div className="flex gap-4">
              {footerLinks.social.map((social, index) => (
                <Magnetic key={social.label} strength={0.3}>
                  <motion.a
                    href={social.href}
                    className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground overflow-hidden relative group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.span
                      className="absolute inset-0 bg-foreground"
                      initial={{ y: "100%" }}
                      whileHover={{ y: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <social.icon size={18} className="relative z-10 " />
                  </motion.a>
                </Magnetic>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-6">
              Services
            </h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link, index) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <motion.a
                    href="#services"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 inline-flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    {link}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-6">
              Company
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link, index) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <motion.a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 inline-flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    {link}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar with Animation */}
        <motion.div
          className="pt-8 border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <LineReveal className="h-px bg-border w-full mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              © {new Date().getFullYear()} Forrof. All rights reserved.
            </motion.p>
            <div className="flex gap-8">
              {["Privacy Policy", "Terms of Service"].map((link, index) => (
                <motion.a
                  key={link}
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
