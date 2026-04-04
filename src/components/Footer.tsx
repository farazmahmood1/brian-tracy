import { motion } from "framer-motion";
import {
  Instagram,
  Linkedin,
  Facebook,
  ArrowUpRight,
} from "lucide-react";
import { Magnetic, LineReveal } from "./AnimationComponents";
import { useNavigate } from "react-router-dom";
import { useRef, useCallback } from "react";
import { SOCIAL_LINKS } from "@/constants/links";

const serviceLinks = [
  { name: "AI/ML Development", href: "/services/ai-ml" },
  { name: "Enterprise Software", href: "/services/enterprise" },
  { name: "SaaS Development", href: "/services/saas" },
  { name: "MVP & POC", href: "/services/mvp" },
  { name: "Product Strategy", href: "/services/strategy" },
  { name: "Mobile App Development", href: "/services/mobile" },
  { name: "Branding & UI/UX", href: "/services/ux-design" },
  { name: "Social Media Marketing", href: "/services/social-media" },
];

const industryLinks = [
  { name: "Industrial Sector", href: "/industries/industrial-sector" },
  { name: "Decision Intelligence", href: "/industries/decision-intelligence" },
  { name: "FinTech & Finance", href: "/industries/fintech-finance" },
  { name: "Health & Wellness", href: "/industries/health-wellness" },
  { name: "LegalTech & Law", href: "/industries/legaltech" },
  { name: "Logistics & Transportation", href: "/industries/transportation" },
  { name: "Painting", href: "/industries/painting" },
];

const businessSizeLinks = [
  { name: "Startups, MVPs & POCs", href: "/services/mvp" },
  { name: "Small Businesses", href: "/industries/small-business" },
  { name: "Mid-Sized Businesses", href: "/industries/mid-sized-business" },
  { name: "Enterprises", href: "/services/enterprise" },
  { name: "Government & Public Sector", href: "/industries/government" },
];

const companyLinks = [
  { name: "Projects", href: "/projects" },
  { name: "Articles", href: "/articles" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
  { icon: Instagram, href: SOCIAL_LINKS.instagram, label: "Instagram" },
  { icon: Facebook, href: SOCIAL_LINKS.facebook, label: "Facebook" },
];

export const Footer = () => {
  const navigate = useNavigate();
  const glowRef = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);

  const handleGlowMove = useCallback((e: React.MouseEvent) => {
    if (!glowRef.current || !h2Ref.current) return;
    const rect = glowRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    h2Ref.current.style.backgroundImage = `radial-gradient(circle 300px at ${x}px ${y}px, #00d4aa 0%, rgba(18,107,102,0.4) 45%, rgba(255,255,255,0.05) 70%)`;
  }, []);

  const handleGlowLeave = useCallback(() => {
    if (h2Ref.current) {
      h2Ref.current.style.backgroundImage = 'linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0.05))';
    }
  }, []);

  const handleNav = useCallback((href: string) => {
    navigate(href);
    window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <footer className="section-forced-dark section-padding md:py-20 max-md:pb-10 border-t border-border overflow-hidden">

      <div className="max-w-[1800px] mx-auto relative z-10">
        {/* Big Logo with cursor glow */}
        <motion.div
          ref={glowRef}
          className="mb-16 md:mb-20 relative cursor-default"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onMouseMove={handleGlowMove}
          onMouseLeave={handleGlowLeave}
        >
          <h2
            ref={h2Ref}
            className="text-[20vw] md:text-[15vw] font-bold leading-none tracking-tighter select-none overflow-hidden"
            style={{
              color: 'transparent',
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0.05))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              transition: 'none',
            }}
          >
            Forrof
          </h2>
        </motion.div>

        {/* Main Footer Content — 5 columns matching navbar */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest mb-6">Services</p>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 inline-flex items-center gap-1.5 group"
                  >
                    {link.name}
                    <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Industries */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest mb-6">Industries</p>
            <ul className="space-y-3">
              {industryLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 inline-flex items-center gap-1.5 group"
                  >
                    {link.name}
                    <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* By Business Size */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest mb-6">Business Size</p>
            <ul className="space-y-3">
              {businessSizeLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 inline-flex items-center gap-1.5 group"
                  >
                    {link.name}
                    <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest mb-6">Company</p>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 inline-flex items-center gap-1.5 group"
                  >
                    {link.name}
                    <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-2 md:col-span-1"
          >
            <p className="text-sm font-semibold uppercase tracking-widest mb-6">Connect</p>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              We engineer intelligent software products that turn technology into a long-term growth engine.
            </p>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social) => (
                <Magnetic key={social.label} strength={0.3}>
                  <motion.a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon size={16} />
                  </motion.a>
                </Magnetic>
              ))}
            </div>
            <Magnetic strength={0.15}>
              <motion.a
                href="/contact"
                onClick={(e) => { e.preventDefault(); handleNav("/contact"); }}
                className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Let's Talk
                <ArrowUpRight size={14} />
              </motion.a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <LineReveal className="h-px bg-border w-full mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Forrof. All rights reserved.
            </p>
            <div className="flex gap-8">
              <a
                href="/privacy-policy"
                onClick={(e) => { e.preventDefault(); handleNav("/privacy-policy"); }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-and-policy"
                onClick={(e) => { e.preventDefault(); handleNav("/terms-and-policy"); }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
